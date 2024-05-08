import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BingwaProvider, BingwaProviderSchema } from './bw-provider.schema';
import { BingwaProvidersController } from './bw-provider.controller';
import { BingwaProvidersService } from './bw-provider.service';
import { PROVIDERS_COLLECTION_NAME } from '../constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROVIDERS_COLLECTION_NAME, schema: BingwaProviderSchema },
    ]),
  ],
  controllers: [BingwaProvidersController],
  providers: [BingwaProvidersService],
  exports: [MongooseModule],
})
export class BingwaProviderModule {}
