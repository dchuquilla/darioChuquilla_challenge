import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

enum OrganizationStatuses {
  VERIFICADO = 604,
  EN_ESPERA = 605,
  APROBADO = 606
}

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Pichincha' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: OrganizationStatuses,
    example: OrganizationStatuses.APROBADO,
  })
  @IsInt()
  @IsIn([604, 605, 606])
  @IsNotEmpty()
  status: number;
}
