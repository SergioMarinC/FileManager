import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Formularios/login/login.component';
import { RegisterComponent } from './Formularios/register/register.component';
import { AjustesComponent } from './ContenidoPrincipal/ajustes/ajustes.component';
import { CompartidoConmigoComponent } from './ContenidoPrincipal/compartido-conmigo/compartido-conmigo.component';
import { MisDocumentosComponent } from './ContenidoPrincipal/mis-documentos/mis-documentos.component';
import { PapeleraComponent } from './ContenidoPrincipal/papelera/papelera.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './ContenidoPrincipal/main-layout/main-layout.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'mis-documentos', component: MisDocumentosComponent },
      { path: 'compartido-conmigo', component: CompartidoConmigoComponent },
      { path: 'papelera', component: PapeleraComponent },
      { path: 'ajustes', component: AjustesComponent },
      { path: '', redirectTo: 'mis-documentos', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
