import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Enterprise App</h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded border border-gray-300 px-6 py-3 hover:bg-gray-100"
        >
          Register
        </Link>
      </div>
    </main>
  );
}