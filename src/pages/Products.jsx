import { useEffect, useState } from "react";
import products from "../data/Products.json"; // Asumsikan file berada di src/data

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [productsData, setProductsData] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    setProductsData(products); // load dari JSON lokal
  }, []);

  useEffect(() => {
    fetch("https://zenquotes.io/api/random")
      .then((res) => res.json())
      .then((data) => setQuote(data[0]))
      .catch((err) => console.error("Failed to load quote:", err));
  }, []);

  const productCategories = ["All Products", "Skincare", "Haircare", "Makeup", "Bath & Body"];
  const filteredProducts = selectedCategory === "All Products" ? productsData : productsData.filter((product) => product.category === selectedCategory);

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Explore Our Products</h1>
        {quote ? (
          <p className="text-gray-700 max-w-2xl mx-auto italic">
            "{quote.q}" — <span className="font-medium">{quote.a}</span>
          </p>
        ) : (
          <p className="text-gray-400 animate-pulse">Loading quote...</p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {productCategories.map((category, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(category)}
            className={`btn rounded-full text-sm font-semibold px-6 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ${
              selectedCategory === category ? "bg-hijau text-white border-hijau glass" : "bg-base-100 text-black border-gray-300 hover:bg-hijau hover:text-white hover:border-hijau hover:shadow-xl"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">Product is not found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="border rounded-xl p-4 text-center hover:shadow-lg transition">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
              <h3 className="font-semibold text-sm">{product.title}</h3>
              <p className="text-xs text-gray-500">{product.brand}</p>
              <p className="text-base font-semibold mt-2">{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
