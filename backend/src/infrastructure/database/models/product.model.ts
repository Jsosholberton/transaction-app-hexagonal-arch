import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../../domain/entities/product.entity";

@Entity("products")
export class ProductModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("decimal")
  price: number;

  @Column("int")
  stock: number;

  @Column({ nullable: true })
  imageUrl?: string;

  static toDomain(model: ProductModel): Product {
    return new Product(model.id, model.name, model.description, model.price, model.stock, model.imageUrl);
  }

  static fromDomain(domain: Product): ProductModel {
    const model = new ProductModel();
    model.id = domain.id;
    model.name = domain.name;
    model.description = domain.description;
    model.price = domain.price;
    model.stock = domain.stock;
    model.imageUrl = domain.imageUrl;
    return model;
  }
}
