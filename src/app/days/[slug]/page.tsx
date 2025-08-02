import { notFound } from 'next/navigation';
import { getMarkdownContentAction, getProjectAction, getNumberOfDaysAction } from '@/app/actions/projects'; // Updated import
import { Metadata } from 'next';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { DayNavigation } from '@/components/ui/DayNavigation';
import MarkdownContent from '@/components/MarkdownContent';
import ElementShowcase from '@/components/ElementShowcase';
import { Suspense } from 'react';
import Loading from './loading';
import { ProjectFrontmatter } from '@/lib/markdown';
import * as motion from "motion/react-client";
import { Variants } from 'motion/react';
import FeedbackBar from '@/components/FeedbackBar';
import { getFeedbackCounts } from '@/app/actions/feedback'; // Import the server action

import { cn } from '@/lib/utils';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
    params: Params;
    searchParams: SearchParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    return {
        title: `Day ${slug} - Design Engineering`,
        description: `Design engineering project for day ${slug}`,
    };
}

function PageContent({
    slug,
    project,
    content,
    dayNumber,
    totalDays,
    initialLikes, // Add to destructuring
    initialDislikes // Add to destructuring
}: {
    slug: string;
    project: ProjectFrontmatter;
    content: string;
    dayNumber: number;
    totalDays: number;
    initialLikes: number; // Add new prop
    initialDislikes: number; // Add new prop
}) {
    return (
        <div
            className="min-h-screen flex flex-col bg-background text-foreground dark:bg-gray-900 dark:text-white transition-colors duration-300"
            style={{ viewTransitionName: `day-page-${slug}` }}
        >
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                <div className="relative">
                    <Navbar />
                    {/* Background project name */}
                    <motion.div
                        className="absolute left-0 w-full overflow-hidden select-none pointer-events-none transition-colors duration-300"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, transform: "translateX(-50px)" },
                            visible: { opacity: 1, transform: "translateX(0px)", transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 } }
                        } as Variants}
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <div
                            className={cn(
                                "md:text-9xl text-4xl text-right my-0 md:my-8 w-4/5 ml-auto opacity-30 tracking-tight leading-none transition-colors duration-300",
                                project?.color ? "text-[var(--accent-color-light)] dark:text-[var(--accent-color-dark)]" : "text-gray-600" // Fallback if no color
                            )}
                            style={project?.color ? {
                                '--accent-color-base': project.color,
                                '--accent-color-light': `color-mix(in srgb, ${project.color} 90%, black 10%)`,
                                '--accent-color-dark': `color-mix(in srgb, ${project.color} 85%, white 15%)`
                            } as React.CSSProperties : {}}
                        >
                            {project?.project}
                        </div>
                    </motion.div>
                    {/* Foreground title */}
                    <div className="relative md:my-32 my-6 w-3/4">
                        <motion.h1
                            className="text-5xl md:text-8xl text-left text-gray-700 dark:text-white bg-blend-multiply px-2 md:px-8 transition-colors duration-300"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0, transform: "translateY(30px)" },
                                visible: { opacity: 1, transform: "translateY(0px)", transition: { type: "spring", stiffness: 400, damping: 30, delay: 0.3 } }
                            } as Variants}
                            style={{
                                viewTransitionName: `day-title-${slug}`,
                                willChange: 'transform, opacity'
                            }}
                        >
                            Day {slug}: {project?.title}
                        </motion.h1>
                    </div>
                </div>
                <article className="max-w-4xl mx-auto px-4 mt-16" style={{ viewTransitionName: `day-content-${slug}` }}>
                    <MarkdownContent
                        content={content ? content : ''}
                        className="prose-headings:scroll-mt-20"
                    />
                    {/* Element Showcase */}
                    <div className="mt-16">
                        <ElementShowcase day={dayNumber} />
                    </div>

                    {/* Day Navigation */}
                    <DayNavigation
                        currentDay={dayNumber}
                        totalDays={totalDays}
                        color={project?.color}
                        className="mt-16"
                    />

                    {/* Feedback Bar - Pass initial counts 
                    <div className="mt-12 mb-8">
                        <FeedbackBar
                            dayId={dayNumber}
                            showCounts={true}
                            color={project?.color}
                            initialLikes={initialLikes} // Pass prop
                            initialDislikes={initialDislikes} // Pass prop
                        />
                    </div> */}
                </article>
            </main>
            <Footer />
        </div>
    );
}

export default async function DayPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const project = await getProjectAction(slug); // Use action
    const content = await getMarkdownContentAction(slug); // Use action
    const totalDays = await getNumberOfDaysAction(); // Use action

    const dayNumber = parseInt(slug, 10);

    if (isNaN(dayNumber)) {
        notFound();
    }

    if (!content && !project) {
        notFound();
    }

    // Fetch initial feedback counts here using the server action
    // const { likes: initialLikes, dislikes: initialDislikes } = await getFeedbackCounts(dayNumber);

    return (
        <Suspense fallback={<Loading />}>
            {(project && content) ? <PageContent
                slug={slug}
                project={project}
                content={content}
                dayNumber={dayNumber}
                totalDays={totalDays}
                initialLikes={0} // Pass fetched counts
                initialDislikes={0} // Pass fetched counts
            /> : <Loading />}
        </Suspense>
    );
}
