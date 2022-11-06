import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";
import { generateRandomQuestion } from "../../../tests/generators/generate-random-question";
import { generateRandomSubject } from "../../../tests/generators/generate-random-subject";
import { generateRandomUser } from "../../../tests/generators/generate-random-user";
import { InMemoryListQuestionsRepository, inMemoryQuestions } from "../../../tests/repositories/Question/in-memory-question-repository";
import { inMemorySubjects } from "../../../tests/repositories/Subject/in-memory-subject-repo";
import { ListQuestionsService } from "./list-questions-service";


describe('Get question service', () => {

    const listQuestionsRepository = new InMemoryListQuestionsRepository();
    const service = new ListQuestionsService(listQuestionsRepository);

    const randomUser = generateRandomUser();
    const randomSubjectOne = generateRandomSubject();
    const randomSubjectTwo = generateRandomSubject();

    const question_one = generateRandomQuestion(randomUser, randomSubjectOne);
    const question_two = generateRandomQuestion(randomUser, randomSubjectOne);
    const question_three = generateRandomQuestion(randomUser, randomSubjectTwo);

    inMemoryQuestions.push(question_one);
    inMemoryQuestions.push(question_two);
    inMemoryQuestions.push(question_three);

    inMemorySubjects.push(randomSubjectOne);
    inMemorySubjects.push(randomSubjectTwo);


    it('should be able to get a list of question', async () => {

        const response : Result<Question[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(3);
    });
});