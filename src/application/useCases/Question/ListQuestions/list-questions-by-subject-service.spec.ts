import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { generateRandomQuestion } from "../../../../tests/generate-random-question";
import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { InMemoryQuestionRepository } from "../../../../tests/repositories/Question/in-memory-question-repository";
import { InMemorySubjectRepo } from "../../../../tests/repositories/Subject/in-memory-subject-repo";
import { ListQuestionsService } from "./list-questions-service";


describe('Get question service', () => {

    const subjectRepository = new InMemorySubjectRepo();
    const questionRepository = new InMemoryQuestionRepository();
    const service = new ListQuestionsService(questionRepository);

    const randomUser = generateRandomUser();
    const randomSubjectOne = generateRandomSubject();
    const randomSubjectTwo = generateRandomSubject();

    const question_one = generateRandomQuestion(randomUser, randomSubjectOne);
    const question_two = generateRandomQuestion(randomUser, randomSubjectOne);
    const question_three = generateRandomQuestion(randomUser, randomSubjectTwo);

    questionRepository.questions.push(question_one);
    questionRepository.questions.push(question_two);
    questionRepository.questions.push(question_three);

    subjectRepository.subjects.push(randomSubjectOne);
    subjectRepository.subjects.push(randomSubjectTwo);

    afterAll(() => {
        questionRepository.questions = [];
        subjectRepository.subjects = [];
    });


    it('should be able to get a list of question', async () => {

        const response : Result<Question[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(3);
    });
});