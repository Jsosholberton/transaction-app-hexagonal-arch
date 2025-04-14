import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CustomerRepository } from "../../../application/ports/customer.repository";
import { CustomerModel } from "../models/customer.model";
import { Customer } from "../../../domain/entities/customer.entity";
import { CreateCustomerDto } from "../../../application/use-cases/create-customer/create-customer.dto";

@Injectable()
export class CustomerRepositoryAdapter implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerModel)
    private readonly customerRepo: Repository<CustomerModel>,
  ) {
  }

  async create(customer: CreateCustomerDto): Promise<Customer> {
    const customerModel = this.customerRepo.create(customer);
    return await this.customerRepo.save(customerModel);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.customerRepo.findOne({ where: { email } });

    if (!customer) {
      return null;
    }
    return CustomerModel.toDomain(customer);
  }
}
