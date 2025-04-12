import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import VoucherPage from './pages/VoucherPage'
import ChartPage from './pages/ChartPage'
import RegisterPage from './pages/RegisterPage'
import MenuAccessOverview from './components/MenuAccessOverview'
import ChatBotPage from './pages/ChatBotPage'
import SalesPage from './pages/SalesPage'
import DashboardPage from './pages/DashboardPage'
import PrivateRoute from './components/PrivateRoute'
import FinancePage from './pages/FinancePage'
import AccessPage from './pages/AccessPage'
import DailySalesPage from './pages/DailySalesPage'
import UsersPage from './pages/UsersPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* ✅ 공개 페이지 */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ✅ 로그인 보호 페이지 */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/finance"
              element={
                <PrivateRoute>
                  <FinancePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/finance/daily-sales"
              element={
                <PrivateRoute>
                  <DailySalesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <ReportsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/access"
              element={
                <PrivateRoute>
                  <AccessPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/vouchers"
              element={
                <PrivateRoute>
                  <VoucherPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/chart"
              element={
                <PrivateRoute>
                  <ChartPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <PrivateRoute>
                  <ChatBotPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
