import Link from "next/link";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProductDetails from "./products/[id]/page";
import Products from "./products/page";

export default function Home() {
  return (
    <main>
      <section className="p-10 text-center bg-blue-100">
        <h2 className="text-3xl font-bold">Welcome to My Store</h2>
        <p>Find amazing products here</p>
      </section>
      <section className="p-10">
        <Products />
      </section>

    </main>
  );
}
