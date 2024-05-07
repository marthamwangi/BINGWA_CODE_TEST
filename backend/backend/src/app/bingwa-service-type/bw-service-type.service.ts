import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BingwaServiceType } from './bw-service-type.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class BingwaServiceTypeService {
  constructor(
    @InjectModel(BingwaServiceType.name)
    private _bwServiceTypeModel: Model<BingwaServiceType>
  ) {}

  async findAll(): Promise<BingwaServiceType[]> {
    return this._bwServiceTypeModel.find().exec();
  }
}
