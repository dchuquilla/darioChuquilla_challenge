import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockServiceController } from './mock-service/mock-service.controller';
import { MockServiceService } from './mock-service/mock-service.service';

@Module({
  imports: [],
  controllers: [AppController, MockServiceController],
  providers: [AppService, MockServiceService],
})
export class AppModule {}
