import { notFound } from 'next/navigation';
import { getMarkdownContent, getProject } from '@/lib/markdown';
import { Metadata } from 'next';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import MarkdownContent from '@/components/MakrdownContent';
import ElementShowcase from '@/components/ElementShowcase';

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

export default async function DayPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const project = await getProject(slug);
    const content = await getMarkdownContent(slug);

    const dayNumber = parseInt(slug, 10);

    if (isNaN(dayNumber)) {
        notFound();
    }

    if (!content && !project) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                <div className="relative">
                    <Navbar />
                    {/* Background project name */}
                    <div className="absolute left-0 w-full overflow-hidden select-none pointer-events-none">
                        <div
                            className="md:text-[8rem] text-right my-14 text-[3rem]  opacity-15 text-gray-600 tracking-tight leading-none"
                            style={{ color: project?.color }}
                        >
                            {project?.project}
                        </div>
                    </div>
                    {/* Foreground title */}
                    <div className="relative md:my-32 my-20 w-3/4">
                        <h1 className="text-3xl md:text-8xl  text-left text-gray-700 bg-blend-multiply">
                            Day {slug}: {project?.title}
                        </h1>
                    </div>
                </div>
                <article className="max-w-4xl mx-auto px-4 mt-16">
                    <MarkdownContent
                        content={content? content : ''}
                        className="prose-headings:scroll-mt-20"
                    />
                    {/* Element Showcase */}
                    <div className="mt-16">
                        <ElementShowcase day={dayNumber} />
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}