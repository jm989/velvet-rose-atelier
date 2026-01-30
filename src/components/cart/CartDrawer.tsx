import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    try {
      // For now, checkout with the first item (single item checkout)
      // Multi-item checkout would require a different edge function
      const item = items[0];
      
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          productName: items.length === 1 ? item.name : `${item.name} + ${items.length - 1} more`,
          price: totalPrice * 100, // Convert to pence
          quantity: 1,
          metadata: {
            productId: item.productId,
            category: item.category,
            size: item.size || "",
            cakeFlavour: item.cakeFlavour || "",
            wrapColour: item.wrapColour || "",
            cakeTopper: item.cakeTopper || "",
            giftMessage: item.giftMessage || "",
          },
        },
      });

      if (error) throw error;

      if (data?.url) {
        clearCart();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-noir/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-oat z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-noir/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="font-serif text-xl">Your Basket</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-noir/5 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-noir/60">Your basket is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={`${item.productId}-${index}`} className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-noir/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-noir/40 hover:text-noir transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <p className="text-sm text-noir/60 mt-1">£{item.price}</p>
                        
                        {item.size && (
                          <p className="text-xs text-noir/50 mt-1">Size: {item.size}</p>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 border border-noir/20 hover:bg-noir/5 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 border border-noir/20 hover:bg-noir/5 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-noir/10 p-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span className="font-serif">£{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn-luxury-dark w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
