import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutosService, Produto } from '../../services/produtos.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  // Formulário reativo do produto
  produtoForm: FormGroup;

  produtoId?: number;

  // Flag para identificar se está em modo edição
  isEditMode: boolean = false;

  mensagemSucesso: string = '';
  mensagemErro: string = '';
  
  constructor(
    private fb: FormBuilder,
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Inicializa o formulário com validações
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [null, [Validators.required, Validators.min(0)]],
      estoque: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.produtoId;

    if (this.produtoId) {
      this.produtosService.obterProdutoPorId(this.produtoId)
        .subscribe({
          next: (produto) => {
            if (produto) {
              this.produtoForm.patchValue(produto); // preenche o formulário
            }
          },
          error: () => {
            this.mensagemErro = 'Erro ao carregar produto.';
          }
        });
    }
  }

  salvar() {
    if (this.produtoForm.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios corretamente.';
      return;
    }

    const dados: Produto = this.produtoForm.value;

    if (this.produtoId) {
      this.produtosService.atualizarProduto(this.produtoId, dados)
        .subscribe({
          next: () => {
            this.mensagemSucesso = 'Produto atualizado com sucesso!';
            this.router.navigate(['/produtos']);
          },
          error: () => {
            this.mensagemErro = 'Erro ao salvar o produto.';
          }
        });
    } else {
      this.produtosService.criarProduto(dados)
        .subscribe({
          next: () => {
            this.mensagemSucesso = 'Produto criado com sucesso!';
            this.produtoForm.reset();
            this.router.navigate(['/produtos']);
          },
          error: () => {
            this.mensagemErro = 'Erro ao salvar o produto.';
          }
        });
    }
  }


  // Redireciona de volta para a listagem de produtos
  cancelar() {
    this.router.navigate(['/produtos']);
  }
}
