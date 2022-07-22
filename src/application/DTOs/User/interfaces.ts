import { IUserProps } from "../../../domain/entities/User";

export interface IUserDataProps extends Omit<IUserProps, 'role'>{
    id: string,
    role: string
};

