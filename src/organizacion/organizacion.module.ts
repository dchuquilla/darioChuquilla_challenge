import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizacionEntity } from './entities/organizaciones.entity';
import { OrganizacionController } from './organizacion.controller';
import { OrganizacionMapper } from './organizaciones.mapper';
import { OrganizacionesRepository } from './organizaciones.repository';
import { OrganizacionesService } from './organizaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizacionEntity])],
  controllers: [OrganizacionController],
  providers: [OrganizacionesService, OrganizacionMapper, OrganizacionesRepository]
})
export class OrganizacionModule {}
