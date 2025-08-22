import React from "react";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import toast from "react-hot-toast";

// Dynamic page receives params from the route
export default async function ProductPage({ params }) {
  const { id } = await params;
  console.log(id);

  const res = await fetch(`http://localhost:3001/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    console.log("error fetch data");
  }
  const product = await res.json();
  console.log(product);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl text-red-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="p-10 mx-auto sm:container">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <div className="flex flex-col md:flex-row items-center gap-5 ">
        <div>
          {/* Product Image */}
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-lg border mb-4"
            />
          )}
        </div>

        <div>
          {/* Product Details */}
          <div className="space-y-2 text-lg">
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Made In:</strong> {product.madeIn}
            </p>
            <p>
              <strong>RAM:</strong> {product.ram}
            </p>
            <p>
              <strong>ROM:</strong> {product.rom}
            </p>
            {product.colors?.length > 0 && (
              <p>
                <strong>Available Colors:</strong> {product.colors.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
