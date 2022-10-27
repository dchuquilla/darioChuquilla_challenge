import { Column, Entity, PrimaryGeneratedColumn, EntityMetadata } from "typeorm";

@Entity('organizaciones')
export class OrganizacionEntity {

  @PrimaryGeneratedColumn()
  readonly idOrganizacion: number;

  @Column({unique: true})
  readonly name: string;

  @Column()
  readonly status: number;

  constructor(idOrganizacion: number, name: string, status: number) {
    this.idOrganizacion = idOrganizacion;
    this.name = name;
    this.status = status;
    console.log(`Creo Organizacion Entity para ${this.name}`)
  }
}
