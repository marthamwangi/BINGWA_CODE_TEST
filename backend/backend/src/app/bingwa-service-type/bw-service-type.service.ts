import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaServiceType } from './bw-service-type.schema';
import { Model } from 'mongoose';
import { TYPES_COLLECTION_NAME } from '../constants';

@Injectable()
export class BingwaServiceTypeService {
  constructor(
    @InjectModel(TYPES_COLLECTION_NAME)
    private _bwServiceTypeModel: Model<BingwaServiceType>
  ) {}

  /**
   * @returns all service types
   */
  async findAll(): Promise<BingwaServiceType[]> {
    try {
      let data = await this._bwServiceTypeModel.find().exec();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
