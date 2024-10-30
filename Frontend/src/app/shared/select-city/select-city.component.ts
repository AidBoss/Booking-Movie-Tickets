import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-select-city',
  standalone: true,
  imports: [MatMenuModule, NgxBootstrapIconsModule, MatToolbarModule, MatIconModule],
  templateUrl: './select-city.component.html',
  styleUrl: './select-city.component.scss'
})
export class SelectCityComponent {

}
