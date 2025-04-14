import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { SeederOptions } from "typeorm-extension";
import InitSeeder from "../seeds/init.seeder";
import { CustomerModel } from "../models/customer.model";
import { ProductModel } from "../models/product.model";
import { TransactionModel } from "../models/transaction.model";
import { DeliveryModel } from "../models/delivery.model";

config();

const options: DataSourceOptions & SeederOptions = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: false,
  logging: false,
  dropSchema: false,
  type: "postgres",
  maxQueryExecutionTime: 1000,
  entities: [
    ProductModel,
    TransactionModel,
    CustomerModel,
    DeliveryModel,
  ],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  extra: {
    connectionLimit: 10,
  },

  ssl: false,

  seeds: [InitSeeder],

  seedTracking: false,
};

const source = new DataSource(options);

void source.initialize();

export default source;