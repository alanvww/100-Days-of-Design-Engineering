import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
	try {
		const { dayId, type } = await request.json();

		if (!dayId || !type || (type !== 'like' && type !== 'dislike')) {
			return NextResponse.json(
				{ error: 'Invalid feedback data' },
				{ status: 400 }
			);
		}

		const supabase = createServerSupabaseClient();

		// Check if the day exists in the feedback table
		const { data, error } = await supabase
			.from('day_feedback')
			.select('id, likes, dislikes')
			.eq('day_id', dayId)
			.single();

		if (error && error.code !== 'PGRST116') {
			console.error('Error checking day feedback:', error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		let result;

		if (!data) {
			// Day doesn't exist yet, create new record
			const initialLikes = type === 'like' ? 1 : 0;
			const initialDislikes = type === 'dislike' ? 1 : 0;

			result = await supabase
				.from('day_feedback')
				.insert({
					day_id: dayId,
					likes: initialLikes,
					dislikes: initialDislikes,
				})
				.select();

			return NextResponse.json({
				likes: initialLikes,
				dislikes: initialDislikes,
			});
		} else {
			// Update existing record
			const updatedLikes =
				type === 'like' ? (data.likes || 0) + 1 : data.likes || 0;
			const updatedDislikes =
				type === 'dislike' ? (data.dislikes || 0) + 1 : data.dislikes || 0;

			result = await supabase
				.from('day_feedback')
				.update({
					likes: updatedLikes,
					dislikes: updatedDislikes,
				})
				.eq('id', data.id)
				.select();

			return NextResponse.json({
				likes: updatedLikes,
				dislikes: updatedDislikes,
			});
		}
	} catch (error) {
		console.error('Failed to update feedback:', error);
		return NextResponse.json(
			{ error: 'Failed to update feedback' },
			{ status: 500 }
		);
	}
}
