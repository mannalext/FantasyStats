interface IOwner {
  id: string,
  name: string,
}

export class Owner implements IOwner {
  readonly id: string;
  readonly name: string;

  constructor({ id, name}: IOwner) {
    this.id = id;
    this.name = name;
  }
}