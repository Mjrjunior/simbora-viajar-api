import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: createTripDto,
      select: {
        title: true,
        destination: true,
        createdBy: true,
        startDate: true,
        endDate: true,
        description: true,
      },
    })
  }

  findAll() {
    return this.prisma.trip.findMany({
      select: {
        id: true,
        title: true,
        destination: true,
        createdBy: true,
        startDate: true,
        endDate: true,
        description: true,
        deletedAt: true,
      },
    })
  }

  findOne(id: string) {
    return this.prisma.trip.findUnique({
      where: { id },
    })
  }

  update(id: string, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({
      where: { id },
      data: updateTripDto,
    })
  }

  remove(id: string) {
    return this.prisma.trip.delete({
      where: { id },
    })
  }
}
