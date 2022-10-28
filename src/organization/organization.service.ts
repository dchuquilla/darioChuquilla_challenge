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
    private readonly repository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.repository.create(createOrganizationDto);
    return this.repository.save(organization);
  }

  findAll(): Promise<Organization[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Organization> {
    return this.repository.findOne({ where: {id: id} });
  }

  async update(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.repository.preload({id: id, ...updateOrganizationDto});
    if(!organization) {
      throw new NotFoundException(`Organization ${id} not found`);
    }
    return this.repository.save(organization);
  }

  async remove(id: number) {
    const organization: Organization = await this.findOne(id);
    return this.repository.remove(organization);
  }
}
