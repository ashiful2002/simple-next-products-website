import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-[40vh]"
        style={{
          backgroundImage:
            "url(https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F57517%2Fredmi-note-14.jpg&w=640&q=75)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-orange-500/60">Faraz</h1>
            <p className="mb-5">
              Number one phone selling platform in Bangladesh right now. visit
              here and find the best smartphone you need
            </p>
            <Link href="/products" className="btn btn-primary">
              Browse now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
