import React, { useState } from 'react';
import { FaCog, FaBell, FaLock, FaPalette, FaLanguage, FaDatabase } from 'react-icons/fa';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sound: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
    appearance: {
      theme: 'dark',
      fontSize: 'medium',
      language: 'ko',
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
    },
  });

  const tabs = [
    { id: 'general', name: '일반', icon: FaCog },
    { id: 'notifications', name: '알림', icon: FaBell },
    { id: 'security', name: '보안', icon: FaLock },
    { id: 'appearance', name: '외관', icon: FaPalette },
    { id: 'language', name: '언어', icon: FaLanguage },
    { id: 'system', name: '시스템', icon: FaDatabase },
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
              <div>
                <h3 className="text-white font-medium">자동 로그인</h3>
                <p className="text-zinc-400 text-sm">브라우저를 닫았다가 다시 열어도 로그인 상태 유지</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
              <div>
                <h3 className="text-white font-medium">시작 페이지</h3>
                <p className="text-zinc-400 text-sm">로그인 후 처음 보여질 페이지 설정</p>
              </div>
              <select className="bg-zinc-600 text-white rounded-md px-3 py-2">
                <option value="dashboard">대시보드</option>
                <option value="finance">자금 관리</option>
                <option value="reports">보고서</option>
              </select>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
              <div>
                <h3 className="text-white font-medium">이메일 알림</h3>
                <p className="text-zinc-400 text-sm">중요한 업데이트를 이메일로 받기</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
              <div>
                <h3 className="text-white font-medium">푸시 알림</h3>
                <p className="text-zinc-400 text-sm">브라우저 푸시 알림 받기</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
              <div>
                <h3 className="text-white font-medium">2단계 인증</h3>
                <p className="text-zinc-400 text-sm">로그인 시 추가 보안 단계 활성화</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="text-white font-medium mb-2">세션 타임아웃</h3>
              <p className="text-zinc-400 text-sm mb-4">자동 로그아웃 시간 설정</p>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="bg-zinc-600 text-white rounded-md px-3 py-2 w-full"
              >
                <option value="15">15분</option>
                <option value="30">30분</option>
                <option value="60">1시간</option>
                <option value="120">2시간</option>
              </select>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="text-white font-medium mb-2">테마</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 bg-zinc-800 rounded-lg border-2 border-blue-500">
                  <div className="w-full h-8 bg-zinc-900 rounded mb-2"></div>
                  <p className="text-white text-sm">다크</p>
                </button>
                <button className="p-4 bg-zinc-800 rounded-lg">
                  <div className="w-full h-8 bg-white rounded mb-2"></div>
                  <p className="text-white text-sm">라이트</p>
                </button>
                <button className="p-4 bg-zinc-800 rounded-lg">
                  <div className="w-full h-8 bg-blue-900 rounded mb-2"></div>
                  <p className="text-white text-sm">시스템</p>
                </button>
              </div>
            </div>
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="text-white font-medium mb-2">글자 크기</h3>
              <select
                value={settings.appearance.fontSize}
                onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                className="bg-zinc-600 text-white rounded-md px-3 py-2 w-full"
              >
                <option value="small">작게</option>
                <option value="medium">보통</option>
                <option value="large">크게</option>
              </select>
            </div>
          </div>
        );
      case 'language':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="text-white font-medium mb-2">언어 설정</h3>
              <select
                value={settings.appearance.language}
                onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                className="bg-zinc-600 text-white rounded-md px-3 py-2 w-full"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        );
      case 'system':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
              <div>
                <h3 className="text-white font-medium">자동 백업</h3>
                <p className="text-zinc-400 text-sm">데이터 자동 백업 활성화</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.autoBackup}
                  onChange={(e) => handleSettingChange('system', 'autoBackup', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="p-4 bg-zinc-700 rounded-lg">
              <h3 className="text-white font-medium mb-2">백업 주기</h3>
              <select
                value={settings.system.backupFrequency}
                onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
                className="bg-zinc-600 text-white rounded-md px-3 py-2 w-full"
              >
                <option value="daily">매일</option>
                <option value="weekly">매주</option>
                <option value="monthly">매월</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6 text-white tracking-tight font-mono uppercase">설정</h1>
      
      <div className="bg-zinc-800 rounded-lg shadow-lg p-6 border border-zinc-700">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 사이드바 */}
          <div className="w-full md:w-64 space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-zinc-300 hover:bg-zinc-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="text-lg" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* 설정 내용 */}
          <div className="flex-1">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 