"use client"

import { useState } from "react"
import "./SellPage.css"

function SellPage({ onNavigate, user, onShowLogin, darkMode, onToggleDarkMode, onAssetUpload }) {
  const [selectedType, setSelectedType] = useState("image")
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    file: null,
  })

  // Asset types
  const assetTypes = [
    { id: "image", name: "Images", icon: "🖼️", description: "Photos, illustrations, graphics" },
    { id: "video", name: "Videos", icon: "🎥", description: "Motion graphics, stock footage" },
    { id: "audio", name: "Audio", icon: "🎵", description: "Music, sound effects, podcasts" },
  ]

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      onShowLogin()
      return
    }

    if (!formData.file) {
      alert("Please select a file to upload")
      return
    }

    if (!formData.title || !formData.price) {
      alert("Please fill in all required fields")
      return
    }

    try {
      setUploading(true)

      await onAssetUpload({
        title: formData.title,
        description: formData.description,
        type: selectedType,
        price: Number.parseFloat(formData.price),
        file: formData.file,
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        file: null,
      })

      // Reset file input
      const fileInput = document.getElementById("file-input")
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
      }))
    }
  }

  return (
    <div className="sell-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-logo" onClick={() => onNavigate("marketplace")}>
              <div className="logo-icon">
                <span>✨</span>
              </div>
              <span className="logo-text">Creators Hub</span>
            </div>
            <div className="navbar-menu">
              <button className="nav-button" onClick={() => onNavigate("marketplace")}>
                ← Back to Marketplace
              </button>
              <button className="nav-button" onClick={() => onNavigate("dashboard")}>
                📊 Dashboard
              </button>
              <button className="dark-mode-toggle" onClick={onToggleDarkMode}>
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="sell-content">
        <div className="sell-header">
          <h1>Upload Your Digital Asset</h1>
          <p>Share your work and earn 70% on every sale</p>
        </div>

        <div className="upload-section">
          {/* Asset Type Selection */}
          <div className="asset-types">
            <h2>What are you uploading?</h2>
            <div className="types-grid">
              {assetTypes.map((type) => (
                <div
                  key={type.id}
                  className={`type-card ${selectedType === type.id ? "active" : ""}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="type-icon">{type.icon}</div>
                  <h3>{type.name}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Form */}
          <form className="upload-form" onSubmit={handleSubmit}>
            {/* File Upload */}
            <div className="form-section">
              <h3>Upload File</h3>
              <div className="file-upload">
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept={selectedType === "image" ? "image/*" : selectedType === "video" ? "video/*" : "audio/*"}
                  className="file-input"
                />
                {formData.file && <p className="file-selected">Selected: {formData.file.name}</p>}
              </div>
            </div>

            {/* Asset Details */}
            <div className="form-section">
              <h3>Asset Details</h3>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter asset title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="9.99"
                  min="0.99"
                  step="0.01"
                  required
                />
                {formData.price && (
                  <small className="earning-info">
                    You'll earn: ${(Number.parseFloat(formData.price || 0) * 0.7).toFixed(2)} (70%)
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your asset..."
                  rows="3"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-button" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload & Start Selling"}
              </button>
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="seller-benefits">
          <h2>Why Sell on Creators Hub?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">💰</div>
              <h3>70% Revenue Share</h3>
              <p>Keep the majority of every sale</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🌍</div>
              <h3>Global Marketplace</h3>
              <p>Reach buyers worldwide</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🛡️</div>
              <h3>Copyright Protection</h3>
              <p>Your work is protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellPage
