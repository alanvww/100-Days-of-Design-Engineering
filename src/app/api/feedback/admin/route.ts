import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
	try {
		const supabase = createServerSupabaseClient();

		const { data, error } = await supabase
			.from('day_feedback')
			.select('*')
			.order('day_id', { ascending: true });

		if (error) {
			console.error('Error fetching all feedback data:', error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(data || []);
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch feedback data' },
			{ status: 500 }
		);
	}
}
