import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FaDollarSign, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table } from 'antd';

const Earnings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    { key: 1, bookingId: 'BK-001', customer: 'John Doe', date: '2025-11-28', amount: 120.00, status: 'Completed' },
    { key: 2, bookingId: 'BK-002', customer: 'Jane Smith', date: '2025-11-27', amount: 95.50, status: 'Completed' },
    { key: 3, bookingId: 'BK-003', customer: 'Robert Johnson', date: '2025-11-26', amount: 150.00, status: 'Refunded' },
    { key: 4, bookingId: 'BK-004', customer: 'Emily Davis', date: '2025-11-25', amount: 85.25, status: 'Completed' },
    { key: 5, bookingId: 'BK-005', customer: 'Michael Brown', date: '2025-11-24', amount: 110.75, status: 'Completed' },
    { key: 6, bookingId: 'BK-006', customer: 'Sarah Wilson', date: '2025-11-23', amount: 135.00, status: 'Completed' },
    { key: 7, bookingId: 'BK-007', customer: 'David Martinez', date: '2025-11-22', amount: 98.50, status: 'Refunded' },
    { key: 8, bookingId: 'BK-008', customer: 'Lisa Anderson', date: '2025-11-21', amount: 125.00, status: 'Completed' },
    { key: 9, bookingId: 'BK-009', customer: 'James Taylor', date: '2025-11-20', amount: 105.25, status: 'Completed' },
    { key: 10, bookingId: 'BK-010', customer: 'Maria Garcia', date: '2025-11-19', amount: 140.00, status: 'Completed' },
    { key: 11, bookingId: 'BK-011', customer: 'Thomas Lee', date: '2025-11-18', amount: 115.50, status: 'Completed' },
  ];

  const totalEarnings = transactions
    .filter(tx => tx.status === 'Completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount) => <span className="font-medium">${amount.toFixed(2)}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      render: (status) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Modern Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 md:px-6 py-4 md:py-5 rounded-2xl mb-5 shadow-lg">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Earnings</h1>

          {/* Desktop Search */}
          <div className="hidden md:flex ml-auto gap-3">
            <div className="relative">
              <input
                type="text"
                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Total Earnings</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                ${totalEarnings.toFixed(2)}
              </p>
              <p className="text-sm text-green-600 mt-2 font-medium">+12% from last week</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaDollarSign className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Completed Rides</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                {transactions.filter(t => t.status === 'Completed').length}
              </p>
              <p className="text-sm text-green-600 mt-2 font-medium">+4 from last week</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaCheckCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Average per Ride</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                ${(totalEarnings / transactions.filter(t => t.status === 'Completed').length).toFixed(2)}
              </p>
              <p className="text-sm text-red-600 mt-2 font-medium">-2% from last week</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaChartLine className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              colorPrimary: "#2563eb",
              colorPrimaryHover: "#1d4ed8",
            },
            Table: {
              headerBg: '#60a5fa',
              headerColor: '#ffffff',
              cellFontSize: 14,
              headerSplitColor: 'transparent',
              borderColor: '#e5e7eb',
            },
          },
        }}
      >
        <Table
          dataSource={transactions}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          className="custom-earnings-table"
        />

        <style jsx global>{`
          .custom-earnings-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-earnings-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-earnings-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
      </ConfigProvider>
    </div>
  );
};

export default Earnings;