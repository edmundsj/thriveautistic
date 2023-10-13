import {Database} from "@/supabase";

export type Insert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
