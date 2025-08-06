const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bbmdcioziifdgwrmhcjc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibWRjaW96aWlmZGd3cm1oY2pjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMyMDg4OCwiZXhwIjoyMDY5ODk2ODg4fQ.UykYaHGJF7y6YD7kxR8Tygup7nvRV-5Yd71ePZfpCwg';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };