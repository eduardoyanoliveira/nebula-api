import { DataToRankmark } from "../../../DTOs/Rankmark/data-to-rankmark";
import { RankmarkToResponse } from "../../../DTOs/Rankmark/rankmark-to-response";
import { UpdateRankmarkController } from "./update-rankmark-controller";
import { UpdateRankmarkService } from "./update-rankmark-service";
import { FindRankmarkByIdRepository } from '../../../database/Rankmark/find-rankmark-by-id';
import { UpdateRankmarkRepository } from "../../../database/Rankmark/update-rankmark";

const dataToRankmark = new DataToRankmark();
const rankmarkToResponse = new RankmarkToResponse();

const findRankmarkByIdRepository = new FindRankmarkByIdRepository(dataToRankmark);
const updateRankmarkRepository = new UpdateRankmarkRepository();

const updateRankmarkService = new UpdateRankmarkService( findRankmarkByIdRepository, updateRankmarkRepository );

const updateRankmarkController = new UpdateRankmarkController(updateRankmarkService, rankmarkToResponse);

export { updateRankmarkController, updateRankmarkService };