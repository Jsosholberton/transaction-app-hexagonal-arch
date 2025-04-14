import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TransactionRepository } from "../../ports/transaction.repository";
import { CreateTransactionDto } from "./create-transaction.dto";
import { Transaction } from "../../../domain/entities/transaction.entity";
import { v4 as uuidv4 } from "uuid";
import { ProductRepository } from "../../ports/product.repository";
import { CustomerRepository } from "../../ports/customer.repository";

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject("TransactionRepository")
    private readonly transactionRepository: TransactionRepository,
    @Inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @Inject("CustomerRepository")
    private readonly customerRepository: CustomerRepository,
  ) {
  }

  async execute(dto: CreateTransactionDto): Promise<Transaction> {

    const product = await this.productRepository.findById(dto.productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${dto.productId} not found`);
    }

    if (product.stock < 1 || product.stock < dto.quantity) {
      throw new BadRequestException(`Product out of stock is ${product.stock} units available`);
    }

    let customer = await this.customerRepository.findByEmail(dto.customer.email);

    if (!customer) {
      customer = await this.customerRepository.create({
        id: uuidv4(),
        name: dto.customer.name,
        email: dto.customer.email,
        address: dto.customer.address,
        phone: dto.customer.phone,
      });
    }

    const transaction = new Transaction({
      id: uuidv4(),
      productId: product.id,
      customerId: customer.id,
      totalAmount: dto.totalAmount,
      status: dto.status,
      wompiTransactionId: dto.wompiTransactionId,
      quantity: dto.quantity,
    });

    return await this.transactionRepository.create(transaction);
  }
}
