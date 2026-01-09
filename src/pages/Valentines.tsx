import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import valentinesBouquet from "@/assets/bouquet-valentines.jpg";
import cakeBouquet from "@/assets/cake-bouquet.jpg";

const valentinesProducts = [
  {
    id: "eternal-romance",
    name: "Eternal Romance",
    price: 120,
    image: valentinesBouquet,
    category: "luxury-bouquets",
  },
  {
    id: "rose-cake-delight",
    name: "Rose Cake Delight",
    price: 150,
    image: cakeBouquet,
    category: "cake-bouquets",
  },
];

const Valentines = () => {
  return (
    <Layout>
      {/* Hero - Ruby theme */}
      <section className="section-ruby py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="caption-elegant mb-4 opacity-70">14th February</p>
            <h1 className="heading-display mb-6">Valentine's Day</h1>
            <p className="body-refined opacity-90 max-w-xl mx-auto">
              Express your deepest affections with our exclusive Valentine's collection. 
              Each arrangement crafted to capture the essence of romance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products - Rose Ivory theme */}
      <section className="section-rose py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="caption-elegant mb-4 opacity-60">Limited Edition</p>
            <h2 className="heading-section">The Romance Collection</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {valentinesProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    <h3 className="heading-card mb-2">{product.name}</h3>
                    <p className="text-ruby/60 mb-4">£{product.price}</p>
                    <button className="btn-ruby text-xs px-6 py-3">
                      View Details
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Section - Ruby theme */}
      <section className="section-ruby py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="heading-section mb-6">Make It Personal</h2>
            <p className="body-refined opacity-80 mb-8">
              Every Valentine's order includes a complimentary handwritten card. 
              Share your message and we'll ensure your words are presented beautifully 
              alongside your flowers.
            </p>
            <Link to="/flowers" className="inline-block px-8 py-4 bg-rose-ivory text-ruby text-sm uppercase tracking-wider transition-all duration-300 hover:bg-ruby hover:text-rose-ivory border border-rose-ivory">
              Shop All Flowers
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Delivery Info - Rose Ivory theme */}
      <section className="section-rose py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Free Delivery",
                description: "On all Valentine's orders over £100",
              },
              {
                title: "Guaranteed Delivery",
                description: "Order by Feb 12th for Valentine's arrival",
              },
              {
                title: "Premium Packaging",
                description: "Gift-ready presentation included",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="heading-card mb-2">{item.title}</h3>
                <p className="text-ruby/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Valentines;
