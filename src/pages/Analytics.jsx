import React from 'react';
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Zap, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const WEEKLY_DATA = [
    { day: 'Mon', energy: 145, occupancy: 320, savings: 45 },
    { day: 'Tue', energy: 132, occupancy: 280, savings: 52 },
    { day: 'Wed', energy: 156, occupancy: 350, savings: 38 },
    { day: 'Thu', energy: 142, occupancy: 310, savings: 47 },
    { day: 'Fri', energy: 128, occupancy: 290, savings: 55 },
    { day: 'Sat', energy: 85, occupancy: 120, savings: 72 },
    { day: 'Sun', energy: 45, occupancy: 50, savings: 85 },
];

const Analytics = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-1">Analytics & Insights</h1>
                <p className="text-gray-400">Detailed breakdown of energy efficiency and campus usage</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Energy Saved"
                    value="1,245 kWh"
                    trend="+12%"
                    trendUp={true}
                    icon={<Zap className="text-yellow-400" />}
                />
                <KPICard
                    title="Avg. Daily Occupancy"
                    value="854"
                    trend="+5%"
                    trendUp={true}
                    icon={<TrendingUp className="text-emerald-400" />}
                />
                <KPICard
                    title="Carbon Footprint"
                    value="-450 kg"
                    trend="-8%"
                    trendUp={false} // Good for carbon footprint
                    goodTrend={true}
                    icon={<TrendingDown className="text-emerald-400" />}
                />
                <KPICard
                    title="Cost Efficiency"
                    value="$3,400"
                    trend="+15%"
                    trendUp={true}
                    icon={<DollarSign className="text-emerald-400" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Energy vs Occupancy */}
                <div className="glass-panel p-6">
                    <h3 className="text-lg font-bold mb-6">Energy Consumption vs Occupancy</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={WEEKLY_DATA}>
                                <defs>
                                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00e6b8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00e6b8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f1020', borderColor: 'rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="energy" stroke="#facc15" fillOpacity={1} fill="url(#colorEnergy)" name="Energy (kWh)" />
                                <Area type="monotone" dataKey="occupancy" stroke="#00e6b8" fillOpacity={1} fill="url(#colorOcc)" name="Occupancy" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Efficiency Savings */}
                <div className="glass-panel p-6">
                    <h3 className="text-lg font-bold mb-6">Energy Efficiency (%)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={WEEKLY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#0f1020', borderColor: 'rgba(255,255,255,0.1)' }}
                                />
                                <Bar dataKey="savings" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} name="Efficiency Rating" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KPICard = ({ title, value, trend, trendUp, goodTrend = true, icon }) => (
    <div className="glass-panel p-6">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-400 text-sm mb-1">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
            <div className="p-2 bg-white/5 rounded-lg">
                {icon}
            </div>
        </div>
        <div className={`flex items-center gap-1 text-sm ${(trendUp && goodTrend) || (!trendUp && !goodTrend) ? 'text-emerald-400' : 'text-red-400'
            }`}>
            <span>{trend}</span>
            <span className="text-gray-500">vs last week</span>
        </div>
    </div>
);

export default Analytics;
