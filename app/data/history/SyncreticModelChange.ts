import { HistoryEntry, HistoryEntryTragetType } from "./HistoryEntry"; 

export class SyncreticModelChange extends HistoryEntry {
    public constructor() {
        super();
        this.targetType = HistoryEntryTragetType.SyncreticModel;
    }
}