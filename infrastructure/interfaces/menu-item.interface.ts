export interface BusinessMenuItem {
  id: number;
  name: string;
  description: string;
  price: string | number
  image: string | null;
  business: number;
  businessName: string;
  traditionalFood: number | null;
  traditionalFoodName: string | null;
  isTraditionalVariant: boolean;
  countsForAlbum: boolean;
}
