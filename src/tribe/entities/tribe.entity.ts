import { Organization } from "../../organization/entities/organization.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Repository } from "./repository.entity";

@Entity()
export class Tribe extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_tribe' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'status', type: 'int', nullable: false })
  status: number;

  @ManyToOne(() => Organization, organization => organization.tribes, {onDelete: 'SET NULL'})
  organization: Organization;

  @OneToMany(() => Repository, repository => repository.tribe)
  repositories: Repository[];
}
