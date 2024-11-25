import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserMenuComponent} from "../component/user-menu/user-menu.component";

@NgModule({
  declarations: [
    UserMenuComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink

  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
