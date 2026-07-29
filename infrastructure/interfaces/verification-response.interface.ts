export interface VerificationRequestResponse {
  id: number;
  user: number;
  username: string;
  business_name: string;
  business_address: string;
  id_card_number: string;
  identity_document: string;
  state: string;
  state_display: string;
  request_date: string;
  check_by: number | null;
  reviews: string | null;
}
