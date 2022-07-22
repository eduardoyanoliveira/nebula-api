import { User } from "../../entities/User";
import { UserFactory } from "./factory-class";

describe('Create user factory', () => {
    const userFactory = new UserFactory();

    it('should create an admin user', () => {

        const user = userFactory.create('ADMIN', 'test', 'test@test.com', 'E@test3');

        expect(user).toBeInstanceOf(User);
        expect(user.props.role).toBe('ADMIN')
    });


    it('should create a normal user', () => {
        
        const user = userFactory.create('USER', 'test', 'test@test.com', 'E@test3');

        expect(user).toBeInstanceOf(User);
        expect(user.props.role).toBe('USER')
    });

});