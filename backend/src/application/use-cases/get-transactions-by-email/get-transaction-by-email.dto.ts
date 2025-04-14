import { IsEmail, IsNotEmpty } from "class-validator";

export class GetTransactionsByEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}