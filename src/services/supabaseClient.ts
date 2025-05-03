// import { SUPABASE_KEY, SUPABASE_URL } from '@env';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ylguuncnueronwhhdvbk.supabase.co';
const SUPABASE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZ3V1bmNudWVyb253aGhkdmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODU3NTQsImV4cCI6MjA2MTQ2MTc1NH0.nbiHUMCd9Mn6g7S4FfIZzcbXN3YPWloqpvBCYNmaziU';

if (!SUPABASE_URL || !SUPABASE_KEY) {
	throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
