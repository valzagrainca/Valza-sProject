export class SelectFailedError extends Error {
    statusCode: number;

    constructor(message: string) {
      super(message);
      this.name = 'SelectFailedError';
      this.statusCode = 500;
    }
}