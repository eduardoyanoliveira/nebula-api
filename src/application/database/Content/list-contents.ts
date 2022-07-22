import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { IContentDTO } from "../../DTOs/Content/content-dto";
import { IContentRepository } from "../../repositories/Content/content-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IListContents extends Pick<IContentRepository, 'list'>{};

export class ListContents implements IListContents{

    constructor(
        private ContentDTO: IContentDTO
    ){};

    async list(filters): Promise<Result<Content[]>> {

        const response = await prismaClient.content.findMany({
            where:filters,
            include:{
                subject:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        });

        const contents : Content[] = [];

        response.forEach((content) => {
            contents.push(this.ContentDTO.dataToContent(content));
        });

        return Result.ok<Content[]>(contents);
    };
};