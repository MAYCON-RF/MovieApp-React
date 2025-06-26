
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ayybhlnuulittwdycsnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5eWJobG51dWxpdHR3ZHljc25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTEyNzEsImV4cCI6MjA2NTkyNzI3MX0.dMZkaP1-NzyPr7xe-Ex-6-G1FU3vtUJxKLwHQEsJovA'; 



export const supabase = createClient(supabaseUrl, supabaseAnonKey);
