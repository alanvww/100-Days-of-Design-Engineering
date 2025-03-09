export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			day_feedback: {
				Row: {
					id: number;
					day_id: number;
					likes: number;
					dislikes: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: number;
					day_id: number;
					likes?: number;
					dislikes?: number;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: number;
					day_id?: number;
					likes?: number;
					dislikes?: number;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
