import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BingwaProviderModule } from './bingwa-providers/bw-provider.module';
import { BingwaServiceModule } from './bingwa-services/bw-service.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bingwa-local'),
    BingwaProviderModule,
    BingwaServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
