import { Qualification } from "../interfaces/qualification.interface";
import { QualificationResponse } from "../interfaces/qualification-response.interface";

export class QualificationMapper {
  static fromResponse = (item: QualificationResponse): Qualification => {
    return {
      id: item.id,
      business: item.business,
      qualification: item.qualification,
      comment: item.comment,
      evidenceImage: item.evidence_image,
      creationDate: item.creation_date,
    };
  };
}
