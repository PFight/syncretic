
export interface IOperationResult {
    success: boolean;
    errorMsg?: string;
    errorCode?: string;
    documentsAffected?: number;
}


export class OperationResult<T> implements IOperationResult {
    public success: boolean;
    public errorMsg?: string;
    public errorCode?: string;
    public documentsAffected?: number;
    public data: T;
}