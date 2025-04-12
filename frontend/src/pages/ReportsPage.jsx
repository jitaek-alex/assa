import React, { useState } from 'react';
import { FaFileAlt, FaDownload, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  // 샘플 데이터
  const salesData = [
    { name: '1월', value: 4000 },
    { name: '2월', value: 3000 },
    { name: '3월', value: 2000 },
    { name: '4월', value: 2780 },
    { name: '5월', value: 1890 },
    { name: '6월', value: 2390 },
  ];

  const profitData = [
    { name: '1월', value: 2400 },
    { name: '2월', value: 1398 },
    { name: '3월', value: 9800 },
    { name: '4월', value: 3908 },
    { name: '5월', value: 4800 },
    { name: '6월', value: 3800 },
  ];

  const categoryData = [
    { name: '제품 A', value: 400 },
    { name: '제품 B', value: 300 },
    { name: '제품 C', value: 300 },
    { name: '제품 D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const reports = [
    { id: 'sales', name: '매출 보고서', icon: FaChartBar },
    { id: 'profit', name: '수익 보고서', icon: FaChartLine },
    { id: 'category', name: '카테고리 분석', icon: FaChartPie },
  ];

  const renderChart = () => {
    switch (selectedReport) {
      case 'sales':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'profit':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'category':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6 text-white tracking-tight font-mono uppercase">보고서</h1>
      
      <div className="bg-zinc-800 rounded-lg shadow-lg p-6 border border-zinc-700">
        {/* 상단 컨트롤 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {reports.map(report => {
                const Icon = report.icon;
                return (
                  <button
                    key={report.id}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      selectedReport === report.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <Icon className="mr-2" />
                    {report.name}
                  </button>
                );
              })}
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  dateRange === 'month' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
                onClick={() => setDateRange('month')}
              >
                월간
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  dateRange === 'quarter' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
                onClick={() => setDateRange('quarter')}
              >
                분기
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  dateRange === 'year' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
                onClick={() => setDateRange('year')}
              >
                연간
              </button>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <FaDownload className="mr-2" />
            보고서 다운로드
          </button>
        </div>

        {/* 차트 영역 */}
        <div className="bg-zinc-900 rounded-lg p-4">
          {renderChart()}
        </div>
      </div>
    </div>
  );
} 