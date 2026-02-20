'use client';

import { ReactNode } from 'react';
import { Toaster, ToastBar } from 'react-hot-toast';

type ToastProviderProps = {
    children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
    return (
        <>
            {children}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        fontFamily: 'var(--font-geist-sans)',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        color: '#fff',
                        background: '#1f2937',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                    },
                    success: { style: { background: '#16a34a', color: '#fff' } },
                    error: { style: { background: '#dc2626', color: '#fff' } },
                }}
            >
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <div className="flex items-center gap-2">
                                {icon}
                                <span>{message}</span>
                            </div>
                        )}
                    </ToastBar>
                )}
            </Toaster>
        </>
    );
};
