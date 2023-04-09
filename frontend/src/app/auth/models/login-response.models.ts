import { LoggedInUser } from "src/app/core/models/user";

export interface LoginResponseModel {
  token: string;
  user: LoggedInUser;
}