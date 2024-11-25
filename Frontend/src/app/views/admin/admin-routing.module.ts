import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerProductComponent } from './manager-product/manager-product.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminGuard } from '../../core/constants/admin.guard';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manager-movie', component: ManagerProductComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
