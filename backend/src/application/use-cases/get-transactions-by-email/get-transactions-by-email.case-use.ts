import { Inject, Injectable } from "@nestjs/common";
import { TransactionRepository } from "../../ports/transaction.repository";
import { Transaction } from "../../../domain/entities/transaction.entity";

@Injectable()
export class GetTransactionsByEmailUseCase {
  constructor(
    @Inject("TransactionRepository")
    private readonly transactionRepository: TransactionRepository,
  ) {
  }

  async execute(email: string): Promise<Transaction[]> {
    return await this.transactionRepository.findByEmail(email);
  }
}