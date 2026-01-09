import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import brandImage from "@/assets/brand-craftsmanship.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-dark py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="caption-elegant mb-4 opacity-60">Our Story</p>
            <h1 className="heading-display mb-6">About YoursTrulyS</h1>
            <p className="body-refined opacity-80">
              Where every petal tells a story of love, care, and exceptional craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-light py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={brandImage}
                  alt="Our florist at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-section mb-6">A Labour of Love</h2>
              <div className="space-y-5 body-refined text-noir/80">
                <p>
                  YoursTrulyS was born from a simple belief: that flowers should 
                  feel as special as the moments they celebrate. What began as a 
                  passion project has blossomed into a boutique floral studio 
                  dedicated to creating extraordinary arrangements.
                </p>
                <p>
                  We approach each bouquet as a work of art. From selecting the 
                  freshest seasonal blooms to the final ribbon tie, every step 
                  is executed with precision and care. Our arrangements aren't 
                  just beautiful—they're meaningful.
                </p>
                <p>
                  Whether you're marking a milestone, expressing gratitude, or 
                  simply brightening someone's day, we believe in the power of 
                  flowers to create lasting memories.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-dark py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="caption-elegant mb-4 opacity-60">What We Stand For</p>
            <h2 className="heading-section">Our Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Quality",
                description:
                  "Only the finest blooms make it into our arrangements. We work with trusted growers who share our commitment to excellence.",
              },
              {
                title: "Craftsmanship",
                description:
                  "Every bouquet is handcrafted with meticulous attention to detail. We believe in the art of floristry and honor traditional techniques.",
              },
              {
                title: "Connection",
                description:
                  "Flowers speak when words aren't enough. We help you express love, gratitude, sympathy, and joy through thoughtful arrangements.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="heading-card mb-4">{value.title}</h3>
                <p className="body-refined opacity-70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-light py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-6">Ready to Experience the Difference?</h2>
            <p className="body-refined text-noir/70 mb-8 max-w-xl mx-auto">
              Explore our collection of luxury bouquets and cake arrangements, 
              each one crafted to create an unforgettable moment.
            </p>
            <a href="/flowers" className="btn-luxury-dark">
              Shop Our Collection
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
