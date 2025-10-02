import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaProdutosComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
