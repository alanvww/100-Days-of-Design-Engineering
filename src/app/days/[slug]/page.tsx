// src/app/days/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getMarkdownContent, getAllProjects } from '@/lib/markdown'
import { Metadata } from 'next'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface PageProps {
    params: Params;
    searchParams: SearchParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const slug = resolvedParams.slug

    // You can use the slug to fetch project details and generate appropriate metadata
    return {
        title: `Day ${slug} - Design Engineering`,
        description: `Design engineering project for day ${slug}`,
    }
}

export default async function DayPage({ params }: PageProps) {
    const resolvedParams = await params
    const slug = resolvedParams.slug

    const content = await getMarkdownContent(slug)

    if (!content) {
        notFound()
    }

    return (
        <article className="prose prose-lg max-w-prose mx-auto px-4 py-8">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    )
}

// Generate static params for build time
export async function generateStaticParams() {
    const projects = await getAllProjects()

    return projects.map(project => ({
        slug: project.day.toString()
    }))
}
