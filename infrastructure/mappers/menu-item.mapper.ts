import { BusinessMenuItem } from "../interfaces/menu-item.interface";
import { BusinessMenuItemResponse } from "../interfaces/menu-item-response.interface";

export class MenuItemMapper {
  static fromResponse = (item: BusinessMenuItemResponse): BusinessMenuItem => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      business: item.business,
      businessName: item.business_name,
      traditionalFood: item.traditional_food,
      traditionalFoodName: item.traditional_food_name,
      isTraditionalVariant: item.is_traditional_variant,
      countsForAlbum: item.counts_for_album,
    };
  };
}
