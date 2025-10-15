"use client"
import React from 'react'
import LogOutBtn from "@/components/LogOutBtn";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from '@/components/AuthProvider';


export default function Home() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email}</h1>
        <LogOutBtn></LogOutBtn>
      </div>
    </ProtectedRoute>

  );
}
