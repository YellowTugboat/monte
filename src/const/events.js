export const INTERACTION_EVENTS = ['click', 'touchstart', 'touchend', 'mouseover', 'mouseout'];

export const INTERACTION_EVENT_CSS_MAP = {
  'mouseover': { action: 'add', css: 'over' },
  'mouseout': { action: 'remove', css: 'over' },
  'touchstart': { action: 'add', css: 'touch' },
  'touchend': { action: 'remove', css: 'touch' },
};
