import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { FaMapMarkerAlt, FaRegEye } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const locations = [
    'Dublin', 'Galway', 'Cork', 'Belfast', 'Limerick', 'Killarney',
    'Waterford', 'Derry', 'Sligo', 'Kilkenny', 'Wexford', 'Tralee',
    'Ennis', 'Drogheda', 'Dundalk', 'Bray', 'Navan', 'Athlone'
];

const PopularTransferRoutes = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [routeToDelete, setRouteToDelete] = useState(null);
    const [editRoute, setEditRoute] = useState(null);
    const [newRoute, setNewRoute] = useState({
        from: 'Dublin',
        to: '',
        distance: '',
        description: '',
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
        setNewRoute({
            from: 'Dublin',
            to: '',
            distance: '',
            description: '',
            image: null,
            imagePreview: ''
        });
    };

    const showEditModal = (record) => {
        setEditRoute({ ...record });
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditRoute(null);
    };

    const showDeleteModal = (record) => {
        setRouteToDelete(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setRouteToDelete(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoute(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewRoute(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditRoute(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditRoute(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRoute = () => {
        console.log('Adding route:', newRoute);
        handleAddModalClose();
    };

    const handleUpdateRoute = () => {
        console.log('Updating route:', editRoute);
        handleEditModalClose();
    };

    const handleDeleteRoute = () => {
        console.log('Deleting route:', routeToDelete);
        handleDeleteModalClose();
    };

    // Sample data for popular transfer routes from Dublin
    const allRoutes = [
        { key: 1, routeId: 'TR-001', from: 'Dublin', to: 'Galway', distance: '2.5 hours', description: 'Explore the vibrant city known for its lively music scene and beautiful countryside, arriving at Galway\'s charming streets', image: '/dublin-galway.jpg', status: 'Active' },
        { key: 2, routeId: 'TR-002', from: 'Dublin', to: 'Cork', distance: '3 hours', description: 'Discover Ireland\'s second-largest city with its rich history and vibrant food scene', image: '/dublin-cork.jpg', status: 'Active' },
        { key: 3, routeId: 'TR-003', from: 'Dublin', to: 'Limerick', distance: '2.5 hours', description: 'Visit the historic city on the River Shannon with medieval architecture', image: '/dublin-limerick.jpg', status: 'Active' },
        { key: 4, routeId: 'TR-004', from: 'Dublin', to: 'Killarney', distance: '3.5 hours', description: 'Gateway to stunning national parks and the famous Ring of Kerry', image: '/dublin-killarney.jpg', status: 'Active' },
        { key: 5, routeId: 'TR-005', from: 'Dublin', to: 'Belfast', distance: '2 hours', description: 'Explore Northern Ireland\'s capital with a rich maritime history', image: '/dublin-belfast.jpg', status: 'Active' },
        { key: 6, routeId: 'TR-006', from: 'Dublin', to: 'Dublin Airport', distance: '30 mins', description: 'Reliable airport transfers to Dublin International Airport', image: '/dublin-airport.jpg', status: 'Active' },
        { key: 7, routeId: 'TR-007', from: 'Dublin', to: 'Waterford', distance: '2.5 hours', description: 'Ireland\'s oldest city with Viking heritage and crystal tradition', image: '/dublin-waterford.jpg', status: 'Active' },
    ];

    // Filter routes based on location filter
    const routes = locationFilter === 'All'
        ? allRoutes
        : allRoutes.filter(route => route.from === locationFilter);

    // Table columns
    const columns = [
        {
            title: 'Route ID',
            dataIndex: 'routeId',
            key: 'routeId',
            render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            render: (text) => (
                <div className="flex items-center gap-2">
                    <MdLocationOn className="text-green-600 w-4 h-4" />
                    <span className="font-medium">{text}</span>
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
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: 'Distance/Time',
            dataIndex: 'distance',
            key: 'distance',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span className="text-slate-600 line-clamp-1">{text}</span>,
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
                        title="Edit Route"
                    >
                        <FiEdit className="text-green-600 w-5 h-5" />
                    </button>
                    <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        onClick={() => showDeleteModal(record)}
                        title="Delete Route"
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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Popular Transfer Routes</h1>

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
                                placeholder="Search routes..."
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
                            Add Route
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
                                placeholder="Search routes..."
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

            {/* Routes Table */}
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
                    dataSource={routes}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    className="custom-routes-table"
                />

                <style jsx global>{`
          .custom-routes-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-routes-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-routes-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
            </ConfigProvider>

            {/* View Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Transfer Route Details</span>}
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
                                <p className="text-sm text-slate-500 font-medium">Route ID</p>
                                <p className="text-base font-semibold text-blue-600">{selectedRecord.routeId}</p>
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
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Distance/Time</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.distance}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Description</p>
                                <p className="text-base text-slate-600">{selectedRecord.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Route Modal */}
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
                        onClick={handleAddRoute}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Add Route
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
                                value={newRoute.from}
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
                                value={newRoute.to}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select location</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Distance/Time</label>
                            <input
                                type="text"
                                name="distance"
                                value={newRoute.distance}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 2.5 hours"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={newRoute.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Describe the destination and route highlights..."
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
                            {newRoute.imagePreview && (
                                <div className="mt-3">
                                    <img
                                        src={newRoute.imagePreview}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Edit Route Modal */}
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
                        onClick={handleUpdateRoute}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                        Update Route
                    </button>,
                ]}
                width={600}
            >
                {editRoute && (
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">From Location</label>
                                <select
                                    name="from"
                                    value={editRoute.from}
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
                                    value={editRoute.to}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Select location</option>
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Distance/Time</label>
                                <input
                                    type="text"
                                    name="distance"
                                    value={editRoute.distance}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={editRoute.description}
                                    onChange={handleEditInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
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
                                {editRoute.imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={editRoute.imagePreview}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {!editRoute.imagePreview && editRoute.image && (
                                    <div className="mt-3">
                                        <p className="text-sm text-slate-600">Current image: {editRoute.image}</p>
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
                        onClick={handleDeleteRoute}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
                    >
                        Delete Route
                    </button>,
                ]}
                width={500}
            >
                {routeToDelete && (
                    <div className="py-4">
                        <p className="text-slate-700 mb-4">
                            Are you sure you want to delete this transfer route?
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-800 mb-2">
                                <span className="text-red-600">Route:</span> {routeToDelete.from} → {routeToDelete.to}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Distance:</span> {routeToDelete.distance}
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

export default PopularTransferRoutes;
