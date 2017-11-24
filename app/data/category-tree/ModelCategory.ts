import { IAccessRights } from "../access/IAccessRights";
import { ModelCategoryTree } from "./ModelCategoryTree";
import {ITimestampObject} from "../ITimestampObject";
import { IDataEntity, EntityType } from "../IDataEntity";

export class ModelCategory implements IDataEntity {
    public readonly type = EntityType.ModelCategoryTree;
    public name: string;
    public description: string;
    public id: string;
    /** Category tree id */
    public parent: string;
    public access: IAccessRights;
    /** How many parents category has */
    public level: number;
    public parentTree: ModelCategoryTree;
    public children: ModelCategory[];
    /** ID list of the category models. */
    public models: string[];

    public timestamp: ModelCategoryTimestamp;
    public userSpecific: ModelCategoryUserSpecific;
}

export class ModelCategoryTimestamp implements ITimestampObject {
    public targetID: string;

    /** Timestamp of the last models update */
    public modelsTimestamp: number;
    /** Timestamp of the last objects of all models change */
    public objectsTimestamp: number;

    public parent: ModelCategoryTimestamp;
    public children: ModelCategoryTimestamp[];
}

export class ModelCategoryUserSpecific {
    public targetID: string;
    public visible: boolean;
    public children: ModelCategoryUserSpecific[];
}