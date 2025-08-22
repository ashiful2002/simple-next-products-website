import dbConnect from "@/lib/dbConnect";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { ReactJsxRuntime } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

export default async function Products() {
  // Connect to the "productsCollection"
  // const serviceCollection = dbConnect("productsCollection");
  // const products = await serviceCollection.find({}).toArray();

  const res = await fetch("https://simple-next-products-website.vercel.app/api/products");
  const products = await res.json();
  if (!products) {
    return (
      <div>
        <p>Failed to fetch products</p>
      </div>
    );
  }
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            {/* Product Image */}
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                className="object-cover rounded mb-4"
              />
            )}

            {/* Product Info */}
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="font-bold mb-2">Price: ${item.price}</p>
            {/* Available Colors */}
            {item.colors?.length > 0 && (
              <p className="mb-2">Colors: {item.colors.join(", ")}</p>
            )}

            {/* Link to details page */}
            <Link
              href={`/products/${item._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      {/* <button onClick={() => signOut()}>Sign Out</button> */}
    </div>
  );
}
