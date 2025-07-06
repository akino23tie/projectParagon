import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    category: "Skincare",
  });
  const [editId, setEditId] = useState(null);
  const [quote, setQuote] = useState(null);

  const productCategories = ["All Products", "Skincare", "Haircare", "Makeup", "Bath & Body"];

  // Filter data sesuai kategori
  const filteredProducts = selectedCategory === "All Products" ? products : products.filter((p) => p.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

  // Fetch product dari Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Fetch error:", error.message);
      return;
    }

    console.log("✅ Products fetched:", data);
    setProducts(data);
  };

  // Fetch produk saat pertama load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch quote motivasi dari API eksternal
  useEffect(() => {
    fetch("https://api.api-ninjas.com/v1/quotes")
      .then((res) => res.json())
      .then((data) => setQuote(data[0]))
      .catch((err) => console.error("Failed to load quote:", err));
  }, []);

  // Debugging state
  useEffect(() => {
    console.log("📦 State: products", products);
    console.log("🔍 Filtered:", filteredProducts);
  }, [products, filteredProducts]);

  // Submit form
  const handleSubmit = async () => {
    if (!formData.title || !formData.brand || !formData.price || !formData.category) {
      alert("Please complete all fields.");
      return;
    }

    const payload = {
      ...formData,
      category: formData.category.trim(),
    };

    console.log("📝 Form Data yang akan dikirim:", payload);

    if (editId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editId);
      if (error) {
        console.error("❌ Update error:", error.message);
        return;
      }
    } else {
      const { data, error } = await supabase.from("products").insert([payload]);
      if (error) {
        console.error("❌ Insert error:", error.message);
        return;
      }
      console.log("✅ Insert berhasil:", data);
    }

    // Reset form
    setFormData({
      title: "",
      brand: "",
      price: "",
      category: "Skincare",
    });
    setEditId(null);
    setSelectedCategory("All Products");
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      brand: product.brand,
      price: product.price,
      category: product.category,
    });
    setEditId(product.id);
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Product Management
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto border rounded-lg p-6 mb-12 shadow">
        <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Product" : "Add Product"}</h2>
        <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" className="input input-bordered w-full mb-2" />
        <input value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} placeholder="Brand" className="input input-bordered w-full mb-2" />
        <input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" className="input input-bordered w-full mb-2" />
        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="select select-bordered w-full mb-4">
          {productCategories.slice(1).map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          className="btn w-full text-white"
          style={{
            backgroundColor: "var(--color-hijau)",
            borderColor: "var(--color-hijau)",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#f87171")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "var(--color-hijau)")}
        >
          {editId ? "Update" : "Add"} Product
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {productCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`btn rounded-full text-sm font-semibold px-6 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ${
              selectedCategory === cat ? "bg-hijau text-white border-hijau glass" : "bg-base-100 text-black border-gray-300 hover:bg-hijau hover:text-white hover:border-hijau hover:shadow-xl"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">Product is not found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="btn btn-xs btn-warning">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="btn btn-xs btn-error">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
