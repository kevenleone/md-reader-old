import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ilabszhgmntixutkhbmq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
