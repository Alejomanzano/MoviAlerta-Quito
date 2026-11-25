import { IsString, IsOptional, IsBoolean, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateRouteDto {
    @IsOptional()
    @IsString({ message: 'El código debe ser un texto' })
    @IsNotEmpty({ message: 'El código no puede estar vacío' })
    @MaxLength(20, { message: 'El código no puede superar los 20 caracteres' })
    code?: string;

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MaxLength(150, { message: 'El nombre no puede superar los 150 caracteres' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser un texto' })
    description?: string;

    @IsOptional()
    @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
    isActive?: boolean;
}
