import { Handler } from "aws-lambda";
import { createApp } from "./lambda/bootstrap";

export const handler: Handler = async (event, context) => {
  const app = await createApp();
  return app(event, context);
};

export { handler as prepareHandler } from "./prepare";