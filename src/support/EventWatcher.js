// Based on examples at https://developer.mozilla.org/en-US/docs/Web/Events/resize
import { mergeOptions } from '../tools/mergeOptions';

// Frames per second -> Frame duration in MS == the timeout in MS to use
// -----------------------------
// | Frame Rate | Timeout in MS |
// |      30fps |  33ms         |
// |      20fps |  50ms         |
// |      15fps |  66ms         |
// |      10fps | 100ms         |
// |       5fps | 200ms         |
// ------------------------------
export const frameRateTimings = {
  FPS_30: 33,
  FPS_20: 50,
  FPS_15: 66,
  FPS_10: 100,
  FPS_05: 200,
};

export function EventWatcherException(message) {
  this.message = message;
  this.name = 'EventWatcherException';
}

const DEFAULTS = {
  timeoutDelayMs: frameRateTimings.FPS_15,
  target: window,
  eventName: 'resize',

  // Automatically run all callbacks when `document.DOMContentLoaded` or `window.load` is fired.
  documentLoadRun: true,
};

export class EventWatcher {
  constructor(options) {
    this.opts = mergeOptions(options, DEFAULTS);
    this.callbacks = [];
    this.running = false;
    this.pendingFrame = null;
    this.pendingTimeout = null;
    this.listenerAttached = false;
    this.documentReady = null;

    if (!this.opts.eventName) {
      throw new EventWatcher.EventWatcherException('An event name must be given!');
    }

    if (this.opts.documentLoadRun) {
      const ready = () => {
        document.removeEventListener('DOMContentLoaded', ready);
        window.removeEventListener('load', ready);

        this.documentReady = true;
        this.runCallbacks();
      };

      this.documentReady = false;
      document.addEventListener('DOMContentLoaded', ready);
      window.addEventListener('load', ready);
    }
  }

  // fired on event firing
  _fired() {
    if (!this.running) {
      this.running = true;
      const run = this._runCallbacks.bind(this);

      if (window.requestAnimationFrame) {
        this.pendingFrame = window.requestAnimationFrame(run);
      }
      else {
        this.pendingTimeout = setTimeout(run, this.opts.timeoutDelayMs);
      }
    }
  }

  // Run the actual callbacks and clear state.
  _runCallbacks() {
    this.pendingFrame = this.pendingTimeout = null;
    this.runCallbacks();
    this.running = false;
  }

  // Run the actual callbacks.
  runCallbacks() {
    this.callbacks.forEach((callback) => callback());
  }

  // Add callback
  add(callback) {
    if (!this.listenerAttached) {
      this.opts.target.addEventListener(this.opts.eventName, this._fired.bind(this));
      this.listenerAttached = true;
    }

    if (callback) { this.callbacks.push(callback); }
  }

  // Remove specific callback
  remove(callback) {
    if (this.callbacks.length) {
      const index = this.callbacks.indexOf(callback);

      if (index > -1) { this.callbacks.splice(index, 1); }
    }

    return this;
  }

  // Destroy EventWatcher
  destroy() {
    // Cancel pending invocation
    if (this.pendingFrame) { window.cancelAnimationFrame(this.pendingFrame); }
    else if (this.pendingTimeout) { clearTimeout(this.pendingTimeout); }

    // Remove listener
    if (this.listenerAttached) {
      this.opts.target.removeEventListener(this.opts.eventName, this._fired.bind(this));
    }
  }

  // Modify the delay. The delay is only used in browsers that don't support animation frames.
  timeoutDelay(timeoutDelayMs = null) {
    if (timeoutDelayMs === null) { return this.opts.timeoutDelayMs;}
    this.opts.timeoutDelayMs = timeoutDelayMs;

    return this;
  }
}
