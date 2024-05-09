import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaService } from './bw-service.schema';
import { Model } from 'mongoose';
import { SERVICES_COLLECTION_NAME } from '../constants';
import { IBwService } from './dto/create-service-dto';
import { UpdateServicetDto } from './dto/update-service-dto';
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
    try {
      const data = await this.bwServiceModel
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
      const data = await this.bwServiceModel
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

  async findOneAndUpdate(
    _id: string,
    data: UpdateServicetDto
  ): Promise<BingwaService> {
    try {
      const existingService = await this.bwServiceModel
        .findByIdAndUpdate(_id, data, {
          new: true,
        })
        .exec();
      if (!existingService) {
        throw new NotFoundException(`Service #${_id} not found`);
      }
      return existingService;
    } catch (error) {
      console.log(error);
    }
  }
}
