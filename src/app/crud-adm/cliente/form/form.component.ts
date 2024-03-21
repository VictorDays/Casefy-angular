import { Component } from '@angular/core';

import { ViewClienteComponent } from '../view/view.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { NavsideComponent } from '../../../components/navside/navside.component';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.models';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ViewClienteComponent, HeaderComponent, NavsideComponent,],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class ClienteFormComponent {

}
