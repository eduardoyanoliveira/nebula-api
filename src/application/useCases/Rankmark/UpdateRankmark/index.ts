import { RankmarkRepository } from "../../../database/Rankmark/rankmark-repository";
import { RankmarkDTO } from "../../../DTOs/Rankmark/rankmark-dto";
import { UpdateRankmarkController } from "./update-rankmark-controller";
import { UpdateRankmarkService } from "./update-rankmark-service";

const rankmarkDTO = new RankmarkDTO();

const rankmarkRepository = new RankmarkRepository(rankmarkDTO);
const updateRankmarkService = new UpdateRankmarkService( rankmarkRepository );

const updateRankmarkController = new UpdateRankmarkController(updateRankmarkService, rankmarkDTO);

export { updateRankmarkController, updateRankmarkService };