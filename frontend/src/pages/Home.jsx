// src/pages/Home.jsx

import React from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <img
        src="/1.avif" // ✅ 로컬 이미지로 대체됨
        alt="AI Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Manage smarter with Autelligence
  
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg md:text-2xl text-zinc-300"
        >
          <TypewriterText />
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="mt-10 text-xl md:text-2xl text-brand font-bold tracking-wide drop-shadow-lg"
        >
	  <span className="text-white">your intelligent workshop assistant, driven by the power of AI.</span><br></br>
          JT MOTION LAB <span className="text-white">AI-Driven</span>  Innovation
        </motion.div>
      </div>
    </div>
  )
}

function TypewriterText() {
  const texts = [
    "Analyzing Transactions...",
    "Predicting Financial Trends...",
    "Generating Smart Reports...",
    "Optimizing Your Business..."
  ]
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % texts.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="animate-pulse">
      {texts[index]}
    </span>
  )
}
