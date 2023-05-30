import { createClient } from '@supabase/supabase-js';
import ConfigData from '../config/config.json';

const supabaseUrl = ConfigData.API.URL;
const supabaseKey = ConfigData.API.KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
