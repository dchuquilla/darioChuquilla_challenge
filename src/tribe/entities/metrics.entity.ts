import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Repository } from "./repository.entity";

@Entity()
export class Metrics extends BaseEntity{
  @Column({ name: 'coverage', type: 'float', nullable: false})
  coverage: number;

  @Column({ name: 'bugs', type: 'int', nullable: false })
  bugs: number;

  @Column({ name: 'vulnerabilities', type: 'int', nullable: false })
  vulnerabilities: number;

  @Column({ name: 'hotspot', type: 'int', nullable: false })
  hotspot: number;

  @Column({ name: 'code_smells', type: 'int', nullable: false })
  code_smells: number;

  @PrimaryColumn({ name: 'id_repository' })
  idRepository: number
  @OneToOne(() => Repository, (repository) => repository.metrics, {onDelete: 'CASCADE'})
  @JoinColumn()
  repository: Repository;
}
