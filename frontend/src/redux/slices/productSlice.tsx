import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, fetchProduct } from "../../api/api";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const data = await fetchProducts();
    return data;
  },
);


export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchById",
  async (id: string) => {
    const data = await fetchProduct(id);
    return data;
  },
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.loading = true;
        state.selectedProduct = null;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductByIdAsync.rejected, (state) => {
        state.loading = false;
        state.selectedProduct = null;
      });
  },
});
export default productSlice.reducer;
