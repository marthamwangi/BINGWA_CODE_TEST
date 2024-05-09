import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { BingwaServicesService } from './bw-service.service';
import { BingwaService } from './bw-service.schema';
import { UpdateServicetDto } from './dto/update-service-dto';

@Controller('services')
export class BingwaServicesController {
  constructor(private readonly bwServiceService: BingwaServicesService) {}

  @Get()
  findAll(): Promise<BingwaService[]> {
    return this.bwServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BingwaService> {
    return this.bwServiceService.findOne(id);
  }

  @Put('booking/:id')
  async bookOne(
    @Res() response,
    @Param('id') id: string,
    @Body() booking: UpdateServicetDto
  ) {
    try {
      const existingService = await this.bwServiceService.bookOne(id, booking);
      if (!existingService) {
        return response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Service not found', error: 'Not Found' });
      }
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Booking made successfully', existingService });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
