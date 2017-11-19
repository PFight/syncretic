import { IUserRole } from "./IUserRole";

export interface IUser {
    displayName: string;
    ID: string;
    roles: IUserRole[];
}
