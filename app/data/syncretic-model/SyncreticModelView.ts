export enum ModelViewType {
    ImageMap,
    Html
}

export class Size {
    width: number;
    height: number;
}

export interface SyncreticModelView {
    type: ModelViewType;
    previewSize: Size;
    prefferedSize: Size;
    minSize: Size;
    maxSize: Size;
    defaultExanded: boolean;
}

export class SyncreticModelElementView {
    type: ModelViewType;
}