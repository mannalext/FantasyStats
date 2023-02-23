import { Season } from '@entities/season';
import { Controller, Get, Path, Res, Route, TsoaResponse } from 'tsoa';
import { ErrorResponse } from './error-message';

interface SingleSeasonResponse {
  season: Season | undefined;
}

@Route('seasons')
export class SeasonsController extends Controller {
  @Get('{id}')
  public async findSeasonById(
    @Path() id: number,
    @Res() notFoundResponse: TsoaResponse<404, ErrorResponse>
  ): Promise<SingleSeasonResponse> {}
}
