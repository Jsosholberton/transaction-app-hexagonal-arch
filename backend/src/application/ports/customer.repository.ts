import { Customer } from "../../domain/entities/customer.entity";

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;

  findByEmail(email: string): Promise<Customer | null>;
}