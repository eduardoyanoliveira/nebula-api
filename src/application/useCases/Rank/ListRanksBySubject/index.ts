import { RankRepository } from "../../../database/Rank/rank-repository";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";
import { RankDTO } from "../../../DTOs/Rank/rank-dto";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { ListRanksBySubjectController } from "./list-ranks-by-subject-controller";
import { ListRanksBySubjectService } from "./list-ranks-by-subject-service";

const dataToSubject = new DataToSubject();
const rankDTO = new RankDTO();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);
const rankRepository = new RankRepository(rankDTO);

const listRanksBySubjectService = new ListRanksBySubjectService(findSubjectByIdRepository, rankRepository);

const listRanksBySubjectController = new ListRanksBySubjectController(listRanksBySubjectService, rankDTO);

export { listRanksBySubjectController, listRanksBySubjectService };