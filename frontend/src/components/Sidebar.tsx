import React from 'react';
import { LayoutDashboard, TrendingUp, Activity, Truck, Globe } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
    const navItems = [
        { id: 'macro', label: 'Macro Time-Series', icon: TrendingUp },
        { id: 'rates', label: 'Interest Rates', icon: Activity },
        { id: 'inflation', label: 'Inflation Lab', icon: LayoutDashboard },
        { id: 'supply', label: 'Supply Chain', icon: Truck },
    ];

    return (
        <div className="w-64 bg-surface border-r border-zinc-800 flex flex-col h-screen">
            <div className="p-6 border-b border-zinc-800">
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-6 h-6 text-primary" />
                    MacroTerm
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500">
                <p>Kalshi Macro Terminal</p>
                <p>v0.1.0</p>
            </div>
        </div>
    );
};

export default Sidebar;
