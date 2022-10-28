import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { Tribe } from './entities/tribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from './entities/repository.entity';
import { Metrics } from './entities/metrics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tribe]),
    TypeOrmModule.forFeature([Repository]),
    TypeOrmModule.forFeature([Metrics]),
  ],
  controllers: [TribeController],
  providers: [TribeService],
})
export class TribeModule {}
