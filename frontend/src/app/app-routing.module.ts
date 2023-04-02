import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AuthGuard } from './auth.guard';
import { ListcategoriesComponent } from './components/categories/listcategories/listcategories.component';
import { ProviderComponent } from './components/provider/provider.component';




const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: PrincipalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrarse',
    component: RegistrarComponent
  },
  {
    path: 'categories',
    component: ListcategoriesComponent
  },

  {
    path: 'provider',
    component: ProviderComponent
  }


];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
