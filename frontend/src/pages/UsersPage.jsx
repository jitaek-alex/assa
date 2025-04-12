import React, { useState } from 'react';
import { FaUser, FaUserPlus, FaUserEdit, FaUserMinus, FaSearch } from 'react-icons/fa';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // 샘플 사용자 데이터
  const users = [
    { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자', status: '활성', lastLogin: '2023-05-15 14:30' },
    { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자', status: '활성', lastLogin: '2023-05-14 09:15' },
    { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자', status: '비활성', lastLogin: '2023-05-10 11:45' },
    { id: 4, name: '박지민', email: 'park@example.com', role: '사용자', status: '활성', lastLogin: '2023-05-13 16:20' },
    { id: 5, name: '최민수', email: 'choi@example.com', role: '사용자', status: '활성', lastLogin: '2023-05-12 10:30' },
    { id: 6, name: '정수진', email: 'jung@example.com', role: '사용자', status: '활성', lastLogin: '2023-05-11 13:15' },
    { id: 7, name: '강동원', email: 'kang@example.com', role: '사용자', status: '비활성', lastLogin: '2023-05-09 15:40' },
    { id: 8, name: '윤서연', email: 'yoon@example.com', role: '사용자', status: '활성', lastLogin: '2023-05-08 09:50' },
  ];

  // 필터링된 사용자 목록
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && user.status === '활성';
    if (activeTab === 'inactive') return matchesSearch && user.status === '비활성';
    
    return matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6 text-white tracking-tight font-mono uppercase">사용자 관리</h1>
      
      <div className="bg-zinc-800 rounded-lg shadow-lg p-6 border border-zinc-700">
        {/* 상단 컨트롤 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="사용자 검색..."
                className="bg-zinc-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-zinc-400" />
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
                onClick={() => setActiveTab('all')}
              >
                전체
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
                onClick={() => setActiveTab('active')}
              >
                활성
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === 'inactive' ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
                onClick={() => setActiveTab('inactive')}
              >
                비활성
              </button>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <FaUserPlus className="mr-2" />
            새 사용자 추가
          </button>
        </div>

        {/* 사용자 테이블 */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">이메일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">역할</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">마지막 로그인</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-zinc-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === '활성' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <FaUserEdit />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <FaUserMinus />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 