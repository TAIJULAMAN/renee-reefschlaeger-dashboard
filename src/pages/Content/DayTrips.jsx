import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const DayTrips = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [tripToDelete, setTripToDelete] = useState(null);
    const [editTrip, setEditTrip] = useState(null);
    const [newTrip, setNewTrip] = useState({
        title: '',
        description: '',
        duration: '',
        groupType: '',
        price: '',
        from: '',
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
        setNewTrip({
            title: '',
            description: '',
            duration: '',
            groupType: '',
            price: '',
            from: '',
            image: null,
            imagePreview: ''
        });
    };

    const showEditModal = (record) => {
        setEditTrip({ ...record });
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditTrip(null);
    };

    const showDeleteModal = (record) => {
        setTripToDelete(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setTripToDelete(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTrip(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewTrip(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditTrip(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditTrip(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTrip = () => {
        console.log('Adding trip:', newTrip);
        handleAddModalClose();
    };

    const handleUpdateTrip = () => {
        console.log('Updating trip:', editTrip);
        handleEditModalClose();
    };

    const handleDeleteTrip = () => {
        console.log('Deleting trip:', tripToDelete);
        handleDeleteModalClose();
    };

    // Sample data for day trips
    const allTrips = [
        { key: 1, tripId: 'DT-001', title: 'Dublin to Galway via Cliffs of Moher', description: "Experience Ireland's most stunning coastal drive", duration: '6h 30min', groupType: 'Private group', price: '€125', image: '/cliffs-moher.jpg', status: 'Active', from: 'Dublin' },
        { key: 2, tripId: 'DT-002', title: 'Belfast to Giant\'s Causeway', description: 'Discover Northern Ireland\'s natural wonder', duration: '8h', groupType: 'Small group', price: '€95', image: '/giants-causeway.jpg', status: 'Active', from: 'Belfast' },
        { key: 3, tripId: 'DT-003', title: 'Cork to Ring of Kerry', description: 'Journey through Ireland\'s most scenic ring', duration: '7h', groupType: 'Private group', price: '€140', image: '/ring-kerry.jpg', status: 'Active', from: 'Cork' },
        { key: 4, tripId: 'DT-004', title: 'Dublin to Wicklow Mountains', description: 'Explore the Garden of Ireland', duration: '5h', groupType: 'Small group', price: '€75', image: '/wicklow.jpg', status: 'Active', from: 'Dublin' },
        { key: 5, tripId: 'DT-005', title: 'Limerick to Dingle Peninsula', description: 'Coastal beauty and Irish culture', duration: '8h 30min', groupType: 'Private group', price: '€145', image: '/dingle.jpg', status: 'Active', from: 'Limerick' },
        { key: 6, tripId: 'DT-006', title: 'Galway to Connemara', description: 'Wild Atlantic Way adventure', duration: '9h', groupType: 'Small group', price: '€155', image: '/connemara.jpg', status: 'Active', from: 'Galway' },
        { key: 7, tripId: 'DT-007', title: 'Cork to Blarney Castle', description: 'Kiss the famous Blarney Stone', duration: '6h', groupType: 'Private group', price: '€85', image: '/blarney.jpg', status: 'Active', from: 'Cork' },
        { key: 8, tripId: 'DT-008', title: 'Belfast City Highlights', description: 'Titanic Quarter and political murals', duration: '4h', groupType: 'Small group', price: '€65', image: '/belfast-city.jpg', status: 'Active', from: 'Belfast' },
    ];

    // Filter trips based on location filter
    const trips = locationFilter === 'All'
        ? allTrips
        : allTrips.filter(trip => trip.from === locationFilter);

    // Table columns
    const columns = [
        {
            title: 'Trip ID',
            dataIndex: 'tripId',
            key: 'tripId',
            render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span className="font-medium">{text}</span>,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
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
                        title="Edit Trip"
                    >
                        <FiEdit className="text-green-600 w-5 h-5" />
                    </button>
                    <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        onClick={() => showDeleteModal(record)}
                        title="Delete Trip"
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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Day Trips</h1>

                    {/* Desktop Search */}
                    <div className="hidden md:flex ml-auto gap-3">
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                        >
                            <option value="All">All Locations</option>
                            <option value="Dublin">Dublin</option>
                            <option value="Belfast">Belfast</option>
                            <option value="Cork">Cork</option>
                            <option value="Limerick">Limerick</option>
                            <option value="Galway">Galway</option>
                        </select>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                                placeholder="Search trips..."
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
                            Add Day Trip
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
                            <option value="Dublin">Dublin</option>
                            <option value="Belfast">Belfast</option>
                            <option value="Cork">Cork</option>
                            <option value="Limerick">Limerick</option>
                            <option value="Galway">Galway</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                className="w-full bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                placeholder="Search trips..."
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

            {/* Trips Table */}
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
                    dataSource={trips}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    className="custom-trips-table"
                />

                <style jsx global>{`
          .custom-trips-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-trips-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-trips-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
            </ConfigProvider>

            {/* View Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Day Trip Details</span>}
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
                                <p className="text-sm text-slate-500 font-medium">Trip ID</p>
                                <p className="text-base font-semibold text-blue-600">{selectedRecord.tripId}</p>
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
                                <p className="text-sm text-slate-500 font-medium">From</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.from}</p>
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
                            <div className="col-span-2">
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

            {/* Add Trip Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Add New Day Trip</span>}
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
                        onClick={handleAddTrip}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Add Day Trip
                    </button>,
                ]}
                width={600}
            >
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Trip Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newTrip.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Dublin to Galway via Cliffs of Moher"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={newTrip.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Experience Ireland's most stunning coastal drive"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">From Location</label>
                            <select
                                name="from"
                                value={newTrip.from}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select location</option>
                                <option value="Dublin">Dublin</option>
                                <option value="Belfast">Belfast</option>
                                <option value="Cork">Cork</option>
                                <option value="Limerick">Limerick</option>
                                <option value="Galway">Galway</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={newTrip.duration}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 6h 30min"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Group Type</label>
                            <select
                                name="groupType"
                                value={newTrip.groupType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select group type</option>
                                <option value="Private group">Private group</option>
                                <option value="Small group">Small group</option>
                                <option value="Large group">Large group</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Price (per person)</label>
                            <input
                                type="text"
                                name="price"
                                value={newTrip.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., €125"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Trip Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {newTrip.imagePreview && (
                                <div className="mt-3">
                                    <img
                                        src={newTrip.imagePreview}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Edit Trip Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Edit Day Trip</span>}
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
                        onClick={handleUpdateTrip}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                        Update Day Trip
                    </button>,
                ]}
                width={600}
            >
                {editTrip && (
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Trip Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editTrip.title}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={editTrip.description}
                                    onChange={handleEditInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">From Location</label>
                                <select
                                    name="from"
                                    value={editTrip.from}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Select location</option>
                                    <option value="Dublin">Dublin</option>
                                    <option value="Belfast">Belfast</option>
                                    <option value="Cork">Cork</option>
                                    <option value="Limerick">Limerick</option>
                                    <option value="Galway">Galway</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={editTrip.duration}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Group Type</label>
                                <select
                                    name="groupType"
                                    value={editTrip.groupType}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="Private group">Private group</option>
                                    <option value="Small group">Small group</option>
                                    <option value="Large group">Large group</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Price (per person)</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={editTrip.price}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Trip Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleEditImageChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                                {editTrip.imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={editTrip.imagePreview}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {!editTrip.imagePreview && editTrip.image && (
                                    <div className="mt-3">
                                        <p className="text-sm text-slate-600">Current image: {editTrip.image}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title={<span className="text-lg font-semibold text-red-600">Delete Day Trip</span>}
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
                        onClick={handleDeleteTrip}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
                    >
                        Delete Trip
                    </button>,
                ]}
                width={500}
            >
                {tripToDelete && (
                    <div className="py-4">
                        <p className="text-slate-700 mb-4">
                            Are you sure you want to delete this day trip?
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-800 mb-2">
                                <span className="text-red-600">Trip:</span> {tripToDelete.title}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">From:</span> {tripToDelete.from}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Duration:</span> {tripToDelete.duration}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Price:</span> {tripToDelete.price} / person
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

export default DayTrips;
