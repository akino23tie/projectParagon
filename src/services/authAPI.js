import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://osehidqtykjpezkyqwoz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZWhpZHF0eWtqcGV6a3lxd296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODkxNzQsImV4cCI6MjA2NTE2NTE3NH0.phA8FFoBMPJ76XmkpP-QaYBvvVjoysXR7Scal4j881A"; // tetap gunakan anon/public key

export const supabase = createClient(supabaseUrl, supabaseKey);

//  Fungsi register user (simpan ke tabel `users`)
export async function registerUser(email, password, name = "", avatar_url = "") {
  const { data, error } = await supabase.from("users").insert([{ email, password, name, avatar_url }]);

  return { data, error };
}

//  Fungsi login user (cek email + password dari tabel `users`)
export async function loginUser(email, password) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).eq("password", password).single();

  return { data, error };
}

//  Fungsi untuk ambil password berdasarkan email (Forgot Password)
export async function getPasswordByEmail(email) {
  const { data, error } = await supabase.from("users").select("password").eq("email", email).single();

  return { data, error };
}

//  Fungsi untuk ambil data lengkap user by email
export async function getUserByEmail(email) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

  return { data, error };
}
