import {User} from "./types/user";
declare global{
    interface CustomJwtSessionClaims extends User{}
}