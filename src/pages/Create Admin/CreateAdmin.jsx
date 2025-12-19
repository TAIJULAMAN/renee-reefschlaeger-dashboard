import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedRecord(null);
  };

  const showDeleteModal = (record) => {
    setAdminToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setAdminToDelete(null);
  };

  const handleDeleteAdmin = () => {
    console.log('Deleting admin:', adminToDelete);
    handleDeleteModalClose();
  };

  // Sample data for admins
  const admins = [
    { key: 1, adminId: 'AD-001', name: 'John Admin', email: 'john@irelandgo.com', role: 'Super Admin', createdDate: '2025-01-15' },
    { key: 2, adminId: 'AD-002', name: 'Jane Smith', email: 'jane@irelandgo.com', role: 'Admin', createdDate: '2025-02-10' },
    { key: 3, adminId: 'AD-003', name: 'Sam Manager', email: 'sam@irelandgo.com', role: 'Admin', createdDate: '2025-03-05' },
    { key: 4, adminId: 'AD-004', name: 'Lisa Brown', email: 'lisa@irelandgo.com', role: 'Moderator', createdDate: '2025-03-20' },
    { key: 5, adminId: 'AD-005', name: 'Mike Wilson', email: 'mike@irelandgo.com', role: 'Admin', createdDate: '2025-04-01' },
  ];

  // Calculate stats
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(a => a.status === 'Active').length;
  const superAdmins = admins.filter(a => a.role === 'Super Admin').length;

  // Table columns
  const columns = [
    {
      title: 'Admin ID',
      dataIndex: 'adminId',
      key: 'adminId',
      render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${role === 'Super Admin' ? 'bg-purple-100 text-purple-800' :
          role === 'Admin' ? 'bg-blue-100 text-blue-800' :
            'bg-slate-100 text-slate-800'
          }`}>
          {role}
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
            className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
            onClick={() => showDeleteModal(record)}
            title="Delete Admin"
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
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Admin Management</h1>

          {/* Desktop Search */}
          <div className="hidden md:flex ml-auto gap-3">
            <div className="relative">
              <input
                type="text"
                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
            <button
              onClick={() => navigate('/add-admin')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="w-5 h-5" />
              Add Admin
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
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
            <button
              onClick={() => navigate('/add-admin')}
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
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Total Admins</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {totalAdmins}
              </p>
              <p className="text-sm text-green-600 mt-2 font-medium">All administrators</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MdAdminPanelSettings className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Active</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                {activeAdmins}
              </p>
              <p className="text-sm text-green-600 mt-2 font-medium">Currently active</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">✓</span>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Super Admins</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                {superAdmins}
              </p>
              <p className="text-sm text-purple-600 mt-2 font-medium">Full access</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admins Table */}
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
          dataSource={admins}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          className="custom-admins-table"
        />

        <style jsx global>{`
          .custom-admins-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-admins-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-admins-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
      </ConfigProvider>

      {/* View Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Admin Details</span>}
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
                <p className="text-sm text-slate-500 font-medium">Admin ID</p>
                <p className="text-base font-semibold text-blue-600">{selectedRecord.adminId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Name</p>
                <p className="text-base font-semibold text-slate-800">{selectedRecord.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Email</p>
                <p className="text-base font-semibold text-slate-800">{selectedRecord.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Role</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${selectedRecord.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' :
                  selectedRecord.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                  {selectedRecord.role}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Created Date</p>
                <p className="text-base font-semibold text-slate-800">{selectedRecord.createdDate}</p>
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

      {/* Delete Confirmation Modal */}
      <Modal
        title={<span className="text-lg font-semibold text-red-600">Delete Admin</span>}
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
            onClick={handleDeleteAdmin}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
          >
            Delete Admin
          </button>,
        ]}
        width={500}
      >
        {adminToDelete && (
          <div className="py-4">
            <p className="text-slate-700 mb-4">
              Are you sure you want to delete this administrator?
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-800 mb-2">
                <span className="text-red-600">Admin:</span> {adminToDelete.name}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">Email:</span> {adminToDelete.email}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">Role:</span> {adminToDelete.role}
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

export default CreateAdmin;
