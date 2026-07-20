export interface QualificationResponse {
  id: number;
  user: number;
  username: string;
  business: number;
  qualification: number;
  comment: string | null;
  evidence_image: string | null;
  creation_date: string;
}
