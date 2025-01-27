import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FileModel } from 'src/Modelo/FileModel';
import { User } from 'src/Modelo/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'https://localhost:7217/api/File/';
  private apiShareUrl = 'https://localhost:7217/api/UserFile';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private userService: UserService) { }

  getFiles() : Observable<FileModel[]> {
    const userId = this.userService.obtenerUsuarioID();
    console.log('User ID:', userId);  // Verifica si el userId es correcto
  
    if (!userId) {
      throw new Error('No se pudo obtener el userId.');
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
  
    return this.http.get<any[]>(`${this.apiUrl}user/${userId}`, { headers }).pipe(
      map(response => response.map(fileData => 
        new FileModel(
          fileData.fileID, 
          fileData.fileName, 
          fileData.filePath, 
          fileData.fileSize, 
          fileData.createdDate, 
          fileData.isDeleted, 
          fileData.ownerID
        )
      ))
    );
  }


  getFile(fileId: string): Observable<FileModel> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
  
    return this.http.get<any>(`${this.apiUrl}${fileId}`, { headers }).pipe(
      map(fileData =>  
        new FileModel(
          fileData.fileID, 
          fileData.fileName, 
          fileData.filePath, 
          fileData.fileSize, 
          fileData.createdDate, 
          fileData.isDeleted, 
          fileData.ownerID
        )
      ));
  }

  downloadFile(fileId: string): Observable<Blob> {
    console.log(fileId);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  
    console.log(`URL para descarga: ${this.apiUrl}download/${fileId}`);

    return this.http.get(`${this.apiUrl}download/${fileId}`, {
      headers,
      responseType: 'blob', // Indicamos que esperamos un archivo (Blob)
    });
  }
  
  recycle(fileId: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  
    console.log(`URL para eliminar: ${this.apiUrl}remove/${fileId}`);
  
    return this.http.delete<string>(`${this.apiUrl}remove/${fileId}`, { headers, responseType: 'text' as 'json' }).pipe(
      map(response => response)  // Aquí solo devolvemos el mensaje de respuesta
    );
  }

  restore(fileId: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  
    console.log(`URL para eliminar: ${this.apiUrl}restore/${fileId}`);
  
    return this.http.patch<string>(`${this.apiUrl}restore/${fileId}`, {}, { headers, responseType: 'text' as 'json' });
  }
  
  delete(fileId: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  
    console.log(`URL para eliminar: ${this.apiUrl}${fileId}`);
  
    return this.http.delete<string>(`${this.apiUrl}${fileId}`, { headers, responseType: 'text' as 'json' });
  }

  uploadFile(file: File, folderPath: string, ownerId: string): Observable<any> {
    const formData = new FormData();
    formData.append('UploadedFile', file, file.name); // Campo para el archivo
    formData.append('FolderPath', folderPath || ''); // Campo opcional para la ruta
    formData.append('OwnerID', ownerId); // ID del propietario
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  
    return this.http.post(`${this.apiUrl}`, formData, { headers });
  }

  shareFile(fileId: string, email: string): Observable<any> {
    const formData = new FormData();
    
    // Añadir datos al FormData
    formData.append('FileID', fileId);
    formData.append('Email', email);
    formData.append('PermissionType', '1'); // Asegúrate de que PermissionType sea un string o número según lo que espera el servidor
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  
    console.log('Datos enviados para compartir:', {
      fileId,
      email,
      PermissionType: 1
    });
  
    return this.http.post(`${this.apiShareUrl}`, formData, { headers });
  }
  
}