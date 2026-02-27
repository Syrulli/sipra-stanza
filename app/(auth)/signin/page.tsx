'use client';

import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkVeil from '@/app/components/animations/darkVeil';
import { FcGoogle } from '@/app/components/icons/iconPacks';
import { handleApiResponse, handleApiError } from '@/app/lib/apiError';

const nameRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

export default function SignInPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const redirectBasedOnRole = async () => {
        const session = await getSession();
        router.push(session?.user?.role === 'admin' ? '/dashboard' : '/');
        router.refresh();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                // LOGIN
                const res = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (!res?.ok) {
                    handleApiError(res?.error || 'Invalid email or password');
                    return;
                }

                await redirectBasedOnRole();
            } else {
                // REGISTER 
                if (!name.trim()) {
                    handleApiError('Full name is required');
                    return;
                }

                if (!nameRegex.test(name)) {
                    handleApiError('Full name can only contain letters and spaces');
                    return;
                }

                if (!passwordRegex.test(password)) {
                    handleApiError(
                        'Password must be 8–16 characters and include at least one special character'
                    );
                    return;
                }

                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.toLowerCase(),
                        password,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    handleApiError(data);
                    return;
                }

                handleApiResponse(data);
                const signInRes = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (signInRes?.ok) {
                    await redirectBasedOnRole();
                } else {
                    // handleApiError('Account created, please sign in.');
                    setIsLogin(true);
                }
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        signIn('google', { callbackUrl: '/dashboard' });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <DarkVeil />
            </div>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-4xl grid md:grid-cols-2 bg-gray-800 rounded shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-white mb-1">
                            {isLogin ? 'Sign in' : 'Create account'}
                        </h1>

                        <p className="text-sm text-gray-300 mb-6">
                            {isLogin
                                ? 'Welcome back! Please sign in.'
                                : "Let's get started with Sipra Stanza."}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[A-Za-z\s]*$/.test(value)) setName(value);
                                    }}
                                    disabled={loading}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-900 text-white"
                                />
                            )}

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-900 text-white"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-900 text-white"
                            />
                            {isLogin && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/forgot-password')}
                                        disabled={loading}
                                        className="text-gray-300 cursor-pointer text-sm"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg disabled:opacity-60 cursor-pointer"
                            >
                                {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Create account'}
                            </button>
                        </form>

                        <p
                            className="text-center text-sm text-gray-300 mt-5 cursor-pointer"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </p>

                        <div className="mt-8">
                            <button
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-2.5 bg-white rounded-lg cursor-pointer"
                            >
                                <FcGoogle className="h-5 w-5" />
                                <span className="text-gray-800 text-sm font-medium">
                                    Continue with Google
                                </span>
                            </button>
                        </div>
                    </div>

                    <div
                        className="hidden md:block bg-cover bg-center"
                        style={{ backgroundImage: `url('/backgrounds/bg-1.webp')` }}
                    />
                </div>
            </div>
        </div>
    );
}