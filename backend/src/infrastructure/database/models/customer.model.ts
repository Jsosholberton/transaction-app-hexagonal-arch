import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Customer } from "../../../domain/entities/customer.entity";

@Entity("customer")
export class CustomerModel {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date | undefined;

  static toDomain(model: CustomerModel): Customer {
    return new Customer({
      id: model.id,
      name: model.name,
      email: model.email,
      phone: model.phone,
      address: model.address,
      createdAt: model.createdAt,
    });
  }

  static fromDomain(domain: Customer): CustomerModel {
    const model = new CustomerModel();
    model.id = domain.id;
    model.name = domain.name;
    model.email = domain.email;
    model.phone = domain.phone;
    model.address = domain.address;
    model.createdAt = domain.createdAt;
    return model;
  }

}