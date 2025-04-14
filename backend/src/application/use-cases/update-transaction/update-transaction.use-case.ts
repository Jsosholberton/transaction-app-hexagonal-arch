import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TransactionRepository } from "../../ports/transaction.repository";
import { DeliveryRepository } from "../../ports/delivery.repository";
import { Delivery } from "../../../domain/entities/delivery.entity";
import { v4 as uuidv4 } from "uuid";
import { ProductRepository } from "../../ports/product.repository";

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    @Inject("TransactionRepository")
    private readonly transactionRepo: TransactionRepository,
    @Inject("DeliveryRepository")
    private readonly deliveryRepo: DeliveryRepository,
    @Inject("ProductRepository")
    private readonly productRepo: ProductRepository,
  ) {
  }

  async execute(transactionId: string, newStatus: "APPROVED" | "REJECTED", wompiTransactionId?: string): Promise<any> {
    const transaction = await this.transactionRepo.findById(transactionId);

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transactionId} not found`);
    }

    transaction.status = newStatus;
    transaction.wompiTransactionId = wompiTransactionId;

    await this.transactionRepo.update(transaction);

    if (newStatus === "APPROVED") {
      const product = await this.productRepo.findById(transaction.productId);

      if (product) {
        product.stock -= transaction.quantity;

        await this.productRepo.save(product);
      }

      const delivery = new Delivery({
        id: uuidv4(),
        transactionId,
        status: "IN_PROGRESS",
        createdAt: new Date(),
      });

      await this.deliveryRepo.create(delivery);
    }

    return transaction;
  }
}