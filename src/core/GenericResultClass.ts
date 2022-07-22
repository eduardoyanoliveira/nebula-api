export class GenericResultClass {
    public response : string;

    private constructor(
        response: string
    ){
        this.response = response;
    };

    static create(response : string){
        return new GenericResultClass(response);
    };
};
