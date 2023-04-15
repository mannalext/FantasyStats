import { Owner } from '../../entities/owner';
import { findOwnerById } from '../../services/stats/owners/find-owner-by-id';
import { Route, Controller, Get, Path, Post, Body, Middlewares } from 'tsoa';
import { createOwner } from '../../services/stats/owners/create-owner';
import { OwnerErrorHandlingMiddleware } from './owner-error-handling-middleware';
@Route('owners')
@Middlewares(OwnerErrorHandlingMiddleware)
export class OwnersController extends Controller {
  @Get('{id}')
  public async findOwnerById(@Path() id: number): Promise<Owner> {
    return await findOwnerById(id);
  }

  @Post('')
  public async createOwner(@Body() body: { displayName: string }): Promise<number> {
    return await createOwner(body.displayName);
  }
}
