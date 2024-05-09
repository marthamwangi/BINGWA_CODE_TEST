import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaProvider } from './bw-provider.schema';
import { Model } from 'mongoose';
import { PROVIDERS_COLLECTION_NAME } from '../constants';

@Injectable()
export class BingwaProvidersService {
  constructor(
    @InjectModel(PROVIDERS_COLLECTION_NAME)
    private bwProviderModel: Model<BingwaProvider>
  ) {}

  async findAll(): Promise<BingwaProvider[]> {
    return this.bwProviderModel.find().exec();
  }
}
