import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      console.log('로그인 시도:', { username, password })
      
      const response = await axios.post('/api/login', {
        username: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      console.log('로그인 응답:', response.data)

      const { access_token, role, tenant_id } = response.data

      // 토큰과 사용자 정보 저장
      localStorage.setItem('token', access_token)
      localStorage.setItem('role', role)
      localStorage.setItem('username', username)
      localStorage.setItem('tenant_id', tenant_id)
      localStorage.setItem('login_time', Date.now().toString())

      console.log('로그인 성공! 저장된 정보:', {
        token: access_token,
        role,
        username,
        tenant_id
      })

      // 역할에 따라 다른 페이지로 이동
      if (role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/sales')
      }

    } catch (err) {
      console.error('로그인 오류:', err.response?.data || err.message)
      let errorMessage = '❌ 로그인 실패! 아이디/비밀번호를 다시 확인해주세요.'
      
      if (err.response?.data) {
        if (Array.isArray(err.response.data)) {
          // 필드 검증 오류 처리
          errorMessage = err.response.data.map(e => e.msg).join(', ')
        } else if (typeof err.response.data === 'object') {
          // 객체 형태의 에러 처리
          if (err.response.data.detail) {
            errorMessage = err.response.data.detail
          } else if (err.response.data.msg) {
            errorMessage = err.response.data.msg
          } else {
            errorMessage = JSON.stringify(err.response.data)
          }
        } else {
          errorMessage = err.response.data
        }
      }
      
      setError(errorMessage)
    }
  }

  return (
    <div className="max-w-md mx-auto py-20 px-6 text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">🔐 Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 bg-zinc-800 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 bg-zinc-800 rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button 
          className="w-full bg-brand py-2 rounded text-white hover:bg-blue-700 transition"
          type="submit"
        >
          로그인
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </div>
  )
}
