import { google } from '@ai-sdk/google'; // Use google instead of openai
import { streamText, tool } from 'ai';
import { CoreMessage, ToolCallPart } from 'ai'; // Import ToolCallPart
import {
	getContextForDay,
	getAggregatedChatContext,
	DailyContext,
} from '@/lib/chat-data'; // Import DailyContext type and getAggregatedChatContext
import { z } from 'zod'; // Import Zod

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Regular expression to find "day X" or just a number, prioritizing "day X"
const dayRegex = /(?:day\s*(\d+))|(\b\d+\b)/i;
// Regex to find category/project group questions
const categoryRegex =
	/about (?:the |projects? in the )?'?"?([^'"?]+)'?"? (?:category|project group|projects?)/i;
// Regex to find topic-based questions
const topicRegex =
	/projects? (?:about|related to|using|involving|with|for|showing|demonstrating) (?:'?"?([^'"?]+)'?"?)/i;
// Regex to detect "show more" requests
const showMoreRegex = /^(show\s*(me)?\s*)?more(\s*projects?)?\.?/i;
// Regex for project creator/origin questions
const creatorRegex =
	/who (?:made|created|developed|built|is behind) (?:this|the) project/i;
// Regex for project purpose/about questions
const purposeRegex =
	/what is (?:this|the) project about|what'?s the point of (?:this|the) project|tell me about (?:this|the) project/i;

// --- Predefined Answers ---
const CREATOR_ANSWER =
	"Alan Ren is a multidisciplinary creative technologist who bridges the worlds of web development, generative art, and immersive experiences. A graduate of NYU Tisch School of the Arts' Interactive Telecommunications Program, Alan combines technical expertise with artistic vision to craft innovative digital solutions.\nSpecializing in next-generation web experiences, Alan leverages his mastery of Next.js, React, WebGL, and generative coding to create interfaces that are both visually striking and intuitively functional. His contributions to open-source projects like ml5.js demonstrate his commitment to advancing accessible machine learning tools for creative applications.\nBeyond the web, Alan has ventured into immersive technology, developing VR experiences using Unreal Engine that push the boundaries of spatial computing and interactive storytelling. This cross-disciplinary approach allows him to implement cutting-edge techniques across platforms, creating cohesive digital ecosystems that seamlessly blend technical precision with artistic expression.";
const PURPOSE_ANSWER =
	"This repository documents my experience in the '100 Days of Making' class. Throughout this journey, I delved into design engineering with a strong focus on web development using Next.js/React components and WebGL. The goal was to build a variety of projects, each designed to enhance my skills and knowledge in design engineering by combining existing knowledge and adhering to best practices.";

// Zod schema for the project card tool parameters
const projectCardSchema = z.object({
	day: z.number().describe('The day number of the project.'),
	title: z.string().describe('The title of the project.'),
	image: z.string().describe('The primary image URL for the project card.'),
	color: z
		.string()
		.describe('The theme color (hex code) for the project card.'),
	project: z.string().describe('The project group or category name.'),
});

// Type for the arguments of the displayProjectCard tool
type ProjectCardArgs = z.infer<typeof projectCardSchema>;

// Function to extract the day number from the user's message
function extractDayFromMessage(message: string): number | null {
	const match = message.match(dayRegex);
	if (match) {
		if (match[1]) return parseInt(match[1], 10);
		if (match[2]) return parseInt(match[2], 10);
	}
	return null;
}

// Function to extract category name from the user's message
function extractCategoryFromMessage(message: string): string | null {
	const match = message.match(categoryRegex);
	return match ? match[1].trim() : null; // Return the captured group (category name)
}

// Function to extract topic from the user's message
function extractTopicFromMessage(message: string): string | null {
	const match = message.match(topicRegex);
	return match ? match[1].trim() : null; // Return the captured group (topic)
}

export async function POST(req: Request) {
	const { messages }: { messages: CoreMessage[] } = await req.json();

	const lastUserMessage = messages[messages.length - 1];

	// Ensure last message is from user
	if (lastUserMessage?.role !== 'user') {
		console.error('Last message is not from user');
		return new Response(JSON.stringify({ error: 'Invalid message sequence' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let systemPrompt = `You are a helpful assistant knowledgeable about the '100 Days of Design Engineering' project. Analyze the user's query. Determine if they are asking about a specific day, a project category, a general topic, a request for more results, or something else.`;
	let processedQuery = false; // Flag to track if the query has been handled
	const BATCH_SIZE = 3; // Number of projects to show per batch
	const SHOW_MORE_PREFIX = 'SHOW_MORE_ACTION::';

	// Check if content is a string and potentially a "Show More" action via prefix
	if (
		typeof lastUserMessage.content === 'string' &&
		lastUserMessage.content.startsWith(SHOW_MORE_PREFIX)
	) {
		processedQuery = true;
		console.log("Handling 'Show More' via content prefix.");
		try {
			const jsonPayload = lastUserMessage.content.substring(
				SHOW_MORE_PREFIX.length
			);
			const { originalQuery, shownDays: previouslyShownDays } = JSON.parse(
				jsonPayload
			) as { originalQuery?: string; shownDays?: number[] };

			if (originalQuery && Array.isArray(previouslyShownDays)) {
				console.log(
					`Original Query: "${originalQuery}", Shown Days: ${previouslyShownDays.join(
						', '
					)}`
				);

				// Determine original query type (category or topic) from the originalQuery text
				let originalQueryType: 'topic' | 'category' | null = null;
				let queryTerm = ''; // The actual category name or topic keywords

				const originalCategory = extractCategoryFromMessage(originalQuery);
				const originalTopic = extractTopicFromMessage(originalQuery);

				if (originalCategory) {
					originalQueryType = 'category';
					queryTerm = originalCategory;
				} else if (originalTopic) {
					originalQueryType = 'topic';
					queryTerm = originalTopic;
				} else {
					// Fallback: Treat the whole original query as a topic
					originalQueryType = 'topic';
					queryTerm = originalQuery;
					console.log(
						`'Show More' context: Using full original query "${queryTerm}" as topic fallback.`
					);
				}

				if (originalQueryType && queryTerm) {
					const allContext = getAggregatedChatContext();
					let scoredContext: (DailyContext & { score: number })[] = [];

					// Re-run scoring based on determined query type and term
					if (originalQueryType === 'category') {
						const lowerCaseCategory = queryTerm.toLowerCase();
						scoredContext = allContext
							.map((item) => {
								let score = 0;
								const projectMatch =
									item.project?.toLowerCase() === lowerCaseCategory;
								const titleMatch = item.title
									?.toLowerCase()
									.includes(lowerCaseCategory);
								const elementMatch = item.elementName
									?.toLowerCase()
									.includes(lowerCaseCategory);
								const markdownMatch = item.markdownContent
									?.toLowerCase()
									.includes(lowerCaseCategory);
								const codeMatch = item.codeSnippet
									?.toLowerCase()
									.includes(lowerCaseCategory);
								if (projectMatch) score += 10;
								if (titleMatch) score += 3;
								if (elementMatch) score += 3;
								if (markdownMatch) score += 1;
								if (codeMatch) score += 1;
								return { ...item, score };
							})
							.filter((item) => item.score > 0)
							.sort((a, b) => b.score - a.score);
					} else {
						// topic
						const keywords = queryTerm
							.toLowerCase()
							.split(/\s+/)
							.filter(Boolean);
						scoredContext = allContext
							.map((item) => {
								let score = 0;
								const contentToCheck = [
									item.title?.toLowerCase(),
									item.description?.toLowerCase(),
									item.project?.toLowerCase(),
									item.markdownContent?.toLowerCase(),
									item.elementName?.toLowerCase(),
								]
									.filter(Boolean)
									.join(' ');
								keywords.forEach((keyword) => {
									if (contentToCheck.includes(keyword)) score++;
								});
								if (
									keywords.some(
										(kw) =>
											item.title?.toLowerCase().includes(kw) ||
											item.elementName?.toLowerCase().includes(kw)
									)
								)
									score += 2;
								return { ...item, score };
							})
							.filter((item) => item.score > 0)
							.sort((a, b) => b.score - a.score);
					}

					// Filter out already shown projects
					const remainingContext = scoredContext.filter(
						(item) => !previouslyShownDays.includes(item.day)
					);
					// --- MODIFICATION: Show ALL remaining projects, not just the next batch ---
					const nextBatchContext = remainingContext; // Get ALL remaining projects

					if (nextBatchContext.length > 0) {
						// Adjust prompt to mention showing *all* remaining
						systemPrompt += `\nThe user asked for more results for their query about '${queryTerm}' (${originalQueryType}). They have already seen projects for days: ${previouslyShownDays.join(
							', '
						)}. Use the provided context for *all* ${
							nextBatchContext.length
						} remaining relevant projects. Provide a brief intro like "Here are all the remaining projects related to ${queryTerm}:", then call the 'displayProjectCard' tool for each project listed below using its specific Day, Title, First Image Path, Color, and Project Group.`;
						const contextBlock = `
Context for All Remaining Projects (Query: '${queryTerm}', Type: ${originalQueryType}):
${nextBatchContext
	.map(
		(item) => `
--- Project Day ${item.day} ---
Day: ${item.day}
Title: ${item.title || 'Untitled'}
Project Group: ${item.project || 'N/A'}
Description: ${item.description || 'N/A'}
First Image Path: ${item.imagePaths?.[0] || '/placeholder.png'}
Color: ${item.color || '#CCCCCC'}
Relevance Score: ${item.score}
`
	)
	.join('\n')}
`.trim();
						systemPrompt += `\n\n${contextBlock}`;
					} else {
						systemPrompt += `\nThe user asked for more results related to their query about '${queryTerm}' (${originalQueryType}). However, there are no more relevant projects to show from the '100 Days of Design Engineering' collection based on the available data. Inform the user politely, for example: "It looks like that's all the projects I have related to ${queryTerm}.". Do not call any tools.`;
					}
				} else {
					systemPrompt += `\nI received a request for more results, but couldn't determine the original topic or category from the provided context ('${originalQuery}'). Please try your original query again.`;
					console.error(
						"Could not determine query type/term from 'Show More' payload:",
						jsonPayload
					);
				}
			} else {
				systemPrompt += `\nReceived a 'Show More' request but the context was missing or invalid. Please try your original query again.`;
				console.error(
					"Invalid or missing data in 'Show More' payload:",
					jsonPayload
				);
			}
		} catch (e) {
			processedQuery = false; // Fallback to regular processing if JSON parsing fails
			console.error("Error parsing 'Show More' JSON payload:", e);
			systemPrompt += `\nThere was an issue processing the 'Show More' request. Please try your original query again.`;
		}
	}

	// --- Regular Query Handling (if not processed as 'show_more') ---
	if (!processedQuery) {
		// Ensure content is a string before proceeding with regex checks
		if (typeof lastUserMessage.content === 'string') {
			const lastUserMessageContent = lastUserMessage.content;
			// Regex to detect requests for listing/counting categories
			const listCategoriesRegex =
				/(list|show|tell me|what are|how many)\s+(all\s+)?(the\s+)?(project\s+)?(groups?|categories)/i;
			const isCreatorQuery = creatorRegex.test(lastUserMessageContent);
			const isPurposeQuery = purposeRegex.test(lastUserMessageContent);

			const day = extractDayFromMessage(lastUserMessageContent);
			const category = extractCategoryFromMessage(lastUserMessageContent);
			const topic = extractTopicFromMessage(lastUserMessageContent);
			const isListCategoriesQuery = listCategoriesRegex.test(
				lastUserMessageContent
			);
			let dailyContext: DailyContext | undefined;

			// --- Handle Creator Query ---
			if (isCreatorQuery) {
				processedQuery = true;
				console.log('Handling creator query.');
				systemPrompt += `\nThe user is asking who created the project. Respond directly with the predefined answer. Do not call any tools. Predefined Answer: ${CREATOR_ANSWER}`;
			}
			// --- Handle Purpose Query ---
			else if (isPurposeQuery) {
				processedQuery = true;
				console.log('Handling purpose query.');
				systemPrompt += `\nThe user is asking about the purpose of the project. Respond directly with the predefined answer. Do not call any tools. Predefined Answer: ${PURPOSE_ANSWER}`;
			}
			// --- Handle List Categories Query ---
			else if (isListCategoriesQuery) {
				processedQuery = true;
				console.log('Handling list categories query.');
				const allContext = getAggregatedChatContext();
				// Get unique, non-empty project names, sort them
				const uniqueCategories = [
					...new Set(allContext.map((item) => item.project).filter(Boolean)),
				] as string[];
				uniqueCategories.sort((a, b) =>
					a.toLowerCase().localeCompare(b.toLowerCase())
				);

				if (uniqueCategories.length > 0) {
					systemPrompt += `\nThe user is asking to list all project categories/groups. There are ${uniqueCategories.length} unique categories found. List them clearly for the user. Do not call any tools.`;
					// Provide the list directly in the prompt context for the AI to format
					const contextBlock = `
Project Categories Found (${uniqueCategories.length}):
- ${uniqueCategories.join('\n- ')}

Use this list to answer the user's request. State the total number and list the categories clearly.
`.trim();
					systemPrompt += `\n\n${contextBlock}`;
				} else {
					systemPrompt += `\nThe user asked for project categories, but none were found in the project data. Inform the user. Do not call any tools.`;
				}
			}
			// --- Handle Category Query ---
			else if (category) {
				// Check for specific category *after* list all and meta questions
				processedQuery = true;
				// --- Handle Category/Project Group Query with Scoring ---
				systemPrompt += `\nThe user is asking about the project group or category '${category}'. Use the provided context of the top ${BATCH_SIZE} most relevant projects based on scoring. First, provide a brief introductory sentence summarizing the findings (e.g., "Here are the top projects for the ${category} category:"). Then, for *each* of the top projects, call the 'displayProjectCard' tool using the details provided in the context (day, title, first image path or '/placeholder.png', color, project group name).`;

				const allContext = getAggregatedChatContext();
				const lowerCaseCategory = category.toLowerCase();

				const scoredContext = allContext
					.map((item) => {
						let score = 0;
						const projectMatch =
							item.project?.toLowerCase() === lowerCaseCategory;
						const titleMatch = item.title
							?.toLowerCase()
							.includes(lowerCaseCategory);
						const elementMatch = item.elementName
							?.toLowerCase()
							.includes(lowerCaseCategory);
						const markdownMatch = item.markdownContent
							?.toLowerCase()
							.includes(lowerCaseCategory);
						const codeMatch = item.codeSnippet
							?.toLowerCase()
							.includes(lowerCaseCategory);
						if (projectMatch) score += 10;
						if (titleMatch) score += 3;
						if (elementMatch) score += 3;
						if (markdownMatch) score += 1;
						if (codeMatch) score += 1;
						return { ...item, score };
					})
					.filter((item) => item.score > 0)
					.sort((a, b) => b.score - a.score);

				const topContext = scoredContext.slice(0, BATCH_SIZE);

				if (topContext.length > 0) {
					const contextBlock = `
Context for Category/Project Group '${category}' (Top ${
						topContext.length
					} relevant projects):
${topContext
	.map(
		(item) => `
--- Project Day ${item.day} ---
Day: ${item.day}
Title: ${item.title || 'Untitled'}
Project Group: ${item.project || 'N/A'} ${
			item.project?.toLowerCase() === lowerCaseCategory ? '(Exact Match)' : ''
		}
Description: ${item.description || 'N/A'}
First Image Path: ${item.imagePaths?.[0] || '/placeholder.png'}
Color: ${item.color || '#CCCCCC'}
Relevance Score: ${item.score}
`
	)
	.join('\n')}
Use this context. Provide a brief intro, then call the 'displayProjectCard' tool for each project listed above.
`.trim();
					systemPrompt += `\n\n${contextBlock}`;
				} else {
					systemPrompt += `\n\nNo projects were found matching the category/project group '${category}'. Inform the user. Do not call any tools.`;
				}
			}
			// --- Handle Topic Query ---
			else if (topic) {
				processedQuery = true;
				// --- Handle Topic Query ---
				systemPrompt += `\nThe user is asking about projects related to the topic '${topic}'. Use the provided context of the top ${BATCH_SIZE} most relevant projects. First, provide a brief introductory sentence summarizing the findings (e.g., "Here are the top projects related to ${topic}:"). Then, for *each* of the top projects, call the 'displayProjectCard' tool using the details provided in the context (day, title, first image path or '/placeholder.png', color, project group name).`;

				const allContext = getAggregatedChatContext();
				const keywords = topic.toLowerCase().split(/\s+/).filter(Boolean);

				if (keywords.length > 0) {
					const scoredContext = allContext
						.map((item) => {
							let score = 0;
							const contentToCheck = [
								item.title?.toLowerCase(),
								item.description?.toLowerCase(),
								item.project?.toLowerCase(),
								item.markdownContent?.toLowerCase(),
								item.elementName?.toLowerCase(),
							]
								.filter(Boolean)
								.join(' ');
							keywords.forEach((keyword) => {
								if (contentToCheck.includes(keyword)) score++;
							});
							if (
								keywords.some(
									(kw) =>
										item.title?.toLowerCase().includes(kw) ||
										item.elementName?.toLowerCase().includes(kw)
								)
							)
								score += 2;
							return { ...item, score };
						})
						.filter((item) => item.score > 0)
						.sort((a, b) => b.score - a.score);

					const topContext = scoredContext.slice(0, BATCH_SIZE);

					if (topContext.length > 0) {
						const contextBlock = `
Context for Topic '${topic}' (Top ${topContext.length} relevant projects):
${topContext
	.map(
		(item) => `
--- Project Day ${item.day} ---
Day: ${item.day}
Title: ${item.title || 'Untitled'}
Project Group: ${item.project || 'N/A'}
Description: ${item.description || 'N/A'}
First Image Path: ${item.imagePaths?.[0] || '/placeholder.png'}
Color: ${item.color || '#CCCCCC'}
Relevance Score: ${item.score}
`
	)
	.join('\n')}
Use this context. Provide a brief intro, then call the 'displayProjectCard' tool for each project listed above.
`.trim();
						systemPrompt += `\n\n${contextBlock}`;
					} else {
						systemPrompt += `\n\nNo projects were found matching the topic '${topic}'. Inform the user. Do not call any tools.`;
					}
				} else {
					systemPrompt += `\n\nCould not extract keywords from the topic '${topic}'. Ask the user to rephrase. Do not call any tools.`;
				}
			}
			// --- Handle Day Query ---
			else if (day !== null) {
				processedQuery = true;
				// --- Handle Day Query ---
				systemPrompt += `\nThe user is asking about Day ${day}. Use the provided context for this day *only* to generate a concise textual answer. After the text answer, if context was available, call the 'displayProjectCard' tool with: day, title, first image path (or '/placeholder.png'), color, and project group name.`;
				dailyContext = getContextForDay(day);
				if (dailyContext) {
					const contextBlock = `
Context for Day ${day}:
**Title:** ${dailyContext.title || 'N/A'}
**Project Group:** ${dailyContext.project || 'N/A'}
**Description:** ${dailyContext.description || 'N/A'}
**Images:** ${dailyContext.imagePaths?.join(', ') || 'N/A'}
**Markdown Notes:** ${dailyContext.markdownContent || 'N/A'}
**Associated Code Component:** ${dailyContext.elementName || 'N/A'}
**Code Snippet:** \`\`\`tsx\n${
						dailyContext.codeSnippet || '// No code snippet available'
					}\n\`\`\`
**Color:** ${dailyContext.color || '#CCCCCC'}
Use this context to answer concisely, then call the 'displayProjectCard' tool.
`.trim();
					systemPrompt += `\n\n${contextBlock}`;
				} else {
					systemPrompt += `\n\nContext for Day ${day} is unavailable. Inform the user. Do not call any tools.`;
				}
			} else {
				// --- Handle Fallback ---
				systemPrompt += `\n\nNo specific day, project category, recognizable topic, or request for more results was clearly identified in the user's query: "${lastUserMessageContent}". Ask the user to specify a day, category (e.g., 'about the UI Components category'), or topic (e.g., 'projects related to animations') if necessary. Do not call any tools.`;
			}
		} // <-- Add missing closing brace for if (typeof lastUserMessage.content === 'string')
	}

	// --- Final streamText call (unchanged) ---
	try {
		console.log('--- System Prompt ---');
		console.log(systemPrompt);
		console.log('--- End System Prompt ---');

		const result = await streamText({
			model: google('models/gemini-1.5-flash-latest'), // Using Google model
			system: systemPrompt,
			messages: messages, // Send the full history
			tools: {
				displayProjectCard: tool({
					description:
						'Displays a project card UI component in the chat for a specific day.',
					parameters: projectCardSchema,
					execute: async (args: ProjectCardArgs) => {
						// Use the inferred type
						console.log(
							`[Tool Execution Stub] displayProjectCard called with args:`,
							args
						);
						// Return structured data matching parameters for history
						return {
							day: args.day,
							title: args.title,
							image: args.image,
							color: args.color,
							project: args.project,
						};
					},
				}),
			},
		});

		// Return the stream response (including potential tool calls)
		return result.toDataStreamResponse();
	} catch (error) {
		console.error('Error streaming text:', error);
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error during streaming';
		// Return a JSON error response
		return new Response(
			JSON.stringify({ error: `AI streaming failed: ${errorMessage}` }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}
