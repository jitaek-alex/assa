import React, { useState } from 'react';
import { FaChartLine, FaChartBar, FaChartPie, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function FinancePage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [monthlySalesData, setMonthlySalesData] = useState([
    { name: '1월', amount: 4000 },
    { name: '2월', amount: 3000 },
    { name: '3월', amount: 2000 },
    { name: '4월', amount: 2780 },
    { name: '5월', amount: 1890 },
    { name: '6월', amount: 2390 },
    { name: '7월', amount: 3490 },
    { name: '8월', amount: 2000 },
    { name: '9월', amount: 2780 },
    { name: '10월', amount: 1890 },
    { name: '11월', amount: 2390 },
    { name: '12월', amount: 3490 },
  ]);

  const [dailySalesData, setDailySalesData] = useState([
    { date: '1일', sales: 120000, expenses: 80000, profit: 40000 },
    { date: '2일', sales: 150000, expenses: 90000, profit: 60000 },
    { date: '3일', sales: 180000, expenses: 100000, profit: 80000 },
    { date: '4일', sales: 140000, expenses: 85000, profit: 55000 },
    { date: '5일', sales: 160000, expenses: 95000, profit: 65000 },
    { date: '6일', sales: 170000, expenses: 98000, profit: 72000 },
    { date: '7일', sales: 190000, expenses: 105000, profit: 85000 },
    { date: '8일', sales: 210000, expenses: 115000, profit: 95000 },
    { date: '9일', sales: 230000, expenses: 125000, profit: 105000 },
    { date: '10일', sales: 250000, expenses: 135000, profit: 115000 },
    { date: '11일', sales: 270000, expenses: 145000, profit: 125000 },
    { date: '12일', sales: 290000, expenses: 155000, profit: 135000 },
    { date: '13일', sales: 310000, expenses: 165000, profit: 145000 },
    { date: '14일', sales: 330000, expenses: 175000, profit: 155000 },
    { date: '15일', sales: 350000, expenses: 185000, profit: 165000 },
    { date: '16일', sales: 370000, expenses: 195000, profit: 175000 },
    { date: '17일', sales: 390000, expenses: 205000, profit: 185000 },
    { date: '18일', sales: 410000, expenses: 215000, profit: 195000 },
    { date: '19일', sales: 430000, expenses: 225000, profit: 205000 },
    { date: '20일', sales: 450000, expenses: 235000, profit: 215000 },
    { date: '21일', sales: 470000, expenses: 245000, profit: 225000 },
    { date: '22일', sales: 490000, expenses: 255000, profit: 235000 },
    { date: '23일', sales: 510000, expenses: 265000, profit: 245000 },
    { date: '24일', sales: 530000, expenses: 275000, profit: 255000 },
    { date: '25일', sales: 550000, expenses: 285000, profit: 265000 },
    { date: '26일', sales: 570000, expenses: 295000, profit: 275000 },
    { date: '27일', sales: 590000, expenses: 305000, profit: 285000 },
    { date: '28일', sales: 610000, expenses: 315000, profit: 295000 },
    { date: '29일', sales: 630000, expenses: 325000, profit: 305000 },
    { date: '30일', sales: 650000, expenses: 335000, profit: 315000 },
    { date: '31일', sales: 670000, expenses: 345000, profit: 325000 },
  ]);

  const [profitLossData, setProfitLossData] = useState([
    { name: '매출', value: 65, percentage: '65%' },
    { name: '비용', value: 35, percentage: '35%' },
  ]);

  const COLORS = ['#3b82f6', '#ef4444'];

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-bold mb-4 text-white tracking-tight font-mono uppercase">자금 현황</h1>
      
      {/* 월별 매출 현황 - 전체 너비 */}
      <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 mb-4 border border-zinc-700">
        <div className="flex items-center mb-2">
          <FaChartLine className="text-blue-500 text-xl mr-2" />
          <h2 className="text-lg font-semibold text-white tracking-wide">월별 매출 현황</h2>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" fontSize={12} />
              <YAxis stroke="#aaa" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff', fontSize: '12px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 일별 손익 현황 - 전체 너비 */}
      <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 mb-4 border border-zinc-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaChartBar className="text-green-500 text-xl mr-2" />
            <h2 className="text-lg font-semibold text-white tracking-wide">일별 손익 현황</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-zinc-700 transition-colors"
            >
              <FaChevronLeft className="text-white text-sm" />
            </button>
            <span className="text-white font-medium text-sm">
              {selectedYear}년 {selectedMonth}월
            </span>
            <button 
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-zinc-700 transition-colors"
            >
              <FaChevronRight className="text-white text-sm" />
            </button>
          </div>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#aaa" fontSize={12} />
              <YAxis stroke="#aaa" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff', fontSize: '12px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" name="매출" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="비용" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#10b981" name="순이익" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 손익 비율 카드 */}
      <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-zinc-700">
        <div className="flex items-center mb-2">
          <FaChartPie className="text-purple-500 text-xl mr-2" />
          <h2 className="text-lg font-semibold text-white tracking-wide">손익 비율</h2>
        </div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={profitLossData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}`}
                labelLine={false}
              >
                {profitLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff', fontSize: '12px' }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-3 space-x-4">
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-1.5"></div>
            <span className="text-gray-400 text-sm">매출</span>
          </div>
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full mr-1.5"></div>
            <span className="text-gray-400 text-sm">비용</span>
          </div>
        </div>
      </div>
    </div>
  );
} 