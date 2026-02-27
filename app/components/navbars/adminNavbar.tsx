'use client';

import { useState } from 'react';
import LogoutButton from '@/components/buttons/LogoutBtn';
import Sidebar from '@/components/sidebar/AdminSidebar';

export default function AdminNavbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
                <button
                    onClick={() => setOpen(true)}
                    className="text-xl"
                >
                    ☰
                </button>

                <span className="font-semibold">Admin</span>
                <LogoutButton />
            </header>

            {open && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                    />

                    <div className="relative w-64 bg-gray-900 text-white">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                            <span className="font-bold">Admin Panel</span>
                            <button onClick={() => setOpen(false)}>✕</button>
                        </div>

                        <Sidebar />
                    </div>
                </div>
            )}
        </>
    );
}