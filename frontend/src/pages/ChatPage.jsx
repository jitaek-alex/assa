import React, { useState } from 'react'
import axios from 'axios'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json',
          }
        }
      )

      const botMessage = res.data.choices[0].message
      setMessages([...newMessages, botMessage])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ 오류 발생!' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h2 className="text-2xl font-semibold mb-4">🤖 Chat with GPT</h2>

      <div className="bg-zinc-800 rounded p-4 h-[60vh] overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-3 rounded ${msg.role === 'user' ? 'bg-brand text-white text-right' : 'bg-zinc-700 text-left'}`}>
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-sm text-zinc-400">GPT is thinking...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 bg-zinc-700 rounded"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-brand px-4 rounded hover:bg-blue-700 transition">Send</button>
      </form>
    </div>
  )
}
