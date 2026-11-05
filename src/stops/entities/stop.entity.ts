import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Route } from "../../routes/entities/route.entity.js";

@Entity('stops') export class Stop{

    @PrimaryGeneratedColumn() id!: number;

    @Column({length: 100}) name!: string;

    @Column({length: 200}) address!: string;

    @Column({ type: 'text', nullable: true}) description!: string | null;

    @Column({default: true}) isActive!: boolean;

    @ManyToOne(() => Route, {nullable: false, onDelete: 'RESTRICT'})
    @JoinColumn({name: 'routeId'}) route!: Route;
}

