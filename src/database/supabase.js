import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hblvjautrtyzfvjrfmxv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibHZqYXV0cnR5emZ2anJmbXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2Mjg3ODQsImV4cCI6MjAwMDIwNDc4NH0.KU-5Fzc3X0EWE3i7ZhSxKcgbPOvOwL8rTDx-c0f307Q';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
