export class Owner {
  id: number;
  displayName: string;

  constructor(id: number, displayName: string) {
    this.id = id;
    this.displayName = displayName;
  }
}

export class OwnerEntity extends Owner {
  id: number;
  display_displayName: string;

  constructor(id: number, display_displayName: string) {
    super(id, display_displayName);
    this.id = id;
    this.display_displayName = display_displayName;
  }
}
