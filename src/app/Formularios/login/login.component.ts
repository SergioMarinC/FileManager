import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/Servicios/Usuario/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    const {email, password} = this.loginForm.value;

    this.login(email, password);
    this.router.navigate(['/mis-documentos']);
  }

  login(email: string, password: string): void {
    this.userService.login(email, password).subscribe({
      next: (response: any) => { 
        const token = response.jwtToken;
        if (token) {
          this.userService.guardarToken(token);
          console.error('El token no se encuentra en la respuesta');
        }
      },
      error: (err) => {
        console.error('Error en el login', err);
      }
    });
  }  
}
