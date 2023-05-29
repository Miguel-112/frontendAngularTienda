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
import { ClientComponent } from './components/client/client.component';
import { MarcaComponent } from './components/marca/marca.component';
import { MotorcyclepartlistComponent } from './components/motorcyclepart/motorcyclepartlist/motorcyclepartlist.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { InvoceComponent } from './components/invoce/invoce.component';
import { InvoicedetailComponent } from './components/invoicedetail/invoicedetail/invoicedetail.component';




const routes: Routes = [

  { path: '', component: LoginComponent },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
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
    component: RegistrarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: ListcategoriesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'provider',
    component: ProviderComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'brand',
    component: MarcaComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'motorcyclelist',
    component: MotorcyclepartlistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'shoppingcart',
    component: ShoppingcartComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'invoce',
    component: InvoceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invocedetail',
    component: InvoicedetailComponent,
    canActivate: [AuthGuard]
  },





];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
