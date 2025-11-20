import { useEffect, useState } from 'react'

const Cart = ({ user }) => {
  const API = import.meta.env.VITE_BACKEND_URL
  const [cart, setCart] = useState({ items: [], subtotal: 0 })
  const [order, setOrder] = useState(null)

  const fetchCart = async () => {
    const res = await fetch(`${API}/cart/${user.user_id}`)
    const data = await res.json()
    setCart(data)
  }

  useEffect(() => { fetchCart() }, [])

  const add = async (item) => {
    const res = await fetch(`${API}/cart/${user.user_id}/add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
    const data = await res.json()
    setCart(data)
  }

  const checkout = async () => {
    const res = await fetch(`${API}/checkout/${user.user_id}`, { method: 'POST' })
    const data = await res.json()
    if (res.ok) setOrder(data)
    else alert(data.detail || 'Checkout failed')
  }

  const pay = async () => {
    const res = await fetch(`${API}/pay/gpay/${order.order_id}`, { method: 'POST' })
    const data = await res.json()
    if (res.ok) alert('Payment success!')
    else alert(data.detail || 'Payment failed')
  }

  const sendReceipt = async (email, phone) => {
    const res = await fetch(`${API}/receipt/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order_id: order.order_id, email, phone }) })
    const data = await res.json()
    if (res.ok) alert('Receipt sent')
    else alert(data.detail || 'Failed to send receipt')
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <h3 className="text-white font-semibold">Your Cart</h3>
      <ul className="space-y-2">
        {cart.items?.map((i, idx) => (
          <li key={idx} className="flex justify-between text-blue-100">
            <span>{i.title} x {i.quantity}</span>
            <span>${(i.price * i.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between text-white font-semibold">
        <span>Subtotal</span>
        <span>${(cart.subtotal || 0).toFixed(2)}</span>
      </div>
      {!order ? (
        <button onClick={checkout} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded px-3 py-2">Checkout</button>
      ) : (
        <div className="space-y-2">
          <div className="text-blue-100">Order created. Total ${order.total.toFixed(2)}</div>
          <button onClick={pay} className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2">Pay with GPay</button>
          <div className="flex gap-2">
            <input placeholder="Email" className="flex-1 bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" id="email" />
            <input placeholder="Phone" className="flex-1 bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" id="phone" />
            <button onClick={()=>sendReceipt(document.getElementById('email').value, document.getElementById('phone').value)} className="bg-slate-700 hover:bg-slate-600 text-white rounded px-3 py-2">Send Receipt</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
