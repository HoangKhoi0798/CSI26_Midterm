import Link from "next/link";
import { getProducts } from "@/app/lib/data";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";
  const products = await getProducts();

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Inventory</h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          <Link
            href="/inventory/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Product
          </Link>
        </div>
      </div>

      <form method="GET" className="flex gap-2">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search products or categories..."
          className="border rounded-md px-4 py-2 grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td
                  className={`p-4 font-bold ${product.stock < 5 ? "text-red-600" : "text-gray-800"}`}
                >
                  {product.stock}
                </td>
                <td className="p-4">
                  <Link
                    href={`/inventory/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Configurate Products
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
