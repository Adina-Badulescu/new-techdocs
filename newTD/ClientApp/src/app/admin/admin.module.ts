import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    title: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: 'login', title: 'login', component: LoginComponent },
      { path: 'register', title: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    AdminHomeComponent,    
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
