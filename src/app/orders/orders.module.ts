import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form/order-form.component';


const routes: Routes = [
  {path: '', component: OrderFormComponent}
];

@NgModule({
  declarations: [    
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
