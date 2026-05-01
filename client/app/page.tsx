import Link from 'next/link';

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Distraction Tracker
            </h2>
            <p className="mt-2 text-gray-600">
              Track and manage your distractions
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/signup">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
            <div></div>
            <Link href="/login">
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
  );
}
