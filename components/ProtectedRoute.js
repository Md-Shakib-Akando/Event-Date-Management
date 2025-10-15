'use client';
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react'
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace("/login");
    }, [user, loading, router]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!user) return null;

    return children;
}
