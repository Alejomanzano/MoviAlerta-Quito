import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity.js';



@Injectable()
export class UsersService implements OnModuleInit{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {

    const email = 'ariel.manzano@udla.edu.ec';

    const existingUser = await this.findByEmail(email);
  
  if (!existingUser) {
    const password = await bcrypt.hash('123456', 10);

    const user = this.userRepository.create({
        name: 'Alejandro',
        lastname: 'Manzano',
        email,
        password,
    });

    await this.userRepository.save(user);

    console.log('Usuario inicial creado Correctamnete');
  }
  }
    async getUsers() {
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
      },
    });
  }

    async createUser(
    name: string,
    lastname: string,
    email: string,
    password: string,
    ) {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            name,
            lastname,
            email,
            password: hashedPassword,
        });
        
        const savedUser = await this.userRepository.save(newUser);

        return {
            id : savedUser.id,
            name : savedUser.name,
            lastname : savedUser.lastname,
            email : savedUser.email
        };
    }
    
    async updateUser(
        id : string,
        name : string,
        lastname : string,
        email : string,
        password : string
    ){
        const user = await this.userRepository.findOneBy({
            id: Number(id),
            
        });
        
        if(!user){
            return new NotFoundException('Usuario no encontrado')
        }

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        
        if(password){
            user.password = await bcrypt.hash(password, 10);
        }

        const updateUser = await this.userRepository.save(user)

        return {
            id: updateUser.id,
            name: updateUser.name,
            lastname: updateUser.lastname,
            email: updateUser.email,
        };
    }

    async deletUser(id : string){
        const result = await this.userRepository.delete(Number(id));
        if(result.affected == 0){
            throw new NotFoundException('Usuario no encontrado');
        }

        return{
            message: 'Usuario eliminado correctamente'
        }
    }

    async findByEmail(email: string){
        return this.userRepository.findOneBy({ email });
    }
}
