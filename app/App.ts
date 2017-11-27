import { atom } from "derivable";
import { LocalStorageEntityProvider, Storage, ModelViewService } from "app/services";
import { Document } from "derivable-alina";
import { MasonryModelList } from "app/view";

const appInit = atom(false);
const entityProvider = new LocalStorageEntityProvider({
  storage: new Storage()
});
const modelViewService = new ModelViewService({ entityProvider, appInit });

Document.query("#app").mount(MasonryModelList, { modelViewService });