import {
  BwProviderData,
  BwServiceData,
  IBwProvider,
  IBwService,
} from './data.model';

export class DeserializeBWServices {
  deserialize(
    response: Array<BwServiceData>,
    location: Function
  ): Array<IBwService> {
    return response.map((entity) => ({
      id: entity._id,
      serviceTitle: entity.service_title,
      serviceDescription: entity.service_description,
      serviceProvider: fnDeserializeProvider(
        entity.service_provider_id,
        location
      ),
      serviceType: entity.service_type_id,
      price: entity.price,
    }));
  }
}

export class DeserializeOneBWService {
  deserialize(entity: BwServiceData, location: Function): IBwService {
    return {
      id: entity._id,
      serviceTitle: entity.service_title,
      serviceDescription: entity.service_description,
      serviceProvider: fnDeserializeProvider(
        entity.service_provider_id,
        location
      ),
      serviceType: entity.service_type_id,
      price: entity.price,
    };
  }
}

function fnDeserializeProvider(
  p: BwProviderData,
  location: Function
): IBwProvider {
  return {
    id: p._id,
    fname: p.first_name,
    lname: p.last_name,
    avatar: p.profile_photo,
    email: p.email_address,
    phone: p.phone_number,
    longitude: p.location.coordinates[0],
    latitude: p.location.coordinates[1],
    distance: getDistanceFromLatLonInKm(
      p.location.coordinates[1],
      p.location.coordinates[0],
      location
    ),
  };
}

function getDistanceFromLatLonInKm(
  providerLat: number,
  providerLong: number,
  location: Function
): number {
  /**
   * Read user location from Local Storage
   */
  // const storageService: StorageService = new StorageService();
  const { latitude, longitude } = location();
  const r = 6371; // km
  const p = Math.PI / 180;

  const a =
    0.5 -
    Math.cos((providerLat - latitude) * p) / 2 +
    (Math.cos(latitude * p) *
      Math.cos(providerLat * p) *
      (1 - Math.cos((providerLong - longitude) * p))) /
      2;

  let d = 2 * r * Math.asin(Math.sqrt(a));
  return parseInt(d.toFixed(2));
}
