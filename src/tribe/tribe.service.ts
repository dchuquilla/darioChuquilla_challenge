import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { UpdateTribeDto } from './dto/update-tribe.dto';
import { Tribe } from './entities/tribe.entity';
import { Repository as Repo } from './entities/repository.entity';
import { Metrics } from './entities/metrics.entity';

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe) private readonly tribeRepository: Repository<Tribe>,
    @InjectRepository(Repo) private readonly repoRepository: Repository<Repo>,
    @InjectRepository(Metrics) private readonly metricsRepository: Repository<Metrics>,
  ) {}

  create(createTribeDto: CreateTribeDto) {
    return 'This action adds a new tribe';
  }

  findAll(): Promise<Tribe[]> {
    return this.tribeRepository.find();
  }

  findOne(id: number): Promise<Tribe> {
    return this.tribeRepository.findOne({ where: {id: id} })
  }

  findRepositoriesByTribeId(id: number): Promise<Object[]> {
    return this.repoRepository
      .createQueryBuilder()
      .select('repository, tribe')
      .from(Repo, 'repository')
      .innerJoinAndMapOne(
        'repository.tribe',
        'repository.metrics',
        'tribe',
      )
      .where('repository.tribe = :id', { id: id })
      .getMany();
  }

  update(id: number, updateTribeDto: UpdateTribeDto) {
    return `This action updates a #${id} tribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} tribe`;
  }
}
