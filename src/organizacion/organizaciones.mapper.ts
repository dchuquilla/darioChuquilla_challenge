import { Injectable } from "@nestjs/common";
import { OrganizacionDTO } from "./dto/organizacion.dto";
import { OrganizacionEntity } from "./entities/organizaciones.entity";

@Injectable()
export class OrganizacionMapper {
  dtoToEntity(organizacionDTO: OrganizacionDTO): OrganizacionEntity {
    return new OrganizacionEntity(organizacionDTO.idOrganizacion, organizacionDTO.name, organizacionDTO.status);
  }

  entityToDto(organizacionEntity: OrganizacionEntity): OrganizacionDTO {
    return new OrganizacionDTO(organizacionEntity.idOrganizacion, organizacionEntity.name, organizacionEntity.status);
  }
}
