import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';

export const routes: Routes = [
  { path: 'produtos', component: ListaProdutosComponent },
  { path: 'produtos/novo', component: CadastroProdutoComponent },
  { path: 'produtos/editar/:id', component: CadastroProdutoComponent },
  { path: '', redirectTo: 'produtos', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
