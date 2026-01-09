import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

import birthdayBouquet from "@/assets/bouquet-birthday.jpg";
import valentinesBouquet from "@/assets/bouquet-valentines.jpg";
import babyShowerBouquet from "@/assets/bouquet-babyshower.jpg";
import cakeBouquet from "@/assets/cake-bouquet.jpg";
import sympathyBouquet from "@/assets/bouquet-sympathy.jpg";

const categories = [
  { id: "all", label: "All" },
  { id: "luxury-bouquets", label: "Luxury Bouquets" },
  { id: "cake-bouquets", label: "Cake Bouquets" },
];

const products = [
  {
    id: "birthday-blush",
    name: "Birthday Blush",
    price: 85,
    image: birthdayBouquet,
    category: "luxury-bouquets",
  },
  {
    id: "eternal-romance",
    name: "Eternal Romance",
    price: 120,
    image: valentinesBouquet,
    category: "luxury-bouquets",
  },
  {
    id: "tender-welcome",
    name: "Tender Welcome",
    price: 95,
    image: babyShowerBouquet,
    category: "luxury-bouquets",
  },
  {
    id: "rose-cake-delight",
    name: "Rose Cake Delight",
    price: 150,
    image: cakeBouquet,
    category: "cake-bouquets",
  },
  {
    id: "peaceful-tribute",
    name: "Peaceful Tribute",
    price: 110,
    image: sympathyBouquet,
    category: "luxury-bouquets",
  },
  {
    id: "blushing-cake",
    name: "Blushing Cake",
    price: 165,
    image: cakeBouquet,
    category: "cake-bouquets",
  },
];

const Flowers = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-dark py-20 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="caption-elegant mb-4 opacity-60">Shop</p>
            <h1 className="heading-display mb-6">Our Collection</h1>
            <p className="body-refined opacity-80">
              Discover luxury bouquets and unique cake arrangements, each crafted to 
              celebrate life's precious moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="section-light py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-noir text-oat"
                    : "border border-noir/20 hover:bg-noir hover:text-oat"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="product-card"
              >
                <Link to={`/flowers/${product.category}/${product.id}`}>
                  <div className="aspect-square overflow-hidden mb-6 group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <p className="caption-elegant opacity-50 mb-2">
                      {product.category === "cake-bouquets"
                        ? "Cake Bouquet"
                        : "Luxury Bouquet"}
                    </p>
                    <h3 className="heading-card mb-2">{product.name}</h3>
                    <p className="text-noir/60 mb-4">£{product.price}</p>
                    <button className="btn-luxury-dark text-xs px-6 py-3">
                      View Details
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Flowers;
