import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
   {
      // Dùng BaseLayout cho tất cả các route
      path: '',
      component: LayoutComponent,
      children: [
         { path: '', component: HomeComponent },
         { path: 'home', component: HomeComponent },
         { path: 'about', component: AboutComponent },
      ]
   },
   // Route cho trang 404 - Wildcard đặt cuối cùng
   { path: '**', component: NotFoundComponent }
];
