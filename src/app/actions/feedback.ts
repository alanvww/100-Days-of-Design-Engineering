'use server';

import { createServerSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getFeedback(dayId: number) {
	try {
		const supabase = createServerSupabaseClient();
		const { data, error } = await supabase
			.from('day_feedback')
			.select('likes, dislikes')
			.eq('day_id', dayId)
			.single();

		if (error && error.code !== 'PGRST116') {
			console.error('Error fetching feedback:', error);
			return { likes: 0, dislikes: 0 };
		}

		return data || { likes: 0, dislikes: 0 };
	} catch (error) {
		console.error('Unexpected error fetching feedback:', error);
		return { likes: 0, dislikes: 0 };
	}
}

export async function updateFeedback(dayId: number, type: 'like' | 'dislike') {
	try {
		const supabase = createServerSupabaseClient();

		// Check if the day exists in the feedback table
		const { data, error } = await supabase
			.from('day_feedback')
			.select('id, likes, dislikes')
			.eq('day_id', dayId)
			.single();

		if (error && error.code !== 'PGRST116') {
			throw new Error(error.message);
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

			revalidatePath(`/days/${dayId}`);
			return { likes: initialLikes, dislikes: initialDislikes };
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

			revalidatePath(`/days/${dayId}`);
			return { likes: updatedLikes, dislikes: updatedDislikes };
		}
	} catch (error) {
		console.error('Failed to update feedback:', error);
		throw error;
	}
}

export async function getAllFeedback() {
	try {
		const supabase = createServerSupabaseClient();

		const { data, error } = await supabase
			.from('day_feedback')
			.select('*')
			.order('day_id', { ascending: true });

		if (error) {
			console.error('Error fetching all feedback data:', error);
			throw new Error(error.message);
		}

		return data || [];
	} catch (error) {
		console.error('Unexpected error fetching feedback data:', error);
		throw error;
	}
}
