class Dispatcher {
  // Singleton pattern logic
  private static instance: Dispatcher;

  private constructor() {}

  public static getInstance() {
    if (!Dispatcher.instance) {
      Dispatcher.instance = new Dispatcher();
    }
    return Dispatcher.instance;
  }
  // ----------

  // Observer pattern logic
  private subscriptions: any = [];

  public subscribe(subscriber: any) {
    this.subscriptions.push(subscriber);
  }

  public unsubscribe(subscriber: any) {
    this.subscriptions = this.subscriptions.filter(
      (subscription: any) => subscription !== subscriber
    );
  }

  public dispatch(action: any) {
    this.subscriptions.map((subscription: any) => {
      subscription(action);
    });
  }
  // ----------
}

export default Dispatcher.getInstance();
