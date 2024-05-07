import { Controller, Get } from '@nestjs/common';
import { BingwaServiceTypeService } from './bw-service-type.service';
import { BingwaServiceType } from './bw-service-type.schema';
import { ROUTE_SERVICE_TYPES } from '../routes';

@Controller(ROUTE_SERVICE_TYPES)
export class BingwaServiceTypeController {
  constructor(private readonly _bwTypeService: BingwaServiceTypeService) {}
  @Get()
  findAll(): Promise<BingwaServiceType[]> {
    return this._bwTypeService.findAll();
  }
}
