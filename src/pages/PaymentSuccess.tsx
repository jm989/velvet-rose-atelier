import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";

const PaymentSuccess = () => {
  return (
    <Layout>
      <section className="section-light py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-emerald-100 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </motion.div>

            <h1 className="heading-section mb-4">Thank You for Your Order</h1>
            <p className="body-refined text-noir/70 mb-8">
              Your bouquet is being carefully prepared with love and attention. 
              We can't wait to bring a smile to your special occasion.
            </p>

            <div className="bg-oat/50 border border-noir/10 p-6 mb-8 space-y-4">
              <div className="flex items-center gap-4 text-left">
                <Mail className="w-5 h-5 text-noir/60 flex-shrink-0" />
                <p className="text-sm text-noir/70">
                  A confirmation email with your order details has been sent.
                </p>
              </div>
              <div className="flex items-center gap-4 text-left">
                <Package className="w-5 h-5 text-noir/60 flex-shrink-0" />
                <p className="text-sm text-noir/70">
                  You'll receive tracking information once your order is dispatched.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/flowers" className="btn-luxury-dark">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-luxury-light">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentSuccess;
