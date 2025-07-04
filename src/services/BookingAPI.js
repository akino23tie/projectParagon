import axios from "axios";

const API_URL = "https://osehidqtykjpezkyqwoz.supabase.co/rest/v1/booking";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZWhpZHF0eWtqcGV6a3lxd296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODkxNzQsImV4cCI6MjA2NTE2NTE3NH0.phA8FFoBMPJ76XmkpP-QaYBvvVjoysXR7Scal4j881A";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const teamAPI = {
  async fetchBooking() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createBooking(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async updateBooking(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data;
  },

  async deleteBooking(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    return response.data;
  },
  
};
