import { ListRanksBySubjectRepository } from "../../../database/Rank/list-ranks-by-subject";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";
import { DataToRank } from "../../../DTOs/Rank/data-to-rank";
import { RankToResponse } from "../../../DTOs/Rank/rank-to-response";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { ListRanksBySubjectController } from "./list-ranks-by-subject-controller";
import { ListRanksBySubjectService } from "./list-ranks-by-subject-service";

const dataToSubject = new DataToSubject();

const dataToRank = new DataToRank();
const rankToResponse = new RankToResponse();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);

const listRanksBySubjectRepository = new ListRanksBySubjectRepository( dataToRank);

const listRanksBySubjectService = new ListRanksBySubjectService(findSubjectByIdRepository, listRanksBySubjectRepository);

const listRanksBySubjectController = new ListRanksBySubjectController(listRanksBySubjectService, rankToResponse);

export { listRanksBySubjectController, listRanksBySubjectService };