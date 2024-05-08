import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaService } from './bw-service.schema';
import { Model } from 'mongoose';
import { SERVICES_COLLECTION_NAME } from '../constants';
@Injectable()
export class BingwaServicesService {
  constructor(
    @InjectModel(SERVICES_COLLECTION_NAME)
    private readonly bwServiceModel: Model<BingwaService>
  ) {}

  /**
   *
   * @returns all services
   */
  async findAll(): Promise<BingwaService[]> {
    // return this.bwServiceModel.find().exec();
    try {
      let data = await this.bwServiceModel
        .find()
        .populate({
          path: 'service_provider_id',
          select:
            'first_name last_name email_address profile_photo phone_number location',
        })
        .exec();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * findOne service and populate with the service provider
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<BingwaService> {
    try {
      let data = await this.bwServiceModel
        .findOne({ _id: id })
        .populate({
          path: 'service_provider_id',
          select:
            'first_name last_name email_address profile_photo phone_number location',
        })
        .exec();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
