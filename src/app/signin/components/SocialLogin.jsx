"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const SocialLogin = () => {
  const router = useRouter();
  const session = useSession();
  const handleSocialClick = async (providerName) => {
    const result = await signIn(providerName, { redirect: false });

    console.log(result);
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      toast.success("user login successful");
      router.push("/");
    }
  }, [session.status]);

  return (
    <div className="flex items-center justify-center gap-4 text-2xl my-2">
      <button onClick={() => handleSocialClick("google")}>
        <FaGoogle />
      </button>
      <button onClick={() => handleSocialClick("github")}>
        <FaGithub />
      </button>
    </div>
  );
};

export default SocialLogin;
