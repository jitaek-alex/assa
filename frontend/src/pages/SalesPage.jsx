import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SalesPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carNumber: '',
    workDate: new Date().toISOString().split('T')[0],
    paymentType: '선결',
    paymentMethod: '카드',
    cardAmount: 0,
    cashAmount: 0,
    totalAmount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'paymentMethod') {
      // 결제 방법이 변경될 때 금액 필드 초기화
      if (value !== '카드+현금') {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          cardAmount: 0,
          cashAmount: 0,
          totalAmount: 0
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else if (name === 'cardAmount' || name === 'cashAmount') {
      const amount = parseFloat(value) || 0;
      setFormData(prev => {
        const cardAmount = name === 'cardAmount' ? amount : prev.cardAmount;
        const cashAmount = name === 'cashAmount' ? amount : prev.cashAmount;
        return {
          ...prev,
          [name]: amount,
          totalAmount: cardAmount + cashAmount
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sales/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('매출이 성공적으로 등록되었습니다.');
        navigate('/sales');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.detail || '오류가 발생했습니다.';
        alert(`오류가 발생했습니다: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">일일 매출 입력</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carNumber">
            차량번호
          </label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            value={formData.carNumber}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workDate">
            작업일자
          </label>
          <input
            type="date"
            id="workDate"
            name="workDate"
            value={formData.workDate}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentType">
            결제구분
          </label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="선결">선결</option>
            <option value="부분선결">부분선결</option>
            <option value="작업완료후 결제">작업완료후 결제</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
            결제방법
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="카드">카드</option>
            <option value="현금">현금</option>
            <option value="카드+현금">카드+현금</option>
          </select>
        </div>

        {formData.paymentMethod === '카드+현금' ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardAmount">
                카드 금액
              </label>
              <input
                type="number"
                id="cardAmount"
                name="cardAmount"
                value={formData.cardAmount}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min="0"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cashAmount">
                현금 금액
              </label>
              <input
                type="number"
                id="cashAmount"
                name="cashAmount"
                value={formData.cashAmount}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min="0"
                required
              />
            </div>
          </>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalAmount">
              {formData.paymentMethod === '카드' ? '카드 금액' : '현금 금액'}
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold">
            총 금액: {formData.totalAmount.toLocaleString()}원
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
} 