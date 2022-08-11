import { User } from "../domain/entities/User";
import { UserFactory } from "../domain/factories/User/factory-class";
import { getRandomNumberMax } from '../utils/random-number/random-number-max';

const userFactory = new UserFactory();

const user_one = userFactory.create('USER', 'user_one', 'user@one.com', 'One@123');
const user_two= userFactory.create('USER', 'user_two', 'user@two.com', 'Two@123');
const user_three = userFactory.create('USER', 'user_three', 'user@three.com', 'Three@123');
const user_four = userFactory.create('USER', 'user_four', 'user@four.com', 'Four@123');

const admin_one = userFactory.create('ADMIN', 'admin_one', 'admin@one.com', 'ADone@123');
const admin_two = userFactory.create('ADMIN', 'admin_two', 'admin@two.com', 'ADtwo@123');
const admin_three = userFactory.create('ADMIN', 'admin_three', 'admin@three.com', 'ADthree@123');
const admin_four = userFactory.create('ADMIN', 'admin_four', 'admin@four.com', 'ADfour@123');

const users : User[] = [
    user_one,
    admin_one,
    user_two,
    admin_two,
    user_three,
    admin_three,
    user_four,
    admin_four
];

export const generateRandomUser = () : User => {

    const randomNumber = getRandomNumberMax(users.length -1 );
    return users[randomNumber];
};
