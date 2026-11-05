import { Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService,
                private readonly jwtService : JwtService){}

    async login (body: any){
        
        if(!body.email || !body.password){
            throw new BadRequestException('Obligatorio Correo y Contrasenia');
        }

        const user = await this.userService.findByEmail(body.email);
        
        if(!user){
            throw new UnauthorizedException('Usuario o Contrasenia Incorrectos')
        } 
        const passwordValid = await bcrypt.compare(
            body.password,
            user.password
        )
        
        if(!passwordValid){
            throw new UnauthorizedException('Contrasenia Incorrecta')
            
        }

        const payload = {
            sub: user.id,
            email : user.email,
        };

        const token = await this.jwtService.signAsync(payload);
        
        return{
            message: 'Inicio Exitoso',
            access_token : token,
        };
    }
}
