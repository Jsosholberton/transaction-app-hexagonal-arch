import { Product } from "../../domain/entities/product.entity";

export interface ProductRepository {
  findAll(): Promise<Product[]>;

  findById(id: string): Promise<Product | null>;

  save(product: Product): Promise<Product>;

  delete(id: string): Promise<void>;
}