'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import AdminSidebar from '@/components/sidebar/adminSidebar';
import AdminNavbar from '@/components/navbars/adminNavbar';

export default function DashboardLayout({ children, }: { children: ReactNode; }) {
    return (
        <SessionProvider>
            <div className="min-h-screen flex bg-gray-100">
                <AdminSidebar />
                <div className="flex-1 flex flex-col">
                    <AdminNavbar />
                    <main className="p-6 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </SessionProvider>
    );
}