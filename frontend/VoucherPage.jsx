import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/vouchers/')
      .then(res => setVouchers(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold mb-6 text-center">Vouchers</h2>
      <div className="space-y-4">
        {vouchers.map(v => (
          <div key={v.id} className="bg-zinc-800 p-4 rounded-md text-white">
            <div className="text-lg font-medium">🧾 {v.desc}</div>
            <div className="text-zinc-400">₩{v.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
