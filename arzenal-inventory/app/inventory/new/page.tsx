import { addProduct } from "@/app/lib/data";
import { redirect } from "next/navigation";

export default function NewProductPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);

    if (!name || isNaN(price) || isNaN(stock)) {
      throw new Error("Invalid form inputs.");
    }

    await addProduct({ name, category, price, stock });
    redirect("/inventory");
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <form
        action={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow border"
      >
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            required
            name="name"
            type="text"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            required
            name="category"
            type="text"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price ($)</label>
          <input
            required
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Adding Amount</label>
          <input
            required
            name="stock"
            type="number"
            min="0"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
