"use client"

import "./CreatePage.css"

const CreatePage = ({ onNavigate, user, onShowLogin, darkMode, onToggleDarkMode }) => {
  const templates = [
    { id: 1, name: "Social Media Post", size: "1080x1080", category: "Social Media" },
    { id: 2, name: "Instagram Story", size: "1080x1920", category: "Social Media" },
    { id: 3, name: "Business Card", size: "3.5x2 in", category: "Print" },
    { id: 4, name: "Flyer", size: "8.5x11 in", category: "Print" },
    { id: 5, name: "Presentation", size: "1920x1080", category: "Presentation" },
    { id: 6, name: "Logo", size: "500x500", category: "Branding" },
  ]

  const handleCreateNew = (template) => {
    if (!user) {
      onShowLogin()
      return
    }
    alert(`Creating new ${template.name}...`)
  }

  return (
    <div className="create-page">
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

      <div className="create-content">
        <div className="create-header">
          <h1>What would you like to create?</h1>
          <p>Choose from our professional templates or start from scratch</p>
        </div>

        <div className="create-options">
          <button className="create-option blank" onClick={() => handleCreateNew({ name: "Blank Canvas" })}>
            <div className="option-icon">📄</div>
            <h3>Blank Canvas</h3>
            <p>Start with a blank canvas</p>
          </button>
        </div>

        <div className="templates-section">
          <h2>Popular Templates</h2>
          <div className="templates-grid">
            {templates.map((template) => (
              <div key={template.id} className="template-card" onClick={() => handleCreateNew(template)}>
                <div className="template-preview">
                  <div className="template-icon">
                    {template.category === "Social Media"
                      ? "📱"
                      : template.category === "Print"
                        ? "🖨️"
                        : template.category === "Presentation"
                          ? "📊"
                          : "🎨"}
                  </div>
                </div>
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.size}</p>
                  <span className="template-category">{template.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
