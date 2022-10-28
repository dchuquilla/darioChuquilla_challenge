import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockServiceController } from './mock-service/mock-service.controller';
import { MockServiceService } from './mock-service/mock-service.service';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'cockroachdb',
      url: process.env.DATABASE_URL,
      ssl: true,
      extra: {
        options: '--cluster=dario-chuquilla-db-392',
      },
      autoLoadEntities: true,
      // synchronize: true,
    }),
    OrganizationModule,
  ],
  controllers: [AppController, MockServiceController],
  providers: [AppService, MockServiceService],
})
export class AppModule {}
