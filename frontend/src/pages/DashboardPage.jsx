import React from 'react';
import { FaUsers, FaFileInvoice, FaServer, FaBell, FaCog } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-bold mb-4 text-white tracking-tight font-mono uppercase">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 사용자 관리 카드 */}
        <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-zinc-700">
          <div className="flex items-center mb-2">
            <FaUsers className="text-blue-500 text-xl mr-2" />
            <h2 className="text-lg font-semibold text-white tracking-wide">사용자 관리</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">전체 사용자</span>
              <span className="text-white font-medium">128명</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">활성 사용자</span>
              <span className="text-white font-medium">98명</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">신규 가입</span>
              <span className="text-white font-medium">12명</span>
            </div>
          </div>
        </div>

        {/* 전표 현황 카드 */}
        <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-zinc-700">
          <div className="flex items-center mb-2">
            <FaFileInvoice className="text-green-500 text-xl mr-2" />
            <h2 className="text-lg font-semibold text-white tracking-wide">전표 현황</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">전체 전표</span>
              <span className="text-white font-medium">1,234개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">승인 대기</span>
              <span className="text-white font-medium">45개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">오늘의 전표</span>
              <span className="text-white font-medium">23개</span>
            </div>
          </div>
        </div>

        {/* 시스템 상태 카드 */}
        <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-zinc-700">
          <div className="flex items-center mb-2">
            <FaServer className="text-purple-500 text-xl mr-2" />
            <h2 className="text-lg font-semibold text-white tracking-wide">시스템 상태</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">서버 상태</span>
              <span className="text-green-500 font-medium">정상</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">데이터베이스</span>
              <span className="text-green-500 font-medium">정상</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">백업 상태</span>
              <span className="text-green-500 font-medium">완료</span>
            </div>
          </div>
        </div>

        {/* 알림 카드 */}
        <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-zinc-700">
          <div className="flex items-center mb-2">
            <FaBell className="text-yellow-500 text-xl mr-2" />
            <h2 className="text-lg font-semibold text-white tracking-wide">알림</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">새로운 사용자</span>
              <span className="text-white font-medium">3명</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">승인 대기</span>
              <span className="text-white font-medium">5건</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">시스템 알림</span>
              <span className="text-white font-medium">2건</span>
            </div>
          </div>
        </div>

        {/* 설정 카드 */}
        <div className="bg-zinc-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-zinc-700">
          <div className="flex items-center mb-2">
            <FaCog className="text-gray-500 text-xl mr-2" />
            <h2 className="text-lg font-semibold text-white tracking-wide">설정</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">자동 백업</span>
              <span className="text-green-500 font-medium">활성화</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">알림 설정</span>
              <span className="text-green-500 font-medium">활성화</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">보안 설정</span>
              <span className="text-green-500 font-medium">활성화</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 