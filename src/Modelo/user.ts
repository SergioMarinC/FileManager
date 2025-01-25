export class user {

    private _userID: string;
    private _username: string;
    private _email: string;
    private _password: string;

    constructor (userID: string, username: string, email: string) {
        this._userID = userID;
        this._username = username,
        this._email = email,
        this._password = '';
    }

    public get userID(): string {
        return this._userID;
    }
    // public set userID(value: string) {
    //     this._userID = value;
    // }
    // public get username(): string {
    //     return this._username;
    // }
    // public set username(value: string) {
    //     this._username = value;
    // }
    // public get email(): string {
    //     return this._email;
    // }
    // public set email(value: string) {
    //     this._email = value;
    // }
    // public get password(): string {
    //     return this._password;
    // }
    // public set password(value: string) {
    //     this._password = value;
    // }
}
