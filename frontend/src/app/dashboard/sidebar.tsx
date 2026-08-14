import React from 'react';

interface NavItem {
    label: string;
    icon: React.ReactNode;
    href: string;
}

interface SidebarProps {
    appName?: string;
    onLogout?: () => void;
    currentTab: string;
    onChangeTab: (tab: string) => void;
}

// Inline icons (no external dependency)
const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const HomeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

export default function Sidebar({ appName = 'YANA', onLogout, currentTab, onChangeTab }: SidebarProps) {
    const navItems: NavItem[] = [
        { label: 'Dashboard', icon: <HomeIcon />, href: '/dashboard' },
        { label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
    ];

    return (
        <aside className="flex h-screen w-56 flex-col justify-between bg-[#0b0f1a] px-3 py-4 text-slate-300">
            {/* Top: logo + brand */}
            <div>
                <div className="mb-6 flex items-center gap-2 px-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500">
                        <span className="text-white"><CheckIcon /></span>
                    </div>
                    <span className="text-sm font-semibold tracking-wide text-white">
                        {appName}
                    </span>
                </div>

                {/* Nav items */}
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = item.label.toLowerCase() === currentTab.toLowerCase();
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChangeTab(item.label.toLowerCase());
                                }}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                                    ? 'bg-slate-800/70 text-white'
                                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom: logout */}
            <button
                onClick={onLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800/40 hover:text-slate-200"
            >
                <LogoutIcon />
                Logout
            </button>
        </aside>
    );
}