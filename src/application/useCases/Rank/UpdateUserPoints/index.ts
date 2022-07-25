import { UpdateUserPointsRepository } from '../../../database/Rank/update-user-points';
import { FindSubjectByIdRepository } from '../../../database/Subject/find-subject-by-id';
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { RankToResponse } from '../../../DTOs/Rank/rank-to-response';
import { DataToSubject } from '../../../DTOs/Subject/data-to-subject';
import { DataToUser } from '../../../DTOs/User/data-to-user';
import { UpdateUserPointsController } from './update-user-points-controller';
import { UpdateUserPointsService } from './update-user-points-service';

const dataToSubject = new DataToSubject();
const dataToUser = new DataToUser();
const rankToResponse = new RankToResponse();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);
const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);

const updateUserPointsRepository = new UpdateUserPointsRepository();

const updateUserPointsService = new UpdateUserPointsService(
    findUserByIdRepository, 
    findSubjectByIdRepository, 
    updateUserPointsRepository
);

const updateUserPointsController = new UpdateUserPointsController(updateUserPointsService, rankToResponse);

export { updateUserPointsService, updateUserPointsController };