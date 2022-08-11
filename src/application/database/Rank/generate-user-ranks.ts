import { Result } from '../../core/Result';
import { Subject } from '../../domain/entities/Subject';
import { prismaClient } from '../prisma/prismaClient';
import { RankCreateManyInputs } from 'prisma';
import { GenericResultClass } from '../../core/GenericResultClass';
import { User } from '../../domain/entities/User';
import { IGenerateUserRanksRepository } from '../../repositories/Rank/rank-repositories';

export class GenerateUserRanksRepository implements IGenerateUserRanksRepository{

    async execute(user: User, subjects: Subject[]): Promise<Result<GenericResultClass>> {
        
        const data : RankCreateManyInputs[] = subjects.map((subject) =>{
            return {
                user_id: user.id,
                subject_id: subject.id,
                points: 0
            }
        });

        try{
            await prismaClient.rank.createMany({
                data
            });

            return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
        }catch(err){
            throw new Error('Could not generate user ranks \n' + err );
        };
    };    
};