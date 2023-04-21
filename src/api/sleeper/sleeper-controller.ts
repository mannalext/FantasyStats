import { SleeperLeague } from '../../entities/sleeper/sleeper-league';
import { SleeperClientService } from '../../services/sleeper-client/sleeper-client-service';
import { Controller, Get, Path, Route } from 'tsoa';

@Route('sleeper')
export class SleeperController extends Controller {
  private sleeperClientService = new SleeperClientService();

  @Get('/league/{sleeperLeagueId}')
  public async getLeagueById(@Path() sleeperLeagueId: string): Promise<SleeperLeague> {
    return await this.sleeperClientService.getLeagueById(sleeperLeagueId);
  }
}
