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

export async function validateSleeperLeagueExists(sleeperLeagueId: string): Promise<void> {
  const ports = await getPorts();
  const doesSleeperLeagueExist = await ports.sleeperClient.doesSleeperLeagueExistBySleeperLeagueId(sleeperLeagueId);
  if (!doesSleeperLeagueExist) {
    throw new EntityDoesNotExistError(`No league found on Sleeper found for SleeperLeagueId ${sleeperLeagueId}`);
  }
}

export async function validateSleeperSeasonDoesNotAlreadyExist(sleeperLeagueId: string): Promise<void> {
  const ports = await getPorts();
  const doesSleeperSeasonExist = await ports.statsRepository.doesSleeperSeasonExistBySleeperLeagueId(sleeperLeagueId);
  if (doesSleeperSeasonExist) {
    throw new EntityAlreadyExistsError(`A sleeper season already exists for SleeperLeagueId ${sleeperLeagueId}`);
  }
}
