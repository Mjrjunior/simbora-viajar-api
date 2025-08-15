import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TripModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
