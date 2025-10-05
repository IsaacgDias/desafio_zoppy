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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const mockResult = { rows: [{ id: 1, nome: 'Produto A' }], count: 1 };
      mockProdutoModel.findAndCountAll.mockResolvedValue(mockResult);

      const result = await service.findAll({ page: 1, limit: 10, search: 'a' });

      expect(result).toEqual({
        data: mockResult.rows,
        total: mockResult.count,
        page: 1,
        limit: 10,
      });
      expect(mockProdutoModel.findAndCountAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const mockProduct = { id: 1, nome: 'Produto A' };
      mockProdutoModel.findByPk.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);
      expect(result).toEqual(mockProduct);
      expect(mockProdutoModel.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const mockProduct = { id: 1, nome: 'Produto A' };
      mockProdutoModel.create.mockResolvedValue(mockProduct);

      const result = await service.create({ nome: 'Produto A' });
      expect(result).toEqual(mockProduct);
      expect(mockProdutoModel.create).toHaveBeenCalledWith({ nome: 'Produto A' });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const mockUpdateResult = [1, [{ id: 1, nome: 'Produto Atualizado' }]];
      mockProdutoModel.update.mockResolvedValue(mockUpdateResult);

      const result = await service.update(1, { nome: 'Produto Atualizado' });
      expect(result).toEqual(mockUpdateResult);
      expect(mockProdutoModel.update).toHaveBeenCalledWith(
        { nome: 'Produto Atualizado' },
        { where: { id: 1 }, returning: true },
      );
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      mockProdutoModel.destroy.mockResolvedValue(1);

      const result = await service.remove(1);
      expect(result).toBe(1);
      expect(mockProdutoModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
