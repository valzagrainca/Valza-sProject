import { LoggedInUser } from "src/app/core/models/loggedInUser";

export interface LoginResponseModel {
  token: string;
  user: LoggedInUser;
}