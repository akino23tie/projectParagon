// teamAPI.js (cuplikan)
const API_URL = "https://osehidqtykjpezkyqwoz.supabase.co/rest/v1/team";

const headers = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZWhpZHF0eWtqcGV6a3lxd296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODkxNzQsImV4cCI6MjA2NTE2NTE3NH0.phA8FFoBMPJ76XmkpP-QaYBvvVjoysXR7Scal4j881A",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZWhpZHF0eWtqcGV6a3lxd296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODkxNzQsImV4cCI6MjA2NTE2NTE3NH0.phA8FFoBMPJ76XmkpP-QaYBvvVjoysXR7Scal4j881A",
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const teamAPI = {
  // Ambil seluruh data team
  fetchTeam: async () => {
    const res = await fetch(API_URL, { headers });
    if (!res.ok) throw await res.json();
    return await res.json();
  },

  // Buat data team baru
  createTeam: async (payload) => {
    const cleanPayload = { ...payload };
    delete cleanPayload.id; // hapus id agar auto-increment aktif

    console.log("Creating team with payload:", cleanPayload);

    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify([cleanPayload]), // penting: dalam bentuk array!
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Create error:", error);
      throw error;
    }

    const result = await res.json();
    return result[0]; // karena Supabase balikin array
  },

  // Update data team berdasarkan id
  updateTeam: async (id, payload) => {
    const res = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  },

  // Hapus data team berdasarkan id
  deleteTeam: async (id) => {
    const res = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) throw await res.json();
  },
};
