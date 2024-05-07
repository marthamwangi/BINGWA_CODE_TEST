import { Controller, Get, Param } from '@nestjs/common';
import { BingwaServicesService, IProximity } from './bw-service.service';
import { BingwaService } from './bw-service.schema';

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

  @Get(':proximity')
  async findProximity(
    @Param('proximity') proximity: IProximity
  ): Promise<Array<BingwaService>> {
    return this.bwServiceService.findProximity(proximity);
  }
}
