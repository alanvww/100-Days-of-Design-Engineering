import { notFound } from 'next/navigation';
import { getMarkdownContent, getProject } from '@/lib/markdown';
import { Metadata } from 'next';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import MarkdownContent from '@/components/MakrdownContent';

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

    if (!content) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 sm:py-16">
                <div className="space-y-6 sm:space-y-8 mb-12">
                    <Navbar />
                    <h1 className="text-3xl md:text-8xl text-left">
                        Day {slug}:{project?.title}
                    </h1>
                    <p className={`w-fit md:ml-8 px-3 py-1  text-base bg-gray-800 text-white border shadow-sm rounded-full`}>{project?.project}</p>
                </div>
                <article className="max-w-4xl mx-auto px-4">
                    <MarkdownContent
                        content={content}
                        className="prose-headings:scroll-mt-20" // Adds padding for anchor links
                    />
                </article>
            </main>
            <Footer />
        </div>
    );
}