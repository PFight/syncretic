import { DT } from "../imports";

export interface IEntityRef {
    id: string;
    parent?: string;
    type?: DT.EntityType;
    timestamp?: DT.ITimestampObject;
}

export interface Paging {
    skip: number;
    maxCount: number;
}
