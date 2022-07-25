import { ListRankmarksService } from "./list-rankmarks-service";
import { ListRankmarksController } from "./list-rankmarks-controller";
import { DataToRankmark } from "../../../DTOs/Rankmark/data-to-rankmark";
import { RankmarkToResponse } from "../../../DTOs/Rankmark/rankmark-to-response";
import { ListRankmarksRepository } from '../../../database/Rankmark/list-rankmark';

const dataToRankmark = new DataToRankmark();
const rankmarkToResponse = new RankmarkToResponse();

const listRankmarksReposoitory = new ListRankmarksRepository(dataToRankmark); 

const listRankmarksService = new ListRankmarksService(listRankmarksReposoitory);

const listRankmarksController = new ListRankmarksController(listRankmarksService, rankmarkToResponse);

export { listRankmarksController, listRankmarksService };