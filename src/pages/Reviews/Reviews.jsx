import React, { useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FaStar, FaRegStar, FaRegEye } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const Reviews = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [newReview, setNewReview] = useState({
        customer: '',
        bookingId: '',
        rating: 5,
        comment: ''
    });

    const showViewModal = (record) => {
        setSelectedRecord(record);
        setIsViewModalOpen(true);
    };

    const handleModalClose = () => {
        setIsViewModalOpen(false);
        setSelectedRecord(null);
    };

    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
        setNewReview({
            customer: '',
            bookingId: '',
            rating: 5,
            comment: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddReview = () => {
        console.log('Adding review:', newReview);
        handleAddModalClose();
    };

    const reviews = [
        { key: 1, reviewId: 'RV-001', customer: 'John Doe', rating: 5, comment: 'Excellent service! Very professional driver.', date: '2025-12-15', bookingId: 'BK-001' },
        { key: 2, reviewId: 'RV-002', customer: 'Jane Smith', rating: 4, comment: 'Good experience, on time pickup.', date: '2025-12-14', bookingId: 'BK-002' },
        { key: 3, reviewId: 'RV-003', customer: 'Robert Johnson', rating: 5, comment: 'Amazing tour guide! Highly recommend.', date: '2025-12-13', bookingId: 'BK-003' },
        { key: 4, reviewId: 'RV-004', customer: 'Emily Davis', rating: 3, comment: 'Average service, could be better.', date: '2025-12-12', bookingId: 'BK-004' },
        { key: 5, reviewId: 'RV-005', customer: 'Michael Brown', rating: 5, comment: 'Perfect trip! Clean vehicle and friendly driver.', date: '2025-12-11', bookingId: 'BK-005' },
        { key: 6, reviewId: 'RV-006', customer: 'Sarah Wilson', rating: 4, comment: 'Very satisfied with the service.', date: '2025-12-10', bookingId: 'BK-006' },
        { key: 7, reviewId: 'RV-007', customer: 'David Martinez', rating: 5, comment: 'Outstanding experience from start to finish.', date: '2025-12-09', bookingId: 'BK-007' },
        { key: 8, reviewId: 'RV-008', customer: 'Lisa Anderson', rating: 4, comment: 'Great driver, smooth ride.', date: '2025-12-08', bookingId: 'BK-008' },
        { key: 9, reviewId: 'RV-009', customer: 'James Taylor', rating: 5, comment: 'Exceeded expectations! Will book again.', date: '2025-12-07', bookingId: 'BK-009' },
        { key: 10, reviewId: 'RV-010', customer: 'Maria Garcia', rating: 4, comment: 'Professional and courteous service.', date: '2025-12-06', bookingId: 'BK-010' },
        { key: 11, reviewId: 'RV-011', customer: 'Thomas Lee', rating: 5, comment: 'Best tour experience in Ireland!', date: '2025-12-05', bookingId: 'BK-011' },
    ];

    const totalReviews = reviews.length;
    const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    star <= rating ? (
                        <FaStar key={star} className="w-4 h-4 text-yellow-500" />
                    ) : (
                        <FaRegStar key={star} className="w-4 h-4 text-slate-300" />
                    )
                ))}
            </div>
        );
    };

    const columns = [
        {
            title: 'Review ID',
            dataIndex: 'reviewId',
            key: 'reviewId',
            render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => renderStars(rating),
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            render: (text) => (
                <span className="text-slate-600 line-clamp-1">{text}</span>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (_, record) => (
                <button
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    onClick={() => showViewModal(record)}
                    title="View Details"
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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Reviews</h1>

                    {/* Desktop Search */}
                    <div className="hidden md:flex ml-auto gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                                placeholder="Search reviews..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        </div>
                        <button
                            onClick={showAddModal}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <FiPlus className="w-5 h-5" />
                            Add Review
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mt-3">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                className="w-full bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                placeholder="Search reviews..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        </div>
                        <button
                            onClick={showAddModal}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-semibold transition-all duration-200"
                        >
                            <FiPlus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Total Reviews</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                {totalReviews}
                            </p>
                            <p className="text-sm text-green-600 mt-2 font-medium">+15% from last month</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <MdRateReview className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Average Rating</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                                {averageRating}
                            </p>
                            <p className="text-sm text-orange-600 mt-2 font-medium">Out of 5.0</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FaStar className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">5-Star Reviews</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                {fiveStarReviews}
                            </p>
                            <p className="text-sm text-green-600 mt-2 font-medium">Excellent ratings</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl font-bold text-white">★</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Table */}
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
                    dataSource={reviews}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    className="custom-reviews-table"
                />

                <style jsx global>{`
          .custom-reviews-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-reviews-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-reviews-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
            </ConfigProvider>

            {/* View Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Review Details</span>}
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
                                <p className="text-sm text-slate-500 font-medium">Review ID</p>
                                <p className="text-base font-semibold text-blue-600">{selectedRecord.reviewId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Booking ID</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.bookingId}</p>
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
                                <p className="text-sm text-slate-500 font-medium">Rating</p>
                                <div className="mt-1">
                                    {renderStars(selectedRecord.rating)}
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium mb-2">Comment</p>
                                <p className="text-base text-slate-800 bg-slate-50 p-3 rounded-lg">
                                    {selectedRecord.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Review Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Add New Review</span>}
                open={isAddModalOpen}
                onCancel={handleAddModalClose}
                footer={[
                    <button
                        key="cancel"
                        onClick={handleAddModalClose}
                        className="px-4 py-2 mr-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200"
                    >
                        Cancel
                    </button>,
                    <button
                        key="submit"
                        onClick={handleAddReview}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Add Review
                    </button>,
                ]}
                width={600}
            >
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Customer Name</label>
                            <input
                                type="text"
                                name="customer"
                                value={newReview.customer}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                            <select
                                name="rating"
                                value={newReview.rating}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5 Stars - Excellent</option>
                                <option value={4}>4 Stars - Very Good</option>
                                <option value={3}>3 Stars - Good</option>
                                <option value={2}>2 Stars - Fair</option>
                                <option value={1}>1 Star - Poor</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Comment</label>
                            <textarea
                                name="comment"
                                value={newReview.comment}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Write your review comment here..."
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Reviews;
