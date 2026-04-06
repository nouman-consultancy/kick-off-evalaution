import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">404 - Not Found</h2>
      <p className="mt-4 text-gray-600">Could not find requested resource</p>
      <Link
        href="/"
        className="mt-6 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Return Home
      </Link>
    </div>
  );
}