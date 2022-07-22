import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { IContentRepository } from "../../repositories/Content/content-repository";
import { prismaClient } from "../prisma/prismaClient";

interface ICreateContent extends Pick<IContentRepository, 'create'>{};

export class CreateContent implements ICreateContent{

    async create(content: Content): Promise<Result<Content>> {
        
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