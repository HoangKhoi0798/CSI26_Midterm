import Link from "next/link";
import { getProducts } from "@/app/lib/data";

export default async function DashboardPage() {
  const products = await getProducts();

  const lowStockItems = products.filter((p) => p.stock < 50);
  const totalWorth = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="space-x-3">
          <Link href="/inventory" className="text-blue-600 hover:underline">
            Inventory
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-sm font-medium text-gray-500">
            Total Types of Products
          </h2>
          <p className="text-3xl font-bold mt-2">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-sm font-medium text-gray-500">Total Worth</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ${totalWorth.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-sm font-medium text-gray-500">
            Attention Needed
          </h2>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {lowStockItems.length}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Required Import (&lt; 50 units)
        </h2>
        {lowStockItems.length === 0 ? (
          <p className="text-gray-500">Amounts up to requirments.</p>
        ) : (
          <ul className="divide-y">
            {lowStockItems.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between items-center"
              >
                <span>
                  {item.name} ({item.category})
                </span>
                <span className="font-bold text-red-600">
                  {item.stock} left
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
