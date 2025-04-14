import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TransactionRepository } from "../../../application/ports/transaction.repository";
import { Transaction } from "../../../domain/entities/transaction.entity";
import { TransactionModel } from "../models/transaction.model";

@Injectable()
export class TransactionRepositoryAdapter implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionModel)
    private readonly transactionRepo: Repository<TransactionModel>,
  ) {
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const model = this.transactionRepo.create(TransactionModel.fromDomain(transaction));
    const saved = await this.transactionRepo.save(model);
    return TransactionModel.toDomain(saved);
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const model = this.transactionRepo.create(TransactionModel.fromDomain(transaction));
    const updated = await this.transactionRepo.save(model);
    return TransactionModel.toDomain(updated);
  }

  async findById(id: string): Promise<Transaction | null> {
    const model = await this.transactionRepo.findOneBy({ id });
    return model ? TransactionModel.toDomain(model) : null;
  }

  async delete(id: string): Promise<void> {
    await this.transactionRepo.delete(id);
  }

  async findAll(): Promise<Transaction[]> {
    const models = await this.transactionRepo.find();
    return models.map(TransactionModel.toDomain);
  }

  async findByEmail(email: string): Promise<Transaction[]> {
    const models = await this.transactionRepo.find({
      where: {
        customer: {
          email,
        },
      },
    });
    return models.map(TransactionModel.toDomain);
  }
}
