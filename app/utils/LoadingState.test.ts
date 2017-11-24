import * as chai from 'chai'; 
import * as chaiAsPromised from "chai-as-promised";
import { atom } from 'derivable';
import { LoadingState } from './index';

chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;


describe('utils/LoadingState', () => {
  it('should return job data', async () => {
    let loadingState = new LoadingState();
    let originalData = 42;
    let data = await loadingState.load(async () => originalData);

    
    expect(data).equal(originalData);
  });
  it('should change loading state during load', async () => {
    let loadingState = new LoadingState();
    let state1 = loadingState.loading.get();
    let state2: boolean;
    await loadingState.load(async () => {
      state2 = loadingState.loading.get();
      return 42;
    });
    let state3 = loadingState.loading.get();

    expect(state1).equal(false);
    expect(state2).equal(true);
    expect(state3).equal(false);
  });
  it('should change error state on reject', async () => {
    let loadingState = new LoadingState();
    const errorMsg = "It is error";
    let state1 = loadingState.error.get();
    await loadingState.load(async () => {
      throw new Error(errorMsg);
    });
    let state2 = loadingState.error.get();
    
    expect(state1).equal("");
    expect(state2).equal(errorMsg);
  });
});