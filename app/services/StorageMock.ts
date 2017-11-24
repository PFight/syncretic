
import { Storage } from "./Storage";

export class StorageMock implements Storage {
  constructor(public storage: { [key: string]: string }) {
  }

  public get(key: string): string {
    return this.storage[key];
  }
  public set(key: string, value: string) {
    this.storage[key] = value;
  }
}