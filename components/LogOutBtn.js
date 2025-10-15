"use client"
import React from 'react'

import { useRouter } from "next/navigation";
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LogOutBtn() {

    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.replace("/login");
    };
    return (
        <div><button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
            Logout
        </button></div>
    )
}
