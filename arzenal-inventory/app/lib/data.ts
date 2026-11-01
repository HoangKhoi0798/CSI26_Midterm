export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type SaleItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Sale = {
  id: string;
  items: SaleItem[];
  total: number;
  date: string;
};

let products: Product[] = [
  {
    id: "1",
    name: "Paramail",
    category: "Personnel Trooper",
    price: 1000000,
    stock: 100,
  },
  {
    id: "2",
    name: "Booster Module",
    category: "Parts",
    price: 25000,
    stock: 33,
  },
  {
    id: "3",
    name: "Secondary Cockpit",
    category: "Frames",
    price: 350000,
    stock: 50,
  },
];

let sales: Sale[] = [];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function addProduct(data: Omit<Product, "id">) {
  if (data.stock < 0 || data.price < 0) {
    throw new Error("Cannot be negative.");
  }
  const newProduct: Product = {
    id: Date.now().toString(),
    ...data,
  };
  products.push(newProduct);
}

export async function updateProduct(id: string, data: Omit<Product, "id">) {
  if (data.stock < 0 || data.price < 0) {
    throw new Error("These cannot be negative.");
  }
  products = products.map((p) => (p.id === id ? { id, ...data } : p));
}

export async function deleteProduct(id: string) {
  products = products.filter((p) => p.id !== id);
}

export async function getSales(): Promise<Sale[]> {
  return sales;
}

export async function processSale(
  cart: { productId: string; quantity: number }[],
) {
  const saleItems: SaleItem[] = [];
  let total = 0;

  for (const item of cart) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`Product not found`);
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    product.stock -= item.quantity;
    saleItems.push({
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
    });
    total += product.price * item.quantity;
  }

  const newSale: Sale = {
    id: Date.now().toString(),
    items: saleItems,
    total,
    date: new Date().toISOString(),
  };
  sales.push(newSale);
  return newSale;
}
