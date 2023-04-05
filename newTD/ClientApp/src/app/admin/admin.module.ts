import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../home/navbar/login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { RegisterComponent } from '../home/navbar/register/register.component';

import { OrdersComponent } from './orders/orders.component';
import { TemplatesComponent } from './templates/templates.component';

export const routes: Routes = [
  {
    path: '',
    title: 'admin',
    
    component: AdminHomeComponent,
    children: [
      { path: 'templates', title: 'Admin Templates', component: TemplatesComponent },
      { path: 'orders', title: 'Orders Templates', component: OrdersComponent }
    ]
  }
];

@NgModule({
  declarations: [    
    AdminHomeComponent,    
    TemplatesComponent, OrdersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
