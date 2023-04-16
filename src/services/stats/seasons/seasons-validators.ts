import { getPorts } from '../../../ports/get-ports';
import { EntityAlreadyExistsError, EntityDoesNotExistError } from '../../../services/errors';

export async function validateSeasonDoesNotAlreadyExist(leagueId: number): Promise<void> {
  const ports = await getPorts();
  const doesSeasonExist = await ports.statsRepository.doesSeasonExistByLeagueId(leagueId);
  if (doesSeasonExist) {
    throw new EntityAlreadyExistsError('A season already exists for this league and year');
  }
}

export async function validateSeasonExistsBySeasonId(seasonId: number): Promise<void> {
  const ports = await getPorts();
  const doesSeasonExist = await ports.statsRepository.doesSeasonExistBySeasonId(seasonId);
  if (!doesSeasonExist) {
    throw new EntityDoesNotExistError(`No season found for season id ${seasonId}`);
  }
}

export async function validateSeasonExistsByLeagueId(leagueId: number): Promise<void> {
  const ports = await getPorts();
  const doesSeasonExist = await ports.statsRepository.doesSeasonExistByLeagueId(leagueId);
  if (!doesSeasonExist) {
    throw new EntityDoesNotExistError(`No season found for league id ${leagueId}`);
  }
}
