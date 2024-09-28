import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../../../shared/search/search.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../../shared/menu-mobile/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
// import { NgxSelectDropdownModule } from 'ngx-select-dropdown';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SearchComponent,
    MatBadgeModule,
    MenuComponent,
    MatMenuModule,
    NgxBootstrapIconsModule,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

} 
