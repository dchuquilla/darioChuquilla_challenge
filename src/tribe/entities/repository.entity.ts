import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Metrics } from "./metrics.entity";
import { Tribe } from "./tribe.entity";

@Entity()
export class Repository extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_repository' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'state', type: 'char', length: 1, nullable: false })
  state: string;

  @CreateDateColumn({ name: 'create_time',type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createTime: Date;

  @Column({ name: 'status', type: 'char', length: 1, nullable: false })
  status: string;

  @ManyToOne(() => Tribe, tribe => tribe.repositories, {onDelete: 'SET NULL'})
  tribe: Tribe;

  @OneToOne(() => Metrics, metrics => metrics.repository)
  metrics: Metrics;
}
