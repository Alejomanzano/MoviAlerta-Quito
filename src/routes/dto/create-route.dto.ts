import { IsString, IsNotEmpty, IsOptional, MaxLength, IsBoolean, IsInt, Min } from "class-validator";

export class CreateRouteDto{
    @IsString({ message: 'El codigo debe ser un texto'})
    @IsNotEmpty({message: 'El codigo de la ruta es obligatorio'})
    @MaxLength(20, { message: 'El codigo no puede superar los 20 caracteres '})
    code!: string;

    @IsString({ message: 'El nombre debe ser un texto'})
    @IsNotEmpty({ message: 'El nombre de la ruta es obligatorio'})
    @MaxLength(150,{ message: 'El nombre no puede superar los 150 caracteres'})
    name!: string;

    @IsOptional()
    @IsString({message: 'La descripcion debe ser un texto'})
    description?: string;

    @IsOptional()
    @IsBoolean({ message: 'El estado debe ser verdadero o falso'})
    isActive?: boolean;

    @IsInt({ message: 'El ID de la tura tiene que ser un numero entero'})
    @Min(1, { message: 'El ID de la tura tine que ser mayor a cero'})
    routeId!: number;

    @IsInt({ message: 'La secuencia debe ser de un numero entero'})
    @Min(1, {message: 'La secuende debe de ser mayor a cero'})
    sequence!: number;
}