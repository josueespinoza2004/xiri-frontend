export interface Business {
  id: number;
  name: string;
  contactNumber: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  owner: number;
}
