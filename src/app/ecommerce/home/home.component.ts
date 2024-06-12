import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { GridProdutosComponent } from '../grid-produtos/grid-produtos.component';
import { CarroselComponent } from '../carrosel/carrosel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CarroselComponent, CommonModule, GridProdutosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {}
}
