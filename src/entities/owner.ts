export class Owner {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class OwnerEntity extends Owner {
  id: number;
  display_name: string;

  constructor(id: number, display_name: string) {
    super(id, display_name);
    this.id = id;
    this.display_name = display_name;
  }
}
