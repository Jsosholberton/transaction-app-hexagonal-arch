import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTransactionDto {
  @IsIn(["APPROVED", "REJECTED"])
  @IsNotEmpty()
  status: "APPROVED" | "REJECTED";

  @IsOptional()
  @IsString()
  wompiTransactionId?: string;

}
