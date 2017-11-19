import {IDataEntity, EntityType } from "../IDataEntity";

export class HistoryEntry implements IDataEntity {
    public id: string;
    /** Target entity id */
    public parent: string;
    public get type() { return EntityType.EntityComment }

    userID: string;
    dateTime: Date;
    targetType: HistoryEntryTragetType;
    displayValue: string;
}

export enum HistoryEntryTragetType {
    ModelCategoryTree,
    SyncreticModel,
    SyncreticObject
}