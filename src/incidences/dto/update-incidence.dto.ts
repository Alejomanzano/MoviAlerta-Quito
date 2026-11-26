import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min, MaxLength, IsIn } from "class-validator";

export class UpdateIncidenceDto{
    @IsOptional()
    @IsString({message: 'El tipo debe ser un texto'})
    @IsNotEmpty({ message: 'El tipo no puede estar vacio'})
    @MaxLength(30,{ message: 'El tipo no puede superar los 30 caracteres',})
    type?: string;
    
    @IsOptional()
    @IsString({message: 'La descripcion debe ser un texto'})
    @IsNotEmpty({message: 'La descripcion no puede estar vacia'})
    description?: string;

    @IsOptional()
    @IsString({message: 'La gravedad debe ser un texto'})
    @IsNotEmpty({ message: 'La gravedad no puede estar vacia'})
    @MaxLength(20,{ message: 'La gravedad no puede superar los 20 caracteres',})
    @IsIn(['Baja', 'Media', 'Alta'], {
    message: 'La gravedad debe ser Baja, Media o Alta'})
    severity?: string;



    @IsOptional()
    @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
    isActive?: boolean;

    @IsOptional()
    @IsInt({ message: 'El ID de la ruta debe ser un número entero' })
    @Min(1, { message: 'El ID de la ruta debe ser mayor a cero' })
    routeId?: number;

    @IsOptional()
    @IsInt({ message: 'El ID de la parada debe ser un número entero' })
    @Min(1, { message: 'El ID de la parada debe ser mayor a cero' })
    stopId?: number | null;
}