import { MonteError } from '../support/MonteError';

// TODO: Move to tools?
export function removeClassByPattern(selection, pattern) {
  const node = selection.node();
  const classAttr = node.getAttribute('class');
  const classList = classAttr.trim().split(/^|\s+/);

  let re;

  if (typeof pattern === 'string') {
    re = new RegExp(pattern);
  }
  else if (pattern instanceof RegExp) {
    re = pattern;
  }
  else {
    throw MonteError.InvalidArgumentType('removeClassByPattern', 'pattern', 'String or RegExp', pattern);
  }

  classList.forEach((c) => {
    if (re.test(c)) {
      selection.classed(c, false);
    }
  });
}
