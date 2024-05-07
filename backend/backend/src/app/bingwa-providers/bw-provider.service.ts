import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BingwaProvider } from './bw-provider.schema';
import { Model } from 'mongoose';

@Injectable()
export class BingwaProvidersService {
  constructor(
    @InjectModel(BingwaProvider.name)
    private bwProviderModel: Model<BingwaProvider>
  ) {}

  async findAll(): Promise<BingwaProvider[]> {
    return this.bwProviderModel.find().exec();
  }
}
