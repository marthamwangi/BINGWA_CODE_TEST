import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaService } from './bw-service.schema';
import { Model } from 'mongoose';
import {
  PROVIDERS_COLLECTION_NAME,
  SERVICES_COLLECTION_NAME,
} from '../constants';
import { BingwaProvider } from '../bingwa-providers/bw-provider.schema';

export interface IPriceRange {
  maxPrice: number;
  minPrice: number;
}
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
    return this.bwServiceModel.find().exec();
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
            'first_name last_name email_address profile_photo phone_number',
        })
        .exec();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // async filterAll(proximity: IProximity, price: IPriceRange, service: string) {
  //   return this.bwServiceModel.find({
  //     location: {
  //       $near: {
  //         $geometry: {
  //           type: 'Point',
  //           coordinates: [proximity.long, proximity.lat],
  //         },
  //         $minDistance: proximity.minDistance,
  //         $maxDistance: proximity.maxDistance,
  //       },
  //     },
  //   });
  // }
}
