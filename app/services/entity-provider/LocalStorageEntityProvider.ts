import { IEntityRef, Paging } from "./EntityRef";
import { OperationResult, IOperationResult } from "./EntityOperationResult";
import { IEntityProvider } from "./IEntityProvider"
import { $Storage } from "../Storage";
import { DT } from "../imports";

class DataBase {
    entities: DT.IDataEntity[] = [];
    idCounter = 0;
}

export class LocalStorageEntityProvider implements IEntityProvider {
    private db: DataBase;
    private dbKey = "LocalStorageEntityProvider_DB";
    entitiesMap: { [id: string]: DT.IDataEntity } = {};

    constructor(private services: $Storage) {
        this.loadDB();
    }

    private loadDB() {
        let str = this.services.storage.get(this.dbKey);
        if (str) {
            this.db = JSON.parse(str);
        } else {
            this.db = new DataBase();
        }
        this.entitiesMap = {};
        this.db.entities.forEach(x => this.entitiesMap[x.id] = x);
    }

    private saveDB() {
        this.services.storage.set(this.dbKey, JSON.stringify(this.db));
        this.entitiesMap = {};
        this.db.entities.forEach(x => this.entitiesMap[x.id] = x);
    }

    async load<T extends DT.IDataEntity = DT.IDataEntity>(ref: IEntityRef): Promise<T> {
        let result = this.entitiesMap[ref.id] as T;
        if (result) return result;
        else throw new Error("No entity with such id");
    }

    async loadAll<T extends DT.IDataEntity = DT.IDataEntity>(refs: IEntityRef[]): Promise<T[]> {
        let result: DT.IDataEntity[] = [];
        for (let ref of refs) {
            result = result.concat(await this.load(ref));
        }
        return result as T[];
    }

    async refresh(entity: DT.IDataEntity): Promise<IOperationResult> {
        let loaded = await this.load({ id: entity.id, parent: entity.parent,
            timestamp: entity.timestamp, type: entity.type});
        for (let prop in loaded) {
            if (prop != "type") {
                entity[prop] = loaded[prop];
            }
        }
        return { success: true };
    }
    async refreshAll(entities: DT.IDataEntity[]): Promise<IOperationResult> {
        for (let entity of entities) { 
            await this.refresh(entity);
        }
        return { success: true };
    }


    async loadChildren<T extends DT.IDataEntity = DT.IDataEntity>(ref: IEntityRef, 
        childrenType: DT.EntityType, 
        paging: Paging): Promise<T[]> 
    {
        return this.paginate( 
            this.db.entities.filter(ent => 
                ent.type == childrenType && ent.parent == ref.id),
            paging) as T[];
    }
    async loadRelated<T extends DT.IDataEntity = DT.IDataEntity>(ref: IEntityRef, 
        relatedType: DT.EntityType, 
        paging: Paging): Promise<T[]>
    {
        return this.paginate( 
            this.db.entities.filter(ent => 
                ent.type == relatedType && ent.related.indexOf(ref.id) >= 0),
            paging) as T[];
    }

    async save(entity: DT.IDataEntity): Promise<IOperationResult> {
        let ent = this.entitiesMap[entity.id];
        if (ent) {
            for (let prop in entity) {
                if (prop != "type") {
                    ent[prop] = entity[prop];
                }
            }
        } else {
            throw new Error(`No entity with id ${entity.id}. Call add to add new entity.`);
        }
        this.saveDB();
        return { success: true };
    }
    async saveAll(entities: DT.IDataEntity[]): Promise<IOperationResult> {
        for (let entity of entities) { 
            await this.save(entity);
        }
        return { success: true };
    }

    async add(entity: DT.IDataEntity): Promise<OperationResult<DT.IDataEntity>> {
        if (entity.id)
            throw new Error("New entity should not contain ID.");
        entity.id = (++this.db.idCounter).toString();
        this.db.entities.push({...entity});
        this.saveDB();
        return { success: true, data: entity };
    }
    async addAll(entities: DT.IDataEntity[]): Promise<OperationResult<DT.IDataEntity>[]> {
        let results = [] as OperationResult<DT.IDataEntity>[];
        for (let entity of entities) { 
            let result = await this.add(entity);
            results.push(result);
        }
        return results;
    }

    async delete(entity: DT.IDataEntity): Promise<IOperationResult> {
        let index = this.db.entities.findIndex(x => x.id == entity.id);
        if (index >= 0) {
            this.db.entities.splice(index, 1);
        }
        this.saveDB();
        return { success: true };
    }
    async deleteAll(entities: DT.IDataEntity[]): Promise<IOperationResult> {
        for (let ent of entities)
            await this.delete(ent);
        return { success: true };
    }
    
    async loadTimestamp(target: IEntityRef): Promise<DT.ITimestampObject> {
        return target.timestamp;
    }
    async loadTimestampAll(targets: IEntityRef[]): Promise<DT.ITimestampObject[]> {
        return targets.map(x => x.timestamp);
    }

    protected paginate(entities: DT.IDataEntity[], paging: Paging) {
        return entities.slice(paging.skip, paging.skip + paging.maxCount);
    }
}