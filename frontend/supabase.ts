export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stories: {
        Row: {
          author: string
          created_at: string
          id: number
          link: string | null
          strategy: number | null
          text: string | null
          title: string | null
        }
        Insert: {
          author: string
          created_at?: string
          id?: number
          link?: string | null
          strategy?: number | null
          text?: string | null
          title?: string | null
        }
        Update: {
          author?: string
          created_at?: string
          id?: number
          link?: string | null
          strategy?: number | null
          text?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stories_strategy_fkey"
            columns: ["strategy"]
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          }
        ]
      }
      strategies: {
        Row: {
          author: string | null
          created_at: string
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategies_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      strategy_tags: {
        Row: {
          created_at: string
          id: number
          strategy: number
          tag: number
        }
        Insert: {
          created_at?: string
          id?: number
          strategy: number
          tag: number
        }
        Update: {
          created_at?: string
          id?: number
          strategy?: number
          tag?: number
        }
        Relationships: [
          {
            foreignKeyName: "strategy_tags_strategy_fkey"
            columns: ["strategy"]
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_tags_tag_fkey"
            columns: ["tag"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          author: string
          created_at: string
          id: number
          strategy: number
          value: number | null
        }
        Insert: {
          author: string
          created_at?: string
          id?: number
          strategy: number
          value?: number | null
        }
        Update: {
          author?: string
          created_at?: string
          id?: number
          strategy?: number
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_strategy_fkey"
            columns: ["strategy"]
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
