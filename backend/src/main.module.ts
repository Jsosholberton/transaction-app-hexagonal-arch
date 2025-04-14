import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./infrastructure/database/db.module";
import { ProductsModule } from "./interface/rest/modules/product.module";
import { TransactionModule } from "./interface/rest/modules/transaction.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    ProductsModule,
    TransactionModule
  ],
})
export class AppModule {
}