import React from "react"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white md:px-12">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">QRPass</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/login"
            className="text-gray-700 hover:text-black transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Login Button */}
        <div className="md:hidden flex items-center">
          <Link
            to="/login"
            className="text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition duration-300"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section with Centered Text */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 h-[calc(100vh-80px)]">
        {/* Hero Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 leading-snug">
          Generate QR Code Passes for <br className="hidden sm:block" />
          Your Events
        </h2>

        {/* Hero Description */}
        <p className="text-gray-500 mb-8 max-w-lg text-base sm:text-lg">
          Create, manage, and distribute digital passes with our simple and
          elegant QR code generator.
        </p>

        {/* Action Button */}
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300 flex items-center"
          >
            Create Your First Pass →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
