export interface Business {
  id: number;
  name: string;
  contactNumber: string;
  average_rating?: number;
  total_reviews?: number;
  address: string;
  latitude: number | null;
  longitude: number | null;
  owner: number;
  ownerName: string;
}
