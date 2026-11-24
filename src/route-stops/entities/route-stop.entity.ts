import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";

import { Route } from "../../routes/entities/route.entity.js";
import { Stop } from "../../stops/entities/stop.entity.js";

@Entity('route_stips')
@Unique(['route', 'sequence'])
@Unique(['route', 'stop'])
export class RouteStop{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int'})
    sequence!:number;

    @ManyToOne(() => Route, { nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'routeId'})
    route!: Route;

    @ManyToOne(() => Stop, { nullable: false, onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'stopId'})
    stop! : Stop;
}