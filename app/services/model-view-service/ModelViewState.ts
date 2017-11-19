import { Derivable, Atom, atom } from "derivable";
import { DT } from "../imports";

export class ModelViewState {
  public model: Atom<DT.SyncreticModel>;
  public expanded = atom(false);
  public pinned = atom(false);
  public priority = atom(0);

  constructor(model: DT.SyncreticModel) {
    this.model = atom(model);
  }
}
