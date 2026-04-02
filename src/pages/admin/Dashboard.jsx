// src/pages/admin/Dashboard.jsx
import { Users, FileText, Link as LinkIcon, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const userGrowthData = [
  { name: "Jan", users: 40 },
  { name: "Feb", users: 70 },
  { name: "Mar", users: 110 },
  { name: "Apr", users: 160 },
];

const postActivityData = [
  { name: "Senin", posts: 5 },
  { name: "Selasa", posts: 8 },
  { name: "Rabu", posts: 12 },
  { name: "Kamis", posts: 7 },
  { name: "Jumat", posts: 15 },
];

export default function Dashboard() {
  const statCards = [
    {
      title: "Total Users",
      value: "1,240",
      icon: <Users size={24} className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Posts",
      value: "85",
      icon: <FileText size={24} className="text-emerald-600" />,
      bg: "bg-emerald-100",
    },
    {
      title: "Total Links",
      value: "32",
      icon: <LinkIcon size={24} className="text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-4 rounded-full ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ stroke: "#9CA3AF", strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2563EB"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Post Activity (This Week)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postActivityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#F3F4F6" }} />
                <Bar dataKey="posts" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Activity size={20} className="text-gray-500" /> Recent Activity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">Action</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  Created new post "Jadwal UTS 2026"
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  Admin Utama
                </td>
                <td className="px-6 py-4 text-gray-400">10 mins ago</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  Updated Student Link "Portal Akademik"
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  Admin BEM
                </td>
                <td className="px-6 py-4 text-gray-400">2 hours ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
