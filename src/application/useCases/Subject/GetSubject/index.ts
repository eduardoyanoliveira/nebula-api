import { SubjectRepository } from '../../../database/Subject/subject-repository';
import { GetSubjectService } from './get-subject-service';
import { GetSubjectController } from './get-subject-controller';
import { SubjectDTO } from '../../../DTOs/Subject/subject-dto';

const subjectDTO = new SubjectDTO();

const repository = new SubjectRepository(subjectDTO);

const getSubjectService = new GetSubjectService(repository);

const getSubjectController = new GetSubjectController(getSubjectService, subjectDTO);

export { getSubjectService, getSubjectController };