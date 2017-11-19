import { IEntityRef, Paging } from './EntityRef';
import { OperationResult, IOperationResult } from "./EntityOperationResult";
import { DT } from "../imports";

export interface IEntityProvider {
    load<T extends DT.IDataEntity = DT.IDataEntity>(ref: IEntityRef): Promise<T>;
    loadAll<T extends DT.IDataEntity = DT.IDataEntity>(refs: IEntityRef[]): Promise<T[]>;
    loadChildren<T extends DT.IDataEntity = DT.IDataEntity>(ref: IEntityRef, 
        childrenType: DT.EntityType, 
        paging: Paging): Promise<T[]>;
    loadRelated<T extends DT.IDataEntity = DT.IDataEntity>(ref: IEntityRef, 
        relatedType: DT.EntityType, 
        paging: Paging): Promise<T[]>;
    loadAllOf<T extends DT.IDataEntity = DT.IDataEntity>(
        entityType: DT.EntityType,
        paging: Paging): Promise<T[]>;
    refresh(entity: DT.IDataEntity): Promise<IOperationResult>;
    refreshAll(entities: DT.IDataEntity[]): Promise<IOperationResult>;

    save(entity: DT.IDataEntity): Promise<IOperationResult>;
    saveAll(entity: DT.IDataEntity[]): Promise<IOperationResult>;

    add(entity: DT.IDataEntity): Promise<OperationResult<DT.IDataEntity>>;
    addAll(entity: DT.IDataEntity[]): Promise<OperationResult<DT.IDataEntity>[]>;

    delete(entity: DT.IDataEntity): Promise<IOperationResult>;
    deleteAll(entity: DT.IDataEntity[]): Promise<IOperationResult>;
    
    loadTimestamp(target: IEntityRef): Promise<DT.ITimestampObject>;
    loadTimestampAll(targets: IEntityRef[]): Promise<DT.ITimestampObject[]>;
}

export type $EntityProvider = { entityProvider: IEntityProvider };