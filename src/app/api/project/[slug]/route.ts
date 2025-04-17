import { getProjectAction } from '@/app/actions/projects'; // Updated import
import { NextRequest, NextResponse } from 'next/server';

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

export async function GET(request: NextRequest, props: Props) {
	const { slug } = await props.params;
	try {
		// Ensure the slug is properly formatted - remove any non-numeric characters
		const cleanSlug = slug.replace(/\D/g, '');

		// Fetch project data
		const project = await getProjectAction(cleanSlug); // Use action

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
