// https://github.com/YellowTugboat/monte#readme Version 0.0.0-alpha28 Copyright 2017 Yellow Tugboat
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.monte = global.monte || {})));
}(this, (function (exports) { 'use strict';

var version = "0.0.0-alpha28";

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

// Chart and Extension Lifecycle (extensions support a subset)
var BEFORE_RENDER = 'beforeRender';
var RENDERED = 'rendered';
var BEFORE_UPDATE = 'beforeUpdate';
var UPDATED = 'updated';
var BEFORE_BOUNDS_UPDATE = 'beforeBoundsUpdate';
var BOUNDS_UPDATED = 'boundsUpdated';
var BEFORE_CLEAR = 'beforeClear';
var CLEARED = 'cleared';
var BEFORE_DESTROY = 'beforeDestroy';
var DESTROYED = 'destroyed';

var BEFORE_OPTION_CHANGE = 'beforeOptionChange';
var OPTION_CHANGED = 'optionChanged';
var BEFORE_STYLE_DOMAINS_RESET = 'beforeStyleDomainsReset';
var STYLE_DOMAINS_RESET = 'styleDomainsReset';

var INTERACTION_EVENTS = [CLICK, TOUCHSTART, TOUCHEND, MOUSEOVER, MOUSEOUT];
var INTERACTION_SHOW_EVENTS = [TOUCHSTART, MOUSEOVER];
var INTERACTION_HIDE_EVENTS = [TOUCHEND, MOUSEOUT];

// Support events
var CHART_SUPPORT_EVENTS = [SUPPRESSED_ERROR, EXTENSION];

// Lifecycle event pairs
var CHART_LIFECYCLE_EVENTS = [BEFORE_RENDER, RENDERED, BEFORE_UPDATE, UPDATED, BEFORE_BOUNDS_UPDATE, BOUNDS_UPDATED, BEFORE_CLEAR, CLEARED, BEFORE_STYLE_DOMAINS_RESET, STYLE_DOMAINS_RESET, BEFORE_OPTION_CHANGE, OPTION_CHANGED, BEFORE_DESTROY, DESTROYED];

var EXTENSION_LIFECYCLE_EVENTS = [BEFORE_UPDATE, UPDATED, BEFORE_CLEAR, CLEARED, BEFORE_OPTION_CHANGE, OPTION_CHANGED, BEFORE_DESTROY, DESTROYED];

var ACTION_ADD = 'add';
var ACTION_REMOVE = 'remove';
var ACTION_CSS_OVER = 'over';
var ACTION_CSS_TOUCH = 'touch';

var INTERACTION_EVENT_CSS_MAP = (_INTERACTION_EVENT_CS = {}, defineProperty(_INTERACTION_EVENT_CS, MOUSEOVER, { action: ACTION_ADD, css: ACTION_CSS_OVER }), defineProperty(_INTERACTION_EVENT_CS, MOUSEOUT, { action: ACTION_REMOVE, css: ACTION_CSS_OVER }), defineProperty(_INTERACTION_EVENT_CS, TOUCHSTART, { action: ACTION_ADD, css: ACTION_CSS_TOUCH }), defineProperty(_INTERACTION_EVENT_CS, TOUCHEND, { action: ACTION_REMOVE, css: ACTION_CSS_TOUCH }), _INTERACTION_EVENT_CS);

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f';
var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange = '\\u20d0-\\u20ff';
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f';
var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']';
var rsCombo = '[' + rsComboRange$1 + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange$1 + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange$1 + ']?';
var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
    return string.match(reUnicode) || [];
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

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

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

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
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
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
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

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
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
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
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function (string) {
    string = toString(string);

    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;

    var chr = strSymbols ? strSymbols[0] : string.charAt(0);

    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst$1 = createCaseFirst('toUpperCase');

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
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C', '\xe7': 'c',
  '\xd0': 'D', '\xf0': 'd',
  '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N', '\xf1': 'n',
  '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  'Ā': 'A', 'Ă': 'A', 'Ą': 'A',
  'ā': 'a', 'ă': 'a', 'ą': 'a',
  'Ć': 'C', 'Ĉ': 'C', 'Ċ': 'C', 'Č': 'C',
  'ć': 'c', 'ĉ': 'c', 'ċ': 'c', 'č': 'c',
  'Ď': 'D', 'Đ': 'D', 'ď': 'd', 'đ': 'd',
  'Ē': 'E', 'Ĕ': 'E', 'Ė': 'E', 'Ę': 'E', 'Ě': 'E',
  'ē': 'e', 'ĕ': 'e', 'ė': 'e', 'ę': 'e', 'ě': 'e',
  'Ĝ': 'G', 'Ğ': 'G', 'Ġ': 'G', 'Ģ': 'G',
  'ĝ': 'g', 'ğ': 'g', 'ġ': 'g', 'ģ': 'g',
  'Ĥ': 'H', 'Ħ': 'H', 'ĥ': 'h', 'ħ': 'h',
  'Ĩ': 'I', 'Ī': 'I', 'Ĭ': 'I', 'Į': 'I', 'İ': 'I',
  'ĩ': 'i', 'ī': 'i', 'ĭ': 'i', 'į': 'i', 'ı': 'i',
  'Ĵ': 'J', 'ĵ': 'j',
  'Ķ': 'K', 'ķ': 'k', 'ĸ': 'k',
  'Ĺ': 'L', 'Ļ': 'L', 'Ľ': 'L', 'Ŀ': 'L', 'Ł': 'L',
  'ĺ': 'l', 'ļ': 'l', 'ľ': 'l', 'ŀ': 'l', 'ł': 'l',
  'Ń': 'N', 'Ņ': 'N', 'Ň': 'N', 'Ŋ': 'N',
  'ń': 'n', 'ņ': 'n', 'ň': 'n', 'ŋ': 'n',
  'Ō': 'O', 'Ŏ': 'O', 'Ő': 'O',
  'ō': 'o', 'ŏ': 'o', 'ő': 'o',
  'Ŕ': 'R', 'Ŗ': 'R', 'Ř': 'R',
  'ŕ': 'r', 'ŗ': 'r', 'ř': 'r',
  'Ś': 'S', 'Ŝ': 'S', 'Ş': 'S', 'Š': 'S',
  'ś': 's', 'ŝ': 's', 'ş': 's', 'š': 's',
  'Ţ': 'T', 'Ť': 'T', 'Ŧ': 'T',
  'ţ': 't', 'ť': 't', 'ŧ': 't',
  'Ũ': 'U', 'Ū': 'U', 'Ŭ': 'U', 'Ů': 'U', 'Ű': 'U', 'Ų': 'U',
  'ũ': 'u', 'ū': 'u', 'ŭ': 'u', 'ů': 'u', 'ű': 'u', 'ų': 'u',
  'Ŵ': 'W', 'ŵ': 'w',
  'Ŷ': 'Y', 'ŷ': 'y', 'Ÿ': 'Y',
  'Ź': 'Z', 'Ż': 'Z', 'Ž': 'Z',
  'ź': 'z', 'ż': 'z', 'ž': 'z',
  'Ĳ': 'IJ', 'ĳ': 'ij',
  'Œ': 'Oe', 'œ': 'oe',
  'ŉ': "'n", 'ſ': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange$2 = '\\u0300-\\u036f';
var reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$2 = '\\u20d0-\\u20ff';
var rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;

/** Used to compose unicode capture groups. */
var rsCombo$1 = '[' + rsComboRange$2 + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo$1, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/** Used to compose unicode character classes. */
var rsAstralRange$2 = '\\ud800-\\udfff';
var rsComboMarksRange$3 = '\\u0300-\\u036f';
var reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$3 = '\\u20d0-\\u20ff';
var rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
var rsDingbatRange = '\\u2700-\\u27bf';
var rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
var rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
var rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
var rsPunctuationRange = '\\u2000-\\u206f';
var rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
var rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
var rsVarRange$2 = '\\ufe0e\\ufe0f';
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos$1 = '[\'’]';
var rsBreak = '[' + rsBreakRange + ']';
var rsCombo$2 = '[' + rsComboRange$3 + ']';
var rsDigits = '\\d+';
var rsDingbat = '[' + rsDingbatRange + ']';
var rsLower = '[' + rsLowerRange + ']';
var rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']';
var rsFitz$1 = '\\ud83c[\\udffb-\\udfff]';
var rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')';
var rsNonAstral$1 = '[^' + rsAstralRange$2 + ']';
var rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsUpper = '[' + rsUpperRange + ']';
var rsZWJ$2 = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')';
var rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')';
var rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?';
var rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?';
var reOptMod$1 = rsModifier$1 + '?';
var rsOptVar$1 = '[' + rsVarRange$2 + ']?';
var rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*';
var rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)';
var rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)';
var rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1;
var rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
}

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

/** Used to compose unicode capture groups. */
var rsApos = '[\'’]';

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @example
 *
 * _.snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * _.snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * _.snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 */
var snakeCase$1 = createCompounder(function (result, word, index) {
  return result + (index ? '_' : '') + word.toLowerCase();
});

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase$1 = createCompounder(function (result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst$1(toString(string).toLowerCase());
}

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase$1 = createCompounder(function (result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

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
var objectProto$3 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

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
var Map = getNative(root, 'Map');

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
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

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
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

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
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$4.call(data, key);
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

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1;
var COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

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

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag$1 = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$1:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
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
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
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

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

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

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

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
  return isObjectLike(value) && hasOwnProperty$7.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
};

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

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag$1 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$1 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$1 = '[object Set]';
var stringTag$1 = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';
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
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag] = false;

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
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
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

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

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
    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (
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

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$11;

  return value === proto;
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
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

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
    if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
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
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$5.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';
var objectTag$2 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

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
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map && getTag(new Map()) != mapTag$2 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$2 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
    getTag = function getTag(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag$2 ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString:
                    return dataViewTag$2;
                case mapCtorString:
                    return mapTag$2;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag$2;
                case weakMapCtorString:
                    return weakMapTag$1;
            }
        }
        return result;
    };
}

var getTag$1 = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag$1(object),
      othTag = othIsArr ? arrayTag : getTag$1(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty$1.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$1.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual$1(value, other) {
  return baseIsEqual(value, other);
}

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Recursively flattens `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY$1) : [];
}

/** Used for built-in method references. */
var objectProto$12 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$12.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty$9.call(object, key);
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
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

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
  return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has$1(object, path) {
  return object != null && hasPath(object, path, baseHas);
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
  path = castPath(path, object);

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
var objectProto$13 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$13.hasOwnProperty;

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
  if (!(hasOwnProperty$10.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
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
  path = castPath(path, object);

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
var freeExports$2 = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;
var allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

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
var objectTag$3 = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;
var objectProto$14 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$14.hasOwnProperty;

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
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$11.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
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
var objectProto$15 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$12 = objectProto$15.hasOwnProperty;

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
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$12.call(object, key)))) {
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
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
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
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
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
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});

// specific features are used.

// Used for deep merging of options
var defaultsDeep = defaultsDeep$1;

// Used for deep setting/getting of values in nested objects
var set$1 = set$2;
var get$1 = get$2;
var has = has$1;

var flattenDeep = flattenDeep$1;

var isEqual = isEqual$1;

// String manipulation
// Used for CSS and class method names
var camelCase = camelCase$1;
var kebabCase = kebabCase$1;
var snakeCase = snakeCase$1;
var upperFirst = upperFirst$1;

// Use a true undefined in case the `undefined` is overridden for some reason.
var UNDEF = void 0;

function noop() {}

function isNumeric(v) {
  return typeof v === 'number' && isFinite(v);
}

function isNumberLike(v) {
  return isNumeric(v) || isString(v) && isNumeric(+v);
}

function isString(v) {
  return typeof v === 'string';
}

function isFunc(v) {
  return typeof v === 'function';
}

function isNoop(v) {
  return v === noop;
}

function isObject$2(v) {
  return v !== null && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && !isArray$2(v);
}

function isArray$2(v) {
  return Array.isArray(v);
}

function isDefined(v) {
  return v !== null && v !== UNDEF;
}

function isFuncDefined(v) {
  return isDefined(v) && isFunc(v) && !isNoop(v);
}

// Based on `ExtendableError` from
// http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax

var DEFAULT_MSG = 'An error has occurred, but no specific message was provided. Please use the stacktrace to debug.';

var MonteError = function (_Error) {
  inherits(MonteError, _Error);

  function MonteError(message) {
    classCallCheck(this, MonteError);

    for (var _len = arguments.length, msgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      msgs[_key - 1] = arguments[_key];
    }

    var msg = [message || DEFAULT_MSG].concat(msgs).join(' ');

    var _this = possibleConstructorReturn(this, (MonteError.__proto__ || Object.getPrototypeOf(MonteError)).call(this, msg));

    _this.name = _this.constructor.name;
    _this.message = msg;

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
      var sourceType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'chart';

      for (var _len2 = arguments.length, msgs = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        msgs[_key2 - 3] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(MonteError, [null].concat([method + ' (`' + methodName + '`) needs to be defined in order for the ' + sourceType + ' to be useful.'], msgs)))();
    }
  }, {
    key: 'InvalidArgumentType',
    value: function InvalidArgumentType(methodName, argumentName, expectedType, received) {
      for (var _len3 = arguments.length, msgs = Array(_len3 > 4 ? _len3 - 4 : 0), _key3 = 4; _key3 < _len3; _key3++) {
        msgs[_key3 - 4] = arguments[_key3];
      }

      return new (Function.prototype.bind.apply(MonteError, [null].concat(['Method (' + methodName + ') argument "' + argumentName + '" of unexpected type. Expected ' + expectedType + ', but was given ' + received + '.'], msgs)))();
    }
  }]);
  return MonteError;
}(Error);

var InstanceGroup = function () {
  function InstanceGroup(instances, proxyMethodSet) {
    var _this = this;

    classCallCheck(this, InstanceGroup);

    this._instances = [];

    for (var _len = arguments.length, additionalMethodsToProxy = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      additionalMethodsToProxy[_key - 2] = arguments[_key];
    }

    this._methodsToProxy = proxyMethodSet.concat(flattenDeep.apply(undefined, additionalMethodsToProxy));

    this._methodsToProxy.forEach(function (m) {
      return _this.addProxyMethod(m);
    });
    instances.forEach(function (instance) {
      return _this.addInstance(instance);
    });
  }

  createClass(InstanceGroup, [{
    key: 'addProxyMethod',
    value: function addProxyMethod(methodName) {
      this[methodName] = this.invokeProxyMethod.bind(this, methodName);
    }
  }, {
    key: 'removeProxyMethod',
    value: function removeProxyMethod(methodName) {
      var index = this._methodsToProxy.indexOf(methodName);

      if (index > -1) {
        this._methodsToProxy.splice(index, 1);
      }
    }
  }, {
    key: 'addInstance',
    value: function addInstance(instance) {
      if (instance) {
        this._instances.push(instance);
      }
    }
  }, {
    key: 'removeChart',
    value: function removeChart(instance) {
      var index = this._instances.indexOf(instance);

      if (index > -1) {
        this._instances.splice(index, 1);
      }
    }
  }, {
    key: 'invokeProxyMethod',
    value: function invokeProxyMethod(methodName) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this._instances.forEach(function (instance) {
        if (instance && instance[methodName] && isFunc(instance[methodName])) {
          instance[methodName].apply(instance, args);
        } else {
          throw new MonteError('Cannot invoke ' + methodName + ' on ' + instance);
        }
      });

      return this;
    }
  }, {
    key: 'getProxiedMethods',
    value: function getProxiedMethods() {
      return this._methodsToProxy;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this._instances.forEach(function (instance) {
        if (instance && instance['destroy'] && isFunc(instance['destroy'])) {
          instance['destroy'].apply(instance, args);
        }
      });

      this._instances.length = 0;
    }
  }]);
  return InstanceGroup;
}();

var MonteOptionError = function (_MonteError) {
  inherits(MonteOptionError, _MonteError);

  function MonteOptionError() {
    classCallCheck(this, MonteOptionError);
    return possibleConstructorReturn(this, (MonteOptionError.__proto__ || Object.getPrototypeOf(MonteOptionError)).apply(this, arguments));
  }

  createClass(MonteOptionError, null, [{
    key: 'RequiredOption',
    value: function RequiredOption(optionName) {
      for (var _len = arguments.length, msgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        msgs[_key - 1] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(MonteOptionError, [null].concat(['Option "' + optionName + '" is required.'], msgs)))();
    }
  }, {
    key: 'InvalidEnumOption',
    value: function InvalidEnumOption(optionName, badValue) {
      for (var _len2 = arguments.length, msgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        msgs[_key2 - 2] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(MonteOptionError, [null].concat(['Option "' + optionName + '" must be set to a valid option. The value "' + badValue + '" is not valid.'], msgs)))();
    }
  }, {
    key: 'OptionMustBeFunction',
    value: function OptionMustBeFunction(optionName) {
      for (var _len3 = arguments.length, msgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        msgs[_key3 - 1] = arguments[_key3];
      }

      return new (Function.prototype.bind.apply(MonteOptionError, [null].concat(['Option "' + optionName + '" must be a function.'], msgs)))();
    }
  }]);
  return MonteOptionError;
}(MonteError);

// In d3-axis, there are hard coded shifts of 0.5. This shift is used for grid alignment and other
// axis alignments.
var AXIS_SHIFT = 0.5;

// In d3-transition the default transition time is 250ms.
var TRANSITION_DURATION_MS = 250;
var TRANSITION_DELAY_MS = 0;
var TRANSITION_EASE = d3.easeCubic;
var TRANSITION_EASE_START_POSITION = 0;
var TRANSITION_EASE_END_POSITION = 1;

var ENTER = 'enter';
var UPDATE = 'update';
var EXIT = 'exit';

var UPDATE_PATTERN = { ENTER: ENTER, UPDATE: UPDATE, EXIT: EXIT };

var BRUSH_HANDLE_SIZE = 6;

// In d3-shape, a default size of 64 is used.
var SYMBOL_SIZE = 64;

var d3$1 = Object.freeze({
	AXIS_SHIFT: AXIS_SHIFT,
	TRANSITION_DURATION_MS: TRANSITION_DURATION_MS,
	TRANSITION_DELAY_MS: TRANSITION_DELAY_MS,
	TRANSITION_EASE: TRANSITION_EASE,
	TRANSITION_EASE_START_POSITION: TRANSITION_EASE_START_POSITION,
	TRANSITION_EASE_END_POSITION: TRANSITION_EASE_END_POSITION,
	ENTER: ENTER,
	UPDATE: UPDATE,
	EXIT: EXIT,
	UPDATE_PATTERN: UPDATE_PATTERN,
	BRUSH_HANDLE_SIZE: BRUSH_HANDLE_SIZE,
	SYMBOL_SIZE: SYMBOL_SIZE
});

var standard = {
  delay: TRANSITION_DELAY_MS,
  duration: TRANSITION_DURATION_MS,
  ease: TRANSITION_EASE
};

var none = {
  delay: 0,
  duration: 0,
  ease: function ease() {
    return TRANSITION_EASE_END_POSITION;
  }
};

var transitionSettings = {
  standard: standard,
  none: none
};

// A deep-first object property getter that falls back to parent and sibling levels if the expected
// property is not present.
//
// For example on a generic 3-level object, attempts to access:
//   (Primary)
//   obj.levels[0].levels[1].levels[2].prop, then
//   obj.levels[0].levels[1].prop, then
//   obj.levels[0].prop, then
//
//   (Secondary)
//   obj.levels[1].levels[2].prop, then
//   obj.levels[2].prop, then
//   obj.prop, then falls back to the
//   defaultValue.
//
// More concretely if the object is transition settings, `level`s are 'line' and 'update', the
// `property` is 'duration', and the `defaultValue` is 250 the attempts are:
//   transitionSettings.line.update.duration,then
//   transitionSettings.update.duration, then
//   transitionSettings.duration, then
//   defaultValue.
function getTreeSetting(obj, levels, property, defaultValue) {
  if (obj) {
    // Primary chain (deep)
    for (var i = levels.length - 1; i >= 0; i--) {
      var propPath = levels.slice(0, i + 1).join('.');
      if (propPath) {
        propPath += '.';
      }
      propPath += property;

      if (has(obj, propPath)) {
        return get$1(obj, propPath);
      }
    }

    // Scondary chain (shallow and siblings)
    for (var _i = 0; _i < levels.length; _i++) {
      var _propPath = levels.slice(_i + 1).join('.');
      if (_propPath) {
        _propPath += '.';
      }
      _propPath += property;

      if (has(obj, _propPath)) {
        return get$1(obj, _propPath);
      }
    }
  }

  return defaultValue;
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

        if (document.readyState === 'complete') {
          ready();
        }
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
      var timeoutDelayMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (timeoutDelayMs === null) {
        return this.opts.timeoutDelayMs;
      }
      this.opts.timeoutDelayMs = timeoutDelayMs;

      return this;
    }
  }]);
  return EventWatcher;
}();

var MonteGlobal = function () {
  function MonteGlobal() {
    classCallCheck(this, MonteGlobal);

    this._developerMode = false;
    this._developerModeEvents = null;
    this._resizeWatch = new EventWatcher();
    this.extensionId = 0;
    this.chartId = 0;
  }

  createClass(MonteGlobal, [{
    key: 'getNextChartId',
    value: function getNextChartId() {
      return this.chartId++; // Post-increment so counts start at zero.
    }

    // WARNING:
    //   Resetting IDs may result in unexpected behavior if multiple chart instances recieve the same
    //   ID... use cautiously and sparingly.
    //
    //   Resetting the chart IDs should rarely be done and should have very specific motivation. In
    //   general, the IDs should be allowed to grow over the course of an application's life span.

  }, {
    key: 'resetChartCount',
    value: function resetChartCount() {
      this.chartId = 0;
    }
  }, {
    key: 'getNextExtensionId',
    value: function getNextExtensionId() {
      return this.extensionId++; // Post-increment so counts start at zero.
    }

    // WARNING:
    //   Resetting IDs may result in unexpected behavior if multiple extension instances recieve the
    //   same ID... use cautiously and sparingly.
    //
    //   Resetting the extension IDs should rarely be done and should have very specific motivation.
    //   In general, the IDs should be allowed to grow over the course of an application's life span.

  }, {
    key: 'resetExtensionCount',
    value: function resetExtensionCount() {
      this.extensionId = 0;
    }
  }, {
    key: 'getResizeWatcher',
    value: function getResizeWatcher() {
      return this._resizeWatch;
    }
  }, {
    key: 'isDeveloperMode',
    value: function isDeveloperMode() {
      return this._developerMode;
    }

    // TODO: Add example of wild card event(s)?

  }, {
    key: 'setDeveloperModeEvents',
    value: function setDeveloperModeEvents() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._developerModeEvents = flattenDeep(args);
      this._developerMode = true;
    }
  }, {
    key: 'getDeveloperModeEvents',
    value: function getDeveloperModeEvents() {
      return this._developerModeEvents;
    }
  }, {
    key: 'clearDeveloperModeEvents',
    value: function clearDeveloperModeEvents() {
      this._developerModeEvents = null;
    }
  }, {
    key: 'clearDeveloperMode',
    value: function clearDeveloperMode() {
      this._developerMode = false;
    }
  }, {
    key: 'enableDeveloperMode',
    value: function enableDeveloperMode() {
      this._developerMode = true;
    }
  }]);
  return MonteGlobal;
}();

var global$1 = new MonteGlobal();

// FIXME: Does a simple window check work in Node / JSDom / Tests? A `typeof window === object` is
//        probably needed.
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
  window.MonteGlobal = global$1;
}

var CLIP_PATH_ID_BASE = 'drawPath';

function chartClipPathId(chartId) {
  var num = +chartId;

  if (!isNumeric(num)) {
    throw new MonteError('Cannot get chart clipPath ID. The chart ID must be numeric.');
  }

  return CLIP_PATH_ID_BASE + num;
}

function defaultDataKey(d, i) {
  return d && d.id || i;
}

var DEFAULTS = {
  css: '',
  boundingWidth: 250,
  boundingHeight: 250,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  customEvents: [],
  extensions: [],

  transition: standard,

  resize: null,

  // Data key for all draw layer and feature level selections in all charts.
  dataKey: defaultDataKey,

  /*************************************************************************************************
   *
   * Misc. options
   *
   ************************************************************************************************/

  // When a `clear` occurs (by direct invocation or via `data` (without an update)) the domain is
  // automatically reset.
  autoResetStyleDomains: false,

  // Indicates that the chart base is being used directly in a client script chart (an "on the
  // fly" chart). The assumption is most of the time other classes will extend and implement
  // required features (such as '_update') and the checks for those features should be enforced.
  directUse: false,

  developerOptions: {
    scales: false, // Log generated scale accessor details
    transitions: false, // Log transition configuration details
    listeners: false }
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
    this.hasRendered = false;
    this.layers = [];
    this.extensions = [];
    this._optionReaderCache = {};
    this.__chartId = global$1.getNextChartId();
    this.parentSelector = parentSelector;

    // Configure the data options.
    this._initOptions(options);

    // Setup the Public events.
    this._initPublicEvents.apply(this, toConsumableArray(INTERACTION_EVENTS).concat(toConsumableArray(CHART_SUPPORT_EVENTS), toConsumableArray(CHART_LIFECYCLE_EVENTS), toConsumableArray(this.opts.customEvents)));

    // Put chart in developer mode if opted into on a chart or global basis
    if (this.opts.developerMode || global$1.isDeveloperMode()) {
      this._initDeveloperMode();
    }

    // Setup the core infastructure.
    this._initCore();

    // Customize configuration
    this._initCustomize();

    // Update the bounding box and layout basics.
    this._boundsUpdate();

    // Bind initial extensions to this chart instance.
    this._bindExt(this.tryInvoke(this.opts.extensions));

    // Do the various setup rendering (Axis, BG, etc...)
    this._initRender();

    this._constructed = true;

    // Trigger a resize if everything is ready.
    if (this._resizeHandler && global$1.getResizeWatcher().documentReady) {
      this._resizeHandler();
    }

    // First full draw cycle
    if (data) {
      this.data(data);
    }
  }

  createClass(Chart, [{
    key: 'getChartId',
    value: function getChartId() {
      return this.__chartId;
    }
  }, {
    key: '_getChartAttr',
    value: function _getChartAttr() {
      return 'monte-chart-' + this.getChartId(); // ID is stored on the element as an attribute.
    }
  }, {
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
      var parent = d3.select(this.parentSelector); // TODO: Allow parent to be a D3 Selection?

      if (parent.node() === null) {
        throw new MonteError('Invalid selector. "' + this.parentSelector + '" did not match any element."');
      } else if (parent.node().tagName.toLowerCase() === 'svg') {
        this.bound = parent;
      } else {
        this.bound = parent.append('svg');
      }

      this.bound.attr(this._getChartAttr(), '');

      // Add reference of chart to the node for flexibility of access.
      this.bound.node().monteChart = this;
      this.bound.classed(this._buildCss(['monte-chart', this.opts.css, this.opts.chartCss]), true);

      // SVG Defs element
      this.defs = this.bound.append('defs');

      // Drawing area path clipping
      this.clip = this.defs.append('clipPath').attr('id', chartClipPathId(this.getChartId()));
      this.clipRect = this.clip.append('rect').attr('x', 0).attr('y', 0);

      this._initLayers();

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
      var resizer = this.tryInvoke(this.opts.resize);
      if (resizer) {
        this._resizeHandler = resizer.resize.bind(resizer, this);
        global$1.getResizeWatcher().add(this._resizeHandler);
      }
    }
  }, {
    key: '_initLayers',
    value: function _initLayers() {
      // Create a background area.
      this.addLayer('bg');

      // Create the support area.
      this.addLayer('support');

      // Create the selection area.
      this.addLayer('selection');

      // Create the primary drawing area.
      this.addLayer('draw');

      // Create the overlay area.
      this.addLayer('overlay');
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

    // TODO: Allow enabling/disabling of developerMode from `option`.

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
            if (isDefined(v)) {
              var s = isFunc(v) ? 'func: \'' + (v.name || 'anonymous') + '\'' : v;
              a += '\t' + i + ': ' + s + '\n';
            }
          });
        }

        console.log('[' + _this2 + '] "' + eventName + '": ' + a); // eslint-disable-line no-console
      };

      this.developerMode = true;

      // Determine events to watch in developer mode. If `developerMode` is an array use the provided
      // events; otherwise use all registered events.
      var events = isArray$2(this.opts.developerMode) || global$1.getDeveloperModeEvents() ? this.opts.developerMode || global$1.getDeveloperModeEvents() : this._events;

      events.forEach(function (eventName) {
        if (_this2.opts.developerOptions.listeners) {
          console.log('[' + _this2 + '] Adding listener for "' + eventName + '"'); // eslint-disable-line no-console
        }

        _this2.on(eventName + '.developerMode', echo.bind(_this2, eventName));
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {}
  }, {
    key: '_initRender',
    value: function _initRender() {}
  }, {
    key: '_boundsUpdate',
    value: function _boundsUpdate() {
      var _this3 = this;

      var suppressNotify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var suppressUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.__notify(BEFORE_BOUNDS_UPDATE);

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
          _this3.__notify(BOUNDS_UPDATED);
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

    /*
     * Manually invoke the resize strategy (if any).
     *
     * @Chainable
     */

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
      this.__notify(BEFORE_DESTROY);

      if (this._resizeHandler) {
        global$1.getResizeWatcher().remove(this._resizeHandler);
      }

      this._destroy();

      // Handle case where parentSelector and bound are the same and only remove internal elements.
      if (this.bound.node() === d3.select(this.parentSelector).node()) {
        this.bound.node().innerHTML = '';
      } else {
        this.bound.remove();
      }

      this.__notify(DESTROYED);
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
      var elementType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'g';

      var layer = this.bound.append(elementType).attr('class', 'monte-' + layerName);

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
    value: function layerUseClipPath(layerName, pathId) {
      if (!isDefined(pathId)) {
        pathId = chartClipPathId(this.getChartId());
      }

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

      if (arguments.length >= 1 && isDefined(width)) {
        var minWidth = this.option('margin.left') + this.option('margin.right');
        if (width < minWidth) {
          width = minWidth;
        }
        this.opts.boundingWidth = width;
      }

      if (arguments.length === 2 && isDefined(height)) {
        var minHeight = this.option('margin.top') + this.option('margin.bottom');
        if (height < minHeight) {
          height = minHeight;
        }
        this.opts.boundingHeight = height;
      }

      this._boundsUpdate();
      this.update();

      return this;
    }

    /**
     * Binds an event to a given `callback`. If no `callback` is provided it returns the callback.
     * Passing null removes the callback.
     *
     * See https://github.com/d3/d3-dispatch#dispatch_on
     *
     * @Chainable <setter>
     */

  }, {
    key: 'on',
    value: function on(typenames, callback) {
      if (arguments.length < 2) {
        return this.dispatch.on(typenames);
      }

      this.dispatch.on(typenames, callback);
      return this;
    }

    /**
     * Binds an extension event (filtered by `eventLead`) to a given `callback`. The `eventLead` is a
     * string that matches the *beginning* of the extention specific event name including prefix.
     *
     * For example, to match all SelectionRect events (including updated, rendered, etc...) use
     * 'selectionrect:'; to match all selection events to match only selection events (including
     * selectionStart, selectionMove, etc...) use 'selectionrect:selection'; to match the changed
     * event use 'selectionrect:selectionChanged'.
     *
     * @Chainable <setter>
     */

  }, {
    key: 'onExt',
    value: function onExt(eventLead, callback) {
      if (arguments.length < 2) {
        return this.on(eventLead);
      }

      var typename = 'extension.' + eventLead;
      if (callback === null) {
        this.on(typename, null);
      } else {
        this.on(typename, function (ev) {
          if (ev.indexOf(eventLead) === 0) {
            for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
              args[_key5 - 1] = arguments[_key5];
            }

            callback.call.apply(callback, [this, ev].concat(args));
          }
        });
      }

      return this;
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

      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      this.__notify.apply(this, [eventName].concat(args));

      return this;
    }

    /**
     * Get or set a chart option.
     *
     * NOTE: Does not invoke the "Update cycle" except for margin changes. To apply option changes
     *       call `update`.
     *
     * @Chainable
     */

  }, {
    key: 'option',
    value: function option(key, value) {
      var current = get$1(this.opts, key);

      if (value === UNDEF) {
        return current;
      }

      if (this._optsSet) {
        this.__notify(BEFORE_OPTION_CHANGE, key);
      }

      set$1(this.opts, key, value);

      var updateBounds = this.__handleMarginOptions(key, value, current);
      if (this._optsSet) {
        // Margins affect the drawing area size so various updates are required.
        if (updateBounds) {
          this._boundsUpdate();
        }

        this.__notify(OPTION_CHANGED, key);
      }

      return this;
    }

    /**
     * Provides extra checks for margin related options and checks if they should modify the bounds
     * calculations of the chart.
     */

  }, {
    key: '__handleMarginOptions',
    value: function __handleMarginOptions(key, value, current) {
      var updateBounds = false;

      // Margins cause changes to the internal sizes.
      // If the new margin values match the old margin values do not update bounds. This will help
      // prevent an infinite loop if the margin is adjusted in the update cycle.
      if (key === 'margin') {
        if (!isObject$2(value)) {
          var newVal = { top: value, left: value, right: value, bottom: value };

          if (!isEqual(current, newVal)) {
            this.opts.margin = newVal;
            updateBounds = true;
          }
        } else if (!isEqual(current, value)) {
          updateBounds = true;
        }
      }

      // Check if key is a 'deep' margin value (ex. 'margin.left')
      else if (/^margin\./.test(key) && current !== value) {
          updateBounds = true;
        }

      return updateBounds;
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
     *  `.attr('fill', (d, i, nodes) => this.tryInvoke(this.opts.fillScaleAccessor, d, i, nodes))`
     * is equivalent to
     *  `.attr('fill', this.optionReaderFunc('fillScaleAccessor')')`
     */

  }, {
    key: 'optionReaderFunc',
    value: function optionReaderFunc(optionKey) {
      var _this4 = this;

      if (!isString(optionKey)) {
        throw MonteError.InvalidArgumentType('optionReaderFunc', 'optionKey', 'string', optionKey);
      }

      if (!this._optionReaderCache[optionKey]) {
        this._optionReaderCache[optionKey] = function () {
          for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
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
        for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
          args[_key8 - 1] = arguments[_key8];
        }

        return isFunc(value) ? value.call.apply(value, [this].concat(args)) : value;
      } catch (e) {
        if (console && console.error) {
          console.error(e);
        } // eslint-disable-line no-console
        this.__notify(SUPPRESSED_ERROR, e);
        return null;
      }
    }

    /**
     * Invoke a function (`fn`) (generally from the chart options) with the given arguments. If the
     * `fn` is a non-function value (static values including undefined and null) then null is returned.
     */

  }, {
    key: 'fnInvoke',
    value: function fnInvoke(fn) {
      if (fn == null || !isFunc(fn)) {
        return null;
      }

      try {
        for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        return fn.call.apply(fn, [this].concat(args));
      } catch (e) {
        this.__notify(SUPPRESSED_ERROR, e);
        return null;
      }
    }

    /**
     * Gets the object key bound to the property of a datum.
     */

  }, {
    key: 'getPropKey',
    value: function getPropKey(propShortName) {
      var propFullName = propShortName + 'Prop';

      if (this.opts[propFullName]) {
        return this.opts[propFullName];
      } else if (this.opts[propShortName]) {
        var propIndex = propShortName.indexOf('Prop');

        if (propIndex > -1) {
          var expected = propShortName.substring(0, propIndex);
          throw new MonteError('Property options should be accessed using short names without the "Prop" suffix. Given ' + propShortName + ', but expected ' + expected + '.');
        }
      }

      return null;
    }

    /**
     * Reads a property from a datum and returns the raw (unscaled) value.
     */

  }, {
    key: 'getProp',
    value: function getProp(propShortName, d) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var dataPropName = this.getPropKey(propShortName);

      if (dataPropName) {
        return d[dataPropName];
      }

      return defaultValue;
    }

    /**
     * Reads a scale bound property from a datum and returns the scaled value.
     *
     * Examples:
     *   `this.getScaledProp('x', d);` which is equivilent to `this.getScaledProp('x', 'x', d);`
     *   `this.getScaledProp('x', 'xInner', d);`
     *   `this.getScaledProp('y', 'y2', d)`;
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
      this.__notify(BEFORE_CLEAR);

      this.displayData = null;
      this._clearDataElements();

      if (this.opts.autoResetStyleDomains) {
        this.resetStyleDomains();
      }

      this.__notify(CLEARED);
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
    key: 'resetStyleDomains',
    value: function resetStyleDomains() {
      this.__notify(BEFORE_STYLE_DOMAINS_RESET);
      this._resetStyleDomains();
      this.__notify(STYLE_DOMAINS_RESET);

      return this;
    }

    /**
     * Internal implementation of the `resetStyleDomains` method.
     */

  }, {
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {}

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

      return cssClasses.join(' ').replace(/\s+/, ' ');
    }

    /**
     * Apply the transition settings (duration, delay, and ease). Attempt to match specfic settings
     * based on the provided levels.
     *
     * For example given the levels `['line', 'update']` the transition settings will first be read:
     * + `transitionSettings.line.update.<property>` then
     * + `transitionSettings.update.<property>` then
     * + `transitionSettings.<property>` then
     * + `<propertDefaultValue>`
     *
     * @param {...string} levels The transition depths to load settings for.
     */

  }, {
    key: '_transitionSetup',
    value: function _transitionSetup() {
      var _this6 = this;

      for (var _len10 = arguments.length, levels = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        levels[_key10] = arguments[_key10];
      }

      return function (transition) {
        for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
          args[_key11 - 1] = arguments[_key11];
        }

        var _transitionSettings2 = _this6._transitionSettings.apply(_this6, levels),
            duration = _transitionSettings2.duration,
            delay = _transitionSettings2.delay,
            ease = _transitionSettings2.ease;

        _this6._transitionConfigureDuration.apply(_this6, [transition, duration].concat(args));
        _this6._transitionConfigureDelay.apply(_this6, [transition, delay].concat(args));
        transition.ease(ease);
      };
    }
  }, {
    key: '_transitionConfigureDuration',
    value: function _transitionConfigureDuration(transition, duration) {
      for (var _len12 = arguments.length, args = Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2; _key12 < _len12; _key12++) {
        args[_key12 - 2] = arguments[_key12];
      }

      var durationWrap = null;

      if (isFunc(duration) && args && args.length) {
        durationWrap = function durationWrap(d, i, nodes) {
          return duration.apply(undefined, [d, i, nodes].concat(args));
        };
      }

      transition.duration(durationWrap || duration);
    }
  }, {
    key: '_transitionConfigureDelay',
    value: function _transitionConfigureDelay(transition, delay) {
      for (var _len13 = arguments.length, args = Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _key13 < _len13; _key13++) {
        args[_key13 - 2] = arguments[_key13];
      }

      var delayWrap = null;

      if (isFunc(delay) && args && args.length) {
        delayWrap = function delayWrap(d, i, nodes) {
          return delay.apply(undefined, [d, i, nodes].concat(args));
        };
      }

      transition.delay(delayWrap || delay);
    }
  }, {
    key: '_transitionConfigure',
    value: function _transitionConfigure(transition, transitionSettings$$1, d, i, nodes) {
      var duration = transitionSettings$$1.duration,
          delay = transitionSettings$$1.delay,
          ease = transitionSettings$$1.ease;

      for (var _len14 = arguments.length, args = Array(_len14 > 5 ? _len14 - 5 : 0), _key14 = 5; _key14 < _len14; _key14++) {
        args[_key14 - 5] = arguments[_key14];
      }

      transition.duration(this.tryInvoke.apply(this, [duration, d, i, nodes].concat(args))).delay(this.tryInvoke.apply(this, [delay, d, i, nodes].concat(args))).ease(ease);
    }
  }, {
    key: '_transitionSettings',
    value: function _transitionSettings() {
      for (var _len15 = arguments.length, levels = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        levels[_key15] = arguments[_key15];
      }

      var transitionSettings$$1 = this.tryInvoke(this.opts.transition);
      var duration = getTreeSetting(transitionSettings$$1, levels, 'duration', standard.duration);
      var delay = getTreeSetting(transitionSettings$$1, levels, 'delay', standard.delay);
      var ease = getTreeSetting(transitionSettings$$1, levels, 'ease', standard.ease);

      if (this.developerMode && this.opts.developerOptions.transitions) {
        console.log('Transition: ' + levels.join('.')); // eslint-disable-line no-console
        console.log({ levels: levels, duration: duration, delay: delay, ease: ease }); // eslint-disable-line no-console
      }

      return { duration: duration, delay: delay, ease: ease };
    }

    /**
     * Get / set an attribute of the bounding element.
     *
     * A convenience method that is roughly equivalent to `<chart>.bound.attr(<name>, <value>)`,
     * but returns the chart instead of the `<chart>.bound` selection.
     *
     * @Chainable <setter>
     */

  }, {
    key: 'attr',
    value: function attr(name, value) {
      if (value === UNDEF) {
        return this.bound.attr(name);
      }

      this.bound.attr(name, value);

      return this;
    }

    /**
     * Get / set a style of the bounding element.
     *
     * A convenience method that is roughly equivalent to `<chart>.bound.style(<name>, <value>)`,
     * but returns the chart instead of the `<chart>.bound` selection.
     *
     * @Chainable <setter>
     */

  }, {
    key: 'style',
    value: function style(name, value) {
      if (value === UNDEF) {
        return this.bound.style(name);
      }

      this.bound.style(name, value);

      return this;
    }

    /**
     * Set the CSS classes on the SVG element.
     *
     * A convenience method that is roughly equivalent to `<chart>.bound.classed(<names>, <value>)`,
     * but returns the chart instead of the `<chart>.bound` selection.
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
      for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        args[_key16 - 1] = arguments[_key16];
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
     * @Chainable <setter>
     */

  }, {
    key: 'data',
    value: function data(_data) {
      var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var suppressUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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

    /**
     * Internal method to manage assignment of data.
     */

  }, {
    key: '_data',
    value: function _data(data) {
      this.displayData = data;
    }

    /**
     * Gets the original data if the chart modified the structure; otherwise returns the same as
     * `<chart>.data()`;
     */

  }, {
    key: 'getRawData',
    value: function getRawData() {
      // TODO: When assigning data make sure new data is a deep copy.
      if (this.rawData) {
        return this.rawData;
      }

      return this.displayData;
    }

    /**
     * Add an extension instance to the chart instance.
     *
     * @Chainable
     */

  }, {
    key: 'addExt',
    value: function addExt() {
      for (var _len17 = arguments.length, exts = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        exts[_key17] = arguments[_key17];
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
      var _this7 = this;

      exts.forEach(function (ext) {
        if (ext.opts.binding) {
          ext.setChart(_this7);
          _this7.extensions.push(ext);
        } else {
          _this7.__notify(SUPPRESSED_ERROR, 'Extensions must have the `binding` option specified.');
        }
      });
    }

    /**
     * Invokes all extensions "Update Cycle" if bound to the given event (binding) name.
     */

  }, {
    key: '__updateExt',
    value: function __updateExt(bindingName) {
      for (var _len18 = arguments.length, extArgs = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
        extArgs[_key18 - 1] = arguments[_key18];
      }

      this.extensions.forEach(function (ext) {
        if (ext.opts.binding.indexOf(bindingName) > -1) {
          ext.fire.apply(ext, [bindingName].concat(extArgs));
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
        return this;
      } // Don't allow update if data has not been set.

      if (!this.hasRendered) {
        this.__notify(BEFORE_RENDER);
        this._render();
        this.hasRendered = true;
        this.__notify(RENDERED);
      }

      this.__notify(BEFORE_UPDATE);
      this._update();
      this.__notify(UPDATED);

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

      for (var _len19 = arguments.length, args = Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
        args[_key19 - 1] = arguments[_key19];
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
          d3.select(node).classed(cssAction.css, true);
        } else if (cssAction.action === 'remove') {
          d3.select(node).classed(cssAction.css, false);
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
  }], [{
    key: 'generateScaleAccessor',
    value: function generateScaleAccessor(scaleName, propPrefix) {
      if (propPrefix) {
        return function (d) {
          var scalePath = 'opts.' + scaleName;
          var v = this.getScaledProp(scalePath, propPrefix, d);

          if (this.developerMode && this.opts.developerOptions.scales && v !== UNDEF) {
            console.log(scalePath, v); // eslint-disable-line no-console
          }

          return v;
        };
      }

      // If the `propPrefix` is blank than default to index counting.
      return function (d, i) {
        var v = get$1(this, 'opts.' + scaleName)(i);

        if (this.developerMode) {
          console.log(v); // eslint-disable-line no-console
        }

        return v;
      };
    }
  }, {
    key: 'createInstanceGroup',
    value: function createInstanceGroup(charts) {
      for (var _len20 = arguments.length, additionalMethodsToProxy = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
        additionalMethodsToProxy[_key20 - 1] = arguments[_key20];
      }

      return new InstanceGroup(charts, GROUP_PROXY_METHODS, additionalMethodsToProxy);
    }
  }]);
  return Chart;
}();

var GROUP_PROXY_METHODS = ['addExt', 'addLayer', 'boundingRect', 'call', 'checkSize', 'classed', 'clear', 'data', 'emit', 'layerUseClipPath', 'on', 'option', 'replaceScale', 'resetStyleDomains', 'update', 'updateData'];

var EVENT_AXIS_BEFORE_RENDER = 'beforeAxisRender';
var EVENT_AXIS_RENDERED = 'axisRendered';
var EVENTS = [EVENT_AXIS_BEFORE_RENDER, EVENT_AXIS_RENDERED];

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

  xTickLabelCustomize: noop,

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

  yLabelCustomize: noop,

  yTickLabelCustomize: noop
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

      (_babelHelpers$get2 = get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, EVENTS));
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
              return customFunc.call(_this3, axis);
            });
          })();
        } else if (isFunc(customize)) {
          customize.call(_this3, _this3[scaleName + 'Axis']);
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
    key: '_boundsUpdate',
    value: function _boundsUpdate() {
      var actions = get(AxesChart.prototype.__proto__ || Object.getPrototypeOf(AxesChart.prototype), '_boundsUpdate', this).call(this, true, true);

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

      return this;
    }
  }, {
    key: 'updateAxesTransforms',
    value: function updateAxesTransforms() {
      var _this5 = this;

      this.forEachAxisScale(function (scaleName) {
        var axisGrp = _this5.support.select('.' + scaleName + '-axis');
        var trans = _this5.__axisOpt(scaleName, 'AxisTransform');

        if (trans) {
          axisGrp.attr('transform', _this5.tryInvoke(trans, _this5.width, _this5.height));
        }
      });

      return this;
    }
  }, {
    key: 'updateAxesRanges',
    value: function updateAxesRanges() {
      var _this6 = this;

      this.forEachAxisScale(function (scaleName) {
        var rangeFunc = _this6.__axisOpt(scaleName, 'Range');
        var range = rangeFunc.call(_this6, _this6.width, _this6.height);
        _this6[scaleName].range(range);
      });

      return this;
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

      return this;
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
      var stage = this.hasRendered ? UPDATE : ENTER;
      var t = this.bound.transition().call(this._transitionSetup('axis', stage));

      // (Re)render axes
      this.forEachAxisScale(function (scaleName) {
        if (isSuppressArray && suppressAxes.indexOf(scaleName) > -1) {
          return;
        }

        var axis = _this8[scaleName + 'Axis'];
        _this8.emit(EVENT_AXIS_BEFORE_RENDER, scaleName, axis);

        _this8.support.select('.' + scaleName + '-axis').transition(t).call(axis).call(_this8._setLabel.bind(_this8, scaleName)).call(function (t) {
          return _this8.emit(EVENT_AXIS_RENDERED, scaleName, axis, t);
        });
      });

      return this;
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      // eslint-disable-line no-unused-vars
      if (this.opts.directUse) {
        // Provide simple default extent that can be overridden by the corresponding
        // `<scaleName>DomainCustomize` option.
        return [0, 1];
      }

      throw MonteError.UnimplementedMethod('Domain Extent', '_domainExtent');
    }

    // Loops over each scale name that is bound to an axis.

  }, {
    key: 'forEachAxisScale',
    value: function forEachAxisScale(f) {
      this.axes.forEach(f);

      return this;
    }
  }, {
    key: '_setLabel',
    value: function _setLabel(scaleName, transition) {
      var _this9 = this;

      // eslint-disable-line no-unused-vars
      var optLabel = this.opts[scaleName + 'Label'];
      var label = isDefined(optLabel) ? this.tryInvoke(this.opts[scaleName + 'Label']) : null;
      var data = label === null ? [] : [label];
      var lbl = this.support.select('.' + scaleName + '-axis').selectAll('.monte-axis-label').data(data);

      lbl.enter().append('text').merge(lbl).attr('class', 'monte-axis-label').text(function (d) {
        return d;
      }).call(function (lbls) {
        var opt = scaleName + 'LabelCustomize';
        var lblCustomize = _this9.opts[opt];

        if (lblCustomize) {
          if (isFunc(lblCustomize)) {
            _this9.fnInvoke(lblCustomize, lbls);
          } else {
            throw MonteOptionError.OptionMustBeFunction(opt, '(' + opt + ' is optional)');
          }
        }
      });

      lbl.exit().remove();
    }
  }], [{
    key: 'createInstanceGroup',
    value: function createInstanceGroup(charts) {
      var _babelHelpers$get3;

      for (var _len3 = arguments.length, additionalMethodsToProxy = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        additionalMethodsToProxy[_key3 - 1] = arguments[_key3];
      }

      additionalMethodsToProxy.push(GROUP_PROXY_METHODS$1);
      return (_babelHelpers$get3 = get(AxesChart.__proto__ || Object.getPrototypeOf(AxesChart), 'createInstanceGroup', this)).call.apply(_babelHelpers$get3, [this, charts].concat(additionalMethodsToProxy));
    }
  }]);
  return AxesChart;
}(Chart);

AxesChart.EVENTS = EVENTS;

var GROUP_PROXY_METHODS$1 = ['forEachAxisScale', 'renderAxes', 'replaceScale', 'updateAxesDomains', 'updateAxesRanges', 'updateAxesTransforms'];

// Serves as the base chart for charts using polar coordinates (pie, donut, guage, etc...)
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

function pascalCase(str) {
  return upperFirst(camelCase(str));
}

var LINE = 'line';
var POINT = 'point';
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

  lineProp: '',

  // Callback function to customize the line generator, such as set the interpolate.
  lineCustomize: null,

  lineStrokeScale: noop,
  lineStrokeScaleAccessor: AxesChart.generateScaleAccessor('lineStrokeScale', 'lineProp'),

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  lineCssScale: noop,
  lineCssScaleAccessor: AxesChart.generateScaleAccessor('lineCssScale', 'lineProp'),

  // Static CSS class(es) to apply to every line.
  lineCss: 'line',

  /***********************************************************************************************
   *
   * Point related options
   *
   **********************************************************************************************/

  includePoints: false,

  pointProp: '',
  pointFillScale: noop,
  pointFillScaleAccessor: AxesChart.generateScaleAccessor('pointFillScale', 'pointProp'),

  pointStrokeScale: noop,
  pointStrokeScaleAccessor: AxesChart.generateScaleAccessor('pointStrokeScale', 'pointProp'),

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,
  pointCssScaleAccessor: AxesChart.generateScaleAccessor('pointCssScale', 'pointProp'),

  // Static CSS class(es) to apply to every line.
  pointCss: 'point',

  pointSize: SYMBOL_SIZE,

  pointSymbol: function pointSymbol(symbol) {
    return symbol.type(d3.symbolCircle);
  },

  pointDataKey: AxesChart.defaultDataKey
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

      (_babelHelpers$get2 = get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(LINE)), toConsumableArray(commonEventNames(POINT))));
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
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.lineStrokeScale);
      resetScaleDomain(this.opts.lineCssScale);
      resetScaleDomain(this.opts.pointFillScale);
      resetScaleDomain(this.opts.pointStrokeScale);
      resetScaleDomain(this.opts.pointCssScale);
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
      // Data join for the lines
      var lineGrps = this.draw.selectAll('.monte-line-grp').data(this.displayData, this.opts.dataKey);

      var enterLines = lineGrps.enter().append('g').attr('class', 'monte-line-grp').append('path').call(this.__bindCommonEvents(LINE));

      this._updateLineSelection(enterLines, ENTER);

      // Update existing lines and set values on new lines.
      var updateLines = lineGrps.select('.monte-line');
      this._updateLineSelection(updateLines, UPDATE);

      // Fade out removed lines.
      lineGrps.exit().transition().call(this._transitionSetup(LINE, EXIT)).style('opacity', 0).remove();

      // Here the order is important. Merging the line groups when only an update occurs results in an
      // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
      return lineGrps.merge(lineGrps.enter().selectAll('.monte-line-grp'));
    }
  }, {
    key: '_updateLineSelection',
    value: function _updateLineSelection(sel, stage) {
      var _this4 = this;

      var selectionFnName = LINE + upperFirst(stage) + 'SelectionCustomize';
      var transitionFnName = LINE + upperFirst(stage) + 'TransitionCustomize';

      sel.attr('class', function (d, i) {
        return _this4._buildCss(['monte-line', _this4.opts.lineCss, _this4.opts.lineCssScaleAccessor, d.css], d, i);
      }).call(function (sel) {
        return _this4.fnInvoke(_this4.opts[selectionFnName], sel);
      }).transition().call(this._transitionSetup(LINE, stage)).attr('d', function (d) {
        return _this4.line(_this4.getProp('values', d));
      }).style('stroke', this.optionReaderFunc('lineStrokeScaleAccessor')).call(function (t) {
        return _this4.fnInvoke(_this4.opts[transitionFnName], t);
      });
    }
  }, {
    key: '_updateLinePoints',
    value: function _updateLinePoints(node, lineDatum, lineIndex) {
      var _this5 = this;

      var lineGrp = d3.select(node);

      // Data join for the points
      var points = lineGrp.selectAll('.monte-point').data(function (d) {
        return _this5.getProp('values', d);
      }, this.opts.pointDataKey);

      var genSym = function genSym(d, i) {
        var size = _this5.tryInvoke(_this5.opts.pointSize, d, i);
        var symbase = d3.symbol().size(size);
        var symbol = _this5.opts.pointSymbol(symbase, d, i);
        return symbol(d, i);
      };

      // Create new points
      points.enter().append('path').call(this.__bindCommonEvents(POINT)).attr('d', genSym).attr('transform', function (d) {
        return _this5._translatePoint(d);
      }).attr('class', function (d) {
        return _this5._buildCss(['monte-point', lineDatum.css, _this5.opts.lineCssScaleAccessor, _this5.opts.pointCss, _this5.opts.pointCssScaleAccessor, d.css], lineDatum, lineIndex);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.pointEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(POINT, ENTER)).attr('transform', function (d) {
        return _this5._translatePoint(d);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.pointEnterTransitionCustomize, sel);
      });

      // Update existing points
      points.attr('class', function (d) {
        return _this5._buildCss(['monte-point', lineDatum.css, _this5.opts.lineCssScaleAccessor, _this5.opts.pointCss, _this5.opts.pointCssScaleAccessor, d.css], lineDatum, lineIndex);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.pointUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(POINT, UPDATE)).style('fill', this.optionReaderFunc('pointFillScaleAccessor')).style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor')).attr('transform', function (d) {
        return _this5._translatePoint(d);
      }).attr('d', genSym).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.pointUpdateTransitionCustomize, sel);
      });

      // Fade out removed points.
      points.exit().call(function (sel) {
        return _this5.fnInvoke(_this5.opts.pointExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(POINT, EXIT)).style('opacity', 0).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.pointExitTransitionCustomize, sel);
      }).remove();
    }
  }, {
    key: '_translatePoint',
    value: function _translatePoint(d) {
      return 'translate(' + this.getScaledProp('x', d) + ', ' + this.getScaledProp('y', d) + ')';
    }
  }]);
  return LineChart;
}(AxesChart);

// Create an extent that begins at zero and extends to the max value.
function extentFromZero(extent) {
  return [0, extent[1]];
}

// Create an extent that chooses the maximum using absolute value and
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

// Create a fixed extent from zero to a given `max`.
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

var AREA = 'area';

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

  areaProp: '',

  // Callback function to customize the area generator.
  areaCustomize: null,

  // Scale function for the `fill` attribute to apply per area.
  areaFillScale: noop,
  areaFillScaleAccessor: LineChart.generateScaleAccessor('areaFillScale', 'areaProp'),

  // Scale function for CSS class to apply per area. Input: line index, Output: String of CSS Class.
  areaCssScale: noop,
  areaCssScaleAccessor: LineChart.generateScaleAccessor('areaCssScale', 'areaProp'),

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

      (_babelHelpers$get2 = get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(AREA))));
    }
  }, {
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.areaCssScale);
      resetScaleDomain(this.opts.areaFillScale);
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var lineGrps = get(AreaChart.prototype.__proto__ || Object.getPrototypeOf(AreaChart.prototype), '_update', this).call(this);

      lineGrps.each(function (d, i, nodes) {
        _this3._updateLineArea(nodes[i], d, i, nodes);
      });
    }
  }, {
    key: '_updateLineArea',
    value: function _updateLineArea(node, lineDatum, lineIndex, lineNodes) {
      var _this4 = this;

      var lineGrp = d3.select(node);

      // Data join for the area
      var area = lineGrp.selectAll('.monte-area').data(function (d) {
        return [d];
      });

      // Create new area and update existing
      var enterAreas = area.enter().insert('path', ':first-child').call(this.__bindCommonEvents(AREA));
      this._updateLineAreaSelections(enterAreas, ENTER, lineDatum, lineIndex, lineNodes);
      this._updateLineAreaSelections(area, UPDATE, lineDatum, lineIndex, lineNodes);

      // Fade out removed area
      area.exit().call(function (sel) {
        return _this4.fnInvoke(_this4.opts.areaExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(AREA, EXIT)).style('opacity', 0).call(function (t) {
        return _this4.fnInvoke(_this4.opts.areaExitTransitionCustomize, t);
      }).remove();
    }
  }, {
    key: '_updateLineAreaSelections',
    value: function _updateLineAreaSelections(sel, stage, lineDatum, lineIndex, lineNodes) {
      var _this5 = this;

      var selectionFnName = AREA + upperFirst(stage) + 'SelectionCustomize';
      var transitionFnName = AREA + upperFirst(stage) + 'TransitionCustomize';

      sel.attr('class', function (d) {
        return _this5._buildCss(['monte-area', lineDatum.css, _this5.opts.lineCssScaleAccessor, _this5.opts.areaCss, _this5.opts.areaCssScaleAccessor, d.css], lineDatum, lineIndex);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts[selectionFnName], sel);
      }).transition().call(this._transitionSetup(AREA, stage), lineDatum, lineIndex, lineNodes).attr('d', function (d) {
        return _this5.area(_this5.getProp('values', d));
      }).style('fill', this.optionReaderFunc('areaFillScaleAccessor')).call(function (t) {
        return _this5.fnInvoke(_this5.opts[transitionFnName], t);
      });
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

      this.rawData = data;

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(SparklineChart.prototype.__proto__ || Object.getPrototypeOf(SparklineChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, [data]].concat(tail));
    }
  }]);
  return SparklineChart;
}(LineChart);

var EVENT_UPDATING_LABELS = 'updatingLabels';
var EVENT_UPDATED_LABELS = 'updatedLabels';

var EVENTS$1 = [EVENT_UPDATING_LABELS, EVENT_UPDATED_LABELS];

var BAR = 'bar';
var LABEL = 'label';

var BAR_CHART_DEFAULTS = {
  chartCss: 'monte-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 40
  },

  barCssScale: noop,
  barCssScaleAccessor: AxesChart.generateScaleAccessor('barCssScale', 'x'),

  barFillScale: noop,
  barFillScaleAccessor: AxesChart.generateScaleAccessor('barFillScale', 'x'),

  // Static CSS class(es) to apply to every line.
  barCss: 'bar',
  barGrpCss: function barGrpCss(d) {
    var value = this.getProp('y', d);
    var css = 'monte-bar-zero';

    if (value > 0) {
      css = 'monte-bar-pos';
    } else if (value < 0) {
      css = 'monte-bar-neg';
    }

    return css;
  },

  xProp: 'id',
  yProp: 'value',

  xScale: function xScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false,

  // TODO: Adopt label placement like arc charts?
  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: AxesChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function label(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function labelX(d) {
    return this._barX(d) + this.x.bandwidth() / 2;
  },
  labelYAdjust: function labelYAdjust(d) {
    var value = this.getProp('y', d);

    return value > 0 ? '-0.05em' : '1.05em';
  },
  labelY: function labelY(d) {
    var value = this.getProp('y', d);

    return value > 0 ? this._barY(d) : this._barY(d) + this._barHeight(d);
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

      (_babelHelpers$get2 = get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(BAR)), EVENTS$1));
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
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(BarChart.prototype.__proto__ || Object.getPrototypeOf(BarChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.barCssScale);
      resetScaleDomain(this.opts.barFillScale);
      resetScaleDomain(this.opts.labelFillScale);
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var barGrps = this._updateBars();

      if (this.opts.includeLabels) {
        this.emit(EVENT_UPDATING_LABELS);

        barGrps.each(function (d, i, nodes) {
          var node = d3.select(nodes[i]);
          _this3._updateBarLabel(node, d, i, nodes);
        });

        this.emit(EVENT_UPDATED_LABELS);
      }
    }
  }, {
    key: '_updateBars',
    value: function _updateBars() {
      var _this4 = this;

      var barGrps = this.draw.selectAll('.monte-bar-grp').data(this.displayData, this.opts.dataKey);

      var barX = this._barX.bind(this);
      var barY = this._barY.bind(this);
      var barWidth = this._barWidth.bind(this);
      var barHeight = this._barHeight.bind(this);

      // Create new bar groups
      barGrps.enter().append('g').attr('class', function (d, i) {
        return _this4._buildCss(['monte-bar-grp', _this4.opts.barGrpCss], d, i);
      }).append('rect').call(this.__bindCommonEvents(BAR)).style('opacity', 0).attr('x', barX).attr('y', barY).attr('width', barWidth).attr('height', barHeight).style('fill', this.optionReaderFunc('barFillScaleAccessor')).attr('class', function (d, i) {
        return _this4._buildCss(['monte-bar', _this4.opts.barCss, _this4.opts.barCssScaleAccessor, d.css], d, i);
      }).call(function (sel) {
        return _this4.fnInvoke(_this4.opts.barEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(BAR, ENTER)).style('opacity', 1).attr('x', barX).attr('y', barY).attr('width', barWidth).attr('height', barHeight).call(function (t) {
        return _this4.fnInvoke(_this4.opts.barEnterTransitionCustomize, t);
      });

      // Update existing bar groups
      barGrps.attr('class', function (d, i) {
        return _this4._buildCss(['monte-bar-grp', _this4.opts.barGrpCss], d, i);
      }).select('rect').style('fill', this.optionReaderFunc('barFillScaleAccessor')).attr('class', function (d, i) {
        return _this4._buildCss(['monte-bar', _this4.opts.barCss, _this4.opts.barCssScaleAccessor, d.css], d, i);
      }).call(function (sel) {
        return _this4.fnInvoke(_this4.opts.barUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(BAR, UPDATE)).attr('x', barX).attr('y', barY).attr('width', barWidth).attr('height', barHeight).style('opacity', 1).call(function (t) {
        return _this4.fnInvoke(_this4.opts.barUpdateTransitionCustomize, t);
      });

      // Fade out removed lines.
      barGrps.exit().call(function (sel) {
        return _this4.fnInvoke(_this4.opts.barExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(BAR, EXIT)).style('opacity', 0).call(function (t) {
        return _this4.fnInvoke(_this4.opts.barExitTransitionCustomize, t);
      }).remove();

      // Here the order is important. Merging the line groups when only an update occurs results in an
      // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
      return barGrps.merge(barGrps.enter().selectAll('.monte-bar-grp'));
    }
  }, {
    key: '_updateBarLabel',
    value: function _updateBarLabel(barGrp, d, i, nodes) {
      var _this5 = this;

      var lbl = barGrp.selectAll('.monte-bar-label').data([d]);

      lbl.enter().append('text').attr('class', 'monte-bar-label').style('opacity', 0).style('fill', function (d1) {
        return _this5.tryInvoke(_this5.opts.labelFillScaleAccessor, d1, i, nodes);
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
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.labelEnterSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this5._transitionSettings(LABEL, ENTER);
        _this5._transitionConfigure(t, ts, d, i, nodes);
      }).style('opacity', 1).call(function (t) {
        return _this5.fnInvoke(_this5.opts.labelEnterTransitionCustomize, t);
      });

      lbl.style('fill', function (d1) {
        return _this5.tryInvoke(_this5.opts.labelFillScaleAccessor, d1, i, nodes);
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
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.labelUpdateSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this5._transitionSettings(LABEL, UPDATE);
        _this5._transitionConfigure(t, ts, d, i, nodes);
      }).style('opacity', 1).call(function (t) {
        return _this5.fnInvoke(_this5.opts.labelUpdateTransitionCustomize, t);
      });

      lbl.exit().call(function (sel) {
        return _this5.fnInvoke(_this5.opts.labelExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(LABEL, EXIT)).call(function (t) {
        return _this5.fnInvoke(_this5.opts.labelExitTransitionCustomize, t);
      }).remove();
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
      var value = this.getProp('y', d);

      return value < 0 ? this.y(0) : this.getScaledProp('y', d);
    }
  }, {
    key: '_barHeight',
    value: function _barHeight(d) {
      if (this.y.domain()[0] < 0) {
        // extent includes negative values
        return Math.abs(this.height - this.getScaledProp('y', d) - this.y(0));
      }

      return this.height - this.getScaledProp('y', d);
    }
  }]);
  return BarChart;
}(AxesChart);

BarChart.EVENTS = EVENTS$1;

var HBAR_CHART_DEFAULTS = {
  chartCss: 'monte-horizontal-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 40,
    left: 40
  },

  barCssScaleAccessor: BarChart.generateScaleAccessor('barCssScale', 'y'),
  barFillScaleAccessor: BarChart.generateScaleAccessor('barFillScale', 'y'),

  xProp: 'value',
  yProp: 'id',

  xScale: d3.scaleLinear,
  yScale: function yScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,

  barGrpCss: function barGrpCss(d) {
    var value = this.getProp('x', d);
    var css = 'monte-bar-zero';

    if (value > 0) {
      css = 'monte-bar-pos';
    } else if (value < 0) {
      css = 'monte-bar-neg';
    }

    return css;
  },

  labelX: function labelX(d) {
    var value = this.getProp('x', d);

    return value > 0 ? this._barWidth(d) + this._barX(d) : this._barX(d);
  },
  labelXAdjust: '',
  labelY: function labelY(d) {
    return this._barY(d) + this.y.bandwidth() / 2;
  },
  labelYAdjust: '0.35em'
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
    value: function _barX(d) {
      var value = this.getProp('x', d);

      return value > 0 ? this.x(0) : this.x(0) - this._barWidth(d);
    }
  }, {
    key: '_barWidth',
    value: function _barWidth(d) {
      return Math.abs(this.getScaledProp('x', d) - this.x(0));
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
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
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

      this.rawData = data;

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(SimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(SimpleBarChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, [datum]].concat(tail));
    }
  }, {
    key: '_update',
    value: function _update() {
      get(SimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(SimpleBarChart.prototype), '_update', this).call(this);

      this._updateSupport();
    }
  }, {
    key: '_updateSupport',
    value: function _updateSupport() {
      var _this2 = this;

      var barSupport = { bottom: this.y.domain()[1], top: this.y.domain()[0] };
      var bgBar = this.bg.selectAll('.monte-bar-bg').data([barSupport]);
      var frame = this.draw.selectAll('.monte-frame').data([barSupport]);

      bgBar.enter().append('rect').attr('class', 'monte-simple-bar-bg').merge(bgBar).attr('x', 0).attr('y', function (d) {
        return _this2.y(d.bottom);
      }).attr('width', this.x.bandwidth()).attr('height', function (d) {
        return _this2.y(d.top);
      });

      bgBar.exit().remove();

      frame.enter().append('rect').attr('class', 'monte-simple-bar-frame').merge(frame).attr('x', 0).attr('y', function (d) {
        return _this2.y(d.bottom);
      }).attr('width', this.x.bandwidth()).attr('height', function (d) {
        return _this2.y(d.top);
      });

      frame.exit().remove();
    }
  }]);
  return SimpleBarChart;
}(BarChart);

var SIMPLE_HORT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-simple-horizontal-bar-chart',
  boundingWidth: 100,
  boundingHeight: 10,

  margin: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
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

      this.rawData = data;

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(HorizontalSimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalSimpleBarChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, [datum]].concat(tail));
    }
  }, {
    key: '_update',
    value: function _update() {
      get(HorizontalSimpleBarChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalSimpleBarChart.prototype), '_update', this).call(this);

      this._updateSupport();
    }
  }, {
    key: '_updateSupport',
    value: function _updateSupport() {
      var _this2 = this;

      var barSupport = { left: this.x.domain()[0], right: this.x.domain()[1] };
      var bgBar = this.bg.selectAll('.monte-bar-bg').data([barSupport]);
      var frame = this.draw.selectAll('.monte-frame').data([barSupport]);

      bgBar.enter().append('rect').attr('class', 'monte-simple-bar-bg').merge(bgBar).attr('x', function (d) {
        return _this2.y(d.left);
      }).attr('y', 0).attr('width', function (d) {
        return _this2.x(d.right);
      }).attr('height', this.y.bandwidth());

      bgBar.exit().remove();

      frame.enter().append('rect').attr('class', 'monte-simple-bar-frame').merge(frame).attr('x', function (d) {
        return _this2.y(d.left);
      }).attr('y', 0).attr('width', function (d) {
        return _this2.x(d.right);
      }).attr('height', this.y.bandwidth());

      frame.exit().remove();
    }
  }]);
  return HorizontalSimpleBarChart;
}(HorizontalBarChart);

var _SEGMENT_BAR_MODE_CSS;

var SEGMENT_BAR_MODE = {
  GROUPED: 'grouped',
  STACKED: 'stacked'
};

var SEGMENT_BAR_MODE_CSS_MAP = (_SEGMENT_BAR_MODE_CSS = {}, defineProperty(_SEGMENT_BAR_MODE_CSS, SEGMENT_BAR_MODE.GROUPED, 'monte-segment-mode-grouped'), defineProperty(_SEGMENT_BAR_MODE_CSS, SEGMENT_BAR_MODE.STACKED, 'monte-segment-mode-stacked'), _SEGMENT_BAR_MODE_CSS);

var EVENT_MODE_CHANGING = 'modeChanging';
var EVENT_MODE_CHANGED = 'modeChanged';
var EVENTS$2 = [EVENT_MODE_CHANGING, EVENT_MODE_CHANGED];

var BARSEG = 'barseg';
var BARGRP = 'bargrp';
var LABEL$1 = 'label';

var SEGMENT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-segment-bar-chart',
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
  xInnerProp: 'id',
  yInnerProp: 'value',

  xInnerScale: function xInnerScale() {
    return d3.scaleBand().paddingInner(0.1).paddingOuter(0.1).round(true);
  },

  barSegCssScale: noop,
  barSegCssScaleAccessor: AxesChart.generateScaleAccessor('barSegCssScale', 'x'),
  barSegFillScale: noop,
  barSegFillScaleAccessor: AxesChart.generateScaleAccessor('barSegFillScale', 'x'),

  xScale: function xScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false,

  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: AxesChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function label(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function labelX(d) {
    var mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this.x.bandwidth() / 2;
    } else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barXInnerGrouped(d) + this.xInner.bandwidth() / 2;
    }
  },
  labelYAdjust: '1.05em',
  labelY: function labelY(d, i, nodes, allNodes) {
    var mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this._barYInnerStacked(d, i, nodes, allNodes);
    } else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barYInnerGrouped(d);
    }
  },

  innerDataKey: defaultDataKey
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

      (_babelHelpers$get2 = get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(BARGRP)), toConsumableArray(commonEventNames(BARSEG)), EVENTS$2));
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
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(SegmentBarChart.prototype.__proto__ || Object.getPrototypeOf(SegmentBarChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.barSegCssScale);
      resetScaleDomain(this.opts.barSegFillScale);
      resetScaleDomain(this.opts.labelFillScale);
    }
  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.option('segmentBarMode', mode);
      this.emit(EVENT_MODE_CHANGING);
      this.updateAxesDomains();
      this.renderAxes();
      this.update();
      this.emit(EVENT_MODE_CHANGED);

      return this;
    }
  }, {
    key: 'mode',
    value: function mode(_mode) {
      if (_mode) {
        return this.setMode(_mode);
      }

      return this.tryInvoke(this.opts.segmentBarMode);
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

      // TODO: Find all X inner values to build domain.
      // TODO: Should this be `yProp` or `xProp`?
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
  }, {
    key: '_render',
    value: function _render() {
      var mode = this.tryInvoke(this.opts.segmentBarMode);
      var classToAdd = SEGMENT_BAR_MODE_CSS_MAP[mode];

      this.classed(classToAdd, true);
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      var _this5 = this;

      var mode = this.tryInvoke(this.opts.segmentBarMode);
      var classesToRemove = nonMatchingMapValues(SEGMENT_BAR_MODE_CSS_MAP, mode);
      var classToAdd = SEGMENT_BAR_MODE_CSS_MAP[mode];
      var barGrps = void 0;

      this.classed(classToAdd, true);

      if (mode === SEGMENT_BAR_MODE.STACKED) {
        barGrps = this._updateStackedBars();
      } else if (mode === SEGMENT_BAR_MODE.GROUPED) {
        barGrps = this._updateGroupedBars();
      } else {
        throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
      }

      if (this.opts.includeLabels && barGrps && barGrps.size()) {
        this._updateLabels(barGrps);
      }

      classesToRemove.forEach(function (classToRemove) {
        return _this5.classed(classToRemove, false);
      });
    }
  }, {
    key: '_updateStackedBars',
    value: function _updateStackedBars() {
      var barXInner = this._barXInnerStacked.bind(this);
      var barYInner = this._barYInnerStacked.bind(this);
      var barWidth = this._barWidthStacked.bind(this);
      var barHeight = this._barHeightStacked.bind(this);

      return this._updateBars(barXInner, barYInner, barWidth, barHeight);
    }
  }, {
    key: '_updateGroupedBars',
    value: function _updateGroupedBars() {
      var barXInner = this._barXInnerGrouped.bind(this);
      var barYInner = this._barYInnerGrouped.bind(this);
      var barWidth = this._barWidthGrouped.bind(this);
      var barHeight = this._barHeightGrouped.bind(this);

      return this._updateBars(barXInner, barYInner, barWidth, barHeight);
    }
  }, {
    key: '_updateBars',
    value: function _updateBars(barXInner, barYInner, barWidth, barHeight) {
      var _this6 = this;

      var barGrps = this.draw.selectAll('.monte-segment-bar-grp').data(this.displayData, this.opts.dataKey);

      var fns = { barXInner: barXInner, barYInner: barYInner, barWidth: barWidth, barHeight: barHeight };
      var barGrpsEnter = barGrps.enter().append('g').attr('class', 'monte-segment-bar-grp').call(this.__bindCommonEvents(BARGRP));
      this._updateBarSelection(barGrps.merge(barGrpsEnter), fns);

      // TODO: Should this have transitions? Only have a delay?
      barGrps.exit().call(function (sel) {
        return _this6.fnInvoke(_this6.opts.bargrpExitSelectionCustomize, sel);
      }).transition().call(function (t) {
        var settings = _this6._transitionSettings(BARGRP, EXIT);
        t.delay(_this6.tryInvoke(settings.delay));
      }).call(function (t) {
        return _this6.fnInvoke(_this6.opts.bargrpExitTransitionCustomize, t);
      }).remove();

      return barGrps.merge(barGrps.enter().selectAll('.monte-segment-bar-grp'));
    }
  }, {
    key: '_updateBarSelection',
    value: function _updateBarSelection(barGrps, fns) {
      var _this7 = this;

      var translate = this._barGroupTranslate.bind(this);

      barGrps.attr('transform', function (d) {
        return 'translate(' + translate(d) + ')';
      }).each(function (d, i, nodes) {
        var prop = _this7._barProp();
        var nestedData = d[prop];
        var n = d3.select(nodes[i]);
        var innerRects = n.selectAll('.monte-segment-bar-seg').data(nestedData, _this7.opts.innerDataKey);

        var innerRectsEnter = innerRects.enter().append('rect');
        var innerRectsEnterUpdate = innerRects.merge(innerRectsEnter);

        // Enter
        innerRectsEnter.call(_this7.__bindCommonEvents(BARSEG)).style('opacity', 0).style('fill', _this7.optionReaderFunc('barSegFillScaleAccessor')).attr('class', function (d, i) {
          return _this7._buildCss(['monte-segment-bar-seg', _this7.opts.barSegCss, _this7.opts.barSegCssScaleAccessor, d.css], d, i);
        }).attr('x', 0).attr('y', 0).attr('width', 0).attr('height', 0).call(function (sel) {
          return _this7.fnInvoke(_this7.opts.barsegEnterSelectionCustomize, sel);
        }).transition().call(_this7._transitionSetup(BARSEG, ENTER), d, i, nodes).attr('x', function (d, i, nodes) {
          return fns.barXInner(d, i, nodes, innerRectsEnterUpdate.nodes());
        }).attr('y', function (d, i, nodes) {
          return fns.barYInner(d, i, nodes, innerRectsEnterUpdate.nodes());
        }).attr('width', fns.barWidth).attr('height', fns.barHeight).style('opacity', 1).call(function (t) {
          return _this7.fnInvoke(_this7.opts.barsegEnterTransitionCustomize, t);
        });

        // Update
        innerRects.attr('class', function (d, i) {
          return _this7._buildCss(['monte-segment-bar-seg', _this7.opts.barSegCss, _this7.opts.barSegCssScaleAccessor, d.css], d, i);
        }).call(function (sel) {
          return _this7.fnInvoke(_this7.opts.barsegUpdateSelectionCustomize, sel);
        }).transition().call(_this7._transitionSetup(BARSEG, UPDATE), d, i, nodes).style('fill', _this7.optionReaderFunc('barSegFillScaleAccessor')).attr('x', function (d, i, nodes) {
          return fns.barXInner(d, i, nodes, innerRectsEnterUpdate.nodes());
        }).attr('y', function (d, i, nodes) {
          return fns.barYInner(d, i, nodes, innerRectsEnterUpdate.nodes());
        }).attr('width', fns.barWidth).attr('height', fns.barHeight).style('opacity', 1).call(function (t) {
          return _this7.fnInvoke(_this7.opts.barsegUpdateTransitionCustomize, t);
        });

        // Exit
        innerRects.exit().call(function (sel) {
          return _this7.fnInvoke(_this7.opts.barsegExitSelectionCustomize, sel);
        }).transition().call(_this7._transitionSetup(BARSEG, EXIT), d, i, nodes).call(function (t) {
          return _this7.fnInvoke(_this7.opts.barsegExitTransitionCustomize, t);
        }).remove();
      });
    }
  }, {
    key: '_segLabels',
    value: function _segLabels(d) {
      return this.getProp('y', d);
    }
  }, {
    key: '_updateLabels',
    value: function _updateLabels(barGrps) {
      var _this8 = this;

      barGrps.each(function (d, i, nodes) {
        var barGrp = d3.select(nodes[i]);
        _this8._updateBarSegLabels(barGrp, d, i, nodes);
      });
    }

    // TODO: Move labels into segment bar grps (a new nested for the rect and label to live together)?

  }, {
    key: '_updateBarSegLabels',
    value: function _updateBarSegLabels(barGrp, barData, barIndex, barNodes) {
      var _this9 = this;

      var lbls = barGrp.selectAll('.monte-bar-label').data(this._segLabels(barData));
      var enterLbls = lbls.enter().append('text').attr('class', 'monte-bar-label');
      var allNodes = enterLbls.merge(lbls);

      var updateLabels = function updateLabels(sel, mode) {
        sel.text(function (d, i, nodes) {
          return _this9.tryInvoke(_this9.opts.label, d, i, nodes);
        }).call(function (sel) {
          return sel.raise();
        }).call(function (sel) {
          return _this9.fnInvoke(_this9.opts.labelUpdateSelectionCustomize, sel);
        }).transition().call(_this9._transitionSetup(LABEL$1, mode), barData, barIndex, barNodes).style('fill', _this9.optionReaderFunc('labelFillScaleAccessor')).attr('x', function (d, i, nodes) {
          return _this9.tryInvoke(_this9.opts.labelX, d, i, nodes, allNodes.nodes());
        }).attr('y', function (d, i, nodes) {
          return _this9.tryInvoke(_this9.opts.labelY, d, i, nodes, allNodes.nodes());
        }).attr('dx', _this9.optionReaderFunc('labelXAdjust')).attr('dy', _this9.optionReaderFunc('labelYAdjust')).call(function (t) {
          return _this9.fnInvoke(_this9.opts.labelUpdateTransitionCustomize, t);
        });
      };

      updateLabels(enterLbls, ENTER);
      updateLabels(lbls, UPDATE);

      lbls.exit().call(function (sel) {
        return _this9.fnInvoke(_this9.opts.labelUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(LABEL$1, EXIT), barData, barIndex, barNodes).style('opacity', 0).call(function (t) {
        return _this9.fnInvoke(_this9.opts.labelUpdateTransitionCustomize, t);
      }).remove();
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
    value: function _barYInnerStacked(d, i, nodes, allNodes) {
      var baseY = this.getScaledProp('y', 'yInner', d);
      var yShift = 0;

      // New nodes have to account for the presence of old nodes therefore y-shifts are accounted for
      // using `allNodes`.
      for (var j = 0; j < i; j++) {
        var n = d3.select(allNodes[j]);
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
  }], [{
    key: 'createInstanceGroup',
    value: function createInstanceGroup(charts) {
      var _babelHelpers$get3;

      for (var _len3 = arguments.length, additionalMethodsToProxy = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        additionalMethodsToProxy[_key3 - 1] = arguments[_key3];
      }

      additionalMethodsToProxy.push(GROUP_PROXY_METHODS$2);
      return (_babelHelpers$get3 = get(SegmentBarChart.__proto__ || Object.getPrototypeOf(SegmentBarChart), 'createInstanceGroup', this)).call.apply(_babelHelpers$get3, [this, charts].concat(additionalMethodsToProxy));
    }
  }]);
  return SegmentBarChart;
}(AxesChart);

SegmentBarChart.EVENTS = EVENTS$2;

var GROUP_PROXY_METHODS$2 = ['setMode', 'updateAxesRanges'];

/**
 * Get the values of all the keys that don't match
 */
function nonMatchingMapValues(map, keyToExclude) {
  var values = [];

  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      if (key !== keyToExclude) {
        values.push(map[key]);
      }
    }
  }

  return values;
}

var HSEGMENT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-horizontal-segment-bar-chart',
  barSegmentCss: 'bar-segment',

  margin: {
    top: 0,
    right: 10,
    bottom: 20,
    left: 40
  },

  segmentBarMode: SEGMENT_BAR_MODE.STACKED,

  barSegCssScaleAccessor: SegmentBarChart.generateScaleAccessor('barSegCssScale', 'y'),
  barSegFillScaleAccessor: SegmentBarChart.generateScaleAccessor('barSegFillScale', 'y'),

  yProp: 'id',
  xProp: 'values',
  yInnerProp: 'id',
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

  labelXAdjust: '-0.1em',
  labelX: function labelX(d, i, nodes, allNodes) {
    var mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this._barXInnerStacked(d, i, nodes, allNodes) + this._barWidthStacked(d);
    } else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barWidthGrouped(d);
    }
  },
  labelYAdjust: '0.35em',
  labelY: function labelY(d) {
    var mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this.y.bandwidth() / 2;
    } else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barYInnerGrouped(d) + this.yInner.bandwidth() / 2;
    }
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

      // TODO: Find all Y inner values to build domain.
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
    key: '_segLabels',
    value: function _segLabels(d) {
      return this.getProp('x', d);
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
    value: function _barXInnerStacked(d, i, nodes, allNodes) {
      var baseX = 0;
      var xShift = 0;

      for (var j = 0; j < i; j++) {
        var n = d3.select(allNodes[j]);
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

var EVENT_UPDATING_LABELS$1 = 'updatingLabels';
var EVENT_UPDATED_LABELS$1 = 'updatedLabels';

var EVENTS$3 = [EVENT_UPDATING_LABELS$1, EVENT_UPDATED_LABELS$1];

var CAT = 'cat';
var SPAN = 'span';
var LABEL$2 = 'label';

var SPAN_CHART_DEFAULTS = {
  chartCss: 'monte-vertical-span-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 40
  },

  spanCssScale: noop,
  spanCssScaleAccessor: AxesChart.generateScaleAccessor('spanCssScale', 'x'),

  spanFillScale: noop,
  spanFillScaleAccessor: AxesChart.generateScaleAccessor('spanFillScale', 'x'),

  // Static CSS class(es) to apply to every line.
  spanCss: 'span',
  spanGrpCss: noop,

  xProp: 'id',
  valuesProp: 'values',
  y1Prop: 'startValue',
  y2Prop: 'endValue',

  xScale: function xScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false, // false = neither, true = both, otherwise: 'start' or 'end' for one.

  // TODO: Adopt label placement like arc charts?
  labelStartProp: 'startValue',
  labelStartFillScale: noop,
  labelStartFillScaleAccessor: AxesChart.generateScaleAccessor('labelStartFillScale', 'labelStart'),
  labelStart: function labelStart(d) {
    return this.getProp('labelStart', d);
  },
  labelStartXAdjust: '',
  labelStartX: function labelStartX(d, i, node, catDatum) {
    return this._spanX(catDatum, d) + this.x.bandwidth() / 2;
  },
  labelStartYAdjustProp: 'y2',
  labelStartYAdjust: function labelStartYAdjust(d) {
    var value = this.getProp('y2', d);

    return value > 0 ? '-0.05em' : '1.05em';
  },
  labelStartY: function labelStartY(d, i, node, catDatum) {
    var value = this.getProp('y2', d);

    return value > 0 ? this._spanY(catDatum, d) + this._spanHeight(catDatum, d) : this._spanY(catDatum, d);
  },

  labelEndProp: 'endValue',
  labelEndFillScale: noop,
  labelEndFillScaleAccessor: AxesChart.generateScaleAccessor('labelEndFillScale', 'labelEnd'),
  labelEnd: function labelEnd(d) {
    return this.getProp('labelEnd', d);
  },
  labelEndXAdjust: '',
  labelEndX: function labelEndX(d, i, node, catDatum) {
    return this._spanX(catDatum, d) + this.x.bandwidth() / 2;
  },
  labelEndYAdjustProp: 'y2',
  labelEndYAdjust: function labelEndYAdjust(d) {
    var value = this.getProp('y2', d);

    return value > 0 ? '-0.05em' : '1.05em';
  },
  labelEndY: function labelEndY(d, i, node, catDatum) {
    var value = this.getProp('y2', d);

    return value > 0 ? this._spanY(catDatum, d) : this._spanY(catDatum, d) + this._spanHeight(catDatum, d);
  },

  innerDataKey: defaultDataKey,

  transition: defineProperty({}, CAT, {
    duration: 0,
    delay: 0
  })
};

var VerticalSpanChart = function (_AxesChart) {
  inherits(VerticalSpanChart, _AxesChart);

  function VerticalSpanChart() {
    classCallCheck(this, VerticalSpanChart);
    return possibleConstructorReturn(this, (VerticalSpanChart.__proto__ || Object.getPrototypeOf(VerticalSpanChart)).apply(this, arguments));
  }

  createClass(VerticalSpanChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(VerticalSpanChart.prototype.__proto__ || Object.getPrototypeOf(VerticalSpanChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SPAN_CHART_DEFAULTS]));
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(VerticalSpanChart.prototype.__proto__ || Object.getPrototypeOf(VerticalSpanChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(SPAN)), EVENTS$3));
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var _this2 = this;

      var extent = null;

      if (scaleName === 'y') {
        (function () {
          var y1Values = [];
          var y2Values = [];

          data.forEach(function (d) {
            return _this2.getProp('values', d).forEach(function (v) {
              y1Values.push(_this2.getProp('y1', v));
              y2Values.push(_this2.getProp('y2', v));
            });
          });

          extent = d3.extent([d3.min(y1Values), d3.min(y1Values), d3.max(y2Values), d3.max(y2Values)]);
        })();
      } else if (scaleName === 'x') {
        extent = data.map(function (d) {
          return _this2.getProp('x', d);
        });
      }

      return extent;
    }
  }, {
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(VerticalSpanChart.prototype.__proto__ || Object.getPrototypeOf(VerticalSpanChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.spanCssScale);
      resetScaleDomain(this.opts.spanFillScale);
      resetScaleDomain(this.opts.labelFillScale);
    }

    // Render the vis.

  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var self = this;
      var spanCats = this.draw.selectAll('.monte-span-cat').data(this.displayData, this.opts.dataKey);

      var doUpdate = function doUpdate(d, i, nodes) {
        var catSel = d3.select(nodes[i]);
        self._updateSpans(catSel, d);

        if (_this3.opts.includeLabels) {
          _this3.emit(EVENT_UPDATING_LABELS$1);

          catSel.selectAll('.monte-span-grp').each(function (d, i, nodes) {
            var node = d3.select(nodes[i]);

            if (_this3.opts.includeLabels === true || _this3.opts.includeLabels === 'start') {
              _this3._updateSpanLabel(node, d, i, nodes, 'labelStart');
            }

            if (_this3.opts.includeLabels === true || _this3.opts.includeLabels === 'end') {
              _this3._updateSpanLabel(node, d, i, nodes, 'labelEnd');
            }
          });

          _this3.emit(EVENT_UPDATED_LABELS$1);
        }
      };

      // Create new groupings
      spanCats.enter().append('g').attr('class', function (d, i) {
        return _this3._buildCss(['monte-span-cat', _this3.opts.spanGrpCss], d, i);
      }).call(function (sel) {
        return _this3.fnInvoke(_this3.opts.catEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(CAT, ENTER)).call(function (t) {
        return _this3.fnInvoke(_this3.opts.catEnterTransitionCustomize, t);
      }).each(function (d, i, nodes) {
        if (d3.active(this)) {
          d3.active(this).on('end', doUpdate);
        } else {
          doUpdate(d, i, nodes);
        }
      });

      // Update
      spanCats.each(doUpdate);

      // Remove a grouping
      spanCats.exit().call(function (sel) {
        return _this3.fnInvoke(_this3.opts.catExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(CAT, EXIT)).call(function (t) {
        return _this3.fnInvoke(_this3.opts.catExitTransitionCustomize, t);
      })
      // TODO: Calculate value or sync events?
      .remove();

      return spanCats.merge(spanCats.enter().selectAll('.monte-span-cat'));
    }
  }, {
    key: '_updateSpans',
    value: function _updateSpans(spanCat, catDatum) {
      var _this4 = this;

      var values = this.getProp('values', catDatum);
      var spanGrps = spanCat.selectAll('.monte-span-grp').data(values);

      var spanX = this._spanX.bind(this, catDatum);
      var spanY = this._spanY.bind(this, catDatum);
      var spanWidth = this._spanWidth.bind(this, catDatum);
      var spanHeight = this._spanHeight.bind(this, catDatum);

      // Create new span groups
      spanGrps.enter().append('g').attr('class', function (d, i) {
        return _this4._buildCss(['monte-span-grp', _this4.opts.spanGrpCss], d, i);
      }).append('rect').call(this.__bindCommonEvents(SPAN)).style('opacity', 0).attr('x', spanX).attr('y', spanY).attr('width', spanWidth).attr('height', spanHeight).style('fill', this.optionReaderFunc('spanFillScaleAccessor')).attr('class', function (d, i) {
        return _this4._buildCss(['monte-span', _this4.opts.spanCss, _this4.opts.spanCssScaleAccessor, d.css], d, i);
      }).call(function (sel) {
        return _this4.fnInvoke(_this4.opts.spanEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(SPAN, ENTER)).style('opacity', 1).attr('x', spanX).attr('y', spanY).attr('width', spanWidth).attr('height', spanHeight).call(function (t) {
        return _this4.fnInvoke(_this4.opts.spanEnterTransitionCustomize, t);
      });

      // Update existing span groups
      spanGrps.attr('class', function (d, i) {
        return _this4._buildCss(['monte-span-grp', _this4.opts.spanGrpCss], d, i);
      }).select('rect').style('fill', this.optionReaderFunc('spanFillScaleAccessor')).attr('class', function (d, i) {
        return _this4._buildCss(['monte-span', _this4.opts.spanCss, _this4.opts.spanCssScaleAccessor, d.css], d, i);
      }).call(function (sel) {
        return _this4.fnInvoke(_this4.opts.spanUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(SPAN, UPDATE)).attr('x', spanX).attr('y', spanY).attr('width', spanWidth).attr('height', spanHeight).style('opacity', 1).call(function (t) {
        return _this4.fnInvoke(_this4.opts.spanUpdateTransitionCustomize, t);
      });

      // Fade out removed lines.
      spanGrps.exit().call(function (sel) {
        return _this4.fnInvoke(_this4.opts.spanExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(SPAN, EXIT)).style('opacity', 0).call(function (t) {
        return _this4.fnInvoke(_this4.opts.spanExitTransitionCustomize, t);
      }).remove();

      // Here the order is important. Merging the line groups when only an update occurs results in an
      // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
      return spanGrps.merge(spanGrps.enter().selectAll('.monte-span-grp'));
    }
  }, {
    key: '_updateSpanLabel',
    value: function _updateSpanLabel(spanGrp, d, i, nodes, labelSet) {
      var _this5 = this;

      var labelSetCss = kebabCase(labelSet);
      var lbl = spanGrp.selectAll('.monte-span-label.' + labelSetCss).data([d]);
      var catDatum = d3.select(spanGrp.node().parentNode).datum();

      lbl.enter().append('text').attr('class', 'monte-span-label').classed(labelSetCss, true).style('opacity', 0).style('fill', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'FillScaleAccessor'], d1, i, nodes, catDatum);
      }).attr('x', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'X'], d1, i, nodes, catDatum);
      }).attr('dx', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'XAdjust'], d1, i, nodes, catDatum);
      }).attr('y', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'Y'], d1, i, nodes, catDatum);
      }).attr('dy', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'YAdjust'], d1, i, nodes, catDatum);
      }).text(function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet], d1, i, nodes, catDatum);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts[labelSet + 'EnterSelectionCustomize'], sel);
      }).transition().call(function (t) {
        var ts = _this5._transitionSettings(LABEL$2, ENTER);
        _this5._transitionConfigure(t, ts, d, i, nodes);
      }).style('opacity', 1).call(function (t) {
        return _this5.fnInvoke(_this5.opts[labelSet + 'EnterTransitionCustomize'], t);
      });

      lbl.style('fill', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'FillScaleAccessor'], d1, i, nodes, catDatum);
      }).attr('x', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'X'], d1, i, nodes, catDatum);
      }).attr('dx', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'XAdjust'], d1, i, nodes, catDatum);
      }).attr('y', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'Y'], d1, i, nodes, catDatum);
      }).attr('dy', function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet + 'YAdjust'], d1, i, nodes, catDatum);
      }).text(function (d1) {
        return _this5.tryInvoke(_this5.opts[labelSet], d1, i, nodes, catDatum);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts[labelSet + 'UpdateSelectionCustomize'], sel);
      }).transition().call(function (t) {
        var ts = _this5._transitionSettings(LABEL$2, UPDATE);
        _this5._transitionConfigure(t, ts, d, i, nodes);
      }).style('opacity', 1).call(function (t) {
        return _this5.fnInvoke(_this5.opts[labelSet + 'UpdateTransitionCustomize'], t);
      });

      lbl.exit().call(function (sel) {
        return _this5.fnInvoke(_this5.opts[labelSet + 'ExitSelectionCustomize'], sel);
      }).transition().call(this._transitionSetup(LABEL$2, EXIT)).call(function (t) {
        return _this5.fnInvoke(_this5.opts[labelSet + 'ExitTransitionCustomize'], t);
      }).remove();
    }
  }, {
    key: '_spanX',
    value: function _spanX(catDatum) {
      return this.getScaledProp('x', catDatum);
    }
  }, {
    key: '_spanWidth',
    value: function _spanWidth() {
      return this.x.bandwidth();
    }
  }, {
    key: '_spanY',
    value: function _spanY(catDatum, d) {
      return this.getScaledProp('y', 'y2', d);
    }
  }, {
    key: '_spanHeight',
    value: function _spanHeight(catDatum, d) {
      return this.getScaledProp('y', 'y1', d) - this.getScaledProp('y', 'y2', d);
    }
  }]);
  return VerticalSpanChart;
}(AxesChart);

VerticalSpanChart.EVENTS = EVENTS$3;

var HSPAN_CHART_DEFAULTS = {
  chartCss: 'monte-horizontal-span-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 40,
    left: 40
  },

  spanCssScaleAccessor: VerticalSpanChart.generateScaleAccessor('spanCssScale', 'y'),
  spanFillScaleAccessor: VerticalSpanChart.generateScaleAccessor('spanFillScale', 'y'),

  x1Prop: 'startValue',
  x2Prop: 'endValue',
  yProp: 'id',

  // Clear VerticalSpanChart's inherited values
  yProp1: null,
  yProp2: null,

  xScale: d3.scaleLinear,
  yScale: function yScale() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,

  labelStartX: function labelStartX(d, i, node, catDatum) {
    var value = this.getProp('x', d);

    return value > 0 ? this._spanWidth(catDatum, d) + this._spanX(catDatum, d) : this._spanX(catDatum, d);
  },
  labelStartXAdjust: '',
  labelStartY: function labelStartY(d, i, node, catDatum) {
    return this._spanY(catDatum, d) + this.y.bandwidth() / 2;
  },
  labelStartYAdjust: '0.35em',

  labelEndX: function labelEndX(d, i, node, catDatum) {
    var value = this.getProp('x', d);

    return value > 0 ? this._spanX(catDatum, d) : this._spanWidth(catDatum, d) + this._spanX(catDatum, d);
  },
  labelEndXAdjust: '',
  labelEndY: function labelEndY(d, i, node, catDatum) {
    return this._spanY(catDatum, d) + this.y.bandwidth() / 2;
  },
  labelEndYAdjust: '0.35em'
};

var HorizontalSpanChart = function (_VerticalSpanChart) {
  inherits(HorizontalSpanChart, _VerticalSpanChart);

  function HorizontalSpanChart() {
    classCallCheck(this, HorizontalSpanChart);
    return possibleConstructorReturn(this, (HorizontalSpanChart.__proto__ || Object.getPrototypeOf(HorizontalSpanChart)).apply(this, arguments));
  }

  createClass(HorizontalSpanChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(HorizontalSpanChart.prototype.__proto__ || Object.getPrototypeOf(HorizontalSpanChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [HSPAN_CHART_DEFAULTS]));
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data, scaleName) {
      var _this2 = this;

      var extent = null;

      if (scaleName === 'x') {
        (function () {
          var x1Values = [];
          var x2Values = [];

          data.forEach(function (d) {
            return _this2.getProp('values', d).forEach(function (v) {
              x1Values.push(_this2.getProp('x1', v));
              x2Values.push(_this2.getProp('x2', v));
            });
          });

          extent = d3.extent([d3.min(x1Values), d3.min(x1Values), d3.max(x2Values), d3.max(x2Values)]);
        })();
      } else if (scaleName === 'y') {
        extent = data.map(function (d) {
          return _this2.getProp('y', d);
        });
      }

      return extent;
    }
  }, {
    key: '_spanX',
    value: function _spanX(catDatum, d) {
      return this.getScaledProp('x', 'x1', d);
    }
  }, {
    key: '_spanWidth',
    value: function _spanWidth(catDatum, d) {
      return this.getScaledProp('x', 'x2', d) - this.getScaledProp('x', 'x1', d);
    }
  }, {
    key: '_spanY',
    value: function _spanY(catDatum) {
      return this.getScaledProp('y', catDatum);
    }
  }, {
    key: '_spanHeight',
    value: function _spanHeight() {
      return this.y.bandwidth();
    }
  }]);
  return HorizontalSpanChart;
}(VerticalSpanChart);

var POINT$1 = 'point';

var SCATTER_PLOT_DEFAULTS = {
  chartCss: 'monte-scatter-plot',

  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40
  },

  // The size of each point
  pointSize: SYMBOL_SIZE,

  pointProp: '',

  pointFillScale: noop,
  pointFillScaleAccessor: AxesChart.generateScaleAccessor('pointFillScale', 'point'),

  pointStrokeScale: noop,
  pointStrokeScaleAccessor: AxesChart.generateScaleAccessor('pointStrokeScale', 'point'),

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,
  pointCssScaleAccessor: AxesChart.generateScaleAccessor('pointCssScale', 'point'),

  // Static CSS class(es) to apply to every line.
  pointCss: 'monte-point',

  pointSymbol: function pointSymbol(symbol) {
    return symbol.type(d3.symbolCircle);
  }
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

      (_babelHelpers$get2 = get(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(POINT$1))));
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
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(ScatterPlot.prototype.__proto__ || Object.getPrototypeOf(ScatterPlot.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.pointCssScale);
      resetScaleDomain(this.opts.pointFillScale);
      resetScaleDomain(this.opts.pointStrokeScale);
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
      var points = this.draw.selectAll('.monte-point').data(this.displayData, this.opts.dataKey);

      // Create new points and update existing
      var pointsEnter = points.enter().append('path').call(this.__bindCommonEvents(POINT$1));
      this._updatePointsSelection(pointsEnter, ENTER);
      this._updatePointsSelection(points, UPDATE);

      // Fade out removed points.
      points.exit().call(function (sel) {
        return _this2.fnInvoke(_this2.opts.pointExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(POINT$1, EXIT)).style('opacity', 0).call(function (t) {
        return _this2.fnInvoke(_this2.opts.pointExitTransitionCustomize, t);
      }).remove();

      return points.merge(points.enter().selectAll('.point'));
    }
  }, {
    key: '_updatePointsSelection',
    value: function _updatePointsSelection(sel, stage) {
      var _this3 = this;

      var selectionFnName = POINT$1 + upperFirst(stage) + 'SelectionCustomize';
      var transitionFnName = POINT$1 + upperFirst(stage) + 'TransitionCustomize';

      sel.attr('d', function (d, i) {
        var symbase = d3.symbol().size(_this3.opts.pointSize);
        var symbol = _this3.opts.pointSymbol(symbase, d, i);
        return symbol(d, i);
      }).attr('class', function (d, i) {
        return _this3._buildCss(['monte-point', _this3.opts.pointCss, _this3.opts.pointCssScaleAccessor, d.css], d, i);
      }).style('fill', this.optionReaderFunc('pointFillScaleAccessor')).style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor')).call(function (sel) {
        return _this3.fnInvoke(_this3.opts[selectionFnName], sel);
      }).transition().call(this._transitionSetup(POINT$1, stage)).style('fill', this.optionReaderFunc('pointFillScaleAccessor')).style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor')).attr('transform', function (d) {
        return 'translate(' + _this3.getScaledProp('x', d) + ', ' + _this3.getScaledProp('y', d) + ')';
      }).call(function (t) {
        return _this3.fnInvoke(_this3.opts[transitionFnName], t);
      });
    }
  }]);
  return ScatterPlot;
}(AxesChart);

var ICON_MODE = {
  D3_SYMBOL: 'd3Symbol',
  SVG_USE_DEF: 'svgUseDef',
  SVG_USE_EXTERNAL: 'svgUseExternal'
};

var ICON = 'icon';

// TODO: export icon arrangements on Monte object.
var iconArrangeBottomTop = {
  rowIndex: function rowIndex(d, i) {
    return Math.floor(i / this.opts.columns);
  },

  columnIndex: function columnIndex(d, i) {
    return i % this.opts.columns;
  }
};

var iconArrangeTopBottom = {
  rowIndex: function rowIndex(d, i) {
    return this.opts.rows - Math.floor(i / this.opts.columns) - 1;
  },

  columnIndex: function columnIndex(d, i) {
    return i % this.opts.columns;
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

  iconProp: '',
  iconFillScale: noop,
  iconFillScaleAccessor: AxesChart.generateScaleAccessor('iconFillScale', 'icon'),
  iconStrokeScale: noop,
  iconStrokeScaleAccessor: AxesChart.generateScaleAccessor('iconStrokeScale', 'icon'),
  iconCssScale: noop,
  iconCssScaleAccessor: AxesChart.generateScaleAccessor('iconCssScale', 'icon'),
  iconCss: 'icon',
  iconSize: SYMBOL_SIZE,
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

  arrangement: iconArrangeTopBottom,

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

      (_babelHelpers$get2 = get(IconArray.prototype.__proto__ || Object.getPrototypeOf(IconArray.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(ICON))));
    }
  }, {
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(IconArray.prototype.__proto__ || Object.getPrototypeOf(IconArray.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.iconCssScale);
      resetScaleDomain(this.opts.iconFillScale);
      resetScaleDomain(this.opts.iconStrokeScale);
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

      var icons = this.draw.selectAll('.monte-icon').data(this.displayData, this.opts.dataKey);

      modeMap[this.opts.iconMode].call(this, icons, this.opts.iconMode);

      // Fade out removed icons.
      icons.exit().transition().call(this._transitionSetup(ICON, EXIT)).style('opacity', 0).remove();
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

      var merge = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

      var t = icons.enter().append(type).call(this.__bindCommonEvents(ICON))
      // TODO: Split apart merge
      .merge(icons).each(merge).attr('transform', function (d, i, nodes) {
        return transform.call(_this5, d, i, nodes);
      }).attr('class', function (d, i) {
        return _this5._buildCss(['monte-icon', _this5.opts.iconCss, _this5.opts.iconCssScaleAccessor, d.css], d, i);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts.iconUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(ICON, UPDATE)).style('fill', this.optionReaderFunc('iconFillScaleAccessor')).style('stroke', this.optionReaderFunc('iconStrokeScaleAccessor')).call(function (t) {
        return _this5.fnInvoke(_this5.opts.iconUpdateTransitionCustomize, t);
      });

      return t;
    }
  }]);
  return IconArray;
}(AxesChart);

function iconTransform(d, i, nodes) {
  var col = this.tryInvoke(this.opts.arrangement.columnIndex, d, i, nodes);
  var row = this.tryInvoke(this.opts.arrangement.rowIndex, d, i, nodes);
  var x = this.getScaledProp('x', col);
  var y = this.getScaledProp('y', row);

  return 'translate(' + x + ', ' + y + ')';
}

function iconTransformShift(d, i, nodes) {
  var col = this.tryInvoke(this.opts.arrangement.columnIndex, d, i, nodes);
  var row = this.tryInvoke(this.opts.arrangement.rowIndex, d, i, nodes);
  var x = this.getScaledProp('x', col);
  var y = this.getScaledProp('y', row);
  var xShift = this.opts.iconSvgWidth / 2;
  var yShift = this.opts.iconSvgHeight / 2;

  return 'translate(' + (x - xShift) + ', ' + (y - yShift) + ')';
}

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

// https://sites.google.com/site/mymathclassroom/testing-if-two-angles-are-coterminal
function areCoterminalAngles(a1, a2) {
  var n = (a1 - a2) / TAU;

  // Angles are coterminal if n is an integer; otherwise not.
  return Number.isInteger(n);
}

// Placement on an arc given an radius and angle, (cos(a) * r, sin(a) * r)
function getPolarCoord(radius, angle) {
  // In d3-shape the arc `centroid` function uses a 1/2 PI adjustment to account for the starting
  // angle differences between SVG (top) vs traditional polar coordinates (right). The adjustment
  // is repeated here for coordinate consistency.
  var a = angle - HALF_PI;
  return [Math.cos(a) * radius, Math.sin(a) * radius];
}

// * conversion between Radians (rad) and Degrees (deg)
//    -- Also add support for CSS values like `turn` and `grad` (gradians)???

function degreesToRadians(deg) {
  // radians = degrees * (pi/180)
  return deg * (PI / 180);
}

function radiansToDegrees(rad) {
  // degrees = radians * (180/pi)
  return rad * (180 / PI);
}

function arcBisect(startAngle, endAngle) {
  return (startAngle + endAngle) / 2;
}

// Like `arcBisect`, but takes a datum with the fields of `startAngle` and `endAngle`.
function wedgeBisect(d) {
  return arcBisect(d.startAngle, d.endAngle);
}

// Arc is a `d3.arc()` object.
// Expects `from` and `to` to be `{ startAngle: <number>, endAngle: <number> }`
function arcSimpleTween(arc, from, to) {
  var i = d3.interpolate(from, to);

  return function (t) {
    return arc(i(t));
  };
}

// Expects `from` and `to` to be `{ angle: <number>, radius: <number>, rotate: <number> }`
function arcLabelTween(from, to) {
  var defaultRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!from) {
    from = { angle: 0, radius: defaultRadius, rotate: 0 };
  }
  var i = d3.interpolateObject(from, to);

  return function (t) {
    var v = i(t);
    var coord = getPolarCoord(v.radius, v.angle);
    var rotate = v.rotate || 0;

    return 'translate(' + coord + ') rotate(' + rotate + ')';
  };
}

var polarLabelCssPrefix = 'monte-polar-label-';

// NOTE: Radius functions exoect to be invoked in the context of an `Extension` or a `Chart`.
var LABEL_PLACEMENT = {
  CENTROID: {
    css: polarLabelCssPrefix + 'centroid',
    radius: function radius(w, h) {
      var chart = this.chart || this; // Expecting to be invoked from an `Extension` or a `Chart`
      var innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);
      var outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function (d, i, nodes) {
        var ir = chart.tryInvoke(innerRadius, d, i, nodes);
        var or = chart.tryInvoke(outerRadius, d, i, nodes);

        return (ir + or) / 2;
      };
    }
  },

  INNER: {
    css: polarLabelCssPrefix + 'inner',
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function (d, i, nodes) {
        var ir = chart.tryInvoke(innerRadius, d, i, nodes);
        return ir * 0.9;
      };
    }
  },

  INNER_EDGE: {
    css: polarLabelCssPrefix + 'inner-edge',
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function (d, i, nodes) {
        return chart.tryInvoke(innerRadius, d, i, nodes);
      };
    }
  },

  OUTER: {
    css: polarLabelCssPrefix + 'outer',
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function (d, i, nodes) {
        var or = chart.tryInvoke(outerRadius, d, i, nodes);
        return or * 1.1;
      };
    }
  },

  OUTER_EDGE: {
    css: polarLabelCssPrefix + 'outer-edge',
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function (d, i, nodes) {
        return chart.tryInvoke(outerRadius, d, i, nodes);
      };
    }
  }
};

function polarLabelCentroid() {
  return LABEL_PLACEMENT.CENTROID;
}

function polarLabelInner() {
  return LABEL_PLACEMENT.INNER;
}

function polarLabelInnerEdge() {
  return LABEL_PLACEMENT.INNER_EDGE;
}

function polarLabelOuter() {
  return LABEL_PLACEMENT.OUTER;
}

function polarLabelOuterEdge() {
  return LABEL_PLACEMENT.OUTER_EDGE;
}

function polarLabelInnerFactor(factor) {
  return {
    css: polarLabelCssPrefix + 'inner ' + polarLabelCssPrefix + 'inner-x' + factor,
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function (d, i, nodes) {
        var ir = chart.tryInvoke(innerRadius, d, i, nodes);
        return ir * factor;
      };
    }
  };
}

function polarLabelInnerAdjust(adjust) {
  return {
    css: polarLabelCssPrefix + 'inner ' + polarLabelCssPrefix + 'inner-' + adjust,
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var innerRadius = this.tryInvoke(this.option('innerRadius'), w, h);

      return function (d, i, nodes) {
        var ir = chart.tryInvoke(innerRadius, d, i, nodes);
        return ir + adjust;
      };
    }
  };
}

function polarLabelOuterFactor(factor) {
  return {
    css: polarLabelCssPrefix + 'outer ' + polarLabelCssPrefix + 'outer-x' + factor,
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function (d, i, nodes) {
        var or = chart.tryInvoke(outerRadius, d, i, nodes);
        return or * factor;
      };
    }
  };
}

function polarLabelOuterAdjust(adjust) {
  return {
    css: polarLabelCssPrefix + 'outer ' + polarLabelCssPrefix + 'outer-' + adjust,
    radius: function radius(w, h) {
      var chart = this.chart || this;
      var outerRadius = this.tryInvoke(this.option('outerRadius'), w, h);

      return function (d, i, nodes) {
        var or = chart.tryInvoke(outerRadius, d, i, nodes);
        return or + adjust;
      };
    }
  };
}

// Return the datum if it is an object, but if the value is a number (or coercible to a number) than
// create a new object with the expected `startAngle` and `endAngle` properties.
function getDatum(d) {
  return isNumeric(+d) ? { startAngle: d, endAngle: d } : d;
}

//
//
// Base Rotations
//
//
function baseLabelRotateTangentOrigin(angle) {
  return angle;
}

function baseLabelRotateTangentFlip(angle) {
  var absAngle = Math.abs(angle);

  if (absAngle > HALF_PI && absAngle <= 3 * HALF_PI) {
    angle -= PI;
  }

  return angle;
}

function baseLabelRotateRay(angle) {
  return angle - HALF_PI;
}
function baseLabelRotateRayOpposite(angle) {
  return angle - HALF_PI - PI;
}

function baseLabelRotateRayFlip(angle) {
  if (angle <= 0 && angle >= -PI || angle > PI) {
    // Right side of circle
    return angle + HALF_PI;
  } else if (angle > 0 && angle <= PI || angle < -PI) {
    // Left side of circle
    return angle - HALF_PI;
  }

  return angle;
}

function baseLabelRotateNone() {
  return 0;
}

//
//
// Polar Chart Rotations
//
//
// TODO: Add `css` to all rotations
function polarLabelRotateTangentOrigin(d) {
  return baseLabelRotateTangentOrigin(wedgeBisect(getDatum(d)));
}

function polarLabelRotateTangentFlip(d) {
  return baseLabelRotateTangentFlip(wedgeBisect(getDatum(d)));
}

function polarLabelRotateRay(d) {
  return baseLabelRotateRay(wedgeBisect(getDatum(d)));
}

function polarLabelRotateRayOpposite(d) {
  return baseLabelRotateRayOpposite(wedgeBisect(getDatum(d)));
}

function polarLabelRotateRayFlip(d) {
  return baseLabelRotateRayFlip(wedgeBisect(getDatum(d)));
}

function polarLabelRotateNone() {
  return baseLabelRotateNone();
}

//
//
// Gauge Chart Rotations
//
//
function gaugeLabelRotateTangentOrigin(d) {
  return baseLabelRotateTangentOrigin(getDatum(d).endAngle);
}

function gaugeLabelRotateTangentFlip(d) {
  return baseLabelRotateTangentFlip(getDatum(d).endAngle);
}

function gaugeLabelRotateRay(d) {
  return baseLabelRotateRay(getDatum(d).endAngle);
}

function gaugeLabelRotateRayOpposite(d) {
  return baseLabelRotateRayOpposite(getDatum(d).endAngle);
}

function gaugeLabelRotateRayFlip(d) {
  return baseLabelRotateRayFlip(getDatum(d).endAngle);
}

function gaugeLabelRotateNone() {
  return baseLabelRotateNone();
}

// Constrain to smallest draw-area dimension
function radiusContrain(width, height) {
  var wr = width / 2;
  var hr = height / 2;

  return wr < hr ? wr : hr;
}

// Processes the transform string value from a DOM element and returns an object where the keys are
// the transform type and the value the transform value.
//
// NOTE:
// `readTransforms` is limited to having a single type of each transform though multiple are
// technically possible, but considered rare in the context of Monte. See the MDN documentation for
// workarounds if duplicate types are needed: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
//
// TODO: Accept DOM elements and D3 selections?
function readTransforms(t) {
  if (!isDefined(t)) {
    t = '';
  }

  var transformSplit = /(.*?\(.*?\))/;
  var transformRules = t.split(transformSplit).filter(function (v) {
    return !!v;
  });

  var transforms = {};
  var transformPattern = /(.*?)\((.*?)\)\s*/;

  transformRules.forEach(function (rule) {
    var matches = transformPattern.exec(rule.trim());

    if (matches) {
      for (var i = 1; i < matches.length; i += 2) {
        var k = matches[i];
        var v = matches[i + 1].trim();

        if (v.indexOf(' ') > -1 || v.indexOf(',') > -1) {
          v = v.split(/,\s*|\s+/);
        }

        if (isArray$2(v)) {
          // Convert each array element to a number if possible
          for (var j = 0; j < v.length; j++) {
            v[j] = isNumberLike(v[j]) ? +v[j] : v[j];
          }
        } else if (isNumberLike(v)) {
          // Convert value to number if possible.
          v = +v;
        }

        transforms[k] = v;
      }
    }
  });

  return transforms;
}

// Takes an object describing transformations where the keys are the transform type and the value is
// the transform value and returns a string that can be applied to the DOM node. Transforms are
// sorted alphabetically for consistentcy.
//
// NOTE:
// Similar to `readTransforms`, `combineTransforms` can only support single occurrences of a particular
// transform type.
function combineTransforms(transformObj) {
  var transformStrs = [];
  var keys = [];

  for (var t in transformObj) {
    if (transformObj.hasOwnProperty(t)) {
      keys.push(t);
    }
  }

  keys.sort();
  keys.forEach(function (t) {
    var values = isArray$2(transformObj[t]) ? transformObj[t].join(', ') : transformObj[t];
    transformStrs.push(t + '(' + values + ')');
  });

  return transformStrs.join(' ');
}

function removeClassByPattern(selection, pattern) {
  var node = selection.node();
  var classAttr = node.getAttribute('class');
  var classList = classAttr.trim().split(/^|\s+/);

  var re = void 0;

  if (typeof pattern === 'string') {
    re = new RegExp(pattern);
  } else if (pattern instanceof RegExp) {
    re = pattern;
  } else {
    throw MonteError.InvalidArgumentType('removeClassByPattern', 'pattern', 'String or RegExp', pattern);
  }

  classList.forEach(function (c) {
    if (re.test(c)) {
      selection.classed(c, false);
    }
  });
}

var LABEL_CSS_PATTERN = new RegExp('^' + polarLabelCssPrefix + '*');

var EVENT_UPDATING_LABELS$2 = 'updatingLabels';
var EVENT_UPDATED_LABELS$2 = 'updatedLabels';

var EVENTS$4 = [EVENT_UPDATING_LABELS$2, EVENT_UPDATED_LABELS$2];

var WEDGE = 'wedge';
var ARC_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart',

  cornerRadius: 0,
  innerRadius: 0,
  outerRadius: radiusContrain,

  arcCustomize: null,
  arcCss: 'arc',
  arcWedgeCss: 'wedge',
  arcWedgeCssScale: noop,
  arcWedgeCssScaleAccessor: PolarChart.generateScaleAccessor('arcWedgeCssScale', 'itemValue'),
  arcWedgeFillScale: noop,
  arcWedgeFillScaleAccessor: PolarChart.generateScaleAccessor('arcWedgeFillScale', 'itemValue'),
  arcWedgeStrokeScale: noop,
  arcWedgeStrokeScaleAccessor: PolarChart.generateScaleAccessor('arcWedgeStrokeScale', 'itemValue'),

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
  arcBgWedgeCssScaleAccessor: PolarChart.generateScaleAccessor('arcBgWedgeCssScale', 'itemValue'),
  arcBgWedgeFillScale: noop,
  arcBgWedgeFillScaleAccessor: PolarChart.generateScaleAccessor('arcBgWedgeFillScale', 'itemValue'),

  itemValueProp: 'value',
  pieStartAngle: 0,
  pieEndAngle: TAU,
  piePadAngle: 0.02,

  includeLabels: false,
  labelPlacement: polarLabelCentroid,
  labelRotation: polarLabelRotateTangentFlip,
  labelAngle: function labelAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  },

  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: PolarChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function label(d) {
    return this.getProp('label', d.data);
  },
  labelXAdjust: '',
  labelYAdjust: '0.35em',

  dataKey: function dataKey(d, i) {
    return d && d.data && d.data.id || i;
  }
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
      this.arc = d3.arc().cornerRadius(this.tryInvoke(this.opts.cornerRadius));

      this.pie = d3.pie().value(function (d) {
        return _this2.getProp('itemValue', d);
      }).sortValues(null).startAngle(this.tryInvoke(this.opts.pieStartAngle)).endAngle(this.tryInvoke(this.opts.pieEndAngle)).padAngle(this.tryInvoke(this.opts.piePadAngle));
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

      (_babelHelpers$get2 = get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(WEDGE)), EVENTS$4));
    }
  }, {
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.arcWedgeCssScale);
      resetScaleDomain(this.opts.arcWedgeFillScale);
      resetScaleDomain(this.opts.arcWedgeStrokeScale);
      resetScaleDomain(this.opts.arcBgWedgeCssScale);
      resetScaleDomain(this.opts.arcBgWedgeFillScale);
      resetScaleDomain(this.opts.labelFillScale);
    }
  }, {
    key: '_boundsUpdate',
    value: function _boundsUpdate() {
      get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_boundsUpdate', this).call(this);

      this.arc.innerRadius(this.tryInvoke(this.opts.innerRadius, this.width, this.height)).outerRadius(this.tryInvoke(this.opts.outerRadius, this.width, this.height));
    }
  }, {
    key: '_data',
    value: function _data(data) {
      this.pieDisplayData = this.pie(data);
      get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_data', this).call(this, data);
    }
  }, {
    key: '_render',
    value: function _render() {
      if (!this.hasRendered) {
        get(ArcChart.prototype.__proto__ || Object.getPrototypeOf(ArcChart.prototype), '_render', this).call(this);
        this._updateBackground();
      }
    }
  }, {
    key: '_update',
    value: function _update() {
      var arcGrps = this._updateArcs();

      if (this.opts.includeLabels) {
        this._updateLabels(arcGrps);
      }
    }
  }, {
    key: '_updateArcs',
    value: function _updateArcs() {
      var _this3 = this;

      var arcs = this.draw.selectAll('.monte-arc').data(this.pieDisplayData, this.opts.dataKey);
      var arc = this.arc;

      arcs.enter().append('g').attr('class', 'monte-arc ' + this.opts.arcCss).append('path').attr('class', function (d, i) {
        return _this3._buildCss(['monte-arc-wedge', _this3.opts.arcWedgeCss, _this3.opts.arcWedgeCssScaleAccessor, d.data.css], d, i);
      }).call(this.__bindCommonEvents(WEDGE)).call(function (sel) {
        return _this3.fnInvoke(_this3.opts.wedgeEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEDGE, ENTER)).attrTween('d', function (d) {
        var start = _this3.tryInvoke(_this3.opts.arcWedgeEnter, d);
        return arcSimpleTween(arc, start, d);
      }).style('stroke', this.optionReaderFunc('arcWedgeStrokeScaleAccessor')).style('fill', this.optionReaderFunc('arcWedgeFillScaleAccessor')).call(function (sel) {
        return _this3.fnInvoke(_this3.opts.wedgeEnterTransitionCustomize, sel);
      });

      arcs.selectAll('.monte-arc-wedge').each(function () {
        // Sync data to containing element since it is not done automatically.
        var pd = d3.select(this.parentElement).datum();
        var n = d3.select(this);
        var nd = n.datum();
        pd.prev = nd;
        n.datum(pd);

        // TODO: Convert `prev` to use `d3.local` instead?
        delete nd.prev; // Remove old records to prevent building a history tree.
      }).attr('class', function (d, i) {
        return _this3._buildCss(['monte-arc-wedge', _this3.opts.arcWedgeCss, _this3.opts.arcWedgeCssScaleAccessor, d.data.css], d, i);
      }).call(function (sel) {
        return _this3.fnInvoke(_this3.opts.wedgeUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEDGE, UPDATE)).attrTween('d', function (d) {
        return arcSimpleTween(arc, d.prev, d);
      }).style('stroke', this.optionReaderFunc('arcWedgeStrokeScaleAccessor')).style('fill', this.optionReaderFunc('arcWedgeFillScaleAccessor')).call(function (sel) {
        return _this3.fnInvoke(_this3.opts.wedgeUpdateTransitionCustomize, sel);
      });

      arcs.exit().call(function (sel) {
        return _this3.fnInvoke(_this3.opts.wedgeExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEDGE, EXIT)).style('opacity', 0).call(function (sel) {
        return _this3.fnInvoke(_this3.opts.wedgeExitTransitionCustomize, sel);
      }).remove();

      return arcs.merge(arcs.enter().selectAll('.monte-arc'));
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
      var wedge = this.bg.selectAll('.monte-arc-bg').data([bgArc]);

      wedge.enter().append('path').merge(wedge).attr('d', function (d) {
        return d;
      }).style('fill', this.optionReaderFunc('arcBgWedgeFillScaleAccessor')).attr('class', function (d, i) {
        return _this4._buildCss(['monte-arc-bg', _this4.opts.arcBgWedgeCssScaleAccessor], d, i);
      }).call(function (sel) {
        return _this4.fnInvoke(_this4.opts.bgUpdateSelectionCustomize, sel);
      });
    }
  }, {
    key: '_updateLabels',
    value: function _updateLabels(arcGrps) {
      var _this5 = this;

      this.emit(EVENT_UPDATING_LABELS$2);

      var labelPlacement = this.tryInvoke(this.opts.labelPlacement);
      var css = this.tryInvoke(labelPlacement.css);

      // Clear old label CSS from chart and add new.
      removeClassByPattern(this.bound, LABEL_CSS_PATTERN);
      this.classed(css, true);

      arcGrps.each(function (d, i, nodes) {
        var node = d3.select(nodes[i]);
        _this5._updateArcLabel(node, d, i, nodes);
      });

      this.emit(EVENT_UPDATED_LABELS$2);
    }
  }, {
    key: '_updateArcLabel',
    value: function _updateArcLabel(arcGrp, d, i, nodes) {
      var _this6 = this;

      var lbl = arcGrp.selectAll('.monte-arc-label').data([d]);
      var labelPlacement = this.tryInvoke(this.opts.labelPlacement);
      var labelRadius = this.tryInvoke(labelPlacement.radius, this.width, this.height);
      var radius = this.tryInvoke(labelRadius, d, i, nodes);
      var angle = this.tryInvoke(this.opts.labelAngle, d, i, nodes);
      var rotate = radiansToDegrees(this.tryInvoke(this.opts.labelRotation, d, i, nodes));
      var coord = getPolarCoord(radius, angle);

      lbl.enter().append('text').attr('class', 'monte-arc-label').attr('dx', function (d1) {
        return _this6.tryInvoke(_this6.opts.labelXAdjust, d1, i, nodes);
      }).attr('dy', function (d1) {
        return _this6.tryInvoke(_this6.opts.labelYAdjust, d1, i, nodes);
      }).attr('transform', function () {
        return 'translate(' + coord + ') rotate(' + rotate + ')';
      }).attr('angle', angle).attr('radius', labelRadius).style('opacity', 0).style('fill', this.optionReaderFunc('labelFillScaleAccessor')).text(function (d1) {
        return _this6.tryInvoke(_this6.opts.label, d1, i, nodes);
      }).call(function (sel) {
        return _this6.fnInvoke(_this6.opts.labelEnterSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this6._transitionSettings('label', ENTER);
        _this6._transitionConfigure(t, ts, d, i, nodes);
      }).style('opacity', 1).call(function (sel) {
        return _this6.fnInvoke(_this6.opts.labelEnterTransitionCustomize, sel);
      });

      lbl.style('fill', this.optionReaderFunc('labelFillScaleAccessor')).style('opacity', 1).attr('dx', function (d1) {
        return _this6.tryInvoke(_this6.opts.labelXAdjust, d1, i, nodes);
      }).attr('dy', function (d1) {
        return _this6.tryInvoke(_this6.opts.labelYAdjust, d1, i, nodes);
      }).call(function (sel) {
        return _this6.fnInvoke(_this6.opts.labelUpdateSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this6._transitionSettings('label', UPDATE);
        _this6._transitionConfigure(t, ts, d, i, nodes);
      }).attrTween('transform', function () {
        var currentTransforms = readTransforms(lbl.attr('transform'));
        var from = {
          angle: +lbl.attr('angle'),
          radius: +lbl.attr('radius'),
          rotate: currentTransforms.rotate || 0
        };
        var to = { angle: angle, radius: radius, rotate: rotate };

        return arcLabelTween(from, to, radius);
      }).attr('angle', angle).attr('radius', labelRadius).text(function (d1) {
        return _this6.tryInvoke(_this6.opts.label, d1, i, nodes);
      }).call(function (sel) {
        return _this6.fnInvoke(_this6.opts.labelUpdateTransitionCustomize, sel);
      });

      lbl.exit().call(function (sel) {
        return _this6.fnInvoke(_this6.opts.labelExitSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this6._transitionSettings('label', EXIT);
        _this6._transitionConfigure(t, ts, d, i, nodes);
      }).attr('opacity', 0).call(function (sel) {
        return _this6.fnInvoke(_this6.opts.labelExitTransitionCustomize, sel);
      }).remove();
    }
  }]);
  return ArcChart;
}(PolarChart);

ArcChart.EVENTS = EVENTS$4;

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

    var p1 = '-' + w + ' 0';
    var p2 = '-' + w + ' -' + h1;
    var p3 = w + ' -' + h1;
    var p4 = w + ' 0';
    var p5 = w + ' ' + h2;
    var p6 = '-' + w + ' ' + h2;
    var path = ['M', p1, p2, p3, p4, p5, p6, 'Z'].join(' ');

    return path;
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

var EVENT_UPDATING_BACKGROUND_ARC = 'updatingBackgroundArc';
var EVENT_UPDATED_BACKGROUND_ARC = 'updatedBackgroundArc';
var EVENT_UPDATING_NEEDLE = 'updatingNeedle';
var EVENT_UPDATED_NEEDLE = 'updatedNeedle';

var EVENTS$5 = [EVENT_UPDATING_BACKGROUND_ARC, EVENT_UPDATED_BACKGROUND_ARC, EVENT_UPDATING_NEEDLE, EVENT_UPDATED_NEEDLE];

var NEEDLE = 'needle';

var GAUGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-gauge-chart',
  piePadAngle: 0,
  pieStartAngle: -HALF_PI,
  pieEndAngle: HALF_PI,

  arcBgCssScale: noop,
  arcBgCssScaleAccessor: ArcChart.generateScaleAccessor('arcBgCssScale', 'itemValue'),
  arcBgFillScale: noop,
  arcBgFillScaleAccessor: ArcChart.generateScaleAccessor('arcBgFillScale', 'itemValue'),

  needleBase: 20,
  needleHeight: function needleHeight(innerRadius, outerRadius) {
    return (innerRadius + outerRadius) / 2;
  },
  needlePath: needleRoundedEnd(),

  innerRadius: function innerRadius(w, h) {
    return radiusContrain(w, h) * 0.9;
  },
  labelPlacement: polarLabelInner,
  labelRotation: gaugeLabelRotateNone,

  segmentsProp: 'segments',
  itemValueProp: 'interval',
  startValueProp: 'start',
  startLabelProp: 'startLabel',
  needleValueProp: 'value',
  labelProp: 'label',
  labelAngle: function labelAngle(d) {
    return d.endAngle;
  },
  suppressLabels: false,
  includeLabels: function includeLabels() {
    return !this.tryInvoke(this.opts.suppressLabels);
  }
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

      (_babelHelpers$get2 = get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, EVENTS$5));
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
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.arcBgCssScale);
      resetScaleDomain(this.opts.arcBgFillScale);
    }
  }, {
    key: '_data',
    value: function _data(data) {
      this.rawData = data;

      var segmentsProp = this.tryInvoke(this.opts.segmentsProp);
      var startProp = this.tryInvoke(this.opts.startValueProp);
      var startLabelProp = this.tryInvoke(this.opts.startLabelProp);
      var itemValueProp = this.tryInvoke(this.opts.itemValueProp);
      var needleValueProp = this.tryInvoke(this.opts.needleValueProp);

      // Insert starting label item
      if (isDefined(data[startLabelProp])) {
        data[segmentsProp].unshift({
          interval: 0,
          label: data[startLabelProp]
        });
      }

      get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_data', this).call(this, data[segmentsProp]);
      var intervalSum = this.displayData.reduce(function (acc, d) {
        return acc + Math.abs(d[itemValueProp]);
      }, 0);
      var start = data[startProp] || 0;

      this.angleScale.domain([start, start + intervalSum]);
      this.needleValue(data[needleValueProp], true);
    }
  }, {
    key: 'needleValue',
    value: function needleValue(value) {
      var suppressUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (value === UNDEF) {
        return this.needleValueData;
      }

      this._prevNeedleAngleValueData = this.needleValueAngleData;
      this.needleValueData = value;
      this.needleValueAngleData = this.angleScale(value);

      if (!suppressUpdate) {
        this.update();
      }

      return this;
    }
  }, {
    key: 'needleValueAngle',
    value: function needleValueAngle(angle) {
      if (angle === UNDEF) {
        return this.needleValueAngleData;
      }

      this.needleValue(this.angleScale.invert(angle));
      return this;
    }
  }, {
    key: '_render',
    value: function _render() {
      if (!this.hasRendered) {
        get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_render', this).call(this);
        this._updateBackgroundArc();
      }
    }
  }, {
    key: '_update',
    value: function _update() {
      get(GaugeChart.prototype.__proto__ || Object.getPrototypeOf(GaugeChart.prototype), '_update', this).call(this);

      this._updateNeedle();
    }
  }, {
    key: '_updateBackgroundArc',
    value: function _updateBackgroundArc() {
      var _this2 = this;

      this.emit(EVENT_UPDATING_BACKGROUND_ARC);

      this.bg.append('path').style('fill', this.optionReaderFunc('arcBgFillScaleAccessor')).attr('class', function (d, i) {
        return _this2._buildCss(['monte-gauge-bg', _this2.opts.arcBgCssScaleAccessor], d, i);
      }).attr('d', this.bgArc());

      this.emit(EVENT_UPDATED_BACKGROUND_ARC);
    }
  }, {
    key: '_updateNeedle',
    value: function _updateNeedle() {
      var _this3 = this;

      var baseWidth = this.tryInvoke(this.opts.needleBase);
      var or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
      var ir = this.tryInvoke(this.opts.innerRadius, this.width, this.height);
      var height = this.tryInvoke(this.opts.needleHeight, ir, or);
      var path = this.tryInvoke(this.opts.needlePath, height, baseWidth);

      var needle = this.overlay.selectAll('.monte-gauge-needle').data([this.needleValueAngleData || 0]);

      this.emit(EVENT_UPDATING_NEEDLE);

      needle.enter().append('path').attr('class', 'monte-gauge-needle').attr('d', path).call(function (sel) {
        return _this3.fnInvoke(_this3.opts.needleEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(NEEDLE, ENTER)).style('transform', function (d) {
        return 'rotate(' + d + 'rad)';
      }).call(function (t) {
        return _this3.fnInvoke(_this3.opts.needleEnterTransitionCustomize, t);
      });

      needle.call(function (sel) {
        return _this3.fnInvoke(_this3.opts.needleExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(NEEDLE, UPDATE)).styleTween('transform', function (d) {
        var a = _this3._prevNeedleAngleValueData;
        var b = d;

        return function (t) {
          var r = a * (1 - t) + b * t;
          return 'rotate(' + r + 'rad)';
        };
      }).call(function (t) {
        return _this3.fnInvoke(_this3.opts.needleExitTransitionCustomize, t);
      });

      needle.exit().call(function (sel) {
        return _this3.fnInvoke(_this3.opts.needleExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(NEEDLE, EXIT)).call(function (t) {
        return _this3.fnInvoke(_this3.opts.needleExitTransitionCustomize, t);
      }).remove();

      this.emit(EVENT_UPDATED_NEEDLE);
    }
  }], [{
    key: 'createInstanceGroup',
    value: function createInstanceGroup(charts) {
      var _babelHelpers$get3;

      for (var _len3 = arguments.length, additionalMethodsToProxy = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        additionalMethodsToProxy[_key3 - 1] = arguments[_key3];
      }

      additionalMethodsToProxy.push(GROUP_PROXY_METHODS$3);
      return (_babelHelpers$get3 = get(GaugeChart.__proto__ || Object.getPrototypeOf(GaugeChart), 'createInstanceGroup', this)).call.apply(_babelHelpers$get3, [this, charts].concat(additionalMethodsToProxy));
    }
  }]);
  return GaugeChart;
}(ArcChart);

GaugeChart.EVENTS = EVENTS$5;

var GROUP_PROXY_METHODS$3 = ['needleValue'];

var POLAR_AREA_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-polar-area-chart',

  innerRadius: 30,
  outerRadiusProp: '',
  outerRadiusScale: d3.scaleSqrt,
  outerRadiusRange: function outerRadiusRange(w, h) {
    var v = d3.min([w, h]); // Constrain to smaller value
    var maxOuterRadius = v / 2;
    var ir = this.tryInvoke(this.opts.innerRadius, w, h);

    return [ir, maxOuterRadius];
  },

  outerRadiusDomainCustomize: function outerRadiusDomainCustomize(extent) {
    return [0, extent[1]];
  },

  outerRadius: function outerRadius() /* w, h */{
    var chart = this;

    return function (d) {
      return chart.getScaledProp('outerRadius', 'itemValue', d.data);
    };
  }
};

var PolarAreaChart = function (_ArcChart) {
  inherits(PolarAreaChart, _ArcChart);

  function PolarAreaChart() {
    classCallCheck(this, PolarAreaChart);
    return possibleConstructorReturn(this, (PolarAreaChart.__proto__ || Object.getPrototypeOf(PolarAreaChart)).apply(this, arguments));
  }

  createClass(PolarAreaChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(PolarAreaChart.prototype.__proto__ || Object.getPrototypeOf(PolarAreaChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_AREA_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      get(PolarAreaChart.prototype.__proto__ || Object.getPrototypeOf(PolarAreaChart.prototype), '_initCore', this).call(this);

      this.outerRadius = this.opts.outerRadiusScale();
      this.updateRadiusRange();

      // Force all wedges to be equally sized in terms of angle because radius will be sized to show
      // value.
      this.pie.value(function () {
        return 1;
      });
    }
  }, {
    key: '_boundsUpdate',
    value: function _boundsUpdate() {
      get(PolarAreaChart.prototype.__proto__ || Object.getPrototypeOf(PolarAreaChart.prototype), '_boundsUpdate', this).call(this);
      this.updateRadiusRange();
    }
  }, {
    key: '_data',
    value: function _data(data) {
      get(PolarAreaChart.prototype.__proto__ || Object.getPrototypeOf(PolarAreaChart.prototype), '_data', this).call(this, data);
      this.updateRadiusDomain();
    }
  }, {
    key: 'updateRadiusRange',
    value: function updateRadiusRange() {
      var range = this.tryInvoke(this.opts.outerRadiusRange, this.width, this.height);

      if (isDefined(range) && isArray$2(range)) {
        this.outerRadius.range(range);
      }
    }
  }, {
    key: 'updateRadiusDomain',
    value: function updateRadiusDomain() {
      var data = this.data();
      var customize = this.opts.outerRadiusDomainCustomize;
      var extent = data ? this._domainExtent(data) : [];

      if (customize) {
        extent = this.tryInvoke(customize, extent);
      }

      this.outerRadius.domain(extent);
    }
  }, {
    key: '_domainExtent',
    value: function _domainExtent(data) {
      var _this2 = this;

      return d3.extent(data, function (d) {
        return _this2.getProp('itemValue', d);
      });
    }
  }]);
  return PolarAreaChart;
}(ArcChart);

var LABEL_CSS_PATTERN$1 = new RegExp('^' + polarLabelCssPrefix + '*');

var EVENT_UPDATING_LABELS$3 = 'updatingLabels';
var EVENT_UPDATED_LABELS$3 = 'updatedLabels';
var EVENTS$6 = [EVENT_UPDATING_LABELS$3, EVENT_UPDATED_LABELS$3];

var LABEL$3 = 'label';
var AREA$1 = 'area';
var POINT$2 = 'point';
var RAY = 'ray';
var WEB = 'web';

var WEB_MODE_LINE = 'line';
var WEB_MODE_ARC = 'arc';


var RADAR_CHART_DEFAULTS = {
  chartCss: 'monte-radar-chart',

  outerRadius: radiusContrain,

  // Callback function to customize the area generator.
  areaCustomize: null,
  areaProp: 'value',
  areaCssScale: noop,
  areaCssScaleAccessor: PolarChart.generateScaleAccessor('areaCssScale', 'area'),
  areaFillScale: noop,
  areaFillScaleAccessor: PolarChart.generateScaleAccessor('areaFillScale', 'area'),
  areaStrokeScale: noop,
  areaStrokeScaleAccessor: PolarChart.generateScaleAccessor('areaStrokeScale', 'area'),

  startAngle: 0,
  endAngle: TAU,

  radiusScale: d3.scaleLinear,
  radiusDomainCustomize: null,

  // Radius Labels
  suppressRadiusLabels: false,
  radiusLabelLayer: 'support',
  radiusLabelRotation: gaugeLabelRotateTangentFlip,
  radiusLabelAngle: 0,
  radiusLabelFillScale: noop,
  radiusLabelFillScaleAccessor: function radiusLabelFillScaleAccessor(d) {
    return this.opts.radiusLabelFillScale(d);
  },
  radiusLabel: function radiusLabel(d) {
    return d;
  },
  radiusLabelXAdjust: '',
  radiusLabelYAdjust: '0.35em',

  // Web
  suppressWeb: false,
  webArcCustomize: null,
  webLevels: function webLevels() {
    return this.radius.ticks();
  },
  webInnerLevels: [],
  webMode: WEB_MODE_LINE,

  // Ray Labels
  suppressLabels: false,
  labelPlacement: polarLabelOuter,
  labelRotation: gaugeLabelRotateTangentFlip,
  labelAngle: 0,
  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: PolarChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function label(d) {
    return d.prop;
  },
  labelXAdjust: '',
  labelYAdjust: '0.35em',

  suppressPoints: false,

  pointProp: '',
  pointFillScale: noop,
  pointFillScaleAccessor: PolarChart.generateScaleAccessor('pointFillScale', 'pointProp'),

  pointStrokeScale: noop,
  pointStrokeScaleAccessor: PolarChart.generateScaleAccessor('pointStrokeScale', 'pointProp'),

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,
  pointCssScaleAccessor: PolarChart.generateScaleAccessor('pointCssScale', 'pointProp'),

  // Static CSS class(es) to apply to every line.
  pointCss: 'point',
  pointSize: SYMBOL_SIZE,
  pointSymbol: function pointSymbol(symbol) {
    return symbol.type(d3.symbolCircle);
  },

  areaValuesProp: 'values',
  rayIdProp: 'id',
  rayValueProp: 'value'
};

var RadarChart = function (_PolarChart) {
  inherits(RadarChart, _PolarChart);

  function RadarChart() {
    classCallCheck(this, RadarChart);
    return possibleConstructorReturn(this, (RadarChart.__proto__ || Object.getPrototypeOf(RadarChart)).apply(this, arguments));
  }

  createClass(RadarChart, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(RadarChart.prototype.__proto__ || Object.getPrototypeOf(RadarChart.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [RADAR_CHART_DEFAULTS]));
    }
  }, {
    key: '_initCore',
    value: function _initCore() {
      var _this2 = this;

      get(RadarChart.prototype.__proto__ || Object.getPrototypeOf(RadarChart.prototype), '_initCore', this).call(this);

      this.radius = this.tryInvoke(this.opts.radiusScale);

      this.areaRadialLine = d3.radialLine().radius(function (d) {
        return _this2.radius(d.radius);
      }).angle(function (d) {
        return d.angle;
      }).curve(d3.curveLinearClosed);

      this.webArc = d3.arc().innerRadius(function (d) {
        return _this2.radius(d.radius);
      }).outerRadius(function (d) {
        return _this2.radius(d.radius);
      });
    }
  }, {
    key: '_initCustomize',
    value: function _initCustomize() {
      get(RadarChart.prototype.__proto__ || Object.getPrototypeOf(RadarChart.prototype), '_initCustomize', this).call(this);
      if (this.opts.webArcCustomize) {
        this.fnInvoke(this.opts.webArcCustomize, this.webArc);
      }

      if (this.opts.areaRadialLineCustomize) {
        this.fnInvoke(this.opts.areaRadialLineCustomize, this.areaRadialLine);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      var _babelHelpers$get2;

      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      (_babelHelpers$get2 = get(RadarChart.prototype.__proto__ || Object.getPrototypeOf(RadarChart.prototype), '_initPublicEvents', this)).call.apply(_babelHelpers$get2, [this].concat(events, toConsumableArray(commonEventNames(AREA$1)), toConsumableArray(commonEventNames(POINT$2)), EVENTS$6));
    }
  }, {
    key: '_resetStyleDomains',
    value: function _resetStyleDomains() {
      get(RadarChart.prototype.__proto__ || Object.getPrototypeOf(RadarChart.prototype), '_resetStyleDomains', this).call(this);

      resetScaleDomain(this.opts.areaCssScale);
      resetScaleDomain(this.opts.areaFillScale);
      resetScaleDomain(this.opts.areaStrokeScale);
      resetScaleDomain(this.opts.labelFillScale);
      resetScaleDomain(this.opts.radiusLabelFillScale);
      resetScaleDomain(this.opts.pointFillScale);
      resetScaleDomain(this.opts.pointStrokeScale);
      resetScaleDomain(this.opts.pointCssScale);
    }
  }, {
    key: '_boundsUpdate',
    value: function _boundsUpdate() {
      get(RadarChart.prototype.__proto__ || Object.getPrototypeOf(RadarChart.prototype), '_boundsUpdate', this).call(this);

      var or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
      this.radius.range([0, or]);
    }
  }, {
    key: '_data',
    value: function _data(data) {
      var _this3 = this;

      get(RadarChart.prototype.__proto__ || Object.getPrototypeOf(RadarChart.prototype), '_data', this).call(this, data);

      var propsMap = {};
      this.displayData.forEach(function (area) {
        var values = _this3.getProp('areaValues', area);
        // For each area look at the ids. Compile a list of all ids across all areas.
        values.forEach(function (ray) {
          var rayId = _this3.getProp('rayId', ray);

          if (!propsMap[rayId]) {
            propsMap[rayId] = 1;
          } else {
            propsMap[rayId]++;
          }
        });
      });

      var props = Object.keys(propsMap);
      var currentMax = 0;

      // Find max across all properties
      props.forEach(function (prop) {
        data.forEach(function (d) {
          if (currentMax < d[prop]) {
            currentMax = d[prop];
          }
        });
      });

      var domain = isDefined(this.opts.radiusDomainCustomize) ? this.tryInvoke(this.opts.radiusDomainCustomize, [0, currentMax]) : [0, currentMax];
      this.radius.domain(domain);

      var _rayData = this.__rayData(props),
          rayAngleMap = _rayData.rayAngleMap,
          rayData = _rayData.rayData;

      this.rayAngleMap = rayAngleMap;
      this.rayData = rayData;
      this.props = props;
    }
  }, {
    key: '__rayData',
    value: function __rayData(props) {
      var startAngle = this.tryInvoke(this.opts.startAngle);
      var endAngle = this.tryInvoke(this.opts.endAngle);
      var rayCount = props.length;
      var rayInterval = (endAngle - startAngle) / rayCount;
      var rayAngleMap = {};
      var rayData = [];
      var activeAngle = startAngle;

      for (var i = 0; i < rayCount; i++) {
        rayAngleMap[props[i]] = activeAngle;
        rayData.push({
          prop: props[i],
          angle: activeAngle
        });

        activeAngle += rayInterval;
      }

      return { rayAngleMap: rayAngleMap, rayData: rayData };
    }
  }, {
    key: '_update',
    value: function _update() {
      var rayGrps = this._updateRays();
      var areaGrps = this._updateAreas();
      this._updateWeb();

      var suppressPoints = this.tryInvoke(this.opts.suppressPoints);
      if (!suppressPoints) {
        this._updatePoints(areaGrps);
      }

      if (!this.opts.suppressLabels) {
        this._updateRayLabels(rayGrps);
      }

      if (!this.opts.suppressRadiusLabels) {
        this._updateRadiusLabels(rayGrps);
      }
    }
  }, {
    key: '_updateAreas',
    value: function _updateAreas() {
      var _this4 = this;

      // Data join for the area
      var areaGrps = this.draw.selectAll('.monte-radar-area-grp').data(this.displayData, this.opts.dataKey);

      // Create new area and update existing
      var enterAreas = areaGrps.enter().append('g').classed('monte-radar-area-grp', true).append('path').classed('monte-radar-area', true).call(this.__bindCommonEvents(AREA$1));
      this._updateAreaSelections(enterAreas, ENTER);
      this._updateAreaSelections(areaGrps.selectAll('.monte-radar-area'), UPDATE);

      // Fade out removed area
      areaGrps.exit().call(function (sel) {
        return _this4.fnInvoke(_this4.opts.areaExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(AREA$1, EXIT)).style('opacity', 0).call(function (t) {
        return _this4.fnInvoke(_this4.opts.areaExitTransitionCustomize, t);
      }).remove();

      return areaGrps.merge(areaGrps.enter().selectAll('.monte-radar-area-grp'));
    }
  }, {
    key: '_updateAreaSelections',
    value: function _updateAreaSelections(sel, stage) {
      var _this5 = this;

      var selectionFnName = AREA$1 + upperFirst(stage) + 'SelectionCustomize';
      var transitionFnName = AREA$1 + upperFirst(stage) + 'TransitionCustomize';

      sel.attr('class', function (d, i) {
        return _this5._buildCss(['monte-radar-area', _this5.opts.areaCss, _this5.opts.areaCssScaleAccessor, d.css], d, i);
      }).call(function (sel) {
        return _this5.fnInvoke(_this5.opts[selectionFnName], sel);
      }).transition().call(this._transitionSetup(AREA$1, stage)).attr('d', function (d) {
        var areaValues = _this5.getProp('areaValues', d);
        var values = [];

        _this5.props.forEach(function (p) {
          // Find the correct value element for a particular label
          var idKey = _this5.getPropKey('rayId');
          var valueKey = _this5.getPropKey('rayValue');
          var radius = findBy(areaValues, idKey, p, valueKey);

          values.push({
            radius: radius,
            angle: _this5.rayAngleMap[p]
          });
        });

        return _this5.areaRadialLine(values);
      }).style('fill', this.optionReaderFunc('areaFillScaleAccessor')).call(function (t) {
        return _this5.fnInvoke(_this5.opts[transitionFnName], t);
      });
    }
  }, {
    key: '_updateRays',
    value: function _updateRays() {
      var _this6 = this;

      var or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
      var rayGrps = this.support.selectAll('.monte-radar-ray-grp').data(this.rayData);

      rayGrps.enter().append('g').classed('monte-radar-ray-grp', true).append('line').classed('monte-radar-ray', true).attr('x0', 0).attr('y0', 0).attr('x1', function (d) {
        return getPolarCoord(or, d.angle)[0];
      }).attr('y1', function (d) {
        return getPolarCoord(or, d.angle)[1];
      }).attr('opacity', 0).call(function (sel) {
        return _this6.fnInvoke(_this6.opts.rayEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(RAY, ENTER)).attr('opacity', 1).call(function (t) {
        return _this6.fnInvoke(_this6.opts.rayEnterTransitionCustomize, t);
      });

      rayGrps.select('.monte-radar-ray').call(function (sel) {
        return _this6.fnInvoke(_this6.opts.rayUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(RAY, UPDATE)).attr('x1', function (d) {
        return getPolarCoord(or, d.angle)[0];
      }).attr('y1', function (d) {
        return getPolarCoord(or, d.angle)[1];
      }).attr('opacity', 1).call(function (t) {
        return _this6.fnInvoke(_this6.opts.rayUpdateTransitionCustomize, t);
      });

      rayGrps.call(function (sel) {
        return _this6.fnInvoke(_this6.opts.rayExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(RAY, EXIT)).attr('opacity', 0).call(function (t) {
        return _this6.fnInvoke(_this6.opts.rayExitTransitionCustomize, t);
      });

      return rayGrps.merge(rayGrps.enter().selectAll('.monte-radar-ray-grp'));
    }
  }, {
    key: '_updateRayLabels',
    value: function _updateRayLabels(rayGrps) {
      var _this7 = this;

      this.emit(EVENT_UPDATING_LABELS$3);

      var labelPlacement = this.tryInvoke(this.opts.labelPlacement);
      var css = this.tryInvoke(labelPlacement.css);

      // Clear old label CSS from chart and add new.
      removeClassByPattern(this.bound, LABEL_CSS_PATTERN$1);
      this.classed(css, true);

      rayGrps.each(function (d, i, nodes) {
        var node = d3.select(nodes[i]);
        _this7._updateRayLabel(node, d, i, nodes);
      });

      this.emit(EVENT_UPDATED_LABELS$3);
    }
  }, {
    key: '_updateRayLabel',
    value: function _updateRayLabel(rayGrp, d, i, nodes) {
      var _this8 = this;

      var lbl = rayGrp.selectAll('.monte-radar-ray-label').data([d]);
      var labelPlacement = this.tryInvoke(this.opts.labelPlacement);
      var labelRadius = this.tryInvoke(labelPlacement.radius, this.width, this.height);
      var radius = this.tryInvoke(labelRadius, d, i, nodes);
      var angle = d.angle;
      var rotate = radiansToDegrees(this.tryInvoke(this.opts.labelRotation, d.angle, i, nodes));
      var coord = getPolarCoord(radius, angle);

      lbl.enter().append('text').attr('class', 'monte-radar-ray-label').attr('dx', function (d1) {
        return _this8.tryInvoke(_this8.opts.labelXAdjust, d1, i, nodes);
      }).attr('dy', function (d1) {
        return _this8.tryInvoke(_this8.opts.labelYAdjust, d1, i, nodes);
      }).attr('transform', function () {
        return 'translate(' + coord + ') rotate(' + rotate + ')';
      }).attr('angle', angle).attr('radius', labelRadius).style('opacity', 0).style('fill', this.optionReaderFunc('labelFillScaleAccessor')).text(function (d1) {
        return _this8.tryInvoke(_this8.opts.label, d1, i, nodes);
      }).call(function (sel) {
        return _this8.fnInvoke(_this8.opts.labelEnterSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this8._transitionSettings(LABEL$3, ENTER);
        _this8._transitionConfigure(t, ts, d, i, nodes);
      }).style('opacity', 1).call(function (t) {
        return _this8.fnInvoke(_this8.opts.labelEnterTransitionCustomize, t);
      });

      lbl.style('fill', this.optionReaderFunc('labelFillScaleAccessor')).style('opacity', 1).attr('dx', function (d1) {
        return _this8.tryInvoke(_this8.opts.labelXAdjust, d1, i, nodes);
      }).attr('dy', function (d1) {
        return _this8.tryInvoke(_this8.opts.labelYAdjust, d1, i, nodes);
      }).call(function (sel) {
        return _this8.fnInvoke(_this8.opts.labelUpdateSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this8._transitionSettings(LABEL$3, UPDATE);
        _this8._transitionConfigure(t, ts, d, i, nodes);
      }).attrTween('transform', function () {
        var currentTransforms = readTransforms(lbl.attr('transform'));
        var from = {
          angle: +lbl.attr('angle'),
          radius: +lbl.attr('radius'),
          rotate: currentTransforms.rotate || 0
        };
        var to = { angle: angle, radius: radius, rotate: rotate };

        return arcLabelTween(from, to, radius);
      }).attr('angle', angle).attr('radius', labelRadius).text(function (d1) {
        return _this8.tryInvoke(_this8.opts.label, d1, i, nodes);
      }).call(function (t) {
        return _this8.fnInvoke(_this8.opts.labelUpdateTransitionCustomize, t);
      });

      lbl.exit().call(function (sel) {
        return _this8.fnInvoke(_this8.opts.labelExitSelectionCustomize, sel);
      }).transition().call(function (t) {
        var ts = _this8._transitionSettings(LABEL$3, EXIT);
        _this8._transitionConfigure(t, ts, d, i, nodes);
      }).style('opacity', 0).call(function (t) {
        return _this8.fnInvoke(_this8.opts.labelExitTransitionCustomize, t);
      }).remove();
    }
  }, {
    key: '_updateRadiusLabels',
    value: function _updateRadiusLabels() {
      var _this9 = this;

      var levels = this.tryInvoke(this.opts.webLevels);
      var layer = this.tryInvoke(this.opts.radiusLabelLayer);
      var lbls = this[layer].selectAll('.monte-radar-radius-label').data(levels);

      var transform = function transform(d, i, nodes) {
        var radius = _this9.radius(d);
        var angle = _this9.tryInvoke(_this9.opts.radiusLabelAngle, angle, i, nodes);
        var coord = getPolarCoord(radius, angle);
        var radRot = _this9.tryInvoke(_this9.opts.radiusLabelRotation, angle, i, nodes);
        var rotate = radiansToDegrees(radRot);

        return 'translate(' + coord + ') rotate(' + rotate + ')';
      };

      lbls.enter().append('text').classed('monte-radar-radius-label', true).attr('class', 'monte-radar-ray-label').attr('dx', this.optionReaderFunc('radiusLabelXAdjust')).attr('dy', this.optionReaderFunc('radiusLabelYAdjust')).style('opacity', 0).style('fill', this.optionReaderFunc('radiusLabelFillScaleAccessor')).attr('transform', 'translate(0, 0)').text(this.optionReaderFunc('radiusLabel')).call(function (sel) {
        return _this9.fnInvoke(_this9.opts.radiusLabelEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(LABEL$3, ENTER)).style('opacity', 1).attr('transform', transform).call(function (t) {
        return _this9.fnInvoke(_this9.opts.radiusLabelEnterTransitionCustomize, t);
      });

      lbls.style('fill', this.optionReaderFunc('radiusLabelFillScaleAccessor')).style('opacity', 1).call(function (sel) {
        return _this9.fnInvoke(_this9.opts.radiusLabelUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(LABEL$3, UPDATE)).attr('transform', transform).text(this.optionReaderFunc('radiusLabel')).call(function (t) {
        return _this9.fnInvoke(_this9.opts.radiusLabelUpdateTransitionCustomize, t);
      });

      lbls.exit().call(function (sel) {
        return _this9.fnInvoke(_this9.opts.radiusLabelExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(LABEL$3, EXIT)).style('opacity', 0).call(function (t) {
        return _this9.fnInvoke(_this9.opts.radiusLabelExitTransitionCustomize, t);
      }).remove();
    }
  }, {
    key: '_updateWeb',
    value: function _updateWeb() {
      var mode = this.tryInvoke(this.opts.webMode);

      if (mode === WEB_MODE_ARC) {
        this._updateWebArc();
      } else if (mode === WEB_MODE_LINE) {
        this._updateWebLine();
      } else {
        throw MonteOptionError.InvalidEnumOption('webMode', mode);
      }
    }
  }, {
    key: '_updateWebArc',
    value: function _updateWebArc() {
      var _this10 = this;

      var minorLevels = this.tryInvoke(this.opts.webInnerLevels);
      var levels = this.tryInvoke(this.opts.webLevels);
      var startAngle = this.tryInvoke(this.opts.startAngle);
      var endAngle = this.tryInvoke(this.opts.endAngle);
      var arcs = minorLevels.map(function (d) {
        return {
          radius: d,
          startAngle: startAngle,
          endAngle: endAngle,
          type: 'minor'
        };
      });

      levels.forEach(function (d) {
        arcs.push({
          radius: d,
          startAngle: startAngle,
          endAngle: endAngle,
          type: 'major'
        });
      });

      var webs = this.bg.selectAll('.monte-radar-web').data(arcs);

      webs.enter().append('path').attr('class', function (d) {
        return d.type;
      }).classed('monte-radar-web', true).attr('d', function (d) {
        return _this10.webArc(d);
      }).call(function (sel) {
        return _this10.fnInvoke(_this10.opts.webEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEB, ENTER)).call(function (t) {
        return _this10.fnInvoke(_this10.opts.webEnterTransitionCustomize, t);
      });

      webs.call(function (sel) {
        return _this10.fnInvoke(_this10.opts.webUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEB, UPDATE)).attr('d', function (d) {
        return _this10.webArc(d);
      }).call(function (t) {
        return _this10.fnInvoke(_this10.opts.webUpdateTransitionCustomize, t);
      });

      webs.exit().call(function (sel) {
        return _this10.fnInvoke(_this10.opts.webExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEB, EXIT)).call(function (t) {
        return _this10.fnInvoke(_this10.opts.webExitTransitionCustomize, t);
      }).remove();
    }
  }, {
    key: '_updateWebLine',
    value: function _updateWebLine() {
      var _this11 = this;

      var minorLevels = this.tryInvoke(this.opts.webInnerLevels);
      var levels = this.tryInvoke(this.opts.webLevels);
      var lines = minorLevels.map(function (d) {
        return {
          radius: d,
          values: _this11.rayData.map(function (r) {
            return { radius: d, angle: r.angle };
          }),
          type: 'minor'
        };
      });

      levels.forEach(function (d) {
        lines.push({
          radius: d,
          values: _this11.rayData.map(function (r) {
            return { radius: d, angle: r.angle };
          }),
          type: 'major'
        });
      });

      var webs = this.bg.selectAll('.monte-radar-web').data(lines);

      webs.enter().append('path').attr('class', function (d) {
        return d.type;
      }).classed('monte-radar-web', true).attr('d', function (d) {
        return _this11.areaRadialLine(d.values);
      }).call(function (sel) {
        return _this11.fnInvoke(_this11.opts.webEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEB, ENTER)).call(function (t) {
        return _this11.fnInvoke(_this11.opts.webEnterTransitionCustomize, t);
      });

      webs.call(function (sel) {
        return _this11.fnInvoke(_this11.opts.webUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEB, UPDATE)).attr('d', function (d) {
        return _this11.areaRadialLine(d.values);
      }).call(function (t) {
        return _this11.fnInvoke(_this11.opts.webUpdateTransitionCustomize, t);
      });

      webs.exit().call(function (sel) {
        return _this11.fnInvoke(_this11.opts.webExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(WEB, EXIT)).call(function (t) {
        return _this11.fnInvoke(_this11.opts.webExitTransitionCustomize, t);
      }).remove();
    }
  }, {
    key: '_updatePoints',
    value: function _updatePoints(areaGrps) {
      var _this12 = this;

      areaGrps.each(function (d, i, nodes) {
        return _this12._updateAreaPoints(nodes[i], d, i);
      });
    }
  }, {
    key: '_updateAreaPoints',
    value: function _updateAreaPoints(areaNode, areaDatum, areaIndex) {
      var _this13 = this;

      var areaGrp = d3.select(areaNode);
      var pointsData = Object.keys(areaDatum).map(function (d) {
        return { prop: d, value: areaDatum[d] };
      });

      // Data join for the points
      var points = areaGrp.selectAll('.monte-point').data(pointsData);

      var genSym = function genSym(d, i) {
        var size = _this13.tryInvoke(_this13.opts.pointSize, d, i);
        var symbase = d3.symbol().size(size);
        var symbol = _this13.opts.pointSymbol(symbase, d, i);
        return symbol(d, i);
      };

      // Create new points
      points.enter().append('path').call(this.__bindCommonEvents(POINT$2)).attr('d', genSym).attr('transform', function (d) {
        return _this13._translatePoint(d);
      }).attr('class', function (d) {
        return _this13._buildCss(['monte-point', _this13.opts.pointCss, _this13.opts.pointCssScaleAccessor, d.css], areaDatum, areaIndex);
      }).call(function (sel) {
        return _this13.fnInvoke(_this13.opts.pointEnterSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(POINT$2, ENTER)).style('fill', this.optionReaderFunc('pointFillScaleAccessor')).style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor')).attr('transform', function (d) {
        return _this13._translatePoint(d);
      }).call(function (sel) {
        return _this13.fnInvoke(_this13.opts.pointEnterTransitionCustomize, sel);
      });

      // Update existing points
      points.attr('class', function (d) {
        return _this13._buildCss(['monte-point', _this13.opts.pointCss, _this13.opts.pointCssScaleAccessor, d.css], areaDatum, areaIndex);
      }).call(function (sel) {
        return _this13.fnInvoke(_this13.opts.pointUpdateSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(POINT$2, UPDATE)).style('fill', this.optionReaderFunc('pointFillScaleAccessor')).style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor')).attr('transform', function (d) {
        return _this13._translatePoint(d);
      }).attr('d', genSym).call(function (sel) {
        return _this13.fnInvoke(_this13.opts.pointUpdateTransitionCustomize, sel);
      });

      // Fade out removed points.
      points.exit().call(function (sel) {
        return _this13.fnInvoke(_this13.opts.pointExitSelectionCustomize, sel);
      }).transition().call(this._transitionSetup(POINT$2, EXIT)).style('opacity', 0).call(function (sel) {
        return _this13.fnInvoke(_this13.opts.pointExitTransitionCustomize, sel);
      }).remove();
    }
  }, {
    key: '_translatePoint',
    value: function _translatePoint(d) {
      var angle = this.rayAngleMap[d.prop];
      var point = getPolarCoord(this.radius(d.value), angle);
      return 'translate(' + point[0] + ', ' + point[1] + ')';
    }
  }]);
  return RadarChart;
}(PolarChart);

RadarChart.EVENTS = EVENTS$6;

function findBy(objArray, searchKey, searchKeyMatch, valueKey) {
  var v = null;

  for (var i = 0; i < objArray.length; i++) {
    if (objArray[i]) {
      if (objArray[i][searchKey] === searchKeyMatch) {
        v = objArray[i][valueKey];
        break;
      }
    }
  }

  return v;
}

var WEDGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-wedge-chart',
  piePadAngle: 0,

  margin: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },

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
      this.rawData = data;
      var itemValueProp = this.tryInvoke(this.opts.itemValueProp);

      // Data is expected to be a single value between 0 and 100.
      var pieData = [(_ref = {}, defineProperty(_ref, itemValueProp, data), defineProperty(_ref, 'css', 'monte-wedge'), _ref), (_ref2 = {}, defineProperty(_ref2, itemValueProp, 100 - data), defineProperty(_ref2, 'css', 'monte-arc-placeholder'), _ref2)];

      for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        tail[_key2 - 1] = arguments[_key2];
      }

      return (_babelHelpers$get2 = get(WedgeChart.prototype.__proto__ || Object.getPrototypeOf(WedgeChart.prototype), '_data', this)).call.apply(_babelHelpers$get2, [this, pieData].concat(tail));
    }
  }, {
    key: 'wedgeValue',
    value: function wedgeValue(value) {
      if (value === UNDEF) {
        return this.wedgeValueData;
      }

      this.data(value);
      return this;
    }
  }], [{
    key: 'createInstanceGroup',
    value: function createInstanceGroup(charts) {
      var _babelHelpers$get3;

      for (var _len3 = arguments.length, additionalMethodsToProxy = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        additionalMethodsToProxy[_key3 - 1] = arguments[_key3];
      }

      additionalMethodsToProxy.push(GROUP_PROXY_METHODS$4);
      return (_babelHelpers$get3 = get(WedgeChart.__proto__ || Object.getPrototypeOf(WedgeChart), 'createInstanceGroup', this)).call.apply(_babelHelpers$get3, [this, charts].concat(additionalMethodsToProxy));
    }
  }]);
  return WedgeChart;
}(ArcChart);

var GROUP_PROXY_METHODS$4 = ['wedgeValue'];

var HORIZONTAL = 'horizontal';
var VERTICAL = 'vertical';
var NONE = 'none';
var ANY = 'any';

var direction = Object.freeze({
	HORIZONTAL: HORIZONTAL,
	VERTICAL: VERTICAL,
	NONE: NONE,
	ANY: ANY
});

// Constants for angles:
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
var NORTH = 0;
var NORTH_NORTHWEST = -1 / 8 * PI;
var NORTHWEST = -1 / 4 * PI;
var WEST_NORTHWEST = -3 / 8 * PI;
var WEST = -HALF_PI;
var WEST_SOUTHWEST = -5 / 8 * PI;
var SOUTHWEST = -3 / 4 * PI;
var SOUTH_SOUTHWEST = -7 / 8 * PI;
var SOUTH = PI;
var SOUTH_SOUTHEAST = 7 / 8 * PI;
var SOUTHEAST = 3 / 4 * PI;
var EAST_SOUTHEAST = 5 / 8 * PI;
var EAST = HALF_PI;
var EAST_NORTHEAST = 3 / 8 * PI;
var NORTHEAST = 1 / 4 * PI;
var NORTH_NORTHEAST = 1 / 8 * PI;

var TOP = NORTH;
var TOP_BY_TOP_LEFT = NORTH_NORTHWEST;
var TOP_LEFT = NORTHWEST;
var LEFT_BY_TOP_LEFT = WEST_NORTHWEST;
var LEFT = WEST;
var LEFT_BY_BOTTOM_LEFT = WEST_SOUTHWEST;
var BOTTOM_LEFT = SOUTHWEST;
var BOTTOM_BY_BOTTOM_LEFT = SOUTH_SOUTHWEST;
var BOTTOM = SOUTH;
var BOTTOM_BY_BOTTOM_RIGHT = SOUTH_SOUTHEAST;
var BOTTOM_RIGHT = SOUTHEAST;
var RIGHT_BY_BOTTOM_RIGHT = EAST_SOUTHEAST;
var RIGHT = EAST;
var RIGHT_BY_TOP_RIGHT = EAST_NORTHEAST;
var TOP_RIGHT = NORTHEAST;
var TOP_BY_TOP_RIGHT = NORTH_NORTHEAST;

var polar = Object.freeze({
	NORTH: NORTH,
	NORTH_NORTHWEST: NORTH_NORTHWEST,
	NORTHWEST: NORTHWEST,
	WEST_NORTHWEST: WEST_NORTHWEST,
	WEST: WEST,
	WEST_SOUTHWEST: WEST_SOUTHWEST,
	SOUTHWEST: SOUTHWEST,
	SOUTH_SOUTHWEST: SOUTH_SOUTHWEST,
	SOUTH: SOUTH,
	SOUTH_SOUTHEAST: SOUTH_SOUTHEAST,
	SOUTHEAST: SOUTHEAST,
	EAST_SOUTHEAST: EAST_SOUTHEAST,
	EAST: EAST,
	EAST_NORTHEAST: EAST_NORTHEAST,
	NORTHEAST: NORTHEAST,
	NORTH_NORTHEAST: NORTH_NORTHEAST,
	TOP: TOP,
	TOP_BY_TOP_LEFT: TOP_BY_TOP_LEFT,
	TOP_LEFT: TOP_LEFT,
	LEFT_BY_TOP_LEFT: LEFT_BY_TOP_LEFT,
	LEFT: LEFT,
	LEFT_BY_BOTTOM_LEFT: LEFT_BY_BOTTOM_LEFT,
	BOTTOM_LEFT: BOTTOM_LEFT,
	BOTTOM_BY_BOTTOM_LEFT: BOTTOM_BY_BOTTOM_LEFT,
	BOTTOM: BOTTOM,
	BOTTOM_BY_BOTTOM_RIGHT: BOTTOM_BY_BOTTOM_RIGHT,
	BOTTOM_RIGHT: BOTTOM_RIGHT,
	RIGHT_BY_BOTTOM_RIGHT: RIGHT_BY_BOTTOM_RIGHT,
	RIGHT: RIGHT,
	RIGHT_BY_TOP_RIGHT: RIGHT_BY_TOP_RIGHT,
	TOP_RIGHT: TOP_RIGHT,
	TOP_BY_TOP_RIGHT: TOP_BY_TOP_RIGHT
});



var index = Object.freeze({
	d3: d3$1,
	direction: direction,
	math: math,
	polar: polar,
	CLICK: CLICK,
	TOUCHSTART: TOUCHSTART,
	TOUCHEND: TOUCHEND,
	MOUSEOVER: MOUSEOVER,
	MOUSEOUT: MOUSEOUT,
	SUPPRESSED_ERROR: SUPPRESSED_ERROR,
	EXTENSION: EXTENSION,
	BEFORE_RENDER: BEFORE_RENDER,
	RENDERED: RENDERED,
	BEFORE_UPDATE: BEFORE_UPDATE,
	UPDATED: UPDATED,
	BEFORE_BOUNDS_UPDATE: BEFORE_BOUNDS_UPDATE,
	BOUNDS_UPDATED: BOUNDS_UPDATED,
	BEFORE_CLEAR: BEFORE_CLEAR,
	CLEARED: CLEARED,
	BEFORE_DESTROY: BEFORE_DESTROY,
	DESTROYED: DESTROYED,
	BEFORE_OPTION_CHANGE: BEFORE_OPTION_CHANGE,
	OPTION_CHANGED: OPTION_CHANGED,
	BEFORE_STYLE_DOMAINS_RESET: BEFORE_STYLE_DOMAINS_RESET,
	STYLE_DOMAINS_RESET: STYLE_DOMAINS_RESET,
	INTERACTION_EVENTS: INTERACTION_EVENTS,
	INTERACTION_SHOW_EVENTS: INTERACTION_SHOW_EVENTS,
	INTERACTION_HIDE_EVENTS: INTERACTION_HIDE_EVENTS,
	CHART_SUPPORT_EVENTS: CHART_SUPPORT_EVENTS,
	CHART_LIFECYCLE_EVENTS: CHART_LIFECYCLE_EVENTS,
	EXTENSION_LIFECYCLE_EVENTS: EXTENSION_LIFECYCLE_EVENTS,
	ACTION_ADD: ACTION_ADD,
	ACTION_REMOVE: ACTION_REMOVE,
	ACTION_CSS_OVER: ACTION_CSS_OVER,
	ACTION_CSS_TOUCH: ACTION_CSS_TOUCH,
	INTERACTION_EVENT_CSS_MAP: INTERACTION_EVENT_CSS_MAP,
	UNDEF: UNDEF
});

// TODO: Allow setting presets that are automatically merged with settings to create "subtypes"?
//       For example a "Horizontal" preset for ReferenceLine that makes assumptions about x1 being 0
//       and x2 being `this.chart.width`. This could apply to charts to create standardized transistion
//       effects.
var DEFAULTS$2 = {
  // The layer for drawing operations
  layer: 'bg',

  // The chart events to listen for.
  binding: [BEFORE_DESTROY, RENDERED, UPDATED, BOUNDS_UPDATED],

  // Flag for global updates for any option change.
  // Subclasses can override `_shouldOptionUpdate` for nuanced behavior.
  optionsTriggerUpdate: false,

  // Special prefix for all events originating *from* the extension.
  eventPrefix: null,

  customEvents: []
};

var Extension = function () {
  function Extension(options) {
    classCallCheck(this, Extension);

    this.__extId = null; // Not set until a chart is bound

    // Configure the data options.
    this._initOptions(options);

    this._initPublicEvents.apply(this, toConsumableArray(EXTENSION_LIFECYCLE_EVENTS).concat(toConsumableArray(this.opts.customEvents)));

    this.lastUpdateEvent = '';
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

      // Always require the "destroying" event to ensure extension clean up.
      if (this.opts.binding.indexOf(BEFORE_DESTROY) === -1) {
        this.opts.binding.push(BEFORE_DESTROY);
      }
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      this._events = events;
    }

    /**
     * Associate a chart instance with the extension. The chart instance will be acted upon by the
     * extension instance.
     *
     * @Chainable
     */

  }, {
    key: 'setChart',
    value: function setChart(chart) {
      // Prevent setting chart more than once.
      if (this.chart && this.chart !== chart) {
        throw new MonteError('An extension should only have the chart set once.');
      }

      this.chart = chart;

      var layerName = this.tryInvoke(this.opts.layer);
      if (layerName) {
        this.layer = this.chart[layerName];
      }

      // Get and store extension ID from MonteGlobal
      this.__extId = global$1.getNextExtensionId();

      return this;
    }
  }, {
    key: 'option',
    value: function option(prop, value) {
      if (value === UNDEF) {
        return this.opts[prop];
      }

      this.opts[prop] = value;
      if (this._shouldOptionUpdate(prop) && this.cachedChart) {
        this.fire(OPTION_CHANGED, prop);
      }

      return this;
    }

    // Indicates whether an option change should cause an update to occur.

  }, {
    key: '_shouldOptionUpdate',
    value: function _shouldOptionUpdate(prop) {
      // eslint-disable-line no-unused-vars
      return this.opts.optionsTriggerUpdate;
    }

    /**
     * Binds an event to a given `callback`. If no `callback` is provided it returns the callback.
     *
     * @Chainable <setter>
     */

  }, {
    key: 'on',
    value: function on(typenames, callback) {
      if (!this.dispatch) {
        var _d;

        // Lazy construct the dispatcher.
        this.dispatch = (_d = d3).dispatch.apply(_d, toConsumableArray(this.events));
      }

      if (callback) {
        this.dispatch.on(typenames, callback);
        return this;
      }

      return this.dispatch.on(typenames);
    }

    /**
     * Force the triggering of an event with the given arguments. The event is notified through the
     * extension's dispatcher and the parent chart's dispatcher. The `on` callbacks are invoked in
     * the context of the extension for the extension's dispatcher and in the context of the chart
     * for the chart's dispatcher.
     *
     * Uses:
     *  + Trigger event for listeners as needed such as force an extension to update.
     *
     * @Chainable
     */

  }, {
    key: '__notify',
    value: function __notify(eventName) {
      var _chart;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      if (this.dispatch) {
        var _dispatch;

        (_dispatch = this.dispatch).call.apply(_dispatch, [eventName, this].concat(args));
      }

      (_chart = this.chart).emit.apply(_chart, ['extension', this.opts.eventPrefix + ':' + eventName, this].concat(args));
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      this.__notify.apply(this, [eventName].concat(args));
    }

    /**
     * Remove the data elements.
     *
     * @Chainable
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.__notify(BEFORE_CLEAR);
      this._clearDataElements();
      this.__notify(CLEARED);

      return this;
    }
  }, {
    key: '_clearDataElements',
    value: function _clearDataElements() {
      // Clear elements based on extension ID.
      this._extCreateSelection.remove();
    }

    /**
     * Invokes a lifecycle event ('destroying', 'boundsUpdated', 'rendered', 'optionChanged') with
     * all other events resulting in an 'updated' event and invoking the update-cycle.
     *
     * The 'boundsUpdated' and 'rendered' chart events result in update-cycle invocation if the
     * extension does not override the event-bound methods (`_boundsUpdate`, `_render`).
     *
     * The 'optionChanged' extension event results in `_option<>`
     */

  }, {
    key: 'fire',
    value: function fire(event) {
      if (!this.chart) {
        throw new MonteError('A chart must be associated with the extension prior to use.');
      }

      try {
        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        switch (event) {
          case BEFORE_DESTROY:
            this.destroy();
            break;

          case BOUNDS_UPDATED:
            this.updateBounds.apply(this, args);
            break;

          case RENDERED:
            this.render.apply(this, args);
            break;

          case OPTION_CHANGED:
            this._optionChanged.apply(this, args);
            break;

          default:
            this.lastUpdateEvent = event;
            this.update.apply(this, args);
        }
      } catch (e) {
        if (console && console.error) {
          console.error(e);
        } // eslint-disable-line no-console
        this.__notify(SUPPRESSED_ERROR, e, e.stack || 'No stack available.');
      }
    }

    /**
     * Invoke the extension update-cycle.
     */

  }, {
    key: 'update',
    value: function update() {
      this.__notify(BEFORE_UPDATE);
      this._update.apply(this, arguments);
      this.__notify(UPDATED);
    }
  }, {
    key: '_update',
    value: function _update(binding, chart) {
      // eslint-disable-line no-unused-vars
      throw MonteError.UnimplementedMethod('Update', '_update', 'extension');
    }

    /**
     * Invoke `_render` if defined.
     */

  }, {
    key: 'render',
    value: function render() {
      if (this._render) {
        this.__notify(BEFORE_RENDER);
        this._render.apply(this, arguments);
        this.__notify(RENDERED);
      }

      this.rendered = true;
    }

    /**
     * Invoke `_boundsUpdate` if defined.
     */

  }, {
    key: 'updateBounds',
    value: function updateBounds() {
      if (this._boundsUpdate) {
        this.__notify(BEFORE_BOUNDS_UPDATE);
        this._boundsUpdate.apply(this, arguments);
        this.__notify(BOUNDS_UPDATED);
      }
    }

    /**
     * Invoke the method related directly to the option (`_option<OptionName>`) if defined; otherwise
     * invoke the extension update-cycle.
     */

  }, {
    key: '_optionChanged',
    value: function _optionChanged() {
      var prop = arguments.length <= 0 ? undefined : arguments[0];
      var optionMethodName = '_option' + pascalCase(prop);

      this.__notify(BEFORE_OPTION_CHANGE, prop);

      if (this[optionMethodName]) {
        this[optionMethodName]();
      } else {
        this.update.apply(this, arguments);
      }

      this.__notify(OPTION_CHANGED, prop);
    }

    // Access an option that may need to be invoked as a function or that may be a literal value.

  }, {
    key: 'tryInvoke',
    value: function tryInvoke(value) {
      try {
        for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        return isFunc(value) ? value.call.apply(value, [this].concat(args)) : value;
      } catch (e) {
        if (console && console.error) {
          console.error(e);
        } // eslint-disable-line no-console
        this.__notify(SUPPRESSED_ERROR, e, e.stack || 'No stack available.');
        return null;
      }
    }

    /**
     * Reads a property from a datum and returns the raw (unscaled) value.
     */

  }, {
    key: 'getProp',
    value: function getProp(propShortName, d) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

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
    value: function _buildCss(cssSources, d, i, nodes) {
      var _this = this;

      var cssClasses = [];
      var sources = Array.isArray(cssSources) ? cssSources : [cssSources];

      sources.forEach(function (source) {
        if (isDefined(source)) {
          cssClasses.push(_this.tryInvoke(source, d, i, nodes));
        }
      });

      return cssClasses.join(' ');
    }
  }, {
    key: 'getExtId',
    value: function getExtId() {
      return this.__extId;
    }
  }, {
    key: '_getExtAttr',
    value: function _getExtAttr() {
      return 'monte-ext-' + this.getExtId(); // ID is stored on the element as an attribute.
    }

    // Sets the extension ID selector ('the ID attribute') on the element.

  }, {
    key: '_setExtAttrs',
    value: function _setExtAttrs(selection) {
      selection.attr(this._getExtAttr(), '');
    }
  }, {
    key: '_extCreateSelection',
    value: function _extCreateSelection(cssClass) {
      var extAttr = this._getExtAttr();
      var selector = '[' + extAttr + ']';

      if (cssClass) {
        selector += '.' + cssClass;
      }

      return this.layer.selectAll(selector);
    }

    /**
     * Invoke `_destroy`.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.__notify(BEFORE_DESTROY);
      this._destroy();
      this.__notify(DESTROYED);
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
  }], [{
    key: 'featureEventName',
    value: function featureEventName(featurePrefix, eventName) {
      if (featurePrefix === 'chart') {
        return eventName;
      }

      return featurePrefix + ':' + eventName;
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

      var segment = this._extCreateSelection().data([arcAngles]);
      segment.enter().append('path').call(this._setExtAttrs.bind(this)).attr('class', css).transition().call(this.chart._transitionSetup('extArc', ENTER)).attrTween('d', function (d) {
        return arcSimpleTween(_this2.arc, _this2.prev, d);
      }).on('end', function (d) {
        return _this2.prev = d;
      });

      segment.transition().call(this.chart._transitionSetup('extArc', UPDATE)).attrTween('d', function (d) {
        return arcSimpleTween(_this2.arc, _this2.prev, d);
      }).on('end', function (d) {
        return _this2.prev = d;
      });

      segment.exit().transition().call(this.chart._transitionSetup('extArc', EXIT)).style('opacity', 0.01).remove();
    }
  }]);
  return Arc;
}(Extension);

// Returns a wrapping function that invokes a series of functions all with the same arguments used
// to invoke the wrapper. The return value of each function is ignored.
function invokeMany() {
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



var index$1 = Object.freeze({
	commonEventNames: commonEventNames,
	removeClassByPattern: removeClassByPattern,
	getTreeSetting: getTreeSetting,
	invokeMany: invokeMany,
	isArray: isArray$2,
	isDefined: isDefined,
	isFunc: isFunc,
	isFuncDefined: isFuncDefined,
	isNoop: isNoop,
	isNumberLike: isNumberLike,
	isNumeric: isNumeric,
	isObject: isObject$2,
	isString: isString,
	mergeOptions: mergeOptions,
	ReplacePreceding: ReplacePreceding,
	noop: noop,
	areCoterminalAngles: areCoterminalAngles,
	getPolarCoord: getPolarCoord,
	degreesToRadians: degreesToRadians,
	radiansToDegrees: radiansToDegrees,
	arcBisect: arcBisect,
	wedgeBisect: wedgeBisect,
	resetScaleDomain: resetScaleDomain,
	camelCase: camelCase,
	kebabCase: kebabCase,
	snakeCase: snakeCase,
	pascalCase: pascalCase,
	upperFirst: upperFirst,
	combineTransforms: combineTransforms,
	readTransforms: readTransforms
});

// TODO: Add support for angle units? DEG, RAD, etc...
var AXIS_TICK_TRANSFORM_DEFAULTS = {
  binding: new ReplacePreceding(['axisRendered']),
  layer: 'support',
  eventPrefix: 'axisrotatelabel',
  axis: 'x',
  rotate: 0, // The rotation amount in degrees (SVG default units)
  textAnchor: '',
  x: function x(d, i, nodes, axis) {
    if (axis.substring(0, 1) === 'y') {
      return 0;
    }

    return 10;
  },
  y: function y(d, i, nodes, axis) {
    if (axis.substring(0, 1) === 'y') {
      return 10;
    }

    return 0;
  },

  transformCustomize: noop
};

var AxisTickTransform = function (_Extension) {
  inherits(AxisTickTransform, _Extension);

  function AxisTickTransform() {
    classCallCheck(this, AxisTickTransform);
    return possibleConstructorReturn(this, (AxisTickTransform.__proto__ || Object.getPrototypeOf(AxisTickTransform)).apply(this, arguments));
  }

  createClass(AxisTickTransform, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(AxisTickTransform.prototype.__proto__ || Object.getPrototypeOf(AxisTickTransform.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [AXIS_TICK_TRANSFORM_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update(scaleName) {
      var ext = this;
      var axis = this.tryInvoke(this.opts.axis);

      if (axis === scaleName) {
        var ticks = this.layer.selectAll('.' + axis + '-axis.axis .tick text');

        if (ext.opts.textAnchor) {
          ticks.style('text-anchor', function (d, i, nodes) {
            return ext.tryInvoke(ext.opts.textAnchor, d, i, nodes, axis);
          });
        }

        ticks.attr('transform', function (d, i, nodes) {
          var currentTransforms = readTransforms(this.getAttribute('transform'));

          var rotate = ext.tryInvoke(ext.opts.rotate, d, i, nodes, axis);
          if (isDefined(rotate)) {
            currentTransforms.rotate = [rotate];
          }

          var x = ext.tryInvoke(ext.opts.x, d, i, nodes, axis);
          var y = ext.tryInvoke(ext.opts.y, d, i, nodes, axis);
          if (isDefined(x) && isDefined(y)) {
            currentTransforms.translate = [x, y];
          }

          if (ext.opts.transformCustomize && isFunc(ext.opts.transformCustomize) && ext.opts.transformCustomize !== noop) {
            currentTransforms = ext.opts.transformCustomize(currentTransforms);
          }

          return combineTransforms(currentTransforms);
        });
      }
    }
  }]);
  return AxisTickTransform;
}(Extension);

var AXIS_LABEL_DEFAULTS = {
  binding: new ReplacePreceding(['axisRendered']),
  layer: 'support',
  eventPrefix: 'axislabelwrap',
  axis: 'x',
  labelCustomize: noop,
  lineHeightEm: 1.1,
  maxWidth: Number.POSITIVE_INFINITY
};

var AxisLabelWrap = function (_Extension) {
  inherits(AxisLabelWrap, _Extension);

  function AxisLabelWrap() {
    classCallCheck(this, AxisLabelWrap);
    return possibleConstructorReturn(this, (AxisLabelWrap.__proto__ || Object.getPrototypeOf(AxisLabelWrap)).apply(this, arguments));
  }

  createClass(AxisLabelWrap, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(AxisLabelWrap.prototype.__proto__ || Object.getPrototypeOf(AxisLabelWrap.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [AXIS_LABEL_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var axis = this.tryInvoke(this.opts.axis);
      var lineHeightEm = +this.tryInvoke(this.opts.lineHeightEm);
      var maxWidth = this.tryInvoke(this.opts.maxWidth);
      var lbls = this.layer.selectAll('.' + axis + '-axis.axis .tick text');

      this.layer.select('.' + axis + '-axis').transition().on('end', function () {
        lbls.call(wrap, maxWidth, lineHeightEm).call(function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _this2.tryInvoke.apply(_this2, [_this2.opts.labelCustomize].concat(args));
        });
      });
    }
  }]);
  return AxisLabelWrap;
}(Extension);

// Based on Mike Bostock's example at: https://bl.ocks.org/mbostock/7555321
function wrap(text, width, lineHeightEm) {
  text.each(function () {
    var text = d3.select(this);
    var words = text.text().split(/\s+/).reverse();
    var y = text.attr('y');
    var dy = parseFloat(text.attr('dy'));
    var line = [];
    var tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
    var lineNumber = 0;
    var word = words.pop();

    while (word) {
      line.push(word);
      tspan.text(line.join(' '));

      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];

        ++lineNumber;
        tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', lineNumber * lineHeightEm + dy + 'em').text(word);
      }

      word = words.pop();
    }
  });
}

var AXIS_LABEL_DEFAULTS$1 = {
  binding: new ReplacePreceding(['axisRendered']),
  layer: 'support',
  eventPrefix: 'axislabeltrunc',
  axis: 'x',
  labelCustomize: noop,
  maxWidth: Number.POSITIVE_INFINITY,
  indicator: '...'
};

var AxisLabelTruncate = function (_Extension) {
  inherits(AxisLabelTruncate, _Extension);

  function AxisLabelTruncate() {
    classCallCheck(this, AxisLabelTruncate);
    return possibleConstructorReturn(this, (AxisLabelTruncate.__proto__ || Object.getPrototypeOf(AxisLabelTruncate)).apply(this, arguments));
  }

  createClass(AxisLabelTruncate, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(AxisLabelTruncate.prototype.__proto__ || Object.getPrototypeOf(AxisLabelTruncate.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [AXIS_LABEL_DEFAULTS$1]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var axis = this.tryInvoke(this.opts.axis);
      var indicator = this.tryInvoke(this.opts.indicator);
      var maxWidth = this.tryInvoke(this.opts.maxWidth);
      var lbls = this.layer.selectAll('.' + axis + '-axis.axis .tick text');

      this.layer.select('.' + axis + '-axis').transition().on('end', function () {
        lbls.call(limit, maxWidth, indicator).call(function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _this2.tryInvoke.apply(_this2, [_this2.opts.labelCustomize].concat(args));
        });
      });
    }
  }]);
  return AxisLabelTruncate;
}(Extension);

// Based on Mike Bostock's wrapping example at: https://bl.ocks.org/mbostock/7555321
function limit(text, width, indicator) {
  text.each(function () {
    var textSel = d3.select(this);
    var node = textSel.node();
    var w = width < 1 ? 1 : width;
    var origText = textSel.text();
    var text = textSel.text();
    var wasTruncated = false;

    while (node.getComputedTextLength() > w) {
      text = text.slice(0, -1);
      textSel.text(text + indicator);
      wasTruncated = true;
    }

    // Set the original text as the "title" attribute on the axis text element.
    if (wasTruncated) {
      textSel.append('title').text(origText);
    }
  });
}

// TODO: Add support for "always active" (i.e chart:mousemove)
var CROSSHAIR_DEFAULTS = {
  featurePrefix: 'point',
  eventPrefix: 'crosshair',
  crosshairCss: '',
  lines: ['bottom', 'left'],
  alignmentShift: AXIS_SHIFT, // Use a slight shift to match default d3-axis drawing.
  showBindings: INTERACTION_SHOW_EVENTS,
  hideBindings: INTERACTION_HIDE_EVENTS,
  topCustomize: noop,
  leftCustomize: noop,
  rightCustomize: noop,
  bottomCustomize: noop
};

// Draws lines connecting a chart feature to axes and/or chart edges.
var Crosshair = function (_Extension) {
  inherits(Crosshair, _Extension);

  function Crosshair() {
    classCallCheck(this, Crosshair);
    return possibleConstructorReturn(this, (Crosshair.__proto__ || Object.getPrototypeOf(Crosshair)).apply(this, arguments));
  }

  createClass(Crosshair, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get,
          _this2 = this;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(Crosshair.prototype.__proto__ || Object.getPrototypeOf(Crosshair.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [CROSSHAIR_DEFAULTS]));

      var showBindings = this.tryInvoke(this.opts.showBindings);
      var hideBindings = this.tryInvoke(this.opts.hideBindings);
      var featurePrefix = this.tryInvoke(this.opts.featurePrefix);
      if (!isArray$2(featurePrefix)) {
        featurePrefix = [featurePrefix];
      }

      this.showEvents = [];
      this.hideEvents = [];

      featurePrefix.forEach(function (fp) {
        showBindings.forEach(function (ev) {
          var fev = Extension.featureEventName(fp, ev);
          _this2.opts.binding.push(fev);
          _this2.showEvents.push(fev);
        });

        hideBindings.forEach(function (ev) {
          var fev = Extension.featureEventName(fp, ev);
          _this2.opts.binding.push(fev);
          _this2.hideEvents.push(fev);
        });
      });
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this3 = this;

      var ext = this;
      var css = this.tryInvoke(this.opts.crosshairCss);
      var linesToDraw = this.tryInvoke(this.opts.lines);
      var lines = this._extCreateSelection().data(linesToDraw).order();
      var shift = this.tryInvoke(this.opts.alignmentShift);
      var coords = {
        top: {
          x1: function x1(d) {
            return _this3.chart.getScaledProp('x', d) + shift;
          },
          y1: 0,
          x2: function x2(d) {
            return _this3.chart.getScaledProp('x', d) + shift;
          },
          y2: function y2(d) {
            return _this3.chart.getScaledProp('y', d);
          }
        },

        left: {
          x1: 0,
          y1: function y1(d) {
            return _this3.chart.getScaledProp('y', d) + shift;
          },
          x2: function x2(d) {
            return _this3.chart.getScaledProp('x', d);
          },
          y2: function y2(d) {
            return _this3.chart.getScaledProp('y', d) + shift;
          }
        },

        right: {
          x1: function x1(d) {
            return _this3.chart.getScaledProp('x', d);
          },
          y1: function y1(d) {
            return _this3.chart.getScaledProp('y', d) + shift;
          },
          x2: this.chart.width,
          y2: function y2(d) {
            return _this3.chart.getScaledProp('y', d) + shift;
          }
        },

        bottom: {
          x1: function x1(d) {
            return _this3.chart.getScaledProp('x', d) + shift;
          },
          y1: function y1(d) {
            return _this3.chart.getScaledProp('y', d);
          },
          x2: function x2(d) {
            return _this3.chart.getScaledProp('x', d) + shift;
          },
          y2: this.chart.height
        }
      };

      if (this.lastUpdateEvent === 'updated') {
        lines.enter().append('line').call(this._setExtAttrs.bind(this)).attr('opacity', 0).attr('class', css).classed('monte-ext-crosshair', true);

        if (this.activeFeatureDatum) {
          lines.transition().call(this.chart._transitionSetup('extCrosshair', UPDATE)).each(setLinePoints);
        }

        lines.exit().transition().call(this.chart._transitionSetup('extCrosshair', EXIT)).attr('opacity', 0).remove();
      } else if (this.isShowEvent(this.lastUpdateEvent)) {
        var featureDatum = arguments.length <= 0 ? undefined : arguments[0];
        this.activeFeatureDatum = featureDatum;

        lines.interrupt().attr('opacity', 1).each(setLinePoints);
      } else if (this.isHideEvent(this.lastUpdateEvent)) {
        this.activeFeatureDatum = null;
        lines.interrupt().attr('opacity', 0);
      }

      // Function is invoked in the `d3.each` context (i.e. `this` is the current element)
      function setLinePoints(d) {
        var node = d3.select(this);
        var customize = ext.opts[d + 'Customize'];
        var points = {
          x1: ext.tryInvoke(coords[d].x1, ext.activeFeatureDatum),
          y1: ext.tryInvoke(coords[d].y1, ext.activeFeatureDatum),
          x2: ext.tryInvoke(coords[d].x2, ext.activeFeatureDatum),
          y2: ext.tryInvoke(coords[d].y2, ext.activeFeatureDatum)
        };

        if (isDefined(customize) && isFunc(customize) && customize !== noop) {
          points = ext.tryInvoke(customize, points);
        }

        node.attr('x1', points.x1).attr('y1', points.y1).attr('x2', points.x2).attr('y2', points.y2);
      }
    }
  }, {
    key: 'isShowEvent',
    value: function isShowEvent(event) {
      return this.showEvents.indexOf(event) > -1;
    }
  }, {
    key: 'isHideEvent',
    value: function isHideEvent(event) {
      return this.hideEvents.indexOf(event) > -1;
    }
  }]);
  return Crosshair;
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
    key: '_update',
    value: function _update() {
      var chart = this.chart;
      var css = this.tryInvoke(this.opts.frameLineCss);
      var edgesToDraw = this.tryInvoke(this.opts.edges);
      var edges = this._extCreateSelection().data(edgesToDraw).order();
      var shift = this.tryInvoke(this.opts.alignmentShift);
      var coords = {
        top: [[0 + shift, 0 + shift], [chart.width + shift, 0 + shift]],
        right: [[chart.width + shift, 0 + shift], [chart.width + shift, chart.height + shift]],
        bottom: [[0 + shift, chart.height + shift], [chart.width + shift, chart.height + shift]],
        left: [[0 + shift, 0 + shift], [0 + shift, chart.height + shift]]
      };

      edges.enter().append('line').call(this._setExtAttrs.bind(this)).attr('class', css).attr('x1', function (d) {
        return coords[d][0][0];
      }).attr('y1', function (d) {
        return coords[d][0][1];
      }).attr('x2', function (d) {
        return coords[d][1][0];
      }).attr('y2', function (d) {
        return coords[d][1][1];
      });

      edges.transition().call(this.chart._transitionSetup('extFrame', UPDATE)).attr('x1', function (d) {
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
  axisLayer: 'support',
  prefixCssMap: {
    'x': 'v-line',
    'y': 'h-line'
  },
  lineCss: 'monte-ext-grid-line',
  binding: new ReplacePreceding(['axisRendered']),
  x1Adjust: 0,
  x2Adjust: 0,
  y1Adjust: 0,
  y2Adjust: 0,

  // Draw vertical lines for X, and horziontal for Y
  orient: function orient(scaleName) {
    if (scaleName.charAt(0) === 'x') {
      return VERTICAL;
    } else if (scaleName.charAt(0) === 'y') {
      return HORIZONTAL;
    }

    throw new MonteOptionError('Unknown grid direction for scale ' + scaleName);
  }
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
    value: function _update(scaleName, axis, axisTransition) {
      var _this2 = this;

      var axesChart = this.chart;

      // Set transition defaults if `axisTransition` is undefined or null.
      if (!isDefined(axisTransition)) {
        var action = this.chart.hasRendered ? UPDATE : ENTER;
        var axisLayerName = this.tryInvoke(this.opts.axisLayer);
        var axisLayer = this.chart[axisLayerName];
        axisTransition = axisLayer.transition().call(this.chart._transitionSetup('axis', action));
      }

      var prefixCssMap = this.tryInvoke(this.opts.prefixCssMap);

      // Draw all axis
      axesChart.forEachAxisScale(function (scaleName) {
        if (!prefixCssMap[scaleName]) {
          return;
        }

        var css = _this2.getCss(scaleName, prefixCssMap);
        var scale = axesChart[scaleName];
        var axis = axesChart[scaleName + 'Axis'];
        var orient = _this2.tryInvoke(_this2.opts.orient, scaleName);

        if (css && scale && axis) {
          // Next three lines match internal workings of the D3 Axis object.
          var tickValues = axis.tickValues();
          var tickArguments = axis.tickArguments();
          var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues;

          var ticks = _this2._extCreateSelection(css).data(values, function (d) {
            return d;
          });

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

      if (cfg.orient === HORIZONTAL) {
        ticks.enter().append('line').call(this._setExtAttrs.bind(this)).attr('class', fullCss).attr('x1', 0).attr('x2', 0).attr('x1', 0 + x1).attr('x2', cfg.axesChart.width + x2).attr('y1', AXIS_SHIFT + y1).attr('y2', AXIS_SHIFT + y2).attr('transform', function (d) {
          return 'translate(0,' + cfg.scale(d) + ')';
        }).style('opacity', 0).transition(axisTransition).style('opacity', 1);

        ticks.transition(axisTransition).attr('x1', function () {
          return 0 + x1;
        }).attr('x2', function () {
          return cfg.axesChart.width + x2;
        }).attr('transform', function (d) {
          return 'translate(0,' + cfg.scale(d) + ')';
        }).style('opacity', 1);
      } else if (cfg.orient === VERTICAL) {
        ticks.enter().append('line').call(this._setExtAttrs.bind(this)).attr('class', fullCss).attr('x1', AXIS_SHIFT + x1).attr('x2', AXIS_SHIFT + x2).attr('y1', 0 + y1).attr('y2', cfg.axesChart.height + y2).attr('transform', function (d) {
          return 'translate(' + cfg.scale(d) + ', 0)';
        }).style('opacity', 0).transition(axisTransition).style('opacity', 1);

        ticks.transition(axisTransition).attr('y1', function () {
          return 0 + y1;
        }).attr('y2', function () {
          return cfg.axesChart.height + y2;
        }).attr('transform', function (d) {
          return 'translate(' + cfg.scale(d) + ', 0)';
        }).style('opacity', 1);
      }

      ticks.exit().transition(axisTransition).style('opacity', 0).remove();
    }
  }, {
    key: 'getCss',
    value: function getCss(scaleName, prefixCssMap) {
      for (var prefix in prefixCssMap) {
        if (this.opts.prefixCssMap.hasOwnProperty(prefix)) {
          var hasPrefix = scaleName.substr(0, prefix.length) === prefix;

          if (hasPrefix) {
            return this.tryInvoke(this.opts.prefixCssMap[prefix]);
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
  labelCss: 'monte-ext-label',
  text: '',
  x: 0,
  y: 0,
  dy: '0.35em',
  dx: 0,
  anchor: 'start',
  labelCustomize: noop,
  maxWidth: Number.POSITIVE_INFINITY
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

      var labelCss = this.tryInvoke(this.opts.labelCss);
      var text = this.tryInvoke(this.opts.text);
      var maxWidth = +this.tryInvoke(this.opts.maxWidth);

      var lbl = this._extCreateSelection().data([text]);

      lbl.enter().append('text').call(this._setExtAttrs.bind(this)).attr('class', labelCss).merge(lbl).html(function (d) {
        return d;
      }).attr('text-anchor', this.tryInvoke(this.opts.anchor)).call(function (lblSel) {
        return _this2._checkMaxWidth(lblSel, maxWidth);
      }).attr('x', this.tryInvoke(this.opts.x)).attr('y', this.tryInvoke(this.opts.y)).attr('dx', this.tryInvoke(this.opts.dx)).attr('dy', this.tryInvoke(this.opts.dy)).call(function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this2.tryInvoke.apply(_this2, [_this2.opts.labelCustomize].concat(args));
      });

      lbl.exit().remove();
    }
  }, {
    key: '_checkMaxWidth',
    value: function _checkMaxWidth(lblSel, maxWidth) {
      if (isNumeric(maxWidth) && maxWidth > 0) {
        var el = lblSel.node();
        var currentWidth = el.getBBox().width;

        if (currentWidth > maxWidth) {
          var currentFontSize = getFontSize(el);
          var newFontSize = currentFontSize * maxWidth / currentWidth;

          // Store original font size to be potentially restored later.
          if (!this.origFontSize) {
            this.origFontSize = currentFontSize;
          }

          lblSel.style('font-size', newFontSize + 'px');
        } else if (isDefined(this.origFontSize) && currentWidth < maxWidth) {
          // The font size has been changed and no longer needs to be scaled down
          var _currentFontSize = getFontSize(el);
          var _newFontSize = _currentFontSize * maxWidth / currentWidth;

          if (_newFontSize > this.origFontSize) {
            // New font would be larger than the original, don't grow but use restore original font size
            lblSel.style('font-size', this.origFontSize + 'px');
          } else {
            // Use new intermediate font size
            lblSel.style('font-size', _newFontSize + 'px');
          }
        }
      }
    }
  }]);
  return Label;
}(Extension);

function getFontSize(el) {
  var style = window.getComputedStyle(el, null);
  return parseFloat(style.getPropertyValue('font-size'), 10);
}

var POLAR_GRID_DEFAULTS = {
  eventPrefix: 'polargrid',
  startAngle: 0,
  endAngle: TAU,
  arcRadii: [100],
  arcCss: 'monte-ext-polar-grid-arc',
  arcSpecificCss: null,
  arcSort: function arcSort(a, b) {
    return b - a;
  },
  arcWidth: 0,
  cornerRadius: 0
};

/**
 * Creates a set of concentric arcs with the given `arcRadii` that start and end at `startAngle` and
 * `endAngle` respectively.
 */
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

      var arcWidth = this.tryInvoke(this.opts.arcWidth);
      this.arc = d3.arc().innerRadius(function (d) {
        return d.radius;
      }).outerRadius(function (d) {
        return d.radius + arcWidth;
      }).cornerRadius(this.tryInvoke(this.opts.cornerRadius));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var radii = this.tryInvoke(this.opts.arcRadii);
      var data = radii.sort(this.opts.arcSort);
      var arcs = this._extCreateSelection().data(data);
      var startAngle = this.tryInvoke(this.opts.startAngle);
      var endAngle = this.tryInvoke(this.opts.endAngle);
      var arcAngles = isDefined(startAngle) && isDefined(endAngle) ? {
        startAngle: startAngle,
        endAngle: endAngle
      } : {
        startAngle: isDefined(startAngle) ? startAngle : endAngle,
        endAngle: isDefined(startAngle) ? startAngle : endAngle
      };

      arcs.enter().append('path').call(this._setExtAttrs.bind(this)).merge(arcs).attr('class', this.tryInvoke(this.opts.arcCss)).attr('d', function (d) {
        arcAngles.radius = d;
        return _this2.arc(arcAngles);
      });

      arcs.exit().remove();
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

/**
 * Draws a line oriented from the origin outward. The line begins at the `innerRadius` and ends at
 * the `outerRadius`.
 */
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
    }
  }, {
    key: '_render',
    value: function _render() {
      this.innerArc = d3.arc();
      this.outerArc = d3.arc();
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var innerRadius = this.tryInvoke(this.opts.innerRadius);
      var outerRadius = this.tryInvoke(this.opts.outerRadius);
      var css = this.tryInvoke(this.opts.lineCss);
      var angle = this.tryInvoke(this.opts.angle);
      var line = this._extCreateSelection().data([{ startAngle: angle, endAngle: angle }]);
      var newLine = line.enter().append('line').call(this._setExtAttrs.bind(this)).attr('class', css);

      this.innerArc.innerRadius(innerRadius).outerRadius(innerRadius);
      this.outerArc.innerRadius(outerRadius).outerRadius(outerRadius);

      if (isDefined(angle)) {
        newLine.merge(line).transition().call(this.chart._transitionSetup('extPolarLine', UPDATE)).attr('x1', function (d) {
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

var POLAR_ROTATE_LABEL_DEFAULTS = {
  layer: 'draw',
  eventPrefix: 'polarRotateLabel',
  labelCss: 'monte-arc-label',
  rotation: polarLabelRotateTangentFlip
};

var PolarRotateLabel = function (_Extension) {
  inherits(PolarRotateLabel, _Extension);

  function PolarRotateLabel() {
    classCallCheck(this, PolarRotateLabel);
    return possibleConstructorReturn(this, (PolarRotateLabel.__proto__ || Object.getPrototypeOf(PolarRotateLabel)).apply(this, arguments));
  }

  createClass(PolarRotateLabel, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(PolarRotateLabel.prototype.__proto__ || Object.getPrototypeOf(PolarRotateLabel.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_ROTATE_LABEL_DEFAULTS]));
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var css = this.tryInvoke(this.opts.labelCss);
      var labels = this.layer.selectAll('.' + css);

      labels.attr('transform', function (d, i, nodes) {
        var nodeSel = d3.select(nodes[i]);
        var rotate = radiansToDegrees(_this2.tryInvoke(_this2.opts.rotation, d, i, nodes));
        var currentTransforms = readTransforms(nodeSel.attr('transform'));
        currentTransforms.rotate = [rotate]; // Replace existing if it's there; otherwise add it.

        return combineTransforms(currentTransforms);
      });
    }
  }]);
  return PolarRotateLabel;
}(Extension);

var POLAR_TICKS_DEFAULTS = {
  eventPrefix: 'polarticks',
  startAngle: 0,
  endAngle: TAU,
  tickInterval: 1 / 8 * TAU, // 8 ticks, one every 45 deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-ext-polar-tick',
  suppressEnd: false
};

var PolarTicks = function (_Extension) {
  inherits(PolarTicks, _Extension);

  function PolarTicks() {
    classCallCheck(this, PolarTicks);
    return possibleConstructorReturn(this, (PolarTicks.__proto__ || Object.getPrototypeOf(PolarTicks)).apply(this, arguments));
  }

  createClass(PolarTicks, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(PolarTicks.prototype.__proto__ || Object.getPrototypeOf(PolarTicks.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [POLAR_TICKS_DEFAULTS]));

      var innerRadius = this.tryInvoke(this.opts.innerRadius);
      var outerRadius = this.tryInvoke(this.opts.outerRadius);
      this.innerArc = d3.arc().innerRadius(innerRadius).outerRadius(innerRadius);
      this.outerArc = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius);
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      var data = [];
      var startAngle = this.tryInvoke(this.opts.startAngle);
      var endAngle = this.tryInvoke(this.opts.endAngle);
      var tickInterval = this.tryInvoke(this.opts.tickInterval);
      var suppressEnd = this.tryInvoke(this.opts.suppressEnd);
      var tickCss = this.tryInvoke(this.opts.tickCss);

      var tickCount = Math.abs(endAngle - startAngle) / tickInterval;

      // Include every tick, within the arc unless they would overlap at the start and end (such as
      // start (0) and end of a circle (2Pi)).
      if (!suppressEnd && !areCoterminalAngles(startAngle, endAngle)) {
        tickCount++;
      }

      for (var i = 0; i < tickCount; i++) {
        var angle = startAngle + i * tickInterval;

        // Create data structure that `arc` handles.
        data.push({
          startAngle: angle,
          endAngle: angle,
          value: i
        });
      }

      var ticks = this._extCreateSelection().data(data);

      ticks.enter().append('line').call(this._setExtAttrs.bind(this)).merge(ticks).attr('class', tickCss).attr('x1', function (d) {
        return _this2.innerArc.centroid(d)[0];
      }).attr('y1', function (d) {
        return _this2.innerArc.centroid(d)[1];
      }).attr('x2', function (d) {
        return _this2.outerArc.centroid(d)[0];
      }).attr('y2', function (d) {
        return _this2.outerArc.centroid(d)[1];
      });

      ticks.exit().remove();
    }
  }]);
  return PolarTicks;
}(Extension);

var BAR_BG_DEFAULTS = {
  eventPrefix: 'barbg',
  barBgCss: 'monte-ext-bar-bg',
  data: null,
  maxValue: null, // Maximum value
  maxValueProp: null, // Maximum value taken from chart data
  minValue: null, // Minimum value
  minValueProp: null, // Minimum value taken from chart data
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
        data = this.tryInvoke(this.opts.data);
      } else {
        data = this._buildData(barChart, chartData);
      }

      var bgs = this._extCreateSelection().data(data);
      var sizeAdjust = this._sizeAdjust(barChart);
      var css = this.tryInvoke(this.opts.barBgCss);

      bgs.enter().append('rect').call(this._setExtAttrs.bind(this)).merge(bgs).attr('class', css).attr('x', function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _this2._x.apply(_this2, [barChart, sizeAdjust].concat(args));
      }).attr('y', function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return _this2._y.apply(_this2, [barChart, sizeAdjust].concat(args));
      }).attr('width', function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _this2._width.apply(_this2, [barChart, sizeAdjust].concat(args));
      }).attr('height', function () {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        return _this2._height.apply(_this2, [barChart, sizeAdjust].concat(args));
      }).attr('rx', function (d, i) {
        return _this2.tryInvoke(_this2.opts.cornerRadius, d, i);
      });

      bgs.exit().remove();
    }
  }, {
    key: '_buildData',
    value: function _buildData(barChart, chartData) {
      var data = new Array(chartData.length);
      var domain = barChart.y.domain();

      for (var i = 0; i < data.length; i++) {
        var _data$i;

        var minValueProp = this.tryInvoke(this.opts.minValueProp);
        var maxValueProp = this.tryInvoke(this.opts.maxValueProp);
        var minVal = minValueProp ? chartData[i][minValueProp] : null;
        var maxVal = maxValueProp ? chartData[i][maxValueProp] : null;

        data[i] = (_data$i = {}, defineProperty(_data$i, barChart.option('xProp'), chartData[i][barChart.option('xProp')]), defineProperty(_data$i, 'min', minVal || this.opts.minValue || domain[0]), defineProperty(_data$i, 'max', maxVal || this.opts.maxValue || domain[1]), _data$i);
      }

      return data;
    }
  }, {
    key: '_sizeAdjust',
    value: function _sizeAdjust(barChart) {
      var enlarge = this.tryInvoke(this.opts.enlarge);
      return barChart.x.bandwidth() * enlarge;
    }
  }, {
    key: '_x',
    value: function _x(barChart, sizeAdjust) {
      for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
        args[_key6 - 2] = arguments[_key6];
      }

      var v = barChart._barX.bind(barChart).apply(undefined, args) + this._xShift(sizeAdjust);
      return v;
    }
  }, {
    key: '_xShift',
    value: function _xShift(sizeAdjust) {
      return -sizeAdjust;
    }
  }, {
    key: '_y',
    value: function _y(barChart, sizeAdjust, d) {
      return barChart.y(d.max) + this._yShift(sizeAdjust);
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
    key: '_width',
    value: function _width(barChart, sizeAdjust, d) {
      var bw = barChart._barWidth(d);
      var wa = this._widthAdjust(sizeAdjust);
      return bw + wa;
    }
  }, {
    key: '_heightAdjust',
    value: function _heightAdjust(sizeAdjust) {
      // eslint-disable-line no-unused-vars
      return 0;
    }
  }, {
    key: '_height',
    value: function _height(barChart, sizeAdjust, d) {
      var z = barChart.y(0);
      var h = barChart.y(d.min) - z + (z - barChart.y(d.max));
      return h + this._heightAdjust(sizeAdjust);
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

        var minValueProp = this.tryInvoke(this.opts.minValueProp);
        var maxValueProp = this.tryInvoke(this.opts.maxValueProp);
        var minVal = minValueProp ? chartData[i][minValueProp] : null;
        var maxVal = maxValueProp ? chartData[i][maxValueProp] : null;

        data[i] = (_data$i2 = {}, defineProperty(_data$i2, hBarChart.option('yProp'), chartData[i][hBarChart.option('yProp')]), defineProperty(_data$i2, 'min', minVal || this.opts.minValue || domain[0]), defineProperty(_data$i2, 'max', maxVal || this.opts.maxValue || domain[1]), _data$i2);
      }

      return data;
    }
  }, {
    key: '_sizeAdjust',
    value: function _sizeAdjust(barChart) {
      return barChart.y.bandwidth() * this.opts.enlarge;
    }
  }, {
    key: '_x',
    value: function _x(barChart, sizeAdjust, d) {
      return barChart.x(d.min) + this._xShift(sizeAdjust);
    }
  }, {
    key: '_xShift',
    value: function _xShift(sizeAdjust) {
      // eslint-disable-line no-unused-vars
      return 0;
    }
  }, {
    key: '_y',
    value: function _y(barChart, sizeAdjust) {
      for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
        args[_key7 - 2] = arguments[_key7];
      }

      var v = barChart._barY.bind(barChart).apply(undefined, args) + this._yShift(sizeAdjust);
      return v;
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
    key: '_width',
    value: function _width(barChart, sizeAdjust, d) {
      var z = barChart.x(0);
      var w = z - barChart.x(d.min) + (barChart.x(d.max) - z);
      return w + this._widthAdjust(sizeAdjust);
    }
  }, {
    key: '_heightAdjust',
    value: function _heightAdjust(sizeAdjust) {
      return 2 * sizeAdjust;
    }
  }, {
    key: '_height',
    value: function _height(barChart, sizeAdjust, d) {
      var bh = barChart._barHeight(d);
      var ha = this._heightAdjust(sizeAdjust);
      return bh + ha;
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
var LABEL_PLACEMENT$1 = {
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

      this.lineData = this.tryInvoke(this.opts.data);

      if (!isArray$2(this.lineData) && isDefined(this.lineData)) {
        this.lineData = [this.lineData];
      } else if (!isDefined(this.lineData)) {
        this.lineData = [];
      }

      var lines = this._extCreateSelection().data(this.lineData);
      var css = this.tryInvoke(this.opts.css);
      var anchor = this.tryInvoke(this.opts.textAnchor);

      // Enter
      var enter = lines.enter().append('g').call(this._setExtAttrs.bind(this)).attr('class', css);
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

      update.select('text').attr('text-anchor', anchor).text(function (d) {
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
      var placement = LABEL_PLACEMENT$1[labelPlacement];
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

var SELECTION_CHANGED = 'selectionChanged';
var SELECTION_MOVE = 'selectionMove';
var SELECTION_START = 'selectionStart';
var SELECTION_END = 'selectionEnd';
var SELECTION_EVENTS = [SELECTION_CHANGED, SELECTION_MOVE, SELECTION_START, SELECTION_END];

var SELECTION_RECT_DEFAULTS = {
  css: '',
  layer: 'selection',
  eventPrefix: 'selectionRect',
  selectionDirection: null,
  handleSize: BRUSH_HANDLE_SIZE,

  extent: function extent(w, h, selectionDirection) {
    // eslint-disable-line no-unused-vars
    return [[0, 0], [w, h]];
  },

  initialSelection: function initialSelection(w, h, selectionDirection) {
    if (this.isXYBrush(selectionDirection)) {
      return [[0, 0], [0, 0]]; // Select none and allow user to make a custom selection.
    } else if (this.isXBrush(selectionDirection)) {
      return [0, w]; // Select entire region, because no small generalization can be made.
    } else if (this.isYBrush(selectionDirection)) {
      return [0, h]; // Select entire region, because no small generalization can be made.
    }
  },

  filter: null,
  customHandlePath: null
};

var SelectionRect = function (_Extension) {
  inherits(SelectionRect, _Extension);

  function SelectionRect() {
    classCallCheck(this, SelectionRect);
    return possibleConstructorReturn(this, (SelectionRect.__proto__ || Object.getPrototypeOf(SelectionRect)).apply(this, arguments));
  }

  createClass(SelectionRect, [{
    key: '_initOptions',
    value: function _initOptions() {
      var _babelHelpers$get;

      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      (_babelHelpers$get = get(SelectionRect.prototype.__proto__ || Object.getPrototypeOf(SelectionRect.prototype), '_initOptions', this)).call.apply(_babelHelpers$get, [this].concat(options, [SELECTION_RECT_DEFAULTS]));
    }
  }, {
    key: '_initPublicEvents',
    value: function _initPublicEvents() {
      for (var _len2 = arguments.length, events = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        events[_key2] = arguments[_key2];
      }

      events.push.apply(events, SELECTION_EVENTS);
      get(SelectionRect.prototype.__proto__ || Object.getPrototypeOf(SelectionRect.prototype), '_initPublicEvents', this).call(this, events);
    }
  }, {
    key: '_brush',
    value: function _brush(selectionDirection) {
      var brush = void 0;
      var css = void 0;

      if (this.isXYBrush(selectionDirection)) {
        brush = d3.brush();
        css = 'select-dir-all';
      } else if (this.isXBrush(selectionDirection)) {
        brush = d3.brushX();
        css = 'select-dir-x';
      } else if (this.isYBrush(selectionDirection)) {
        brush = d3.brushY();
        css = 'select-dir-y';
      } else {
        var msg = 'The "selectionDirection" option must be a direction (' + HORIZONTAL + ', ' + VERTICAL + ', or ' + NONE + '), axis (x or y), or an unset value (null or undefined).';
        throw new MonteOptionError(msg);
      }

      return { brush: brush, css: css };
    }
  }, {
    key: '_handles',
    value: function _handles(selectionDirection) {
      if (this.isXYBrush(selectionDirection)) {
        return [{ type: 'n' }, { type: 'e' }, { type: 's' }, { type: 'w' }];
      } else if (this.isXBrush(selectionDirection)) {
        return [{ type: 'e' }, { type: 'w' }];
      } else if (this.isYBrush(selectionDirection)) {
        return [{ type: 'n' }, { type: 's' }];
      }
    }
  }, {
    key: '_render',
    value: function _render() {
      var selectionDirection = this.tryInvoke(this.opts.selectionDirection);
      var handleSize = this.tryInvoke(this.opts.handleSize);
      var css = this.tryInvoke(this.opts.css);
      var w = this.chart.width;
      var h = this.chart.height;
      var extent = this.tryInvoke(this.opts.extent, w, h, selectionDirection);
      var initialSelection = this.tryInvoke(this.opts.initialSelection, w, h, selectionDirection);
      var brushDetails = this._brush(selectionDirection);

      this.selectionDirection = selectionDirection;
      this.extent = extent;
      this.brush = brushDetails.brush.extent(extent);
      this.brush.handleSize(handleSize).on('start', this._brushMove.bind(this, SELECTION_START)).on('brush', this._brushMove.bind(this, SELECTION_MOVE)).on('end', this._brushMove.bind(this, SELECTION_END));

      // Setup brush / selection layer.
      this.brushSel = this.layer.classed('monte-ext-selection-rect', true).classed(brushDetails.css, true).classed(css, true).call(this.brush);

      // Associate filter function if defined.
      if (isDefined(this.opts.filter) && isFunc(this.opts.filter)) {
        this.brush.filter(this.opts.filter);
      }

      // Draw custom handles
      if (isDefined(this.opts.customHandlePath) && this.opts.customHandlePath !== noop) {
        this._renderCustomHandles();
        this.brushSel.classed('custom-handles', true);
      } else {
        this.brushSel.classed('standard-handles', true);
      }

      // Break apart chain to ensure `brushSel` is assigned to before move and event listeners are
      // invoked.
      this.brush.move(this.brushSel, initialSelection);
    }
  }, {
    key: '_renderCustomHandles',
    value: function _renderCustomHandles() {
      var _this2 = this;

      this.brushSel.selectAll('.handle--custom').data(this._handles(this.selectionDirection)).enter().append('path').attr('display', 'none').attr('class', function (d) {
        return 'handle--custom ' + d.type;
      }).attr('d', function (d, i, nodes) {
        return _this2.tryInvoke(_this2.opts.customHandlePath, d, i, nodes);
      });

      this.usingCustomHandles = true;
    }
  }, {
    key: '_boundsUpdate',
    value: function _boundsUpdate() {
      var w = this.chart.width;
      var h = this.chart.height;
      var extent = this.tryInvoke(this.opts.extent, w, h, this.selectionDirection);
      this.extent = extent;
      this.brush.extent(extent);
      this.brushSel.call(this.brush);

      // Update proper scale of rect if the chart is resized.
      this.brush.move(this.brushSel, this.unscaleSelection(this._selection.scaled));
    }
  }, {
    key: '_update',
    value: function _update() {}
  }, {
    key: '_brushMove',
    value: function _brushMove(ev) {
      var _this3 = this;

      var s = this.selection();
      this._selection = s;

      if (this.usingCustomHandles) {
        var handle = this.brushSel.selectAll('.handle--custom');

        if (s.raw == null) {
          handle.attr('display', 'none');
        } else {
          handle.attr('display', null).attr('transform', function (d) {
            var x = _this3._handleX(d.type, s.raw);
            var y = _this3._handleY(d.type, s.raw);
            return 'translate(' + x + ',' + y + ')';
          });
        }
      }

      this.emit(ev, s);
      this.emit(SELECTION_CHANGED, s);
    }

    // NOTE: The scaled y0 and y1 are flipped because height and origin are flipped by convention
    //       in the axes charts.

  }, {
    key: 'scaleSelection',
    value: function scaleSelection(rawSelection) {
      var selectionDirection = this.selectionDirection;
      var s = rawSelection;

      if (!s) {
        return s;
      }

      if (this.isXYBrush(selectionDirection)) {
        // [[x0, y0], [x1, y1]]
        return [[this.chart.x.invert(s[0][0]), this.chart.y.invert(s[1][1])], [this.chart.x.invert(s[1][0]), this.chart.y.invert(s[0][1])]];
      } else if (this.isXBrush(selectionDirection)) {
        // [x0, x1]
        return [this.chart.x.invert(s[0]), this.chart.x.invert(s[1])];
      } else if (this.isYBrush(selectionDirection)) {
        // [y0, y1]
        return [this.chart.y.invert(s[1]), this.chart.y.invert(s[0])];
      }
    }
  }, {
    key: 'unscaleSelection',
    value: function unscaleSelection(scaledSelection) {
      var selectionDirection = this.selectionDirection;
      var s = scaledSelection;

      if (!s) {
        return s;
      }

      if (this.isXYBrush(selectionDirection)) {
        // [[x0, y0], [x1, y1]]
        return [[this.chart.x(s[0][0]), this.chart.y(s[1][1])], [this.chart.x(s[1][0]), this.chart.y(s[0][1])]];
      } else if (this.isXBrush(selectionDirection)) {
        // [x0, x1]
        return [this.chart.x(s[0]), this.chart.x(s[1])];
      } else if (this.isYBrush(selectionDirection)) {
        // [y0, y1]
        return [this.chart.y(s[1]), this.chart.y(s[0])];
      }
    }
  }, {
    key: 'selection',
    value: function selection() {
      var raw = d3.brushSelection(this.brushSel.node());
      var scaled = this.scaleSelection(raw);

      return { raw: raw, scaled: scaled };
    }
  }, {
    key: 'clearSelection',
    value: function clearSelection() {
      this.brushSel.call(this.brush.move, null);
    }
  }, {
    key: 'destroy',
    value: function destroy() {}
  }, {
    key: 'isXYBrush',
    value: function isXYBrush(selectionDirection) {
      return !isDefined(selectionDirection) || selectionDirection === NONE || selectionDirection === ANY;
    }
  }, {
    key: 'isXBrush',
    value: function isXBrush(selectionDirection) {
      selectionDirection = selectionDirection || '';
      return selectionDirection.toLowerCase() === 'x' || selectionDirection === HORIZONTAL;
    }
  }, {
    key: 'isYBrush',
    value: function isYBrush(selectionDirection) {
      selectionDirection = selectionDirection || '';
      return selectionDirection.toLowerCase() === 'y' || selectionDirection === VERTICAL;
    }
  }, {
    key: '_handleX',
    value: function _handleX(type, rawSelection) {
      var dir = this.selectionDirection;
      var s = rawSelection;
      var isX = this.isXBrush(dir);
      var isY = this.isYBrush(dir);

      if (!s) {
        return 0;
      }

      switch (type) {
        case 'n':
          return isY ? mid(this.extent[0][0], this.extent[1][0]) : mid(s[0][0], s[1][0]);
        case 's':
          return isY ? mid(this.extent[0][0], this.extent[1][0]) : mid(s[0][0], s[1][0]);
        case 'e':
          return isX ? s[1] : s[1][0];
        case 'w':
          return isX ? s[0] : s[0][0];
      }
    }
  }, {
    key: '_handleY',
    value: function _handleY(type, rawSelection) {
      var dir = this.selectionDirection;
      var s = rawSelection;
      var isX = this.isXBrush(dir);
      var isY = this.isYBrush(dir);

      if (!s) {
        return 0;
      }

      switch (type) {
        case 'n':
          return isY ? s[0] : s[0][1];
        case 's':
          return isY ? s[1] : s[1][1];
        case 'w':
          return isX ? mid(this.extent[0][1], this.extent[1][1]) : mid(s[0][1], s[1][1]);
        case 'e':
          return isX ? mid(this.extent[0][1], this.extent[1][1]) : mid(s[0][1], s[1][1]);
      }
    }
  }]);
  return SelectionRect;
}(Extension);

function mid(a, b) {
  return (a + b) / 2;
}

function axisNoTicks(axis) {
  axis.tickSize(0);
  return axis;
}

function axisWholeNumberFormat(axis) {
  axis.tickFormat(d3.format(',.0f'));
  return axis;
}

//--------------------------------------------------------------------------------------------------
//
//  Axis label placements
//
//--------------------------------------------------------------------------------------------------
var X_LABEL_DEFAULTS = {
  x: 0,
  y: 30,
  rotate: 0,
  textAnchor: 'middle'
};
function axisXLabelGenerator(options) {
  var opts = mergeOptions(options, X_LABEL_DEFAULTS);

  // The `this` context is an `AxesChart`.
  return function (lbl) {
    var x = this.tryInvoke(opts.x);
    var y = this.tryInvoke(opts.y);
    var rotate = this.tryInvoke(opts.rotate);
    var textAnchor = this.tryInvoke(opts.textAnchor);

    lbl.attr('transform', 'translate(' + x + ', ' + y + '), rotate(' + rotate + ')').style('text-anchor', textAnchor);
  };
}

function axisXLabelStart(lbl) {
  lbl.attr('transform', 'translate(0, 30)').style('text-anchor', 'start');
}

function axisXLabelCenter(lbl) {
  var w = this.width || 0;
  lbl.attr('transform', 'translate(' + w / 2 + ', 30)').style('text-anchor', 'middle');
}
function axisXLabelEnd(lbl) {
  var w = this.width || 0;
  lbl.attr('transform', 'translate(' + w + ', 30)').style('text-anchor', 'end');
}

var Y_LABEL_DEFAULTS = {
  x: -30,
  y: function y(w, h) {
    return h / 2;
  },
  rotate: -90,
  textAnchor: 'middle'
};
function axisYLabelGenerator(options) {
  var opts = mergeOptions(options, Y_LABEL_DEFAULTS);

  // The `this` context is an `AxesChart`.
  return function (lbl) {
    var x = this.tryInvoke(opts.x, this.width, this.height);
    var y = this.tryInvoke(opts.y, this.width, this.height);
    var rotate = this.tryInvoke(opts.rotate);
    var textAnchor = this.tryInvoke(opts.textAnchor);

    lbl.attr('transform', 'translate(' + x + ', ' + y + '), rotate(' + rotate + ')').style('text-anchor', textAnchor);
  };
}
function axisYLabelStart(lbl) {
  var h = this.height || 0;
  lbl.attr('transform', 'translate(-30, ' + h + '), rotate(-90)').style('text-anchor', 'start');
}

function axisYLabelCenter(lbl) {
  var h = this.height || 0;
  lbl.attr('transform', 'translate(-30, ' + h / 2 + '), rotate(-90)').style('text-anchor', 'middle');
}
function axisYLabelEnd(lbl) {
  lbl.attr('transform', 'translate(-30, 0), rotate(-90)').style('text-anchor', 'end');
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
    value: function resize(chart) {
      var el = chart.bound.node().parentElement;

      // Only resize the element if it's in the DOM. This helps avoid an IE11 'Unspecified Error'
      // issue and helps that resizes only apply to elemnts that can actually be measured.
      if (document.body.contains(el)) {
        this.checkResize(chart);
      }
    }
  }, {
    key: 'checkResize',
    value: function checkResize() {
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
    key: 'checkResize',
    value: function checkResize(chart) {
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
    key: 'checkResize',
    value: function checkResize(chart) {
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
    key: 'checkResize',
    value: function checkResize(chart) {
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
    key: 'checkResize',
    value: function checkResize(chart) {
      var el = chart.bound.node().parentElement;
      var s = getStyle(el);

      chart.boundingRect(chart.opts.boundingWidth, s.rect.height - s.pt - s.pb);
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
exports.VerticalSpanChart = VerticalSpanChart;
exports.HorizontalSpanChart = HorizontalSpanChart;
exports.ScatterPlot = ScatterPlot;
exports.IconArray = IconArray;
exports.iconArrangeBottomTop = iconArrangeBottomTop;
exports.iconArrangeTopBottom = iconArrangeTopBottom;
exports.ArcChart = ArcChart;
exports.GaugeChart = GaugeChart;
exports.PolarAreaChart = PolarAreaChart;
exports.RadarChart = RadarChart;
exports.WedgeChart = WedgeChart;
exports.EventWatcher = EventWatcher;
exports.InstanceGroup = InstanceGroup;
exports.MonteError = MonteError;
exports.MonteOptionError = MonteOptionError;
exports.global = global$1;
exports.Extension = Extension;
exports.ExtArc = Arc;
exports.ExtAxisTickTransform = AxisTickTransform;
exports.ExtAxisLabelWrap = AxisLabelWrap;
exports.ExtAxisLabelTruncate = AxisLabelTruncate;
exports.ExtCrosshair = Crosshair;
exports.ExtFrame = Frame;
exports.ExtGrid = Grid;
exports.ExtHorizontalLines = HorizontalLines;
exports.ExtVerticalLines = VerticalLines;
exports.ExtLabel = Label;
exports.ExtPolarGrid = PolarGrid;
exports.ExtPolarLine = PolarLine;
exports.ExtPolarRotateLabel = PolarRotateLabel;
exports.ExtPolarTicks = PolarTicks;
exports.ExtBarBg = BarBg;
exports.ExtHorizontalBarBg = HorizontalBarBg;
exports.ExtReferenceLine = ReferenceLine;
exports.ExtSelectionRect = SelectionRect;
exports.axisNoTicks = axisNoTicks;
exports.axisWholeNumberFormat = axisWholeNumberFormat;
exports.axisXLabelStart = axisXLabelStart;
exports.axisXLabelCenter = axisXLabelCenter;
exports.axisXLabelGenerator = axisXLabelGenerator;
exports.axisXLabelMiddle = axisXLabelCenter;
exports.axisXLabelEnd = axisXLabelEnd;
exports.axisYLabelStart = axisYLabelStart;
exports.axisYLabelCenter = axisYLabelCenter;
exports.axisYLabelGenerator = axisYLabelGenerator;
exports.axisYLabelMiddle = axisYLabelCenter;
exports.axisYLabelEnd = axisYLabelEnd;
exports.radiusContrain = radiusContrain;
exports.extentFromZero = extentFromZero;
exports.extentBalanced = extentBalanced;
exports.extentGeneratorPercentOffset = extentGeneratorPercentOffset;
exports.extentGeneratorValueOffset = extentGeneratorValueOffset;
exports.extentGeneratorZeroToMax = extentGeneratorZeroToMax;
exports.needleRoundedEnd = needleRoundedEnd;
exports.needleFlatEnd = needleFlatEnd;
exports.needleExtraPointer = needleExtraPointer;
exports.needleRect = needleRect;
exports.polarLabelCentroid = polarLabelCentroid;
exports.polarLabelInner = polarLabelInner;
exports.polarLabelInnerAdjust = polarLabelInnerAdjust;
exports.polarLabelInnerEdge = polarLabelInnerEdge;
exports.polarLabelInnerFactor = polarLabelInnerFactor;
exports.polarLabelOuter = polarLabelOuter;
exports.polarLabelOuterAdjust = polarLabelOuterAdjust;
exports.polarLabelOuterEdge = polarLabelOuterEdge;
exports.polarLabelOuterFactor = polarLabelOuterFactor;
exports.gaugeLabelRotateTangentOrigin = gaugeLabelRotateTangentOrigin;
exports.gaugeLabelRotateTangentFlip = gaugeLabelRotateTangentFlip;
exports.gaugeLabelRotateRay = gaugeLabelRotateRay;
exports.gaugeLabelRotateRayFlip = gaugeLabelRotateRayFlip;
exports.gaugeLabelRotateRayOpposite = gaugeLabelRotateRayOpposite;
exports.gaugeLabelRotateNone = gaugeLabelRotateNone;
exports.polarLabelRotateTangentOrigin = polarLabelRotateTangentOrigin;
exports.polarLabelRotateTangentFlip = polarLabelRotateTangentFlip;
exports.polarLabelRotateRay = polarLabelRotateRay;
exports.polarLabelRotateRayFlip = polarLabelRotateRayFlip;
exports.polarLabelRotateRayOpposite = polarLabelRotateRayOpposite;
exports.polarLabelRotateNone = polarLabelRotateNone;
exports.AutoResizer = AutoResizer;
exports.HorizontalResizer = HorizontalResizer;
exports.HorizontalRatioResizer = HorizontalRatioResizer;
exports.Resizer = Resizer;
exports.VerticalResizer = VerticalResizer;
exports.transitionSettings = transitionSettings;
exports.arcSimpleTween = arcSimpleTween;
exports.arcLabelTween = arcLabelTween;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=monte.js.map
