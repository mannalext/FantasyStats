import { Owner } from '../entities/owner';
import { findOwnerById } from '../services/stats/owners/find-owner-by-id';
import { Route, Controller, Get, Path, Post, Res, TsoaResponse, Body } from 'tsoa';
import { ErrorResponse } from './error-message';
import { createOwner } from '../services/stats/owners/create-owner';

interface SingleOwnerResponse {
  owner: Owner | undefined;
}

@Route('owners')
export class OwnersController extends Controller {
  @Get('{id}')
  public async findOwnerById(
    @Path() id: number,
    @Res() notFoundResponse: TsoaResponse<404, ErrorResponse>
  ): Promise<SingleOwnerResponse> {
    const found: Owner | undefined = await findOwnerById(id);
    if (!found) {
      return notFoundResponse(404, {
        error: {
          message: 'No owner found for that id',
        },
      });
    }
    return {
      owner: found,
    };
  }

  @Post('')
  public async createOwner(@Body() body: { displayName: string }): Promise<number> {
    return await createOwner(body.displayName);
  }
}
