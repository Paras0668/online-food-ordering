
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import FoodMenu from "./components/FoodMenu";
import Offer from "./components/Offer";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import SocketConnection from "./components/SocketConnection";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginUser = (userData) => {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const signupUser = (userData) => {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setShowSignup(false);
  };

  // Login / Signup Page
  if (!user) {
    return showSignup ? (
      <Signup
        openLogin={() => setShowSignup(false)}
        signupUser={signupUser}
      />
    ) : (
      <Login
        openSignup={() => setShowSignup(true)}
        loginUser={loginUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Real-Time Server Connection */}
      <SocketConnection />

      {/* Navbar */}
      <Navbar
        openCart={() => setIsCartOpen(true)}
        user={user}
        logoutUser={logoutUser}
      />

      {/* Hero */}
      <Hero />

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Categories */}
      <Categories />

      {/* Food Menu */}
      <FoodMenu searchTerm={searchTerm} />

      {/* Offers */}
      <Offer />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Footer */}
      <Footer />

      {/* Cart */}
      <CartModal
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        openCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout */}
      <Checkout
        isOpen={isCheckoutOpen}
        closeCheckout={() => setIsCheckoutOpen(false)}
        openOrderSuccess={() => {
          setIsCheckoutOpen(false);
          setIsOrderSuccess(true);
        }}
      />

      {/* Order Success */}
      <OrderSuccess
        isOpen={isOrderSuccess}
        closeOrderSuccess={() => setIsOrderSuccess(false)}
      />

    </div>
  );
}

export default App;
