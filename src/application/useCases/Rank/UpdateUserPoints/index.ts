import { RankRepository } from '../../../database/Rank/rank-repository';
import { FindSubjectByIdRepository } from '../../../database/Subject/find-subject-by-id';
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { RankDTO } from '../../../DTOs/Rank/rank-dto';
import { DataToSubject } from '../../../DTOs/Subject/data-to-subject';
import { DataToUser } from '../../../DTOs/User/data-to-user';
import { UpdateUserPointsController } from './update-user-points-controller';
import { UpdateUserPointsService } from './update-user-points-service';

const dataToSubject = new DataToSubject();
const dataToUser = new DataToUser();
const rankDTO = new RankDTO();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);
const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);

const rankRepository = new RankRepository(rankDTO);
const updateUserPointsService = new UpdateUserPointsService(findUserByIdRepository, findSubjectByIdRepository, rankRepository);

const updateUserPointsController = new UpdateUserPointsController(updateUserPointsService, rankDTO);

export { updateUserPointsService, updateUserPointsController };