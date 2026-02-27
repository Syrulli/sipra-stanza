import { Suspense } from 'react';
import ResetPasswordClient from '@/components/forms/ResetPasswordClientForm';

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ResetPasswordClient />
        </Suspense>
    );
}