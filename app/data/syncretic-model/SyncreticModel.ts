import { IAccessRights } from "../access/IAccessRights";
import { ModelElement, ModelElementTimestamp, ModelElementUserSpecific } from "./ModelElement";
import { SyncreticModelView } from "./SyncreticModelView";
import {ITimestampObject} from "../ITimestampObject";
import {IDataEntity, EntityType, IUserSpecific} from "../IDataEntity";

export class SyncreticModel implements IDataEntity {
    public name: string;
    public description: string;
    public id: string;
    /** ModelCategory ID */
    public parent: string;
    public readonly type = EntityType.SyncreticModel;
    public access: IAccessRights;
    /** ID list of categories from different trees, containing this model. */
    public categories: [string];
    public elements: ModelElement[];
    public view: SyncreticModelView;

    public timestamp: SyncreticModelTimestamp;
    public userSpecific: SyncreticModelUserSpecific;
}

export class SyncreticModelTimestamp implements ITimestampObject {
    public targetID: string;
     /** Timestamp of the model itself */
    public timestamp: number;
    /** Timestamp of the associated objects */
    public objectsTimestamp: number;

    public elements: ModelElementTimestamp[];
}

export class SyncreticModelUserSpecific implements IUserSpecific {
    public targetID: string;
    public userID: string;
    public visible: boolean;

    public elements: ModelElementUserSpecific[];
}