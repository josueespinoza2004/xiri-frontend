import { xiriApi } from "@/core/api/xiri-api";

export interface BusinessMenuItemResponse {
  id: number;
  name: string;
  business: number;
}

export const getMenuItemsAction = async (businessId: number) => {
  try {
    const { data } = await xiriApi.get<BusinessMenuItemResponse[]>(
      `/business/menu-items/?business=${businessId}`,
    );

    return data;
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los platillos";
  }
};
