import React, { useState } from 'react';
import { FiSearch, FiTrash2, FiEdit } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { MdReport, MdPending, MdCheckCircle } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Table, Modal } from 'antd';

const Reports = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [reportToEdit, setReportToEdit] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedRecord(null);
  };

  const showDeleteModal = (record) => {
    setReportToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setReportToDelete(null);
  };

  const handleDeleteReport = () => {
    console.log('Deleting report:', reportToDelete);
    handleDeleteModalClose();
  };

  const showEditModal = (record) => {
    setReportToEdit(record);
    setEditStatus(record.status);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setReportToEdit(null);
    setEditStatus('');
  };

  const handleUpdateStatus = () => {
    console.log('Updating report status:', { report: reportToEdit, newStatus: editStatus });
    handleEditModalClose();
  };

  // Sample data for reports
  const allReports = [
    { key: 1, reportId: 'RP-001', reportFrom: 'John Doe', reportReason: 'Harassment in comments', reportTo: 'Emily Johnson', date: '2025-12-15', status: 'Pending' },
    { key: 2, reportId: 'RP-002', reportFrom: 'Jane Smith', reportReason: 'Spam links posted', reportTo: 'Michael Wilson', date: '2025-12-14', status: 'Resolved' },
    { key: 3, reportId: 'RP-003', reportFrom: 'Robert Brown', reportReason: 'Fake booking details', reportTo: 'Lucas Hall', date: '2025-12-13', status: 'Pending' },
    { key: 4, reportId: 'RP-004', reportFrom: 'Olivia Thomas', reportReason: 'Inappropriate content', reportTo: 'William Anderson', date: '2025-12-12', status: 'Resolved' },
    { key: 5, reportId: 'RP-005', reportFrom: 'James Martinez', reportReason: 'Fraudulent activity', reportTo: 'Support Team', date: '2025-12-11', status: 'Under Review' },
    { key: 6, reportId: 'RP-006', reportFrom: 'Sophia Taylor', reportReason: 'Impersonation attempt', reportTo: 'User Profile', date: '2025-12-10', status: 'Pending' },
    { key: 7, reportId: 'RP-007', reportFrom: 'Ethan Harris', reportReason: 'Offensive language', reportTo: 'Group Chat', date: '2025-12-09', status: 'Resolved' },
    { key: 8, reportId: 'RP-008', reportFrom: 'Charlotte Clark', reportReason: 'Scam attempt', reportTo: 'Dashboard', date: '2025-12-08', status: 'Under Review' },
    { key: 9, reportId: 'RP-009', reportFrom: 'Henry Young', reportReason: 'Policy violation', reportTo: 'News Section', date: '2025-12-07', status: 'Pending' },
    { key: 10, reportId: 'RP-010', reportFrom: 'Harper King', reportReason: 'Violent content', reportTo: 'Gallery', date: '2025-12-06', status: 'Resolved' },
  ];

  // Filter reports based on status
  const reports = statusFilter === 'All'
    ? allReports
    : allReports.filter(r => r.status === statusFilter);

  // Calculate stats (from all reports, not filtered)
  const totalReports = allReports.length;
  const pendingReports = allReports.filter(r => r.status === 'Pending').length;
  const resolvedReports = allReports.filter(r => r.status === 'Resolved').length;

  // Table columns
  const columns = [
    {
      title: 'Report ID',
      dataIndex: 'reportId',
      key: 'reportId',
      render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
    },
    {
      title: 'Report From',
      dataIndex: 'reportFrom',
      key: 'reportFrom',
    },
    {
      title: 'Reason',
      dataIndex: 'reportReason',
      key: 'reportReason',
    },
    {
      title: 'Reported To',
      dataIndex: 'reportTo',
      key: 'reportTo',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'Resolved' ? 'bg-green-100 text-green-800' :
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
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
            title="Edit Status"
          >
            <FiEdit className="text-green-600 w-5 h-5" />
          </button>
          <button
            className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
            onClick={() => showDeleteModal(record)}
            title="Delete Report"
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
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Reports Management</h1>

          {/* Desktop Search & Filter */}
          <div className="hidden md:flex ml-auto gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>
            <div className="relative">
              <input
                type="text"
                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
          </div>

          {/* Mobile Search & Filter */}
          <div className="md:hidden mt-3">
            <div className="flex gap-2 mb-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium flex-1"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Total Reports</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {totalReports}
              </p>
              <p className="text-sm text-slate-600 mt-2 font-medium">All submitted reports</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MdReport className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Pending</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {pendingReports}
              </p>
              <p className="text-sm text-orange-600 mt-2 font-medium">Awaiting review</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MdPending className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm md:text-base font-medium mb-2">Resolved</p>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                {resolvedReports}
              </p>
              <p className="text-sm text-green-600 mt-2 font-medium">Successfully handled</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MdCheckCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
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
          dataSource={reports}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          className="custom-reports-table"
        />

        <style jsx global>{`
          .custom-reports-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }

          .custom-reports-table .ant-table-thead > tr > th::before {
            display: none !important;
          }

          .custom-reports-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
      </ConfigProvider>

      {/* View Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Report Details</span>}
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
                <p className="text-sm text-slate-500 font-medium">Report ID</p>
                <p className="text-base font-semibold text-blue-600">{selectedRecord.reportId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Report From</p>
                <p className="text-base font-semibold text-slate-800">{selectedRecord.reportFrom}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Reported To</p>
                <p className="text-base font-semibold text-slate-800">{selectedRecord.reportTo}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Date</p>
                <p className="text-base font-semibold text-slate-800">{selectedRecord.date}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-500 font-medium">Reason</p>
                <p className="text-base font-semibold text-slate-800">{selectedRecord.reportReason}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-500 font-medium">Status</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${selectedRecord.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  selectedRecord.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                  {selectedRecord.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Status Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Edit Report Status</span>}
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
            onClick={handleUpdateStatus}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
          >
            Update Status
          </button>,
        ]}
        width={500}
      >
        {reportToEdit && (
          <div className="py-4">
            <div className="mb-4">
              <p className="text-sm text-slate-500 font-medium mb-2">Report ID</p>
              <p className="text-base font-semibold text-blue-600">{reportToEdit.reportId}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-slate-500 font-medium mb-2">Report From</p>
              <p className="text-base font-semibold text-slate-800">{reportToEdit.reportFrom}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-slate-500 font-medium mb-2">Current Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${reportToEdit.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  reportToEdit.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                }`}>
                {reportToEdit.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">New Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={<span className="text-lg font-semibold text-red-600">Delete Report</span>}
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
            onClick={handleDeleteReport}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200"
          >
            Delete Report
          </button>,
        ]}
        width={500}
      >
        {reportToDelete && (
          <div className="py-4">
            <p className="text-slate-700 mb-4">
              Are you sure you want to delete this report?
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-800 mb-2">
                <span className="text-red-600">Report ID:</span> {reportToDelete.reportId}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">From:</span> {reportToDelete.reportFrom}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">Reason:</span> {reportToDelete.reportReason}
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

export default Reports;
