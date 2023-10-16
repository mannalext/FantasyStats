/* eslint-disable @typescript-eslint/no-explicit-any */
export class SleeperRoster {
  rosterId: number;
  ownerId: string;
  leagueId: string;
  starters: string[];
  players: string[];
  reserve: string[];
  keepers: string[];
  settings: number[];
  metadata: string[];
  coOwners: string[];
  player_map: any; // unimplemented
  taxi: any; // unimplemented

  constructor(
    rosterId: number,
    ownerId: string,
    leagueId: string,
    starters: string[],
    players: string[],
    reserve: string[],
    keepers: string[],
    settings: number[],
    metadata: string[],
    coOwners: string[],
    player_map: any,
    taxi: any
  ) {
    this.rosterId = rosterId;
    this.ownerId = ownerId;
    this.leagueId = leagueId;
    this.starters = starters;
    this.players = players;
    this.reserve = reserve;
    this.keepers = keepers;
    this.settings = settings;
    this.metadata = metadata;
    this.coOwners = coOwners;
    this.player_map = player_map;
    this.taxi = taxi;
  }
}

export class SleeperRosterDTO {
  roster_id: number;
  owner_id: string;
  league_id: string;
  starters: string[];
  players: string[];
  reserve: string[];
  keepers: string[];
  settings: number[];
  metadata: string[];
  co_owners: string[];
  player_map: any; // unimplemented
  taxi: any; // unimplemented

  constructor(
    roster_id: number,
    owner_id: string,
    league_id: string,
    starters: string[],
    players: string[],
    reserve: string[],
    keepers: string[],
    settings: number[],
    metadata: string[],
    co_owners: string[],
    player_map: any,
    taxi: any
  ) {
    this.roster_id = roster_id;
    this.owner_id = owner_id;
    this.league_id = league_id;
    this.starters = starters;
    this.players = players;
    this.reserve = reserve;
    this.keepers = keepers;
    this.settings = settings;
    this.metadata = metadata;
    this.co_owners = co_owners;
    this.player_map = player_map;
    this.taxi = taxi;
  }
}
