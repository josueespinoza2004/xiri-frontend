export interface VerificationRequest {
  id: number;
  user: number;
  username: string;
  businessName: string;
  businessAddress: string;
  idCardNumber: string;
  identityDocument: string;
  state: string;
  stateDisplay: string;
  requestDate: string;
  checkBy: number | null;
  reviews: string | null;
}
