interface IUserCredentialsProps{
    user_id: string,
    username: string,
    email: string,
    role: string,
    token: string
};

export class UserCredentials{

    public user_id: string;
    public username: string;
    public email: string;
    public role: string;
    public token: string;

    private constructor({ user_id, username, email, role, token} : IUserCredentialsProps){
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.token = token;
    };

    static create(props: IUserCredentialsProps){
        const userCredentials = new UserCredentials(props);

        return userCredentials;
    };
};