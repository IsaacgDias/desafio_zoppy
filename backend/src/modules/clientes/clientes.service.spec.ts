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
    $add: jest.fn(),
  } as any;

  const mockProduto = { id: 1, nome: 'Produto Teste', preco: 100, estoque: 10 } as any;

  const clienteModelMock = {
    findByPk: jest.fn().mockResolvedValue(mockCliente),
    findAndCountAll: jest.fn().mockResolvedValue({ rows: [mockCliente], count: 1 }),
    create: jest.fn().mockResolvedValue(mockCliente),
    update: jest.fn().mockResolvedValue([1, [mockCliente]]),
    destroy: jest.fn().mockResolvedValue(1),
  };

  const produtoModelMock = { findByPk: jest.fn().mockResolvedValue(mockProduto) };

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

  it('deve retornar clientes paginados', async () => {
    const result = await service.findAll({ page: 1, limit: 10, search: '' });
    expect(result.data).toEqual([mockCliente]);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
  });

  it('deve retornar cliente existente', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockCliente);
    expect(clienteModelMock.findByPk).toHaveBeenCalledWith(1, { include: [Produto] });
  });

  it('deve lançar erro se cliente não encontrado em findOne', async () => {
    clienteModelMock.findByPk.mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow();
  });

  it('deve criar um cliente', async () => {
    const result = await service.create({ nome: 'Novo Cliente' });
    expect(result).toEqual(mockCliente);
    expect(clienteModelMock.create).toHaveBeenCalledWith({ nome: 'Novo Cliente' });
  });

  // --- update ---
  it('deve atualizar um cliente existente', async () => {
    const result = await service.update(1, { nome: 'Atualizado' });
    expect(result).toEqual([1, [mockCliente]]);
    expect(clienteModelMock.update).toHaveBeenCalledWith({ nome: 'Atualizado' }, { where: { id: 1 }, returning: true });
  });

  it('deve lançar erro ao atualizar cliente inexistente', async () => {
    clienteModelMock.update.mockResolvedValueOnce([0, []]);
    await expect(service.update(999, { nome: 'Nada' })).rejects.toThrow();
  });

  // --- remove ---
  it('deve remover cliente existente', async () => {
    const result = await service.remove(1);
    expect(result).toBe(1);
    expect(clienteModelMock.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('deve lançar erro ao remover cliente inexistente', async () => {
    clienteModelMock.destroy.mockResolvedValueOnce(0);
    await expect(service.remove(999)).rejects.toThrow();
  });

  it('deve vincular produto ao cliente', async () => {
    const result = await service.vincularProduto(1, 1);
    expect(mockCliente.$add).toHaveBeenCalledWith('produto', mockProduto);
    expect(clienteModelMock.findByPk).toHaveBeenCalledWith(1, { include: [Produto] });
  });

  it('deve lançar erro se cliente ou produto não encontrado em vincularProduto', async () => {
    clienteModelMock.findByPk.mockResolvedValueOnce(null);
    await expect(service.vincularProduto(999, 1)).rejects.toThrow();
    produtoModelMock.findByPk.mockResolvedValueOnce(null);
    await expect(service.vincularProduto(1, 999)).rejects.toThrow();
  });
});
