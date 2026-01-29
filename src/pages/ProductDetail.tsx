import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, ChevronDown, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import birthdayBouquet from "@/assets/bouquet-birthday.jpg";
import valentinesBouquet from "@/assets/bouquet-valentines.jpg";
import babyShowerBouquet from "@/assets/bouquet-babyshower.jpg";
import cakeBouquet from "@/assets/cake-bouquet.jpg";
import sympathyBouquet from "@/assets/bouquet-sympathy.jpg";

const products: Record<string, any> = {
  "birthday-blush": {
    name: "Birthday Blush",
    price: 85,
    image: birthdayBouquet,
    category: "luxury-bouquets",
    description:
      "A delicate arrangement of soft pink roses and white ranunculus, wrapped in premium cream paper with a satin ribbon. Perfect for celebrating birthdays with elegance and warmth.",
  },
  "eternal-romance": {
    name: "Eternal Romance",
    price: 120,
    image: valentinesBouquet,
    category: "luxury-bouquets",
    description:
      "Deep red roses surrounded by baby's breath, wrapped in luxurious black paper with a gold ribbon. The ultimate expression of romantic love.",
  },
  "tender-welcome": {
    name: "Tender Welcome",
    price: 95,
    image: babyShowerBouquet,
    category: "luxury-bouquets",
    description:
      "Soft pastel blooms in pink and white, delicately arranged to welcome new beginnings. Wrapped in cream tissue with a blush ribbon.",
  },
  "rose-cake-delight": {
    name: "Rose Cake Delight",
    price: 150,
    image: cakeBouquet,
    category: "cake-bouquets",
    description:
      "A stunning combination of fresh pink roses arranged around a real frosted cake. The perfect centrepiece for celebrations.",
  },
  "peaceful-tribute": {
    name: "Peaceful Tribute",
    price: 110,
    image: sympathyBouquet,
    category: "luxury-bouquets",
    description:
      "Elegant white lilies and roses arranged with care and respect. A thoughtful way to express sympathy and comfort.",
  },
  "blushing-cake": {
    name: "Blushing Cake",
    price: 165,
    image: cakeBouquet,
    category: "cake-bouquets",
    description:
      "Pink and white peonies surrounding a decadent cake, creating an unforgettable gift for any special occasion.",
  },
};

const sizeGuide = [
  { size: "Regular", cakeSize: "4 inch (serves 8–10)", roseCount: 25 },
  { size: "Large", cakeSize: "6 inch (serves 15–18)", roseCount: 30 },
  { size: "Deluxe", cakeSize: "8 inch (serves 25–30)", roseCount: 50 },
];

const recommendedProducts = ["birthday-blush", "eternal-romance", "tender-welcome"];

const ProductDetail = () => {
  const { productId, category } = useParams();
  const product = products[productId || ""];
  const isCakeBouquet = category === "cake-bouquets";

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Regular");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [personalization, setPersonalization] = useState({
    cakeFlavour: "",
    wrapColour: "",
    cakeTopper: "",
    giftMessage: "",
  });

  const handleCheckout = async () => {
    if (!product || !productId) return;
    
    setIsCheckingOut(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: product.name,
          price: product.price * 100, // Convert to pence
          quantity,
          metadata: {
            productId,
            category: category || "",
            size: isCakeBouquet ? selectedSize : undefined,
            cakeFlavour: personalization.cakeFlavour || undefined,
            wrapColour: personalization.wrapColour || undefined,
            cakeTopper: personalization.cakeTopper || undefined,
            giftMessage: personalization.giftMessage || undefined,
          },
        },
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="section-light py-20 text-center">
          <h1 className="heading-section">Product not found</h1>
          <Link to="/flowers" className="btn-luxury-dark mt-8 inline-block">
            Back to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="section-light py-4 border-b border-noir/10">
        <div className="container mx-auto px-6">
          <nav className="text-sm opacity-60">
            <Link to="/flowers" className="hover:opacity-100">
              Flowers
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product */}
      <section className="section-light py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="caption-elegant opacity-50 mb-2">
                {isCakeBouquet ? "Cake Bouquet" : "Luxury Bouquet"}
              </p>
              <h1 className="heading-section mb-4">{product.name}</h1>
              <p className="text-2xl font-serif mb-6">£{product.price}</p>

              {/* Size Selection for Cake Bouquets */}
              {isCakeBouquet && (
                <div className="mb-6">
                  <label className="caption-elegant block mb-3">Size</label>
                  <div className="flex gap-3">
                    {sizeGuide.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`px-4 py-2 text-sm transition-all ${
                          selectedSize === s.size
                            ? "bg-noir text-oat"
                            : "border border-noir/20 hover:bg-noir hover:text-oat"
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalization */}
              <div className="space-y-4 mb-6">
                <p className="caption-elegant">Personalisation</p>

                {isCakeBouquet && (
                  <>
                    <input
                      type="text"
                      placeholder="Cake Flavour (e.g., Vanilla, Chocolate)"
                      value={personalization.cakeFlavour}
                      onChange={(e) =>
                        setPersonalization({ ...personalization, cakeFlavour: e.target.value })
                      }
                      className="input-luxury"
                    />
                    <input
                      type="text"
                      placeholder="Cake Topper (optional)"
                      value={personalization.cakeTopper}
                      onChange={(e) =>
                        setPersonalization({ ...personalization, cakeTopper: e.target.value })
                      }
                      className="input-luxury"
                    />
                  </>
                )}

                <input
                  type="text"
                  placeholder="Wrap Colour (optional)"
                  value={personalization.wrapColour}
                  onChange={(e) =>
                    setPersonalization({ ...personalization, wrapColour: e.target.value })
                  }
                  className="input-luxury"
                />

                <textarea
                  placeholder="Complimentary personalised gift card message"
                  value={personalization.giftMessage}
                  onChange={(e) =>
                    setPersonalization({ ...personalization, giftMessage: e.target.value })
                  }
                  className="input-luxury min-h-[100px] resize-none"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="caption-elegant">Quantity</span>
                <div className="flex items-center border border-noir/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-noir/5 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-noir/5 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Bag */}
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-luxury-dark w-full mb-8 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>

              {/* Accordions */}
              <div className="border-t border-noir/10">
                {/* Description */}
                <div className="border-b border-noir/10">
                  <button
                    onClick={() => toggleAccordion("description")}
                    className="w-full py-4 flex justify-between items-center"
                  >
                    <span className="caption-elegant">Description</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        openAccordion === "description" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "description" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pb-4"
                    >
                      <p className="body-refined text-noir/70">{product.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Delivery & Refunds */}
                <div className="border-b border-noir/10">
                  <button
                    onClick={() => toggleAccordion("delivery")}
                    className="w-full py-4 flex justify-between items-center"
                  >
                    <span className="caption-elegant">Delivery & Refunds</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        openAccordion === "delivery" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "delivery" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pb-4 space-y-2 text-noir/70"
                    >
                      <p>Standard delivery: 2-3 business days</p>
                      <p>Express delivery: Next day (order before 2pm)</p>
                      <p>Due to the perishable nature of our products, we cannot offer refunds. Please contact us if there are any issues with your order.</p>
                    </motion.div>
                  )}
                </div>

                {/* FAQs */}
                <div className="border-b border-noir/10">
                  <button
                    onClick={() => toggleAccordion("faq")}
                    className="w-full py-4 flex justify-between items-center"
                  >
                    <span className="caption-elegant">FAQs</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        openAccordion === "faq" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === "faq" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pb-4 space-y-4 text-noir/70"
                    >
                      <div>
                        <p className="font-medium">How long do the flowers last?</p>
                        <p>With proper care, our bouquets last 7-10 days.</p>
                      </div>
                      <div>
                        <p className="font-medium">Can I choose specific flowers?</p>
                        <p>Contact us for bespoke arrangements.</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Size Guide for Cake Bouquets */}
                {isCakeBouquet && (
                  <div className="border-b border-noir/10">
                    <button
                      onClick={() => toggleAccordion("size")}
                      className="w-full py-4 flex justify-between items-center"
                    >
                      <span className="caption-elegant">Size Guide</span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${
                          openAccordion === "size" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordion === "size" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pb-4"
                      >
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-noir/10">
                              <th className="py-2 text-left font-medium">Size</th>
                              <th className="py-2 text-left font-medium">Cake Size</th>
                              <th className="py-2 text-left font-medium">Rose Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeGuide.map((s) => (
                              <tr key={s.size} className="border-b border-noir/5">
                                <td className="py-2">{s.size}</td>
                                <td className="py-2 text-noir/70">{s.cakeSize}</td>
                                <td className="py-2 text-noir/70">{s.roseCount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="section-dark py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="heading-section text-center mb-12">You May Also Like</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {recommendedProducts
              .filter((id) => id !== productId)
              .slice(0, 3)
              .map((id, index) => {
                const p = products[id];
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="product-card"
                  >
                    <Link to={`/flowers/${p.category}/${id}`}>
                      <div className="aspect-square overflow-hidden mb-4 group">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="heading-card mb-1">{p.name}</h3>
                        <p className="opacity-60">£{p.price}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
