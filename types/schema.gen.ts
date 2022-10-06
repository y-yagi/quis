export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      quiz_sets: {
        Row: {
          id: number;
          user_id: string;
          name: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          name?: string | null;
          created_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: number;
          user_id: string;
          quiz_set_id: number;
          question: string | null;
          answer: string | null;
          created_at: string;
          enabled: boolean;
        };
        Insert: {
          id?: number;
          user_id: string;
          quiz_set_id: number;
          question?: string | null;
          answer?: string | null;
          created_at?: string;
          enabled?: boolean;
        };
        Update: {
          id?: number;
          user_id?: string;
          quiz_set_id?: number;
          question?: string | null;
          answer?: string | null;
          created_at?: string;
          enabled?: boolean;
        };
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
  };
}

