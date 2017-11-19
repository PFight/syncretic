export class Storage {
  public get(key: string): string {
    return localStorage.getItem(key);
  }
  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}

export type $Storage = { storage: Storage };