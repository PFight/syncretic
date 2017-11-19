import { ModelViewType, Size, SyncreticModelElementView, SyncreticModelView } from './SyncreticModelView'; 

export class HtmlModelView implements SyncreticModelView {
    public previewSize: Size;
    public prefferedSize: Size;
    public minSize: Size;
    public maxSize: Size;
    public defaultExanded: boolean = false;
    public type = ModelViewType.Html;

    public html: string;
}

export class HtmlModelElementView implements SyncreticModelElementView {
    type = ModelViewType.Html;
    nodeId: string;
}