import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://eqncpdwlkhpuemqxutxa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmNwZHdsa2hwdWVtcXh1dHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MjczNzMsImV4cCI6MjAyNTAwMzM3M30.qkTqz4qCHE1z9ekQ19COZJ_as5q1eU4P1YNqIrZeYOk",
  {}
)