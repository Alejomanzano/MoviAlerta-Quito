import { IsString, IsNotEmpty, IsOptional, isBoolean, isInt, min, maxLength, MaxLength } from "class-validator";

export class CreateStopDto{
    @IsString({ message: 'El nombre debe ser de un texto'})
    @IsNotEmpty({ message: 'El nombre de la parada es obligatorio'})
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres'})
    name!: string;

    @IsString({message: 'la direccion debe ser un texto'})
    @IsNotEmpty({ message: 'la direccion es obligatorio'})
    @MaxLength(200, {message: 'la direccion no puede superar los 200 caracteres'})
    address!: string;

    @IsOptional({ message: 'la descrpcion debe ser en texto'})
    description?: string;

    
}