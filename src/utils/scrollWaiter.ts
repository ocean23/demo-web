class ScrollQueue {
  private resolve: (() => void) | null = null;

  private promise: Promise<any> | null = null;

  add() {
    this.promise = new Promise((resolve: any) => {
      this.resolve = resolve;
    });
  }

  flush() {
    // eslint-disable-next-line no-unused-expressions
    this.resolve && this.resolve();
    this.resolve = null;
    this.promise = null;
  }

  async wait() {
    await this.promise;
  }
}

const scrollWaiter = new ScrollQueue();

export default scrollWaiter;
