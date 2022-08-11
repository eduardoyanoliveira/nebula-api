import { Subject } from "../../entities/Subject";
import { SubjectFactory } from "./factory-class";

describe('Subject factory', () => {

    const subjectFactory = new SubjectFactory();

    it('should be able to create a subject', () => {
        const subject = subjectFactory.create('test_subject');
       
        expect(subject).toBeTruthy();
        expect(subject).toBeInstanceOf(Subject);
    });
});