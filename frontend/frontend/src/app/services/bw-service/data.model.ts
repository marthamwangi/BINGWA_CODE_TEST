export interface IBwService {
  id: string;
  serviceTitle: string;
  serviceDescription: string;
  serviceProvider: IBwProvider;
  serviceType: string;
  price: string;
}

export interface BwServiceData {
  _id: string;
  service_title: string;
  service_description: string;
  service_provider_id: BwProviderData;
  service_type_id: string;
  price: string;
}

export interface IBwProvider {
  phone: string;
  email: string;
  fname: string;
  lname: string;
  avatar: string;
  id: string;
}

export interface BwProviderData {
  email_address: string;
  first_name: string;
  last_name: string;
  profile_photo: string;
  _id: string;
  phone_number: string;
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
