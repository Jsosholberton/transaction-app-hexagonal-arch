import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { GetAllProductsUseCase } from "../../../application/use-cases/get-all-products/get-all-products.use-case";
import { Product } from "../../../domain/entities/product.entity";
import { GetProductByIdUseCase } from "../../../application/use-cases/get-all-products/get-product.use-case";

@Controller("products")
export class ProductController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.getAllProductsUseCase.execute();
  }

  @Get(":id")
  async getProductById(@Param("id") id: string): Promise<Product> {
    const product = await this.getProductByIdUseCase.execute(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }
}