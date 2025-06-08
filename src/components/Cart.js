"use client"

function Cart({ items, onClose, onRemoveItem, onPurchase, user, onShowLogin }) {
  const total = items.reduce((sum, item) => sum + Number.parseFloat(item.price || 0), 0).toFixed(2)

  const handleCheckout = () => {
    if (!user) {
      onShowLogin()
      return
    }
    alert("Purchase successful!")
    onClose()
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
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2>Cart ({items.length})</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.cartId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem",
                  borderBottom: "1px solid var(--border-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => onRemoveItem(item.cartId)}>🗑️</button>
              </div>
            ))}
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-primary)" }}>
              <p>
                <strong>Total: ${total}</strong>
              </p>
              <button onClick={handleCheckout} style={{ width: "100%", padding: "0.75rem", marginTop: "1rem" }}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
