import { AlinaComponent, Alina } from "derivable-alina";
import { makeTemplate } from "alina-core";
import { Derivable } from "derivable";
import { DT, SRV } from "../Imports";
import { RenderModelView } from "./RenderModelView";

const template = makeTemplate(`
  <div class="model-list">
    <template id="model-item">
      <iframe class="model-list__item" width=@modelWidth height=@modelHeight>
      </iframe>
    </template>
  </div>
`);

export class MasonryModelList extends AlinaComponent {
  constructor(root, private services: SRV.$ModelViewService) {
    super(root);
  }

  onInit() {
    this.root.tpl().setChild(template, (root) => {
      this.render(root);
    });
  }
  
  render(root: Alina) {
    root.repeat("#model-item", this.services.modelViewService.models, (item, model) => {
      item.on(model.size, () => {
        item.set("@modelWidth", model.size.get().width);
        item.set("@modelHeight", model.size.get().height);
      });
      item.on(model.model, () => 
        item.call(RenderModelView, model.model.get().view)
      );
    });
  }
}