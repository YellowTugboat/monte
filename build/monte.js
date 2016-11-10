(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Monte = global.Monte || {})));
}(this, (function (exports) { 'use strict';

var version = "0.0.0-alpha13";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var _INTERACTION_EVENT_CS;

// General interaction (charts or elements)
var CLICK = 'click';
var TOUCHSTART = 'touchstart';
var TOUCHEND = 'touchend';
var MOUSEOVER = 'mouseover';
var MOUSEOUT = 'mouseout';

// Chart Support
var SUPPRESSED_ERROR = 'suppressedError';
var EXTENSION = 'extension';

// Chart Lifecycle
var RENDERING = 'rendering';
var RENDERED = 'rendered';
var UPDATING = 'updating';
var UPDATED = 'updated';
var UPDATING_BOUNDS = 'updatingBounds';
var UPDATED_BOUNDS = 'updatedBounds';
var CLEARING = 'clearing';
var CLEARED = 'cleared';
var CSS_DOMAINS_RESETING = 'cssDomainsReseting';
var CSS_DOMAINS_RESET = 'cssDomainsReset';
var DESTROYING = 'destroying';
var DESTROYED = 'destroyed';

var INTERACTION_EVENTS = [CLICK, TOUCHSTART, TOUCHEND, MOUSEOVER, MOUSEOUT];

// Support events
var CHART_SUPPORT_EVENTS = [SUPPRESSED_ERROR, EXTENSION];

// Lifecycle event pairs
var CHART_LIFECYCLE_EVENTS = [RENDERING, RENDERED, UPDATING, UPDATED, UPDATING_BOUNDS, UPDATED_BOUNDS, CLEARING, CLEARED, CSS_DOMAINS_RESETING, CSS_DOMAINS_RESET, DESTROYING, DESTROYED];

var ACTION_ADD = 'add';
var ACTION_REMOVE = 'remove';
var ACTION_CSS_OVER = 'over';
var ACTION_CSS_TOUCH = 'touch';

var INTERACTION_EVENT_CSS_MAP = (_INTERACTION_EVENT_CS = {}, defineProperty(_INTERACTION_EVENT_CS, MOUSEOVER, { action: ACTION_ADD, css: ACTION_CSS_OVER }), defineProperty(_INTERACTION_EVENT_CS, MOUSEOUT, { action: ACTION_REMOVE, css: ACTION_CSS_OVER }), defineProperty(_INTERACTION_EVENT_CS, TOUCHSTART, { action: ACTION_ADD, css: ACTION_CSS_TOUCH }), defineProperty(_INTERACTION_EVENT_CS, TOUCHEND, { action: ACTION_REMOVE, css: ACTION_CSS_TOUCH }), _INTERACTION_EVENT_CS);

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  value = Object(value);
  return symToStringTag && symToStringTag in value ? getRawTag(value) : objectToString(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

/** Used to match property names within property paths. */
var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function (string) {
  string = toString$1(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$2(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var defineProperty$1 = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$4.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = isKey(path, object) ? [path] : castPath(path);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set$2(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty$1 ? identity : function (func, string) {
  return defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800;
var HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/** Detect free variable `exports`. */
var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;
var allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = function () {
  function object() {}
  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$6;

  return value === proto;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$1 = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Built-in value references. */
var Buffer$1 = moduleExports$1 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;
var objectProto$8 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$6.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag$1 = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$2 = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$2 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}();

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function (srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack());
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function mergeDefaults(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, mergeDefaults, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep$1 = baseRest(function (args) {
  args.push(undefined, mergeDefaults);
  return apply(mergeWith, undefined, args);
});

// specific features are used.

// Used for deep merging of options
var defaultsDeep = defaultsDeep$1;

// Used for deep setting/getting of values in nested objects
var set$1 = set$2;
var get$1 = get$2;

var undef = void 0;

function isNumeric(v) {
  return typeof v === 'number' && isFinite(v);
}

function isFunc(v) {
  return typeof v === 'function';
}

function isObject$2(v) {
  return v !== null && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object';
}

function isArray$2(v) {
  return Array.isArray(v);
}

function isDefined(v) {
  return v !== null && v !== undef;
}

var OptionValueWrap = function OptionValueWrap(value) {
  classCallCheck(this, OptionValueWrap);

  this.value = value;
};

var ReplacePreceding = function (_OptionValueWrap) {
  inherits(ReplacePreceding, _OptionValueWrap);

  function ReplacePreceding() {
    classCallCheck(this, ReplacePreceding);
    return possibleConstructorReturn(this, (ReplacePreceding.__proto__ || Object.getPrototypeOf(ReplacePreceding)).apply(this, arguments));
  }

  return ReplacePreceding;
}(OptionValueWrap);

function unpack(checkValue) {
  return checkValue instanceof OptionValueWrap ? checkValue.value : checkValue;
}

function replaceCheck(checkValue) {
  var out = null;

  // Check arrays for values that clear proceeding values.
  if (Array.isArray(checkValue)) {
    var sliceIndex = -1;

    // Look from right to left.
    // _.forEachRight(checkValue, function(item, i) {
    for (var i = checkValue.length - 1; i >= 0; i--) {
      var item = checkValue[i];

      if (item instanceof ReplacePreceding) {
        sliceIndex = i;
        break;
      }
    }

    out = sliceIndex !== -1 ? checkValue.slice(sliceIndex) : checkValue;

    for (var _i = 0; _i < out.length; _i++) {
      out[_i] = unpack(out[_i]);
    }
  }

  // Unpack any wrapped values.
  else {
      out = unpack(checkValue);
    }

  return out;
}

function mergeOptions() {
  for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  var opts = defaultsDeep.apply(undefined, [{}].concat(options));

  for (var prop in opts) {
    if (opts.hasOwnProperty(prop)) {
      opts[prop] = replaceCheck(opts[prop]);
    }
  }

  return opts;
}

// Based on examples at https://developer.mozilla.org/en-US/docs/Web/Events/resize
// Frames per second -> Frame duration in MS == the timeout in MS to use
// -----------------------------
// | Frame Rate | Timeout in MS |
// |      30fps |  33ms         |
// |      20fps |  50ms         |
// |      15fps |  66ms         |
// |      10fps | 100ms         |
// |       5fps | 200ms         |
// ------------------------------
var frameRateTimings = {
  FPS_30: 33,
  FPS_20: 50,
  FPS_15: 66,
  FPS_10: 100,
  FPS_05: 200
};



var DEFAULTS$1 = {
  timeoutDelayMs: frameRateTimings.FPS_15,
  target: window,
  eventName: 'resize',

  // Automatically run all callbacks when `document.DOMContentLoaded` or `window.load` is fired.
  documentLoadRun: true
};

var EventWatcher = function () {
  function EventWatcher(options) {
    var _this = this;

    classCallCheck(this, EventWatcher);

    this.opts = mergeOptions(options, DEFAULTS$1);
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
      (function () {
        var eventWatcher = _this;
        var ready = function ready() {
          // Use timeout to get a fresh pass after document is ready.
          setTimeout(function () {
            document.removeEventListener('DOMContentLoaded', ready);
            window.removeEventListener('load', ready);

            eventWatcher.documentReady = true;
            eventWatcher.runCallbacks();
          }, 0);
        };

        _this.documentReady = false;
        document.addEventListener('DOMContentLoaded', ready);
        window.addEventListener('load', ready);
      })();
    }
  }

  // fired on event firing


  createClass(EventWatcher, [{
    key: '_fired',
    value: function _fired() {
      if (!this.running) {
        this.running = true;
        var run = this._runCallbacks.bind(this);

        if (window.requestAnimationFrame) {
          this.pendingFrame = window.requestAnimationFrame(run);
        } else {
          this.pendingTimeout = setTimeout(run, this.opts.timeoutDelayMs);
        }
      }
    }

    // Run the actual callbacks and clear state.

  }, {
    key: '_runCallbacks',
    value: function _runCallbacks() {
      this.pendingFrame = this.pendingTimeout = null;
      this.runCallbacks();
      this.running = false;
    }

    // Run the actual callbacks.

  }, {
    key: 'runCallbacks',
    value: function runCallbacks() {
      this.callbacks.forEach(function (callback) {
        return callback();
      });
    }

    // Add callback

  }, {
    key: 'add',
    value: function add(callback) {
      if (!this.listenerAttached) {
        this.opts.target.addEventListener(this.opts.eventName, this._fired.bind(this));
        this.listenerAttached = true;
      }

      if (callback) {
        this.callbacks.push(callback);
      }
    }

    // Remove specific callback

  }, {
    key: 'remove',
    value: function remove(callback) {
      if (this.callbacks.length) {
        var index = this.callbacks.indexOf(callback);

        if (index > -1) {
          this.callbacks.splice(index, 1);
        }
      }

      return this;
    }

    // Destroy EventWatcher

  }, {
    key: 'destroy',
    value: function destroy() {
      // Cancel pending invocation
      if (this.pendingFrame) {
        window.cancelAnimationFrame(this.pendingFrame);
      } else if (this.pendingTimeout) {
        clearTimeout(this.pendingTimeout);
      }

      // Remove listener
      if (this.listenerAttached) {
        this.opts.target.removeEventListener(this.opts.eventName, this._fired.bind(this));
      }
    }

    // Modify the delay. The delay is only used in browsers that don't support animation frames.

  }, {
    key: 'timeoutDelay',
    value: function timeoutDelay() {
      var timeoutDelayMs = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (timeoutDelayMs === null) {
        return this.opts.timeoutDelayMs;
      }
      this.opts.timeoutDelayMs = timeoutDelayMs;

      return this;
    }
  }]);
  return EventWatcher;
}();

// Based on `ExtendableError` from
// http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax

var MonteError = function (_Error) {
  inherits(MonteError, _Error);

  function MonteError(message) {
    classCallCheck(this, MonteError);

    var _this = possibleConstructorReturn(this, (MonteError.__proto__ || Object.getPrototypeOf(MonteError)).call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  createClass(MonteError, null, [{
    key: 'UnimplementedMethod',
    value: function UnimplementedMethod(method, methodName) {
      return new MonteError(method + ' (`' + methodName + '`) needs to be defined in order for the chart to be useful.');
    }
  }]);
  return MonteError;
}(Error);

var MonteOptionError = function (_MonteError) {
  inherits(MonteOptionError, _MonteError);

  function MonteOptionError() {
    classCallCheck(this, MonteOptionError);
    return possibleConstructorReturn(this, (MonteOptionError.__proto__ || Object.getPrototypeOf(MonteOptionError)).apply(this, arguments));
  }

  createClass(MonteOptionError, null, [{
    key: 'RequiredOption',
    value: function RequiredOption(optionName) {
      return new MonteError('Option "' + optionName + '" is required.');
    }
  }, {
    key: 'InvalidEnumOption',
    value: function InvalidEnumOption(optionName, badValue) {
      return new MonteError('Option "' + optionName + '" must be set to a valid option. The value "' + badValue + '" is not valid.');
    }
  }]);
  return MonteOptionError;
}(MonteError);

// In d3-axis, there are hard coded shifts of 0.5. This shift is used for grid alignment and other
// axis alignments.
var AXIS_SHIFT = 0.5;

// In d3-transition the default transition time is 250ms.
var TRANSITION_DURATION_MS = 250;

var ENTER = 'enter';
var UPDATE = 'update';
var EXIT = 'exit';

var UPDATE_PATTERN = { ENTER: ENTER, UPDATE: UPDATE, EXIT: EXIT };

var d3$1 = Object.freeze({
	AXIS_SHIFT: AXIS_SHIFT,
	TRANSITION_DURATION_MS: TRANSITION_DURATION_MS,
	ENTER: ENTER,
	UPDATE: UPDATE,
	EXIT: EXIT,
	UPDATE_PATTERN: UPDATE_PATTERN
});

var UNDEF = void 0;

function noop() {}

var global$1 = window ? window.MonteGlobals = {} : {};

// TODO: Begin adoption of generic scale accessors. Every scale should be accompained with a property
//       `<scaleProperty>Accessor` that translates which value to pass to the scale.

var CLIP_PATH_ID = 'drawPath';

var DEFAULTS = {
  css: '',
  boundingWidth: 800,
  boundingHeight: 450,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  customEvents: [],
  extensions: [],

  // TODO: Rework transition features to support the various Update pattern stages.
  transitionDuration: TRANSITION_DURATION_MS,
  ease: d3.easeCubic,
  delay: 0,

  resize: null,

  /*************************************************************************************************
   *
   * Misc. options
   *
   ************************************************************************************************/

  // When a `clear` occurs (by direct invocation or via `data` (without an update)) the domain is
  // automatically reset.
  autoResetCssDomains: true,

  // Indicates that the chart base is being used directly in a client script chart (an "on the
  // fly" chart). The assumption is most of the time other classes will extend and implement
  // required features (such as '_update') and the checks for those features should be enforced.
  directUse: false
};

/*
  Data Format:

  Single Line Format
  {
    values: [{ x: <date>, y: 300 }, { x: <date>, y: 500 }, { x: <date>, y: 600 }],
    css: 'fill brand-blue',
  }

  Multiple lines
  [<single line format>, <single line format>, ...]

 */

var Chart = function () {
  function Chart(parentSelector, options, data) {
    classCallCheck(this, Chart);
    // eslint-disable-line max-statements
    this._constructed = false;
    this._optsSet = false;
    this.parentSelector = parentSelector;
    this.hasRendered = false;
    this.layers = [];
    this.extensions = [];
    this._optionReaderCache = {};

    // Configure the data options.
    this._initOptions(options);

    // Setup the Public events.
    this._initPublicEvents.apply(this, toConsumableArray(INTERACTION_EVENTS).concat(toConsumableArray(CHART_SUPPORT_EVENTS), toConsumableArray(CHART_LIFECYCLE_EVENTS), toConsumableArray(this.opts.customEvents)));

    // Put chart in developer mode if opted into on a chart or global basis
    if (this.opts.developerMode || global$1.developerMode) {
      this._initDeveloperMode();
    }

    // Bind initial extensions to this chart instance.
    this._bindExt(this.opts.extensions);

    // Setup the core infastructure.
    this._initCore();

    // Customize configuration
    this._initCustomize();

    // Update the bounding box and layout basics.
    this._updateBounds();

    // Do the various setup rendering (Axis, BG, etc...)
    this._initRender();

    this._constructed = true;

    // Trigger a resize if everything is ready.
    if (this._resizeHandler && global$1.resizeWatch.documentReady) {
      this._resizeHandler();
    }

    // First full draw cycle
    if (data) {
      this.data(data);
    }
  }

  createClass(Chart, [{
    key: '_initOptions',
    value: function _initOptions() {
      this.opts = {};

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      var opts = mergeOptions.apply(undefined, options.concat([DEFAULTS]));
      for (var key in opts) {
        if (opts.hasOwnProperty(key)) {
          this.option(key, opts[key]);
        }
      }

      this._optsSet = true;
    }

    // Intialize the vis.

  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this = this;

      // Create SVG element and drawing area setup
      var parent = d3.select(this.parentSelector);
      if (parent.node().tagName.toLowerCase() === 'svg') {
        this.bound = parent;
      } else {
        this.bound = parent.append('svg');
      }

      this.bound.attr('class', this._buildCss(['monte-chart', this.opts.css, this.opts.chartCss]));

      // SVG Defs element
      this.defs = this.bound.append('defs');

      // Drawing area path clipping
      this.clip = this.defs.append('clipPath').attr('id', CLIP_PATH_ID);

      this.clipRect = this.clip.append('rect');

      // Create a background area.
      this.addLayer('bg');

      // Create the support area.
      this.addLayer('support');

      // Create the primary drawing area.
      this.addLayer('draw');

      // Top layer
      this.addLayer('overlay');

      var chart = this;

      // Setup interaction events for the overall chart.
      INTERACTION_EVENTS.forEach(function (ev) {
        _this.bound.on(ev, function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          chart.__notify.apply(chart, [ev, this].concat(args));
        });
      });

      // Bind resize function if given.
      if (this.opts.resize) {
        if (!global$1.resizeWatch) {
          global$1.resizeWatch = new EventWatcher();
        }

        var resizer = this.opts.resize;
        this._resizeHandler = resizer.resize.bind(resizer, this);
        global$1.resizeWatch.add(this._resizeHandler);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _d;

      for (var _len3 = arguments.length, events = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        events[_key3] = arguments[_key3];
      }

      this._events = events;
      this.dispatch = (_d = d3).dispatch.apply(_d, events);
    }
  }, {
    key: '_initDeveloperMode',
    value: function _initDeveloperMode() {
      var _this2 = this;

      var echo = function echo(eventName) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        var a = '(no arguments)';

        if (args && args.length > 0) {
          a = '\n';

          args.forEach(function (v, i) {
            return a += '\t' + i + ': ' + v + '\n';
          });
        }

        console.log('[' + _this2 + '] "' + eventName + '": ' + a); // eslint-disable-line no-console
      };

      this._events.forEach(function (eventName) {
        return _this2.on(eventName, echo.bind(_this2, eventName));
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {}
  }, {
    key: '_initRender',
    value: function _initRender() {}
  }, {
    key: '_updateBounds',
    value: function _updateBounds() {
      var _this3 = this;

      var suppressNotify = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
      var suppressUpdate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      this.__notify('updatingBounds');

      // Margin Convention and calculate drawing area size
      this.margin = this.opts.margin;
      this.width = this.opts.boundingWidth - this.margin.left - this.margin.right;
      this.height = this.opts.boundingHeight - this.margin.top - this.margin.bottom;

      // Apply margins to layers
      this.layers.forEach(function (l) {
        return l.attr('transform', _this3._getLayerTranslate());
      });

      // Update sizing attributes
      if (this.bound) {
        this.bound.attr('width', this.opts.boundingWidthAttr || this.opts.boundingWidth).attr('height', this.opts.boundingHeightAttr || this.opts.boundingHeight);
      }

      // Update drawing clip
      if (this.clipRect) {
        this.clipRect.attr('width', this.width).attr('height', this.height);
      }

      var notify = function notify() {
        if (_this3._constructed) {
          _this3.__notify('updatedBounds');
        }
      };
      var update = function update() {
        if (_this3.hasRendered) {
          _this3.update();
        }
      };

      if (!suppressNotify) {
        notify();
      }
      if (!suppressUpdate) {
        update();
      }

      return {
        notify: notify,
        update: update
      };
    }

    // Manually invoke the resize strategy (if any).

  }, {
    key: 'checkSize',
    value: function checkSize() {
      if (this._resizeHandler) {
        this._resizeHandler();
      }

      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.__notify('destroying');

      if (this._resizeHandler) {
        global$1.resizeWatch.remove(this._resizeHandler);
      }

      this._destroy();

      // Handle case where parentSelector and bound are the same and only remove internal elements.
      if (this.bound.node() === d3.select(this.parentSelector).node()) {
        this.bound.node().innerHTML = '';
      } else {
        this.bound.remove();
      }

      this.__notify('destroyed');
    }
  }, {
    key: '_destroy',
    value: function _destroy() {}

    /*
     * Adds a layer to the chart. The layer is the top most by default.
     *
     * @Chainable
     */

  }, {
    key: 'addLayer',
    value: function addLayer(layerName) {
      var layer = this.bound.append('g').attr('class', 'monte-' + layerName);

      this[layerName] = layer;
      this.layers.push(layer);

      return this;
    }

    /*
     * Makes a layer use a defined `clipPath`.
     *
     * @Chainable
     */

  }, {
    key: 'layerUseClipPath',
    value: function layerUseClipPath(layerName) {
      var pathId = arguments.length <= 1 || arguments[1] === undefined ? CLIP_PATH_ID : arguments[1];

      this[layerName].attr('clip-path', 'url(#' + pathId + ')');

      return this;
    }
  }, {
    key: '_getLayerTranslate',
    value: function _getLayerTranslate() {
      return 'translate(' + this.margin.left + ', ' + this.margin.top + ')';
    }

    /**
     * Sets the external dimensions on the SVG element.
     *
     * @Chainable
     */

  }, {
    key: 'boundingRect',
    value: function boundingRect(width, height) {
      if (arguments.length === 0) {
        return [this.opts.boundingWidth, this.opts.boundingHeight];
      }

      var minWidth = this.option('margin.left') + this.option('margin.right');
      if (width < minWidth) {
        width = minWidth;
      }
      this.opts.boundingWidth = width;

      if (arguments.length === 2) {
        var minHeight = this.option('margin.top') + this.option('margin.bottom');
        if (height < minHeight) {
          height = minHeight;
        }
        this.opts.boundingHeight = height;
      }

      this._updateBounds();
      this.update();

      return this;
    }

    /**
     * Binds an event to a given `callback`. If no `callback` is provided it returns the callback.
     *
     * @Chainable <setter>
     */

  }, {
    key: 'on',
    value: function on(typenames, callback) {
      if (callback) {
        this.dispatch.on(typenames, callback);
        return this;
      }

      return this.dispatch.on(typenames);
    }

    /**
     * Force the triggering of an event with the given arguments. The `on` callbacks are invoked in
     * the context of the chart.
     *
     * Uses:
     *  + Trigger event for listeners as needed such as force an extension to update.
     *
     * @Chainable
     */

  }, {
    key: 'emit',
    value: function emit(eventName) {
      if (!eventName) {
        return;
      } else if (!this.dispatch._[eventName]) {
        // Check that dispatch has a registered event
        var msg = 'Unknown event ' + eventName + '. Double check the spelling or register the event. Custom events must registered at chart creation.';
        throw new MonteError(msg);
      }

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      this.__notify.apply(this, [eventName].concat(args));

      return this;
    }

    /**
     * Get or set a chart option.
     *
     * NOTE: Does not invoke the "Update cycle". To apply option changes call `update`.
     *
     * @Chainable
     */

  }, {
    key: 'option',
    value: function option(key, value) {
      if (value === UNDEF) {
        return get$1(this.opts, key);
      }

      set$1(this.opts, key, value);

      if (key === 'margin') {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
          this.opts.margin = { top: value, left: value, right: value, bottom: value };
        }

        // Margins affect the drawing area size so various updates are required.
        if (this._optsSet) {
          this._updateBounds();
        }
      }

      return this;
    }

    /**
     * Generates a function (or uses and existing one from cache) for a given option property. The
     * generated function attempts to access the property (uses `tryInvoke`). If the property is a
     * function it invokes the function with all parameters passed at the time on invocation.
     *
     * Generally this is good allowing D3 Selection chain methods (`attr`, `style`, etc...) to
     * directly read chart options.
     *
     * For example:
     *  `.attr('fill', (d, i, nodes) => this.tryInvoke(this.opts.fillScale, d, i, nodes))`
     * is equvilient to
     *  `.attr('fill', this.optionReaderFunc('fillScale')')`
     */

  }, {
    key: 'optionReaderFunc',
    value: function optionReaderFunc(optionKey) {
      var _this4 = this;

      if (!this._optionReaderCache[optionKey]) {
        this._optionReaderCache[optionKey] = function () {
          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          return _this4.tryInvoke.apply(_this4, [_this4.opts[optionKey]].concat(args));
        };
      }

      return this._optionReaderCache[optionKey];
    }

    /**
     * Invoke a `value` (generally from the chart options) with the given arguments. Static values
     * are returned directly.
     */

  }, {
    key: 'tryInvoke',
    value: function tryInvoke(value) {
      if (value === null) {
        return null;
      } else if (value === UNDEF) {
        throw new MonteOptionError('Value not initialized.');
      }

      try {
        for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          args[_key7 - 1] = arguments[_key7];
        }

        return isFunc(value) ? value.call.apply(value, [this].concat(args)) : value;
      } catch (e) {
        this.__notify('suppressedError', e);
        return null;
      }
    }

    /**
     * Reads a property from a datum and returns the raw (unscaled) value.
     */

  }, {
    key: 'getProp',
    value: function getProp(propShortName, d) {
      var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var propFullName = propShortName + 'Prop';
      var dataPropName = this.opts[propFullName];

      if (dataPropName) {
        return d[dataPropName];
      }

      return defaultValue;
    }

    /**
     * Reads a scale bound property from a datum and returns the scaled value.
     *
     * @param {string} scaleName The scale used for scaling
     * @param {string} [propPrefix=<scaleName>] The property to be scaled. Defaults to the scale's property.
     * @param {any}    datum The data to scale.
     */

  }, {
    key: 'getScaledProp',
    value: function getScaledProp(scaleName, propPrefix, datum) {
      var val = void 0;
      var propPre = void 0;
      var d = void 0;

      if (arguments.length === 2) {
        propPre = scaleName;
        d = propPrefix;
      } else if (arguments.length === 3) {
        propPre = propPrefix;
        d = datum;
      } else {
        throw new MonteError('Incorrect number of arguments. Expected 2 or 3 recieved ' + arguments.length);
      }

      var scale = get$1(this, scaleName);
      if (!scale) {
        throw new MonteError('Scale "' + scaleName + '" is not defined.');
      } else if (scale === noop) {
        // A noop function means no possible return value.
        return UNDEF;
      } else if (!isFunc(scale)) {
        // Treat scale like a static value (likely string or number) and return early.
        return scale;
      } else if (isObject$2(d)) {
        // Assume `d` is a datum related to the chart data.
        val = d[this.opts[propPre + 'Prop']];
      } else {
        // Assume `d` is a value the scale can process.
        val = d;
      }

      return scale(val);
    }

    /**
     * Remove the data, remove the data elements, and clear the CSS domains.
     *
     * @Chainable
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.__notify('clearing');

      this.displayData = null;
      this._clearDataElements();

      if (this.opts.autoResetCssDomains) {
        this.resetCssDomains();
      }

      this.__notify('cleared');
      return this;
    }

    /**
     * Internal implementation of the `clear` method.
     */

  }, {
    key: '_clearDataElements',
    value: function _clearDataElements() {}

    /**
     * Resets domains related to CSS scales.
     *
     * @Chainable
     */

  }, {
    key: 'resetCssDomains',
    value: function resetCssDomains() {
      this.__notify('cssDomainsReseting');

      this._resetCssDomains();

      this.__notify('cssDomainsReset');
      return this;
    }

    /**
     * Internal implementation of the `resetCssDomains` method.
     */

  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {}

    /**
     * Builds a string of class names to insert into a `class` attribute on a DOM element (typically
     * SVG). The strings are inidividual class names and *not* selectors (no `.` or compound class
     * names).
     *
     * @param {array} cssSources The sources (strings or functions) for inidividual class names.
     * @param {object} d The datum to pass to function sources.
     * @param {object} i The node index to pass to function sources.
     * @param {array} nodes The node list to pass to function sources.
     */

  }, {
    key: '_buildCss',
    value: function _buildCss(cssSources, d, i, nodes) {
      var _this5 = this;

      var cssClasses = [];
      var sources = Array.isArray(cssSources) ? cssSources : [cssSources];

      sources.forEach(function (source) {
        if (isDefined(source)) {
          cssClasses.push(_this5.tryInvoke(source, d, i, nodes));
        }
      });

      return cssClasses.join(' ');
    }

    /**
     * Set the CSS classes on the SVG element.
     *
     * @Chainable
     */

  }, {
    key: 'classed',
    value: function classed() {
      var _bound;

      (_bound = this.bound).classed.apply(_bound, arguments);

      return this;
    }

    /**
     * Invokes a function in the context of the chart with the given arguments.
     *
     * @Chainable
     */

  }, {
    key: 'call',
    value: function call(f) {
      for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      f.call.apply(f, [this].concat(args));

      return this;
    }

    /**
     * Update the existing data of the chart to display and trigger the "Update cycle".
     *
     * @Chainable
     */

  }, {
    key: 'updateData',
    value: function updateData(data) {
      this.data(data, true);

      return this;
    }

    /**
     * Set the data for the chart to display and trigger the "Update cycle".
     *
     * @Chainable
     */

  }, {
    key: 'data',
    value: function data(_data) {
      var isUpdate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var suppressUpdate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (_data === UNDEF) {
        // No data to assign return the current data.
        return this.displayData;
      }

      if (!isUpdate) {
        this.clear();
      }
      this._data(_data);
      if (!suppressUpdate) {
        this.update();
      }

      return this;
    }
  }, {
    key: '_data',
    value: function _data(data) {
      this.displayData = data;
    }

    /**
     * Add an extension instance to the chart instance.
     *
     * @Chainable
     */

  }, {
    key: 'addExt',
    value: function addExt() {
      for (var _len9 = arguments.length, exts = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        exts[_key9] = arguments[_key9];
      }

      this._bindExt(exts);

      return this;
    }

    /**
     * Binds a given extension instance to the chart instance.
     */

  }, {
    key: '_bindExt',
    value: function _bindExt(exts) {
      var _this6 = this;

      exts.forEach(function (ext) {
        if (ext.opts.binding) {
          ext.setChart(_this6);
          _this6.extensions.push(ext);
        } else {
          _this6.__notify('suppressedError', 'Extensions must have the `binding` option specified.');
        }
      });
    }

    /**
     * Invokes all extensions "Update Cycle" if bound to the given event (binding) name.
     */

  }, {
    key: '__updateExt',
    value: function __updateExt(bindingName) {
      for (var _len10 = arguments.length, extArgs = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        extArgs[_key10 - 1] = arguments[_key10];
      }

      this.extensions.forEach(function (ext) {
        if (ext.opts.binding.indexOf(bindingName) > -1) {
          ext.update.apply(ext, [bindingName].concat(extArgs));
        }
      });
    }

    /**
     * Replaces one scale with another. The new scale `range` and `domain` are set to match the
     * previous scale.
     *
     * For example: changing between a linear and logarithmic scale to allow users to identify trends.
     *
     * @Chainable
     */

  }, {
    key: 'replaceScale',
    value: function replaceScale(scaleName, newScaleConstructor) {
      var scale = newScaleConstructor();
      scale.range(this[scaleName].range()).domain(this[scaleName].domain());
      this[scaleName] = scale;
      this.update();

      return this;
    }

    /**
     * (Re)renders the chart by invoking the "Update cycle" which is consistent with the D3
     * "Enter-Update-Exit" pattern.
     *
     * @Chainable
     */

  }, {
    key: 'update',
    value: function update() {
      if (!this.data()) {
        return;
      } // Don't allow update if data has not been set.
      if (!this.hasRendered) {
        this.__notify('rendering');
        this._render();
      }

      this.__notify('updating');
      this._update();

      // Notify if first rendered
      if (!this.hasRendered) {
        this.hasRendered = true;
        this.__notify('rendered');
      }

      this.__notify('updated');

      return this;
    }

    /**
     * A specific chart's one-time only setup drawing pass.
     */

  }, {
    key: '_render',
    value: function _render() {}

    /**
     * A specific chart's implementation of the "Update cycle"
     */

  }, {
    key: '_update',
    value: function _update() {
      if (!this.opts.directUse) {
        throw MonteError.UnimplementedMethod('Update', '_update');
      }
    }

    /**
     * Generates a function to bind the "common" element events to an event handler.
     */

  }, {
    key: '__bindCommonEvents',
    value: function __bindCommonEvents(lead) {
      var chart = this;

      return function (sel) {
        INTERACTION_EVENTS.forEach(function (ev) {
          return sel.on(ev, function (d, i, nodes) {
            return chart.__elemEvent(ev, lead + ':' + ev, d, i, nodes);
          });
        });
      };
    }

    /**
     * Notify all listeners, extensions and those bound through `on`, of an event.
     * Using notify ensures that extensions are notified before outside listeners are.
     */

  }, {
    key: '__notify',
    value: function __notify(eventName) {
      var _dispatch;

      for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        args[_key11 - 1] = arguments[_key11];
      }

      this.__updateExt.apply(this, [eventName].concat(args));
      (_dispatch = this.dispatch).call.apply(_dispatch, [eventName, this].concat(args));
    }

    /**
     * Handles an event generated through element interaction (i.e. click, mouseover, etc...).
     */

  }, {
    key: '__elemEvent',
    value: function __elemEvent(eventType, eventNameFull, d, i, nodes) {
      var node = nodes[i];
      var cssAction = INTERACTION_EVENT_CSS_MAP[eventType];

      if (cssAction) {
        if (cssAction.action === 'add') {
          node.classList.add(cssAction.css);
        } else if (cssAction.action === 'remove') {
          node.classList.remove(cssAction.css);
        }
      }

      this.__notify(eventNameFull, d, i, nodes);
    }

    /**
     * Give the chart type name as the identifier.
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.constructor.name;
    }
  }]);
  return Chart;
}();

var AXES_CHART_DEFAULTS = {
  // The axes X and Y are generally assumed. In some cases it may be desirable to add an additional
  // axis such as 'Y2'.
  axes: ['x', 'y'], // The scale names to create axes for.

  suppressAxes: false, // Suppress the display of the axes.

  /*************************************************************************************************
   *
   * "X"-related Options
   *
   ************************************************************************************************/

  // The property name of the value for the X coordinate passed to the scale function.
  xProp: 'x',

  // The scale function for X values.
  xScale: d3.scaleLinear,

  // Callback function to customize the X axis, such as tick count and format.
  xAxisCustomize: null,

  // Callback function to customize the X extent.
  xDomainCustomize: null,

  xRange: function xRange(w, h) {
    return [0, w];
  }, // eslint-disable-line no-unused-vars

  xAxisConstructor: d3.axisBottom,

  xAxisTransform: function xAxisTransform(w, h) {
    return 'translate(0,' + h + ')';
  },

  xLabel: null,

  xLabelCustomize: noop,

  /*************************************************************************************************
   *
   * "Y"-related Options
   *
   ************************************************************************************************/

  // The property name of the value for the X coordinate passed to the scale function.
  yProp: 'y',

  // The scale function for Y values.
  yScale: d3.scaleLinear,

  // Callback function to customize the X axis, such as tick count and format.
  yAxisCustomize: null,

  // Callback function to customize the Y extent.
  yDomainCustomize: null,

  yRange: function yRange(w, h) {
    return [h, 0];
  },

  yAxisConstructor: d3.axisLeft,

  yAxisTransform: null,

  yLabel: null,

  yLabelCustomize: noop
};

var AxesChart = function (_Chart) {
  inherits(AxesChart, _Chart);

  function AxesChart() {
    classCallCheck(this, AxesChart);
    return possibleConstructorReturn(this, (AxesChart.__proto__ || Object.getPrototypeOf(AxesChart)).apply(this, arguments));
  }

  createClass(AxesChart, [{
    key: '__axisOpt',
    value: function __axisOpt(scaleName, option) {
      return this.opts['' + scaleName + option];
    }
  }, {
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [AXES_CHART_DEFAULTS]));

      if (!isDefined(this.opts.axes)) {
        // Set empty array to ease assumptions (i.e. avoid null checks) in later code.
        this.opts.axes = [];
      }

      this.axes = this.tryInvoke(this.opts.axes);
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, ['axisRendered' // Axis events
      ]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initCore', this).call(this);

      this.forEachAxisScale(function (scaleName) {
        // Create scale
        var range = _this2.__axisOpt(scaleName, 'Range')(_this2.width, _this2.height);
        var scale = _this2.__axisOpt(scaleName, 'Scale')().range(range);
        _this2[scaleName] = scale;

        // Setup axes
        _this2[scaleName + 'Axis'] = _this2.__axisOpt(scaleName, 'AxisConstructor')(scale);
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      var _this3 = this;

      this.forEachAxisScale(function (scaleName) {
        var customize = _this3.__axisOpt(scaleName, 'AxisCustomize');

        if (isArray$2(customize)) {
          (function () {
            var axis = _this3[scaleName + 'Axis'];
            customize.forEach(function (customFunc) {
              return customFunc(axis);
            });
          })();
        } else if (isFunc(customize)) {
          customize(_this3[scaleName + 'Axis']);
        }
      });
    }
  }, {
    key: '_initRender',
    value: function _initRender() {
      var _this4 = this;

      // Attach axes
      this.forEachAxisScale(function (scaleName) {
        _this4.support.append('g').attr('class', scaleName + '-axis axis');
      });
      this.updateAxesTransforms();

      get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initRender', this).call(this);
    }
  }, {
    key: '_updateBounds',
    value: function _updateBounds() {
      var actions = get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_updateBounds', this).call(this, true, true);

      this.updateAxesRanges();
      this.updateAxesTransforms();
      this.renderAxes();

      actions.notify();
      actions.update();
    }
  }, {
    key: '_data',
    value: function _data(data) {
      get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_data', this).call(this, data);
      this.updateAxesDomains();
      this.renderAxes();
    }
  }, {
    key: 'replaceScale',
    value: function replaceScale(scaleName, newScaleConstructor) {
      get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), 'replaceScale', this).call(this, scaleName, newScaleConstructor);
      this[scaleName + 'Axis'].scale(this[scaleName]);
      this.renderAxes();
    }
  }, {
    key: 'updateAxesTransforms',
    value: function updateAxesTransforms() {
      var _this5 = this;

      this.forEachAxisScale(function (scaleName) {
        var axisGrp = _this5.support.select('.' + scaleName + '-axis');
        var trans = _this5.__axisOpt(scaleName, 'AxisTransform');

        if (trans) {
          axisGrp.attr('transform', trans(_this5.width, _this5.height));
        }
      });
    }
  }, {
    key: 'updateAxesRanges',
    value: function updateAxesRanges() {
      var _this6 = this;

      this.forEachAxisScale(function (scaleName) {
        var range = _this6.__axisOpt(scaleName, 'Range')(_this6.width, _this6.height);
        _this6[scaleName].range(range);
      });
    }
  }, {
    key: 'updateAxesDomains',
    value: function updateAxesDomains() {
      var _this7 = this;

      var data = this.data();

      this.forEachAxisScale(function (scaleName) {
        var customize = _this7.opts[scaleName + 'DomainCustomize'];
        var extent = data ? _this7._domainExtent(data, scaleName) : [];

        if (customize) {
          extent = _this7.tryInvoke(customize, extent);
        }

        _this7[scaleName].domain(extent);
      });
    }
  }, {
    key: 'renderAxes',
    value: function renderAxes() {
      var _this8 = this;

      // Only suppress all if a literal boolean is given.
      var suppressAxes = this.tryInvoke(this.opts.suppressAxes);
      if (suppressAxes === true) {
        return;
      }

      var isSuppressArray = isArray$2(suppressAxes);

      // (Re)render axes
      this.forEachAxisScale(function (scaleName) {
        if (isSuppressArray && suppressAxes.indexOf(scaleName) > -1) {
          return;
        }

        _this8.support.select('.' + scaleName + '-axis').transition().duration(_this8.opts.transitionDuration).ease(_this8.opts.ease).call(_this8[scaleName + 'Axis']).call(_this8._setLabel.bind(_this8, scaleName)).call(function (t) {
          return _this8.emit('axisRendered', t);
        });
      });
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      // eslint-disable-line no-unused-vars
      throw MonteError.UnimplementedMethod('Domain Extent', '_domainExtent');
    }

    // Loops over each scale name that is bound to an axis.

  }, {
    key: 'forEachAxisScale',
    value: function forEachAxisScale(f) {
      this.axes.forEach(f);
    }
  }, {
    key: '_setLabel',
    value: function _setLabel(scaleName, transition) {
      var _this9 = this;

      // eslint-disable-line no-unused-vars
      var label = this.tryInvoke(this.opts[scaleName + 'Label']);
      var lbl = this.support.select('.' + scaleName + '-axis').selectAll('.monte-axis-label').data([label]);

      lbl.enter().append('text').merge(lbl).attr('class', 'monte-axis-label').text(function (d) {
        return d;
      }).call(function () {
        return _this9.tryInvoke(_this9.opts[scaleName + 'LabelCustomize'], lbl);
      });

      lbl.exit().remove();
    }
  }]);
  return AxesChart;
}(Chart);

var EPSILON = 1e-12;
var PI = Math.PI;
var HALF_PI = PI / 2;
var TAU = 2 * PI;

var math = Object.freeze({
	EPSILON: EPSILON,
	PI: PI,
	HALF_PI: HALF_PI,
	TAU: TAU
});

// Serves as the base chart for charts using polar coordinates (pie, donut, guage, etc...)
// Adds utility common utility functions such as:
// * placement on an arc given an angle and radius, (cos(a) * r, sin(a) * r)
//
// * conversion between Radians (rad) and Degrees (deg)
//    -- Also add support for CSS values like `turn` and `grad` (gradians)???
//
// * constants for angles:
//    -- Common (quarters / cardinal):
//        North/Top (0), West/Left (-1/2 PI), East/Right (1/2 PI), South/Bottom (PI)
//
//    -- Intermediates (eights / ordinal / intercardinal) (i.e. cardinal bisects):
//        Northwest/TopLeft (-1/4 PI), etc...
//
//    [Note: The top eight points collectively are called the principal (or main) winds]
//
//    -- Tertiary (sixteenths / half-winds):
//        NNE (North-northeast) (1/8 PI), etc...

var PolarChart = function (_Chart) {
  inherits(PolarChart, _Chart);

  function PolarChart() {
    classCallCheck(this, PolarChart);
    return possibleConstructorReturn(this, (PolarChart.__proto__ || Object.getPrototypeOf(PolarChart)).apply(this, arguments));
  }

  createClass(PolarChart, [{
    key: '_getLayerTranslate',
    value: function _getLayerTranslate() {
      var l = void 0;
      var t = void 0;

      if (this.opts.origin) {
        l = this.tryInvoke(this.opts.origin.left, this);
        t = this.tryInvoke(this.opts.origin.top, this);
      } else {
        l = this.width / 2 + this.margin.left;
        t = this.height / 2 + this.margin.top;
      }

      return 'translate(' + l + ', ' + t + ')';
    }
  }], [{
    key: 'getCoord',
    value: function getCoord(radius, angle) {
      // In d3-shape the arc `centroid` function uses a 1/2 PI adjustment. We repeat that here for
      // coordinate consistency.
      var a = angle - HALF_PI;
      return [Math.cos(a) * radius, Math.sin(a) * radius];
    }
  }, {
    key: 'degreesToRadians',
    value: function degreesToRadians(deg) {
      return deg * (PI / 180);
    } // radians = degrees * (pi/180)

  }, {
    key: 'radiansToDegrees',
    value: function radiansToDegrees(rad) {
      return rad * (180 / PI);
    } // degrees = radians * (180/pi)

  }]);
  return PolarChart;
}(Chart);

function commonEventNames() {
  var names = [];

  for (var _len = arguments.length, leads = Array(_len), _key = 0; _key < _len; _key++) {
    leads[_key] = arguments[_key];
  }

  for (var i = 0; i < leads.length; i++) {
    var lead = leads[i];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = INTERACTION_EVENTS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var eventName = _step.value;

        names.push(lead + ':' + eventName);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return names;
}

// Clears the domain of a given scale.
function resetScaleDomain(scale) {
  if (scale && scale.domain) {
    scale.domain([]);
  }
}

var LINE_CHART_DEFAULTS = {
  chartCss: 'monte-line-chart',

  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40
  },

  /***********************************************************************************************
   *
   * Line related options
   *
   **********************************************************************************************/

  valuesProp: 'values',

  // Callback function to customize the line generator, such as set the interpolate.
  lineCustomize: null,

  lineStrokeScale: noop,

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  lineCssScale: noop,

  // Static CSS class(es) to apply to every line.
  lineCss: 'line',

  /***********************************************************************************************
   *
   * Point related options
   *
   **********************************************************************************************/

  includePoints: true,

  pointFillScale: noop,

  pointStrokeScale: noop,

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,

  // Static CSS class(es) to apply to every line.
  pointCss: 'point',

  pointSize: 64,

  pointSymbol: function pointSymbol(symbol) {
    return symbol.type(d3.symbolCircle);
  }
};

var LineChart = function (_AxesChart) {
  inherits(LineChart, _AxesChart);

  function LineChart() {
    classCallCheck(this, LineChart);
    return possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).apply(this, arguments));
  }

  createClass(LineChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [LINE_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initCore', this).call(this);

      // Initialize the line generator
      this.line = d3.line().x(function (d) {
        return _this2.getScaledProp('x', d);
      }).y(function (d) {
        return _this2.getScaledProp('y', d);
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initCustomize', this).call(this);
      if (this.opts.lineCustomize) {
        this.opts.lineCustomize(this.line);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('line')), toConsumableArray(commonEventNames('point'))));
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var valuesProp = this.opts.valuesProp;
      var itemProp = this.opts[scaleName + 'Prop'];
      var extents = data.map(function (line) {
        return d3.extent(line[valuesProp], function (d) {
          return d[itemProp];
        });
      });
      var extent = [d3.min(extents, function (d) {
        return d[0];
      }), d3.max(extents, function (d) {
        return d[1];
      })];

      return extent;
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.lineCssScale);
      resetScaleDomain(this.opts.pointCssScale);

      return this;
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var lineGrps = this._updateLines();

      if (this.opts.includePoints) {
        lineGrps.each(function (d, i, nodes) {
          return _this3._updateLinePoints(nodes[i], d, i);
        });
      }

      return lineGrps;
    }
  }, {
    key: '_updateLines',
    value: function _updateLines() {
      var _this4 = this;

      // Data join for the lines
      var lineGrps = this.draw.selectAll('.monte-line-grp').data(this.displayData, function (d, i) {
        return d.id || i;
      });

      // Create new lines
      lineGrps.enter().append('g').attr('class', 'monte-line-grp').append('path').call(this.__bindCommonEvents('line')).merge(lineGrps.select('.monte-line')) // Update existing lines and set values on new lines.
      .attr('class', function (d, i) {
        return _this4._buildCss(['monte-line', _this4.opts.lineCss, _this4.opts.lineCssScale, d.css], d, i);
      }).transition().duration(this.opts.transitionDuration).ease(this.opts.ease).attr('d', function (d) {
        return _this4.line(d[_this4.opts.valuesProp]);
      }).attr('stroke', this.opts.lineStrokeScale);

      // Fade out removed lines.
      lineGrps.exit().transition().duration(this.opts.transitionDuration).style('opacity', 0).remove();

      // Here the order is important. Merging the line groups when only an update occurs results in an
      // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
      return lineGrps.merge(lineGrps.enter().selectAll('.monte-line-grp'));
    }
  }, {
    key: '_updateLinePoints',
    value: function _updateLinePoints(node, lineDatum, lineIndex) {
      var _this5 = this;

      var lineGrp = d3.select(node);

      // Data join for the points
      var points = lineGrp.selectAll('.monte-point').data(function (d) {
        return d[_this5.opts.valuesProp];
      });

      var genSym = function genSym(d, i) {
        var size = _this5.tryInvoke(_this5.opts.pointSize, d, i);
        var symbase = d3.symbol().size(size);
        var symbol = _this5.opts.pointSymbol(symbase, d, i);
        return symbol(d, i);
      };

      // Create new points
      points.enter().append('path').attr('d', genSym).call(this.__bindCommonEvents('point')).merge(points) // Update existing points and set values on new points.
      .attr('transform', function (d) {
        return 'translate(' + _this5.getScaledProp('x', d) + ', ' + _this5.getScaledProp('y', d) + ')';
      }).attr('class', function (d) {
        return _this5._buildCss(['monte-point', lineDatum.css, _this5.opts.lineCssScale, _this5.opts.pointCss, _this5.opts.pointCssScale, d.css], lineDatum.id, lineIndex);
      });

      points.transition().duration(this.opts.transitionDuration).ease(this.opts.ease).attr('fill', this.opts.pointFillScale).attr('stroke', this.opts.pointStrokeScale).attr('transform', function (d) {
        return 'translate(' + _this5.getScaledProp('x', d) + ', ' + _this5.getScaledProp('y', d) + ')';
      }).attr('d', genSym);

      // Fade out removed points.
      points.exit().transition().duration(this.opts.transitionDuration).ease(this.opts.ease).style('opacity', 0).remove();
    }
  }]);
  return LineChart;
}(AxesChart);

function extentFromZero(extent) {
  return [0, extent[1]];
}

function extentBalanced(extent) {
  var min = extent[0];
  var max = extent[1];

  if (min >= 0) {
    return [0, max];
  } else if (min < 0 && max < 0) {
    return [min, 0];
  }

  var absMin = Math.abs(min);
  var absMax = Math.abs(max);
  var extreme = absMax > absMin ? absMax : absMin;

  return [-extreme, extreme];
}

function extentGeneratorZeroToMax(max) {
  return function () {
    return [0, max];
  };
}

// Offset at each end of the extent by an absolute value.
function extentGeneratorValueOffset(minOffset, maxOffset) {
  if (maxOffset == null) {
    maxOffset = minOffset;
  }

  return function (extent) {
    return [extent[0] - minOffset, extent[1] + maxOffset];
  };
}

// Offset by % of total value range.
function extentGeneratorPercentOffset(percent) {
  return function (extent) {
    var adjust = Math.abs(extent[1] - extent[0]) * percent;

    return [extent[0] - adjust, extent[1] + adjust];
  };
}

var AREA_CHART_DEFAULTS = {
  chartCss: 'monte-area-chart',

  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40
  },

  /***********************************************************************************************
   *
   * Area related options
   *
   **********************************************************************************************/

  // Callback function to customize the area generator.
  areaCustomize: null,

  // Scale function for the `fill` attribute to apply per area.
  areaFillScale: noop,

  // Scale function for CSS class to apply per area. Input: line index, Output: String of CSS Class.
  areaCssScale: noop,

  // Static CSS class(es) to apply to every area.
  areaCss: 'area',

  // OVERRIDES
  yDomainCustomize: extentFromZero
};

var AreaChart = function (_LineChart) {
  inherits(AreaChart, _LineChart);

  function AreaChart() {
    classCallCheck(this, AreaChart);
    return possibleConstructorReturn(this, (AreaChart.__proto__ || Object.getPrototypeOf(AreaChart)).apply(this, arguments));
  }

  createClass(AreaChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [AREA_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initCore', this).call(this);

      // Initialize the line generator
      this.area = d3.area().x(function (d) {
        return _this2.getScaledProp('x', d);
      }).y0(function () {
        return _this2.height;
      }).y1(function (d) {
        return _this2.getScaledProp('y', d);
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initCustomize', this).call(this);

      if (this.opts.areaCustomize) {
        this.tryInvoke(this.opts.areaCustomize, this.area);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('area'))));
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.areaCssScale);

      return this;
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var lineGrps = get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_update', this).call(this);

      lineGrps.each(function (d, i, nodes) {
        _this3._updateLineArea(nodes[i], d, i);
      });
    }
  }, {
    key: '_updateLineArea',
    value: function _updateLineArea(node, lineDatum, lineIndex) {
      var _this4 = this;

      var lineGrp = d3.select(node);

      // Data join for the points
      var area = lineGrp.selectAll('.monte-area').data(function (d) {
        return [d];
      });

      // Create new area
      var allAreas = area.enter().insert('path', ':first-child').call(this.__bindCommonEvents('area')).merge(area) // Update existing points and set values on new points.
      .attr('class', function (d) {
        return _this4._buildCss(['monte-area', lineDatum.css, _this4.opts.lineCssScale, _this4.opts.areaCss, _this4.opts.areaCssScale, d.css], lineDatum, lineIndex);
      });

      allAreas.transition().duration(this.tryInvoke(this.opts.transitionDuration, UPDATE)).ease(this.opts.ease).attr('d', function (d) {
        return _this4.area(_this4.getProp('values', d));
      }).attr('fill', this.optionReaderFunc('areaFillScale'));

      // Fade out removed points.
      area.exit().transition(this.tryInvoke(this.opts.transitionDuration, EXIT)).duration(this.opts.transitionDuration).ease(this.opts.ease).style('opacity', 0).remove();
    }
  }]);
  return AreaChart;
}(LineChart);

var SPARKLINE_CHART_DEFAULTS = {
  chartCss: 'monte-sparkline-chart',
  boundingWidth: 80,
  boundingHeight: 30,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  suppressAxes: true,

  pointSize: 24
};

var SparklineChart = function (_LineChart) {
  inherits(SparklineChart, _LineChart);

  function SparklineChart() {
    classCallCheck(this, SparklineChart);
    return possibleConstructorReturn(this, (SparklineChart.__proto__ || Object.getPrototypeOf(SparklineChart)).apply(this, arguments));
  }

  createClass(SparklineChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(SparklineChart.prototype.__proto__ || Object.getPrototypeOf(SparklineChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SPARKLINE_CHART_DEFAULTS]));
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(SparklineChart.prototype.__proto__ || Object.getPrototypeOf(SparklineChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, [data]].concat(tail));
    }
  }]);
  return SparklineChart;
}(LineChart);

var BAR_CHART_DEFAULTS = {
  chartCss: 'monte-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 40
  },

  barCssScale: noop,
  barFillScale: noop,

  barFillScaleAccessor: function barFillScaleAccessor(d) {
    return this.getScaledProp('opts.barFillScale', 'x', d);
  },

  // Static CSS class(es) to apply to every line.
  barCss: 'bar',

  xProp: 'id',
  yProp: 'value',

  xScale: function xScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false,

  labelProp: 'value',
  labelFillScale: noop,
  label: function label(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function labelX(d) {
    return this._barX(d) + this.x.bandwidth() / 2;
  },
  labelYAdjust: '-0.05em',
  labelY: function labelY(d) {
    return this._barY(d);
  }
};

var BarChart = function (_AxesChart) {
  inherits(BarChart, _AxesChart);

  function BarChart() {
    classCallCheck(this, BarChart);
    return possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).apply(this, arguments));
  }

  createClass(BarChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [BAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('bar'))));
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var _this2 = this;

      var extent = null;

      if (scaleName === 'y') {
        extent = d3.extent(data, function (d) {
          return _this2.getProp('y', d);
        });
      } else if (scaleName === 'x') {
        extent = data.map(function (d) {
          return _this2.getProp('x', d);
        });
      }

      return extent;
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.barCssScale);

      return this;
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var barGrps = this._updateBars();

      if (this.opts.includeLabels) {
        barGrps.each(function (d, i, nodes) {
          var node = d3.select(nodes[i]);
          _this3._updateBarLabel(node, d, i, nodes);
        });
      }
    }
  }, {
    key: '_updateBars',
    value: function _updateBars() {
      var _this4 = this;

      var barGrps = this.draw.selectAll('.monte-bar-grp').data(this.displayData, function (d, i) {
        return d.id || i;
      });

      var barX = this._barX.bind(this);
      var barY = this._barY.bind(this);
      var barWidth = this._barWidth.bind(this);
      var barHeight = this._barHeight.bind(this);

      barGrps.enter().append('g').attr('class', 'monte-bar-grp').append('rect').attr('x', barX).attr('y', barY).attr('width', barWidth).attr('height', barHeight).call(this.__bindCommonEvents('bar')).merge(barGrps.select('rect')) // Update existing lines and set values on new lines.
      .attr('class', function (d, i) {
        return _this4._buildCss([_this4.opts.barCss, _this4.opts.barCssScale, d.css], d, i);
      }).transition().duration(this.opts.transitionDuration).ease(this.opts.ease).attr('fill', function (d, i, nodes) {
        return _this4.tryInvoke(_this4.opts.barFillScaleAccessor, d, i, nodes);
      });
      // .attr('fill', (d, i, nodes) => this.tryInvoke(this.opts.barFillScale, d, i, nodes));

      // TODO: Begin adoption `optionReaderFunc`
      // i.e.: .attr('fill', this.optionReaderFunc('barFillScale'));

      barGrps.select('rect').transition().duration(this.opts.transitionDuration).ease(this.opts.ease).attr('x', barX).attr('y', barY).attr('width', barWidth).attr('height', barHeight);

      // Fade out removed lines.
      barGrps.exit().transition().duration(this.opts.transitionDuration).ease(this.opts.ease).style('opacity', 0).remove();

      // Here the order is important. Merging the line groups when only an update occurs results in an
      // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
      return barGrps.merge(barGrps.enter().selectAll('.monte-bar-grp'));
    }
  }, {
    key: '_updateBarLabel',
    value: function _updateBarLabel(barGrp, d, i, nodes) {
      var _this5 = this;

      var lbl = barGrp.selectAll('.monte-bar-label').data([d]);

      lbl.enter().append('text').attr('class', 'monte-bar-label').merge(lbl).attr('fill', function (d1) {
        return _this5.tryInvoke(_this5.opts.labelFillScale, d1, i, nodes);
      }).attr('x', function (d1) {
        return _this5.tryInvoke(_this5.opts.labelX, d1, i, nodes);
      }).attr('dx', function (d1) {
        return _this5.tryInvoke(_this5.opts.labelXAdjust, d1, i, nodes);
      }).attr('y', function (d1) {
        return _this5.tryInvoke(_this5.opts.labelY, d1, i, nodes);
      }).attr('dy', function (d1) {
        return _this5.tryInvoke(_this5.opts.labelYAdjust, d1, i, nodes);
      }).text(function (d1) {
        return _this5.tryInvoke(_this5.opts.label, d1, i, nodes);
      });

      lbl.exit().remove();
    }
  }, {
    key: '_barX',
    value: function _barX(d) {
      return this.getScaledProp('x', d);
    }
  }, {
    key: '_barWidth',
    value: function _barWidth() {
      return this.x.bandwidth();
    }
  }, {
    key: '_barY',
    value: function _barY(d) {
      return this.getScaledProp('y', d);
    }
  }, {
    key: '_barHeight',
    value: function _barHeight(d) {
      return this.height - this.getScaledProp('y', d);
    }
  }]);
  return BarChart;
}(AxesChart);

var HBAR_CHART_DEFAULTS = {
  chartCss: 'monte-hort-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 40,
    left: 40
  },

  xProp: 'value',
  yProp: 'id',

  xScale: d3.scaleLinear,
  yScale: function yScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,

  labelX: function labelX(d) {
    return this._barWidth(d);
  },
  labelXAdjust: '',
  labelY: function labelY(d) {
    return this._barY(d) + this.y.bandwidth() / 2;
  },
  labelYAdjust: '0.5em'
};

var HorizontalBarChart = function (_BarChart) {
  inherits(HorizontalBarChart, _BarChart);

  function HorizontalBarChart() {
    classCallCheck(this, HorizontalBarChart);
    return possibleConstructorReturn(this, (HorizontalBarChart.__proto__ || Object.getPrototypeOf(HorizontalBarChart)).apply(this, arguments));
  }

  createClass(HorizontalBarChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(HorizontalBarChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalBarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [HBAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var _this2 = this;

      var extent = null;

      if (scaleName === 'x') {
        extent = d3.extent(data, function (d) {
          return d[_this2.opts.xProp];
        });
      } else if (scaleName === 'y') {
        extent = data.map(function (d) {
          return d[_this2.opts.yProp];
        });
      }

      return extent;
    }
  }, {
    key: '_barX',
    value: function _barX() {
      return 0;
    }
  }, {
    key: '_barWidth',
    value: function _barWidth(d) {
      return this.getScaledProp('x', d);
    }
  }, {
    key: '_barY',
    value: function _barY(d) {
      return this.getScaledProp('y', d);
    }
  }, {
    key: '_barHeight',
    value: function _barHeight() {
      return this.y.bandwidth();
    }
  }]);
  return HorizontalBarChart;
}(BarChart);

var SIMPLE_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-simple-bar-chart',
  boundingWidth: 10,
  boundingHeight: 100,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  suppressAxes: true,

  xScale: function xScale() {
    return d3.scaleBand().paddingInner(0).round(true);
  },
  yDomainCustomize: [0, 100]
};

var SimpleBarChart = function (_BarChart) {
  inherits(SimpleBarChart, _BarChart);

  function SimpleBarChart() {
    classCallCheck(this, SimpleBarChart);
    return possibleConstructorReturn(this, (SimpleBarChart.__proto__ || Object.getPrototypeOf(SimpleBarChart)).apply(this, arguments));
  }

  createClass(SimpleBarChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(SimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(SimpleBarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SIMPLE_BAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _babelHelpers$get2;

      var valueProp = this.tryInvoke(this.opts.yProp);
      var datum = isObject$2(data) ? data : defineProperty({}, valueProp, data);

      if (!datum.css) {
        datum.css = 'monte-simple-bar-value';
      }

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(SimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(SimpleBarChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, [datum]].concat(tail));
    }
  }]);
  return SimpleBarChart;
}(BarChart);

var SIMPLE_HORT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-simple-hort-bar-chart',
  boundingWidth: 100,
  boundingHeight: 10,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  suppressAxes: true,

  xDomainCustomize: [0, 100],
  yScale: function yScale() {
    return d3.scaleBand().paddingInner(0).round(true);
  }
};

var HorizontalSimpleBarChart = function (_HorizontalBarChart) {
  inherits(HorizontalSimpleBarChart, _HorizontalBarChart);

  function HorizontalSimpleBarChart() {
    classCallCheck(this, HorizontalSimpleBarChart);
    return possibleConstructorReturn(this, (HorizontalSimpleBarChart.__proto__ || Object.getPrototypeOf(HorizontalSimpleBarChart)).apply(this, arguments));
  }

  createClass(HorizontalSimpleBarChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(HorizontalSimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalSimpleBarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SIMPLE_HORT_BAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _babelHelpers$get2;

      var valueProp = this.tryInvoke(this.opts.xProp);
      var datum = isObject$2(data) ? data : defineProperty({}, valueProp, data);

      if (!datum.css) {
        datum.css = 'monte-simple-hort-bar-value';
      }

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(HorizontalSimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalSimpleBarChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, [datum]].concat(tail));
    }
  }]);
  return HorizontalSimpleBarChart;
}(HorizontalBarChart);

var SEGMENT_BAR_MODE = {
  GROUPED: 'grouped',
  STACKED: 'stacked'
};

var SEGMENT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-segement-bar-chart',
  barSegmentCss: 'bar-segment',

  margin: {
    top: 10,
    right: 0,
    bottom: 30,
    left: 40
  },

  segmentBarMode: SEGMENT_BAR_MODE.STACKED,

  xProp: 'id',
  yProp: 'values',
  xInnerProp: 'type',
  yInnerProp: 'value',

  xInnerScale: function xInnerScale() {
    return d3.scaleBand().paddingInner(0.1).paddingOuter(0.1).round(true);
  },

  barCssScale: noop,
  barFillScale: noop,

  // TODO: Begin adoption of generic scale accessors.
  barFillScaleAccessor: function barFillScaleAccessor(d) {
    return this.getScaledProp('opts.barFillScale', 'x', d);
  },

  xScale: function xScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false,

  labelProp: 'value',
  labelFillScale: noop,
  label: function label(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function labelX(d) {
    return this._barX(d) + this.x.bandwidth() / 2;
  },
  labelYAdjust: '-0.05em',
  labelY: function labelY(d) {
    return this._barY(d);
  }
};

var SegmentBarChart = function (_AxesChart) {
  inherits(SegmentBarChart, _AxesChart);

  function SegmentBarChart() {
    classCallCheck(this, SegmentBarChart);
    return possibleConstructorReturn(this, (SegmentBarChart.__proto__ || Object.getPrototypeOf(SegmentBarChart)).apply(this, arguments));
  }

  createClass(SegmentBarChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SEGMENT_BAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('bargrp')), toConsumableArray(commonEventNames('barseg'))));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), '_initCore', this).call(this);
      this._initInnerScales();
    }
  }, {
    key: '_initInnerScales',
    value: function _initInnerScales() {
      this.xInner = this.opts.xInnerScale();
    }

    // Extent of the inner values across all groups

  }, {
    key: '_extentInner',
    value: function _extentInner(data, baseProp) {
      var _this2 = this;

      var vals = [];
      data.forEach(function (d) {
        _this2.getProp(baseProp, d).forEach(function (d1) {
          return vals.push(_this2.getProp(baseProp + 'Inner', d1));
        });
      });

      return d3.extent(vals);
    }

    // Sum the inner values within groups, take max of sums

  }, {
    key: '_extentMaxes',
    value: function _extentMaxes(data, baseProp) {
      var _this3 = this;

      var maxes = data.map(function (d) {
        return d3.sum(_this3.getProp(baseProp, d), function (d1) {
          return _this3.getProp(baseProp + 'Inner', d1);
        });
      });

      return [0, d3.max(maxes)];
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var _this4 = this;

      var extent = null;

      if (scaleName === 'x') {
        extent = data.map(function (d) {
          return _this4.getProp('x', d);
        });
      } else if (scaleName === 'y') {
        var mode = this.tryInvoke(this.opts.segmentBarMode);

        if (mode === SEGMENT_BAR_MODE.GROUPED) {
          extent = this._extentInner(data, 'y');
        } else if (mode === SEGMENT_BAR_MODE.STACKED) {
          extent = this._extentMaxes(data, 'y');
        } else {
          throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
        }
      }

      return extent;
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.barCssScale);
      resetScaleDomain(this.opts.barFillScale);

      return this;
    }
  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.option('segmentBarMode', mode);
      this.updateAxesDomains();
      this.renderAxes();
      this.update();
    }
  }, {
    key: 'updateAxesRanges',
    value: function updateAxesRanges() {
      get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), 'updateAxesRanges', this).call(this);
      this._updateXInnerRange();
      this._updateYInnerRange();
    }
  }, {
    key: '_updateXInnerRange',
    value: function _updateXInnerRange() {
      this.xInner.range([0, this.x.bandwidth()]);
    }
  }, {
    key: '_updateXInnerDomain',
    value: function _updateXInnerDomain() {
      var data = this.data();
      var yProp = this.tryInvoke(this.opts.yProp);
      var xInnerProp = this.tryInvoke(this.opts.xInnerProp);
      var xInnerDomain = data[0][yProp].map(function (d) {
        return d[xInnerProp];
      });
      this.xInner.domain(xInnerDomain);
    }
  }, {
    key: '_updateYInnerRange',
    value: function _updateYInnerRange() {}
  }, {
    key: '_updateYInnerDomain',
    value: function _updateYInnerDomain() {}
  }, {
    key: '_data',
    value: function _data(data) {
      get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), '_data', this).call(this, data);

      this._updateXInnerDomain();
      this._updateXInnerRange();
      this._updateYInnerDomain();
      this._updateYInnerRange();
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      var mode = this.tryInvoke(this.opts.segmentBarMode);

      if (mode === SEGMENT_BAR_MODE.STACKED) {
        this._updateStackedBars();
      } else if (mode === SEGMENT_BAR_MODE.GROUPED) {
        this._updateGroupedBars();
      } else {
        throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
      }
    }
  }, {
    key: '_updateStackedBars',
    value: function _updateStackedBars() {
      var _this5 = this;

      var barGrps = this.draw.selectAll('.monte-segment-bar-grp').data(this.displayData, function (d, i) {
        return d.id || i;
      });

      var barXInner = this._barXInnerStacked.bind(this);
      var barYInner = this._barYInnerStacked.bind(this);
      var barWidth = this._barWidthStacked.bind(this);
      var barHeight = this._barHeightStacked.bind(this);
      var translate = this._barGroupTranslate.bind(this);

      barGrps.enter().append('g').attr('class', 'monte-segment-bar-grp').call(this.__bindCommonEvents('bargrp')).merge(barGrps).attr('transform', function (d) {
        return 'translate(' + translate(d) + ')';
      }).each(function (d, i, nodes) {
        var prop = _this5._barProp();
        var nestedData = d[prop];
        var innerRects = d3.select(nodes[i]).selectAll('rect').data(nestedData);

        innerRects.enter().append('rect').call(_this5.__bindCommonEvents('barseg')).merge(innerRects).transition().duration(_this5.opts.transitionDuration).delay(_this5.opts.delay).ease(_this5.opts.ease).attr('x', barXInner).attr('y', barYInner).attr('width', barWidth).attr('height', barHeight);
      });

      barGrps.exit().remove();
    }
  }, {
    key: '_updateGroupedBars',
    value: function _updateGroupedBars() {
      var _this6 = this;

      var barGrps = this.draw.selectAll('.monte-segment-bar-grp').data(this.displayData, function (d, i) {
        return d.id || i;
      });

      var barXInner = this._barXInnerGrouped.bind(this);
      var barYInner = this._barYInnerGrouped.bind(this);
      var barWidth = this._barWidthGrouped.bind(this);
      var barHeight = this._barHeightGrouped.bind(this);
      var translate = this._barGroupTranslate.bind(this);

      barGrps.enter().append('g').attr('class', 'monte-segment-bar-grp').call(this.__bindCommonEvents('bargrp')).merge(barGrps).attr('transform', function (d) {
        return 'translate(' + translate(d) + ')';
      }).each(function (d, i, nodes) {
        var prop = _this6._barProp();
        var nestedData = d[prop];
        var innerRects = d3.select(nodes[i]).selectAll('rect').data(nestedData);

        innerRects.enter().append('rect').call(_this6.__bindCommonEvents('barseg')).merge(innerRects).transition().duration(_this6.opts.transitionDuration).delay(_this6.opts.delay).ease(_this6.opts.ease).attr('x', barXInner).attr('y', barYInner).attr('width', barWidth).attr('height', barHeight);
      });

      barGrps.exit().remove();
    }

    // TODO: Check if it works with both layouts.

  }, {
    key: '_updateBarLabel',
    value: function _updateBarLabel(barGrp, d, i, nodes) {
      var _this7 = this;

      var lbl = barGrp.selectAll('.monte-bar-label').data([d]);

      lbl.enter().append('text').attr('class', 'monte-bar-label').merge(lbl).attr('fill', function (d1) {
        return _this7.tryInvoke(_this7.opts.labelFillScale, d1, i, nodes);
      }).attr('x', function (d1) {
        return _this7.tryInvoke(_this7.opts.labelX, d1, i, nodes);
      }).attr('dx', function (d1) {
        return _this7.tryInvoke(_this7.opts.labelXAdjust, d1, i, nodes);
      }).attr('y', function (d1) {
        return _this7.tryInvoke(_this7.opts.labelY, d1, i, nodes);
      }).attr('dy', function (d1) {
        return _this7.tryInvoke(_this7.opts.labelYAdjust, d1, i, nodes);
      }).text(function (d1) {
        return _this7.tryInvoke(_this7.opts.label, d1, i, nodes);
      });

      lbl.exit().remove();
    }
  }, {
    key: '_barProp',
    value: function _barProp() {
      return this.tryInvoke(this.opts.yProp);
    }
  }, {
    key: '_barGroupTranslate',
    value: function _barGroupTranslate(d) {
      return this._barX(d) + ', 0';
    }
  }, {
    key: '_barX',
    value: function _barX(d) {
      return this.getScaledProp('x', d);
    }
  }, {
    key: '_barXInnerGrouped',
    value: function _barXInnerGrouped(d) {
      return this.getScaledProp('xInner', d);
    }
  }, {
    key: '_barXInnerStacked',
    value: function _barXInnerStacked() {
      return 0;
    }
  }, {
    key: '_barWidthStacked',
    value: function _barWidthStacked() {
      return this.x.bandwidth();
    }
  }, {
    key: '_barWidthGrouped',
    value: function _barWidthGrouped() {
      return this.xInner.bandwidth();
    }
  }, {
    key: '_barY',
    value: function _barY(d) {
      return this.getScaledProp('y', d);
    }
  }, {
    key: '_barYInnerGrouped',
    value: function _barYInnerGrouped(d) {
      return this.height - this._barHeightGrouped(d);
    }
  }, {
    key: '_barYInnerStacked',
    value: function _barYInnerStacked(d, i, nodes) {
      var baseY = this.getScaledProp('y', 'yInner', d);
      var yShift = 0;

      for (var j = 0; j < i; j++) {
        var n = d3.select(nodes[j]);
        var d1 = n.datum();
        yShift -= this._barHeightStacked(d1);
      }

      return baseY + yShift;
    }
  }, {
    key: '_barHeightGrouped',
    value: function _barHeightGrouped(d) {
      return this.height - this.getScaledProp('y', 'yInner', d);
    }
  }, {
    key: '_barHeightStacked',
    value: function _barHeightStacked(d) {
      return this.height - this.getScaledProp('y', 'yInner', d);
    }
  }]);
  return SegmentBarChart;
}(AxesChart);

// import { commonEventNames } from '../../tools/commonEventNames';
// import { resetScaleDomain } from '../../tools/resetScaleDomain';

var HSEGMENT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-horizontal-segement-bar-chart',
  barSegmentCss: 'bar-segment',

  margin: {
    top: 10,
    right: 0,
    bottom: 30,
    left: 40
  },

  segmentBarMode: SEGMENT_BAR_MODE.STACKED,

  yProp: 'id',
  xProp: 'values',
  yInnerProp: 'type',
  xInnerProp: 'value',

  xScale: d3.scaleLinear,

  yInnerScale: function yInnerScale() {
    return d3.scaleBand().paddingInner(0.1).paddingOuter(0.1).round(true);
  },

  yScale: function yScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,

  includeLabels: false,

  labelProp: 'value',
  labelFillScale: noop,
  label: function label(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function labelX(d) {
    return this._barX(d) + this.x.bandwidth() / 2;
  },
  labelYAdjust: '-0.05em',
  labelY: function labelY(d) {
    return this._barY(d);
  }
};

var HorizontalSegmentBarChart = function (_SegmentBarChart) {
  inherits(HorizontalSegmentBarChart, _SegmentBarChart);

  function HorizontalSegmentBarChart() {
    classCallCheck(this, HorizontalSegmentBarChart);
    return possibleConstructorReturn(this, (HorizontalSegmentBarChart.__proto__ || Object.getPrototypeOf(HorizontalSegmentBarChart)).apply(this, arguments));
  }

  createClass(HorizontalSegmentBarChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(HorizontalSegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalSegmentBarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [HSEGMENT_BAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_initInnerScales',
    value: function _initInnerScales() {
      this.yInner = this.opts.yInnerScale();
    }
  }, {
    key: '_updateXInnerRange',
    value: function _updateXInnerRange() {}
  }, {
    key: '_updateXInnerDomain',
    value: function _updateXInnerDomain() {}
  }, {
    key: '_updateYInnerRange',
    value: function _updateYInnerRange() {
      this.yInner.range([0, this.y.bandwidth()]);
    }
  }, {
    key: '_updateYInnerDomain',
    value: function _updateYInnerDomain() {
      var data = this.data();
      var xProp = this.tryInvoke(this.opts.xProp);
      var yInnerProp = this.tryInvoke(this.opts.yInnerProp);
      var yInnerDomain = data[0][xProp].map(function (d) {
        return d[yInnerProp];
      });
      this.yInner.domain(yInnerDomain);
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var _this2 = this;

      var extent = null;

      if (scaleName === 'y') {
        extent = data.map(function (d) {
          return _this2.getProp('y', d);
        });
      } else if (scaleName === 'x') {
        var mode = this.tryInvoke(this.opts.segmentBarMode);

        if (mode === SEGMENT_BAR_MODE.GROUPED) {
          extent = this._extentInner(data, 'x');
        } else if (mode === SEGMENT_BAR_MODE.STACKED) {
          extent = this._extentMaxes(data, 'x');
        } else {
          throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
        }
      }

      return extent;
    }
  }, {
    key: '_barProp',
    value: function _barProp() {
      return this.tryInvoke(this.opts.xProp);
    }
  }, {
    key: '_barGroupTranslate',
    value: function _barGroupTranslate(d) {
      return '0, ' + this._barY(d);
    }
  }, {
    key: '_barX',
    value: function _barX(d) {
      return this.getScaledProp('x', d);
    }
  }, {
    key: '_barXInnerGrouped',
    value: function _barXInnerGrouped() {
      return 0;
    }
  }, {
    key: '_barXInnerStacked',
    value: function _barXInnerStacked(d, i, nodes) {
      var baseX = 0;
      var xShift = 0;

      for (var j = 0; j < i; j++) {
        var n = d3.select(nodes[j]);
        var d1 = n.datum();
        xShift += this._barWidthStacked(d1);
      }

      return baseX + xShift;
    }
  }, {
    key: '_barWidthGrouped',
    value: function _barWidthGrouped(d) {
      return this.getScaledProp('x', 'xInner', d);
    }
  }, {
    key: '_barWidthStacked',
    value: function _barWidthStacked(d) {
      return this.getScaledProp('x', 'xInner', d);
    }
  }, {
    key: '_barY',
    value: function _barY(d) {
      return this.getScaledProp('y', d);
    }
  }, {
    key: '_barYInnerGrouped',
    value: function _barYInnerGrouped(d) {
      return this.getScaledProp('yInner', d);
    }
  }, {
    key: '_barYInnerStacked',
    value: function _barYInnerStacked() {
      return 0;
    }
  }, {
    key: '_barHeightGrouped',
    value: function _barHeightGrouped() {
      return this.yInner.bandwidth();
    }
  }, {
    key: '_barHeightStacked',
    value: function _barHeightStacked() {
      return this.y.bandwidth();
    }
  }]);
  return HorizontalSegmentBarChart;
}(SegmentBarChart);

var SCATTER_PLOT_DEFAULTS = {
  chartCss: 'monte-scatter-plot',

  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40
  },

  // The size of each point
  pointSize: 64,

  pointFillScale: noop,

  pointStrokeScale: noop,

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,

  // Static CSS class(es) to apply to every line.
  pointCss: 'monte-point',

  pointSymbol: function pointSymbol(symbol) {
    return symbol.type(d3.symbolCircle);
  },

  pointEnterStart: noop,
  pointEnterEnd: noop,
  pointExitStart: noop,
  pointExitEnd: noop
};

var ScatterPlot = function (_AxesChart) {
  inherits(ScatterPlot, _AxesChart);

  function ScatterPlot() {
    classCallCheck(this, ScatterPlot);
    return possibleConstructorReturn(this, (ScatterPlot.__proto__ || Object.getPrototypeOf(ScatterPlot)).apply(this, arguments));
  }

  createClass(ScatterPlot, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SCATTER_PLOT_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_initCore', this).call(this);

      this.symbol = d3.symbol();
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('point'))));
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var itemProp = this.opts[scaleName + 'Prop'];
      var extent = d3.extent(data, function (d) {
        return d[itemProp];
      });

      return extent;
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.pointCssScale);

      return this;
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      var points = this._updatePoints();

      return points;
    }
  }, {
    key: '_updatePoints',
    value: function _updatePoints() {
      var _this2 = this;

      // Data join for the points
      var points = this.draw.selectAll('.monte-point').data(this.displayData); // , (d, i) => d.id || i);

      // Create new points
      points.enter().append('path').call(this.__bindCommonEvents('point')).merge(points) // Update existing points and set values on new points.
      .attr('d', function (d, i) {
        var symbase = d3.symbol().size(_this2.opts.pointSize);
        var symbol = _this2.opts.pointSymbol(symbase, d, i);
        return symbol(d, i);
      }).attr('fill', function (d, i) {
        return _this2.opts.pointFillScale(d.id || i);
      }).attr('stroke', function (d, i) {
        return _this2.opts.pointStrokeScale(d.id || i);
      }).attr('class', function (d, i) {
        return _this2._buildCss(['monte-point', _this2.opts.pointCss, _this2.opts.pointCssScale, d.css], d, i);
      }).transition().duration(this.opts.transitionDuration).ease(this.opts.ease).call(this.opts.pointEnterStart).attr('transform', function (d) {
        return 'translate(' + _this2.getScaledProp('x', d) + ', ' + _this2.getScaledProp('y', d) + ')';
      }).call(this.opts.pointEnterEnd);

      // Fade out removed points.
      points.exit().transition().duration(this.opts.transitionDuration).ease(this.opts.ease).call(this.opts.pointExitStart).style('opacity', 0).call(this.opts.pointExitEnd).remove();

      return points.merge(points.enter().selectAll('.point'));
    }
  }]);
  return ScatterPlot;
}(AxesChart);

var ICON_MODE = {
  D3_SYMBOL: 'd3Symbol',
  SVG_USE_DEF: 'svgUseDef',
  SVG_USE_EXTERNAL: 'svgUseExternal'
};

var ICON_PLACEMENT = {
  BottomToTopLeftToRightPlacement: {
    rowIndex: function rowIndex(d, i) {
      return Math.floor(i / this.opts.columns);
    },

    columnIndex: function columnIndex(d, i) {
      return i % this.opts.columns;
    }
  },

  TopToBottomLeftToRightPlacement: {
    rowIndex: function rowIndex(d, i) {
      return this.opts.rows - Math.floor(i / this.opts.columns) - 1;
    },

    columnIndex: function columnIndex(d, i) {
      return i % this.opts.columns;
    }
  }
};

var ICON_ARRAY_DEFAULTS = {
  chartCss: 'monte-icon-array',
  boundingWidth: 100,
  boundingHeight: 100,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  suppressAxes: true,

  xScale: function xScale() {
    return d3.scalePoint().padding(0.5);
  },

  yScale: function yScale() {
    return d3.scalePoint().padding(0.5);
  },

  iconFillScale: noop,
  iconStrokeScale: noop,
  iconCssScale: noop,
  iconCss: 'icon',
  iconSize: 24,
  iconSymbol: function iconSymbol(symbol) {
    return symbol.type(d3.symbolCircle);
  },
  iconMode: ICON_MODE.D3_SYMBOL,
  iconDefId: 'svgIcon',
  iconSvgWidth: 24,
  iconSvgHeight: 24,
  iconHref: '',
  iconSvgSymbol: function iconSvgSymbol(symbol) {
    symbol.attr('viewbox', '0 0 24 24').append('path').attr('d', 'm 0,0 24,24 m -24,0 24,-24');
  },

  rows: 10,
  columns: 10,

  placement: ICON_PLACEMENT.TopToBottomLeftToRightPlacement,

  svgVersion: 1 };

var IconArray = function (_AxesChart) {
  inherits(IconArray, _AxesChart);

  function IconArray() {
    classCallCheck(this, IconArray);
    return possibleConstructorReturn(this, (IconArray.__proto__ || Object.getPrototypeOf(IconArray)).apply(this, arguments));
  }

  createClass(IconArray, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(IconArray.prototype.__proto__ || Object.getPrototypeOf(IconArray.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [ICON_ARRAY_DEFAULTS]));
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(IconArray.prototype.__proto__ || Object.getPrototypeOf(IconArray.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('icon'))));
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get(IconArray.prototype.__proto__ || Object.getPrototypeOf(IconArray.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.iconCssScale);

      return this;
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var extent = null;

      if (scaleName === 'y') {
        extent = new Array(this.opts.rows);
      } else if (scaleName === 'x') {
        extent = new Array(this.opts.columns);
      }

      return extent.fill().map(function (_, idx) {
        return idx;
      });
    }
  }, {
    key: '_render',
    value: function _render() {
      var _this2 = this;

      if (this.opts.iconMode === ICON_MODE.SVG_USE_DEF) {
        (function () {
          var chart = _this2;
          _this2.defs.append('symbol').attr('id', 'svgIcon').each(function () {
            chart.opts.iconSvgSymbol(d3.select(this));
          });
        })();
      }
    }
  }, {
    key: '_update',
    value: function _update() {
      var max = this.opts.rows * this.opts.columns;

      if (max < this.displayData.length) {
        throw new MonteError('Maximum number of items is ' + max + '. Data contains ' + this.displayData.length + '.');
      }

      this._updateIcons();
    }
  }, {
    key: '_updateIcons',
    value: function _updateIcons() {
      var _modeMap;

      var modeMap = (_modeMap = {}, defineProperty(_modeMap, ICON_MODE.D3_SYMBOL, this._updateD3Symbol), defineProperty(_modeMap, ICON_MODE.SVG_USE_DEF, this._updateSvgUse), defineProperty(_modeMap, ICON_MODE.SVG_USE_EXTERNAL, this._updateSvgUse), _modeMap);

      var icons = this.draw.selectAll('.monte-icon').data(this.displayData);

      modeMap[this.opts.iconMode].call(this, icons, this.opts.iconMode);

      // Fade out removed icons.
      icons.exit().transition().duration(this.opts.transitionDuration).ease(this.opts.ease).style('opacity', 0).remove();
    }
  }, {
    key: '_updateD3Symbol',
    value: function _updateD3Symbol(icons) {
      var _this3 = this;

      var genSym = function genSym(d, i) {
        var size = _this3.tryInvoke(_this3.opts.iconSize, d, i);
        var symbase = d3.symbol().size(size);
        var symbol = _this3.opts.iconSymbol(symbase, d, i);
        return symbol(d, i);
      };

      this._updateCommon('path', icons, iconTransform).attr('d', genSym);
    }
  }, {
    key: '_updateSvgUse',
    value: function _updateSvgUse(icons, mode) {
      var _this4 = this;

      var href = mode === ICON_MODE.SVG_USE_DEF ? function (d, i, nodes) {
        return '#' + _this4.tryInvoke(_this4.opts.iconDefId, d, i, nodes);
      } : function (d, i, nodes) {
        return _this4.tryInvoke(_this4.opts.iconHref, d, i, nodes);
      };

      var mergedUpdates = function mergedUpdates(d, i, nodes) {
        var node = d3.select(nodes[i]);

        node.attr('width', _this4.opts.iconSvgWidth).attr('height', _this4.opts.iconSvgHeight);
      };

      var hrefAttr = this.tryInvoke(this.opts.svgVersion) === 2 ? 'href' : 'xlink:href';
      this._updateCommon('use', icons, iconTransformShift, mergedUpdates).attr(hrefAttr, href);
    }
  }, {
    key: '_updateCommon',
    value: function _updateCommon(type, icons, transform) {
      var _this5 = this;

      var merge = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];

      var t = icons.enter().append(type).call(this.__bindCommonEvents('icon')).merge(icons).each(merge).attr('transform', function (d, i, nodes) {
        return transform.call(_this5, d, i, nodes);
      }).attr('class', function (d, i) {
        return _this5._buildCss(['monte-icon', _this5.opts.iconCss, _this5.opts.iconCssScale, d.css], d, i);
      }).transition().duration(this.opts.transitionDuration).ease(this.opts.ease).attr('fill', this.opts.iconFillScale).attr('stroke', this.opts.iconStrokeScale);

      return t;
    }
  }]);
  return IconArray;
}(AxesChart);

function iconTransform(d, i, nodes) {
  var col = this.tryInvoke(this.opts.placement.columnIndex, d, i, nodes);
  var row = this.tryInvoke(this.opts.placement.rowIndex, d, i, nodes);
  var x = this.getScaledProp('x', col);
  var y = this.getScaledProp('y', row);

  return 'translate(' + x + ', ' + y + ')';
}

function iconTransformShift(d, i, nodes) {
  var col = this.tryInvoke(this.opts.placement.columnIndex, d, i, nodes);
  var row = this.tryInvoke(this.opts.placement.rowIndex, d, i, nodes);
  var x = this.getScaledProp('x', col);
  var y = this.getScaledProp('y', row);
  var xShift = this.opts.iconSvgWidth / 2;
  var yShift = this.opts.iconSvgHeight / 2;

  return 'translate(' + (x - xShift) + ', ' + (y - yShift) + ')';
}

function arcSimpleTween(arc, from, to) {
  var i = d3.interpolate(from, to);

  return function (t) {
    return arc(i(t));
  };
}

// Constrain to smallest draw-area dimension
function radiusContrain(width, height) {
  var wr = width / 2;
  var hr = height / 2;

  return wr < hr ? wr : hr;
}

var ARC_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart',

  cornerRadius: 0,
  innerRadius: 0,
  outerRadius: radiusContrain,

  arcCustomize: null,
  arcCss: 'arc',
  arcWedgeCss: 'wedge',
  arcWedgeCssScale: noop,
  arcWedgeFillScale: noop,
  arcWedgeStrokeScale: noop,

  arcWedgeEnter: function arcWedgeEnter(d) {
    return {
      startAngle: d.endAngle,
      endAngle: d.endAngle,
      value: d.value,
      padAngle: d.padAngle,
      index: d.index
    };
  },

  // Background css and fill scales.
  arcBgWedgeCssScale: noop,
  arcBgWedgeFillScale: noop,

  itemValueProp: 'value',
  pieStartAngle: 0,
  pieEndAngle: TAU,
  piePadAngle: 0.02
};

var ArcChart = function (_PolarChart) {
  inherits(ArcChart, _PolarChart);

  function ArcChart() {
    classCallCheck(this, ArcChart);
    return possibleConstructorReturn(this, (ArcChart.__proto__ || Object.getPrototypeOf(ArcChart)).apply(this, arguments));
  }

  createClass(ArcChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [ARC_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initCore', this).call(this);

      // Initialize the arc generator
      this.arc = d3.arc().cornerRadius(this.opts.cornerRadius);

      this.pie = d3.pie().value(function (d) {
        return d[_this2.opts.itemValueProp];
      }).sortValues(null).startAngle(this.opts.pieStartAngle).endAngle(this.opts.pieEndAngle).padAngle(this.opts.piePadAngle);
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initCustomize', this).call(this);
      if (this.opts.arcCustomize) {
        this.opts.arcCustomize(this.arc);
      }
      if (this.opts.pieCustomize) {
        this.opts.pieCustomize(this.pie);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('wedge'))));
    }
  }, {
    key: '_updateBounds',
    value: function _updateBounds() {
      get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_updateBounds', this).call(this);

      this.arc.innerRadius(this.tryInvoke(this.opts.innerRadius, this.width, this.height)).outerRadius(this.tryInvoke(this.opts.outerRadius, this.width, this.height));
    }
  }, {
    key: '_data',
    value: function _data(data) {
      this.pieDisplayData = this.pie(data);
      get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_data', this).call(this, data);
    }
  }, {
    key: '_update',
    value: function _update() {
      this._updateArcs();
      this._updateBackground();
    }
  }, {
    key: '_updateArcs',
    value: function _updateArcs() {
      var _this3 = this;

      var arcs = this.draw.selectAll('.monte-arc').data(this.pieDisplayData);
      var arc = this.arc;

      arcs.enter().append('g').attr('class', 'monte-arc ' + this.opts.arcCss).append('path').attr('class', function (d, i) {
        return _this3._buildCss(['monte-arc-wedge', _this3.opts.arcWedgeCss, _this3.opts.arcWedgeCssScale, d.data.css], d, i);
      }).call(this.__bindCommonEvents('wedge')).transition().delay(this.opts.transitionDuration).duration(this.opts.transitionDuration).ease(this.opts.ease).attrTween('d', function (d) {
        var start = _this3.tryInvoke(_this3.opts.arcWedgeEnter, d);
        return arcSimpleTween(arc, start, d);
      }).attr('fill', function (d, i) {
        return _this3.opts.arcWedgeFillScale(d.id || i);
      });

      arcs.selectAll('.monte-arc-wedge').each(function () {
        // Sync data to containing element since it is not done automatically.
        var pd = d3.select(this.parentElement).datum();
        var n = d3.select(this);
        var nd = n.datum();
        pd.prev = nd;
        n.datum(pd);

        delete nd.prev; // Remove old records to prevent building a history tree.
      }).attr('class', function (d, i) {
        return _this3._buildCss(['monte-arc-wedge', _this3.opts.arcWedgeCss, _this3.opts.arcWedgeCssScale, d.data.css], d, i);
      }).transition().delay(this.opts.transitionDuration).duration(this.opts.transitionDuration).ease(this.opts.ease).attrTween('d', function (d) {
        return arcSimpleTween(arc, d.prev, d);
      }).attr('fill', function (d, i) {
        return _this3.opts.arcWedgeFillScale(d.id || i);
      });

      arcs.exit().transition().duration(this.opts.transitionDuration).ease(this.opts.ease).style('opacity', 0.01).remove();
    }
  }, {
    key: '_updateBackground',
    value: function _updateBackground() {
      var _this4 = this;

      var pieSum = this.displayData.reduce(function (accum, cur) {
        return accum + cur.value;
      }, 0);
      var bgArc = this.arc({
        index: 0,
        startAngle: this.opts.pieStartAngle,
        endAngle: this.opts.pieEndAngle,
        value: pieSum
      });
      var wedge = this.bg.selectAll('.monte-wedge-bg').data([bgArc]);

      wedge.enter().append('path').merge(wedge).attr('d', function (d) {
        return d;
      }).attr('fill', function () {
        return _this4.opts.arcBgWedgeFillScale();
      }).attr('class', function () {
        return ['monte-wedge-bg', _this4.opts.arcBgWedgeCssScale()].join(' ');
      });
    }
  }]);
  return ArcChart;
}(PolarChart);

function needleRoundedEnd() /* options */{
  return function needleRoundedEndDyn(needleHeight, needleBaseWidth) {
    var h = needleHeight; // Overall height, starts from origin
    var r = needleBaseWidth / 2; // Base width === diameter

    var p1 = '-' + r + ' 0';
    var p2 = '0 -' + h;
    var p3 = r + ' 0';
    var a = [r + ' ' + r, 0, 0, 1, '-' + r + ' 0'].join(',');
    var path = ['M', p1, p2, p3, 'A', a, 'Z'].join(' ');

    return path;
  };
}

function needleFlatEnd() /* options */{
  return function needleFlatEndDyn(needleHeight, needleBaseWidth) {
    var h = needleHeight;
    var w = needleBaseWidth / 2;

    var p1 = '-' + w + ' 0';
    var p2 = '0 -' + h;
    var p3 = w + ' 0';
    var path = ['M', p1, p2, p3, 'Z'].join(' ');

    return path;
  };
}

var NEEDLE_EXT = {
  smallNeedleHeight: 0,
  smallNeedleRatio: 0.05
};

function needleExtraPointer(options) {
  var opts = mergeOptions(options, NEEDLE_EXT);

  return function needleExtraPointerDyn(needleHeight, needleBaseWidth) {
    var h1 = needleHeight;
    var h2 = opts.smallNeedleHeight || needleHeight * opts.smallNeedleRatio;
    var w = needleBaseWidth / 2;

    var p1 = '-' + w + ' 0';
    var p2 = '0 -' + h1;
    var p3 = w + ' 0';
    var p4 = '0 ' + h2;
    var path = ['M', p1, p2, p3, p4, 'Z'].join(' ');

    return path;
  };
}

function needleRect(options) {
  var opts = mergeOptions(options, NEEDLE_EXT);

  return function neddleRectDyn(needleHeight, needleBaseWidth) {
    var h1 = needleHeight;
    var h2 = opts.smallNeedleHeight || needleHeight * opts.smallNeedleRatio;
    var w = needleBaseWidth / 2;

    return 'M -' + w + ' 0  -' + w + ' -' + h1 + '  ' + w + ' -' + h1 + '  ' + w + ' 0 ' + w + ' ' + h2 + ' -' + w + ' ' + h2 + ' Z';
  };
}

// export function needleCircleBase(options) {
//   const opts = _.defaultsDeep({}, options, NEEDLE_EXTRA_POINTER);
//
//   return function needle_extra_pointer(needleHeight, needleBaseWidth) {
//     const h1 = needleHeight;
//     const h2 = opts.smallNeedleHeight || (needleHeight * opts.smallNeedleRatio);
//     const w = needleBaseWidth / 2;
//
//     const p1 = '-' + w + ' 0';
//     const p2 = '0 -' + h1;
//     const p3 = w + ' 0';
//     const p4 = '0 ' + h2;
//     const path = ['M', p1, p2, p3, p4, 'Z'].join(' ');
//
//     return path;
//   }
// }

var GAUGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-gauge-chart',
  piePadAngle: 0,
  pieStartAngle: -HALF_PI,
  pieEndAngle: HALF_PI,

  arcBgCssScale: noop,
  arcBgFillScale: noop,

  needleBase: 20,
  needleHeight: function needleHeight(outerRadius, innerRadius) {
    return (outerRadius - innerRadius) / 2 + innerRadius;
  },
  needlePath: needleRoundedEnd(),

  innerRadius: function innerRadius(w, h) {
    return radiusContrain(w, h) * 0.9;
  },
  labelRadius: function labelRadius(w, h) {
    return radiusContrain(w, h) * 0.8;
  },

  segmentsProp: 'segments',
  itemValueProp: 'interval',
  startValueProp: 'start',
  segmentLabelProp: 'label'
};

var GaugeChart = function (_ArcChart) {
  inherits(GaugeChart, _ArcChart);

  function GaugeChart() {
    classCallCheck(this, GaugeChart);
    return possibleConstructorReturn(this, (GaugeChart.__proto__ || Object.getPrototypeOf(GaugeChart)).apply(this, arguments));
  }

  createClass(GaugeChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [GAUGE_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initCore', this).call(this);

      this._prevNeedleAngleValueData = 0;
      this.needleValueData = 0;
      this.needleValueAngleData = 0;
    }
  }, {
    key: '_initRender',
    value: function _initRender() {
      get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initRender', this).call(this);

      this.bgArc = d3.arc().startAngle(this.tryInvoke(this.opts.pieStartAngle)).endAngle(this.tryInvoke(this.opts.pieEndAngle)).innerRadius(0).outerRadius(this.tryInvoke(this.opts.outerRadius, this.width, this.height)).cornerRadius(this.tryInvoke(this.opts.cornerRadius));

      this.angleScale = d3.scaleLinear().range([this.opts.pieStartAngle, this.opts.pieEndAngle]);
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, ['updateNeedle', 'updateBackgroundArc', 'updateLabels' // Gauge events
      ]));
    }
  }, {
    key: '_getLayerTranslate',
    value: function _getLayerTranslate() {
      var or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
      var l = this.width / 2 + this.margin.left;
      var t = this.height - (this.height - or) + this.margin.top;
      return 'translate(' + l + ', ' + t + ')';
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _this2 = this;

      this.needleValue(data[this.opts.itemValueProp]);
      get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_data', this).call(this, data[this.opts.segmentsProp]);

      var intervalSum = this.displayData.reduce(function (acc, d) {
        return acc + Math.abs(d[_this2.opts.itemValueProp]);
      }, 0);

      // this.angleScale.domain([0, intervalSum]);
      var start = data[this.opts.startValueProp] || 0;
      this.angleScale.domain([start, start + intervalSum]);
    }
  }, {
    key: 'needleValue',
    value: function needleValue(value) {
      if (value === undefined) {
        return this.needleValueData;
      }

      this._prevNeedleAngleValueData = this.needleValueAngleData;
      this.needleValueData = value;
      this.needleValueAngleData = this.angleScale(value);
      this.update();

      return this;
    }
  }, {
    key: 'needleValueAngle',
    value: function needleValueAngle() {
      // TODO: Add support for directly setting the angle? (Use scale's `invert()`?)

      return this.needleValueAngleData;
    }
  }, {
    key: '_update',
    value: function _update() {
      get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_update', this).call(this);

      if (!this.hasRendered) {
        this._updateBackgroundArc();
      }
      this._updateLabels();
      this._updateNeedle();
    }
  }, {
    key: '_updateBackgroundArc',
    value: function _updateBackgroundArc() {
      var _this3 = this;

      this.bg.append('path').attr('fill', this.opts.arcBgFillScale).attr('class', function (d, i) {
        return ['monte-gauge-bg', _this3.opts.arcBgCssScale(d, i)].join(' ');
      }).attr('d', this.bgArc());

      this.__notify('updateBackgroundArc');
    }
  }, {
    key: '_updateLabels',
    value: function _updateLabels() {
      var _this4 = this;

      var labels = this.support.selectAll('.monte-gauge-label').data(this.pieDisplayData);
      var labelRadius = this.tryInvoke(this.opts.labelRadius, this.width, this.height);

      labels.enter().append('text').attr('class', 'monte-gauge-label').attr('text-anchor', 'middle').attr('dy', '0.35em').merge(labels).attr('transform', function (d) {
        return 'translate(' + GaugeChart.getCoord(labelRadius, d.endAngle) + ')';
      }).text(function (d) {
        return d.data[_this4.opts.segmentLabelProp];
      });

      this.__notify('updateLabels');
    }
  }, {
    key: '_updateNeedle',
    value: function _updateNeedle() {
      var _this5 = this;

      var baseWidth = this.tryInvoke(this.opts.needleBase);
      var or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
      var ir = this.tryInvoke(this.opts.innerRadius, this.width, this.height);
      var height = this.tryInvoke(this.opts.needleHeight, or, ir);
      var path = this.tryInvoke(this.opts.needlePath, height, baseWidth);

      var needle = this.overlay.selectAll('.monte-gauge-needle').data([this.needleValueAngleData || 0]);

      needle.enter().append('path').attr('class', 'monte-gauge-needle').attr('d', path).style('transform', function (d) {
        return 'rotate(' + d + 'rad)';
      });

      needle.transition().duration(this.opts.transitionDuration).ease(this.opts.ease).styleTween('transform', function (d) {
        var a = _this5._prevNeedleAngleValueData;
        var b = d;

        return function (t) {
          var r = a * (1 - t) + b * t;
          return 'rotate(' + r + 'rad)';
        };
      });

      this.__notify('updateNeedle');
    }
  }]);
  return GaugeChart;
}(ArcChart);

// import { noop } from '../tools/noop';

var WEDGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-wedge-chart',
  piePadAngle: 0,

  // NOTE: Wedge's use startAngle for the preset angle positions. (ArcChart uses endAngle)
  arcWedgeEnter: function arcWedgeEnter(d) {
    return {
      startAngle: d.startAngle,
      endAngle: d.startAngle,
      value: d.value,
      padAngle: d.padAngle,
      index: d.index
    };
  }
};

var WedgeChart = function (_ArcChart) {
  inherits(WedgeChart, _ArcChart);

  function WedgeChart() {
    classCallCheck(this, WedgeChart);
    return possibleConstructorReturn(this, (WedgeChart.__proto__ || Object.getPrototypeOf(WedgeChart)).apply(this, arguments));
  }

  createClass(WedgeChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(WedgeChart.prototype.__proto__ || Object.getPrototypeOf(WedgeChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [WEDGE_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get(WedgeChart.prototype.__proto__ || Object.getPrototypeOf(WedgeChart.prototype), '_initCore', this).call(this);

      this.pie.sortValues(function (a, b) {
        return a.value - b.value;
      });
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _ref, _ref2, _babelHelpers$get2;

      this.wedgeValueData = data;
      var itemValueProp = this.tryInvoke(this.opts.itemValueProp);

      // Data is expected to be a single value between 0 & 100.
      var pieData = [(_ref = {}, defineProperty(_ref, itemValueProp, data), defineProperty(_ref, 'css', 'monte-wedge'), _ref), (_ref2 = {}, defineProperty(_ref2, itemValueProp, 100 - data), defineProperty(_ref2, 'css', 'monte-arc-placeholder'), _ref2)];

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      return (_babelHelpers$get2 = get(WedgeChart.prototype.__proto__ || Object.getPrototypeOf(WedgeChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, pieData].concat(tail));
    }
  }, {
    key: 'wedgeValue',
    value: function wedgeValue(value) {
      if (value === undefined) {
        return this.wedgeValueData;
      }

      this.data(value);
      return this;
    }
  }]);
  return WedgeChart;
}(ArcChart);

var HORIZONTAL = 'horizontal';
var VERTICAL = 'vertical';

var direction = Object.freeze({
	HORIZONTAL: HORIZONTAL,
	VERTICAL: VERTICAL
});



var index = Object.freeze({
	D3: d3$1,
	DIRECTION: direction,
	MATH: math,
	CLICK: CLICK,
	TOUCHSTART: TOUCHSTART,
	TOUCHEND: TOUCHEND,
	MOUSEOVER: MOUSEOVER,
	MOUSEOUT: MOUSEOUT,
	SUPPRESSED_ERROR: SUPPRESSED_ERROR,
	EXTENSION: EXTENSION,
	RENDERING: RENDERING,
	RENDERED: RENDERED,
	UPDATING: UPDATING,
	UPDATED: UPDATED,
	UPDATING_BOUNDS: UPDATING_BOUNDS,
	UPDATED_BOUNDS: UPDATED_BOUNDS,
	CLEARING: CLEARING,
	CLEARED: CLEARED,
	CSS_DOMAINS_RESETING: CSS_DOMAINS_RESETING,
	CSS_DOMAINS_RESET: CSS_DOMAINS_RESET,
	DESTROYING: DESTROYING,
	DESTROYED: DESTROYED,
	INTERACTION_EVENTS: INTERACTION_EVENTS,
	CHART_SUPPORT_EVENTS: CHART_SUPPORT_EVENTS,
	CHART_LIFECYCLE_EVENTS: CHART_LIFECYCLE_EVENTS,
	ACTION_ADD: ACTION_ADD,
	ACTION_REMOVE: ACTION_REMOVE,
	ACTION_CSS_OVER: ACTION_CSS_OVER,
	ACTION_CSS_TOUCH: ACTION_CSS_TOUCH,
	INTERACTION_EVENT_CSS_MAP: INTERACTION_EVENT_CSS_MAP,
	UNDEF: UNDEF
});

var DEFAULTS$2 = {
  // The layer for drawing operations
  layer: 'bg',

  // The chart events to listen for.
  binding: ['rendered', 'updatedBounds'],

  // Flag for global updates for any option change.
  // Subclasses can override `_shouldOptionUpdate` for nuanced behavior.
  optionsTriggerUpdate: false,

  eventPrefix: null
};

var Extension = function () {
  function Extension(options) {
    classCallCheck(this, Extension);

    // Configure the data options.
    this._initOptions(options);
  }

  createClass(Extension, [{
    key: '_initOptions',
    value: function _initOptions() {
      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      this.opts = mergeOptions.apply(undefined, options.concat([DEFAULTS$2]));

      if (!this.opts.eventPrefix) {
        throw MonteOptionError.RequiredOption('eventPrefix');
      }
    }
  }, {
    key: 'setChart',
    value: function setChart(chart) {
      this.chart = chart;
      this.layer = chart[this.opts.layer];
    }
  }, {
    key: 'option',
    value: function option(prop, value) {
      if (value === undefined) {
        return this.opts[prop];
      }

      this.opts[prop] = value;
      if (this._shouldOptionUpdate(prop) && this.cachedChart) {
        this.update('optionChanged', this.cachedChart);
      }

      return this;
    }

    // Indicates whether an option change should cause an update to occur.

  }, {
    key: '_shouldOptionUpdate',
    value: function _shouldOptionUpdate() {
      return this.opts.optionsTriggerUpdate;
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      var _chart;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_chart = this.chart).emit.apply(_chart, ['extension', this.opts.eventPrefix + ':' + eventName, this].concat(args));
    }
  }, {
    key: 'update',
    value: function update() {
      // Cache chart for use on option update.
      var event = arguments.length <= 0 ? undefined : arguments[0];

      if (!this.layer) {
        this.layer = this.chart[this.opts.layer];
      }

      try {
        if (event === 'destroy') {
          this._destroy();
        } else {
          this._update.apply(this, arguments);
          this.emit('updated');
        }
      } catch (e) {
        if (console && console.log) {
          console.log(e);
        } // eslint-disable-line no-console
        this.chart.emit('suppressedError', e, e.stack || 'No stack available.');
      }
    }
  }, {
    key: '_update',
    value: function _update(binding, chart) {
      // eslint-disable-line no-unused-vars
      throw MonteError.UnimplementedMethod('Update', '_update');
    }

    // Access an option that may need to be invoked as a function or that may be a literal value.

  }, {
    key: 'tryInvoke',
    value: function tryInvoke(value) {
      try {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return isFunc(value) ? value.call.apply(value, [this].concat(args)) : value;
      } catch (e) {
        return null;
      }
    }

    /**
     * Reads a property from a datum and returns the raw (unscaled) value.
     */

  }, {
    key: 'getProp',
    value: function getProp(propShortName, d) {
      var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var propFullName = propShortName + 'Prop';
      var dataPropName = this.opts[propFullName];

      if (dataPropName) {
        return d[dataPropName];
      }

      return defaultValue;
    }

    // Build a string of CSS classes that may include invokable options.

  }, {
    key: '_buildCss',
    value: function _buildCss(cssSources, d, i) {
      var _this = this;

      var cssClasses = [];
      var sources = Array.isArray(cssSources) ? cssSources : [cssSources];

      sources.forEach(function (source) {
        cssClasses.push(_this.tryInvoke(source, d.id || i));
      });

      return cssClasses.join(' ');
    }

    // Clean up if necessary.

  }, {
    key: '_destroy',
    value: function _destroy() {}
  }, {
    key: 'toString',
    value: function toString() {
      return this.constructor.name;
    }
  }]);
  return Extension;
}();

var ARC_DEFAULTS = {
  eventPrefix: 'arc',
  startAngle: 0,
  endAngle: TAU,
  arcCss: 'monte-ext-arc',
  innerRadius: 0,
  outerRadius: 100,
  cornerRadius: 0
};

var Arc = function (_Extension) {
  inherits(Arc, _Extension);

  function Arc() {
    classCallCheck(this, Arc);
    return possibleConstructorReturn(this, (Arc.__proto__ || Object.getPrototypeOf(Arc)).apply(this, arguments));
  }

  createClass(Arc, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(Arc.prototype.__proto__ || Object.getPrototypeOf(Arc.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [ARC_DEFAULTS]));

      this.arc = d3.arc().innerRadius(this.tryInvoke(this.opts.innerRadius)).outerRadius(this.tryInvoke(this.opts.outerRadius)).cornerRadius(this.tryInvoke(this.opts.cornerRadius));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var css = this.tryInvoke(this.opts.arcCss);
      var startAngle = this.tryInvoke(this.opts.startAngle);
      var endAngle = this.tryInvoke(this.opts.endAngle);
      var arcAngles = isDefined(startAngle) && isDefined(endAngle) ? {
        startAngle: startAngle,
        endAngle: endAngle
      } : {
        startAngle: isDefined(startAngle) ? startAngle : endAngle,
        endAngle: isDefined(startAngle) ? startAngle : endAngle
      };

      var segment = this.layer.selectAll('.' + css).data([arcAngles]);
      var duration = this.tryInvoke(this.chart.opts.transitionDuration);
      var ease = this.chart.opts.ease;
      segment.enter().append('path').attr('class', css).attr('d', function (d) {
        return _this2.arc(d);
      });

      segment.transition().duration(duration).ease(ease).attrTween('d', function (d) {
        return arcSimpleTween(_this2.arc, _this2.prev, d);
      }).on('end', function (d) {
        return _this2.prev = d;
      });

      segment.exit().transition().duration(duration).ease(ease).style('opacity', 0.01).remove();
    }
  }]);
  return Arc;
}(Extension);

var FRAME_DEFAULTS = {
  eventPrefix: 'frame',
  frameLineCss: 'monte-ext-frame-line',
  edges: ['top', 'right', 'bottom', 'left'],
  alignmentShift: AXIS_SHIFT };

// BG Frame (drawn by edges) and observes the "Margin Convention".
var Frame = function (_Extension) {
  inherits(Frame, _Extension);

  function Frame() {
    classCallCheck(this, Frame);
    return possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).apply(this, arguments));
  }

  createClass(Frame, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(Frame.prototype.__proto__ || Object.getPrototypeOf(Frame.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [FRAME_DEFAULTS]));
    }
  }, {
    key: '_shouldOptionUpdate',
    value: function _shouldOptionUpdate(prop) {
      return prop === 'edges' || prop === 'alignmentShift';
    }
  }, {
    key: 'clear',
    value: function clear() {
      // Remove all elements
      var css = this.opts.frameLineCss;
      var edges = this.layer.selectAll('.' + css);
      edges.remove();
    }
  }, {
    key: '_update',
    value: function _update() {
      var chart = this.chart;
      var css = this.opts.frameLineCss;
      var edges = this.layer.selectAll('.' + css).data(this.opts.edges).order();
      var shift = this.opts.alignmentShift;
      var coords = {
        top: [[0 + shift, 0 + shift], [chart.width + shift, 0 + shift]],
        right: [[chart.width + shift, 0 + shift], [chart.width + shift, chart.height + shift]],
        bottom: [[0 + shift, chart.height + shift], [chart.width + shift, chart.height + shift]],
        left: [[0 + shift, 0 + shift], [0 + shift, chart.height + shift]]
      };

      edges.enter().append('line').attr('class', css).attr('x1', function (d) {
        return coords[d][0][0];
      }).attr('y1', function (d) {
        return coords[d][0][1];
      }).attr('x2', function (d) {
        return coords[d][1][0];
      }).attr('y2', function (d) {
        return coords[d][1][1];
      });

      edges.transition().duration(chart.option('transitionDuration')).attr('x1', function (d) {
        return coords[d][0][0];
      }).attr('y1', function (d) {
        return coords[d][0][1];
      }).attr('x2', function (d) {
        return coords[d][1][0];
      }).attr('y2', function (d) {
        return coords[d][1][1];
      });

      edges.exit().remove();
    }
  }]);
  return Frame;
}(Extension);

var GRID_DEFAULTS = {
  eventPrefix: 'grid',
  scalePrefixes: ['x', 'y'],
  prefixCssMap: {
    'x': 'v-line',
    'y': 'h-line'
  },
  lineCss: 'monte-ext-grid-line',
  binding: ['axisRendered'],
  x1Adjust: 0,
  x2Adjust: 0,
  y1Adjust: 0,
  y2Adjust: 0
};

// BG Grid
var Grid = function (_Extension) {
  inherits(Grid, _Extension);

  function Grid() {
    classCallCheck(this, Grid);
    return possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
  }

  createClass(Grid, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(Grid.prototype.__proto__ || Object.getPrototypeOf(Grid.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [GRID_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update(binding, axisTransition) {
      var _this2 = this;

      var axesChart = this.chart;

      // Draw all axis
      axesChart.forEachAxisScale(function (scaleName) {
        var css = _this2.getCss(scaleName);
        var scale = axesChart[scaleName];
        var axis = axesChart[scaleName + 'Axis'];
        // const axisGrp = axesChart.support.select(`.${scaleName}-axis`);
        var orient = scaleName[0] === 'x' ? VERTICAL : HORIZONTAL; // Draw vertical lines for X, and horziontal for Y

        if (css && scale && axis) {
          // Next three lines match internal workings of the D3 Axis object.
          var tickValues = axis.tickValues();
          var tickArguments = axis.tickArguments();
          var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues;

          var ticks = _this2.layer.selectAll('.' + css).data(values /* , scale */).order();

          _this2._updateTicks(ticks, axisTransition, {
            axesChart: axesChart, axis: axis, axisTransition: axisTransition, css: css, orient: orient, scale: scale, scaleName: scaleName,
            lineCss: _this2.option('lineCss')
          });
        }
      });
    }
  }, {
    key: '_updateTicks',
    value: function _updateTicks(ticks, axisTransition, cfg) {
      var fullCss = [cfg.lineCss, cfg.css].join(' ');
      var x1 = this.tryInvoke(this.opts.x1Adjust);
      var x2 = this.tryInvoke(this.opts.x2Adjust);
      var y1 = this.tryInvoke(this.opts.y1Adjust);
      var y2 = this.tryInvoke(this.opts.y2Adjust);
      var duration = this.tryInvoke(this.chart.opts.transitionDuration);
      var ease = this.chart.opts.ease;

      if (cfg.orient === HORIZONTAL) {
        ticks.enter().append('line').attr('class', fullCss).attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', 0).transition().duration(duration).ease(ease).attr('x1', 0 + x1).attr('y1', AXIS_SHIFT + y1).attr('x2', cfg.axesChart.width + x2).attr('y2', AXIS_SHIFT + y2).attr('transform', function (d) {
          return 'translate(0,' + cfg.scale(d) + ')';
        });

        ticks.transition(axisTransition).duration(duration).ease(ease).attr('x2', function () {
          return cfg.axesChart.width + x2;
        }).attr('transform', function (d) {
          return 'translate(0,' + cfg.scale(d) + ')';
        });
      } else if (cfg.orient === VERTICAL) {
        ticks.enter().append('line').attr('class', fullCss).attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', 0).transition().duration(duration).ease(ease).attr('x1', AXIS_SHIFT + x1).attr('y1', 0 + y1).attr('x2', AXIS_SHIFT + x2).attr('y2', cfg.axesChart.height + y2).attr('transform', function (d) {
          return 'translate(' + cfg.scale(d) + ', 0)';
        });

        ticks.transition(axisTransition).duration(duration).ease(ease).attr('y2', function () {
          return cfg.axesChart.height + y2;
        }).attr('transform', function (d) {
          return 'translate(' + cfg.scale(d) + ', 0)';
        });
      }

      ticks.exit().remove();
    }
  }, {
    key: 'getCss',
    value: function getCss(scaleName) {
      for (var prefix in this.opts.prefixCssMap) {
        if (this.opts.prefixCssMap.hasOwnProperty(prefix)) {
          var hasPrefix = scaleName.substr(0, prefix.length) === prefix;

          if (hasPrefix) {
            return this.opts.prefixCssMap[prefix];
          }
        }
      }

      return '';
    }
  }]);
  return Grid;
}(Extension);

var HorizontalLines = function (_Grid) {
  inherits(HorizontalLines, _Grid);

  function HorizontalLines() {
    classCallCheck(this, HorizontalLines);
    return possibleConstructorReturn(this, (HorizontalLines.__proto__ || Object.getPrototypeOf(HorizontalLines)).apply(this, arguments));
  }

  createClass(HorizontalLines, [{
    key: '_updateTicks',
    value: function _updateTicks(ticks, axisTransition, cfg) {
      if (cfg.orient === HORIZONTAL) {
        get(HorizontalLines.prototype.__proto__ || Object.getPrototypeOf(HorizontalLines.prototype), '_updateTicks', this).call(this, ticks, axisTransition, cfg);
      }
    }
  }]);
  return HorizontalLines;
}(Grid);

var VerticalLines = function (_Grid2) {
  inherits(VerticalLines, _Grid2);

  function VerticalLines() {
    classCallCheck(this, VerticalLines);
    return possibleConstructorReturn(this, (VerticalLines.__proto__ || Object.getPrototypeOf(VerticalLines)).apply(this, arguments));
  }

  createClass(VerticalLines, [{
    key: '_updateTicks',
    value: function _updateTicks(ticks, axisTransition, cfg) {
      if (cfg.orient === VERTICAL) {
        get(VerticalLines.prototype.__proto__ || Object.getPrototypeOf(VerticalLines.prototype), '_updateTicks', this).call(this, ticks, axisTransition, cfg);
      }
    }
  }]);
  return VerticalLines;
}(Grid);

var LABEL_DEFAULTS = {
  eventPrefix: 'label',
  labelCss: 'monte-ext-label-id',
  commonCss: 'monte-ext-label',
  text: '',
  x: 0,
  y: 0,
  dy: '0.35em',
  dx: 0,
  anchor: 'start',
  labelCustomize: noop
};

var Label = function (_Extension) {
  inherits(Label, _Extension);

  function Label() {
    classCallCheck(this, Label);
    return possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));
  }

  createClass(Label, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(Label.prototype.__proto__ || Object.getPrototypeOf(Label.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [LABEL_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var selectorCss = this.tryInvoke(this.opts.labelCss);
      var commonCss = this.tryInvoke(this.opts.commonCss);
      var text = this.tryInvoke(this.opts.text);

      var lbl = this.layer.selectAll('.' + selectorCss).data([text]);

      lbl.enter().append('text').attr('class', selectorCss + ' ' + commonCss).merge(lbl).attr('x', this.tryInvoke(this.opts.x)).attr('y', this.tryInvoke(this.opts.y)).attr('dx', this.tryInvoke(this.opts.dx)).attr('dy', this.tryInvoke(this.opts.dy)).attr('text-anchor', this.tryInvoke(this.opts.anchor)).text(function (d) {
        return d;
      }).call(function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this2.tryInvoke.apply(_this2, [_this2.opts.labelCustomize].concat(args));
      });

      lbl.exit().remove();
    }
  }]);
  return Label;
}(Extension);

var POLAR_GRID_DEFAULTS = {
  eventPrefix: 'polargrid',
  startAngle: 0,
  endAngle: TAU,
  ringRadii: [100],
  ringCss: 'monte-ext-polar-ring',
  ringSpecificCss: null,
  ringSort: function ringSort(a, b) {
    return b - a;
  }
};

var PolarGrid = function (_Extension) {
  inherits(PolarGrid, _Extension);

  function PolarGrid() {
    classCallCheck(this, PolarGrid);
    return possibleConstructorReturn(this, (PolarGrid.__proto__ || Object.getPrototypeOf(PolarGrid)).apply(this, arguments));
  }

  createClass(PolarGrid, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(PolarGrid.prototype.__proto__ || Object.getPrototypeOf(PolarGrid.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_GRID_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var data = this.opts.ringRadii.sort(this.opts.ringSort);
      var rings = this.layer.selectAll('.' + this.opts.ringCss).data(data);

      // TODO: Change from using SVG circles to using arcs.
      rings.enter().append('circle').merge(rings).attr('class', this.opts.ringCss).attr('r', function (d) {
        return d;
      });
    }
  }]);
  return PolarGrid;
}(Extension);

var POLAR_LINE_DEFAULTS = {
  eventPrefix: 'polarline',
  layer: 'overlay',
  angle: 0, // Straight up
  lineCss: 'monte-ext-polar-line',
  innerRadius: 0,
  outerRadius: 100
};

var PolarLine = function (_Extension) {
  inherits(PolarLine, _Extension);

  function PolarLine() {
    classCallCheck(this, PolarLine);
    return possibleConstructorReturn(this, (PolarLine.__proto__ || Object.getPrototypeOf(PolarLine)).apply(this, arguments));
  }

  createClass(PolarLine, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(PolarLine.prototype.__proto__ || Object.getPrototypeOf(PolarLine.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_LINE_DEFAULTS]));

      this.innerArc = d3.arc().innerRadius(this.opts.innerRadius).outerRadius(this.opts.innerRadius);
      this.outerArc = d3.arc().innerRadius(this.opts.outerRadius).outerRadius(this.opts.outerRadius);
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var css = this.tryInvoke(this.opts.lineCss);
      var angle = this.tryInvoke(this.opts.angle);
      var line = this.layer.selectAll('.' + css).data([{ startAngle: angle, endAngle: angle }]);
      var newLine = line.enter().append('line').attr('class', css);
      var duration = this.tryInvoke(this.chart.opts.transitionDuration);

      if (isDefined(angle)) {
        newLine.merge(line).transition().duration(duration).attr('x1', function (d) {
          return _this2.innerArc.centroid(d)[0];
        }).attr('y1', function (d) {
          return _this2.innerArc.centroid(d)[1];
        }).attr('x2', function (d) {
          return _this2.outerArc.centroid(d)[0];
        }).attr('y2', function (d) {
          return _this2.outerArc.centroid(d)[1];
        });
      } else {
        newLine.merge(line).attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 0);
      }

      line.exit().remove();
    }
  }]);
  return PolarLine;
}(Extension);

var POLAR_TICKS_DEFAULTS$1 = {
  startAngle: 0,
  endAngle: TAU,
  tickInterval: 1 / 4 * TAU, // Every 90deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-polar-tick',
  includeEnd: true
};

// https://sites.google.com/site/mymathclassroom/testing-if-two-angles-are-coterminal
function areCoterminalAngles(a1, a2) {
  var n = (a1 - a2) / TAU;

  // Angles are coterminal if n is an integer; otherwise not.
  return Number.isInteger(n);
}

var PolarTicks$1 = function () {
  function PolarTicks() {
    classCallCheck(this, PolarTicks);

    for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
      options[_key] = arguments[_key];
    }

    this.opts = mergeOptions.apply(undefined, options.concat([POLAR_TICKS_DEFAULTS$1]));

    this.innerArc = d3.arc().innerRadius(this.opts.innerRadius).outerRadius(this.opts.innerRadius);
    this.outerArc = d3.arc().innerRadius(this.opts.outerRadius).outerRadius(this.opts.outerRadius);
  }

  createClass(PolarTicks, [{
    key: 'update',
    value: function update(sel) {
      var _this = this;

      var data = [];
      var tickCount = Math.abs(this.opts.endAngle - this.opts.startAngle) / this.opts.tickInterval;

      // Include every tick, within the arc unless they would overlap at the start and end (such as
      // start (0) and end of a circle (2Pi)).
      if (this.opts.includeEnd && !areCoterminalAngles(this.opts.startAngle, this.opts.endAngle)) {
        tickCount++;
      }

      for (var i = 0; i < tickCount; i++) {
        var angle = this.opts.startAngle + i * this.opts.tickInterval;

        // Create data structure that `arc` handles.
        data.push({
          startAngle: angle,
          endAngle: angle,
          value: i
        });
      }

      var ticks = sel.selectAll('.' + this.opts.tickCss).data(data); // , (d, i) => d.startAngle);

      ticks.enter().append('line').merge(ticks).attr('class', this.opts.tickCss).attr('x1', function (d) {
        return _this.innerArc.centroid(d)[0];
      }).attr('y1', function (d) {
        return _this.innerArc.centroid(d)[1];
      }).attr('x2', function (d) {
        return _this.outerArc.centroid(d)[0];
      }).attr('y2', function (d) {
        return _this.outerArc.centroid(d)[1];
      });

      ticks.exit().remove();
    }
  }]);
  return PolarTicks;
}();

var POLAR_TICKS_DEFAULTS = {
  eventPrefix: 'polarticks',
  startAngle: 0,
  endAngle: TAU,
  tickInterval: 1 / 8 * TAU, // 8 ticks, one every 45 deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-ext-polar-tick'
};

var PolarTicks$$1 = function (_Extension) {
  inherits(PolarTicks$$1, _Extension);

  function PolarTicks$$1() {
    classCallCheck(this, PolarTicks$$1);
    return possibleConstructorReturn(this, (PolarTicks$$1.__proto__ || Object.getPrototypeOf(PolarTicks$$1)).apply(this, arguments));
  }

  createClass(PolarTicks$$1, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(PolarTicks$$1.prototype.__proto__ || Object.getPrototypeOf(PolarTicks$$1.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_TICKS_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      if (!this.polarTicksDraw) {
        this.polarTicksDraw = new PolarTicks$1(this.opts);
      }

      this.polarTicksDraw.update(this.layer);
    }
  }]);
  return PolarTicks$$1;
}(Extension);

var BAR_BG_DEFAULTS = {
  eventPrefix: 'barbg',
  barBgCss: 'monte-ext-bar-bg',
  data: null,
  maxValue: null, // Maximum value
  maxValueProp: null, // Maximum value taken from chart data
  enlarge: 0.05,
  cornerRadius: 0
};

var BarBg = function (_Extension) {
  inherits(BarBg, _Extension);

  function BarBg() {
    classCallCheck(this, BarBg);
    return possibleConstructorReturn(this, (BarBg.__proto__ || Object.getPrototypeOf(BarBg)).apply(this, arguments));
  }

  createClass(BarBg, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(BarBg.prototype.__proto__ || Object.getPrototypeOf(BarBg.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [BAR_BG_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var barChart = this.chart;
      var chartData = barChart.data() || [];
      var data = void 0;

      if (this.opts.data) {
        data = this.opts.data;
      } else {
        data = this._buildData(barChart, chartData);
      }

      var bgs = this.layer.selectAll('.' + this.opts.barBgCss).data(data);
      var sizeAdjust = this._sizeAdjust(barChart);

      bgs.enter().append('rect').merge(bgs).attr('class', this.opts.barBgCss).attr('x', function () {
        return barChart._barX.bind(barChart).apply(undefined, arguments) + _this2._xShift(sizeAdjust);
      }).attr('y', function () {
        return barChart._barY.bind(barChart).apply(undefined, arguments) + _this2._yShift(sizeAdjust);
      }).attr('width', function (d) {
        var bw = barChart._barWidth(d);
        var wa = _this2._widthAdjust(sizeAdjust);
        var v = bw + wa;
        return v;
      }).attr('height', function () {
        return barChart._barHeight.bind(barChart).apply(undefined, arguments) + _this2._heightAdjust(sizeAdjust);
      }).attr('rx', function (d, i) {
        return _this2.tryInvoke(_this2.opts.cornerRadius, d, i);
      });
    }
  }, {
    key: '_buildData',
    value: function _buildData(barChart, chartData) {
      var data = new Array(chartData.length);
      var domain = barChart.y.domain();

      for (var i = 0; i < data.length; i++) {
        var _data$i;

        var maxVal = this.opts.maxValue ? chartData[i][this.opts.maxValue] : null;

        data[i] = (_data$i = {}, defineProperty(_data$i, barChart.option('xProp'), chartData[i][barChart.option('xProp')]), defineProperty(_data$i, barChart.option('yProp'), maxVal || this.opts.maxValue || domain[1]), _data$i);
      }

      return data;
    }
  }, {
    key: '_sizeAdjust',
    value: function _sizeAdjust(barChart) {
      return barChart.x.bandwidth() * this.opts.enlarge;
    }
  }, {
    key: '_xShift',
    value: function _xShift(sizeAdjust) {
      return -sizeAdjust;
    }
  }, {
    key: '_yShift',
    value: function _yShift(sizeAdjust) {
      // eslint-disable-line no-unused-vars
      return 0;
    }
  }, {
    key: '_widthAdjust',
    value: function _widthAdjust(sizeAdjust) {
      return 2 * sizeAdjust;
    }
  }, {
    key: '_heightAdjust',
    value: function _heightAdjust(sizeAdjust) {
      // eslint-disable-line no-unused-vars
      return 0;
    }
  }]);
  return BarBg;
}(Extension);

var HorizontalBarBg = function (_BarBg) {
  inherits(HorizontalBarBg, _BarBg);

  function HorizontalBarBg() {
    classCallCheck(this, HorizontalBarBg);
    return possibleConstructorReturn(this, (HorizontalBarBg.__proto__ || Object.getPrototypeOf(HorizontalBarBg)).apply(this, arguments));
  }

  createClass(HorizontalBarBg, [{
    key: '_buildData',
    value: function _buildData(hBarChart, chartData) {
      var data = new Array(chartData.length);
      var domain = hBarChart.x.domain();

      for (var i = 0; i < data.length; i++) {
        var _data$i2;

        var maxVal = this.opts.maxValueProp ? chartData[i][this.opts.maxValueProp] : null;

        data[i] = (_data$i2 = {}, defineProperty(_data$i2, hBarChart.option('xProp'), maxVal || this.opts.maxValue || domain[1]), defineProperty(_data$i2, hBarChart.option('yProp'), chartData[i][hBarChart.option('yProp')]), _data$i2);
      }

      return data;
    }
  }, {
    key: '_sizeAdjust',
    value: function _sizeAdjust(barChart) {
      return barChart.y.bandwidth() * this.opts.enlarge;
    }
  }, {
    key: '_xShift',
    value: function _xShift(sizeAdjust) {
      // eslint-disable-line no-unused-vars
      return 0;
    }
  }, {
    key: '_yShift',
    value: function _yShift(sizeAdjust) {
      return -sizeAdjust;
    }
  }, {
    key: '_widthAdjust',
    value: function _widthAdjust(sizeAdjust) {
      // eslint-disable-line no-unused-vars
      return 0;
    }
  }, {
    key: '_heightAdjust',
    value: function _heightAdjust(sizeAdjust) {
      return 2 * sizeAdjust;
    }
  }]);
  return HorizontalBarBg;
}(BarBg);

var REF_LINE_DEFAULTS = {
  eventPrefix: 'refline',
  css: 'monte-ext-ref-line-grp',
  data: noop,
  layer: 'overlay',
  labelPlacement: 'nw',
  textAnchor: 'start',
  textProp: 'text',
  x1Prop: 'x1',
  x2Prop: 'x2',
  y1Prop: 'y1',
  y2Prop: 'y2'
};

// Strategies for placing labels.
var LABEL_PLACEMENT = {
  'nw': function nw(text, c) {
    text.attr('dy', '-0.35em').attr('x', c.x1).attr('y', c.y1);
  },

  'n': function n(text, c) {
    text.attr('dy', '-0.35em').attr('x', (c.x2 - c.x1) / 2 + c.x1).attr('y', c.y2);
  },

  'ne': function ne(text, c) {
    text.attr('dy', '-0.35em').attr('x', c.x2).attr('y', c.y2);
  },

  'w': function w(text, c) {
    text.attr('dy', '0.35em').attr('x', c.x1).attr('y', c.y1);
  },

  'e': function e(text, c) {
    text.attr('dy', '0.35em').attr('x', c.x2).attr('y', c.y2);
  },

  'sw': function sw(text, c) {
    text.attr('dy', '1em').attr('x', c.x1).attr('y', c.y1);
  },

  's': function s(text, c) {
    text.attr('dy', '1em').attr('x', (c.x2 - c.x1) / 2 + c.x1).attr('y', c.y2);
  },

  'se': function se(text, c) {
    text.attr('dy', '1em').attr('x', c.x2).attr('y', c.y2);
  }
};

// A static line with an optional label.
var ReferenceLine = function (_Extension) {
  inherits(ReferenceLine, _Extension);

  function ReferenceLine(options) {
    classCallCheck(this, ReferenceLine);

    var _this = possibleConstructorReturn(this, (ReferenceLine.__proto__ || Object.getPrototypeOf(ReferenceLine)).call(this, options));

    _this.lineData = [];
    return _this;
  }

  createClass(ReferenceLine, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(ReferenceLine.prototype.__proto__ || Object.getPrototypeOf(ReferenceLine.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [REF_LINE_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      this.lineData = this.tryInvoke(this.opts.data, this.chart.data());

      if (!isArray$2(this.lineData) && isDefined(this.lineData)) {
        this.lineData = [this.lineData];
      } else if (isDefined(this.lineData)) {
        this.lineData = [];
      }

      var lines = this.layer.selectAll('.' + this.opts.css).data(this.lineData);

      // Enter
      var enter = lines.enter().append('g').attr('class', this.opts.css);
      enter.append('text');
      enter.append('line');

      // Update + Enter
      var update = enter.merge(lines);
      update.select('line').attr('x1', function (d) {
        return _this2.getProp('x1', d);
      }).attr('x2', function (d) {
        return _this2.getProp('x2', d);
      }).attr('y1', function (d) {
        return _this2.getProp('y1', d);
      }).attr('y2', function (d) {
        return _this2.getProp('y2', d);
      });

      update.select('text').attr('text-anchor', this.opts.textAnchor).text(function (d) {
        return _this2.getProp('text', d);
      }).each(this._placeLabel.bind(this));

      // Exit
      lines.exit().remove();
    }
  }, {
    key: '_placeLabel',
    value: function _placeLabel(d, i, nodes) {
      var text = d3.select(nodes[i]);
      var labelPlacement = this.tryInvoke(this.opts.labelPlacement, d, i, nodes);
      var placement = LABEL_PLACEMENT[labelPlacement];
      var coords = {
        x1: this.getProp('x1', d),
        x2: this.getProp('x2', d),
        y1: this.getProp('y1', d),
        y2: this.getProp('y2', d)
      };

      placement.call(this, text, coords);
    }
  }]);
  return ReferenceLine;
}(Extension);

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    funcs.forEach(function (f) {
      return f.apply(undefined, args);
    });
  };
}

function readTransforms(t) {
  var transformPattern = /(.*?)\((.*?)\)\s*/g;
  var matches = transformPattern.exec(t);
  var transforms = {};

  if (matches) {
    for (var i = 1; i < matches.length; i += 2) {
      var k = matches[i];
      var v = matches[i + 1].trim();

      if (v.indexOf(' ') > -1 || v.indexOf(',') > -1) {
        v = v.split(/,\s*|\s+/);
      }

      transforms[k] = v;
    }
  }

  return transforms;
}



var index$1 = Object.freeze({
	isArray: isArray$2,
	isDefined: isDefined,
	isFunc: isFunc,
	isNumeric: isNumeric,
	isObject: isObject$2,
	compose: compose,
	mergeOptions: mergeOptions,
	noop: noop,
	readTransforms: readTransforms,
	resetScaleDomain: resetScaleDomain
});

// import isFunc from '../tools/is';

function axisNoTicks(axis) {
  axis.tickSize(0);
  return axis;
}

function axisWholeNumberFormat(axis) {
  axis.tickFormat(d3.format(',.0f'));
  return axis;
}

function readStyleProp(style, prop) {
  var val = parseFloat(style.getPropertyValue(prop), 10);
  return isNaN(val) ? 0 : val;
}

function getStyle(el) {
  var s = window.getComputedStyle(el, null);

  return {
    rect: el.getBoundingClientRect(),
    style: s,
    pl: readStyleProp(s, 'padding-left'),
    pr: readStyleProp(s, 'padding-right'),
    pt: readStyleProp(s, 'padding-top'),
    pb: readStyleProp(s, 'padding-bottom')
  };
}

var Resizer = function () {
  function Resizer(options) {
    classCallCheck(this, Resizer);

    this.opts = options || {};
  }

  createClass(Resizer, [{
    key: 'option',
    value: function option(prop, value) {
      this.opts[prop] = value;
    }
  }, {
    key: 'resize',
    value: function resize() {
      throw MonteError.UnimplementedMethod('Resize', 'resize');
    }
  }]);
  return Resizer;
}();

var HorizontalResizer = function (_Resizer) {
  inherits(HorizontalResizer, _Resizer);

  function HorizontalResizer() {
    classCallCheck(this, HorizontalResizer);
    return possibleConstructorReturn(this, (HorizontalResizer.__proto__ || Object.getPrototypeOf(HorizontalResizer)).apply(this, arguments));
  }

  createClass(HorizontalResizer, [{
    key: 'resize',
    value: function resize(chart) {
      var el = chart.bound.node().parentElement;
      var s = getStyle(el);

      chart.boundingRect(s.rect.width - s.pl - s.pr, chart.opts.boundingHeight);
    }
  }]);
  return HorizontalResizer;
}(Resizer);

var HorizontalRatioResizer = function (_Resizer2) {
  inherits(HorizontalRatioResizer, _Resizer2);

  function HorizontalRatioResizer() {
    classCallCheck(this, HorizontalRatioResizer);
    return possibleConstructorReturn(this, (HorizontalRatioResizer.__proto__ || Object.getPrototypeOf(HorizontalRatioResizer)).apply(this, arguments));
  }

  createClass(HorizontalRatioResizer, [{
    key: 'resize',
    value: function resize(chart) {
      var el = chart.bound.node().parentElement;
      var s = getStyle(el);
      var width = s.rect.width - s.pl - s.pr;
      var ratio = this.opts.ratio || 1;

      chart.boundingRect(width, width / ratio);
    }
  }]);
  return HorizontalRatioResizer;
}(Resizer);

var AutoResizer = function (_Resizer3) {
  inherits(AutoResizer, _Resizer3);

  function AutoResizer() {
    classCallCheck(this, AutoResizer);
    return possibleConstructorReturn(this, (AutoResizer.__proto__ || Object.getPrototypeOf(AutoResizer)).apply(this, arguments));
  }

  createClass(AutoResizer, [{
    key: 'resize',
    value: function resize(chart) {
      var el = chart.bound.node().parentElement;
      var s = getStyle(el);

      chart.boundingRect(s.rect.width - s.pl - s.pr, s.rect.height - s.pt - s.pb);
    }
  }]);
  return AutoResizer;
}(Resizer);

var VerticalResizer = function (_Resizer4) {
  inherits(VerticalResizer, _Resizer4);

  function VerticalResizer() {
    classCallCheck(this, VerticalResizer);
    return possibleConstructorReturn(this, (VerticalResizer.__proto__ || Object.getPrototypeOf(VerticalResizer)).apply(this, arguments));
  }

  createClass(VerticalResizer, [{
    key: 'resize',
    value: function resize(chart) {
      var el = chart.bound.node().parentElement;
      var s = getStyle(el);

      chart.boundingRect(chart.opts.boundingHeight, s.rect.height - s.pt - s.pb);
    }
  }]);
  return VerticalResizer;
}(Resizer);

// Const
// Tools

exports.constants = index;
exports.tools = index$1;
exports.version = version;
exports.Chart = Chart;
exports.AxesChart = AxesChart;
exports.PolarChart = PolarChart;
exports.LineChart = LineChart;
exports.AreaChart = AreaChart;
exports.SparklineChart = SparklineChart;
exports.BarChart = BarChart;
exports.HorizontalBarChart = HorizontalBarChart;
exports.SimpleBarChart = SimpleBarChart;
exports.HorizontalSimpleBarChart = HorizontalSimpleBarChart;
exports.SegmentBarChart = SegmentBarChart;
exports.HorizontalSegmentBarChart = HorizontalSegmentBarChart;
exports.ScatterPlot = ScatterPlot;
exports.IconArray = IconArray;
exports.ArcChart = ArcChart;
exports.GaugeChart = GaugeChart;
exports.WedgeChart = WedgeChart;
exports.EventWatcher = EventWatcher;
exports.MonteError = MonteError;
exports.MonteOptionError = MonteOptionError;
exports.Extension = Extension;
exports.ExtArc = Arc;
exports.ExtFrame = Frame;
exports.ExtGrid = Grid;
exports.ExtHorizontalLines = HorizontalLines;
exports.ExtVerticalLines = VerticalLines;
exports.ExtLabel = Label;
exports.ExtPolarGrid = PolarGrid;
exports.ExtPolarLine = PolarLine;
exports.ExtPolarTicks = PolarTicks$$1;
exports.ExtBarBg = BarBg;
exports.ExtHorizontalBarBg = HorizontalBarBg;
exports.ExtReferenceLine = ReferenceLine;
exports.axisNoTicks = axisNoTicks;
exports.axisWholeNumberFormat = axisWholeNumberFormat;
exports.needleRoundedEnd = needleRoundedEnd;
exports.needleFlatEnd = needleFlatEnd;
exports.needleExtraPointer = needleExtraPointer;
exports.needleRect = needleRect;
exports.extentFromZero = extentFromZero;
exports.extentBalanced = extentBalanced;
exports.extentGeneratorPercentOffset = extentGeneratorPercentOffset;
exports.extentGeneratorValueOffset = extentGeneratorValueOffset;
exports.extentGeneratorZeroToMax = extentGeneratorZeroToMax;
exports.AutoResizer = AutoResizer;
exports.HorizontalResizer = HorizontalResizer;
exports.HorizontalRatioResizer = HorizontalRatioResizer;
exports.Resizer = Resizer;
exports.VerticalResizer = VerticalResizer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=monte.js.map
