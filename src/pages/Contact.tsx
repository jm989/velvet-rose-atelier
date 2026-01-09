import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

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
            <p className="caption-elegant mb-4 opacity-60">Get in Touch</p>
            <h1 className="heading-display mb-6">Contact Us</h1>
            <p className="body-refined opacity-80">
              We'd love to hear from you. Whether you have a question about our 
              products or need a bespoke arrangement, our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-light py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-section mb-8">Send a Message</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 border border-noir/10 text-center"
                >
                  <h3 className="heading-card mb-4">Thank You</h3>
                  <p className="body-refined text-noir/70">
                    We've received your message and will get back to you within 
                    24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="input-luxury"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input-luxury"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="input-luxury"
                  />

                  <textarea
                    placeholder="Your Message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="input-luxury resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxury-dark w-full disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="heading-section mb-8">Contact Details</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail size={24} className="flex-shrink-0 opacity-60" />
                  <div>
                    <p className="caption-elegant mb-1">Email</p>
                    <a
                      href="mailto:hello@yourstrulys.com"
                      className="body-refined link-underline"
                    >
                      hello@yourstrulys.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={24} className="flex-shrink-0 opacity-60" />
                  <div>
                    <p className="caption-elegant mb-1">Phone</p>
                    <a href="tel:+447123456789" className="body-refined link-underline">
                      +44 (0) 7123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin size={24} className="flex-shrink-0 opacity-60" />
                  <div>
                    <p className="caption-elegant mb-1">Studio</p>
                    <p className="body-refined text-noir/70">
                      123 Floral Lane<br />
                      London, W1K 3AB
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-noir/10">
                <p className="caption-elegant mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-noir/20 hover:bg-noir hover:text-oat transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-noir/20 hover:bg-noir hover:text-oat transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-4">Bespoke Arrangements</h2>
            <p className="body-refined opacity-70 max-w-xl mx-auto mb-8">
              Need something truly unique? We offer bespoke floral designs for 
              weddings, events, and special occasions. Get in touch to discuss 
              your vision.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
