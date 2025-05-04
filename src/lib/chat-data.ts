import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import elementsData from '@/lib/elements-data'; // Import data only

export interface DailyContext { // Add export keyword
    day: number;
    title?: string;
    description?: string;
    imagePaths?: string[];
    elementName?: string;
    codeSnippet?: string;
    markdownContent?: string;
    project?: string; // Added based on markdown frontmatter
    color?: string; // Added based on markdown frontmatter
}

// Cache the aggregated data as an array of plain objects
let cachedContextArray: DailyContext[] | null = null;

// Helper function to ensure an object is plain and serializable
function createPlainContext(context: DailyContext): DailyContext {
     const plain: DailyContext = {
        day: context.day,
        title: context.title,
        description: context.description,
        imagePaths: context.imagePaths ? [...context.imagePaths] : undefined, // Ensure array is plain
        elementName: context.elementName,
        codeSnippet: context.codeSnippet,
        markdownContent: context.markdownContent,
        project: context.project,
        color: context.color,
    };
     // Remove undefined keys before caching/returning
    Object.keys(plain).forEach(key => {
        if (plain[key as keyof DailyContext] === undefined) {
            delete plain[key as keyof DailyContext];
        }
    });
    return plain;
}

// Returns an array of plain DailyContext objects
export function getAggregatedChatContext(): DailyContext[] {
    if (cachedContextArray) {
        console.log("Returning cached context array");
        return cachedContextArray;
    }
    console.log("Building context map and array...");

    const contextMap = new Map<number, DailyContext>(); // Use map temporarily for easy merging
    const contentDir = path.join(process.cwd(), 'src/content');

    try {
        const filenames = fs.readdirSync(contentDir);

        // Process Markdown Files
        filenames.forEach((filename) => {
            if (path.extname(filename) === '.md') {
                const filePath = path.join(contentDir, filename);
                try {
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data: frontmatter, content: markdownBody } = matter(fileContents);

                    const day = parseInt(frontmatter.day, 10);
                    if (!isNaN(day)) {
                        // Extract image paths from frontmatter and content
                        const imagePaths: string[] = [];
                        if (frontmatter.image) {
                            imagePaths.push(frontmatter.image);
                        }
                        // Basic regex to find markdown image syntax ![alt](/path/to/image.png)
                        const imageRegex = /!\[.*?\]\((.*?)\)/g;
                        let match;
                        while ((match = imageRegex.exec(markdownBody)) !== null) {
                            if (match[1] && !imagePaths.includes(match[1])) {
                                imagePaths.push(match[1]);
                            }
                        }


                        const context: DailyContext = {
                            day: day,
                            title: frontmatter.title || `Day ${day}`,
                            description: frontmatter.description || undefined, // Use undefined for potentially missing fields
                            project: frontmatter.project || undefined,
                            color: frontmatter.color || undefined,
                            imagePaths: imagePaths.length > 0 ? imagePaths : undefined,
                            markdownContent: markdownBody.replace(imageRegex, '').trim() || undefined,
                            // Element data will be added next
                        };
                        contextMap.set(day, context);
                    }
                } catch (readError) {
                    console.error(`Error reading or parsing markdown file ${filename}:`, readError);
                }
            }
        });

        // Merge Element Data using the imported data array
        elementsData.forEach((element) => {
            const day = element.day;
            const existingContext = contextMap.get(day);

            if (existingContext) {
                // Update existing context with element data (use undefined for potentially missing)
                existingContext.elementName = element.name || undefined;
                existingContext.codeSnippet = element.code || undefined;
            } else {
                // If no markdown exists for this day, create a basic context from element
                console.warn(`No markdown file found for day ${day}, creating context from element data.`);
                contextMap.set(day, {
                    day: day,
                    title: element.name || undefined, // Use element name as title
                    description: `Code component: ${element.name}` || undefined, // Basic description
                    elementName: element.name || undefined,
                    codeSnippet: element.code || undefined,
                    imagePaths: undefined, // Explicitly undefined
                    markdownContent: undefined, // Explicitly undefined
                    project: 'Next.js/React Components', // Default project type
                    color: '#CCCCCC', // Default color - keep as string
                });
            }
        });

        // Convert map values to a sorted array of *plain* objects
        const sortedContextArray = [...contextMap.values()]
            .sort((a, b) => a.day - b.day)
            .map(createPlainContext); // Ensure each object is plain and undefined keys are removed

        // Cache the array result
        cachedContextArray = sortedContextArray;
        console.log(`Aggregated context array created for ${cachedContextArray.length} days.`);
        return cachedContextArray;

    } catch (error) {
        console.error("Error reading content directory or processing context:", error);
        return []; // Return empty array on error
    }
}

// Function to get context for a specific day from the array
export function getContextForDay(day: number): DailyContext | undefined {
    const allContextArray = getAggregatedChatContext();
    // Find the context object in the array (already plain)
    const context = allContextArray.find(item => item.day === day);
    console.log(`getContextForDay(${day}): Found context?`, !!context);
    return context; // Returns the plain object or undefined
}