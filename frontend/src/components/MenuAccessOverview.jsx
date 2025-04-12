import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MenuAccessOverview() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const msg = res.data.message
        const match = msg.match(/Hello (\w+),/)
        if (match) setUsername(match[1])
      } catch (err) {
        setError('🔒 접근 거부됨. 로그인 후 다시 시도하세요.')
      }
    }
    fetchProtected()
  }, [])

  if (error) {
    return (
      <div className="max-w-md mx-auto py-20 px-6 text-center text-red-500">
        <h2 className="text-xl font-semibold mb-4">🚫 접근 불가</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 text-sm text-white">
      <h2 className="text-xl font-semibold mb-4">🔐 환영합니다, {username}님!</h2>
      <h3 className="text-lg font-medium mb-6">🧭 메뉴 접근 권한 개요</h3>
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
    </section>
  )
}
