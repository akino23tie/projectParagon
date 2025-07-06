import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

const fallbackQuote = {
  q: "Success doesn't come from what you do once in a while, but from what you do consistently.",
  a: "Marie Forleo",
};

export default function Quote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = () => {
    setLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote({
          q: data.content,
          a: data.author,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat kutipan:", err);
        // Tampilkan fallback quote
        setQuote(fallbackQuote);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {quote && (
        <p className="text-gray-600 mt-1 italic">
          "{quote.q}" — <span className="font-medium">{quote.a}</span>
        </p>
      )}

      <button
        onClick={fetchQuote}
        disabled={loading}
        className={`flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 cursor-pointer transition duration-150 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <FiRefreshCcw className="mr-2" /> {loading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
}
