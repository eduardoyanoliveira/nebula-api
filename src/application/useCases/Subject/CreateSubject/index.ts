import { CreateSubjectRepository } from "../../../database/Subject/create-subject";
import { FindSubjectByNameRepository } from "../../../database/Subject/find-subject-by-name";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { SubjectToResponse } from "../../../DTOs/Subject/subject-to-response";
import { CreateSubjectController } from "./create-subject-controller";
import { CreateSubjectService } from "./create-subject-service";

const dataToSubject = new DataToSubject();
const subjectToResponse = new SubjectToResponse();

const findSubjectByNameRepository = new FindSubjectByNameRepository(dataToSubject);
const createSubjectRepository = new CreateSubjectRepository();

const createSubjectService = new CreateSubjectService(findSubjectByNameRepository, createSubjectRepository);

const createSubjectController = new CreateSubjectController(createSubjectService, subjectToResponse);

export { createSubjectService, createSubjectController };