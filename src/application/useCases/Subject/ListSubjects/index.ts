import { SubjectRepository } from '../../../database/Subject/subject-repository';
import { ListSubjectsService } from './list-subjects-service';
import { ListSubjectsController } from './list-subjects-controller';
import { SubjectDTO } from '../../../DTOs/Subject/subject-dto';

const subjectDTO = new SubjectDTO();

const repository = new SubjectRepository(subjectDTO);

const listSubjectsService = new ListSubjectsService(repository);

const listSubjectsController = new ListSubjectsController(listSubjectsService, subjectDTO);

export { listSubjectsService, listSubjectsController };