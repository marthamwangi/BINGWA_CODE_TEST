import {
  BwProviderData,
  BwServiceData,
  IBwProvider,
  IBwService,
} from './data.model';

export class DeserializeBWServices {
  deserialize(response: Array<BwServiceData>): Array<IBwService> {
    return response.map((entity) => ({
      id: entity._id,
      serviceTitle: entity.service_title,
      serviceDescription: entity.service_description,
      serviceProvider: fnDeserializeProvider(entity.service_provider_id),
      serviceType: entity.service_type_id,
      price: entity.price,
    }));
  }
}

export class DeserializeOneBWService {
  deserialize(entity: BwServiceData): IBwService {
    return {
      id: entity._id,
      serviceTitle: entity.service_title,
      serviceDescription: entity.service_description,
      serviceProvider: fnDeserializeProvider(entity.service_provider_id),
      serviceType: entity.service_type_id,
      price: entity.price,
    };
  }
}

function fnDeserializeProvider(p: BwProviderData): IBwProvider {
  return {
    id: p._id,
    fname: p.first_name,
    lname: p.last_name,
    avatar: p.profile_photo,
    email: p.email_address,
    phone: p.phone_number,
  };
}
