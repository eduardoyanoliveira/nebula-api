import { RankRepository } from "../../../database/Rank/rank-repository";
import { SubjectRepository } from "../../../database/Subject/subject-repository";
import { RankDTO } from "../../../DTOs/Rank/rank-dto";
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { ListRanksBySubjectController } from "./list-ranks-by-subject-controller";
import { ListRanksBySubjectService } from "./list-ranks-by-subject-service";

const subjectDTO = new SubjectDTO();
const rankDTO = new RankDTO();

const subjectRepository = new SubjectRepository(subjectDTO);
const rankRepository = new RankRepository(rankDTO);

const listRanksBySubjectService = new ListRanksBySubjectService(subjectRepository, rankRepository);

const listRanksBySubjectController = new ListRanksBySubjectController(listRanksBySubjectService, rankDTO);

export { listRanksBySubjectController, listRanksBySubjectService };