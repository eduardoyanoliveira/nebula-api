import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";
import { generateRandomSubject } from "../../../tests/generators/generate-random-subject";
import { generateRandomQuestion} from '../../../tests/generators/generate-random-question';
import { InMemoryFindQuestionByIdRepository, InMemoryUpdateQuestionRepository, inMemoryQuestions } from "../../../tests/repositories/Question/in-memory-question-repository";
import { InMemoryFindSubjectByIdRepository, inMemorySubjects } from "../../../tests/repositories/Subject/in-memory-subject-repo";
import { UpdateQuestionService } from "./update-question-service";
import { generateRandomUser } from "../../../tests/generators/generate-random-user";

describe('Update question service', () => {

    const findSubjectByIdRepository = new InMemoryFindSubjectByIdRepository();
    const findQuestionByIdRepository = new InMemoryFindQuestionByIdRepository();
    const updateQuestionRepository = new InMemoryUpdateQuestionRepository();

    const service = new UpdateQuestionService(
        findQuestionByIdRepository,
        findSubjectByIdRepository,
        updateQuestionRepository
    );

    const user = generateRandomUser();
    const subject = generateRandomSubject();
    const other_subject = generateRandomSubject();

    const questionThatExists = generateRandomQuestion(user, subject);

    inMemorySubjects.push(subject);
    inMemorySubjects.push(other_subject);
    inMemoryQuestions.push(questionThatExists);

    
    it('should fail if the question does not exists', async () => {

        const response: Result<Question> = await service.execute({
            id: 'fake-wrong-id',
            user_id: user.id,
            title: 'new title',  
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should fail if the user trying to update is not author of the question', async () => {

        const response: Result<Question> = await service.execute({
            id: questionThatExists.id,
            user_id: 'fake-wrong-id',
            title: 'new title',  
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('Only the users who has created the question can update it');
    });


    it('should fail if the subject does not exists', async () => {

        const response: Result<Question> = await service.execute({
            id: questionThatExists.id,
            user_id: user.id,
            subject_id: 'fake-wrong-id',  
        });

        expect(response.isFailure).toBeTruthy();
    });


    it("should be able to update the question's subject", async () => {

        const response: Result<Question> = await service.execute({
            id: questionThatExists.id,
            user_id: user.id,
            subject_id: other_subject.id,  
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().props.subject.id).toBe(other_subject.id);
    });
});