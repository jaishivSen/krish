"use client"

import { useState } from "react"

function LoginModal({ onClose, onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({
      name: email.split("@")[0] || "User",
      email: email,
      id: Date.now(),
    })
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "var(--bg-primary)",
          padding: "2rem",
          borderRadius: "1rem",
          width: "400px",
          maxWidth: "90vw",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2>Login</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
              required
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem" }}>
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            style={{ background: "none", border: "none", color: "blue", textDecoration: "underline" }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginModal
