import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import brandImage from "@/assets/brand-craftsmanship.jpg";

const BrandSection = () => {
  return (
    <section className="section-light py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="caption-elegant mb-4 opacity-60">Our Promise</p>
            <h2 className="heading-section mb-6">
              Crafted with Intention, Delivered with Care
            </h2>
            <div className="space-y-4 body-refined text-noir/80">
              <p>
                Every bouquet from YoursTrulyS begins with a vision — to transform 
                the finest blooms into arrangements that speak the language of the heart.
              </p>
              <p>
                We source our flowers from trusted growers who share our commitment 
                to quality and sustainability. Each stem is selected at peak freshness, 
                ensuring your gift arrives in perfect condition.
              </p>
              <p>
                From intimate gestures to grand celebrations, we understand that 
                flowers carry meaning beyond their beauty. That's why we take such 
                care in every detail.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/about" className="btn-luxury-dark">
                Our Story
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={brandImage}
                alt="Florist crafting a bouquet"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-noir/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
