import { AlinaComponent, Alina } from "derivable-alina";
import { makeTemplate } from "alina";
import { Derivable } from "derivable";
import { DT, SRV } from "../Imports";
import { RenderModelView } from "./RenderModelView";

const template = makeTemplate(`
  <div class="model-list>
    <template>
      <iframe class="model-list__item" width=@modelWidth height=@modelHeight>
      </iframe>
    </template>
  </div>
`);

export class MasonryModelList extends AlinaComponent {
  constructor(root, private services: SRV.$ModelViewService) {
    super(root);
  }

  onInit() { this.render(this.root);  }
  
  render(root: Alina) {
    root.repeat("iframe", this.services.modelViewService.models, (item, model) => {
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