import { VerificationRequest } from "../interfaces/verification.interface";
import { VerificationRequestResponse } from "../interfaces/verification-response.interface";

export class VerificationMapper {
  static fromResponse = (item: VerificationRequestResponse): VerificationRequest => {
    return {
      id: item.id,
      user: item.user,
      username: item.username,
      businessName: item.business_name,
      businessAddress: item.business_address,
      idCardNumber: item.id_card_number,
      identityDocument: item.identity_document,
      state: item.state,
      stateDisplay: item.state_display,
      requestDate: item.request_date,
      checkBy: item.check_by,
      reviews: item.reviews,
    };
  };
}
