import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-navside',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgFor, CommonModule ],
  templateUrl: './navside.component.html',
  styleUrl: './navside.component.css'
})
export class NavsideComponent {
  isSubmenuOpen: boolean = false;
  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
    console.log('Submenu aberto:', this.isSubmenuOpen);
  }

  isCollapsed: boolean = false;
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    console.log('Sidebar aberto:', !this.isCollapsed);
  }
}
