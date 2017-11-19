import { HistoryEntry, HistoryEntryTragetType } from "./HistoryEntry"; 

export class SyncreticObjectChange extends HistoryEntry {
    public constructor() {
        super();
        this.targetType = HistoryEntryTragetType.SyncreticObject;
    }
}