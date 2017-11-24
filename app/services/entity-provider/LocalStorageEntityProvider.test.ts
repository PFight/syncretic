import { LocalStorageEntityProvider } from './index';
import * as chai from 'chai'; 
import * as chaiAsPromised from "chai-as-promised";
import { Storage } from "../Storage";
import { DT } from "../imports";
import { StorageMock } from '../StorageMock';

chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

function create() {
  let services = { storage: new StorageMock({}) };
  let provider = new LocalStorageEntityProvider(services);
  return provider;
}

describe('services/entity-provider', () => {
  it('should add entity', async () => {
    let provider = create();
    let model = new DT.SyncreticModel();
    model.name = "model";
    await provider.add(model);
    let result = await provider.load(
      { id: model.id, type: model.type});

    expect(JSON.stringify(result)).equal(JSON.stringify(model));
  });
  it('should update id on add ', async () => {
    let provider = create();
    let tree = new DT.ModelCategoryTree();
    let result = await provider.add(tree);

    expect(tree.id).not.equal(undefined);
  });
  it('should add all entities', async () => {
    let provider = create();
    let model1 = new DT.SyncreticModel();
    model1.name = "model1";
    let model2 = new DT.SyncreticModel();
    model2.description = "model2 description";
    await provider.addAll([model1, model2]);
    
    let result = await provider.loadAll([
      { id: model1.id, type: model1.type},
      { id: model2.id, type: model2.type },
    ]);
    expect(result.length).equal(2);
    expect(JSON.stringify(result[0])).equal(JSON.stringify(model1));
    expect(JSON.stringify(result[1])).equal(JSON.stringify(model2));
  });
  it('should save entity', async () => {
    let provider = create();
    let model = new DT.SyncreticModel();
    await provider.add(model);

    const newName = "new name";
    model.name = newName;
    await provider.save(model);
    let result = await provider.load<DT.SyncreticModel>(
      { id: model.id, type: model.type });

    expect(result.name).equal(newName);
  });
  it('should refresh entity', async () => {
    let provider = create();
    let model = new DT.SyncreticModel();
    await provider.add(model);

    const newName = "new name";
    model.name = newName;
    await provider.save(model);
    model.name = null;
    await provider.refresh(model);

    expect(model.name).equal(newName);
  });
  it('should save all entities', async () => {
    let provider = create();
    let model1 = new DT.SyncreticModel();
    let model2 = new DT.SyncreticModel();
    await provider.addAll([model1, model2]);
    
    
    const newDescr1 = "new descr 1";
    model1.description = newDescr1;
    const newDescr2 = "new descr 2";
    model2.description = newDescr2;    
    await provider.saveAll([model1, model2]);

    await provider.refreshAll([model1, model2]);

    expect(model1.description).equal(newDescr1);
    expect(model2.description).equal(newDescr2);
  });
  it('should delete entity', async () => {
    let provider = create();
    let tree = new DT.ModelCategoryTree();
    await provider.add(tree);
    await provider.delete(tree);

    //expect(provider.refresh(tree)).to.be.rejected;
  });
});