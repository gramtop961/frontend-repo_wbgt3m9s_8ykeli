import { useState } from 'react'

const Auth = ({ onAuth }) => {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'customer' })
  const API = import.meta.env.VITE_BACKEND_URL

  const submit = async (e) => {
    e.preventDefault()
    try {
      const url = mode === 'login' ? `${API}/auth/login` : `${API}/auth/register`
      const body = mode === 'login' ? { email: form.email, password: form.password } : form
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      if (mode === 'register') {
        // After register, auto login
        const res2 = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email, password: form.password }) })
        const data2 = await res2.json()
        if (!res2.ok) throw new Error(data2.detail || 'Login failed')
        onAuth(data2)
      } else {
        onAuth(data)
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
      <div className="flex gap-2 mb-4">
        <button className={`px-3 py-1 rounded ${mode==='login'?'bg-blue-600 text-white':'bg-slate-700 text-blue-200'}`} onClick={()=>setMode('login')}>Login</button>
        <button className={`px-3 py-1 rounded ${mode==='register'?'bg-blue-600 text-white':'bg-slate-700 text-blue-200'}`} onClick={()=>setMode('register')}>Register</button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        {mode==='register' && (
          <input className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        )}
        <input className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        {mode==='register' && (
          <input className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        )}
        <input className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        {mode==='register' && (
          <select className="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-white" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
          </select>
        )}
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2">{mode==='login'?'Login':'Create account'}</button>
      </form>
    </div>
  )
}

export default Auth
