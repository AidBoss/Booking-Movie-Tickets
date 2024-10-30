import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './features/client/auth/login/login.component';
import { AuthComponent } from './features/client/auth/auth.component';
import { RegisterComponent } from './features/client/auth/register/register.component';

export const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         { path: '', component: HomeComponent },
         { path: 'home', component: HomeComponent },
         { path: 'about', component: AboutComponent },
      ]
   },
   {
      path: 'auth', component: AuthComponent,
      children: [
         { path: 'login', component: LoginComponent },
         { path: 'register', component: RegisterComponent }
      ]
   },
   // Route cho trang 404 - Wildcard đặt cuối cùng
   { path: '**', component: NotFoundComponent }
];
