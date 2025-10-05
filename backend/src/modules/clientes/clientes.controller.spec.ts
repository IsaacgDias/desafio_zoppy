import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: Partial<ClientesService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue({ data: [], total: 0, page: 1, limit: 10 }),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      vincularProduto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [{ provide: ClientesService, useValue: service }],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  it('deve chamar o método findAll do serviço', async () => {
    await controller.findAll(1, 10, 'a');
    expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10, search: 'a' });
  });

  it('deve chamar o método findOne do serviço', async () => {
    await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
