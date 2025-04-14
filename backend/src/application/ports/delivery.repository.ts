import { Delivery } from "../../domain/entities/delivery.entity";

export interface DeliveryRepository {
  create(delivery: Delivery): Promise<Delivery>;

  findByTransactionId(transactionId: string): Promise<Delivery | null>;
}