"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Heart,
  Star,
  Palette,
  FileText,
  Download,
  ShoppingCart,
  Eye,
  Play,
  ImageIcon,
  Video,
  FileImage,
  Brush,
  DollarSign,
  TrendingUp,
  Upload,
  Filter,
} from "lucide-react"

interface TemplateLibraryProps {
  onSelectTemplate: () => void
}

export function TemplateLibrary({ onSelectTemplate }: TemplateLibraryProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = [
    { name: "All", icon: Sparkles, color: "from-purple-500 to-pink-500", count: "2.5M+" },
    { name: "Images", icon: ImageIcon, color: "from-blue-500 to-cyan-500", count: "1.2M+" },
    { name: "Videos", icon: Video, color: "from-green-500 to-emerald-500", count: "450K+" },
    { name: "Templates", icon: FileText, color: "from-orange-500 to-red-500", count: "320K+" },
    { name: "Illustrations", icon: Brush, color: "from-purple-500 to-indigo-500", count: "280K+" },
    { name: "Graphics", icon: Palette, color: "from-pink-500 to-rose-500", count: "190K+" },
    { name: "Icons", icon: Star, color: "from-yellow-500 to-orange-500", count: "150K+" },
    { name: "Fonts", icon: FileImage, color: "from-teal-500 to-cyan-500", count: "25K+" },
  ]

  const assets = [
    {
      id: 1,
      title: "Modern Business Presentation Template",
      type: "Template",
      price: 12.99,
      originalPrice: 19.99,
      creator: "Sarah Design Co.",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      downloads: 2847,
      rating: 4.9,
      reviews: 156,
      gradient: "from-blue-400 via-purple-400 to-pink-400",
      tags: ["Business", "Modern", "Professional"],
      featured: true,
      creatorEarning: 9.09, // 70% of price
    },
    {
      id: 2,
      title: "Abstract Geometric Backgrounds Pack",
      type: "Images",
      price: 8.99,
      creator: "Vector Studio",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      downloads: 5234,
      rating: 4.8,
      reviews: 289,
      gradient: "from-green-400 via-cyan-400 to-blue-400",
      tags: ["Abstract", "Geometric", "Backgrounds"],
      creatorEarning: 6.29,
    },
    {
      id: 3,
      title: "Social Media Video Templates",
      type: "Videos",
      price: 24.99,
      creator: "Motion Graphics Pro",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      downloads: 1456,
      rating: 5.0,
      reviews: 78,
      gradient: "from-purple-400 via-pink-400 to-red-400",
      tags: ["Social Media", "Animation", "Marketing"],
      creatorEarning: 17.49,
    },
    {
      id: 4,
      title: "Hand-drawn Illustration Set",
      type: "Illustrations",
      price: 15.99,
      creator: "Artistic Minds",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      downloads: 3421,
      rating: 4.7,
      reviews: 203,
      gradient: "from-yellow-400 via-orange-400 to-red-400",
      tags: ["Hand-drawn", "Artistic", "Creative"],
      creatorEarning: 11.19,
    },
    {
      id: 5,
      title: "Minimalist Logo Collection",
      type: "Graphics",
      price: 18.99,
      creator: "Brand Builders",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      downloads: 4567,
      rating: 4.9,
      reviews: 312,
      gradient: "from-indigo-400 via-purple-400 to-pink-400",
      tags: ["Logo", "Minimalist", "Branding"],
      featured: true,
      creatorEarning: 13.29,
    },
    {
      id: 6,
      title: "Premium Icon Pack - 500 Icons",
      type: "Icons",
      price: 9.99,
      creator: "Icon Masters",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      downloads: 8934,
      rating: 4.8,
      reviews: 445,
      gradient: "from-teal-400 via-cyan-400 to-blue-400",
      tags: ["Icons", "UI", "Interface"],
      creatorEarning: 6.99,
    },
  ]

  const handlePurchase = (asset: (typeof assets)[0]) => {
    alert(
      `Purchasing "${asset.title}" for $${asset.price}\nCreator will earn: $${asset.creatorEarning} (70%)\nPlatform fee: $${(asset.price - asset.creatorEarning).toFixed(2)} (30%)`,
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Creators Hub
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full px-4 py-2"
                >
                  Marketplace
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full px-4 py-2"
                  onClick={onSelectTemplate}
                >
                  Create
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full px-4 py-2 transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      Sell <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-white/20">
                    <DropdownMenuItem className="hover:bg-blue-50">
                      <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />
                      Upload Images
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-green-50">
                      <Video className="w-4 h-4 mr-2 text-green-500" />
                      Upload Videos
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-orange-50">
                      <FileText className="w-4 h-4 mr-2 text-orange-500" />
                      Upload Templates
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-50">
                      <Brush className="w-4 h-4 mr-2 text-purple-500" />
                      Upload Illustrations
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full px-4 py-2"
                >
                  Pricing
                </Button>
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full">
                Log in
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition-all">
                Start Selling
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <ShoppingCart className="w-4 h-4" />
              </Button>
              <Avatar className="w-10 h-10 ring-2 ring-purple-200 hover:ring-purple-400 transition-all">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">U</AvatarFallback>
              </Avatar>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-cyan-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 mb-6 shadow-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">💰 Creators earned $2.5M+ this month</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Buy & Sell Digital Assets
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover millions of high-quality images, videos, templates, and illustrations.
              <br />
              <span className="font-semibold text-purple-600">Creators keep 70% of every sale!</span>
            </p>
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                placeholder="Search millions of assets..."
                className="pl-12 h-14 text-lg rounded-full border-2 border-white/50 bg-white/80 backdrop-blur-md shadow-lg focus:border-purple-400 focus:ring-purple-400"
              />
              <Button className="absolute right-2 top-2 h-10 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Browse Categories</h2>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            const isActive = activeCategory === category.name
            return (
              <Card
                key={category.name}
                className={`cursor-pointer transition-all transform hover:scale-105 ${
                  isActive ? "ring-2 ring-purple-500 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-r ${category.color} shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Featured Assets */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Assets</h2>
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assets.map((asset) => (
            <Card
              key={asset.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${asset.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg mb-3 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                      {asset.type === "Videos" ? (
                        <Play className="w-8 h-8 text-purple-600" />
                      ) : asset.type === "Images" ? (
                        <ImageIcon className="w-8 h-8 text-blue-600" />
                      ) : asset.type === "Templates" ? (
                        <FileText className="w-8 h-8 text-orange-600" />
                      ) : asset.type === "Illustrations" ? (
                        <Brush className="w-8 h-8 text-purple-600" />
                      ) : (
                        <Palette className="w-8 h-8 text-pink-600" />
                      )}
                    </div>
                  </div>
                </div>
                {asset.featured && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0 rounded-full bg-white/80 backdrop-blur-md"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0 rounded-full bg-white/80 backdrop-blur-md"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{asset.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {asset.type}
                    </Badge>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 text-sm font-bold text-purple-600">
                      <DollarSign className="w-4 h-4" />
                      {asset.price}
                    </div>
                    {asset.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">${asset.originalPrice}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={asset.creatorAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{asset.creator[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{asset.creator}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{asset.rating}</span>
                    <span className="text-xs text-gray-500">({asset.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Download className="w-4 h-4" />
                    {asset.downloads.toLocaleString()} downloads
                  </div>
                  <div className="text-xs text-green-600 font-medium">Creator earns ${asset.creatorEarning}</div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                    onClick={() => handlePurchase(asset)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Preview
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {asset.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Revenue Sharing Info */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Fair Revenue Sharing</h2>
            <p className="text-xl opacity-90">We believe creators should be rewarded fairly for their work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2">70%</div>
              <div className="text-lg mb-2">Creator Earnings</div>
              <div className="text-sm opacity-80">You keep the majority of every sale</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2">30%</div>
              <div className="text-lg mb-2">Platform Fee</div>
              <div className="text-sm opacity-80">Covers hosting, payment processing & support</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-5xl font-bold mb-2">$2.5M+</div>
              <div className="text-lg mb-2">Paid to Creators</div>
              <div className="text-sm opacity-80">This month alone</div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all"
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Selling Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
