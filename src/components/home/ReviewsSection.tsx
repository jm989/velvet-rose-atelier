import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    text: "Absolutely stunning arrangement. The attention to detail was remarkable, and my mother was moved to tears. YoursTrulyS has become my go-to for every special occasion.",
    author: "Sarah M.",
    occasion: "Mother's Day Gift",
  },
  {
    id: 2,
    text: "The cake bouquet was a showstopper at our anniversary celebration. Fresh flowers and a delicious cake - what more could you ask for? Exceptional quality.",
    author: "James & Emily",
    occasion: "Anniversary Celebration",
  },
  {
    id: 3,
    text: "I've ordered from many florists, but YoursTrulyS stands apart. The luxury feel from unboxing to arranging is unmatched. Pure elegance.",
    author: "Victoria L.",
    occasion: "Corporate Event",
  },
  {
    id: 4,
    text: "The baby shower bouquet was perfect - soft, delicate, and beautifully wrapped. It captured the joy of the occasion perfectly.",
    author: "Rebecca H.",
    occasion: "Baby Shower",
  },
  {
    id: 5,
    text: "When words weren't enough, YoursTrulyS helped me express my gratitude with the most elegant arrangement I've ever seen.",
    author: "Michael T.",
    occasion: "Thank You Gift",
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="section-dark py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="caption-elegant mb-4 opacity-60">Testimonials</p>
          <h2 className="heading-section">Words from Our Clients</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="star-filled" />
            ))}
          </div>

          {/* Review Content */}
          <div className="relative min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <blockquote className="font-serif text-xl md:text-2xl font-light leading-relaxed mb-8 italic">
                  "{reviews[currentIndex].text}"
                </blockquote>
                <div>
                  <p className="font-medium">{reviews[currentIndex].author}</p>
                  <p className="text-sm opacity-60 mt-1">
                    {reviews[currentIndex].occasion}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-3 border border-oat/20 hover:bg-oat hover:text-noir transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-oat w-6" : "bg-oat/30"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-3 border border-oat/20 hover:bg-oat hover:text-noir transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
