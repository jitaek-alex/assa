import React, { useState } from 'react';
import { HiOutlineCalendar, HiOutlineCurrencyDollar } from 'react-icons/hi';

export default function DailySalesPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [salesAmount, setSalesAmount] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/sales/daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          date: selectedDate,
          amount: parseFloat(salesAmount),
          memo: memo
        })
      });

      if (response.ok) {
        alert('일매출이 성공적으로 등록되었습니다.');
        setSalesAmount('');
        setMemo('');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.detail || '일매출 등록에 실패했습니다.';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-zinc-400 bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">
        일매출 입력
      </h1>

      <div className="bg-zinc-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              날짜
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <HiOutlineCalendar className="absolute right-3 top-2.5 text-zinc-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              매출액
            </label>
            <div className="relative">
              <input
                type="number"
                value={salesAmount}
                onChange={(e) => setSalesAmount(e.target.value)}
                placeholder="매출액을 입력하세요"
                className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <HiOutlineCurrencyDollar className="absolute right-3 top-2.5 text-zinc-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              메모
            </label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요"
              className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 