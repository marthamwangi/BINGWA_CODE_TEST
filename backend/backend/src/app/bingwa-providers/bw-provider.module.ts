import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BingwaProvider, BingwaProviderSchema } from './bw-provider.schema';
import { BingwaProvidersController } from './bw-provider.controller';
import { BingwaProvidersService } from './bw-provider.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BingwaProvider.name, schema: BingwaProviderSchema },
    ]),
  ],
  controllers: [BingwaProvidersController],
  providers: [BingwaProvidersService],
})
export class BingwaProviderModule {}
