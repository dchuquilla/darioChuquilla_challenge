import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { OrganizacionDTO } from "./dto/organizacion.dto";
import { OrganizacionEntity } from "./entities/organizaciones.entity";
import { OrganizacionMapper } from "./organizaciones.mapper";

@Injectable()
export class OrganizacionesRepository {
  constructor(
    @InjectRepository(OrganizacionEntity)
    private organizacionesRepository: Repository<OrganizacionEntity>,
    private mapper: OrganizacionMapper){}

  getAllOrganizaciones(): Promise<OrganizacionEntity[]> {
    return this.organizacionesRepository.find();
  }

  getOrganizacionById(idOrganizacion): Promise<OrganizacionEntity> {
    return this.organizacionesRepository.findOne(idOrganizacion);
  }

  newOrganizacion(organizacionDTO: OrganizacionDTO): Promise<OrganizacionEntity> {
    const newOrganizacion = this.mapper.dtoToEntity(organizacionDTO);
    return this.organizacionesRepository.save(newOrganizacion);
  }

  async updateOrganizacion(idOrganizacion, organizacionDTO: OrganizacionDTO): Promise<OrganizacionEntity> {
    organizacionDTO.idOrganizacion = idOrganizacion;
    const updateOrganizacion = this.mapper.dtoToEntity(organizacionDTO);
    await this.organizacionesRepository.update(idOrganizacion, updateOrganizacion);
    return this.organizacionesRepository.findOne(idOrganizacion);
  }

  deleteOrganizacion(idOrganizacion): Promise<DeleteResult> {
    return this.organizacionesRepository.delete(idOrganizacion);
  }
}
