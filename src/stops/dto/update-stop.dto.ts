import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min, MaxLength } from "class-validator";

export class UpdateStopDto{
    @IsOptional()
    @IsString({message: 'El nombre debe ser un texto'})
    @IsNotEmpty({message: 'El nombre no puede estar vacio'})
    @MaxLength(100, {message: 'El nombre no tiene que superar los 100 caracteres'})
    name?: string;

    @IsOptional()
    @IsString({message: 'La direccion debe ser un texto'})
    @IsNotEmpty({message: 'La direccion no puede estar vacia'})
    @MaxLength(200, {message: 'La direccion no puede superar los 200 caracteres'})
    address?: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser un texto'})
    description?: string;

    @IsOptional()
    @IsString({ message: 'El estado debe ser verdadero o falso'})
    isActive: boolean;

    @IsOptional()
    @IsInt({message: 'El ID de la ruta debe ser un numero'})
    @Min(1, {message: 'El ID de la ruta tiene que ser mayor a cero'})
    routeId?: number;

    @IsOptional()
    @IsInt({message: 'La secuencia debe ser un numero entero'})
    @Min(1, {message: 'La secuencia debe ser mayor a cero'})
    sequence?: number;
}