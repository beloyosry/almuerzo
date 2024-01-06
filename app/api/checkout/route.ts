// api/checkout/route.ts

import { NextResponse } from "next/server";
import sanityClient from "@sanity/client";
import { OrderItem, User } from "@/config/inventory";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Make sure to use a write token here
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const { items, user, orderDate, totalPrice } = await request.json();

    // Create a new order document in Sanity
    const order = await client.create({
      _type: "orders",
      orderDate: orderDate as string,
      items: items as OrderItem[],
      user: user as User,
      totalPrice: totalPrice as string,
    });

    // Do any other necessary processing here

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error processing the order:", error);

    // Provide an error message in the NextResponse.error
    return new Response("Internal Server Error", { status: 500 });
  }
}
