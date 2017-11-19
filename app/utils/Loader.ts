import { atom } from "derivable";

export class LoadingState {
  public loading = atom(false);
  public error = atom("");

  public async load<T>(job: () => Promise<T>) {
    this.loading.set(true);
    try {
      return await job();
    } catch(err) {
      this.error.set(err);
    } finally {
      this.loading.set(false);
    }
  }
}