import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaService } from './bw-service.schema';
import { Model } from 'mongoose';

export interface IProximity {
  long: number;
  lat: number;
  minDistance: number;
  maxDistance: number;
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

  /**
   * If specifying latitude and longitude coordinates, list the longitude first, and then latitude.
   * @param long Valid longitude values are between -180 and 180
   * @param lat Valid latitude values are between -90 and 90, both inclusive
   * @returns return documents that are at least x meters from and at most x meters
   */

  async findProximity(proximity: IProximity) {
    return this.bwServiceModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [proximity.long, proximity.lat],
          },
          $minDistance: proximity.minDistance,
          $maxDistance: proximity.maxDistance,
        },
      },
    });
  }
}
