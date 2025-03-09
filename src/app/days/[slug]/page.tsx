import { notFound } from 'next/navigation';
import { getMarkdownContent, getProject, getNumberOfDays } from '@/lib/markdown';
import { Metadata } from 'next';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { DayNavigation } from '@/components/ui/DayNavigation';
import MarkdownContent from '@/components/MarkdownContent';
import ElementShowcase from '@/components/ElementShowcase';
import { Suspense } from 'react';
import Loading from './loading';
import { ProjectFrontmatter } from '@/lib/markdown';
import * as motion from "motion/react-client"
import FeedbackBar from '@/components/FeedbackBar';


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
    totalDays
}: {
    slug: string;
    project: ProjectFrontmatter;
    content: string;
    dayNumber: number;
    totalDays: number;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                <div className="relative">
                    <Navbar />
                    {/* Background project name */}
                    <motion.div
                        className="absolute left-0 w-full overflow-hidden select-none pointer-events-none"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            delay: 0.1
                        }}
                    >
                        <div
                            className="md:text-[8rem] text-right my-14 text-[3rem] text-gray-600 opacity-15 tracking-tight leading-none"
                            style={{ color: project?.color }}
                        >
                            {project?.project}
                        </div>
                    </motion.div>
                    {/* Foreground title */}
                    <div className="relative md:my-32 my-20 w-3/4">
                        <motion.h1
                            className="text-3xl md:text-8xl text-left text-gray-700 bg-blend-multiply px-2 md:px-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                delay: 0.3
                            }}
                        >
                            Day {slug}: {project?.title}
                        </motion.h1>
                    </div>
                </div>
                <article className="max-w-4xl mx-auto px-4 mt-16">
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

                    {/* Feedback Bar */}
                    <div className="mt-12 mb-8">
                        <FeedbackBar dayId={dayNumber} showCounts={true} color={project?.color} />
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}

export default async function DayPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const project = await getProject(slug);
    const content = await getMarkdownContent(slug);
    const totalDays = await getNumberOfDays();

    const dayNumber = parseInt(slug, 10);

    if (isNaN(dayNumber)) {
        notFound();
    }

    if (!content && !project) {
        notFound();
    }

    return (
        <Suspense fallback={<Loading />}>
            {(project && content) ? <PageContent
                slug={slug}
                project={project}
                content={content}
                dayNumber={dayNumber}
                totalDays={totalDays}
            /> : <Loading />}
        </Suspense>
    );
}
