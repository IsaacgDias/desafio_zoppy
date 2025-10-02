import { Component, OnInit } from '@angular/core';
import { ProdutosService, Produto } from '../../services/produtos.service';

// Componente que exibe a lista de produtos utilizando ProdutosService
@Component({
  selector: 'app-lista-produtos',
  imports: [],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.css'
})
export class ListaProdutosComponent implements OnInit {
  produto: Produto[] = [];

  constructor(private produtosService: ProdutosService) {}

  async ngOnInit() {
    this.produto = await this.produtosService.obeterProdutos();
  }
  
}
