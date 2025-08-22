"use server";
import bcrypt from "bcrypt";

import dbConnect, { collectionNames } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNames.USERS);

  // validation
  const user = await userCollection.findOne({ email: payload.email });

  const { email, password, name } = payload;

  if (!email || !password) {
    return null;
  }

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    const result = await userCollection.insertOne(payload);
    result.insertedId = result.insertedId.toString();
    
    return result;
  } else {
    return null;
  }
};
