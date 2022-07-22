import { User } from "../../../domain/entities/User";
import { IUserDataProps } from "./interfaces";


export interface IUserToResponse {
    userToResponse(user: User):  Omit<IUserDataProps, 'password'>
};

export class UserToResponse implements IUserToResponse {

    userToResponse(user: User): Omit<IUserDataProps, 'password'> {
        
        const { id, props } = user;

        const { password, ...rest } = props;

        const response = {
            id,
            ...rest
        };

        return response;
    };
};