import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Delivery, DeliveryStatus } from "../../../domain/entities/delivery.entity";
import { TransactionModel } from "./transaction.model";

@Entity("deliveries")
export class DeliveryModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  trackingNumber?: string;

  @CreateDateColumn()
  createdAt?: Date;

  // Relations

  @OneToOne(() => TransactionModel, { cascade: true, eager: true })
  @JoinColumn({ name: "transactionId" })
  transaction: TransactionModel;

  static toDomain(model: DeliveryModel): Delivery {
    return new Delivery(
      {
        id: model.id,
        transactionId: model.transaction.id,
        status: model.status as DeliveryStatus,
        trackingNumber: model.trackingNumber,
        createdAt: model.createdAt,
      },
    );
  }

  static fromDomain(domain: Delivery): DeliveryModel {
    const model = new DeliveryModel();
    model.id = domain.id;

    const transaction = new TransactionModel();
    transaction.id = domain.transactionId;
    model.transaction = transaction;

    model.status = domain.status;
    model.trackingNumber = domain.trackingNumber;
    model.createdAt = domain.createdAt;

    return model;
  }
}
