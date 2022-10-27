import { ApiProperty } from "@nestjs/swagger";

export class OrganizacionDTO {
  @ApiProperty()
  idOrganizacion?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: number;

  constructor( idOrganizacion: number, name: string, status: number ) {
    this.idOrganizacion = idOrganizacion;
    this.name = name;
    this.status = status;
  }
}
