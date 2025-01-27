export class SharedFile {

    private _userFileID: number;
    private _fileID: string;
    private _fileName: string;
    private _ownerName: string;
    private _sharedDate: Date; 
  
    constructor(UserFileID: number, FileID: string, FileName: string, OwnerName: string, SharedDate: Date) 
    {
      this._userFileID = UserFileID;
      this._fileID = FileID;
      this._fileName = FileName;
      this._ownerName = OwnerName;
      this._sharedDate = new Date(SharedDate);
    }

    public get UserFileID(): number {
        return this._userFileID;
    }
    public get FileID(): string {
        return this._fileID;
    }
    public get FileName(): string {
        return this._fileName;
    }
    public get OwnerName(): string {
        return this._ownerName;
    }
    public get SharedDate(): Date {
        return this._sharedDate;
    }
}
