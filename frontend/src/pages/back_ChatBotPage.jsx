import React, { useState } from 'react'

export default function ChatBotPage() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message) return
    setLoading(true)

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    })

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content || 'No response'
    setResponse(content)
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto py-20 text-white">
      <h2 className="text-2xl font-semibold mb-6">🤖 JT ALEX ChatBot</h2>
      <textarea
        className="w-full p-2 bg-zinc-800 rounded mb-4"
        rows="4"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="질문을 입력하세요..."
      />
      <button
        onClick={handleSend}
        className="bg-brand px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? '생각 중...' : 'GPT에게 묻기'}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-zinc-900 rounded">
          <h3 className="font-semibold text-brand mb-2">🧠 GPT 응답:</h3>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  )
}
