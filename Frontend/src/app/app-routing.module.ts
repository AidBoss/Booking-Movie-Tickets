import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './share/layout/layout.component';
import {AuthComponent} from "./views/auth/auth.component";
import {AdminGuard} from "./core/constants/admin.guard";
import {AuthGuard} from "./core/constants/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./views/user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./views/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
