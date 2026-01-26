export interface User{
    name?: string;
    email:string;
    password:string
}

export interface AuthState{
    isLoggedIn: boolean;
    isSuccess:boolean;
    message:string;
    user:null
};

export interface AnalyzeCvProps{
    jobDescription:string
    cvText:string
    cvFile:File | null
}