import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ChatBotPage() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('jtalex_chat')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('jtalex_chat', JSON.stringify(history))
  }, [history])

  const handleSend = async () => {
    if (!message.trim()) return

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      alert("🚫 API 키가 설정되지 않았습니다. .env 파일을 확인해주세요!")
      return
    }

    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }]
        })
      })

      const data = await res.json()

      if (!res.ok) {
        const msg = data.error?.message || '❌ GPT 요청 오류'
        setResponse("❗ " + msg)
        console.error('⚠️ GPT 응답 오류:', msg)
        return
      }

      const content = data.choices?.[0]?.message?.content || '❗ 응답이 없습니다.'
      setResponse(content)
      setHistory(prev => [...prev, { question: message, answer: content }])
    } catch (err) {
      console.error("❌ API 요청 실패:", err)
      setResponse("❌ 서버 에러! 잠시 후 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-2xl text-white"
      >
        <h2 className="text-3xl font-semibold mb-6 tracking-tight text-center">
          <span className="text-brand">JT ALEX</span> Artificial Intelligence
        </h2>

        <textarea
          className="w-full p-4 rounded-xl bg-zinc-800/80 border border-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand transition"
          rows="5"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="궁금한점을 물어보세요.'"
        />

        <button
          onClick={handleSend}
          className="mt-4 w-full py-3 rounded-xl bg-brand hover:bg-blue-700 transition text-white font-semibold text-lg"
          disabled={loading}
        >
          {loading ? 'ALEX가 답변 중...' : 'ALEX 에게 묻기'}
        </button>

        <div className="text-xs text-zinc-500 text-center mt-2">
          {loading ? "🧠 ALEX 응답 중..." : `🔋 JT ALEX Ready`}
        </div>

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-zinc-900/90 border border-zinc-700 rounded-xl p-4"
          >
            <h3 className="text-brand font-semibold mb-2">🧠 ALEX 응답</h3>
            <pre className="whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed">{response}</pre>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}