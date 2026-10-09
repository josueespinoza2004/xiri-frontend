export interface Business {
  id: number;
  name: string;
  contactNumber: string;
  averageRating: number;
  totalReviews: number;
  address: string;
  latitude: number | null;
  longitude: number | null;
  owner: number;
  ownerName: string;
}
