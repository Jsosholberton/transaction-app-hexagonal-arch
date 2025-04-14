// src/domain/entities/delivery.entity.ts

export type DeliveryStatus = "PENDING" | "IN_PROGRESS" | "DELIVERED";

export interface DeliveryProps {
  id: string;
  transactionId: string;
  status: DeliveryStatus;
  trackingNumber?: string;
  createdAt?: Date;
}

export class Delivery {
  public readonly id: string;
  public readonly transactionId: string;
  public status: DeliveryStatus;
  public trackingNumber?: string;
  public readonly createdAt?: Date;

  constructor(props: DeliveryProps) {
    this.id = props.id;
    this.transactionId = props.transactionId;
    this.status = props.status;
    this.trackingNumber = props.trackingNumber;
    this.createdAt = props.createdAt ?? new Date();
  }
}
