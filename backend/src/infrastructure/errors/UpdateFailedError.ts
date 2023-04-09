export class UpdateFailedError extends Error {
    statusCode: number;

    constructor(message: string) {
      super(message);
      this.name = 'UpdateFailedError';
      this.statusCode = 500;
    }
}