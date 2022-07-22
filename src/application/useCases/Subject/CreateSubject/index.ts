import { SubjectRepository } from "../../../database/Subject/subject-repository";
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { CreateSubjectController } from "./create-subject-controller";
import { CreateSubjectService } from "./create-subject-service";

const subjectDTO = new SubjectDTO();

const subjectRepository = new SubjectRepository(subjectDTO);

const createSubjectService = new CreateSubjectService(subjectRepository);

const createSubjectController = new CreateSubjectController(createSubjectService, subjectDTO);

export { createSubjectService, createSubjectController };