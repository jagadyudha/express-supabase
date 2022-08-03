const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_ANON_KEY
);

module.exports = supabase;
