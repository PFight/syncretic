import {ISyncreticModelView, ISyncreticModelElementView, SyncreticModelView } from "./SyncreticModelView"; 

export class ImageMapModelView implements ISyncreticModelView {
    type = SyncreticModelView.ImageMap;
    
    imageSrc: string;
    width: string;
    height: string;
    viewportWidth: string;
    viewportHeight: string;
}

export class ImageMapModelElementView implements ISyncreticModelElementView {
    type = SyncreticModelView.ImageMap;

    shape: string;
    coords: string;
}