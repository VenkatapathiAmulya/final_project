import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './_helpers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditDataComponent } from './add-edit-data/add-edit-data.component';
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch : 'full'
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path:'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'add',
    component: AddEditDataComponent
  },
  {
    path: '**',
    component: P404Component
  },
  // { path: '', component: HomepageComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





