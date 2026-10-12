
import { useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function Signup({ openLogin, signupUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      // Preserve the existing App.jsx signup flow.
      signupUser(data.user);

      setMessage("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🍕</div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create Your CraveCart Account
          </h1>
          <p className="text-gray-500 mt-3">
            Join CraveCart and start ordering your favourite food.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage("");
              }}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              placeholder="Create a password"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>

          {message && (
            <p
              className={`text-center text-sm ${
                message.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have a CraveCart account?{" "}
          <button
            type="button"
            onClick={openLogin}
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
