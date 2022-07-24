import { GenerateUserRanksService } from "./generate-user-ranks-service";
import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../../tests/repositories/User/in-memory-user-repo';
import { InMemorySubjectRepo } from '../../../../tests/repositories/Subject/in-memory-subject-repo';
import { InMemoryRankRepository } from "../../../../tests/repositories/Rank/in-memory-rank-repository";

import { generateRandomUser } from '../../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../../tests/generate-random-subject';


describe('Generate ranks with user service', () => {

    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const subjectRepository = new InMemorySubjectRepo();
    const rankRepository = new InMemoryRankRepository();

    const service = new GenerateUserRanksService(findUserByIdRepository, subjectRepository, rankRepository);

    const user = generateRandomUser();
    const subject_one = generateRandomSubject();
    const subject_two = generateRandomSubject();

    inMemoryUsers.push(user);
    subjectRepository.subjects.push(subject_one);
    subjectRepository.subjects.push(subject_two);

    afterAll(() => {
        subjectRepository.subjects = [];
    });

    it('should fail with the user does not exist', async () => {

        const response = await service.execute({
            user_id: 'user-id'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('sould be able to genereta a rank with the user for each existing subject', async () => {

        const response = await service.execute({
            user_id: user.id
        });

        expect(response.isSuccess).toBeTruthy();

    });

});