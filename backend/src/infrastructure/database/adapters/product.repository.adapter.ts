import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProductRepository } from "../../../application/ports/product.repository";
import { Product } from "../../../domain/entities/product.entity";
import { ProductModel } from "../models/product.model";

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepo: Repository<ProductModel>,
  ) {
  }

  async findAll(): Promise<Product[]> {
    const models = await this.productRepo.find();
    return models.map(ProductModel.toDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const model = await this.productRepo.findOneBy({ id });
    return model ? ProductModel.toDomain(model) : null;
  }

  async save(product: Product): Promise<Product> {
    const model = this.productRepo.create(ProductModel.fromDomain(product));
    const saved = await this.productRepo.save(model);
    return ProductModel.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.productRepo.delete(id);
  }
}
