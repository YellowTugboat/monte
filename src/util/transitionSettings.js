import { TRANSITION_DELAY_MS, TRANSITION_DURATION_MS, TRANSITION_EASE, TRANSITION_EASE_END_POSITION } from '../const/d3';

export const standard = {
  delay: TRANSITION_DELAY_MS,
  duration: TRANSITION_DURATION_MS,
  ease: TRANSITION_EASE,
};

export const none = {
  delay: 0,
  duration: 0,
  ease: function() { return TRANSITION_EASE_END_POSITION; },
};

export const transitionSettings = {
  standard,
  none,
};
