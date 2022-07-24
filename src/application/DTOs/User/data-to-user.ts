import { Role, User } from "../../../domain/entities/User";
import { IUserDataProps } from "./interfaces";

export interface IDataToUser {
    transform(userData: IUserDataProps): User
};

export class DataToUser implements IDataToUser{
    transform(userData: IUserDataProps): User{
        const { id, ...rest } = userData;
    
        const props = {
            ...rest,
            role: Role[rest.role]
        }
    
        return User.create(props, id);
    };
};
