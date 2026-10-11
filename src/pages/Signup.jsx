import { useState } from "react"

function Signup({
  openLogin,
  signupUser,
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage("")

    // Check empty fields
    if (!name || !email || !password) {
      setMessage("Please fill all fields")
      return
    }

    // Check password length
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      // Send signup data to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      // Backend returned an error
      if (!response.ok) {
        setMessage(data.message || "Signup failed")
        setLoading(false)
        return
      }

      // Save registered user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      // Keep existing App.jsx signup flow
      signupUser(data.user)

      setMessage("Account created successfully!")

      // Clear form
      setName("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error("Signup Error:", error)

      setMessage(
        "Unable to connect to server"
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center">

          <div className="text-6xl mb-4">
            🍕
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create Your CraveCart Account
          </h1>

          <p className="text-gray-500 mt-3">
            Join CraveCart and start ordering your favourite food.
          </p>

        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Name */}
          <div>

            <label className="font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setMessage("")
              }}
              placeholder="Enter your name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />

          </div>

          {/* Email */}
          <div>

            <label className="font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setMessage("")
              }}
              placeholder="Enter your email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />

          </div>

          {/* Password */}
          <div>

            <label className="font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setMessage("")
              }}
              placeholder="Create a password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />

          </div>

          {/* Message */}
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-6">

          Already have a CraveCart account?{" "}

          <button
            onClick={openLogin}
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </button>

        </p>

      </div>

    </div>
  )
}

export default Signup
