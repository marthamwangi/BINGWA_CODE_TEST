import { Controller, Get } from '@nestjs/common';
import { BingwaProvidersService } from './bw-provider.service';
import { BingwaProvider } from './bw-provider.schema';

@Controller('providers')
export class BingwaProvidersController {
  constructor(private readonly bwProviderService: BingwaProvidersService) {}
  @Get()
  findAll(): Promise<BingwaProvider[]> {
    return this.bwProviderService.findAll();
  }
}
