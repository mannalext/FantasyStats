interface ITeam {
  seasonId: number,
  ownerId: string,
  wins: number,
  losses: number,
  ties: number,
}

export class Team implements ITeam {
  readonly seasonId: number;
  readonly ownerId: string;
  readonly wins: number;
  readonly losses: number;
  readonly ties: number;

  constructor({
    seasonId,
    ownerId,
    wins,
    losses,
    ties,
  }: ITeam) {
    this.seasonId = seasonId,
    this.ownerId = ownerId,
    this.wins = wins,
    this.losses = losses,
    this.ties = ties
  }
}