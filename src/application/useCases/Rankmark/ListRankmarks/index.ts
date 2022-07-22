import { ListRankmarksService } from "./list-rankmarks-service";
import { RankmarkRepository } from '../../../database/Rankmark/rankmark-repository';
import { ListRankmarksController } from "./list-rankmarks-controller";
import { RankmarkDTO } from "../../../DTOs/Rankmark/rankmark-dto";

const rankmarkDTO = new RankmarkDTO();

const rankmarkRepository = new RankmarkRepository(rankmarkDTO); 

const listRankmarksService = new ListRankmarksService(rankmarkRepository);

const listRankmarksController = new ListRankmarksController(listRankmarksService, rankmarkDTO);

export { listRankmarksController, listRankmarksService };