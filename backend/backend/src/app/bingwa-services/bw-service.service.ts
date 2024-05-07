import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaService } from './bw-service.schema';
import { Model } from 'mongoose';

@Injectable()
export class BingwaServicesService {
  constructor(
    @InjectModel(BingwaService.name)
    private bwServiceModel: Model<BingwaService>
  ) {}
  async findAll(): Promise<BingwaService[]> {
    return this.bwServiceModel.find().exec();
  }
}
