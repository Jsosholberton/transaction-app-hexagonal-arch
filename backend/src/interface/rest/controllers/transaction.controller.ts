import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";

// Use cases
import {
  CreateTransactionUseCase,
} from "../../../application/use-cases/create-transaction/create-transaction.use-case";
import {
  UpdateTransactionUseCase,
} from "../../../application/use-cases/update-transaction/update-transaction.use-case";

// DTOs
import { CreateTransactionDto } from "../../../application/use-cases/create-transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../../../application/use-cases/update-transaction/update-transaction.dto";
import {
  GetTransactionsByEmailUseCase,
} from "../../../application/use-cases/get-transactions-by-email/get-transactions-by-email.case-use";
import { Transaction } from "../../../domain/entities/transaction.entity";
import {
  GetTransactionsByEmailDto,
} from "../../../application/use-cases/get-transactions-by-email/get-transaction-by-email.dto";

@Controller("transactions")
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly getTransactionsByEmailUseCase: GetTransactionsByEmailUseCase,
  ) {
  }

  @Post()
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  async create(@Body() dto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(dto);
  }

  @Patch(":id/status")
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  async updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return await this.updateTransactionUseCase.execute(id, dto.status, dto.wompiTransactionId);
  }

  @Get("by-email")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getTransactionsByEmail(@Query() query: GetTransactionsByEmailDto): Promise<Transaction[]> {
    return this.getTransactionsByEmailUseCase.execute(query.email);
  }
}