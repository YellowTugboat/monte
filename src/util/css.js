import { MonteError } from '../support/MonteError';

export function classedPattern(selection, pattern, value) {
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
    throw MonteError.InvalidArgumentType('classedPattern', 'pattern', 'String or RegExp', pattern);
  }

  classList.forEach((c) => {
    if (re.test(c)) {
      selection.classed(c, value);
    }
  });
}
