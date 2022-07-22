import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { IContentRepository } from "../../repositories/Content/content-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IUpdateContent extends Pick<IContentRepository, 'update'>{};

export class UpdateContent implements IUpdateContent{
    
    async update(content: Content): Promise<Result<Content>> {
        
        try{
            await prismaClient.content.update({
                where:{
                    id: content.id,
                },
                data:{
                    description: content.props.description,
                    url: content.props.url,
                    subject_id: content.props.subject.id
                }
            });

            return Result.ok<Content>(content);
        }catch(err){
            return Result.fail<Content>(err.message);
        };  
    }; 
};