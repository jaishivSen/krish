"use client"

import { useState } from "react"
import "./TemplateLibrary.css"

function TemplateLibrary({
  onNavigate,
  onShowLogin,
  onShowSignup,
  onShowCart,
  onAddToCart,
  onPurchase,
  user,
  onLogout,
  cartItemsCount,
  darkMode,
  onToggleDarkMode,
  assets,
  loading,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const categories = [
    { name: "All", icon: "✨", color: "purple-pink" },
    { name: "image", icon: "🖼️", color: "blue-cyan" },
    { name: "video", icon: "🎥", color: "green-emerald" },
    { name: "audio", icon: "🎵", color: "orange-red" },
  ]

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = activeCategory === "All" || asset.type === activeCategory
    const matchesSearch =
      !searchQuery ||
      asset.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePurchase = (asset) => {
    if (!user) {
      onShowLogin()
      return
    }
    onPurchase(asset.id)
  }

  const handleAddToCart = (asset) => {
    onAddToCart(asset)
    alert(`"${asset.title}" added to cart!`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <div className="template-library">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-logo" onClick={() => onNavigate("marketplace")}>
              <div className="logo-icon">
                <span>✨</span>
              </div>
              <span className="logo-text">Creators Hub</span>
            </div>

            <div className="navbar-menu desktop-only">
              <button className="nav-button active" onClick={() => onNavigate("marketplace")}>
                Marketplace
              </button>
              <button className="nav-button" onClick={() => onNavigate("sell")}>
                Sell
              </button>
              {user && (
                <button className="nav-button" onClick={() => onNavigate("dashboard")}>
                  Dashboard
                </button>
              )}
            </div>

            <div className="navbar-auth desktop-only">
              <button
                className="dark-mode-toggle"
                onClick={onToggleDarkMode}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              {!user ? (
                <>
                  <button className="auth-button login" onClick={onShowLogin}>
                    Log in
                  </button>
                  <button className="auth-button signup" onClick={onShowSignup}>
                    Sign up
                  </button>
                </>
              ) : (
                <div
                  className="user-menu"
                  onMouseEnter={() => setShowUserDropdown(true)}
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <div className="user-avatar">{user.name[0].toUpperCase()}</div>
                  </div>
                  {showUserDropdown && (
                    <div className="user-dropdown">
                      <button className="dropdown-item" onClick={() => onNavigate("dashboard")}>
                        Dashboard
                      </button>
                      <button className="dropdown-item" onClick={onLogout}>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button className="cart-button" onClick={onShowCart}>
                🛒{cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
              </button>
            </div>

            <div className="mobile-only">
              <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mobile-menu">
              <button
                className="mobile-nav-item"
                onClick={() => {
                  onNavigate("marketplace")
                  setMobileMenuOpen(false)
                }}
              >
                Marketplace
              </button>
              <button
                className="mobile-nav-item"
                onClick={() => {
                  onNavigate("sell")
                  setMobileMenuOpen(false)
                }}
              >
                Sell
              </button>
              {user && (
                <button
                  className="mobile-nav-item"
                  onClick={() => {
                    onNavigate("dashboard")
                    setMobileMenuOpen(false)
                  }}
                >
                  Dashboard
                </button>
              )}
              <button
                className="mobile-nav-item"
                onClick={() => {
                  onToggleDarkMode()
                  setMobileMenuOpen(false)
                }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <div className="mobile-auth">
                {!user ? (
                  <>
                    <button
                      className="mobile-auth-button"
                      onClick={() => {
                        onShowLogin()
                        setMobileMenuOpen(false)
                      }}
                    >
                      Log in
                    </button>
                    <button
                      className="mobile-auth-button signup"
                      onClick={() => {
                        onShowSignup()
                        setMobileMenuOpen(false)
                      }}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <button
                    className="mobile-auth-button"
                    onClick={() => {
                      onLogout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    Sign out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Digital Asset Marketplace</h1>
          <p className="hero-description">Discover and purchase high-quality digital assets</p>
          <form className="search-container" onSubmit={handleSearch}>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search assets..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="categories-section">
        <div className="section-header">
          <h2>Browse Categories</h2>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`category-card ${activeCategory === category.name ? "active" : ""}`}
              onClick={() => setActiveCategory(category.name)}
            >
              <div className={`category-icon ${category.color}`}>
                <span>{category.icon}</span>
              </div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="assets-section">
        <div className="section-header">
          <h2>Digital Assets</h2>
        </div>

        {loading ? (
          <div className="loading-state">Loading assets...</div>
        ) : filteredAssets.length === 0 ? (
          <div className="empty-state">
            <p>No assets found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="assets-grid">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="asset-card">
                <div className="asset-preview">
                  <div className="asset-preview-content">
                    <div className="asset-icon">
                      {asset.type === "video" ? "▶️" : asset.type === "image" ? "🖼️" : "🎵"}
                    </div>
                  </div>
                </div>

                <div className="asset-info">
                  <div className="asset-header">
                    <h3>{asset.title}</h3>
                    <div className="asset-price">${asset.price}</div>
                  </div>

                  <div className="creator-info">
                    <span className="creator-name">by {asset.creator || "Unknown"}</span>
                  </div>

                  <div className="asset-buttons">
                    <button className="buy-button" onClick={() => handlePurchase(asset)}>
                      Buy Now
                    </button>
                    <button className="cart-add-button" onClick={() => handleAddToCart(asset)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="revenue-section">
        <div className="revenue-content">
          <div className="revenue-header">
            <h2>Fair Revenue Sharing</h2>
            <p>Creators keep 70% of every sale</p>
          </div>
          <div className="revenue-cta">
            <button className="start-selling-button" onClick={() => onNavigate("sell")}>
              Start Selling Today
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateLibrary
