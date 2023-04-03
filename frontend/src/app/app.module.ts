import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { HttpClientModule } from '@angular/common/http';
import { VmenuComponent } from './components/vmenu/vmenu.component';
import { ListcategoriesComponent } from './components/categories/listcategories/listcategories.component';
import { ProviderComponent } from './components/provider/provider.component';
import { FormsModule } from '@angular/forms';
import { ClientComponent } from './components/client/client.component';
import { MarcaComponent } from './components/marca/marca.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PrincipalComponent,
    RegistrarComponent,
    VmenuComponent,
    ListcategoriesComponent,
    ProviderComponent,
    ClientComponent,
    MarcaComponent,
  

    
  
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
