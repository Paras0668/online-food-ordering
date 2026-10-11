import { useState, useEffect } from "react"

import { useSelector } from "react-redux"


function Navbar({
  openCart,
  user,
  logoutUser,
}) {

  const cart = useSelector(
    (state) => state.cart.items
  )


  const [activeSection, setActiveSection] =
    useState("home")


  const totalItems = cart.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  )


  const handleNavClick = (section) => {

    setActiveSection(section)

    const element =
      document.getElementById(section)

    if (element) {

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

    }
  }


  useEffect(() => {

    const handleScroll = () => {

      const sections = [
        "home",
        "menu",
        "offers",
        "about",
      ]


      let currentSection = "home"


      sections.forEach((section) => {

        const element =
          document.getElementById(section)


        if (element) {

          const rect =
            element.getBoundingClientRect()


          if (
            rect.top <= 150 &&
            rect.bottom >= 150
          ) {

            currentSection = section

          }

        }

      })


      setActiveSection(currentSection)

    }


    window.addEventListener(
      "scroll",
      handleScroll
    )


    handleScroll()


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      )

    }

  }, [])


  return (

    <nav className="bg-white shadow-sm sticky top-0 z-50">


      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


        {/* Logo */}

        <button
          onClick={() =>
            handleNavClick("home")
          }
          className="text-2xl font-bold"
        >

          <span className="text-orange-500">
            Crave
          </span>

          <span className="text-gray-800">
            Cart
          </span>

        </button>


        {/* Navigation Links */}

        <div className="hidden md:flex items-center gap-6 font-medium">

          {[
            "home",
            "menu",
            "offers",
            "about",
          ].map((section) => (

            <button
              key={section}
              onClick={() =>
                handleNavClick(section)
              }
              className={`capitalize transition ${
                activeSection === section
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >

              {section}

            </button>

          ))}

        </div>


        {/* User + Cart */}

        <div className="flex items-center gap-4">


          <span className="hidden sm:block text-gray-700 font-medium">

            Hi, {user?.name}

          </span>


          <button
            onClick={logoutUser}
            className="text-gray-600 hover:text-red-500 font-medium"
          >

            Logout

          </button>


          <button
            onClick={openCart}
            className="relative bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >

            🛒 Cart


            {totalItems > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                {totalItems}

              </span>

            )}

          </button>


        </div>


      </div>

    </nav>

  )
}


export default Navbar