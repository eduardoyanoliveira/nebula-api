import { Request, Response } from 'express';
import { RemoveLikeService } from './remove-like-service';

export class RemoveLikeController {
    constructor(
        private RemoveLikeService: RemoveLikeService
    ){};

    async handle(req: Request, res: Response){
        const answerId  = req.params.id;
        const userId = req.user_id;

        const response = await this.RemoveLikeService.execute({
            answerId,
            userId
        });

        if(response.isFailure) throw new Error(response.error);

        return res.json({ message: response.getValue()})
    };
};