import { MenuItem } from "../interfaces/menu.interface";
import { MenuItemResponse } from "../interfaces/menu-response.interface";

export class MenuMapper {
  static fromResponse = (item: MenuItemResponse): MenuItem => {
    return {
      id: item.id,
      business: item.business,
      businessName: item.business_name,
      menuItem: item.menu_item,
      menuItemName: item.menu_item_name,
      price: parseFloat(item.price),
    };
  };
}
