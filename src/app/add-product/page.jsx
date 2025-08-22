"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    madeIn: "",
    ram: "",
    rom: "",
    price: "",
    colors: "",
  });

  if (status === "loading") return <p className="p-5">Loading...</p>;
  if (!session) {
    router.push("/signin");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
      colors: form.colors.split(",").map((c) => c.trim()),
    };

    const res = await fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      alert("✅ Product added!");
      router.push("/products");
    } else {
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">➕ Add New Product</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            {/* Title */}
            <label className="form-control w-full">
              <span className="label-text">Product Title</span>
              <input
                type="text"
                placeholder="Infinix Note 50"
                className="input input-bordered w-full"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>

            {/* Description */}
            <label className="form-control w-full">
              <span className="label-text">Description</span>
              <textarea
                placeholder="Enter description or URL"
                className="textarea textarea-bordered w-full"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              ></textarea>
            </label>

            {/* Image */}
            <label className="form-control w-full">
              <span className="label-text">Image URL</span>
              <input
                type="url"
                placeholder="https://example.com/product.jpg"
                className="input input-bordered w-full"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
              />
            </label>

            {/* Category + MadeIn */}
            <div className="grid grid-cols-2 gap-4">
              <label className="form-control w-full">
                <span className="label-text">Category</span>
                <input
                  type="text"
                  placeholder="Smartphone"
                  className="input input-bordered w-full"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Made In</span>
                <input
                  type="text"
                  placeholder="China"
                  className="input input-bordered w-full"
                  value={form.madeIn}
                  onChange={(e) =>
                    setForm({ ...form, madeIn: e.target.value })
                  }
                />
              </label>
            </div>

            {/* RAM + ROM */}
            <div className="grid grid-cols-2 gap-4">
              <label className="form-control w-full">
                <span className="label-text">RAM (GB)</span>
                <input
                  type="number"
                  placeholder="8"
                  className="input input-bordered w-full"
                  value={form.ram}
                  onChange={(e) => setForm({ ...form, ram: e.target.value })}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">ROM (GB)</span>
                <input
                  type="number"
                  placeholder="256"
                  className="input input-bordered w-full"
                  value={form.rom}
                  onChange={(e) => setForm({ ...form, rom: e.target.value })}
                />
              </label>
            </div>

            {/* Price */}
            <label className="form-control w-full">
              <span className="label-text">Price ($)</span>
              <input
                type="number"
                placeholder="229"
                className="input input-bordered w-full"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </label>

            {/* Colors */}
            <label className="form-control w-full">
              <span className="label-text">Colors (comma separated)</span>
              <input
                type="text"
                placeholder="red, green, yellow"
                className="input input-bordered w-full"
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
              />
            </label>

            {/* Submit */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
