import { Derivable, Atom, atom, derivation } from "derivable";
import { DT } from "../imports";

export class ModelViewState {
  public model: Atom<DT.SyncreticModel>;
  public expanded = atom(false);
  public pinned = atom(false);
  public priority = atom(0);
  public size = derivation(() => {
    if (this.expanded.get())
      return this.model.get().view.prefferedSize;
    else
      return this.model.get().view.previewSize;
  });

  constructor(model: DT.SyncreticModel) {
    this.model = atom(model);
    this.expanded.set(model.view.defaultExanded);
  }
}
