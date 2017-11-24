import { IAccessRights } from "../access/IAccessRights";
import {ISyncreticObjectLocation} from "./ISyncreticObjectLocation";
import {CustomAttribute} from "./CustomAttribute";
import {HistoryEntry} from "../history/HistoryEntry";
import {EntityComment} from "../EntityComment";
import {IDataEntity, EntityType, IUserSpecific} from "../IDataEntity";

export class SyncreticObject implements IDataEntity {
    public id: string;
    /** Model elements */
    public related: string[]; 
    /** ObjectSource id */
    public parent: string;
    public name: string;
    public readonly type = EntityType.SyncreticObject;
    public objectType: string;
    public customDigestAttributes: CustomAttribute[];
    public details: SyncreticObjectDetails;
}

export class SyncreticObjectDetails implements IDataEntity  {
    /** Parent SyncreticObject ID */
    public objectID: string;
    public id: string;
    public get type() { return EntityType.SyncreticObjectDetails }

    public description: string;
    public customAttributes: CustomAttribute[];
    public history: HistoryEntry[];
    public comments: EntityComment[];
    public access: IAccessRights;
    /** Info where object physically located */
    public location: ISyncreticObjectLocation;
}