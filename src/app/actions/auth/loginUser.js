"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNames } from "@/lib/dbConnect";

export const loginUser = async ({ email, password }) => {
  const userCollection = await dbConnect(collectionNames.USERS);

  const user = await userCollection.findOne({ email });
  if (!user) {
    console.log("❌ User not found:", email);
    return null;
  }

  console.log("🔑 Found user:", user);

  // If password is hashed
  if (user.password) {
    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
      console.log("❌ Invalid password");
      return null;
    }
  } else {
    console.log("⚠️ No password field in DB doc");
    return null;
  }

  console.log("✅ Login success for:", email);

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
};
