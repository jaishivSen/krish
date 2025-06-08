// Simple API service with error handling and fallbacks
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

class ApiService {
  // Get user ID from localStorage
  getUserId() {
    return localStorage.getItem("userId")
  }

  // Set user ID in localStorage
  setUserId(userId) {
    if (userId) {
      localStorage.setItem("userId", userId)
    } else {
      localStorage.removeItem("userId")
    }
  }

  // Basic request with error handling
  async fetchApi(endpoint, options = {}) {
    try {
      const userId = this.getUserId()
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      }

      // Add user ID header if available
      if (userId) {
        headers["x-user-id"] = userId
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      return null // Return null instead of throwing to prevent crashes
    }
  }

  // Get all assets with fallback
  async getAssets() {
    const result = await this.fetchApi("/assets")

    // Return fallback data if API fails
    if (!result) {
      return [
        {
          id: "1",
          title: "Modern Business Presentation",
          type: "image",
          price: 12.99,
          creator: "Sarah Design Co.",
          description: "Professional template for business presentations",
          downloads: 1250,
          rating: 4.8,
          reviews: 89,
          tags: ["Business", "Modern", "Professional"],
        },
        {
          id: "2",
          title: "Stock Video Background",
          type: "video",
          price: 9.99,
          creator: "VideoMaker",
          description: "Beautiful video background for your projects",
          downloads: 890,
          rating: 4.6,
          reviews: 45,
          tags: ["Video", "Background", "Motion"],
        },
        {
          id: "3",
          title: "Audio Track Collection",
          type: "audio",
          price: 15.99,
          creator: "SoundStudio",
          description: "High-quality audio tracks for your content",
          downloads: 567,
          rating: 4.9,
          reviews: 78,
          tags: ["Audio", "Music", "Sound"],
        },
      ]
    }

    return result
  }

  // Get user's assets
  async getMyAssets() {
    const result = await this.fetchApi("/assets/my-assets/list")
    return result || [] // Return empty array if API fails
  }

  // Get user's purchases
  async getMyPurchases() {
    const result = await this.fetchApi("/my")
    return result || [] // Return empty array if API fails
  }

  // Upload asset (simplified)
  async uploadAsset(data) {
    const formData = new FormData()

    // Add all form fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    try {
      const userId = this.getUserId()
      const headers = {}

      if (userId) {
        headers["x-user-id"] = userId
      }

      const response = await fetch(`${API_BASE_URL}/assets/upload`, {
        method: "POST",
        headers,
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Upload failed:", error)
      return null
    }
  }

  // Purchase asset
  async purchaseAsset(assetId) {
    return this.fetchApi(`/${assetId}/purchase`, { method: "POST" })
  }

  // Download asset
  async downloadAsset(assetId) {
    try {
      const userId = this.getUserId()
      const headers = {}

      if (userId) {
        headers["x-user-id"] = userId
      }

      const response = await fetch(`${API_BASE_URL}/assets/${assetId}/download`, {
        headers,
      })

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`)
      }

      return await response.blob()
    } catch (error) {
      console.error("Download failed:", error)
      return null
    }
  }
}

// Export a single instance
const apiService = new ApiService()
export default apiService
