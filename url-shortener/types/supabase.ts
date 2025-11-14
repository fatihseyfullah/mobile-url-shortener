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
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string | null;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          name?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          name?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
      };
      urls: {
        Row: {
          id: string;
          user_id: string | null;
          original_url: string;
          short_code: string;
          expires_at: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          original_url: string;
          short_code: string;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          original_url?: string;
          short_code?: string;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      analytics: {
        Row: {
          id: number;
          url_id: string;
          clicked_at: string;
          referer: string | null;
          user_agent: string | null;
          ip_address: string | null;
        };
        Insert: {
          id?: number;
          url_id: string;
          clicked_at?: string;
          referer?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
        };
        Update: {
          id?: number;
          url_id?: string;
          clicked_at?: string;
          referer?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
        };
      };
      admin_settings: {
        Row: {
          id: number;
          maintenance_mode: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          maintenance_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          maintenance_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
