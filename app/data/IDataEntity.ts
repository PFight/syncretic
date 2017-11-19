import { IAccessRights } from "./access/IAccessRights";
import {ITimestampObject} from "./ITimestampObject";

/**
 * Entity hierarchy
 *
 *  ModelCategoryTree
 *   ModelCategory
 *      SyncreticModel
 *          ModelElement
 * 
 * ObjectSource
 *  SyncreticObject
 * 
 * IDataEntity
 *  HistoryEntry
 * IDataEntity
 *  EntityComment
 */

/** Enums entities, that stared in database */
export enum EntityType {
    /** Tree of categories, without models */
    ModelCategoryTree,
    /** Element of ModelCategoryTree */
    ModelCategory,
    /** SyncreticModel with all its elements */
    SyncreticModel,
    /** SyncreticModel element */
    ModelElement,
    /** SyncreticObject list */
    SyncreticObject,
    /** SyncreticObjectDetails of the specified SyncreticObject */
    SyncreticObjectDetails,
    /** Some of ITimestampObject dependent on target type */
    TimestampObject,
    /** History of CategoryTree, SyncreticModel */
    HistoryEntry,
    /** Comments of CategoryTree, SyncreticModel */
    EntityComment,
    /** Physical location of object - IObjectsSource */    
    ObjectSource
}

export interface IDataEntity {
    id: string;
    parent?: string;
    related?: string[];
    type: EntityType;
    access?: IAccessRights;
    timestamp?: ITimestampObject;
}

export interface IUserSpecific {
    targetID: string;
    userID: string;
    visible: boolean;
}