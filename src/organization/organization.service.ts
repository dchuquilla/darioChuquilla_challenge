import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly respository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.respository.create(createOrganizationDto);
    return this.respository.save(organization);
  }

  findAll(): Promise<Organization[]> {
    return this.respository.find();
  }

  findOne(id: number): Promise<Organization> {
    return this.respository.findOne({ where: {id: id} });
  }

  async update(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.respository.preload({id: id, ...updateOrganizationDto});
    if(!organization) {
      throw new NotFoundException(`Organization ${id} not found`);
    }
    return this.respository.save(organization);
  }

  async remove(id: number) {
    const organization: Organization = await this.findOne(id);
    return this.respository.remove(organization);
  }
}
