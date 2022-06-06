interface ILeague {
  id: number,
  name: string
}

export class League implements ILeague {
  readonly id: number;
  readonly name: string;

  constructor({id, name}: ILeague) {
    this.id = id;
    this.name = name;
  }
}
