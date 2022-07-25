import { Rank } from "../../../../domain/entities/Rank";
import { Subject } from "../../../../domain/entities/Subject";
import { Role, User } from "../../../../domain/entities/User";
import { InMemoryListRanksBySubjectRepository, inMemoryRanks } from "../../../../tests/repositories/Rank/in-memory-rank-repository";
import { InMemoryFindSubjectByIdRepository, inMemorySubjects } from "../../../../tests/repositories/Subject/in-memory-subject-repo";
import { ListRanksBySubjectService } from "./list-ranks-by-subject-service";

describe('List ranks by subject service', () => {

    const findSubjectByIdRepository = new InMemoryFindSubjectByIdRepository();
    const listRanksBySubjectRepository = new InMemoryListRanksBySubjectRepository();
    const service = new ListRanksBySubjectService(findSubjectByIdRepository, listRanksBySubjectRepository);

    beforeAll(async () => {
        
        const subject = Subject.create({
            name: 'test-subject'
        }, 'fake-subject-id');

        const subject_two = Subject.create({
            name: 'test-subject-two'
        });


        const user_one = User.create({
            username: 'test',
            email: 'test@test.com',
            password: '@E2t12',
            role: Role.ADMIN
        });

        const user_two = User.create({
            username: 'test_two',
            email: 'test@two.com',
            password: '@E2t12',
            role: Role.USER
        });

        inMemorySubjects.push(subject);

        const rank_one = Rank.create({
            user: user_one,
            subject: subject,
            points: 20
        });

        const rank_two = Rank.create({
            user: user_two,
            subject: subject,
            points: 500
        });

        const rank_three = Rank.create({
            user: user_one,
            subject: subject_two,
            points: 500
        });

        const rank_four = Rank.create({
            user: user_two,
            subject: subject_two,
            points: 500
        });


        inMemoryRanks.push(rank_one);
        inMemoryRanks.push(rank_two);
        inMemoryRanks.push(rank_three);
        inMemoryRanks.push(rank_four);

    });

    it('should fail if the subject does not exist', async () =>{
        const response = await service.execute({
            subject_id: 'random-id'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should list the subject rank', async () =>{

        const response = await service.execute({
            subject_id: 'fake-subject-id'
        });

        expect(response.isSuccess).toBeTruthy();

        expect(response.getValue().length).toBe(2);
    });

});