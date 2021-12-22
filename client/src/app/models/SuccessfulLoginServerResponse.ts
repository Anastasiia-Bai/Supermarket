export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:number,       
        public role?:string
    ){}
}