import { RankRepository } from '../../../database/Rank/rank-repository';
import { SubjectRepository } from '../../../database/Subject/subject-repository';
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { RankDTO } from '../../../DTOs/Rank/rank-dto';
import { SubjectDTO } from '../../../DTOs/Subject/subject-dto';
import { DataToUser } from '../../../DTOs/User/data-to-user';
import { UpdateUserPointsController } from './update-user-points-controller';
import { UpdateUserPointsService } from './update-user-points-service';

const subjectDTO = new SubjectDTO();
const dataToUser = new DataToUser();
const rankDTO = new RankDTO();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);
const subjectRepository = new SubjectRepository(subjectDTO);

const rankRepository = new RankRepository(rankDTO);
const updateUserPointsService = new UpdateUserPointsService(findUserByIdRepository, subjectRepository, rankRepository);

const updateUserPointsController = new UpdateUserPointsController(updateUserPointsService, rankDTO);

export { updateUserPointsService, updateUserPointsController };