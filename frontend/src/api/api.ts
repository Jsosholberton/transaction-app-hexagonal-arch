const API_URL = "https://odlsk16ff8.execute-api.us-west-2.amazonaws.com/dev";

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}

export async function fetchProduct(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return await response.json();
}

export async function createTransaction(
  productId: string,
  customer: { name: string; phone: string; address: string; email: string },
  quantity: number,
  totalAmount: number,
) {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      customer,
      quantity,
      totalAmount,
    }),
  });

  if (!response.ok) throw new Error("Failed to create transaction");
  return await response.json();
}
