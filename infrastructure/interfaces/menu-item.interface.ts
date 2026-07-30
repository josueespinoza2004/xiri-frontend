export interface BusinessMenuItem {
  id: number;
  name: string;
  description: string;
  image: string | null;
  business: number;
  businessName: string;
  traditionalFood: number | null;
  traditionalFoodName: string | null;
  isTraditionalVariant: boolean;
  countsForAlbum: boolean;
}
