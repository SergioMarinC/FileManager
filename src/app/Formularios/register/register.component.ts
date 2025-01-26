import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/Modelo/User';
import { UserService } from 'src/Servicios/Usuario/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  registerForm: FormGroup;
  
    constructor(private userService: UserService, private router: Router){
      this.registerForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
    }
  
    onSubmit(){
      const {email, password} = this.registerForm.value;
      this.register(email, password);
    }
  
    register(email: string, password: string): void{
      this.userService.register(email, password).subscribe({
        next: (response: User) => {
          console.log('Usuario registrado: ', response.userID);
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          // Manejo de error, si el login falla
          console.error('Error en el register', err);
        }
      });
    }
}
