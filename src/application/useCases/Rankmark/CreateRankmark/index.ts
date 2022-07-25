import { RankmarkFactory } from "../../../../domain/factories/Rankmark/factory-class";
import { DataToRankmark } from '../../../DTOs/Rankmark/data-to-rankmark';
import { RankmarkToResponse } from "../../../DTOs/Rankmark/rankmark-to-response";
import { CreateRankmarkController } from "./create-rankmark-controller";
import { CreateRankmarkService } from "./create-rankmark-service";
import { FindRankmarkByNameRepository } from '../../../database/Rankmark/find-rankmark-by-name';
import { CreateRankmarkRepository } from '../../../database/Rankmark/create-rankmark';

const rankmarkToResponse = new RankmarkToResponse();
const dataToRankmark = new DataToRankmark();

const factory = new RankmarkFactory();

const findRankmarkByNameRepository = new FindRankmarkByNameRepository(dataToRankmark);
const createRankmarkRepository = new CreateRankmarkRepository();

const createRankmarkService = new CreateRankmarkService(
    findRankmarkByNameRepository,
    createRankmarkRepository,
    factory
); 

const createRankmarkController = new CreateRankmarkController(createRankmarkService, rankmarkToResponse);

export { createRankmarkController, createRankmarkService };