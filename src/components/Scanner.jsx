import { useState } from 'react'

const Scanner = ({ onAdd }) => {
  const [code, setCode] = useState('')
  const API = import.meta.env.VITE_BACKEND_URL

  const scan = async () => {
    if (!code) return
    try {
      const res = await fetch(`${API}/scan`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ barcode: code }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Not found')
      onAdd({ product_id: data.product_id, title: data.title, price: data.price, quantity: 1, barcode: data.barcode })
      setCode('')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <h3 className="text-white font-semibold">Scanner</h3>
      <div className="flex gap-2">
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter barcode or title" className="flex-1 bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" />
        <button onClick={scan} className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2">Add</button>
      </div>
      <p className="text-xs text-blue-200">IoT cameras can post to this API to auto-add after OpenCV decoding.</p>
    </div>
  )
}

export default Scanner
