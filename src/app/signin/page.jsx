"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import SocialLogin from "./components/SocialLogin";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      setMessage("Please fill in both fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (response.ok) {
        router.push("/");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      alert("Authorization Failed");
    }
    setLoading(false);
  };

  return (
    <div className="hero bg-base-200 min-h-[60vh]">
      <div className="hero-content flex-col">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold">Sign In</h1>
          <p className="text-gray-600">Welcome back! Please login.</p>
        </div>

        <div className="card bg-base-100 w-full max-w-md shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                />
              </div>

              {message && (
                <p className="text-sm text-red-500 mt-2">{message}</p>
              )}

              <div className="flex justify-between items-center mt-4">
                <Link href="/signup" className="link link-hover text-blue-500">
                  Don’t have an account? Sign up
                </Link>
                <button
                  type="submit"
                  className={`btn btn-neutral ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
