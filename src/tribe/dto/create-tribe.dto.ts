import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTribeDto {
  @ApiProperty({ example: 'Centro Digital' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  status: number;
}
