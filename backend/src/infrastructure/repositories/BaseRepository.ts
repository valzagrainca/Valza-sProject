
import { IBaseRepository } from "../repositoryInterfaces/IBaseRepository";
import { UpdateFailedError } from "../errors/UpdateFailedError";
import { QueryResult } from "pg";
import { DeleteFailedError } from "../errors/DeleteFailedError";
import { SelectFailedError } from "../errors/SelectFailedError";

export class BaseRepository<T>  implements IBaseRepository<T> {
    constructor(private db: any){
    }

    async fetchAll(tableName: string): Promise<T[]> {
        const queryResult = await this.db.query(`SELECT * FROM ${tableName}`);
        const result: T[] = Array.from(queryResult.rows);
        return result;
    }

    async findById(id: number, tableName: string): Promise<T>{
        const queryResult=await this.db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
        const filteredById=queryResult.rows[0];
        return filteredById;
    };
    
    async findByEmail(email: string, tableName: string): Promise<T>{
      const queryResult=await this.db.query(`SELECT * FROM ${tableName} WHERE email = $1`, [email]);
      const filteredById=queryResult.rows[0];
      return filteredById;
  };

    async deleteById(id: number, tableName: string): Promise<Boolean> {
      const res = await this.db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
      return res.rowCount === 1;
    };
    
    async updateById(tableName: string, values: Record<string, any>, where: Record<string, any>): Promise<Boolean> {
      const columns = Object.keys(values);
      const whereColumns = Object.keys(where);
      
      const updateQuery = `
         UPDATE ${tableName}
         SET ${columns.map((c, i) => `"${c}"=$${i + 1}`).join(', ')}
         WHERE ${whereColumns.map((c, i) => `"${c}"=$${i + columns.length + 1}`).join(' AND ')}
         `;
      const updateValues = [...Object.values(values), ...Object.values(where)];

      const updated=await this.db.query(updateQuery, updateValues);
      return updated.rowCount===1;
    };

    async  callFunction(funcName: string, ...params: any[]): Promise<any[]>{
      const placeholders = params.map((_, i) => `$${i+1}`).join(',');
      const query = `SELECT * FROM ${funcName}(${placeholders});`;
      const result = await this.db.query(query, params);
      return result.rows;
    }

    async  callProcedure(procedureName: string, ...params: any[]): Promise<boolean>{
      const placeholders = params.map((_, i) => `$${i+1}`).join(',');
      const query = `CALL ${procedureName}(${placeholders});`;
      const result = await this.db.query(query, params);
      return result.rowCount===1;
    }

}