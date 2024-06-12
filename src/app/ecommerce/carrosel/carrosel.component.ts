import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrosel.component.html',
  styleUrl: './carrosel.component.css'
})
export class CarroselComponent {
  images: string[] = [
    'assets/ecommerce/carrosel/1.png',
    'assets/ecommerce/carrosel/2.png',
    'assets/ecommerce/carrosel/3.png'
  ];
}
