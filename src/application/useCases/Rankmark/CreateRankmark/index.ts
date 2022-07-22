import { RankmarkFactory } from "../../../../domain/factories/Rankmark/factory-class";
import { RankmarkRepository } from "../../../database/Rankmark/rankmark-repository";
import { RankmarkDTO } from "../../../DTOs/Rankmark/rankmark-dto";
import { CreateRankmarkController } from "./create-rankmark-controller";
import { CreateRankmarkService } from "./create-rankmark-service";

const rankmarkDTO = new RankmarkDTO();

const factory = new RankmarkFactory();
const repository = new RankmarkRepository(rankmarkDTO);
const createRankmarkService = new CreateRankmarkService( factory, repository); 

const createRankmarkController = new CreateRankmarkController(createRankmarkService, rankmarkDTO);

export { createRankmarkController, createRankmarkService };