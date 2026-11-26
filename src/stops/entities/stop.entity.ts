import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Route } from "../../routes/entities/route.entity.js";
import { RouteStop } from "../../route-stops/entities/route-stop.entity.js";

@Entity('stops') export class Stop{

    @PrimaryGeneratedColumn() id!: number;

    @Column({length: 100}) name!: string;

    @Column({length: 200}) address!: string;

    @Column({ type: 'text', nullable: true}) description!: string | null;

    @Column({default: true}) isActive!: boolean;

    @OneToMany(() => RouteStop, routestop => routestop.stop)
    routeStops!: RouteStop[];
}

