export interface IBwService {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceProvider: string;
  price: string;
}

export interface BwServiceData {
  _id: string;
  service_name: string;
  service_description: string;
  service_provider: string;
  price: string;
}

export interface IProximity {
  long: number;
  lat: number;
  minDistance: number;
  maxDistance: number;
}

export interface IPriceRange {
  maxPrice: number;
  minPrice: number;
}
