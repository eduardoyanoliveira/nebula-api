import { Role, User } from "../../../domain/entities/User";
import { IUserDataProps } from "./interfaces";

export interface IDataToUser {
    dataToUser(userData: IUserDataProps): User
};

export class DataToUser implements IDataToUser{
    dataToUser(userData: IUserDataProps): User{
        const { id, ...rest } = userData;
    
        const props = {
            ...rest,
            role: Role[rest.role]
        }
    
        return User.create(props, id);
    };
};
