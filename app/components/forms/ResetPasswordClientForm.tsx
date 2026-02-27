'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { handleApiResponse, handleApiError } from '@/app/lib/apiError';
import DarkVeil from '@/app/components/animations/darkVeil';

export default function ResetPasswordClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            handleApiError('Invalid or missing reset token');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            handleApiResponse(data);

            if (res.ok) {
                setTimeout(() => router.push('/signin'), 1500);
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <DarkVeil />
            </div>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Reset password
                    </h2>

                    <p className="text-gray-300 mb-6">
                        Enter your new password below.
                    </p>

                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <input
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 py-3 rounded-lg text-white disabled:opacity-60"
                        >
                            {loading ? 'Resetting...' : 'Reset password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}