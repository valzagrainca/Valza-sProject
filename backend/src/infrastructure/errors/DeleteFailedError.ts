export class DeleteFailedError extends Error {
    statusCode: number;

    constructor(message: string) {
      super(message);
      this.name = 'DeleteFailedError';
      this.statusCode = 500;
    }
}