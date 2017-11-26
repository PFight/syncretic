import { Alina } from "derivable-alina";
import { DT } from "../Imports";

export function RenderModelView(root: Alina, view: DT.SyncreticModelView) {
  if (view.type == DT.ModelViewType.Html) {
    let htmlView = view as DT.HtmlModelView;
    root.nodeAs<HTMLIFrameElement>().contentWindow.document.write(htmlView.html);
  } else {
    throw new Error("Not supported view type");
  }
}