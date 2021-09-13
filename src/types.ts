export type OwnerInsertValues = {
  ownerId: number,
  displayName: string,
};

export type SeasonInsertValues = {
  seasonId: number,
  leagueId: number,
  year: number,
};

export type TeamInsertValues = {
  seasonId: number,
  ownerId: number,
  wins: number,
  losses: number,
  ties: number,
};
