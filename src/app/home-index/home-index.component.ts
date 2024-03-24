import { Component } from '@angular/core';
import { NavsideComponent } from "../components/navside/navside.component";
import { HeaderComponent } from "../components/header/header.component";

@Component({
    selector: 'app-home-index',
    standalone: true,
    templateUrl: './home-index.component.html',
    styleUrl: './home-index.component.css',
    imports: [NavsideComponent, HeaderComponent]
})
export class HomeIndexComponent {

}
