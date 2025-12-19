import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FaCalendarCheck, FaClock, FaMapMarkerAlt, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const Bookings = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const showViewModal = (record) => {
        setSelectedRecord(record);
        setIsViewModalOpen(true);
    };

    const handleModalClose = () => {
        setIsViewModalOpen(false);
        setSelectedRecord(null);
    };

    // Sample data for bookings - 11 entries
    const bookings = [
        { key: 1, bookingId: 'BK-001', customer: 'John Doe', date: '2025-11-28', pickup: 'Dublin Airport', dropoff: 'City Center', status: 'Completed' },
        { key: 2, bookingId: 'BK-002', customer: 'Jane Smith', date: '2025-11-27', pickup: 'Galway', dropoff: 'Cliffs of Moher', status: 'Completed' },
        { key: 3, bookingId: 'BK-003', customer: 'Robert Johnson', date: '2025-11-26', pickup: 'Cork', dropoff: 'Blarney Castle', status: 'Cancelled' },
        { key: 4, bookingId: 'BK-004', customer: 'Emily Davis', date: '2025-11-25', pickup: 'Belfast', dropoff: 'Giant\'s Causeway', status: 'Completed' },
        { key: 5, bookingId: 'BK-005', customer: 'Michael Brown', date: '2025-11-24', pickup: 'Limerick', dropoff: 'Bunratty Castle', status: 'Completed' },
        { key: 6, bookingId: 'BK-006', customer: 'Sarah Wilson', date: '2025-11-23', pickup: 'Killarney', dropoff: 'Ring of Kerry', status: 'Completed' },
        { key: 7, bookingId: 'BK-007', customer: 'David Martinez', date: '2025-11-22', pickup: 'Waterford', dropoff: 'Dunmore East', status: 'Cancelled' },
        { key: 8, bookingId: 'BK-008', customer: 'Lisa Anderson', date: '2025-11-21', pickup: 'Derry', dropoff: 'Derry Walls', status: 'Completed' },
        { key: 9, bookingId: 'BK-009', customer: 'James Taylor', date: '2025-11-20', pickup: 'Sligo', dropoff: 'Benbulben', status: 'Pending' },
        { key: 10, bookingId: 'BK-010', customer: 'Maria Garcia', date: '2025-11-19', pickup: 'Wexford', dropoff: 'Hook Lighthouse', status: 'Completed' },
        { key: 11, bookingId: 'BK-011', customer: 'Thomas Lee', date: '2025-11-18', pickup: 'Donegal', dropoff: 'Slieve League', status: 'Pending' },
    ];

    // Calculate stats
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

    // Table columns
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
            title: 'Pickup',
            dataIndex: 'pickup',
            key: 'pickup',
        },
        {
            title: 'Dropoff',
            dataIndex: 'dropoff',
            key: 'dropoff',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'Completed' ? 'bg-green-100 text-green-800' :
                    status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {status}
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (_, record) => (
                <button
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    onClick={() => showViewModal(record)}
                >
                    <FaRegEye className="text-blue-600 w-5 h-5" />
                </button>
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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Bookings</h1>

                    {/* Desktop Search */}
                    <div className="hidden md:flex ml-auto gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                                placeholder="Search bookings..."
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
                            placeholder="Search bookings..."
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
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Total Bookings</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                {totalBookings}
                            </p>
                            <p className="text-sm text-green-600 mt-2 font-medium">+8% from last week</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FaCalendarCheck className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Completed</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                {completedBookings}
                            </p>
                            <p className="text-sm text-green-600 mt-2 font-medium">+5 from last week</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FaMapMarkerAlt className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-amber-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Pending</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                                {pendingBookings}
                            </p>
                            <p className="text-sm text-orange-600 mt-2 font-medium">Awaiting confirmation</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FaClock className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
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
                    dataSource={bookings}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    className="custom-bookings-table"
                />

                <style jsx global>{`
          .custom-bookings-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-bookings-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-bookings-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
            </ConfigProvider>

            {/* View Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Booking Details</span>}
                open={isViewModalOpen}
                onCancel={handleModalClose}
                footer={[
                    <button
                        key="close"
                        onClick={handleModalClose}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Close
                    </button>,
                ]}
                width={600}
            >
                {selectedRecord && (
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Booking ID</p>
                                <p className="text-base font-semibold text-blue-600">{selectedRecord.bookingId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Customer</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.customer}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Date</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Pickup Location</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.pickup}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Dropoff Location</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.dropoff}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Status</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${selectedRecord.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        selectedRecord.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedRecord.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Bookings;
