import { BwServiceTypeData, IBwServiceType } from './data.model';

export class DeserializeBWServiceTypes {
  deserialize(response: Array<BwServiceTypeData>): Array<IBwServiceType> {
    return response.map((entity) => ({
      id: entity._id,
      serviceName: entity.service_name,
      serviceDescription: entity.service_description,
    }));
  }
}
