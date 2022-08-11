import { ContentFactory } from "./factory-class";
import { generateRandomSubject } from '../../../tests/generate-random-subject';
import { Content } from "../../entities/Content";

describe(' Content factory class ', () => {

    const factory = new ContentFactory();

    it('should be able to create a new content', () => {
        const subject = generateRandomSubject();

        const content = factory.create('test_cotnent', 'http://url/test.com', subject);

        expect(content).toBeTruthy();
        expect(content).toBeInstanceOf(Content);
    });

    it('should be able to create a new content', () => {
        const subject = generateRandomSubject();

        const content = factory.create('cotnent', 'http://url/test.com', subject);

        expect(content).toBeTruthy();
        expect(content).toBeInstanceOf(Content);
    });


    it('should be able to create a new content', () => {
        const subject = generateRandomSubject();

        const content = factory.create('cotnent_pro', 'http://url/test.com', subject);

        expect(content).toBeTruthy();
        expect(content).toBeInstanceOf(Content);
    });


    it('should be able to create a new content', () => {
        const subject = generateRandomSubject();

        const content = factory.create('cotnent_rank', 'http://url/test.com', subject);

        expect(content).toBeTruthy();
        expect(content).toBeInstanceOf(Content);
    });


    it('should be able to create a new content', () => {
        const subject = generateRandomSubject();

        const content = factory.create('test_cotnent_test', 'http://url/test.com', subject);

        expect(content).toBeTruthy();
        expect(content).toBeInstanceOf(Content);
    });
});