import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { OrganizacionDTO } from './dto/organizacion.dto';
import { OrganizacionesService } from './organizaciones.service';

@Controller('organizacion')
export class OrganizacionController {
  constructor(private organicacionesService: OrganizacionesService){}

  @Get()
  async getAllOrganizaciones(): Promise<OrganizacionDTO[]> {
    return await this.organicacionesService.getAllOrganizaciones();
  }

  @Get(':id')
  async getOrganizacionById(@Param('id') id): Promise<OrganizacionDTO> {
    console.log(id);
    return await this.organicacionesService.getOrganizacionById(id);
  }

  @Post()
  async newOrganizacion(@Body() organizacion: OrganizacionDTO, @Req() req): Promise<OrganizacionDTO>{
    console.log(req.headers);
    return await this.organicacionesService.newOrganizacion(organizacion);
  }

  @Put(':id')
  async updateOrganizacion(@Param('id') id, @Body() organizacion: OrganizacionDTO): Promise<OrganizacionDTO>{
    return await this.organicacionesService.updateOrganizacion(id, organizacion);
  }

  @Delete(':id')
  async deleteOrganizacion(@Param('id') id): Promise<void>{
    return await this.organicacionesService.deleteOrganizacion(id);
  }
}
