import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { IContentDTO } from "../../DTOs/Content/content-dto";
import { IContentRepository } from "../../repositories/Content/content-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IFindContentById extends Pick<IContentRepository, 'findById'>{};

export class FindContentById implements IFindContentById{

    constructor(
        private ContentDTO: IContentDTO
    ){};

    async findById(content_id: string): Promise<Result<Content>> {
        
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

        return Result.ok<Content>(this.ContentDTO.dataToContent(response));
    }; 
};