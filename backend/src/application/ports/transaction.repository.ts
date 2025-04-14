import { Transaction } from "../../domain/entities/transaction.entity";

export interface TransactionRepository {
  findAll(): Promise<Transaction[]>;

  findById(id: string): Promise<Transaction | null>;

  create(transaction: Transaction): Promise<Transaction>;

  update(transaction: Transaction): Promise<Transaction>;

  delete(id: string): Promise<void>;

  findByEmail(email: string): Promise<Transaction[]>;
}