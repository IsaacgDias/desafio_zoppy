import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../../services/clientes.service';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  isEditMode = false;
  clienteId?: number;

  mensagemSucesso = '';
  mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // Verifica se há um id na rota para edição
    const clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!clienteId;
    this.clienteId = clienteId;

    if (clienteId) {
      this.clienteService.obterClientes().subscribe({
        next: (res) => {
          const cliente = res.data.find(c => c.id === clienteId);
          if (cliente) {
            this.clienteForm.patchValue(cliente);
          }
        },
        error: () => {
          this.mensagemErro = 'Erro ao carregar cliente.';
        }
      });
    }

  }

  salvar(): void {
    if (this.clienteForm.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios corretamente.';
      return;
    }

    const clienteData = this.clienteForm.value;

    if (this.isEditMode && this.clienteId) {
      this.clienteService.atualizarCliente(this.clienteId, clienteData).subscribe({
        next: () => {
          this.mensagemSucesso = 'Cliente atualizado com sucesso!';
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error(err);
          this.mensagemErro = 'Erro ao atualizar o cliente.';
        }
      });
    } else {
      this.clienteService.criarCliente(clienteData).subscribe({
        next: () => {
          this.mensagemSucesso = 'Cliente criado com sucesso!';
          this.clienteForm.reset();
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error(err);
          this.mensagemErro = 'Erro ao criar o cliente.';
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
