import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoChevronBack, IoClose } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaCar, FaTools, FaCheckCircle, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const Vehicles = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);
    const [editVehicle, setEditVehicle] = useState(null);
    const [newVehicle, setNewVehicle] = useState({
        name: '',
        type: 'Van',
        capacity: '',
        licensePlate: '',
        driver: '',
        status: 'Active'
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
        setNewVehicle({
            name: '',
            type: 'Van',
            capacity: '',
            licensePlate: '',
            driver: '',
            status: 'Active'
        });
    };

    const showEditModal = (record) => {
        setEditVehicle({
            ...record,
            capacity: record.capacity.toString()
        });
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditVehicle(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVehicle(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditVehicle(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddVehicle = () => {
        console.log('Adding vehicle:', newVehicle);
        handleAddModalClose();
    };

    const handleUpdateVehicle = () => {
        console.log('Updating vehicle:', editVehicle);
        handleEditModalClose();
    };

    const showDeleteModal = (record) => {
        setVehicleToDelete(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setVehicleToDelete(null);
    };

    const handleDeleteVehicle = () => {
        console.log('Deleting vehicle:', vehicleToDelete);
        handleDeleteModalClose();
    };

    const vehicles = [
        { key: 1, vehicleId: 'VH-001', name: 'Mercedes Sprinter', capacity: 16, licensePlate: 'DUB-1234', driver: 'John Smith', status: 'Active' },
        { key: 2, vehicleId: 'VH-002', name: 'BMW 5 Series', capacity: 4, licensePlate: 'DUB-5678', driver: 'Sarah Connor', status: 'Active' },
        { key: 3, vehicleId: 'VH-003', name: 'Ford Transit', capacity: 12, licensePlate: 'DUB-9012', driver: 'Mike Johnson', status: 'Maintenance' },
        { key: 4, vehicleId: 'VH-004', name: 'Audi A6', capacity: 4, licensePlate: 'DUB-3456', driver: 'Emma Wilson', status: 'Active' },
        { key: 5, vehicleId: 'VH-005', name: 'Volkswagen Crafter', capacity: 14, licensePlate: 'DUB-7890', driver: 'David Brown', status: 'Active' },
        { key: 6, vehicleId: 'VH-006', name: 'Tesla Model S', capacity: 5, licensePlate: 'DUB-2468', driver: 'Lisa Anderson', status: 'Active' },
        { key: 7, vehicleId: 'VH-007', name: 'Mercedes Vito', capacity: 8, licensePlate: 'DUB-1357', driver: 'James Taylor', status: 'Maintenance' },
        { key: 8, vehicleId: 'VH-008', name: 'Toyota Camry', capacity: 4, licensePlate: 'DUB-9753', driver: 'Maria Garcia', status: 'Active' },
        { key: 9, vehicleId: 'VH-009', name: 'Renault Master', capacity: 16, licensePlate: 'DUB-8642', driver: 'Thomas Lee', status: 'Out of Service' },
        { key: 10, vehicleId: 'VH-010', name: 'Lexus ES', capacity: 5, licensePlate: 'DUB-7531', driver: 'Anna Martinez', status: 'Active' },
        { key: 11, vehicleId: 'VH-011', name: 'Peugeot Boxer', capacity: 12, licensePlate: 'DUB-9514', driver: 'Robert Clark', status: 'Active' },
    ];

    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
    const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;

    const columns = [
        {
            title: 'Vehicle ID',
            dataIndex: 'vehicleId',
            key: 'vehicleId',
            render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
        },
        {
            title: 'Vehicle Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
            render: (capacity) => `${capacity} passengers`,
        },
        {
            title: 'License Plate',
            dataIndex: 'licensePlate',
            key: 'licensePlate',
            render: (text) => <span className="font-mono text-slate-700">{text}</span>,
        },
        {
            title: 'Driver',
            dataIndex: 'driver',
            key: 'driver',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'right',
            render: (status) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' :
                    status === 'Maintenance' ? 'bg-orange-100 text-orange-800' :
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
                        title="Edit Vehicle"
                    >
                        <FiEdit className="text-green-600 w-5 h-5" />
                    </button>
                    <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        onClick={() => showDeleteModal(record)}
                        title="Delete Vehicle"
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
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Vehicles</h1>

                    {/* Desktop Search */}
                    <div className="hidden md:flex ml-auto gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                                placeholder="Search vehicles..."
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
                            Add Vehicle
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
                                placeholder="Search vehicles..."
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
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Total Vehicles</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                {totalVehicles}
                            </p>
                            <p className="text-sm text-green-600 mt-2 font-medium">+3 from last month</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <TbTruckDelivery className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Active</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                {activeVehicles}
                            </p>
                            <p className="text-sm text-green-600 mt-2 font-medium">Ready for service</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FaCheckCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="group relative bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-amber-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-slate-600 text-sm md:text-base font-medium mb-2">In Maintenance</p>
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                                {maintenanceVehicles}
                            </p>
                            <p className="text-sm text-orange-600 mt-2 font-medium">Under service</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FaTools className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicles Table */}
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
                    dataSource={vehicles}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                    className="custom-vehicles-table"
                />

                <style jsx global>{`
          .custom-vehicles-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-vehicles-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-vehicles-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
            </ConfigProvider>

            {/* View Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Vehicle Details</span>}
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
                                <p className="text-sm text-slate-500 font-medium">Vehicle ID</p>
                                <p className="text-base font-semibold text-blue-600">{selectedRecord.vehicleId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Vehicle Name</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Type</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Capacity</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.capacity} passengers</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">License Plate</p>
                                <p className="text-base font-semibold font-mono text-slate-700">{selectedRecord.licensePlate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Driver</p>
                                <p className="text-base font-semibold text-slate-800">{selectedRecord.driver}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 font-medium">Status</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${selectedRecord.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    selectedRecord.status === 'Maintenance' ? 'bg-orange-100 text-orange-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedRecord.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Vehicle Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Add New Vehicle</span>}
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
                        onClick={handleAddVehicle}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                        Add Vehicle
                    </button>,
                ]}
                width={600}
            >
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newVehicle.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Mercedes Sprinter"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                            <select
                                name="type"
                                value={newVehicle.type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Van">Van</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Bus">Bus</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={newVehicle.capacity}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Number of passengers"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">License Plate</label>
                            <input
                                type="text"
                                name="licensePlate"
                                value={newVehicle.licensePlate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                placeholder="e.g., DUB-1234"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Driver</label>
                            <input
                                type="text"
                                name="driver"
                                value={newVehicle.driver}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Driver name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={newVehicle.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Out of Service">Out of Service</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Edit Vehicle Modal */}
            <Modal
                title={<span className="text-lg font-semibold">Edit Vehicle</span>}
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
                        onClick={handleUpdateVehicle}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                    >
                        Update Vehicle
                    </button>,
                ]}
                width={600}
            >
                {editVehicle && (
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editVehicle.name}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g., Mercedes Sprinter"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                                <select
                                    name="type"
                                    value={editVehicle.type}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="Van">Van</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Bus">Bus</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={editVehicle.capacity}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Number of passengers"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">License Plate</label>
                                <input
                                    type="text"
                                    name="licensePlate"
                                    value={editVehicle.licensePlate}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
                                    placeholder="e.g., DUB-1234"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Driver</label>
                                <input
                                    type="text"
                                    name="driver"
                                    value={editVehicle.driver}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Driver name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={editVehicle.status}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Out of Service">Out of Service</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title={<span className="text-lg font-semibold text-red-600">Delete Vehicle</span>}
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
                        onClick={handleDeleteVehicle}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
                    >
                        Delete Vehicle
                    </button>,
                ]}
                width={500}
            >
                {vehicleToDelete && (
                    <div className="py-4">
                        <p className="text-slate-700 mb-4">
                            Are you sure you want to delete this vehicle?
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-800 mb-2">
                                <span className="text-red-600">Vehicle:</span> {vehicleToDelete.name}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">License Plate:</span> {vehicleToDelete.licensePlate}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Driver:</span> {vehicleToDelete.driver}
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

export default Vehicles;
