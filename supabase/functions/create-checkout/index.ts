import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CheckoutRequest {
  productName: string;
  price: number; // in pence
  quantity: number;
  image?: string;
  metadata?: {
    productId: string;
    category: string;
    size?: string;
    cakeFlavour?: string;
    wrapColour?: string;
    cakeTopper?: string;
    giftMessage?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { productName, price, quantity, image, metadata }: CheckoutRequest = await req.json();

    if (!productName || !price || !quantity) {
      throw new Error("Missing required fields: productName, price, quantity");
    }

    // Build product description from metadata
    let description = "";
    if (metadata) {
      const parts = [];
      if (metadata.size) parts.push(`Size: ${metadata.size}`);
      if (metadata.cakeFlavour) parts.push(`Cake Flavour: ${metadata.cakeFlavour}`);
      if (metadata.wrapColour) parts.push(`Wrap Colour: ${metadata.wrapColour}`);
      if (metadata.cakeTopper) parts.push(`Cake Topper: ${metadata.cakeTopper}`);
      if (metadata.giftMessage) parts.push(`Gift Message: ${metadata.giftMessage}`);
      description = parts.join(" | ");
    }

    const origin = req.headers.get("origin") || "https://velvet-rose-atelier.lovable.app";

    // Create checkout session with price_data for dynamic pricing
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: productName,
              description: description || undefined,
              images: image ? [image] : undefined,
            },
            unit_amount: price,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
      metadata: metadata ? {
        productId: metadata.productId,
        category: metadata.category,
        size: metadata.size || "",
        cakeFlavour: metadata.cakeFlavour || "",
        wrapColour: metadata.wrapColour || "",
        cakeTopper: metadata.cakeTopper || "",
        giftMessage: metadata.giftMessage || "",
      } : undefined,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
