import { DataToUser, IDataToUser } from './data-to-user';
import { IUserToResponse, UserToResponse } from './user-to-response';

export interface IUserDTO extends IDataToUser, IUserToResponse{};

export class UserDTO implements IUserDTO {

    public dataToUser;
    public userToResponse;

    constructor(){
        this.dataToUser = new DataToUser().dataToUser;
        this.userToResponse = new UserToResponse().userToResponse;
    };
};