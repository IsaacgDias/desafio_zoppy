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

  async ngOnInit() {
    // Verifica se há um ID na rota para modo edição
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.produtoId;

    if (this.produtoId) {
      try {
        const produto = await this.produtosService.obterProdutoPorId(this.produtoId);
        if (produto) this.produtoForm.patchValue(produto);
      } catch (error) {
        this.mensagemErro = 'Erro ao carregar produto.';
      }
    }
  }

  async salvar() {
    if (this.produtoForm.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios corretamente.';
      return;
    }

    const dados: Produto = this.produtoForm.value;

    try {
      if (this.produtoId) {
        await this.produtosService.atualizarProduto(this.produtoId, dados);
        this.mensagemSucesso = 'Produto atualizado com sucesso!';
      } else {
        await this.produtosService.criarProduto(dados);
        this.mensagemSucesso = 'Produto criado com sucesso!';
        this.produtoForm.reset();
      }
    } catch (error) {
      this.mensagemErro = 'Erro ao salvar o produto.';
    }
  }

  // Redireciona de volta para a listagem de produtos
  cancelar() {
    this.router.navigate(['/produtos']);
  }
}
