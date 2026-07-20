export interface QualificationResponse {
  id: number;
  business: number;
  qualification: number;
  comment: string | null;
  evidence_image: string | null;
  creation_date: string;
}
