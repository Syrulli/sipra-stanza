'use client';

import { useState } from 'react';
import { handleApiResponse, handleApiError } from '@/app/lib/apiError';
import DarkVeil from '@/app/components/animations/darkVeil';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            handleApiResponse(data);
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

            <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-800/90 backdrop-blur-sm rounded shadow-2xl border border-gray-700/50">
                    <div className="p-8 md:p-10 lg:p-12">
                        <h3 className="text-3xl font-bold text-white mb-3">Forgot password</h3>

                        <p className="text-gray-300 mb-8">
                            Enter your email address and we'll send you a password reset link.
                        </p>

                        <form onSubmit={handleForgotPassword} className="space-y-5">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all disabled:opacity-60"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {loading ? 'Sending...' : 'Send reset link'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}