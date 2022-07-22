import { GenerateSubjectRanksService } from "./generate-subject-ranks-service";
import { InMemoryUserRepository } from '../../../../tests/repositories/User/in-memory-user-repo';
import { InMemorySubjectRepo } from '../../../../tests/repositories/Subject/in-memory-subject-repo';
import { InMemoryRankRepository } from "../../../../tests/repositories/Rank/in-memory-rank-repository";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { generateRandomSubject } from "../../../../tests/generate-random-subject";


describe('Generate ranks with user service', () => {

    const userRepository = new InMemoryUserRepository();
    const subjectRepository = new InMemorySubjectRepo();
    const rankRepository = new InMemoryRankRepository();

    const service = new GenerateSubjectRanksService(subjectRepository, userRepository, rankRepository);

    const user_one = generateRandomUser();
    const user_two = generateRandomUser();
    const subject = generateRandomSubject();

    userRepository.users.push(user_one);
    userRepository.users.push(user_two);
    subjectRepository.subjects.push(subject);


    afterAll(() => {
        subjectRepository.subjects = [];
        userRepository.users = [];
    })

    it('should fail with the subject does not exist', async () => {

        const response = await service.execute({
            subject_id: 'fake-id'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('sould be able to genereta a rank with the subject for each existing user', async () => {

        const response = await service.execute({
            subject_id: subject.id
        });

        expect(response.isSuccess).toBeTruthy();
        
    });

});