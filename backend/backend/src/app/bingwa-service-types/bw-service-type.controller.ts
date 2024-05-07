import { Controller, Get } from '@nestjs/common';
import { BingwaServiceTypesService } from './bw-service-type.service';
import { BingwaServiceType } from './bw-service-type.schema';

@Controller('service-types')
export class BingwaServiceTypeController {
  constructor(private readonly bwServiceType: BingwaServiceTypesService) {}

  @Get()
  findAll(): Promise<BingwaServiceType[]> {
    return this.bwServiceType.findAll();
  }
}
