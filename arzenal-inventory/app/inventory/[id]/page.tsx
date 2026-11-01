import { getProductById, updateProduct, deleteProduct } from "@/app/lib/data";
import { redirect } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="p-8 text-center text-red-600">Product not found.</div>
    );
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);

    await updateProduct(id, { name, category, price, stock });
    redirect("/inventory");
  }

  async function handleDelete() {
    "use server";
    await deleteProduct(id);
    redirect("/inventory");
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Status: {product.name}</h1>
      <form
        action={handleUpdate}
        className="space-y-4 bg-white p-6 rounded-lg shadow border"
      >
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            required
            name="name"
            defaultValue={product.name}
            type="text"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            required
            name="category"
            defaultValue={product.category}
            type="text"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price ($)</label>
          <input
            required
            name="price"
            defaultValue={product.price}
            type="number"
            step="0.01"
            min="0"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            required
            name="stock"
            defaultValue={product.stock}
            type="number"
            min="0"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>

      <form action={handleDelete}>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Delete Product
        </button>
      </form>
    </div>
  );
}
