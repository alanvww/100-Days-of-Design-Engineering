import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

type Props = {
	params: Promise<{
		dayId: string;
	}>;
};

export async function GET(request: NextRequest, props: Props) {
	try {
		const { dayId: dayIdString } = await props.params;
		const dayId = parseInt(dayIdString, 10);

		if (isNaN(dayId)) {
			return NextResponse.json({ error: 'Invalid day ID' }, { status: 400 });
		}

		const supabase = createServerSupabaseClient();
		const { data, error } = await supabase
			.from('day_feedback')
			.select('likes, dislikes')
			.eq('day_id', dayId)
			.single();

		if (error && error.code !== 'PGRST116') {
			console.error('Error fetching feedback:', error);
			return NextResponse.json(
				{ likes: 0, dislikes: 0, error: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json(data || { likes: 0, dislikes: 0 });
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ likes: 0, dislikes: 0, error: 'Failed to fetch feedback' },
			{ status: 500 }
		);
	}
}
