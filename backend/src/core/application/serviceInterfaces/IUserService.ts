import User from "../../domain/entities/users";

export interface IUserService {
  getUsers: (tableName : string) => Promise<User[]>;
  getUserById: (id: number, tableName : string) => Promise<User | null>;
  deleteUserById: (id: number,tableName : string) => Promise<Boolean>;
  updateUser: (
    id: number,
    username: string,
    email:string,
    phone: string,
    password:string,
    first_name: string,
    last_name: string,
    status: string,
    profile_picture: string, 
    tableName : string
  ) => Promise<Boolean>;
  getUserByEmail: (email : string, tableName : string)=>Promise<User | null>;
  insertUser:(username: string,email: string,phone: string,password: string, procedureName : string)=>Promise<Boolean>;
}
