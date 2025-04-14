// src/components/pages/ProductsListPage.tsx

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.tsx";
import { fetchProductsAsync } from "../../redux/slices/productSlice.tsx";

export default function ProductsListPage() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Available Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="h-full flex flex-col">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-zinc-200 line-clamp-3">{product.description}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
