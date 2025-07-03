import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://goibupgxsnbvhikvpqyb.supabase.co"; // url project
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvaWJ1cGd4c25idmhpa3ZwcXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDA5NjAsImV4cCI6MjA2NzExNjk2MH0.5JDvALxD5IAyeUaLHrovMH0-y-t5w1jj-KCNTe9Jc9Y"; // anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
