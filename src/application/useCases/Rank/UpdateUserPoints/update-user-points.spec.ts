import { UpdateUserPointsService } from "./update-user-points-service";
import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../../tests/repositories/User/in-memory-user-repo';
import { InMemorySubjectRepo } from '../../../../tests/repositories/Subject/in-memory-subject-repo';
import { InMemoryRankRepository } from '../../../../tests/repositories/Rank/in-memory-rank-repository';

import { generateRandomUser } from '../../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../../tests/generate-random-subject';
import { Rank } from "../../../../domain/entities/Rank";
import { Result } from "../../../../core/Result";

describe('Update user points', () => {

    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const subjectRepository = new InMemorySubjectRepo();
    const rankRepository = new InMemoryRankRepository();

    const service = new UpdateUserPointsService(findUserByIdRepository, subjectRepository, rankRepository);

    const userThatExists = generateRandomUser();
    const subjectThatExists = generateRandomSubject();

    const rank = Rank.create({
        user: userThatExists,
        subject: subjectThatExists,
        points: 50
    });

    inMemoryUsers.push(userThatExists);
    subjectRepository.subjects.push(subjectThatExists);
    rankRepository.ranks.push(rank);

    afterAll(() => {
        rankRepository.ranks = [];
    });

    it('should fail if the user does not exists', async ()=> {
        const response : Result<Rank> = await service.execute({
            user_id: 'fake-id',
            subject_id: subjectThatExists.id,
            points: 70
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should fail if the subject does not exists', async ()=> {
        const response : Result<Rank> = await service.execute({
            user_id: userThatExists.id,
            subject_id: 'fake-id',
            points: 200
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to update the user points', async ()=> {

        const response : Result<Rank> = await service.execute({
            user_id: userThatExists.id,
            subject_id: subjectThatExists.id,
            points: 700
        });

        expect(response.isSuccess).toBeTruthy();
    });
});