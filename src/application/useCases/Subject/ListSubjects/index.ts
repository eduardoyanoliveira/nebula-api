import { ListSubjectsService } from './list-subjects-service';
import { ListSubjectsController } from './list-subjects-controller';
import { DataToSubject } from '../../../DTOs/Subject/data-to-subject';
import { SubjectToResponse } from '../../../DTOs/Subject/subject-to-response';
import { ListSubjectsRepository } from '../../../database/Subject/list-subjects';

const dataToSubject = new DataToSubject();
const subjectToResponse = new SubjectToResponse();

const listSubjectsRepository = new ListSubjectsRepository(dataToSubject);

const listSubjectsService = new ListSubjectsService(listSubjectsRepository);

const listSubjectsController = new ListSubjectsController(listSubjectsService, subjectToResponse);

export { listSubjectsService, listSubjectsController };