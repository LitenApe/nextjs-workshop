export class Logger {
  private src;
  private name: string;

  constructor(name: string) {
    this.src = console;
    this.name = name;
  }

  error(...args: Array<unknown>) {
    this.src.error(`[${this.name}]`, args);
  }

  trace(...args: Array<unknown>): void {
    if (process.env.NODE_ENV !== "production") {
      this.src.trace(`[${this.name}]`, args);
    }
  }
}
