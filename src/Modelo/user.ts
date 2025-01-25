export class user {
    private userID: string;
    private username: string;
    private email: string;
    private password: string;

    constructor (userID: string, username: string, email: string, password: string) {
        this.userID = userID;
        this.username = username,
        this.email = email,
        this.password = password
    }
}
