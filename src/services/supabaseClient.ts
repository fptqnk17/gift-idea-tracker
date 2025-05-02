import { SUPABASE_KEY, SUPABASE_URL } from '@env';
import { createClient } from '@supabase/supabase-js';

if (!SUPABASE_URL || !SUPABASE_KEY) {
	throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
