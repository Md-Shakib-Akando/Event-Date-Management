"use client"
import React from 'react'

import ProtectedRoute from "@/components/ProtectedRoute";

import Calendar from '@/components/Calender';


export default function Home() {

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Calendar></Calendar>

      </div>
    </ProtectedRoute>

  );
}
