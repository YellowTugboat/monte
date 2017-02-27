export function compose(...funcs) {
  return function(...args) {
    funcs.forEach((f) => f(...args));
  };
}
