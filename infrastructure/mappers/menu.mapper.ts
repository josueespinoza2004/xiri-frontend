import { MenuItem } from "../interfaces/menu.interface";
import { MenuItemResponse } from "../interfaces/menu-response.interface";

export class MenuMapper {
  static fromResponse = (item: MenuItemResponse): MenuItem => {
    return {
      id: item.id,
      business: item.business,
      food: item.food,
      price: parseFloat(item.price),
    };
  };
}
