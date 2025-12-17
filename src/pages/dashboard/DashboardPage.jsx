import { FaChevronDown, FaUsers, FaDollarSign } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { useState } from "react";
import dayjs from "dayjs";
import RecentUsers from "./RecentUsers";
import UserAgentChart from "./UserAgentChart";
import RevenueChart from "./RevenueChart";

function DashboardPage() {
  const currentYear = dayjs().year();
  const startYear = 2020;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  const stats = [
    {
      value: '200K',
      label: 'Total Users',
      icon: FaUsers,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      value: '1200',
      label: 'Total Agents',
      icon: HiUserGroup,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      value: '$120K',
      label: 'Total Revenue',
      icon: FaDollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    }
  ];

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-slate-600 text-sm md:text-base mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`group relative bg-gradient-to-br ${stat.bgGradient} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 overflow-hidden`}
            >
              {/* Decorative gradient overlay */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm md:text-base font-medium mb-2">{stat.label}</p>
                  <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User & Agent Growth Chart */}
        <div className="w-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-lg p-5 md:p-7 border border-slate-200/60">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                User & Agent Growth
              </h2>
              <p className="text-slate-600 text-sm mt-1">Track user and agent registration trends</p>
            </div>

            {/* Year Selector */}
            <div className="relative w-full md:w-44">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-xl flex justify-between items-center bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
              >
                <span className="text-slate-700 text-sm md:text-base font-semibold">{selectedYear}</span>
                <FaChevronDown className={`text-blue-600 w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute z-30 w-full mt-2 bg-white border-2 border-blue-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {years.map((year) => (
                      <div
                        key={year}
                        onClick={() => handleSelect(year)}
                        className={`px-4 py-3 cursor-pointer transition-all text-sm md:text-base ${year === selectedYear
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold"
                          : "text-slate-700 hover:bg-blue-50"
                          }`}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chart Container */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200/60">
            <div className="h-64 md:h-80">
              <UserAgentChart />
            </div>
          </div>
        </div>

        {/* Revenue Growth Chart */}
        <div className="w-full bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl shadow-lg p-5 md:p-7 border border-slate-200/60">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                Revenue Growth
              </h2>
              <p className="text-slate-600 text-sm mt-1">Track revenue trends over time</p>
            </div>

            {/* Year Selector */}
            <div className="relative w-full md:w-44">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2.5 border-2 border-emerald-200 rounded-xl flex justify-between items-center bg-white hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 shadow-sm"
              >
                <span className="text-slate-700 text-sm md:text-base font-semibold">{selectedYear}</span>
                <FaChevronDown className={`text-emerald-600 w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute z-30 w-full mt-2 bg-white border-2 border-emerald-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {years.map((year) => (
                      <div
                        key={year}
                        onClick={() => handleSelect(year)}
                        className={`px-4 py-3 cursor-pointer transition-all text-sm md:text-base ${year === selectedYear
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold"
                          : "text-slate-700 hover:bg-emerald-50"
                          }`}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chart Container */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200/60">
            <div className="h-64 md:h-80">
              <RevenueChart />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Section */}
      <div className="w-full">
        <div className="flex items-center gap-3 mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Recent Joined Users
            </h2>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200/60">
          <RecentUsers />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
