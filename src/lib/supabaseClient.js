
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || "")
  .replace(/\/rest\/v1\/?$/, "")
  .replace(/\/$/, "");

const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
