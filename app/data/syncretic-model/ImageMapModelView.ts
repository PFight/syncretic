import { ModelViewType, Size, SyncreticModelElementView, SyncreticModelView } from './SyncreticModelView'; 

export class ImageMapModelView implements SyncreticModelView {
    public previewSize: Size;
    public prefferedSize: Size;
    public minSize: Size;
    public maxSize: Size;
    public defaultExanded: boolean;
    public type = ModelViewType.ImageMap;
    
    imageSrc: string;
    viewportSize: Size;
}

export class ImageMapModelElementView implements SyncreticModelElementView {
    type = ModelViewType.ImageMap;

    shape: string;
    coords: string;
}