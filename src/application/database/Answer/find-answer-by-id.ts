import { Result } from "../../../core/Result";
import { Answer } from "../../../domain/entities/Interactions/Answer";
import { IAnswerDTO } from "../../DTOs/Answers/answer-dto";
import { IAnswerRepository } from "../../repositories/Answer/answer-repository";
import { prismaClient } from "../prisma/prismaClient";


interface IFindAnswerById extends Pick<IAnswerRepository, 'findById'>{};

export class FindAnswerById implements IFindAnswerById{

    constructor(
        private AnswerDTO: IAnswerDTO
    ){};

    async findById(answer_id: string): Promise<Result<Answer>> {
        
        const response = await prismaClient.answer.findUnique({
            where:{
                id:answer_id
            },
            include:{
                author:true,
                question:{
                    include:{
                        author: true,
                        subject: true
                    }
                }
            }
        });

        if(!response){
            return Result.fail<Answer>('Could not find the answer by the given id');
        };

        const answer = this.AnswerDTO.dataToAnswer(response);

        return Result.ok<Answer>(answer);
    };  
};