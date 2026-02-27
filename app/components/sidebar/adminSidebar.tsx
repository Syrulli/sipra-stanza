'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/dashboard/users' },
    { label: 'Orders', href: '/dashboard/orders' },
    { label: 'Settings', href: '/dashboard/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col">
            <div className="px-6 py-5 text-xl font-bold border-b border-gray-800">
                Admin Panel
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 rounded-lg text-sm transition ${pathname === item.href
                                ? 'bg-indigo-600'
                                : 'hover:bg-gray-800'
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}