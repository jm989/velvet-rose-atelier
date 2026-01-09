import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import birthdayBouquet from "@/assets/bouquet-birthday.jpg";
import valentinesBouquet from "@/assets/bouquet-valentines.jpg";
import babyShowerBouquet from "@/assets/bouquet-babyshower.jpg";
import cakeBouquet from "@/assets/cake-bouquet.jpg";
import sympathyBouquet from "@/assets/bouquet-sympathy.jpg";

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
];

const FeaturedBouquets = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="section-light py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-elegant mb-4 opacity-60">Our Collection</p>
          <h2 className="heading-section">Bouquets Made for All Occasions</h2>
        </motion.div>

        {/* Scroll Controls */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-3 border border-noir/20 transition-all duration-300 ${
              canScrollLeft
                ? "hover:bg-noir hover:text-oat"
                : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-3 border border-noir/20 transition-all duration-300 ${
              canScrollRight
                ? "hover:bg-noir hover:text-oat"
                : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Product Slider */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-shrink-0 w-64 snap-start product-card"
            >
              <Link to={`/flowers/${product.category}/${product.id}`}>
                <div className="product-image-circle mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="heading-card mb-2">{product.name}</h3>
                  <p className="text-noir/60 mb-4">£{product.price}</p>
                  <button className="btn-luxury-dark text-xs px-6 py-3">
                    Add to Bag
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBouquets;
