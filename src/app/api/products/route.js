import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsCollection = await dbConnect(
      collectionNames.PRODUCTS_COLLECTION
    );
    const products = await productsCollection.find().toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();

  const productsCollection = await dbConnect(
    collectionNames.PRODUCTS_COLLECTION
  );
  
  const result = await productsCollection.insertOne(body);
  return Response.json(result, { status: 201 });
}
