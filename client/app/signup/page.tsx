'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [email, setEmail] = useState(''),
        [firstName, setFirstName] = useState(''),
        [lastName, setLastName] = useState(''),
        [password, setPassword] = useState(''),
        [error, setError] = useState(''),
        [loading, setLoading] = useState(false),
        router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password
                }),
            });

            if (response.ok) {
                router.push('/login');
            } else {
                setError('Failed to create account');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full p-3 border rounded-lg text-black"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full p-3 border rounded-lg text-black"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}
