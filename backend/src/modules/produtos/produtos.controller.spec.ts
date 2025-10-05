import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { Produto } from '../../models/produtos.model';

describe('ProdutosController', () => {
  let controller: ProdutosController;
  let service: ProdutosService;

  // Produto de exemplo usado nos testes
  const produtoMock: Produto = {
    id: 1,
    nome: 'Produto Teste',
    descricao: 'Descrição teste',
    preco: 100,
  } as Produto;

  // Mock do serviço de produtos
  const produtosServiceMock = {
    findAll: jest.fn().mockResolvedValue({ data: [produtoMock], total: 1, page: 1, limit: 10 }),
    findOne: jest.fn().mockResolvedValue(produtoMock),
    create: jest.fn().mockResolvedValue(produtoMock),
    update: jest.fn().mockResolvedValue([1, [produtoMock]]),
    remove: jest.fn().mockResolvedValue(1),
  };

  // Antes de cada teste, criamos um módulo de teste do NestJS
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [
        { provide: ProdutosService, useValue: produtosServiceMock },
      ],
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
    service = module.get<ProdutosService>(ProdutosService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar todos os produtos', async () => {
    const resultado = await controller.findAll(1, 10, '');
    expect(resultado.data).toEqual([produtoMock]);
    expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10, search: '' });
  });

  it('deve retornar um produto específico', async () => {
    const resultado = await controller.findOne(1);
    expect(resultado).toEqual(produtoMock);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve criar um novo produto', async () => {
    const resultado = await controller.create(produtoMock);
    expect(resultado).toEqual(produtoMock);
    expect(service.create).toHaveBeenCalledWith(produtoMock);
  });

  it('deve atualizar um produto existente', async () => {
    const resultado = await controller.update(1, produtoMock);
    expect(resultado).toEqual([1, [produtoMock]]);
    expect(service.update).toHaveBeenCalledWith(1, produtoMock);
  });

  it('deve remover um produto pelo ID', async () => {
    const resultado = await controller.remove(1);
    expect(resultado).toEqual(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
