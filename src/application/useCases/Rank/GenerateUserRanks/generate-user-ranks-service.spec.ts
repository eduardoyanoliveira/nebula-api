import { GenerateUserRanksService } from "./generate-user-ranks-service";
import { InMemoryUserRepository } from '../../../../tests/repositories/User/in-memory-user-repo';
import { InMemorySubjectRepo } from '../../../../tests/repositories/Subject/in-memory-subject-repo';
import { InMemoryRankRepository } from "../../../../tests/repositories/Rank/in-memory-rank-repository";

import { generateRandomUser } from '../../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../../tests/generate-random-subject';


describe('Generate ranks with user service', () => {

    const userRepository = new InMemoryUserRepository();
    const subjectRepository = new InMemorySubjectRepo();
    const rankRepository = new InMemoryRankRepository();

    const service = new GenerateUserRanksService(userRepository, subjectRepository, rankRepository);

    const user = generateRandomUser();
    const subject_one = generateRandomSubject();
    const subject_two = generateRandomSubject();

    userRepository.users.push(user);
    subjectRepository.subjects.push(subject_one);
    subjectRepository.subjects.push(subject_two);

    afterAll(() => {
        userRepository.users = [];

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