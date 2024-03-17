import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavsideComponent } from '../../navside/navside.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, NavsideComponent, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListAdmComponent {

}
