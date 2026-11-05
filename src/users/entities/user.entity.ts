import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') export class User{
    @PrimaryGeneratedColumn() id:number;

    @Column({length: 100}) name:string;

    @Column({length: 100}) lastname:string;

    @Column({unique: true, length:150}) email:string;

    @Column() password:string;
}