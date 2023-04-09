import { QueryResult } from "pg";
import { SelectFailedError } from "../errors/SelectFailedError";

export interface IBaseRepository<T> {
    fetchAll(tableName: string): Promise<T[]>;
    deleteById(id: number, tableName: string): Promise<Boolean>;
    findById(id: number, tableName: string): Promise<T>;
    updateById(tableName: string, values: Record<string, any>, where: Record<string, any>): Promise<Boolean> ;
    callFunction(funcName: string, ...params: any[]): Promise<any[]>;
    findByEmail(email: string, tableName: string): Promise<T>;
    callProcedure(procedureName: string, ...params: any[]): Promise<boolean>;
}