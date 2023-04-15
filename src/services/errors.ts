export class EntityDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityDoesNotExistError';
  }
}

export class EntityAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityAlreadyExistsError';
  }
}
