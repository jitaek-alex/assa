// src/components/Header.jsx

import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineChevronDown, HiOutlineHome, HiOutlineCurrencyDollar, HiOutlineChartBar, HiOutlineCog, HiOutlineUser, HiOutlineLogout, HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState(null)
  const [username, setUsername] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    localStorage.removeItem('tenant_id')
    setIsLoggedIn(false)
    setRole(null)
    setUsername(null)
    navigate('/login')
  }

  // 로그인 상태 체크
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token')
    const storedRole = localStorage.getItem('role')
    const storedUsername = localStorage.getItem('username')
    const tenantId = localStorage.getItem('tenant_id')

    if (token && storedRole && storedUsername && tenantId) {
      setIsLoggedIn(true)
      setRole(storedRole)
      setUsername(storedUsername)
    } else {
      setIsLoggedIn(false)
      setRole(null)
      setUsername(null)
    }
  }

  // 로그인 상태 및 자동 로그아웃
  useEffect(() => {
    checkLoginStatus()
    
    // 로그인 상태 변경 감지를 위한 이벤트 리스너
    window.addEventListener('storage', checkLoginStatus)
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [pathname])

  // 남은 시간 계산
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token')
      if (token) {
        const loginTime = parseInt(localStorage.getItem('login_time') || Date.now().toString())
        const now = Date.now()
        const elapsedMinutes = Math.floor((now - loginTime) / (1000 * 60))
        setTimeLeft(`${elapsedMinutes}분 경과`)
      } else {
        setTimeLeft(null)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = (groupId) => {
    if (activeDropdown === groupId) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(groupId)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // 메뉴 그룹 정의
  const menuGroups = [
    {
      id: 'dashboard',
      name: '대시보드',
      path: '/dashboard',
      icon: HiOutlineHome,
    },
    {
      id: 'finance',
      name: '자금 관리',
      path: '/finance',
      icon: HiOutlineCurrencyDollar,
      submenus: [
        { name: '매출 현황', path: '/finance/sales' },
        { name: '일매출 입력', path: '/finance/daily-sales' },
        { name: '지출 관리', path: '/finance/expenses' },
        { name: '예산 관리', path: '/finance/budget' },
      ],
    },
    {
      id: 'analysis',
      name: '분석',
      path: '/analysis',
      icon: HiOutlineChartBar,
      submenus: [
        { name: '보고서', path: '/reports' },
        { name: '통계', path: '/statistics' },
        { name: '예측', path: '/forecasts' },
      ],
    },
    {
      id: 'management',
      name: '관리',
      path: '/management',
      icon: HiOutlineCog,
      submenus: [
        { name: '사용자 관리', path: '/users' },
        { name: '접근 권한', path: '/access' },
        { name: '시스템 설정', path: '/settings' },
      ],
    },
  ]

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-zinc-400 font-bold text-2xl tracking-tight pl-2 bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">JT MOTION LAB</h1>
        
        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuGroups.map((group) => {
            const Icon = group.icon
            return (
              <div key={group.id} className="relative" ref={dropdownRef}>
                <button
                  className={`flex items-center space-x-1 py-2 ${
                    pathname === group.path || 
                    (group.submenus && group.submenus.some(submenu => pathname === submenu.path))
                      ? 'text-blue-400'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                  onClick={() => group.submenus ? toggleDropdown(group.id) : navigate(group.path)}
                >
                  <Icon className="text-lg" />
                  <span>{group.name}</span>
                  {group.submenus && (
                    <HiOutlineChevronDown className={`text-xs transition-transform duration-200 ${
                      activeDropdown === group.id ? 'transform rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {/* 드롭다운 메뉴 */}
                {group.submenus && activeDropdown === group.id && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-zinc-800 rounded-md shadow-lg py-1 z-10 border border-zinc-700">
                    {group.submenus.map((submenu, index) => (
                      <Link
                        key={index}
                        to={submenu.path}
                        className={`block px-4 py-2 text-sm ${
                          pathname === submenu.path
                            ? 'text-blue-400 bg-zinc-700'
                            : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'
                        }`}
                      >
                        {submenu.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button 
          className="md:hidden text-zinc-300 hover:text-white"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
        </button>

        {/* 사용자 메뉴 */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button className="flex items-center space-x-1 text-zinc-300 hover:text-white">
                <HiOutlineUser className="text-lg" />
                <span className="bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">프로필</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-zinc-300 hover:text-white"
              >
                <HiOutlineLogout className="text-lg" />
                <span className="bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">로그아웃</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="flex items-center space-x-1 text-zinc-300 hover:text-white"
            >
              <HiOutlineUser className="text-lg" />
              <span className="bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">로그인</span>
            </Link>
          )}
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-800 border-t border-zinc-700">
          <div className="px-4 py-2 space-y-1">
            {menuGroups.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.id}>
                  <button
                    className={`w-full flex items-center justify-between py-2 ${
                      pathname === group.path
                        ? 'text-blue-400'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                    onClick={() => group.submenus ? toggleDropdown(group.id) : navigate(group.path)}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="text-lg" />
                      <span>{group.name}</span>
                    </div>
                    {group.submenus && (
                      <HiOutlineChevronDown className={`text-xs transition-transform duration-200 ${
                        activeDropdown === group.id ? 'transform rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {/* 모바일 드롭다운 메뉴 */}
                  {group.submenus && activeDropdown === group.id && (
                    <div className="pl-8 space-y-1">
                      {group.submenus.map((submenu, index) => (
                        <Link
                          key={index}
                          to={submenu.path}
                          className={`block py-2 text-sm ${
                            pathname === submenu.path
                              ? 'text-blue-400'
                              : 'text-zinc-300 hover:text-white'
                          }`}
                        >
                          {submenu.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            
            {/* 모바일 사용자 메뉴 */}
            <div className="pt-2 border-t border-zinc-700">
              {isLoggedIn ? (
                <>
                  <button className="w-full flex items-center space-x-2 py-2 text-zinc-300 hover:text-white">
                    <HiOutlineUser className="text-lg" />
                    <span>프로필</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 py-2 text-zinc-300 hover:text-white"
                  >
                    <HiOutlineLogout className="text-lg" />
                    <span>로그아웃</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center space-x-2 py-2 text-zinc-300 hover:text-white"
                >
                  <HiOutlineUser className="text-lg" />
                  <span>로그인</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
