import { Result } from '../../../core/Result';
import { prismaClient } from '../prisma/prismaClient';
import { RankCreateManyInputs } from 'prisma';
import { GenericResultClass } from '../../../core/GenericResultClass';
import { User } from '../../../domain/entities/User';
import { Subject } from '../../../domain/entities/Subject';
import { IGenerateSubjectRanksRepository } from '../../repositories/Rank/rank-repositories';


export class GenerateSubjectRanksRepository implements IGenerateSubjectRanksRepository{

    async execute(subject: Subject, users: User[]): Promise<Result<GenericResultClass>> {
        
        const data : RankCreateManyInputs[] = users.map((user) =>{
            return {
                subject_id: subject.id,
                user_id: user.id,
                points: 0
            }
        });

        console.log(data)

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