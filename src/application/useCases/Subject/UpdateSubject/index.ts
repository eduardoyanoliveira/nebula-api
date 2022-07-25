import { UpdateSubjectService } from "./update-subject-service";
import { UpdateSubjectController } from './update-subject-controller';
import { SubjectToResponse } from "../../../DTOs/Subject/subject-to-response";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { UpdateSubjectRepository } from "../../../database/Subject/update-subject";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";

const dataToSubject = new DataToSubject();
const subjectToResponse = new SubjectToResponse();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);
const updateSubjectRepository = new UpdateSubjectRepository();

const updateSubjectService = new UpdateSubjectService(findSubjectByIdRepository, updateSubjectRepository);

const updateSubjectController = new UpdateSubjectController(updateSubjectService, subjectToResponse);

export { updateSubjectService, updateSubjectController };