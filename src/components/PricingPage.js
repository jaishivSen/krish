"use client"

import "./PricingPage.css"

const PricingPage = ({ onNavigate, user, onShowLogin, onShowSignup, darkMode, onToggleDarkMode }) => {
  const plans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      features: ["3 downloads per month", "Standard license", "Basic support", "Watermarked previews"],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: 29,
      period: "month",
      features: [
        "Unlimited downloads",
        "Extended license",
        "Priority support",
        "No watermarks",
        "Early access to new content",
        "Commercial use rights",
      ],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Team",
      price: 99,
      period: "month",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Bulk downloads",
        "Custom licensing",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ]

  const sellerFeatures = [
    {
      title: "Upload & Sell",
      description: "Upload your creative work and start earning immediately",
      icon: "📤",
    },
    {
      title: "70% Revenue Share",
      description: "Keep 70% of every sale - one of the highest rates in the industry",
      icon: "💰",
    },
    {
      title: "Global Reach",
      description: "Your work is available to millions of buyers worldwide",
      icon: "🌍",
    },
    {
      title: "Analytics & Insights",
      description: "Track your performance with detailed analytics",
      icon: "📊",
    },
  ]

  const handlePlanSelect = (plan) => {
    if (!user) {
      onShowSignup()
      return
    }
    alert(`Selected ${plan.name} plan!`)
  }

  return (
    <div className="pricing-page">
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
              <button className="dark-mode-toggle" onClick={onToggleDarkMode} title="Toggle dark mode">
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pricing-content">
        <div className="pricing-header">
          <h1>Choose Your Plan</h1>
          <p>Get access to millions of high-quality digital assets</p>
        </div>

        <div className="plans-section">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`plan-card ${plan.popular ? "popular" : ""}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">${plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <span className="check">✅</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`plan-button ${plan.popular ? "popular" : ""}`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="seller-section">
          <div className="seller-header">
            <h2>For Creators & Sellers</h2>
            <p>Start selling your creative work and earn money</p>
          </div>

          <div className="seller-features">
            {sellerFeatures.map((feature, index) => (
              <div key={index} className="seller-feature">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="seller-cta">
            <button className="seller-button" onClick={() => (user ? onNavigate("sell") : onShowSignup())}>
              🚀 Start Selling Today - It's Free!
            </button>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>Yes, you can cancel your subscription at any time. No long-term commitments.</p>
            </div>
            <div className="faq-item">
              <h3>What's included in the extended license?</h3>
              <p>Extended license allows commercial use, resale, and unlimited distribution rights.</p>
            </div>
            <div className="faq-item">
              <h3>How much do sellers earn?</h3>
              <p>Sellers keep 70% of every sale, one of the highest revenue shares in the industry.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial?</h3>
              <p>Yes, Pro plan comes with a 7-day free trial. No credit card required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
