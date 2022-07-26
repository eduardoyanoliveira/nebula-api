import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { generateRandomQuestion} from '../../../../tests/generate-random-question';
import { InMemoryFindQuestionByIdRepository, InMemoryUpdateQuestionRepository, inMemoryQuestions } from "../../../../tests/repositories/Question/in-memory-question-repository";
import { ChangeQuestionAccessSerivce } from "./change-question-access-service";
import { generateRandomUser } from "../../../../tests/generate-random-user";

describe('Update question service', () => {

    const findQuestionByIdRepository = new InMemoryFindQuestionByIdRepository();
    const updateQuestionRepository = new InMemoryUpdateQuestionRepository();

    const service = new ChangeQuestionAccessSerivce(findQuestionByIdRepository, updateQuestionRepository);

    const user = generateRandomUser();
    const subject = generateRandomSubject();

    const questionThatExists = generateRandomQuestion(user, subject);

    inMemoryQuestions.push(questionThatExists);

    it('should fail if the question does not exists', async () => {

        const response: Result<Question> = await service.execute({
            id: 'fake-wrong-id',
            user_id: user.id,
            is_public: true,  
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should fail if the user trying to update is not author of the question', async () => {

        const response: Result<Question> = await service.execute({
            id: questionThatExists.id,
            user_id: 'fake-wrong-id',
            is_public: true
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('Only the users who has created the question can update it');
    });


    it('should be able to change the question access', async () => {

        const response: Result<Question> = await service.execute({
            id: questionThatExists.id,
            user_id: user.id,
            is_public: true,  
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().props.is_public).toBeTruthy();
    });
});