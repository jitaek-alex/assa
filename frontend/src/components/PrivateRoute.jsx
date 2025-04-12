// src/components/PrivateRoute.jsx

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    // 로그인 페이지로 리다이렉트하면서 이전 위치 저장
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
