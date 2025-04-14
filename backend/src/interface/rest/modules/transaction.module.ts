import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controllers
import { TransactionController } from "../controllers/transaction.controller";

// Use Cases
import { CreateTransactionUseCase } from "../../../application/use-cases/create-transaction/create-transaction.use-case";
import { UpdateTransactionUseCase } from "../../../application/use-cases/update-transaction/update-transaction.use-case";
import { GetTransactionsByEmailUseCase } from "../../../application/use-cases/get-transactions-by-email/get-transactions-by-email.case-use";

// Models
import { TransactionModel } from "../../../infrastructure/database/models/transaction.model";
import { DeliveryModel } from "../../../infrastructure/database/models/delivery.model";
import { ProductModel } from "../../../infrastructure/database/models/product.model";
import { CustomerModel } from "../../../infrastructure/database/models/customer.model";

// Adapters
import { TransactionRepositoryAdapter } from "../../../infrastructure/database/adapters/transaction.repository.adapter";
import { ProductRepositoryAdapter } from "../../../infrastructure/database/adapters/product.repository.adapter";
import { CustomerRepositoryAdapter } from "../../../infrastructure/database/adapters/customer.repository.adapter";
import { DeliveryRepositoryAdapter } from "../../../infrastructure/database/adapters/delivery.repository.adapter";


@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionModel, ProductModel, CustomerModel, DeliveryModel]),
  ],
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    UpdateTransactionUseCase,
    GetTransactionsByEmailUseCase,
    {
      provide: "TransactionRepository",
      useClass: TransactionRepositoryAdapter,
    },
    {
      provide: "ProductRepository",
      useClass: ProductRepositoryAdapter,
    },
    {
      provide: "CustomerRepository",
      useClass: CustomerRepositoryAdapter,
    },
    {
      provide: "DeliveryRepository",
      useClass: DeliveryRepositoryAdapter,
    },
  ],
  exports: [CreateTransactionUseCase, UpdateTransactionUseCase, GetTransactionsByEmailUseCase],
})
export class TransactionModule {}
