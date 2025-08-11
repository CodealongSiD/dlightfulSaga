import { useEffect, useState } from "react";
import axiosInstance from "@/context/axiosInstance";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { RazorpayOptions, RazorpayResponse } from "@/context/razorpayTypes";
import { loadRazorpay } from "@/context/loadRazorpay";


type CartItem = {
  _id: string;
  title: string;
  price: number;
  coverImage: string;
  quantity: number;
};

type CartData = {
  items: CartItem[];
  subtotal: number;
  platformFee: number;
  gst: number;
  total: number;
};


const Cart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const clearCartAndNavigate = async () => {
    try {
      await axiosInstance.delete("/cart/clear");
      toast.success("Payment successful!");
      navigate("/orders");
    } catch (err) {
      console.error("Failed to clear cart after payment", err);
      toast.error("Cart clear failed, but payment was successful");
    }
  };

  if (paymentSuccess) {
    clearCartAndNavigate();
  }
}, [paymentSuccess, navigate]);
    // Use useNavigate hook to programmatically navigate after payment

 
  
const fetchCart = async () => {
  try {
    const res = await axiosInstance.get("/cart");
    console.log("📦 Cart Response:", res.data);
    setCartData(res.data); // directly set the whole object
  } catch (err) {
    console.error("Error loading cart:", err);
  }
};

  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      //console.log("📦 Cart Response: ", res.data);
      setCartData(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };
  fetchCart();
}, []);

if (!cartData) return <div>Loading cart...</div>;

  const handleRemove = async (bookId: string) => {
    try {
      await axiosInstance.delete(`/cart/remove/${bookId}`);
      await fetchCart();
      toast.success("Item removed");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove");
    }
  };


const handleCheckout = async () => {
  const isLoaded = await loadRazorpay();
  if (!isLoaded) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  try {
    const { data: order } = await axiosInstance.post("payment/create-order", {
      amount: cartData.total * 100,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Bookstore",
      description: "Purchase books",
      order_id: order.orderId,
      handler: async (response: RazorpayResponse) => {
        try {
          await axiosInstance.post("payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: cartData.total, 
            cartItems: cartData.items,
          });
          setPaymentSuccess(true);
        } catch (err) {
          console.error("Payment verification failed", err);
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: "User",
        email: "user@example.com",
      },
      theme: {
        color: "#facc15",
      },
    };

    const razor = new window.Razorpay(options as RazorpayOptions);
    razor.open();
  } catch (err) {
    console.error("Checkout error:", err);
    toast.error("Failed to start payment");
  }
};

  return (
    <section className="!px-4 !py-8 sm:!px-6 sm:!py-12 lg:!px-8">
      <div className="!mx-auto !max-w-3xl bg-zinc-800 !p-6 rounded-lg shadow-lg text-white">
        <header className="!text-center">
          <h1 className="!text-xl !font-bold !text-[--color-text] sm:!text-3xl">
            Your Cart
          </h1>
        </header>

        <div className="!mt-8">
          {cartData.items.length === 0 ? (
            <p className="!text-center !text-[--color-muted]">Cart is empty</p>
          ) : (
            <ul className="!space-y-6">
              {cartData.items.map((item) => (
                <li key={item._id} className="!flex !items-center !gap-4">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-20 h-24 !object-cover !rounded-sm !shadow"
                  />

                  <div className="!flex-1">
                    <h3 className="!text-base !font-medium !text-[--color-text] !line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="!text-sm !text-[--color-subtle] !mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <button onClick={() => handleRemove(item._id)}>
                    <Trash2 className="!w-5 !h-5 !text-red-500 hover:!text-red-700" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {cartData.items.length > 0 && (
            <div className="!mt-10 !border-t !border-[--color-border] !pt-6">
              <div className="!space-y-3 !text-sm !text-[--color-text]">
                <div className="!flex !justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartData.subtotal}</span>
                </div>
                <div className="!flex !justify-between">
                  <span>Platform Fee</span>
                  <span>₹{cartData.platformFee}</span>
                </div>
                <div className="!flex !justify-between">
                  <span>GST</span>
                  <span>₹{cartData.gst}</span>
                </div>
                <div className="!flex !justify-between !font-semibold !text-base">
                  <span>Total</span>
                  <span>₹{cartData.total}</span>
                </div>
              </div>

              <div className="!mt-6 !flex !justify-end">
                <button
                  onClick={handleCheckout}
                  className="!rounded-md !bg-yellow-400 !px-5 !py-2 !text-sm !font-medium !text-gray-900 hover:!bg-yellow-300 !transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
