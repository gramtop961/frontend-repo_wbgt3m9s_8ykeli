import { useEffect, useRef, useState } from 'react'

const Welcome = () => {
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef(null)

  useEffect(() => {
    const text = "Welcome to the Smart Self-Checkout. Tap login to begin, or scan an item to add it to your cart."
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 1
      u.pitch = 1
      u.onstart = () => setSpeaking(true)
      u.onend = () => setSpeaking(false)
      utteranceRef.current = u
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    }
    return () => window.speechSynthesis && window.speechSynthesis.cancel()
  }, [])

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-white">Smart Self‑Checkout</h1>
      <p className="text-blue-200">AI voice guidance is {speaking ? 'speaking…' : 'ready'}.</p>
    </div>
  )
}

export default Welcome
