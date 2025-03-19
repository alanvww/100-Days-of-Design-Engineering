import { getProject } from '@/lib/markdown';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { slug: string } }
) {
	const { slug } = await params;
	try {
		// Ensure the slug is properly formatted - remove any non-numeric characters
		const cleanSlug = params.slug.replace(/\D/g, '');

		// Fetch project data
		const project = await getProject(cleanSlug);

		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 });
		}

		return NextResponse.json(project);
	} catch (error) {
		console.error('Error fetching project data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch project data' },
			{ status: 500 }
		);
	}
}
