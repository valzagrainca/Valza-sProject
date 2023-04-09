import db from "../dbConnection/database";

describe('Database connection pool', ()=>{
    it('should return successful connection',async ()=>{
        const res= await db.query('SELECT $1::text as message', ['Hello world!']);
        expect(res.rows[0].message).toEqual('Hello world!');
    })
});