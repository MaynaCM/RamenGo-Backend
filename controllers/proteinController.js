const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://pqftztsntrlkzyavzzun.supabase.co/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZnR6dHNudHJsa3p5YXZ6enVuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjk0NjA4MSwiZXhwIjoyMDMyNTIyMDgxfQ.SPDoD4GKaDSuWBPT4L92gCKchKC5opmv4AD4_WeP74Q";
const supabase = createClient(supabaseUrl, supabaseKey);

exports.getProteins = async (req, res) => {
    const { data, error } = await supabase.from('Protein').select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json(data);
};
