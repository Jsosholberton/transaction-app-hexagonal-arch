import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProductByIdAsync } from "../../redux/slices/productSlice";
import { createTransaction } from "../../api/api.ts";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedProduct: product, loading } = useAppSelector((state) => state.products);

  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [quantity, setQuantity] = useState(1);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!product || !customer.name || !customer.phone || !customer.address || !customer.email) {
      alert("Please fill in all fields.");
      return;
    }

    const totalAmount = product.price * quantity;

    try {
      const res = await createTransaction(product.id, customer, quantity, totalAmount);

      console.log({ res });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [id, dispatch]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="p-4 max-w-md mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">{product.name}</h1>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-52 object-cover rounded mb-4"
        />
      )}
      <p className="text-zinc-400 mb-2">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <p className="text-sm text-zinc-300 mb-4">Stock: {product.stock}</p>
      <button
        onClick={handleOpen}
        className="w-full bg-blue-600 text-white py-2 rounded">Buy Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold">Formulario de Compra</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone</label>
                <input
                  type="text"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Submit Order
              </button>
            </form>
            <button
              className="mt-4 text-red-500"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
