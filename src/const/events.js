// General interaction (charts or elements)
export const CLICK = 'click';
export const TOUCHSTART = 'touchstart';
export const TOUCHEND = 'touchend';
export const MOUSEOVER = 'mouseover';
export const MOUSEOUT = 'mouseout';

// Chart Support
export const SUPPRESSED_ERROR = 'suppressedError';
export const EXTENSION = 'extension';

// Chart and Extension Lifecycle (extensions support a subset)
export const BEFORE_RENDER = 'beforeRender';
export const RENDERED = 'rendered';
export const BEFORE_UPDATE = 'beforeUpdate';
export const UPDATED = 'updated';
export const BEFORE_BOUNDS_UPDATE = 'beforeBoundsUpdate';
export const BOUNDS_UPDATED = 'updatedBounds';
export const BEFORE_CLEAR = 'beforeClear';
export const CLEARED = 'cleared';
export const BEFORE_DESTROY = 'beforeDestroy';
export const DESTROYED = 'destroyed';

export const BEFORE_OPTION_CHANGE = 'beforeOptionChange';
export const OPTION_CHANGED = 'optionChanged';
export const BEFORE_STYLE_DOMAINS_RESET = 'beforeStyleDomainsReset';
export const STYLE_DOMAINS_RESET = 'styleDomainsReset';

export const INTERACTION_EVENTS = [CLICK, TOUCHSTART, TOUCHEND, MOUSEOVER, MOUSEOUT];
export const INTERACTION_SHOW_EVENTS = [TOUCHSTART, MOUSEOVER];
export const INTERACTION_HIDE_EVENTS = [TOUCHEND, MOUSEOUT];

// Support events
export const CHART_SUPPORT_EVENTS = [SUPPRESSED_ERROR, EXTENSION];

// Lifecycle event pairs
export const CHART_LIFECYCLE_EVENTS = [
  BEFORE_RENDER, RENDERED,
  BEFORE_UPDATE, UPDATED,
  BEFORE_BOUNDS_UPDATE, BOUNDS_UPDATED,
  BEFORE_CLEAR, CLEARED,
  BEFORE_STYLE_DOMAINS_RESET, STYLE_DOMAINS_RESET,
  BEFORE_OPTION_CHANGE, OPTION_CHANGED,
  BEFORE_DESTROY, DESTROYED,
];

export const EXTENSION_LIFECYCLE_EVENTS = [
  BEFORE_UPDATE, UPDATED,
  BEFORE_CLEAR, CLEARED,
  BEFORE_OPTION_CHANGE, OPTION_CHANGED,
  BEFORE_DESTROY, DESTROYED,
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
