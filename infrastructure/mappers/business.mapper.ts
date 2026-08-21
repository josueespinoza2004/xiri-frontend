import { Business } from "../interfaces/business.interface";
import { BusinessResponse } from "../interfaces/business-response.interface";

export class BusinessMapper {
  static fromBusinessResponse = (biz: BusinessResponse): Business => {
    return {
      id: biz.id,
      name: biz.name,
      contactNumber: biz.contact_number,
      address: biz.address,
      latitude: biz.latitude ? parseFloat(biz.latitude) : null,
      longitude: biz.longitude ? parseFloat(biz.longitude) : null,
      owner: biz.owner,
      ownerName: biz.owner_name,
    };
  };
}
