// src/domain/entities/customer.entity.ts

export interface CustomerProps {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt?: Date;
}

export class Customer {
  public readonly id: string;
  public name: string;
  public email: string;
  public address: string;
  public phone: string;
  public readonly createdAt?: Date;

  constructor(props: CustomerProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.address = props.address;
    this.phone = props.phone;
    this.createdAt = props.createdAt ?? new Date();
  }
}
