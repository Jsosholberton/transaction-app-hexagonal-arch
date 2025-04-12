import { Module } from "@nestjs/common";
import { HelloWorldController } from "./hello-world.controller";
import { HelloWorldService } from "../../application/hello-world.service";

@Module({
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class HelloWorldModule {
}