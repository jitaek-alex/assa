import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MenuAccessOverview() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token || role !== 'admin') {
      setError('🚫 접근 권한이 없습니다.')
      navigate('/login')
      return
    }

    axios.get('/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(() => {
        setError('🚫 인증 실패! 다시 로그인 해주세요.')
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [navigate])

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 text-sm">
      <h2 className="text-xl font-semibold mb-6">🧭 메뉴 접근 권한 개요</h2>
      {message && (
        <table className="w-full text-left border border-zinc-800">
          <thead className="bg-zinc-800 text-zinc-400">
            <tr>
              <th className="p-2 border-r border-zinc-700">메뉴</th>
              <th className="p-2 border-r border-zinc-700">설명</th>
              <th className="p-2">접근 권한</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-900 text-white">
            <tr className="border-t border-zinc-800">
              <td className="p-2">홈</td>
              <td className="p-2">대시보드 개요</td>
              <td className="p-2">모두</td>
            </tr>
            <tr className="border-t border-zinc-800">
              <td className="p-2">전표 관리</td>
              <td className="p-2">전표 등록 / 수정 / 삭제</td>
              <td className="p-2">관리자, 회계직원</td>
            </tr>
            <tr className="border-t border-zinc-800">
              <td className="p-2">차트 분석</td>
              <td className="p-2">비주얼 리포트</td>
              <td className="p-2">관리자, 직원</td>
            </tr>
            <tr className="border-t border-zinc-800">
              <td className="p-2">사용자 관리</td>
              <td className="p-2">사용자 목록, 권한 변경</td>
              <td className="p-2 text-brand">관리자 전용</td>
            </tr>
          </tbody>
        </table>
      )}
      {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
    </section>
  )
}

