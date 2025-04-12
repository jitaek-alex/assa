import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tenantId, setTenantId] = useState('') // ✅ 추가
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/register', {
        username,
        email,
        password
      })
      if (res.data.success) {
        setSuccess(true)
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto py-20 px-6 text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">📝 Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="w-full p-2 bg-zinc-800 rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full p-2 bg-zinc-800 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 bg-zinc-800 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-brand py-2 rounded text-white hover:bg-blue-700 transition">Create Account</button>
      </form>
      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-sm">회원가입 성공! 로그인으로 이동합니다...</p>}
    </div>
  )
}
