interface IUserCredentialsProps{
    id: string,
    username: string,
    email: string,
    is_active: boolean,
    photo?: string,
    role: string,
    token: string
};

export class UserCredentials{

    public id: string;
    public username: string;
    public email: string;
    public role: string;
    public is_active: boolean;
    public photo?: string;
    public token: string;

    private constructor({ id, username, email, role, is_active, photo, token} : IUserCredentialsProps){
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.is_active = is_active;
        this.photo = photo;
        this.token = token;
    };

    static create(props: IUserCredentialsProps){
        const userCredentials = new UserCredentials(props);

        return userCredentials;
    };
};