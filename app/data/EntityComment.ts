import {IDataEntity, EntityType } from "./IDataEntity";

export class EntityComment implements IDataEntity {
    public id: string;
    /** Taraget entity id */
    public parent: string;
    public get type() { return EntityType.EntityComment }

    public replyToCommentID: string;
    public userID: string;
    public text: string;
    public dateTime: Date;
}
