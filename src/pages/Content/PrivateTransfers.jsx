import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FaCar, FaRegEye } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const locations = [
    'Dublin', 'Galway', 'Cork', 'Belfast', 'Limerick', 'Killarney',
    'Waterford', 'Derry', 'Sligo', 'Kilkenny', 'Wexford', 'Tralee',
    'Ennis', 'Drogheda', 'Dundalk', 'Bray', 'Navan', 'Athlone'
];

const PrivateTransfers = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [transferToDelete, setTransferToDelete] = useState(null);
    const [editTransfer, setEditTransfer] = useState(null);
    const [newTransfer, setNewTransfer] = useState({
        from: '',
        to: '',
        duration: '',
        distance: '',
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
        setNewTransfer({
            from: '',
            to: '',
            duration: '',
            distance: '',
            price: '',
            image: null,
            imagePreview: ''
        });
    };

    const showEditModal = (record) => {
        setEditTransfer({ ...record });
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditTransfer(null);
    };

    const showDeleteModal = (record) => {
        setTransferToDelete(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setTransferToDelete(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransfer(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewTransfer(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditTransfer(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditTransfer(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTransfer = () => {
        console.log('Adding transfer:', newTransfer);
        handleAddModalClose();
    };

    const handleUpdateTransfer = () => {
        console.log('Updating transfer:', editTransfer);
        handleEditModalClose();
    };

    const handleDeleteTransfer = () => {
        console.log('Deleting transfer:', transferToDelete);
        handleDeleteModalClose();
    };

    // Sample data for private transfers
    const allTransfers = [
        { key: 1, transferId: 'PT-001', from: 'Dublin', to: 'Galway', duration: '2h 30min', distance: '215km', price: '€120', image: '/dublin-galway.jpg', status: 'Active' },
        { key: 2, transferId: 'PT-002', from: 'Dublin', to: 'Cork', duration: '2h 45min', distance: '260km', price: '€135', image: '/dublin-cork.jpg', status: 'Active' },
        { key: 3, transferId: 'PT-003', from: 'Dublin', to: 'Belfast', duration: '2h 10min', distance: '165km', price: '€110', image: '/dublin-belfast.jpg', status: 'Active' },
        { key: 4, transferId: 'PT-004', from: 'Dublin Airport', to: 'City Center', duration: '30min', distance: '12km', price: '€35', image: '/airport-city.jpg', status: 'Active' },
        { key: 5, transferId: 'PT-005', from: 'Galway', to: 'Cliffs of Moher', duration: '1h 30min', distance: '80km', price: '€85', image: '/galway-cliffs.jpg', status: 'Active' },
        { key: 6, transferId: 'PT-006', from: 'Dublin', to: 'Killarney', duration: '3h 30min', distance: '340km', price: '€165', image: '/dublin-killarney.jpg', status: 'Active' },
        { key: 7, transferId: 'PT-007', from: 'Cork', to: 'Blarney Castle', duration: '25min', distance: '10km', price: '€30', image: '/cork-blarney.jpg', status: 'Active' },
        { key: 8, transferId: 'PT-008', from: 'Dublin', to: 'Wicklow', duration: '1h 15min', distance: '55km', price: '€70', image: '/dublin-wicklow.jpg', status: 'Active' },
    ];

    // Filter transfers based on location filter
    const transfers = locationFilter === 'All'
        ? allTransfers
        : allTransfers.filter(transfer => transfer.from === locationFilter);

    // Table columns
    const columns = [
        {
            title: 'Transfer ID',
            dataIndex: 'transferId',
            key: 'transferId',
            render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            render: (text) => (
                <div className="flex items-center gap-2">
                    <MdLocationOn className="text-green-600 w-4 h-4" />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            render: (text) => (
                <div className="flex items-center gap-2">
                    <MdLocationOn className="text-red-600 w-4 h-4" />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Distance',
            dataIndex: 'distance',
            key: 'distance',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span className="font-semibold text-green-600">{price}</span>,
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
                        title="Edit Transfer"
                    >
                        <FiEdit className="text-green-600 w-5 h-5" />
                    </button>
                    <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        onClick={() => showDeleteModal(record)}
                        title="Delete Transfer"
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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Private Transfers</h1>

                    {/* Desktop Search */}
                    <div className="hidden md:flex ml-auto gap-3">
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                        >
                            <option value="All">All Locations</option>
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                                placeholder="Search transfers..."
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
                            Add Transfer
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mt-3">
                    <div className="flex gap-2 mb-2">
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="flex-1 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                        >
                            <option value="All">All Locations</option>
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                className="w-full bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                placeholder="Search transfers..."
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

            {/* Transfers Table */}
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
                    dataSource={transfers}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    className="custom-transfers-table"
                />

                <style jsx global>{`
          .custom-transfers-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-transfers-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-transfers-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
            </ConfigProvider>

            {/* View Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Transfer Details</span>}
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
                                <p className="text-sm text-slate-500 font-medium">Transfer ID</p>
                                <p className="text-base font-semibold text-blue-600">{selectedRecord.transferId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Status</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${selectedRecord.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedRecord.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">From</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.from}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">To</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.to}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Duration</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.duration}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Distance</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.distance}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Price</p>
                                <p className="text-2xl font-bold text-green-600">{selectedRecord.price}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Transfer Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Add New Transfer Route</span>}
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
                        onClick={handleAddTransfer}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Add Transfer
                    </button>,
                ]}
                width={600}
            >
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">From Location</label>
                            <select
                                name="from"
                                value={newTransfer.from}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select location</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">To Location</label>
                            <select
                                name="to"
                                value={newTransfer.to}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select location</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={newTransfer.duration}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 2h 30min"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Distance</label>
                            <input
                                type="text"
                                name="distance"
                                value={newTransfer.distance}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 215km"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={newTransfer.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., €120"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Route Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {newTransfer.imagePreview && (
                                <div className="mt-3">
                                    <img
                                        src={newTransfer.imagePreview}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Edit Transfer Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Edit Transfer Route</span>}
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
                        onClick={handleUpdateTransfer}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                        Update Transfer
                    </button>,
                ]}
                width={600}
            >
                {editTransfer && (
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">From Location</label>
                                <select
                                    name="from"
                                    value={editTransfer.from}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Select location</option>
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">To Location</label>
                                <select
                                    name="to"
                                    value={editTransfer.to}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Select location</option>
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={editTransfer.duration}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Distance</label>
                                <input
                                    type="text"
                                    name="distance"
                                    value={editTransfer.distance}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={editTransfer.price}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Route Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleEditImageChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                                {editTransfer.imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={editTransfer.imagePreview}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {!editTransfer.imagePreview && editTransfer.image && (
                                    <div className="mt-3">
                                        <p className="text-sm text-slate-600">Current image: {editTransfer.image}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title={<span className="text-lg font-semibold text-red-600">Delete Transfer Route</span>}
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
                        onClick={handleDeleteTransfer}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
                    >
                        Delete Transfer
                    </button>,
                ]}
                width={500}
            >
                {transferToDelete && (
                    <div className="py-4">
                        <p className="text-slate-700 mb-4">
                            Are you sure you want to delete this transfer route?
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-800 mb-2">
                                <span className="text-red-600">Route:</span> {transferToDelete.from} → {transferToDelete.to}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Duration:</span> {transferToDelete.duration}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Price:</span> {transferToDelete.price}
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

export default PrivateTransfers;
