export default function OrderSuccess({ onReset }) {
  return (
    <div className="order-success">
      <h3>Order received!</h3>
      <p>Your order has been placed successfully. We’ll contact you shortly.</p>
      <button className="button secondary" type="button" onClick={onReset}>
        Place another order
      </button>
    </div>
  )
}
