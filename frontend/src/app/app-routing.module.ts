import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PrincipalComponent } from './components/principal/principal.component';




const routes : Routes = [

  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'profile',
    component:ProfileComponent
  },


  {
    path:'signup',
    component:SignupComponent
  },

  {
    path:'home',
    component:PrincipalComponent
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
