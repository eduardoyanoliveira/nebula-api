import { generateRandomUser } from '../../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../../tests/generate-random-subject';
import { generateRandomQuestion } from '../../../../tests/generate-random-question';
import { generateRandomAnswer } from '../../../../tests/generate-random-answer';
import { inMemoryQuestions } from '../../../../tests/repositories/Question/in-memory-question-repository';
import { InMemoryFindAnswerByIdRepository, InMemoryUpdateAnswerRepository, inMemoryAnswers } from '../../../../tests/repositories/Answer/in-memory-answer-repository';
import { UpdateAnswerService } from './update-answer-service';
import { Answer } from '../../../../domain/entities/Interactions/Answer';
import { Result } from '../../../../core/Result';

describe( 'Update answer service' ,() =>{

    const findAnswerByIdRepository = new InMemoryFindAnswerByIdRepository();
    const updateAnswerRepository = new InMemoryUpdateAnswerRepository();

    const service = new UpdateAnswerService(findAnswerByIdRepository, updateAnswerRepository);
    
    const question_user = generateRandomUser();
    const answer_user = generateRandomUser();

    const subject = generateRandomSubject();

    const question = generateRandomQuestion(question_user, subject);

    const answer = generateRandomAnswer(answer_user, question);

    inMemoryQuestions.push(question);
    inMemoryAnswers.push(answer);

    it('should fail if the answer does not exist', async () => {

        const response : Result<Answer> = await service.execute({
            answer_id: 'fake-wrong-id',
            user_id: answer_user.id,
            text: 'fake text'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should fail if the user is not the author of the answer', async () => {

        const response : Result<Answer> = await service.execute({
            answer_id: answer.id,
            user_id: 'asr4235tw40-q-255wa',
            text: 'fake text'
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('Only the user author of the answer can update it');
    });
    
    it('should be able to update the answer', async () => {

        const response : Result<Answer> = await service.execute({
            answer_id: answer.id,
            user_id: answer_user.id,
            text: 'fake text'
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().props.text).toBe('fake text');
    });
});