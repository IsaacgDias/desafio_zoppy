import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from '../../models/produtos.model';

// Controller responsável pelas rotas CRUD da entidade Produto
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get() // Retorna todos os produtos com paginação e filtro opcional
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string
  ): Promise<{ data: Produto[]; total: number; page: number; limit: number }> {
    return this.produtosService.findAll({ page: Number(page), limit: Number(limit), search });
  }

  @Get(':id') // Retorna produtos pelo ID
  async findOne(@Param('id') id:number): Promise<Produto | null> {
    return this.produtosService.findOne(id);
  }

  @Post() // Cadastra um novo produto
  async create(@Body() data: Partial<Produto>): Promise<Produto> {
    return this.produtosService.create(data); 
  }

  @Put(':id') // Atualiza um produto pelo ID
  async update(@Param('id') id:number, @Body() data: Partial<Produto>): Promise<[number, Produto[]]> {
    return this.produtosService.update(id, data);
  }

  @Delete(':id') // Remove um produto pelo ID
  async remove(@Param('id') id: number): Promise<number> {
    return this.produtosService.remove(id);
  }
}
