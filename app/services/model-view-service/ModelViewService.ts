import { DT, UT } from "../imports";
import { Derivable, Atom, atom } from "derivable";
import { $EntityProvider, Paging } from "../entity-provider/index";
import { ModelViewState } from "./ModelViewState";
import { $AppLifecycle } from "../Common";

export type $ModelViewPaging = { modelViewPageSize?: number; }

export class ModelViewService {
  private _models: Atom<ModelViewState[]> = atom([]);
  public readonly state = new UT.LoadingState();

  constructor(private services: $EntityProvider & $ModelViewPaging & $AppLifecycle) {
    services.appInit.react(() => this.init());
  }

  public get models(): Derivable<ModelViewState[]> {
    return this._models;
  }

  public async init(): Promise<void> {
    let models = await this.loadPage({ skip: 0, maxCount: this.pageSize });
    this._models.set(models);
  }

  public async loadMore(): Promise<void> {
    let models = await this.loadPage({ 
      skip: this._models.get().length, maxCount: this.pageSize });
    this._models.set(this._models.get().concat(models));
  }

  protected loadPage(paging: Paging): Promise<ModelViewState[]> {
    return this.state.load(async () => {
      let models = await this.services.entityProvider.loadAllOf<DT.SyncreticModel>(
        DT.EntityType.SyncreticModel, paging);

      return models.map(x => new ModelViewState(x));
    }); 
  }

  protected get pageSize() {
    return UT.definedNotNull(this.services.modelViewPageSize) ?
      this.services.modelViewPageSize : 15;
  }
}

export type $ModelViewService = { modelViewService: ModelViewService };