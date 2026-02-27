'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/signin' })}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition"
        >
            Logout
        </button>
    );
}