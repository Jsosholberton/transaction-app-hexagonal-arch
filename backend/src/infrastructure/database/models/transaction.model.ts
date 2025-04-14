import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction, TransactionStatus } from "../../../domain/entities/transaction.entity";
import { CustomerModel } from "./customer.model";
import { ProductModel } from "./product.model";

@Entity("transactions")
export class TransactionModel {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  totalAmount: number;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @Column({ type: "varchar", nullable: true })
  wompiTransactionId: string | null;

  @CreateDateColumn()
  createdAt: Date | undefined;

  // Relations
  @ManyToOne(() => ProductModel, { cascade: true, eager: true })
  @JoinColumn({ name: "productId" })
  product: ProductModel;

  @ManyToOne(() => CustomerModel, { cascade: true, eager: true })
  @JoinColumn({ name: "customerId" })
  customer: CustomerModel;

  static toDomain(model: TransactionModel): Transaction {
    return new Transaction(
      {
        id: model.id,
        productId: model.product.id,
        customerId: model.customer.id,
        totalAmount: model.totalAmount,
        status: model.status as TransactionStatus,
        wompiTransactionId: model.wompiTransactionId ?? undefined,
        createdAt: model.createdAt,
        quantity: model.quantity,
      },
    );
  }

  static fromDomain(domain: Transaction): TransactionModel {
    const model = new TransactionModel();
    model.id = domain.id;

    const product = new ProductModel();
    product.id = domain.productId;
    model.product = product;

    const customer = new CustomerModel();
    customer.id = domain.customerId;
    model.customer = customer;

    model.totalAmount = domain.totalAmount;
    model.status = domain.status as TransactionStatus;
    model.wompiTransactionId = domain.wompiTransactionId ?? null;
    model.createdAt = domain.createdAt;
    model.quantity = domain.quantity;

    return model;
  }

}