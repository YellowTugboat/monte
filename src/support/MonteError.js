// Based on `ExtendableError` from
// http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax

const DEFAULT_MSG = 'An error has occurred, but no specific message was provided. Please use the stacktrace to debug.';

export class MonteError extends Error {
  constructor(message, ...msgs) {
    const msg = [message || DEFAULT_MSG, ...msgs].join(' ');
    super(msg);
    this.name = this.constructor.name;
    this.message = msg;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
    else {
      this.stack = (new Error(message)).stack;
    }
  }

  static UnimplementedMethod(method, methodName, sourceType='chart', ...msgs) {
    return new MonteError(`${method} (\`${methodName}\`) needs to be defined in order for the ${sourceType} to be useful.`, ...msgs);
  }

  static InvalidArgumentType(methodName, argumentName, expectedType, received, ...msgs) {
    return new MonteError(`Method (${methodName}) argument "${argumentName}" of unexpected type. Expected ${expectedType}, but was given ${received}.`, ...msgs);
  }
}
