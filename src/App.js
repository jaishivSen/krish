"use client"

import { useState } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const assets = [
    {
      id: 1,
      title: "Modern Business Template",
      price: 12.99,
      type: "template",
      creator: "Design Studio",
    },
    {
      id: 2,
      title: "Stock Video Pack",
      price: 19.99,
      type: "video",
      creator: "Video Pro",
    },
    {
      id: 3,
      title: "Audio Collection",
      price: 9.99,
      type: "audio",
      creator: "Sound Master",
    },
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLogin = () => {
    setUser({ name: "John Doe", email: "john@example.com" })
    setShowLogin(false)
  }

  const addToCart = (asset) => {
    setCartItems([...cartItems, asset])
    alert(`${asset.title} added to cart!`)
  }

  if (showLogin) {
    return (
      <div className={`app ${darkMode ? "dark" : ""}`}>
        <div className="modal-overlay">
          <div className="modal">
            <h2>Login</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="header">
        <h1>✨ Creators Hub</h1>
        <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☀️" : "🌙"} Toggle Theme</button>
      </header>

      <main className="main">
        <h2>Welcome to the Digital Marketplace</h2>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click me! (+1)</button>

        <div className="assets">
          <h3>Sample Assets:</h3>
          <div className="asset-grid">
            <div className="asset-card">
              <h4>🖼️ Image Pack</h4>
              <p>$12.99</p>
              <button>Buy Now</button>
            </div>
            <div className="asset-card">
              <h4>🎥 Video Template</h4>
              <p>$19.99</p>
              <button>Buy Now</button>
            </div>
            <div className="asset-card">
              <h4>🎵 Audio Track</h4>
              <p>$9.99</p>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
