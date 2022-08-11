import { Result } from "../../core/Result";
import { Content } from "../../domain/entities/Content";
import { IUpdateContentRepository } from "../../repositories/Content/content-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class UpdateContentRepository implements IUpdateContentRepository{
    
    async execute(content: Content): Promise<Result<Content>> {
        
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