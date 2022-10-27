import { Injectable } from "@nestjs/common";
import { OrganizacionDTO } from "./dto/organizacion.dto";
import { OrganizacionEntity } from "./entities/organizaciones.entity";
import { OrganizacionMapper } from "./organizaciones.mapper";
import { OrganizacionesRepository } from "./organizaciones.repository";

@Injectable()
export class OrganizacionesService {
  constructor(
    private organizacionesRepository: OrganizacionesRepository,
    private mapper: OrganizacionMapper
  ){}

  async getAllOrganizaciones(): Promise<OrganizacionDTO[]> {
    const organizaciones: OrganizacionEntity[] = await this.organizacionesRepository.getAllOrganizaciones();
    return organizaciones.map(organizacion => this.mapper.entityToDto(organizacion));
  }

  async getOrganizacionById(idOrganizacion): Promise<OrganizacionDTO> {
    const organizacion: OrganizacionEntity = await this.organizacionesRepository.getOrganizacionById(idOrganizacion);
    return this.mapper.entityToDto(organizacion);
  }

  async newOrganizacion(organizacionDTO: OrganizacionDTO): Promise<OrganizacionDTO> {
    console.log(organizacionDTO);
    const newOrganizacion: OrganizacionEntity = await this.organizacionesRepository.newOrganizacion(organizacionDTO);
    return this.mapper.entityToDto(newOrganizacion);
  }

  async updateOrganizacion(idOrganizacion, organizacionDTO: OrganizacionDTO): Promise<OrganizacionDTO> {
    const updateOrganizacion: OrganizacionEntity = await this.organizacionesRepository.updateOrganizacion(idOrganizacion, organizacionDTO);
    return this.mapper.entityToDto(updateOrganizacion);
  }

  async deleteOrganizacion(idOrganizacion): Promise<void> {
    await this.organizacionesRepository.deleteOrganizacion(idOrganizacion);
  }
}
