import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './Usuario/user.service';
import { map, Observable } from 'rxjs';
import { SharedFile } from 'src/Modelo/SharedFile';
import { FileModel } from 'src/Modelo/FileModel';

@Injectable({
  providedIn: 'root'
})
export class SharedFilesService {

  private apiShareUrl = 'https://localhost:7217/api/UserFile';
  private tokenKey = 'authToken';

constructor(private http: HttpClient, private userService: UserService) { }

getSharedFiles() : Observable<SharedFile[]> {
  const userId = this.userService.obtenerUsuarioID();
  console.log('User ID:', userId); 

  if (!userId) {
    throw new Error('No se pudo obtener el userId.');
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
  });

  return this.http.get<any[]>(`${this.apiShareUrl}/user/${userId}`, { headers }).pipe(
    map(response => {
      console.log('Respuesta cruda del servidor:', response);
      return response.map(fileData => 
        new SharedFile(
          fileData.userFileID,
          fileData.fileID,
          fileData.fileName,
          fileData.ownerName,
          fileData.sharedDate
        )
      );
    }));
  }

  revokeAccess(userFileId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
    });
  
    const url = `${this.apiShareUrl}/${userFileId}/revoke`;
    console.log('Revoke URL:', url);
  
    return this.http.delete(url, { headers });
  }
}
