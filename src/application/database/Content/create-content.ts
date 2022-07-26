import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { ICreateContentRepository } from "../../repositories/Content/content-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class CreateContentRepository implements ICreateContentRepository{

    async execute(content: Content): Promise<Result<Content>> {
        
        try{
            await prismaClient.content.create({
                data:{
                    id: content.id,
                    description: content.props.description,
                    url: content.props.url,
                    subject_id: content.props.subject.id,
                    created_at: content.props.created_at,
                    updated_at: content.props.updated_at
                }
            });

            return Result.ok<Content>(content);
        }catch(err){
            return Result.fail<Content>(err.message);
        };  
    };
};