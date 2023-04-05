import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../home/navbar/login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { RegisterComponent } from '../home/navbar/register/register.component';
import { AdminTemplatesComponent } from './admin-templates/admin-templates.component';

export const routes: Routes = [
  {
    path: '',
    title: 'admin',
    
    component: AdminHomeComponent,
    children: [
      { path: 'admin-templates', title: 'Admin Templates', component: AdminTemplatesComponent },
      
    ]
  }
];

@NgModule({
  declarations: [    
    AdminHomeComponent,    
    AdminTemplatesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
