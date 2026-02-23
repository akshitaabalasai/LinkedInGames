import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Singleton Supabase client for frontend
let supabaseClient: any = null;

export function createClient() {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(supabaseUrl, publicAnonKey);
  }
  return supabaseClient;
}