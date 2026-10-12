
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { clearCart } from "../redux/cartSlice";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function Checkout({ isOpen, closeCheckout }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [activeOrderId, setActiveOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const total = subtotal;

  useEffect(() => {
    if (!activeOrderId || !isOpen) return;

    const socket = io(API_URL);

    socket.on("connect", () => {
      socket.emit("join-order", activeOrderId);
    });

    const handleOrderStatus = (update) => {
      if (update.orderId === activeOrderId) {
        setOrderStatus(update.status);
      }
    };

    socket.on("order:status", handleOrderStatus);

    return () => {
      socket.off("order:status", handleOrderStatus);
      socket.disconnect();
    };
  }, [activeOrderId, isOpen]);

  if (!isOpen) return null;

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessageType("error");
      setMessage("Your cart is empty");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("success");

    const orderData = {
      customerName: name,
      customerEmail: email,
      address,
      items: cart.map((item) => ({
        foodId: item.id || item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        emoji: item.emoji,
      })),
      subtotal,
      discount: 0,
      total,
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : {}),
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      if (!data.order?._id) {
        throw new Error("Order was submitted, but no order ID was returned.");
      }

      const newOrderId = data.order._id;

      setActiveOrderId(newOrderId);
      setOrderStatus(data.order.status || "Placed");
      setMessage(`Order placed successfully! Order ID: ${newOrderId}`);

      dispatch(clearCart());

      setName("");
      setEmail("");
      setAddress("");
    } catch (error) {
      console.error("Order Error:", error);
      setMessageType("error");
      setMessage(error.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold">Checkout 🧾</h2>
            <p className="text-sm text-gray-500 mt-1">
              Complete your order
            </p>
          </div>

          <button
            type="button"
            onClick={closeCheckout}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-3">Order Summary</h3>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id || item._id}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  ₹{item.price * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-5 pt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-orange-500">₹{total}</span>
          </div>
        </div>

        <form onSubmit={placeOrder} className="mt-6">
          <h3 className="font-bold text-lg mb-4">Customer Details</h3>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-orange-200"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-orange-200"
          />

          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows="3"
            className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-orange-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order 🎉"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 border rounded-lg p-3 text-sm break-all ${
              messageType === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {activeOrderId && (
          <div className="mt-4 border border-orange-200 bg-orange-50 rounded-xl p-4">
            <h3 className="font-bold text-lg">Live Order Tracking 📦</h3>
            <p className="mt-2 text-sm text-gray-600 break-all">
              Order ID: {activeOrderId}
            </p>
            <p className="mt-2 font-semibold text-orange-600">
              Current Status: {orderStatus}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Status updates will appear here while this checkout is open and connected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
