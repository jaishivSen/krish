"use client"

import { useState } from "react"

function SignupModal({ onClose, onSignup, onSwitchToLogin }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSignup({
      name: name,
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
          <h2>Sign Up</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            style={{ background: "none", border: "none", color: "blue", textDecoration: "underline" }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignupModal
