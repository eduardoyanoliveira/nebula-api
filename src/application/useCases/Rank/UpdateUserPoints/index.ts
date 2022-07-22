import { RankRepository } from '../../../database/Rank/rank-repository';
import { SubjectRepository } from '../../../database/Subject/subject-repository';
import { UserRepository } from '../../../database/User/user-repository';
import { RankDTO } from '../../../DTOs/Rank/rank-dto';
import { SubjectDTO } from '../../../DTOs/Subject/subject-dto';
import { UserDTO } from '../../../DTOs/User/user-dto';
import { UpdateUserPointsController } from './update-user-points-controller';
import { UpdateUserPointsService } from './update-user-points-service';

const subjectDTO = new SubjectDTO();
const userDTO = new UserDTO();
const rankDTO = new RankDTO();

const userRepository = new UserRepository(userDTO);
const subjectRepository = new SubjectRepository(subjectDTO);

const rankRepository = new RankRepository(rankDTO);
const updateUserPointsService = new UpdateUserPointsService(userRepository, subjectRepository, rankRepository);

const updateUserPointsController = new UpdateUserPointsController(updateUserPointsService, rankDTO);

export { updateUserPointsService, updateUserPointsController };