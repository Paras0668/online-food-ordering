function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>

            <div className="flex items-center gap-2">

              <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                🍴
              </div>

              <h2 className="text-xl font-bold text-white">
                Foodie
              </h2>

            </div>

            <p className="text-sm mt-4 leading-relaxed">
              Your simple and convenient online food ordering
              platform for delicious meals.
            </p>

          </div>

          <div>

            <h3 className="text-white font-bold mb-4">
              Quick Links
            </h3>

            <div className="space-y-2 text-sm">
              <p>Home</p>
              <p>Menu</p>
              <p>Offers</p>
              <p>About Us</p>
            </div>

          </div>

          <div>

            <h3 className="text-white font-bold mb-4">
              Support
            </h3>

            <div className="space-y-2 text-sm">
              <p>Help Center</p>
              <p>Contact Us</p>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
            </div>

          </div>

          <div>

            <h3 className="text-white font-bold mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm">
              <p>📧 foodie@example.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Mumbai, India</p>
            </div>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p>
            © 2026 Foodie - Online Food Ordering System
          </p>
        </div>

      </div>

    </footer>
  )
}

export default Footer