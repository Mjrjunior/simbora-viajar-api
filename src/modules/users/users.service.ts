import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import ApiError from '../api-error/api-error';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly configService: ConfigService) {}
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.role === 'ADMIN') {
      const secretCode = this.configService.get<string>('ADMIN_SECRET_CODE');
      if (!createUserDto.adminCode || createUserDto.adminCode !== secretCode) {
        throw new ApiError(
          'You do not have permission to create an admin user',
          'Você não tem permissão para criar um usuário admin',
          403
        );
      }
    }
    
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: this.generateHash(createUserDto.password),
      }
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      userName: user.userName,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  
  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
