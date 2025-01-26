import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { File } from 'src/Modelo/File';
import { User } from 'src/Modelo/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'https://localhost:7217/api/File/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private userService: UserService) { }

  getFiles() : Observable<File[]> {
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
        new File(
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
  
}