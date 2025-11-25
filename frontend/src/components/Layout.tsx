import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    activePage: string;
    onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
    return (
        <div className="flex h-screen bg-background text-white overflow-hidden">
            <Sidebar activePage={activePage} onNavigate={onNavigate} />
            <main className="flex-1 overflow-auto flex flex-col">
                <header className="h-16 border-b border-zinc-800 flex items-center px-8 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-white capitalize">
                            {activePage.replace('-', ' ')}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-zinc-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span>
                            Market Open
                        </div>
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Connect Wallet
                        </button>
                    </div>
                </header>
                <div className="p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
