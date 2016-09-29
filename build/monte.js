(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Monte = global.Monte || {})));
}(this, (function (exports) { 'use strict';

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

var get$2 = function get$2(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$2(parent, property, receiver);
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



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
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
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto$1.toString;

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
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

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
 * @param {Function} func The function to process.
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
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

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
  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

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
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$2.call(data, key);
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
      length = entries ? entries.length : 0;

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
      length = entries ? entries.length : 0;

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
      length = entries ? entries.length : 0;

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

/** Used as the `TypeError` message for "Functions" methods. */
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
 * method interface of `delete`, `get`, `has`, and `set`.
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
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
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

/** Built-in value references. */
var _Symbol = root.Symbol;

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

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$4.toString;

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
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString$1.call(value) == symbolTag;
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
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
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
function toString(value) {
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
  string = toString(string);

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
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/** Built-in value references. */
var defineProperty$1 = Object.defineProperty;

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
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

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
  if (!(hasOwnProperty$3.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
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

/* Built-in method references that are verified to be native. */
var nativeDefineProperty = getNative(Object, 'defineProperty');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !nativeDefineProperty ? identity : function (func, string) {
  return nativeDefineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 500;
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
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

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
  if (value !== undefined && !eq(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$7;

  return value === proto;
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
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

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
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

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

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$2 = objectProto$9.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$9.propertyIsEnumerable;

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
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty$6.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag$1);
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$8.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

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

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$10.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
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
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

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
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
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

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/** Used for built-in method references. */
var objectProto$12 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$4 = objectProto$12.toString;

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString$4.call(value);
}

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';
var objectTag$1 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$1 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$3 = objectProto$11.toString;

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set);
var weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1 || Map && getTag(new Map()) != mapTag$1 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$1 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
    getTag = function getTag(value) {
        var result = objectToString$3.call(value),
            Ctor = result == objectTag$1 ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString:
                    return dataViewTag$1;
                case mapCtorString:
                    return mapTag$1;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag$1;
                case weakMapCtorString:
                    return weakMapTag$1;
            }
        }
        return result;
    };
}

var getTag$1 = getTag;

/** Used for built-in method references. */
var objectProto$13 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$13.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$8.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
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
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor());
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor());
}

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
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

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var mapTag$2 = '[object Map]';
var numberTag$1 = '[object Number]';
var regexpTag$1 = '[object RegExp]';
var setTag$2 = '[object Set]';
var stringTag$1 = '[object String]';
var symbolTag$2 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$2 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return cloneDataView(object, isDeep);

    case float32Tag$1:case float64Tag$1:
    case int8Tag$1:case int16Tag$1:case int32Tag$1:
    case uint8Tag$1:case uint8ClampedTag$1:case uint16Tag$1:case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag$2:
      return cloneSymbol(object);
  }
}

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

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
var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

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
var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag$1 = '[object Symbol]';
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

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag$1] = cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag$1 || tag == genTag$1;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/** `Object#toString` result references. */
var objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;
var objectProto$14 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$14.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$5 = objectProto$14.toString;

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
  if (!isObjectLike(value) || objectToString$5.call(value) != objectTag$2) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$9.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$2 = '[object Function]';
var mapTag$3 = '[object Map]';
var numberTag$2 = '[object Number]';
var objectTag$3 = '[object Object]';
var regexpTag$2 = '[object RegExp]';
var setTag$3 = '[object Set]';
var stringTag$2 = '[object String]';
var weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$2] = typedArrayTags[mapTag$3] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$3] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;

/** Used for built-in method references. */
var objectProto$15 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$6 = objectProto$15.toString;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString$6.call(value)];
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
var freeExports$1 = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

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
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      } else {
        newValue = objValue;
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
  if (!(isArray(source) || isTypedArray(source))) {
    var props = baseKeysIn(source);
  }
  arrayEach(props || source, function (srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
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
  });
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
var set = set$2;
var get = get$1;

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
        var ready = function () {
          document.removeEventListener('DOMContentLoaded', ready);
          window.removeEventListener('load', ready);

          _this.documentReady = true;
          _this.runCallbacks();
        }.bind(_this); // Work around for proper binding.

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
  }]);
  return MonteOptionError;
}(MonteError);

var global$1 = window ? window.MonteGlobals = {} : {};

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

  extensions: [],

  transitionDuration: 250,

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

var EVENT_CSS_MAP = {
  'mouseover': { action: 'add', css: 'over' },
  'mouseout': { action: 'remove', css: 'over' },
  'touchstart': { action: 'add', css: 'touch' }
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

    this._constructed = false;
    this._optsSet = false;
    this.parentSelector = parentSelector;
    this.hasRendered = false;
    this.layers = [];
    this.extensions = [];

    // Configure the data options.
    this._initOptions(options);

    // Setup the Public events.
    this._initPublicEvents('rendered', 'updated', 'updateBounds', 'click', 'cssDomainsReset', 'suppressedError', 'destroy');

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
      for (var prop in opts) {
        if (opts.hasOwnProperty(prop)) {
          this.option(prop, opts[prop]);
        }
      }

      this._optsSet = true;
    }

    // Intialize the vis.

  }, {
    key: '_initCore',
    value: function _initCore() {
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
      this.clip = this.defs.append('clipPath').attr('id', 'drawClip');

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
      this.bound.on('click', function () {
        var svg = this;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        chart.__notify.apply(chart, ['click', svg].concat(args));
      });

      if (this.opts.resize) {
        if (!global$1.resizeWatch) {
          global$1.resizeWatch = new EventWatcher();
        }

        var resizer = this.opts.resize;
        // resizer.option('chart', this);
        this._resizeHandler = resizer.resize.bind(resizer, this);
        global$1.resizeWatch.add(this._resizeHandler);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _d;

      this.dispatch = (_d = d3).dispatch.apply(_d, arguments);
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
      var _this = this;

      var suppressNotify = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
      var suppressUpdate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      // Margin Convention and calculate drawing area size
      this.margin = this.opts.margin;
      this.width = this.opts.boundingWidth - this.margin.left - this.margin.right;
      this.height = this.opts.boundingHeight - this.margin.top - this.margin.bottom;

      // Apply margins to bg and draw area
      this.layers.forEach(function (l) {
        return l.attr('transform', _this._getLayerTranslate());
      });

      // Update sizing attributes
      if (this.bound) {
        this.bound.attr('width', this.opts.boundingWidthAttr || this.opts.boundingWidth).attr('height', this.opts.boundingHeightAttr || this.opts.boundingHeight);
      }

      // Update drawing clip // TODO: Apply translate?
      if (this.clipRect) {
        this.clipRect.attr('width', this.width).attr('height', this.height);
      }

      var notify = function notify() {
        if (_this._constructed) {
          _this.__notify('updateBounds');
        }
      };
      var update = function update() {
        if (_this.hasRendered) {
          _this.update();
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
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._resizeHandler) {
        global$1.resizeWatch.remove(this._resizeHandler);
      }

      this.__notify('destroy');

      // TODO: Handle case where parentSelector and bound are the same and only remove internal elements.
      this.bound.remove();
    }
  }, {
    key: '_destroy',
    value: function _destroy() {}
  }, {
    key: 'addLayer',
    value: function addLayer(layerName) {
      var layer = this.bound.append('g').attr('class', 'monte-' + layerName);

      this[layerName] = layer;
      this.layers.push(layer);
    }
  }, {
    key: '_getLayerTranslate',
    value: function _getLayerTranslate() {
      return 'translate(' + this.margin.left + ', ' + this.margin.top + ')';
    }
  }, {
    key: 'boundingRect',
    value: function boundingRect(width, height) {
      if (arguments.length === 0) {
        return [this.opts.boundingWidth, this.opts.boundingHeight];
      }

      this.opts.boundingWidth = width;
      if (arguments.length === 2) {
        this.opts.boundingHeight = height;
      }

      this._updateBounds();
      this.update();

      return this;
    }
  }, {
    key: 'on',
    value: function on(typenames, callback) {
      if (callback) {
        this.dispatch.on(typenames, callback);
        return this;
      }

      return this.dispatch.on(typenames);
    }
  }, {
    key: 'option',
    value: function option(prop, value) {
      if (value === undefined) {
        return get(this.opts, prop);
      }

      set(this.opts, prop, value);

      if (prop === 'margin') {
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
  }, {
    key: 'optInvoke',
    value: function optInvoke(value) {
      if (value == null) {
        throw new MonteOptionError('Option not initialized.');
      }

      try {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return isFunc(value) ? value.call.apply(value, [this].concat(args)) : value;
      } catch (e) {
        this.__notify('suppressedError', e);
        return null;
      }
    }
  }, {
    key: '_clearDataElements',
    value: function _clearDataElements() {}
  }, {
    key: 'clear',
    value: function clear() {
      this.displayData = null;
      this._clearDataElements();

      if (this.opts.autoResetCssDomains) {
        this.resetCssDomains();
      }
    }
  }, {
    key: 'resetCssDomains',
    value: function resetCssDomains() {
      this._resetCssDomains();

      this.__notify('cssDomainsReset');
      return this;
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {}
  }, {
    key: '_buildCss',
    value: function _buildCss(cssSources, d, i) {
      var _this2 = this;

      var cssClasses = [];
      var sources = Array.isArray(cssSources) ? cssSources : [cssSources];

      sources.forEach(function (source) {
        if (isDefined(source)) {
          cssClasses.push(_this2.optInvoke(source, d && d.id || i));
        }
      });

      return cssClasses.join(' ');
    }
  }, {
    key: 'classed',
    value: function classed() {
      var _bound;

      (_bound = this.bound).classed.apply(_bound, arguments);

      return this;
    }
  }, {
    key: 'call',
    value: function call() {
      var _bound2;

      (_bound2 = this.bound).call.apply(_bound2, arguments);

      return this;
    }
  }, {
    key: 'updateData',
    value: function updateData(data) {
      this.data(data, true);
    }
  }, {
    key: 'data',
    value: function data(_data) {
      var isUpdate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var suppressUpdate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (_data === undefined) {
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
  }, {
    key: 'addExt',
    value: function addExt() {
      for (var _len4 = arguments.length, exts = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        exts[_key4] = arguments[_key4];
      }

      this._bindExt(exts);
    }
  }, {
    key: '_bindExt',
    value: function _bindExt(exts) {
      var _this3 = this;

      // Bind extension to this chart instance.
      exts.forEach(function (ext) {
        if (ext.opts.binding) {
          ext.setChart(_this3);
          _this3.extensions.push(ext);
        } else {
          _this3.__notify('suppressedError', 'Extensions must have the `binding` option specified.');
        }
      });
    }
  }, {
    key: '__updateExt',
    value: function __updateExt(bindingName) {
      for (var _len5 = arguments.length, extArgs = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        extArgs[_key5 - 1] = arguments[_key5];
      }

      this.extensions.forEach(function (ext) {
        if (ext.opts.binding.indexOf(bindingName) > -1) {
          ext.update.apply(ext, [bindingName].concat(extArgs));
        }
      });
    }
  }, {
    key: 'replaceScale',
    value: function replaceScale(scaleName, newScaleConstructor) {
      var scale = newScaleConstructor();
      scale.range(this[scaleName].range()).domain(this[scaleName].domain());
      this[scaleName] = scale;
      this.update();
    }

    // Render the vis.

  }, {
    key: 'update',
    value: function update() {
      this._update();

      // Notify if first rendered
      if (!this.hasRendered) {
        this.hasRendered = true;
        this.__notify('rendered');
      }

      this.__notify('updated');
    }
  }, {
    key: '_update',
    value: function _update() {
      if (!this.opts.directUse) {
        // throw new MonteError('Update (`_update`) needs to be defined in order for the chart to be useful.');
        throw MonteError.UnimplementedMethod('Update', '_update');
      }
    }
  }, {
    key: '__bindCommonEvents',
    value: function __bindCommonEvents(lead) {
      var chart = this;

      return function (sel) {
        sel.on('mouseover', function (d, i, nodes) {
          return chart.__elemEvent('mouseover', lead + ':mouseover', d, i, nodes);
        }).on('mouseout', function (d, i, nodes) {
          return chart.__elemEvent('mouseout', lead + ':mouseout', d, i, nodes);
        }).on('click', function (d, i, nodes) {
          return chart.__elemEvent('click', lead + ':click', d, i, nodes);
        }).on('touchstart', function (d, i, nodes) {
          return chart.__elemEvent('touchstart', lead + ':touchstart', d, i, nodes);
        });
      };
    }

    // Using notify ensures that extensions are notified before outside listeners are.

  }, {
    key: '__notify',
    value: function __notify(eventName) {
      var _dispatch;

      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      this.__updateExt.apply(this, [eventName, this].concat(args));
      (_dispatch = this.dispatch).call.apply(_dispatch, [eventName, this].concat(args));
    }
  }, {
    key: '__elemEvent',
    value: function __elemEvent(eventType, eventNameFull, d, i, nodes) {
      var node = nodes[i];
      var cssAction = EVENT_CSS_MAP[eventType];

      if (cssAction) {
        if (cssAction.action === 'add') {
          node.classList.add(cssAction.css);
        } else if (cssAction.action === 'remove') {
          node.classList.remove(cssAction.css);
        }
      }

      this.__notify(eventNameFull, node, d, i, nodes);
    }
  }]);
  return Chart;
}();

var AXES_CHART_DEFAULTS = {
  // The axes X and Y are generally assumed. In some cases it may be desirable to add an additional
  // axis such as 'Y2'.
  axes: ['x', 'y'], // The scale names to create axes for.

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

  xLabel: '',

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

  yLabel: ''
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

      (_babelHelpers$get = get$2(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [AXES_CHART_DEFAULTS]));

      if (this.opts.axes === null) {
        this.opts.axes = [];
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get$2(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, ['axisRendered' // Axis events
      ]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get$2(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initCore', this).call(this);

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
        if (customize) {
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

      get$2(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initRender', this).call(this);
    }
  }, {
    key: '_updateBounds',
    value: function _updateBounds() {
      var actions = get$2(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_updateBounds', this).call(this, true, true);

      this.updateAxesRanges();
      this.updateAxesTransforms();
      this.renderAxes();

      actions.notify();
      actions.update();
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _this5 = this;

      this.forEachAxisScale(function (scaleName) {
        var cb = _this5.opts[scaleName + 'DomainCustomize'];
        var extent = data ? _this5._domainExtent(data, scaleName) : [];

        if (cb) {
          extent = cb(extent);
        }

        _this5[scaleName].domain(extent);
      });

      get$2(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_data', this).call(this, data);
      this.renderAxes();
    }
  }, {
    key: 'replaceScale',
    value: function replaceScale(scaleName, newScaleConstructor) {
      get$2(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), 'replaceScale', this).call(this, scaleName, newScaleConstructor);
      this[scaleName + 'Axis'].scale(this[scaleName]);
      this.renderAxes();
    }
  }, {
    key: 'updateAxesTransforms',
    value: function updateAxesTransforms() {
      var _this6 = this;

      this.forEachAxisScale(function (scaleName) {
        var axisGrp = _this6.support.select('.' + scaleName + '-axis');
        var trans = _this6.__axisOpt(scaleName, 'AxisTransform');

        if (trans) {
          axisGrp.attr('transform', trans(_this6.width, _this6.height));
        }
      });
    }
  }, {
    key: 'updateAxesRanges',
    value: function updateAxesRanges() {
      var _this7 = this;

      this.forEachAxisScale(function (scaleName) {
        var range = _this7.__axisOpt(scaleName, 'Range')(_this7.width, _this7.height);
        _this7[scaleName].range(range);
      });
    }
  }, {
    key: 'renderAxes',
    value: function renderAxes() {
      var _this8 = this;

      // Only suppress all if a literal boolean is given.
      if (this.opts.suppressAxes === true) {
        return;
      }

      var isSuppressArray = isArray$2(this.opts.suppressAxes);

      // (Re)render axes
      this.forEachAxisScale(function (scaleName) {
        if (isSuppressArray && _this8.opts.suppressAxes.indexOf(scaleName) > -1) {
          return;
        }

        _this8.support.select('.' + scaleName + '-axis').transition().duration(_this8.opts.transitionDuration).call(_this8[scaleName + 'Axis']).call(_this8._setLabel.bind(_this8, scaleName)).call(function (t) {
          return _this8.__notify('axisRendered', t);
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
      this.opts.axes.forEach(f);
    }
  }, {
    key: '_setLabel',
    value: function _setLabel(scaleName, transition) {
      // eslint-disable-line no-unused-vars
      var label = this.opts[scaleName + 'Label'];

      if (label) {
        this.support.select('.' + scaleName + '-axis').append('text').attr('class', 'axis-label').text(label);
      }
    }
  }]);
  return AxesChart;
}(Chart);

var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

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
        l = this.optInvoke(this.opts.origin.left, this);
        t = this.optInvoke(this.opts.origin.top, this);
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
      var a = angle - halfPi;
      return [Math.cos(a) * radius, Math.sin(a) * radius];
    }
  }, {
    key: 'degreesToRadians',
    value: function degreesToRadians(deg) {
      return deg * (pi / 180);
    } // radians = degrees * (pi/180)

  }, {
    key: 'radiansToDegrees',
    value: function radiansToDegrees(rad) {
      return rad * (180 / pi);
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
    names.push(lead + ":mouseover");
    names.push(lead + ":mouseout");
    names.push(lead + ":click");
    names.push(lead + ":touchstart");
  }

  return names;
}

function noop() {}

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

      (_babelHelpers$get = get$2(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [LINE_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get$2(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initCore', this).call(this);

      // Initialize the line generator
      this.line = d3.line().x(function (d) {
        return _this2.x(d[_this2.opts.xProp]);
      }).y(function (d) {
        return _this2.y(d[_this2.opts.yProp]);
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      get$2(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initCustomize', this).call(this);
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

      (_babelHelpers$get2 = get$2(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('line')), toConsumableArray(commonEventNames('point'))));
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
      get$2(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_resetCssDomains', this).call(this);

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
        return ['monte-line', _this4.opts.lineCss, _this4.opts.lineCssScale(d.id || i), d.css].join(' ');
      }).transition().duration(this.opts.transitionDuration).attr('d', function (d) {
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
        var symbase = d3.symbol().size(_this5.opts.pointSize);
        var symbol = _this5.opts.pointSymbol(symbase, d, i);
        return symbol(d, i);
      };

      // Create new points
      points.enter().append('path').attr('d', genSym).call(this.__bindCommonEvents('point')).merge(points) // Update existing points and set values on new points.
      .attr('transform', function (d) {
        return 'translate(' + _this5.x(d[_this5.opts.xProp]) + ', ' + _this5.y(d[_this5.opts.yProp]) + ')';
      }).attr('class', function (d) {
        return ['monte-point', lineDatum.css, _this5.opts.lineCssScale(lineDatum.id || lineIndex), _this5.opts.pointCss, _this5.opts.pointCssScale(lineDatum.id || lineIndex), d.css].join(' ');
      });

      points.transition().duration(this.opts.transitionDuration).attr('fill', this.opts.pointFillScale).attr('stroke', this.opts.pointStrokeScale).attr('transform', function (d) {
        return 'translate(' + _this5.x(d[_this5.opts.xProp]) + ', ' + _this5.y(d[_this5.opts.yProp]) + ')';
      }).attr('d', genSym);

      // Fade out removed points.
      points.exit().transition().duration(this.opts.transitionDuration).style('opacity', 0).remove();
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

      (_babelHelpers$get = get$2(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [AREA_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get$2(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initCore', this).call(this);

      // Initialize the line generator
      this.area = d3.area().x(function (d) {
        return _this2.x(d[_this2.opts.xProp]);
      }).y0(function () {
        return _this2.height;
      }).y1(function (d) {
        return _this2.y(d[_this2.opts.yProp]);
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      get$2(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initCustomize', this).call(this);
      if (this.opts.areaCustomize) {
        this.opts.areaCustomize(this.area);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get$2(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('area'))));
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get$2(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.areaCssScale);

      return this;
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var lineGrps = get$2(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_update', this).call(this);

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
        return ['monte-area', lineDatum.css, _this4.opts.lineCssScale(lineDatum.id || lineIndex), _this4.opts.areaCss, _this4.opts.areaCssScale(lineDatum.id || lineIndex), d.css].join(' ');
      });

      allAreas.transition().duration(this.opts.transitionDuration).attr('d', function (d) {
        return _this4.area(d[_this4.opts.valuesProp]);
      }).attr('fill', this.opts.areaFillScale);

      // Fade out removed points.
      area.exit().transition().duration(this.opts.transitionDuration).style('opacity', 0).remove();
    }
  }]);
  return AreaChart;
}(LineChart);

var BAR_CHART_DEFAULTS = {
  chartCss: 'monte-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 40
  },

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  barCssScale: noop,

  barFillScale: noop,

  // Static CSS class(es) to apply to every line.
  barCss: 'bar',

  xProp: 'id',
  yProp: 'value',

  xScale: function xScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced
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

      (_babelHelpers$get = get$2(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [BAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get$2(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('bar'))));
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var _this2 = this;

      var extent = null;

      if (scaleName === 'y') {
        extent = d3.extent(data, function (d) {
          return d[_this2.opts.yProp];
        }); // [0, d3.max(data, (d) => d[this.opts.yProp])];
      } else if (scaleName === 'x') {
        extent = data.map(function (d) {
          return d[_this2.opts.xProp];
        });
      }

      return extent;
    }
  }, {
    key: '_resetCssDomains',
    value: function _resetCssDomains() {
      get$2(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_resetCssDomains', this).call(this);

      resetScaleDomain(this.opts.barCssScale);

      return this;
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      this._updateBars();

      // TODO: Implement?
      // if (this.opts.includeLabels) {
      //   const vis = this;
      //
      //   barGrps.each((d, i, nodes) => vis._updateBarLabels(nodes[i], d, i));
      // }
    }
  }, {
    key: '_updateBars',
    value: function _updateBars() {
      var _this3 = this;

      // Data join for the lines
      var barGrps = this.draw.selectAll('.monte-bar-grp').data(this.displayData, function (d, i) {
        return d.id || i;
      });

      var barX = this._barX.bind(this);
      var barY = this._barY.bind(this);
      var barWidth = this._barWidth.bind(this);
      var barHeight = this._barHeight.bind(this);

      // Create new lines
      barGrps.enter().append('g').attr('class', 'monte-bar-grp').append('rect').attr('x', barX).attr('y', barY).attr('width', barWidth).attr('height', barHeight).call(this.__bindCommonEvents('bar')).merge(barGrps.select('rect')) // Update existing lines and set values on new lines.
      .attr('class', function (d, i) {
        return [_this3.opts.barCss, _this3.opts.barCssScale(d.id || i), d.css].join(' ');
      }).transition().duration(this.opts.transitionDuration).attr('fill', function (d, i) {
        return _this3.opts.barFillScale(d.id || i);
      });

      barGrps.select('rect').transition().duration(this.opts.transitionDuration).attr('x', barX).attr('y', barY).attr('width', barWidth).attr('height', barHeight);

      // Fade out removed lines.
      barGrps.exit().transition().duration(this.opts.transitionDuration).style('opacity', 0).remove();

      // Here the order is important. Merging the line groups when only an update occurs results in an
      // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
      return barGrps.merge(barGrps.enter().selectAll('.monte-bar-grp'));
    }
  }, {
    key: '_barX',
    value: function _barX(d) {
      return this.x(d[this.opts.xProp]);
    }
  }, {
    key: '_barWidth',
    value: function _barWidth() {
      return this.x.bandwidth();
    }
  }, {
    key: '_barY',
    value: function _barY(d) {
      return this.y(d[this.opts.yProp]);
    }
  }, {
    key: '_barHeight',
    value: function _barHeight(d) {
      return this.height - this.y(d[this.opts.yProp]);
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
  yDomainCustomize: null
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

      (_babelHelpers$get = get$2(HorizontalBarChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalBarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [HBAR_CHART_DEFAULTS]));
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
    } // this.x(d[this.opts.xProp]); }

  }, {
    key: '_barWidth',
    value: function _barWidth(d) {
      return this.x(d[this.opts.xProp]);
    }
  }, {
    key: '_barY',
    value: function _barY(d) {
      return this.y(d[this.opts.yProp]);
    }
  }, {
    key: '_barHeight',
    value: function _barHeight() {
      return this.y.bandwidth();
    }
  }]);
  return HorizontalBarChart;
}(BarChart);

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

      (_babelHelpers$get = get$2(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SCATTER_PLOT_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get$2(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_initCore', this).call(this);

      this.symbol = d3.symbol();
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get$2(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('point'))));
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
      get$2(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_resetCssDomains', this).call(this);

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
      }).transition().duration(this.opts.transitionDuration).call(this.opts.pointEnterStart).attr('transform', function (d) {
        return 'translate(' + _this2.x(d[_this2.opts.xProp]) + ', ' + _this2.y(d[_this2.opts.yProp]) + ')';
      }).call(this.opts.pointEnterEnd);

      // Fade out removed points.
      points.exit().transition().duration(this.opts.transitionDuration).call(this.opts.pointExitStart).style('opacity', 0).call(this.opts.pointExitEnd).remove();

      return points.merge(points.enter().selectAll('.point'));
    }
  }]);
  return ScatterPlot;
}(AxesChart);

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

      (_babelHelpers$get = get$2(SparklineChart.prototype.__proto__ || Object.getPrototypeOf(SparklineChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SPARKLINE_CHART_DEFAULTS]));
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      (_babelHelpers$get2 = get$2(SparklineChart.prototype.__proto__ || Object.getPrototypeOf(SparklineChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, [data]].concat(tail));
    }
  }]);
  return SparklineChart;
}(LineChart);

var ARC_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart',

  cornerRadius: 0,
  innerRadius: 0,
  outerRadius: function outerRadius(width, height) {
    var wr = width / 2;
    var hr = height / 2;
    return wr < hr ? wr : hr; // Constrain to smallest draw-area dimension
  },

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
  pieEndAngle: tau,
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

      (_babelHelpers$get = get$2(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [ARC_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get$2(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initCore', this).call(this);

      // Initialize the arc generator
      this.arc = d3.arc().innerRadius(this.opts.innerRadius).cornerRadius(this.opts.cornerRadius);

      this.pie = d3.pie().value(function (d) {
        return d[_this2.opts.itemValueProp];
      }).sortValues(null).startAngle(this.opts.pieStartAngle).endAngle(this.opts.pieEndAngle).padAngle(this.opts.piePadAngle);
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      get$2(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initCustomize', this).call(this);
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

      (_babelHelpers$get2 = get$2(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames('wedge'))));
    }
  }, {
    key: '_updateBounds',
    value: function _updateBounds() {
      get$2(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_updateBounds', this).call(this);

      this.arc.outerRadius(this.optInvoke(this.opts.outerRadius, this.width, this.height));
    }
  }, {
    key: '_data',
    value: function _data(data) {
      this.pieDisplayData = this.pie(data);
      get$2(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_data', this).call(this, data);
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
      }).call(this.__bindCommonEvents('wedge')).transition().delay(this.opts.transitionDuration).duration(this.opts.transitionDuration).attrTween('d', function (d) {
        var start = _this3.optInvoke(_this3.opts.arcWedgeEnter, d);
        return arcTween(arc, start, d);
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
        return ['monte-arc-wedge', _this3.opts.arcWedgeCss, _this3.opts.arcWedgeCssScale(d.id || i), d.data.css].join(' ');
      }).transition().delay(this.opts.transitionDuration).duration(this.opts.transitionDuration).attrTween('d', function (d) {
        return arcTween(arc, d.prev, d);
      }).attr('fill', function (d, i) {
        return _this3.opts.arcWedgeFillScale(d.id || i);
      });

      arcs.exit().transition().duration(this.opts.transitionDuration).style('opacity', 0.01).remove();
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
      // const or = this.optInvoke(this.opts.outerRadius, this.width, this.height);
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

function arcTween(arc, from, to) {
  var i = d3.interpolate(from, to);

  return function (t) {
    return arc(i(t));
  };
}

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
  pieStartAngle: pi * -0.55,
  pieEndAngle: pi * 0.55,

  // TODO: Add bg wedge css and fill scales.
  arcBgCssScale: noop,
  arcBgFillScale: noop,

  needleBase: 20,
  needleHeight: function needleHeight(outerRadius, innerRadius) {
    return (outerRadius - innerRadius) / 2 + innerRadius;
  },
  needlePath: needleRoundedEnd(),

  cornerRadius: 0,
  outerRadius: 180,
  innerRadius: 160,
  labelRadius: 140,

  segmentsProp: 'segments',
  itemValueProp: 'interval',
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

      (_babelHelpers$get = get$2(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [GAUGE_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get$2(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initCore', this).call(this);

      this.needleValueData = 0;
      this.needleValueAngleData = 0;

      this.bgArc = d3.arc().startAngle(this.opts.pieStartAngle).endAngle(this.opts.pieEndAngle).innerRadius(0).outerRadius(this.opts.outerRadius).cornerRadius(this.opts.cornerRadius);

      this.angleScale = d3.scaleLinear().range([this.opts.pieStartAngle, this.opts.pieEndAngle]);
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get$2(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, ['updateNeedle', 'updateBackgroundArc', 'updateLabels' // Gauge events
      ]));
    }
  }, {
    key: '_getLayerTranslate',
    value: function _getLayerTranslate() {
      var l = this.width / 2 + this.margin.left;
      var t = this.height - (this.height - this.opts.outerRadius) + this.margin.top;
      return 'translate(' + l + ', ' + t + ')';
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _this2 = this;

      this.needleValue(data[this.opts.itemValueProp]);
      get$2(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_data', this).call(this, data[this.opts.segmentsProp]);

      var intervalSum = this.displayData.reduce(function (acc, d) {
        return acc + d[_this2.opts.itemValueProp];
      }, 0);
      this.angleScale.domain([0, intervalSum]);
    }
  }, {
    key: 'needleValue',
    value: function needleValue(value) {
      if (value === undefined) {
        return this.needleValueData;
      }

      this.needleValueData = value;
      this.needleValueAngleData = this.angleScale(value);
      this.update();

      return this;
    }
  }, {
    key: '_update',
    value: function _update() {
      get$2(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_update', this).call(this);

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

      labels.enter().append('text').attr('class', 'monte-gauge-label').attr('text-anchor', 'middle').attr('dy', '0.35em').merge(labels).attr('transform', function (d) {
        return 'translate(' + GaugeChart.getCoord(_this4.opts.labelRadius, d.endAngle) + ')';
      }).text(function (d) {
        return d.data[_this4.opts.segmentLabelProp];
      });

      this.__notify('updateLabels');
    }
  }, {
    key: '_updateNeedle',
    value: function _updateNeedle() {
      var baseWidth = this.opts.needleBase;
      var height = this.optInvoke(this.opts.needleHeight, this.opts.outerRadius, this.opts.innerRadius);
      var path = this.optInvoke(this.opts.needlePath, height, baseWidth);

      var needle = this.overlay.selectAll('.monte-gauge-needle').data([this.needleValueAngleData || 0]);

      needle.enter().append('path').attr('class', 'monte-gauge-needle').attr('d', path).style('transform', function (d) {
        return 'rotate(' + d + 'rad)';
      });

      needle.transition().duration(this.opts.transitionDuration).style('transform', function (d) {
        return 'rotate(' + d + 'rad)';
      });

      this.__notify('updateNeedle');
    }
  }]);
  return GaugeChart;
}(ArcChart);

var SEGMENT_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-segment-chart',
  piePadAngle: 0,
  pieStartAngle: halfPi,
  pieEndAngle: -halfPi,

  // TODO: Add bg wedge css and fill scales.
  arcBgCssScale: noop,
  arcBgFillScale: noop
};

var SegmentChart = function (_ArcChart) {
  inherits(SegmentChart, _ArcChart);

  function SegmentChart() {
    classCallCheck(this, SegmentChart);
    return possibleConstructorReturn(this, (SegmentChart.__proto__ || Object.getPrototypeOf(SegmentChart)).apply(this, arguments));
  }

  createClass(SegmentChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get$2(SegmentChart.prototype.__proto__ || Object.getPrototypeOf(SegmentChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SEGMENT_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get$2(SegmentChart.prototype.__proto__ || Object.getPrototypeOf(SegmentChart.prototype), '_initCore', this).call(this);

      this.pie.sortValues(function (a, b) {
        return b.value - a.value;
      });
    }
  }, {
    key: '_updateBounds',
    value: function _updateBounds() {
      var _this2 = this;

      get$2(SegmentChart.prototype.__proto__ || Object.getPrototypeOf(SegmentChart.prototype), '_updateBounds', this).call(this);

      this.layers.forEach(function (l) {
        return l.attr('transform', 'translate(' + (_this2.width / 2 + _this2.margin.left) + ', ' + (_this2.height - (_this2.height - _this2.opts.outerRadius) + _this2.margin.top) + ')');
      });
    }
  }, {
    key: '_update',
    value: function _update() {
      get$2(SegmentChart.prototype.__proto__ || Object.getPrototypeOf(SegmentChart.prototype), '_update', this).call(this);

      this._updateBackgroundArc();
    }
  }, {
    key: '_updateBackgroundArc',
    value: function _updateBackgroundArc() {
      var _this3 = this;

      var bg = this.support.selectAll('.monte-segment-bg').data(this.pie([defineProperty({}, this.opts.value, 100)])); // 100 as in 100%

      bg.enter().append('path').merge(bg).attr('d', function (d) {
        return _this3.arc(d);
      }).attr('fill', function (d, i) {
        return _this3.opts.arcBgFillScale(d.id || i);
      }).attr('class', function (d, i) {
        return ['monte-segment-bg', _this3.opts.arcBgCssScale(d.id || i)].join(' ');
      });
    }
  }]);
  return SegmentChart;
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

      (_babelHelpers$get = get$2(WedgeChart.prototype.__proto__ || Object.getPrototypeOf(WedgeChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [WEDGE_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get$2(WedgeChart.prototype.__proto__ || Object.getPrototypeOf(WedgeChart.prototype), '_initCore', this).call(this);

      this.pie.sortValues(function (a, b) {
        return a.value - b.value;
      });
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _babelHelpers$get2;

      this.wedgeValueData = data;

      // Data is expected to be a single value between 0 & 100.
      var pieData = [
      // Wrapped value to
      { value: data, css: 'monte-wedge' },

      // The special case wedge to scale
      { value: 100 - data, css: 'monte-arc-placeholder' }];

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      return (_babelHelpers$get2 = get$2(WedgeChart.prototype.__proto__ || Object.getPrototypeOf(WedgeChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, pieData].concat(tail));
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

    // _update() {
    //   super._update();
    //
    //   this._updateBackgroundCircle();
    // }

    // _updateBackgroundCircle() {
    //   const or = this.optInvoke(this.opts.outerRadius, this.width, this.height);
    //   const wedge = this.bg.selectAll('.monte-wedge-bg').data([or]);
    //
    //   wedge.enter()
    //       .append('circle')
    //     .merge(wedge)
    //       .attr('r', (d) => d)
    //       .attr('fill', (d, i) => this.opts.arcBgWedgeFillScale(d.id || i))
    //       .attr('class', (d, i) =>
    //          ['monte-wedge-bg',
    //           this.opts.arcBgWedgeCssScale(d.id || i),
    //           ].join(' '));
    // }

  }]);
  return WedgeChart;
}(ArcChart);

var DEFAULTS$2 = {
  // The layer for drawing operations
  layer: 'bg',

  // The chart events to listen for.
  binding: ['rendered', 'updateBounds'],

  // Flag for global updates for any option change.
  // Subclasses can override `_shouldOptionUpdate` for nuanced behavior.
  optionsTriggerUpdate: false
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
    key: 'update',
    value: function update() {
      // Cache chart for use on option update.
      var event = arguments.length <= 0 ? undefined : arguments[0];

      if (!this.layer) {
        this.layer = this.chart[this.opts.layer];
      }

      if (event === 'destroy') {
        this._destroy();
      } else {
        this._update.apply(this, arguments);
      }
    }
  }, {
    key: '_update',
    value: function _update(binding, chart) {
      // eslint-disable-line no-unused-vars
      // throw new MonteError('Update (`_update`) needs to be defined in order for the extension to be useful.');
      throw MonteError.UnimplementedMethod('Update', '_update');
    }

    // Access an option that may need to be invoked as a function or that may be a literal value.

  }, {
    key: 'optInvoke',
    value: function optInvoke(value) {
      try {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return isFunc(value) ? value.call.apply(value, [this].concat(args)) : value;
      } catch (e) {
        return null;
      }
    }

    // Build a string of CSS classes that may include invokable options.

  }, {
    key: '_buildCss',
    value: function _buildCss(cssSources, d, i) {
      var _this = this;

      var cssClasses = [];
      var sources = Array.isArray(cssSources) ? cssSources : [cssSources];

      sources.forEach(function (source) {
        cssClasses.push(_this.optInvoke(source, d.id || i));
      });

      return cssClasses.join(' ');
    }

    // Clean up if necessary.

  }, {
    key: '_destroy',
    value: function _destroy() {}
  }]);
  return Extension;
}();

var HORIZONTAL = 'horizontal';
var VERTICAL = 'vertical';

// In d3-axis, there are hard coded shifts of 0.5. This shift is used for grid alignment and other
// axis alignments.
var AXIS_SHIFT = 0.5;

var GRID_DEFAULTS = {
  scalePrefixes: ['x', 'y'],
  prefixCssMap: {
    'x': 'v-line',
    'y': 'h-line'
  },
  lineCss: 'monte-grid-line',
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

      (_babelHelpers$get = get$2(Grid.prototype.__proto__ || Object.getPrototypeOf(Grid.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [GRID_DEFAULTS]));
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
      var x1 = this.optInvoke(this.opts.x1Adjust);
      var x2 = this.optInvoke(this.opts.x2Adjust);
      var y1 = this.optInvoke(this.opts.y1Adjust);
      var y2 = this.optInvoke(this.opts.y2Adjust);

      if (cfg.orient === HORIZONTAL) {
        ticks.enter().append('line').attr('class', fullCss).attr('x1', 0 + x1).attr('y1', AXIS_SHIFT + y1).attr('x2', cfg.axesChart.width + x2).attr('y2', AXIS_SHIFT + y2).attr('transform', function (d) {
          return 'translate(0,' + cfg.scale(d) + ')';
        });

        ticks.transition(axisTransition).attr('x2', function () {
          return cfg.axesChart.width + x2;
        }).attr('transform', function (d) {
          return 'translate(0,' + cfg.scale(d) + ')';
        });
      } else if (cfg.orient === VERTICAL) {
        ticks.enter().append('line').attr('class', fullCss).attr('x1', AXIS_SHIFT + x1).attr('y1', 0 + y1).attr('x2', AXIS_SHIFT + x2).attr('y2', cfg.axesChart.height + y2).attr('transform', function (d) {
          return 'translate(' + cfg.scale(d) + ', 0)';
        });

        ticks.transition(axisTransition).attr('y2', function () {
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
        get$2(HorizontalLines.prototype.__proto__ || Object.getPrototypeOf(HorizontalLines.prototype), '_updateTicks', this).call(this, ticks, axisTransition, cfg);
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
        get$2(VerticalLines.prototype.__proto__ || Object.getPrototypeOf(VerticalLines.prototype), '_updateTicks', this).call(this, ticks, axisTransition, cfg);
      }
    }
  }]);
  return VerticalLines;
}(Grid);

var POLAR_GRID_DEFAULTS = {
  startAngle: 0,
  endAngle: tau,
  ringRadii: [100],
  ringCss: 'monte-polar-ring',
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

      (_babelHelpers$get = get$2(PolarGrid.prototype.__proto__ || Object.getPrototypeOf(PolarGrid.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_GRID_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var data = this.opts.ringRadii.sort(this.opts.ringSort);
      var rings = this.layer.selectAll('.' + this.opts.ringCss).data(data);

      rings.enter().append('circle').merge(rings).attr('class', this.opts.ringCss).attr('r', function (d) {
        return d;
      });
    }
  }]);
  return PolarGrid;
}(Extension);

var POLAR_TICKS_DEFAULTS$1 = {
  startAngle: 0,
  endAngle: tau,
  tickInterval: 1 / 4 * tau, // Every 90deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-polar-tick',
  includeEnd: true
};

// https://sites.google.com/site/mymathclassroom/testing-if-two-angles-are-coterminal
function areCoterminalAngles(a1, a2) {
  var n = (a1 - a2) / tau;

  // Angles are coterminal if n is an integer; otherwise .
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
  startAngle: 0,
  endAngle: tau,
  tickInterval: 1 / 8 * tau, // 8 ticks, one every 45 deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-polar-tick'
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

      (_babelHelpers$get = get$2(PolarTicks$$1.prototype.__proto__ || Object.getPrototypeOf(PolarTicks$$1.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_TICKS_DEFAULTS]));
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

var FRAME_DEFAULTS = {
  frameLineCss: 'monte-frame-line',
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

      (_babelHelpers$get = get$2(Frame.prototype.__proto__ || Object.getPrototypeOf(Frame.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [FRAME_DEFAULTS]));
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

// import { tau } from '../const/math';

var BAR_BG_DEFAULTS = {
  barBgCss: 'monte-bar-bg',
  data: null,
  maxValue: null, // Maximum value
  maxValueProp: null, // Maximum value taken from chart data
  enlarge: 0.05
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

      (_babelHelpers$get = get$2(BarBg.prototype.__proto__ || Object.getPrototypeOf(BarBg.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [BAR_BG_DEFAULTS]));
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
  css: 'monte-ref-line-grp',
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
  'nw': function nw(text, d) {
    text.attr('dy', '-0.35em').attr('x', d.x1).attr('y', d.y1);
  },

  'n': function n(text, d) {
    text.attr('dy', '-0.35em').attr('x', (d.x2 - d.x1) / 2 + d.x1).attr('y', d.y2);
  },

  'ne': function ne(text, d) {
    text.attr('dy', '-0.35em').attr('x', d.x2).attr('y', d.y2);
  },

  'w': function w(text, d) {
    text.attr('dy', '0.35em').attr('x', d.x1).attr('y', d.y1);
  },

  'e': function e(text, d) {
    text.attr('dy', '0.35em').attr('x', d.x2).attr('y', d.y2);
  },

  'sw': function sw(text, d) {
    text.attr('dy', '1em').attr('x', d.x1).attr('y', d.y1);
  },

  's': function s(text, d) {
    text.attr('dy', '1em').attr('x', (d.x2 - d.x1) / 2 + d.x1).attr('y', d.y2);
  },

  'se': function se(text, d) {
    text.attr('dy', '1em').attr('x', d.x2).attr('y', d.y2);
  }
};

// A static line with an optional label.
var ReferenceLine = function (_Extension) {
  inherits(ReferenceLine, _Extension);

  function ReferenceLine() {
    classCallCheck(this, ReferenceLine);
    return possibleConstructorReturn(this, (ReferenceLine.__proto__ || Object.getPrototypeOf(ReferenceLine)).apply(this, arguments));
  }

  createClass(ReferenceLine, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get$2(ReferenceLine.prototype.__proto__ || Object.getPrototypeOf(ReferenceLine.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [REF_LINE_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var lineData = this.optInvoke(this.opts.data, this.chart.data());

      if (!isArray$2(lineData)) {
        lineData = [lineData];
      }

      var lines = this.layer.selectAll('.' + this.opts.css).data(lineData);

      // Enter
      var enter = lines.enter().append('g').attr('class', this.opts.css);
      enter.append('text');
      enter.append('line');

      // Update + Enter
      var update = enter.merge(lines);
      update.select('line').attr('x1', function (d) {
        return d[_this2.opts.x1Prop];
      }).attr('x2', function (d) {
        return d[_this2.opts.x2Prop];
      }).attr('y1', function (d) {
        return d[_this2.opts.y1Prop];
      }).attr('y2', function (d) {
        return d[_this2.opts.y2Prop];
      });

      update.select('text').attr('text-anchor', this.opts.textAnchor).text(function (d) {
        return d[_this2.opts.textProp];
      }).each(this._placeLabel.bind(this));

      // Exit
      lines.exit().remove();
    }
  }, {
    key: '_placeLabel',
    value: function _placeLabel(d, i, nodes) {
      var text = d3.select(nodes[i]);
      var placement = LABEL_PLACEMENT[this.opts.labelPlacement];
      placement(text, d);
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



var index = Object.freeze({
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

// Abstract charts
// Tools

exports.tools = index;
exports.Chart = Chart;
exports.AxesChart = AxesChart;
exports.PolarChart = PolarChart;
exports.LineChart = LineChart;
exports.AreaChart = AreaChart;
exports.BarChart = BarChart;
exports.HorizontalBarChart = HorizontalBarChart;
exports.ScatterPlot = ScatterPlot;
exports.SparklineChart = SparklineChart;
exports.ArcChart = ArcChart;
exports.GaugeChart = GaugeChart;
exports.SegmentChart = SegmentChart;
exports.WedgeChart = WedgeChart;
exports.EventWatcher = EventWatcher;
exports.MonteError = MonteError;
exports.MonteOptionError = MonteOptionError;
exports.Extension = Extension;
exports.ExtGrid = Grid;
exports.ExtHorizontalLines = HorizontalLines;
exports.ExtVerticalLines = VerticalLines;
exports.ExtPolarGrid = PolarGrid;
exports.ExtPolarTicks = PolarTicks$$1;
exports.ExtFrame = Frame;
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
