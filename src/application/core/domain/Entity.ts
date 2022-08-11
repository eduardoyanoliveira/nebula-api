import crypto from 'crypto';

abstract class Entity<T>{
    protected _id: string;
    public props: T;


    get id(){
        return this._id;
    };

    constructor(props : T,id?: string){
        this._id = id ?? crypto.randomUUID();
        this.props = props;
    };
};

export { Entity };