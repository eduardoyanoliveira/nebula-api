import { IUserRepository } from "../../repositories/User/user-repository";
import { CreateUser } from './create-user';
import { UpdateUser } from "./update-user";
import { FindUserById } from "./find-user-by-id";
import { FindUserByEmail } from "./find-user-by-email";
import { ListUsers } from "./list-users";
import { IUserDTO } from "../../DTOs/User/user-dto";


export class UserRepository implements IUserRepository {

    public create;
    public update;
    public findById;
    public findByEmail;
    public list;

    constructor(
        private UserDTO: IUserDTO
    ){
        this.create = new CreateUser().create;
        this.update = new UpdateUser().update;
        this.findById = new FindUserById(this.UserDTO).findById;
        this.findByEmail = new FindUserByEmail(this.UserDTO).findByEmail;
        this.list = new ListUsers(this.UserDTO).list;
    };

};
