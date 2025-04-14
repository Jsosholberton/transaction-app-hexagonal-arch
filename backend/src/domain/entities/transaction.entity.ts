export type TransactionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface TransactionProps {
  id: string;
  productId: string;
  customerId: string;
  quantity: number;
  totalAmount: number;
  status: TransactionStatus;
  wompiTransactionId?: string;
  createdAt?: Date;
}

export class Transaction {
  public readonly id: string;
  public readonly productId: string;
  public readonly customerId: string;
  public quantity: number;
  public totalAmount: number;
  public status: TransactionStatus;
  public wompiTransactionId?: string;
  public readonly createdAt?: Date;

  constructor(props: TransactionProps) {
    this.id = props.id;
    this.productId = props.productId;
    this.customerId = props.customerId;
    this.quantity = props.quantity;
    this.totalAmount = props.totalAmount;
    this.status = props.status;
    this.wompiTransactionId = props.wompiTransactionId;
    this.createdAt = props.createdAt ?? new Date();
  }
}
