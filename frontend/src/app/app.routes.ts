import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { ListaClientesComponent } from './components/lista-cliente/lista-clientes.component';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { VincularProdutoComponent } from './components/vincular-produto/vincular-produto.component';

export const routes: Routes = [
  { path: 'produtos', component: ListaProdutosComponent },
  { path: 'produtos/novo', component: CadastroProdutoComponent },
  { path: 'produtos/editar/:id', component: CadastroProdutoComponent },
  { path: 'clientes', component: ListaClientesComponent },
  { path: 'clientes/novo', component: CadastroClienteComponent },
  { path: 'clientes/editar/:id', component: CadastroClienteComponent },
  { path: 'clientes/vincular-produto/:id', component: VincularProdutoComponent },
  { path: 'clientes/:id/vincular-produto', component: VincularProdutoComponent },
  { path: '', redirectTo: 'produtos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
