import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    date: string;
    value: number; // Historical value
    p50_lower?: number;
    p50_upper?: number;
    p90_lower?: number;
    p90_upper?: number;
}

interface KalshiFanChartProps {
    data: DataPoint[];
    title: string;
}

const KalshiFanChart: React.FC<KalshiFanChartProps> = ({ data, title }) => {
    return (
        <div className="bg-surface border border-zinc-800 rounded-xl p-6 h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">{title}</h3>
                <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1 text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Historical
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-indigo-500/50"></span>
                        50% Prob
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-indigo-500/20"></span>
                        90% Prob
                    </span>
                </div>
            </div>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />

                        {/* Fan Bands - 90% */}
                        <Area
                            type="monotone"
                            dataKey="p90_upper"
                            stackId="2"
                            stroke="none"
                            fill="#6366f1"
                            fillOpacity={0.1}
                        />
                        <Area
                            type="monotone"
                            dataKey="p90_lower"
                            stackId="2"
                            stroke="none"
                            fill="#6366f1"
                            fillOpacity={0.1}
                        />

                        {/* Fan Bands - 50% */}
                        <Area
                            type="monotone"
                            dataKey="p50_upper"
                            stackId="3"
                            stroke="none"
                            fill="#6366f1"
                            fillOpacity={0.2}
                        />
                        <Area
                            type="monotone"
                            dataKey="p50_lower"
                            stackId="3"
                            stroke="none"
                            fill="#6366f1"
                            fillOpacity={0.2}
                        />

                        {/* Historical Line */}
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default KalshiFanChart;
