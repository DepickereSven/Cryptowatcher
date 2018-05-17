/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://www.cryptowatcher.nu/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 167);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(23);
var hide = __webpack_require__(13);
var redefine = __webpack_require__(14);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(51)('wks');
var uid = __webpack_require__(34);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var dataArray = __webpack_require__(380);
var newCoinVars = __webpack_require__(139);

module.exports = function () {

    function getCoinsThatArentInTheList(coinData) {
        var firstExchangeArray = coinData.exchangeArray;
        var secondExchangeArray = coinData.justGenerated[0];
        for (var i = 0; i < firstExchangeArray.length; i++) {
            for (var f = 0; f < secondExchangeArray.length; f++) {
                if (firstExchangeArray[i][2] === secondExchangeArray[f][2]) {
                    secondExchangeArray.splice(f, 1);
                }
            }
        }
        getComparedArray(secondExchangeArray, coinData.exchangeName);
    }

    function getComparedArray(firstExchangeArray, exchangeName) {
        var secondExchangeArray = dataArray.array;

        for (var i = 0; i < firstExchangeArray.length; i++) {
            for (var f = 0; f < secondExchangeArray.length; f++) {
                if (firstExchangeArray[i][2] === secondExchangeArray[f][0]) {
                    firstExchangeArray[i][0] = secondExchangeArray[f][1];
                }
            }
        }
        if (firstExchangeArray.length != 0) {
            newCoinVars.newCoinArray.push([exchangeName, firstExchangeArray]);
        }
    }

    return {
        getCoinsThatArentInTheList: getCoinsThatArentInTheList
    };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(99);
var toPrimitive = __webpack_require__(24);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 21/01/2018.
 */

module.exports = function () {

    var fetchRequestForGettingTheNames = function fetchRequestForGettingTheNames(exchangeUrl) {
        var url = exchangeUrl;
        var request = new Request(url, {
            method: 'GET',
            headers: new Headers()
        });
        return fetch(request).then(function (resp) {
            return resp.json();
        });
    };

    var fetchRequestForGettingTheNamesTroughProxy = function fetchRequestForGettingTheNamesTroughProxy(exchangeUrl) {
        var url = exchangeUrl;
        var yql_url = 'https://query.yahooapis.com/v1/public/yql?q=' + 'SELECT * FROM json WHERE url="' + encodeURIComponent(url) + '"&format=json';
        var request = new Request(yql_url, {
            method: 'POST',
            headers: new Headers()
        });
        return fetch(request).then(function (resp) {
            return resp.json();
        }).then(function (data) {
            //console.log(data.query.results, url);
            if (data.query.results === null) {
                return data.query.results;
            } else {
                if (exchangeUrl.indexOf('ex.trade') > 1 || exchangeUrl.indexOf('api.liqui.io') > 1) {
                    return data.query.results;
                } else {
                    return data.query.results.json;
                }
            }
        });
    };

    var multipleRequests = function multipleRequests(arrayOfRequests) {
        return Promise.all(arrayOfRequests.map(function (el) {
            return fetchRequestForGettingTheNames(el);
        }));
    };

    var multipleRequestsWithProxy = function multipleRequestsWithProxy(arrayOfRequests) {
        return Promise.all(arrayOfRequests.map(function (el) {
            if (el.indexOf('https://min-api.cryptocompare.com') >= 0) return fetchRequestForGettingTheNames(el);
            return fetchRequestForGettingTheNamesTroughProxy(el);
        }));
    };

    return {
        fetchRequestForGettingTheNames: fetchRequestForGettingTheNames,
        fetchRequestForGettingTheNamesTroughProxy: fetchRequestForGettingTheNamesTroughProxy,
        multipleRequests: multipleRequests,
        multipleRequestsWithProxy: multipleRequestsWithProxy
    };
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(33);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var has = __webpack_require__(16);
var SRC = __webpack_require__(34)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(23).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(25);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(49);
var createDesc = __webpack_require__(33);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(24);
var has = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(99);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(11);
var IE_PROTO = __webpack_require__(69)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(12);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(23);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(20);
var IObject = __webpack_require__(48);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var asc = __webpack_require__(86);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(35);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(61);
  var $buffer = __webpack_require__(92);
  var ctx = __webpack_require__(20);
  var anInstance = __webpack_require__(41);
  var propertyDesc = __webpack_require__(33);
  var hide = __webpack_require__(13);
  var redefineAll = __webpack_require__(43);
  var toInteger = __webpack_require__(26);
  var toLength = __webpack_require__(9);
  var toIndex = __webpack_require__(125);
  var toAbsoluteIndex = __webpack_require__(37);
  var toPrimitive = __webpack_require__(24);
  var has = __webpack_require__(16);
  var classof = __webpack_require__(50);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(11);
  var isArrayIter = __webpack_require__(83);
  var create = __webpack_require__(38);
  var getPrototypeOf = __webpack_require__(19);
  var gOPN = __webpack_require__(39).f;
  var getIterFn = __webpack_require__(85);
  var uid = __webpack_require__(34);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(28);
  var createArrayIncludes = __webpack_require__(52);
  var speciesConstructor = __webpack_require__(59);
  var ArrayIterators = __webpack_require__(88);
  var Iterators = __webpack_require__(46);
  var $iterDetect = __webpack_require__(56);
  var setSpecies = __webpack_require__(40);
  var arrayFill = __webpack_require__(87);
  var arrayCopyWithin = __webpack_require__(115);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(18);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(120);
var $export = __webpack_require__(0);
var shared = __webpack_require__(51)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(123))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(34)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(16);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(13)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(101);
var enumBugKeys = __webpack_require__(70);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(102);
var enumBugKeys = __webpack_require__(70);
var IE_PROTO = __webpack_require__(69)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(67)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(71).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(101);
var hiddenKeys = __webpack_require__(70).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(113);
var isArrayIter = __webpack_require__(83);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(9);
var getIterFn = __webpack_require__(85);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(14);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(25);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(73);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(37);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(21);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(13);
var redefine = __webpack_require__(14);
var fails = __webpack_require__(3);
var defined = __webpack_require__(25);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(12);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var redefineAll = __webpack_require__(43);
var meta = __webpack_require__(31);
var forOf = __webpack_require__(42);
var anInstance = __webpack_require__(41);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(56);
var setToStringTag = __webpack_require__(44);
var inheritIfRequired = __webpack_require__(74);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var uid = __webpack_require__(34);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(35) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var ctx = __webpack_require__(20);
var forOf = __webpack_require__(42);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 02/05/2018.
 */

module.exports = function () {

    var allCoins = [{
        "shortName": "REX",
        "longName": " imbrex",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "$PAC",
        "longName": "$PAC",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ZRX",
        "longName": "0x",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "Huobi", "HitBtc", "Liqui", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "1EX",
        "longName": "1EX",
        "exchanges": {
            "list": ["ExTrade"]
        }
    }, {
        "shortName": "21M",
        "longName": "21Million",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "2GIVE",
        "longName": "2GIVE",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "300",
        "longName": "300 Token",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "42",
        "longName": "42-coin",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "808",
        "longName": "808",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "8BIT",
        "longName": "8Bit",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "_COIN",
        "longName": "9Coin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "AC3",
        "longName": "AC3",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ACO",
        "longName": "ACoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "AIDOC",
        "longName": "AI Doctor",
        "exchanges": {
            "list": ["BitZ", "Coinbene", "CoinEgg", "Huobi"]
        }
    }, {
        "shortName": "AIT",
        "longName": "AICHAIN",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "ALIS",
        "longName": "ALIS",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ALL",
        "longName": "ALLION",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ALQO",
        "longName": "ALQO",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ABTC",
        "longName": "AMLBitcoin",
        "exchanges": {
            "list": ["CCex", "CoinEgg"]
        }
    }, {
        "shortName": "APX",
        "longName": "APX",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ATB",
        "longName": "ATB Coin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ATFS",
        "longName": "ATFS",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ATL",
        "longName": "ATLANT Token",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ATM",
        "longName": "ATMChain",
        "exchanges": {
            "list": ["BitZ", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "ACCL",
        "longName": "Accelerator",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ACES",
        "longName": "AcesCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ACT",
        "longName": "Achain",
        "exchanges": {
            "list": ["CoinEgg", "Huobi", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "ADX",
        "longName": "AdEx",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Huobi", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "ADA",
        "longName": "Ada",
        "exchanges": {
            "list": ["Binance", "Bittrex"]
        }
    }, {
        "shortName": "ACC",
        "longName": "Adcoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ADL",
        "longName": "Adelphoi",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "ADST",
        "longName": "Adshares",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "AIB",
        "longName": "AdvancedInternetBlock",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ADZ",
        "longName": "Adzcoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "AEON",
        "longName": "Aeon",
        "exchanges": {
            "list": ["Bittrex", "HitBtc"]
        }
    }, {
        "shortName": "ARN",
        "longName": "Aeron",
        "exchanges": {
            "list": ["Binance", "BitZ", "HitBtc"]
        }
    }, {
        "shortName": "AE",
        "longName": "Aeternity",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "DLT",
        "longName": "Agrello",
        "exchanges": {
            "list": ["Binance", "HitBtc"]
        }
    }, {
        "shortName": "AGRI",
        "longName": "AgriNovusCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "AID",
        "longName": "AidCoin",
        "exchanges": {
            "list": ["Bitfinex"]
        }
    }, {
        "shortName": "ADK",
        "longName": "Aidos Kuneen",
        "exchanges": {
            "list": ["AdiosMarket"]
        }
    }, {
        "shortName": "AIF",
        "longName": "Aifuns",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "AIX",
        "longName": "Aigang",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "AION",
        "longName": "Aion",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Kucoin", "Liqui"]
        }
    }, {
        "shortName": "AST",
        "longName": "AirSwap",
        "exchanges": {
            "list": ["Binance", "Huobi", "Liqui"]
        }
    }, {
        "shortName": "AIR",
        "longName": "Airtoken",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "AKY",
        "longName": "AkuyaCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ALEX",
        "longName": "Alexandrite",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SOC",
        "longName": "All Sports",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "AIO",
        "longName": "AllInOne",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ASAFE2",
        "longName": "AllSafe",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "APC",
        "longName": "AlpaCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ABC",
        "longName": "Alphabit",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "ALT",
        "longName": "Altcoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "AMB",
        "longName": "Amber",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "AGA",
        "longName": "AmigaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "AMMO",
        "longName": "Ammo Reloaded",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ACP",
        "longName": "AnarchistsPrime",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "AMC",
        "longName": "AngelaMerkelCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "AVH",
        "longName": "Animation Vision Cash",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ANI",
        "longName": "AnimeCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ANTX",
        "longName": "Antimatter",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ANC",
        "longName": "AnyChain",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XAP",
        "longName": "Apollon",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "APPC",
        "longName": "AppCoins",
        "exchanges": {
            "list": ["Binance", "Huobi"]
        }
    }, {
        "shortName": "ARCO",
        "longName": "AquariusCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ANT",
        "longName": "Aragon",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "ARC",
        "longName": "ArcticCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "ARDR",
        "longName": "Ardor",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Poloniex"]
        }
    }, {
        "shortName": "ARG",
        "longName": "Argentum",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ARGO",
        "longName": "Argo",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ARGUS",
        "longName": "Arguscoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ARI",
        "longName": "Aricoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ARION",
        "longName": "Arion",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ARK",
        "longName": "Ark",
        "exchanges": {
            "list": ["Binance", "Bittrex", "BitZ", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "ABY",
        "longName": "ArtByte",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "ARTE",
        "longName": "Artemine",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ATX",
        "longName": "ArtexCoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "XAS",
        "longName": "Asch",
        "exchanges": {
            "list": ["BitZ", "CoinEgg", "Kucoin"]
        }
    }, {
        "shortName": "ASN",
        "longName": "Aseancoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "AC",
        "longName": "Asiacoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ADCN",
        "longName": "Asiadigicoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "ATH",
        "longName": "Athenian Warrior Token",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ATMOS",
        "longName": "Atmos",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ATOM",
        "longName": "AtomicCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ADC",
        "longName": "AudioCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "REP",
        "longName": "Augur",
        "exchanges": {
            "list": ["Bitfinex", "Bittrex", "Cryptopia", "HitBtc", "Kraken", "Liqui", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "AURS",
        "longName": "Aureus",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "AUR",
        "longName": "AuroraCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "AU",
        "longName": "AurumCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ATS",
        "longName": "Authorship Token",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "AVT",
        "longName": "Aventus",
        "exchanges": {
            "list": ["Bitfinex"]
        }
    }, {
        "shortName": "ACN",
        "longName": "Avoncoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "B2B",
        "longName": "B2B",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "KB3",
        "longName": "B3Coin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BAKED",
        "longName": "BAKEDcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BTA",
        "longName": "BATA",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "BCH",
        "longName": "BCash",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "BERN",
        "longName": "BERNcash",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BPC",
        "longName": "BITPARK COIN",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "BX",
        "longName": "BITTX",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VEE",
        "longName": "BLOCKv",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "BMT",
        "longName": "BMChain",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "BOS",
        "longName": "BOScoin",
        "exchanges": {
            "list": ["HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "BURST",
        "longName": "BURST",
        "exchanges": {
            "list": ["Bittrex", "CCex", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "BVB",
        "longName": "BVBCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BNT",
        "longName": "Bancor",
        "exchanges": {
            "list": ["Binance", "Bittrex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "DEX",
        "longName": "BarterDEX",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BAT",
        "longName": "Basic Attention Token",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "Cryptopia", "Huobi", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "BSN",
        "longName": "Bastone",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SAND",
        "longName": "BeachCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BEAN",
        "longName": "Bean Cash",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XBTS",
        "longName": "BeatCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BEER",
        "longName": "Beerhouse",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BEEZ",
        "longName": "BeezerCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BELA",
        "longName": "Belacoin",
        "exchanges": {
            "list": ["CoinExchange", "Poloniex"]
        }
    }, {
        "shortName": "BENJI",
        "longName": "BenjiRolls",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "BOPS",
        "longName": "Beonpush",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BEST",
        "longName": "BestChain",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BKB",
        "longName": "BetKing Bankroll Token",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "BET",
        "longName": "Betacoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BETR",
        "longName": "BetterBetting",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "BEZ",
        "longName": "Bezop",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "BBP",
        "longName": "Biblepay",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BIGUP",
        "longName": "Bigup",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XBL",
        "longName": "BillionaireToken",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "BNB",
        "longName": "Binance Coin",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "BRC",
        "longName": "BinaryCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BIO",
        "longName": "BioCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "BIP",
        "longName": "BipCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BIRD",
        "longName": "BirdCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BIRDS",
        "longName": "BirdsCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BIS",
        "longName": "Bismuth",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BPTN",
        "longName": "Bit Public Talent Network",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "BTB",
        "longName": "BitBar",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "BAY",
        "longName": "BitBay",
        "exchanges": {
            "list": ["Bittrex", "CCex", "Cryptopia"]
        }
    }, {
        "shortName": "BITB",
        "longName": "BitBean",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "BEE",
        "longName": "BitBee",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BTDX",
        "longName": "BitCloud",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "BTX",
        "longName": "BitCore",
        "exchanges": {
            "list": ["BitZ", "CoinExchange", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "BCW",
        "longName": "BitCrownCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BCY",
        "longName": "BitCrystals",
        "exchanges": {
            "list": ["Bittrex", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "CSNO",
        "longName": "BitDice",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "BFI",
        "longName": "BitFinTech",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BTLC",
        "longName": "BitLuckCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BPOK",
        "longName": "BitPokemonGo",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XBR",
        "longName": "BitRewards",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BSD",
        "longName": "BitSend",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "BTE",
        "longName": "BitSerial",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BTS",
        "longName": "BitShares",
        "exchanges": {
            "list": ["Binance", "CoinEgg", "EXX", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "BSR",
        "longName": "BitSoar",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SYNQ",
        "longName": "BitSynq",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ZNY",
        "longName": "BitZeny",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "BTBC",
        "longName": "Bitbase",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BXC",
        "longName": "Bitcedi",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CAT",
        "longName": "Bitclave",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "COAL",
        "longName": "Bitcoal",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BTC",
        "longName": "Bitcoin",
        "exchanges": {
            "list": ["Bitfinex", "Bitstamp", "ExTrade", "Gdax", "Gemini", "Kraken"]
        }
    }, {
        "shortName": "BCC",
        "longName": "Bitcoin Cash",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bitstamp", "Bittrex", "BitZ", "CoinEgg", "Exmo", "EXX", "Gdax", "Huobi", "HitBtc", "Kraken", "Kucoin", "Liqui", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "BCD",
        "longName": "Bitcoin Diamond",
        "exchanges": {
            "list": ["Binance", "BitZ", "CCex", "CoinEgg", "EXX", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "BCF",
        "longName": "Bitcoin Fast",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BIFI",
        "longName": "Bitcoin File",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "BTG",
        "longName": "Bitcoin Gold",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "BitZ", "Cryptopia", "EXX", "Huobi", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "BITG",
        "longName": "Bitcoin Green",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "BTCH",
        "longName": "Bitcoin Hush",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BCK",
        "longName": "Bitcoin King",
        "exchanges": {
            "list": ["EXX"]
        }
    }, {
        "shortName": "BTP",
        "longName": "Bitcoin Pay",
        "exchanges": {
            "list": ["CoinEgg", "EXX"]
        }
    }, {
        "shortName": "XB",
        "longName": "Bitcoin U.F.",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BTW",
        "longName": "Bitcoin World",
        "exchanges": {
            "list": ["CoinEgg", "EXX"]
        }
    }, {
        "shortName": "BTCD",
        "longName": "BitcoinDark",
        "exchanges": {
            "list": ["Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "XBTE",
        "longName": "BitcoinEvo",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BTCHC",
        "longName": "BitcoinHashcore",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BCM",
        "longName": "BitcoinMetal",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BTPL",
        "longName": "BitcoinPlanet",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XBC",
        "longName": "BitcoinPlus",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "BTCRED",
        "longName": "BitcoinRed",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BTCS",
        "longName": "BitcoinScrypt",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "BCX",
        "longName": "BitcoinX",
        "exchanges": {
            "list": ["CoinEgg", "Huobi"]
        }
    }, {
        "shortName": "BTCZ",
        "longName": "BitcoinZ",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BDL",
        "longName": "Bitdeal",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MARKS",
        "longName": "Bitmark",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BTQ",
        "longName": "Bitquark",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BQ",
        "longName": "Bitqy",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "BRO",
        "longName": "Bitradio",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BITS",
        "longName": "Bitstar",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SWIFT",
        "longName": "Bitswift",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "BXT",
        "longName": "Bittoken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BIXC",
        "longName": "Bixc",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BIZ",
        "longName": "BizCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "BHC",
        "longName": "Black Hole Coin",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "BMC",
        "longName": "Black Moon",
        "exchanges": {
            "list": ["HitBtc", "Liqui"]
        }
    }, {
        "shortName": "BLK",
        "longName": "BlackCoin",
        "exchanges": {
            "list": ["Bittrex", "BitZ", "CoinEgg", "CoinExchange", "Cryptopia", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "XBP",
        "longName": "BlackPearl",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BLAZR",
        "longName": "BlazerCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BLITZ",
        "longName": "Blitzcash",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "ARY",
        "longName": "Block Array",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "BKCAT",
        "longName": "BlockCat",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BCPT",
        "longName": "BlockMason",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Cryptopia", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "BOP",
        "longName": "BlockOptions",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BLOCK",
        "longName": "Blocknet",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "BPL",
        "longName": "Blockpool",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TIX",
        "longName": "Blocktix",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "BLUE",
        "longName": "Blue Protocol",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BLU",
        "longName": "BlueCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "BLZ",
        "longName": "Bluzelle",
        "exchanges": {
            "list": ["Binance", "Cryptopia", "Huobi"]
        }
    }, {
        "shortName": "BMB",
        "longName": "Bmbchain",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "BFT",
        "longName": "BnkToTheFuture",
        "exchanges": {
            "list": ["Bitfinex"]
        }
    }, {
        "shortName": "BNX",
        "longName": "BnrtxCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BOAT",
        "longName": "Boat",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BLN",
        "longName": "Boleno",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BOLI",
        "longName": "BolivarCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XZA",
        "longName": "Bonanza",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BGR",
        "longName": "Bongger",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BON",
        "longName": "Bonpay",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "BOST",
        "longName": "BoostCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BDS",
        "longName": "Borderless",
        "exchanges": {
            "list": ["EXX"]
        }
    }, {
        "shortName": "BRG",
        "longName": "BorgCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BNTY",
        "longName": "Bounty0x",
        "exchanges": {
            "list": ["BitZ", "Kucoin"]
        }
    }, {
        "shortName": "BNC",
        "longName": "BraveNewCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BRD",
        "longName": "Bread",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "BRK",
        "longName": "Breakout",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "BRX",
        "longName": "Breakout Stake",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "XBT",
        "longName": "Bricktox",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "BRIT",
        "longName": "BritCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "BRAT",
        "longName": "Brother",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BSDB",
        "longName": "Bsdbwealth",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "CBX",
        "longName": "Bullion",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BULLS",
        "longName": "Bullshitcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BWK",
        "longName": "Bulwark",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BUMBA",
        "longName": "Bumbacoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BUN",
        "longName": "BunnyCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BUS",
        "longName": "Bus token",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "BUZZ",
        "longName": "Buzzcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BYC",
        "longName": "Bytecent",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "BCN",
        "longName": "Bytecoin",
        "exchanges": {
            "list": ["HitBtc", "Poloniex"]
        }
    }, {
        "shortName": "GBYTE",
        "longName": "Bytes",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "BTM",
        "longName": "Bytom",
        "exchanges": {
            "list": ["CoinEgg", "Cryptopia", "EXX", "Huobi", "HitBtc", "Kucoin", "Poloniex"]
        }
    }, {
        "shortName": "CACH",
        "longName": "CACHeCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "XCT",
        "longName": "CBit",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "CBR",
        "longName": "CCBrother",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "CFUN",
        "longName": "CFUN",
        "exchanges": {
            "list": ["CoinEgg", "EXX"]
        }
    }, {
        "shortName": "CHBT",
        "longName": "CHBToken",
        "exchanges": {
            "list": ["ExTrade"]
        }
    }, {
        "shortName": "CLAM",
        "longName": "CLAMs",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "CLPC",
        "longName": "CLP Token",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "MEE",
        "longName": "COINMEET",
        "exchanges": {
            "list": ["CoinEgg", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "XCPO",
        "longName": "COPICO",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CPY",
        "longName": "COPYTRACK",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "COSS",
        "longName": "COSS",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CRM",
        "longName": "CREAMcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CALC",
        "longName": "CaliphCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "CMPCO",
        "longName": "CampusCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "CAN",
        "longName": "CanYa",
        "exchanges": {
            "list": ["Cryptopia", "Kucoin"]
        }
    }, {
        "shortName": "CDN",
        "longName": "Canada eCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CCN",
        "longName": "CannaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CANN",
        "longName": "CannabisCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "CNNC",
        "longName": "Cannation",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "CAPP",
        "longName": "Cappasity",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CPC",
        "longName": "Capricoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "CTX",
        "longName": "Car Taxi",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CTE",
        "longName": "Career Trust Ecosystem",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CAR",
        "longName": "CareerCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CXO",
        "longName": "CargoX",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "CAS",
        "longName": "Cashaa",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CPG",
        "longName": "Castle Peak",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CTR",
        "longName": "Centra",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "CENNZ",
        "longName": "Centrality",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CNT",
        "longName": "Centurion",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "CNTF",
        "longName": "Centurion Future",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CRPC",
        "longName": "CereiPayCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "CHC",
        "longName": "ChainCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LINK",
        "longName": "ChainLink",
        "exchanges": {
            "list": ["Binance", "Huobi"]
        }
    }, {
        "shortName": "CHAN",
        "longName": "ChanCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CAG",
        "longName": "Change",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "CAF",
        "longName": "Charter",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "CHAT",
        "longName": "Chat",
        "exchanges": {
            "list": ["Binance", "EXX", "Huobi", "HitBtc"]
        }
    }, {
        "shortName": "XCHE",
        "longName": "CheCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CHEAP",
        "longName": "CheapCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CHESS",
        "longName": "ChessCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CHILI",
        "longName": "ChiliCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CHIPS",
        "longName": "Chips",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TIME",
        "longName": "Chronobank",
        "exchanges": {
            "list": ["HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "DAY",
        "longName": "Chronologic",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "CRX",
        "longName": "ChronosCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CND",
        "longName": "Cindicator",
        "exchanges": {
            "list": ["Binance", "HitBtc"]
        }
    }, {
        "shortName": "COVAL",
        "longName": "Circuits of Value",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "CVC",
        "longName": "Civic",
        "exchanges": {
            "list": ["Bittrex", "Huobi", "Kucoin", "Liqui", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "POLL",
        "longName": "ClearPoll",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "CO2",
        "longName": "ClimateCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CLOAK",
        "longName": "CloakCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "CLD",
        "longName": "Cloud With Me",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "CLOUT",
        "longName": "Clout",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CNET",
        "longName": "Cnet",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "C47",
        "longName": "Code47",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CFC",
        "longName": "CoffeeCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CFI",
        "longName": "Cofound it",
        "exchanges": {
            "list": ["Bitfinex", "Bittrex", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "CTIC3",
        "longName": "Coimatic 3.0",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "CTIC2",
        "longName": "Coimatic2",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "C2",
        "longName": "Coin2",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "COFI",
        "longName": "CoinFi",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "CMX",
        "longName": "CoinMiningIndex",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CDT",
        "longName": "Coindash",
        "exchanges": {
            "list": ["Binance", "HitBtc"]
        }
    }, {
        "shortName": "CL",
        "longName": "Coinlancer",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "CNO",
        "longName": "Coino",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CXT",
        "longName": "Coinonat",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "XCXT",
        "longName": "CoinonatX",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "COLX",
        "longName": "ColossusXT",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CMT",
        "longName": "CometCoin",
        "exchanges": {
            "list": ["Binance", "Cryptopia", "Huobi"]
        }
    }, {
        "shortName": "CDX",
        "longName": "CommodityAdNetwork",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "CMP",
        "longName": "CompCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "COMP",
        "longName": "Compound Coin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CPN",
        "longName": "CompuCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "RAIN",
        "longName": "Condensate",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "CQST",
        "longName": "Conquestcoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "COOC",
        "longName": "CoochieCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CC",
        "longName": "CoolInDarkCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "COPPER",
        "longName": "CopperCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CRC",
        "longName": "CoreCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "COR",
        "longName": "Corion",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CRN",
        "longName": "CoronaCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XCP",
        "longName": "Counterparty",
        "exchanges": {
            "list": ["Bittrex", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "COUPE",
        "longName": "Coupecoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "COV",
        "longName": "Covesting",
        "exchanges": {
            "list": ["HitBtc", "Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "CRACKERS",
        "longName": "Crackers",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CRAVE",
        "longName": "Crave",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "XCRE",
        "longName": "Creatio",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CREA",
        "longName": "CreativeCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "CRDNC",
        "longName": "CredenceCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CRB",
        "longName": "CreditBit",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "CRBIT",
        "longName": "Creditbit",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "CRE",
        "longName": "Credits",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "CREVA",
        "longName": "CrevaCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "CRMSN",
        "longName": "Crimsoncoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CROP",
        "longName": "Cropcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CRW",
        "longName": "Crown",
        "exchanges": {
            "list": ["Bittrex", "CCex", "CoinExchange"]
        }
    }, {
        "shortName": "CRYPT",
        "longName": "CryptCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CTO",
        "longName": "Crypto",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "C20",
        "longName": "Crypto20",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CBANK",
        "longName": "CryptoBank",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CCRB",
        "longName": "CryptoCarbon",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "CCH",
        "longName": "CryptoCashCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "CCB",
        "longName": "CryptoClub",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CESC",
        "longName": "CryptoEscudo",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "CJ",
        "longName": "CryptoJacksCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "PING",
        "longName": "CryptoPing",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CRUR",
        "longName": "CryptoRuble",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BLC",
        "longName": "Cryptobullcoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "CNX",
        "longName": "Cryptonex",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "CEFS",
        "longName": "CryptopiaFeeShare",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "OFF",
        "longName": "Cthulhu Offerings",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "QBT",
        "longName": "Cubits",
        "exchanges": {
            "list": ["CoinEgg", "Cryptopia"]
        }
    }, {
        "shortName": "CURE",
        "longName": "CureCoin",
        "exchanges": {
            "list": ["Bittrex", "Livecoin"]
        }
    }, {
        "shortName": "CYCLONE",
        "longName": "CycloneCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "CYDER",
        "longName": "Cyder",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FUNK",
        "longName": "Cypherfunks",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KORUNA",
        "longName": "CzechoSlovak KORUNA",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DPP",
        "longName": "DA Power Play",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DAS",
        "longName": "DA$",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "DARK",
        "longName": "DARK",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DTA",
        "longName": "DATA",
        "exchanges": {
            "list": ["Huobi", "HitBtc"]
        }
    }, {
        "shortName": "DRP",
        "longName": "DCORP",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DDF",
        "longName": "DDF",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DCT",
        "longName": "DECENT",
        "exchanges": {
            "list": ["HitBtc", "Liqui"]
        }
    }, {
        "shortName": "DFS",
        "longName": "DFSCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DIM",
        "longName": "DIMCOIN",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "DMT",
        "longName": "DMarket",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "DOLLAR",
        "longName": "DOLLAR Online",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "DOV",
        "longName": "DOVU",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "DRPU",
        "longName": "DRP Utility",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "DV7",
        "longName": "DV7 Coin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DAI",
        "longName": "Dai Stablecoin",
        "exchanges": {
            "list": ["Bitfinex"]
        }
    }, {
        "shortName": "DALC",
        "longName": "DaleCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "DNE",
        "longName": "Daneton",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DARI",
        "longName": "DariCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "KED",
        "longName": "Darsek",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DASH",
        "longName": "Dash",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "BitZ", "CCex", "CoinExchange", "Cryptopia", "Exmo", "Huobi", "HitBtc", "Kraken", "Kucoin", "Liqui", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "DSH",
        "longName": "DashCoin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "DAG",
        "longName": "DashGold",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DDN",
        "longName": "Data Delivery Network",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "DTB",
        "longName": "Databits",
        "exchanges": {
            "list": ["Bittrex", "TuxExchange"]
        }
    }, {
        "shortName": "DAV",
        "longName": "DavorCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DAXX",
        "longName": "DaxxCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DAZZ",
        "longName": "DazzleCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "DBET",
        "longName": "DecentBet",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "MANA",
        "longName": "Decentraland",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "Huobi", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "HST",
        "longName": "Decision Token",
        "exchanges": {
            "list": ["Cryptopia", "Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "DCR",
        "longName": "Decred",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "DEEP",
        "longName": "Deep",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "DBC",
        "longName": "DeepBrain Chain",
        "exchanges": {
            "list": ["Huobi", "Kucoin"]
        }
    }, {
        "shortName": "ONION",
        "longName": "DeepOnion",
        "exchanges": {
            "list": ["Cryptopia", "Kucoin"]
        }
    }, {
        "shortName": "DKD",
        "longName": "Dekadocoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "DNR",
        "longName": "Denarius",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "DENT",
        "longName": "Dent",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "DCN",
        "longName": "Dentacoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "DSR",
        "longName": "Desire",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DTCT",
        "longName": "DetectorToken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DEUS",
        "longName": "DeusCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "DEV",
        "longName": "Deviant",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "DMD",
        "longName": "Diamond",
        "exchanges": {
            "list": ["Bittrex", "Livecoin"]
        }
    }, {
        "shortName": "CUBE",
        "longName": "DigiCube",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DGPT",
        "longName": "DigiPulse",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DGB",
        "longName": "Digibyte",
        "exchanges": {
            "list": ["Bittrex", "BitZ", "CoinExchange", "Cryptopia", "HitBtc", "Kraken", "Kucoin", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "DMB",
        "longName": "DigitalMoneyBits",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XDN",
        "longName": "DigitalNote",
        "exchanges": {
            "list": ["Bittrex", "HitBtc"]
        }
    }, {
        "shortName": "DP",
        "longName": "DigitalPrice",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "DRS",
        "longName": "DigitalRupees",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DGC",
        "longName": "Digitalcoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "DGD",
        "longName": "Digix DAO",
        "exchanges": {
            "list": ["Binance", "Huobi", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "DIG",
        "longName": "Dignity",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "DIME",
        "longName": "Dimecoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "DCY",
        "longName": "DinastyCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DSE",
        "longName": "Disse",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DVRS",
        "longName": "Diverse",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DIVX",
        "longName": "Divi Exchange Token",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DOGE",
        "longName": "Dogecoin",
        "exchanges": {
            "list": ["Bittrex", "BitZ", "CCex", "CoinEgg", "CoinExchange", "Cryptopia", "Exmo", "HitBtc", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "DON",
        "longName": "DonationCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DOPE",
        "longName": "DopeCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "DOT",
        "longName": "Dotcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DANC",
        "longName": "DrAgoNCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "DFT",
        "longName": "Draftcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DRGN",
        "longName": "DragonChain",
        "exchanges": {
            "list": ["CoinExchange", "Kucoin"]
        }
    }, {
        "shortName": "DRZ",
        "longName": "Droidz",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "DRXNE",
        "longName": "Droxne",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "DBIC",
        "longName": "DubaiCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "DBIX",
        "longName": "Dubaicoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "DUTCH",
        "longName": "DutchCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DYN",
        "longName": "Dynamic",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "DTR",
        "longName": "Dynamic Trading Rights",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "DMC",
        "longName": "DynamicCoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "ECN",
        "longName": "E-Coin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EDR",
        "longName": "E-Dinar Coin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "EAG",
        "longName": "EACoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "EBH",
        "longName": "EBlackHole",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ECC",
        "longName": "ECC",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ECIO",
        "longName": "ECOMCASH",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ECO",
        "longName": "ECOcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EDRC",
        "longName": "EDRCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "EKT",
        "longName": "EDUCare",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "ELT",
        "longName": "ELTCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ELCO",
        "longName": "ELcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ENZO",
        "longName": "ENZOLimited",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EOS",
        "longName": "EOS",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "BitZ", "CoinEgg", "CoinExchange", "EXX", "Huobi", "HitBtc", "Kraken", "Kucoin", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "ERA",
        "longName": "ERA",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ERO",
        "longName": "EROSCOIN",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "ESR",
        "longName": "ESR token",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ETHP",
        "longName": "ETHEREUM PLUS",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "EWC",
        "longName": "EWangBiCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EAC",
        "longName": "EarthCoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "EBT",
        "longName": "EbitTreeCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EKO",
        "longName": "EchoLink",
        "exchanges": {
            "list": ["Huobi", "HitBtc"]
        }
    }, {
        "shortName": "ESRC",
        "longName": "EchoSoraCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "EC",
        "longName": "Eclipse",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "ECOB",
        "longName": "EcoBit",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ECOT",
        "longName": "EcoToken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EDDIE",
        "longName": "Eddiecoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EDG",
        "longName": "Edgeless",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "EDU",
        "longName": "EduCoin",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "EDC",
        "longName": "EducoinV",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EDO",
        "longName": "Eidoo",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "HitBtc"]
        }
    }, {
        "shortName": "EMC2",
        "longName": "Einsteinium",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "EL",
        "longName": "ElCoin",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "ELC",
        "longName": "ElaCoin",
        "exchanges": {
            "list": ["Binance", "Cryptopia"]
        }
    }, {
        "shortName": "XEL",
        "longName": "Elastic",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "ELA",
        "longName": "Elastos",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "ECA",
        "longName": "Electra",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EFL",
        "longName": "ElectronicGulden",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "ELE",
        "longName": "Elementrem",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ELM",
        "longName": "Elements",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "ELI",
        "longName": "Elisor Coin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "1337",
        "longName": "Elite",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ELIX",
        "longName": "Elixir",
        "exchanges": {
            "list": ["CoinExchange", "Kucoin"]
        }
    }, {
        "shortName": "ELLA",
        "longName": "Ellaism",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ELS",
        "longName": "Elysium",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EBG",
        "longName": "EmbargoCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MBRS",
        "longName": "Embers",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EMC",
        "longName": "EmerCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Cryptopia", "HitBtc", "Livecoin", "TuxExchange"]
        }
    }, {
        "shortName": "EMD",
        "longName": "Emerald Crypto",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EMIRG",
        "longName": "EmiratesGoldCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ETT",
        "longName": "EncryptoTel",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "TSL",
        "longName": "Energo Labs",
        "exchanges": {
            "list": ["CoinEgg", "EXX"]
        }
    }, {
        "shortName": "EET",
        "longName": "Energy Eco Token",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ENRG",
        "longName": "EnergyCoin",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "ENG",
        "longName": "Enigma",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Huobi", "Liqui"]
        }
    }, {
        "shortName": "ENJ",
        "longName": "Enjin Coin",
        "exchanges": {
            "list": ["Binance", "Cryptopia", "HitBtc", "Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "ENTRC",
        "longName": "EnterCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EVN",
        "longName": "Envion",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "EQL",
        "longName": "Equal",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EQT",
        "longName": "Equitrader",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ERY",
        "longName": "Eryllium",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ESC",
        "longName": "Escroco",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ESP",
        "longName": "Espers",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "ENT",
        "longName": "Eternity",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "LEND",
        "longName": "EthLend",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "ETBS",
        "longName": "Ethbits",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "ECH",
        "longName": "EtherEcash",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ETH",
        "longName": "Ethereum",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bitstamp", "Bittrex", "BitZ", "CCex", "Coinbene", "CoinEgg", "CoinExchange", "Cryptopia", "Exmo", "EXX", "Gdax", "Gemini", "Huobi", "HitBtc", "Kraken", "Kucoin", "Liqui", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "ETC",
        "longName": "Ethereum Classic",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "BitZ", "CCex", "CoinEgg", "CoinExchange", "Cryptopia", "Exmo", "EXX", "Huobi", "HitBtc", "Kraken", "Kucoin", "Poloniex"]
        }
    }, {
        "shortName": "ETHD",
        "longName": "Ethereum Dark",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EETT",
        "longName": "Ethereum EncryptoTel",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ETHG",
        "longName": "Ethereum Gold",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ETG",
        "longName": "EthereumGold",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LNK",
        "longName": "EthereumLink",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ETX",
        "longName": "Etherex",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "RIYA",
        "longName": "Etheriya",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ETN",
        "longName": "Ethernex",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "DICE",
        "longName": "Etheroll",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "BQX",
        "longName": "Ethos",
        "exchanges": {
            "list": ["Binance", "Binance", "CoinExchange", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "EUC",
        "longName": "Eurocoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ERC",
        "longName": "EuropeCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "EUROP",
        "longName": "EuropeUnited",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EVC",
        "longName": "EventChain",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "EGC",
        "longName": "EverGreenCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "EVX",
        "longName": "Everex",
        "exchanges": {
            "list": ["Binance", "Huobi", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "EVR",
        "longName": "Everus",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "EVIL",
        "longName": "Evilcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XEV",
        "longName": "EvoPoints",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "EVO",
        "longName": "Evotion",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XUC",
        "longName": "Exchange Union",
        "exchanges": {
            "list": ["EXX", "HitBtc"]
        }
    }, {
        "shortName": "EXN",
        "longName": "Exchangen",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "EXCL",
        "longName": "ExclusiveCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "EXP",
        "longName": "Expanse",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "EPC",
        "longName": "ExperienceCoin",
        "exchanges": {
            "list": ["Cryptopia", "EXX"]
        }
    }, {
        "shortName": "EXTN",
        "longName": "ExtensiveCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FAP",
        "longName": "FAPcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FLP",
        "longName": "FLIP token",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "FOTA",
        "longName": "FORTUNA",
        "exchanges": {
            "list": ["CoinEgg", "Kucoin"]
        }
    }, {
        "shortName": "FUNC",
        "longName": "FUNCOIN",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "FCN",
        "longName": "FacileCoin",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "FCT",
        "longName": "Factom",
        "exchanges": {
            "list": ["Bittrex", "BitZ", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "FAIR",
        "longName": "Faircoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FRD",
        "longName": "Farad",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "FBTC",
        "longName": "Fast Bitcoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "FCH",
        "longName": "FastCash",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "FST",
        "longName": "FastCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FTCC",
        "longName": "FeatherCoinClassic",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FTC",
        "longName": "Feathercoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "TIPS",
        "longName": "Fedoracoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FNC",
        "longName": "Fincoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "FFC",
        "longName": "FireFlyCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FRC",
        "longName": "FireRoosterCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BIT",
        "longName": "First Bitcoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "BITCF",
        "longName": "First Bitcoin Capital",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "FIRSTBLOOD",
        "longName": "FirstBlood",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ETF",
        "longName": "FirstCryptoETF",
        "exchanges": {
            "list": ["CoinEgg", "EXX"]
        }
    }, {
        "shortName": "1ST",
        "longName": "Firstblood",
        "exchanges": {
            "list": ["HitBtc", "Liqui"]
        }
    }, {
        "shortName": "FIT",
        "longName": "FitCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FLASH",
        "longName": "Flash",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "FLAX",
        "longName": "Flaxscript",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FLIK",
        "longName": "Flik",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FLIXX",
        "longName": "Flixx",
        "exchanges": {
            "list": ["Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "FLO",
        "longName": "Florincoin",
        "exchanges": {
            "list": ["Poloniex"]
        }
    }, {
        "shortName": "FLN",
        "longName": "FloripaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FLT",
        "longName": "FlutterCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FYP",
        "longName": "Flypme",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "FLDC",
        "longName": "FoldingCoin",
        "exchanges": {
            "list": ["Bittrex", "Poloniex"]
        }
    }, {
        "shortName": "FLM",
        "longName": "Folm",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FONZ",
        "longName": "FonzieCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FOOD",
        "longName": "Foodcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XFT",
        "longName": "FootyCash",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FORK",
        "longName": "Fork Coin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "FORT",
        "longName": "Fortcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FRT",
        "longName": "Fortesque",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FRN",
        "longName": "Francs",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FZ",
        "longName": "FreezeCoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "FSX",
        "longName": "Frost",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FU",
        "longName": "FuBi",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "FUEL",
        "longName": "FuelCoin",
        "exchanges": {
            "list": ["Binance", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "FJC",
        "longName": "FujiCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NTO",
        "longName": "Fujinto",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "FUN",
        "longName": "FunFair",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "FUTC",
        "longName": "FutCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "FUTX",
        "longName": "Futereum X",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "FXE",
        "longName": "Futurxe",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "FUZZ",
        "longName": "FuzzBalls",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GAC",
        "longName": "GA Coin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "GCN",
        "longName": "GCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GD2",
        "longName": "GD Premium",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "GOAL",
        "longName": "GOAL Bonanza",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "GPU",
        "longName": "GPUCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GXS",
        "longName": "GXShares",
        "exchanges": {
            "list": ["Binance", "BitZ"]
        }
    }, {
        "shortName": "GAIA",
        "longName": "GaiaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GNR",
        "longName": "Gainer Coin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ORE",
        "longName": "Galactrum",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "GAM",
        "longName": "Gambit",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "GMB",
        "longName": "Gambleo",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GAME",
        "longName": "GameCredits",
        "exchanges": {
            "list": ["Bittrex", "BitZ", "CoinEgg", "Cryptopia", "HitBtc", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "UNITS",
        "longName": "GameUnits",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GAP",
        "longName": "Gapcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GAS",
        "longName": "Gas",
        "exchanges": {
            "list": ["Binance", "Huobi", "Kucoin", "Poloniex"]
        }
    }, {
        "shortName": "GAY",
        "longName": "GayMoney",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GBG",
        "longName": "Gbg",
        "exchanges": {
            "list": ["Bittrex", "Liqui"]
        }
    }, {
        "shortName": "GEERT",
        "longName": "Geertcoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "GELUK",
        "longName": "GelukCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "GNX",
        "longName": "Genaro Network",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "DNA",
        "longName": "GeneChain",
        "exchanges": {
            "list": ["Cryptopia", "Kucoin"]
        }
    }, {
        "shortName": "GVT",
        "longName": "Genesis Vision",
        "exchanges": {
            "list": ["Binance", "Kucoin"]
        }
    }, {
        "shortName": "GEO",
        "longName": "GeoCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "GTO",
        "longName": "Gifto",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "XGTC",
        "longName": "GirlsTokenCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GLS",
        "longName": "GlassCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GCC24",
        "longName": "Global Crypto",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BSTY",
        "longName": "GlobalBoost-Y",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GLT",
        "longName": "GlobalToken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GTC",
        "longName": "GlobalTourCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GLTC",
        "longName": "GlobalTradeCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "GNO",
        "longName": "Gnosis",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "HitBtc", "Kraken", "Liqui", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "GBX",
        "longName": "GoByte",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "GB",
        "longName": "GoldBlocks",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "GLD",
        "longName": "GoldCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "GP",
        "longName": "GoldPieces",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "GPL",
        "longName": "GoldPressedLatinum ",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GRX",
        "longName": "GoldRewardToken",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "GUC",
        "longName": "GoldUnionCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "XGB",
        "longName": "GoldenBird",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "GDC",
        "longName": "GoldenCryptoCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "GMX",
        "longName": "Goldmaxcoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "GNT",
        "longName": "Golem",
        "exchanges": {
            "list": ["Bitfinex", "Bittrex", "CoinExchange", "Cryptopia", "Huobi", "Liqui", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "GOLF",
        "longName": "Golfcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GOLOS",
        "longName": "Golos",
        "exchanges": {
            "list": ["Bittrex", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "GYC",
        "longName": "GongYiCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "GOOC",
        "longName": "GooCoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "GOOD",
        "longName": "Goodomy",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GRAM",
        "longName": "Gram",
        "exchanges": {
            "list": ["EXX"]
        }
    }, {
        "shortName": "GRN",
        "longName": "Granite",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GET",
        "longName": "GreenEnergyToken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GREENF",
        "longName": "GreenFingers",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GRMD",
        "longName": "GreenMed",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "GRE",
        "longName": "Greencoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "GRC",
        "longName": "GridCoin",
        "exchanges": {
            "list": ["Bittrex", "CCex", "Poloniex"]
        }
    }, {
        "shortName": "GRS",
        "longName": "Groestlcoin",
        "exchanges": {
            "list": ["Binance", "Bittrex", "CCex", "CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "GXG",
        "longName": "GroinCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GRWI",
        "longName": "Growers International",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "GRW",
        "longName": "GrowthCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GFC",
        "longName": "Guficoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NLG",
        "longName": "Gulden",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "GUN",
        "longName": "GunCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "GUP",
        "longName": "Guppy",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "HADE",
        "longName": "HADE Platform",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PLAY",
        "longName": "HEROcoin",
        "exchanges": {
            "list": ["Coinbene"]
        }
    }, {
        "shortName": "HSR",
        "longName": "HSHARE",
        "exchanges": {
            "list": ["Binance", "BitZ", "CCex", "Cryptopia", "EXX", "Huobi", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "HKN",
        "longName": "Hacken",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "HAC",
        "longName": "Hackspace",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "HLC",
        "longName": "Halal Chain System",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "HAL",
        "longName": "Halcyon",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "HALLO",
        "longName": "Halloweencoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HPC",
        "longName": "Happycoin",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "HRC",
        "longName": "Hara",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HMC",
        "longName": "HarmonyCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HC",
        "longName": "HarvestCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "HAV",
        "longName": "Havecoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "HAT",
        "longName": "Hawala.Today",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "HCC",
        "longName": "Health Care Chain",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "HEALTHY",
        "longName": "HealthyFoodProgram",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "WORM",
        "longName": "HealthyWormCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HEAT",
        "longName": "HeatLedger",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "HLM",
        "longName": "Helium",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "THC",
        "longName": "HempCoin",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "HEC",
        "longName": "HeroChain",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "HXX",
        "longName": "HexxCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XHI",
        "longName": "HiCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "HPB",
        "longName": "High Performance Blockchain",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "HIGH",
        "longName": "Highgain",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HVN",
        "longName": "Hive Project",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "HBN",
        "longName": "HoboNickels",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "HDLB",
        "longName": "HodlBucks",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "HODL",
        "longName": "Hodlcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HWC",
        "longName": "HollyWoodCoin",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "HOLLY",
        "longName": "Hollyweed",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HBC",
        "longName": "HomeBlockCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "HONEY",
        "longName": "Honey",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HNR",
        "longName": "Honor",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "HOPE",
        "longName": "Hopecoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HOP",
        "longName": "Hoppin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "HOTC",
        "longName": "Hotchain",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "HOUSING",
        "longName": "HousingCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HUB",
        "longName": "Hubcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HMQ",
        "longName": "Humaniq",
        "exchanges": {
            "list": ["Bittrex", "Liqui"]
        }
    }, {
        "shortName": "HNC",
        "longName": "Huncoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "HUC",
        "longName": "Huntercoin",
        "exchanges": {
            "list": ["Poloniex"]
        }
    }, {
        "shortName": "HT",
        "longName": "Huobi Token",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "HUSH",
        "longName": "Hush",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "HYPER",
        "longName": "Hyper",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HYP",
        "longName": "HyperStake",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "IOC",
        "longName": "I/OCoin",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "I0C",
        "longName": "I0Coin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ICO",
        "longName": "ICOBI",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ICOB",
        "longName": "ICOBid",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ICOS",
        "longName": "ICOBox",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "ICOBI",
        "longName": "ICOCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ICX",
        "longName": "ICON",
        "exchanges": {
            "list": ["Binance", "Huobi", "HitBtc"]
        }
    }, {
        "shortName": "IFAN",
        "longName": "IFAN",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ILC",
        "longName": "ILCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "INS",
        "longName": "INS Ecosystem",
        "exchanges": {
            "list": ["Binance", "Kucoin", "Liqui"]
        }
    }, {
        "shortName": "INT",
        "longName": "INT Token",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "IOE",
        "longName": "IOECoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "IOST",
        "longName": "IOStoken",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "IOTA",
        "longName": "IOTA",
        "exchanges": {
            "list": ["Binance", "Bitfinex"]
        }
    }, {
        "shortName": "IPBC",
        "longName": "IPBC",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "IPT",
        "longName": "IPTChain",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "IPC",
        "longName": "IPchain ",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "ITC",
        "longName": "ITC",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "IXC",
        "longName": "IXCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "IZE",
        "longName": "IZEcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ICN",
        "longName": "Iconomi",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kraken", "Liqui", "Livecoin", "TuxExchange"]
        }
    }, {
        "shortName": "XDNCO",
        "longName": "IdontKnow",
        "exchanges": {
            "list": ["HitBtc", "HitBtc"]
        }
    }, {
        "shortName": "IGNIS",
        "longName": "Ignis",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "IC",
        "longName": "Ignition",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "IMX",
        "longName": "ImpactCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "IN",
        "longName": "InCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "INPAY",
        "longName": "InPay",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NKA",
        "longName": "Incakoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "INCNT",
        "longName": "Incent",
        "exchanges": {
            "list": ["Bittrex", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "IMS",
        "longName": "Independent Money System",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "INDIA",
        "longName": "IndiaCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "INDI",
        "longName": "Indicoin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "IND",
        "longName": "Indorse Token",
        "exchanges": {
            "list": ["Liqui"]
        }
    }, {
        "shortName": "IFX",
        "longName": "Infinex",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "IFC",
        "longName": "InfiniteCoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "IFLT",
        "longName": "InflationCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "INFX",
        "longName": "Influxcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "INFO",
        "longName": "InfoCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ICOT",
        "longName": "Initial Coin Offering Token",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "INK",
        "longName": "Ink",
        "exchanges": {
            "list": ["BitZ", "CoinEgg", "EXX"]
        }
    }, {
        "shortName": "INN",
        "longName": "Innova",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "INSN",
        "longName": "InsaneCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "IPL",
        "longName": "InsurePal",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "XID",
        "longName": "International Diamond",
        "exchanges": {
            "list": ["CCex", "Cryptopia", "Liqui"]
        }
    }, {
        "shortName": "IOP",
        "longName": "Internet Of People",
        "exchanges": {
            "list": ["Bittrex", "CCex"]
        }
    }, {
        "shortName": "XOM",
        "longName": "InternetOfMoney",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "XOT",
        "longName": "InternetOfThings",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "INXT",
        "longName": "Internxt",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "HOLD",
        "longName": "InterstellarHoldings",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "IFT",
        "longName": "InvestFeed",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "IOT",
        "longName": "IoTcoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ION",
        "longName": "Ion",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "IQT",
        "longName": "Iquant",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "IRL",
        "longName": "IrishCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XTP",
        "longName": "Isotope",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ITI",
        "longName": "ItiCoin",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "ING",
        "longName": "Iungo",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "JOY",
        "longName": "JOYREUM",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "JAPAN",
        "longName": "JapanCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "JEDI",
        "longName": "JediCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "JC",
        "longName": "Jesus Coin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "JET",
        "longName": "Jetcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "JIN",
        "longName": "JinCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XJO",
        "longName": "JouleCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "JBC",
        "longName": "JuBaoCoin",
        "exchanges": {
            "list": ["CoinEgg", "CoinExchange"]
        }
    }, {
        "shortName": "ERSO",
        "longName": "JynErso",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "KAPU",
        "longName": "KAPU",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "KGB",
        "longName": "KangarooBits",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "KRB",
        "longName": "Karbo",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "KASH",
        "longName": "KashCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KAYI",
        "longName": "Kayicoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "KEK",
        "longName": "Kekcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KTC",
        "longName": "KentCoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "KPL",
        "longName": "Keplershares",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "KICK",
        "longName": "KickCoin",
        "exchanges": {
            "list": ["Exmo", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "KLC",
        "longName": "KiloCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "KING",
        "longName": "King93",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KDC",
        "longName": "KlondikeCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KOBO",
        "longName": "Kobocoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "KOI",
        "longName": "Koicoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "KMD",
        "longName": "Komodo",
        "exchanges": {
            "list": ["Binance", "CoinExchange", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "KORE",
        "longName": "Kore",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "KRONE",
        "longName": "Kronecoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KCS",
        "longName": "KuCoin Shares",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "KBR",
        "longName": "Kubera",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "KUBO",
        "longName": "KubosCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "KUMA",
        "longName": "KumaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KURT",
        "longName": "Kurrent",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "KUSH",
        "longName": "KushCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KNC",
        "longName": "KyberNetworkCrystal",
        "exchanges": {
            "list": ["Binance", "Cryptopia", "Huobi", "Kucoin", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "LDC",
        "longName": "LADACoin",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "LA",
        "longName": "LAToken",
        "exchanges": {
            "list": ["CoinExchange", "Kucoin"]
        }
    }, {
        "shortName": "LBC",
        "longName": "LBRY Credits",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "LFTC",
        "longName": "LFTCCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LIFE",
        "longName": "LIFE",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "LLT",
        "longName": "LLToken",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "LOCI",
        "longName": "LOCIcoin",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "LAMBO",
        "longName": "Lambocoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TAU",
        "longName": "Lamden",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "PIX",
        "longName": "Lampix",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "LANA",
        "longName": "LanaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "VGS",
        "longName": "LasVegasCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LAT",
        "longName": "Latium",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "LATX",
        "longName": "LatiumX",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "LEA",
        "longName": "LeaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LEAF",
        "longName": "Leafcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LEEK",
        "longName": "Leek Coin",
        "exchanges": {
            "list": ["Coinbene"]
        }
    }, {
        "shortName": "LGD",
        "longName": "Legends",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "LEMON",
        "longName": "LemonCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LEO",
        "longName": "LeoCoin",
        "exchanges": {
            "list": ["BitZ", "CCex", "Livecoin"]
        }
    }, {
        "shortName": "HLB",
        "longName": "Lepaoquan",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "XLC",
        "longName": "LeviarCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LEVO",
        "longName": "LevoCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LVPS",
        "longName": "LevoPlus",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LIZI",
        "longName": "LiZi",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LINA",
        "longName": "Lina",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LINDA",
        "longName": "LindaCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "LET",
        "longName": "LinkEye",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "LINX",
        "longName": "Linx",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "LSK",
        "longName": "Lisk",
        "exchanges": {
            "list": ["Binance", "Bittrex", "BitZ", "CoinEgg", "Huobi", "HitBtc", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "LTB",
        "longName": "LiteBar",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LBTC",
        "longName": "LiteBitcoin",
        "exchanges": {
            "list": ["CoinEgg", "Cryptopia", "EXX"]
        }
    }, {
        "shortName": "LDOGE",
        "longName": "LiteDoge",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LTC",
        "longName": "Litecoin",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bitstamp", "Bittrex", "BitZ", "CCex", "Coinbene", "CoinEgg", "CoinExchange", "Cryptopia", "Exmo", "EXX", "Gdax", "Huobi", "HitBtc", "Kraken", "Kucoin", "Liqui", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "LTCU",
        "longName": "LitecoinUltra",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LIT",
        "longName": "Lithiumcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LIZ",
        "longName": "Lizus Payments",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LOC",
        "longName": "LockChain",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "LMC",
        "longName": "Lomocoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "LOOM",
        "longName": "Loom Network",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LRC",
        "longName": "Loopring",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "LOT",
        "longName": "Lottocoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LOYAL",
        "longName": "Loyalty",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "BASH",
        "longName": "LuckChain",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "LUCK",
        "longName": "Luckcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LKC",
        "longName": "Lucky Coin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "XLM",
        "longName": "Lumen",
        "exchanges": {
            "list": ["Binance", "Bittrex", "CoinEgg", "Kraken"]
        }
    }, {
        "shortName": "LUNA",
        "longName": "Lunacoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "LUN",
        "longName": "Lunyr",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Huobi", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "LUX",
        "longName": "Luxmi",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "LYC",
        "longName": "Lycancoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "LYNX",
        "longName": "Lynx",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MTL",
        "longName": "METAL",
        "exchanges": {
            "list": ["Binance", "Cryptopia", "Huobi", "Livecoin"]
        }
    }, {
        "shortName": "MIPS",
        "longName": "MIPSToken",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "MIX",
        "longName": "MIX",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "MLM",
        "longName": "MKTCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "MUN",
        "longName": "MUNcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MUSK",
        "longName": "MUSK Token",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "MAC",
        "longName": "MachineCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MCR",
        "longName": "Macro",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "MCRN",
        "longName": "Macron",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ART",
        "longName": "Maecenas",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "XMG",
        "longName": "Magi",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "MAGE",
        "longName": "MagicCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MGT",
        "longName": "Magnatum",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MAG",
        "longName": "Magnet",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MAGN",
        "longName": "MagnetCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MGM",
        "longName": "Magnumcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MAID",
        "longName": "MaidSafeCoin",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc", "Poloniex"]
        }
    }, {
        "shortName": "MALC",
        "longName": "MalaysiaCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MAM",
        "longName": "Mamcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MUX",
        "longName": "Manutax",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MAR",
        "longName": "MarijuanaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MARS",
        "longName": "MarsBux",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MARS2",
        "longName": "MarsBux2",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MXT",
        "longName": "MarteXcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MARX",
        "longName": "MarxCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MTNC",
        "longName": "MasterNodeCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MSCN",
        "longName": "MasterSwisCoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "MXC",
        "longName": "MatrixCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MTX",
        "longName": "Matryx",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "MVC",
        "longName": "Maverick System",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "MAXI",
        "longName": "Maxicoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MZC",
        "longName": "MazaCoin",
        "exchanges": {
            "list": ["BitZ", "Cryptopia"]
        }
    }, {
        "shortName": "MDS",
        "longName": "MediShares",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "MTN",
        "longName": "MedicalChain",
        "exchanges": {
            "list": ["Bitfinex", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "MGX",
        "longName": "MegaX",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MEC",
        "longName": "Megacoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MLITE",
        "longName": "Melite",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MLN",
        "longName": "Melon",
        "exchanges": {
            "list": ["Bittrex", "Kraken", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "MEME",
        "longName": "Memetic",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "MENTAL",
        "longName": "MentalHealthCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MER",
        "longName": "Mercury",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "MRYC",
        "longName": "Mermaid Coin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "MET",
        "longName": "Metacoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "MTLMC",
        "longName": "MetalMusicCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ETP",
        "longName": "Metaverse",
        "exchanges": {
            "list": ["Bitfinex", "BitZ", "HitBtc"]
        }
    }, {
        "shortName": "AMM",
        "longName": "MicroMoney",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "MCB",
        "longName": "Microbyte",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MILO",
        "longName": "MiloCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MNE",
        "longName": "Minereum",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "MNM",
        "longName": "Mineum",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MINEX",
        "longName": "Minex",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MNX",
        "longName": "MinexCoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "MINT",
        "longName": "Mintcoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MITH",
        "longName": "Mithril",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MBL",
        "longName": "MobileCash",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "MGO",
        "longName": "MobileGo",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "MBC",
        "longName": "Mobozcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MTRC",
        "longName": "ModulTrade",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "MOD",
        "longName": "Modum",
        "exchanges": {
            "list": ["Binance", "Kucoin"]
        }
    }, {
        "shortName": "MDA",
        "longName": "Moeda Loyalty Points",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "MOIN",
        "longName": "Moin",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "MOJO",
        "longName": "Mojocoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "MONA",
        "longName": "MonaCoin",
        "exchanges": {
            "list": ["Bittrex", "Livecoin"]
        }
    }, {
        "shortName": "MCO",
        "longName": "Monaco",
        "exchanges": {
            "list": ["Binance", "Bittrex", "BitZ", "EXX", "Huobi", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "XMR",
        "longName": "Monero",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "Cryptopia", "Exmo", "HitBtc", "Kraken", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "MUE",
        "longName": "MonetaryUnit",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "MTH",
        "longName": "Monetha",
        "exchanges": {
            "list": ["Binance", "CoinExchange", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "$$$",
        "longName": "Money",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MONK",
        "longName": "MonkeyProject",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MTC",
        "longName": "MonkeyTreasureCoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "XMCC",
        "longName": "Monoeci",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "SHOT",
        "longName": "MoonShot",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MOON",
        "longName": "Mooncoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XMS",
        "longName": "Moonstone DAC",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "MSP",
        "longName": "Mothership",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MOTO",
        "longName": "MotoCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MCC",
        "longName": "Moving Cloud Coin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "MUSIC",
        "longName": "Musicoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "MCI",
        "longName": "Musiconomi",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MST",
        "longName": "MustangCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "MYB",
        "longName": "MyBit Token",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "WISH",
        "longName": "MyWishToken",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XMY",
        "longName": "Myriad",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "MYST",
        "longName": "Mysterium",
        "exchanges": {
            "list": ["Liqui"]
        }
    }, {
        "shortName": "NGC",
        "longName": "NAGA",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "NAMO",
        "longName": "NAMO COIN",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NANJ",
        "longName": "NANJCOIN",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NANO",
        "longName": "NANO",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "ENAU",
        "longName": "NAU",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NAV",
        "longName": "NAVCoin",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "XEM",
        "longName": "NEM",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Cryptopia", "Huobi", "HitBtc", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "NXT",
        "longName": "NXT",
        "exchanges": {
            "list": ["Bittrex", "CCex", "CoinEgg", "HitBtc", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "NAM",
        "longName": "Namaste",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "NMC",
        "longName": "NameCoin",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "XRB",
        "longName": "Nano",
        "exchanges": {
            "list": ["BitZ", "Kucoin"]
        }
    }, {
        "shortName": "NTC",
        "longName": "Natcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NEBL",
        "longName": "Neblio",
        "exchanges": {
            "list": ["Binance", "Cryptopia", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "NAS",
        "longName": "Nebulas",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "NEO",
        "longName": "Neo",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "CoinEgg", "Cryptopia", "Huobi", "HitBtc", "Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "NEOG",
        "longName": "NeoGold",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NEOS",
        "longName": "NeosCoin",
        "exchanges": {
            "list": ["Bittrex", "Poloniex"]
        }
    }, {
        "shortName": "NBX",
        "longName": "NetBit",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NET",
        "longName": "NetCoin",
        "exchanges": {
            "list": ["Cryptopia", "Liqui"]
        }
    }, {
        "shortName": "NETKO",
        "longName": "Netko",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NUA",
        "longName": "Neulaut",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NEU",
        "longName": "Neumark",
        "exchanges": {
            "list": ["HitBtc", "Liqui"]
        }
    }, {
        "shortName": "NRO",
        "longName": "Neuro",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NDAO",
        "longName": "NeuroDAO",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NRN",
        "longName": "Neuron",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NTRN",
        "longName": "Neutron",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NEVA",
        "longName": "NevaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NDC",
        "longName": "NeverdieCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "NEWB",
        "longName": "Newbium",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "NKC",
        "longName": "Nework",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "NXC",
        "longName": "Nexium",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Poloniex"]
        }
    }, {
        "shortName": "NXS",
        "longName": "Nexus",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "NIHL",
        "longName": "Nihilo Coin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NOX",
        "longName": "Nitro",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "NLC2",
        "longName": "NoLimitCoin 2.0",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "NOBL",
        "longName": "NobleCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "EURN",
        "longName": "Noku EUR",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "NOKU",
        "longName": "Noku Master Token",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "NMD",
        "longName": "Nomad",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NVC",
        "longName": "NovaCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "NBT",
        "longName": "Nubits",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "NEON",
        "longName": "Nucleon",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NCASH",
        "longName": "Nucleus Vision",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "NULS",
        "longName": "Nuls",
        "exchanges": {
            "list": ["Binance", "BitZ", "Kucoin"]
        }
    }, {
        "shortName": "NMR",
        "longName": "Numeraire",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "NMS",
        "longName": "Numus",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "NUMUS",
        "longName": "NumusCash",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "NYAN",
        "longName": "NyanCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "OGN",
        "longName": "OGNCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "OPC",
        "longName": "OP Coin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "OTX",
        "longName": "OTCCoin",
        "exchanges": {
            "list": ["CCex", "HitBtc"]
        }
    }, {
        "shortName": "OX",
        "longName": "OX Fina",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "OBITS",
        "longName": "Obits",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ODN",
        "longName": "Obsidian",
        "exchanges": {
            "list": ["CCex", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "OC",
        "longName": "OceanChain",
        "exchanges": {
            "list": ["BitZ", "CoinEgg", "CoinExchange"]
        }
    }, {
        "shortName": "888",
        "longName": "OctoCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ODEM",
        "longName": "Odem",
        "exchanges": {
            "list": ["Bitfinex"]
        }
    }, {
        "shortName": "OCN",
        "longName": "Odyssey",
        "exchanges": {
            "list": ["BitZ", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "OK",
        "longName": "OkCash",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "OOO",
        "longName": "Om",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "OMG",
        "longName": "OmiseGO",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "BitZ", "CoinExchange", "Cryptopia", "Huobi", "HitBtc", "Kucoin", "Liqui", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "OMNI",
        "longName": "OmniCoin",
        "exchanges": {
            "list": ["Bittrex", "CCex", "Poloniex"]
        }
    }, {
        "shortName": "OGT",
        "longName": "OnlineGameToken",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "ONT",
        "longName": "Ontology",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "OPAL",
        "longName": "Opalcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "OSC",
        "longName": "Open Source Coin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "OTN",
        "longName": "Open Trading Network",
        "exchanges": {
            "list": ["BitZ", "Cryptopia", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "OAX",
        "longName": "OpenAnx",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "OD",
        "longName": "OpenDollar",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "OPNC",
        "longName": "OpinionCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "OPT",
        "longName": "Opus",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ORB",
        "longName": "OrbitCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ORME",
        "longName": "OrmeusCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "OTC",
        "longName": "OttoCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "OXY",
        "longName": "Oxycoin",
        "exchanges": {
            "list": ["BitZ", "Livecoin"]
        }
    }, {
        "shortName": "PRL",
        "longName": "OysterPearl",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "Kucoin"]
        }
    }, {
        "shortName": "OZC",
        "longName": "OzzieCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PAC",
        "longName": "PACcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PGC",
        "longName": "PGC",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "PHI",
        "longName": "PHI Token",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "PIN",
        "longName": "PINCOIN",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "POA",
        "longName": "POA Network",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "PRC",
        "longName": "PRCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "PCS",
        "longName": "PabyosiCoin Special",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "PAK",
        "longName": "PakCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PND",
        "longName": "PandaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PRG",
        "longName": "Paragon",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "DUO",
        "longName": "Parallelcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PARETO",
        "longName": "Pareto Network",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "PARIS",
        "longName": "Pariscoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PART",
        "longName": "Particl",
        "exchanges": {
            "list": ["Bittrex", "BitZ"]
        }
    }, {
        "shortName": "XPASC",
        "longName": "PascalClassic",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PASC",
        "longName": "PascalCoin",
        "exchanges": {
            "list": ["Poloniex"]
        }
    }, {
        "shortName": "PASL",
        "longName": "PascalLite",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PTOY",
        "longName": "Patientory",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "CON",
        "longName": "PayCon",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PYN",
        "longName": "Paycentos",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PEC",
        "longName": "PeaceCoin3.6",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PCL",
        "longName": "Peculium",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "PCN",
        "longName": "Peepcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PPC",
        "longName": "Peercoin",
        "exchanges": {
            "list": ["Bittrex", "BitZ", "CoinEgg", "Cryptopia", "HitBtc", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "PPY",
        "longName": "Peerplays",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "PENG",
        "longName": "Penguin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PEPECASH",
        "longName": "Pepe Cash",
        "exchanges": {
            "list": ["TuxExchange"]
        }
    }, {
        "shortName": "PEPE",
        "longName": "PepeCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PTC",
        "longName": "PesetaCoin ",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "XPD",
        "longName": "PetroDollar",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PHN",
        "longName": "Phillion",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PHS",
        "longName": "PhilosopherStone",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PHX",
        "longName": "PhoenixCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "PHR",
        "longName": "Phore",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PHO",
        "longName": "Photon",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PIZZA",
        "longName": "PiZZAcoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "RICKS",
        "longName": "PickleRicks",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PIGGY",
        "longName": "PiggyCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "PLR",
        "longName": "Pillar",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "PINK",
        "longName": "PinkCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "PCOIN",
        "longName": "PioneerCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PIPL",
        "longName": "PiplCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "SKULL",
        "longName": "PirateBlocks",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PIRL",
        "longName": "Pirl",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PTS",
        "longName": "PitisCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "PIVX",
        "longName": "Pivx",
        "exchanges": {
            "list": ["Binance", "Bittrex", "CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "XPTX",
        "longName": "PlatinumBar",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PLACO",
        "longName": "PlayerCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PKT",
        "longName": "PlaykeyToken",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "PWC",
        "longName": "Playwincoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PLX",
        "longName": "PlexCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "PGUC",
        "longName": "PlusGoldUnionCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "PLU",
        "longName": "Pluton",
        "exchanges": {
            "list": ["HitBtc", "Liqui"]
        }
    }, {
        "shortName": "POE",
        "longName": "Po.et",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "POSW",
        "longName": "PoSWCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PLC",
        "longName": "Polcoin",
        "exchanges": {
            "list": ["CoinEgg", "Cryptopia"]
        }
    }, {
        "shortName": "POLIS",
        "longName": "Polis",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PCC",
        "longName": "PolishCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "POLOB",
        "longName": "PoloBittShares",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PAI",
        "longName": "PolyAI",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "PLBT",
        "longName": "Polybius",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "POLY",
        "longName": "Polymath",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "POP",
        "longName": "PopularCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PPT",
        "longName": "Populous",
        "exchanges": {
            "list": ["Binance", "CoinExchange", "HitBtc", "Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "PT",
        "longName": "Porntoken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "POST",
        "longName": "Postcoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "POS",
        "longName": "Postoken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "POT",
        "longName": "PotCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Cryptopia", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "POWR",
        "longName": "PowerLedger",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Cryptopia", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "PRE",
        "longName": "Presearch",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "GARY",
        "longName": "President Johnson",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "PRES",
        "longName": "President Trump",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "PXI",
        "longName": "Prime-XI",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XPM",
        "longName": "Primecoin",
        "exchanges": {
            "list": ["BitZ", "CoinEgg", "Cryptopia", "Poloniex"]
        }
    }, {
        "shortName": "PRIMU",
        "longName": "Primulon",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PRX",
        "longName": "Printerium",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PROC",
        "longName": "ProCurrency",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PRO",
        "longName": "Propy",
        "exchanges": {
            "list": ["Bittrex", "Huobi", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "PROPY",
        "longName": "Propy token",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "PGL",
        "longName": "ProspectorsGold",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PRN",
        "longName": "Protean",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PR",
        "longName": "Prototanium",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "PBL",
        "longName": "Publica",
        "exchanges": {
            "list": ["Cryptopia", "Kucoin"]
        }
    }, {
        "shortName": "PLSR",
        "longName": "Pulsar",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PURA",
        "longName": "Pura",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia", "Kucoin"]
        }
    }, {
        "shortName": "PURE",
        "longName": "Pure",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VIDZ",
        "longName": "PureVidz",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "PUT",
        "longName": "PutinCoin",
        "exchanges": {
            "list": ["BitZ", "CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "PYLNT",
        "longName": "Pylon Network",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "QSH",
        "longName": "QASH",
        "exchanges": {
            "list": ["Bitfinex", "Huobi"]
        }
    }, {
        "shortName": "QEC",
        "longName": "Qiecoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "QLC",
        "longName": "Qlink",
        "exchanges": {
            "list": ["Binance", "Kucoin"]
        }
    }, {
        "shortName": "QTUM",
        "longName": "Qtum",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "BitZ", "CoinEgg", "CoinExchange", "EXX", "Huobi", "HitBtc", "Kucoin", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "QSP",
        "longName": "Quantstamp",
        "exchanges": {
            "list": ["Binance", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "QAU",
        "longName": "Quantum",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "QBTC",
        "longName": "Quantum Bitcoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "QRL",
        "longName": "Quantum Resistant Ledger",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Liqui"]
        }
    }, {
        "shortName": "QRK",
        "longName": "Quark",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "QTL",
        "longName": "Quatloo",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "QCN",
        "longName": "QuazarCoin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "Q2C",
        "longName": "Qubitcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "QUN",
        "longName": "QunQun",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "XQN",
        "longName": "Quotient",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "QURO",
        "longName": "Qurito",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "QWARK",
        "longName": "Qwark",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "R",
        "longName": "R token",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "RHOC",
        "longName": "RChain",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "IBC",
        "longName": "RCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "READ",
        "longName": "READ",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "RGC",
        "longName": "RG Coin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "RHFC",
        "longName": "RHFCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "RBBT",
        "longName": "Rabbitcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "RADS",
        "longName": "Radium",
        "exchanges": {
            "list": ["Bittrex", "Poloniex"]
        }
    }, {
        "shortName": "RDN",
        "longName": "Raiden Network Token",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "XRA",
        "longName": "RateCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XRC",
        "longName": "Rawcoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "REBL",
        "longName": "Rebellious",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "ECHO",
        "longName": "Reciprocation",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "RRT",
        "longName": "Recovery Right Tokens",
        "exchanges": {
            "list": ["Bitfinex"]
        }
    }, {
        "shortName": "RPX",
        "longName": "Red Pulse",
        "exchanges": {
            "list": ["Binance", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "RSS",
        "longName": "Red Sea Shells",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "RED",
        "longName": "RedCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "RDD",
        "longName": "ReddCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "REE",
        "longName": "ReeCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "REGA",
        "longName": "Rega",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "REC",
        "longName": "Regalcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RMC",
        "longName": "Remicoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RNS",
        "longName": "RenosCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "REN",
        "longName": "Republic Protocol",
        "exchanges": {
            "list": ["Liqui"]
        }
    }, {
        "shortName": "REQ",
        "longName": "Request Network",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "CoinExchange", "Huobi", "Kucoin", "Liqui"]
        }
    }, {
        "shortName": "MWAT",
        "longName": "Restart Energy",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "REV",
        "longName": "Revenu",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "RVR",
        "longName": "RevolutionVR",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "XRE",
        "longName": "Revolvercoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "RHO",
        "longName": "Rhodiumcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XRL",
        "longName": "Rialto",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "RIC",
        "longName": "Riecoin",
        "exchanges": {
            "list": ["Poloniex"]
        }
    }, {
        "shortName": "RBT",
        "longName": "Rimbit",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "RIO",
        "longName": "RioCoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "RCN",
        "longName": "Ripio Credit Network",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "Huobi"]
        }
    }, {
        "shortName": "XRP",
        "longName": "Ripple",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bitstamp", "Bittrex", "CoinEgg", "Exmo", "Huobi", "HitBtc", "Kraken", "Poloniex"]
        }
    }, {
        "shortName": "RVT",
        "longName": "Rivetz",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "RBM",
        "longName": "Robomed Network Token",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "RPC",
        "longName": "RonPaulCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ROOFS",
        "longName": "Roofs",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RLT",
        "longName": "RouletteCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "RDC",
        "longName": "RoundCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RBL",
        "longName": "RoyalBritishLegion",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RKC",
        "longName": "RoyalKingdomCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "XRY",
        "longName": "Royalties",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "RUB",
        "longName": "RubbleCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RBIES",
        "longName": "Rubies",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "RBY",
        "longName": "RubyCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "RUFF",
        "longName": "Ruff",
        "exchanges": {
            "list": ["CoinEgg", "Huobi"]
        }
    }, {
        "shortName": "RUNE",
        "longName": "RuneStoneCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RUNNERS",
        "longName": "Runners",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RUP",
        "longName": "Rupee",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "RC",
        "longName": "RussiaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SAFE",
        "longName": "SAFE",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "SBC",
        "longName": "SBCcoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "SBT",
        "longName": "SBucksToken",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SENYO",
        "longName": "SENYO",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SFI",
        "longName": "SFI Coin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "SHA",
        "longName": "SHACoin2",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SGC",
        "longName": "SIGMA coin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "SISA",
        "longName": "SISA",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "SJW",
        "longName": "SJWCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SMS",
        "longName": "SMSCoin",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "SNM",
        "longName": "SONM",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kucoin", "Liqui"]
        }
    }, {
        "shortName": "SST",
        "longName": "SSTCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "STEEM",
        "longName": "STEEM",
        "exchanges": {
            "list": ["Binance", "Bittrex", "HitBtc", "Liqui", "Poloniex"]
        }
    }, {
        "shortName": "STK",
        "longName": "STK token",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "STORJ",
        "longName": "STORJ",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Huobi", "Liqui", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "STORM",
        "longName": "STORM",
        "exchanges": {
            "list": ["Binance", "HitBtc"]
        }
    }, {
        "shortName": "SFE",
        "longName": "SafeCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XSTC",
        "longName": "Safetradecoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SAGA",
        "longName": "SagaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SHM",
        "longName": "Saham",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SKR",
        "longName": "SakuraCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SALT",
        "longName": "Salt",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Huobi", "Liqui"]
        }
    }, {
        "shortName": "SLS",
        "longName": "SaluS",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "SAN",
        "longName": "Santiment",
        "exchanges": {
            "list": ["Bitfinex", "Liqui"]
        }
    }, {
        "shortName": "STV",
        "longName": "Sativacoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "STO",
        "longName": "SaveTheOceanCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SCORE",
        "longName": "Scorecoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SDASH",
        "longName": "ScryptDashCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SRC",
        "longName": "SecureCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "B2X",
        "longName": "SegWit2x",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "SEL",
        "longName": "Selencoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "KEY",
        "longName": "Selfkey",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "SDRN",
        "longName": "Senderon",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SENT",
        "longName": "Sentinel",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "SEQ",
        "longName": "Sequence",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "SXC",
        "longName": "Sexcoin",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "SSS",
        "longName": "Sharechain",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "SAK",
        "longName": "SharkCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SKT",
        "longName": "SharkTrust",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "XSH",
        "longName": "Shield",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SHIFT",
        "longName": "Shift",
        "exchanges": {
            "list": ["Bittrex", "Livecoin"]
        }
    }, {
        "shortName": "SHIT",
        "longName": "Shitcoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SZC",
        "longName": "Shopzcoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "SHRM",
        "longName": "Shrooms",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SC",
        "longName": "Siacoin",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Poloniex"]
        }
    }, {
        "shortName": "SIB",
        "longName": "Siberian Chervonets",
        "exchanges": {
            "list": ["Bittrex", "CCex", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "SIKKA",
        "longName": "Sikka",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "SILK2",
        "longName": "SilkCoin2",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "OST",
        "longName": "Simple Token",
        "exchanges": {
            "list": ["Binance", "Huobi"]
        }
    }, {
        "shortName": "SIMP",
        "longName": "Simplecash",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SPL",
        "longName": "Simplicity",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SNGLS",
        "longName": "SingularDTV",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "AGI",
        "longName": "SingularityNET",
        "exchanges": {
            "list": ["Bitfinex", "Kucoin"]
        }
    }, {
        "shortName": "SIPS",
        "longName": "SipsCo",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SRN",
        "longName": "Sirin Token",
        "exchanges": {
            "list": ["Bittrex", "Huobi", "Liqui"]
        }
    }, {
        "shortName": "_11",
        "longName": "SixEleven",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "SKC",
        "longName": "SkeinCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SKIN",
        "longName": "SkinCoin",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "SKOIN",
        "longName": "Skoincoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SKRL",
        "longName": "Skrilla",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SKY",
        "longName": "Skycoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SLEVIN",
        "longName": "Slevin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SLOTH",
        "longName": "SlothCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SSP",
        "longName": "Smart Sharing Protocol",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "SMART",
        "longName": "SmartCash",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "SMC",
        "longName": "SmartCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SMT",
        "longName": "SmartMesh",
        "exchanges": {
            "list": ["Huobi", "HitBtc"]
        }
    }, {
        "shortName": "SMLY",
        "longName": "SmileyCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "SNOV",
        "longName": "Snovio",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "SNOW",
        "longName": "SnowCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SOAR",
        "longName": "SoarCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "SCL",
        "longName": "Social",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "SEND",
        "longName": "SocialSend",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SOIL",
        "longName": "SoilCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SOLAR",
        "longName": "Solar",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SLR",
        "longName": "SolarCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "SFC",
        "longName": "SolarflareCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "XLR",
        "longName": "Solaris",
        "exchanges": {
            "list": ["CoinExchange", "Kucoin"]
        }
    }, {
        "shortName": "SCT",
        "longName": "Soma",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SONG",
        "longName": "Songcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SOON",
        "longName": "SoonCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SPHTX",
        "longName": "SophiaTX",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "SPC",
        "longName": "SpaceChain",
        "exchanges": {
            "list": ["EXX"]
        }
    }, {
        "shortName": "SPACE",
        "longName": "SpaceCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SPA",
        "longName": "Spacoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "SPK",
        "longName": "SpankChain",
        "exchanges": {
            "list": ["Bitfinex", "Cryptopia"]
        }
    }, {
        "shortName": "SPN",
        "longName": "SpartanCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XSPEC",
        "longName": "SpectreCoin",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "SPHR",
        "longName": "Sphere",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "SPF",
        "longName": "SportyFi",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "SPT",
        "longName": "Spots",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SPR",
        "longName": "SpreadCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "SPRTS",
        "longName": "Sprouts",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SQL",
        "longName": "SquallCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SBIT",
        "longName": "StackBIT",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XSN",
        "longName": "StakeNet",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "STARS",
        "longName": "StarCash",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "STRC",
        "longName": "StarCredits",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "START",
        "longName": "StartCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SNT",
        "longName": "Status Network Token",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "Huobi", "HitBtc", "Kucoin", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "XST",
        "longName": "StealthCoin",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "SBD",
        "longName": "SteemDollars",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Liqui", "Poloniex"]
        }
    }, {
        "shortName": "STR",
        "longName": "Stellar",
        "exchanges": {
            "list": ["Poloniex"]
        }
    }, {
        "shortName": "STN",
        "longName": "Steneum",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "SLG",
        "longName": "Sterlingcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "STC",
        "longName": "StopTrumpCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "STX",
        "longName": "Stox",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc", "Kucoin", "Liqui"]
        }
    }, {
        "shortName": "STRAT",
        "longName": "Stratis",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Cryptopia", "HitBtc", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "DAT",
        "longName": "Streamr",
        "exchanges": {
            "list": ["Bitfinex", "Huobi", "Kucoin"]
        }
    }, {
        "shortName": "STU",
        "longName": "Student Coin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "SUB",
        "longName": "Substratum",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "SGR",
        "longName": "SugarExchange",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SUMO",
        "longName": "Sumokoin",
        "exchanges": {
            "list": ["Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "SNC",
        "longName": "SunContract",
        "exchanges": {
            "list": ["Huobi", "HitBtc"]
        }
    }, {
        "shortName": "SBTC",
        "longName": "Super Bitcoin",
        "exchanges": {
            "list": ["CoinEgg", "EXX", "Huobi"]
        }
    }, {
        "shortName": "SUPER",
        "longName": "SuperCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "UNITY",
        "longName": "SuperNET",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SUPERMAN",
        "longName": "Superman",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SUR",
        "longName": "Suretly",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "SURGE",
        "longName": "SurgeCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "BUCKS",
        "longName": "SwagBucks",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "SWT",
        "longName": "Swarm City Token",
        "exchanges": {
            "list": ["Bittrex", "HitBtc"]
        }
    }, {
        "shortName": "SWFTC",
        "longName": "SwftCoin",
        "exchanges": {
            "list": ["Huobi", "HitBtc"]
        }
    }, {
        "shortName": "SWING",
        "longName": "Swingcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "CHSB",
        "longName": "SwissBorg",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "SIC",
        "longName": "Swisscoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SWC",
        "longName": "SwisscoinCash",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "MFG",
        "longName": "SyncFab",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "SYNX",
        "longName": "Syndicate",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "AMP",
        "longName": "SynereoAmp",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "HitBtc", "Poloniex"]
        }
    }, {
        "shortName": "SNRG",
        "longName": "Synergy",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "SYS",
        "longName": "Syscoin",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Livecoin", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "TCOIN",
        "longName": "T-Coin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TBT",
        "longName": "TBOT",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "TEK",
        "longName": "TEKcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TKY",
        "longName": "THEKEY",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "TOA",
        "longName": "TOA Coin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "TPI",
        "longName": "TPICoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TRIG",
        "longName": "TRIG Token",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "TRX",
        "longName": "TRON",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "BitZ", "CoinEgg", "CoinExchange", "Cryptopia", "Huobi", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "TAJ",
        "longName": "Tajcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XTO",
        "longName": "Tao",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "TGT",
        "longName": "Targetcoin",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc"]
        }
    }, {
        "shortName": "TSE",
        "longName": "Tatoocoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "TLE",
        "longName": "TattoocoinLimitedEdition",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "THS",
        "longName": "TechShares",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "MEK",
        "longName": "Teky",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "TEL",
        "longName": "Telcoin",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "TELL",
        "longName": "Tellurion",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "PAY",
        "longName": "TenX Pay Token",
        "exchanges": {
            "list": ["Bittrex", "BitZ", "Cryptopia", "Huobi", "HitBtc", "Kucoin", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "TERI",
        "longName": "TengRi",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "TRC",
        "longName": "TerraCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "TER",
        "longName": "TerraNovaCoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "TESLA",
        "longName": "TeslaCoilCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "TES",
        "longName": "TeslaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "USDT",
        "longName": "Tether",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "XTZ",
        "longName": "Tezos",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "TBS",
        "longName": "The Basis",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TWC",
        "longName": "TheWallcoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "MAY",
        "longName": "TheresaMayCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "THETA",
        "longName": "Theta",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "TV",
        "longName": "Ti-Value",
        "exchanges": {
            "list": ["CoinEgg", "EXX"]
        }
    }, {
        "shortName": "TNT",
        "longName": "Tierion",
        "exchanges": {
            "list": ["Binance", "Huobi", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "TGC",
        "longName": "TigerCoin",
        "exchanges": {
            "list": ["CoinEgg", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "TNB",
        "longName": "Time New Bank",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Huobi"]
        }
    }, {
        "shortName": "TIT",
        "longName": "TitCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "BAR",
        "longName": "Titanium Blockchain",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "TTC",
        "longName": "TittieCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TAAS",
        "longName": "Token-as-a-Service",
        "exchanges": {
            "list": ["CoinExchange", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "TKN",
        "longName": "TokenCard",
        "exchanges": {
            "list": ["HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "TCT",
        "longName": "TokenClub",
        "exchanges": {
            "list": ["Coinbene"]
        }
    }, {
        "shortName": "TKS",
        "longName": "Tokes",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "TOK",
        "longName": "TokugawaCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TOP",
        "longName": "TopCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TOPAZ",
        "longName": "TopazCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TOPC",
        "longName": "Topchain",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "TOR",
        "longName": "TorCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TIO",
        "longName": "Trade Token",
        "exchanges": {
            "list": ["HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "TRANCE",
        "longName": "Trancecoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TX",
        "longName": "TransferCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinEgg", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "TRUX",
        "longName": "TreauxCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TZC",
        "longName": "Trezarcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TRI",
        "longName": "Triangles",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TRDT",
        "longName": "Trident Group",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TTY",
        "longName": "Trinity",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TNC",
        "longName": "Trinity Network Credit",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "TSTR",
        "longName": "TristarCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TPG",
        "longName": "Trollpayment",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TRK",
        "longName": "TruckCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "TFL",
        "longName": "TrueFlip",
        "exchanges": {
            "list": ["Kucoin", "Livecoin"]
        }
    }, {
        "shortName": "TUSD",
        "longName": "TrueUSD",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "TPC",
        "longName": "TrumPenceCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TRUMP",
        "longName": "TrumpCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "TRUST",
        "longName": "TrustPlus",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "TRST",
        "longName": "Trustcoin",
        "exchanges": {
            "list": ["Bittrex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "TUN",
        "longName": "Tune",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TURBO",
        "longName": "TurboCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "TRBO",
        "longName": "TurboStake",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "UGT",
        "longName": "UG Token",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "GAIN",
        "longName": "UGAIN",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "UK",
        "longName": "UKCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "UNC",
        "longName": "UNCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "UR",
        "longName": "UR",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "USA",
        "longName": "USACoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "UTK",
        "longName": "UTRUST",
        "exchanges": {
            "list": ["Huobi", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "XBU",
        "longName": "Ubercoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "UBQ",
        "longName": "Ubiq",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "ULA",
        "longName": "UlaTech",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "USC",
        "longName": "Ultimate Secure Cash",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ULTC",
        "longName": "UltimateCoin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "UTC",
        "longName": "Ultracoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "UNIC",
        "longName": "UniCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "UFO",
        "longName": "Uniform Fiscal Object",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "UNIFY",
        "longName": "Unify",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "UKG",
        "longName": "UnikoinGold",
        "exchanges": {
            "list": ["Bittrex", "Kucoin"]
        }
    }, {
        "shortName": "UTT",
        "longName": "United Traders Token",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "UBTC",
        "longName": "UnitedBitcoin",
        "exchanges": {
            "list": ["CoinEgg", "EXX"]
        }
    }, {
        "shortName": "UIS",
        "longName": "Unitus",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "UTNP",
        "longName": "Universa",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "UNRC",
        "longName": "Universal Royal Coin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "UNIT",
        "longName": "UniversalCurrency",
        "exchanges": {
            "list": ["BitZ", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "UMO",
        "longName": "UniversalMolecule",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "UIP",
        "longName": "UnlimitedIP",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "UNO",
        "longName": "Unobtanium",
        "exchanges": {
            "list": ["CCex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "UP",
        "longName": "UpToken",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange"]
        }
    }, {
        "shortName": "UFR",
        "longName": "Upfiring",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "UQC",
        "longName": "UquidCoin",
        "exchanges": {
            "list": ["CoinExchange", "Livecoin"]
        }
    }, {
        "shortName": "VRS",
        "longName": "VEROS",
        "exchanges": {
            "list": ["CCex", "Livecoin"]
        }
    }, {
        "shortName": "VIPS",
        "longName": "VIPSTARCOIN",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VOISE",
        "longName": "VOISE",
        "exchanges": {
            "list": ["BitZ", "CoinExchange", "Cryptopia", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "VADE",
        "longName": "Vade",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "VCC",
        "longName": "VaderCorpCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "VLU",
        "longName": "Valuto",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VPRC",
        "longName": "VapersCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "VLTC",
        "longName": "VaultCoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "XVC",
        "longName": "Vcash",
        "exchanges": {
            "list": ["Poloniex"]
        }
    }, {
        "shortName": "VEN",
        "longName": "VeChain",
        "exchanges": {
            "list": ["Binance", "CoinExchange", "Huobi", "HitBtc", "Kucoin", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "MVDSC",
        "longName": "Vehiclechain",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "VMC",
        "longName": "Vereum",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XVG",
        "longName": "Verge",
        "exchanges": {
            "list": ["Binance", "Bittrex", "CoinExchange", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "XVGCT",
        "longName": "Verge refund token",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "VRC",
        "longName": "VeriCoin",
        "exchanges": {
            "list": ["Bittrex", "CoinEgg", "Cryptopia", "Livecoin", "Poloniex"]
        }
    }, {
        "shortName": "VERI",
        "longName": "Veritaseum",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "VRM",
        "longName": "Verium",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia", "Livecoin"]
        }
    }, {
        "shortName": "V",
        "longName": "Version",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "VTC",
        "longName": "Vertcoin",
        "exchanges": {
            "list": ["Bittrex", "CoinEgg", "Poloniex"]
        }
    }, {
        "shortName": "VIA",
        "longName": "Viacoin",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Poloniex"]
        }
    }, {
        "shortName": "VIBE",
        "longName": "Vibe Coin",
        "exchanges": {
            "list": ["Binance", "HitBtc"]
        }
    }, {
        "shortName": "VIB",
        "longName": "Viberate",
        "exchanges": {
            "list": ["Binance", "Bittrex", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "VIEW",
        "longName": "View.ly",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "VUC",
        "longName": "VirtaUniqueCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "VC",
        "longName": "VirtualCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VISIO",
        "longName": "Visio",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VIT",
        "longName": "VitalCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "VIU",
        "longName": "Viuly",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "VIVO",
        "longName": "Vivo",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XVS",
        "longName": "Vsync",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VSX",
        "longName": "VsyncX",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VULCANO",
        "longName": "Vulcanocoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "W3C",
        "longName": "W3coin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "WA",
        "longName": "WA Space",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "WABI",
        "longName": "WaBi",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "WTC",
        "longName": "Walton",
        "exchanges": {
            "list": ["Binance", "HitBtc", "Kucoin"]
        }
    }, {
        "shortName": "WAN",
        "longName": "Wancoin",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "WASH",
        "longName": "WashingtonCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "WAVES",
        "longName": "Waves",
        "exchanges": {
            "list": ["Binance", "Bittrex", "Exmo", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "WETT",
        "longName": "Waves EncryptoTel",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "WAX",
        "longName": "Wax",
        "exchanges": {
            "list": ["Bitfinex", "Bittrex", "Huobi", "HitBtc"]
        }
    }, {
        "shortName": "WW",
        "longName": "WayaWolfCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "WICC",
        "longName": "Waykichain",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "WSX",
        "longName": "WeAreSatoshi",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "WPR",
        "longName": "WePower",
        "exchanges": {
            "list": ["Binance", "Huobi", "Liqui"]
        }
    }, {
        "shortName": "WEED",
        "longName": "Weed",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XWC",
        "longName": "WhiteCoin",
        "exchanges": {
            "list": ["Bittrex", "EXX"]
        }
    }, {
        "shortName": "WIC",
        "longName": "WiCoin",
        "exchanges": {
            "list": ["CoinEgg", "Livecoin"]
        }
    }, {
        "shortName": "WILD",
        "longName": "WildCrypto",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "WC",
        "longName": "WinCoin",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "WINGS",
        "longName": "Wings DAO",
        "exchanges": {
            "list": ["Binance", "Bittrex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "WINK",
        "longName": "WinkCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "WLC",
        "longName": "WirelessCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "WSP",
        "longName": "Wispr",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "WTHC",
        "longName": "Withcoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "WLK",
        "longName": "Wolk",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "WOMEN",
        "longName": "WomenCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "LOG",
        "longName": "WoodCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "WBTC",
        "longName": "WorldBTC",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "WDC",
        "longName": "WorldCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "WOP",
        "longName": "WorldPay",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "WRC",
        "longName": "Worldcore",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "WCL",
        "longName": "Wowclassic",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "WRP",
        "longName": "Wrapper",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XNC",
        "longName": "XNCCoin",
        "exchanges": {
            "list": ["CCex"]
        }
    }, {
        "shortName": "XP",
        "longName": "XP",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "XTD",
        "longName": "XTDCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XYZ",
        "longName": "XYZCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XAUR",
        "longName": "Xaurum",
        "exchanges": {
            "list": ["CCex", "HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "XCO",
        "longName": "Xcoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "XDE2",
        "longName": "Xde2",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "XGOX",
        "longName": "Xgox",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "XBY",
        "longName": "XtraBYtes",
        "exchanges": {
            "list": ["CCex", "Cryptopia"]
        }
    }, {
        "shortName": "XXX",
        "longName": "XxXCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "YBCT",
        "longName": "YBCoin Token",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "YYW",
        "longName": "YOYOW",
        "exchanges": {
            "list": ["Bitfinex", "HitBtc"]
        }
    }, {
        "shortName": "YEE",
        "longName": "Yee",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "YTC",
        "longName": "YiBitcoin",
        "exchanges": {
            "list": ["CoinEgg"]
        }
    }, {
        "shortName": "YOVI",
        "longName": "YobitCoin",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "YOC",
        "longName": "Yocoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "YOYO",
        "longName": "Yoyow",
        "exchanges": {
            "list": ["Binance"]
        }
    }, {
        "shortName": "XZC",
        "longName": "ZCoin",
        "exchanges": {
            "list": ["Binance", "Bittrex", "CoinExchange", "Cryptopia", "Liqui"]
        }
    }, {
        "shortName": "ZLA",
        "longName": "ZILLA",
        "exchanges": {
            "list": ["Huobi"]
        }
    }, {
        "shortName": "ZMC",
        "longName": "ZMicron",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ZAP",
        "longName": "Zap",
        "exchanges": {
            "list": ["Cryptopia", "HitBtc"]
        }
    }, {
        "shortName": "ZCC",
        "longName": "ZcCoin",
        "exchanges": {
            "list": ["CoinEgg", "CoinExchange"]
        }
    }, {
        "shortName": "ZEC",
        "longName": "Zcash",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "BitZ", "CoinExchange", "Cryptopia", "Exmo", "Huobi", "HitBtc", "Kraken", "Poloniex", "TuxExchange"]
        }
    }, {
        "shortName": "ZCL",
        "longName": "Zclassic",
        "exchanges": {
            "list": ["Bittrex", "CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "XZCD",
        "longName": "ZcoinDark",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ZPT",
        "longName": "Zeepin",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "ZEIT",
        "longName": "Zeitcoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ZEN",
        "longName": "ZenCash",
        "exchanges": {
            "list": ["Bittrex", "Cryptopia"]
        }
    }, {
        "shortName": "ZGC",
        "longName": "ZenGold",
        "exchanges": {
            "list": ["BitZ"]
        }
    }, {
        "shortName": "ZENI",
        "longName": "Zennies",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ZER",
        "longName": "Zero",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "ZET",
        "longName": "ZetaCoin",
        "exchanges": {
            "list": ["CoinEgg", "Cryptopia"]
        }
    }, {
        "shortName": "ZSC",
        "longName": "Zeusshield Coin",
        "exchanges": {
            "list": ["CCex", "HitBtc"]
        }
    }, {
        "shortName": "ZBC",
        "longName": "Zilbercoin",
        "exchanges": {
            "list": ["Livecoin"]
        }
    }, {
        "shortName": "ZIL",
        "longName": "Zilliqa",
        "exchanges": {
            "list": ["Binance", "Huobi"]
        }
    }, {
        "shortName": "ZCG",
        "longName": "Zlancer",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "ZZC",
        "longName": "ZoZoCoin",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "ZOI",
        "longName": "Zoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ZRC",
        "longName": "ZrCoin",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "ZSE",
        "longName": "Zsecoin",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "AXP",
        "longName": "aXpire",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "ADT",
        "longName": "adToken",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "ADB",
        "longName": "adbank",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "CV",
        "longName": "carVertical",
        "exchanges": {
            "list": ["Kucoin"]
        }
    }, {
        "shortName": "DNT",
        "longName": "district0x",
        "exchanges": {
            "list": ["Binance", "Bittrex", "HitBtc", "Liqui"]
        }
    }, {
        "shortName": "EBTC",
        "longName": "eBitcoin",
        "exchanges": {
            "list": ["CoinExchange", "Kucoin"]
        }
    }, {
        "shortName": "EBST",
        "longName": "eBoost",
        "exchanges": {
            "list": ["Bittrex", "CCex"]
        }
    }, {
        "shortName": "EBC",
        "longName": "eBullionCoin",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "DEM",
        "longName": "eMark",
        "exchanges": {
            "list": ["CoinExchange", "Cryptopia"]
        }
    }, {
        "shortName": "ERT",
        "longName": "eSports",
        "exchanges": {
            "list": ["CCex", "CoinExchange"]
        }
    }, {
        "shortName": "ICE",
        "longName": "iDice",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "RLC",
        "longName": "iEx.ec",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Bittrex", "HitBtc", "Liqui", "Livecoin"]
        }
    }, {
        "shortName": "IXT",
        "longName": "iXledger",
        "exchanges": {
            "list": ["HitBtc"]
        }
    }, {
        "shortName": "IDH",
        "longName": "indaHash",
        "exchanges": {
            "list": ["HitBtc", "Livecoin"]
        }
    }, {
        "shortName": "LCP",
        "longName": "litecoinPlus",
        "exchanges": {
            "list": ["Cryptopia"]
        }
    }, {
        "shortName": "MCAP",
        "longName": "mcAP",
        "exchanges": {
            "list": ["CCex", "HitBtc"]
        }
    }, {
        "shortName": "NBIT",
        "longName": "netBit",
        "exchanges": {
            "list": ["CoinExchange"]
        }
    }, {
        "shortName": "VSL",
        "longName": "vSlice",
        "exchanges": {
            "list": ["Liqui", "Livecoin"]
        }
    }, {
        "shortName": "VTR",
        "longName": "vTorrent",
        "exchanges": {
            "list": ["Bittrex"]
        }
    }, {
        "shortName": "ELF",
        "longName": "ælf",
        "exchanges": {
            "list": ["Binance", "Bitfinex", "Huobi"]
        }
    }];

    return {
        allCoins: allCoins
    };
}();

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 03/05/2018.
 */

module.exports = function () {

    function getTheNewCoins() {
        return JSON.parse(localStorage.getItem("newCoins"));
    }

    return {
        getTheNewCoins: getTheNewCoins
    };
}();

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(23);
var LIBRARY = __webpack_require__(35);
var wksExt = __webpack_require__(100);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(51)('keys');
var uid = __webpack_require__(34);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(20)(Function.call, __webpack_require__(18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(72).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(25);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(46);
var $iterCreate = __webpack_require__(80);
var setToStringTag = __webpack_require__(44);
var getPrototypeOf = __webpack_require__(19);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(38);
var descriptor = __webpack_require__(33);
var setToStringTag = __webpack_require__(44);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(55);
var defined = __webpack_require__(25);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(46);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(33);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(50);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(46);
module.exports = __webpack_require__(23).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(260);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(32);
var step = __webpack_require__(116);
var Iterators = __webpack_require__(46);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(79)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var invoke = __webpack_require__(106);
var html = __webpack_require__(71);
var cel = __webpack_require__(67);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(89).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(12);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(35);
var $typed = __webpack_require__(61);
var hide = __webpack_require__(13);
var redefineAll = __webpack_require__(43);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(41);
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(9);
var toIndex = __webpack_require__(125);
var gOPN = __webpack_require__(39).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(87);
var setToStringTag = __webpack_require__(44);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 18/02/2018.
 */

var GUIModule = __webpack_require__(95);

module.exports = function () {

    function toGenerate(coins, counter, newOrAllCoins) {
        var $resultaatString = "";
        var maxValue = counter + 25;
        for (counter; counter < maxValue; counter++) {
            $resultaatString += "" + GUIModule.generateTheHTMLOfFullAndShortName(coins[counter], counter, newOrAllCoins);
        }
        return {
            $resultaatString: $resultaatString,
            counter: counter
        };
    }

    return {
        toGenerate: toGenerate
    };
}();

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var getImageNames = __webpack_require__(134);

module.exports = function () {

    function generateTheHTMLOfFullAndShortName(object, counter, newOrAllCoins) {
        var fullName = object.longName;
        var shortName = object.shortName;
        var $resultaatString = '';
        return '\n        <div class="row" id="' + newOrAllCoins + counter + '">\n            <div class="col-xs-6">\n            ' + controleImageName(fullName, getImageNames.coinformatNames.find(function (el) {
            return shortName === el.shortName;
        }), shortName) + '\n                <div class="media-body">\n                    <h3 class=\'media-heading\'>' + fullName + '</h3>\n                    <p> [' + shortName + ']</p>\n                </div>\n                <div class=\'media-right\'>\n                    <h4 class=\'media-heading red\'></h4>\n                    <button class=\'btn btn-coinchecker\' data-val=\'' + fullName + '\' data-extra=\'' + shortName + '\'>More info</button>\n                </div>\n            </div>\n        </div>\n';
    }

    function controleImageName(oldName, fullName, shortName) {
        switch (fullName) {
            case undefined:
                return '<div class="media-left"><img class=\'media-object\' src=\'assets/media/' + oldName + '.jpg\' alt="' + oldName + '" title="' + shortName + '"></div>';
            default:
                var name = void 0;
                if (fullName.shortName === "BTM") {
                    name = oldName;
                } else {
                    name = fullName.photoName;
                }
                return '<div class="media-left"><img class=\'media-object\' src=\'assets/media/' + name + '.jpg\' alt="' + name + '" title="' + name + '"></div>';
        }
    }

    return {
        generateTheHTMLOfFullAndShortName: generateTheHTMLOfFullAndShortName,
        controleImageName: controleImageName
    };
}();

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

module.exports = function () {

    var searchArrayOfNames = [];
    var counterNewCoins = 0;
    var counterAllCoins = 0;
    var objectOfAllCoins = [];

    var variable = {
        searchArrayOfNames: searchArrayOfNames,
        counterAllCoins: counterAllCoins,
        counterNewCoins: counterNewCoins,
        objectOfAllCoins: objectOfAllCoins
    };

    return {
        var: variable
    };
}();

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 04/05/2018.
 */

module.exports = function () {

    function generateRefreshHTML() {
        return "\n            <div class=\"wait\">\n               <i class=\"fas fa-fw fa-shipping-fast\"></i>\n               <h1>We are getting the data!</h1>\n            </div>\n        ";
    }

    return {
        generateRefreshHTML: generateRefreshHTML
    };
}();

/***/ }),
/* 98 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(67)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(52)(false);
var IE_PROTO = __webpack_require__(69)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(36);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(39).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(49);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(12);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(106);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(45).trim;
var ws = __webpack_require__(73);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(45).trim;

module.exports = 1 / $parseFloat(__webpack_require__(73) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(21);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 111 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(76);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(48);
var toLength = __webpack_require__(9);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(57)
});


/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(91);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(121);
var validate = __webpack_require__(47);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(60)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(38);
var redefineAll = __webpack_require__(43);
var ctx = __webpack_require__(20);
var anInstance = __webpack_require__(41);
var forOf = __webpack_require__(42);
var $iterDefine = __webpack_require__(79);
var step = __webpack_require__(116);
var setSpecies = __webpack_require__(40);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(31).fastKey;
var validate = __webpack_require__(47);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(121);
var validate = __webpack_require__(47);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(60)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(28)(0);
var redefine = __webpack_require__(14);
var meta = __webpack_require__(31);
var assign = __webpack_require__(104);
var weak = __webpack_require__(124);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(47);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(60)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(43);
var getWeak = __webpack_require__(31).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(41);
var forOf = __webpack_require__(42);
var createArrayMethod = __webpack_require__(28);
var $has = __webpack_require__(16);
var validate = __webpack_require__(47);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(9);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(39);
var gOPS = __webpack_require__(53);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(54);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(9);
var ctx = __webpack_require__(20);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(9);
var repeat = __webpack_require__(75);
var defined = __webpack_require__(25);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(36);
var toIObject = __webpack_require__(17);
var isEnum = __webpack_require__(49).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(50);
var from = __webpack_require__(131);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(42);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 30/01/2018.
 */

var coinCheckerModule = __webpack_require__(370);

module.exports = function () {

    var hideItcoinCheckerModule = $('.alert');

    var htmlPages = [{ html: "index.html", elementsToHide: hideItcoinCheckerModule, init: coinCheckerModule }];

    return {
        htmlPages: htmlPages
    };
}();

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/02/2018.
 */

module.exports = function () {

    var coinformatNames = [{
        shortName: "$$$",
        longName: "Money",
        photoName: "Money"
    }, {
        shortName: "1337",
        longName: "1337",
        photoName: "1337"
    }, {
        shortName: "1EX",
        longName: "1EX",
        photoName: "1EX"
    }, {
        shortName: "1ST",
        longName: "Firstblood",
        photoName: "Firstblood"
    }, {
        shortName: "21M",
        longName: "21Million",
        photoName: "21Million"
    }, {
        shortName: "2GIVE",
        longName: "2GIVE",
        photoName: "2GIVE"
    }, {
        shortName: "300",
        longName: "300 Token",
        photoName: "300 Token"
    }, {
        shortName: "42",
        longName: "42-coin",
        photoName: "42-coin"
    }, {
        shortName: "420G",
        longName: "Ganjacoin",
        photoName: "Ganjacoin"
    }, {
        shortName: "4CHN",
        longName: "ChanCoin",
        photoName: "ChanCoin"
    }, {
        shortName: "611",
        longName: "SixEleven",
        photoName: "SixEleven"
    }, {
        shortName: "808",
        longName: "808",
        photoName: "808"
    }, {
        shortName: "888",
        longName: "OctoCoin",
        photoName: "OctoCoin"
    }, {
        shortName: "8BIT",
        longName: "8Bit",
        photoName: "8Bit"
    }, {
        shortName: "ABC",
        longName: "Alphabit",
        photoName: "Alphabit"
    }, {
        shortName: "ABN",
        longName: "ABNCoin",
        photoName: "ABNCoin"
    }, {
        shortName: "ABY",
        longName: "ArtByte",
        photoName: "ArtByte"
    }, {
        shortName: "AC",
        longName: "Asiacoin",
        photoName: "Asiacoin"
    }, {
        shortName: "ACC",
        longName: "Adcoin",
        photoName: "Adcoin"
    }, {
        shortName: "ACES",
        longName: "AcesCoin",
        photoName: "AcesCoin"
    }, {
        shortName: "ACN",
        longName: "Avoncoin",
        photoName: "Avoncoin"
    }, {
        shortName: "ACOIN",
        longName: "ACoin",
        photoName: "ACoin"
    }, {
        shortName: "ACP",
        longName: "AnarchistsPrime",
        photoName: "AnarchistsPrime"
    }, {
        shortName: "ADA",
        longName: "Ada",
        photoName: "Ada"
    }, {
        shortName: "ADC",
        longName: "AudioCoin",
        photoName: "AudioCoin"
    }, {
        shortName: "ADCN",
        longName: "AsiaDigiCoin",
        photoName: "Asiadigicoin"
    }, {
        shortName: "ADK",
        longName: "Aidos Kuneen",
        photoName: "Aidos Kuneen"
    }, {
        shortName: "ADST",
        longName: "Adshares",
        photoName: "Adshares"
    }, {
        shortName: "ADT",
        longName: "adToken",
        photoName: "adToken"
    }, {
        shortName: "ADX",
        longName: "AdEx",
        photoName: "AdEx"
    }, {
        shortName: "ADZ",
        longName: "Adzcoin",
        photoName: "Adzcoin"
    }, {
        shortName: "AE",
        longName: "Aeternity",
        photoName: "Aeternity"
    }, {
        shortName: "AEON",
        longName: "Aeon",
        photoName: "Aeon"
    }, {
        shortName: "AGRI",
        longName: "AgriNovusCoin",
        photoName: "AgriNovusCoin"
    }, {
        shortName: "AGRS",
        longName: "IDNI Agoras",
        photoName: "IDNI Agoras"
    }, {
        shortName: "AI",
        longName: "PolyAi",
        photoName: "PolyAi"
    }, {
        shortName: "AION",
        longName: "Aion",
        photoName: "Aion"
    }, {
        shortName: "AIR",
        longName: "Airtoken",
        photoName: "Airtoken"
    }, {
        shortName: "AKY",
        longName: "AkuyaCoin",
        photoName: "AkuyaCoin"
    }, {
        shortName: "ALEX",
        longName: "Alexandrite",
        photoName: "Alexandrite"
    }, {
        shortName: "ALIS",
        longName: "ALIS",
        photoName: "ALIS"
    }, {
        shortName: "ALL",
        longName: "Allion",
        photoName: "Allion"
    }, {
        shortName: "ALT",
        longName: "AltCoin",
        photoName: "AltCoin"
    }, {
        shortName: "AMB",
        longName: "Ambrosus",
        photoName: "Ambrosus"
    }, {
        shortName: "AMC",
        longName: "AngelaMerkelCoin",
        photoName: "AngelaMerkelCoin"
    }, {
        shortName: "AMM",
        longName: "MicroMoney",
        photoName: "MicroMoney"
    }, {
        shortName: "AMMO",
        longName: "AmmoRewards",
        photoName: "AmmoRewards"
    }, {
        shortName: "AMP",
        longName: "Synereo AMP",
        photoName: "Synereo AMP"
    }, {
        shortName: "AMS",
        longName: "Amsterdamcoin",
        photoName: "Amsterdamcoin"
    }, {
        shortName: "ANI",
        longName: "AnimeCoin",
        photoName: "AnimeCoin"
    }, {
        shortName: "ANT",
        longName: "Aragon",
        photoName: "Aragon"
    }, {
        shortName: "ANTX",
        longName: "Antimatter",
        photoName: "Antimatter"
    }, {
        shortName: "ANY",
        longName: "Anycoin",
        photoName: "Anycoin"
    }, {
        shortName: "APX",
        longName: "Apx",
        photoName: "Apx"
    }, {
        shortName: "ARC",
        longName: "ArcticCoin",
        photoName: "ArcticCoin"
    }, {
        shortName: "ARCO",
        longName: "AquariusCoin",
        photoName: "AquariusCoin"
    }, {
        shortName: "ARDR",
        longName: "Ardor",
        photoName: "Ardor"
    }, {
        shortName: "ARG",
        longName: "Argentum",
        photoName: "Argentum"
    }, {
        shortName: "ARGUS",
        longName: "ArgusCoin",
        photoName: "ArgusCoin"
    }, {
        shortName: "ARI",
        longName: "Aricoin",
        photoName: "Aricoin"
    }, {
        shortName: "ARK",
        longName: "Ark",
        photoName: "Ark"
    }, {
        shortName: "ARN",
        longName: "Aeron",
        photoName: "Aeron"
    }, {
        shortName: "ART",
        longName: "Maecenas",
        photoName: "Maecenas"
    }, {
        shortName: "ARTE",
        longName: "Artemine",
        photoName: "Artemine"
    }, {
        shortName: "ASAFE2",
        longName: "AllSafe",
        photoName: "AllSafe"
    }, {
        shortName: "ASN",
        longName: "Aseancoin",
        photoName: "Aseancoin"
    }, {
        shortName: "AST",
        longName: "AirSwap",
        photoName: "AirSwap"
    }, {
        shortName: "ATB",
        longName: "ATB Coin",
        photoName: "ATB Coin"
    }, {
        shortName: "ATH",
        longName: "Athenian Warrior Token",
        photoName: "Athenian Warrior Token"
    }, {
        shortName: "ATL",
        longName: "ATLANT Token",
        photoName: "ATLANT Token"
    }, {
        shortName: "ATM",
        longName: "ATMChain",
        photoName: "ATMChain"
    }, {
        shortName: "ATMS",
        longName: "Atmos",
        photoName: "Atmos"
    }, {
        shortName: "ATOM",
        longName: "Atomiccoin",
        photoName: "Atomiccoin"
    }, {
        shortName: "ATS",
        longName: "Authorship Token",
        photoName: "Authorship Token"
    }, {
        shortName: "ATX",
        longName: "ArtexCoin",
        photoName: "ArtexCoin"
    }, {
        shortName: "AU",
        longName: "AurumCoin",
        photoName: "AurumCoin"
    }, {
        shortName: "AUR",
        longName: "AuroraCoin",
        photoName: "AuroraCoin"
    }, {
        shortName: "AURS",
        longName: "Aureus",
        photoName: "Aureus"
    }, {
        shortName: "AVT",
        longName: "Aventus",
        photoName: "Aventus"
    }, {
        shortName: "B2B",
        longName: "B2B",
        photoName: "B2B"
    }, {
        shortName: "B3",
        longName: "B3Coin",
        photoName: "B3Coin"
    }, {
        shortName: "BAKED",
        longName: "BAKEDcoin",
        photoName: "BAKEDcoin"
    }, {
        shortName: "BAT",
        longName: "Basic Attention Token",
        photoName: "Basic Attention Token"
    }, {
        shortName: "BAY",
        longName: "BitBay",
        photoName: "BitBay"
    }, {
        shortName: "BBC",
        longName: "Bitcoin core",
        photoName: "BitcoinCore"
    }, {
        shortName: "BCD",
        longName: "Bitcoin Diamond",
        photoName: "Bitcoin Diamond"
    }, {
        shortName: "BCF",
        longName: "Bitcoin Fast",
        photoName: "Bitcoin Fast"
    }, {
        shortName: "BCH",
        longName: "Bitcoin Cash",
        photoName: "Bitcoin Cash"
    }, {
        shortName: "BCM",
        longName: "BitcoinMetal",
        photoName: "BitcoinMetal"
    }, {
        shortName: "BCN",
        longName: "Bytecoin",
        photoName: "Bytecoin"
    }, {
        shortName: "BCPT",
        longName: "BlockMason",
        photoName: "BlockMason"
    }, {
        shortName: "BCU",
        longName: "Bitcoin Unlimited",
        photoName: "Bitcoin Unlimited"
    }, {
        shortName: "BCY",
        longName: "BitCrystals",
        photoName: "BitCrystals"
    }, {
        shortName: "BDL",
        longName: "BitDeal",
        photoName: "Bitdeal"
    }, {
        shortName: "BEER",
        longName: "Beerhouse",
        photoName: "Beerhouse"
    }, {
        shortName: "BEEZ",
        longName: "BeezerCoin",
        photoName: "BeezerCoin"
    }, {
        shortName: "BELA",
        longName: "Bela",
        photoName: "Bela"
    }, {
        shortName: "BENJI",
        longName: "BenjiRolls",
        photoName: "BenjiRolls"
    }, {
        shortName: "BERN",
        longName: "BERNcash",
        photoName: "BERNcash"
    }, {
        shortName: "BEST",
        longName: "BestChain",
        photoName: "BestChain"
    }, {
        shortName: "BET",
        longName: "Betacoin",
        photoName: "Betacoin"
    }, {
        shortName: "BFI",
        longName: "BitFinTech",
        photoName: "BitFinTech"
    }, {
        shortName: "BIGUP",
        longName: "Bigup",
        photoName: "Bigup"
    }, {
        shortName: "BIO",
        longName: "BioCoin",
        photoName: "BioCoin"
    }, {
        shortName: "BIP",
        longName: "BipCoin",
        photoName: "BipCoin"
    }, {
        shortName: "BIRDS",
        longName: "BirdsCoin",
        photoName: "BirdsCoin"
    }, {
        shortName: "BIS",
        longName: "Bismuth",
        photoName: "Bismuth"
    }, {
        shortName: "BIT",
        longName: "First Bitcoin",
        photoName: "First Bitcoin"
    }, {
        shortName: "BITB",
        longName: "BitBean",
        photoName: "BitBean"
    }, {
        shortName: "BITS",
        longName: "Bitstar",
        photoName: "Bitstar"
    }, {
        shortName: "BIXC",
        longName: "Bixc",
        photoName: "Bixc"
    }, {
        shortName: "BIZ",
        longName: "BizCoin",
        photoName: "BizCoin"
    }, {
        shortName: "BKB",
        longName: "BetKing Bankroll Token",
        photoName: "BetKing Bankroll Token"
    }, {
        shortName: "BKCAT",
        longName: "BlockCat",
        photoName: "BlockCat"
    }, {
        shortName: "BLAS",
        longName: "BlakeStarCoin",
        photoName: "BlakeStarCoin"
    }, {
        shortName: "BLAZR",
        longName: "BlazerCoin",
        photoName: "BlazerCoin"
    }, {
        shortName: "BLC",
        longName: "Blakecoin",
        photoName: "Blakecoin"
    }, {
        shortName: "BLITZ",
        longName: "Blitzcash",
        photoName: "Blitzcash"
    }, {
        shortName: "BLK",
        longName: "BlackCoin",
        photoName: "BlackCoin"
    }, {
        shortName: "BLN",
        longName: "Boleno",
        photoName: "Boleno"
    }, {
        shortName: "BLOCK",
        longName: "BlockNet",
        photoName: "BlockNet"
    }, {
        shortName: "BLU",
        longName: "BlueCoin",
        photoName: "BlueCoin"
    }, {
        shortName: "BLUE",
        longName: "EthereumBlue",
        photoName: "EthereumBlue"
    }, {
        shortName: "BMC",
        longName: "Black Moon",
        photoName: "Black Moon"
    }, {
        shortName: "BMT",
        longName: "BMChain",
        photoName: "BMChain"
    }, {
        shortName: "BNB",
        longName: "Binance Coin",
        photoName: "Binance Coin"
    }, {
        shortName: "BNC",
        longName: "BraveNewCoin",
        photoName: "BraveNewCoin"
    }, {
        shortName: "BNT",
        longName: "Bancor",
        photoName: "Bancor"
    }, {
        shortName: "BNX",
        longName: "BnrtxCoin",
        photoName: "BnrtxCoin"
    }, {
        shortName: "BOAT",
        longName: "Doubloons",
        photoName: "Doubloons"
    }, {
        shortName: "BOLI",
        longName: "BolivarCoin",
        photoName: "BolivarCoin"
    }, {
        shortName: "BON",
        longName: "Bonpay",
        photoName: "Bonpay"
    }, {
        shortName: "BOP",
        longName: "BlockOptions",
        photoName: "BlockOptions"
    }, {
        shortName: "BOPS",
        longName: "Beonpush",
        photoName: "Beonpush"
    }, {
        shortName: "BOS",
        longName: "BOScoin",
        photoName: "BOScoin"
    }, {
        shortName: "BPC",
        longName: "BITPARK COIN",
        photoName: "BITPARK COIN"
    }, {
        shortName: "BPL",
        longName: "Blockpool",
        photoName: "Blockpool"
    }, {
        shortName: "BPOK",
        longName: "BitPokemonGo",
        photoName: "BitPokemonGo"
    }, {
        shortName: "BQ",
        longName: "Bitqy",
        photoName: "Bitqy"
    }, {
        shortName: "BRAT",
        longName: "Brat",
        photoName: "Brat"
    }, {
        shortName: "BRC",
        longName: "BinaryCoin",
        photoName: "BinaryCoin"
    }, {
        shortName: "BRD",
        longName: "Bread",
        photoName: "Bread"
    }, {
        shortName: "BRIT",
        longName: "Britcoin",
        photoName: "BritCoin"
    }, {
        shortName: "BRK",
        longName: "Breakout",
        photoName: "Breakout"
    }, {
        shortName: "BRO",
        longName: "Bitradio",
        photoName: "Bitradio"
    }, {
        shortName: "BRX",
        longName: "Breakout Stake",
        photoName: "Breakout Stake"
    }, {
        shortName: "BSD",
        longName: "BitSend",
        photoName: "BitSend"
    }, {
        shortName: "BSN",
        longName: "Bastone",
        photoName: "Bastone"
    }, {
        shortName: "BSR",
        longName: "BitSoar",
        photoName: "BitSoar"
    }, {
        shortName: "BSTY",
        longName: "GlobalBoost-Y",
        photoName: "GlobalBoost-Y"
    }, {
        shortName: "BTA",
        longName: "BATA",
        photoName: "Bata"
    }, {
        shortName: "BTB",
        longName: "BitBar",
        photoName: "BitBar"
    }, {
        shortName: "BTBc",
        longName: "Bitbase",
        photoName: "Bitbase"
    }, {
        shortName: "BTC",
        longName: "Bitcoin",
        photoName: "Bitcoin"
    }, {
        shortName: "BTCD",
        longName: "BitcoinDark",
        photoName: "BitcoinDark"
    }, {
        shortName: "BTCRED",
        longName: "BitcoinRed",
        photoName: "BitcoinRed"
    }, {
        shortName: "BTCRF",
        longName: "BitcoinRefill",
        photoName: "BitcoinRefill"
    }, {
        shortName: "BTCS",
        longName: "Bitcoin Scrypt",
        photoName: "Bitcoin Scrypt"
    }, {
        shortName: "BTDX",
        longName: "Bitcloud",
        photoName: "Bitcloud"
    }, {
        shortName: "BTE",
        longName: "BitSerial",
        photoName: "BitSerial"
    }, {
        shortName: "BTG",
        longName: "Bitcoin Gold",
        photoName: "Bitcoin Gold"
    }, {
        shortName: "BTM",
        longName: "Bitmark",
        photoName: "Bitmark"
    }, {
        shortName: "BTPL",
        longName: "BitcoinPlanet",
        photoName: "BitcoinPlanet"
    }, {
        shortName: "BTS",
        longName: "BitShares",
        photoName: "BitShares"
    }, {
        shortName: "BTX",
        longName: "BitCore",
        photoName: "BitCore"
    }, {
        shortName: "BUCKS",
        longName: "SwagBucks",
        photoName: "SwagBucks"
    }, {
        shortName: "BULLS",
        longName: "Bullshitcoin",
        photoName: "Bullshitcoin"
    }, {
        shortName: "BUMBA",
        longName: "Bumbacoin",
        photoName: "Bumbacoin"
    }, {
        shortName: "BURST",
        longName: "Burst",
        photoName: "Burst"
    }, {
        shortName: "BUS",
        longName: "Bus token",
        photoName: "Bus token"
    }, {
        shortName: "BUZZ",
        longName: "Buzzcoin",
        photoName: "Buzzcoin"
    }, {
        shortName: "BVB",
        longName: "BVBCoin",
        photoName: "BVBCoin"
    }, {
        shortName: "BWK",
        longName: "Bulwark",
        photoName: "Bulwark"
    }, {
        shortName: "BXC",
        longName: "Bitcedi",
        photoName: "Bitcedi"
    }, {
        shortName: "BXT",
        longName: "Bittoken",
        photoName: "Bittoken"
    }, {
        shortName: "BYC",
        longName: "Bytecent",
        photoName: "Bytecent"
    }, {
        shortName: "C2",
        longName: "Coin2",
        photoName: "Coin2"
    }, {
        shortName: "C47",
        longName: "Code47",
        photoName: "Code47"
    }, {
        shortName: "CACH",
        longName: "CacheCoin",
        photoName: "CacheCoin"
    }, {
        shortName: "CALC",
        longName: "Caliphcoin",
        photoName: "CaliphCoin"
    }, {
        shortName: "CANN",
        longName: "CannabisCoin",
        photoName: "CannabisCoin"
    }, {
        shortName: "CAP",
        longName: "BottleCaps",
        photoName: "BottleCaps"
    }, {
        shortName: "CAPP",
        longName: "Aeron",
        photoName: "Aeron"
    }, {
        shortName: "CAR",
        longName: "CareerCoin",
        photoName: "CareerCoin"
    }, {
        shortName: "CAT",
        longName: "Catcoin",
        photoName: "Catcoin"
    }, {
        shortName: "CBANK",
        longName: "CryptoBank",
        photoName: "CryptoBank"
    }, {
        shortName: "CBX",
        longName: "CryptoBullion",
        photoName: "CryptoBullion"
    }, {
        shortName: "CC",
        longName: "CoolInDarkCoin",
        photoName: "CoolInDarkCoin"
    }, {
        shortName: "CCN",
        longName: "CannaCoin",
        photoName: "CannaCoin"
    }, {
        shortName: "CCRB",
        longName: "CryptoCarbon",
        photoName: "CryptoCarbon"
    }, {
        shortName: "CDN",
        longName: "Canada eCoin",
        photoName: "Canada eCoin"
    }, {
        shortName: "CDT",
        longName: "Coindash",
        photoName: "Coindash"
    }, {
        shortName: "CDX",
        longName: "CommodityAdNetwork",
        photoName: "CommodityAdNetwork"
    }, {
        shortName: "CEFS",
        longName: "CryptopiaFeeShare",
        photoName: "CryptopiaFeeShare"
    }, {
        shortName: "CFC",
        longName: "CoffeeCoin",
        photoName: "CoffeeCoin"
    }, {
        shortName: "CFI",
        longName: "Cofound.it",
        photoName: "Cofound.it"
    }, {
        shortName: "CFT",
        longName: "CryptoForecast",
        photoName: "CryptoForecast"
    }, {
        shortName: "CFUN",
        longName: "CFUN",
        photoName: "CFUN"
    }, {
        shortName: "CHAT",
        longName: "Chat",
        photoName: "Chat"
    }, {
        shortName: "CHBT",
        longName: "CHBToken",
        photoName: "CHBToken"
    }, {
        shortName: "CHC",
        longName: "ChainCoin",
        photoName: "ChainCoin"
    }, {
        shortName: "CHEAP",
        longName: "CheapCoin",
        photoName: "CheapCoin"
    }, {
        shortName: "CHESS",
        longName: "ChessCoin",
        photoName: "ChessCoin"
    }, {
        shortName: "CHIEF",
        longName: "TheChiefCoin",
        photoName: "TheChiefCoin"
    }, {
        shortName: "CHILI",
        longName: "ChiliCoin",
        photoName: "ChiliCoin"
    }, {
        shortName: "CHIPS",
        longName: "Chips",
        photoName: "Chips"
    }, {
        shortName: "CJ",
        longName: "CryptoJacks",
        photoName: "CryptoJacks"
    }, {
        shortName: "CL",
        longName: "Coinlancer",
        photoName: "Coinlancer"
    }, {
        shortName: "CLAM",
        longName: "CLAMS",
        photoName: "CLAMS"
    }, {
        shortName: "CLD",
        longName: "Cloud With Me",
        photoName: "Cloud With Me"
    }, {
        shortName: "CLOAK",
        longName: "CloakCoin",
        photoName: "CloakCoin"
    }, {
        shortName: "CLPC",
        longName: "CLP Token",
        photoName: "CLP Token"
    }, {
        shortName: "CLT",
        longName: "CryptoLottoToken",
        photoName: "CryptoLottoToken"
    }, {
        shortName: "CLUB",
        longName: "ClubCoin",
        photoName: "ClubCoin"
    }, {
        shortName: "CMP",
        longName: "CompCoin",
        photoName: "CompCoin"
    }, {
        shortName: "CMPCO",
        longName: "CampusCoin",
        photoName: "CampusCoin"
    }, {
        shortName: "CMT",
        longName: "CometCoin",
        photoName: "CometCoin"
    }, {
        shortName: "CMX",
        longName: "CoinMiningIndex",
        photoName: "CoinMiningIndex"
    }, {
        shortName: "CND",
        longName: "Cindicator",
        photoName: "Cindicator"
    }, {
        shortName: "CNNC",
        longName: "Cannation",
        photoName: "Cannation"
    }, {
        shortName: "CNO",
        longName: "Coino",
        photoName: "Coino"
    }, {
        shortName: "CNT",
        longName: "Centurioncoin",
        photoName: "Centurioncoin"
    }, {
        shortName: "CNX",
        longName: "Cryptonex",
        photoName: "Cryptonex"
    }, {
        shortName: "CO2",
        longName: "ClimateCoin",
        photoName: "ClimateCoin"
    }, {
        shortName: "COAL",
        longName: "Bitcoal",
        photoName: "Bitcoal"
    }, {
        shortName: "COMP",
        longName: "Compound Coin",
        photoName: "Compound Coin"
    }, {
        shortName: "CON",
        longName: "PayCon",
        photoName: "PayCon"
    }, {
        shortName: "COOC",
        longName: "CoochieCoin",
        photoName: "CoochieCoin"
    }, {
        shortName: "COPPER",
        longName: "CopperCoin",
        photoName: "CopperCoin"
    }, {
        shortName: "COR",
        longName: "Corion",
        photoName: "Corion"
    }, {
        shortName: "CORG",
        longName: "CorgiCoin",
        photoName: "CorgiCoin"
    }, {
        shortName: "COSS",
        longName: "COSS",
        photoName: "COSS"
    }, {
        shortName: "COUPE",
        longName: "Coupecoin",
        photoName: "Coupecoin"
    }, {
        shortName: "COVAL",
        longName: "Circuits of Value",
        photoName: "Circuits of Value"
    }, {
        shortName: "CPC",
        longName: "CapriCoin",
        photoName: "CapriCoin"
    }, {
        shortName: "CPN",
        longName: "CompuCoin",
        photoName: "CompuCoin"
    }, {
        shortName: "CQST",
        longName: "ConquestCoin",
        photoName: "ConquestCoin"
    }, {
        shortName: "CRAVE",
        longName: "Crave",
        photoName: "Crave"
    }, {
        shortName: "CRB",
        longName: "CreditBit",
        photoName: "CreditBit"
    }, {
        shortName: "CRDNC",
        longName: "CredenceCoin",
        photoName: "CredenceCoin"
    }, {
        shortName: "CREA",
        longName: "CreativeCoin",
        photoName: "CreativeCoin"
    }, {
        shortName: "CREAK",
        longName: "Creakcoin",
        photoName: "Creakcoin"
    }, {
        shortName: "CREVA",
        longName: "CrevaCoin",
        photoName: "CrevaCoin"
    }, {
        shortName: "CRM",
        longName: "CREAMcoin",
        photoName: "CREAMcoin"
    }, {
        shortName: "CRMSN",
        longName: "Crimsoncoin",
        photoName: "Crimsoncoin"
    }, {
        shortName: "CRN",
        longName: "CoronaCoin",
        photoName: "CoronaCoin"
    }, {
        shortName: "CRUR",
        longName: "CryptoRuble",
        photoName: "CryptoRuble"
    }, {
        shortName: "CRW",
        longName: "Crown",
        photoName: "Crown"
    }, {
        shortName: "CRX",
        longName: "ChronosCoin",
        photoName: "ChronosCoin"
    }, {
        shortName: "CRYPT",
        longName: "CryptCoin",
        photoName: "CryptCoin"
    }, {
        shortName: "CSNO",
        longName: "BitDice",
        photoName: "BitDice"
    }, {
        shortName: "CTIC2",
        longName: "Coimatic2",
        photoName: "Coimatic2"
    }, {
        shortName: "CTIC3",
        longName: "Coimatic 3",
        photoName: "Coimatic 3"
    }, {
        shortName: "CTR",
        longName: "Centra",
        photoName: "Centra"
    }, {
        shortName: "CTX",
        longName: "Car Taxi",
        photoName: "Car Taxi"
    }, {
        shortName: "CUBE",
        longName: "DigiCube",
        photoName: "DigiCube"
    }, {
        shortName: "CURE",
        longName: "CureCoin",
        photoName: "CureCoin"
    }, {
        shortName: "CVC",
        longName: "Civic",
        photoName: "Civic"
    }, {
        shortName: "CXT",
        longName: "Coinonat",
        photoName: "Coinonat"
    }, {
        shortName: "CYCLONE",
        longName: "CycloneCoin",
        photoName: "CycloneCoin"
    }, {
        shortName: "CYDER",
        longName: "Cyder",
        photoName: "Cyder"
    }, {
        shortName: "DAG",
        longName: "DashGold",
        photoName: "DashGold"
    }, {
        shortName: "DALC",
        longName: "DALECOIN",
        photoName: "DALECOIN"
    }, {
        shortName: "DANC",
        longName: "DrAgoNCoin",
        photoName: "DrAgoNCoin"
    }, {
        shortName: "DARI",
        longName: "DariCoin",
        photoName: "DariCoin"
    }, {
        shortName: "DARK",
        longName: "DARK",
        photoName: "DARK"
    }, {
        shortName: "DAS",
        longName: "DA$",
        photoName: "DA$"
    }, {
        shortName: "DASH",
        longName: "Dash",
        photoName: "Dash"
    }, {
        shortName: "DAT",
        longName: "Streamr",
        photoName: "Streamr"
    }, {
        shortName: "DAV",
        longName: "DavorCoin",
        photoName: "DavorCoin"
    }, {
        shortName: "DAXX",
        longName: "DaxxCoin",
        photoName: "DaxxCoin"
    }, {
        shortName: "DAY",
        longName: "Chronologic",
        photoName: "Chronologic"
    }, {
        shortName: "DBET",
        longName: "DecentBet",
        photoName: "DecentBet"
    }, {
        shortName: "DBIX",
        longName: "DubaiCoin",
        photoName: "DubaiCoin"
    }, {
        shortName: "DCN",
        longName: "Dentacoin",
        photoName: "Dentacoin"
    }, {
        shortName: "DCR",
        longName: "Decred",
        photoName: "Decred"
    }, {
        shortName: "DCT",
        longName: "DECENT",
        photoName: "DECENT"
    }, {
        shortName: "DCY",
        longName: "DinastyCoin",
        photoName: "DinastyCoin"
    }, {
        shortName: "DDF",
        longName: "DDF",
        photoName: "DDF"
    }, {
        shortName: "DEM",
        longName: "Deutsche eMark",
        photoName: "Deutsche eMark"
    }, {
        shortName: "DEUS",
        longName: "Deuscoin",
        photoName: "DeusCoin"
    }, {
        shortName: "DFS",
        longName: "DFSCoin",
        photoName: "DFSCoin"
    }, {
        shortName: "DGC",
        longName: "Digitalcoin",
        photoName: "Digitalcoin"
    }, {
        shortName: "DGD",
        longName: "Digix DAO",
        photoName: "Digix DAO"
    }, {
        shortName: "DGPT",
        longName: "DigiPulse",
        photoName: "DigiPulse"
    }, {
        shortName: "DIBC",
        longName: "DIBCOIN",
        photoName: "DIBCOIN"
    }, {
        shortName: "DICE",
        longName: "Etheroll",
        photoName: "Etheroll"
    }, {
        shortName: "DIM",
        longName: "DIMCOIN",
        photoName: "DIMCOIN"
    }, {
        shortName: "DIME",
        longName: "Dimecoin",
        photoName: "Dimecoin"
    }, {
        shortName: "DIVX",
        longName: "Divi Exchange Token",
        photoName: "Divi Exchange Token"
    }, {
        shortName: "DLT",
        longName: "Agrello",
        photoName: "Agrello"
    }, {
        shortName: "DMB",
        longName: "DigitalMoneyBits",
        photoName: "DigitalMoneyBits"
    }, {
        shortName: "DMC",
        longName: "DynamicCoin",
        photoName: "DynamicCoin"
    }, {
        shortName: "DMD",
        longName: "Diamond",
        photoName: "Diamond"
    }, {
        shortName: "DNA",
        longName: "GeneChain",
        photoName: "GeneChain"
    }, {
        shortName: "DNCV2",
        longName: "DronecoinV2",
        photoName: "DronecoinV2"
    }, {
        shortName: "DNE",
        longName: "Daneton",
        photoName: "Daneton"
    }, {
        shortName: "DNR",
        longName: "Denarius",
        photoName: "Denarius"
    }, {
        shortName: "DNT",
        longName: "district0x",
        photoName: "district0x"
    }, {
        shortName: "DOGE",
        longName: "Dogecoin",
        photoName: "Dogecoin"
    }, {
        shortName: "DOGEJ",
        longName: "DogeJunior",
        photoName: "DogeJunior"
    }, {
        shortName: "DOLLAR",
        longName: "DOLLAR Online",
        photoName: "DOLLAR Online"
    }, {
        shortName: "DON",
        longName: "DonationCoin",
        photoName: "DonationCoin"
    }, {
        shortName: "DOPE",
        longName: "DopeCoin",
        photoName: "DopeCoin"
    }, {
        shortName: "DOT",
        longName: "Dotcoin",
        photoName: "Dotcoin"
    }, {
        shortName: "DOV",
        longName: "DOVU",
        photoName: "DOVU"
    }, {
        shortName: "DP",
        longName: "DigitalPrice",
        photoName: "DigitalPrice"
    }, {
        shortName: "DPC",
        longName: "Digital Price Classic",
        photoName: "Digital Price Classic"
    }, {
        shortName: "DPP",
        longName: "DA Power Play",
        photoName: "DA Power Play"
    }, {
        shortName: "DRP",
        longName: "DCORP",
        photoName: "DCORP"
    }, {
        shortName: "DRS",
        longName: "DigitalRupees",
        photoName: "DigitalRupees"
    }, {
        shortName: "DRXNE",
        longName: "Droxne",
        photoName: "Droxne"
    }, {
        shortName: "DSE",
        longName: "Disse",
        photoName: "Disse"
    }, {
        shortName: "DSH",
        longName: "DashCoin",
        photoName: "DashCoin"
    }, {
        shortName: "DTB",
        longName: "Databits",
        photoName: "Databits"
    }, {
        shortName: "DTCT",
        longName: "DetectorToken",
        photoName: "DetectorToken"
    }, {
        shortName: "DTR",
        longName: "Dynamic Trading Rights",
        photoName: "Dynamic Trading Rights"
    }, {
        shortName: "DUO",
        longName: "Parallelcoin",
        photoName: "Parallelcoin"
    }, {
        shortName: "DUTCH",
        longName: "DutchCoin",
        photoName: "DutchCoin"
    }, {
        shortName: "DYN",
        longName: "Dynamic",
        photoName: "Dynamic"
    }, {
        shortName: "EBC",
        longName: "eBullionCoin",
        photoName: "eBullionCoin"
    }, {
        shortName: "EBG",
        longName: "EmbargoCoin",
        photoName: "EmbargoCoin"
    }, {
        shortName: "EBST",
        longName: "eBoost",
        photoName: "eBoost"
    }, {
        shortName: "EBT",
        longName: "EbitTreeCoin",
        photoName: "EbitTreeCoin"
    }, {
        shortName: "EBTC",
        longName: "eBTC",
        photoName: "eBTC"
    }, {
        shortName: "EBTCOLD",
        longName: "eBTC Old",
        photoName: "eBTC Old"
    }, {
        shortName: "EC",
        longName: "Eclipse",
        photoName: "Eclipse"
    }, {
        shortName: "ECC",
        longName: "E-CurrencyCoin",
        photoName: "E-CurrencyCoin"
    }, {
        shortName: "ECN",
        longName: "E-Coin",
        photoName: "E-Coin"
    }, {
        shortName: "ECO",
        longName: "ECOcoin",
        photoName: "ECOcoin"
    }, {
        shortName: "ECOB",
        longName: "EcoBit",
        photoName: "EcoBit"
    }, {
        shortName: "EDC",
        longName: "EducoinV",
        photoName: "EducoinV"
    }, {
        shortName: "EDDIE",
        longName: "Eddiecoin",
        photoName: "Eddiecoin"
    }, {
        shortName: "EDG",
        longName: "Edgeless",
        photoName: "Edgeless"
    }, {
        shortName: "EDO",
        longName: "Eidoo",
        photoName: "Eidoo"
    }, {
        shortName: "EDR",
        longName: "E-Dinar Coin",
        photoName: "E-Dinar Coin"
    }, {
        shortName: "EDRC",
        longName: "EDRcoin",
        photoName: "EDRcoin"
    }, {
        shortName: "EFL",
        longName: "ElectronicGulden",
        photoName: "ElectronicGulden"
    }, {
        shortName: "EGC",
        longName: "EverGreenCoin",
        photoName: "EverGreenCoin"
    }, {
        shortName: "ELC",
        longName: "ElaCoin",
        photoName: "ElaCoin"
    }, {
        shortName: "ELCO",
        longName: "ELCoin",
        photoName: "ElCoin"
    }, {
        shortName: "ELE",
        longName: "Elementrem",
        photoName: "Elementrem"
    }, {
        shortName: "ELF",
        longName: "ælf",
        photoName: "ælf"
    }, {
        shortName: "ELIX",
        longName: "Elixir",
        photoName: "Elixir"
    }, {
        shortName: "ELLA",
        longName: "Ellaism",
        photoName: "Ellaism"
    }, {
        shortName: "ELM",
        longName: "Elements",
        photoName: "Elements"
    }, {
        shortName: "ELS",
        longName: "Elysium",
        photoName: "Elysium"
    }, {
        shortName: "ELT",
        longName: "ELTCoin",
        photoName: "ELTCoin"
    }, {
        shortName: "EMC",
        longName: "EmerCoin",
        photoName: "EmerCoin"
    }, {
        shortName: "EMC2",
        longName: "Einsteinium",
        photoName: "Einsteinium"
    }, {
        shortName: "EMD",
        longName: "Emerald Crypto",
        photoName: "Emerald Crypto"
    }, {
        shortName: "EMGO",
        longName: "MobileGo",
        photoName: "MobileGo"
    }, {
        shortName: "EMIRG",
        longName: "EmiratesGoldCoin",
        photoName: "EmiratesGoldCoin"
    }, {
        shortName: "ENG",
        longName: "Enigma",
        photoName: "Enigma"
    }, {
        shortName: "ENJ",
        longName: "Enjin Coin",
        photoName: "Enjin Coin"
    }, {
        shortName: "ENRG",
        longName: "EnergyCoin",
        photoName: "EnergyCoin"
    }, {
        shortName: "ENT",
        longName: "Eternity",
        photoName: "Eternity"
    }, {
        shortName: "ENTRC",
        longName: "EnterCoin",
        photoName: "EnterCoin"
    }, {
        shortName: "ENZO",
        longName: "ENZOLimited",
        photoName: "ENZOLimited"
    }, {
        shortName: "EOS",
        longName: "EOS",
        photoName: "EOS"
    }, {
        shortName: "EQL",
        longName: "Equal",
        photoName: "Equal"
    }, {
        shortName: "EQT",
        longName: "Equitrade",
        photoName: "Equitrade"
    }, {
        shortName: "ERC",
        longName: "EuropeCoin",
        photoName: "EuropeCoin"
    }, {
        shortName: "ERO",
        longName: "EROSCOIN",
        photoName: "EROSCOIN"
    }, {
        shortName: "ERSO",
        longName: "JynErso",
        photoName: "JynErso"
    }, {
        shortName: "ERT",
        longName: "eSportsRewardToken",
        photoName: "eSportsRewardToken"
    }, {
        shortName: "ERY",
        longName: "Eryllium",
        photoName: "Eryllium"
    }, {
        shortName: "ESC",
        longName: "Escroco",
        photoName: "Escroco"
    }, {
        shortName: "ESP",
        longName: "Espers",
        photoName: "Espers"
    }, {
        shortName: "ETBS",
        longName: "EthBits",
        photoName: "Ethbits"
    }, {
        shortName: "ETC",
        longName: "Ethereum Classic",
        photoName: "Ethereum Classic"
    }, {
        shortName: "ETF",
        longName: "FirstCryptoETF",
        photoName: "FirstCryptoETF"
    }, {
        shortName: "ETG",
        longName: "EthereumGold",
        photoName: "EthereumGold"
    }, {
        shortName: "ETH",
        longName: "Ethereum",
        photoName: "Ethereum"
    }, {
        shortName: "ETHD",
        longName: "Ethereum Dark",
        photoName: "Ethereum Dark"
    }, {
        shortName: "ETHP",
        longName: "ETHEREUM PLUS",
        photoName: "ETHEREUM PLUS"
    }, {
        shortName: "ETN",
        longName: "Electroneum",
        photoName: "Electroneum"
    }, {
        shortName: "ETP",
        longName: "Metaverse",
        photoName: "Metaverse"
    }, {
        shortName: "ETT",
        longName: "EncryptoTel",
        photoName: "EncryptoTel"
    }, {
        shortName: "EUC",
        longName: "Eurocoin",
        photoName: "Eurocoin"
    }, {
        shortName: "EUROP",
        longName: "EuropeUnited",
        photoName: "EuropeUnited"
    }, {
        shortName: "EVC",
        longName: "EventChain",
        photoName: "EventChain"
    }, {
        shortName: "EVIL",
        longName: "Evilcoin",
        photoName: "Evilcoin"
    }, {
        shortName: "EVO",
        longName: "Evotion",
        photoName: "Evotion"
    }, {
        shortName: "EVR",
        longName: "Everus",
        photoName: "Everus"
    }, {
        shortName: "EVX",
        longName: "Everex",
        photoName: "Everex"
    }, {
        shortName: "EXCL",
        longName: "ExclusiveCoin",
        photoName: "ExclusiveCoin"
    }, {
        shortName: "EXN",
        longName: "Exchangen",
        photoName: "Exchangen"
    }, {
        shortName: "EXP",
        longName: "Expanse",
        photoName: "Expanse"
    }, {
        shortName: "Ethos",
        longName: "Ethos",
        photoName: "Ethos"
    }, {
        shortName: "Ethos",
        longName: "Ethos",
        photoName: "Ethos"
    }, {
        shortName: "FAIR",
        longName: "FairCoin",
        photoName: "FairCoin"
    }, {
        shortName: "FAP",
        longName: "FAPcoin",
        photoName: "FAPcoin"
    }, {
        shortName: "FAZZ",
        longName: "FazzCoin",
        photoName: "FazzCoin"
    }, {
        shortName: "FCH",
        longName: "FastCash",
        photoName: "FastCash"
    }, {
        shortName: "FCN",
        longName: "FacileCoin",
        photoName: "FacileCoin"
    }, {
        shortName: "FCT",
        longName: "Factom",
        photoName: "Factom"
    }, {
        shortName: "FFC",
        longName: "FireFlyCoin",
        photoName: "FireFlyCoin"
    }, {
        shortName: "FGZ",
        longName: "FreeGameZoneCoin",
        photoName: "FreeGameZoneCoin"
    }, {
        shortName: "FJC",
        longName: "FujiCoin",
        photoName: "FujiCoin"
    }, {
        shortName: "FLASH",
        longName: "FLASH",
        photoName: "FLASH"
    }, {
        shortName: "FLAX",
        longName: "Flaxscript",
        photoName: "Flaxscript"
    }, {
        shortName: "FLDC",
        longName: "FoldingCoin",
        photoName: "FoldingCoin"
    }, {
        shortName: "FLIK",
        longName: "Flik",
        photoName: "Flik"
    }, {
        shortName: "FLIXX",
        longName: "Flixx",
        photoName: "Flixx"
    }, {
        shortName: "FLO",
        longName: "Florincoin",
        photoName: "Florincoin"
    }, {
        shortName: "FLT",
        longName: "FlutterCoin",
        photoName: "FlutterCoin"
    }, {
        shortName: "FNC",
        longName: "Fincoin",
        photoName: "Fincoin"
    }, {
        shortName: "FONZ",
        longName: "FonzieCoin",
        photoName: "FonzieCoin"
    }, {
        shortName: "FORT",
        longName: "Fortcoin",
        photoName: "Fortcoin"
    }, {
        shortName: "FRC",
        longName: "FireRoosterCoin",
        photoName: "FireRoosterCoin"
    }, {
        shortName: "FRD",
        longName: "Farad",
        photoName: "Farad"
    }, {
        shortName: "FRN",
        longName: "Francs",
        photoName: "Francs"
    }, {
        shortName: "FRST",
        longName: "FirstCoin",
        photoName: "FirstCoin"
    }, {
        shortName: "FRT",
        longName: "Fortesque",
        photoName: "Fortesque"
    }, {
        shortName: "FST",
        longName: "FastCoin",
        photoName: "FastCoin"
    }, {
        shortName: "FSX",
        longName: "Frost",
        photoName: "Frost"
    }, {
        shortName: "FTC",
        longName: "Feathercoin",
        photoName: "Feathercoin"
    }, {
        shortName: "FU",
        longName: "FuBi",
        photoName: "FuBi"
    }, {
        shortName: "FUEL",
        longName: "FuelCoin",
        photoName: "FuelCoin"
    }, {
        shortName: "FUN",
        longName: "FunFair",
        photoName: "FunFair"
    }, {
        shortName: "FUNC",
        longName: "FUNCOIN",
        photoName: "FUNCOIN"
    }, {
        shortName: "FUZZ",
        longName: "FuzzBalls",
        photoName: "FuzzBalls"
    }, {
        shortName: "FXE",
        longName: "Futurxe",
        photoName: "Futurxe"
    }, {
        shortName: "FYP",
        longName: "Flypme",
        photoName: "Flypme"
    }, {
        shortName: "GAIA",
        longName: "GaiaCoin",
        photoName: "GaiaCoin"
    }, {
        shortName: "GAIN",
        longName: "UGAIN",
        photoName: "UGAIN"
    }, {
        shortName: "GAM",
        longName: "Gambit",
        photoName: "Gambit"
    }, {
        shortName: "GAME",
        longName: "GameCredits",
        photoName: "GameCredits"
    }, {
        shortName: "GAP",
        longName: "Gapcoin",
        photoName: "Gapcoin"
    }, {
        shortName: "GAS",
        longName: "Gas",
        photoName: "Gas"
    }, {
        shortName: "GAY",
        longName: "GayMoney",
        photoName: "GayMoney"
    }, {
        shortName: "GB",
        longName: "GoldBlocks",
        photoName: "Goldblocks"
    }, {
        shortName: "GBG",
        longName: "Gbg",
        photoName: "Gbg"
    }, {
        shortName: "GBX",
        longName: "GoByte",
        photoName: "GoByte"
    }, {
        shortName: "GBYTE",
        longName: "Byteball",
        photoName: "Byteball"
    }, {
        shortName: "GCR",
        longName: "GlobalCurrencyReserve",
        photoName: "GlobalCurrencyReserve"
    }, {
        shortName: "GDC",
        longName: "GoldenCryptoCoin",
        photoName: "GoldenCryptoCoin"
    }, {
        shortName: "GEERT",
        longName: "GeertCoin",
        photoName: "GeertCoin"
    }, {
        shortName: "GEO",
        longName: "GeoCoin",
        photoName: "geocoin"
    }, {
        shortName: "GET",
        longName: "GreenEnergyToken",
        photoName: "GreenEnergyToken"
    }, {
        shortName: "GFC",
        longName: "Guficoin",
        photoName: "Guficoin"
    }, {
        shortName: "GLD",
        longName: "GoldCoin",
        photoName: "GoldCoin"
    }, {
        shortName: "GLS",
        longName: "GlassCoin",
        photoName: "GlassCoin"
    }, {
        shortName: "GLT",
        longName: "GlobalToken",
        photoName: "GlobalToken"
    }, {
        shortName: "GMB",
        longName: "Gambleo",
        photoName: "Gambleo"
    }, {
        shortName: "GMX",
        longName: "GoldMaxCoin",
        photoName: "Goldmaxcoin"
    }, {
        shortName: "GNO",
        longName: "Gnosis",
        photoName: "Gnosis"
    }, {
        shortName: "GNT",
        longName: "Golem",
        photoName: "Golem"
    }, {
        shortName: "GOLD",
        longName: "GoldenCoin",
        photoName: "GoldenCoin"
    }, {
        shortName: "GOLF",
        longName: "Golfcoin",
        photoName: "Golfcoin"
    }, {
        shortName: "GOLOS",
        longName: "Golos",
        photoName: "Golos"
    }, {
        shortName: "GOOD",
        longName: "Goodomy",
        photoName: "Goodomy"
    }, {
        shortName: "GP",
        longName: "GoldPieces",
        photoName: "GoldPieces"
    }, {
        shortName: "GPL",
        longName: "GoldPressedLatinum ",
        photoName: "GoldPressedLatinum "
    }, {
        shortName: "GPU",
        longName: "GPUCoin",
        photoName: "GPUCoin"
    }, {
        shortName: "GRC",
        longName: "Gridcoin Research",
        photoName: "Gridcoin Research"
    }, {
        shortName: "GRE",
        longName: "Greencoin",
        photoName: "Greencoin"
    }, {
        shortName: "GREENF",
        longName: "GreenFingers",
        photoName: "GreenFingers"
    }, {
        shortName: "GRMD",
        longName: "GreenMed",
        photoName: "GreenMed"
    }, {
        shortName: "GRN",
        longName: "Granite",
        photoName: "Granite"
    }, {
        shortName: "GRPH",
        longName: "s3ntigrapH",
        photoName: "s3ntigrapH"
    }, {
        shortName: "GRS",
        longName: "Groestlcoin",
        photoName: "Groestlcoin"
    }, {
        shortName: "GRW",
        longName: "GrowthCoin",
        photoName: "GrowthCoin"
    }, {
        shortName: "GRWI",
        longName: "Growers Intl",
        photoName: "Growers Intl"
    }, {
        shortName: "GRX",
        longName: "GoldRewardToken",
        photoName: "GoldRewardToken"
    }, {
        shortName: "GTC",
        longName: "GlobalTourCoin",
        photoName: "GlobalTourCoin"
    }, {
        shortName: "GTO",
        longName: "Gifto",
        photoName: "Gifto"
    }, {
        shortName: "GUN",
        longName: "GunCoin",
        photoName: "GunCoin"
    }, {
        shortName: "GUP",
        longName: "Guppy",
        photoName: "Guppy"
    }, {
        shortName: "GVT",
        longName: "Genesis Vision",
        photoName: "Genesis Vision"
    }, {
        shortName: "GWC",
        longName: "WildersCoin",
        photoName: "WildersCoin"
    }, {
        shortName: "GXS",
        longName: "GXShares",
        photoName: "GXShares"
    }, {
        shortName: "GYC",
        longName: "GongYiCoin",
        photoName: "GongYiCoin"
    }, {
        shortName: "HAC",
        longName: "Hackspace",
        photoName: "Hackspace"
    }, {
        shortName: "HAL",
        longName: "Halcyon",
        photoName: "Halcyon"
    }, {
        shortName: "HALLO",
        longName: "Halloweencoin",
        photoName: "Halloweencoin"
    }, {
        shortName: "HAV",
        longName: "Havecoin",
        photoName: "Havecoin"
    }, {
        shortName: "HBN",
        longName: "HoboNickels",
        photoName: "HoboNickels"
    }, {
        shortName: "HC",
        longName: "HarvestCoin",
        photoName: "HarvestCoin"
    }, {
        shortName: "HDLB",
        longName: "HodlBucks",
        photoName: "HodlBucks"
    }, {
        shortName: "HEALTHY",
        longName: "HealthyFoodProgram",
        photoName: "HealthyFoodProgram"
    }, {
        shortName: "HEAT",
        longName: "HeatLedger",
        photoName: "HeatLedger"
    }, {
        shortName: "HIGH",
        longName: "Highgain",
        photoName: "Highgain"
    }, {
        shortName: "HLM",
        longName: "Helium",
        photoName: "Helium"
    }, {
        shortName: "HMC",
        longName: "HarmonyCoin",
        photoName: "HarmonyCoin"
    }, {
        shortName: "HMQ",
        longName: "Humaniq",
        photoName: "Humaniq"
    }, {
        shortName: "HNC",
        longName: "Huncoin",
        photoName: "Huncoin"
    }, {
        shortName: "HOC",
        longName: "Huobicoin",
        photoName: "Huobicoin"
    }, {
        shortName: "HODL",
        longName: "Hodlcoin",
        photoName: "Hodlcoin"
    }, {
        shortName: "HOLD",
        longName: "InterstellarHoldings",
        photoName: "InterstellarHoldings"
    }, {
        shortName: "HOLLY",
        longName: "Hollyweed",
        photoName: "Hollyweed"
    }, {
        shortName: "HONEY",
        longName: "Honey",
        photoName: "Honey"
    }, {
        shortName: "HOPE",
        longName: "Hopecoin",
        photoName: "Hopecoin"
    }, {
        shortName: "HPC",
        longName: "Happycoin",
        photoName: "Happycoin"
    }, {
        shortName: "HSR",
        longName: "HSHARE",
        photoName: "HSHARE"
    }, {
        shortName: "HST",
        longName: "Decision Token",
        photoName: "Decision Token"
    }, {
        shortName: "HTML",
        longName: "Htmlcoin",
        photoName: "Htmlcoin"
    }, {
        shortName: "HUB",
        longName: "Hubcoin",
        photoName: "Hubcoin"
    }, {
        shortName: "HUC",
        longName: "Huntercoin",
        photoName: "Huntercoin"
    }, {
        shortName: "HUSH",
        longName: "Hush",
        photoName: "Hush"
    }, {
        shortName: "HVN",
        longName: "Hive Project",
        photoName: "Hive Project"
    }, {
        shortName: "HXX",
        longName: "HexxCoin",
        photoName: "HexxCoin"
    }, {
        shortName: "HYP",
        longName: "HyperStake",
        photoName: "HyperStake"
    }, {
        shortName: "HYPER",
        longName: "Hyper",
        photoName: "Hyper"
    }, {
        shortName: "I0C",
        longName: "I0Coin",
        photoName: "I0Coin"
    }, {
        shortName: "IBC",
        longName: "RCoin",
        photoName: "RCoin"
    }, {
        shortName: "ICE",
        longName: "iDice",
        photoName: "iDice"
    }, {
        shortName: "ICN",
        longName: "Iconomi",
        photoName: "Iconomi"
    }, {
        shortName: "ICO",
        longName: "ICOBI",
        photoName: "ICOBI"
    }, {
        shortName: "ICOB",
        longName: "ICOBid",
        photoName: "ICOBid"
    }, {
        shortName: "ICOS",
        longName: "ICOBox",
        photoName: "ICOBox"
    }, {
        shortName: "ICOT",
        longName: "Initial Coin Offering Token",
        photoName: "Initial Coin Offering Token"
    }, {
        shortName: "ICX",
        longName: "ICON",
        photoName: "ICON"
    }, {
        shortName: "IFLT",
        longName: "InflationCoin",
        photoName: "InflationCoin"
    }, {
        shortName: "IFT",
        longName: "investFeed",
        photoName: "investFeed"
    }, {
        shortName: "ILC",
        longName: "ILCoin",
        photoName: "ILCoin"
    }, {
        shortName: "IMS",
        longName: "Independent Money System",
        photoName: "Independent Money System"
    }, {
        shortName: "IMX",
        longName: "ImpactCoin",
        photoName: "ImpactCoin"
    }, {
        shortName: "IN",
        longName: "InCoin",
        photoName: "InCoin"
    }, {
        shortName: "INCNT",
        longName: "Incent",
        photoName: "Incent"
    }, {
        shortName: "INDI",
        longName: "Indicoin",
        photoName: "Indicoin"
    }, {
        shortName: "INDIA",
        longName: "IndiaCoin",
        photoName: "IndiaCoin"
    }, {
        shortName: "INFO",
        longName: "InfoCoin",
        photoName: "InfoCoin"
    }, {
        shortName: "INFX",
        longName: "InfluxCoin",
        photoName: "InfluxCoin"
    }, {
        shortName: "INK",
        longName: "Ink",
        photoName: "Ink"
    }, {
        shortName: "INN",
        longName: "Innova",
        photoName: "Innova"
    }, {
        shortName: "INSN",
        longName: "Insane",
        photoName: "Insane"
    }, {
        shortName: "INXT",
        longName: "Internxt",
        photoName: "Internxt"
    }, {
        shortName: "IOC",
        longName: "I/OCoin",
        photoName: "IOCoin"
    }, {
        shortName: "IOE",
        longName: "IOECoin",
        photoName: "IOECoin"
    }, {
        shortName: "ION",
        longName: "Ion",
        photoName: "Ion"
    }, {
        shortName: "IOP",
        longName: "Internet Of People",
        photoName: "Internet Of People"
    }, {
        shortName: "IOTA",
        longName: "IOTA",
        photoName: "IOTA"
    }, {
        shortName: "IQT",
        longName: "Iquant Chain",
        photoName: "Iquant Chain"
    }, {
        shortName: "IRL",
        longName: "IrishCoin",
        photoName: "IrishCoin"
    }, {
        shortName: "ITI",
        longName: "ItiCoin",
        photoName: "ItiCoin"
    }, {
        shortName: "IXC",
        longName: "IXCoin",
        photoName: "IXCoin"
    }, {
        shortName: "IXT",
        longName: "iXledger",
        photoName: "iXledger"
    }, {
        shortName: "IZE",
        longName: "IZEcoin",
        photoName: "IZEcoin"
    }, {
        shortName: "JAPAN",
        longName: "JapanCoin",
        photoName: "JapanCoin"
    }, {
        shortName: "JEDI",
        longName: "JediCoin",
        photoName: "JediCoin"
    }, {
        shortName: "JET",
        longName: "JetCoin",
        photoName: "JetCoin"
    }, {
        shortName: "JIN",
        longName: "JinCoin",
        photoName: "JinCoin"
    }, {
        shortName: "KASH",
        longName: "KashCoin",
        photoName: "KashCoin"
    }, {
        shortName: "KAYI",
        longName: "Kayicoin",
        photoName: "Kayicoin"
    }, {
        shortName: "KBR",
        longName: "Kubera",
        photoName: "Kubera"
    }, {
        shortName: "KDC",
        longName: "KlondikeCoin",
        photoName: "KlondikeCoin"
    }, {
        shortName: "KED",
        longName: "Darsek",
        photoName: "Darsek"
    }, {
        shortName: "KEK",
        longName: "Kekcoin",
        photoName: "Kekcoin"
    }, {
        shortName: "KGB",
        longName: "KangarooBits",
        photoName: "KangarooBits"
    }, {
        shortName: "KICK",
        longName: "KickCoin",
        photoName: "KickCoin"
    }, {
        shortName: "KING",
        longName: "King93",
        photoName: "King93"
    }, {
        shortName: "KLC",
        longName: "KiloCoin",
        photoName: "KiloCoin"
    }, {
        shortName: "KMD",
        longName: "Komodo",
        photoName: "Komodo"
    }, {
        shortName: "KNC",
        longName: "KyberNetworkCrystal",
        photoName: "KyberNetworkCrystal"
    }, {
        shortName: "KOBO",
        longName: "KoboCoin",
        photoName: "KoboCoin"
    }, {
        shortName: "KOI",
        longName: "Koicoin",
        photoName: "Koicoin"
    }, {
        shortName: "KORE",
        longName: "Kore",
        photoName: "Kore"
    }, {
        shortName: "KORUNA",
        longName: "CzechoSlovak KORUNA",
        photoName: "CzechoSlovak KORUNA"
    }, {
        shortName: "KPL",
        longName: "KeplerShares",
        photoName: "Keplershares"
    }, {
        shortName: "KRA",
        longName: "Kratomcoin",
        photoName: "Kratomcoin"
    }, {
        shortName: "KRB",
        longName: "Karbowanec",
        photoName: "Karbowanec"
    }, {
        shortName: "KRONE",
        longName: "Kronecoin",
        photoName: "Kronecoin"
    }, {
        shortName: "KUBO",
        longName: "KubosCoin",
        photoName: "KubosCoin"
    }, {
        shortName: "KURT",
        longName: "Kurrent",
        photoName: "Kurrent"
    }, {
        shortName: "KUSH",
        longName: "KushCoin",
        photoName: "KushCoin"
    }, {
        shortName: "LA",
        longName: "LAToken",
        photoName: "LAToken"
    }, {
        shortName: "LAMBO",
        longName: "Lambocoin",
        photoName: "Lambocoin"
    }, {
        shortName: "LANA",
        longName: "LanaCoin",
        photoName: "LanaCoin"
    }, {
        shortName: "LAT",
        longName: "Latium",
        photoName: "Latium"
    }, {
        shortName: "LBC",
        longName: "LBRY Credits",
        photoName: "LBRY Credits"
    }, {
        shortName: "LBTC",
        longName: "LiteBitcoin",
        photoName: "LiteBitcoin"
    }, {
        shortName: "LCP",
        longName: "litecoinPlus",
        photoName: "litecoinPlus"
    }, {
        shortName: "LCT",
        longName: "LendConnect",
        photoName: "LendConnect"
    }, {
        shortName: "LDC",
        longName: "LADACoin",
        photoName: "LADACoin"
    }, {
        shortName: "LDOGE",
        longName: "LiteDoge",
        photoName: "LiteDoge"
    }, {
        shortName: "LEMON",
        longName: "LemonCoin",
        photoName: "LemonCoin"
    }, {
        shortName: "LEND",
        longName: "EthLend",
        photoName: "EthLend"
    }, {
        shortName: "LEO",
        longName: "LeoCoin",
        photoName: "Leocoin"
    }, {
        shortName: "LEPEN",
        longName: "Le Pen Coin",
        photoName: "Le Pen Coin"
    }, {
        shortName: "LEVO",
        longName: "LevoCoin",
        photoName: "LevoCoin"
    }, {
        shortName: "LGD",
        longName: "Legends",
        photoName: "Legends"
    }, {
        shortName: "LIFE",
        longName: "LIFEtoken",
        photoName: "LIFEtoken"
    }, {
        shortName: "LINDA",
        longName: "LindaCoin",
        photoName: "LindaCoin"
    }, {
        shortName: "LINK",
        longName: "ChainLink",
        photoName: "ChainLink"
    }, {
        shortName: "LINX",
        longName: "Linx",
        photoName: "Linx"
    }, {
        shortName: "LIT",
        longName: "Lithiumcoin",
        photoName: "Lithiumcoin"
    }, {
        shortName: "LIZI",
        longName: "LiZi",
        photoName: "LiZi"
    }, {
        shortName: "LMC",
        longName: "Lomocoin",
        photoName: "Lomocoin"
    }, {
        shortName: "LNK",
        longName: "EthereumLink",
        photoName: "EthereumLink"
    }, {
        shortName: "LOC",
        longName: "LockChain",
        photoName: "LockChain"
    }, {
        shortName: "LRC",
        longName: "Loopring",
        photoName: "Loopring"
    }, {
        shortName: "LSK",
        longName: "Lisk",
        photoName: "Lisk"
    }, {
        shortName: "LTB",
        longName: "LiteBar",
        photoName: "LiteBar"
    }, {
        shortName: "LTC",
        longName: "Litecoin",
        photoName: "Litecoin"
    }, {
        shortName: "LTCU",
        longName: "LitecoinUltra",
        photoName: "LitecoinUltra"
    }, {
        shortName: "LTG",
        longName: "LiteCoinGold",
        photoName: "LiteCoinGold"
    }, {
        shortName: "LUCK",
        longName: "Luckcoin",
        photoName: "Luckcoin"
    }, {
        shortName: "LUN",
        longName: "Lunyr",
        photoName: "Lunyr"
    }, {
        shortName: "LUNA",
        longName: "Lunacoin",
        photoName: "LunaCoin"
    }, {
        shortName: "LUX",
        longName: "Luxcoin",
        photoName: "Luxcoin"
    }, {
        shortName: "LVPS",
        longName: "LevoPlus",
        photoName: "LevoPlus"
    }, {
        shortName: "MAC",
        longName: "MachineCoin",
        photoName: "MachineCoin"
    }, {
        shortName: "MAG",
        longName: "Magnet",
        photoName: "Magnet"
    }, {
        shortName: "MAGE",
        longName: "MagicCoin",
        photoName: "MagicCoin"
    }, {
        shortName: "MAGN",
        longName: "MagnetCoin",
        photoName: "MagnetCoin"
    }, {
        shortName: "MAID",
        longName: "MaidSafeCoin",
        photoName: "MaidSafeCoin"
    }, {
        shortName: "MALC",
        longName: "MalaysiaCoin",
        photoName: "MalaysiaCoin"
    }, {
        shortName: "MANA",
        longName: "Decentraland",
        photoName: "Decentraland"
    }, {
        shortName: "MAR",
        longName: "MarijuanaCoin",
        photoName: "MarijuanaCoin"
    }, {
        shortName: "MARS",
        longName: "Mars",
        photoName: "Mars"
    }, {
        shortName: "MARS2",
        longName: "MarsBux2",
        photoName: "MarsBux2"
    }, {
        shortName: "MARX",
        longName: "MarxCoin",
        photoName: "MarxCoin"
    }, {
        shortName: "MAXI",
        longName: "Maxicoin",
        photoName: "Maxicoin"
    }, {
        shortName: "MAY",
        longName: "TheresaMayCoin",
        photoName: "TheresaMayCoin"
    }, {
        shortName: "MBC",
        longName: "Mobozcoin",
        photoName: "Mobozcoin"
    }, {
        shortName: "MBIT",
        longName: "Mbit",
        photoName: "Mbit"
    }, {
        shortName: "MBRS",
        longName: "Embers",
        photoName: "Embers"
    }, {
        shortName: "MCAP",
        longName: "MCAP",
        photoName: "MCAP"
    }, {
        shortName: "MCB",
        longName: "Microbyte",
        photoName: "Microbyte"
    }, {
        shortName: "MCI",
        longName: "Musiconomi",
        photoName: "Musiconomi"
    }, {
        shortName: "MCO",
        longName: "Monaco",
        photoName: "Monaco"
    }, {
        shortName: "MCR",
        longName: "Macro",
        photoName: "Macro"
    }, {
        shortName: "MCRN",
        longName: "Macron",
        photoName: "Macron"
    }, {
        shortName: "MDA",
        longName: "Moeda Loyalty Points",
        photoName: "Moeda Loyalty Points"
    }, {
        shortName: "MEC",
        longName: "MegaCoin",
        photoName: "MegaCoin"
    }, {
        shortName: "MEME",
        longName: "Memetic",
        photoName: "Memetic"
    }, {
        shortName: "MENTAL",
        longName: "MentalHealthCoin",
        photoName: "MentalHealthCoin"
    }, {
        shortName: "MER",
        longName: "Mercury",
        photoName: "Mercury"
    }, {
        shortName: "MET",
        longName: "Metacoin",
        photoName: "Metacoin"
    }, {
        shortName: "MGM",
        longName: "Magnumcoin",
        photoName: "Magnumcoin"
    }, {
        shortName: "MGO",
        longName: "MobileGo",
        photoName: "MobileGo"
    }, {
        shortName: "MGT",
        longName: "Magnatum",
        photoName: "Magnatum"
    }, {
        shortName: "MGX",
        longName: "MegaX",
        photoName: "MegaX"
    }, {
        shortName: "MILO",
        longName: "MiloCoin",
        photoName: "MiloCoin"
    }, {
        shortName: "MINEX",
        longName: "Minex",
        photoName: "Minex"
    }, {
        shortName: "MINT",
        longName: "Mintcoin",
        photoName: "Mintcoin"
    }, {
        shortName: "MIPS",
        longName: "MIPSToken",
        photoName: "MIPSToken"
    }, {
        shortName: "MLITE",
        longName: "Melite",
        photoName: "Melite"
    }, {
        shortName: "MLN",
        longName: "Melon",
        photoName: "Melon"
    }, {
        shortName: "MNE",
        longName: "Minereum",
        photoName: "Minereum"
    }, {
        shortName: "MNM",
        longName: "Mineum",
        photoName: "Mineum"
    }, {
        shortName: "MNX",
        longName: "Minexcoin",
        photoName: "Minexcoin"
    }, {
        shortName: "MOD",
        longName: "Modum",
        photoName: "Modum"
    }, {
        shortName: "MOIN",
        longName: "MOIN",
        photoName: "MOIN"
    }, {
        shortName: "MOJO",
        longName: "MojoCoin",
        photoName: "MojoCoin"
    }, {
        shortName: "MONA",
        longName: "MonaCoin",
        photoName: "MonaCoin"
    }, {
        shortName: "MONK",
        longName: "MonkeyProject",
        photoName: "MonkeyProject"
    }, {
        shortName: "MOON",
        longName: "Mooncoin",
        photoName: "Mooncoin"
    }, {
        shortName: "MOTO",
        longName: "MotoCoin",
        photoName: "MotoCoin"
    }, {
        shortName: "MSCN",
        longName: "MasterSwisCoin",
        photoName: "MasterSwisCoin"
    }, {
        shortName: "MSP",
        longName: "Mothership",
        photoName: "Mothership"
    }, {
        shortName: "MST",
        longName: "Mustangcoin",
        photoName: "Mustangcoin"
    }, {
        shortName: "MTH",
        longName: "Monetha",
        photoName: "Monetha"
    }, {
        shortName: "MTL",
        longName: "METAL",
        photoName: "METAL"
    }, {
        shortName: "MTLMC",
        longName: "MetalMusicCoin",
        photoName: "MetalMusicCoin"
    }, {
        shortName: "MTNC",
        longName: "MasterNodeCoin",
        photoName: "MasterNodeCoin"
    }, {
        shortName: "MUE",
        longName: "MonetaryUnit",
        photoName: "MonetaryUnit"
    }, {
        shortName: "MUSIC",
        longName: "Musicoin",
        photoName: "Musicoin"
    }, {
        shortName: "MUX",
        longName: "Manutax",
        photoName: "Manutax"
    }, {
        shortName: "MXC",
        longName: "MatrixCoin",
        photoName: "MatrixCoin"
    }, {
        shortName: "MXT",
        longName: "MarteXcoin",
        photoName: "MarteXcoin"
    }, {
        shortName: "MYB",
        longName: "MyBit",
        photoName: "MyBit"
    }, {
        shortName: "MYST",
        longName: "Mysterium",
        photoName: "Mysterium"
    }, {
        shortName: "MZC",
        longName: "MazaCoin",
        photoName: "MazaCoin"
    }, {
        shortName: "NAMO",
        longName: "NAMO COIN",
        photoName: "NAMO COIN"
    }, {
        shortName: "NAV",
        longName: "NAVCoin",
        photoName: "NAVCoin"
    }, {
        shortName: "NBIT",
        longName: "netBit",
        photoName: "netBit"
    }, {
        shortName: "NBT",
        longName: "Nubits",
        photoName: "Nubits"
    }, {
        shortName: "NBX",
        longName: "NetBit",
        photoName: "NetBitX"
    }, {
        shortName: "NDAO",
        longName: "NeuroDAO",
        photoName: "NeuroDAO"
    }, {
        shortName: "NEBL",
        longName: "Neblio",
        photoName: "Neblio"
    }, {
        shortName: "NEO",
        longName: "Neo",
        photoName: "Neo"
    }, {
        shortName: "NEOG",
        longName: "NeoGold",
        photoName: "NeoGold"
    }, {
        shortName: "NEON",
        longName: "Nucleon",
        photoName: "Nucleon"
    }, {
        shortName: "NEOS",
        longName: "Neoscoin",
        photoName: "Neoscoin"
    }, {
        shortName: "NET",
        longName: "NetCoin",
        photoName: "NetCoin"
    }, {
        shortName: "NETKO",
        longName: "Netko",
        photoName: "Netko"
    }, {
        shortName: "NEVA",
        longName: "NevaCoin",
        photoName: "NevaCoin"
    }, {
        shortName: "NGC",
        longName: "NAGA",
        photoName: "NAGA"
    }, {
        shortName: "NKA",
        longName: "Incakoin",
        photoName: "Incakoin"
    }, {
        shortName: "NLC2",
        longName: "NoLimitCoin",
        photoName: "NoLimitCoin"
    }, {
        shortName: "NLG",
        longName: "Gulden",
        photoName: "Gulden"
    }, {
        shortName: "NMC",
        longName: "Namecoin",
        photoName: "Namecoin"
    }, {
        shortName: "NMR",
        longName: "Numeraire",
        photoName: "Numeraire"
    }, {
        shortName: "NOBL",
        longName: "NobleCoin",
        photoName: "NobleCoin"
    }, {
        shortName: "NOTE",
        longName: "DNotes",
        photoName: "DNotes"
    }, {
        shortName: "NRN",
        longName: "Neuron",
        photoName: "Neuron"
    }, {
        shortName: "NRO",
        longName: "Neuro",
        photoName: "Neuro"
    }, {
        shortName: "NTC",
        longName: "Natcoin",
        photoName: "Natcoin"
    }, {
        shortName: "NTO",
        longName: "Fujinto",
        photoName: "Fujinto"
    }, {
        shortName: "NTRN",
        longName: "Neutron",
        photoName: "Neutron"
    }, {
        shortName: "NUA",
        longName: "Neulaut",
        photoName: "Neulaut"
    }, {
        shortName: "NULS",
        longName: "Nuls",
        photoName: "Nuls"
    }, {
        shortName: "NUMUS",
        longName: "NumusCash",
        photoName: "NumusCash"
    }, {
        shortName: "NVC",
        longName: "NovaCoin",
        photoName: "NovaCoin"
    }, {
        shortName: "NXC",
        longName: "Nexium",
        photoName: "Nexium"
    }, {
        shortName: "NXS",
        longName: "Nexus",
        photoName: "Nexus"
    }, {
        shortName: "NXT",
        longName: "NXT",
        photoName: "NXT"
    }, {
        shortName: "NYAN",
        longName: "NyanCoin",
        photoName: "NyanCoin"
    }, {
        shortName: "OAX",
        longName: "OpenAnx",
        photoName: "OpenAnx"
    }, {
        shortName: "OBITS",
        longName: "Obits",
        photoName: "Obits"
    }, {
        shortName: "OC",
        longName: "OneCoin",
        photoName: "OneCoin"
    }, {
        shortName: "OD",
        longName: "Opendollar",
        photoName: "Opendollar"
    }, {
        shortName: "ODN",
        longName: "Obsidian",
        photoName: "Obsidian"
    }, {
        shortName: "OFF",
        longName: "Cthulhu Offerings",
        photoName: "Cthulhu Offerings"
    }, {
        shortName: "OGN",
        longName: "OGNCoin",
        photoName: "OGNCoin"
    }, {
        shortName: "OK",
        longName: "OkCash",
        photoName: "OkCash"
    }, {
        shortName: "OMG",
        longName: "OmiseGO",
        photoName: "OmiseGO"
    }, {
        shortName: "OMNI",
        longName: "Omni",
        photoName: "Omni"
    }, {
        shortName: "ONION",
        longName: "DeepOnion",
        photoName: "DeepOnion"
    }, {
        shortName: "OOO",
        longName: "Om",
        photoName: "Om"
    }, {
        shortName: "OPAL",
        longName: "Opalcoin",
        photoName: "Opalcoin"
    }, {
        shortName: "OPC",
        longName: "OP Coin",
        photoName: "OP Coin"
    }, {
        shortName: "OPT",
        longName: "Opus",
        photoName: "Opus"
    }, {
        shortName: "ORB",
        longName: "OrbitCoin",
        photoName: "OrbitCoin"
    }, {
        shortName: "ORME",
        longName: "OrmeusCoin",
        photoName: "OrmeusCoin"
    }, {
        shortName: "ORO",
        longName: "Orocoin",
        photoName: "Orocoin"
    }, {
        shortName: "OSC",
        longName: "Open Source Coin",
        photoName: "Open Source Coin"
    }, {
        shortName: "OST",
        longName: "Simple Token",
        photoName: "Simple Token"
    }, {
        shortName: "OTN",
        longName: "Open Trading Network",
        photoName: "Open Trading Network"
    }, {
        shortName: "OTX",
        longName: "Octanox",
        photoName: "Octanox"
    }, {
        shortName: "OX",
        longName: "OX Fina",
        photoName: "OX Fina"
    }, {
        shortName: "OXY",
        longName: "Oxycoin",
        photoName: "Oxycoin"
    }, {
        shortName: "PAK",
        longName: "PakCoin",
        photoName: "PakCoin"
    }, {
        shortName: "PARIS",
        longName: "Pariscoin",
        photoName: "Pariscoin"
    }, {
        shortName: "PART",
        longName: "Particl",
        photoName: "Particl"
    }, {
        shortName: "PASC",
        longName: "PascalCoin",
        photoName: "PascalCoin"
    }, {
        shortName: "PASL",
        longName: "PascalLite",
        photoName: "PascalLite"
    }, {
        shortName: "PAY",
        longName: "TenX Pay Token",
        photoName: "TenX Pay Token"
    }, {
        shortName: "PAYU",
        longName: "PayUToken",
        photoName: "PayUToken"
    }, {
        shortName: "PBL",
        longName: "Publica",
        photoName: "Publica"
    }, {
        shortName: "PCC",
        longName: "PolishCoin",
        photoName: "PolishCoin"
    }, {
        shortName: "PCN",
        longName: "Peepcoin",
        photoName: "Peepcoin"
    }, {
        shortName: "PCOIN",
        longName: "PioneerCoin",
        photoName: "PioneerCoin"
    }, {
        shortName: "PCS",
        longName: "Pabyosicoin Special",
        photoName: "Pabyosicoin Special"
    }, {
        shortName: "PDC",
        longName: "Project Decorum",
        photoName: "Project Decorum"
    }, {
        shortName: "PDG",
        longName: "PinkDogCoin",
        photoName: "PinkDogCoin"
    }, {
        shortName: "PEC",
        longName: "PeaceCoin3.6",
        photoName: "PeaceCoin3.6"
    }, {
        shortName: "PEPE",
        longName: "PepeCoin",
        photoName: "PepeCoin"
    }, {
        shortName: "PEPECASH",
        longName: "Pepe Cash",
        photoName: "Pepe Cash"
    }, {
        shortName: "PGL",
        longName: "ProspectorsGold",
        photoName: "ProspectorsGold"
    }, {
        shortName: "PHN",
        longName: "Phillion",
        photoName: "Phillion"
    }, {
        shortName: "PHR",
        longName: "Phore",
        photoName: "Phore"
    }, {
        shortName: "PHS",
        longName: "PhilosopherStone",
        photoName: "PhilosopherStone"
    }, {
        shortName: "PICO",
        longName: "Pico",
        photoName: "Pico"
    }, {
        shortName: "PIGGY",
        longName: "PiggyCoin",
        photoName: "PiggyCoin"
    }, {
        shortName: "PING",
        longName: "CryptoPing",
        photoName: "CryptoPing"
    }, {
        shortName: "PINK",
        longName: "Pinkcoin",
        photoName: "Pinkcoin"
    }, {
        shortName: "PIPL",
        longName: "PiplCoin",
        photoName: "PiplCoin"
    }, {
        shortName: "PIRL",
        longName: "Pirl",
        photoName: "Pirl"
    }, {
        shortName: "PIVX",
        longName: "Pivx",
        photoName: "pivx"
    }, {
        shortName: "PIX",
        longName: "Lampix",
        photoName: "Lampix"
    }, {
        shortName: "PKB",
        longName: "ParkByte",
        photoName: "ParkByte"
    }, {
        shortName: "PKT",
        longName: "PlaykeyToken",
        photoName: "PlaykeyToken"
    }, {
        shortName: "PLACO",
        longName: "PlayerCoin",
        photoName: "PlayerCoin"
    }, {
        shortName: "PLBT",
        longName: "Polybius",
        photoName: "Polybius"
    }, {
        shortName: "PLC",
        longName: "Polcoin",
        photoName: "Polcoin"
    }, {
        shortName: "PLR",
        longName: "Pillar",
        photoName: "Pillar"
    }, {
        shortName: "PLU",
        longName: "Pluton",
        photoName: "Pluton"
    }, {
        shortName: "PLX",
        longName: "PlexCoin",
        photoName: "PlexCoin"
    }, {
        shortName: "POE",
        longName: "Po.et",
        photoName: "Po.et"
    }, {
        shortName: "POL",
        longName: "PolarisCoin",
        photoName: "PolarisCoin"
    }, {
        shortName: "POLL",
        longName: "ClearPoll",
        photoName: "ClearPoll"
    }, {
        shortName: "POLOB",
        longName: "PoloBittShares",
        photoName: "PoloBittShares"
    }, {
        shortName: "POS",
        longName: "Postoken",
        photoName: "Postoken"
    }, {
        shortName: "POST",
        longName: "PostCoin",
        photoName: "PostCoin"
    }, {
        shortName: "POSW",
        longName: "PoSWallet",
        photoName: "PoSWallet"
    }, {
        shortName: "POT",
        longName: "PotCoin",
        photoName: "PotCoin"
    }, {
        shortName: "POWR",
        longName: "PowerLedger",
        photoName: "PowerLedger"
    }, {
        shortName: "PPC",
        longName: "Peercoin",
        photoName: "Peercoin"
    }, {
        shortName: "PPT",
        longName: "Populous",
        photoName: "Populous"
    }, {
        shortName: "PPY",
        longName: "Peerplays",
        photoName: "Peerplays"
    }, {
        shortName: "PR",
        longName: "Prototanium",
        photoName: "Prototanium"
    }, {
        shortName: "PRES",
        longName: "President Trump",
        photoName: "President Trump"
    }, {
        shortName: "PRG",
        longName: "Paragon",
        photoName: "Paragon"
    }, {
        shortName: "PRIMU",
        longName: "Primulon",
        photoName: "Primulon"
    }, {
        shortName: "PRN",
        longName: "Protean",
        photoName: "Protean"
    }, {
        shortName: "PRO",
        longName: "Propy",
        photoName: "Propy"
    }, {
        shortName: "PROC",
        longName: "ProCurrency",
        photoName: "ProCurrency"
    }, {
        shortName: "PRS",
        longName: "Presearch",
        photoName: "Presearch"
    }, {
        shortName: "PRX",
        longName: "Printerium",
        photoName: "Printerium"
    }, {
        shortName: "PT",
        longName: "Porntoken",
        photoName: "Porntoken"
    }, {
        shortName: "PTC",
        longName: "PesetaCoin ",
        photoName: "PesetaCoin "
    }, {
        shortName: "PTOY",
        longName: "Patientory",
        photoName: "Patientory"
    }, {
        shortName: "PTS",
        longName: "PitisCoin",
        photoName: "PitisCoin"
    }, {
        shortName: "PURA",
        longName: "Pura",
        photoName: "Pura"
    }, {
        shortName: "PURE",
        longName: "Pure",
        photoName: "Pure"
    }, {
        shortName: "PUT",
        longName: "PutinCoin",
        photoName: "PutinCoin"
    }, {
        shortName: "PWC",
        longName: "Playwincoin",
        photoName: "Playwincoin"
    }, {
        shortName: "PXC",
        longName: "PhoenixCoin",
        photoName: "PhoenixCoin"
    }, {
        shortName: "PXI",
        longName: "Prime-XI",
        photoName: "Prime-XI"
    }, {
        shortName: "Q2C",
        longName: "Qubitcoin",
        photoName: "Qubitcoin"
    }, {
        shortName: "QAU",
        longName: "Quantum",
        photoName: "Quantum"
    }, {
        shortName: "QBT",
        longName: "Cubits",
        photoName: "Cubits"
    }, {
        shortName: "QCN",
        longName: "QuazarCoin",
        photoName: "QuazarCoin"
    }, {
        shortName: "QRK",
        longName: "Quark",
        photoName: "Quark"
    }, {
        shortName: "QRL",
        longName: "Quantum Resistant Ledger",
        photoName: "Quantum Resistant Ledger"
    }, {
        shortName: "QSH",
        longName: "QASH",
        photoName: "QASH"
    }, {
        shortName: "QSP",
        longName: "Quantstamp",
        photoName: "Quantstamp"
    }, {
        shortName: "QTL",
        longName: "Quatloo",
        photoName: "Quatloo"
    }, {
        shortName: "QTUM",
        longName: "Qtum",
        photoName: "Qtum"
    }, {
        shortName: "QUANT",
        longName: "QuantumCoin",
        photoName: "QuantumCoin"
    }, {
        shortName: "QWARK",
        longName: "Qwark",
        photoName: "Qwark"
    }, {
        shortName: "R",
        longName: "Revain",
        photoName: "Revain"
    }, {
        shortName: "RADS",
        longName: "Radium",
        photoName: "Radium"
    }, {
        shortName: "RAIN",
        longName: "Condensate",
        photoName: "Condensate"
    }, {
        shortName: "RBIES",
        longName: "Rubies",
        photoName: "Rubies"
    }, {
        shortName: "RBL",
        longName: "RoyalBritishLegion",
        photoName: "RoyalBritishLegion"
    }, {
        shortName: "RBT",
        longName: "Rimbit",
        photoName: "Rimbit"
    }, {
        shortName: "RBY",
        longName: "RubyCoin",
        photoName: "RubyCoin"
    }, {
        shortName: "RC",
        longName: "RussiaCoin",
        photoName: "RussiaCoin"
    }, {
        shortName: "RCN",
        longName: "Ripio Credit Network",
        photoName: "Ripio Credit Network"
    }, {
        shortName: "RDC",
        longName: "RoundCoin",
        photoName: "RoundCoin"
    }, {
        shortName: "RDD",
        longName: "ReddCoin",
        photoName: "ReddCoin"
    }, {
        shortName: "RDN",
        longName: "Raiden Network Token",
        photoName: "Raiden Network Token"
    }, {
        shortName: "REC",
        longName: "Regalcoin",
        photoName: "Regalcoin"
    }, {
        shortName: "RED",
        longName: "RedCoin",
        photoName: "RedCoin"
    }, {
        shortName: "REE",
        longName: "ReeCoin",
        photoName: "ReeCoin"
    }, {
        shortName: "REGA",
        longName: "Rega",
        photoName: "Rega"
    }, {
        shortName: "REP",
        longName: "Augur",
        photoName: "Augur"
    }, {
        shortName: "REQ",
        longName: "Request Network",
        photoName: "Request Network"
    }, {
        shortName: "REX",
        longName: "REX",
        photoName: "REX"
    }, {
        shortName: "RHO",
        longName: "Rhodiumcoin",
        photoName: "Rhodiumcoin"
    }, {
        shortName: "RIC",
        longName: "Riecoin",
        photoName: "Riecoin"
    }, {
        shortName: "RICKS",
        longName: "PickleRicks",
        photoName: "PickleRicks"
    }, {
        shortName: "RISE",
        longName: "Rise",
        photoName: "Rise"
    }, {
        shortName: "RIYA",
        longName: "Etheriya",
        photoName: "Etheriya"
    }, {
        shortName: "RKC",
        longName: "RoyalKingdomCoin",
        photoName: "RoyalKingdomCoin"
    }, {
        shortName: "RLC",
        longName: "iEx.ec",
        photoName: "iEx.ec"
    }, {
        shortName: "RLT",
        longName: "RouletteCoin",
        photoName: "RouletteCoin"
    }, {
        shortName: "RMC",
        longName: "Remicoin",
        photoName: "Remicoin"
    }, {
        shortName: "RNS",
        longName: "RenosCoin",
        photoName: "RenosCoin"
    }, {
        shortName: "ROC",
        longName: "RoosterCoin",
        photoName: "RoosterCoin"
    }, {
        shortName: "ROOFS",
        longName: "Roofs",
        photoName: "Roofs"
    }, {
        shortName: "RPC",
        longName: "RonPaulCoin",
        photoName: "RonPaulCoin"
    }, {
        shortName: "RRT",
        longName: "Recovery Right Tokens",
        photoName: "Recovery Right Tokens"
    }, {
        shortName: "RUB",
        longName: "RubbleCoin",
        photoName: "RubbleCoin"
    }, {
        shortName: "RUNE",
        longName: "RuneStoneCoin",
        photoName: "RuneStoneCoin"
    }, {
        shortName: "RUNNERS",
        longName: "Runners",
        photoName: "Runners"
    }, {
        shortName: "RUP",
        longName: "Rupee",
        photoName: "Rupee"
    }, {
        shortName: "RVT",
        longName: "Rivetz",
        photoName: "Rivetz"
    }, {
        shortName: "SAK",
        longName: "SharkCoin",
        photoName: "SharkCoin"
    }, {
        shortName: "SALT",
        longName: "Salt",
        photoName: "Salt"
    }, {
        shortName: "SAN",
        longName: "Santiment",
        photoName: "Santiment"
    }, {
        shortName: "SAND",
        longName: "BeachCoin",
        photoName: "BeachCoin"
    }, {
        shortName: "SBC",
        longName: "SBC Coin",
        photoName: "SBC Coin"
    }, {
        shortName: "SBD",
        longName: "Steem Dollars",
        photoName: "Steem Dollars"
    }, {
        shortName: "SBIT",
        longName: "StackBIT",
        photoName: "StackBIT"
    }, {
        shortName: "SBTC",
        longName: "Super Bitcoin",
        photoName: "Super Bitcoin"
    }, {
        shortName: "SC",
        longName: "Siacoin",
        photoName: "Siacoin"
    }, {
        shortName: "SCL",
        longName: "Social",
        photoName: "Social"
    }, {
        shortName: "SCORE",
        longName: "Scorecoin",
        photoName: "Scorecoin"
    }, {
        shortName: "SDASH",
        longName: "ScryptDashCoin",
        photoName: "ScryptDashCoin"
    }, {
        shortName: "SDRN",
        longName: "Senderon",
        photoName: "Senderon"
    }, {
        shortName: "SEL",
        longName: "Selencoin",
        photoName: "Selencoin"
    }, {
        shortName: "SEND",
        longName: "SocialSend",
        photoName: "SocialSend"
    }, {
        shortName: "SEQ",
        longName: "Sequence",
        photoName: "Sequence"
    }, {
        shortName: "SFC",
        longName: "SolarflareCoin",
        photoName: "SolarflareCoin"
    }, {
        shortName: "SFE",
        longName: "SafeCoin",
        photoName: "SafeCoin"
    }, {
        shortName: "SGR",
        longName: "SugarExchange",
        photoName: "SugarExchange"
    }, {
        shortName: "SHA",
        longName: "SHACoin2",
        photoName: "SHACoin2"
    }, {
        shortName: "SHIFT",
        longName: "Shift",
        photoName: "Shift"
    }, {
        shortName: "SHIT",
        longName: "Shitcoin",
        photoName: "Shitcoin"
    }, {
        shortName: "SHM",
        longName: "Saham",
        photoName: "Saham"
    }, {
        shortName: "SHND",
        longName: "StrongHands",
        photoName: "StrongHands"
    }, {
        shortName: "SHOT",
        longName: "MoonShot",
        photoName: "MoonShot"
    }, {
        shortName: "SHRM",
        longName: "Shrooms",
        photoName: "Shrooms"
    }, {
        shortName: "SIB",
        longName: "Siberian Chervonets",
        photoName: "Siberian Chervonets"
    }, {
        shortName: "SILK2",
        longName: "SilkCoin2",
        photoName: "SilkCoin2"
    }, {
        shortName: "SIMP",
        longName: "Simplecash",
        photoName: "Simplecash"
    }, {
        shortName: "SISA",
        longName: "SISA Token",
        photoName: "SISA Token"
    }, {
        shortName: "SKC",
        longName: "SkeinCoin",
        photoName: "SkeinCoin"
    }, {
        shortName: "SKIN",
        longName: "SkinCoin",
        photoName: "SkinCoin"
    }, {
        shortName: "SKOIN",
        longName: "Skoincoin",
        photoName: "Skoincoin"
    }, {
        shortName: "SKR",
        longName: "SakuraCoin",
        photoName: "SakuraCoin"
    }, {
        shortName: "SKULL",
        longName: "PirateBlocks",
        photoName: "PirateBlocks"
    }, {
        shortName: "SKY",
        longName: "Skycoin",
        photoName: "Skycoin"
    }, {
        shortName: "SLEVIN",
        longName: "Slevin",
        photoName: "Slevin"
    }, {
        shortName: "SLG",
        longName: "Sterlingcoin",
        photoName: "Sterlingcoin"
    }, {
        shortName: "SLR",
        longName: "SolarCoin",
        photoName: "SolarCoin"
    }, {
        shortName: "SLS",
        longName: "SaluS",
        photoName: "SaluS"
    }, {
        shortName: "SMART",
        longName: "SmartCash",
        photoName: "SmartCash"
    }, {
        shortName: "SMC",
        longName: "SmartCoin",
        photoName: "SmartCoin"
    }, {
        shortName: "SMS",
        longName: "SMSCoin",
        photoName: "SMSCoin"
    }, {
        shortName: "SNC",
        longName: "SunContract",
        photoName: "SunContract"
    }, {
        shortName: "SNGLS",
        longName: "SingularDTV",
        photoName: "SingularDTV"
    }, {
        shortName: "SNM",
        longName: "SONM",
        photoName: "SONM"
    }, {
        shortName: "SNOW",
        longName: "SnowCoin",
        photoName: "SnowCoin"
    }, {
        shortName: "SNRG",
        longName: "Synergy",
        photoName: "Synergy"
    }, {
        shortName: "SNT",
        longName: "Status Network Token",
        photoName: "Status Network Token"
    }, {
        shortName: "SOAR",
        longName: "SoarCoin",
        photoName: "SoarCoin"
    }, {
        shortName: "SOIL",
        longName: "SoilCoin",
        photoName: "SoilCoin"
    }, {
        shortName: "SOLAR",
        longName: "Solar",
        photoName: "Solar"
    }, {
        shortName: "SONG",
        longName: "Songcoin",
        photoName: "Songcoin"
    }, {
        shortName: "SOON",
        longName: "SoonCoin",
        photoName: "SoonCoin"
    }, {
        shortName: "SPACE",
        longName: "SpaceCoin",
        photoName: "SpaceCoin"
    }, {
        shortName: "SPF",
        longName: "SportyFi",
        photoName: "SportyFi"
    }, {
        shortName: "SPHR",
        longName: "Sphere",
        photoName: "Sphere"
    }, {
        shortName: "SPR",
        longName: "SpreadCoin",
        photoName: "SpreadCoin"
    }, {
        shortName: "SPRTS",
        longName: "Sprouts",
        photoName: "Sprouts"
    }, {
        shortName: "SPT",
        longName: "Spots",
        photoName: "Spots"
    }, {
        shortName: "SQL",
        longName: "SquallCoin",
        photoName: "SquallCoin"
    }, {
        shortName: "SRC",
        longName: "SecureCoin",
        photoName: "SecureCoin"
    }, {
        shortName: "SST",
        longName: "SSTCoin",
        photoName: "SSTCoin"
    }, {
        shortName: "STARS",
        longName: "StarCash",
        photoName: "StarCash"
    }, {
        shortName: "START",
        longName: "StartCoin",
        photoName: "StartCoin"
    }, {
        shortName: "STC",
        longName: "StopTrumpCoin",
        photoName: "StopTrumpCoin"
    }, {
        shortName: "STEEM",
        longName: "STEEM",
        photoName: "STEEM"
    }, {
        shortName: "STO",
        longName: "SaveTheOceanCoin",
        photoName: "SaveTheOceanCoin"
    }, {
        shortName: "STORJ",
        longName: "Storj",
        photoName: "STORJ"
    }, {
        shortName: "STORM",
        longName: "STORM",
        photoName: "STORM"
    }, {
        shortName: "STR",
        longName: "Stellar",
        photoName: "Stellar"
    }, {
        shortName: "STRAT",
        longName: "Stratis",
        photoName: "Stratis"
    }, {
        shortName: "STRC",
        longName: "StarCredits",
        photoName: "StarCredits"
    }, {
        shortName: "STU",
        longName: "Student Coin",
        photoName: "Student Coin"
    }, {
        shortName: "STV",
        longName: "Sativacoin",
        photoName: "Sativacoin"
    }, {
        shortName: "STX",
        longName: "Stox",
        photoName: "Stox"
    }, {
        shortName: "SUB",
        longName: "Substratum",
        photoName: "Substratum"
    }, {
        shortName: "SUMO",
        longName: "Sumokoin",
        photoName: "Sumokoin"
    }, {
        shortName: "SUPER",
        longName: "SuperCoin",
        photoName: "SuperCoin"
    }, {
        shortName: "SUPERMAN",
        longName: "Superman",
        photoName: "Superman"
    }, {
        shortName: "SUR",
        longName: "Suretly",
        photoName: "Suretly"
    }, {
        shortName: "SURGE",
        longName: "SurgeCoin",
        photoName: "SurgeCoin"
    }, {
        shortName: "SWFTC",
        longName: "SwftCoin",
        photoName: "SwftCoin"
    }, {
        shortName: "SWIFT",
        longName: "Bitswift",
        photoName: "Bitswift"
    }, {
        shortName: "SWING",
        longName: "Swingcoin",
        photoName: "Swingcoin"
    }, {
        shortName: "SWT",
        longName: "Swarm City Token",
        photoName: "Swarm City Token"
    }, {
        shortName: "SXC",
        longName: "Sexcoin",
        photoName: "Sexcoin"
    }, {
        shortName: "SYNQ",
        longName: "BitSynq",
        photoName: "BitSynq"
    }, {
        shortName: "SYNX",
        longName: "Syndicate",
        photoName: "Syndicate"
    }, {
        shortName: "SYS",
        longName: "Syscoin",
        photoName: "Syscoin"
    }, {
        shortName: "TAAS",
        longName: "Token-as-a-Service",
        photoName: "Token-as-a-Service"
    }, {
        shortName: "TAJ",
        longName: "Tajcoin",
        photoName: "Tajcoin"
    }, {
        shortName: "TBS",
        longName: "The Basis",
        photoName: "The Basis"
    }, {
        shortName: "TCOIN",
        longName: "T-Coin",
        photoName: "T-Coin"
    }, {
        shortName: "TEK",
        longName: "TEKcoin",
        photoName: "TEKcoin"
    }, {
        shortName: "TELL",
        longName: "Tellurion",
        photoName: "Tellurion"
    }, {
        shortName: "TER",
        longName: "TerraNova",
        photoName: "TerraNova"
    }, {
        shortName: "TES",
        longName: "TeslaCoin",
        photoName: "TeslaCoin"
    }, {
        shortName: "TGC",
        longName: "TigerCoin",
        photoName: "TigerCoin"
    }, {
        shortName: "TGT",
        longName: "Target Coin",
        photoName: "Target Coin"
    }, {
        shortName: "THC",
        longName: "HempCoin",
        photoName: "HempCoin"
    }, {
        shortName: "THS",
        longName: "TechShares",
        photoName: "TechShares"
    }, {
        shortName: "TIME",
        longName: "Chronobank",
        photoName: "Chronobank"
    }, {
        shortName: "TIPS",
        longName: "Fedoracoin",
        photoName: "Fedoracoin"
    }, {
        shortName: "TIT",
        longName: "TitCoin",
        photoName: "TitCoin"
    }, {
        shortName: "TIX",
        longName: "Blocktix",
        photoName: "Blocktix"
    }, {
        shortName: "TKN",
        longName: "TokenCard",
        photoName: "TokenCard"
    }, {
        shortName: "TKS",
        longName: "Tokes",
        photoName: "Tokes"
    }, {
        shortName: "TLE",
        longName: "TattoocoinLimitedEdition",
        photoName: "TattoocoinLimitedEdition"
    }, {
        shortName: "TNB",
        longName: "Time New Bank",
        photoName: "Time New Bank"
    }, {
        shortName: "TNT",
        longName: "Tierion",
        photoName: "Tierion"
    }, {
        shortName: "TOA",
        longName: "TOACoin",
        photoName: "TOACoin"
    }, {
        shortName: "TOK",
        longName: "TokugawaCoin",
        photoName: "TokugawaCoin"
    }, {
        shortName: "TOP",
        longName: "TopCoin",
        photoName: "TopCoin"
    }, {
        shortName: "TOPAZ",
        longName: "TopazCoin",
        photoName: "TopazCoin"
    }, {
        shortName: "TOR",
        longName: "TorCoin",
        photoName: "TorCoin"
    }, {
        shortName: "TPC",
        longName: "TrumPenceCoin",
        photoName: "TrumPenceCoin"
    }, {
        shortName: "TPG",
        longName: "Trollpayment",
        photoName: "Trollpayment"
    }, {
        shortName: "TPI",
        longName: "TPICoin",
        photoName: "TPICoin"
    }, {
        shortName: "TRANCE",
        longName: "Trancecoin",
        photoName: "Trancecoin"
    }, {
        shortName: "TRC",
        longName: "TerraCoin",
        photoName: "TerraCoin"
    }, {
        shortName: "TRI",
        longName: "Triangles",
        photoName: "Triangles"
    }, {
        shortName: "TRIG",
        longName: "TRIG Token",
        photoName: "TRIG Token"
    }, {
        shortName: "TRK",
        longName: "TruckCoin",
        photoName: "TruckCoin"
    }, {
        shortName: "TROLL",
        longName: "Trollcoin 2.0",
        photoName: "Trollcoin 2.0"
    }, {
        shortName: "TRST",
        longName: "Trustcoin",
        photoName: "Trustcoin"
    }, {
        shortName: "TRUMP",
        longName: "Trumpcoin",
        photoName: "Trumpcoin"
    }, {
        shortName: "TRUST",
        longName: "TrustPlus",
        photoName: "TrustPlus"
    }, {
        shortName: "TRUX",
        longName: "TreauxCoin",
        photoName: "TreauxCoin"
    }, {
        shortName: "TRX",
        longName: "TRON",
        photoName: "TRON"
    }, {
        shortName: "TSE",
        longName: "TattooCoin",
        photoName: "TattooCoin"
    }, {
        shortName: "TSL",
        longName: "Energo Labs",
        photoName: "Energo Labs"
    }, {
        shortName: "TSTR",
        longName: "TristarCoin",
        photoName: "TristarCoin"
    }, {
        shortName: "TTC",
        longName: "TittieCoin",
        photoName: "TittieCoin"
    }, {
        shortName: "TURBO",
        longName: "TurboCoin",
        photoName: "TurboCoin"
    }, {
        shortName: "TV",
        longName: "Ti-Value",
        photoName: "Ti-Value"
    }, {
        shortName: "TX",
        longName: "TransferCoin",
        photoName: "TransferCoin"
    }, {
        shortName: "TZC",
        longName: "Trezarcoin",
        photoName: "Trezarcoin"
    }, {
        shortName: "UBQ",
        longName: "Ubiq",
        photoName: "Ubiq"
    }, {
        shortName: "UBTC",
        longName: "UnitedBitcoin",
        photoName: "UnitedBitcoin"
    }, {
        shortName: "UFO",
        longName: "UFOCoin",
        photoName: "UFOCoin"
    }, {
        shortName: "UGT",
        longName: "UG Token",
        photoName: "UG Token"
    }, {
        shortName: "UIS",
        longName: "Unitus",
        photoName: "Unitus"
    }, {
        shortName: "UK",
        longName: "UKCoin",
        photoName: "UKCoin"
    }, {
        shortName: "ULA",
        longName: "UlaTech",
        photoName: "UlaTech"
    }, {
        shortName: "UMO",
        longName: "UniversalMolecule",
        photoName: "UniversalMolecule"
    }, {
        shortName: "UNB",
        longName: "UnbreakableCoin",
        photoName: "UnbreakableCoin"
    }, {
        shortName: "UNC",
        longName: "UNCoin",
        photoName: "UNCoin"
    }, {
        shortName: "UNIC",
        longName: "UniCoin",
        photoName: "UniCoin"
    }, {
        shortName: "UNIFY",
        longName: "Unify",
        photoName: "Unify"
    }, {
        shortName: "UNIT",
        longName: "UniversalCurrency",
        photoName: "UniversalCurrency"
    }, {
        shortName: "UNITS",
        longName: "GameUnits",
        photoName: "GameUnits"
    }, {
        shortName: "UNO",
        longName: "Unobtanium",
        photoName: "Unobtanium"
    }, {
        shortName: "UNRC",
        longName: "Universal Royal Coin",
        photoName: "Universal Royal Coin"
    }, {
        shortName: "UNY",
        longName: "UnityIngot",
        photoName: "UnityIngot"
    }, {
        shortName: "UP",
        longName: "UpscaleToken",
        photoName: "UpscaleToken"
    }, {
        shortName: "UQC",
        longName: "UquidCoin",
        photoName: "UquidCoin"
    }, {
        shortName: "UR",
        longName: "UR",
        photoName: "UR"
    }, {
        shortName: "USA",
        longName: "USACoin",
        photoName: "USACoin"
    }, {
        shortName: "USDT",
        longName: "Tether USD",
        photoName: "Tether USD"
    }, {
        shortName: "UTC",
        longName: "Ultracoin",
        photoName: "Ultracoin"
    }, {
        shortName: "V",
        longName: "Version",
        photoName: "Version"
    }, {
        shortName: "VC",
        longName: "VirtualCoin",
        photoName: "VirtualCoin"
    }, {
        shortName: "VCC",
        longName: "VaderCorpCoin",
        photoName: "VaderCorpCoin"
    }, {
        shortName: "VEN",
        longName: "VeChain",
        photoName: "VeChain"
    }, {
        shortName: "VERI",
        longName: "Veritaseum",
        photoName: "Veritaseum"
    }, {
        shortName: "VGS",
        longName: "LasVegasCoin",
        photoName: "LasVegasCoin"
    }, {
        shortName: "VIA",
        longName: "Viacoin",
        photoName: "Viacoin"
    }, {
        shortName: "VIB",
        longName: "Viberate",
        photoName: "Viberate"
    }, {
        shortName: "VIBE",
        longName: "Vibe Coin",
        photoName: "Vibe Coin"
    }, {
        shortName: "VIDZ",
        longName: "PureVidz",
        photoName: "PureVidz"
    }, {
        shortName: "VISIO",
        longName: "Visio",
        photoName: "Visio"
    }, {
        shortName: "VIVO",
        longName: "Vivo",
        photoName: "Vivo"
    }, {
        shortName: "VLTC",
        longName: "Vaultcoin",
        photoName: "VaultCoin"
    }, {
        shortName: "VOISE",
        longName: "VOISE",
        photoName: "VOISE"
    }, {
        shortName: "VOX",
        longName: "Voxels",
        photoName: "Voxels"
    }, {
        shortName: "VRC",
        longName: "VeriCoin",
        photoName: "VeriCoin"
    }, {
        shortName: "VRM",
        longName: "Verium",
        photoName: "Verium"
    }, {
        shortName: "VRS",
        longName: "VEROS",
        photoName: "VEROS"
    }, {
        shortName: "VSL",
        longName: "vSlice",
        photoName: "vSlice"
    }, {
        shortName: "VSX",
        longName: "VsyncX",
        photoName: "VsyncX"
    }, {
        shortName: "VTC",
        longName: "Vertcoin",
        photoName: "Vertcoin"
    }, {
        shortName: "VTR",
        longName: "vTorrent",
        photoName: "vTorrent"
    }, {
        shortName: "VUC",
        longName: "VirtaUniqueCoin",
        photoName: "VirtaUniqueCoin"
    }, {
        shortName: "VULCANO",
        longName: "Vulcanocoin",
        photoName: "Vulcanocoin"
    }, {
        shortName: "WABI",
        longName: "WaBi",
        photoName: "WaBi"
    }, {
        shortName: "WASH",
        longName: "WashingtonCoin",
        photoName: "WashingtonCoin"
    }, {
        shortName: "WAVES",
        longName: "Waves",
        photoName: "Waves"
    }, {
        shortName: "WC",
        longName: "Wincoin",
        photoName: "Wincoin"
    }, {
        shortName: "WCL",
        longName: "Wowclassic",
        photoName: "Wowclassic"
    }, {
        shortName: "WDC",
        longName: "WorldCoin",
        photoName: "WorldCoin"
    }, {
        shortName: "WEED",
        longName: "Weed",
        photoName: "Weed"
    }, {
        shortName: "WIC",
        longName: "WiCoin",
        photoName: "WiCoin"
    }, {
        shortName: "WILD",
        longName: "WildCrypto",
        photoName: "WildCrypto"
    }, {
        shortName: "WINGS",
        longName: "Wings DAO",
        photoName: "Wings DAO"
    }, {
        shortName: "WINK",
        longName: "WinkCoin",
        photoName: "WinkCoin"
    }, {
        shortName: "WLC",
        longName: "WirelessCoin",
        photoName: "WirelessCoin"
    }, {
        shortName: "WMGO",
        longName: "MobileGo",
        photoName: "MobileGo"
    }, {
        shortName: "WOMEN",
        longName: "WomenCoin",
        photoName: "WomenCoin"
    }, {
        shortName: "WORM",
        longName: "HealthyWormCoin",
        photoName: "HealthyWormCoin"
    }, {
        shortName: "WOW",
        longName: "Wowcoin",
        photoName: "Wowcoin"
    }, {
        shortName: "WRC",
        longName: "WarCoin",
        photoName: "WarCoin"
    }, {
        shortName: "WRP",
        longName: "Wrapper",
        photoName: "Wrapper"
    }, {
        shortName: "WSX",
        longName: "WeAreSatoshi",
        photoName: "WeAreSatoshi"
    }, {
        shortName: "WTC",
        longName: "Walton",
        photoName: "Walton"
    }, {
        shortName: "WTT",
        longName: "Giga Watt",
        photoName: "Giga Watt"
    }, {
        shortName: "WW",
        longName: "WayaWolfCoin",
        photoName: "WayaWolfCoin"
    }, {
        shortName: "WYV",
        longName: "Wyvern",
        photoName: "Wyvern"
    }, {
        shortName: "XAUR",
        longName: "Xaurum",
        photoName: "Xaurum"
    }, {
        shortName: "XBC",
        longName: "BitcoinPlus",
        photoName: "BitcoinPlus"
    }, {
        shortName: "XBL",
        longName: "Billionaire Token",
        photoName: "Billionaire Token"
    }, {
        shortName: "XBTS",
        longName: "BeatCoin",
        photoName: "BeatCoin"
    }, {
        shortName: "XBU",
        longName: "Ubercoin",
        photoName: "Ubercoin"
    }, {
        shortName: "XBY",
        longName: "XTRABYTES",
        photoName: "XTRABYTES"
    }, {
        shortName: "XCHE",
        longName: "CheCoin",
        photoName: "CheCoin"
    }, {
        shortName: "XCO",
        longName: "Xcoin",
        photoName: "Xcoin"
    }, {
        shortName: "XCP",
        longName: "Counterparty",
        photoName: "Counterparty"
    }, {
        shortName: "XCPO",
        longName: "COPICO",
        photoName: "COPICO"
    }, {
        shortName: "XCRE",
        longName: "Creatio",
        photoName: "Creatio"
    }, {
        shortName: "XCS",
        longName: "CybCSec",
        photoName: "CybCSec"
    }, {
        shortName: "XCT",
        longName: "C-bit",
        photoName: "C-bit"
    }, {
        shortName: "XCXT",
        longName: "CoinonatX",
        photoName: "CoinonatX"
    }, {
        shortName: "XDE2",
        longName: "Xde2",
        photoName: "Xde2"
    }, {
        shortName: "XDN",
        longName: "DigitalNote",
        photoName: "DigitalNote"
    }, {
        shortName: "XEL",
        longName: "Elastic",
        photoName: "Elastic"
    }, {
        shortName: "XEM",
        longName: "NEM",
        photoName: "NEM"
    }, {
        shortName: "XEV",
        longName: "EvoPoints",
        photoName: "EvoPoints"
    }, {
        shortName: "XFT",
        longName: "FootyCash",
        photoName: "FootyCash"
    }, {
        shortName: "XGOX",
        longName: "XGOX",
        photoName: "XGOX"
    }, {
        shortName: "XGR",
        longName: "GoldReserve",
        photoName: "GoldReserve"
    }, {
        shortName: "XGTC",
        longName: "GirlsTokenCoin",
        photoName: "GirlsTokenCoin"
    }, {
        shortName: "XID",
        longName: "Sphre",
        photoName: "Sphre"
    }, {
        shortName: "XJO",
        longName: "JouleCoin",
        photoName: "JouleCoin"
    }, {
        shortName: "XLC",
        longName: "LeviarCoin",
        photoName: "LeviarCoin"
    }, {
        shortName: "XLM",
        longName: "Lumen",
        photoName: "Lumen"
    }, {
        shortName: "XLR",
        longName: "Solaris",
        photoName: "Solaris"
    }, {
        shortName: "XMCC",
        longName: "MonacoCoin",
        photoName: "MonacoCoin"
    }, {
        shortName: "XMG",
        longName: "Magi",
        photoName: "Magi"
    }, {
        shortName: "XMR",
        longName: "Monero",
        photoName: "Monero"
    }, {
        shortName: "XMS",
        longName: "Moonstone DAC",
        photoName: "Moonstone DAC"
    }, {
        shortName: "XMY",
        longName: "Myriad",
        photoName: "Myriad"
    }, {
        shortName: "XP",
        longName: "XP",
        photoName: "XP"
    }, {
        shortName: "XPASC",
        longName: "PascalClassic",
        photoName: "PascalClassic"
    }, {
        shortName: "XPD",
        longName: "PetroDollar",
        photoName: "PetroDollar"
    }, {
        shortName: "XPM",
        longName: "Primecoin",
        photoName: "Primecoin"
    }, {
        shortName: "XPTX",
        longName: "PlatinumBar",
        photoName: "PlatinumBar"
    }, {
        shortName: "XQN",
        longName: "Quotient",
        photoName: "Quotient"
    }, {
        shortName: "XRA",
        longName: "RateCoin",
        photoName: "RateCoin"
    }, {
        shortName: "XRC",
        longName: "Rawcoin",
        photoName: "Rawcoin"
    }, {
        shortName: "XRE",
        longName: "Revolvercoin",
        photoName: "Revolvercoin"
    }, {
        shortName: "XRL",
        longName: "Rialto",
        photoName: "Rialto"
    }, {
        shortName: "XRP",
        longName: "Ripple",
        photoName: "Ripple"
    }, {
        shortName: "XRY",
        longName: "Royalties",
        photoName: "Royalties"
    }, {
        shortName: "XSA",
        longName: "Sigma",
        photoName: "Sigma"
    }, {
        shortName: "XSPEC",
        longName: "SpectreCoin",
        photoName: "SpectreCoin"
    }, {
        shortName: "XST",
        longName: "StealthCoin",
        photoName: "StealthCoin"
    }, {
        shortName: "XSTC",
        longName: "Safetradecoin",
        photoName: "Safetradecoin"
    }, {
        shortName: "XTD",
        longName: "XTDCoin",
        photoName: "XTDCoin"
    }, {
        shortName: "XTZ",
        longName: "Tezos",
        photoName: "Tezos"
    }, {
        shortName: "XUC",
        longName: "Exchange Union",
        photoName: "Exchange Union"
    }, {
        shortName: "XVC",
        longName: "Vcash",
        photoName: "Vcash"
    }, {
        shortName: "XVG",
        longName: "Verge",
        photoName: "Verge"
    }, {
        shortName: "XVP",
        longName: "Virtacoin Plus",
        photoName: "Virtacoin Plus"
    }, {
        shortName: "XVS",
        longName: "Vsync",
        photoName: "Vsync"
    }, {
        shortName: "XWC",
        longName: "WhiteCoin",
        photoName: "WhiteCoin"
    }, {
        shortName: "XXX",
        longName: "XxXCoin",
        photoName: "XxXCoin"
    }, {
        shortName: "XYOC",
        longName: "YocoinClassic",
        photoName: "YocoinClassic"
    }, {
        shortName: "XYZ",
        longName: "XYZCoin",
        photoName: "XYZCoin"
    }, {
        shortName: "XZC",
        longName: "ZCoin",
        photoName: "ZCoin"
    }, {
        shortName: "XZCD",
        longName: "ZcoinDark",
        photoName: "ZcoinDark"
    }, {
        shortName: "YHC",
        longName: "YokohamaCoin",
        photoName: "YokohamaCoin"
    }, {
        shortName: "YOC",
        longName: "Yocoin",
        photoName: "Yocoin"
    }, {
        shortName: "YOVI",
        longName: "YobitCoin",
        photoName: "YobitCoin"
    }, {
        shortName: "YOYOW",
        longName: "YOYOW",
        photoName: "Yoyow"
    }, {
        shortName: "ZAP",
        longName: "Zap",
        photoName: "Zap"
    }, {
        shortName: "ZBC",
        longName: "Zilbercoin",
        photoName: "Zilbercoin"
    }, {
        shortName: "ZCC",
        longName: "ZcCoin",
        photoName: "ZcCoin"
    }, {
        shortName: "ZCG",
        longName: "ZCashGold",
        photoName: "ZCashGold"
    }, {
        shortName: "ZCL",
        longName: "Zclassic",
        photoName: "Zclassic"
    }, {
        shortName: "ZEC",
        longName: "ZCash",
        photoName: "Zcash"
    }, {
        shortName: "ZEIT",
        longName: "ZeitCoin",
        photoName: "ZeitCoin"
    }, {
        shortName: "ZEN",
        longName: "ZenCash",
        photoName: "ZenCash"
    }, {
        shortName: "ZENI",
        longName: "Zennies",
        photoName: "Zennies"
    }, {
        shortName: "ZER",
        longName: "Zero",
        photoName: "Zero"
    }, {
        shortName: "ZET",
        longName: "ZetaCoin",
        photoName: "ZetaCoin"
    }, {
        shortName: "ZMC",
        longName: "ZMicron",
        photoName: "ZMicron"
    }, {
        shortName: "ZOI",
        longName: "Zoin",
        photoName: "Zoin"
    }, {
        shortName: "ZRC",
        longName: "ZrCoin",
        photoName: "ZrCoin"
    }, {
        shortName: "ZRX",
        longName: "0x",
        photoName: "0x"
    }, {
        shortName: "ZSC",
        longName: "Zeus Shield Coin",
        photoName: "Zeus Shield Coin"
    }, {
        shortName: "ZSE",
        longName: "ZSEcoin",
        photoName: "ZSEcoin"
    }, {
        shortName: "ZURMO",
        longName: "XZurmo",
        photoName: "XZurmo"
    }, {
        shortName: "ZZC",
        longName: "ZoZoCoin",
        photoName: "ZoZoCoin"
    }, {
        shortName: "eETT",
        longName: "Ethereum EncryptoTel",
        photoName: "Ethereum EncryptoTel"
    }, {
        shortName: "wETT",
        longName: "Waves EncryptoTel",
        photoName: "Waves EncryptoTel"
    }, {
        shortName: "PAYT",
        longName: "TenX Pay Token",
        photoName: "TenX Pay Token"
    }, {
        shortName: "SRN",
        longName: "Sirin Token",
        photoName: "Sirin Token"
    }, {
        shortName: "WAX",
        longName: "Worldwide Asset Exchange",
        photoName: "Worldwide Asset Exchange"
    }, {
        shortName: "IPC",
        longName: "IPChain",
        photoName: "IPchain"
    }, {
        shortName: 'BETR',
        longName: 'BetterBetting',
        photoName: 'BetterBetting'
    }, {
        shortName: 'CHSB',
        longName: 'SwissBorg',
        photoName: 'SwissBorg'
    }, {
        shortName: 'EET',
        longName: 'Energy Eco Token',
        photoName: 'Energy Eco Token'
    }, {
        shortName: 'CLOUT',
        longName: 'Clout',
        photoName: 'Clout'
    }, {
        shortName: 'ARCT',
        longName: 'ArbitrageCT',
        photoName: 'ArbitrageCT'
    }, {
        shortName: 'W3C',
        longName: 'W3coin',
        photoName: 'W3coin'
    }, {
        shortName: 'BAR',
        longName: 'Titanium Blockchain',
        photoName: 'Titanium Blockchain'
    }, {
        shortName: 'EKO',
        longName: 'EchoLink',
        photoName: 'EchoLink'
    }, {
        shortName: 'MEK',
        longName: 'Teky',
        photoName: 'Teky'
    }, {
        shortName: 'AVH',
        longName: 'Animation Vision Cash',
        photoName: 'Animation Vision Cash'
    }, {
        shortName: 'IPL',
        longName: 'InsurePal',
        photoName: 'InsurePal'
    }, {
        shortName: 'ECH',
        longName: 'EtherEcash',
        photoName: 'EtherEcash'
    }, {
        shortName: 'B2X',
        longName: 'SegWit2x',
        photoName: 'SegWit2x'
    }, {
        shortName: 'ACT',
        longName: 'Achain',
        photoName: 'Achain'
    }, {
        shortName: 'PRE',
        longName: 'Presearch',
        photoName: 'Presearch'
    }, {
        shortName: 'BEZ',
        longName: 'Bezop',
        photoName: 'Bezop'
    }, {
        shortName: 'UTNP',
        longName: 'Universa',
        photoName: 'Universa'
    }, {
        shortName: 'BQX',
        longName: 'Ethos',
        photoName: 'Ethos'
    }, {
        shortName: 'EVN',
        longName: 'Envion',
        photoName: 'Envion'
    }, {
        shortName: 'SENT',
        longName: 'Sentinel',
        photoName: 'Sentinel'
    }, {
        shortName: 'TBT',
        longName: 'TBOT',
        photoName: 'TBOT'
    }, {
        shortName: 'NEU',
        longName: 'Neumark',
        photoName: 'Neumark'
    }, {
        shortName: 'COV',
        longName: 'Covesting',
        photoName: 'Covesting'
    }, {
        shortName: 'WLK',
        longName: 'Wolk',
        photoName: 'Wolk'
    }, {
        shortName: 'CAS',
        longName: 'Cashaa',
        photoName: 'Cashaa'
    }, {
        shortName: 'CPG',
        longName: 'Castle Peak',
        photoName: 'Castle Peak'
    }, {
        shortName: 'DRPU',
        longName: 'DRP Utility',
        photoName: 'DRP Utility'
    }, {
        shortName: 'TAU',
        longName: 'Lamden',
        photoName: 'Lamden'
    }, {
        shortName: 'DATA',
        longName: 'DATA',
        photoName: 'DATA'
    }, {
        shortName: 'ITS'
        // longName: 'ITS Chain',
        // photoName: 'ITS Chain'
    }, {
        shortName: 'TIO',
        longName: 'Trade Token',
        photoName: 'Trade Token'
    }, {
        shortName: 'C20',
        longName: 'Crypto20',
        photoName: 'Crypto20'
    }, {
        shortName: 'BPTN',
        longName: 'Bit Public Talent Network',
        photoName: 'Bit Public Talent Network'
    }, {
        shortName: 'UTK',
        longName: 'Utrust',
        photoName: 'UTRUST'
    }, {
        shortName: 'CTE',
        longName: 'Career Trust Ecosystem',
        photoName: 'Career Trust Ecosystem'
    }, {
        shortName: 'IDH',
        longName: 'indaHash',
        photoName: 'indaHash'
    }, {
        shortName: 'FLP',
        longName: 'FLIP token',
        photoName: 'FLIP token'
    }, {
        shortName: 'CPY',
        longName: 'COPYTRACK',
        photoName: 'COPYTRACK'
    }, {
        shortName: 'SMT',
        longName: 'SmartMesh',
        photoName: 'SmartMesh'
    }, {
        shortName: 'ULTC',
        longName: 'UltimateCoin',
        photoName: 'UltimateCoin'
    }, {
        shortName: 'PCL',
        longName: 'Peculium',
        photoName: 'Peculium'
    }, {
        shortName: 'UTT',
        longName: 'United Traders Token',
        photoName: 'United Traders Token'
    }, {
        shortName: 'XDNCO',
        longName: 'XDNCO',
        photoName: 'XDNCO'
    }, {
        shortName: 'KTC',
        longName: 'KentCoin',
        photoName: 'KentCoin'
    }, {
        shortName: 'SKT',
        longName: 'SharkTrust',
        photoName: 'undefined'
    }, {
        shortName: 'AIF',
        longName: 'Aifuns',
        photoName: 'Aifuns'
    }, {
        shortName: 'HLB',
        longName: 'Lepaoquan',
        photoName: 'Lepaoquan'
    }, {
        shortName: 'XAS',
        longName: 'Asch',
        photoName: 'Asch'
    }, {
        shortName: 'EAC',
        longName: 'EarthCoin',
        photoName: 'EarthCoin'
    }, {
        shortName: 'READ',
        longName: 'READ',
        photoName: 'READ'
    }, {
        shortName: 'MTC',
        longName: 'MonkeyTreasureCoin',
        photoName: 'MonkeyTreasureCoin'
    }, {
        shortName: 'FOTA',
        longName: 'FORTUNA',
        photoName: 'Fortuna'
    }, {
        shortName: 'IFC',
        longName: 'InfiniteCoin',
        photoName: 'InfiniteCoin'
    }, {
        shortName: 'PGC',
        longName: 'PGC',
        photoName: 'undefined'
    }, {
        shortName: 'FZ',
        longName: 'FreezeCoin',
        photoName: 'undefined'
    }, {
        shortName: 'MUSK',
        longName: 'MUSK Token',
        photoName: 'MUSK Token'
    }, {
        shortName: 'RSS',
        longName: 'Red Sea Shells',
        photoName: 'Red Sea Shells'
    }, {
        shortName: 'HEC',
        longName: 'HeroChain',
        photoName: 'HeroChain'
    }, {
        shortName: 'GOOC',
        longName: 'GooCoin',
        photoName: 'GooCoin'
    }, {
        shortName: 'QEC',
        longName: 'Qiecoin',
        photoName: 'undefined'
    }, {
        shortName: 'YTC',
        longName: 'YiBitcoin',
        photoName: 'YiBitcoin'
    }, {
        shortName: 'LKC',
        longName: 'Lucky Coin',
        photoName: 'Lucky Coin'
    }, {
        shortName: 'TFC',
        longName: 'TransferCoin',
        photoName: 'TransferCoinX'
    }, {
        shortName: 'UIP',
        longName: 'UnlimitedIP',
        photoName: 'UnlimitedIP'
    }, {
        shortName: 'SAFE',
        longName: 'SAFE',
        photoName: 'SAFE'
    }, {
        shortName: 'FBTC',
        longName: 'Fast Bitcoin',
        photoName: 'Fast Bitcoin'
    }, {
        shortName: 'MRYC',
        longName: 'Mermaid Coin',
        photoName: 'Mermaid Coin'
    }, {
        shortName: 'CAF',
        longName: 'Charter',
        photoName: 'Charter'
    }, {
        shortName: 'BCX',
        longName: 'BitcoinX',
        photoName: 'BitcoinX'
    }, {
        shortName: 'QBTC',
        longName: 'Quantum Bitcoin',
        photoName: 'Quantum Bitcoin'
    }, {
        shortName: 'AIT',
        longName: 'AICHAIN',
        photoName: 'AICHAIN'
    }, {
        shortName: "FirstBlood",
        longName: "Firstblood",
        photoName: "Firstblood"
    }, {
        shortName: "CRBIT",
        longName: "CreditBit",
        photoName: "CreditBit"
    }, {
        shortName: "EL",
        longName: "ELCoin",
        photoName: "ElCoin"
    }, {
        shortName: "YYW",
        longName: "Yoyow",
        photoName: "Yoyow"
    }, {
        shortName: 'IOST',
        longName: 'IOStoken',
        photoName: 'IOStoken'
    }, {
        shortName: 'MTN',
        longName: 'Medicalchain',
        photoName: 'Medicalchain'
    }, {
        shortName: 'NANO',
        longName: 'Nano',
        photoName: 'Nano'
    }];

    return {
        coinformatNames: coinformatNames
    };
}();

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 03/05/2018.
 */

var certainAmoutOfCoins = __webpack_require__(94);
var globalVars = __webpack_require__(96);
var controlIf = __webpack_require__(136);
var loadTheNewCoins = __webpack_require__(66);
var generateRefreshHTML = __webpack_require__(97);

module.exports = function () {

    function loadNewCoins() {
        if (!controlIf.weHaveNewCoins()) {
            $('#all-new-coins').html(generateRefreshHTML.generateRefreshHTML());
        } else {
            var coinData = loadTheNewCoins.getTheNewCoins();
            var value = certainAmoutOfCoins.toGenerate(coinData, globalVars.var.counterNewCoins, 'n');
            globalVars.var.counterNewCoins = value.counter;
            $("#all-new-coins").html('\n                   <div class="newInfo">\n                       <h1 class="info-many-coins">Current ' + coinData.length + ' new listing of coins</h1>\n                       <div class="refresh">\n                           <button type="button" class="btn btn-coinchecker"><i class="fas fa-fw fa-sync"></i></button>\n                       </div>\n                   </div>\n                   ' + value.$resultaatString + '\n                   <button class="btn btn-coinchecker load-more-new generateMoreHtml">Load more<i class="fas fa-fw fa-spinner"></i></button>');
        }
    }

    return {
        loadNewCoins: loadNewCoins
    };
}();

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 18/02/2018.
 */

module.exports = function () {

    function weHaveNewCoins() {
        var data = JSON.parse(localStorage.getItem("newCoins"));
        return data != undefined;
    }

    return {
        weHaveNewCoins: weHaveNewCoins
    };
}();

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var AdiosMarket = __webpack_require__(377);
var Binance = __webpack_require__(381);
var Bitfinex = __webpack_require__(384);
var Bitstamp = __webpack_require__(387);
var Bittrex = __webpack_require__(390);
var BitZ = __webpack_require__(393);
var CCex = __webpack_require__(396);
var Coinbene = __webpack_require__(399);
var CoinEgg = __webpack_require__(402);
var CoinExchange = __webpack_require__(405);
var Cryptopia = __webpack_require__(408);
var Exmo = __webpack_require__(411);
var ExTrade = __webpack_require__(414);
var EXX = __webpack_require__(417);
var Gdax = __webpack_require__(420);
var Gemini = __webpack_require__(423);
var HitBtc = __webpack_require__(426);
var Huobi = __webpack_require__(429);
var Kraken = __webpack_require__(432);
var Kucoin = __webpack_require__(435);
var Liqui = __webpack_require__(438);
var Livecoin = __webpack_require__(441);
var Poloniex = __webpack_require__(444);
var TuxExchange = __webpack_require__(447);

module.exports = function () {

    //TODO add here the new exchange
    var adios = AdiosMarket.AdiosMarket;
    var bina = Binance.Binance;
    var Bitf = Bitfinex.Bitfinex;
    var Bits = Bitstamp.Bitstamp;
    var Bitt = Bittrex.Bitrrex;
    var BitZz = BitZ.BitZ;
    var Ccex = CCex.CCex;
    var CoinB = Coinbene.Coinbene;
    var CoinE = CoinEgg.CoinEgg;
    var CExc = CoinExchange.CoinExchange;
    var Cryp = Cryptopia.Cryptopia;
    var Exm = Exmo.Exmo;
    var Ext = ExTrade.Extrade;
    var Exx = EXX.EXX;
    var Gda = Gdax.Gdax;
    var Gem = Gemini.Gemini;
    var Hit = HitBtc.HitBtc;
    var Hub = Huobi.Huobi;
    var Kra = Kraken.Kraken;
    var Kuc = Kucoin.Kucoin;
    var Liq = Liqui.Liqui;
    var Liv = Livecoin.Livecoin;
    var Pol = Poloniex.Poloniex;
    var Tux = TuxExchange.TuxExchange;

    var exchangeForNames = [adios, bina, Bitf, Bits, Bitt, BitZz, Ccex, CoinB, CoinE, CExc, Cryp, Exm, Ext, Exx, Gda, Gem, Hub, Hit, Kra, Kuc, Liq, Liv, Pol, Tux];

    return {
        exchangeForNames: exchangeForNames
    };
}();

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var ADIOSMARKET = [['Aidos Kuneen', 'ADK', 'ADK']];

    return {
        ADIOSMARKET: ADIOSMARKET
    };
}();

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

module.exports = function () {

    var newCoinArray = [];

    return {
        newCoinArray: newCoinArray
    };
}();

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BINANCE = [["Ada", " ", "ADA"], ["AdEx", " ", "ADX"], ["Aion", " ", "AION"], ["Amber", " ", "AMB"], ["Ark", " ", "ARK"], ["Aeron", " ", "ARN"], ["AirSwap", " ", "AST"], ["Basic Attention Token", " ", "BAT"], ["Bitcoin Diamond", " ", "BCD"], ["BlockMason", " ", "BCPT"], ["Binance Coin", " ", "BNB"], ["Bancor", " ", "BNT"], ["Ethos", " ", "BQX"], ["Bread", " ", "BRD"], ["Bitcoin Gold", " ", "BTG"], ["BitShares", " ", "BTS"], ["Coindash", " ", "CDT"], ["CometCoin", " ", "CMT"], ["Cindicator", " ", "CND"], ["Centra", " ", "CTR"], ["Dash", " ", "DASH"], ["Digix DAO", " ", "DGD"], ["Agrello", " ", "DLT"], ["district0x", " ", "DNT"], ["ElaCoin", " ", "ELC"], ["ælf", " ", "ELF"], ["Enigma", " ", "ENG"], ["Enjin Coin", " ", "ENJ"], ["EOS", " ", "EOS"], ["Ethereum Classic", " ", "ETC"], ["Ethereum", " ", "ETH"], ["Everex", " ", "EVX"], ["Ethos", " ", "Ethos"], ["FuelCoin", " ", "FUEL"], ["FunFair", " ", "FUN"], ["Gas", " ", "GAS"], ["Gifto", " ", "GTO"], ["Genesis Vision", " ", "GVT"], ["GXShares", " ", "GXS"], ["Health Care Chain", " ", "HCC"], ["HSHARE", " ", "HSR"], ["Iconomi", " ", "ICN"], ["ICON", " ", "ICX"], ["IOTA", " ", "IOTA"], ["Komodo", " ", "KMD"], ["KyberNetworkCrystal", " ", "KNC"], ["EthLend", " ", "LEND"], ["ChainLink", " ", "LINK"], ["LLToken", " ", "LLT"], ["Loopring", " ", "LRC"], ["Lisk", " ", "LSK"], ["Litecoin", " ", "LTC"], ["Decentraland", " ", "MANA"], ["Monaco", " ", "MCO"], ["Moeda Loyalty Points", " ", "MDA"], ["Modum", " ", "MOD"], ["Monetha", " ", "MTH"], ["METAL", " ", "MTL"], ["Neblio", " ", "NEBL"], ["Neo", " ", "NEO"], ["Nuls", " ", "NULS"], ["OpenAnx", " ", "OAX"], ["OmiseGO", " ", "OMG"], ["Simple Token", " ", "OST"], ["Po.et", " ", "POE"], ["PowerLedger", " ", "POWR"], ["Populous", " ", "PPT"], ["Quantstamp", " ", "QSP"], ["Qtum", " ", "QTUM"], ["Ripio Credit Network", " ", "RCN"], ["Raiden Network Token", " ", "RDN"], ["Request Network", " ", "REQ"], ["Salt", " ", "SALT"], ["SingularDTV", " ", "SNGLS"], ["SONM", " ", "SNM"], ["Status Network Token", " ", "SNT"], ["STORJ", " ", "STORJ"], ["Stratis", " ", "STRAT"], ["Substratum", " ", "SUB"], ["Time New Bank", " ", "TNB"], ["Tierion", " ", "TNT"], ["TRON", " ", "TRX"], ["VeChain", " ", "VEN"], ["Viberate", " ", "VIB"], ["WaBi", " ", "WABI"], ["Waves", " ", "WAVES"], ["Walton", " ", "WTC"], ["Lumen", " ", "XLM"], ["Monero", " ", "XMR"], ["Ripple", " ", "XRP"], ["Verge", " ", "XVG"], ["ZCoin", " ", "XZC"], ["Yoyow", " ", "YOYO"], ["Zcash", " ", "ZEC"], ["0x", " ", "ZRX"], ["Bitcoin Cash", " ", "BCC"], ["Eidoo", " ", "EDO"], ["Wings DAO", " ", "WINGS"], ["NAVCoin", " ", "NAV"], ["Lunyr", " ", "LUN"], ["TRIG Token", " ", "TRIG"], ["AppCoins", " ", "APPC"], ["Vibe Coin", " ", "VIBE"], ["iEx.ec", " ", "RLC"], ["INS Ecosystem", " ", "INS"], ["Pivx", " ", "PIVX"], ["IOStoken", " ", "IOST"], ["Chat", " ", "CHAT"], ["STEEM", " ", "STEEM"], ["NANO", " ", "NANO"], ["Viacoin", " ", "VIA"], ["Bluzelle", " ", "BLZ"], ["Aeternity", " ", "AE"], ["Red Pulse", " ", "RPX"], ["Nucleus Vision", " ", "NCASH"], ["POA Network", " ", "POA"], ["Zilliqa", " ", "ZIL"], ["Ontology", " ", "ONT"], ["STORM", " ", "STORM"], ["NEM", " ", "XEM"], ["Wancoin", " ", "WAN"], ["WePower", " ", "WPR"], ["Qlink", " ", "QLC"], ["Syscoin", " ", "SYS"], ["Groestlcoin", " ", "GRS"]];

    return {
        BINANCE: BINANCE
    };
}();

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BITFINEX = [['Bitcoin', 'BTCUSD', 'BTC'], ["LiteCoin", "ltcbtc", "LTC"], ["Ethereum", "ethbtc", "ETH"], ["Ethereum Classic", "etcbtc", "ETC"], ["Recovery Right Tokens", "rrtbtc", "RRT"], ["Zcash", "zecbtc", "ZEC"], ["Monero", "xmrbtc", "XMR"], ["Dash", "dshbtc", "DSH"], ["Ripple", "xrpbtc", "XRP"], ["IOTA", "iotbtc", "IOTA"], ["EOS", "eosbtc", "EOS"], ["Santiment", "sanbtc", "SAN"], ["OmiseGO", "omgbtc", "OMG"], ["Bitcoin Cash", "bchbtc", "BCH"], ["NEO", "neobtc", "NEO"], ["Metaverse", "etpbtc", "ETP"], ["Qtum", "qtmbtc", "QTM"], ["Aventus", "avtbtc", "AVT"], ["Eidoo", "edobtc", "EDO"], ["Bitcoin Gold", "btgbtc", "BTG"], ["Streamr", "datbtc", "DAT"], ["QASH", "qshbtc", "QSH"], ["YOYOW", "yywbtc", "YYW"], ["Golem", "gntbtc", "GNT"], ["Status", "sntbtc", "SNT"], ["Time New Bank", "batbtc", "BAT"], ["Decentraland", "mnabtc", "MNA"], ["FunFair", "funbtc", "FUN"], ["0x", "zrxbtc", "ZRX"], ["Time New Bank", "tnbbtc", "TNB"], ["SpankChain", "spkbtc", "SPK"], ["Tron", "trxbtc", "TRX"], ["RCN", "rcnbtc", "RCN"], ["iExec", "rlcbtc", "RLC"], ["AidCoin", "aidbtc", "AID"], ["SingularDTV", "sngbtc", "SNG"], ["Augur", "repbtc", "REP"], ["aelf", "elfbtc", "ELF"], ["Aion", "aionbtc", "AION"], ["IOSToken", "iostbtc", "IOST"], ["Request Network", "reqbtc", "REQ"], ["Raiden Network", "rdnbtc", "RDN"], ["Loopring", "lrcbtc", "LRC"], ["BnkToTheFuture", "bftbtc", "BFT"], ["Cofound it", "cfibtc", "CFI"], ["Wax", "waxbtc", "WAX"], ["SingularityNET", "agibtc", "AGI"], ["MedicalChain", "mtnbtc", "MTN"], ["Odem", "odembtc", "ODEM"], ["Dai Stablecoin", "daibtc", "DAI"]];

    return {
        BITFINEX: BITFINEX
    };
}();

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BITSTAMP = [['Bitcoin', 'btcusd', 'BTC'], ['Ethereum', 'ethbtc', 'ETH'], ['Ripple', 'xrpbtc', 'XRP'], ['Litecoin', 'ltcbtc', 'LTC'], ['Bitcoin Cash', 'bchbtc', 'BCH']];

    return {
        BITSTAMP: BITSTAMP
    };
}();

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

module.exports = function () {

    var BITTREX = [["2GIVE", "", "2GIVE"], ["ArtByte", "", "ABY"], ["Ada", "", "ADA"], ["adToken", "", "ADT"], ["AdEx", "", "ADX"], ["Aeon", "", "AEON"], ["SynereoAmp", "", "AMP"], ["Aragon", "", "ANT"], ["Ardor", "", "ARDR"], ["Ark", "", "ARK"], ["AuroraCoin", "", "AUR"], ["Basic Attention Token", "", "BAT"], ["BitBay", "", "BAY"], ["Bitcoin Cash", "", "BCC"], ["BlockMason Credit Protocol", "", "BCPT"], ["BitCrystals", "", "BCY"], ["BitBean", "", "BITB"], ["Blitzcash", "", "BLITZ"], ["BlackCoin", "", "BLK"], ["Blocknet", "", "BLOCK"], ["Bancor", "", "BNT"], ["Breakout", "", "BRK"], ["Breakout Stake", "", "BRX"], ["BitSend", "", "BSD"], ["Bitcoin Gold", "", "BTG"], ["BURST", "", "BURST"], ["Bytecent", "", "BYC"], ["CannabisCoin", "", "CANN"], ["Cofound.it", "", "CFI"], ["CLAMs", "", "CLAM"], ["CloakCoin", "", "CLOAK"], ["Circuits of Value", "", "COVAL"], ["CreditBit", "", "CRB"], ["Crown", "", "CRW"], ["CureCoin", "", "CURE"], ["Civic", "", "CVC"], ["Dash", "", "DASH"], ["Decred", "", "DCR"], ["Digibyte", "", "DGB"], ["Diamond", "", "DMD"], ["DMarket", "", "DMT"], ["district0x", "", "DNT"], ["Dogecoin", "", "DOGE"], ["DopeCoin", "", "DOPE"], ["Databits", "", "DTB"], ["Dynamic", "", "DYN"], ["eBoost", "", "EBST"], ["Edgeless", "", "EDG"], ["ElectronicGulden", "", "EFL"], ["EverGreenCoin", "", "EGC"], ["EmerCoin", "", "EMC"], ["Einsteinium", "", "EMC2"], ["Enigma", "", "ENG"], ["EnergyCoin", "", "ENRG"], ["EuropeCoin", "", "ERC"], ["Ethereum Classic", "", "ETC"], ["Ethereum", "", "ETH"], ["ExclusiveCoin", "", "EXCL"], ["Expanse", "", "EXP"], ["Factom", "", "FCT"], ["FoldingCoin", "", "FLDC"], ["Feathercoin", "", "FTC"], ["Gambit", "", "GAM"], ["GameCredits", "", "GAME"], ["Gbg", "", "GBG"], ["Bytes", "", "GBYTE"], ["GeoCoin", "", "GEO"], ["GoldCoin", "", "GLD"], ["Gnosis", "", "GNO"], ["Golem", "", "GNT"], ["Golos", "", "GOLOS"], ["GridCoin", "", "GRC"], ["Groestlcoin", "", "GRS"], ["Guppy", "", "GUP"], ["Humaniq", "", "HMQ"], ["Ignis", "", "IGNIS"], ["Incent", "", "INCNT"], ["I/OCoin", "", "IOC"], ["Ion", "", "ION"], ["Internet Of People", "", "IOP"], ["Kore", "", "KORE"], ["LBRY Credits", "", "LBC"], ["Legends", "", "LGD"], ["Lomocoin", "", "LMC"], ["Loopring", "", "LRC"], ["Lisk", "", "LSK"], ["Litecoin", "", "LTC"], ["Lunyr", "", "LUN"], ["Decentraland", "", "MANA"], ["Monaco", "", "MCO"], ["Memetic", "", "MEME"], ["Mercury", "", "MER"], ["Melon", "", "MLN"], ["MonaCoin", "", "MONA"], ["MonetaryUnit", "", "MUE"], ["Musicoin", "", "MUSIC"], ["NAVCoin", "", "NAV"], ["Nubits", "", "NBT"], ["Neo", "", "NEO"], ["NeosCoin", "", "NEOS"], ["Gulden", "", "NLG"], ["Numeraire", "", "NMR"], ["Nexium", "", "NXC"], ["Nexus", "", "NXS"], ["NXT", "", "NXT"], ["OkCash", "", "OK"], ["OmiseGO", "", "OMG"], ["OmniCoin", "", "OMNI"], ["Particl", "", "PART"], ["TenX Pay Token", "", "PAY"], ["PinkCoin", "", "PINK"], ["Pivx", "", "PIVX"], ["Polymath", "", "POLY"], ["PotCoin", "", "POT"], ["PowerLedger", "", "POWR"], ["Peercoin", "", "PPC"], ["Propy", "", "PRO"], ["PesetaCoin ", "", "PTC"], ["Patientory", "", "PTOY"], ["Quantum Resistant Ledger", "", "QRL"], ["Qtum", "", "QTUM"], ["Qwark", "", "QWARK"], ["Radium", "", "RADS"], ["RubyCoin", "", "RBY"], ["Ripio Credit Network", "", "RCN"], ["ReddCoin", "", "RDD"], ["Augur", "", "REP"], ["iEx.ec", "", "RLC"], ["RevolutionVR", "", "RVR"], ["Salt", "", "SALT"], ["SteemDollars", "", "SBD"], ["Siacoin", "", "SC"], ["Sequence", "", "SEQ"], ["Shift", "", "SHIFT"], ["Siberian Chervonets", "", "SIB"], ["SolarCoin", "", "SLR"], ["SaluS", "", "SLS"], ["Synergy", "", "SNRG"], ["Status Network Token", "", "SNT"], ["Sphere", "", "SPHR"], ["SpreadCoin", "", "SPR"], ["Sirin Token", "", "SRN"], ["STEEM", "", "STEEM"], ["STORJ", "", "STORJ"], ["Stratis", "", "STRAT"], ["Bitswift", "", "SWIFT"], ["Swarm City Token", "", "SWT"], ["SysCoin", "", "SYS"], ["HempCoin", "", "THC"], ["Blocktix", "", "TIX"], ["Tokes", "", "TKS"], ["Trustcoin", "", "TRST"], ["TrustPlus", "", "TRUST"], ["Tron", "", "TRX"], ["TrueUSD", "", "TUSD"], ["TransferCoin", "", "TX"], ["Ubiq", "", "UBQ"], ["UnikoinGold", "", "UKG"], ["UpToken", "", "UP"], ["BLOCKv", "", "VEE"], ["ViaCoin", "", "VIA"], ["Viberate", "", "VIB"], ["VeriCoin", "", "VRC"], ["Verium", "", "VRM"], ["Vertcoin", "", "VTC"], ["vTorrent", "", "VTR"], ["Waves", "", "WAVES"], ["Worldwide Asset Exchange", "", "WAX"], ["Wings DAO", "", "WINGS"], ["Counterparty", "", "XCP"], ["DigitalNote", "", "XDN"], ["Elastic", "", "XEL"], ["NewEconomyMovement", "", "XEM"], ["Lumen", "", "XLM"], ["Magi", "", "XMG"], ["Monero", "", "XMR"], ["Myriad", "", "XMY"], ["Ripple", "", "XRP"], ["StealthCoin", "", "XST"], ["Verge", "", "XVG"], ["WhiteCoin", "", "XWC"], ["ZCoin", "", "XZC"], ["Zclassic", "", "ZCL"], ["ZCash", "", "ZEC"], ["ZenCash", "", "ZEN"], ["0x Protocol", "", "ZRX"]];

    return {
        BITTREX: BITTREX
    };
}();

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BITZ = [["Litecoin", " ", "LTC"], ["Ethereum", " ", "ETH"], ["ZCash", " ", "ZEC"], ["Factom", " ", "FCT"], ["Lisk", " ", "LSK"], ["BitCore", " ", "BTX"], ["Bitcoin Cash", " ", "BCH"], ["Qtum", " ", "QTUM"], ["Dash", " ", "DASH"], ["GameCredits", " ", "GAME"], ["Ark", " ", "ARK"], ["Sharechain", " ", "SSS"], ["LeoCoin", " ", "LEO"], ["Viuly", " ", "VIU"], ["DigiByte", " ", "DGB"], ["Particl", " ", "PART"], ["Bitcoin Gold", " ", "BTG"], ["Bitcoin Diamond", " ", "BCD"], ["TRON", " ", "TRX"], ["Aeron", " ", "ARN"], ["HollyWoodCoin", " ", "HWC"], ["Oxycoin", " ", "OXY"], ["Monaco", " ", "MCO"], ["UniversalCurrency", " ", "UNIT"], ["Pylon Network", " ", "PYLNT"], ["Nano", " ", "XRB"], ["Metaverse", " ", "ETP"], ["Rebellious", " ", "REBL"], ["AI Doctor", " ", "AIDOC"], ["Data Delivery Network", " ", "DDN"], ["PutinCoin", " ", "PUT"], ["ATMChain", " ", "ATM"], ["ZenGold", " ", "ZGC"], ["SophiaTX", " ", "SPHTX"], ["Nework", " ", "NKC"], ["OceanChain", " ", "OC"], ["Odyssey", " ", "OCN"], ["Bounty0x", " ", "BNTY"], ["Ink", " ", "INK"], ["EDUCare", " ", "EKT"], ["Primecoin", " ", "XPM"], ["Dogecoin", " ", "DOGE"], ["Ethereum Classic", " ", "ETC"], ["MazaCoin", " ", "MZC"], ["GXShares", " ", "GXS"], ["HSHARE", " ", "HSR"], ["BlackCoin", " ", "BLK"], ["Nuls", " ", "NULS"], ["VOISE", " ", "VOISE"], ["TenX Pay Token", " ", "PAY"], ["EOS", " ", "EOS"], ["OmiseGO", " ", "OMG"], ["YBCoin Token", " ", "YBCT"], ["Open Trading Network", " ", "OTN"], ["Peercoin", " ", "PPC"], ["Asch", " ", "XAS"]];

    return {
        BITZ: BITZ
    };
}();

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

module.exports = function () {

    var CCEX = [["SixEleven", " ", "_11"], ["9Coin", " ", "_COIN"], ["Alphabit", " ", "ABC"], ["AMLBitcoin", " ", "ABTC"], ["AnarchistsPrime", " ", "ACP"], ["Asiadigicoin", " ", "ADCN"], ["Adelphoi", " ", "ADL"], ["AdvancedInternetBlock", " ", "AIB"], ["PolyAI", " ", "PAI"], ["AllInOne", " ", "AIO"], ["Altcoin", " ", "ALT"], ["AlpaCoin", " ", "APC"], ["ArcticCoin", " ", "ARC"], ["Aureus", " ", "AURS"], ["LuckChain", " ", "BASH"], ["BitBay", " ", "BAY"], ["Biblepay", " ", "BBP"], ["BitcoinDiamond", " ", "BCD"], ["BitBee", " ", "BEE"], ["First Bitcoin Capital", " ", "BITCF"], ["BizCoin", " ", "BIZ"], ["Cryptobullcoin", " ", "BLC"], ["Bonpay", " ", "BON"], ["BoostCoin", " ", "BOST"], ["Bitqy", " ", "BQ"], ["Bsdbwealth", " ", "BSDB"], ["BritCoin", " ", "BRIT"], ["BitcoinHashcore", " ", "BTCHC"], ["BitcoinScrypt", " ", "BTCS"], ["BitcoinZ", " ", "BTCZ"], ["BitLuckCoin", " ", "BTLC"], ["Bitquark", " ", "BTQ"], ["Burst", " ", "BURST"], ["CaliphCoin", " ", "CALC"], ["CryptoCashCoin", " ", "CCH"], ["CryptoCarbon", " ", "CCRB"], ["CryptoEscudo", " ", "CESC"], ["CryptoJacksCoin", " ", "CJ"], ["Centurion", " ", "CNT"], ["CoreCoin", " ", "CRC"], ["Credits", " ", "CRE"], ["CereiPayCoin", " ", "CRPC"], ["CROWN", " ", "CRW"], ["Coimatic 3.0", " ", "CTIC3"], ["Crypto", " ", "CTO"], ["DA$", " ", "DAS"], ["Dash", " ", "DASH"], ["DazzleCoin", " ", "DAZZ"], ["Deep", " ", "DEEP"], ["DeusCoin", " ", "DEUS"], ["Dekadocoin", " ", "DKD"], ["DogeCoin", " ", "DOGE"], ["Droidz", " ", "DRZ"], ["GA Coin", " ", "GAC"], ["EACoin", " ", "EAG"], ["EBlackHole", " ", "EBH"], ["eBoost", " ", "EBST"], ["Eclipse", " ", "EC"], ["ElCoin", " ", "EL"], ["Elisor Coin", " ", "ELI"], ["eSports", " ", "ERT"], ["EchoSoraCoin", " ", "ESRC"], ["Ethereum Classic", " ", "ETC"], ["Ethereum", " ", "ETH"], ["Ethereum Gold", " ", "ETHG"], ["EncryptoTel", " ", "ETT"], ["Etherex", " ", "ETX"], ["Everus", " ", "EVR"], ["FastCash", " ", "FCH"], ["Fork Coin", " ", "FORK"], ["FutCoin", " ", "FUTC"], ["President Johnson", " ", "GARY"], ["Global Crypto", " ", "GCC24"], ["GD Premium", " ", "GD2"], ["GelukCoin", " ", "GELUK"], ["GlobalTradeCoin", " ", "GLTC"], ["Goldmaxcoin", " ", "GMX"], ["Gridcoin", " ", "GRC"], ["Groestlcoin", " ", "GRS"], ["Growers International", " ", "GRWI"], ["GoldUnionCoin", " ", "GUC"], ["Hoppin", " ", "HOP"], ["Hshare", " ", "HSR"], ["ICOCoin", " ", "ICOBI"], ["ILCoin", " ", "ILC"], ["InternetOfPeople", " ", "IOP"], ["IoTcoin", " ", "IOT"], ["KiloCoin", " ", "KLC"], ["Keplershares", " ", "KPL"], ["WoodCoin", " ", "LOG"], ["Loyalty", " ", "LOYAL"], ["Litecoin", " ", "LTC"], ["LEOcoin", " ", "LEO"], ["Luxmi", " ", "LUX"], ["MobileCash", " ", "MBL"], ["mcAP", " ", "MCAP"], ["Macro", " ", "MCR"], ["MIX", " ", "MIX"], ["MKTCoin", " ", "MLM"], ["Moin", " ", "MOIN"], ["Vehiclechain", " ", "MVDSC"], ["NeverdieCoin", " ", "NDC"], ["Newbium", " ", "NEWB"], ["NoLimitCoin 2.0", " ", "NLC2"], ["NovaCoin", " ", "NVC"], ["NXT", " ", "NXT"], ["OpenDollar", " ", "OD"], ["Obsidian", " ", "ODN"], ["OnlineGameToken", " ", "OGT"], ["Omni", " ", "OMNI"], ["OpinionCoin", " ", "OPNC"], ["OrmeusCoin", " ", "ORME"], ["OttoCoin", " ", "OTC"], ["OTCCoin", " ", "OTX"], ["OX Fina", " ", "OX"], ["PabyosiCoin Special", " ", "PCS"], ["PlusGoldUnionCoin", " ", "PGUC"], ["PhoenixCoin", " ", "PHX"], ["PiZZAcoin", " ", "PIZZA"], ["PRCoin", " ", "PRC"], ["President Trump", " ", "PRES"], ["Propy token", " ", "PROPY"], ["PitisCoin", " ", "PTS"], ["Pura", " ", "PURA"], ["R token", " ", "R"], ["Rubies", " ", "RBIES"], ["RG Coin", " ", "RGC"], ["RoyalKingdomCoin", " ", "RKC"], ["Revenu", " ", "REV"], ["RHFCoin", " ", "RHFC"], ["SBCcoin", " ", "SBC"], ["SFI Coin", " ", "SFI"], ["SIGMA coin", " ", "SGC"], ["SibCoin", " ", "SIB"], ["Sikka", " ", "SIKKA"], ["SmileyCoin", " ", "SMLY"], ["Shopzcoin", " ", "SZC"], ["Etheriya", " ", "RIYA"], ["TengRi", " ", "TERI"], ["TeslaCoilCoin", " ", "TESLA"], ["TOA Coin", " ", "TOA"], ["TerraCoin", " ", "TRC"], ["TrumpCoin", " ", "TRUMP"], ["Unobtanium", " ", "UNO"], ["Tether", " ", "USDT"], ["VitalCoin", " ", "VIT"], ["VEROS", " ", "VRS"], ["VirtaUniqueCoin", " ", "VUC"], ["WA Space", " ", "WA"], ["WinCoin", " ", "WC"], ["Withcoin", " ", "WTHC"], ["WorldPay", " ", "WOP"], ["Xaurum", " ", "XAUR"], ["Bitcoin U.F.", " ", "XB"], ["BlackPearl", " ", "XBP"], ["BitcoinEvo", " ", "XBTE"], ["XtraBYtes", " ", "XBY"], ["CoinonatX", " ", "XCXT"], ["GoldenBird", " ", "XGB"], ["HiCoin", " ", "XHI"], ["International Diamond", " ", "XID"], ["XNCCoin", " ", "XNC"], ["InternetOfMoney", " ", "XOM"], ["InternetOfThings", " ", "XOT"], ["Tao", " ", "XTO"], ["Isotope", " ", "XTP"], ["Verge refund token", " ", "XVGCT"], ["Bonanza", " ", "XZA"], ["BitZeny", " ", "ZNY"], ["Zeusshield Coin", " ", "ZSC"], ["ZoZoCoin", " ", "ZZC"]];

    return {
        CCEX: CCEX
    };
}();

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var COINBENE = [["Leek Coin", " ", "LEEK"], ["TokenClub", " ", "TCT"], ["HEROcoin", " ", "PLAY"], ["Litecoin", " ", "LTC"], ["Ethereum", " ", "ETH"], ["AI Doctor", " ", "AIDOC"]];

    return {
        COINBENE: COINBENE
    };
}();

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var COINEGG = [["ZcCoin", " ", "ZCC"], ["Bitcoin Pay", " ", "BTP"], ["Super Bitcoin", " ", "SBTC"], ["TransferCoin", " ", "TFC"], ["MonkeyTreasureCoin", " ", "MTC"], ["BlackCoin", " ", "BLK"], ["VeriCoin", " ", "VRC"], ["KentCoin", " ", "KTC"], ["Primecoin", " ", "XPM"], ["FirstCryptoETF", " ", "ETF"], ["WiCoin", " ", "WIC"], ["GameCredits", " ", "GAME"], ["Mermaid Coin", " ", "MRYC"], ["Lepaoquan", " ", "HLB"], ["YiBitcoin", " ", "YTC"], ["Metacoin", " ", "MET"], ["Qiecoin", " ", "QEC"], ["Moving Cloud Coin", " ", "MCC"], ["Lucky Coin", " ", "LKC"], ["RioCoin", " ", "RIO"], ["JuBaoCoin", " ", "JBC"], ["SharkTrust", " ", "SKT"], ["PGC", " ", "PGC"], ["Red Sea Shells", " ", "RSS"], ["ZetaCoin", " ", "ZET"], ["FreezeCoin", " ", "FZ"], ["Peercoin", " ", "PPC"], ["EarthCoin", " ", "EAC"], ["Polcoin", " ", "PLC"], ["Vertcoin", " ", "VTC"], ["InfiniteCoin", " ", "IFC"], ["NXT", " ", "NXT"], ["GooCoin", " ", "GOOC"], ["TRON", " ", "TRX"], ["INT Token", " ", "INT"], ["Lumen", " ", "XLM"], ["Lisk", " ", "LSK"], ["Dogecoin", " ", "DOGE"], ["Ethereum Classic", " ", "ETC"], ["TigerCoin", " ", "TGC"], ["HeroChain", " ", "HEC"], ["Ink", " ", "INK"], ["Energo Labs", " ", "TSL"], ["IPchain ", " ", "IPC"], ["Bitcoin Diamond", " ", "BCD"], ["BitcoinX", " ", "BCX"], ["Bitcoin World", " ", "BTW"], ["Cubits", " ", "QBT"], ["Bmbchain", " ", "BMB"], ["IPTChain", " ", "IPT"], ["READ", " ", "READ"], ["Ti-Value", " ", "TV"], ["Maverick System", " ", "MVC"], ["CFUN", " ", "CFUN"], ["ABitcoin", " ", "ABTC"], ["Charter", " ", "CAF"], ["Fast Bitcoin", " ", "FBTC"], ["Quantum Bitcoin", " ", "QBTC"], ["AICHAIN", " ", "AIT"], ["MUSK Token", " ", "MUSK"], ["Smart Sharing Protocol", " ", "SSP"], ["AI Doctor", " ", "AIDOC"], ["UnlimitedIP", " ", "UIP"], ["Cnet", " ", "CNET"], ["OneCoin", " ", "OC"], ["Hotchain", " ", "HOTC"], ["LiteBitcoin", " ", "LBTC"], ["UnitedBitcoin", " ", "UBTC"], ["Asch", " ", "XAS"], ["EOS", " ", "EOS"], ["Bytom", " ", "BTM"], ["Bitcoin Cash", " ", "BCH"], ["Litecoin", " ", "LTC"], ["SAFE", " ", "SAFE"], ["COINMEET", " ", "MEE"], ["Ripple", " ", "XRP"], ["Achain", " ", "ACT"], ["Halal Chain System", " ", "HLC"], ["BitShares", " ", "BTS"], ["FORTUNA", " ", "FOTA"], ["Ruff", " ", "RUFF"], ["Neo", " ", "NEO"], ["Qtum", " ", "QTUM"], ["Ethereum", " ", "ETH"], ["Aifuns", " ", "AIF"]];

    return {
        COINEGG: COINEGG
    };
}();

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

module.exports = function () {

    var COINEXCHANGE = [["Litecoin", " ", "LTC"], ["Unobtanium", " ", "UNO"], ["Dogecoin", " ", "DOGE"], ["Kobocoin", " ", "KOBO"], ["Digitalcoin", " ", "DGC"], ["Megacoin", " ", "MEC"], ["Bigup", " ", "BIGUP"], ["Memetic", " ", "MEME"], ["CzechoSlovak KORUNA", " ", "KORUNA"], ["XxXCoin", " ", "XXX"], ["DubaiCoin", " ", "DBIC"], ["Ubercoin", " ", "XBU"], ["Postcoin", " ", "POST"], ["IXCoin", " ", "IXC"], ["MarteXcoin", " ", "MXT"], ["Mojocoin", " ", "MOJO"], ["Moincoin", " ", "MOIN"], ["Argentum", " ", "ARG"], ["EvoPoints", " ", "XEV"], ["GoldMaxCoin", " ", "GMX"], ["MachineCoin", " ", "MAC"], ["eMark", " ", "DEM"], ["Sprouts", " ", "SPRTS"], ["PURA", " ", "PURA"], ["SuperCoin", " ", "SUPER"], ["Elite", " ", "1337"], ["RubbleCoin", " ", "RUB"], ["SafeCoin", " ", "SFE"], ["PiggyCoin", " ", "PIGGY"], ["GoldBlocks", " ", "GB"], ["KubosCoin", " ", "KUBO"], ["ChiliCoin", " ", "CHILI"], ["SolarCoin", " ", "SLR"], ["SilkCoin2", " ", "SILK2"], ["KiloCoin", " ", "KLC"], ["Zeitcoin", " ", "ZEIT"], ["CryptoJacksCoin", " ", "CJ"], ["Emercoin", " ", "EMC"], ["Feathercoin", " ", "FTC"], ["Belacoin", " ", "BELA"], ["Syndicate", " ", "SYNX"], ["EDRCoin", " ", "EDRC"], ["Quotient", " ", "XQN"], ["EmiratesGoldCoin", " ", "EMIRG"], ["Ethereum", " ", "ETH"], ["EthereumClassic", " ", "ETC"], ["BitSynq", " ", "SYNQ"], ["Bon PeKaO", " ", "BON"], ["AsiaDigiCoin", " ", "ADCN"], ["CrownCoin", " ", "CRW"], ["Saham", " ", "SHM"], ["SecureCoin", " ", "SRC"], ["AcesCoin", " ", "ACES"], ["Rhodiumcoin", " ", "RHO"], ["AngelaMerkelCoin", " ", "AMC"], ["UGAIN", " ", "GAIN"], ["BitPokemonGo", " ", "BPOK"], ["ELcoin", " ", "ELCO"], ["EverGreenCoin", " ", "EGC"], ["TheMermaidCoin", " ", "MER"], ["Trollpayment", " ", "TPG"], ["Betacoin", " ", "BET"], ["Bitbean", " ", "BITB"], ["Blackcoin", " ", "BLK"], ["Britcoin", " ", "BRIT"], ["CannabisCoin", " ", "CANN"], ["Peepcoin", " ", "PCN"], ["Bittoken", " ", "BXT"], ["HyperStake", " ", "HYP"], ["ArtexCoin", " ", "ATX"], ["XP", " ", "XP"], ["Frost", " ", "FSX"], ["DigiCube", " ", "CUBE"], ["ZcCoin", " ", "ZCC"], ["BenjiRolls", " ", "BENJI"], ["SaveTheOceanCoin", " ", "STO"], ["BitCloud", " ", "BTDX"], ["AurumCoin", " ", "AU"], ["JinCoin", " ", "JIN"], ["MustangCoin", " ", "MST"], ["Digibyte", " ", "DGB"], ["Golfcoin", " ", "GOLF"], ["DigitalRupees", " ", "DRS"], ["Tellurion", " ", "TELL"], ["PoloBittShares", " ", "POLOB"], ["LevoCoin", " ", "LEVO"], ["MoonShot", " ", "SHOT"], ["AtomicCoin", " ", "ATOM"], ["CheCoin", " ", "XCHE"], ["Fortesque", " ", "FRT"], ["Adzcoin", " ", "ADZ"], ["ZCoin", " ", "XZC"], ["Mintcoin", " ", "MINT"], ["Espers", " ", "ESP"], ["DynamicCoin", " ", "DMC"], ["ENZOLimited", " ", "ENZO"], ["SSTCoin", " ", "SST"], ["ExclusiveCoin", " ", "EXCL"], ["Potcoin", " ", "POT"], ["WashingtonCoin", " ", "WASH"], ["LoMoCoin", " ", "LMC"], ["Gulden", " ", "NLG"], ["netBit", " ", "NBIT"], ["Xde2", " ", "XDE2"], ["ZMicron", " ", "ZMC"], ["Zoin", " ", "ZOI"], ["Rega", " ", "REGA"], ["ZcoinDark", " ", "XZCD"], ["Zcash", " ", "ZEC"], ["Zclassic", " ", "ZCL"], ["Conquestcoin", " ", "CQST"], ["LevoPlus", " ", "LVPS"], ["Simplecash", " ", "SIMP"], ["Kurrent", " ", "KURT"], ["Safetradecoin", " ", "XSTC"], ["IOECoin", " ", "IOE"], ["Wrapper", " ", "WRP"], ["Faircoin", " ", "FAIR"], ["Pabyosicoin Special", " ", "PCS"], ["Bullshitcoin", " ", "BULLS"], ["NetBit", " ", "NBX"], ["Wowclassic", " ", "WCL"], ["ALLION", " ", "ALL"], ["Uniform Fiscal Object", " ", "UFO"], ["Fedoracoin", " ", "TIPS"], ["Tatoocoin", " ", "TSE"], ["BitcoinPlus", " ", "XBC"], ["Greencoin", " ", "GRE"], ["Lunacoin", " ", "LUNA"], ["Eryllium", " ", "ERY"], ["HealthyWormCoin", " ", "WORM"], ["TrumPenceCoin", " ", "TPC"], ["BizCoin", " ", "BIZ"], ["Printerium", " ", "PRX"], ["PureVidz", " ", "VIDZ"], ["Caliphcoin", " ", "CALC"], ["Magnumcoin", " ", "MGM"], ["Komodo", " ", "KMD"], ["Elysium", " ", "ELS"], ["PascalClassic", " ", "XPASC"], ["VirtualCoin", " ", "VC"], ["Hollyweed", " ", "HOLLY"], ["CoronaCoin", " ", "CRN"], ["Centurion Future", " ", "CNTF"], ["GirlsTokenCoin", " ", "XGTC"], ["SolarflareCoin", " ", "SFC"], ["Boat", " ", "BOAT"], ["Geertcoin", " ", "GEERT"], ["Neuron", " ", "NRN"], ["RenosCoin", " ", "RNS"], ["Arguscoin", " ", "ARGUS"], ["GlobalTourCoin", " ", "GTC"], ["BAKEDcoin", " ", "BAKED"], ["CoochieCoin", " ", "COOC"], ["Maxicoin", " ", "MAXI"], ["OneCoin", " ", "OC"], ["AnarchistsPrime", " ", "ACP"], ["GlobalToken", " ", "GLT"], ["Honey", " ", "HONEY"], ["Gambleo", " ", "GMB"], ["ScryptDashCoin", " ", "SDASH"], ["MasterSwisCoin", " ", "MSCN"], ["EbitTreeCoin", " ", "EBT"], ["TristarCoin", " ", "TSTR"], ["Huncoin", " ", "HNC"], ["Zsecoin", " ", "ZSE"], ["ImpactCoin", " ", "IMX"], ["MonetaryUnit", " ", "MUE"], ["Dash", " ", "DASH"], ["OGNCoin", " ", "OGN"], ["Coinonat", " ", "CXT"], ["TattoocoinLimitedEdition", " ", "TLE"], ["PutinCoin", " ", "PUT"], ["MentalHealthCoin", " ", "MENTAL"], ["BlazerCoin", " ", "BLAZR"], ["Solaris", " ", "XLR"], ["TorCoin", " ", "TOR"], ["Beonpush", " ", "BOPS"], ["Happycoin", " ", "HPC"], ["Cannation", " ", "CNNC"], ["Vsync", " ", "XVS"], ["Guficoin", " ", "GFC"], ["UnitCurrency", " ", "UNIT"], ["ECC", " ", "ECC"], ["Rupee", " ", "RUP"], ["Pivx", " ", "PIVX"], ["Groestlcoin", " ", "GRS"], ["Trancecoin", " ", "TRANCE"], ["MiloCoin", " ", "MILO"], ["Hodlcoin", " ", "HODL"], ["Condensate", " ", "RAIN"], ["Halloweencoin", " ", "HALLO"], ["PoSWCoin", " ", "POSW"], ["Equitrader", " ", "EQT"], ["CreativeCoin", " ", "CREA"], ["TopazCoin", " ", "TOPAZ"], ["TreauxCoin", " ", "TRUX"], ["Zennies", " ", "ZENI"], ["InsaneCoin", " ", "INSN"], ["DigitalMoneyBits", " ", "DMB"], ["T-Coin", " ", "TCOIN"], ["Mooncoin", " ", "MOON"], ["CACHeCoin", " ", "CACH"], ["CoinMiningIndex", " ", "CMX"], ["GreenFingers", " ", "GREENF"], ["Coupecoin", " ", "COUPE"], ["E-Coin", " ", "ECN"], ["TerraNovaCoin", " ", "TER"], ["Ammo Reloaded", " ", "AMMO"], ["PirateBlocks", " ", "SKULL"], ["Neuro", " ", "NRO"], ["Linx", " ", "LINX"], ["RuneStoneCoin", " ", "RUNE"], ["CBit", " ", "XCT"], ["SixEleven", " ", "611"], ["HarmonyCoin", " ", "HMC"], ["CheapCoin", " ", "CHEAP"], ["RevolutionVR", " ", "RVR"], ["BitcoinPlanet", " ", "BTPL"], ["Antimatter", " ", "ANTX"], ["RoundCoin", " ", "RDC"], ["DariCoin", " ", "DARI"], ["StackBIT", " ", "SBIT"], ["TurboCoin", " ", "TURBO"], ["EuropeUnited", " ", "EUROP"], ["Remicoin", " ", "RMC"], ["Denarius", " ", "DNR"], ["CycloneCoin", " ", "CYCLONE"], ["Futurxe", " ", "FXE"], ["Slevin", " ", "SLEVIN"], ["GoldPieces", " ", "GP"], ["WomenCoin", " ", "WOMEN"], ["USACoin", " ", "USA"], ["SurgeCoin", " ", "SURGE"], ["Token-as-a-Service", " ", "TAAS"], ["Shitcoin", " ", "SHIT"], ["Goodomy", " ", "GOOD"], ["Primulon", " ", "PRIMU"], ["KangarooBits", " ", "KGB"], ["LindaCoin", " ", "LINDA"], ["Skoincoin", " ", "SKOIN"], ["Dimecoin", " ", "DIME"], ["iDice", " ", "ICE"], ["Crimsoncoin", " ", "CRMSN"], ["NoLimitCoin", " ", "NLC2"], ["CampusCoin", " ", "CMPCO"], ["Ethernex", " ", "ETN"], ["UpscaleToken", " ", "UP"], ["Boleno", " ", "BLN"], ["Hubcoin", " ", "HUB"], ["Ethos", " ", "ETHOS"], ["Coimatic2", " ", "CTIC2"], ["EthereumLink", " ", "LNK"], ["JediCoin", " ", "JEDI"], ["BitSoar", " ", "BSR"], ["Disse", " ", "DSE"], ["Hyper", " ", "HYPER"], ["InfoCoin", " ", "INFO"], ["BirdsCoin", " ", "BIRDS"], ["BitcoinMetal", " ", "BCM"], ["JapanCoin", " ", "JAPAN"], ["MarsBux", " ", "MARS"], ["BCash", " ", "BCH"], ["WinkCoin", " ", "WINK"], ["Koicoin", " ", "KOI"], ["ILCoin", " ", "ILC"], ["SmartCash", " ", "SMART"], ["JynErso", " ", "ERSO"], ["RCoin", " ", "IBC"], ["AgriNovusCoin", " ", "AGRI"], ["Etheriya", " ", "RIYA"], ["Visio", " ", "VISIO"], ["Runners", " ", "RUNNERS"], ["CoinonatX", " ", "XCXT"], ["NumusCash", " ", "NUMUS"], ["Aseancoin", " ", "ASN"], ["Buzzcoin", " ", "BUZZ"], ["PlayerCoin", " ", "PLACO"], ["IndiaCoin", " ", "INDIA"], ["SnowCoin", " ", "SNOW"], ["XTDCoin", " ", "XTD"], ["Bixc", " ", "BIXC"], ["LasVegasCoin", " ", "VGS"], ["MyBit Token", " ", "MYB"], ["MarsBux2", " ", "MARS2"], ["Brother", " ", "BRAT"], ["PeaceCoin3.6", " ", "PEC"], ["HealthyFoodProgram", " ", "HEALTHY"], ["eBullionCoin", " ", "EBC"], ["Protean", " ", "PRN"], ["TheresaMayCoin", " ", "MAY"], ["UlaTech", " ", "ULA"], ["Phillion", " ", "PHN"], ["InvestFeed", " ", "IFT"], ["Cyder", " ", "CYDER"], ["Bitdeal", " ", "BDL"], ["XYZCoin", " ", "XYZ"], ["VsyncX", " ", "VSX"], ["Fujinto", " ", "NTO"], ["DaleCoin", " ", "DALC"], ["DutchCoin", " ", "DUTCH"], ["Terracoin", " ", "TRC"], ["UKCoin", " ", "UK"], ["Hopecoin", " ", "HOPE"], ["Bitqy", " ", "BQ"], ["Pariscoin", " ", "PARIS"], ["Dentacoin", " ", "DCN"], ["DigitalPrice", " ", "DP"], ["Adshares", " ", "ADST"], ["Magnatum", " ", "MGT"], ["Daneton", " ", "DNE"], ["Iquant", " ", "IQT"], ["AnyChain", " ", "ANC"], ["LIFE", " ", "LIFE"], ["Chips", " ", "CHIPS"], ["Beerhouse", " ", "BEER"], ["Adcoin", " ", "ACC"], ["Monetha", " ", "MTH"], ["Mothership", " ", "MSP"], ["ProspectorsGold", " ", "PGL"], ["Neulaut", " ", "NUA"], ["Kayicoin", " ", "KAYI"], ["Playwincoin", " ", "PWC"], ["Unify", " ", "UNIFY"], ["DFSCoin", " ", "DFS"], ["Targetcoin", " ", "TGT"], ["GreenEnergyToken", " ", "GET"], ["Elixir", " ", "ELIX"], ["Vulcanocoin", " ", "VULCANO"], ["Monoeci", " ", "XMCC"], ["Lampix", " ", "PIX"], ["Mobozcoin", " ", "MBC"], ["Porntoken", " ", "PT"], ["CryptoBank", " ", "CBANK"], ["Ethbits", " ", "ETBS"], ["Loopring", " ", "LRC"], ["RoyalBritishLegion", " ", "RBL"], ["The Basis", " ", "TBS"], ["ALIS", " ", "ALIS"], ["Regalcoin", " ", "REC"], ["DetectorToken", " ", "DTCT"], ["Voise", " ", "VOISE"], ["Jetcoin", " ", "JET"], ["Internxt", " ", "INXT"], ["Bastone", " ", "BSN"], ["GoldenCryptoCoin", " ", "GDC"], ["Flik", " ", "FLIK"], ["Social", " ", "SCL"], ["Natcoin", " ", "NTC"], [" imbrex", " ", "REX"], ["TPICoin", " ", "TPI"], ["MalaysiaCoin", " ", "MALC"], ["AkuyaCoin", " ", "AKY"], ["Luckcoin", " ", "LUCK"], ["Minex", " ", "MINEX"], ["Roofs", " ", "ROOFS"], ["EthereumGold", " ", "ETG"], ["FAPcoin", " ", "FAP"], ["Qtum", " ", "QTUM"], ["Bitbase", " ", "BTBC"], ["Highgain", " ", "HIGH"], ["Postoken", " ", "POS"], ["Pure", " ", "PURE"], ["Lambocoin", " ", "LAMBO"], ["Initial Coin Offering Token", " ", "ICOT"], ["StarCash", " ", "STARS"], ["GlassCoin", " ", "GLS"], ["ACoin", " ", "ACO"], ["Code47", " ", "C47"], ["BitSerial", " ", "BTE"], ["GreenMed", " ", "GRMD"], ["NeoGold", " ", "NEOG"], ["Magnet", " ", "MAG"], ["Solar", " ", "SOLAR"], ["SISA", " ", "SISA"], ["ZoZoCoin", " ", "ZZC"], ["SugarExchange", " ", "SGR"], ["PlexCoin", " ", "PLX"], ["Manutax", " ", "MUX"], ["LAToken", " ", "LA"], ["BillionaireToken", " ", "XBL"], ["CredenceCoin", " ", "CRDNC"], ["CommodityAdNetwork", " ", "CDX"], ["GoldRewardToken", " ", "GRX"], ["TigerCoin", " ", "TIGER"], ["Zlancer", " ", "ZCG"], ["Stox", " ", "STX"], ["Blue Protocol", " ", "BLUE"], ["PlaykeyToken", " ", "PKT"], ["ELTCoin", " ", "ELT"], ["PitisCoin", " ", "PTS"], ["SMSCoin", " ", "SMS"], ["MIPSToken", " ", "MIPS"], ["BitcoinRed", " ", "BTCRED"], ["ClimateCoin", " ", "CO2"], ["DashGold", " ", "DAG"], ["UquidCoin", " ", "UQC"], ["GoByte", " ", "GBX"], ["HarvestCoin", " ", "HC"], ["eSportsRewardToken", " ", "ERT"], ["Superman", " ", "SUPERMAN"], ["Microbyte", " ", "MCB"], ["Bonpay", " ", "BONPAY"], ["BinaryCoin", " ", "BRC"], ["Equal", " ", "EQL"], ["BitFinTech", " ", "BFI"], ["Presearch", " ", "PRE"], ["MatrixCoin", " ", "MXC"], ["Nucleon", " ", "NEON"], ["Xgox", " ", "XGOX"], ["DavorCoin", " ", "DAV"], ["EnterCoin", " ", "ENTRC"], ["B2B", " ", "B2B"], ["OysterPearl", " ", "PRL"], ["ExtensiveCoin", " ", "EXTN"], ["HomeBlockCoin", " ", "HBC"], ["DragonChain", " ", "DRGN"], ["Swisscoin", " ", "SIC"], ["SwisscoinCash", " ", "SWC"], ["Scorecoin", " ", "SCORE"], ["Steneum", " ", "STN"], ["B3Coin", " ", "KB3"], ["Crackers", " ", "CRACKERS"], ["MinexCoin", " ", "MNX"], ["Lizus Payments", " ", "LIZ"], ["Flash", " ", "FLASH"], ["Desire", " ", "DSR"], ["Diverse", " ", "DVRS"], ["MUNcoin", " ", "MUN"], ["eBitcoin", " ", "EBTC"], ["EcoToken", " ", "ECOT"], ["Accelerator", " ", "ACCL"], ["Crave", " ", "CRAVE"], ["Quantum Resistance Ledger", " ", "QRL"], ["Tune", " ", "TUN"], ["Shield", " ", "XSH"], ["Draftcoin", " ", "DFT"], ["Gainer Coin", " ", "GNR"], ["Qurito", " ", "QURO"], ["Foodcoin", " ", "FOOD"], ["Worldcore", " ", "WRC"], ["Argo", " ", "ARGO"], ["Bitclave", " ", "CAT"], ["Bitcoin Hush", " ", "BTCH"], ["Simplicity", " ", "SPL"], ["BitRewards", " ", "XBR"], ["BitCrownCoin", " ", "BCW"], ["Cropcoin", " ", "CROP"], ["Mamcoin", " ", "MAM"], ["BITTX", " ", "BX"], ["Trident Group", " ", "TRDT"], ["Upfiring", " ", "UFR"], ["Infinex", " ", "IFX"], ["Valuto", " ", "VLU"], ["Bitcoin Green", " ", "BITG"], ["ALQO", " ", "ALQO"], ["Coinlancer", " ", "CL"], ["Jesus Coin", " ", "JC"], ["DV7 Coin", " ", "DV7"], ["SBucksToken", " ", "SBT"], ["Folm", " ", "FLM"], ["HADE Platform", " ", "HADE"], ["Loom Network", " ", "LOOM"], ["Deviant", " ", "DEV"], ["NANJCOIN", " ", "NANJ"], ["WorldBTC", " ", "WBTC"], ["ATFS", " ", "ATFS"], ["Nomad", " ", "NMD"], ["BarterDEX", " ", "DEX"], ["SuperNET", " ", "UNITY"], ["EWangBiCoin", " ", "EWC"], ["Arion", " ", "ARION"], ["Nihilo Coin", " ", "NIHL"], ["Apollon", " ", "XAP"], ["NAU", " ", "ENAU"], ["Ignition", " ", "IC"], ["Bitcore", " ", "BTX"], ["BitSend", " ", "BSD"], ["EuropeCoin", " ", "ERC"], ["HousingCoin", " ", "HOUSING"], ["Hara", " ", "HRC"], ["Paycentos", " ", "PYN"], ["Ormeus Coin", " ", "ORME"], ["Request Network", " ", "REQ"], ["OmiseGO", " ", "OMG"], ["EOS", " ", "EOS"], ["VeChain", " ", "VEN"], ["Pulsar", " ", "PLSR"], ["TRON", " ", "TRX"], ["PACcoin", " ", "PAC"], ["Verge", " ", "XVG"], ["Japan Brand Coin", " ", "JBC"], ["ERA", " ", "ERA"], ["SipsCo", " ", "SIPS"], ["Mithril", " ", "MITH"], ["Golem", " ", "GNT"], ["Populous", " ", "PPT"], ["FitCoin", " ", "FIT"], ["Vereum", " ", "VMC"], ["SENYO", " ", "SENYO"], ["SyncFab", " ", "MFG"], ["VIPSTARCOIN", " ", "VIPS"]];

    return {
        COINEXCHANGE: COINEXCHANGE
    };
}();

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

module.exports = function () {

    var CRYPTOPIA = [["Money", " ", "$$$"], ["$PAC", " ", "$PAC"], ["Elite", " ", "1337"], ["21Million", " ", "21M"], ["300 Token", " ", "300"], ["42-coin", " ", "42"], ["SixEleven", " ", "611"], ["808", " ", "808"], ["OctoCoin", " ", "888"], ["8Bit", " ", "8BIT"], ["Alphabit", " ", "ABC"], ["ArtByte", " ", "ABY"], ["Asiacoin", " ", "AC"], ["AC3", " ", "AC3"], ["Adcoin", " ", "ACC"], ["ACoin", " ", "ACOIN"], ["AudioCoin", " ", "ADC"], ["Adshares", " ", "ADST"], ["AmigaCoin", " ", "AGA"], ["Alexandrite", " ", "ALEX"], ["ALIS", " ", "ALIS"], ["Allion", " ", "ALL"], ["AltCoin", " ", "ALT"], ["Synereo AMP", " ", "AMP"], ["AnimeCoin", " ", "ANI"], ["APX", " ", "APX"], ["ArcticCoin", " ", "ARC"], ["AquariusCoin", " ", "ARCO"], ["Argentum", " ", "ARG"], ["ArgusCoin", " ", "ARGUS"], ["Aricoin", " ", "ARI"], ["Ark", " ", "ARK"], ["Athenian Warrior Token", " ", "ATH"], ["Atmos", " ", "ATMOS"], ["Atomiccoin", " ", "ATOM"], ["AurumCoin", " ", "AU"], ["AuroraCoin", " ", "AUR"], ["Aureus", " ", "AURS"], ["BatCoin", " ", "BAT"], ["BitBay", " ", "BAY"], ["Bitcoin Fast", " ", "BCF"], ["BCash", " ", "BCH"], ["BlockMason", " ", "BCPT"], ["BitDeal", " ", "BDL"], ["Bean Cash", " ", "BEAN"], ["BeezerCoin", " ", "BEEZ"], ["BenjiRolls", " ", "BENJI"], ["BERNcash", " ", "BERN"], ["BestChain", " ", "BEST"], ["Bongger", " ", "BGR"], ["BipCoin", " ", "BIP"], ["BirdCoin", " ", "BIRD"], ["Bismuth", " ", "BIS"], ["Bitcoin Green", " ", "BITG"], ["Bitstar", " ", "BITS"], ["BlockCat", " ", "BKCAT"], ["Blakecoin", " ", "BLC"], ["BlackCoin", " ", "BLK"], ["Blocknet", " ", "BLOCK"], ["BlazeCoin", " ", "BLZ"], ["BraveNewCoin", " ", "BNC"], ["BnrtxCoin", " ", "BNX"], ["BolivarCoin", " ", "BOLI"], ["Bonpay", " ", "BON"], ["BlockOptions", " ", "BOP"], ["Blockpool", " ", "BPL"], ["BorgCoin", " ", "BRG"], ["Bitradio", " ", "BRO"], ["BitSend", " ", "BSD"], ["GlobalBoost-Y", " ", "BSTY"], ["BATA", " ", "BTA"], ["BitBar", " ", "BTB"], ["BitcoinDark", " ", "BTCD"], ["Bitcoin Scrypt", " ", "BTCS"], ["Bitcloud", " ", "BTDX"], ["Bitgem", " ", "BTG"], ["Bytom", " ", "BTM"], ["BitCore", " ", "BTX"], ["SwagBucks", " ", "BUCKS"], ["Bumbacoin", " ", "BUMBA"], ["BunnyCoin", " ", "BUN"], ["BVBCoin", " ", "BVB"], ["Bulwark", " ", "BWK"], ["Bitcedi", " ", "BXC"], ["Coin2", " ", "C2"], ["CacheCoin", " ", "CACH"], ["CanYa", " ", "CAN"], ["Cannabiscoin", " ", "CANN"], ["Cappasity", " ", "CAPP"], ["CareerCoin", " ", "CAR"], ["Catcoin", " ", "CAT"], ["Bullion", " ", "CBX"], ["CoolInDarkCoin", " ", "CC"], ["CryptoClub", " ", "CCB"], ["CannaCoin", " ", "CCN"], ["Canada eCoin", " ", "CDN"], ["CryptopiaFeeShare", " ", "CEFS"], ["Centrality", " ", "CENNZ"], ["CoffeeCoin", " ", "CFC"], ["ChanCoin", " ", "CHAN"], ["ChainCoin", " ", "CHC"], ["ChessCoin", " ", "CHESS"], ["CryptoJacks", " ", "CJ"], ["Coinlancer", " ", "CL"], ["ClamCoin", " ", "CLAM"], ["CloakCoin", " ", "CLOAK"], ["CompCoin", " ", "CMP"], ["CampusCoin", " ", "CMPCO"], ["CometCoin", " ", "CMT"], ["Cannation", " ", "CNNC"], ["Coino", " ", "CNO"], ["Bitcoal", " ", "COAL"], ["ColossusXT", " ", "COLX"], ["Compound Coin", " ", "COMP"], ["PayCon", " ", "CON"], ["CopperCoin", " ", "COPPER"], ["Corion", " ", "COR"], ["CompuCoin", " ", "CPN"], ["ConquestCoin", " ", "CQST"], ["Crave", " ", "CRAVE"], ["CrowdCoin", " ", "CRC"], ["CreativeCoin", " ", "CREA"], ["CREAMcoin", " ", "CRM"], ["CryptoRuble", " ", "CRUR"], ["ChronosCoin", " ", "CRX"], ["CryptCoin", " ", "CRYPT"], ["Coimatic 3", " ", "CTIC3"], ["Coinonat", " ", "CXT"], ["DALECOIN", " ", "DALC"], ["DARK", " ", "DARK"], ["DA$", " ", "DAS"], ["Dash", " ", "DASH"], ["DaxxCoin", " ", "DAXX"], ["DecentBet", " ", "DBET"], ["DubaiCoin", " ", "DBIX"], ["Dentacoin", " ", "DCN"], ["Decred", " ", "DCR"], ["DinastyCoin", " ", "DCY"], ["DDF", " ", "DDF"], ["Deutsche eMark", " ", "DEM"], ["Deuscoin", " ", "DEUS"], ["Deviant", " ", "DEV"], ["DigiByte", " ", "DGB"], ["Digitalcoin", " ", "DGC"], ["DigiPulse", " ", "DGPT"], ["Dimecoin", " ", "DIME"], ["Divi Exchange Token", " ", "DIVX"], ["GeneChain", " ", "DNA"], ["Denarius", " ", "DNR"], ["Dogecoin", " ", "DOGE"], ["DonationCoin", " ", "DON"], ["DopeCoin", " ", "DOPE"], ["Dotcoin", " ", "DOT"], ["DigitalPrice", " ", "DP"], ["DA Power Play", " ", "DPP"], ["DCORP", " ", "DRP"], ["DRP Utility", " ", "DRPU"], ["Droxne", " ", "DRXNE"], ["Parallelcoin", " ", "DUO"], ["EmbargoCoin", " ", "EBG"], ["Eclipse", " ", "EC"], ["Electra", " ", "ECA"], ["ECOcoin", " ", "ECO"], ["EcoBit", " ", "ECOB"], ["EducoinV", " ", "EDC"], ["Eddiecoin", " ", "EDDIE"], ["EDRcoin", " ", "EDRC"], ["E-Gulden", " ", "EFL"], ["EverGreenCoin", " ", "EGC"], ["ElaCoin", " ", "ELC"], ["Ellaism", " ", "ELLA"], ["Elements", " ", "ELM"], ["EmerCoin", " ", "EMC"], ["Einsteinium", " ", "EMC2"], ["Emerald Crypto", " ", "EMD"], ["Enjin Coin", " ", "ENJ"], ["ExperienceCoin", " ", "EPC"], ["Equitrade", " ", "EQT"], ["Eryllium", " ", "ERY"], ["Ethereum Classic", " ", "ETC"], ["Ethereum", " ", "ETH"], ["Ethereum Dark", " ", "ETHD"], ["Electroneum", " ", "ETN"], ["EncryptoTel", " ", "ETT"], ["Eurocoin", " ", "EUC"], ["Evilcoin", " ", "EVIL"], ["Evotion", " ", "EVO"], ["Everus", " ", "EVR"], ["Expanse", " ", "EXP"], ["FuelCoin", " ", "FC2"], ["FacileCoin", " ", "FCN"], ["Factom", " ", "FCT"], ["FireFlyCoin", " ", "FFC"], ["FujiCoin", " ", "FJC"], ["FLASH", " ", "FLASH"], ["Flaxscript", " ", "FLAX"], ["FloripaCoin", " ", "FLN"], ["FlutterCoin", " ", "FLT"], ["FonzieCoin", " ", "FONZ"], ["Fortcoin", " ", "FORT"], ["FireRoosterCoin", " ", "FRC"], ["Francs", " ", "FRN"], ["FastCoin", " ", "FST"], ["Feathercoin", " ", "FTC"], ["FeatherCoinClassic", " ", "FTCC"], ["Cypherfunks", " ", "FUNK"], ["Futereum X", " ", "FUTX"], ["FuzzBalls", " ", "FUZZ"], ["GaiaCoin", " ", "GAIA"], ["GameCredits", " ", "GAME"], ["Gapcoin", " ", "GAP"], ["GayMoney", " ", "GAY"], ["GoByte", " ", "GBX"], ["Byteball Bytes", " ", "GBYTE"], ["GCoin", " ", "GCN"], ["GrandCoin", " ", "GDC"], ["GeertCoin", " ", "GEERT"], ["GeoCoin", " ", "GEO"], ["GoldCoin", " ", "GLD"], ["Gnosis", " ", "GNO"], ["Gainer", " ", "GNR"], ["Golem", " ", "GNT"], ["GoldPieces", " ", "GP"], ["GoldPressedLatinum ", " ", "GPL"], ["GPUCoin", " ", "GPU"], ["Granite", " ", "GRN"], ["Groestlcoin", " ", "GRS"], ["GrowthCoin", " ", "GRW"], ["Growers Intl", " ", "GRWI"], ["GunCoin", " ", "GUN"], ["GroinCoin", " ", "GXG"], ["Hackspace", " ", "HAC"], ["Halcyon", " ", "HAL"], ["Havecoin", " ", "HAV"], ["HomeblockCoin", " ", "HBC"], ["HoboNickels", " ", "HBN"], ["HarvestCoin", " ", "HC"], ["HodlBucks", " ", "HDLB"], ["HeatLedger", " ", "HEAT"], ["Helium", " ", "HLM"], ["InterstellarHoldings", " ", "HOLD"], ["HSHARE", " ", "HSR"], ["Decision Token", " ", "HST"], ["Hush", " ", "HUSH"], ["HexxCoin", " ", "HXX"], ["HyperStake", " ", "HYP"], ["I0Coin", " ", "I0C"], ["IgnitionCoin", " ", "IC"], ["ICOBid", " ", "ICOB"], ["InflationCoin", " ", "IFLT"], ["investFeed", " ", "IFT"], ["Independent Money System", " ", "IMS"], ["InCoin", " ", "IN"], ["Influxcoin", " ", "INFX"], ["Innova", " ", "INN"], ["InPay", " ", "INPAY"], ["Insane", " ", "INSN"], ["Iquant Chain", " ", "IQT"], ["IrishCoin", " ", "IRL"], ["ItiCoin", " ", "ITI"], ["IXCoin", " ", "IXC"], ["IZEcoin", " ", "IZE"], ["KashCoin", " ", "KASH"], ["Kayicoin", " ", "KAYI"], ["Kubera", " ", "KBR"], ["KlondikeCoin", " ", "KDC"], ["Darsek", " ", "KED"], ["Kekcoin", " ", "KEK"], ["KangarooBits", " ", "KGB"], ["King93", " ", "KING"], ["Komodo", " ", "KMD"], ["KyberNetworkCrystal", " ", "KNC"], ["KoboCoin", " ", "KOBO"], ["Karbo", " ", "KRB"], ["Kronecoin", " ", "KRONE"], ["KumaCoin", " ", "KUMA"], ["Kurrent", " ", "KURT"], ["KushCoin", " ", "KUSH"], ["LanaCoin", " ", "LANA"], ["LBRY Credits", " ", "LBC"], ["LiteBitcoin", " ", "LBTC"], ["litecoinPlus", " ", "LCP"], ["LADACoin", " ", "LDC"], ["LiteDoge", " ", "LDOGE"], ["LeaCoin", " ", "LEA"], ["Leafcoin", " ", "LEAF"], ["LemonCoin", " ", "LEMON"], ["LFTCCoin", " ", "LFTC"], ["Lina", " ", "LINA"], ["LindaCoin", " ", "LINDA"], ["Linx", " ", "LINX"], ["Lithiumcoin", " ", "LIT"], ["LiZi", " ", "LIZI"], ["Lottocoin", " ", "LOT"], ["LiteBar", " ", "LTB"], ["Litecoin", " ", "LTC"], ["LitecoinUltra", " ", "LTCU"], ["Luxcoin", " ", "LUX"], ["Lycancoin", " ", "LYC"], ["Lynx", " ", "LYNX"], ["MachineCoin", " ", "MAC"], ["Magnet", " ", "MAG"], ["MagicCoin", " ", "MAGE"], ["MagnetCoin", " ", "MAGN"], ["MaidSafeCoin", " ", "MAID"], ["MarijuanaCoin", " ", "MAR"], ["Bitmark", " ", "MARKS"], ["Mars", " ", "MARS"], ["MarxCoin", " ", "MARX"], ["MatrixCoin", " ", "MATRX"], ["Embers", " ", "MBRS"], ["Musiconomi", " ", "MCI"], ["Macron", " ", "MCRN"], ["MegaCoin", " ", "MEC"], ["MobileGo", " ", "MGO"], ["MegaX", " ", "MGX"], ["Minex", " ", "MINEX"], ["Mintcoin", " ", "MINT"], ["Melite", " ", "MLITE"], ["Minereum", " ", "MNE"], ["Mineum", " ", "MNM"], ["MOIN", " ", "MOIN"], ["MojoCoin", " ", "MOJO"], ["MonkeyProject", " ", "MONK"], ["MotoCoin", " ", "MOTO"], ["Mothership", " ", "MSP"], ["Mustangcoin", " ", "MST"], ["Metal", " ", "MTL"], ["MetalMusicCoin", " ", "MTLMC"], ["MasterNodeCoin", " ", "MTNC"], ["Musicoin", " ", "MUSIC"], ["MyBit", " ", "MYB"], ["MazaCoin", " ", "MZC"], ["NAMO COIN", " ", "NAMO"], ["NavCoin", " ", "NAV"], ["NeuroDAO", " ", "NDAO"], ["Neblio", " ", "NEBL"], ["Neo", " ", "NEO"], ["NetCoin", " ", "NET"], ["Netko", " ", "NETKO"], ["NevaCoin", " ", "NEVA"], ["Incakoin", " ", "NKA"], ["NoLimitCoin", " ", "NLC2"], ["NameCoin", " ", "NMC"], ["Numus", " ", "NMS"], ["NobleCoin", " ", "NOBL"], ["Neutron", " ", "NTRN"], ["NovaCoin", " ", "NVC"], ["Nexus", " ", "NXS"], ["NyanCoin", " ", "NYAN"], ["Obsidian", " ", "ODN"], ["Cthulhu Offerings", " ", "OFF"], ["OKCash", " ", "OK"], ["OmiseGo", " ", "OMG"], ["DeepOnion", " ", "ONION"], ["Om", " ", "OOO"], ["Opalcoin", " ", "OPAL"], ["OP Coin", " ", "OPC"], ["OrbitCoin", " ", "ORB"], ["Galactrum", " ", "ORE"], ["OrmeusCoin", " ", "ORME"], ["Open Source Coin", " ", "OSC"], ["Open Trading Network", " ", "OTN"], ["OX Fina", " ", "OX"], ["OzzieCoin", " ", "OZC"], ["PakCoin", " ", "PAK"], ["PascalLite", " ", "PASL"], ["TenX", " ", "PAY"], ["Publica", " ", "PBL"], ["PolishCoin", " ", "PCC"], ["PioneerCoin", " ", "PCOIN"], ["Penguin", " ", "PENG"], ["PepeCoin", " ", "PEPE"], ["Photon", " ", "PHO"], ["Phore", " ", "PHR"], ["PhilosopherStone", " ", "PHS"], ["PiggyCoin", " ", "PIGGY"], ["PinkCoin", " ", "PINK"], ["Pirl", " ", "PIRL"], ["PIVX", " ", "PIVX"], ["Polcoin", " ", "PLC"], ["Pillar", " ", "PLR"], ["PlexCoin", " ", "PLX"], ["PandaCoin", " ", "PND"], ["Polis", " ", "POLIS"], ["ClearPoll", " ", "POLL"], ["PopularCoin", " ", "POP"], ["PostCoin", " ", "POST"], ["Potcoin", " ", "POT"], ["PowerLedger", " ", "POWR"], ["PeerCoin", " ", "PPC"], ["Prototanium", " ", "PR"], ["OysterPearl", " ", "PRL"], ["ProCurrency", " ", "PROC"], ["PesetaCoin", " ", "PTC"], ["Pura", " ", "PURA"], ["PutinCoin", " ", "PUT"], ["PhoenixCoin", " ", "PXC"], ["Prime-XI", " ", "PXI"], ["Qubitcoin", " ", "Q2C"], ["Cubits", " ", "QBT"], ["Quark", " ", "QRK"], ["Quatloo", " ", "QTL"], ["Qwark", " ", "QWARK"], ["Revain", " ", "R"], ["Condensate", " ", "RAIN"], ["Rabbitcoin", " ", "RBBT"], ["Rimbit", " ", "RBT"], ["RubyCoin", " ", "RBY"], ["RussiaCoin", " ", "RC"], ["Reddcoin", " ", "RDD"], ["RedCoin", " ", "RED"], ["Augur", " ", "REP"], ["PickleRicks", " ", "RICKS"], ["Etheriya", " ", "RIYA"], ["RoyalKingdomCoin", " ", "RKC"], ["RenosCoin", " ", "RNS"], ["RonPaulCoin", " ", "RPC"], ["Rupee", " ", "RUP"], ["SagaCoin", " ", "SAGA"], ["SharkCoin", " ", "SAK"], ["BeachCoin", " ", "SAND"], ["SBC Coin", " ", "SBC"], ["Sociall", " ", "SCL"], ["Soma", " ", "SCT"], ["Senderon", " ", "SDRN"], ["Selencoin", " ", "SEL"], ["SocialSend", " ", "SEND"], ["SolarflareCoin", " ", "SFC"], ["SHACoin2", " ", "SHA"], ["Shrooms", " ", "SHRM"], ["SiberianChervonets", " ", "SIB"], ["SJWCoin", " ", "SJW"], ["SkeinCoin", " ", "SKC"], ["SkinCoin", " ", "SKIN"], ["SakuraCoin", " ", "SKR"], ["Skrilla", " ", "SKRL"], ["Skycoin", " ", "SKY"], ["Sterlingcoin", " ", "SLG"], ["SlothCoin", " ", "SLOTH"], ["SmartCoin", " ", "SMC"], ["SoilCoin", " ", "SOIL"], ["Songcoin", " ", "SONG"], ["SoonCoin", " ", "SOON"], ["SpaceCoin", " ", "SPACE"], ["SpankChain", " ", "SPANK"], ["SpartanCoin", " ", "SPN"], ["SpreadCoin", " ", "SPR"], ["Spots", " ", "SPT"], ["SquallCoin", " ", "SQL"], ["SecureCoin", " ", "SRC"], ["StartCoin", " ", "START"], ["StopTrumpCoin", " ", "STC"], ["Steneum", " ", "STN"], ["Stratis", " ", "STRAT"], ["StarCredits", " ", "STRC"], ["Sativacoin", " ", "STV"], ["Sumokoin", " ", "SUMO"], ["Swingcoin", " ", "SWING"], ["Sexcoin", " ", "SXC"], ["Tajcoin", " ", "TAJ"], ["TEKcoin", " ", "TEK"], ["TerraNova", " ", "TER"], ["TeslaCoin", " ", "TES"], ["TigerCoin", " ", "TGC"], ["TitCoin", " ", "TIT"], ["Blocktix", " ", "TIX"], ["TOACoin", " ", "TOA"], ["TokugawaCoin", " ", "TOK"], ["TopCoin", " ", "TOP"], ["TurboStake", " ", "TRBO"], ["TerraCoin", " ", "TRC"], ["Triangles", " ", "TRI"], ["TruckCoin", " ", "TRK"], ["Trumpcoin", " ", "TRUMP"], ["Tron", " ", "TRX"], ["TattooCoin", " ", "TSE"], ["TittieCoin", " ", "TTC"], ["Trinity", " ", "TTY"], ["TransferCoin", " ", "TX"], ["Trezarcoin", " ", "TZC"], ["Ubiq", " ", "UBQ"], ["Upfiring", " ", "UFR"], ["Unitus", " ", "UIS"], ["UniversalMolecule", " ", "UMO"], ["UniCoin", " ", "UNIC"], ["Unify", " ", "UNIFY"], ["UniversalCurrency", " ", "UNIT"], ["GameUnits", " ", "UNITS"], ["Unobtanium", " ", "UNO"], ["UR", " ", "UR"], ["Ultracoin", " ", "UTC"], ["Version", " ", "V"], ["Vade", " ", "VADE"], ["VaderCorpCoin", " ", "VCC"], ["PureVidz", " ", "VIDZ"], ["Vice Industry Token", " ", "VIT"], ["Vivo", " ", "VIVO"], ["VOISE", " ", "VOISE"], ["VapersCoin", " ", "VPRC"], ["VeriCoin", " ", "VRC"], ["Verium", " ", "VRM"], ["VirtaUniqueCoin", " ", "VUC"], ["Wincoin", " ", "WC"], ["WorldCoin", " ", "WDC"], ["Weed", " ", "WEED"], ["WildCrypto", " ", "WILD"], ["MyWishToken", " ", "WISH"], ["WirelessCoin", " ", "WLC"], ["WarCoin", " ", "WRC"], ["Wispr", " ", "WSP"], ["WeAreSatoshi", " ", "WSX"], ["WayaWolfCoin", " ", "WW"], ["BitcoinPlus", " ", "XBC"], ["Billionaire Token", " ", "XBL"], ["BeatCoin", " ", "XBTS"], ["XTRABYTES", " ", "XBY"], ["Xcoin", " ", "XCO"], ["COPICO", " ", "XCPO"], ["Creatio", " ", "XCRE"], ["C-bit", " ", "XCT"], ["CoinonatX", " ", "XCXT"], ["NewEconomyMovement", " ", "XEM"], ["FootyCash", " ", "XFT"], ["XGOX", " ", "XGOX"], ["Sphre", " ", "XID"], ["JouleCoin", " ", "XJO"], ["LeviarCoin", " ", "XLC"], ["Monoeci", " ", "XMCC"], ["Magi", " ", "XMG"], ["Monero", " ", "XMR"], ["Myriad", " ", "XMY"], ["Experience Points", " ", "XP"], ["PetroDollar", " ", "XPD"], ["PrimeCoin", " ", "XPM"], ["PlatinumBar", " ", "XPTX"], ["RateCoin", " ", "XRA"], ["Revolvercoin", " ", "XRE"], ["Royalties", " ", "XRY"], ["SpectreCoin", " ", "XSPEC"], ["StealthCoin", " ", "XST"], ["Verge", " ", "XVG"], ["ZCoin", " ", "XZC"], ["YobitCoin", " ", "YOVI"], ["Zap", " ", "ZAP"], ["Zclassic", " ", "ZCL"], ["ZCash", " ", "ZEC"], ["ZeitCoin", " ", "ZEIT"], ["ZenCash", " ", "ZEN"], ["Zero", " ", "ZER"], ["ZetaCoin", " ", "ZET"], ["BitZeny", " ", "ZNY"], ["Zoin", " ", "ZOI"], ["ZSEcoin", " ", "ZSE"]];

    return {
        CRYPTOPIA: CRYPTOPIA
    };
}();

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 30/03/2018.
 */

module.exports = function () {

    var EXMO = [["Bitcoin Cash", " ", "BCH"], ["Dash", " ", "DASH"], ["Ethereum", " ", "ETH"], ["Ethereum Classic", " ", "ETC"], ["Litecoin", " ", "LTC"], ["Zcash", " ", "ZEC"], ["Ripple", " ", "XRP"], ["Monero", " ", "XMR"], ["Dogecoin", " ", "DOGE"], ["Waves", " ", "WAVES"], ["KickCoin", " ", "KICK"]];

    return {
        EXMO: EXMO
    };
}();

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var EXTRADE = [['Bitcoin', 'USD', 'BTC'], ['CHBToken', 'BTC', 'CHBT'], ['1EX', 'BTC', '1EX']];

    return {
        EXTRADE: EXTRADE
    };
}();

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var EXX = [["Super Bitcoin", " ", "SBTC"], ["Chat", " ", "CHAT"], ["Exchange Union", " ", "XUC"], ["Borderless", " ", "BDS"], ["Bitmark", " ", "BTM"], ["Ethereum Classic", " ", "ETC"], ["Ink", " ", "INK"], ["Ethereum", " ", "ETH"], ["BitcoinPay", " ", "BTP"], ["Ti-Value", " ", "TV"], ["Gram", " ", "GRAM"], ["Litecoin", " ", "LTC"], ["SpaceChain", " ", "SPC"], ["Bitcoin Cash", " ", "BCC"], ["FirstCryptoETF", " ", "ETF"], ["LiteBitcoin", " ", "LBTC"], ["Electronic PK Chain", " ", "EPC"], ["Bitcoin King", " ", "BCK"], ["UnitedBitcoin", " ", "UBTC"], ["CFUN", " ", "CFUN"], ["EOS", " ", "EOS"], ["Qtum", " ", "QTUM"], ["Energo Labs", " ", "TSL"], ["BitShares", " ", "BTS"], ["HSHARE", " ", "HSR"], ["WhiteCoin", " ", "XWC"], ["Bitcoin Gold", " ", "BTG"], ["Bitcoin Diamond", " ", "BCD"], ["Bitcoin Wonder", " ", "BTW"], ["Monaco", " ", "MCO"]];

    return {
        EXX: EXX
    };
}();

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var GDAX = [['Bitcoin', 'BTC-USD', 'BTC'], ['Ethereum', 'ETH-BTC', 'ETH'], ['Litecoin', 'LTC-BTC', 'LTC'], ['Bitcoin Cash', 'BTC-BTC', 'BCH']];

    return {
        GDAX: GDAX
    };
}();

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var GEMINI = [['Bitcoin', 'btcusd', 'BTC'], ['Ethereum', 'ethbtc', 'ETH']];

    return {
        GEMINI: GEMINI
    };
}();

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var HITBTC = [["Bytecoin", " ", "BCN"], ["Dash", " ", "DASH"], ["Dogecoin", " ", "DOGE"], ["DashCoin", " ", "DSH"], ["EmerCoin", " ", "EMC"], ["Ethereum", " ", "ETH"], ["FacileCoin", " ", "FCN"], ["Lisk", " ", "LSK"], ["Litecoin", " ", "LTC"], ["NXT", " ", "NXT"], ["QuazarCoin", " ", "QCN"], ["Steem Dollars", " ", "SBD"], ["Siacoin", " ", "SC"], ["STEEM", " ", "STEEM"], ["DigitalNote", " ", "XDN"], ["NEM", " ", "XEM"], ["Monero", " ", "XMR"], ["Ardor", " ", "ARDR"], ["Zcash", " ", "ZEC"], ["Waves", " ", "WAVES"], ["MaidSafeCoin", " ", "MAID"], ["Synereo AMP", " ", "AMP"], ["Bus token", " ", "BUS"], ["Digix DAO", " ", "DGD"], ["Iconomi", " ", "ICN"], ["SingularDTV", " ", "SNGLS"], ["Firstblood", " ", "1ST"], ["Trustcoin", " ", "TRST"], ["Chronobank", " ", "TIME"], ["Gnosis", " ", "GNO"], ["Augur", " ", "REP"], ["ZrCoin", " ", "ZRC"], ["BOScoin", " ", "BOS"], ["DECENT", " ", "DCT"], ["Aragon", " ", "ANT"], ["Aeon", " ", "AEON"], ["Guppy", " ", "GUP"], ["Pluton", " ", "PLU"], ["Lunyr", " ", "LUN"], ["Token-as-a-Service", " ", "TAAS"], ["Nexium", " ", "NXC"], ["Edgeless", " ", "EDG"], ["iEx.ec", " ", "RLC"], ["Swarm City Token", " ", "SWT"], ["TokenCard", " ", "TKN"], ["Wings DAO", " ", "WINGS"], ["Xaurum", " ", "XAUR"], ["Aeternity", " ", "AE"], ["Patientory", " ", "PTOY"], ["Ethereum Classic", " ", "ETC"], ["Cofound.it", " ", "CFI"], ["Polybius", " ", "PLBT"], ["Bancor", " ", "BNT"], ["IdontKnow", " ", "XDNCO"], ["Tezos", " ", "XTZ"], ["Etheroll", " ", "DICE"], ["Ripple", " ", "XRP"], ["Stratis", " ", "STRAT"], ["EOS", " ", "EOS"], ["Minereum", " ", "MNE"], ["Agrello", " ", "DLT"], ["Quantum", " ", "QAU"], ["district0x", " ", "DNT"], ["Flypme", " ", "FYP"], ["Opus", " ", "OPT"], ["Stox", " ", "STX"], ["Tierion", " ", "TNT"], ["Catcoin", " ", "CAT"], ["Bitcoin Cash", " ", "BCH"], ["SunContract", " ", "SNC"], ["OpenANX", " ", "OAX"], ["0x", " ", "ZRX"], ["Rivetz", " ", "RVT"], ["ICOBox", " ", "ICOS"], ["Peercoin", " ", "PPC"], ["Veritaseum", " ", "VERI"], ["Paragon", " ", "PRG"], ["Black Moon", " ", "BMC"], ["Cindicator", " ", "CND"], ["SkinCoin", " ", "SKIN"], ["MobileGo", " ", "EMGO"], ["FunFair", " ", "FUN"], ["Hive Project", " ", "HVN"], ["FuelCoin", " ", "FUEL"], ["Po.et", " ", "POE"], ["MCAP", " ", "MCAP"], ["Airtoken", " ", "AIR"], ["Ambrosus", " ", "AMB"], ["Fujinto", " ", "NTO"], ["ICOBI", " ", "ICO"], ["CryptoPing", " ", "PING"], ["GameCredits", " ", "GAME"], ["Happycoin", " ", "HPC"], ["Monetha", " ", "MTH"], ["MobileGo", " ", "WMGO"], ["Loopring", " ", "LRC"], ["ICON", " ", "ICX"], ["Neo", " ", "NEO"], ["BitDice", " ", "CSNO"], ["OrmeusCoin", " ", "ORME"], ["Lampix", " ", "PIX"], ["KickCoin", " ", "KICK"], ["YOYOW", " ", "YOYOW"], ["MIPSToken", " ", "MIPS"], ["Coindash", " ", "CDT"], ["Verge", " ", "XVG"], ["DigiByte", " ", "DGB"], ["Latium", " ", "LAT"], ["Vibe Coin", " ", "VIBE"], ["VOISE", " ", "VOISE"], ["Enjin Coin", " ", "ENJ"], ["Zeus Shield Coin", " ", "ZSC"], ["EthBits", " ", "ETBS"], ["TRON", " ", "TRX"], ["VeChain", " ", "VEN"], ["Maecenas", " ", "ART"], ["Everex", " ", "EVX"], ["BetKing Bankroll Token", " ", "BKB"], ["Exchangen", " ", "EXN"], ["Target Coin", " ", "TGT"], ["UG Token", " ", "UGT"], ["Centra", " ", "CTR"], ["BMChain", " ", "BMT"], ["Substratum", " ", "SUB"], ["Walton", " ", "WTC"], ["Cryptonex", " ", "CNX"], ["ATB Coin", " ", "ATB"], ["Obsidian", " ", "ODN"], ["Bitmark", " ", "BTM"], ["SegWit2x", " ", "B2X"], ["ATMChain", " ", "ATM"], ["Viberate", " ", "VIB"], ["OmiseGO", " ", "OMG"], ["TenX Pay Token", " ", "PAY"], ["COSS", " ", "COSS"], ["Populous", " ", "PPT"], ["Status Network Token", " ", "SNT"], ["Bitcoin Gold", " ", "BTG"], ["SmartCash", " ", "SMART"], ["Exchange Union", " ", "XUC"], ["Coinlancer", " ", "CL"], ["Cloud With Me", " ", "CLD"], ["Elements", " ", "ELM"], ["Eidoo", " ", "EDO"], ["ClearPoll", " ", "POLL"], ["iXledger", " ", "IXT"], ["Authorship Token", " ", "ATS"], ["Social", " ", "SCL"], ["ATLANT Token", " ", "ATL"], ["Metaverse", " ", "ETP"], ["Octanox", " ", "OTX"], ["DRP Utility", " ", "DRPU"], ["Neblio", " ", "NEBL"], ["Hackspace", " ", "HAC"], ["Car Taxi", " ", "CTX"], ["Elementrem", " ", "ELE"], ["Aeron", " ", "ARN"], ["SISA Token", " ", "SISA"], ["Student Coin", " ", "STU"], ["Indicoin", " ", "INDI"], ["BitCore", " ", "BTX"], ["Pillar", " ", "PLR"], ["Suretly", " ", "SUR"], ["Ethos", " ", "BQX"],
    // ["IdontKnow"," ","ITS"],
    ["MicroMoney", " ", "AMM"], ["DubaiCoin", " ", "DBIX"], ["Presearch", " ", "PRE"], ["Kubera", " ", "KBR"], ["TBOT", " ", "TBT"], ["EROSCOIN", " ", "ERO"], ["SMSCoin", " ", "SMS"], ["Zap", " ", "ZAP"], ["DOVU", " ", "DOV"], ["Farad", " ", "FRD"], ["Open Trading Network", " ", "OTN"], ["HSHARE", " ", "HSR"], ["EthLend", " ", "LEND"], ["WarCoin", " ", "WRC"], ["LockChain", " ", "LOC"], ["SwftCoin", " ", "SWFTC"], ["STORM", " ", "STORM"], ["DIMCOIN", " ", "DIM"], ["NAGA", " ", "NGC"], ["Monaco", " ", "MCO"], ["Decentraland", " ", "MANA"], ["EtherEcash", " ", "ECH"], ["DATA", " ", "DATA"], ["United Traders Token", " ", "UTT"], ["Komodo", " ", "KMD"], ["Qtum", " ", "QTUM"], ["EchoLink", " ", "EKO"], ["AdEx", " ", "ADX"], ["Trade Token", " ", "TIO"], ["IdontKnow", " ", "WAX"], ["UltimateCoin", " ", "ULTC"], ["Energy Eco Token", " ", "EET"], ["Crypto20", " ", "C20"], ["indaHash", " ", "IDH"], ["InsurePal", " ", "IPL"], ["Covesting", " ", "COV"], ["Sentinel", " ", "SENT"], ["SmartMesh", " ", "SMT"], ["W3coin", " ", "W3C"], ["Cashaa", " ", "CAS"], ["Chat", " ", "CHAT"], ["GreenMed", " ", "GRMD"], ["Animation Vision Cash", " ", "AVH"], ["Peculium", " ", "PCL"], ["Clout", " ", "CLOUT"], ["Utrust", " ", "UTK"], ["SwissBorg", " ", "CHSB"], ["Neumark", " ", "NEU"], ["Lamden", " ", "TAU"], ["Teky", " ", "MEK"], ["Titanium Blockchain", " ", "BAR"], ["FLIP token", " ", "FLP"], ["PlaykeyToken", " ", "PKT"], ["Wolk", " ", "WLK"], ["Envion", " ", "EVN"], ["Castle Peak", " ", "CPG"], ["BetterBetting", " ", "BETR"], ["IdontKnow", " ", "ARCT"], ["DecentBet", " ", "DBET"], ["Bit Public Talent Network", " ", "BPTN"], ["Bezop", " ", "BEZ"], ["Universa", " ", "UTNP"], ["Career Trust Ecosystem", " ", "CTE"], ["COPYTRACK", " ", "CPY"], ["BlockMason", " ", "BCPT"], ["SONM", " ", "SNM"], ["Achain", " ", "ACT"], ["LIFEtoken", " ", "LIFE"]];

    return {
        HITBTC: HITBTC
    };
}();

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var HUOBI = [["SwftCoin", "swftcbtc", "SWFTC"], ["Everex", "evxbtc", "EVX"], ["Bitcoin Cash", "bchbtc", "BCH"], ["Time New Bank", "tnbbtc", "TNB"], ["Streamr", "datbtc", "DAT"], ["LinkEye", "letbtc", "LET"], ["Status Network Token", "sntbtc", "SNT"], ["WePower Network", "wprbtc", "WPR"], ["UTRUST", "utkbtc", "UTK"], ["Super Bitcoin", "sbtcbtc", "SBTC"], ["Monaco", "mcobtc", "MCO"], ["QunQun", "qunbtc", "QUN"], ["WAX", "waxbtc", "WAX"], ["Neo", "neobtc", "NEO"], ["Salt", "saltbtc", "SALT"], ["Bytom", "btmbtc", "BTM"], ["EchoLink", "ekobtc", "EKO"], ["Appcoins", "appcbtc", "APPC"], ["CometCoin", "cmtbtc", "CMT"], ["Request Network", "reqbtc", "REQ"], ["ICON", "icxbtc", "ICX"], ["Odyssey", "ocnbtc", "OCN"], ["Zcash", "zecbtc", "ZEC"], ["All Sports", "socbtc", "SOC"], ["ælf", "elfbtc", "ELF"], ["DeepBrain Chain", "dbcbtc", "DBC"], ["PowerLedger", "powrbtc", "POWR"], ["DATA", "dtabtc", "DTA"], ["SunContract", "sncbtc", "SNC"], ["CoinMeet", "meebtc", "MEE"], ["Nebulas", "nasbtc", "NAS"], ["EOS", "eosbtc", "EOS"], ["IOST", "iostbtc", "IOST"], ["Raiden Network Token", "rdnbtc", "RDN"], ["Lunyr", "lunbtc", "LUN"], ["Genaro Network", "gnxbtc", "GNX"], ["Elastos", "elabtc", "ELA"], ["BitcoinX", "bcxbtc", "BCX"], ["SmartMesh", "smtbtc", "SMT"], ["ITC", "itcbtc", "ITC"], ["OmiseGO", "omgbtc", "OMG"], ["STK token", "stkbtc", "STK"], ["MediShares", "mdsbtc", "MDS"], ["AdEx", "adxbtc", "ADX"], ["Ethereum Classic", "etcbtc", "ETC"], ["KyberNetworkCrystal", "kncbtc", "KNC"], ["Civic", "cvcbtc", "CVC"], ["Bitcoin Gold", "btgbtc", "BTG"], ["EduCoin", "edubtc", "EDU"], ["METAL", "mtlbtc", "MTL"], ["Waykichain", "wiccbtc", "WICC"], ["ChainLink", "linkbtc", "LINK"], ["Dash", "dashbtc", "DASH"], ["Tierion", "tntbtc", "TNT"], ["Theta", "thetabtc", "THETA"], ["Decentraland", "manabtc", "MANA"], ["Ripple", "xrpbtc", "XRP"], ["Bitcoin Diamond", "bcdbtc", "BCD"], ["Huobi Token", "htbtc", "HT"], ["Ripio Credit Network", "rcnbtc", "RCN"], ["Bluzelle", "blzbtc", "BLZ"], ["TenX Pay Token", "paybtc", "PAY"], ["Sirin Labs", "srnbtc", "SRN"], ["Bitcoin File", "bifibtc", "BIFI"], ["Achain", "actbtc", "ACT"], ["Simple Token", "ostbtc", "OST"], ["Storj", "storjbtc", "STORJ"], ["HSHARE", "hsrbtc", "HSR"], ["VeChain", "venbtc", "VEN"], ["Golem", "gntbtc", "GNT"], ["TRON", "trxbtc", "TRX"], ["Zilliqa", "zilbtc", "ZIL"], ["Lisk", "lskbtc", "LSK"], ["Litecoin", "ltcbtc", "LTC"], ["Yee", "yeebtc", "YEE"], ["Ruff", "ruffbtc", "RUFF"], ["AirSwap", "astbtc", "AST"], ["Digix DAO", "dgdbtc", "DGD"], ["0x", "zrxbtc", "ZRX"], ["Ethereum", "ethbtc", "ETH"], ["Enigma", "engbtc", "ENG"], ["Red Pulse", "rpxbtc", "RPX"], ["Matryx", "mtxbtc", "MTX"], ["AIDOC", "aidocbtc", "AIDOC"], ["Qtum", "qtumbtc", "QTUM"], ["Quantstamp", "qspbtc", "QSP"], ["Basic Attention Token", "batbtc", "BAT"], ["QASH", "qashbtc", "QASH"], ["NEM", "xembtc", "XEM"], ["Gas", "gasbtc", "GAS"], ["Medicalchain", "mtnbtc", "MTN"], ["Chat", "chatbtc", "CHAT"], ["ZILLA", "zlabtc", "ZLA"], ["Topchain", "topcbtc", "TOPC"], ["Propy", "propybtc", "PROPY"]];

    return {
        HUOBI: HUOBI
    };
}();

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var KRAKEN = [['Bitcoin', 'XXBTZUSD', 'BTC'], ['Bitcoin Cash', 'BCHXBT', 'BCH'], ['Dash', 'DASHXBT', 'DASH'], ['EOS', 'EOSXBT', 'EOS'], ['Gnosis', 'GNOXBT', 'GNO'], ['Ethereum Classic', 'ETCXBT', 'ETC'], ['Ethereum', 'ETHXBT', 'ETH'], ['Iconomi', 'ICNXBT', 'ICN'], ['Litecoin', 'LTCXBT', 'LTC'], ['Melon', 'MLNXBT', 'MLN'], ['Augur', 'REPXBT', 'REP'], ['Dogecoin', 'XDGXBT', 'DGB'], ['Lumen', 'XLMXBT', 'XLM'], ['Monero', 'XMRXBT', 'XMR'], ['Ripple', 'XRPXBT', 'XRP'], ['Zcash', 'ZECXBT', 'ZEC']];

    return {
        KRAKEN: KRAKEN
    };
}();

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 13/02/2018.
 */

module.exports = function () {

    var KUCOIN = [["Ethereum", " ", "ETH"], ["Neo", " ", "NEO"], ["Odyssey", " ", "OCN"], ["Fortuna", " ", "FOTA"], ["Covesting", " ", "COV"], ["CoinMeet", " ", "MEE"], ["Zeepin", " ", "ZPT"], ["Hacken", " ", "HKN"], ["LOCIcoin", " ", "LOCI"], ["Restart Energy", " ", "MWAT"], ["THEKEY", " ", "TKY"], ["Trinity Network Credit", " ", "TNC"], ["Nano", " ", "XRB"], ["aXpire", " ", "AXP"], ["CoinFi", " ", "COFI"], ["CargoX", " ", "CXO"], ["Iungo", " ", "ING"], ["KuCoin Shares", " ", "KCS"], ["Medicalchain", " ", "MTN"], ["Pareto Network", " ", "PARETO"], ["Telcoin", " ", "TEL"], ["adbank", " ", "ADB"], ["BOScoin", " ", "BOS"], ["Hawala.Today", " ", "HAT"], ["High Performance Blockchain", " ", "HPB"], ["IOStoken", " ", "IOST"], ["Block Array", " ", "ARY"], ["DeepBrain Chain", " ", "DBC"], ["Selfkey", " ", "KEY"], ["Red Pulse", " ", "RPX"], ["carVertical", " ", "CV"], ["Dragonchain", " ", "DRGN"], ["Litecoin", " ", "LTC"], ["QLINK", " ", "QLC"], ["Trade Token", " ", "TIO"], ["Centra", " ", "CTR"], ["SingularityNET", " ", "AGI"], ["Dent", " ", "DENT"], ["Catcoin", " ", "CAT"], ["Achain", " ", "ACT"], ["Bitcoin Cash", " ", "BCH"], ["CanYaCoin", " ", "CAN"], ["EOS", " ", "EOS"], ["Ethereum Classic", " ", "ETC"], ["Gas", " ", "GAS"], ["Dash", " ", "DASH"], ["GeneChain", " ", "DNA"], ["eBTC", " ", "EBTC"], ["Oyster", " ", "PRL"], ["UTRUST", " ", "UTK"], ["Change", " ", "CAG"], ["Bounty0x", " ", "BNTY"], ["Elixir", " ", "ELIX"], ["Enjin Coin", " ", "ENJ"], ["Aigang", " ", "AIX"], ["VeChain", " ", "VEN"], ["Aion", " ", "AION"], ["Streamr", " ", "DAT"], ["Qtum", " ", "QTUM"], ["Walton", " ", "WTC"], ["DigiByte", " ", "DGB"], ["Snovio", " ", "SNOV"], ["Ambrosus", " ", "AMB"], ["Bitmark", " ", "BTM"], ["RChain", " ", "RHOC"], ["Solaris", " ", "XLR"], ["Asch", " ", "XAS"], ["Po.et", " ", "POE"], ["Unikoin Gold", " ", "UKG"], ["ClearPoll", " ", "POLL"], ["Flixx", " ", "FLIXX"], ["INS Ecosystem", " ", "INS"], ["OmiseGO", " ", "OMG"], ["TrueFlip", " ", "TFL"], ["EthLend", " ", "LEND"], ["KyberNetworkCrystal", " ", "KNC"], ["Bitcoin Diamond", " ", "BCD"], ["Everex", " ", "EVX"], ["LAToken", " ", "LA"], ["DeepOnion", " ", "ONION"], ["PowerLedger", " ", "POWR"], ["SONM", " ", "SNM"], ["Bitcoin Gold", " ", "BTG"], ["HSHARE", " ", "HSR"], ["Publica", " ", "PBL"], ["Modum", " ", "MOD"], ["Populous", " ", "PPT"], ["BlockMason", " ", "BCPT"], ["Genesis Vision", " ", "GVT"], ["Decision Token", " ", "HST"], ["Pura", " ", "PURA"], ["Status Network Token", " ", "SNT"], ["Substratum", " ", "SUB"], ["Neblio", " ", "NEBL"], ["Civic", " ", "CVC"], ["Monetha", " ", "MTH"], ["Stox", " ", "STX"], ["Nuls", " ", "NULS"], ["TenX Pay Token", " ", "PAY"], ["Raiden Network Token", " ", "RDN"], ["Request Network", " ", "REQ"], ["Quantstamp", " ", "QSP"], ["Black Hole Coin", " ", "BHC"]];

    return {
        KUCOIN: KUCOIN
    };
}();

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var LIQUI = [["Litecoin", " ", "LTC"], ["STEEM", " ", "STEEM"], ["Steem Dollars", " ", "SBD"], ["Dash", " ", "DASH"], ["DECENT", " ", "DCT"], ["Iconomi", " ", "ICN"], ["Ethereum", " ", "ETH"], ["ZCoin", " ", "XZC"], ["Golos", " ", "GOLOS"], ["Gbg", " ", "GBG"], ["Golem", " ", "GNT"], ["Wings DAO", " ", "WINGS"], ["Pluton", " ", "PLU"], ["vSlice", " ", "VSL"], ["Firstblood", " ", "1ST"], ["Waves", " ", "WAVES"], ["Incent", " ", "INCNT"], ["Melon", " ", "MLN"], ["Chronobank", " ", "TIME"], ["Augur", " ", "REP"], ["Edgeless", " ", "EDG"], ["iEx.ec", " ", "RLC"], ["Trustcoin", " ", "TRST"], ["Gnosis", " ", "GNO"], ["Guppy", " ", "GUP"], ["Token-as-a-Service", " ", "TAAS"], ["Lunyr", " ", "LUN"], ["TokenCard", " ", "TKN"], ["Humaniq", " ", "HMQ"], ["Aragon", " ", "ANT"], ["Basic Attention Token", " ", "BAT"], ["Quantum Resistant Ledger", " ", "QRL"], ["Bancor", " ", "BNT"], ["MobileGo", " ", "MGO"], ["Mysterium", " ", "MYST"], ["SingularDTV", " ", "SNGLS"], ["Patientory", " ", "PTOY"], ["Cofound.it", " ", "CFI"], ["SONM", " ", "SNM"], ["Status Network Token", " ", "SNT"], ["Monaco", " ", "MCO"], ["Storj", " ", "STORJ"], ["AdEx", " ", "ADX"], ["EOS", " ", "EOS"], ["TenX Pay Token", " ", "PAY"], ["Sphre", " ", "XID"], ["OmiseGO", " ", "OMG"], ["Santiment", " ", "SAN"], ["Qtum", " ", "QTUM"], ["Civic", " ", "CVC"], ["NetCoin", " ", "NET"], ["Digix DAO", " ", "DGD"], ["OpenANX", " ", "OAX"], ["Bitcoin Cash", " ", "BCC"], ["district0x", " ", "DNT"], ["Stox", " ", "STX"], ["0x", " ", "ZRX"], ["Tierion", " ", "TNT"], ["Aeternity", " ", "AE"], ["VeChain", " ", "VEN"], ["Black Moon", " ", "BMC"], ["Decentraland", " ", "MANA"], ["Propy", " ", "PRO"], ["KyberNetworkCrystal", " ", "KNC"], ["Salt", " ", "SALT"], ["Indorse Token", " ", "IND"], ["TRON", " ", "TRX"], ["Enigma", " ", "ENG"], ["AirSwap", " ", "AST"], ["Request Network", " ", "REQ"], ["Neumark", " ", "NEU"], ["SIRIN LABS Token", " ", "SRN"], ["INS Ecosystem", " ", "INS"], ["Aion", " ", "AION"], ["WePower", " ", "WPR"], ["Republic Protocol", " ", "REN"]];
    return {
        LIQUI: LIQUI
    };
}();

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

module.exports = function () {

    var LIVECOIN = [["Bancor", "", "BNT"], ["Groestlcoin", "", "GRS"], ["Peerplays", "", "PPY"], ["Bata", "", "BTA"], ["Status", "", "SNT"], ["Chronologic", "", "DAY"], ["LeoCoin", "", "LEO"], ["Artemine", "", "ARTE"], ["VeriCoin", "", "VRC"], ["Obits", "", "OBITS"], ["Espers", "", "ESP"], ["Waves", "", "WAVES"], ["ItiCoin", "", "ITI"], ["SoarCoin", "", "SOAR"], ["WiCoin", "", "WIC"], ["LatiumX", "", "LATX"], ["Iconomi", "", "ICN"], ["Shift", "", "SHIFT"], ["Opendollar", "", "OD"], ["Peercoin", "", "PPC"], ["TRON", "", "TRX"], ["Transfercoin", "", "TX"], ["Rialto", "", "XRL"], ["Token-as-a-Service", "", "TAAS"], ["ReeCoin", "", "REE"], ["Reciprocation", "", "ECHO"], ["Paragon", "", "PRG"], ["WeTrust", "", "TRST"], ["Metal", "", "MTL"], ["FUNCOIN", "", "FUNC"], ["GOAL Bonanza", "", "GOAL"], ["ETHEREUM PLUS", "", "ETHP"], ["CCBrother", "", "CBR"], ["Monaco", "", "MCO"], ["Sibcoin", "", "SIB"], ["CryCash", "", "CRC"], ["Rubies", "", "RBIES"], ["Enjin Coin", "", "ENJ"], ["HellenicCoin", "", "HNC"], ["EventChain", "", "EVC"], ["IPBC", "", "IPBC"], ["Golem", "", "GNT"], ["FuBi", "", "FU"], ["Spectrecoin", "", "XSPEC"], ["AllSafe", "", "ASAFE2"], ["B2BX", "", "B2B"], ["Decision Token", "", "HST"], ["Moin", "", "MOIN"], ["VEROS", "", "VRS"], ["SolarCoin", "", "SLR"], ["VeChain", "", "VEN"], ["BioCoin", "", "BIO"], ["SysCoin", "", "SYS"], ["BitSend", "", "BSD"], ["OTN", "", "OTN"], ["TrumpCoin", "", "TRUMP"], ["Noku EUR", "", "EURN"], ["CommodityAdNetworkToken", "", "CDX"], ["Oxycoin", "", "OXY"], ["Escroco", "", "ESC"], ["Voise", "", "VOISE"], ["DOLLAR Online", "", "DOLLAR"], ["FirstBlood", "", "FIRSTBLOOD"], ["SwissBorg", "", "CHSB"], ["ArtexCoin", "", "ATX"], ["BlackCoin", "", "BLK"], ["CLP Token", "", "CLPC"], ["Novacoin", "", "NVC"], ["Eternity", "", "ENT"], ["Bricktox", "", "XBT"], ["Qtum", "", "QTUM"], ["Edgeless", "", "EDG"], ["Chronobank", "", "TIME"], ["Dimecoin", "", "DIME"], ["KAPU", "", "KAPU"], ["Fincoin", "", "FNC"], ["NEO", "", "NEO"], ["Bit Public Talent Network", "", "BPTN"], ["Namecoin", "", "NMC"], ["Gold Reward Token", "", "GRX"], ["DigixDAO", "", "DGD"], ["Adelphoi Coin", "", "ADL"], ["Zilbercoin", "", "ZBC"], ["BITPARK COIN", "", "BPC"], ["Rawcoin", "", "XRC"], ["MonaCoin", "", "MONA"], ["Dynamic Trading Rights", "", "DTR"], ["EROSCOIN", "", "ERO"], ["EOS", "", "EOS"], ["Waves EncryptoTel", "", "WETT"], ["GOLOS", "", "GOLOS"], ["CloakCoin", "", "CLOAK"], ["VeriumReserve", "", "VRM"], ["Aragon", "", "ANT"], ["Minexcoin", "", "MNX"], ["Viberate", "", "VIB"], ["Dash", "", "DASH"], ["MobileGo", "", "MGO"], ["KickCoin", "", "KICK"], ["IFAN", "", "IFAN"], ["VaultCoin", "", "VLTC"], ["Melon", "", "MLN"], ["Quantum", "", "QAU"], ["FunFair", "", "FUN"], ["CryptoCarbon", "", "CCRB"], ["Ethereum", "", "ETH"], ["Spacoin", "", "SPA"], ["Bitcoin Cash", "", "BCH"], ["TrueFlip", "", "TFL"], ["TheWallcoin", "", "TWC"], ["0x", "", "ZRX"], ["indaHash Coin", "", "IDH"], ["PiplCoin", "", "PIPL"], ["GoldBlocks", "", "GB"], ["View.ly", "", "VIEW"], ["Doge", "", "DOGE"], ["BitShares", "", "BTS"], ["Monero", "", "XMR"], ["UNCoin", "", "UNC"], ["ARK", "", "ARK"], ["DigiByte", "", "DGB"], ["Minereum", "", "MNE"], ["Storj", "", "STORJ"], ["Augur", "", "REP"], ["ModulTrade", "", "MTRC"], ["Xaurum", "", "XAUR"], ["Creditbit", "", "CRBIT"], ["vSlice", "", "VSL"], ["PINCOIN", "", "PIN"], ["CrevaCoin", "", "CREVA"], ["Gnosis", "", "GNO"], ["LunaCoin", "", "LUNA"], ["Capricoin", "", "CPC"], ["PHI Token", "", "PHI"], ["Diamond", "", "DMD"], ["Matchpool", "", "GUP"], ["BlueCoin", "", "BLU"], ["PutinCoin", "", "PUT"], ["Litecoin", "", "LTC"], ["First Bitcoin", "", "BIT"], ["Universal Royal Coin", "", "UNRC"], ["Kyber Network", "", "KNC"], ["DrAgoNCoin", "", "DANC"], ["Ethos", "", "ETHOS"], ["Dignity", "", "DIG"], ["InsaneCoin", "", "INSN"], ["TerraNova", "", "TER"], ["Karbo", "", "KRB"], ["Elcoin", "", "EL"], ["Stratis", "", "STRAT"], ["Populous", "", "PPT"], ["Cloud", "", "CLD"], ["Flixx", "", "FLIXX"], ["MicroMoney", "", "AMM"], ["Mojocoin", "", "MOJO"], ["Namaste", "", "NAM"], ["ArcticCoin", "", "ARC"], ["ATMChain", "", "ATM"], ["E-Dinar Coin", "", "EDR"], ["SingularDTV", "", "SNGLS"], ["JOYREUM", "", "JOY"], ["ECOMCASH", "", "ECIO"], ["Civic", "", "CVC"], ["Avoncoin", "", "ACN"], ["WINGS DAO", "", "WINGS"], ["PIVXCoin", "", "PIVX"], ["DynamicCoin", "", "DMC"], ["Adzcoin", "", "ADZ"], ["Macro", "", "MCR"], ["TokenCard", "", "TKN"], ["GongYiCoin", "", "GYC"], ["Uquid Coin", "", "UQC"], ["Nitro", "", "NOX"], ["OmiseGO", "", "OMG"], ["Hive token", "", "HVN"], ["InsurePal token", "", "IPL"], ["ESR token", "", "ESR"], ["President Trump", "", "PRES"], ["Ethereum EncryptoTel", "", "EETT"], ["Ultimate Secure Cash", "", "USC"], ["iExec RLC", "", "RLC"], ["Ormeus Coin", "", "ORME"], ["Noku Master Token", "", "NOKU"], ["Nxt", "", "NXT"], ["Sumokoin", "", "SUMO"], ["Lisk", "", "LSK"], ["CureCoin", "", "CURE"], ["PostCoin", "", "POST"], ["Emercoin", "", "EMC"], ["Robomed Network Token", "", "RBM"], ["Yocoin", "", "YOC"], ["Moonstone DAC", "", "XMS"], ["TechShares", "", "THS"], ["NEM", "", "XEM"], ["KeplerShares", "", "KPL"], ["Incent", "", "INCNT"], ["GameCredits", "", "GAME"], ["Master Swiscoin", "", "MSCN"], ["Ambrosus", "", "AMB"], ["SportyFi", "", "SPF"], ["SexCoin", "", "SXC"], ["Orectic", "", "ORE"], ["BitBar", "", "BTB"], ["LandCoin", "", "LDC"], ["ICOS", "", "ICOS"], ["FLIP token", "", "FLP"], ["RouletteCoin", "", "RLT"], ["Honor", "", "HNR"], ["Burst", "", "BURST"], ["Propy", "", "PRO"], ["Dubaicoin", "", "DBIX"], ["Basic Attention Token", "", "BAT"], ["Covesting", "", "COV"], ["TenX", "", "PAY"], ["42-coin", "", "FORTYTWO"], ["Polybius Token", "", "PLBT"], ["StakeNet", "", "XSN"]];

    return {
        LIVECOIN: LIVECOIN
    };
}();

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

module.exports = function () {

    var POLONIEX = [["Bytecoin", " ", "BCN"], ["Bela Legacy", " ", "BELA"], ["BlackCoin", " ", "BLK"], ["BitcoinDark", " ", "BTCD"], ["Bitmark", " ", "BTM"], ["BitShares", " ", "BTS"], ["Burst", " ", "BURST"], ["CLAMS", " ", "CLAM"], ["Dash", " ", "DASH"], ["DigiByte", " ", "DGB"], ["Dogecoin", " ", "DOGE"], ["Einsteinium", " ", "EMC2"], ["FoldingCoin", " ", "FLDC"], ["Florincoin", " ", "FLO"], ["GameCredits", " ", "GAME"], ["Gridcoin Research", " ", "GRC"], ["Huntercoin", " ", "HUC"], ["Litecoin", " ", "LTC"], ["MaidSafeCoin", " ", "MAID"], ["Omni", " ", "OMNI"], ["NAVCoin", " ", "NAV"], ["Neoscoin", " ", "NEOS"], ["Namecoin", " ", "NMC"], ["NXT", " ", "NXT"], ["Pinkcoin", " ", "PINK"], ["PotCoin", " ", "POT"], ["Peercoin", " ", "PPC"], ["Riecoin", " ", "RIC"], ["Stellar", " ", "STR"], ["Syscoin", " ", "SYS"], ["Viacoin", " ", "VIA"], ["Vcash", " ", "XVC"], ["VeriCoin", " ", "VRC"], ["Vertcoin", " ", "VTC"], ["BitcoinPlus", " ", "XBC"], ["Counterparty", " ", "XCP"], ["NEM", " ", "XEM"], ["Monero", " ", "XMR"], ["Primecoin", " ", "XPM"], ["Ripple", " ", "XRP"], ["Ethereum", " ", "ETH"], ["Siacoin", " ", "SC"], ["BitCrystals", " ", "BCY"], ["Expanse", " ", "EXP"], ["Factom", " ", "FCT"], ["Radium", " ", "RADS"], ["Synereo AMP", " ", "AMP"], ["Decred", " ", "DCR"], ["Lisk", " ", "LSK"], ["LBRY Credits", " ", "LBC"], ["STEEM", " ", "STEEM"], ["Steem Dollars", " ", "SBD"], ["Ethereum Classic", " ", "ETC"], ["Augur", " ", "REP"], ["Ardor", " ", "ARDR"], ["Zcash", " ", "ZEC"], ["Stratis", " ", "STRAT"], ["Nexium", " ", "NXC"], ["PascalCoin", " ", "PASC"], ["Golem", " ", "GNT"], ["Gnosis", " ", "GNO"], ["Bitcoin Cash", " ", "BCH"], ["0x", " ", "ZRX"], ["Civic", " ", "CVC"], ["OmiseGO", " ", "OMG"], ["Gas", " ", "GAS"], ["Storj", " ", "STORJ"]];

    return {
        POLONIEX: POLONIEX
    };
}();

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 17/03/2018.
 */

module.exports = function () {

    var TUXEXCHANGE = [["Litecoin", " ", "LTC"], ["Dogecoin", " ", "DOGE"], ["EmerCoin", " ", "EMC"], ["Ethereum", " ", "ETH"], ["Decred", " ", "DCR"], ["Dash", " ", "DASH"], ["Peercoin", " ", "PPC"], ["Monero", " ", "XMR"], ["PotCoin", " ", "POT"], ["Zcash", " ", "ZEC"], ["Namecoin", " ", "NMC"], ["BlackCoin", " ", "BLK"], ["Syscoin", " ", "SYS"], ["Counterparty", " ", "XCP"], ["Pepe Cash", " ", "PEPECASH"], ["Databits", " ", "DTB"], ["BitCrystals", " ", "BCY"], ["Golem", " ", "GNT"], ["Iconomi", " ", "ICN"]];

    return {
        TUXEXCHANGE: TUXEXCHANGE
    };
}();

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 02/02/2018.
 */

var constModule = __webpack_require__(450);
var request = __webpack_require__(10);

module.exports = function () {

    var requestFormat = [{
        key: '24',
        url: constModule.url.REST_URL_COIN_TIME_24_HOURS,
        request: request.fetchRequestForGettingTheNames,
        secondUrl: constModule.url.REST_URL_USD_AND_EUR_FROM_COINBASE,
        multiRequests: request.multipleRequests
    }];

    return {
        requestFormat: requestFormat
    };
}();

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 17/02/2018.
 */

module.exports = function () {

    var vars = {
        int: {
            totalPriceOfTheCoinsAtTheBeginning: 0,
            totalPriceOfTheCoinsAtNow: 0

        },
        arrays: {
            nameOfTheCoins: [],
            realPercentageOfCoinsAtTheStart: [],
            realPercentageNowOfTheCoins: [],
            listOfCoinsToSelectOut: [],
            randomColors: [],
            dataForNormalGraph: [],
            newArrayOfCoinInfo: [],
            testRealPercentage: [],
            nameOfTheCoinsNow: [],
            nameOfTheCoinsAtTheBeginning: []
        },
        string: {
            titleOfTheGraph: '',
            CoinNameForGraph: '',
            normalChart: '',
            currencyBigStockChart: '',
            shortNameBigStockChart: '',
            StockChart: ''
        },
        boolean: {
            BTC_GRAPH: false,
            EUR_GRAPH: false,
            USD_GRAPH: false
        }
    };

    return {
        vars: vars
    };
}();

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 18/02/2018.
 */

module.exports = function () {

    var makeTheRightOneActiveInTheModal = function makeTheRightOneActiveInTheModal(timeGraph) {
        var $selector = void 0;
        var message = '';
        switch (timeGraph) {
            case '24':
                $selector = "24HM";
                break;
            case '48':
                $selector = "48HM";
                break;
            case '120':
                $selector = "120HM";
                break;
            case '168':
                $selector = "168HM";
                message = 'Loading..';
                break;
            case '336':
                $selector = "336HM";
                message = 'Loading..';
                break;
            case '744':
                $selector = "744HM";
                message = 'Loading..';
                break;
        }
        var findtheSelected = $('.modal-body .pagination').find('.active');
        findtheSelected.removeClass('active');
        $('#' + $selector).addClass('active');
    };

    return {
        makeTheRightOneActiveInTheModal: makeTheRightOneActiveInTheModal
    };
}();

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by svend on 27/04/2018.
 */

var exchangeModule = __webpack_require__(137);
var newCoinVars = __webpack_require__(139);
var generateHTMLForNewCoins = __webpack_require__(135);
var orderTheCoin = __webpack_require__(453);

module.exports = function () {
    var allNewCoins = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(continueOrNot) {
            var data, controleData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            data = [];
                            controleData = void 0;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 5;
                            _iterator = exchangeModule.exchangeForNames[Symbol.iterator]();

                        case 7:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 41;
                                break;
                            }

                            item = _step.value;

                            item = item.getNamesForList;

                            if (!(item.needReq === true)) {
                                _context.next = 36;
                                break;
                            }

                            if (!(item.req.multi === true)) {
                                _context.next = 17;
                                break;
                            }

                            _context.next = 14;
                            return item.req.fun([item.req.url.url1, item.req.url.url2]);

                        case 14:
                            controleData = _context.sent;
                            _context.next = 20;
                            break;

                        case 17:
                            _context.next = 19;
                            return item.req.fun(item.req.url.url1);

                        case 19:
                            controleData = _context.sent;

                        case 20:
                            if (!(controleData === null || controleData[0] === null || controleData[1] === null)) {
                                _context.next = 32;
                                break;
                            }

                            if (!(item.req.multi === true)) {
                                _context.next = 27;
                                break;
                            }

                            _context.next = 24;
                            return item.req.fun([item.req.url.url1, item.req.url.url2]);

                        case 24:
                            controleData = _context.sent;
                            _context.next = 30;
                            break;

                        case 27:
                            _context.next = 29;
                            return item.req.fun(item.req.url.url1);

                        case 29:
                            controleData = _context.sent;

                        case 30:
                            _context.next = 34;
                            break;

                        case 32:
                            _context.next = 34;
                            return item.newNames(controleData);

                        case 34:
                            _context.next = 38;
                            break;

                        case 36:
                            _context.next = 38;
                            return item.newNames();

                        case 38:
                            _iteratorNormalCompletion = true;
                            _context.next = 7;
                            break;

                        case 41:
                            _context.next = 47;
                            break;

                        case 43:
                            _context.prev = 43;
                            _context.t0 = _context['catch'](5);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 47:
                            _context.prev = 47;
                            _context.prev = 48;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 50:
                            _context.prev = 50;

                            if (!_didIteratorError) {
                                _context.next = 53;
                                break;
                            }

                            throw _iteratorError;

                        case 53:
                            return _context.finish(50);

                        case 54:
                            return _context.finish(47);

                        case 55:
                            //console.log(newCoinVars.newCoinArray);
                            createABigObjectOfit(newCoinVars.newCoinArray, continueOrNot);

                        case 56:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[5, 43, 47, 55], [48,, 50, 54]]);
        }));

        return function allNewCoins(_x) {
            return _ref.apply(this, arguments);
        };
    }();

    function createABigObjectOfit(newCoins, continueOrNot) {
        var element = Object.keys(newCoins).map(function (el) {
            return Object.keys(newCoins[el][1]).map(function (element) {
                var longName = '';
                if (!(newCoins[el][1][element][0] === 'IdontKnow')) {
                    longName = newCoins[el][1][element][0];
                }
                return {
                    shortName: newCoins[el][1][element][2],
                    longName: longName,
                    exchanges: {
                        list: [newCoins[el][0]]
                    }
                };
            });
        });
        var newDataArrayOfNewCoins = [];
        for (var i = 0; i < element.length; i++) {
            for (var f = 0; f < element[i].length; f++) {
                newDataArrayOfNewCoins.push(element[i][f]);
            }
        }
        newDataArrayOfNewCoins = orderTheCoin.orderAlphaForShortName(newDataArrayOfNewCoins);
        localStorage.setItem("newCoins", JSON.stringify(newDataArrayOfNewCoins));
        if (continueOrNot) {
            generateHTMLForNewCoins.loadNewCoins();
        }
    }

    return {
        allNewCoins: allNewCoins
    };
}();

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 21/01/2018.
 */
__webpack_require__(168);
var initModule = __webpack_require__(133);
var hideIt = __webpack_require__(457);

var _module = function () {

    var serviceWorker = function serviceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./serviceWorker.js').then(function () {
                console.log('Service Worker Registered');
            });
        }
    };

    var init = function init() {
        serviceWorker();
        hideIt.startToHideIt();
    };

    return {
        init: init
    };
}();

var init = function init() {
    _module.init();
    var url = window.location.href;
    var moduleOfPage = initModule.htmlPages.find(function (el) {
        return 'http://localhost:8080/index.html'.indexOf(el.html) > 1;
    });
    moduleOfPage.init.init();
};

$(document).ready(init());

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(169);

__webpack_require__(366);

__webpack_require__(367);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(170);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(88);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(117);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(120);
__webpack_require__(122);
__webpack_require__(123);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(365);
module.exports = __webpack_require__(23);


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var META = __webpack_require__(31).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(51);
var setToStringTag = __webpack_require__(44);
var uid = __webpack_require__(34);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(100);
var wksDefine = __webpack_require__(68);
var enumKeys = __webpack_require__(171);
var isArray = __webpack_require__(54);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(24);
var createDesc = __webpack_require__(33);
var _create = __webpack_require__(38);
var gOPNExt = __webpack_require__(103);
var $GOPD = __webpack_require__(18);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(36);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(39).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(49).f = $propertyIsEnumerable;
  __webpack_require__(53).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(35)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(49);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(38) });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(102) });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(17);
var $getOwnPropertyDescriptor = __webpack_require__(18).f;

__webpack_require__(27)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(11);
var $getPrototypeOf = __webpack_require__(19);

__webpack_require__(27)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(36);

__webpack_require__(27)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(27)('getOwnPropertyNames', function () {
  return __webpack_require__(103).f;
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(27)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(27)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(27)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(27)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(27)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(27)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(104) });


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(187) });


/***/ }),
/* 187 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(72).set });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(50);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(14)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(105) });


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(19);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(107);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(108);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(16);
var cof = __webpack_require__(21);
var inheritIfRequired = __webpack_require__(74);
var toPrimitive = __webpack_require__(24);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(39).f;
var gOPD = __webpack_require__(18).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(45).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(38)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(14)(global, NUMBER, $Number);
}


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(26);
var aNumberValue = __webpack_require__(109);
var repeat = __webpack_require__(75);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(109);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(110) });


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(110);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(108);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(107);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(111);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(76);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(77);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(112) });


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(111) });


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(76) });


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(77);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(77);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(37);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(45)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(79)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(78)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(81);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(82)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(81);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(82)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(75)
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(81);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(82)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(15)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(15)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(15)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(15)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(15)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(15)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(15)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(15)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(15)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(15)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(15)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(15)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(15)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(24);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(249);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(14)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(13)(proto, TO_PRIMITIVE, __webpack_require__(252));


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(24);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(54) });


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(20);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var call = __webpack_require__(113);
var isArrayIter = __webpack_require__(83);
var toLength = __webpack_require__(9);
var createProperty = __webpack_require__(84);
var getIterFn = __webpack_require__(85);

$export($export.S + $export.F * !__webpack_require__(56)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(84);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(48) != Object || !__webpack_require__(22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(71);
var cof = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(28)(0);
var STRICT = __webpack_require__(22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(54);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(28)(1);

$export($export.P + $export.F * !__webpack_require__(22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(28)(2);

$export($export.P + $export.F * !__webpack_require__(22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(28)(3);

$export($export.P + $export.F * !__webpack_require__(22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(28)(4);

$export($export.P + $export.F * !__webpack_require__(22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(114);

$export($export.P + $export.F * !__webpack_require__(22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(114);

$export($export.P + $export.F * !__webpack_require__(22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(52)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(9);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(115) });

__webpack_require__(32)('copyWithin');


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(87) });

__webpack_require__(32)('fill');


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(28)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(32)(KEY);


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(28)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(32)(KEY);


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40)('Array');


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(74);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(39).f;
var isRegExp = __webpack_require__(55);
var $flags = __webpack_require__(57);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(14)(global, 'RegExp', $RegExp);
}

__webpack_require__(40)('RegExp');


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(117);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(57);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(14)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(58)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(58)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(58)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(58)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(55);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var global = __webpack_require__(2);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(50);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(12);
var anInstance = __webpack_require__(41);
var forOf = __webpack_require__(42);
var speciesConstructor = __webpack_require__(59);
var task = __webpack_require__(89).set;
var microtask = __webpack_require__(90)();
var newPromiseCapabilityModule = __webpack_require__(91);
var perform = __webpack_require__(118);
var promiseResolve = __webpack_require__(119);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(43)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(44)($Promise, PROMISE);
__webpack_require__(40)(PROMISE);
Wrapper = __webpack_require__(23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(56)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(124);
var validate = __webpack_require__(47);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(60)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(61);
var buffer = __webpack_require__(92);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(59);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(40)(ARRAY_BUFFER);


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(61).ABV, {
  DataView: __webpack_require__(92).DataView
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(38);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(105);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(24);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(18).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(80)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(19);
var has = __webpack_require__(16);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(18);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(19);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(126) });


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(19);
var has = __webpack_require__(16);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(33);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(72);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(52)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(32)('includes');


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(127);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var aFunction = __webpack_require__(12);
var arraySpeciesCreate = __webpack_require__(86);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(32)('flatMap');


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(127);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var toInteger = __webpack_require__(26);
var arraySpeciesCreate = __webpack_require__(86);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(32)('flatten');


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(78)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(128);
var userAgent = __webpack_require__(93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(128);
var userAgent = __webpack_require__(93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(45)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(45)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(25);
var toLength = __webpack_require__(9);
var isRegExp = __webpack_require__(55);
var getFlags = __webpack_require__(57);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(80)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68)('asyncIterator');


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68)('observable');


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(126);
var toIObject = __webpack_require__(17);
var gOPD = __webpack_require__(18);
var createProperty = __webpack_require__(84);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(129)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(129)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(62), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(62), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(24);
var getPrototypeOf = __webpack_require__(19);
var getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(62), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(24);
var getPrototypeOf = __webpack_require__(19);
var getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(62), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(130)('Map') });


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(130)('Set') });


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(63)('Map');


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(63)('Set');


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(63)('WeakMap');


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(63)('WeakSet');


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(64)('Map');


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(64)('Set');


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(64)('WeakMap');


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(64)('WeakSet');


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(21);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(132);
var fround = __webpack_require__(112);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(132) });


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(23);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(59);
var promiseResolve = __webpack_require__(119);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(91);
var perform = __webpack_require__(118);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(122);
var from = __webpack_require__(131);
var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(30);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(12);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(90)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(23);
var microtask = __webpack_require__(90)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(41);
var redefineAll = __webpack_require__(43);
var hide = __webpack_require__(13);
var forOf = __webpack_require__(42);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(40)('Observable');


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(93);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(89);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(88);
var getKeys = __webpack_require__(36);
var redefine = __webpack_require__(14);
var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(46);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)))

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(368);
module.exports = __webpack_require__(23).RegExp.escape;


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(369)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 369 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var loadAllCurrentCoins = __webpack_require__(371);
var loadAllNewCoins = __webpack_require__(135);
var doSearch = __webpack_require__(372);
var changeToNewOrAllCoins = __webpack_require__(373);
var add = __webpack_require__(374);
var generate = __webpack_require__(375);
var refresh = __webpack_require__(452);
var atTopLevel = __webpack_require__(454);
var showModal = __webpack_require__(455);
var updateGraphForLocalStorage = __webpack_require__(456);
// const createOneObjectWithAllCoins = require('./util/updateCoinList/createOneObjectWithAllCoins');

module.exports = function () {

    function showTheForm() {
        var $selShortName = $('#coin-info #the-sell-form .media-body .media-heading')[0].innerHTML;
        var $selLongName = $('#coin-info #the-sell-form .media-body p')[0].innerHTML;
        $('#coinName').val("shortName " + $selShortName + " longName " + $selLongName);
        $('.list-exchanges').hide();
        $('#gform').show();
    }

    function goBackToView() {
        $('.list-exchanges').show();
        $('#thankyou_message').hide();
    }

    function isOffline() {
        var $alert = $('.alert');
        if (window.navigator.onLine) {
            $alert.hide();
        } else {
            $alert.show();
        }
    }

    var init = function init() {
        $('.container #form-exchange').on('change keyup paste click', '#searchBar', doSearch.forACertainCoin);
        $('.container #header-all-new').on('click', '.navbar-brand', changeToNewOrAllCoins.andBack);
        $('.container').on('click', '.generateMoreHtml', add.moreCoins);
        $('.container').on('click', '.row', generate.theInfoForTheCertainCoin);
        $('.container').on('click', '.update-info', showTheForm);
        $('.container .get-back').on('click', goBackToView);
        $('.container #all-new-coins').on('click', '.refresh', refresh.theNewCoins);
        $('.container').on('click', '#get-chart', showModal.showModal);
        $('#show-more-graph .pagination').on('click', 'a', updateGraphForLocalStorage.getDataToUpdateChart);
        loadAllNewCoins.loadNewCoins();
        loadAllCurrentCoins.loadAllCoins();
        atTopLevel.controleAtTopLevel();
        window.addEventListener('offline', isOffline);
        window.addEventListener('online', isOffline);
        // createOneObjectWithAllCoins.createOneBigObject();
    };

    return {
        init: init
    };
}();

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 03/05/2018.
 */

var certainAmoutOfCoins = __webpack_require__(94);
var allCoinData = __webpack_require__(65);
var globalVars = __webpack_require__(96);

module.exports = function () {

    function loadAllCoins() {
        var value = certainAmoutOfCoins.toGenerate(allCoinData.allCoins, globalVars.var.counterAllCoins, 'a');
        globalVars.var.counterAllCoins = value.counter;
        $("#all-coins").html('\n        <h1 class="info-many-coins">Current ' + allCoinData.allCoins.length + ' coins available</h1>\n       ' + value.$resultaatString + '\n       <button class="btn btn-coinchecker load-more-all generateMoreHtml">Load more<i class="fas fa-fw fa-spinner"></i></button>');
    }

    return {
        loadAllCoins: loadAllCoins
    };
}();

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 03/05/2018.
 */

var allCoinData = __webpack_require__(65);
var loadTheNewCoins = __webpack_require__(66);
var GUIModule = __webpack_require__(95);

module.exports = function () {

    function forACertainCoin() {
        var searchData = $('#searchBar').val().toLowerCase();
        var foundData = void 0;
        if (searchData === " " || searchData === "") {
            if ($('#All').hasClass('active')) {
                $('#all-coins').show();
            } else {
                $('#all-new-coins').show();
            }
        } else {
            $('#search-items').show();
            if ($('#All').hasClass('active')) {
                $('#all-coins').hide();
                foundData = searchForAllCoins(searchData);
            } else {
                var coinData = loadTheNewCoins.getTheNewCoins();
                $('#all-new-coins').hide();
                foundData = searchForNewCoins(searchData, coinData);
            }
            var value = foundData.map(function (el) {
                return GUIModule.generateTheHTMLOfFullAndShortName(el, 0);
            });
            $("#search-items").html(generateTheHTML(foundData, value));
        }
    }

    function searchForAllCoins(searchData) {
        return allCoinData.allCoins.filter(function (el) {
            return el.longName.toLowerCase().indexOf(searchData) >= 0 || el.shortName.toLowerCase().indexOf(searchData) >= 0;
        });
    }

    function searchForNewCoins(searchData, coinData) {
        return coinData.filter(function (el) {
            return el.longName.toLowerCase().indexOf(searchData) >= 0 || el.shortName.toLowerCase().indexOf(searchData) >= 0;
        });
    }

    function generateTheHTML(foundData, value) {
        return '<div class="newInfo">\n                       <h1 class="info-many-coins">Current ' + foundData.length + ' coins</h1>\n                       <div class="refresh">\n                           <button type="button" class="btn btn-coinchecker"><i class="fas fa-fw fa-sync"></i></button>\n                       </div>\n                   </div>\n                   ' + value;
    }

    return {
        forACertainCoin: forACertainCoin
    };
}();

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 03/05/2018.
 */

module.exports = function () {

    function andBack() {
        var $selector = $(this);
        var id$selector = $selector.attr('id');
        var $all = $('#All');
        var $new = $('#New');
        var $allCoins = $('#all-coins');
        var $allNewCoins = $('#all-new-coins');
        $('#gform, #coin-info, #thankyou_message').hide();
        switch (id$selector) {
            case 'All':
                $new.removeClass('active');
                $allNewCoins.hide();
                $allCoins.show();
                break;
            case 'New':
                $all.removeClass('active');
                $allCoins.hide();
                $allNewCoins.show();
                break;
        }
        $('#' + id$selector).addClass('active');
    }

    return {
        andBack: andBack
    };
}();

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 18/02/2018.
 */

var certainAmoutOfCoins = __webpack_require__(94);
var allCoinData = __webpack_require__(65);
var globalVars = __webpack_require__(96);
var loadTheNewCoins = __webpack_require__(66);

module.exports = function () {

    function moreCoins() {
        $(this).remove();
        if ($('#All').hasClass('active')) {
            moreAllCoins();
        } else {
            moreNewCoins();
        }
    }

    function moreNewCoins() {
        var coinData = loadTheNewCoins.getTheNewCoins();
        var value = certainAmoutOfCoins.toGenerate(coinData, globalVars.var.counterNewCoins, 'n');
        globalVars.var.counterNewCoins = value.counter;
        $("#all-new-coins").append('\n           ' + value.$resultaatString + '\n           <button class="btn btn-coinchecker load-more-new generateMoreHtml">Load more<i class="fas fa-fw fa-spinner"></i></button>');
    }

    function moreAllCoins() {
        var value = certainAmoutOfCoins.toGenerate(allCoinData.allCoins, globalVars.var.counterAllCoins, 'a');
        globalVars.var.counterAllCoins = value.counter;
        $("#all-coins").append('\n           ' + value.$resultaatString + '\n           <button class="btn btn-coinchecker load-more-all generateMoreHtml">Load more<i class="fas fa-fw fa-spinner"></i></button>');
    }

    return {
        moreCoins: moreCoins
    };
}();

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 03/05/2018.
 */

var allCoinData = __webpack_require__(65);
var generateCoinInfo = __webpack_require__(376);
var loadTheNewCoins = __webpack_require__(66);
var generateRefreshHTML = __webpack_require__(97);

module.exports = function () {

    function theInfoForTheCertainCoin(e) {
        e.preventDefault();
        var $sel = $(this);
        var elNumber = $(this).attr('id');
        var $parent = $sel.parent();
        var allOrNew = $parent.attr('id') === 'all-coins';
        $parent.hide();
        $('#coin-info, .list-exchanges').show(generateRefreshHTML.generateRefreshHTML());
        var data = '';
        if (allOrNew) {
            elNumber = elNumber.replace('a', '');
            data = allCoinData.allCoins[elNumber];
        } else {
            elNumber = elNumber.replace('n', '');
            data = loadTheNewCoins.getTheNewCoins();
            data = data[elNumber];
        }
        generateCoinInfo.forOneCoin({
            coinData: data,
            allOrNew: allOrNew
        });
    }

    return {
        theInfoForTheCertainCoin: theInfoForTheCertainCoin
    };
}();

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by svend on 03/05/2018.
 */

var getImageNames = __webpack_require__(134);
var GUIModule = __webpack_require__(95);
var exchangeData = __webpack_require__(137);
var request = __webpack_require__(163);
var graph = __webpack_require__(451);

module.exports = function () {
    var forOneCoin = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
            var coinData, allOrNew, $resultaatString, htmlData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            coinData = data.coinData;
                            allOrNew = data.allOrNew;
                            _context.t0 = $('#the-sell-form');
                            _context.next = 5;
                            return createTopHTMLForSellForm(coinData);

                        case 5:
                            _context.t1 = _context.sent;

                            _context.t0.html.call(_context.t0, _context.t1);

                            $resultaatString = '\n            <h1>Available on:</h1>\n            <div>';
                            htmlData = generateHTML(getUrls(coinData));

                            Object.keys(htmlData).forEach(function (el) {
                                return $resultaatString += htmlData[el];
                            });
                            $resultaatString += "</div><button class='btn btn-coinchecker update-info'>Update info</button>";
                            if (!allOrNew) {
                                $resultaatString += "<p>Some info is missing!</p>";
                            }
                            $('.list-exchanges').html($resultaatString);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function forOneCoin(_x) {
            return _ref.apply(this, arguments);
        };
    }();

    var createTopHTMLForSellForm = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(coinData) {
            var longName, shortName, $resultaatString, the24Change, hist, requestFormat;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            longName = coinData.longName;
                            shortName = coinData.shortName;
                            $resultaatString = '\n            <div id="the-sell-form">\n                <div class="media-left">\n                    ' + GUIModule.controleImageName(longName, getImageNames.coinformatNames.find(function (el) {
                                return shortName === el.shortName;
                            }), shortName) + '\n                </div>\n                <div class="media-body">\n                    <h3 class="media-heading">' + longName + '</h3>\n                    <p>' + shortName + '</p>\n                </div>';
                            the24Change = void 0;
                            hist = void 0;

                            if (!window.navigator.onLine) {
                                _context2.next = 13;
                                break;
                            }

                            requestFormat = request.requestFormat.find(function (el) {
                                return el.key === '24';
                            });
                            _context2.next = 9;
                            return requestFormat.request(requestFormat.url.replace('{SYM}', shortName).replace('{TSYM}', 'BTC').replace('{time}', 24));

                        case 9:
                            the24Change = _context2.sent;

                            hist = the24Change.Data;
                            _context2.next = 14;
                            break;

                        case 13:
                            the24Change = {
                                Type: 92562
                            };

                        case 14:
                            if (!(the24Change.Type === 100)) {
                                _context2.next = 19;
                                break;
                            }

                            graph.create({
                                dataGraph: hist,
                                shortName: coinData.shortName,
                                longName: coinData.longName,
                                currency: "BTC"
                            });
                            return _context2.abrupt('return', $resultaatString += '\n                <div class="media-right">\n                   <button class="btn btn-coinchecker" id="get-chart">\n                        <i class="fas fa-fw fa-chart-line"></i>\n                   </button>\n                </div>\n            </div>\n            ');

                        case 19:
                            if (!(the24Change.Type === 92562)) {
                                _context2.next = 23;
                                break;
                            }

                            return _context2.abrupt('return', $resultaatString += '\n            <div class="media-right">\n                   <button class="btn btn-coinchecker disabled" id="get-chart">\n                        <i class="fas fa-fw fa-chart-line"></i>\n                   </button>\n                </div>\n            </div>');

                        case 23:
                            return _context2.abrupt('return', $resultaatString);

                        case 24:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function createTopHTMLForSellForm(_x2) {
            return _ref2.apply(this, arguments);
        };
    }();

    function getUrls(coinData) {
        return Object.keys(coinData.exchanges.list).map(function (key) {
            var data = exchangeData.exchangeForNames.find(function (el) {
                return el.key === coinData.exchanges.list[key];
            }).url;
            data.exchange = coinData.exchanges.list[key];
            data.shortName = coinData.shortName;
            return data;
        });
    }

    function generateHTML(urlData) {
        return urlData.map(function (el) {
            if (!el.isCapital) {
                el.shortName = el.shortName.toString().toLowerCase();
            }
            el.publicURL = el.publicURL.replace('{SHORTSYMBOL}', el.shortName);
            return createOneElement(el);
        });
    }

    function createOneElement(el) {
        return '\n            <div class="exchange-element">\n                <p>' + el.exchange + '</p>\n                <a class="btn btn-coinchecker" role="button" href="' + el.publicURL + '" target="_blank">Buy</a>\n            </div>\n            \n        ';
    }

    return {
        forOneCoin: forOneCoin
    };
}();

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(378);
var array = __webpack_require__(138);
var getNames = __webpack_require__(379);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var AdiosMarket = {

        key: 'AdiosMarket',
        name: 'AidosMarket',
        getNamesForList: {
            needReq: false,
            req: {
                url: {}
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.ADIOSMARKET
        },
        url: {
            publicURL: url.ADIOSMARKET_URL_TRADE,
            isCapital: true
        }
    };

    return {
        AdiosMarket: AdiosMarket
    };
}();

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var ADIOSMARKET_URL = "https://aidosmarket.com/";
    var ADIOSMARKET_URL_TRADE = ADIOSMARKET_URL + "order-book";

    return {
        ADIOSMARKET_URL_TRADE: ADIOSMARKET_URL_TRADE
    };
}();

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var coinArrayOfAdiosMarket = __webpack_require__(138);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames() {
        var otherNewArray = [[]];
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfAdiosMarket.ADIOSMARKET,
            justGenerated: otherNewArray,
            exchangeName: 'Adiosmarket'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {

    var array = [["$$$", "Money", ["Cryptopia"]], ["1337", "1337", ["Cryptopia", "CoinExchange"]], ["1EX", "1EX", ["1ExTrade"]], ["1ST", "Firstblood", ["Bittrex", "HitBtc", "Livecoin"]], ["21M", "21Million", ["Cryptopia"]], ["2GIVE", "2GIVE", ["Bittrex"]], ["300", "300 Token", ["Cryptopia"]], ["42", "42-coin", ["Cryptopia", "Livecoin"]], ["420G", "Ganjacoin", ["CoinExchange"]], ["4CHN", "ChanCoin", ["Cryptopia"]], ["611", "SixEleven", ["Cryptopia", "CoinExchange"]], ["808", "808", ["Cryptopia"]], ["888", "OctoCoin", ["Cryptopia"]], ["8BIT", "8Bit", ["Cryptopia"]], ["ABC", "Alphabit", ["Cryptopia"]], ["ABN", "ABNCoin", ["Livecoin"]], ["ABY", "ArtByte", ["Bittrex", "Cryptopia"]], ["AC", "Asiacoin", ["Cryptopia"]], ["ACC", "Adcoin", ["Cryptopia", "CoinExchange"]], ["ACES", "AcesCoin", ["CoinExchange"]], ["ACN", "Avoncoin", ["Livecoin"]], ["ACOIN", "ACoin", ["Cryptopia", "CoinExchange"]], ["ACP", "AnarchistsPrime", ["CoinExchange"]], ["ADA", "Ada", ["Bittrex", "Binance"]], ["ADC", "AudioCoin", ["Cryptopia", "Bluetrade"]], ["ADCN", "AsiaDigiCoin", ["CoinExchange"]], ["ADK", "Aidos Kuneen", ["AidosMarket"]], ["ADST", "Adshares", ["Cryptopia", "CoinExchange"]], ["ADT", "adToken", ["Bittrex"]], ["ADX", "AdEx", ["Bittrex", "Binance"]], ["ADZ", "Adzcoin", ["CoinExchange", "Livecoin"]], ["AE", "Aeternity", ["HitBtc"]], ["AEON", "Aeon", ["Bittrex", "HitBtc"]], ["AGRI", "AgriNovusCoin", ["CoinExchange"]], ["AGRS", "IDNI Agoras", ["Bittrex"]], ["AI", "PolyAi", ["CoinExchange"]], ["AION", "Aion", ["Binance"]], ["AIR", "Airtoken", ["HitBtc"]], ["AKY", "AkuyaCoin", ["CoinExchange"]], ["ALEX", "Alexandrite", ["Cryptopia"]], ["ALIS", "ALIS", ["Cryptopia", "CoinExchange"]], ["ALL", "Allion", ["Cryptopia", "CoinExchange"]], ["ALT", "AltCoin", ["Cryptopia"]], ["AMB", "Ambrosus", ["Binance", "HitBtc"]], ["AMC", "AngelaMerkelCoin", ["CoinExchange"]], ["AMM", "MicroMoney", ["HitBtc", "Livecoin"]], ["AMMO", "AmmoRewards", ["CoinExchange"]], ["AMP", "Synereo AMP", ["Poloniex", "Bittrex", "Cryptopia", "HitBtc"]], ["AMS", "Amsterdamcoin", ["CoinExchange"]], ["ANI", "AnimeCoin", ["Cryptopia"]], ["ANT", "Aragon", ["Bittrex", "HitBtc", "Livecoin"]], ["ANTX", "Antimatter", ["CoinExchange"]], ["ANY", "Anycoin", ["CoinExchange"]], ["APX", "Apx", ["Bittrex", "Cryptopia"]], ["ARC", "ArcticCoin", ["Cryptopia", "Livecoin"]], ["ARCO", "AquariusCoin", ["Cryptopia"]], ["ARDR", "Ardor", ["Poloniex", "Bittrex", "HitBtc"]], ["ARG", "Argentum", ["Cryptopia", "CoinExchange"]], ["ARGUS", "ArgusCoin", ["Cryptopia", "CoinExchange"]], ["ARI", "Aricoin", ["Cryptopia"]], ["ARK", "Ark", ["Bittrex", "Cryptopia", "Binance"]], ["ARN", "Aeron", ["Binance", "HitBtc"]], ["ART", "Maecenas", ["HitBtc"]], ["ARTE", "Artemine", ["Livecoin"]], ["ASAFE2", "AllSafe", ["Livecoin"]], ["ASN", "Aseancoin", ["CoinExchange"]], ["AST", "AirSwap", ["Binance"]], ["ATB", "ATB Coin", ["HitBtc"]], ["ATH", "Athenian Warrior Token", ["Cryptopia"]], ["ATL", "ATLANT Token", ["HitBtc"]], ["ATM", "ATMChain", ["HitBtc", "Livecoin"]], ["ATMS", "Atmos", ["Cryptopia"]], ["ATOM", "Atomiccoin", ["Cryptopia", "CoinExchange"]], ["ATS", "Authorship Token", ["HitBtc"]], ["ATX", "ArtexCoin", ["CoinExchange", "Livecoin"]], ["AU", "AurumCoin", ["Cryptopia", "CoinExchange"]], ["AUR", "AuroraCoin", ["Bittrex", "Cryptopia"]], ["AURS", "Aureus", ["Cryptopia"]], ["AVT", "Aventus", ["Bitfinex"]], ["B2B", "B2B", ["CoinExchange"]], ["B3", "B3Coin", ["CoinExchange"]], ["BAKED", "BAKEDcoin", ["CoinExchange"]], ["BAT", "Basic Attention Token", ["Bittrex", "Binance", "Livecoin"]], ["BAY", "BitBay", ["Bittrex", "Cryptopia"]], ["BBC", "Bitcoin core", ["Bitfinex"]], ["BCC", "BitConnect Coin", ["Binance", "HitBtc", "CoinExchange", "EXX", "Bluetrade", "Livecoin"]], ["BCD", "Bitcoin Diamond", ["Binance", "EXX"]], ["BCF", "Bitcoin Fast", ["Cryptopia"]], ["BCH", "Bitcoin Cash", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Gdax", "Exmo", "HitBtc", "CoinExchange", "Livecoin"]], ["BCM", "BitcoinMetal", ["CoinExchange"]], ["BCN", "Bytecoin", ["Poloniex", "HitBtc"]], ["BCPT", "BlockMason", ["Cryptopia", "Binance"]], ["BCU", "Bitcoin Unlimited", ["Bitfinex"]], ["BCY", "BitCrystals", ["Poloniex", "Bittrex", "TuxExchange"]], ["BDL", "BitDeal", ["Cryptopia", "CoinExchange"]], ["BEER", "Beerhouse", ["CoinExchange"]], ["BEEZ", "BeezerCoin", ["Cryptopia"]], ["BELA", "Bela", ["Poloniex", "CoinExchange"]], ["BENJI", "BenjiRolls", ["Cryptopia", "CoinExchange"]], ["BERN", "BERNcash", ["Cryptopia"]], ["BEST", "BestChain", ["Cryptopia"]], ["BET", "Betacoin", ["CoinExchange"]], ["BFI", "BitFinTech", ["CoinExchange"]], ["BIGUP", "Bigup", ["CoinExchange"]], ["BIO", "BioCoin", ["Livecoin"]], ["BIP", "BipCoin", ["Cryptopia"]], ["BIRDS", "BirdsCoin", ["CoinExchange"]], ["BIS", "Bismuth", ["Cryptopia"]], ["BIT", "First Bitcoin", ["Livecoin"]], ["BITB", "BitBean", ["Bittrex", "Cryptopia", "CoinExchange", "Bluetrade"]], ["BITS", "Bitstar", ["Cryptopia"]], ["BIXC", "Bixc", ["CoinExchange"]], ["BIZ", "BizCoin", ["CoinExchange"]], ["BKB", "BetKing Bankroll Token", ["HitBtc"]], ["BKCAT", "BlockCat", ["Cryptopia"]], ["BLAS", "BlakeStarCoin", ["CoinExchange"]], ["BLAZR", "BlazerCoin", ["CoinExchange"]], ["BLC", "Blakecoin", ["Cryptopia"]], ["BLITZ", "Blitzcash", ["Bittrex"]], ["BLK", "BlackCoin", ["Poloniex", "Bittrex", "Cryptopia", "TuxExchange", "CoinExchange", "Bluetrade", "Livecoin"]], ["BLN", "Boleno", ["CoinExchange"]], ["BLOCK", "BlockNet", ["Bittrex"]], ["BLU", "BlueCoin", ["Livecoin"]], ["BLUE", "EthereumBlue", ["CoinExchange"]], ["BMC", "Black Moon", ["HitBtc"]], ["BMT", "BMChain", ["HitBtc"]], ["BNB", "Binance Coin", ["Binance"]], ["BNC", "BraveNewCoin", ["Cryptopia"]], ["BNT", "Bancor", ["Bittrex", "Binance", "HitBtc", "Livecoin"]], ["BNX", "BnrtxCoin", ["Cryptopia"]], ["BOAT", "Doubloons", ["CoinExchange"]], ["BOLI", "BolivarCoin", ["Cryptopia"]], ["BON", "Bonpay", ["Cryptopia", "CoinExchange", "CoinExchange"]], ["BOP", "BlockOptions", ["Cryptopia"]], ["BOPS", "Beonpush", ["CoinExchange"]], ["BOS", "BOScoin", ["HitBtc"]], ["BPC", "BITPARK COIN", ["Livecoin"]], ["BPL", "Blockpool", ["Cryptopia"]], ["BPOK", "BitPokemonGo", ["CoinExchange"]], ["BQ", "Bitqy", ["CoinExchange"]], ["BRAT", "Brat", ["CoinExchange"]], ["BRC", "BinaryCoin", ["CoinExchange"]], ["BRD", "Bread", ["Binance"]], ["BRIT", "Britcoin", ["CoinExchange"]], ["BRK", "Breakout", ["Bittrex"]], ["BRO", "Bitradio", ["Cryptopia"]], ["BRX", "Breakout Stake", ["Bittrex"]], ["BSD", "BitSend", ["Bittrex", "Cryptopia", "Livecoin"]], ["BSN", "Bastone", ["CoinExchange"]], ["BSR", "BitSoar", ["CoinExchange"]], ["BSTY", "GlobalBoost-Y", ["Cryptopia", "Bluetrade"]], ["BTA", "BATA", ["Cryptopia", "Bluetrade", "Bluetrade", "Livecoin"]], ["BTB", "BitBar", ["Cryptopia", "Livecoin"]], ["BTBc", "Bitbase", ["CoinExchange"]], ["BTC", "Bitcoin", ["Kraken", "Bitfinex", "Bitstamp", "Coinspot", "Gdax", "1ExTrade", "Gemini", "Exmo", "Livecoin"]], ["BTCD", "BitcoinDark", ["Poloniex", "Bittrex", "Cryptopia", "Bluetrade"]], ["BTCRED", "BitcoinRed", ["CoinExchange"]], ["BTCRF", "BitcoinRefill", ["CoinExchange"]], ["BTCS", "Bitcoin Scrypt", ["Cryptopia"]], ["BTDX", "Bitcloud", ["Cryptopia", "CoinExchange"]], ["BTE", "BitSerial", ["CoinExchange"]], ["BTG", "Bitcoin Gold", ["Bittrex", "Cryptopia", "Bitfinex", "Binance", "HitBtc", "EXX", "Bluetrade"]], ["BTM", "Bitmark", ["Poloniex", "Cryptopia", "HitBtc", "EXX"]], ["BTPL", "BitcoinPlanet", ["CoinExchange"]], ["BTS", "BitShares", ["Poloniex", "Binance", "EXX", "Livecoin"]], ["BTX", "BitCore", ["Cryptopia", "HitBtc"]], ["BUCKS", "SwagBucks", ["Cryptopia"]], ["BULLS", "Bullshitcoin", ["CoinExchange"]], ["BUMBA", "Bumbacoin", ["Cryptopia"]], ["BURST", "Burst", ["Poloniex", "Bittrex", "Livecoin"]], ["BUS", "Bus token", ["HitBtc"]], ["BUZZ", "Buzzcoin", ["CoinExchange"]], ["BVB", "BVBCoin", ["Cryptopia"]], ["BWK", "Bulwark", ["Cryptopia"]], ["BXC", "Bitcedi", ["Cryptopia"]], ["BXT", "Bittoken", ["CoinExchange"]], ["BYC", "Bytecent", ["Bittrex"]], ["C2", "Coin2", ["Cryptopia"]], ["C47", "Code47", ["CoinExchange"]], ["CACH", "CacheCoin", ["Cryptopia", "CoinExchange"]], ["CALC", "Caliphcoin", ["CoinExchange"]], ["CANN", "CannabisCoin", ["Bittrex", "Cryptopia", "CoinExchange"]], ["CAP", "BottleCaps", ["Cryptopia"]], ["CAPP", "Aeron", ["HitBtc"]], ["CAR", "CareerCoin", ["Cryptopia"]], ["CAT", "Catcoin", ["Cryptopia", "HitBtc"]], ["CBANK", "CryptoBank", ["CoinExchange"]], ["CBX", "CryptoBullion", ["Cryptopia"]], ["CC", "CoolInDarkCoin", ["Cryptopia"]], ["CCN", "CannaCoin", ["Cryptopia"]], ["CCRB", "CryptoCarbon", ["Livecoin"]], ["CDN", "Canada eCoin", ["Cryptopia", "Bluetrade"]], ["CDT", "Coindash", ["Binance", "HitBtc"]], ["CDX", "CommodityAdNetwork", ["CoinExchange", "Livecoin"]], ["CEFS", "CryptopiaFeeShare", ["Cryptopia"]], ["CFC", "CoffeeCoin", ["Cryptopia"]], ["CFI", "Cofound.it", ["Bittrex", "HitBtc"]], ["CFT", "CryptoForecast", ["Cryptopia"]], ["CFUN", "CFUN", ["EXX"]], ["CHAT", "Chat", ["EXX"]], ["CHBT", "CHBToken", ["1ExTrade"]], ["CHC", "ChainCoin", ["Cryptopia"]], ["CHEAP", "CheapCoin", ["CoinExchange"]], ["CHESS", "ChessCoin", ["Cryptopia"]], ["CHIEF", "TheChiefCoin", ["Cryptopia"]], ["CHILI", "ChiliCoin", ["CoinExchange"]], ["CHIPS", "Chips", ["CoinExchange"]], ["CJ", "CryptoJacks", ["Cryptopia", "CoinExchange"]], ["CL", "Coinlancer", ["HitBtc"]], ["CLAM", "CLAMS", ["Poloniex", "Bittrex", "Cryptopia", "Bluetrade"]], ["CLD", "Cloud With Me", ["HitBtc", "Livecoin"]], ["CLOAK", "CloakCoin", ["Bittrex", "Cryptopia", "Livecoin"]], ["CLPC", "CLP Token", ["Livecoin"]], ["CLT", "CryptoLottoToken", ["CoinExchange"]], ["CLUB", "ClubCoin", ["Bittrex"]], ["CMP", "CompCoin", ["Cryptopia"]], ["CMPCO", "CampusCoin", ["Cryptopia", "CoinExchange"]], ["CMT", "CometCoin", ["Cryptopia", "Binance"]], ["CMX", "CoinMiningIndex", ["CoinExchange"]], ["CND", "Cindicator", ["Binance", "HitBtc"]], ["CNNC", "Cannation", ["Cryptopia", "CoinExchange"]], ["CNO", "Coino", ["Cryptopia"]], ["CNT", "Centurioncoin", ["CoinExchange"]], ["CNX", "Cryptonex", ["HitBtc"]], ["CO2", "ClimateCoin", ["CoinExchange"]], ["COAL", "Bitcoal", ["Cryptopia"]], ["COMP", "Compound Coin", ["Cryptopia"]], ["CON", "PayCon", ["Cryptopia"]], ["COOC", "CoochieCoin", ["CoinExchange"]], ["COPPER", "CopperCoin", ["Cryptopia"]], ["COR", "Corion", ["Cryptopia"]], ["CORG", "CorgiCoin", ["Cryptopia"]], ["COSS", "COSS", ["HitBtc"]], ["COUPE", "Coupecoin", ["CoinExchange"]], ["COVAL", "Circuits of Value", ["Bittrex"]], ["CPC", "CapriCoin", ["Bittrex", "Livecoin"]], ["CPN", "CompuCoin", ["Cryptopia"]], ["CQST", "ConquestCoin", ["Cryptopia", "CoinExchange"]], ["CRAVE", "Crave", ["Cryptopia"]], ["CRB", "CreditBit", ["Bittrex", "Livecoin"]], ["CRDNC", "CredenceCoin", ["CoinExchange"]], ["CREA", "CreativeCoin", ["Cryptopia", "CoinExchange"]], ["CREAK", "Creakcoin", ["CoinExchange"]], ["CREVA", "CrevaCoin", ["Livecoin"]], ["CRM", "CREAMcoin", ["Cryptopia"]], ["CRMSN", "Crimsoncoin", ["CoinExchange"]], ["CRN", "CoronaCoin", ["CoinExchange"]], ["CRUR", "CryptoRuble", ["Cryptopia"]], ["CRW", "Crown", ["Bittrex", "CoinExchange"]], ["CRX", "ChronosCoin", ["Cryptopia"]], ["CRYPT", "CryptCoin", ["Cryptopia"]], ["CSNO", "BitDice", ["HitBtc"]], ["CTIC2", "Coimatic2", ["CoinExchange"]], ["CTIC3", "Coimatic 3", ["Cryptopia"]], ["CTR", "Centra", ["Cryptopia", "Binance", "HitBtc", "Livecoin"]], ["CTX", "Car Taxi", ["HitBtc"]], ["CUBE", "DigiCube", ["CoinExchange"]], ["CURE", "CureCoin", ["Bittrex", "Livecoin"]], ["CVC", "Civic", ["Poloniex", "Bittrex", "Livecoin"]], ["CXT", "Coinonat", ["Cryptopia", "CoinExchange"]], ["CYCLONE", "CycloneCoin", ["CoinExchange"]], ["CYDER", "Cyder", ["CoinExchange"]], ["DAG", "DashGold", ["CoinExchange"]], ["DALC", "DALECOIN", ["Cryptopia", "CoinExchange"]], ["DANC", "DrAgoNCoin", ["Livecoin"]], ["DARI", "DariCoin", ["CoinExchange"]], ["DARK", "DARK", ["Cryptopia"]], ["DAS", "DA$", ["Cryptopia"]], ["DASH", "Dash", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Exmo", "Binance", "TuxExchange", "HitBtc", "CoinExchange", "Bluetrade", "Livecoin"]], ["DAT", "Streamr", ["Bitfinex"]], ["DAV", "DavorCoin", ["CoinExchange"]], ["DAXX", "DaxxCoin", ["Cryptopia"]], ["DAY", "Chronologic", ["Livecoin"]], ["DBET", "DecentBet", ["Cryptopia"]], ["DBIX", "DubaiCoin", ["Cryptopia", "HitBtc", "CoinExchange", "Livecoin"]], ["DCN", "Dentacoin", ["Cryptopia", "CoinExchange"]], ["DCR", "Decred", ["Poloniex", "Bittrex", "Cryptopia", "TuxExchange", "Bluetrade"]], ["DCT", "DECENT", ["Bittrex", "HitBtc"]], ["DCY", "DinastyCoin", ["Cryptopia"]], ["DDF", "DDF", ["Cryptopia"]], ["DEM", "Deutsche eMark", ["Cryptopia", "CoinExchange"]], ["DEUS", "Deuscoin", ["Cryptopia"]], ["DFS", "DFSCoin", ["Cryptopia", "CoinExchange"]], ["DGB", "DigiByte", ["Poloniex", "Bittrex", "Cryptopia", "HitBtc", "CoinExchange", "Livecoin"]], ["DGC", "Digitalcoin", ["Cryptopia", "CoinExchange", "Bluetrade"]], ["DGD", "Digix DAO", ["Bittrex", "Binance", "HitBtc", "Livecoin"]], ["DGPT", "DigiPulse", ["Cryptopia"]], ["DIBC", "DIBCOIN", ["Livecoin"]], ["DICE", "Etheroll", ["HitBtc"]], ["DIM", "DIMCOIN", ["HitBtc"]], ["DIME", "Dimecoin", ["CoinExchange", "Livecoin"]], ["DIVX", "Divi Exchange Token", ["Cryptopia"]], ["DLT", "Agrello", ["Binance", "HitBtc"]], ["DMB", "DigitalMoneyBits", ["CoinExchange"]], ["DMC", "DynamicCoin", ["CoinExchange", "Livecoin"]], ["DMD", "Diamond", ["Bittrex", "Livecoin"]], ["DNA", "GeneChain", ["Cryptopia"]], ["DNCV2", "DronecoinV2", ["CoinExchange"]], ["DNE", "Daneton", ["CoinExchange"]], ["DNR", "Denarius", ["Cryptopia", "CoinExchange"]], ["DNT", "district0x", ["Bittrex", "Binance", "HitBtc"]], ["DOGE", "Dogecoin", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Coinspot", "Exmo", "TuxExchange", "HitBtc", "CoinExchange", "Bluetrade", "Livecoin"]], ["DOGEJ", "DogeJunior", ["CoinExchange"]], ["DOLLAR", "DOLLAR Online", ["Livecoin"]], ["DON", "DonationCoin", ["Cryptopia"]], ["DOPE", "DopeCoin", ["Bittrex", "Cryptopia"]], ["DOT", "Dotcoin", ["Cryptopia"]], ["DOV", "DOVU", ["HitBtc"]], ["DP", "DigitalPrice", ["Cryptopia", "CoinExchange", "Bluetrade"]], ["DPC", "Digital Price Classic", ["Bluetrade"]], ["DPP", "DA Power Play", ["Cryptopia"]], ["DRP", "DCORP", ["Cryptopia"]], ["DRS", "DigitalRupees", ["CoinExchange"]], ["DRXNE", "Droxne", ["Cryptopia"]], ["DSE", "Disse", ["CoinExchange"]], ["DSH", "DashCoin", ["Cryptopia", "HitBtc"]], ["DTB", "Databits", ["Bittrex", "TuxExchange"]], ["DTCT", "DetectorToken", ["CoinExchange"]], ["DTR", "Dynamic Trading Rights", ["Livecoin"]], ["DUO", "Parallelcoin", ["Cryptopia"]], ["DUTCH", "DutchCoin", ["CoinExchange"]], ["DYN", "Dynamic", ["Bittrex"]], ["EBC", "eBullionCoin", ["CoinExchange"]], ["EBG", "EmbargoCoin", ["Cryptopia"]], ["EBST", "eBoost", ["Bittrex"]], ["EBT", "EbitTreeCoin", ["CoinExchange"]], ["EBTC", "eBTC", ["HitBtc", "HitBtc", "HitBtc"]], ["EBTCOLD", "eBTC Old", ["HitBtc", "HitBtc", "HitBtc"]], ["EC", "Eclipse", ["Cryptopia"]], ["ECC", "E-CurrencyCoin", ["CoinExchange"]], ["ECN", "E-Coin", ["CoinExchange"]], ["ECO", "ECOcoin", ["Cryptopia"]], ["ECOB", "EcoBit", ["Cryptopia"]], ["EDC", "EducoinV", ["Cryptopia"]], ["EDDIE", "Eddiecoin", ["Cryptopia"]], ["EDG", "Edgeless", ["Bittrex", "HitBtc", "Livecoin"]], ["EDO", "Eidoo", ["Bitfinex", "HitBtc"]], ["EDR", "E-Dinar Coin", ["Livecoin"]], ["EDRC", "EDRcoin", ["Cryptopia", "CoinExchange"]], ["EFL", "ElectronicGulden", ["Bittrex", "Cryptopia", "Bluetrade"]], ["EGC", "EverGreenCoin", ["Bittrex", "Cryptopia", "CoinExchange"]], ["ELC", "ElaCoin", ["Cryptopia"]], ["ELCO", "ELcoin", ["CoinExchange", "Livecoin"]], ["ELE", "Elementrem", ["HitBtc"]], ["ELF", "ælf", ["Binance"]], ["ELIX", "Elixir", ["CoinExchange"]], ["ELLA", "Ellaism", ["Cryptopia"]], ["ELM", "Elements", ["Cryptopia", "HitBtc"]], ["ELS", "Elysium", ["CoinExchange"]], ["ELT", "ELTCoin", ["CoinExchange"]], ["EMC", "EmerCoin", ["Bittrex", "Cryptopia", "TuxExchange", "HitBtc", "CoinExchange", "Livecoin"]], ["EMC2", "Einsteinium", ["Poloniex", "Bittrex", "Cryptopia"]], ["EMD", "Emerald Crypto", ["Cryptopia"]], ["EMGO", "MobileGo", ["HitBtc", "Livecoin"]], ["EMIRG", "EmiratesGoldCoin", ["CoinExchange"]], ["ENG", "Enigma", ["Bittrex", "Binance"]], ["ENJ", "Enjin Coin", ["Cryptopia", "Binance", "HitBtc", "Livecoin"]], ["ENRG", "EnergyCoin", ["Bittrex"]], ["ENT", "Eternity", ["Livecoin"]], ["ENTRC", "EnterCoin", ["CoinExchange"]], ["ENZO", "ENZOLimited", ["CoinExchange"]], ["EOS", "EOS", ["Kraken", "Bitfinex", "Binance", "HitBtc", "EXX", "Livecoin"]], ["EQL", "Equal", ["CoinExchange"]], ["EQT", "Equitrade", ["Cryptopia", "CoinExchange"]], ["ERC", "EuropeCoin", ["Bittrex"]], ["ERO", "EROSCOIN", ["HitBtc", "Livecoin"]], ["ERSO", "JynErso", ["CoinExchange"]], ["ERT", "eSportsRewardToken", ["CoinExchange"]], ["ERY", "Eryllium", ["Cryptopia", "CoinExchange"]], ["ESC", "Escroco", ["Livecoin"]], ["ESP", "Espers", ["CoinExchange", "Livecoin"]], ["ETBS", "EthBits", ["HitBtc", "CoinExchange"]], ["ETC", "Ethereum Classic", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Exmo", "Binance", "HitBtc", "CoinExchange", "EXX"]], ["ETF", "FirstCryptoETF", ["EXX"]], ["ETG", "EthereumGold", ["CoinExchange"]], ["ETH", "Ethereum", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Bitstamp", "Gdax", "Gemini", "Exmo", "Binance", "TuxExchange", "HitBtc", "CoinExchange", "EXX", "Bluetrade", "Livecoin"]], ["ETHD", "Ethereum Dark", ["Cryptopia", "CoinExchange"]], ["ETHP", "ETHEREUM PLUS", ["Livecoin"]], ["ETN", "Electroneum", ["Cryptopia", "CoinExchange"]], ["ETP", "Metaverse", ["Bitfinex", "HitBtc"]], ["ETT", "EncryptoTel", ["Cryptopia"]], ["EUC", "Eurocoin", ["Cryptopia"]], ["EUROP", "EuropeUnited", ["CoinExchange"]], ["EVC", "EventChain", ["Livecoin"]], ["EVIL", "Evilcoin", ["Cryptopia"]], ["EVO", "Evotion", ["Cryptopia"]], ["EVR", "Everus", ["Cryptopia"]], ["EVX", "Everex", ["Binance", "HitBtc"]], ["EXCL", "ExclusiveCoin", ["Bittrex", "CoinExchange"]], ["EXN", "Exchangen", ["HitBtc"]], ["EXP", "Expanse", ["Poloniex", "Bittrex", "Cryptopia", "Bluetrade"]], ["Ethos", "Ethos", ["Binance", "Livecoin"]], ["Ethos", "Ethos", ["HitBtc", "CoinExchange"]], ["FAIR", "FairCoin", ["Bittrex", "CoinExchange"]], ["FAP", "FAPcoin", ["CoinExchange"]], ["FAZZ", "FazzCoin", ["Cryptopia", "CoinExchange"]], ["FCH", "FastCash", ["CoinExchange"]], ["FCN", "FacileCoin", ["Cryptopia", "HitBtc"]], ["FCT", "Factom", ["Poloniex", "Bittrex", "Cryptopia"]], ["FFC", "FireFlyCoin", ["Cryptopia"]], ["FGZ", "FreeGameZoneCoin", ["CoinExchange"]], ["FJC", "FujiCoin", ["Cryptopia", "Bluetrade"]], ["FLASH", "FLASH", ["Cryptopia"]], ["FLAX", "Flaxscript", ["Cryptopia"]], ["FLDC", "FoldingCoin", ["Poloniex", "Bittrex"]], ["FLIK", "Flik", ["CoinExchange"]], ["FLIXX", "Flixx", ["Livecoin"]], ["FLO", "Florincoin", ["Poloniex", "Bittrex"]], ["FLT", "FlutterCoin", ["Cryptopia"]], ["FNC", "Fincoin", ["Livecoin"]], ["FONZ", "FonzieCoin", ["Cryptopia"]], ["FORT", "Fortcoin", ["Cryptopia"]], ["FRC", "FireRoosterCoin", ["Cryptopia"]], ["FRD", "Farad", ["HitBtc"]], ["FRN", "Francs", ["Cryptopia"]], ["FRST", "FirstCoin", ["Livecoin"]], ["FRT", "Fortesque", ["CoinExchange"]], ["FST", "FastCoin", ["Cryptopia", "Livecoin"]], ["FSX", "Frost", ["CoinExchange"]], ["FTC", "Feathercoin", ["Bittrex", "Cryptopia", "CoinExchange"]], ["FU", "FuBi", ["Livecoin"]], ["FUEL", "FuelCoin", ["Cryptopia", "Binance", "HitBtc"]], ["FUN", "FunFair", ["Bittrex", "Binance", "HitBtc", "Livecoin"]], ["FUNC", "FUNCOIN", ["Livecoin"]], ["FUZZ", "FuzzBalls", ["Cryptopia"]], ["FXE", "Futurxe", ["CoinExchange"]], ["FYP", "Flypme", ["HitBtc"]], ["GAIA", "GaiaCoin", ["Cryptopia"]], ["GAIN", "UGAIN", ["CoinExchange"]], ["GAM", "Gambit", ["Bittrex"]], ["GAME", "GameCredits", ["Poloniex", "Bittrex", "Cryptopia", "HitBtc", "Livecoin"]], ["GAP", "Gapcoin", ["Cryptopia"]], ["GAS", "Gas", ["Poloniex", "Binance"]], ["GAY", "GayMoney", ["Cryptopia"]], ["GB", "GoldBlocks", ["CoinExchange", "Bluetrade", "Livecoin"]], ["GBG", "Gbg", ["Bittrex"]], ["GBX", "GoByte", ["Cryptopia", "CoinExchange"]], ["GBYTE", "Byteball", ["Bittrex", "Cryptopia"]], ["GCR", "GlobalCurrencyReserve", ["Bittrex"]], ["GDC", "GoldenCryptoCoin", ["CoinExchange"]], ["GEERT", "GeertCoin", ["Cryptopia", "CoinExchange"]], ["GEO", "GeoCoin", ["Bittrex", "Cryptopia"]], ["GET", "GreenEnergyToken", ["CoinExchange"]], ["GFC", "Guficoin", ["CoinExchange"]], ["GLD", "GoldCoin", ["Bittrex", "Cryptopia"]], ["GLS", "GlassCoin", ["CoinExchange"]], ["GLT", "GlobalToken", ["CoinExchange"]], ["GMB", "Gambleo", ["CoinExchange"]], ["GMX", "GoldMaxCoin", ["CoinExchange"]], ["GNO", "Gnosis", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "HitBtc", "Livecoin"]], ["GNT", "Golem", ["Poloniex", "Bittrex", "Cryptopia", "TuxExchange", "Livecoin"]], ["GOLD", "GoldenCoin", ["CoinExchange"]], ["GOLF", "Golfcoin", ["CoinExchange"]], ["GOLOS", "Golos", ["Bittrex", "Livecoin"]], ["GOOD", "Goodomy", ["CoinExchange"]], ["GP", "GoldPieces", ["Cryptopia", "CoinExchange"]], ["GPL", "GoldPressedLatinum ", ["Cryptopia"]], ["GPU", "GPUCoin", ["Cryptopia"]], ["GRC", "Gridcoin Research", ["Poloniex", "Bittrex"]], ["GRE", "Greencoin", ["CoinExchange"]], ["GREENF", "GreenFingers", ["CoinExchange"]], ["GRMD", "GreenMed", ["CoinExchange"]], ["GRN", "Granite", ["Cryptopia"]], ["GRPH", "s3ntigrapH", ["HitBtc"]], ["GRS", "Groestlcoin", ["Bittrex", "Cryptopia", "CoinExchange", "Livecoin"]], ["GRW", "GrowthCoin", ["Cryptopia"]], ["GRWI", "Growers Intl", ["Cryptopia"]], ["GRX", "GoldRewardToken", ["CoinExchange", "Livecoin"]], ["GTC", "GlobalTourCoin", ["CoinExchange"]], ["GTO", "Gifto", ["Binance"]], ["GUN", "GunCoin", ["Cryptopia"]], ["GUP", "Guppy", ["Bittrex", "HitBtc", "Livecoin"]], ["GVT", "Genesis Vision", ["Binance"]], ["GWC", "WildersCoin", ["CoinExchange"]], ["GXS", "GXShares", ["Binance"]], ["GYC", "GongYiCoin", ["Livecoin"]], ["HAC", "Hackspace", ["Cryptopia", "HitBtc"]], ["HAL", "Halcyon", ["Cryptopia"]], ["HALLO", "Halloweencoin", ["CoinExchange"]], ["HAV", "Havecoin", ["Cryptopia"]], ["HBN", "HoboNickels", ["Cryptopia"]], ["HC", "HarvestCoin", ["Cryptopia", "CoinExchange"]], ["HDLB", "HodlBucks", ["Cryptopia"]], ["HEALTHY", "HealthyFoodProgram", ["CoinExchange"]], ["HEAT", "HeatLedger", ["Cryptopia"]], ["HIGH", "Highgain", ["CoinExchange"]], ["HLM", "Helium", ["Cryptopia"]], ["HMC", "HarmonyCoin", ["CoinExchange"]], ["HMQ", "Humaniq", ["Bittrex"]], ["HNC", "Huncoin", ["CoinExchange", "Livecoin"]], ["HOC", "Huobicoin", ["CoinExchange"]], ["HODL", "Hodlcoin", ["CoinExchange"]], ["HOLD", "InterstellarHoldings", ["Cryptopia"]], ["HOLLY", "Hollyweed", ["CoinExchange"]], ["HONEY", "Honey", ["CoinExchange"]], ["HOPE", "Hopecoin", ["CoinExchange"]], ["HPC", "Happycoin", ["HitBtc", "CoinExchange"]], ["HSR", "HSHARE", ["Cryptopia", "Binance", "HitBtc", "EXX"]], ["HST", "Decision Token", ["Cryptopia", "Livecoin"]], ["HTML", "Htmlcoin", ["Bluetrade"]], ["HUB", "Hubcoin", ["CoinExchange"]], ["HUC", "Huntercoin", ["Poloniex"]], ["HUSH", "Hush", ["Cryptopia"]], ["HVN", "Hive Project", ["HitBtc", "Livecoin"]], ["HXX", "HexxCoin", ["Cryptopia"]], ["HYP", "HyperStake", ["Cryptopia", "CoinExchange"]], ["HYPER", "Hyper", ["CoinExchange"]], ["I0C", "I0Coin", ["Cryptopia"]], ["IBC", "RCoin", ["CoinExchange"]], ["ICE", "iDice", ["CoinExchange"]], ["ICN", "Iconomi", ["Kraken", "Binance", "TuxExchange", "HitBtc", "Livecoin"]], ["ICO", "ICOBI", ["HitBtc"]], ["ICOB", "ICOBid", ["Cryptopia"]], ["ICOS", "ICOBox", ["HitBtc", "Livecoin"]], ["ICOT", "Initial Coin Offering Token", ["CoinExchange"]], ["ICX", "ICON", ["Binance", "HitBtc"]], ["IFLT", "InflationCoin", ["Cryptopia"]], ["IFT", "investFeed", ["Cryptopia", "CoinExchange"]], ["ILC", "ILCoin", ["CoinExchange"]], ["IMS", "Independent Money System", ["Cryptopia"]], ["IMX", "ImpactCoin", ["CoinExchange"]], ["IN", "InCoin", ["Cryptopia"]], ["INCNT", "Incent", ["Bittrex", "Livecoin"]], ["INDI", "Indicoin", ["HitBtc"]], ["INDIA", "IndiaCoin", ["CoinExchange"]], ["INFO", "InfoCoin", ["CoinExchange"]], ["INFX", "InfluxCoin", ["Bittrex", "Cryptopia"]], ["INK", "Ink", ["EXX"]], ["INN", "Innova", ["Cryptopia"]], ["INSN", "Insane", ["Cryptopia", "CoinExchange", "Livecoin"]], ["INXT", "Internxt", ["CoinExchange"]], ["IOC", "IOCoin", ["Bittrex"]], ["IOE", "IOECoin", ["CoinExchange"]], ["ION", "Ion", ["Bittrex"]], ["IOP", "Internet Of People", ["Bittrex"]], ["IOTA", "IOTA", ["Bitfinex", "Binance"]], ["IQT", "Iquant Chain", ["Cryptopia", "CoinExchange"]], ["IRL", "IrishCoin", ["Cryptopia"]], ["ITI", "ItiCoin", ["Cryptopia", "Livecoin"]], ["IXC", "IXCoin", ["Cryptopia", "CoinExchange"]], ["IXT", "iXledger", ["HitBtc"]], ["IZE", "IZEcoin", ["Cryptopia"]], ["JAPAN", "JapanCoin", ["CoinExchange"]], ["JEDI", "JediCoin", ["CoinExchange"]], ["JET", "JetCoin", ["Cryptopia", "CoinExchange"]], ["JIN", "JinCoin", ["CoinExchange"]], ["KASH", "KashCoin", ["Cryptopia"]], ["KAYI", "Kayicoin", ["Cryptopia", "CoinExchange"]], ["KBR", "Kubera", ["Cryptopia", "HitBtc"]], ["KDC", "KlondikeCoin", ["Cryptopia"]], ["KED", "Darsek", ["Cryptopia"]], ["KEK", "Kekcoin", ["Cryptopia"]], ["KGB", "KangarooBits", ["Cryptopia", "CoinExchange"]], ["KICK", "KickCoin", ["Exmo", "HitBtc"]], ["KING", "King93", ["Cryptopia"]], ["KLC", "KiloCoin", ["CoinExchange"]], ["KMD", "Komodo", ["Bittrex", "Cryptopia", "Binance", "CoinExchange"]], ["KNC", "KyberNetworkCrystal", ["Cryptopia", "Binance", "Livecoin"]], ["KOBO", "KoboCoin", ["Cryptopia", "CoinExchange"]], ["KOI", "Koicoin", ["CoinExchange"]], ["KORE", "Kore", ["Bittrex"]], ["KORUNA", "CzechoSlovak KORUNA", ["CoinExchange"]], ["KPL", "KeplerShares", ["Livecoin"]], ["KRA", "Kratomcoin", ["CoinExchange"]], ["KRB", "Karbowanec", ["Cryptopia", "Livecoin"]], ["KRONE", "Kronecoin", ["Cryptopia"]], ["KUBO", "KubosCoin", ["CoinExchange"]], ["KURT", "Kurrent", ["Cryptopia", "CoinExchange"]], ["KUSH", "KushCoin", ["Cryptopia"]], ["LA", "LAToken", ["CoinExchange"]], ["LAMBO", "Lambocoin", ["CoinExchange"]], ["LANA", "LanaCoin", ["Cryptopia"]], ["LAT", "Latium", ["HitBtc"]], ["LBC", "LBRY Credits", ["Poloniex", "Bittrex", "Cryptopia"]], ["LBTC", "LiteBitcoin", ["Cryptopia", "EXX"]], ["LCP", "litecoinPlus", ["Cryptopia"]], ["LCT", "LendConnect", ["CoinExchange"]], ["LDC", "LADACoin", ["Cryptopia", "CoinExchange", "Livecoin"]], ["LDOGE", "LiteDoge", ["Cryptopia"]], ["LEMON", "LemonCoin", ["Cryptopia"]], ["LEND", "EthLend", ["Binance", "HitBtc"]], ["LEO", "LeoCoin", ["Livecoin"]], ["LEPEN", "Le Pen Coin", ["Cryptopia"]], ["LEVO", "LevoCoin", ["CoinExchange"]], ["LGD", "Legends", ["Bittrex"]], ["LIFE", "LIFEtoken", ["HitBtc", "CoinExchange"]], ["LINDA", "LindaCoin", ["Cryptopia", "CoinExchange"]], ["LINK", "ChainLink", ["Binance"]], ["LINX", "Linx", ["Cryptopia", "CoinExchange"]], ["LIT", "Lithiumcoin", ["Cryptopia"]], ["LIZI", "LiZi", ["Cryptopia"]], ["LMC", "Lomocoin", ["Bittrex", "CoinExchange"]], ["LNK", "EthereumLink", ["CoinExchange"]], ["LOC", "LockChain", ["HitBtc"]], ["LRC", "Loopring", ["Binance", "HitBtc", "CoinExchange"]], ["LSK", "Lisk", ["Poloniex", "Bittrex", "Binance", "HitBtc", "Livecoin"]], ["LTB", "LiteBar", ["Cryptopia"]], ["LTC", "Litecoin", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Bitstamp", "Coinspot", "Gdax", "Exmo", "Binance", "TuxExchange", "HitBtc", "CoinExchange", "EXX", "Bluetrade", "Livecoin"]], ["LTCU", "LitecoinUltra", ["Cryptopia"]], ["LTG", "LiteCoinGold", ["CoinExchange"]], ["LUCK", "Luckcoin", ["CoinExchange"]], ["LUN", "Lunyr", ["Bittrex", "HitBtc"]], ["LUNA", "Lunacoin", ["CoinExchange", "Livecoin"]], ["LUX", "Luxcoin", ["Cryptopia"]], ["LVPS", "LevoPlus", ["CoinExchange"]], ["MAC", "MachineCoin", ["Cryptopia", "CoinExchange"]], ["MAG", "Magnet", ["CoinExchange"]], ["MAGE", "MagicCoin", ["Cryptopia"]], ["MAGN", "MagnetCoin", ["Cryptopia"]], ["MAID", "MaidSafeCoin", ["Poloniex", "Bittrex", "Cryptopia", "HitBtc", "Livecoin"]], ["MALC", "MalaysiaCoin", ["CoinExchange"]], ["MANA", "Decentraland", ["Bittrex", "Binance"]], ["MAR", "MarijuanaCoin", ["Cryptopia"]], ["MARS", "Mars", ["Cryptopia", "CoinExchange"]], ["MARS2", "MarsBux2", ["CoinExchange"]], ["MARX", "MarxCoin", ["Cryptopia"]], ["MAXI", "Maxicoin", ["CoinExchange"]], ["MAY", "TheresaMayCoin", ["CoinExchange"]], ["MBC", "Mobozcoin", ["CoinExchange"]], ["MBIT", "Mbit", ["CoinExchange"]], ["MBRS", "Embers", ["Cryptopia"]], ["MCAP", "MCAP", ["HitBtc"]], ["MCB", "Microbyte", ["CoinExchange"]], ["MCI", "Musiconomi", ["Cryptopia"]], ["MCO", "Monaco", ["Bittrex", "Binance", "EXX", "Livecoin"]], ["MCR", "Macro", ["Livecoin"]], ["MCRN", "Macron", ["Cryptopia"]], ["MDA", "Moeda Loyalty Points", ["Binance"]], ["MEC", "MegaCoin", ["Cryptopia", "CoinExchange"]], ["MEME", "Memetic", ["Bittrex"]], ["MENTAL", "MentalHealthCoin", ["CoinExchange"]], ["MER", "Mercury", ["Bittrex", "CoinExchange"]], ["MET", "Metacoin", ["CoinExchange"]], ["MGM", "Magnumcoin", ["CoinExchange"]], ["MGO", "MobileGo", ["Cryptopia"]], ["MGT", "Magnatum", ["CoinExchange"]], ["MGX", "MegaX", ["Cryptopia"]], ["MILO", "MiloCoin", ["CoinExchange"]], ["MINEX", "Minex", ["Cryptopia", "CoinExchange"]], ["MINT", "Mintcoin", ["Cryptopia", "CoinExchange"]], ["MIPS", "MIPSToken", ["HitBtc", "CoinExchange"]], ["MLITE", "Melite", ["Cryptopia"]], ["MLN", "Melon", ["Kraken", "Bittrex", "Livecoin"]], ["MNE", "Minereum", ["Cryptopia", "HitBtc", "Livecoin"]], ["MNM", "Mineum", ["Cryptopia"]], ["MNX", "Minexcoin", ["Livecoin"]], ["MOD", "Modum", ["Binance"]], ["MOIN", "MOIN", ["Cryptopia", "CoinExchange", "Livecoin"]], ["MOJO", "MojoCoin", ["Cryptopia", "CoinExchange", "Livecoin"]], ["MONA", "MonaCoin", ["Bittrex", "Bluetrade", "Livecoin"]], ["MONK", "MonkeyProject", ["Cryptopia"]], ["MOON", "Mooncoin", ["CoinExchange", "Bluetrade"]], ["MOTO", "MotoCoin", ["Cryptopia"]], ["MSCN", "MasterSwisCoin", ["CoinExchange", "Livecoin"]], ["MSP", "Mothership", ["Cryptopia", "CoinExchange"]], ["MST", "Mustangcoin", ["Cryptopia", "CoinExchange"]], ["MTH", "Monetha", ["Binance", "HitBtc", "CoinExchange"]], ["MTL", "METAL", ["Bittrex", "Cryptopia", "Binance", "Livecoin"]], ["MTLMC", "MetalMusicCoin", ["Cryptopia"]], ["MTNC", "MasterNodeCoin", ["Cryptopia"]], ["MUE", "MonetaryUnit", ["Bittrex", "CoinExchange"]], ["MUSIC", "Musicoin", ["Bittrex", "Cryptopia"]], ["MUX", "Manutax", ["CoinExchange"]], ["MXC", "MatrixCoin", ["CoinExchange"]], ["MXT", "MarteXcoin", ["CoinExchange"]], ["MYB", "MyBit", ["Cryptopia", "CoinExchange"]], ["MYST", "Mysterium", ["Bittrex"]], ["MZC", "MazaCoin", ["Cryptopia"]], ["NAMO", "NAMO COIN", ["Cryptopia"]], ["NAV", "NAVCoin", ["Poloniex", "Bittrex", "Cryptopia"]], ["NBIT", "netBit", ["CoinExchange"]], ["NBT", "Nubits", ["Bittrex"]], ["NBX", "NetBit", ["CoinExchange"]], ["NDAO", "NeuroDAO", ["Cryptopia"]], ["NEBL", "Neblio", ["Cryptopia", "Binance", "HitBtc"]], ["NEO", "Neo", ["Bittrex", "Cryptopia", "Bitfinex", "Binance", "HitBtc", "Livecoin"]], ["NEOG", "NeoGold", ["CoinExchange"]], ["NEON", "Nucleon", ["CoinExchange"]], ["NEOS", "Neoscoin", ["Poloniex", "Bittrex", "Bluetrade"]], ["NET", "NetCoin", ["Cryptopia"]], ["NETKO", "Netko", ["Cryptopia"]], ["NEVA", "NevaCoin", ["Cryptopia"]], ["NGC", "NAGA", ["HitBtc"]], ["NKA", "Incakoin", ["Cryptopia"]], ["NLC2", "NoLimitCoin", ["Cryptopia", "CoinExchange"]], ["NLG", "Gulden", ["Bittrex", "CoinExchange", "Bluetrade"]], ["NMC", "Namecoin", ["Poloniex", "Cryptopia", "TuxExchange", "Bluetrade", "Livecoin"]], ["NMR", "Numeraire", ["Bittrex"]], ["NOBL", "NobleCoin", ["Cryptopia"]], ["NOTE", "DNotes", ["Cryptopia"]], ["NRN", "Neuron", ["CoinExchange"]], ["NRO", "Neuro", ["CoinExchange"]], ["NTC", "Natcoin", ["CoinExchange"]], ["NTO", "Fujinto", ["HitBtc", "CoinExchange"]], ["NTRN", "Neutron", ["Cryptopia"]], ["NUA", "Neulaut", ["CoinExchange"]], ["NULS", "Nuls", ["Binance"]], ["NUMUS", "NumusCash", ["CoinExchange"]], ["NVC", "NovaCoin", ["Cryptopia", "Bluetrade", "Livecoin"]], ["NXC", "Nexium", ["Poloniex", "Bittrex", "HitBtc"]], ["NXS", "Nexus", ["Bittrex", "Cryptopia"]], ["NXT", "NXT", ["Poloniex", "Bittrex", "HitBtc", "Livecoin"]], ["NYAN", "NyanCoin", ["Cryptopia"]], ["OAX", "OpenANX", ["Binance", "HitBtc"]], ["OBITS", "Obits", ["Livecoin"]], ["OC", "OneCoin", ["CoinExchange"]], ["OD", "Opendollar", ["Livecoin"]], ["ODN", "Obsidian", ["Cryptopia", "HitBtc"]], ["OFF", "Cthulhu Offerings", ["Cryptopia"]], ["OGN", "OGNCoin", ["CoinExchange"]], ["OK", "OkCash", ["Bittrex", "Cryptopia", "Bluetrade"]], ["OMG", "OmiseGO", ["Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Binance", "HitBtc", "Livecoin"]], ["OMNI", "Omni", ["Poloniex", "Bittrex"]], ["ONION", "DeepOnion", ["Cryptopia"]], ["OOO", "Om", ["Cryptopia"]], ["OPAL", "Opalcoin", ["Cryptopia"]], ["OPC", "OP Coin", ["Cryptopia"]], ["OPT", "Opus", ["HitBtc"]], ["ORB", "OrbitCoin", ["Cryptopia"]], ["ORME", "OrmeusCoin", ["Cryptopia", "HitBtc"]], ["ORO", "Orocoin", ["CoinExchange"]], ["OSC", "Open Source Coin", ["Cryptopia"]], ["OST", "Simple Token", ["Binance"]], ["OTN", "Open Trading Network", ["Cryptopia", "HitBtc", "Livecoin"]], ["OTX", "Octanox", ["HitBtc"]], ["OX", "OX Fina", ["Cryptopia"]], ["OXY", "Oxycoin", ["Livecoin"]], ["PAK", "PakCoin", ["Cryptopia"]], ["PARIS", "Pariscoin", ["CoinExchange"]], ["PART", "Particl", ["Bittrex"]], ["PASC", "PascalCoin", ["Poloniex"]], ["PASL", "PascalLite", ["Cryptopia"]], ["PAY", "TenX Pay Token", ["Bittrex", "Cryptopia", "HitBtc", "Livecoin"]], ["PAYU", "PayUToken", ["CoinExchange"]], ["PBL", "Publica", ["Cryptopia"]], ["PCC", "PolishCoin", ["Cryptopia"]], ["PCN", "Peepcoin", ["CoinExchange"]], ["PCOIN", "PioneerCoin", ["Cryptopia"]], ["PCS", "Pabyosicoin Special", ["CoinExchange"]], ["PDC", "Project Decorum", ["Bittrex"]], ["PDG", "PinkDogCoin", ["CoinExchange"]], ["PEC", "PeaceCoin3.6", ["CoinExchange"]], ["PEPE", "PepeCoin", ["Cryptopia"]], ["PEPECASH", "Pepe Cash", ["TuxExchange"]], ["PGL", "ProspectorsGold", ["CoinExchange"]], ["PHN", "Phillion", ["CoinExchange"]], ["PHR", "Phore", ["Cryptopia"]], ["PHS", "PhilosopherStone", ["Cryptopia"]], ["PICO", "Pico", ["CoinExchange"]], ["PIGGY", "PiggyCoin", ["Cryptopia", "CoinExchange"]], ["PING", "CryptoPing", ["HitBtc"]], ["PINK", "Pinkcoin", ["Poloniex", "Bittrex", "Cryptopia"]], ["PIPL", "PiplCoin", ["Livecoin"]], ["PIRL", "Pirl", ["Cryptopia"]], ["PIVX", "Pivx", ["Bittrex", "Cryptopia", "CoinExchange", "Livecoin"]], ["PIX", "Lampix", ["HitBtc", "CoinExchange"]], ["PKB", "ParkByte", ["Bittrex"]], ["PKT", "PlaykeyToken", ["CoinExchange"]], ["PLACO", "PlayerCoin", ["CoinExchange"]], ["PLBT", "Polybius", ["HitBtc", "Livecoin"]], ["PLC", "Polcoin", ["Cryptopia"]], ["PLR", "Pillar", ["Cryptopia", "HitBtc"]], ["PLU", "Pluton", ["HitBtc"]], ["PLX", "PlexCoin", ["Cryptopia", "CoinExchange"]], ["POE", "Po.et", ["Binance", "HitBtc"]], ["POL", "PolarisCoin", ["CoinExchange"]], ["POLL", "ClearPoll", ["Cryptopia", "HitBtc"]], ["POLOB", "PoloBittShares", ["CoinExchange"]], ["POS", "Postoken", ["CoinExchange"]], ["POST", "PostCoin", ["Cryptopia", "CoinExchange", "Livecoin"]], ["POSW", "PoSWallet", ["Cryptopia", "CoinExchange", "Livecoin"]], ["POT", "PotCoin", ["Poloniex", "Bittrex", "Cryptopia", "TuxExchange", "CoinExchange", "Bluetrade"]], ["POWR", "PowerLedger", ["Bittrex", "Cryptopia", "Binance"]], ["PPC", "Peercoin", ["Poloniex", "Bittrex", "Cryptopia", "TuxExchange", "HitBtc", "Bluetrade", "Livecoin"]], ["PPT", "Populous", ["Binance", "HitBtc"]], ["PPY", "Peerplays", ["Livecoin"]], ["PR", "Prototanium", ["Cryptopia"]], ["PRES", "President Trump", ["Livecoin"]], ["PRG", "Paragon", ["HitBtc", "Livecoin"]], ["PRIMU", "Primulon", ["CoinExchange"]], ["PRN", "Protean", ["CoinExchange"]], ["PRO", "Propy", ["Livecoin"]], ["PROC", "ProCurrency", ["Cryptopia"]], ["PRS", "Presearch", ["HitBtc", "CoinExchange"]], ["PRX", "Printerium", ["CoinExchange"]], ["PT", "Porntoken", ["CoinExchange"]], ["PTC", "PesetaCoin ", ["Bittrex", "Cryptopia"]], ["PTOY", "Patientory", ["Bittrex", "HitBtc"]], ["PTS", "PitisCoin", ["CoinExchange"]], ["PURA", "Pura", ["Cryptopia", "CoinExchange"]], ["PURE", "Pure", ["CoinExchange"]], ["PUT", "PutinCoin", ["Cryptopia", "CoinExchange", "Livecoin"]], ["PWC", "Playwincoin", ["CoinExchange"]], ["PXC", "PhoenixCoin", ["Cryptopia"]], ["PXI", "Prime-XI", ["Cryptopia"]], ["Q2C", "Qubitcoin", ["Cryptopia"]], ["QAU", "Quantum", ["HitBtc", "Livecoin"]], ["QBT", "Cubits", ["Cryptopia"]], ["QCN", "QuazarCoin", ["HitBtc"]], ["QRK", "Quark", ["Cryptopia"]], ["QRL", "Quantum Resistant Ledger", ["Bittrex"]], ["QSH", "QASH", ["Bitfinex"]], ["QSP", "Quantstamp", ["Binance"]], ["QTL", "Quatloo", ["Cryptopia"]], ["QTUM", "Qtum", ["Bittrex", "Bitfinex", "Binance", "CoinExchange", "EXX", "Livecoin"]], ["QUANT", "QuantumCoin", ["CoinExchange"]], ["QWARK", "Qwark", ["Bittrex", "Cryptopia"]], ["R", "Revain", ["Cryptopia"]], ["RADS", "Radium", ["Poloniex", "Bittrex"]], ["RAIN", "Condensate", ["Cryptopia", "CoinExchange"]], ["RBIES", "Rubies", ["Livecoin"]], ["RBL", "RoyalBritishLegion", ["CoinExchange"]], ["RBT", "Rimbit", ["Cryptopia"]], ["RBY", "RubyCoin", ["Bittrex", "Cryptopia"]], ["RC", "RussiaCoin", ["Cryptopia"]], ["RCN", "Ripio Credit Network", ["Bittrex", "Binance"]], ["RDC", "RoundCoin", ["CoinExchange"]], ["RDD", "ReddCoin", ["Bittrex", "Cryptopia", "Bluetrade"]], ["RDN", "Raiden Network Token", ["Binance"]], ["REC", "Regalcoin", ["CoinExchange"]], ["RED", "RedCoin", ["Cryptopia"]], ["REE", "ReeCoin", ["Livecoin"]], ["REGA", "Rega", ["CoinExchange"]], ["REP", "Augur", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "HitBtc", "Livecoin"]], ["REQ", "Request Network", ["Binance"]], ["REX", "REX", ["CoinExchange"]], ["RHO", "Rhodiumcoin", ["CoinExchange"]], ["RIC", "Riecoin", ["Poloniex"]], ["RICKS", "PickleRicks", ["Cryptopia"]], ["RISE", "Rise", ["Bittrex"]], ["RIYA", "Etheriya", ["Cryptopia", "CoinExchange"]], ["RKC", "RoyalKingdomCoin", ["Cryptopia"]], ["RLC", "iEx.ec", ["Bittrex", "HitBtc", "Livecoin"]], ["RLT", "RouletteCoin", ["Livecoin"]], ["RMC", "Remicoin", ["CoinExchange"]], ["RNS", "RenosCoin", ["Cryptopia", "CoinExchange"]], ["ROC", "RoosterCoin", ["CoinExchange"]], ["ROOFS", "Roofs", ["CoinExchange"]], ["RPC", "RonPaulCoin", ["Cryptopia"]], ["RRT", "Recovery Right Tokens", ["Bitfinex"]], ["RUB", "RubbleCoin", ["CoinExchange"]], ["RUNE", "RuneStoneCoin", ["CoinExchange"]], ["RUNNERS", "Runners", ["CoinExchange"]], ["RUP", "Rupee", ["Cryptopia", "CoinExchange"]], ["RVT", "Rivetz", ["HitBtc"]], ["SAK", "SharkCoin", ["Cryptopia"]], ["SALT", "Salt", ["Bittrex", "Binance"]], ["SAN", "Santiment", ["Bitfinex"]], ["SAND", "BeachCoin", ["Cryptopia"]], ["SBC", "SBC Coin", ["Cryptopia"]], ["SBD", "Steem Dollars", ["Poloniex", "Bittrex", "HitBtc"]], ["SBIT", "StackBIT", ["CoinExchange"]], ["SBTC", "Super Bitcoin", ["HitBtc", "HitBtc", "HitBtc", "EXX"]], ["SC", "Siacoin", ["Poloniex", "Bittrex", "HitBtc"]], ["SCL", "Social", ["Cryptopia", "HitBtc", "CoinExchange"]], ["SCORE", "Scorecoin", ["Cryptopia", "CoinExchange"]], ["SDASH", "ScryptDashCoin", ["CoinExchange"]], ["SDRN", "Senderon", ["Cryptopia"]], ["SEL", "Selencoin", ["Cryptopia"]], ["SEND", "SocialSend", ["Cryptopia"]], ["SEQ", "Sequence", ["Bittrex"]], ["SFC", "SolarflareCoin", ["Cryptopia", "CoinExchange"]], ["SFE", "SafeCoin", ["CoinExchange"]], ["SGR", "SugarExchange", ["CoinExchange"]], ["SHA", "SHACoin2", ["Cryptopia"]], ["SHIFT", "Shift", ["Bittrex", "Livecoin"]], ["SHIT", "Shitcoin", ["CoinExchange"]], ["SHM", "Saham", ["CoinExchange"]], ["SHND", "StrongHands", ["CoinExchange"]], ["SHOT", "MoonShot", ["CoinExchange"]], ["SHRM", "Shrooms", ["Cryptopia"]], ["SIB", "Siberian Chervonets", ["Bittrex", "Cryptopia", "Livecoin"]], ["SILK2", "SilkCoin2", ["CoinExchange"]], ["SIMP", "Simplecash", ["CoinExchange"]], ["SISA", "SISA Token", ["HitBtc", "CoinExchange"]], ["SKC", "SkeinCoin", ["Cryptopia"]], ["SKIN", "SkinCoin", ["Cryptopia", "HitBtc"]], ["SKOIN", "Skoincoin", ["CoinExchange"]], ["SKR", "SakuraCoin", ["Cryptopia"]], ["SKULL", "PirateBlocks", ["CoinExchange"]], ["SKY", "Skycoin", ["Cryptopia"]], ["SLEVIN", "Slevin", ["CoinExchange"]], ["SLG", "Sterlingcoin", ["Cryptopia", "Bluetrade"]], ["SLR", "SolarCoin", ["Bittrex", "CoinExchange", "Bluetrade", "Livecoin"]], ["SLS", "SaluS", ["Bittrex"]], ["SMART", "SmartCash", ["Cryptopia", "HitBtc", "CoinExchange"]], ["SMC", "SmartCoin", ["Cryptopia"]], ["SMS", "SMSCoin", ["HitBtc", "CoinExchange"]], ["SNC", "SunContract", ["HitBtc"]], ["SNGLS", "SingularDTV", ["Binance", "HitBtc", "Livecoin"]], ["SNM", "SONM", ["Binance"]], ["SNOW", "SnowCoin", ["CoinExchange"]], ["SNRG", "Synergy", ["Bittrex"]], ["SNT", "Status Network Token", ["Bittrex", "Binance", "HitBtc", "Livecoin"]], ["SOAR", "SoarCoin", ["Livecoin"]], ["SOIL", "SoilCoin", ["Cryptopia"]], ["SOLAR", "Solar", ["CoinExchange"]], ["SONG", "Songcoin", ["Cryptopia"]], ["SOON", "SoonCoin", ["Cryptopia"]], ["SPACE", "SpaceCoin", ["Cryptopia"]], ["SPF", "SportyFi", ["Livecoin"]], ["SPHR", "Sphere", ["Bittrex"]], ["SPR", "SpreadCoin", ["Bittrex", "Cryptopia"]], ["SPRTS", "Sprouts", ["CoinExchange"]], ["SPT", "Spots", ["Cryptopia"]], ["SQL", "SquallCoin", ["Cryptopia"]], ["SRC", "SecureCoin", ["Cryptopia", "CoinExchange"]], ["SST", "SSTCoin", ["CoinExchange"]], ["STARS", "StarCash", ["CoinExchange"]], ["START", "StartCoin", ["Bittrex", "Cryptopia", "Bluetrade"]], ["STC", "StopTrumpCoin", ["Cryptopia"]], ["STEEM", "STEEM", ["Poloniex", "Bittrex", "HitBtc"]], ["STO", "SaveTheOceanCoin", ["CoinExchange"]], ["STORJ", "Storj", ["Poloniex", "Bittrex", "Binance", "Livecoin"]], ["STORM", "STORM", ["HitBtc"]], ["STR", "Stellar", ["Poloniex"]], ["STRAT", "Stratis", ["Poloniex", "Bittrex", "Cryptopia", "Binance", "HitBtc", "Livecoin"]], ["STRC", "StarCredits", ["Cryptopia"]], ["STU", "Student Coin", ["HitBtc"]], ["STV", "Sativacoin", ["Cryptopia"]], ["STX", "Stox", ["HitBtc", "CoinExchange"]], ["SUB", "Substratum", ["Binance", "HitBtc"]], ["SUMO", "Sumokoin", ["Cryptopia", "Livecoin"]], ["SUPER", "SuperCoin", ["CoinExchange"]], ["SUPERMAN", "Superman", ["CoinExchange"]], ["SUR", "Suretly", ["HitBtc"]], ["SURGE", "SurgeCoin", ["CoinExchange"]], ["SWFTC", "SwftCoin", ["HitBtc"]], ["SWIFT", "Bitswift", ["Bittrex"]], ["SWING", "Swingcoin", ["Cryptopia"]], ["SWT", "Swarm City Token", ["Bittrex", "HitBtc"]], ["SXC", "Sexcoin", ["Cryptopia", "Livecoin"]], ["SYNQ", "BitSynq", ["CoinExchange"]], ["SYNX", "Syndicate", ["Bittrex", "Cryptopia", "CoinExchange"]], ["SYS", "Syscoin", ["Poloniex", "Bittrex", "TuxExchange", "Livecoin"]], ["TAAS", "Token-as-a-Service", ["HitBtc", "CoinExchange", "Livecoin"]], ["TAJ", "Tajcoin", ["Cryptopia"]], ["TBS", "The Basis", ["CoinExchange"]], ["TCOIN", "T-Coin", ["CoinExchange"]], ["TEK", "TEKcoin", ["Cryptopia"]], ["TELL", "Tellurion", ["CoinExchange"]], ["TER", "TerraNova", ["Cryptopia", "CoinExchange", "Livecoin"]], ["TES", "TeslaCoin", ["Cryptopia"]], ["TGC", "TigerCoin", ["Cryptopia", "CoinExchange"]], ["TGT", "Target Coin", ["HitBtc", "CoinExchange"]], ["THC", "HempCoin", ["Bittrex"]], ["THS", "TechShares", ["Livecoin"]], ["TIME", "Chronobank", ["HitBtc", "Livecoin"]], ["TIPS", "Fedoracoin", ["CoinExchange"]], ["TIT", "TitCoin", ["Cryptopia"]], ["TIX", "Blocktix", ["Bittrex", "Cryptopia"]], ["TKN", "TokenCard", ["HitBtc", "Livecoin"]], ["TKS", "Tokes", ["Bittrex"]], ["TLE", "TattoocoinLimitedEdition", ["CoinExchange"]], ["TNB", "Time New Bank", ["Binance"]], ["TNT", "Tierion", ["Binance", "HitBtc"]], ["TOA", "TOACoin", ["Cryptopia"]], ["TOK", "TokugawaCoin", ["Cryptopia"]], ["TOP", "TopCoin", ["Cryptopia"]], ["TOPAZ", "TopazCoin", ["CoinExchange"]], ["TOR", "TorCoin", ["CoinExchange"]], ["TPC", "TrumPenceCoin", ["CoinExchange"]], ["TPG", "Trollpayment", ["CoinExchange"]], ["TPI", "TPICoin", ["CoinExchange"]], ["TRANCE", "Trancecoin", ["CoinExchange"]], ["TRC", "TerraCoin", ["Cryptopia", "CoinExchange"]], ["TRI", "Triangles", ["Cryptopia"]], ["TRIG", "TRIG Token", ["Bittrex"]], ["TRK", "TruckCoin", ["Cryptopia"]], ["TROLL", "Trollcoin 2.0", ["Bluetrade"]], ["TRST", "Trustcoin", ["Bittrex", "HitBtc", "Livecoin"]], ["TRUMP", "Trumpcoin", ["Cryptopia", "Livecoin"]], ["TRUST", "TrustPlus", ["Bittrex"]], ["TRUX", "TreauxCoin", ["CoinExchange"]], ["TRX", "TRON", ["Binance", "HitBtc"]], ["TSE", "TattooCoin", ["Cryptopia", "CoinExchange"]], ["TSL", "Energo Labs", ["EXX"]], ["TSTR", "TristarCoin", ["CoinExchange"]], ["TTC", "TittieCoin", ["Cryptopia"]], ["TURBO", "TurboCoin", ["CoinExchange"]], ["TV", "Ti-Value", ["EXX"]], ["TX", "TransferCoin", ["Bittrex", "Cryptopia", "Livecoin"]], ["TZC", "Trezarcoin", ["Cryptopia"]], ["UBQ", "Ubiq", ["Bittrex", "Cryptopia"]], ["UBTC", "UnitedBitcoin", ["EXX"]], ["UFO", "UFOCoin", ["CoinExchange"]], ["UGT", "UG Token", ["HitBtc"]], ["UIS", "Unitus", ["Cryptopia"]], ["UK", "UKCoin", ["CoinExchange"]], ["ULA", "UlaTech", ["CoinExchange"]], ["UMO", "UniversalMolecule", ["Cryptopia"]], ["UNB", "UnbreakableCoin", ["Bittrex"]], ["UNC", "UNCoin", ["Livecoin"]], ["UNIC", "UniCoin", ["Cryptopia"]], ["UNIFY", "Unify", ["Cryptopia", "CoinExchange"]], ["UNIT", "UniversalCurrency", ["Cryptopia", "CoinExchange"]], ["UNITS", "GameUnits", ["Cryptopia"]], ["UNO", "Unobtanium", ["Cryptopia", "CoinExchange", "Bluetrade"]], ["UNRC", "Universal Royal Coin", ["Livecoin"]], ["UNY", "UnityIngot", ["Livecoin"]], ["UP", "UpscaleToken", ["CoinExchange"]], ["UQC", "UquidCoin", ["CoinExchange", "Livecoin"]], ["UR", "UR", ["Cryptopia"]], ["USA", "USACoin", ["CoinExchange"]], ["USDT", "Tether USD", ["Poloniex"]], ["UTC", "Ultracoin", ["Cryptopia"]], ["V", "Version", ["Cryptopia"]], ["VC", "VirtualCoin", ["CoinExchange"]], ["VCC", "VaderCorpCoin", ["Cryptopia"]], ["VEN", "VeChain", ["Binance", "HitBtc"]], ["VERI", "Veritaseum", ["HitBtc"]], ["VGS", "LasVegasCoin", ["CoinExchange"]], ["VIA", "Viacoin", ["Poloniex", "Bittrex"]], ["VIB", "Viberate", ["Bittrex", "Binance", "HitBtc", "Livecoin"]], ["VIBE", "Vibe Coin", ["HitBtc"]], ["VIDZ", "PureVidz", ["Cryptopia", "CoinExchange"]], ["VISIO", "Visio", ["CoinExchange"]], ["VIVO", "Vivo", ["Cryptopia"]], ["VLTC", "Vaultcoin", ["CoinExchange", "Livecoin"]], ["VOISE", "VOISE", ["Cryptopia", "HitBtc", "CoinExchange", "Livecoin"]], ["VOX", "Voxels", ["Bittrex", "CoinExchange", "Livecoin"]], ["VRC", "VeriCoin", ["Poloniex", "Bittrex", "Cryptopia", "Bluetrade", "Livecoin"]], ["VRM", "Verium", ["Bittrex", "Cryptopia", "Livecoin"]], ["VRS", "VEROS", ["Livecoin"]], ["VSL", "vSlice", ["Livecoin"]], ["VSX", "VsyncX", ["CoinExchange"]], ["VTC", "Vertcoin", ["Poloniex", "Bittrex", "Bluetrade"]], ["VTR", "vTorrent", ["Bittrex"]], ["VUC", "VirtaUniqueCoin", ["Cryptopia"]], ["VULCANO", "Vulcanocoin", ["CoinExchange"]], ["WABI", "WaBi", ["Binance"]], ["WASH", "WashingtonCoin", ["CoinExchange"]], ["WAVES", "Waves", ["Bittrex", "Exmo", "Binance", "HitBtc", "Livecoin"]], ["WC", "Wincoin", ["Cryptopia"]], ["WCL", "Wowclassic", ["CoinExchange"]], ["WDC", "WorldCoin", ["Cryptopia", "Bluetrade"]], ["WEED", "Weed", ["Cryptopia"]], ["WIC", "WiCoin", ["Livecoin"]], ["WILD", "WildCrypto", ["Cryptopia"]], ["WINGS", "Wings DAO", ["Bittrex", "HitBtc", "Livecoin"]], ["WINK", "WinkCoin", ["CoinExchange"]], ["WLC", "WirelessCoin", ["Cryptopia"]], ["WMGO", "MobileGo", ["HitBtc"]], ["WOMEN", "WomenCoin", ["CoinExchange"]], ["WORM", "HealthyWormCoin", ["CoinExchange"]], ["WOW", "Wowcoin", ["CoinExchange"]], ["WRC", "WarCoin", ["Cryptopia", "HitBtc"]], ["WRP", "Wrapper", ["CoinExchange"]], ["WSX", "WeAreSatoshi", ["Cryptopia"]], ["WTC", "Walton", ["Binance", "HitBtc"]], ["WTT", "Giga Watt", ["HitBtc"]], ["WW", "WayaWolfCoin", ["Cryptopia"]], ["WYV", "Wyvern", ["CoinExchange"]], ["XAUR", "Xaurum", ["HitBtc", "Livecoin"]], ["XBC", "BitcoinPlus", ["Poloniex", "Cryptopia", "CoinExchange"]], ["XBL", "Billionaire Token", ["Cryptopia", "CoinExchange"]], ["XBTS", "BeatCoin", ["Cryptopia"]], ["XBU", "Ubercoin", ["CoinExchange"]], ["XBY", "XTRABYTES", ["Cryptopia"]], ["XCHE", "CheCoin", ["CoinExchange"]], ["XCO", "Xcoin", ["Cryptopia"]], ["XCP", "Counterparty", ["Poloniex", "Bittrex", "TuxExchange"]], ["XCPO", "COPICO", ["Cryptopia"]], ["XCRE", "Creatio", ["Cryptopia"]], ["XCS", "CybCSec", ["CoinExchange"]], ["XCT", "C-bit", ["Cryptopia", "CoinExchange"]], ["XCXT", "CoinonatX", ["Cryptopia", "CoinExchange"]], ["XDE2", "Xde2", ["CoinExchange"]], ["XDN", "DigitalNote", ["Bittrex", "HitBtc"]], ["XEL", "Elastic", ["Bittrex"]], ["XEM", "NEM", ["Poloniex", "Bittrex", "Cryptopia", "HitBtc", "Livecoin"]], ["XEV", "EvoPoints", ["CoinExchange"]], ["XFT", "FootyCash", ["Cryptopia"]], ["XGOX", "XGOX", ["Cryptopia", "CoinExchange"]], ["XGR", "GoldReserve", ["Cryptopia"]], ["XGTC", "GirlsTokenCoin", ["CoinExchange"]], ["XID", "Sphre", ["Cryptopia"]], ["XJO", "JouleCoin", ["Cryptopia"]], ["XLC", "LeviarCoin", ["Cryptopia", "HitBtc"]], ["XLM", "Lumen", ["Kraken", "Bittrex", "Binance"]], ["XLR", "Solaris", ["CoinExchange"]], ["XMCC", "MonacoCoin", ["Cryptopia", "CoinExchange"]], ["XMG", "Magi", ["Bittrex", "Cryptopia"]], ["XMR", "Monero", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Exmo", "Binance", "TuxExchange", "HitBtc", "Livecoin"]], ["XMS", "Moonstone DAC", ["Livecoin"]], ["XMY", "Myriad", ["Bittrex", "Cryptopia"]], ["XP", "XP", ["CoinExchange"]], ["XPASC", "PascalClassic", ["CoinExchange"]], ["XPD", "PetroDollar", ["Cryptopia"]], ["XPM", "Primecoin", ["Poloniex", "Cryptopia", "Bluetrade"]], ["XPTX", "PlatinumBar", ["Cryptopia"]], ["XQN", "Quotient", ["CoinExchange"]], ["XRA", "RateCoin", ["Cryptopia"]], ["XRC", "Rawcoin", ["Livecoin"]], ["XRE", "Revolvercoin", ["Cryptopia"]], ["XRL", "Rialto", ["Livecoin"]], ["XRP", "Ripple", ["Kraken", "Poloniex", "Bittrex", "Bitfinex", "Bitstamp", "Exmo", "Binance", "HitBtc"]], ["XRY", "Royalties", ["Cryptopia"]], ["XSA", "Sigma", ["CoinExchange"]], ["XSPEC", "SpectreCoin", ["Cryptopia", "Livecoin"]], ["XST", "StealthCoin", ["Bittrex", "Cryptopia"]], ["XSTC", "Safetradecoin", ["CoinExchange"]], ["XTD", "XTDCoin", ["CoinExchange"]], ["XTZ", "Tezos", ["HitBtc"]], ["XUC", "Exchange Union", ["HitBtc"]], ["XVC", "Vcash", ["Poloniex", "Bittrex"]], ["XVG", "Verge", ["Bittrex", "Cryptopia", "Binance", "HitBtc"]], ["XVP", "Virtacoin Plus", ["Bluetrade"]], ["XVS", "Vsync", ["CoinExchange"]], ["XWC", "WhiteCoin", ["Bittrex", "EXX"]], ["XXX", "XxXCoin", ["CoinExchange"]], ["XYOC", "YocoinClassic", ["CoinExchange"]], ["XYZ", "XYZCoin", ["CoinExchange"]], ["XZC", "ZCoin", ["Bittrex", "Cryptopia", "Binance", "CoinExchange"]], ["XZCD", "ZcoinDark", ["CoinExchange"]], ["YHC", "YokohamaCoin", ["CoinExchange"]], ["YOC", "Yocoin", ["Livecoin"]], ["YOVI", "YobitCoin", ["Cryptopia"]], ["YOYOW", "YOYOW", ["Binance", "HitBtc"]], ["ZAP", "Zap", ["Cryptopia", "HitBtc"]], ["ZBC", "Zilbercoin", ["Livecoin"]], ["ZCC", "ZcCoin", ["CoinExchange"]], ["ZCG", "ZCashGold", ["CoinExchange"]], ["ZCL", "Zclassic", ["Bittrex", "Cryptopia", "CoinExchange"]], ["ZEC", "Zcash", ["Kraken", "Poloniex", "Bittrex", "Cryptopia", "Bitfinex", "Exmo", "Binance", "TuxExchange", "HitBtc", "CoinExchange"]], ["ZEIT", "ZeitCoin", ["Cryptopia", "CoinExchange"]], ["ZEN", "ZenCash", ["Bittrex", "Cryptopia"]], ["ZENI", "Zennies", ["CoinExchange"]], ["ZER", "Zero", ["Cryptopia"]], ["ZET", "ZetaCoin", ["Cryptopia", "Bluetrade"]], ["ZMC", "ZMicron", ["CoinExchange"]], ["ZOI", "Zoin", ["Cryptopia", "CoinExchange"]], ["ZRC", "ZrCoin", ["HitBtc"]], ["ZRX", "0x", ["Poloniex", "Binance", "HitBtc", "Livecoin"]], ["ZSC", "Zeus Shield Coin", ["HitBtc"]], ["ZSE", "ZSEcoin", ["Cryptopia", "CoinExchange"]], ["ZURMO", "XZurmo", ["CoinExchange"]], ["ZZC", "ZoZoCoin", ["CoinExchange"]], ["eETT", "Ethereum EncryptoTel", ["Livecoin"]], ["wETT", "Waves EncryptoTel", ["Livecoin"]]];

    return {
        array: array
    };
}();

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(382);
var array = __webpack_require__(140);
var getNames = __webpack_require__(383);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Binance = {

        key: 'Binance',
        name: 'Binance',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_TICKER_BINANCE
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.BINANCE
        },
        url: {
            publicURL: url.BINANCE_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Binance: Binance
    };
}();

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BINANCE_URL = "https://www.binance.com/";
    var BINANCE_URL_TRADE = BINANCE_URL + "trade.html?symbol={SHORTSYMBOL}_BTC";
    var REST_PUBLIC_BINANCE = "https://api.binance.com/api/v1/";
    var REST_TICKER_BINANCE = REST_PUBLIC_BINANCE + "ticker/24hr";

    return {
        REST_TICKER_BINANCE: REST_TICKER_BINANCE,
        BINANCE_URL_TRADE: BINANCE_URL_TRADE
    };
}();

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var coinArrayOfBinance = __webpack_require__(140);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.json).filter(function (elements) {
            return newData.json[elements].symbol.indexOf('BTC') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newData.json[newArray[0][elementss]].symbol.replace('BTC', '')];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfBinance.BINANCE,
            justGenerated: otherNewArray,
            exchangeName: 'Binance'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(385);
var array = __webpack_require__(141);
var getNames = __webpack_require__(386);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Bitfinex = {

        key: 'Bitfinex',
        name: 'Bitfinex',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_CURRENCY_BITFINEX
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.BITFINEX
        },
        url: {
            publicURL: url.BITIFINEX_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Bitfinex: Bitfinex
    };
}();

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BITFINEX_URL = "https://www.bitfinex.com/";
    var BITIFINEX_URL_TRADE = BITFINEX_URL + "t/{SHORTSYMBOL}:BTC";
    var REST_PUBLIC_BITFINEX = "https://api.bitfinex.com/v1/";
    var REST_CURRENCY_BITFINEX = REST_PUBLIC_BITFINEX + "symbols";

    return {
        REST_CURRENCY_BITFINEX: REST_CURRENCY_BITFINEX,
        BITIFINEX_URL_TRADE: BITIFINEX_URL_TRADE
    };
}();

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var coinArrayOfBitfinex = __webpack_require__(141);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.json).filter(function (elements) {
            return newData.json[elements].indexOf('btc') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', newData.json[newArray[0][elementss]], newData.json[newArray[0][elementss]].replace('btc', '').toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfBitfinex.BITFINEX,
            justGenerated: otherNewArray,
            exchangeName: 'Bitfinex'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(388);
var array = __webpack_require__(142);
var getNames = __webpack_require__(389);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Bitstamp = {

        key: 'Bitstamp',
        name: 'Bitstamp',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_CURRENCY_BITSTAMP
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.BITSTAMP
        },
        url: {
            publicURL: url.BITSTAMP_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Bitstamp: Bitstamp
    };
}();

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BITSTAMP_URL = "https://www.bitstamp.net/";
    var BITSTAMP_URL_TRADE = BITSTAMP_URL + "market/tradeview/";
    var REST_PUBLIC_BITSTAMP = 'https://www.bitstamp.net/api/v2/';
    var REST_CURRENCY_BITSTAMP = REST_PUBLIC_BITSTAMP + '/trading-pairs-info/';

    return {
        REST_CURRENCY_BITSTAMP: REST_CURRENCY_BITSTAMP,
        BITSTAMP_URL_TRADE: BITSTAMP_URL_TRADE
    };
}();

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var coinArrayOfBitstamp = __webpack_require__(142);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.json).filter(function (elements) {
            return newData.json[elements].name.indexOf('BTC') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', newData.json[newArray[0][elementss]].url_symbol, newData.json[newArray[0][elementss]].name.replace('/BTC', '').toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfBitstamp.BITSTAMP,
            justGenerated: otherNewArray,
            exchangeName: 'Bitstamp'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(391);
var array = __webpack_require__(143);
var getNames = __webpack_require__(392);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Bitrrex = {

        key: 'Bittrex',
        name: 'Bittrex',
        getNamesForList: {
            needReq: true,
            req: {
                multi: true,
                fun: requestModule.multipleRequestsWithProxy,
                url: {
                    url1: url.REST_CURRENCY_BITTREX,
                    url2: url.REST_TICKER_BITTREX
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.BITTREX
        },
        url: {
            publicURL: url.BITTREX_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Bitrrex: Bitrrex
    };
}();

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BITTREX_URL = "https://bittrex.com/";
    var BITTREX_URL_TRADE = BITTREX_URL + "Market/Index?MarketName=BTC-{SHORTSYMBOL}";
    var REST_PUBLIC_BITTREX = "https://www.bittrex.com/api/v1.1/public/";
    var REST_CURRENCY_BITTREX = REST_PUBLIC_BITTREX + 'getcurrencies';
    var REST_TICKER_BITTREX = REST_PUBLIC_BITTREX + 'getmarketsummaries';

    return {
        REST_CURRENCY_BITTREX: REST_CURRENCY_BITTREX,
        REST_TICKER_BITTREX: REST_TICKER_BITTREX,
        BITTREX_URL_TRADE: BITTREX_URL_TRADE
    };
}();

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var coinArrayOfBittrex = __webpack_require__(143);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var obje = newData[1].result;
        var object = newData[0].result;
        var newObject = Object.keys(object).filter(function (key) {
            return object[key].IsActive === "true";
        });
        var otherNewArray = [];
        otherNewArray.push(Object.keys(obje).map(function (elements) {
            return newObject.filter(function (element) {
                return "BTC-" + object[element].Currency === obje[elements].MarketName;
            });
        }).filter(function (el) {
            return el.length != 0;
        }).map(function (elementje) {
            return [object[elementje].CurrencyLong, "", object[elementje].Currency];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfBittrex.BITTREX,
            justGenerated: otherNewArray,
            exchangeName: 'Bittrex'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(394);
var array = __webpack_require__(144);
var getNames = __webpack_require__(395);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var BitZ = {

        key: 'BitZ',
        name: 'BitZ',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_TICKER_BITZ
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.BITZ
        },
        url: {
            publicURL: url.BITZ_URL_TRADE,
            isCapital: false
        }
    };

    return {
        BitZ: BitZ
    };
}();

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var BITZ_URL = "https://www.bit-z.com/";
    var BITZ_URL_TRADE = BITZ_URL + "exchange/{SHORTSYMBOL}_btc";

    var REST_PUBLIC_BITZ = "https://www.bit-z.com/api_v1/";
    var REST_TICKER_BITZ = REST_PUBLIC_BITZ + 'tickerall';

    return {
        REST_TICKER_BITZ: REST_TICKER_BITZ,
        BITZ_URL_TRADE: BITZ_URL_TRADE
    };
}();

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var coinArrayOfBitZ = __webpack_require__(144);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.data).filter(function (elements) {
            return elements.indexOf('_btc') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newArray[0][elementss].replace('_btc', '').toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfBitZ.BITZ,
            justGenerated: otherNewArray,
            exchangeName: 'BitZ'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(397);
var array = __webpack_require__(145);
var getNames = __webpack_require__(398);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var CCex = {

        key: 'CCex',
        name: 'C-Cex',
        getNamesForList: {
            needReq: true,
            req: {
                multi: true,
                fun: requestModule.multipleRequestsWithProxy,
                url: {
                    url1: url.REST_CURRENCY_CCEX,
                    url2: url.REST_TICKER_CCEX
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.CCEX
        },
        url: {
            publicURL: url.CCEX_URL_TRADE,
            isCapital: true
        }
    };

    return {
        CCex: CCex
    };
}();

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var CCEX_URL = "https://c-cex.com/";
    var CCEX_URL_TRADE = CCEX_URL + "?p={SHORTSYMBOL}-btc";
    var REST_PUBLIC_CCEX = "https://c-cex.com/t/";
    var REST_CURRENCY_CCEX = REST_PUBLIC_CCEX + "coinnames.json";
    var REST_TICKER_CCEX = REST_PUBLIC_CCEX + "prices.json";

    return {
        REST_CURRENCY_CCEX: REST_CURRENCY_CCEX,
        REST_TICKER_CCEX: REST_TICKER_CCEX,
        CCEX_URL_TRADE: CCEX_URL_TRADE
    };
}();

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfCCEX = __webpack_require__(145);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var obje = newData[1];
        var object = newData[0];
        var otherNewArray = [];
        otherNewArray.push(Object.keys(obje).map(function (pair) {
            return Object.keys(object).filter(function (shortName) {
                return shortName + '-btc' === pair && shortName != 'usd';
            });
        }).filter(function (el) {
            return el.length != 0;
        }).map(function (elementje) {
            return [object[elementje], ' ', elementje.toString().toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfCCEX.CCEX,
            justGenerated: otherNewArray,
            exchangeName: 'CCEX'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(400);
var array = __webpack_require__(146);
var getNames = __webpack_require__(401);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Coinbene = {

        key: 'Coinbene',
        name: 'Coinbene',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNames,
                url: {
                    url1: url.REST_TICKER_COINBENE
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.COINBENE
        },
        url: {
            publicURL: url.COINBENE_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Coinbene: Coinbene
    };
}();

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var COINBENE_URL = "https://www.coinbene.com/";
    var COINBENE_URL_TRADE = COINBENE_URL + "#/market?pairId=2";
    var REST_PUBLIC_COINBENE = "https://api.coinbene.com/v1/market/";
    var REST_TICKER_COINBENE = REST_PUBLIC_COINBENE + 'ticker?symbol=all';

    return {
        REST_TICKER_COINBENE: REST_TICKER_COINBENE,
        COINBENE_URL_TRADE: COINBENE_URL_TRADE
    };
}();

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfCoinbene = __webpack_require__(146);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.ticker).filter(function (elements) {
            return newData.ticker[elements].symbol.indexOf('BTC') > 1 && !(newData.ticker[elements].symbol === 'BTCUSDT');
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newData.ticker[newArray[0][elementss]].symbol.replace('BTC', '')];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfCoinbene.COINBENE,
            justGenerated: otherNewArray,
            exchangeName: 'Coinbene'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(403);
var array = __webpack_require__(147);
var getNames = __webpack_require__(404);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var CoinEgg = {

        key: 'CoinEgg',
        name: 'CoinEgg',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_TICKER_COINEGG
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.COINEGG
        },
        url: {
            publicURL: url.COINEGG_URL_TRADE,
            isCapital: false
        }
    };

    return {
        CoinEgg: CoinEgg
    };
}();

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var COINEGG_URL = "https://www.coinegg.com/";
    var COINEGG_URL_TRADE = COINEGG_URL + "btc/{SHORTSYMBOL}/";
    var REST_PUBLIC_COINEGG = "https://api.coinegg.com/api/v1/";
    var REST_TICKER_COINEGG = REST_PUBLIC_COINEGG + 'allticker/region/btc';

    return {
        REST_TICKER_COINEGG: REST_TICKER_COINEGG,
        COINEGG_URL_TRADE: COINEGG_URL_TRADE
    };
}();

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfCoinEgg = __webpack_require__(147);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData).filter(function (elements) {
            return elements;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newArray[0][elementss].toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfCoinEgg.COINEGG,
            justGenerated: otherNewArray,
            exchangeName: 'CoinEgg'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(406);
var array = __webpack_require__(148);
var getNames = __webpack_require__(407);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var CoinExchange = {

        key: 'CoinExchange',
        name: 'CoinExchange',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_CURRENCY_COINEXCHANGE
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.COINEXCHANGE
        },
        url: {
            publicURL: url.COINEXCHANGE_URL_TRADE,
            isCapital: true
        }

    };

    return {
        CoinExchange: CoinExchange
    };
}();

/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var COINEXCHANGE_URL = "https://www.coinexchange.io/";
    var COINEXCHANGE_URL_TRADE = COINEXCHANGE_URL + "market/{SHORTSYMBOL}/BTC";
    var REST_PUBLIC_COINEXCHANGE = "http://www.coinexchange.io/api/v1/";
    var REST_CURRENCY_COINEXCHANGE = REST_PUBLIC_COINEXCHANGE + "getmarkets";

    return {
        REST_CURRENCY_COINEXCHANGE: REST_CURRENCY_COINEXCHANGE,
        COINEXCHANGE_URL_TRADE: COINEXCHANGE_URL_TRADE
    };
}();

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfCoinExchange = __webpack_require__(148);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var obje = newData.result;
        var otherNewArray = [];
        otherNewArray.push(Object.keys(obje).filter(function (key) {
            return obje[key].Active === "true" && obje[key].BaseCurrencyCode === "BTC";
        }).filter(function (el) {
            return el.length != 0;
        }).map(function (elementje) {
            return [obje[elementje].MarketAssetName, ' ', obje[elementje].MarketAssetCode];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfCoinExchange.COINEXCHANGE,
            justGenerated: otherNewArray,
            exchangeName: 'CoinExchange'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(409);
var array = __webpack_require__(149);
var getNames = __webpack_require__(410);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Cryptopia = {

        key: 'Cryptopia',
        name: 'Cryptopia',
        getNamesForList: {
            needReq: true,
            req: {
                multi: true,
                fun: requestModule.multipleRequests,
                url: {
                    url1: url.REST_CURRENCY_CRYPTOPIA,
                    url2: url.REST_TICKER_CRYPTOPIA
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.CRYPTOPIA
        },
        url: {
            publicURL: url.CRYPTOPIA_URL_TRADE,
            isCapital: true
        }

    };

    return {
        Cryptopia: Cryptopia
    };
}();

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var CRYPTOPIA_URL = "https://www.cryptopia.co.nz/";
    var CRYPTOPIA_URL_TRADE = CRYPTOPIA_URL + "Exchange/?market={SHORTSYMBOL}_BTC";
    var REST_PUBLIC_CRYPTOPIA = "https://www.cryptopia.co.nz/api/";
    var REST_CURRENCY_CRYPTOPIA = REST_PUBLIC_CRYPTOPIA + "GetCurrencies";
    var REST_TICKER_CRYPTOPIA = REST_PUBLIC_CRYPTOPIA + "GetMarkets/BTC";

    return {
        REST_CURRENCY_CRYPTOPIA: REST_CURRENCY_CRYPTOPIA,
        REST_TICKER_CRYPTOPIA: REST_TICKER_CRYPTOPIA,
        CRYPTOPIA_URL_TRADE: CRYPTOPIA_URL_TRADE
    };
}();

/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfCryptopia = __webpack_require__(149);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var obje = newData[1].Data;
        var object = newData[0].Data;
        var newObject = Object.keys(object).filter(function (key) {
            return object[key].ListingStatus === 'Active';
        });
        var otherNewArray = [];
        otherNewArray.push(Object.keys(obje).map(function (elements) {
            return newObject.filter(function (element) {
                return object[element].Symbol + "/BTC" === obje[elements].Label;
            });
        }).filter(function (el) {
            return el.length != 0;
        }).map(function (elementje) {
            return [object[elementje].Name, ' ', object[elementje].Symbol];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfCryptopia.CRYPTOPIA,
            justGenerated: otherNewArray,
            exchangeName: 'Cryptopia'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 30/03/2018.
 */

var url = __webpack_require__(412);
var array = __webpack_require__(150);
var getNames = __webpack_require__(413);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Exmo = {

        key: 'Exmo',
        name: 'Exmo',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNames,
                url: {
                    url1: url.REST_TICKER_EXMO
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.EXMO
        },
        url: {
            publicURL: url.EXMO_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Exmo: Exmo
    };
}();

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 30/03/2018.
 */

module.exports = function () {

    var EXMO_URL = "https://exmo.com/en/";
    var EXMO_URL_TRADE = EXMO_URL + "trade#?pair={SHORTSYMBOL}_BTC";
    var REST_PUBLIC_EXMO = "https://api.exmo.com/v1/";
    var REST_TICKER_EXMO = REST_PUBLIC_EXMO + 'ticker/';

    return {
        REST_TICKER_EXMO: REST_TICKER_EXMO,
        EXMO_URL_TRADE: EXMO_URL_TRADE
    };
}();

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 30/03/2018.
 */

var coinArrayOfExmo = __webpack_require__(150);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData).filter(function (elements) {
            return elements.indexOf('_BTC') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newArray[0][elementss].replace('_BTC', '')];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfExmo.EXMO,
            justGenerated: otherNewArray,
            exchangeName: 'Exmo'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(415);
var array = __webpack_require__(151);
var getNames = __webpack_require__(416);
module.exports = function () {

    var Extrade = {

        key: 'ExTrade',
        name: '1ExTrade',
        getNamesForList: {
            needReq: false,
            req: {
                url: {}
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.EXTRADE
        },
        url: {
            publicURL: url.EXTRADE_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Extrade: Extrade
    };
}();

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var EXTRADE_URL = "https://1ex.trade/";
    var EXTRADE_URL_TRADE = EXTRADE_URL + "";

    return {
        EXTRADE_URL_TRADE: EXTRADE_URL_TRADE
    };
}();

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var coinArrayOfExtrade = __webpack_require__(151);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames() {
        var otherNewArray = [[]];
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfExtrade.EXTRADE,
            justGenerated: otherNewArray,
            exchangeName: 'Extrade'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 29/03/2018.
 */

var url = __webpack_require__(418);
var array = __webpack_require__(152);
var getNames = __webpack_require__(419);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var EXX = {

        key: 'EXX',
        name: 'EXX',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_TICKER_EXX
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.EXX
        },
        url: {
            publicURL: url.EXX_URL_TRADE,
            isCapital: false
        }
    };

    return {
        EXX: EXX
    };
}();

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 29/03/2018.
 */

module.exports = function () {

    var EXX_URL = "https://www.exxvip.com/";
    var EXX_URL_TRADE = EXX_URL + "tradePro/{SHORTSYMBOL}_btc";
    var REST_PUBLIC_EXX = "https://api.exx.com/data/v1/";
    var REST_TICKER_EXX = REST_PUBLIC_EXX + 'tickers';

    return {
        REST_TICKER_EXX: REST_TICKER_EXX,
        EXX_URL_TRADE: EXX_URL_TRADE
    };
}();

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 29/03/2018.
 */

var coinArrayOfEXX = __webpack_require__(152);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData).filter(function (elements) {
            return elements.indexOf('_btc') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newArray[0][elementss].replace('_btc', '').toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfEXX.EXX,
            justGenerated: otherNewArray,
            exchangeName: 'EXX'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(421);
var array = __webpack_require__(153);
var getNames = __webpack_require__(422);

module.exports = function () {

    var Gdax = {

        key: 'Gdax',
        name: 'GDAX',
        getNamesForList: {
            needReq: false,
            req: {
                url: {}
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.GDAX
        },
        url: {
            publicURL: url.GDAX_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Gdax: Gdax
    };
}();

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var GDAX_URL = "https://www.gdax.com/";
    var GDAX_URL_TRADE = GDAX_URL + "trade/{SHORTSYMBOL}-BTC";

    return {
        GDAX_URL_TRADE: GDAX_URL_TRADE
    };
}();

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var coinArrayOfGdax = __webpack_require__(153);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames() {
        var otherNewArray = [[]];
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfGdax.GDAX,
            justGenerated: otherNewArray,
            exchangeName: 'Gdax'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(424);
var array = __webpack_require__(154);
var getNames = __webpack_require__(425);

module.exports = function () {

    var Gemini = {

        key: 'Gemini',
        name: 'Gemini',
        getNamesForList: {
            needReq: false,
            req: {
                url: {}
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.GEMINI
        },
        url: {
            publicURL: url.GEMINI_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Gemini: Gemini
    };
}();

/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var GEMINI_URL = "https://gemini.com/";
    var GEMINI_URL_TRADE = GEMINI_URL + "";

    return {
        GEMINI_URL_TRADE: GEMINI_URL_TRADE
    };
}();

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var coinArrayOfGemini = __webpack_require__(154);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames() {
        var otherNewArray = [[]];
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfGemini.GEMINI,
            justGenerated: otherNewArray,
            exchangeName: 'Gemini'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(427);
var array = __webpack_require__(155);
var getNames = __webpack_require__(428);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var HitBtc = {

        key: 'HitBtc',
        name: 'HitBtc',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_TICKER_HITBTC
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.HITBTC
        },
        url: {
            publicURL: url.HITBTC_URL_TRADE,
            isCapital: true
        }
    };

    return {
        HitBtc: HitBtc
    };
}();

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var HITBTC_URL = "https://hitbtc.com/";
    var HITBTC_URL_TRADE = HITBTC_URL + "exchange/{SHORTSYMBOL}-to-BTC";
    var REST_PUBLIC_HITBTC = "http://api.hitbtc.com/api/1/public/";
    var REST_CURRENCY_HITBTC = REST_PUBLIC_HITBTC + "symbols";
    var REST_TICKER_HITBTC = REST_PUBLIC_HITBTC + 'ticker';

    return {
        REST_TICKER_HITBTC: REST_TICKER_HITBTC,
        HITBTC_URL_TRADE: HITBTC_URL_TRADE
    };
}();

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var coinArrayOfHitBtc = __webpack_require__(155);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData).filter(function (elements) {
            return elements.indexOf('BTC') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newArray[0][elementss].replace('BTC', '')];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfHitBtc.HITBTC,
            justGenerated: otherNewArray,
            exchangeName: 'HitBtc'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(430);
var array = __webpack_require__(156);
var getNames = __webpack_require__(431);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Huobi = {

        key: 'Huobi',
        name: 'Huobi',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNames,
                url: {
                    url1: url.REST_CURRENCY_HUOBI
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.HUOBI
        },
        url: {
            publicURL: url.HUOBI_URL_TRADE,
            isCapital: false
        }
    };

    return {
        Huobi: Huobi
    };
}();

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var HUOBI_URL = "https://www.huobi.pro/";
    var HUOBI_URL_TRADE = HUOBI_URL + "{SHORTSYMBOL}_btc/exchange/";
    var REST_PUBLIC_HUOBI = "https://api.huobi.pro/";
    var REST_CURRENCY_HUOBI = REST_PUBLIC_HUOBI + "v1/common/symbols";

    return {
        REST_CURRENCY_HUOBI: REST_CURRENCY_HUOBI,
        HUOBI_URL_TRADE: HUOBI_URL_TRADE
    };
}();

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfHuobi = __webpack_require__(156);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.data).filter(function (elements) {
            return newData.data[elements]['quote-currency'].indexOf('btc') >= 0;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newData.data[newArray[0][elementss]]['base-currency'].toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfHuobi.HUOBI,
            justGenerated: otherNewArray,
            exchangeName: 'Huobi'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(433);
var array = __webpack_require__(157);
var getNames = __webpack_require__(434);

module.exports = function () {

    var Kraken = {

        key: 'Kraken',
        name: 'Kraken',
        getNamesForList: {
            needReq: false,
            req: {
                url: {}
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.KRAKEN
        },
        url: {
            publicURL: url.KRAKEN_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Kraken: Kraken
    };
}();

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var KRAKEN_URL = "https://www.binance.com/";
    var KRAKEN_URL_TRADE = KRAKEN_URL + "trade.html?symbol={SHORTSYMBOL}_BTC";

    return {
        KRAKEN_URL_TRADE: KRAKEN_URL_TRADE
    };
}();

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var coinArrayOfKraken = __webpack_require__(157);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames() {
        var otherNewArray = [[]];
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfKraken.KRAKEN,
            justGenerated: otherNewArray,
            exchangeName: 'Kraken'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 13/02/2018.
 */

var url = __webpack_require__(436);
var array = __webpack_require__(158);
var getNames = __webpack_require__(437);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Kucoin = {

        key: 'Kucoin',
        name: 'Kucoin',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_TICKER_KUCOIN
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.KUCOIN
        },
        url: {
            publicURL: url.KUCOIN_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Kucoin: Kucoin
    };
}();

/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 13/02/2018.
 */

module.exports = function () {

    var KUCOIN_URL = "https://www.kucoin.com/";
    var KUCOIN_URL_TRADE = KUCOIN_URL + "#/trade.pro/{SHORTSYMBOL}-BTC";
    var REST_PUBLIC_KUCOIN = "https://api.kucoin.com/v1/";
    var REST_TICKER_KUCOIN = REST_PUBLIC_KUCOIN + 'market/open/symbols';

    return {
        REST_TICKER_KUCOIN: REST_TICKER_KUCOIN,
        KUCOIN_URL_TRADE: KUCOIN_URL_TRADE
    };
}();

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfKucoin = __webpack_require__(158);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.data).filter(function (elements) {
            return newData.data[elements].symbol.indexOf('-BTC') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newData.data[newArray[0][elementss]].symbol.replace('-BTC', '')];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfKucoin.KUCOIN,
            justGenerated: otherNewArray,
            exchangeName: 'Kucoin'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(439);
var array = __webpack_require__(159);
var getNames = __webpack_require__(440);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Liqui = {

        key: 'Liqui',
        name: 'Liqui',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNames,
                url: {
                    url1: url.REST_CURRENCY_LIQUI
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.LIQUI
        },
        url: {
            publicURL: url.LIQUI_URL_TRADE,
            isCapital: true
        }

    };

    return {
        Liqui: Liqui
    };
}();

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var LIQUI_URL = "https://www.binance.com/";
    var LIQUI_URL_TRADE = LIQUI_URL + "trade.html?symbol={SHORTSYMBOL}_BTC";
    var REST_PUBLIC_LIQUI = "https://api.liqui.io/api/3/";
    var REST_CURRENCY_LIQUI = REST_PUBLIC_LIQUI + 'info';

    return {
        REST_CURRENCY_LIQUI: REST_CURRENCY_LIQUI,
        LIQUI_URL_TRADE: LIQUI_URL_TRADE
    };
}();

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 26/04/2018.
 */

var coinArrayOfLiqui = __webpack_require__(159);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData.pairs).filter(function (elements) {
            return elements.indexOf('_btc') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newArray[0][elementss].replace('_btc', '').toUpperCase()];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfLiqui.LIQUI,
            justGenerated: otherNewArray,
            exchangeName: 'Liqui'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

var url = __webpack_require__(442);
var array = __webpack_require__(160);
var getNames = __webpack_require__(443);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Livecoin = {

        key: 'Livecoin',
        name: 'Livecoin',
        getNamesForList: {
            needReq: true,
            req: {
                multi: true,
                fun: requestModule.multipleRequestsWithProxy,
                url: {
                    url1: url.REST_CURRENCY_LIVECOIN,
                    url2: url.REST_TICKER_LIVECOIN
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.LIVECOIN
        },
        url: {
            publicURL: url.LIVECOIN_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Livecoin: Livecoin
    };
}();

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var LIVECOIN_URL = "https://www.livecoin.net/";
    var LIVECOIN_URL_TRADE = LIVECOIN_URL + "en/trade/orderbook";
    var REST_PUBLIC_LIVECOIN = "https://api.livecoin.net/";
    var REST_CURRENCY_LIVECOIN = REST_PUBLIC_LIVECOIN + "info/coinInfo";
    var REST_TICKER_LIVECOIN = REST_PUBLIC_LIVECOIN + "exchange/ticker";

    return {
        REST_CURRENCY_LIVECOIN: REST_CURRENCY_LIVECOIN,
        REST_TICKER_LIVECOIN: REST_TICKER_LIVECOIN,
        LIVECOIN_URL_TRADE: LIVECOIN_URL_TRADE

    };
}();

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var coinArrayOfLivecoin = __webpack_require__(160);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var obje = newData[1].json;
        var object = newData[0].info;
        var otherNewArray = [];
        otherNewArray.push(Object.keys(obje).map(function (el) {
            return Object.keys(object).filter(function (element) {
                return object[element].symbol + '/BTC' === obje[el].symbol;
            });
        }).filter(function (el) {
            return el.length != 0;
        }).map(function (elementje) {
            return [object[elementje].name, '', object[elementje].symbol];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfLivecoin.LIVECOIN,
            justGenerated: otherNewArray,
            exchangeName: 'Livecoin'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 06/02/2018.
 */

var url = __webpack_require__(445);
var array = __webpack_require__(161);
var getNames = __webpack_require__(446);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var Poloniex = {

        key: 'Poloniex',
        name: 'Poloniex',
        getNamesForList: {
            needReq: true,
            req: {
                multi: true,
                fun: requestModule.multipleRequests,
                url: {
                    url1: url.REST_CURRENCY_POLONIEX,
                    url2: url.REST_TICKER_POLONIEX
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.POLONIEX
        },
        url: {
            publicURL: url.POLONIEX_URL_TRADE,
            isCapital: true
        }
    };

    return {
        Poloniex: Poloniex
    };
}();

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 11/02/2018.
 */

module.exports = function () {

    var POLONIEX_URL = "https://poloniex.com/";
    var POLONIEX_URL_TRADE = POLONIEX_URL + "exchange#btc_{SHORTSYMBOL}";
    var REST_PUBLIC_POLONIEX = "https://poloniex.com/public?command=";
    var REST_CURRENCY_POLONIEX = REST_PUBLIC_POLONIEX + "returnCurrencies";
    var REST_TICKER_POLONIEX = REST_PUBLIC_POLONIEX + "returnTicker";

    return {
        REST_CURRENCY_POLONIEX: REST_CURRENCY_POLONIEX,
        REST_TICKER_POLONIEX: REST_TICKER_POLONIEX,
        POLONIEX_URL_TRADE: POLONIEX_URL_TRADE
    };
}();

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 25/04/2018.
 */

var coinArrayOfPoloniex = __webpack_require__(161);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var obje = newData[1];
        var object = newData[0];
        var newObject = Object.keys(object).filter(function (key) {
            return object[key].delisted === 0;
        });
        var otherNewArray = [];
        otherNewArray.push(Object.keys(obje).map(function (elements) {
            return newObject.filter(function (element) {
                return "BTC_" + element === elements;
            });
        }).filter(function (el) {
            return el.length != 0;
        }).map(function (elementje) {
            return [object[elementje].name, ' ', elementje[0]];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfPoloniex.POLONIEX,
            justGenerated: otherNewArray,
            exchangeName: 'Poloniex'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 17/03/2018.
 */

var url = __webpack_require__(448);
var array = __webpack_require__(162);
var getNames = __webpack_require__(449);
var requestModule = __webpack_require__(10);

module.exports = function () {

    var TuxExchange = {

        key: 'TuxExchange',
        name: 'TuxExchange',
        getNamesForList: {
            needReq: true,
            req: {
                multi: false,
                fun: requestModule.fetchRequestForGettingTheNamesTroughProxy,
                url: {
                    url1: url.REST_TICKER_TUXEXCHANGE
                }
            },
            newNames: getNames.getNames
        },
        array: {
            array: array.TUXEXCHANGE
        },
        url: {
            publicURL: url.TUXEXHCANGE_URL_TRADE,
            isCapital: true
        }
    };

    return {
        TuxExchange: TuxExchange
    };
}();

/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 17/03/2018.
 */

module.exports = function () {

    var TUXEXCHANGE_URL = "https://tuxexchange.com/";
    var TUXEXHCANGE_URL_TRADE = TUXEXCHANGE_URL + "trade?coin={SHORTSYMBOL}&market=BTC";
    var REST_PUBLIC_TUXEXCHANGE = "https://tuxexchange.com/api";
    var REST_TICKER_TUXEXCHANGE = REST_PUBLIC_TUXEXCHANGE + '?method=getticker';

    return {
        REST_TICKER_TUXEXCHANGE: REST_TICKER_TUXEXCHANGE,
        TUXEXHCANGE_URL_TRADE: TUXEXHCANGE_URL_TRADE
    };
}();

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 27/04/2018.
 */

var coinArrayOfTuxExchange = __webpack_require__(162);
var controlAllCoinDataWithOld = __webpack_require__(6);

module.exports = function () {

    function getNames(newData) {
        var newArray = [];
        newArray.push(Object.keys(newData).filter(function (elements) {
            return elements.indexOf('BTC_') > 1;
        }));
        var otherNewArray = [];
        otherNewArray.push(Object.keys(newArray[0]).map(function (elementss) {
            return ['IdontKnow', ' ', newArray[0][elementss].replace('BTC', '')];
        }));
        controlAllCoinDataWithOld.getCoinsThatArentInTheList({
            exchangeArray: coinArrayOfTuxExchange.TUXEXCHANGE,
            justGenerated: otherNewArray,
            exchangeName: 'TuxExchange'

        });
    }

    return {
        getNames: getNames
    };
}();

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 21/01/2018.
 */

module.exports = function () {

    var url = {
        REST_URL_USD_AND_EUR_FROM_COINBASE: "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR&e=Coinbase",
        REST_URL_COIN_TIME_24_HOURS: "https://min-api.cryptocompare.com/data/histohour?fsym={SYM}&tsym={TSYM}&limit={time}"
    };

    //TODO add here the name of the new exchange
    var exchanges = {
        AdiosMarket: 'AidosMarket',
        Binance: 'Binance',
        Bitfinex: 'Bitfinex',
        Bitstamp: 'Bitstamp',
        Bittrex: 'Bittrex',
        BitZ: 'BitZ',
        CCex: 'C-Cex',
        Coinbene: 'Coinbene',
        CoinEgg: 'CoinEgg',
        CoinExchange: 'CoinExchange',
        Cryptopia: 'Cryptopia',
        Exmo: 'Exmo',
        ExTrade: '1ExTrade',
        EXX: 'EXX',
        Gdax: 'GDAX',
        Gemini: 'Gemini',
        HitBtc: 'HitBtc',
        Huobi: 'Huobi',
        Kraken: 'Kraken',
        Kucoin: 'Kucoin',
        Liqui: 'Liqui',
        Livecoin: 'Livecoin',
        Poloniex: 'Poloniex',
        TuxExchange: 'TuxExchange'
    };

    return {
        url: url,
        exchanges: exchanges
    };
}();

/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 09/02/2018.
 */

var chartVars = __webpack_require__(164);
var timeSelectorOnGraph = __webpack_require__(165);

module.exports = function () {

    function createAGraphwithTheData(graphInfo) {
        chartVars.vars.string.currencyBigStockChart = graphInfo.currency;
        chartVars.vars.string.shortNameBigStockChart = graphInfo.shortName;
        var dataForNormalGraph = [];
        $.each(graphInfo.dataGraph, function (index, item) {
            var time = moment.unix(item.time);
            var newtime = moment(time).format('YYYY-MM-DD HH:mm');
            dataForNormalGraph.push({
                date: newtime,
                open: parseFloat(item.open.toFixed(8)),
                high: parseFloat(item.high.toFixed(8)),
                low: parseFloat(item.low.toFixed(8)),
                close: parseFloat(item.close.toFixed(8))
            });
        });
        generateBigChart(dataForNormalGraph);
        timeSelectorOnGraph.makeTheRightOneActiveInTheModal('24');
    }

    var generateBigChart = function generateBigChart(dataForNormalGraph) {
        $('#showGraphCoin').css('height', (screen.height - screen.height / 2 - screen.height / 100 * 5) * 1.2);
        chartVars.vars.string.StockChart = AmCharts.makeChart("showGraphCoin", {
            "type": "serial",
            "theme": "light",
            "dataDateFormat": "YYYY-MM-DD HH:mm",
            "valueAxes": [{
                "position": "left"
            }],
            "graphs": [{
                "id": "g1",
                "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                "closeField": "close",
                "fillColors": "#7f8da9",
                "highField": "high",
                "lineColor": "#7f8da9",
                "lineAlpha": 1,
                "lowField": "low",
                "fillAlphas": 0.9,
                "negativeFillColors": "#db4c3c",
                "negativeLineColor": "#db4c3c",
                "openField": "open",
                "title": "Price:",
                "type": "candlestick",
                "valueField": "close"
            }],
            "chartCursor": {
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true
            },
            "categoryField": "date",
            "categoryAxesSettings": {
                "minPeriod": "mm"
            },
            "categoryAxis": {
                "minPeriod": "mm",
                "parseDates": true,
                "equalSpacing": true

            },
            "dataProvider": dataForNormalGraph,
            "responsive": {
                "enabled": true
            }
        });
    };

    return {
        create: createAGraphwithTheData
    };
}();

/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 03/05/2018.
 */

var getNewCoinsFromExchange = __webpack_require__(166);
var generateRefreshHTML = __webpack_require__(97);

module.exports = function () {

    function theNewCoins() {
        $('#all-new-coins').html(generateRefreshHTML.generateRefreshHTML());
        getNewCoinsFromExchange.allNewCoins(true);
    }

    return {
        theNewCoins: theNewCoins
    };
}();

/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 04/05/2018.
 */

module.exports = function () {

    function orderAlphaForLongName(allCoinsThatNeedToBeOrdered) {
        return allCoinsThatNeedToBeOrdered.sort(function (a, b) {
            return a.longName > b.longName ? 1 : -1;
        });
    }

    function orderAlphaForShortName(allCoinsThatNeedToBeOrdered) {
        return allCoinsThatNeedToBeOrdered.sort(function (a, b) {
            return a.shortName > b.shortName ? 1 : -1;
        });
    }

    return {
        orderAlphaForLongName: orderAlphaForLongName,
        orderAlphaForShortName: orderAlphaForShortName
    };
}();

/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 04/05/2018.
 */

var controleIf = __webpack_require__(136);
var getNewCoinsFromExchange = __webpack_require__(166);

module.exports = function () {

    function controleAtTopLevel() {
        if (!controleIf.weHaveNewCoins()) {
            getNewCoinsFromExchange.allNewCoins(true);
        }
    }

    return {
        controleAtTopLevel: controleAtTopLevel
    };
}();

/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 05/05/2018.
 */

module.exports = function () {

    function showModal() {
        $('#show-more-graph').modal({
            show: 'false',
            backdrop: 'static',
            keyboard: false
        });
    }

    return {
        showModal: showModal
    };
}();

/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by svend on 17/02/2018.
 */

var timeSelectorOnGraph = __webpack_require__(165);
var requestStandard = __webpack_require__(163);
var chartVars = __webpack_require__(164);

module.exports = function () {
    var getDataToUpdateChart = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var timeStamp, url, requestData, chartData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            timeStamp = $(this).attr('data-val');
                            url = void 0;

                            timeSelectorOnGraph.makeTheRightOneActiveInTheModal(timeStamp);
                            requestData = requestStandard.requestFormat.find(function (el) {
                                return el.key === '24';
                            });

                            url = requestData.url.replace('{SYM}', chartVars.vars.string.shortNameBigStockChart).replace('{TSYM}', chartVars.vars.string.currencyBigStockChart).replace('{time}', timeStamp);
                            _context.next = 7;
                            return requestData.request(url);

                        case 7:
                            chartData = _context.sent;

                            updateStockChart(chartData.Data);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function getDataToUpdateChart() {
            return _ref.apply(this, arguments);
        };
    }();

    var updateStockChart = function updateStockChart(chartData) {
        chartVars.vars.string.StockChart.dataProvider = [];
        $.each(chartData, function (index, item) {
            var time = moment.unix(item.time);
            var newtime = moment(time).format('YYYY-MM-DD HH:mm');
            chartVars.vars.string.StockChart.dataProvider.push({
                date: newtime,
                open: parseFloat(item.open.toFixed(8)),
                high: parseFloat(item.high.toFixed(8)),
                low: parseFloat(item.low.toFixed(8)),
                close: parseFloat(item.close.toFixed(8))
            });
        });
        chartVars.vars.string.StockChart.validateData();
    };

    return {
        getDataToUpdateChart: getDataToUpdateChart
    };
}();

/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by svend on 21/01/2018.
 */

var initModule = __webpack_require__(133);

module.exports = function () {

    function startToHideIt() {
        var url = window.location.href;
        var elements = initModule.htmlPages.find(function (el) {
            return 'http://localhost:8080/index.html'.indexOf(el.html) > 1;
        });
        elements.elementsToHide.hide();
    }

    return {
        startToHideIt: startToHideIt
    };
}();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.app.js.map