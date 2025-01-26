import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/Modelo/User';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  private apiUrl = 'https://localhost:7217/api/User/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    const body = { 
      "email": email,
      "password": password
    };
    return this.http.post<any>(`${this.apiUrl}Login`, body);
  }

  register(email: string, password: string): Observable<User> {
    const body = { 
      "email": email,
      "password": password,
      "roles": ["User"]
    };
    return this.http.post<any>(`${this.apiUrl}Register`, body).pipe(
      map(response => new User(response.userID, response.Username, response.email))
    );
  }

  // Método para obtener el token almacenado
  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  guardarToken(token: string): void {
  console.log('Token recibido:', token);  // Verifica el token recibido
  if (typeof token === 'string') {
    localStorage.setItem(this.tokenKey, token);
    console.log('Token guardado:', localStorage.getItem(this.tokenKey));  // Verifica que el token se guardó correctamente
  } else {
    console.error('El token no es una cadena válida');
  }
}


  // Método para eliminar el token (logout)
  eliminarToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  // Método para obtener el userID desde el token JWT
  obtenerUsuarioID(): string | null {
    const token = this.obtenerToken();
  
    // Verifica que el token no esté vacío
    if (!token) {
      console.error('No se encontró el token.');
      return null;
    }
  
    // Verifica si el token tiene la estructura adecuada
    if (token.split('.').length === 3) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.sub) { // Aquí cambiamos a 'sub'
          return decodedToken.sub; // Devuelve el userID
        } else {
          console.error('El token no contiene el userID.');
          return null;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    } else {
      console.error('Token inválido o mal formado:', token);
      return null;
    }
  }
  

  obtenerDatosUsuario(): Observable<User> {
    const userId = this.obtenerUsuarioID();
    if (!userId) {
      throw new Error('No se pudo obtener el ID del usuario del token.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    return this.http.get<any>(`${this.apiUrl}${userId}`, {
      headers
    }).pipe(
      map(response =>
        new User(
          response.userID,
          response.username,
          response.email
        )
      ));
  }


  updateUser(userName: string, email: string): Observable<User> {

    const userId = this.obtenerUsuarioID();
    if (!userId) {
      throw new Error('No se pudo obtener el ID del usuario del token.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    return this.http.put<any>(`${this.apiUrl}${userId}`, {
      username: userName,
      email: email
    },{ headers }).pipe(
      map(response =>
        new User(
          response.userID,
          response.username,
          response.email
        )
      ));
  }

  updatePassword(password: string): Observable<User> {

    const userId = this.obtenerUsuarioID();
    if (!userId) {
      throw new Error('No se pudo obtener el ID del usuario del token.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    return this.http.put<any>(`${this.apiUrl}${userId}`, {
      password: password
    },{ headers }).pipe(
      map(response =>
        new User(
          response.userID,
          response.username,
          response.email
        )
      ));
  }

  deleteUser( password: string): Observable<string> {
    const userId = this.obtenerUsuarioID();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    return this.http.delete(`${this.apiUrl}${userId}`, {
      headers,
      body: {password},
      responseType: 'text'
    });
  }
}