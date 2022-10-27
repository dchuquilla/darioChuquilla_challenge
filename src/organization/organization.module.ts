import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
