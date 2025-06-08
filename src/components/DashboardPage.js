"use client"

import { useState, useEffect } from "react"
import apiService from "../services/api"
import "./DashboardPage.css"

function DashboardPage({ onNavigate, user, darkMode, onToggleDarkMode, onLogout }) {
  const [activeTab, setActiveTab] = useState("my-assets")
  const [myAssets, setMyAssets] = useState([])
  const [myPurchases, setMyPurchases] = useState([])
  const [loading, setLoading] = useState(false)

  // Load data when tab changes
  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [activeTab, user])

  // Load data based on active tab
  const loadData = async () => {
    if (!user) return

    setLoading(true)
    try {
      if (activeTab === "my-assets") {
        const assets = await apiService.getMyAssets()
        setMyAssets(assets || [])
      } else {
        const purchases = await apiService.getMyPurchases()
        setMyPurchases(purchases || [])
      }
    } catch (error) {
      console.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  // Handle asset download
  const handleDownload = async (assetId, title) => {
    try {
      const blob = await apiService.downloadAsset(assetId)
      if (!blob) {
        alert("Download failed. Please try again.")
        return
      }

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = title || "download"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      alert("Download failed. Please try again.")
    }
  }

  // Calculate total earnings
  const calculateEarnings = () => {
    return myAssets
      .reduce((total, asset) => {
        const sales = asset.sales || 0
        const price = asset.price || 0
        return total + sales * price * 0.7
      }, 0)
      .toFixed(2)
  }

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "var(--bg-primary)" }}>
      <nav style={{ marginBottom: "2rem" }}>
        <button onClick={() => onNavigate("marketplace")} style={{ marginRight: "1rem" }}>
          ← Back to Marketplace
        </button>
        <button onClick={onToggleDarkMode} style={{ marginRight: "1rem" }}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button onClick={onLogout}>Logout</button>
      </nav>
      <h1>Welcome, {user?.name || "User"}!</h1>
      <p>This is your dashboard.</p>
    </div>
  )
}

export default DashboardPage
