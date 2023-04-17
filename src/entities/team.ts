export class Team {
  id: number;
  seasonId: number;
  ownerId: number;
  wins: number;
  losses: number;
  ties: number;

  constructor(id: number, seasonId: number, ownerId: number, wins: number, losses: number, ties: number) {
    this.id = id;
    this.seasonId = seasonId;
    this.ownerId = ownerId;
    this.wins = wins;
    this.losses = losses;
    this.ties = ties;
  }
}
