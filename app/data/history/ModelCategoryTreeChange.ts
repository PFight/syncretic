import { HistoryEntry, HistoryEntryTragetType } from "./HistoryEntry"; 

export class ModelCategoryTreeChange extends HistoryEntry {
    public constructor() {
        super();
        this.targetType = HistoryEntryTragetType.ModelCategoryTree;
    }
}