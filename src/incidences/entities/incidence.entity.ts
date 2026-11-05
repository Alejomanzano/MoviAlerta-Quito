
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Route } from '../../routes/entities/route.entity.js';
import { Stop } from '../../stops/entities/stop.entity.js';

@Entity('incidences')
export class Incidence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  type!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ length: 20 })
  severity!: string;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => Route, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'routeId' })
  route!: Route;

  @ManyToOne(() => Stop, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'stopId' })
  stop!: Stop | null;
}
