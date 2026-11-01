import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Inventory System
        </h1>
        <p className="text-gray-600 text-lg">Inventory</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Enter Dashboard
          </Link>
          <Link
            href="/inventory"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            View Inventory
          </Link>
        </div>
      </div>
    </main>
  );
}
