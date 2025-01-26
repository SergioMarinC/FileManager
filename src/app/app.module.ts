import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Formularios/login/login.component';
import { RegisterComponent } from './Formularios/register/register.component';
import { MainLayoutComponent } from './ContenidoPrincipal/main-layout/main-layout.component';
import { DocumentoComponent } from './ContenidoPrincipal/documento/documento.component';
import { MisDocumentosComponent } from './ContenidoPrincipal/mis-documentos/mis-documentos.component';
import { BasuraComponent } from './ContenidoPrincipal/basura/basura.component';
import { PapeleraComponent } from './ContenidoPrincipal/papelera/papelera.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutComponent,
    DocumentoComponent,
    MisDocumentosComponent,
    BasuraComponent,
    PapeleraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
