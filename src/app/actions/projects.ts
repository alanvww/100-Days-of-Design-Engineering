'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { unified } from 'unified'; // Added import
import remarkParse from 'remark-parse'; // Added import
import remarkHtml from 'remark-html'; // Added import
import { ProjectFrontmatter } from '@/lib/markdown'; // Assuming '@/lib/...' alias is configured

// --- Fetch All Projects (Existing) ---
const fetchAllProjects = async (): Promise<ProjectFrontmatter[]> => {
	const contentDirectory = path.join(process.cwd(), 'src', 'content');
	try {
		const files = await fs.readdir(contentDirectory);
		const markdownFiles = files.filter(
			(file) => file.startsWith('day-') && file.endsWith('.md')
		);
		const projects = await Promise.all(
			markdownFiles.map(async (fileName) => {
				const filePath = path.join(contentDirectory, fileName);
				const fileContent = await fs.readFile(filePath, 'utf8');
				const { data } = matter(fileContent);
				// Add default values or validation if needed
				return data as ProjectFrontmatter;
			})
		);
		// Ensure sorting happens correctly
		return projects.sort((a, b) => (a?.day ?? 0) - (b?.day ?? 0));
	} catch (error) {
		console.error('Error reading projects:', error);
		return [];
	}
};

export const getAllProjectsAction = unstable_cache(
	fetchAllProjects,
	['all-projects'], // Cache key parts
	{
		revalidate: 3600, // Revalidate every hour (adjust as needed)
		tags: ['projects'], // Cache tag for on-demand revalidation
	}
);

// --- Fetch Single Project ---
const fetchProject = async (slug: string): Promise<ProjectFrontmatter | null> => {
	try {
		const filePath = path.join(process.cwd(), 'src', 'content', `day-${slug}.md`);
		const fileContent = await fs.readFile(filePath, 'utf8');
		const { data } = matter(fileContent);
		return data as ProjectFrontmatter;
	} catch (error) {
		// Log specific slug for better debugging
		console.error(`Error reading project frontmatter for slug ${slug}:`, error);
		return null;
	}
};

// Cache key automatically includes function arguments (slug)
export const getProjectAction = unstable_cache(
	fetchProject,
	['project'], // Base key part
	{
		revalidate: 3600, // Revalidate like others
		tags: ['projects'], // Tag for potential revalidation by slug or 'projects'
	}
);

// --- Fetch Markdown Content ---
const fetchMarkdownContent = async (slug: string): Promise<string | null> => {
	try {
		const filePath = path.join(process.cwd(), 'src', 'content', `day-${slug}.md`);
		const fileContent = await fs.readFile(filePath, 'utf8');
		const { content } = matter(fileContent);
		const result = await unified()
			.use(remarkParse)
			.use(remarkHtml)
			.process(content);
		return result.toString();
	} catch (error) {
		console.log(`Error reading markdown content for slug ${slug}:`, error);
		return null;
	}
};

// Cache key automatically includes function arguments (slug)
export const getMarkdownContentAction = unstable_cache(
	fetchMarkdownContent,
	['markdown-content'], // Base key part
	{
		revalidate: 3600,
		tags: ['projects', 'content'], // Tag for revalidation
	}
);

// --- Fetch Number of Days ---
const fetchNumberOfDays = async (): Promise<number> => {
	const contentDirectory = path.join(process.cwd(), 'src', 'content');
	try {
		const files = await fs.readdir(contentDirectory);
		const markdownFiles = files.filter(
			(file) => file.startsWith('day-') && file.endsWith('.md')
		);
		return markdownFiles.length;
	} catch (error) {
		console.error('Error counting days:', error);
		return 0;
	}
};

export const getNumberOfDaysAction = unstable_cache(
	fetchNumberOfDays,
	['number-of-days'], // Cache key part
	{
		revalidate: 3600,
		tags: ['projects'], // Tag for revalidation
	}
);
