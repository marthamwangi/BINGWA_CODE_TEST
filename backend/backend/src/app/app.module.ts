import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BingwaProviderModule } from './bingwa-providers/bw-provider.module';
import { BingwaServiceModule } from './bingwa-services/bw-service.module';
import { BingwaServiceTypeModule } from './bingwa-service-type/bw-service-type.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bingwa-local'),
    BingwaProviderModule,
    BingwaServiceModule,
    BingwaServiceTypeModule,
  ],
})
export class AppModule {}
