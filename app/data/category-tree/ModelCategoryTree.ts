import {ModelCategory, ModelCategoryTimestamp, ModelCategoryUserSpecific} from "./ModelCategory"
import { IAccessRights } from "../access/IAccessRights";
import {ITimestampObject} from "../ITimestampObject";
import {IDataEntity, EntityType, IUserSpecific} from "../IDataEntity";

export class ModelCategoryTree implements IDataEntity {
    
    public id: string;
    public readonly type = EntityType.ModelCategoryTree;
    public access: IAccessRights;
    public nodes: ModelCategory[];

    public timestamp: ModelCategoryTreeTimestamp;
    public userSpecific: ModelCategoryTreeUserSpecific;
}

export class ModelCategoryTreeTimestamp implements ITimestampObject {
    public targetID: string;

    /** Timestamp of the last category tree change */
    public categoriesTimestamp: number;
    /** Timestamp of the last models update */
    public modelsTimestamp: number;
    /** Timestamp of the last objects of all models change */
    public objectsTimestamp: number;

    public nodes: ModelCategoryTimestamp[];
} 

export class ModelCategoryTreeUserSpecific implements IUserSpecific {
    public targetID: string;
    public userID: string;
    public visible: boolean;

    public nodes: ModelCategoryUserSpecific[];
}