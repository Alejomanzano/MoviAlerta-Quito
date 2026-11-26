import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min, MaxLength } from "class-validator";

export class CreateStopDto{
    @IsString({ message: 'El nombre debe ser de un texto'})
    @IsNotEmpty({ message: 'El nombre de la parada es obligatorio'})
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres'})
    name!: string;

    @IsString({message: 'la direccion debe ser un texto'})
    @IsNotEmpty({ message: 'la direccion es obligatorio'})
    @MaxLength(200, {message: 'la direccion no puede superar los 200 caracteres'})
    address!: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un texto'})
    description?: string;

    @IsOptional()
    @IsBoolean({ message: 'El estado debe ser un verdadero o falso'})
    isActive?:boolean;

    @IsInt({message: 'El ID de la tura debe ser un numero entero'})
    @Min(1,{ message: 'El ID de la ruta debe ser mayor a cero'})
    routeId!: number;

    @IsInt({ message: 'La secuencia debe ser un numero entero'})
    @Min(1,{ message: 'La secuencia debe ser mayor a cero'})
    sequence!: number;
}