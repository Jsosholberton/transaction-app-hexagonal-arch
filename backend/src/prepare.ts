import { APIGatewayProxyHandler } from "aws-lambda";

import databaseConfig from "./infrastructure/database/config/database.config";

import { DataSource, DataSourceOptions } from "typeorm";

import InitSeeder from "./infrastructure/database/seeds/init.seeder";

let connection: DataSource | undefined;

const getConnection = async (config: DataSourceOptions) => {

  if (!connection || !connection.isInitialized) {
    try {
      connection = new DataSource(config);
      await connection.initialize();
      console.log("Database connection established successfully.");
    } catch (error) {
      console.error(error, "Error during database connection");
      throw new Error("Could not connect to the database");
    }
  }
  return connection;
};

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const config = await databaseConfig();

    const connection = await getConnection(config);

    console.log("Running migrations");
    await connection.runMigrations();
    console.log("Migrations run successfully");

    console.log("Running seeders");
    const initSeeder = new InitSeeder();
    await initSeeder.run(connection);
    console.log("Seeders run successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Migrations run successfully" }),
    };
  } catch (error) {
    console.log(error, "Error running migrations");
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to run migrations",
        error: (error as Error).message,
      }),
    };
  }
};