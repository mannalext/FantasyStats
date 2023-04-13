export class LeagueDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LeagueDoesNotExistError';
  }
}

// export async function validateLeagueExists(leagueId: number): Promise<void> {
//   const league = await findLeagueById(leagueId);
//   if (!league) {
//     throw new LeagueDoesNotExistError(`No league found for id ${leagueId}`);
//   }
// }
