import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FaRoute, FaRegEye } from 'react-icons/fa';
import { MdTour } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const PopularMultiDayTours = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [tourToDelete, setTourToDelete] = useState(null);
    const [editTour, setEditTour] = useState(null);
    const [newTour, setNewTour] = useState({
        title: '',
        description: '',
        duration: '',
        groupType: '',
        price: '',
        image: null,
        imagePreview: ''
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
        setNewTour({
            title: '',
            description: '',
            duration: '',
            groupType: '',
            price: '',
            image: null,
            imagePreview: ''
        });
    };

    const showEditModal = (record) => {
        setEditTour({ ...record });
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditTour(null);
    };

    const showDeleteModal = (record) => {
        setTourToDelete(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setTourToDelete(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTour(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewTour(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditTour(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditTour(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTour = () => {
        console.log('Adding tour:', newTour);
        handleAddModalClose();
    };

    const handleUpdateTour = () => {
        console.log('Updating tour:', editTour);
        handleEditModalClose();
    };

    const handleDeleteTour = () => {
        console.log('Deleting tour:', tourToDelete);
        handleDeleteModalClose();
    };

    // Sample data for popular multi-day tours
    const tours = [
        { key: 1, tourId: 'MT-001', title: 'Dublin to Galway via Cliffs of Moher', description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages", duration: '6h 30min', groupType: 'Private Group', price: '€125', image: '/cliffs-moher-tour.jpg', status: 'Active' },
        { key: 2, tourId: 'MT-002', title: 'Complete Ireland Explorer - 7 Days', description: 'Comprehensive tour covering Dublin, Cork, Galway, and Belfast', duration: '7 days', groupType: 'Small group', price: '€1,450', image: '/ireland-7day.jpg', status: 'Active' },
        { key: 3, tourId: 'MT-003', title: 'Wild Atlantic Way - 5 Days', description: 'Journey along the stunning west coast of Ireland', duration: '5 days', groupType: 'Private Group', price: '€1,200', image: '/atlantic-way.jpg', status: 'Active' },
        { key: 4, tourId: 'MT-004', title: 'Ancient Ireland Heritage Tour - 4 Days', description: 'Explore castles, monasteries, and historic sites', duration: '4 days', groupType: 'Small group', price: '€950', image: '/heritage-tour.jpg', status: 'Active' },
        { key: 5, tourId: 'MT-005', title: 'Northern Ireland & Giants Causeway - 3 Days', description: 'Discover the beauty of Northern Ireland', duration: '3 days', groupType: 'Private Group', price: '€750', image: '/northern-ireland.jpg', status: 'Active' },
        { key: 6, tourId: 'MT-006', title: 'Ring of Kerry & Dingle Peninsula - 4 Days', description: 'Scenic coastal drives and traditional Irish culture', duration: '4 days', groupType: 'Small group', price: '€890', image: '/kerry-dingle.jpg', status: 'Active' },
        { key: 7, tourId: 'MT-007', title: 'Ireland Grand Tour - 10 Days', description: 'Ultimate Irish experience covering all highlights', duration: '10 days', groupType: 'Private Group', price: '€2,100', image: '/grand-tour.jpg', status: 'Active' },
    ];

    // Table columns
    const columns = [
        {
            title: 'Tour ID',
            dataIndex: 'tourId',
            key: 'tourId',
            render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span className="font-medium">{text}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span className="text-slate-600 line-clamp-1">{text}</span>,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Group Type',
            dataIndex: 'groupType',
            key: 'groupType',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span className="font-semibold text-green-600">{price} / person</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
                <div className="flex items-center justify-center gap-2">
                    <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        onClick={() => showViewModal(record)}
                        title="View Details"
                    >
                        <FaRegEye className="text-blue-600 w-5 h-5" />
                    </button>
                    <button
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        onClick={() => showEditModal(record)}
                        title="Edit Tour"
                    >
                        <FiEdit className="text-green-600 w-5 h-5" />
                    </button>
                    <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        onClick={() => showDeleteModal(record)}
                        title="Delete Tour"
                    >
                        <FiTrash2 className="text-red-600 w-5 h-5" />
                    </button>
                </div>
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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Popular Multi-Day Tours</h1>

                    {/* Desktop Search */}
                    <div className="hidden md:flex ml-auto gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                                placeholder="Search tours..."
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
                            Add Tour
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
                                placeholder="Search tours..."
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

            {/* Tours Table */}
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
                    dataSource={tours}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    className="custom-tours-table"
                />

                <style jsx global>{`
          .custom-tours-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-tours-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-tours-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
            </ConfigProvider>

            {/* View Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Multi-Day Tour Details</span>}
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
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Tour ID</p>
                                <p className="text-base font-semibold text-blue-600">{selectedRecord.tourId}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Title</p>
                                <p className="text-lg font-semibold text-slate-800">{selectedRecord.title}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Description</p>
                                <p className="text-base text-slate-600">{selectedRecord.description}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Duration</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.duration}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Group Type</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.groupType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Price</p>
                                <p className="text-2xl font-bold text-green-600">{selectedRecord.price} / person</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Status</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${selectedRecord.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedRecord.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Tour Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Add New Multi-Day Tour</span>}
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
                        onClick={handleAddTour}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Add Tour
                    </button>,
                ]}
                width={600}
            >
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tour Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newTour.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Complete Ireland Explorer - 7 Days"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={newTour.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Comprehensive tour covering Dublin, Cork, Galway, and Belfast"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={newTour.duration}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 7 days"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Group Type</label>
                            <select
                                name="groupType"
                                value={newTour.groupType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select group type</option>
                                <option value="Private Group">Private Group</option>
                                <option value="Small group">Small group</option>
                                <option value="Large group">Large group</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Price (per person)</label>
                            <input
                                type="text"
                                name="price"
                                value={newTour.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., €1,450"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tour Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {newTour.imagePreview && (
                                <div className="mt-3">
                                    <img
                                        src={newTour.imagePreview}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Edit Tour Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Edit Multi-Day Tour</span>}
                open={isEditModalOpen}
                onCancel={handleEditModalClose}
                footer={[
                    <button
                        key="cancel"
                        onClick={handleEditModalClose}
                        className="px-4 py-2 mr-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200"
                    >
                        Cancel
                    </button>,
                    <button
                        key="submit"
                        onClick={handleUpdateTour}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                        Update Tour
                    </button>,
                ]}
                width={600}
            >
                {editTour && (
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tour Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editTour.title}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={editTour.description}
                                    onChange={handleEditInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={editTour.duration}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Group Type</label>
                                <select
                                    name="groupType"
                                    value={editTour.groupType}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="Private Group">Private Group</option>
                                    <option value="Small group">Small group</option>
                                    <option value="Large group">Large group</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Price (per person)</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={editTour.price}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tour Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleEditImageChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                                {editTour.imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={editTour.imagePreview}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {!editTour.imagePreview && editTour.image && (
                                    <div className="mt-3">
                                        <p className="text-sm text-slate-600">Current image: {editTour.image}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title={<span className="text-lg font-semibold text-red-600">Delete Multi-Day Tour</span>}
                open={isDeleteModalOpen}
                onCancel={handleDeleteModalClose}
                footer={[
                    <button
                        key="cancel"
                        onClick={handleDeleteModalClose}
                        className="px-4 py-2 mr-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200"
                    >
                        Cancel
                    </button>,
                    <button
                        key="delete"
                        onClick={handleDeleteTour}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
                    >
                        Delete Tour
                    </button>,
                ]}
                width={500}
            >
                {tourToDelete && (
                    <div className="py-4">
                        <p className="text-slate-700 mb-4">
                            Are you sure you want to delete this multi-day tour?
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-800 mb-2">
                                <span className="text-red-600">Tour:</span> {tourToDelete.title}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Duration:</span> {tourToDelete.duration}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Price:</span> {tourToDelete.price} / person
                            </p>
                        </div>
                        <p className="text-sm text-red-600 mt-4 font-medium">
                            ⚠️ This action cannot be undone.
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PopularMultiDayTours;
