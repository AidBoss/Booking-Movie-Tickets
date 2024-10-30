import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, viewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatIconModule, MatFormFieldModule,
    FormsModule, MatBadgeModule, MatInputModule,
    MatButtonModule, MatToolbarModule, CommonModule,
    MatTabsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  btn_shows: boolean = false;
  showLsRs: boolean = false;
  onInputChange = (event: Event) => {
    const input = (event.target as HTMLInputElement).value as string;;
    if (input.length > 0) {
      this.showLsRs = true;
    } else {
      this.showLsRs = false;
    }
  }
  showSearch = () => {
    this.btn_shows = !this.btn_shows;
    const formSearch = document.getElementById('show-box-search')!;
    const searchForm = document.getElementById('search-form')!;
    searchForm.classList.add('animate-search');
  }
}
