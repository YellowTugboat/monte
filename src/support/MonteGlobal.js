import { EventWatcher } from '../support/EventWatcher';
import { flattenDeep } from '../external/lodash';

class MonteGlobal {
  constructor() {
    this._developerMode = false;
    this._developerModeEvents = null;
    this._resizeWatch = new EventWatcher();
    this.extensionId = 0;
    this.chartId = 0;
  }

  getNextChartId() {
    return this.chartId++; // Post-increment so counts start at zero.
  }

  // WARNING:
  //   Resetting IDs may result in unexpected behavior if multiple chart instances recieve the same
  //   ID... use cautiously and sparingly.
  //
  //   Resetting the chart IDs should rarely be done and should have very specific motivation. In
  //   general, the IDs should be allowed to grow over the course of an application's life span.
  resetChartCount() {
    this.chartId = 0;
  }

  getNextExtensionId() {
    return this.extensionId++; // Post-increment so counts start at zero.
  }

  // WARNING:
  //   Resetting IDs may result in unexpected behavior if multiple extension instances recieve the
  //   same ID... use cautiously and sparingly.
  //
  //   Resetting the extension IDs should rarely be done and should have very specific motivation.
  //   In general, the IDs should be allowed to grow over the course of an application's life span.
  resetExtensionCount() {
    this.extensionId = 0;
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

if (typeof window === 'object') {
  window.MonteGlobal = global;
}
