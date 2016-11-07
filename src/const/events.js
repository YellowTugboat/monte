// General interaction (charts or elements)
export const CLICK = 'click';
export const TOUCHSTART = 'touchstart';
export const TOUCHEND = 'touchend';
export const MOUSEOVER = 'mouseover';
export const MOUSEOUT = 'mouseout';

// Chart Support
export const SUPPRESSED_ERROR = 'suppressedError';
export const EXTENSION = 'extension';

// Chart Lifecycle
export const RENDERING = 'rendering';
export const RENDERED = 'rendered';
export const UPDATING = 'updating';
export const UPDATED = 'updated';
export const UPDATING_BOUNDS = 'updatingBounds';
export const UPDATED_BOUNDS = 'updatedBounds';
export const CLEARING = 'clearing';
export const CLEARED = 'cleared';
export const CSS_DOMAINS_RESETING = 'cssDomainsReseting';
export const CSS_DOMAINS_RESET = 'cssDomainsReset';
export const DESTROYING = 'destroying';
export const DESTROYED = 'destroyed';

export const INTERACTION_EVENTS = [CLICK, TOUCHSTART, TOUCHEND, MOUSEOVER, MOUSEOUT];

// Support events
export const CHART_SUPPORT_EVENTS = [SUPPRESSED_ERROR, EXTENSION];

// Lifecycle event pairs
export const CHART_LIFECYCLE_EVENTS = [
  RENDERING, RENDERED,
  UPDATING, UPDATED,
  UPDATING_BOUNDS, UPDATED_BOUNDS,
  CLEARING, CLEARED,
  CSS_DOMAINS_RESETING, CSS_DOMAINS_RESET,
  DESTROYING, DESTROYED,
];

export const ACTION_ADD = 'add';
export const ACTION_REMOVE = 'remove';
export const ACTION_CSS_OVER = 'over';
export const ACTION_CSS_TOUCH = 'touch';

export const INTERACTION_EVENT_CSS_MAP = {
  [MOUSEOVER]: { action: ACTION_ADD, css: ACTION_CSS_OVER },
  [MOUSEOUT]: { action: ACTION_REMOVE, css: ACTION_CSS_OVER },
  [TOUCHSTART]: { action: ACTION_ADD, css: ACTION_CSS_TOUCH },
  [TOUCHEND]: { action: ACTION_REMOVE, css: ACTION_CSS_TOUCH },
};
