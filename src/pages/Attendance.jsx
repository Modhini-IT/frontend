import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    ChevronLeft,
    ClipboardCheck,
    Download,
    CheckCircle2,
    XCircle,
    Users
} from 'lucide-react';

const ATTENDANCE_DATA = [
    { id: 1, roll: '2025IT1070', name: 'Pranav A', location: 'Library', checkIn: '08:15 AM', checkOut: '12:30 PM', status: 'Present' },
    { id: 2, roll: '2025IT1089', name: 'Modhini V', location: 'MPH', checkIn: '08:45 AM', checkOut: '04:00 PM', status: 'Present' },
    { id: 3, roll: '2025IT1030', name: 'Rishe S', location: 'Cafeteria', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'Present' },
    { id: 4, roll: '2025IT0186', name: 'Shivvani T', location: 'Block 1', checkIn: '—', checkOut: '—', status: 'Absent' },
    { id: 5, roll: '2025IT0130', name: 'Suresh Krishna G', location: 'Library', checkIn: '08:00 AM', checkOut: '05:30 PM', status: 'Present' },
    { id: 6, roll: '2025IT1058', name: 'Srivatsan S', location: 'Block 3', checkIn: '11:00 AM', checkOut: '01:00 PM', status: 'Present' },
];

const Attendance = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = ATTENDANCE_DATA.filter(student => {
        if (!searchTerm) return true;
        const lowQuery = searchTerm.toLowerCase().trim();
        return (
            student.name.toLowerCase().includes(lowQuery) ||
            student.roll.toLowerCase().includes(lowQuery) ||
            student.location.toLowerCase().includes(lowQuery)
        );
    });

    const stats = [
        { label: 'Total Students', value: 6, icon: <Users className="text-blue-400" /> },
        { label: 'Present Today', value: 5, icon: <CheckCircle2 className="text-emerald-400" /> },
        { label: 'Absent Today', value: 1, icon: <XCircle className="text-red-400" /> },
    ];

    return (
        <div className="w-full flex flex-col gap-10 p-4 md:p-8 min-h-screen pb-32">
            {/* Header Section - Full Width */}
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/5 transition-all shadow-xl"
                    >
                        <ChevronLeft size={32} strokeWidth={2.5} />
                    </button>
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <ClipboardCheck className="text-emerald-400" size={36} />
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                            Attendance Sheet
                        </h1>
                    </div>
                </div>
                <button className="flex items-center gap-3 px-10 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all font-black uppercase tracking-widest text-sm bg-[#0f111a]/80 shadow-2xl">
                    <Download size={20} />
                    Export
                </button>
            </div>

            {/* Attendance Stats Cards - Neatly Clumped Row */}
            <div className="flex flex-wrap gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex-1 min-w-[200px] glass-panel bg-[#0f111a]/80 border-white/5 p-5 rounded-[1.5rem] flex items-center gap-5 shadow-xl hover:bg-white/[0.02] transition-colors">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Table Section */}
            <div className="glass-panel bg-[#0f111a]/95 border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-3xl">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <h2 className="text-2xl font-black text-white tracking-tight">Active Registrations</h2>

                    {/* Search Bar - Strictly White Content */}
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white opacity-100" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, roll number, or location..."
                            className="w-full border border-white/10 rounded-xl py-4 pl-12 pr-10 !text-white text-base focus:outline-none focus:border-white/30 transition-all placeholder:text-white font-medium shadow-2xl"
                            style={{ backgroundColor: '#0f111a', color: 'white' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="p-8 text-xs font-black text-white uppercase tracking-[0.2em] border-b border-white/5 opacity-60">Roll Number</th>
                                <th className="p-8 text-xs font-black text-white uppercase tracking-[0.2em] border-b border-white/5 opacity-60">Name</th>
                                <th className="p-8 text-xs font-black text-white uppercase tracking-[0.2em] border-b border-white/5 opacity-60">Location</th>
                                <th className="p-8 text-xs font-black text-white uppercase tracking-[0.2em] border-b border-white/5 opacity-60">Check-In</th>
                                <th className="p-8 text-xs font-black text-white uppercase tracking-[0.2em] border-b border-white/5 opacity-60">Check-Out</th>
                                <th className="p-8 text-xs font-black text-white uppercase tracking-[0.2em] border-b border-white/5 opacity-60 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredData.map((student) => (
                                <tr key={student.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="p-8">
                                        <span className="text-lg font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">{student.roll}</span>
                                    </td>
                                    <td className="p-8">
                                        <span className="text-xl font-black text-white tracking-tight leading-none block">{student.name}</span>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                            <span className="text-lg font-bold text-gray-300">{student.location}</span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-lg font-bold text-gray-400">{student.checkIn}</td>
                                    <td className="p-8 text-lg font-bold text-gray-400">{student.checkOut}</td>
                                    <td className="p-8 text-center">
                                        <span className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-lg ${student.status === 'Present'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-500/10'
                                            : 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-red-500/10'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination / Info Footer */}
            <div className="flex justify-center items-center py-10">
                <p className="text-white/60 font-medium text-lg tracking-wide">
                    Showing attendance for <span className="text-white font-black uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </p>
            </div>
        </div>
    );
};

export default Attendance;
