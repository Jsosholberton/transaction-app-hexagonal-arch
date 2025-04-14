import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "./config/database.config";

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () => databaseConfig(),
  })],
})

export class DbModule {}