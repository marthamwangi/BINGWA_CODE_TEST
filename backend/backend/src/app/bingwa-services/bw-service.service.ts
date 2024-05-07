import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaService } from './bw-service.schema';
import { Model } from 'mongoose';

export interface IPriceRange {
  maxPrice: number;
  minPrice: number;
}
@Injectable()
export class BingwaServicesService {
  constructor(
    @InjectModel(BingwaService.name)
    private bwServiceModel: Model<BingwaService>
  ) {}

  /**
   *
   * @returns all services
   */
  async findAll(): Promise<BingwaService[]> {
    return this.bwServiceModel.find().exec();
  }
  /**
   * findOne service
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<BingwaService> {
    return this.bwServiceModel.findOne({ _id: id });
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
