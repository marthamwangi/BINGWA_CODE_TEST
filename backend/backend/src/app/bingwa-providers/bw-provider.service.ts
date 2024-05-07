import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaProvider } from './bw-provider.schema';
import { Model } from 'mongoose';
export interface IProximity {
  long: number;
  lat: number;
  minDistance: number;
  maxDistance: number;
}
@Injectable()
export class BingwaProvidersService {
  constructor(
    @InjectModel(BingwaProvider.name)
    private bwProviderModel: Model<BingwaProvider>
  ) {}

  async findAll(): Promise<BingwaProvider[]> {
    return this.bwProviderModel.find().exec();
  }
  /**
   * If specifying latitude and longitude coordinates, list the longitude first, and then latitude.
   * @param long Valid longitude values are between -180 and 180
   * @param lat Valid latitude values are between -90 and 90, both inclusive
   * @returns return documents that are at least x meters from and at most x meters
   */

  async findProximity(proximity: IProximity) {
    return this.bwProviderModel.find({
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
