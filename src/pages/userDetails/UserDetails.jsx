import { ConfigProvider, Modal, Table, Select } from "antd";
import { useMemo, useState } from "react";
import { IoSearch, IoChevronBack, IoAddOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from "react-icons/fa";
function UserDetails() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // block modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      fullName: "John Doe",
      role: "User",
      clinic: "Downtown Dental Clinic",
      email: "john@example.com",
      phone: "+1 987 654 3210",
      joined: "2024-01-12",
    },
    {
      key: "2",
      fullName: "Emma Smith",
      role: "Vendor",
      clinic: "Smile Care Clinic",
      email: "emma@example.com",
      phone: "+1 987 654 3211",
      joined: "2024-03-28",
    },
    {
      key: "3",
      fullName: "Liam Johnson",
      role: "User",
      clinic: "Healthy Teeth Clinic",
      email: "liam@example.com",
      phone: "+1 987 654 3212",
      joined: "2024-06-15",
    },
    {
      key: "4",
      fullName: "Olivia Brown",
      role: "Vendor",
      clinic: "City Dental Center",
      email: "olivia@example.com",
      phone: "+1 987 654 3213",
      joined: "2024-08-02",
    },
    {
      key: "5",
      fullName: "Noah Davis",
      role: "User",
      clinic: "Prime Smiles",
      email: "noah@example.com",
      phone: "+1 987 654 3214",
      joined: "2024-09-10",
    },
    {
      key: "6",
      fullName: "Sophia Miller",
      role: "Vendor",
      clinic: "Bright Smile Hub",
      email: "sophia@example.com",
      phone: "+1 987 654 3215",
      joined: "2024-11-19",
    },
    {
      key: "7",
      fullName: "James Wilson",
      role: "User",
      clinic: "Downtown Dental Clinic",
      email: "james@example.com",
      phone: "+1 987 654 3216",
      joined: "2025-01-05",
    },
    {
      key: "8",
      fullName: "Isabella Moore",
      role: "Vendor",
      clinic: "Healthy Teeth Clinic",
      email: "isabella@example.com",
      phone: "+1 987 654 3217",
      joined: "2025-02-21",
    },
    {
      key: "9",
      fullName: "Benjamin Taylor",
      role: "User",
      clinic: "Prime Smiles",
      email: "benjamin@example.com",
      phone: "+1 987 654 3218",
      joined: "2025-03-03",
    },
    {
      key: "10",
      fullName: "Mia Anderson",
      role: "Vendor",
      clinic: "City Dental Center",
      email: "mia@example.com",
      phone: "+1 987 654 3219",
      joined: "2025-04-12",
    },
  ]);
  const columns = [
    {
      title: "No",
      key: "no",
      width: 70,
      render: (_, _r, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <img
            src={"/userimg.png"}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span className="leading-none">{value}</span>
        </div>
      ),
    },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phone", key: "phone" },
    { title: "Joined Date", dataIndex: "joined", key: "joined" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button className="" onClick={() => showViewModal(record)}>
            <FaRegEye className="text-blue-600 w-5 h-5 cursor-pointer rounded-md" />
          </button>
          <button className="" onClick={() => openBlock(record)}>
            <MdBlock className="h-5 w-5 text-red-600 cursor-pointer rounded-md" />
          </button>
        </div>

      ),
    },
  ];

  const filteredData = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    return dataSource.filter((r) => {
      const matchRole = roleFilter ? r.role === roleFilter : true;
      const matchQuery = q
        ? [r.fullName, r.email, r.phone, r.clinic, r.role]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
        : true;
      return matchRole && matchQuery;
    });
  }, [dataSource, roleFilter, searchQuery]);

  const openBlock = (row) => {
    setSelectedUser(row);
    setIsModalOpen(true);
  };

  const confirmBlock = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
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
          <h1 className="text-white text-2xl sm:text-3xl font-bold">User Management</h1>

          {/* Desktop Search */}
          <div className="hidden md:flex ml-auto gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all w-64"
              />
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="relative w-full md:hidden mt-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-white/90 backdrop-blur-sm text-slate-800 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        </div>
      </div>

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
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          className="custom-user-table"
        />

        <style jsx global>{`
          .custom-user-table .ant-table-thead > tr > th {
            background: #60a5fa !important;
            color: white !important;
            font-weight: 600 !important;
          }
          
          .custom-user-table .ant-table-thead > tr > th::before {
            display: none !important;
          }
          
          .custom-user-table .ant-table-tbody > tr:hover > td {
            background: #eff6ff !important;
          }
        `}</style>
        {/* Block Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
          className="block-user-modal"
        >
          <div className="flex flex-col justify-center items-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <MdBlock className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-3">Block User</h1>
            <p className="text-base md:text-lg text-center text-slate-600 mb-6 px-4">
              {selectedUser
                ? `Are you sure you want to block ${selectedUser.fullName}?`
                : `Are you sure you want to block this user?`}
            </p>
            <div className="flex justify-center gap-3 w-full px-4">
              <button
                onClick={handleCancel}
                className="flex-1 max-w-[150px] bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlock}
                className="flex-1 max-w-[150px] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
              >
                Block
              </button>
            </div>
          </div>
        </Modal>

        {/* View Modal */}
        <Modal
          open={isViewModalOpen}
          centered
          onCancel={handleViewCancel}
          footer={null}
          width={800}
          className="user-view-modal"
        >
          {selectedUser && (
            <div className="relative">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 -m-6 mb-6 rounded-t-lg">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={"/userimg.png"}
                      alt={selectedUser.fullName}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {selectedUser.fullName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                        {selectedUser.role}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                        Joined: {selectedUser.joined}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-xl shadow-sm">
                  <div className="text-slate-600 text-sm font-medium mb-1">Email</div>
                  <div className="text-lg font-semibold text-slate-800">
                    {selectedUser.email}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-xl shadow-sm">
                  <div className="text-slate-600 text-sm font-medium mb-1">Phone No</div>
                  <div className="text-lg font-semibold text-slate-800">
                    {selectedUser.phone}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-xl shadow-sm">
                  <div className="text-slate-600 text-sm font-medium mb-1">Joined Date</div>
                  <div className="text-lg font-semibold text-slate-800">
                    {selectedUser.joined}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-xl shadow-sm">
                  <div className="text-slate-600 text-sm font-medium mb-1">Clinic</div>
                  <div className="text-lg font-semibold text-slate-800">
                    {selectedUser.clinic}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end items-center mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={handleViewCancel}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default UserDetails;
