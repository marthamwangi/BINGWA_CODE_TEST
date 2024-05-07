import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BingwaServiceType } from './bw-service-type.schema';

@Injectable()
export class BingwaServiceTypesService {
  constructor(
    @InjectModel(BingwaServiceType.name)
    private bwServiceTypeModel: Model<BingwaServiceType>
  ) {}

  /**
   *
   * @returns all service types
   */
  async findAll(): Promise<BingwaServiceType[]> {
    return this.bwServiceTypeModel.find().exec();
  }
}
