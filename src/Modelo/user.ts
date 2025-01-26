export class User {

    private _userID: string;
    private _userName: string;
    private _email: string;
    private _password: string;

    constructor (userID: string, userName: string, email: string) {
        this._userID = userID;
        this._userName = userName,
        this._email = email,
        this._password = '';
    }

    public get userID(): string {
        return this._userID;
    }

    public get userName() : string {
        return this._userName;
    }
    
    
    public get email() : string {
        return this._email;
    }
    
}
