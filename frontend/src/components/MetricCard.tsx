import React from 'react';
import clsx from 'clsx';

interface MetricCardProps {
    label: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change }) => {
    return (
        <div className="bg-surface border border-zinc-800 rounded-xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">{label}</h3>
            <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{value}</div>
                {change !== undefined && (
                    <div className={clsx(
                        "text-sm font-medium px-2 py-1 rounded-md",
                        change > 0 ? "text-emerald-400 bg-emerald-400/10" :
                            change < 0 ? "text-rose-400 bg-rose-400/10" : "text-zinc-400 bg-zinc-800"
                    )}>
                        {change > 0 ? '+' : ''}{change}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricCard;
