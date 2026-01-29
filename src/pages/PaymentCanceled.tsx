import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const PaymentCanceled = () => {
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
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-amber-100 flex items-center justify-center"
            >
              <XCircle className="w-10 h-10 text-amber-600" />
            </motion.div>

            <h1 className="heading-section mb-4">Payment Cancelled</h1>
            <p className="body-refined text-noir/70 mb-8">
              Your payment was cancelled. Don't worry — your beautiful bouquet is still waiting for you. 
              Feel free to return to the shop whenever you're ready.
            </p>

            <div className="bg-oat/50 border border-noir/10 p-6 mb-8">
              <div className="flex items-center gap-4 text-left">
                <HelpCircle className="w-5 h-5 text-noir/60 flex-shrink-0" />
                <p className="text-sm text-noir/70">
                  Having trouble with payment? Contact us at{" "}
                  <a href="mailto:hello@velvetroseatelier.com" className="underline hover:text-noir">
                    hello@velvetroseatelier.com
                  </a>{" "}
                  and we'll be happy to help.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/flowers" className="btn-luxury-dark inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Shop
              </Link>
              <Link to="/contact" className="btn-luxury-light">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentCanceled;
