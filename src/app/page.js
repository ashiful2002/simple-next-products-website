import Link from "next/link";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProductDetails from "./products/[id]/page";
import Products from "./products/page";
import Hero from "./Section/Hero";
import CarouselHome from "./Section/CarouselHome";

export const metadata = {
  title: "Hone",
  description: "faraz numbr 1 e commerz ",
};
export default function Home() {
  return (
    <main>
      <section className="p-10 ">
        <CarouselHome />
      </section>
      <section className="p-10">
        <Products />
      </section>
    </main>
  );
}
