export interface BusinessResponse {
  id: number;
  name: string;
  contact_number: string;
  average_rating?: number;
  total_reviews?: number;
  address: string;
  latitude: string | null;
  longitude: string | null;
  owner: number;
  owner_name: string;
}
