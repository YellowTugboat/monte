import { EventWatcher } from '../support/EventWatcher';
import { flattenDeep } from '../external/lodash';

class MonteGlobal {
  constructor() {
    this._developerMode = false;
    this._developerModeEvents = null;
    this._resizeWatch = new EventWatcher();
    this.extensionId = 0;
  }

  getNextExtensionId() {
    return this.extensionId++; // Post-increment so counts start at zero.
  }

  getResizeWatcher() {
    return this._resizeWatch;
  }

  isDeveloperMode() {
    return this._developerMode;
  }

  setDeveloperModeEvents(...args) {
    this._developerModeEvents = flattenDeep(args);
    this._developerMode = true;
  }

  getDeveloperModeEvents() {
    return this._developerModeEvents;
  }

  clearDeveloperModeEvents() {
    this._developerModeEvents = null;
  }

  clearDeveloperMode() {
    this._developerMode = false;
  }

  enableDeveloperMode() {
    this._developerMode = true;
  }
}

export const global = new MonteGlobal();

if (window) {
  window.MonteGlobal = global;
}
