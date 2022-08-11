import { generateRandomUser } from '../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../tests/generate-random-subject';
import { generateRandomQuestion } from '../../../tests/generate-random-question';
import { generateRandomAnswer } from '../../../tests/generate-random-answer';
import { inMemoryQuestions } from '../../../tests/repositories/Question/in-memory-question-repository';
import { InMemoryListAnswersRepository, inMemoryAnswers } from '../../../tests/repositories/Answer/in-memory-answer-repository';
import { ListAnswersService } from './list-answers-service';
import { Answer } from '../../../domain/entities/Interactions/Answer';
import { Result } from '../../../core/Result';

describe('List answers service', () => {

    const listAnswersRepository = new InMemoryListAnswersRepository();

    const service = new ListAnswersService(listAnswersRepository);
    
    const question_user = generateRandomUser();
    const answer_user = generateRandomUser();

    const subject = generateRandomSubject();

    const question = generateRandomQuestion(question_user, subject);

    const answer = generateRandomAnswer(answer_user, question);
    const answer_two = generateRandomAnswer(answer_user, question);


    inMemoryQuestions.push(question);
    inMemoryAnswers.push(answer);
    inMemoryAnswers.push(answer_two);


    it('should return a list of answer', async () => {

        const response : Result<Answer[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(2);
    });

});