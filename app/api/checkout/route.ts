import { NextRequest, NextResponse } from "next/server";
import { CartProductProps } from "@/lib/typings";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type RequestData = {
  cartItems: CartProductProps[];
  email: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: RequestData = await req.json();

    const transformedCart = data.cartItems.map((item) => ({
      quantity: item.itemQty,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: transformedCart,
      mode: "payment",
      cancel_url: "http://localhost:3000/cancelled",
      success_url: "http://localhost:3000/success",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.log(err);
  }
}
