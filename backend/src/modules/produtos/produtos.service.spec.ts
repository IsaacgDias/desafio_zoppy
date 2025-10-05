import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produtos.service';
import { Produto } from '../../models/produtos.model';
import { getModelToken } from '@nestjs/sequelize';

describe('ProdutosService', () => {
  let service: ProdutosService;

  // Mock do model Sequelize
  const mockProdutoModel = {
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        { provide: getModelToken(Produto), useValue: mockProdutoModel },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar produtos paginados', async () => {
      const mockResult = { rows: [{ id: 1, nome: 'Produto A' }], count: 1 };
      mockProdutoModel.findAndCountAll.mockResolvedValue(mockResult);

      const resultado = await service.findAll({ page: 1, limit: 10, search: 'a' });

      expect(resultado).toEqual({
        data: mockResult.rows,
        total: mockResult.count,
        page: 1,
        limit: 10,
      });
      expect(mockProdutoModel.findAndCountAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar um produto pelo id', async () => {
      const mockProduto = { id: 1, nome: 'Produto A' };
      mockProdutoModel.findByPk.mockResolvedValue(mockProduto);

      const resultado = await service.findOne(1);
      expect(resultado).toEqual(mockProduto);
      expect(mockProdutoModel.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('deve criar um produto', async () => {
      const mockProduto = { id: 1, nome: 'Produto A' };
      mockProdutoModel.create.mockResolvedValue(mockProduto);

      const resultado = await service.create({ nome: 'Produto A' });
      expect(resultado).toEqual(mockProduto);
      expect(mockProdutoModel.create).toHaveBeenCalledWith({ nome: 'Produto A' });
    });
  });

  describe('update', () => {
    it('deve atualizar um produto existente', async () => {
      const mockUpdateResult = [1, [{ id: 1, nome: 'Produto Atualizado' }]];
      mockProdutoModel.update.mockResolvedValue(mockUpdateResult);

      const resultado = await service.update(1, { nome: 'Produto Atualizado' });
      expect(resultado).toEqual(mockUpdateResult);
      expect(mockProdutoModel.update).toHaveBeenCalledWith(
        { nome: 'Produto Atualizado' },
        { where: { id: 1 }, returning: true },
      );
    });
  });

  describe('remove', () => {
    it('deve deletar um produto pelo id', async () => {
      mockProdutoModel.destroy.mockResolvedValue(1);

      const resultado = await service.remove(1);
      expect(resultado).toBe(1);
      expect(mockProdutoModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
