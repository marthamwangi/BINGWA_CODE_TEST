import { BwServiceData, IBwService } from './data.model';

export class DeserializeBWServices {
  deserialize(response: Array<BwServiceData>): Array<IBwService> {
    return response.map((entity) => ({
      id: entity.id,
      serviceName: entity.service_name,
      serviceDescription: entity.service_description,
      serviceProvider: entity.service_provider,
      price: entity.price,
    }));
  }
}
