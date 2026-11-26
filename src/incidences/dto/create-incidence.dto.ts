import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min, MaxLength } from "class-validator";

export class CreateIncidenceDto{
    @IsString({ message: 'El tipo debe ser un texto'})
    @IsNotEmpty({message: 'El tipo de incidencia es obligatoria'})
    @MaxLength(30, {message: 'El tipo no puede superar los 30 caracteres'})
    type!: string;

    @IsString({ message: 'La descripcion debe ser un texto'})
    @IsNotEmpty({message: 'La descripcion es obligatoria'})
    description!: string;

    @IsString({ message: 'La gravedad debe ser un texto'})
    @IsNotEmpty({ message: 'La gravedad es obligatoria'})
    @MaxLength(20, { message: 'La gravedad no puede superar los 20 caracteres',})
    severity!: string;

    @IsOptional()
    @IsBoolean({ message: 'El estado debe ser verdadero o falso'})
    isActive?: boolean;

    @IsInt({message: 'El ID de la ruta debe ser un numero entero'})
    @Min(1, {message: 'El ID de la ruta debe ser mayor a cero'})
    routeId!: number;

    @IsOptional()
    @IsInt({message: 'El ID de la parada debe ser un numero entero'})
    @Min(1,{message: 'El ID de la parada debe ser mayor a cero'})
    stopId?: number | null;
}