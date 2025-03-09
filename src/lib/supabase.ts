import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Public URL is still available on the client side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

// Create a server-side only Supabase client for server components and API routes
export const createServerSupabaseClient = () => {
	// This key should only be available server-side
	const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

	if (!supabaseUrl || !supabaseKey) {
		throw new Error('Supabase URL and Anon Key are required');
	}

	return createClient<Database>(supabaseUrl, supabaseKey);
};

// For backward compatibility
export const createSupabaseClient = createServerSupabaseClient;

// Helper function to get feedback for a specific day - server side
export async function getDayFeedback(dayId: number) {
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
}

// Type definitions for feedback data
export interface DayFeedback {
	day_id: number;
	likes: number;
	dislikes: number;
}
