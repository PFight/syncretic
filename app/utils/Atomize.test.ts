import { expect } from 'chai';
import * as Models from "./Index";
import * as DJS from "derivable";

interface Test {
  num: number;
  arr: string[];
}
type TestA = Models.Atomized<Test>;

describe('utils/Atomize', () => {
  it('should atomize objects', async () => {
    let obj = { num: 42, arr: ["hello", "there"] } as Test;
    let aobj = Models.atomize(obj);
    expect(aobj.num.get())
      .equal(obj.num);
    expect(aobj.arr.get())
      .equal(obj.arr);
  });
  it('should deatomize objects', async () => {
    let aobj = { num: DJS.atom(42), arr: DJS.atom(["hello", "there"]) } as TestA;
    let obj = Models.deatomize(aobj);
    expect(obj.num)
      .equal(aobj.num.get());
    expect(obj.arr)
      .equal(aobj.arr.get());
  });
});