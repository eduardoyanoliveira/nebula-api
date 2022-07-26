import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { IDataToContent } from "../../DTOs/Content/data-to-content";
import { IFindContentByIdRepository } from "../../repositories/Content/content-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class FindContentByIdRepository implements IFindContentByIdRepository{

    constructor(
        private DataToContent: IDataToContent
    ){};

    async execute(content_id: string): Promise<Result<Content>> {
        
        const response = await prismaClient.content.findUnique({
            where:{
                id: content_id
            },
            include:{
                subject:true
            }
        });

        if(!response){
            return Result.fail<Content>('Could not find the content on database');
        };

        return Result.ok<Content>(this.DataToContent.transform(response));
    }; 
};