"use server";

import { createServerSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

type FeedbackCounts = {
    likes: number;
    dislikes: number;
};

/**
 * Fetches the feedback counts for a given day ID.
 * @param dayId The ID of the day.
 * @returns An object containing the likes and dislikes counts.
 */
export async function getFeedbackCounts(dayId: number): Promise<FeedbackCounts> {
    if (isNaN(dayId)) {
        console.error('Invalid day ID provided to getFeedbackCounts:', dayId);
        return { likes: 0, dislikes: 0 };
    }

    try {
        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase
            .from('day_feedback')
            .select('likes, dislikes')
            .eq('day_id', dayId)
            .single();

        // PGRST116: No rows found - this is expected if no feedback exists yet
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching feedback counts:', error);
            // Return default counts on error, but log it
            return { likes: 0, dislikes: 0 };
        }

        return data || { likes: 0, dislikes: 0 };
    } catch (error) {
        console.error('Unexpected error in getFeedbackCounts:', error);
        return { likes: 0, dislikes: 0 };
    }
}

type UpdateFeedbackPayload = {
    dayId: number;
    type: 'like' | 'dislike';
};

/**
 * Updates the feedback count (like or dislike) for a given day ID.
 * Inserts a new record if one doesn't exist.
 * @param payload An object containing the dayId and feedback type ('like' or 'dislike').
 * @returns The updated feedback counts.
 */
export async function updateFeedbackAction(payload: UpdateFeedbackPayload): Promise<FeedbackCounts> {
    const { dayId, type } = payload;

    if (isNaN(dayId) || !type || (type !== 'like' && type !== 'dislike')) {
        console.error('Invalid feedback data provided to updateFeedbackAction:', payload);
        // Optionally, throw an error or return current counts if possible
        // For simplicity, returning 0 counts here, but ideally fetch current counts or throw
        return { likes: 0, dislikes: 0 };
    }

    try {
        const supabase = createServerSupabaseClient();

        // Check if the day exists in the feedback table
        const { data: existingData, error: fetchError } = await supabase
            .from('day_feedback')
            .select('id, likes, dislikes')
            .eq('day_id', dayId)
            .single();

        // Handle fetch errors (excluding 'not found')
        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error checking day feedback:', fetchError);
            throw new Error(`Failed to check feedback: ${fetchError.message}`);
        }

        let updatedLikes: number;
        let updatedDislikes: number;

        if (!existingData) {
            // Day doesn't exist yet, create new record
            updatedLikes = type === 'like' ? 1 : 0;
            updatedDislikes = type === 'dislike' ? 1 : 0;

            const { error: insertError } = await supabase
                .from('day_feedback')
                .insert({
                    day_id: dayId,
                    likes: updatedLikes,
                    dislikes: updatedDislikes,
                });

            if (insertError) {
                console.error('Error inserting new feedback:', insertError);
                throw new Error(`Failed to insert feedback: ${insertError.message}`);
            }
        } else {
            // Update existing record
            updatedLikes = type === 'like' ? (existingData.likes || 0) + 1 : existingData.likes || 0;
            updatedDislikes = type === 'dislike' ? (existingData.dislikes || 0) + 1 : existingData.dislikes || 0;

            const { error: updateError } = await supabase
                .from('day_feedback')
                .update({
                    likes: updatedLikes,
                    dislikes: updatedDislikes,
                })
                .eq('id', existingData.id);

            if (updateError) {
                console.error('Error updating feedback:', updateError);
                throw new Error(`Failed to update feedback: ${updateError.message}`);
            }
        }

        // Revalidate the path to ensure the parent server component refetches data
        revalidatePath(`/days/${dayId}`);
        revalidatePath('/'); // Also revalidate home page if it shows aggregated feedback

        return { likes: updatedLikes, dislikes: updatedDislikes };

    } catch (error) {
        console.error('Failed to update feedback:', error);
        // Re-throw the error so useOptimistic can catch it and revert state
        throw error;
    }
}
