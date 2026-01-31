import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import GooeyNav from './GooeyNav';
import {
    LayoutDashboard,
    Video,
    ClipboardList,
    BarChart2,
    Users,
    FileText,
    LogOut,
    Menu,
    X,
    Leaf
} from 'lucide-react';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { path: '/dashboard/monitor', label: 'Live Monitor', icon: <Video size={20} /> },
        { path: '/dashboard/attendance', label: 'Attendance', icon: <ClipboardList size={20} /> },
        { path: '/dashboard/analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
        { path: '/dashboard/students', label: 'Student Mgmt', icon: <Users size={20} /> },
        { path: '/dashboard/reports', label: 'Reports', icon: <FileText size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-primary overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 glass-panel m-0 rounded-none border-t-0 border-b-0 border-l-0
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
                <div className="p-6 flex items-center gap-2 border-b border-white/10">
                    <Leaf className="text-emerald-400" size={24} color="var(--accent-primary)" />
                    <span className="text-xl font-bold">Eco<span style={{ color: 'var(--accent-primary)' }}>Track</span></span>
                    <button
                        className="ml-auto md:hidden text-gray-400 bg-transparent border-none hover:text-white transition-colors"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <GooeyNav
                        items={menuItems.map(item => ({ label: item.label, href: item.path }))}
                    />
                </div>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                            A
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">Administrator</p>
                            <p className="text-xs text-gray-500 truncate">admin@svce.ac.in</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm bg-transparent border-none"
                    >
                        <LogOut size={18} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10 glass-panel rounded-none">
                    <div className="flex items-center gap-2">
                        <Leaf className="text-emerald-400" size={20} />
                        <span className="font-bold">EcoTrack</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-400 hover:text-white bg-transparent border-none p-2"
                    >
                        <Menu size={28} />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
