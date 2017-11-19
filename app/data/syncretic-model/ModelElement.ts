import {IAccessRights } from "../access/IAccessRights";
import {SyncreticModel, SyncreticModelTimestamp} from "./SyncreticModel";
import {SyncreticModelElementView } from "./SyncreticModelView";
import {ITimestampObject} from "../ITimestampObject";
import {IDataEntity, EntityType } from "../IDataEntity";

export class ModelElement implements IDataEntity {
    get type(): EntityType { return EntityType.ModelElement; }
    public name: string;
    public description: string;
    public id: string;
    /** SyncreticModel id */
    public parent: string;
    public access: IAccessRights;
    public children: ModelElement[];
    public parentModel: SyncreticModel;
    public view: SyncreticModelElementView;

    public timestamp: ModelElementTimestamp;
    public userSpecific: ModelElementUserSpecific;
}

export class ModelElementTimestamp implements ITimestampObject {
    public targetID: string;
    public parent: ModelElementTimestamp;
    public children: ModelElementTimestamp[];

    /** Timestamp of the associated objects */
    public objectsTimestamp: number;
}

export class ModelElementUserSpecific {
    public targetID: string;
    public visible: boolean;
    public children: ModelElementUserSpecific[];
}