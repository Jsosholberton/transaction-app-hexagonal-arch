import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductModel } from "../../../infrastructure/database/models/product.model";
import { ProductRepositoryAdapter } from "../../../infrastructure/database/adapters/product.repository.adapter";

import { GetAllProductsUseCase } from "../../../application/use-cases/get-all-products/get-all-products.use-case";
import { ProductController } from "../controllers/product.controller";
import { GetProductByIdUseCase } from "../../../application/use-cases/get-all-products/get-product.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [
    GetAllProductsUseCase,
    GetProductByIdUseCase,
    {
      provide: "ProductRepository",
      useClass: ProductRepositoryAdapter,
    },
  ],
})
export class ProductsModule {
}
