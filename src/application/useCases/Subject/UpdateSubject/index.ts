import { SubjectRepository } from "../../../database/Subject/subject-repository";
import { UpdateSubjectService } from "./update-subject-service";
import { UpdateSubjectController } from './update-subject-controller';
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";

const subjectDTO = new SubjectDTO();

const repository = new SubjectRepository(subjectDTO);

const updateSubjectService = new UpdateSubjectService(repository);

const updateSubjectController = new UpdateSubjectController(updateSubjectService, subjectDTO);

export { updateSubjectService, updateSubjectController };