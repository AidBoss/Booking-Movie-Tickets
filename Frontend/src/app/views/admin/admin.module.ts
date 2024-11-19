import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerProductComponent } from './manager-product/manager-product.component';
import { SidebarComponent } from 'src/app/share/component/sidebar/sidebar.component';
import { ButtonEDComponent } from 'src/app/share/component/button-ed/button-ed.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ManagerProductComponent,
    SidebarComponent,
    ButtonEDComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
