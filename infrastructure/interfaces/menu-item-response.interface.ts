export interface BusinessMenuItemResponse {
  id: number;
  name: string;
  description: string;
  price: string | number
  image: string | null;
  business: number;
  business_name: string;
  traditional_food: number | null;
  traditional_food_name: string | null;
  is_traditional_variant: boolean;
  counts_for_album: boolean;
  created_at: string;
}
