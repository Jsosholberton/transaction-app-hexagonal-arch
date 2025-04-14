import { registerAs } from "@nestjs/config";
import { SecretsManager } from "aws-sdk";
import { ProductModel } from "../models/product.model";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import InitSeeder from "../seeds/init.seeder";
import { TransactionModel } from "../models/transaction.model";
import { CustomerModel } from "../models/customer.model";
import { DeliveryModel } from "../models/delivery.model";
import path = require("path");

export default registerAs("database", async (): Promise<DataSourceOptions & SeederOptions> => {
    const secretsManager = new SecretsManager();

    console.log("Connecting to database...");

    try {
      console.log("Checking for password in environment variables...");
      let password: string | undefined = process.env.POSTGRES_PASSWORD;

      if (!password) {

        console.log("Password not found in environment variables, retrieving from AWS Secrets Manager...");
        const secretArn: string = process.env.RDS_SECRET_ARN || "";


        if (!secretArn) {
          console.error("RDS_SECRET_ARN is not defined in environment variables");
          throw new Error("RDS_SECRET_ARN is not defined in environment variables");
        }

        console.log(secretArn.length);

        console.log("Getting secret value from AWS Secrets Manager...");
        const secretData = await secretsManager.getSecretValue({ SecretId: secretArn }).promise();
        console.log("Secret value retrieved from AWS Secrets Manager");

        if (secretData.SecretString) {
          password = secretData.SecretString.trim();
          console.log(password?.length);
        } else {
          throw new Error("Failed to retrieve database password from AWS Secrets Manager");
        }
      }

      return {
        type: "postgres",
        host: process.env.POSTGRES_HOST!.split(":")[0],
        port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD || password,
        database: process.env.POSTGRES_DATABASE,

        entities: [ProductModel, TransactionModel, CustomerModel, DeliveryModel],
        migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],

        synchronize: false,

        logging: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },

        seeds: [InitSeeder],
      };

    } catch (error) {
      console.error("Error retrieving database configuration:", error);
      throw new Error("Failed to retrieve database configuration");
    }
  },
);
