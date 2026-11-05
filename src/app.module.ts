import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from './routes/routes.module.js';
import { StopsModule } from './stops/stops.module.js';
import { IncidencesModule } from './incidences/incidences.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      
    }),

    StopsModule,
    UsersModule,
    AuthModule,
    RoutesModule,

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT') ?? 5432),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
    }),
}),

    UsersModule,
    AuthModule,
    RoutesModule,
    StopsModule,
    IncidencesModule,
  ],
})
export class AppModule {}