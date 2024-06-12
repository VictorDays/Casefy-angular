import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CapinhaService } from '../../services/capinha.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-marca-grid',
    standalone: true,
    templateUrl: './marca-grid.component.html',
    styleUrl: './marca-grid.component.css',
    imports: [CommonModule, FooterComponent, HeaderComponent]
})
export class MarcaGridComponent implements OnInit{
  marca!: string;
  produtos: any[] = [];
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private productService: CapinhaService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.marca = params['marca'];
      this.getProdutosPorMarca(this.marca);
    });
  }

  getProdutosPorMarca(marca: string) {
    console.log(marca)
    this.productService.findByMarca(marca).subscribe(data => {
      this.produtos = data;
      this.loading = false;
      console.log(this.produtos)
    });
    console.log(this.produtos)
  }
}
