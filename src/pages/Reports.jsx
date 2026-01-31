import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const REPORTS = [
    { id: 1, title: 'Daily Attendance Summary', date: 'Jan 28, 2024', size: '1.2 MB' },
    { id: 2, title: 'Weekly Energy Audit', date: 'Jan 27, 2024', size: '3.5 MB' },
    { id: 3, title: 'Campus Occupancy Heatmap', date: 'Jan 25, 2024', size: '5.8 MB' },
    { id: 4, title: 'Monthly Security Logs', date: 'Jan 01, 2024', size: '12.4 MB' },
];

const Reports = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-1">Reports & Exports</h1>
                <p className="text-gray-400">Download automated system reports and data logs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REPORTS.map((report) => (
                    <div key={report.id} className="glass-panel p-6 flex flex-col hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                            <FileText size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{report.title}</h3>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <Calendar size={14} />
                            <span>Generated on {report.date}</span>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-xs text-gray-400 uppercase font-bold">{report.size}</span>
                            <button className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium">
                                <Download size={16} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))}

                {/* Generate New Report Card */}
                <div className="glass-panel p-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer min-h-[240px]">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-400 mb-4">
                        <PlusIcon />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Generate Custom Report</h3>
                    <p className="text-sm text-gray-400 max-w-[200px]">Create a new report based on specific date ranges and metrics.</p>
                </div>
            </div>
        </div>
    );
};

const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Reports;
