import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { IDataToContent } from "../../DTOs/Content/data-to-content";
import { IListContentsRepository } from "../../repositories/Content/content-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class ListContentsRepository implements IListContentsRepository{

    constructor(
        private DataToContent: IDataToContent
    ){};

    async execute(filters): Promise<Result<Content[]>> {

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
            contents.push(this.DataToContent.transform(content));
        });

        return Result.ok<Content[]>(contents);
    };
};