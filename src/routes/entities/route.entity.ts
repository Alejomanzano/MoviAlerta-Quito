import { from } from "rxjs";
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('routes') export class Route{
    @PrimaryGeneratedColumn() id!: number;

    @Column({unique: true, length: 20}) code!: string;
    
    @Column({length: 150}) name!: string;

    @Column({type: 'text', nullable: true}) description!: string | null; 

    @Column({default: true}) isActive: boolean;
}