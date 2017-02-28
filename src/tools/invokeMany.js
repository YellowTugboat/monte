// Returns a wrapping function that invokes a series of functions all with the same arguments used
// to invoke the wrapper. The return value of each function is ignored.
export function invokeMany(...funcs) {
  return function(...args) {
    funcs.forEach((f) => f(...args));
  };
}
