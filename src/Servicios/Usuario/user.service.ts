import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { user } from 'src/Modelo/User';

@Injectable(
    {providedIn: 'root'}
)
export class UserService {

    private apiUrl = 'https://localhost:7217/api/User/';
    private tokenKey = 'authToken';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<string>{
        const body = { 
            "email": email,
            "password": password
        }
        return this.http.post<any>(`${this.apiUrl}Login`, body);
    }

    register(email: string, password: string): Observable<user>{
        const body = { 
            "email": email,
            "password": password,
            "roles": ["User"]
        }
        return this.http.post<any>(`${this.apiUrl}Register`, body).pipe(
            map(response => new user(response.userID, response.Username, response.email))
        );
    }

     // Método para obtener el token almacenado
    obtenerToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

  // Método para guardar el token
    guardarToken(token: string): void {
        console.log(token);
        localStorage.setItem(this.tokenKey, token);
    }

  // Método para eliminar el token (logout)
    eliminarToken(): void {
        localStorage.removeItem(this.tokenKey);
    }
}
