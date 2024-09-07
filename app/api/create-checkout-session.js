// pages/api/create-checkout-session.js
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { plan, isAnnual } = req.body;
      const priceId = getPriceId(plan, isAnnual);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
      });

      res.status(200).json(session.id);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getPriceId = (plan, isAnnual) => {
  const prices = {
    Basic: {
      monthly: "price_1234567890abcdef", // Replace with your actual Stripe price IDs
      annual: "price_abcdef1234567890",
    },
    Standard: {
      monthly: "price_1234567890abcdef",
      annual: "price_abcdef1234567890",
    },
    Premium: {
      monthly: "price_1234567890abcdef",
      annual: "price_abcdef1234567890",
    },
  };

  return isAnnual ? prices[plan].annual : prices[plan].monthly;
};
