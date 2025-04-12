import { Controller, Get } from "@nestjs/common";
import { HelloWorldService } from "../../application/hello-world.service";

@Controller()
export class HelloWorldController {
  constructor(private readonly helloService: HelloWorldService) {
  }

  @Get("hello-world")
  getHello(): string {
    return this.helloService.sayHello();
  }
}