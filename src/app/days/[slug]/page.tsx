import { notFound } from 'next/navigation'
import { getMarkdownContent, getAllProjects } from '@/lib/markdown'

interface PageProps {
    params: {
        slug: string
    }
}

export default async function DayPage({ params }: PageProps) {
    const content = await getMarkdownContent(params.slug)

    if (!content) {
        notFound()
    }

    return (
        <article className="prose prose-lg max-w-prose mx-auto px-4 py-8">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    )
}

export async function generateStaticParams() {
    const projects = await getAllProjects()

    return projects.map(project => ({
        slug: project.day.toString()
    }))
}
