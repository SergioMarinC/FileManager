export class FileModel {

    private _fileID: string;
    private _fileName: string;
    private _filePath: string;
    private _fileSize: number;
    private _createdDate: Date;
    private _isDeleted: boolean;
    private _ownerID: string;

    constructor(fileId: string, fileName: string, filePath: string, fileSize: number, createdDate: Date, isDeleted: boolean, ownerID: string){
        this._fileID = fileId;
        this._fileName = fileName;
        this._filePath = filePath;
        this._fileSize = fileSize;
        this._createdDate = new Date(createdDate);
        this._isDeleted = isDeleted;
        this._ownerID = ownerID;
    }

    
    public get fileId() : string {
        return this._fileID;
    }

    public get fileName() : string {
        return this._fileName;
    }
    
    public get fileSize() : number {
        return this._fileSize;
    }

    public get createdDate() : Date{
        return this._createdDate;
    }
    
    
    public get isDeleted() : boolean {
        return this._isDeleted;
    }
    
    public toogleIsDeleted() {
        this._isDeleted = !this._isDeleted;
    }
}