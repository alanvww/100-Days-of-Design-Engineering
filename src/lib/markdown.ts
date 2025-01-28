import fs from 'fs/promises'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import matter from 'gray-matter'

export interface ProjectFrontmatter {
    title: string;
    description: string;
    image: string;
    day: number;
}

export async function getMarkdownContent(slug: string) {
    try {
        const filePath = path.join(process.cwd(), 'src', 'content', `day-${slug}.md`)
        const fileContent = await fs.readFile(filePath, 'utf8')

        const { content } = matter(fileContent)

        const result = await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(content)

        return result.toString()
    } catch (error) {
        console.log('Error reading markdown content:', error)
        return null
    }
}

export async function getAllProjects(): Promise<ProjectFrontmatter[]> {
    const contentDirectory = path.join(process.cwd(), 'src', 'content')

    try {
        const files = await fs.readdir(contentDirectory)
        const markdownFiles = files.filter(file => file.startsWith('day-') && file.endsWith('.md'))

        const projects = await Promise.all(
            markdownFiles.map(async (fileName) => {
                const filePath = path.join(contentDirectory, fileName)
                const fileContent = await fs.readFile(filePath, 'utf8')

                const { data } = matter(fileContent)
                return data as ProjectFrontmatter
            })
        )

        return projects.sort((a, b) => a.day - b.day)
    } catch (error) {
        console.error('Error reading projects:', error)
        return []
    }
}
