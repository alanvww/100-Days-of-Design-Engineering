import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/markdown';

export async function GET(request: NextRequest) {
	try {
		// Get query parameters
		const searchParams = request.nextUrl.searchParams;
		const page = parseInt(searchParams.get('page') || '1', 10);
		const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '12', 10);

		// Fetch all projects
		const allProjects = await getAllProjects();

		// Calculate pagination
		const totalPages = Math.ceil(allProjects.length / itemsPerPage);
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;

		// Get projects for the requested page
		const projects = allProjects.slice(startIndex, endIndex);

		return NextResponse.json({
			projects,
			currentPage: page,
			totalPages,
			totalProjects: allProjects.length,
		});
	} catch (error) {
		console.error('Error fetching projects:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch projects' },
			{ status: 500 }
		);
	}
}
