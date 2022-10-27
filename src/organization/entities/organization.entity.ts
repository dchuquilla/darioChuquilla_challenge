import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_organization' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string

  @Column({ name: 'status', type: 'int' })
  status: number
}
