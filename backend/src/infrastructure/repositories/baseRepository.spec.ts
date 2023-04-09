import { SelectFailedError } from "../errors/SelectFailedError";
import { BaseRepository } from "./BaseRepository";

describe("BaseRepository",()=>{
    it("should return the expected data from the database when a valid table name is passed as an argument to fetchAll()", async () => {
        const tableName='users';
        const mockData = [  { id: 1, first_name: 'User1', last_name:'Test', number:'+38348525254', 
        profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' },
        { id: 2, first_name: 'User2', last_name:'Test', number:'+3835556954', 
        profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' }
       ];

        // Jest mock function for db.query()
       // The mockQuery() function returns the mockData object when the query() method is called with this SQL string.
        const mockQuery = jest.fn().mockResolvedValue({ rows: mockData });
        const mockDb = { query: mockQuery };
        
        const repository = new BaseRepository(mockDb);
        
 
        const result = await repository.fetchAll(tableName);
        expect(result).toEqual(mockData);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
        expect(mockDb.query).toHaveBeenCalledWith(`SELECT * FROM ${tableName}`);
      });
      it("should return the expected data from the database when a valid id and table name are passed as arguments to findById()", async () => {
        const tableName = 'users';
        const mockData = { id: 1, first_name: 'User1', last_name: 'Test', number: '+38348525254', 
          profile_picture: 'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' };
      
        // Jest mock function for db.query()
        const mockQuery = jest.fn().mockResolvedValue({ rows: [mockData] });
        const mockDb = { query: mockQuery };
      
        const repository = new BaseRepository(mockDb);
      
        const result = await repository.findById(1, tableName);
        expect(result).toEqual(mockData);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
        expect(mockDb.query).toHaveBeenCalledWith(`SELECT * FROM ${tableName} WHERE id = $1`, [1]);
      });
      it("should return true when a valid id and table name are passed as arguments to deleteById()",async()=>{
        const tableName='users';
        const mockQuery=jest.fn().mockResolvedValue({rowCount:1});
        const mockDb={query:mockQuery};

        const repository=new BaseRepository(mockDb);

        const result=await repository.deleteById(1,tableName);
        expect(result).toEqual(true);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
        expect(mockDb.query).toHaveBeenCalledWith(`DELETE FROM ${tableName} WHERE id = $1`, [1]);  
     });
     it("should return true when a valid table name, valid values and valid conditions are passed as arguments to updateById()",async()=>{
        const tableName='users';
        const values = { first_name: 'NewName' };
        const where = { id: 1 };
      
        const expectedQuery = `
         UPDATE users
         SET "first_name"=$1
         WHERE "id"=$2
         `;
        const expectedValues = ['NewName', 1];
      
        const mockQuery=jest.fn().mockResolvedValue({rowCount:1});
        const mockDb={query:mockQuery};

        const repository=new BaseRepository(mockDb);

        const result=await repository.updateById(tableName, values, where);
        expect(result).toEqual(true);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
        expect(mockDb.query).toHaveBeenCalledWith(expectedQuery, expectedValues);
     });
     it("should return excepted values when a valid table name and valid parameters are passed as arguments to callFunction()",async()=>{
        const params={id:1};
        const funcName='get_user_chats';
        const expectedQuery = `SELECT * FROM ${funcName}($1);`;

        const mockData= {
            chat_id: 2,
            chat_name: 'group 2',
            group_picture: 'https://cdn2.vectorstock.com/i/1000x1000/26/66/profile-icon-member-society-group-avatar-vector-18572666.jpg',
            is_group: true,
            user_id: null,
            first_name: null,
            last_name: null,
            profile_picture: null
        }
      
        const mockQuery=jest.fn().mockResolvedValue({rows:mockData});
        const mockDb={query:mockQuery};

        const repository=new BaseRepository(mockDb);

        const result=await repository.callFunction(funcName,params);
        expect(result).toEqual(mockData);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
        expect(mockDb.query).toHaveBeenCalledWith(expectedQuery,[params]);
     });
});


