// src/modules/clientes/clientes.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { Cliente } from '../../models/clientes.model';
import { Produto } from '../../models/produtos.model';

describe('ClientesService', () => {
  let service: ClientesService;

  const mockCliente = {
    id: 1,
    nome: 'Cliente Teste',
    email: 'teste@email.com',
    $add: jest.fn(), // mock do método do Sequelize
  } as any;

  const mockProduto = {
    id: 1,
    nome: 'Produto Teste',
    preco: 100,
    estoque: 10,
  } as any;

  const clienteModelMock = {
    findByPk: jest.fn().mockResolvedValue(mockCliente),
    findAndCountAll: jest.fn().mockResolvedValue({
      rows: [mockCliente],
      count: 1,
    }),
    create: jest.fn().mockResolvedValue(mockCliente),
    update: jest.fn().mockResolvedValue([1, [mockCliente]]),
    destroy: jest.fn().mockResolvedValue(1),
  };

  const produtoModelMock = {
    findByPk: jest.fn().mockResolvedValue(mockProduto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        { provide: 'ClienteRepository', useValue: clienteModelMock },
        { provide: 'ProdutoRepository', useValue: produtoModelMock },
      ],
    }).compile();

    service = module.get(ClientesService);
    (service as any).clienteModel = clienteModelMock;
    (service as any).produtoModel = produtoModelMock;
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve vincular produto ao cliente', async () => {
    const result = await service.vincularProduto(1, 1);
    
    // verifica se $add foi chamado
    expect(mockCliente.$add).toHaveBeenCalledWith('produto', mockProduto);

    // verifica se findOne (ou findByPk) retornou o cliente correto
    expect(clienteModelMock.findByPk).toHaveBeenCalledWith(1, { include: [Produto] });
  });

  it('deve lançar erro se cliente não encontrado', async () => {
    clienteModelMock.findByPk.mockResolvedValueOnce(null);

    await expect(service.vincularProduto(999, 1)).rejects.toThrow('Cliente ou Produto não encontrado');
  });

  it('deve lançar erro se produto não encontrado', async () => {
    produtoModelMock.findByPk.mockResolvedValueOnce(null);

    await expect(service.vincularProduto(1, 999)).rejects.toThrow('Cliente ou Produto não encontrado');
  });
});
