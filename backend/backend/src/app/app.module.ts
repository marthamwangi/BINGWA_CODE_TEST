import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BingwaProviderModule } from './bingwa-providers/bw-provider.module';
import { BingwaServiceModule } from './bingwa-services/bw-service.module';
import { BingwaServiceTypeModule } from './bingwa-service-type/bw-service-type.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://martyturing:fnENzdl99e5v1vDT@bingwacluster.f2atza4.mongodb.net/bingwa-oonline'
    ),
    BingwaProviderModule,
    BingwaServiceModule,
    BingwaServiceTypeModule,
  ],
})
export class AppModule {}
