import { useEffect, useState } from 'react'

const Manager = () => {
  const API = import.meta.env.VITE_BACKEND_URL
  const [stats, setStats] = useState(null)

  const fetchStats = async () => {
    const res = await fetch(`${API}/manager/stats`)
    const data = await res.json()
    setStats(data)
  }

  useEffect(() => { fetchStats() }, [])

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <h3 className="text-white font-semibold">Manager Dashboard</h3>
      {!stats ? (
        <div className="text-blue-200">Loading…</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 text-white">
          <div className="bg-slate-900/60 p-3 rounded">Total items: {stats.total_items}</div>
          <div className="bg-slate-900/60 p-3 rounded">Sold items: {stats.sold_items}</div>
          <div className="bg-slate-900/60 p-3 rounded">Remaining: {stats.remaining_items}</div>
          <div className="bg-slate-900/60 p-3 rounded">Daily revenue: ${Number(stats.daily_revenue).toFixed(2)}</div>
        </div>
      )}
    </div>
  )
}

export default Manager
