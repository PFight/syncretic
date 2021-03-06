import {IDataEntity, EntityType } from "../IDataEntity";
import { IAccessRights } from "../index";

export abstract class ObjectsSource implements IDataEntity {
    public id: string;
    public readonly type = EntityType.ObjectSource;
    public access?: IAccessRights;
    public name: string;
    public sourceType: ObjectSourceType;
}

export enum ObjectSourceType {
    FileSystem
}
