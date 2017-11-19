
import * as DJS from "derivable";

export type Atomized<T> = {
  [P in keyof T]: DJS.Atom<T[P]>;
}
export function atomize<T>(src: T): Atomized<T> {
  let target = {} as any;
  for (let p in src) {
      target[p] = DJS.atom(src[p]);
  }
  return target;
}

export function deatomize<T>(model: Atomized<T>): T {
  let target = {} as any;
  for (let p in model) {
      let item = model[p];
      if (DJS.isAtom(item)) {
        target[p] = item.get();
      };
  }
  return target;
}