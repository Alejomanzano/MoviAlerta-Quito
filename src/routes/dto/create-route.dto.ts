import { IsString, IsNotEmpty, IsOptional, MaxLength, IsBoolean } from "class-validator";

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

    
}