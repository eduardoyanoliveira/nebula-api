import { generateRandomUser } from '../../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../../tests/generate-random-subject';
import { generateRandomQuestion } from '../../../../tests/generate-random-question';
import { generateRandomAnswer } from '../../../../tests/generate-random-answer';
import { InMemoryQuestionRepository } from '../../../../tests/repositories/Question/in-memory-question-repository';
import { InMemoryAnswerRepository } from '../../../../tests/repositories/Answer/in-memory-answer-repository';
import { ListAnswersService } from './list-answers-service';
import { Answer } from '../../../../domain/entities/Interactions/Answer';
import { Result } from '../../../../core/Result';

describe('List answers service', () => {
    const questionRepository = new InMemoryQuestionRepository();
    const answerRepository = new InMemoryAnswerRepository();

    const service = new ListAnswersService(answerRepository);
    
    const question_user = generateRandomUser();
    const answer_user = generateRandomUser();

    const subject = generateRandomSubject();

    const question = generateRandomQuestion(question_user, subject);

    const answer = generateRandomAnswer(answer_user, question);
    const answer_two = generateRandomAnswer(answer_user, question);


    questionRepository.questions.push(question);
    answerRepository.answers.push(answer);
    answerRepository.answers.push(answer_two);

    afterAll(() =>{
        questionRepository.questions = [];
        answerRepository.answers = [];
    });

    it('should return a list of answer', async () => {

        const response : Result<Answer[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(2);
    });

});