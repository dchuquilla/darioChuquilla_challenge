import { Tribe } from "../../tribe/entities/tribe.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_organization' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'status', type: 'int', nullable: false })
  status: number;

  @OneToMany(() => Tribe, tribe => tribe.organization)
  tribes: Tribe[];
}
