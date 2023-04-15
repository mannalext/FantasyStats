export class League {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class LeagueEntity extends League {
  constructor(id: number, name: string) {
    super(id, name);
  }
}
