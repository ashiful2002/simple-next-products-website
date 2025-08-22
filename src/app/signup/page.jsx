"use client";
import React from "react";

import { registerUser } from "../actions/auth/registerUser";
import Link from "next/link";

const SignUpPage = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = { name, email, password };
    await registerUser(user);
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-[60vh]">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign Up</h1>
            <p>sign up as a new user</p>
          </div>
          <div className="card bg-base-100 w-sm md:w-md shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleFormSubmit} className="fieldset">
                <label className="label">Name</label>
                <input
                  name="name"
                  type=" text"
                  className="input"
                  placeholder="name"
                />
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <Link href="/signin" className="link link-hover">
                    Sign in
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;