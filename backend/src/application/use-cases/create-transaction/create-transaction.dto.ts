import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  Min,
  IsIn,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateCustomerDto } from "../create-customer/create-customer.dto";
import { TransactionStatus } from "../../../domain/entities/transaction.entity";

export class CreateTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsIn(["PENDING", "APPROVED", "REJECTED"])
  status: TransactionStatus = "PENDING";

  wompiTransactionId?: string;
}
