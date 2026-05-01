'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Distraction {
    id: number;
    description: string;
    timestamp: string;
    duration: number;
}

export default function Dashboard() {
    const [distractions, setDistractions] = useState<Distraction[]>([]),
        [newDistraction, setNewDistraction] = useState(''),
        [duration, setDuration] = useState(''),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(''),
        [isLoggedIn, setIsLoggedIn] = useState(false),
        [userEmail, setUserEmail] = useState(''),
        router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        if (token && email) {
            setIsLoggedIn(true);
            setUserEmail(email);
        }
        fetchDistractions();
    }, []);

    const fetchDistractions = async () => {
        try {
            const headers: any = {};
            const token = localStorage.getItem('token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch('http://localhost:8080/api/v1/distractions/', {
                headers,
            });
            if (response.ok) {
                const data = await response.json();
                setDistractions(data);
            }
        } catch (err) {
            setError('Failed to load distractions');
        }
    };

    const addDistraction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const headers: any = {
                'Content-Type': 'application/json',
            };
            const token = localStorage.getItem('token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch('http://localhost:8080/api/v1/distractions/', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    description: newDistraction,
                    duration: parseInt(duration),
                }),
            });

            if (response.ok) {
                setNewDistraction('');
                setDuration('');
                fetchDistractions();
            } else {
                setError('Failed to add distraction');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail('');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Distraction Tracker</h1>
                    <div className="flex space-x-4">
                        {isLoggedIn ? (
                            <>
                                <span className="text-gray-600">Welcome, {userEmail}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {!isLoggedIn && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                        <p className="text-yellow-800">
                            You're using the guest version. <Link href="/signup" className="underline text-blue-600">Sign up</Link> or <Link href="/login" className="underline text-blue-600">login</Link> to save your progress!
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Rest of your existing dashboard code remains the same */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-black">Log New Distraction</h2>
                    <form onSubmit={addDistraction} className="space-y-4">
                        <input
                            type="text"
                            placeholder="What distracted you?"
                            className="w-full p-3 border rounded-lg text-black"
                            value={newDistraction}
                            onChange={(e) => setNewDistraction(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Duration (minutes)"
                            className="w-full p-3 border rounded-lg text-black"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            min="1"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Distraction'}
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-black">Recent Distractions</h2>
                    {distractions.length === 0 ? (
                        <p className="text-gray-600">No distractions logged yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {distractions.map((distraction) => (
                                <div
                                    key={distraction.id}
                                    className="border-l-4 border-blue-500 pl-4 py-2"
                                >
                                    <p className="text-black font-medium">{distraction.description}</p>
                                    <p className="text-gray-600 text-sm">
                                        {distraction.duration} minutes • {new Date(distraction.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
