import { IUser } from "./IUser";

export interface IAccessRights {
    grantUser(userID: string, operations: string[]);
    revokeUser(userID: string, operations: string[]);
    grantRole(roleID: string, operations: string[]);
    revokeRole(roleID: string, operations: string[]);

    grantAll(operations: string[]);
    revokeAll(operations: string[]);

    granted: IGrantedAccess[];
    allGranted: IGrantedAccess[];

    checkUserAccess(user: IUser, operations: string[]): boolean;
}

export interface IGrantedAccess {
    userID: string;
    roleID: string;
    operations: string[];
}
