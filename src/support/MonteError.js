// Based on `ExtendableError` from
// http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax

export class MonteError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
    else {
      this.stack = (new Error(message)).stack;
    }
  }

  static UnimplementedMethod(method, methodName) {
    return new MonteError(`${method} (\`${methodName}\`) needs to be defined in order for the chart to be useful.`);
  }
}
