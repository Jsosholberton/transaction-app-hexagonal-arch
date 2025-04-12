import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/interface/rest/hello-world.module';

@Module({
  imports: [HelloWorldModule],
})
export class AppModule {}