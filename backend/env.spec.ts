import dotenv from 'dotenv';
dotenv.config();

describe('Environment variables', () => {
    it('should render environment variables correctly', () => {
      expect(process.env.PORT).toEqual('3001');
      expect(process.env.USER).toEqual('postgres');
      expect(process.env.HOST).toEqual('localhost');
      expect(process.env.DATABASE).toEqual('Whatsapp');
      expect(process.env.PASSWORD).toEqual('1234');
      expect(process.env.DB_PORT).toEqual('5432');
    });
});