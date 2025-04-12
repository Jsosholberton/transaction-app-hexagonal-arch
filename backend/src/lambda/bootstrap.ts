import { NestFactory } from "@nestjs/core";
import { AppModule } from "../main.module";
import { configure as serverlessExpress } from "@vendia/serverless-express";

let cachedApp: any;

export async function createApp() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedApp = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
  }

  return cachedApp;
}