import React, { useState } from 'react';
import { FaUserShield, FaLock, FaUnlock, FaUserPlus, FaUserMinus } from 'react-icons/fa';

export default function AccessPage() {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchTerm, setSearchTerm] = useState('');

  // 샘플 데이터
  const roles = [
    { id: 1, name: '관리자', description: '시스템 전체 관리 권한', userCount: 3 },
    { id: 2, name: '회계담당자', description: '회계 관련 기능 접근 권한', userCount: 5 },
    { id: 3, name: '일반사용자', description: '기본 기능 접근 권한', userCount: 8 },
  ];

  const permissions = [
    { id: 1, name: '사용자 관리', description: '사용자 추가/수정/삭제', roles: ['관리자'] },
    { id: 2, name: '회계 관리', description: '회계 데이터 관리', roles: ['관리자', '회계담당자'] },
    { id: 3, name: '보고서 생성', description: '보고서 생성 및 조회', roles: ['관리자', '회계담당자'] },
    { id: 4, name: '데이터 조회', description: '기본 데이터 조회', roles: ['관리자', '회계담당자', '일반사용자'] },
  ];

  const roleUsers = [
    { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자', status: '활성' },
    { id: 2, name: '김철수', email: 'kim@example.com', role: '회계담당자', status: '활성' },
    { id: 3, name: '이영희', email: 'lee@example.com', role: '일반사용자', status: '활성' },
  ];

  const renderRolesContent = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <FaUserShield className="mr-2" />
          새 역할 추가
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(role => (
          <div key={role.id} className="bg-zinc-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">{role.name}</h3>
              <div className="flex space-x-2">
                <button className="text-blue-400 hover:text-blue-300">
                  <FaUserPlus />
                </button>
                <button className="text-red-400 hover:text-red-300">
                  <FaUserMinus />
                </button>
              </div>
            </div>
            <p className="text-zinc-400 text-sm mb-2">{role.description}</p>
            <div className="text-zinc-300 text-sm">
              사용자 수: {role.userCount}명
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPermissionsContent = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">권한</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">설명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">역할</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {permissions.map(permission => (
              <tr key={permission.id} className="hover:bg-zinc-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{permission.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{permission.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                  {permission.roles.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <FaLock />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <FaUnlock />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsersContent = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="사용자 검색..."
            className="bg-zinc-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaUserShield className="absolute left-3 top-3 text-zinc-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">역할</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {roleUsers.map(user => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      <FaLock />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <FaUnlock />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6 text-white tracking-tight font-mono uppercase">접근 권한 관리</h1>
      
      <div className="bg-zinc-800 rounded-lg shadow-lg p-6 border border-zinc-700">
        {/* 탭 메뉴 */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'roles'
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
            }`}
            onClick={() => setActiveTab('roles')}
          >
            역할 관리
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'permissions'
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
            }`}
            onClick={() => setActiveTab('permissions')}
          >
            권한 관리
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'users'
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
            }`}
            onClick={() => setActiveTab('users')}
          >
            사용자 권한
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        {activeTab === 'roles' && renderRolesContent()}
        {activeTab === 'permissions' && renderPermissionsContent()}
        {activeTab === 'users' && renderUsersContent()}
      </div>
    </div>
  );
} 