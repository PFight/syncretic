import { LocalStorageEntityProvider, ModelViewService, Paging } from '../index';
import * as chai from 'chai'; 
import * as chaiAsPromised from "chai-as-promised";
import { DT } from "../imports";
import { atom } from 'derivable';
import { StorageMock } from '../StorageMock';

chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;


class MockEntityProvider extends LocalStorageEntityProvider {
  onLoadAllOf: (entityType: DT.EntityType, paging: Paging) => void;

  async loadAllOf<T extends DT.IDataEntity = DT.IDataEntity>(
    entityType: DT.EntityType,
    paging: Paging): Promise<T[]>
  {
      this.onLoadAllOf && this.onLoadAllOf(entityType, paging);
      return super.loadAllOf<T>(entityType, paging);
  }
}

async function createServices() {
  let appInit = atom(false);
  let entityProvider = new MockEntityProvider(
    { storage: new StorageMock({}) });
  let models = [];
  for (let i = 0; i < 20; i++) {
    let m = new DT.SyncreticModel();
    m.name = "Model №" + i;
    m.description = "Test model";
    models.push(m);
  }
  await entityProvider.addAll(models);
  let modelViewPageSize = 10;
  return { appInit, entityProvider, modelViewPageSize};
}

describe('services/model-view-service', () => {
  it('should load first page on app init', async () => {
    let services = await createServices();
    let service = new ModelViewService(services);

    let requestedEntityType: DT.EntityType;
    let requestedPaging: Paging;
    services.entityProvider.onLoadAllOf = (type, paging) => {
      requestedEntityType = type;
      requestedPaging = paging;
    };
    services.appInit.set(true);
    
    expect(requestedEntityType).equal(DT.EntityType.SyncreticModel);
    expect(requestedPaging.skip).equal(0);
    expect(requestedPaging.maxCount).equal(services.modelViewPageSize);
  });
  it('should load models on init ', async () => {
    let services = await createServices();
    let service = new ModelViewService(services);

    await service.init();

    let models = await services.entityProvider.loadAllOf(
      DT.EntityType.SyncreticModel,
      {skip: 0, maxCount: services.modelViewPageSize});

    expect(service.models.get().length).equal(services.modelViewPageSize);
    expect(JSON.stringify(service.models.get()[0].model.get()))
      .equal(JSON.stringify(models[0]));
    expect(service.models.get()[0].expanded.get()).equal(false);
    expect(service.models.get()[0].pinned.get()).equal(false);
    expect(service.models.get()[0].priority.get()).equal(0);
    const lastModel = service.models.get()[services.modelViewPageSize - 1].model.get();
    const lastModelActual: any = models[services.modelViewPageSize - 1];
    expect(JSON.stringify(lastModel))
      .equal(JSON.stringify(lastModelActual));
  });
  it('should load next page', async () => {
    let services = await createServices();
    let service = new ModelViewService(services);

    await service.init();
    await service.loadMore();

    let models = await services.entityProvider.loadAllOf(
      DT.EntityType.SyncreticModel,
      {skip: 0, maxCount: services.modelViewPageSize*2});


    expect(service.models.get().length).equal(services.modelViewPageSize * 2);
    expect(JSON.stringify(service.models.get()[0].model.get()))
      .equal(JSON.stringify(models[0]));
    let lastModel = service.models.get()[services.modelViewPageSize*2-1].model.get();
    let lastModelActual = models[services.modelViewPageSize*2-1]; 
    expect(JSON.stringify(lastModel)).equal(JSON.stringify(lastModelActual));
  });
});