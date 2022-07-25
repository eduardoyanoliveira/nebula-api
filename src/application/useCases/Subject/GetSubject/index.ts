import { GetSubjectService } from './get-subject-service';
import { GetSubjectController } from './get-subject-controller';
import { FindSubjectByIdRepository } from '../../../database/Subject/find-subject-by-id';
import { SubjectToResponse } from '../../../DTOs/Subject/subject-to-response';
import { DataToSubject } from '../../../DTOs/Subject/data-to-subject';

const dataToSubject = new DataToSubject();
const subjectToResponse = new SubjectToResponse();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);

const getSubjectService = new GetSubjectService(findSubjectByIdRepository);

const getSubjectController = new GetSubjectController(getSubjectService, subjectToResponse);

export { getSubjectService, getSubjectController };