import { Controller, Get, Param } from '@nestjs/common';
import { BingwaProvidersService } from './bw-provider.service';
import { BingwaProvider } from './bw-provider.schema';
import { ROUTE_PROVIDERS } from '../routes';

@Controller(ROUTE_PROVIDERS)
export class BingwaProvidersController {
  constructor(private readonly bwProviderService: BingwaProvidersService) {}
  @Get()
  findAll(): Promise<BingwaProvider[]> {
    return this.bwProviderService.findAll();
  }
}
