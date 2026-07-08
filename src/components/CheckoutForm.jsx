export default function CheckoutForm({ formData, onChange, onSubmit, isSubmitting }) {
  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <h3>Checkout</h3>

      <label>
        Full name
        <input
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Your name"
          required
        />
      </label>

      <label>
        Phone number
        <input
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="08012345678"
          required
        />
      </label>

      <label>
        Order method
        <select name="method" value={formData.method} onChange={onChange}>
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>
      </label>

      {formData.method === 'delivery' && (
        <label>
          Delivery address
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="No 2 Ezimgbu (Mummy-B) Link Road, Port Harcourt"
            rows="3"
            required
          />
        </label>
      )}

      <label>
        Notes
        <textarea
          name="note"
          value={formData.note}
          onChange={onChange}
          placeholder="Any special requests?"
          rows="2"
        />
      </label>

      <button className="button primary full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Placing order...' : 'Place order'}
      </button>
    </form>
  )
}
