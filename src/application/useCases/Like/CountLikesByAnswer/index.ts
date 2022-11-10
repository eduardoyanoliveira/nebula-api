import { PrismaCountLikesByAnswerRepository } from "../../../database/Like/count-likes-by-answer-repospitory";
import { findAnswerByIdRepository } from "../../Answer/FindAnswerById";
import { CountLikesByAnswerController } from "./count-likes-by-answer-controller";
import { CountLikesByAnswerService } from "./count-likes-by-answer-service";


const countLikesByAnswerRepository = new PrismaCountLikesByAnswerRepository();

const countLikeByAnswerService = new CountLikesByAnswerService(
    findAnswerByIdRepository, 
    countLikesByAnswerRepository,
);
const countLikesByAnswerController = new CountLikesByAnswerController(countLikeByAnswerService);

export { countLikesByAnswerController, countLikeByAnswerService, countLikesByAnswerRepository };