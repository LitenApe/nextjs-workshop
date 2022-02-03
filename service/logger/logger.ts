export class Logger {
  private src;
  private name: string;

  constructor(name: string) {
    this.src = console;
    this.name = name;
  }

  private executeCall(fn: Function, ...args: Array<unknown>): void {
    fn(`[${this.name}]`, ...args);
  }

  error(...args: Array<unknown>): void {
    this.executeCall(this.src.error, ...args);
  }

  info(...args: Array<unknown>): void {
    if (process.env.NODE_ENV !== "production") {
      this.executeCall(this.src.info, ...args);
    }
  }

  trace(...args: Array<unknown>): void {
    if (process.env.NODE_ENV !== "production") {
      this.executeCall(this.src.trace, ...args);
    }
  }
}
