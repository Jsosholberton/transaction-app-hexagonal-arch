import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../ports/product.repository";
import { Product } from "../../../domain/entities/product.entity";

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository) {
  }

  async execute(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}