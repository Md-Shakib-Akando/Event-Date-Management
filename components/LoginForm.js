'use client';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';
import authHero from '../public/assets/auth-hero.jpg'
import Image from 'next/image';
export default function LoginForm() {
    const { user, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/")
        } catch (err) {
            setError(err.message)
        }
    }
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/');
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        if (!loading && user) router.replace("/");
    }, [router, loading, user]);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-blue-400 overflow-hidden">
                <Image
                    src={authHero}
                    alt="Event planning workspace"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
                    <div>
                        <div className="inline-flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-lg font-bold">EDM</span>
                            </div>
                            <h1 className="text-3xl font-bold">Event Date Management</h1>
                        </div>

                        <h2 className="text-5xl font-bold mb-6 leading-tight">
                            Streamline Your Event Management
                        </h2>
                        <p className="text-lg text-white/90 max-w-md">
                            Manage events, schedules, and teams effortlessly — all in one place.
                        </p>
                    </div>

                    <div className="space-y-6 mt-12">
                        {[
                            {
                                title: "Smart Scheduling",
                                desc: "Intelligent date suggestions and conflict detection"
                            },
                            {
                                title: "Team Collaboration",
                                desc: "Coordinate with your team effortlessly"
                            },
                            {
                                title: "Event Insights",
                                desc: "Track attendance and engagement metrics"
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl">✓</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                    <p className="text-sm text-white/80">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white min-h-screen lg:min-h-full">

                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition text-gray-700 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.3 0 6.2 1.1 8.5 3.2l6.4-6.4C34.8 3.5 29.7 1.5 24 1.5 14.7 1.5 6.6 6.8 2.7 14.4l7.8 6.1C12.2 13.5 17.6 9.5 24 9.5z" />
                            <path fill="#34A853" d="M46.1 24.6c0-1.5-.1-3-.4-4.6H24v9h12.6c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.5-4.1 7.1-10.1 7.1-17.5z" />
                            <path fill="#4A90E2" d="M24 47.5c6.5 0 11.9-2.1 15.8-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-8.2 2.3-6.3 0-11.7-4.2-13.6-10.1l-7.8 6.1C6.7 42.2 14.7 47.5 24 47.5z" />
                            <path fill="#FBBC05" d="M10.4 28.1c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.8-6.1C1.9 16 1 19.9 1 23.5s.9 7.5 2.6 10.8l7.8-6.2z" />
                        </svg>
                        Continue with Google
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
