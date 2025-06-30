import articles from "../data/Articles.json";

export default function Article() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Article Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="p-4 border rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 text-sm mb-1">{article.date}</p>
            <p className="text-gray-800 text-sm">{article.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
