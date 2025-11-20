import { useState } from 'react'
import Welcome from './components/Welcome'
import Auth from './components/Auth'
import Scanner from './components/Scanner'
import Cart from './components/Cart'
import Manager from './components/Manager'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative max-w-5xl mx-auto p-6 space-y-6">
        <Welcome />

        {!user ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Auth onAuth={setUser} />
            <div className="space-y-4">
              <Scanner onAdd={(item)=>{ if(!user){ alert('Login first'); return } fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${user.user_id}/add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) }).then(r=>r.json()).then(()=>{}) }} />
              <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 text-blue-200">
                Use demo barcodes: PEN123, MILK123, CHOCO123. Seed products from manager after login.
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Scanner onAdd={(item)=>{ fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${user.user_id}/add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) }).then(r=>r.json()).then(()=>{}) }} />
              <Cart user={user} />
            </div>
            <div className="space-y-4">
              {user.role === 'manager' && (
                <>
                  <Manager />
                  <button onClick={() => fetch(`${import.meta.env.VITE_BACKEND_URL}/seed`, { method: 'POST' }).then(()=>alert('Seeded'))} className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded px-3 py-2">Seed Demo Products</button>
                </>
              )}
              <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 text-blue-200">
                Logged in as {user.name} ({user.role})
                <button className="ml-3 text-blue-300 underline" onClick={()=>setUser(null)}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
