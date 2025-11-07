(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/orderedmap/dist/index.cjs
  var require_dist = __commonJS({
    "node_modules/orderedmap/dist/index.cjs"(exports, module) {
      "use strict";
      function OrderedMap(content) {
        this.content = content;
      }
      OrderedMap.prototype = {
        constructor: OrderedMap,
        find: function(key) {
          for (var i = 0; i < this.content.length; i += 2)
            if (this.content[i] === key) return i;
          return -1;
        },
        // :: (string) → ?any
        // Retrieve the value stored under `key`, or return undefined when
        // no such key exists.
        get: function(key) {
          var found = this.find(key);
          return found == -1 ? void 0 : this.content[found + 1];
        },
        // :: (string, any, ?string) → OrderedMap
        // Create a new map by replacing the value of `key` with a new
        // value, or adding a binding to the end of the map. If `newKey` is
        // given, the key of the binding will be replaced with that key.
        update: function(key, value, newKey) {
          var self = newKey && newKey != key ? this.remove(newKey) : this;
          var found = self.find(key), content = self.content.slice();
          if (found == -1) {
            content.push(newKey || key, value);
          } else {
            content[found + 1] = value;
            if (newKey) content[found] = newKey;
          }
          return new OrderedMap(content);
        },
        // :: (string) → OrderedMap
        // Return a map with the given key removed, if it existed.
        remove: function(key) {
          var found = this.find(key);
          if (found == -1) return this;
          var content = this.content.slice();
          content.splice(found, 2);
          return new OrderedMap(content);
        },
        // :: (string, any) → OrderedMap
        // Add a new key to the start of the map.
        addToStart: function(key, value) {
          return new OrderedMap([key, value].concat(this.remove(key).content));
        },
        // :: (string, any) → OrderedMap
        // Add a new key to the end of the map.
        addToEnd: function(key, value) {
          var content = this.remove(key).content.slice();
          content.push(key, value);
          return new OrderedMap(content);
        },
        // :: (string, string, any) → OrderedMap
        // Add a key after the given key. If `place` is not found, the new
        // key is added to the end.
        addBefore: function(place, key, value) {
          var without = this.remove(key), content = without.content.slice();
          var found = without.find(place);
          content.splice(found == -1 ? content.length : found, 0, key, value);
          return new OrderedMap(content);
        },
        // :: ((key: string, value: any))
        // Call the given function for each key/value pair in the map, in
        // order.
        forEach: function(f) {
          for (var i = 0; i < this.content.length; i += 2)
            f(this.content[i], this.content[i + 1]);
        },
        // :: (union<Object, OrderedMap>) → OrderedMap
        // Create a new map by prepending the keys in this map that don't
        // appear in `map` before the keys in `map`.
        prepend: function(map) {
          map = OrderedMap.from(map);
          if (!map.size) return this;
          return new OrderedMap(map.content.concat(this.subtract(map).content));
        },
        // :: (union<Object, OrderedMap>) → OrderedMap
        // Create a new map by appending the keys in this map that don't
        // appear in `map` after the keys in `map`.
        append: function(map) {
          map = OrderedMap.from(map);
          if (!map.size) return this;
          return new OrderedMap(this.subtract(map).content.concat(map.content));
        },
        // :: (union<Object, OrderedMap>) → OrderedMap
        // Create a map containing all the keys in this map that don't
        // appear in `map`.
        subtract: function(map) {
          var result = this;
          map = OrderedMap.from(map);
          for (var i = 0; i < map.content.length; i += 2)
            result = result.remove(map.content[i]);
          return result;
        },
        // :: () → Object
        // Turn ordered map into a plain object.
        toObject: function() {
          var result = {};
          this.forEach(function(key, value) {
            result[key] = value;
          });
          return result;
        },
        // :: number
        // The amount of keys in this map.
        get size() {
          return this.content.length >> 1;
        }
      };
      OrderedMap.from = function(value) {
        if (value instanceof OrderedMap) return value;
        var content = [];
        if (value) for (var prop in value) content.push(prop, value[prop]);
        return new OrderedMap(content);
      };
      module.exports = OrderedMap;
    }
  });

  // node_modules/prosemirror-model/dist/index.cjs
  var require_dist2 = __commonJS({
    "node_modules/prosemirror-model/dist/index.cjs"(exports) {
      "use strict";
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F2() {
            };
            return { s: F, n: function n() {
              if (i >= o.length) return { done: true };
              return { done: false, value: o[i++] };
            }, e: function e(_e) {
              throw _e;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return { s: function s() {
          it = it.call(o);
        }, n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        }, e: function e(_e2) {
          didErr = true;
          err = _e2;
        }, f: function f() {
          try {
            if (!normalCompletion && it["return"] != null) it["return"]();
          } finally {
            if (didErr) throw err;
          }
        } };
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _get() {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get.bind();
        } else {
          _get = function _get2(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
              return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
          };
        }
        return _get.apply(this, arguments);
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null) break;
        }
        return object;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct.bind();
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _isNativeFunction(fn) {
        try {
          return Function.toString.call(fn).indexOf("[native code]") !== -1;
        } catch (e) {
          return typeof fn === "function";
        }
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var OrderedMap = require_dist();
      function _findDiffStart(a, b, pos) {
        for (var i = 0; ; i++) {
          if (i == a.childCount || i == b.childCount) return a.childCount == b.childCount ? null : pos;
          var childA = a.child(i), childB = b.child(i);
          if (childA == childB) {
            pos += childA.nodeSize;
            continue;
          }
          if (!childA.sameMarkup(childB)) return pos;
          if (childA.isText && childA.text != childB.text) {
            for (var j = 0; childA.text[j] == childB.text[j]; j++) pos++;
            return pos;
          }
          if (childA.content.size || childB.content.size) {
            var inner = _findDiffStart(childA.content, childB.content, pos + 1);
            if (inner != null) return inner;
          }
          pos += childA.nodeSize;
        }
      }
      function _findDiffEnd(a, b, posA, posB) {
        for (var iA = a.childCount, iB = b.childCount; ; ) {
          if (iA == 0 || iB == 0) return iA == iB ? null : {
            a: posA,
            b: posB
          };
          var childA = a.child(--iA), childB = b.child(--iB), size = childA.nodeSize;
          if (childA == childB) {
            posA -= size;
            posB -= size;
            continue;
          }
          if (!childA.sameMarkup(childB)) return {
            a: posA,
            b: posB
          };
          if (childA.isText && childA.text != childB.text) {
            var same = 0, minSize = Math.min(childA.text.length, childB.text.length);
            while (same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]) {
              same++;
              posA--;
              posB--;
            }
            return {
              a: posA,
              b: posB
            };
          }
          if (childA.content.size || childB.content.size) {
            var inner = _findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
            if (inner) return inner;
          }
          posA -= size;
          posB -= size;
        }
      }
      var Fragment = (function() {
        function Fragment2(content, size) {
          _classCallCheck(this, Fragment2);
          this.content = content;
          this.size = size || 0;
          if (size == null) for (var i = 0; i < content.length; i++) this.size += content[i].nodeSize;
        }
        _createClass(Fragment2, [{
          key: "nodesBetween",
          value: function nodesBetween(from, to, f) {
            var nodeStart = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
            var parent = arguments.length > 4 ? arguments[4] : void 0;
            for (var i = 0, pos = 0; pos < to; i++) {
              var child = this.content[i], end = pos + child.nodeSize;
              if (end > from && f(child, nodeStart + pos, parent || null, i) !== false && child.content.size) {
                var start = pos + 1;
                child.nodesBetween(Math.max(0, from - start), Math.min(child.content.size, to - start), f, nodeStart + start);
              }
              pos = end;
            }
          }
        }, {
          key: "descendants",
          value: function descendants(f) {
            this.nodesBetween(0, this.size, f);
          }
        }, {
          key: "textBetween",
          value: function textBetween(from, to, blockSeparator, leafText) {
            var text = "", first = true;
            this.nodesBetween(from, to, function(node, pos) {
              var nodeText = node.isText ? node.text.slice(Math.max(from, pos) - pos, to - pos) : !node.isLeaf ? "" : leafText ? typeof leafText === "function" ? leafText(node) : leafText : node.type.spec.leafText ? node.type.spec.leafText(node) : "";
              if (node.isBlock && (node.isLeaf && nodeText || node.isTextblock) && blockSeparator) {
                if (first) first = false;
                else text += blockSeparator;
              }
              text += nodeText;
            }, 0);
            return text;
          }
        }, {
          key: "append",
          value: function append(other) {
            if (!other.size) return this;
            if (!this.size) return other;
            var last = this.lastChild, first = other.firstChild, content = this.content.slice(), i = 0;
            if (last.isText && last.sameMarkup(first)) {
              content[content.length - 1] = last.withText(last.text + first.text);
              i = 1;
            }
            for (; i < other.content.length; i++) content.push(other.content[i]);
            return new Fragment2(content, this.size + other.size);
          }
        }, {
          key: "cut",
          value: function cut(from) {
            var to = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.size;
            if (from == 0 && to == this.size) return this;
            var result = [], size = 0;
            if (to > from) for (var i = 0, pos = 0; pos < to; i++) {
              var child = this.content[i], end = pos + child.nodeSize;
              if (end > from) {
                if (pos < from || end > to) {
                  if (child.isText) child = child.cut(Math.max(0, from - pos), Math.min(child.text.length, to - pos));
                  else child = child.cut(Math.max(0, from - pos - 1), Math.min(child.content.size, to - pos - 1));
                }
                result.push(child);
                size += child.nodeSize;
              }
              pos = end;
            }
            return new Fragment2(result, size);
          }
        }, {
          key: "cutByIndex",
          value: function cutByIndex(from, to) {
            if (from == to) return Fragment2.empty;
            if (from == 0 && to == this.content.length) return this;
            return new Fragment2(this.content.slice(from, to));
          }
        }, {
          key: "replaceChild",
          value: function replaceChild(index, node) {
            var current = this.content[index];
            if (current == node) return this;
            var copy2 = this.content.slice();
            var size = this.size + node.nodeSize - current.nodeSize;
            copy2[index] = node;
            return new Fragment2(copy2, size);
          }
        }, {
          key: "addToStart",
          value: function addToStart(node) {
            return new Fragment2([node].concat(this.content), this.size + node.nodeSize);
          }
        }, {
          key: "addToEnd",
          value: function addToEnd(node) {
            return new Fragment2(this.content.concat(node), this.size + node.nodeSize);
          }
        }, {
          key: "eq",
          value: function eq(other) {
            if (this.content.length != other.content.length) return false;
            for (var i = 0; i < this.content.length; i++) if (!this.content[i].eq(other.content[i])) return false;
            return true;
          }
        }, {
          key: "firstChild",
          get: function get() {
            return this.content.length ? this.content[0] : null;
          }
        }, {
          key: "lastChild",
          get: function get() {
            return this.content.length ? this.content[this.content.length - 1] : null;
          }
        }, {
          key: "childCount",
          get: function get() {
            return this.content.length;
          }
        }, {
          key: "child",
          value: function child(index) {
            var found2 = this.content[index];
            if (!found2) throw new RangeError("Index " + index + " out of range for " + this);
            return found2;
          }
        }, {
          key: "maybeChild",
          value: function maybeChild(index) {
            return this.content[index] || null;
          }
        }, {
          key: "forEach",
          value: function forEach(f) {
            for (var i = 0, p = 0; i < this.content.length; i++) {
              var child = this.content[i];
              f(child, p, i);
              p += child.nodeSize;
            }
          }
        }, {
          key: "findDiffStart",
          value: function findDiffStart(other) {
            var pos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return _findDiffStart(this, other, pos);
          }
        }, {
          key: "findDiffEnd",
          value: function findDiffEnd(other) {
            var pos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.size;
            var otherPos = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : other.size;
            return _findDiffEnd(this, other, pos, otherPos);
          }
        }, {
          key: "findIndex",
          value: function findIndex(pos) {
            if (pos == 0) return retIndex(0, pos);
            if (pos == this.size) return retIndex(this.content.length, pos);
            if (pos > this.size || pos < 0) throw new RangeError("Position ".concat(pos, " outside of fragment (").concat(this, ")"));
            for (var i = 0, curPos = 0; ; i++) {
              var cur = this.child(i), end = curPos + cur.nodeSize;
              if (end >= pos) {
                if (end == pos) return retIndex(i + 1, end);
                return retIndex(i, curPos);
              }
              curPos = end;
            }
          }
        }, {
          key: "toString",
          value: function toString() {
            return "<" + this.toStringInner() + ">";
          }
        }, {
          key: "toStringInner",
          value: function toStringInner() {
            return this.content.join(", ");
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return this.content.length ? this.content.map(function(n) {
              return n.toJSON();
            }) : null;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, value) {
            if (!value) return Fragment2.empty;
            if (!Array.isArray(value)) throw new RangeError("Invalid input for Fragment.fromJSON");
            return new Fragment2(value.map(schema.nodeFromJSON));
          }
        }, {
          key: "fromArray",
          value: function fromArray(array) {
            if (!array.length) return Fragment2.empty;
            var joined, size = 0;
            for (var i = 0; i < array.length; i++) {
              var node = array[i];
              size += node.nodeSize;
              if (i && node.isText && array[i - 1].sameMarkup(node)) {
                if (!joined) joined = array.slice(0, i);
                joined[joined.length - 1] = node.withText(joined[joined.length - 1].text + node.text);
              } else if (joined) {
                joined.push(node);
              }
            }
            return new Fragment2(joined || array, size);
          }
        }, {
          key: "from",
          value: function from(nodes) {
            if (!nodes) return Fragment2.empty;
            if (nodes instanceof Fragment2) return nodes;
            if (Array.isArray(nodes)) return this.fromArray(nodes);
            if (nodes.attrs) return new Fragment2([nodes], nodes.nodeSize);
            throw new RangeError("Can not convert " + nodes + " to a Fragment" + (nodes.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
          }
        }]);
        return Fragment2;
      })();
      Fragment.empty = new Fragment([], 0);
      var found = {
        index: 0,
        offset: 0
      };
      function retIndex(index, offset) {
        found.index = index;
        found.offset = offset;
        return found;
      }
      function compareDeep(a, b) {
        if (a === b) return true;
        if (!(a && _typeof(a) == "object") || !(b && _typeof(b) == "object")) return false;
        var array = Array.isArray(a);
        if (Array.isArray(b) != array) return false;
        if (array) {
          if (a.length != b.length) return false;
          for (var i = 0; i < a.length; i++) if (!compareDeep(a[i], b[i])) return false;
        } else {
          for (var p in a) if (!(p in b) || !compareDeep(a[p], b[p])) return false;
          for (var _p in b) if (!(_p in a)) return false;
        }
        return true;
      }
      var Mark = (function() {
        function Mark2(type, attrs) {
          _classCallCheck(this, Mark2);
          this.type = type;
          this.attrs = attrs;
        }
        _createClass(Mark2, [{
          key: "addToSet",
          value: function addToSet(set) {
            var copy2, placed = false;
            for (var i = 0; i < set.length; i++) {
              var other = set[i];
              if (this.eq(other)) return set;
              if (this.type.excludes(other.type)) {
                if (!copy2) copy2 = set.slice(0, i);
              } else if (other.type.excludes(this.type)) {
                return set;
              } else {
                if (!placed && other.type.rank > this.type.rank) {
                  if (!copy2) copy2 = set.slice(0, i);
                  copy2.push(this);
                  placed = true;
                }
                if (copy2) copy2.push(other);
              }
            }
            if (!copy2) copy2 = set.slice();
            if (!placed) copy2.push(this);
            return copy2;
          }
        }, {
          key: "removeFromSet",
          value: function removeFromSet(set) {
            for (var i = 0; i < set.length; i++) if (this.eq(set[i])) return set.slice(0, i).concat(set.slice(i + 1));
            return set;
          }
        }, {
          key: "isInSet",
          value: function isInSet(set) {
            for (var i = 0; i < set.length; i++) if (this.eq(set[i])) return true;
            return false;
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return this == other || this.type == other.type && compareDeep(this.attrs, other.attrs);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var obj = {
              type: this.type.name
            };
            for (var _ in this.attrs) {
              obj.attrs = this.attrs;
              break;
            }
            return obj;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (!json) throw new RangeError("Invalid input for Mark.fromJSON");
            var type = schema.marks[json.type];
            if (!type) throw new RangeError("There is no mark type ".concat(json.type, " in this schema"));
            var mark = type.create(json.attrs);
            type.checkAttrs(mark.attrs);
            return mark;
          }
        }, {
          key: "sameSet",
          value: function sameSet(a, b) {
            if (a == b) return true;
            if (a.length != b.length) return false;
            for (var i = 0; i < a.length; i++) if (!a[i].eq(b[i])) return false;
            return true;
          }
        }, {
          key: "setFrom",
          value: function setFrom(marks) {
            if (!marks || Array.isArray(marks) && marks.length == 0) return Mark2.none;
            if (marks instanceof Mark2) return [marks];
            var copy2 = marks.slice();
            copy2.sort(function(a, b) {
              return a.type.rank - b.type.rank;
            });
            return copy2;
          }
        }]);
        return Mark2;
      })();
      Mark.none = [];
      var ReplaceError = (function(_Error) {
        _inherits(ReplaceError2, _Error);
        var _super = _createSuper(ReplaceError2);
        function ReplaceError2() {
          _classCallCheck(this, ReplaceError2);
          return _super.apply(this, arguments);
        }
        return _createClass(ReplaceError2);
      })(_wrapNativeSuper(Error));
      var Slice = (function() {
        function Slice2(content, openStart, openEnd) {
          _classCallCheck(this, Slice2);
          this.content = content;
          this.openStart = openStart;
          this.openEnd = openEnd;
        }
        _createClass(Slice2, [{
          key: "size",
          get: function get() {
            return this.content.size - this.openStart - this.openEnd;
          }
        }, {
          key: "insertAt",
          value: function insertAt(pos, fragment) {
            var content = insertInto(this.content, pos + this.openStart, fragment);
            return content && new Slice2(content, this.openStart, this.openEnd);
          }
        }, {
          key: "removeBetween",
          value: function removeBetween(from, to) {
            return new Slice2(removeRange(this.content, from + this.openStart, to + this.openStart), this.openStart, this.openEnd);
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd;
          }
        }, {
          key: "toString",
          value: function toString() {
            return this.content + "(" + this.openStart + "," + this.openEnd + ")";
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            if (!this.content.size) return null;
            var json = {
              content: this.content.toJSON()
            };
            if (this.openStart > 0) json.openStart = this.openStart;
            if (this.openEnd > 0) json.openEnd = this.openEnd;
            return json;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (!json) return Slice2.empty;
            var openStart = json.openStart || 0, openEnd = json.openEnd || 0;
            if (typeof openStart != "number" || typeof openEnd != "number") throw new RangeError("Invalid input for Slice.fromJSON");
            return new Slice2(Fragment.fromJSON(schema, json.content), openStart, openEnd);
          }
        }, {
          key: "maxOpen",
          value: function maxOpen(fragment) {
            var openIsolating = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            var openStart = 0, openEnd = 0;
            for (var n = fragment.firstChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.firstChild) openStart++;
            for (var _n = fragment.lastChild; _n && !_n.isLeaf && (openIsolating || !_n.type.spec.isolating); _n = _n.lastChild) openEnd++;
            return new Slice2(fragment, openStart, openEnd);
          }
        }]);
        return Slice2;
      })();
      Slice.empty = new Slice(Fragment.empty, 0, 0);
      function removeRange(content, from, to) {
        var _content$findIndex = content.findIndex(from), index = _content$findIndex.index, offset = _content$findIndex.offset, child = content.maybeChild(index);
        var _content$findIndex2 = content.findIndex(to), indexTo = _content$findIndex2.index, offsetTo = _content$findIndex2.offset;
        if (offset == from || child.isText) {
          if (offsetTo != to && !content.child(indexTo).isText) throw new RangeError("Removing non-flat range");
          return content.cut(0, from).append(content.cut(to));
        }
        if (index != indexTo) throw new RangeError("Removing non-flat range");
        return content.replaceChild(index, child.copy(removeRange(child.content, from - offset - 1, to - offset - 1)));
      }
      function insertInto(content, dist, insert, parent) {
        var _content$findIndex3 = content.findIndex(dist), index = _content$findIndex3.index, offset = _content$findIndex3.offset, child = content.maybeChild(index);
        if (offset == dist || child.isText) {
          if (parent && !parent.canReplace(index, index, insert)) return null;
          return content.cut(0, dist).append(insert).append(content.cut(dist));
        }
        var inner = insertInto(child.content, dist - offset - 1, insert, child);
        return inner && content.replaceChild(index, child.copy(inner));
      }
      function _replace($from, $to, slice) {
        if (slice.openStart > $from.depth) throw new ReplaceError("Inserted content deeper than insertion position");
        if ($from.depth - slice.openStart != $to.depth - slice.openEnd) throw new ReplaceError("Inconsistent open depths");
        return replaceOuter($from, $to, slice, 0);
      }
      function replaceOuter($from, $to, slice, depth) {
        var index = $from.index(depth), node = $from.node(depth);
        if (index == $to.index(depth) && depth < $from.depth - slice.openStart) {
          var inner = replaceOuter($from, $to, slice, depth + 1);
          return node.copy(node.content.replaceChild(index, inner));
        } else if (!slice.content.size) {
          return close(node, replaceTwoWay($from, $to, depth));
        } else if (!slice.openStart && !slice.openEnd && $from.depth == depth && $to.depth == depth) {
          var parent = $from.parent, content = parent.content;
          return close(parent, content.cut(0, $from.parentOffset).append(slice.content).append(content.cut($to.parentOffset)));
        } else {
          var _prepareSliceForRepla = prepareSliceForReplace(slice, $from), start = _prepareSliceForRepla.start, end = _prepareSliceForRepla.end;
          return close(node, replaceThreeWay($from, start, end, $to, depth));
        }
      }
      function checkJoin(main, sub) {
        if (!sub.type.compatibleContent(main.type)) throw new ReplaceError("Cannot join " + sub.type.name + " onto " + main.type.name);
      }
      function joinable($before, $after, depth) {
        var node = $before.node(depth);
        checkJoin(node, $after.node(depth));
        return node;
      }
      function addNode(child, target) {
        var last = target.length - 1;
        if (last >= 0 && child.isText && child.sameMarkup(target[last])) target[last] = child.withText(target[last].text + child.text);
        else target.push(child);
      }
      function addRange($start, $end, depth, target) {
        var node = ($end || $start).node(depth);
        var startIndex = 0, endIndex = $end ? $end.index(depth) : node.childCount;
        if ($start) {
          startIndex = $start.index(depth);
          if ($start.depth > depth) {
            startIndex++;
          } else if ($start.textOffset) {
            addNode($start.nodeAfter, target);
            startIndex++;
          }
        }
        for (var i = startIndex; i < endIndex; i++) addNode(node.child(i), target);
        if ($end && $end.depth == depth && $end.textOffset) addNode($end.nodeBefore, target);
      }
      function close(node, content) {
        node.type.checkContent(content);
        return node.copy(content);
      }
      function replaceThreeWay($from, $start, $end, $to, depth) {
        var openStart = $from.depth > depth && joinable($from, $start, depth + 1);
        var openEnd = $to.depth > depth && joinable($end, $to, depth + 1);
        var content = [];
        addRange(null, $from, depth, content);
        if (openStart && openEnd && $start.index(depth) == $end.index(depth)) {
          checkJoin(openStart, openEnd);
          addNode(close(openStart, replaceThreeWay($from, $start, $end, $to, depth + 1)), content);
        } else {
          if (openStart) addNode(close(openStart, replaceTwoWay($from, $start, depth + 1)), content);
          addRange($start, $end, depth, content);
          if (openEnd) addNode(close(openEnd, replaceTwoWay($end, $to, depth + 1)), content);
        }
        addRange($to, null, depth, content);
        return new Fragment(content);
      }
      function replaceTwoWay($from, $to, depth) {
        var content = [];
        addRange(null, $from, depth, content);
        if ($from.depth > depth) {
          var type = joinable($from, $to, depth + 1);
          addNode(close(type, replaceTwoWay($from, $to, depth + 1)), content);
        }
        addRange($to, null, depth, content);
        return new Fragment(content);
      }
      function prepareSliceForReplace(slice, $along) {
        var extra = $along.depth - slice.openStart, parent = $along.node(extra);
        var node = parent.copy(slice.content);
        for (var i = extra - 1; i >= 0; i--) node = $along.node(i).copy(Fragment.from(node));
        return {
          start: node.resolveNoCache(slice.openStart + extra),
          end: node.resolveNoCache(node.content.size - slice.openEnd - extra)
        };
      }
      var ResolvedPos = (function() {
        function ResolvedPos2(pos, path, parentOffset) {
          _classCallCheck(this, ResolvedPos2);
          this.pos = pos;
          this.path = path;
          this.parentOffset = parentOffset;
          this.depth = path.length / 3 - 1;
        }
        _createClass(ResolvedPos2, [{
          key: "resolveDepth",
          value: function resolveDepth(val) {
            if (val == null) return this.depth;
            if (val < 0) return this.depth + val;
            return val;
          }
        }, {
          key: "parent",
          get: function get() {
            return this.node(this.depth);
          }
        }, {
          key: "doc",
          get: function get() {
            return this.node(0);
          }
        }, {
          key: "node",
          value: function node(depth) {
            return this.path[this.resolveDepth(depth) * 3];
          }
        }, {
          key: "index",
          value: function index(depth) {
            return this.path[this.resolveDepth(depth) * 3 + 1];
          }
        }, {
          key: "indexAfter",
          value: function indexAfter(depth) {
            depth = this.resolveDepth(depth);
            return this.index(depth) + (depth == this.depth && !this.textOffset ? 0 : 1);
          }
        }, {
          key: "start",
          value: function start(depth) {
            depth = this.resolveDepth(depth);
            return depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
          }
        }, {
          key: "end",
          value: function end(depth) {
            depth = this.resolveDepth(depth);
            return this.start(depth) + this.node(depth).content.size;
          }
        }, {
          key: "before",
          value: function before(depth) {
            depth = this.resolveDepth(depth);
            if (!depth) throw new RangeError("There is no position before the top-level node");
            return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1];
          }
        }, {
          key: "after",
          value: function after(depth) {
            depth = this.resolveDepth(depth);
            if (!depth) throw new RangeError("There is no position after the top-level node");
            return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1] + this.path[depth * 3].nodeSize;
          }
        }, {
          key: "textOffset",
          get: function get() {
            return this.pos - this.path[this.path.length - 1];
          }
        }, {
          key: "nodeAfter",
          get: function get() {
            var parent = this.parent, index = this.index(this.depth);
            if (index == parent.childCount) return null;
            var dOff = this.pos - this.path[this.path.length - 1], child = parent.child(index);
            return dOff ? parent.child(index).cut(dOff) : child;
          }
        }, {
          key: "nodeBefore",
          get: function get() {
            var index = this.index(this.depth);
            var dOff = this.pos - this.path[this.path.length - 1];
            if (dOff) return this.parent.child(index).cut(0, dOff);
            return index == 0 ? null : this.parent.child(index - 1);
          }
        }, {
          key: "posAtIndex",
          value: function posAtIndex(index, depth) {
            depth = this.resolveDepth(depth);
            var node = this.path[depth * 3], pos = depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
            for (var i = 0; i < index; i++) pos += node.child(i).nodeSize;
            return pos;
          }
        }, {
          key: "marks",
          value: function marks() {
            var parent = this.parent, index = this.index();
            if (parent.content.size == 0) return Mark.none;
            if (this.textOffset) return parent.child(index).marks;
            var main = parent.maybeChild(index - 1), other = parent.maybeChild(index);
            if (!main) {
              var tmp = main;
              main = other;
              other = tmp;
            }
            var marks2 = main.marks;
            for (var i = 0; i < marks2.length; i++) if (marks2[i].type.spec.inclusive === false && (!other || !marks2[i].isInSet(other.marks))) marks2 = marks2[i--].removeFromSet(marks2);
            return marks2;
          }
        }, {
          key: "marksAcross",
          value: function marksAcross($end) {
            var after = this.parent.maybeChild(this.index());
            if (!after || !after.isInline) return null;
            var marks = after.marks, next = $end.parent.maybeChild($end.index());
            for (var i = 0; i < marks.length; i++) if (marks[i].type.spec.inclusive === false && (!next || !marks[i].isInSet(next.marks))) marks = marks[i--].removeFromSet(marks);
            return marks;
          }
        }, {
          key: "sharedDepth",
          value: function sharedDepth(pos) {
            for (var depth = this.depth; depth > 0; depth--) if (this.start(depth) <= pos && this.end(depth) >= pos) return depth;
            return 0;
          }
        }, {
          key: "blockRange",
          value: function blockRange() {
            var other = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this;
            var pred = arguments.length > 1 ? arguments[1] : void 0;
            if (other.pos < this.pos) return other.blockRange(this);
            for (var d = this.depth - (this.parent.inlineContent || this.pos == other.pos ? 1 : 0); d >= 0; d--) if (other.pos <= this.end(d) && (!pred || pred(this.node(d)))) return new NodeRange(this, other, d);
            return null;
          }
        }, {
          key: "sameParent",
          value: function sameParent(other) {
            return this.pos - this.parentOffset == other.pos - other.parentOffset;
          }
        }, {
          key: "max",
          value: function max(other) {
            return other.pos > this.pos ? other : this;
          }
        }, {
          key: "min",
          value: function min(other) {
            return other.pos < this.pos ? other : this;
          }
        }, {
          key: "toString",
          value: function toString() {
            var str = "";
            for (var i = 1; i <= this.depth; i++) str += (str ? "/" : "") + this.node(i).type.name + "_" + this.index(i - 1);
            return str + ":" + this.parentOffset;
          }
        }], [{
          key: "resolve",
          value: function resolve(doc2, pos) {
            if (!(pos >= 0 && pos <= doc2.content.size)) throw new RangeError("Position " + pos + " out of range");
            var path = [];
            var start = 0, parentOffset = pos;
            for (var node = doc2; ; ) {
              var _node$content$findInd = node.content.findIndex(parentOffset), index = _node$content$findInd.index, offset = _node$content$findInd.offset;
              var rem = parentOffset - offset;
              path.push(node, index, start + offset);
              if (!rem) break;
              node = node.child(index);
              if (node.isText) break;
              parentOffset = rem - 1;
              start += offset + 1;
            }
            return new ResolvedPos2(pos, path, parentOffset);
          }
        }, {
          key: "resolveCached",
          value: function resolveCached(doc2, pos) {
            var cache = resolveCache.get(doc2);
            if (cache) {
              for (var i = 0; i < cache.elts.length; i++) {
                var elt = cache.elts[i];
                if (elt.pos == pos) return elt;
              }
            } else {
              resolveCache.set(doc2, cache = new ResolveCache());
            }
            var result = cache.elts[cache.i] = ResolvedPos2.resolve(doc2, pos);
            cache.i = (cache.i + 1) % resolveCacheSize;
            return result;
          }
        }]);
        return ResolvedPos2;
      })();
      var ResolveCache = _createClass(function ResolveCache2() {
        _classCallCheck(this, ResolveCache2);
        this.elts = [];
        this.i = 0;
      });
      var resolveCacheSize = 12;
      var resolveCache = /* @__PURE__ */ new WeakMap();
      var NodeRange = (function() {
        function NodeRange2($from, $to, depth) {
          _classCallCheck(this, NodeRange2);
          this.$from = $from;
          this.$to = $to;
          this.depth = depth;
        }
        _createClass(NodeRange2, [{
          key: "start",
          get: function get() {
            return this.$from.before(this.depth + 1);
          }
        }, {
          key: "end",
          get: function get() {
            return this.$to.after(this.depth + 1);
          }
        }, {
          key: "parent",
          get: function get() {
            return this.$from.node(this.depth);
          }
        }, {
          key: "startIndex",
          get: function get() {
            return this.$from.index(this.depth);
          }
        }, {
          key: "endIndex",
          get: function get() {
            return this.$to.indexAfter(this.depth);
          }
        }]);
        return NodeRange2;
      })();
      var emptyAttrs = /* @__PURE__ */ Object.create(null);
      var Node = (function() {
        function Node2(type, attrs, content) {
          var marks = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Mark.none;
          _classCallCheck(this, Node2);
          this.type = type;
          this.attrs = attrs;
          this.marks = marks;
          this.content = content || Fragment.empty;
        }
        _createClass(Node2, [{
          key: "children",
          get: function get() {
            return this.content.content;
          }
        }, {
          key: "nodeSize",
          get: function get() {
            return this.isLeaf ? 1 : 2 + this.content.size;
          }
        }, {
          key: "childCount",
          get: function get() {
            return this.content.childCount;
          }
        }, {
          key: "child",
          value: function child(index) {
            return this.content.child(index);
          }
        }, {
          key: "maybeChild",
          value: function maybeChild(index) {
            return this.content.maybeChild(index);
          }
        }, {
          key: "forEach",
          value: function forEach(f) {
            this.content.forEach(f);
          }
        }, {
          key: "nodesBetween",
          value: function nodesBetween(from, to, f) {
            var startPos = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
            this.content.nodesBetween(from, to, f, startPos, this);
          }
        }, {
          key: "descendants",
          value: function descendants(f) {
            this.nodesBetween(0, this.content.size, f);
          }
        }, {
          key: "textContent",
          get: function get() {
            return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
          }
        }, {
          key: "textBetween",
          value: function textBetween(from, to, blockSeparator, leafText) {
            return this.content.textBetween(from, to, blockSeparator, leafText);
          }
        }, {
          key: "firstChild",
          get: function get() {
            return this.content.firstChild;
          }
        }, {
          key: "lastChild",
          get: function get() {
            return this.content.lastChild;
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return this == other || this.sameMarkup(other) && this.content.eq(other.content);
          }
        }, {
          key: "sameMarkup",
          value: function sameMarkup(other) {
            return this.hasMarkup(other.type, other.attrs, other.marks);
          }
        }, {
          key: "hasMarkup",
          value: function hasMarkup(type, attrs, marks) {
            return this.type == type && compareDeep(this.attrs, attrs || type.defaultAttrs || emptyAttrs) && Mark.sameSet(this.marks, marks || Mark.none);
          }
        }, {
          key: "copy",
          value: function copy2() {
            var content = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            if (content == this.content) return this;
            return new Node2(this.type, this.attrs, content, this.marks);
          }
        }, {
          key: "mark",
          value: function mark(marks) {
            return marks == this.marks ? this : new Node2(this.type, this.attrs, this.content, marks);
          }
        }, {
          key: "cut",
          value: function cut(from) {
            var to = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.content.size;
            if (from == 0 && to == this.content.size) return this;
            return this.copy(this.content.cut(from, to));
          }
        }, {
          key: "slice",
          value: function slice(from) {
            var to = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.content.size;
            var includeParents = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
            if (from == to) return Slice.empty;
            var $from = this.resolve(from), $to = this.resolve(to);
            var depth = includeParents ? 0 : $from.sharedDepth(to);
            var start = $from.start(depth), node = $from.node(depth);
            var content = node.content.cut($from.pos - start, $to.pos - start);
            return new Slice(content, $from.depth - depth, $to.depth - depth);
          }
        }, {
          key: "replace",
          value: function replace(from, to, slice) {
            return _replace(this.resolve(from), this.resolve(to), slice);
          }
        }, {
          key: "nodeAt",
          value: function nodeAt(pos) {
            for (var node = this; ; ) {
              var _node$content$findInd2 = node.content.findIndex(pos), index = _node$content$findInd2.index, offset = _node$content$findInd2.offset;
              node = node.maybeChild(index);
              if (!node) return null;
              if (offset == pos || node.isText) return node;
              pos -= offset + 1;
            }
          }
        }, {
          key: "childAfter",
          value: function childAfter(pos) {
            var _this$content$findInd = this.content.findIndex(pos), index = _this$content$findInd.index, offset = _this$content$findInd.offset;
            return {
              node: this.content.maybeChild(index),
              index,
              offset
            };
          }
        }, {
          key: "childBefore",
          value: function childBefore(pos) {
            if (pos == 0) return {
              node: null,
              index: 0,
              offset: 0
            };
            var _this$content$findInd2 = this.content.findIndex(pos), index = _this$content$findInd2.index, offset = _this$content$findInd2.offset;
            if (offset < pos) return {
              node: this.content.child(index),
              index,
              offset
            };
            var node = this.content.child(index - 1);
            return {
              node,
              index: index - 1,
              offset: offset - node.nodeSize
            };
          }
        }, {
          key: "resolve",
          value: function resolve(pos) {
            return ResolvedPos.resolveCached(this, pos);
          }
        }, {
          key: "resolveNoCache",
          value: function resolveNoCache(pos) {
            return ResolvedPos.resolve(this, pos);
          }
        }, {
          key: "rangeHasMark",
          value: function rangeHasMark(from, to, type) {
            var found2 = false;
            if (to > from) this.nodesBetween(from, to, function(node) {
              if (type.isInSet(node.marks)) found2 = true;
              return !found2;
            });
            return found2;
          }
        }, {
          key: "isBlock",
          get: function get() {
            return this.type.isBlock;
          }
        }, {
          key: "isTextblock",
          get: function get() {
            return this.type.isTextblock;
          }
        }, {
          key: "inlineContent",
          get: function get() {
            return this.type.inlineContent;
          }
        }, {
          key: "isInline",
          get: function get() {
            return this.type.isInline;
          }
        }, {
          key: "isText",
          get: function get() {
            return this.type.isText;
          }
        }, {
          key: "isLeaf",
          get: function get() {
            return this.type.isLeaf;
          }
        }, {
          key: "isAtom",
          get: function get() {
            return this.type.isAtom;
          }
        }, {
          key: "toString",
          value: function toString() {
            if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
            var name = this.type.name;
            if (this.content.size) name += "(" + this.content.toStringInner() + ")";
            return wrapMarks(this.marks, name);
          }
        }, {
          key: "contentMatchAt",
          value: function contentMatchAt(index) {
            var match = this.type.contentMatch.matchFragment(this.content, 0, index);
            if (!match) throw new Error("Called contentMatchAt on a node with invalid content");
            return match;
          }
        }, {
          key: "canReplace",
          value: function canReplace(from, to) {
            var replacement = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Fragment.empty;
            var start = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
            var end = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : replacement.childCount;
            var one = this.contentMatchAt(from).matchFragment(replacement, start, end);
            var two = one && one.matchFragment(this.content, to);
            if (!two || !two.validEnd) return false;
            for (var i = start; i < end; i++) if (!this.type.allowsMarks(replacement.child(i).marks)) return false;
            return true;
          }
        }, {
          key: "canReplaceWith",
          value: function canReplaceWith(from, to, type, marks) {
            if (marks && !this.type.allowsMarks(marks)) return false;
            var start = this.contentMatchAt(from).matchType(type);
            var end = start && start.matchFragment(this.content, to);
            return end ? end.validEnd : false;
          }
        }, {
          key: "canAppend",
          value: function canAppend(other) {
            if (other.content.size) return this.canReplace(this.childCount, this.childCount, other.content);
            else return this.type.compatibleContent(other.type);
          }
        }, {
          key: "check",
          value: function check() {
            this.type.checkContent(this.content);
            this.type.checkAttrs(this.attrs);
            var copy2 = Mark.none;
            for (var i = 0; i < this.marks.length; i++) {
              var mark = this.marks[i];
              mark.type.checkAttrs(mark.attrs);
              copy2 = mark.addToSet(copy2);
            }
            if (!Mark.sameSet(copy2, this.marks)) throw new RangeError("Invalid collection of marks for node ".concat(this.type.name, ": ").concat(this.marks.map(function(m) {
              return m.type.name;
            })));
            this.content.forEach(function(node) {
              return node.check();
            });
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var obj = {
              type: this.type.name
            };
            for (var _ in this.attrs) {
              obj.attrs = this.attrs;
              break;
            }
            if (this.content.size) obj.content = this.content.toJSON();
            if (this.marks.length) obj.marks = this.marks.map(function(n) {
              return n.toJSON();
            });
            return obj;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (!json) throw new RangeError("Invalid input for Node.fromJSON");
            var marks = void 0;
            if (json.marks) {
              if (!Array.isArray(json.marks)) throw new RangeError("Invalid mark data for Node.fromJSON");
              marks = json.marks.map(schema.markFromJSON);
            }
            if (json.type == "text") {
              if (typeof json.text != "string") throw new RangeError("Invalid text node in JSON");
              return schema.text(json.text, marks);
            }
            var content = Fragment.fromJSON(schema, json.content);
            var node = schema.nodeType(json.type).create(json.attrs, content, marks);
            node.type.checkAttrs(node.attrs);
            return node;
          }
        }]);
        return Node2;
      })();
      Node.prototype.text = void 0;
      var TextNode = (function(_Node) {
        _inherits(TextNode2, _Node);
        var _super2 = _createSuper(TextNode2);
        function TextNode2(type, attrs, content, marks) {
          var _this;
          _classCallCheck(this, TextNode2);
          _this = _super2.call(this, type, attrs, null, marks);
          if (!content) throw new RangeError("Empty text nodes are not allowed");
          _this.text = content;
          return _this;
        }
        _createClass(TextNode2, [{
          key: "toString",
          value: function toString() {
            if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
            return wrapMarks(this.marks, JSON.stringify(this.text));
          }
        }, {
          key: "textContent",
          get: function get() {
            return this.text;
          }
        }, {
          key: "textBetween",
          value: function textBetween(from, to) {
            return this.text.slice(from, to);
          }
        }, {
          key: "nodeSize",
          get: function get() {
            return this.text.length;
          }
        }, {
          key: "mark",
          value: function mark(marks) {
            return marks == this.marks ? this : new TextNode2(this.type, this.attrs, this.text, marks);
          }
        }, {
          key: "withText",
          value: function withText(text) {
            if (text == this.text) return this;
            return new TextNode2(this.type, this.attrs, text, this.marks);
          }
        }, {
          key: "cut",
          value: function cut() {
            var from = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            var to = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.text.length;
            if (from == 0 && to == this.text.length) return this;
            return this.withText(this.text.slice(from, to));
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return this.sameMarkup(other) && this.text == other.text;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var base = _get(_getPrototypeOf(TextNode2.prototype), "toJSON", this).call(this);
            base.text = this.text;
            return base;
          }
        }]);
        return TextNode2;
      })(Node);
      function wrapMarks(marks, str) {
        for (var i = marks.length - 1; i >= 0; i--) str = marks[i].type.name + "(" + str + ")";
        return str;
      }
      var ContentMatch = (function() {
        function ContentMatch2(validEnd) {
          _classCallCheck(this, ContentMatch2);
          this.validEnd = validEnd;
          this.next = [];
          this.wrapCache = [];
        }
        _createClass(ContentMatch2, [{
          key: "matchType",
          value: function matchType(type) {
            for (var i = 0; i < this.next.length; i++) if (this.next[i].type == type) return this.next[i].next;
            return null;
          }
        }, {
          key: "matchFragment",
          value: function matchFragment(frag) {
            var start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : frag.childCount;
            var cur = this;
            for (var i = start; cur && i < end; i++) cur = cur.matchType(frag.child(i).type);
            return cur;
          }
        }, {
          key: "inlineContent",
          get: function get() {
            return this.next.length != 0 && this.next[0].type.isInline;
          }
        }, {
          key: "defaultType",
          get: function get() {
            for (var i = 0; i < this.next.length; i++) {
              var type = this.next[i].type;
              if (!(type.isText || type.hasRequiredAttrs())) return type;
            }
            return null;
          }
        }, {
          key: "compatible",
          value: function compatible(other) {
            for (var i = 0; i < this.next.length; i++) for (var j = 0; j < other.next.length; j++) if (this.next[i].type == other.next[j].type) return true;
            return false;
          }
        }, {
          key: "fillBefore",
          value: function fillBefore(after) {
            var toEnd = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
            var startIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
            var seen = [this];
            function search(match, types) {
              var finished = match.matchFragment(after, startIndex);
              if (finished && (!toEnd || finished.validEnd)) return Fragment.from(types.map(function(tp) {
                return tp.createAndFill();
              }));
              for (var i = 0; i < match.next.length; i++) {
                var _match$next$i = match.next[i], type = _match$next$i.type, next = _match$next$i.next;
                if (!(type.isText || type.hasRequiredAttrs()) && seen.indexOf(next) == -1) {
                  seen.push(next);
                  var _found = search(next, types.concat(type));
                  if (_found) return _found;
                }
              }
              return null;
            }
            return search(this, []);
          }
        }, {
          key: "findWrapping",
          value: function findWrapping(target) {
            for (var i = 0; i < this.wrapCache.length; i += 2) if (this.wrapCache[i] == target) return this.wrapCache[i + 1];
            var computed = this.computeWrapping(target);
            this.wrapCache.push(target, computed);
            return computed;
          }
        }, {
          key: "computeWrapping",
          value: function computeWrapping(target) {
            var seen = /* @__PURE__ */ Object.create(null), active = [{
              match: this,
              type: null,
              via: null
            }];
            while (active.length) {
              var current = active.shift(), match = current.match;
              if (match.matchType(target)) {
                var result = [];
                for (var obj = current; obj.type; obj = obj.via) result.push(obj.type);
                return result.reverse();
              }
              for (var i = 0; i < match.next.length; i++) {
                var _match$next$i2 = match.next[i], type = _match$next$i2.type, next = _match$next$i2.next;
                if (!type.isLeaf && !type.hasRequiredAttrs() && !(type.name in seen) && (!current.type || next.validEnd)) {
                  active.push({
                    match: type.contentMatch,
                    type,
                    via: current
                  });
                  seen[type.name] = true;
                }
              }
            }
            return null;
          }
        }, {
          key: "edgeCount",
          get: function get() {
            return this.next.length;
          }
        }, {
          key: "edge",
          value: function edge(n) {
            if (n >= this.next.length) throw new RangeError("There's no ".concat(n, "th edge in this content match"));
            return this.next[n];
          }
        }, {
          key: "toString",
          value: function toString() {
            var seen = [];
            function scan(m) {
              seen.push(m);
              for (var i = 0; i < m.next.length; i++) if (seen.indexOf(m.next[i].next) == -1) scan(m.next[i].next);
            }
            scan(this);
            return seen.map(function(m, i) {
              var out = i + (m.validEnd ? "*" : " ") + " ";
              for (var _i = 0; _i < m.next.length; _i++) out += (_i ? ", " : "") + m.next[_i].type.name + "->" + seen.indexOf(m.next[_i].next);
              return out;
            }).join("\n");
          }
        }], [{
          key: "parse",
          value: function parse(string, nodeTypes) {
            var stream = new TokenStream(string, nodeTypes);
            if (stream.next == null) return ContentMatch2.empty;
            var expr = parseExpr(stream);
            if (stream.next) stream.err("Unexpected trailing text");
            var match = dfa(nfa(expr));
            checkForDeadEnds(match, stream);
            return match;
          }
        }]);
        return ContentMatch2;
      })();
      ContentMatch.empty = new ContentMatch(true);
      var TokenStream = (function() {
        function TokenStream2(string, nodeTypes) {
          _classCallCheck(this, TokenStream2);
          this.string = string;
          this.nodeTypes = nodeTypes;
          this.inline = null;
          this.pos = 0;
          this.tokens = string.split(/\s*(?=\b|\W|$)/);
          if (this.tokens[this.tokens.length - 1] == "") this.tokens.pop();
          if (this.tokens[0] == "") this.tokens.shift();
        }
        _createClass(TokenStream2, [{
          key: "next",
          get: function get() {
            return this.tokens[this.pos];
          }
        }, {
          key: "eat",
          value: function eat(tok) {
            return this.next == tok && (this.pos++ || true);
          }
        }, {
          key: "err",
          value: function err(str) {
            throw new SyntaxError(str + " (in content expression '" + this.string + "')");
          }
        }]);
        return TokenStream2;
      })();
      function parseExpr(stream) {
        var exprs = [];
        do {
          exprs.push(parseExprSeq(stream));
        } while (stream.eat("|"));
        return exprs.length == 1 ? exprs[0] : {
          type: "choice",
          exprs
        };
      }
      function parseExprSeq(stream) {
        var exprs = [];
        do {
          exprs.push(parseExprSubscript(stream));
        } while (stream.next && stream.next != ")" && stream.next != "|");
        return exprs.length == 1 ? exprs[0] : {
          type: "seq",
          exprs
        };
      }
      function parseExprSubscript(stream) {
        var expr = parseExprAtom(stream);
        for (; ; ) {
          if (stream.eat("+")) expr = {
            type: "plus",
            expr
          };
          else if (stream.eat("*")) expr = {
            type: "star",
            expr
          };
          else if (stream.eat("?")) expr = {
            type: "opt",
            expr
          };
          else if (stream.eat("{")) expr = parseExprRange(stream, expr);
          else break;
        }
        return expr;
      }
      function parseNum(stream) {
        if (/\D/.test(stream.next)) stream.err("Expected number, got '" + stream.next + "'");
        var result = Number(stream.next);
        stream.pos++;
        return result;
      }
      function parseExprRange(stream, expr) {
        var min = parseNum(stream), max = min;
        if (stream.eat(",")) {
          if (stream.next != "}") max = parseNum(stream);
          else max = -1;
        }
        if (!stream.eat("}")) stream.err("Unclosed braced range");
        return {
          type: "range",
          min,
          max,
          expr
        };
      }
      function resolveName(stream, name) {
        var types = stream.nodeTypes, type = types[name];
        if (type) return [type];
        var result = [];
        for (var typeName in types) {
          var _type = types[typeName];
          if (_type.isInGroup(name)) result.push(_type);
        }
        if (result.length == 0) stream.err("No node type or group '" + name + "' found");
        return result;
      }
      function parseExprAtom(stream) {
        if (stream.eat("(")) {
          var expr = parseExpr(stream);
          if (!stream.eat(")")) stream.err("Missing closing paren");
          return expr;
        } else if (!/\W/.test(stream.next)) {
          var exprs = resolveName(stream, stream.next).map(function(type) {
            if (stream.inline == null) stream.inline = type.isInline;
            else if (stream.inline != type.isInline) stream.err("Mixing inline and block content");
            return {
              type: "name",
              value: type
            };
          });
          stream.pos++;
          return exprs.length == 1 ? exprs[0] : {
            type: "choice",
            exprs
          };
        } else {
          stream.err("Unexpected token '" + stream.next + "'");
        }
      }
      function nfa(expr) {
        var nfa2 = [[]];
        connect(compile(expr, 0), node());
        return nfa2;
        function node() {
          return nfa2.push([]) - 1;
        }
        function edge(from, to, term) {
          var edge2 = {
            term,
            to
          };
          nfa2[from].push(edge2);
          return edge2;
        }
        function connect(edges, to) {
          edges.forEach(function(edge2) {
            return edge2.to = to;
          });
        }
        function compile(expr2, from) {
          if (expr2.type == "choice") {
            return expr2.exprs.reduce(function(out, expr3) {
              return out.concat(compile(expr3, from));
            }, []);
          } else if (expr2.type == "seq") {
            for (var i = 0; ; i++) {
              var next = compile(expr2.exprs[i], from);
              if (i == expr2.exprs.length - 1) return next;
              connect(next, from = node());
            }
          } else if (expr2.type == "star") {
            var loop = node();
            edge(from, loop);
            connect(compile(expr2.expr, loop), loop);
            return [edge(loop)];
          } else if (expr2.type == "plus") {
            var _loop = node();
            connect(compile(expr2.expr, from), _loop);
            connect(compile(expr2.expr, _loop), _loop);
            return [edge(_loop)];
          } else if (expr2.type == "opt") {
            return [edge(from)].concat(compile(expr2.expr, from));
          } else if (expr2.type == "range") {
            var cur = from;
            for (var _i2 = 0; _i2 < expr2.min; _i2++) {
              var _next = node();
              connect(compile(expr2.expr, cur), _next);
              cur = _next;
            }
            if (expr2.max == -1) {
              connect(compile(expr2.expr, cur), cur);
            } else {
              for (var _i3 = expr2.min; _i3 < expr2.max; _i3++) {
                var _next2 = node();
                edge(cur, _next2);
                connect(compile(expr2.expr, cur), _next2);
                cur = _next2;
              }
            }
            return [edge(cur)];
          } else if (expr2.type == "name") {
            return [edge(from, void 0, expr2.value)];
          } else {
            throw new Error("Unknown expr type");
          }
        }
      }
      function cmp(a, b) {
        return b - a;
      }
      function nullFrom(nfa2, node) {
        var result = [];
        scan(node);
        return result.sort(cmp);
        function scan(node2) {
          var edges = nfa2[node2];
          if (edges.length == 1 && !edges[0].term) return scan(edges[0].to);
          result.push(node2);
          for (var i = 0; i < edges.length; i++) {
            var _edges$i = edges[i], term = _edges$i.term, to = _edges$i.to;
            if (!term && result.indexOf(to) == -1) scan(to);
          }
        }
      }
      function dfa(nfa2) {
        var labeled = /* @__PURE__ */ Object.create(null);
        return explore(nullFrom(nfa2, 0));
        function explore(states) {
          var out = [];
          states.forEach(function(node) {
            nfa2[node].forEach(function(_ref) {
              var term = _ref.term, to = _ref.to;
              if (!term) return;
              var set;
              for (var i2 = 0; i2 < out.length; i2++) if (out[i2][0] == term) set = out[i2][1];
              nullFrom(nfa2, to).forEach(function(node2) {
                if (!set) out.push([term, set = []]);
                if (set.indexOf(node2) == -1) set.push(node2);
              });
            });
          });
          var state = labeled[states.join(",")] = new ContentMatch(states.indexOf(nfa2.length - 1) > -1);
          for (var i = 0; i < out.length; i++) {
            var _states = out[i][1].sort(cmp);
            state.next.push({
              type: out[i][0],
              next: labeled[_states.join(",")] || explore(_states)
            });
          }
          return state;
        }
      }
      function checkForDeadEnds(match, stream) {
        for (var i = 0, work = [match]; i < work.length; i++) {
          var state = work[i], dead = !state.validEnd, nodes = [];
          for (var j = 0; j < state.next.length; j++) {
            var _state$next$j = state.next[j], type = _state$next$j.type, next = _state$next$j.next;
            nodes.push(type.name);
            if (dead && !(type.isText || type.hasRequiredAttrs())) dead = false;
            if (work.indexOf(next) == -1) work.push(next);
          }
          if (dead) stream.err("Only non-generatable nodes (" + nodes.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
        }
      }
      function defaultAttrs(attrs) {
        var defaults = /* @__PURE__ */ Object.create(null);
        for (var attrName in attrs) {
          var attr = attrs[attrName];
          if (!attr.hasDefault) return null;
          defaults[attrName] = attr["default"];
        }
        return defaults;
      }
      function _computeAttrs(attrs, value) {
        var built = /* @__PURE__ */ Object.create(null);
        for (var name in attrs) {
          var given = value && value[name];
          if (given === void 0) {
            var attr = attrs[name];
            if (attr.hasDefault) given = attr["default"];
            else throw new RangeError("No value supplied for attribute " + name);
          }
          built[name] = given;
        }
        return built;
      }
      function _checkAttrs(attrs, values, type, name) {
        for (var _name in values) if (!(_name in attrs)) throw new RangeError("Unsupported attribute ".concat(_name, " for ").concat(type, " of type ").concat(_name));
        for (var _name2 in attrs) {
          var attr = attrs[_name2];
          if (attr.validate) attr.validate(values[_name2]);
        }
      }
      function initAttrs(typeName, attrs) {
        var result = /* @__PURE__ */ Object.create(null);
        if (attrs) for (var name in attrs) result[name] = new Attribute(typeName, name, attrs[name]);
        return result;
      }
      var NodeType = (function() {
        function NodeType2(name, schema, spec) {
          _classCallCheck(this, NodeType2);
          this.name = name;
          this.schema = schema;
          this.spec = spec;
          this.markSet = null;
          this.groups = spec.group ? spec.group.split(" ") : [];
          this.attrs = initAttrs(name, spec.attrs);
          this.defaultAttrs = defaultAttrs(this.attrs);
          this.contentMatch = null;
          this.inlineContent = null;
          this.isBlock = !(spec.inline || name == "text");
          this.isText = name == "text";
        }
        _createClass(NodeType2, [{
          key: "isInline",
          get: function get() {
            return !this.isBlock;
          }
        }, {
          key: "isTextblock",
          get: function get() {
            return this.isBlock && this.inlineContent;
          }
        }, {
          key: "isLeaf",
          get: function get() {
            return this.contentMatch == ContentMatch.empty;
          }
        }, {
          key: "isAtom",
          get: function get() {
            return this.isLeaf || !!this.spec.atom;
          }
        }, {
          key: "isInGroup",
          value: function isInGroup(group) {
            return this.groups.indexOf(group) > -1;
          }
        }, {
          key: "whitespace",
          get: function get() {
            return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
          }
        }, {
          key: "hasRequiredAttrs",
          value: function hasRequiredAttrs() {
            for (var n in this.attrs) if (this.attrs[n].isRequired) return true;
            return false;
          }
        }, {
          key: "compatibleContent",
          value: function compatibleContent(other) {
            return this == other || this.contentMatch.compatible(other.contentMatch);
          }
        }, {
          key: "computeAttrs",
          value: function computeAttrs(attrs) {
            if (!attrs && this.defaultAttrs) return this.defaultAttrs;
            else return _computeAttrs(this.attrs, attrs);
          }
        }, {
          key: "create",
          value: function create() {
            var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            var content = arguments.length > 1 ? arguments[1] : void 0;
            var marks = arguments.length > 2 ? arguments[2] : void 0;
            if (this.isText) throw new Error("NodeType.create can't construct text nodes");
            return new Node(this, this.computeAttrs(attrs), Fragment.from(content), Mark.setFrom(marks));
          }
        }, {
          key: "createChecked",
          value: function createChecked() {
            var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            var content = arguments.length > 1 ? arguments[1] : void 0;
            var marks = arguments.length > 2 ? arguments[2] : void 0;
            content = Fragment.from(content);
            this.checkContent(content);
            return new Node(this, this.computeAttrs(attrs), content, Mark.setFrom(marks));
          }
        }, {
          key: "createAndFill",
          value: function createAndFill() {
            var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            var content = arguments.length > 1 ? arguments[1] : void 0;
            var marks = arguments.length > 2 ? arguments[2] : void 0;
            attrs = this.computeAttrs(attrs);
            content = Fragment.from(content);
            if (content.size) {
              var before = this.contentMatch.fillBefore(content);
              if (!before) return null;
              content = before.append(content);
            }
            var matched = this.contentMatch.matchFragment(content);
            var after = matched && matched.fillBefore(Fragment.empty, true);
            if (!after) return null;
            return new Node(this, attrs, content.append(after), Mark.setFrom(marks));
          }
        }, {
          key: "validContent",
          value: function validContent(content) {
            var result = this.contentMatch.matchFragment(content);
            if (!result || !result.validEnd) return false;
            for (var i = 0; i < content.childCount; i++) if (!this.allowsMarks(content.child(i).marks)) return false;
            return true;
          }
        }, {
          key: "checkContent",
          value: function checkContent(content) {
            if (!this.validContent(content)) throw new RangeError("Invalid content for node ".concat(this.name, ": ").concat(content.toString().slice(0, 50)));
          }
        }, {
          key: "checkAttrs",
          value: function checkAttrs(attrs) {
            _checkAttrs(this.attrs, attrs, "node", this.name);
          }
        }, {
          key: "allowsMarkType",
          value: function allowsMarkType(markType) {
            return this.markSet == null || this.markSet.indexOf(markType) > -1;
          }
        }, {
          key: "allowsMarks",
          value: function allowsMarks(marks) {
            if (this.markSet == null) return true;
            for (var i = 0; i < marks.length; i++) if (!this.allowsMarkType(marks[i].type)) return false;
            return true;
          }
        }, {
          key: "allowedMarks",
          value: function allowedMarks(marks) {
            if (this.markSet == null) return marks;
            var copy2;
            for (var i = 0; i < marks.length; i++) {
              if (!this.allowsMarkType(marks[i].type)) {
                if (!copy2) copy2 = marks.slice(0, i);
              } else if (copy2) {
                copy2.push(marks[i]);
              }
            }
            return !copy2 ? marks : copy2.length ? copy2 : Mark.none;
          }
        }], [{
          key: "compile",
          value: function compile(nodes, schema) {
            var result = /* @__PURE__ */ Object.create(null);
            nodes.forEach(function(name, spec) {
              return result[name] = new NodeType2(name, schema, spec);
            });
            var topType = schema.spec.topNode || "doc";
            if (!result[topType]) throw new RangeError("Schema is missing its top node type ('" + topType + "')");
            if (!result.text) throw new RangeError("Every schema needs a 'text' type");
            for (var _ in result.text.attrs) throw new RangeError("The text node type should not have attributes");
            return result;
          }
        }]);
        return NodeType2;
      })();
      function validateType(typeName, attrName, type) {
        var types = type.split("|");
        return function(value) {
          var name = value === null ? "null" : _typeof(value);
          if (types.indexOf(name) < 0) throw new RangeError("Expected value of type ".concat(types, " for attribute ").concat(attrName, " on type ").concat(typeName, ", got ").concat(name));
        };
      }
      var Attribute = (function() {
        function Attribute2(typeName, attrName, options) {
          _classCallCheck(this, Attribute2);
          this.hasDefault = Object.prototype.hasOwnProperty.call(options, "default");
          this["default"] = options["default"];
          this.validate = typeof options.validate == "string" ? validateType(typeName, attrName, options.validate) : options.validate;
        }
        _createClass(Attribute2, [{
          key: "isRequired",
          get: function get() {
            return !this.hasDefault;
          }
        }]);
        return Attribute2;
      })();
      var MarkType = (function() {
        function MarkType2(name, rank, schema, spec) {
          _classCallCheck(this, MarkType2);
          this.name = name;
          this.rank = rank;
          this.schema = schema;
          this.spec = spec;
          this.attrs = initAttrs(name, spec.attrs);
          this.excluded = null;
          var defaults = defaultAttrs(this.attrs);
          this.instance = defaults ? new Mark(this, defaults) : null;
        }
        _createClass(MarkType2, [{
          key: "create",
          value: function create() {
            var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            if (!attrs && this.instance) return this.instance;
            return new Mark(this, _computeAttrs(this.attrs, attrs));
          }
        }, {
          key: "removeFromSet",
          value: function removeFromSet(set) {
            for (var i = 0; i < set.length; i++) if (set[i].type == this) {
              set = set.slice(0, i).concat(set.slice(i + 1));
              i--;
            }
            return set;
          }
        }, {
          key: "isInSet",
          value: function isInSet(set) {
            for (var i = 0; i < set.length; i++) if (set[i].type == this) return set[i];
          }
        }, {
          key: "checkAttrs",
          value: function checkAttrs(attrs) {
            _checkAttrs(this.attrs, attrs, "mark", this.name);
          }
        }, {
          key: "excludes",
          value: function excludes(other) {
            return this.excluded.indexOf(other) > -1;
          }
        }], [{
          key: "compile",
          value: function compile(marks, schema) {
            var result = /* @__PURE__ */ Object.create(null), rank = 0;
            marks.forEach(function(name, spec) {
              return result[name] = new MarkType2(name, rank++, schema, spec);
            });
            return result;
          }
        }]);
        return MarkType2;
      })();
      var Schema = (function() {
        function Schema2(spec) {
          var _this2 = this;
          _classCallCheck(this, Schema2);
          this.linebreakReplacement = null;
          this.cached = /* @__PURE__ */ Object.create(null);
          var instanceSpec = this.spec = {};
          for (var prop in spec) instanceSpec[prop] = spec[prop];
          instanceSpec.nodes = OrderedMap.from(spec.nodes), instanceSpec.marks = OrderedMap.from(spec.marks || {}), this.nodes = NodeType.compile(this.spec.nodes, this);
          this.marks = MarkType.compile(this.spec.marks, this);
          var contentExprCache = /* @__PURE__ */ Object.create(null);
          for (var _prop in this.nodes) {
            if (_prop in this.marks) throw new RangeError(_prop + " can not be both a node and a mark");
            var type = this.nodes[_prop], contentExpr = type.spec.content || "", markExpr = type.spec.marks;
            type.contentMatch = contentExprCache[contentExpr] || (contentExprCache[contentExpr] = ContentMatch.parse(contentExpr, this.nodes));
            type.inlineContent = type.contentMatch.inlineContent;
            if (type.spec.linebreakReplacement) {
              if (this.linebreakReplacement) throw new RangeError("Multiple linebreak nodes defined");
              if (!type.isInline || !type.isLeaf) throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
              this.linebreakReplacement = type;
            }
            type.markSet = markExpr == "_" ? null : markExpr ? gatherMarks(this, markExpr.split(" ")) : markExpr == "" || !type.inlineContent ? [] : null;
          }
          for (var _prop2 in this.marks) {
            var _type2 = this.marks[_prop2], excl = _type2.spec.excludes;
            _type2.excluded = excl == null ? [_type2] : excl == "" ? [] : gatherMarks(this, excl.split(" "));
          }
          this.nodeFromJSON = function(json) {
            return Node.fromJSON(_this2, json);
          };
          this.markFromJSON = function(json) {
            return Mark.fromJSON(_this2, json);
          };
          this.topNodeType = this.nodes[this.spec.topNode || "doc"];
          this.cached.wrappings = /* @__PURE__ */ Object.create(null);
        }
        _createClass(Schema2, [{
          key: "node",
          value: function node(type) {
            var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            var content = arguments.length > 2 ? arguments[2] : void 0;
            var marks = arguments.length > 3 ? arguments[3] : void 0;
            if (typeof type == "string") type = this.nodeType(type);
            else if (!(type instanceof NodeType)) throw new RangeError("Invalid node type: " + type);
            else if (type.schema != this) throw new RangeError("Node type from different schema used (" + type.name + ")");
            return type.createChecked(attrs, content, marks);
          }
        }, {
          key: "text",
          value: function text(_text, marks) {
            var type = this.nodes.text;
            return new TextNode(type, type.defaultAttrs, _text, Mark.setFrom(marks));
          }
        }, {
          key: "mark",
          value: function mark(type, attrs) {
            if (typeof type == "string") type = this.marks[type];
            return type.create(attrs);
          }
        }, {
          key: "nodeType",
          value: function nodeType(name) {
            var found2 = this.nodes[name];
            if (!found2) throw new RangeError("Unknown node type: " + name);
            return found2;
          }
        }]);
        return Schema2;
      })();
      function gatherMarks(schema, marks) {
        var found2 = [];
        for (var i = 0; i < marks.length; i++) {
          var name = marks[i], mark = schema.marks[name], ok = mark;
          if (mark) {
            found2.push(mark);
          } else {
            for (var prop in schema.marks) {
              var _mark = schema.marks[prop];
              if (name == "_" || _mark.spec.group && _mark.spec.group.split(" ").indexOf(name) > -1) found2.push(ok = _mark);
            }
          }
          if (!ok) throw new SyntaxError("Unknown mark type: '" + marks[i] + "'");
        }
        return found2;
      }
      function isTagRule(rule) {
        return rule.tag != null;
      }
      function isStyleRule(rule) {
        return rule.style != null;
      }
      var DOMParser = (function() {
        function DOMParser2(schema, rules) {
          var _this3 = this;
          _classCallCheck(this, DOMParser2);
          this.schema = schema;
          this.rules = rules;
          this.tags = [];
          this.styles = [];
          var matchedStyles = this.matchedStyles = [];
          rules.forEach(function(rule) {
            if (isTagRule(rule)) {
              _this3.tags.push(rule);
            } else if (isStyleRule(rule)) {
              var prop = /[^=]*/.exec(rule.style)[0];
              if (matchedStyles.indexOf(prop) < 0) matchedStyles.push(prop);
              _this3.styles.push(rule);
            }
          });
          this.normalizeLists = !this.tags.some(function(r) {
            if (!/^(ul|ol)\b/.test(r.tag) || !r.node) return false;
            var node = schema.nodes[r.node];
            return node.contentMatch.matchType(node);
          });
        }
        _createClass(DOMParser2, [{
          key: "parse",
          value: function parse(dom) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var context = new ParseContext(this, options, false);
            context.addAll(dom, Mark.none, options.from, options.to);
            return context.finish();
          }
        }, {
          key: "parseSlice",
          value: function parseSlice(dom) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var context = new ParseContext(this, options, true);
            context.addAll(dom, Mark.none, options.from, options.to);
            return Slice.maxOpen(context.finish());
          }
        }, {
          key: "matchTag",
          value: function matchTag(dom, context, after) {
            for (var i = after ? this.tags.indexOf(after) + 1 : 0; i < this.tags.length; i++) {
              var rule = this.tags[i];
              if (matches(dom, rule.tag) && (rule.namespace === void 0 || dom.namespaceURI == rule.namespace) && (!rule.context || context.matchesContext(rule.context))) {
                if (rule.getAttrs) {
                  var result = rule.getAttrs(dom);
                  if (result === false) continue;
                  rule.attrs = result || void 0;
                }
                return rule;
              }
            }
          }
        }, {
          key: "matchStyle",
          value: function matchStyle(prop, value, context, after) {
            for (var i = after ? this.styles.indexOf(after) + 1 : 0; i < this.styles.length; i++) {
              var rule = this.styles[i], style = rule.style;
              if (style.indexOf(prop) != 0 || rule.context && !context.matchesContext(rule.context) || style.length > prop.length && (style.charCodeAt(prop.length) != 61 || style.slice(prop.length + 1) != value)) continue;
              if (rule.getAttrs) {
                var result = rule.getAttrs(value);
                if (result === false) continue;
                rule.attrs = result || void 0;
              }
              return rule;
            }
          }
        }], [{
          key: "schemaRules",
          value: function schemaRules(schema) {
            var result = [];
            function insert(rule) {
              var priority = rule.priority == null ? 50 : rule.priority, i = 0;
              for (; i < result.length; i++) {
                var next = result[i], nextPriority = next.priority == null ? 50 : next.priority;
                if (nextPriority < priority) break;
              }
              result.splice(i, 0, rule);
            }
            var _loop2 = function _loop22(name2) {
              var rules = schema.marks[name2].spec.parseDOM;
              if (rules) rules.forEach(function(rule) {
                insert(rule = copy(rule));
                if (!(rule.mark || rule.ignore || rule.clearMark)) rule.mark = name2;
              });
            };
            for (var name in schema.marks) {
              _loop2(name);
            }
            var _loop3 = function _loop32(_name32) {
              var rules = schema.nodes[_name32].spec.parseDOM;
              if (rules) rules.forEach(function(rule) {
                insert(rule = copy(rule));
                if (!(rule.node || rule.ignore || rule.mark)) rule.node = _name32;
              });
            };
            for (var _name3 in schema.nodes) {
              _loop3(_name3);
            }
            return result;
          }
        }, {
          key: "fromSchema",
          value: function fromSchema(schema) {
            return schema.cached.domParser || (schema.cached.domParser = new DOMParser2(schema, DOMParser2.schemaRules(schema)));
          }
        }]);
        return DOMParser2;
      })();
      var blockTags = {
        address: true,
        article: true,
        aside: true,
        blockquote: true,
        canvas: true,
        dd: true,
        div: true,
        dl: true,
        fieldset: true,
        figcaption: true,
        figure: true,
        footer: true,
        form: true,
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
        header: true,
        hgroup: true,
        hr: true,
        li: true,
        noscript: true,
        ol: true,
        output: true,
        p: true,
        pre: true,
        section: true,
        table: true,
        tfoot: true,
        ul: true
      };
      var ignoreTags = {
        head: true,
        noscript: true,
        object: true,
        script: true,
        style: true,
        title: true
      };
      var listTags = {
        ol: true,
        ul: true
      };
      var OPT_PRESERVE_WS = 1;
      var OPT_PRESERVE_WS_FULL = 2;
      var OPT_OPEN_LEFT = 4;
      function wsOptionsFor(type, preserveWhitespace, base) {
        if (preserveWhitespace != null) return (preserveWhitespace ? OPT_PRESERVE_WS : 0) | (preserveWhitespace === "full" ? OPT_PRESERVE_WS_FULL : 0);
        return type && type.whitespace == "pre" ? OPT_PRESERVE_WS | OPT_PRESERVE_WS_FULL : base & ~OPT_OPEN_LEFT;
      }
      var NodeContext = (function() {
        function NodeContext2(type, attrs, marks, solid, match, options) {
          _classCallCheck(this, NodeContext2);
          this.type = type;
          this.attrs = attrs;
          this.marks = marks;
          this.solid = solid;
          this.options = options;
          this.content = [];
          this.activeMarks = Mark.none;
          this.match = match || (options & OPT_OPEN_LEFT ? null : type.contentMatch);
        }
        _createClass(NodeContext2, [{
          key: "findWrapping",
          value: function findWrapping(node) {
            if (!this.match) {
              if (!this.type) return [];
              var fill = this.type.contentMatch.fillBefore(Fragment.from(node));
              if (fill) {
                this.match = this.type.contentMatch.matchFragment(fill);
              } else {
                var start = this.type.contentMatch, wrap;
                if (wrap = start.findWrapping(node.type)) {
                  this.match = start;
                  return wrap;
                } else {
                  return null;
                }
              }
            }
            return this.match.findWrapping(node.type);
          }
        }, {
          key: "finish",
          value: function finish(openEnd) {
            if (!(this.options & OPT_PRESERVE_WS)) {
              var last = this.content[this.content.length - 1], m;
              if (last && last.isText && (m = /[ \t\r\n\u000c]+$/.exec(last.text))) {
                var text = last;
                if (last.text.length == m[0].length) this.content.pop();
                else this.content[this.content.length - 1] = text.withText(text.text.slice(0, text.text.length - m[0].length));
              }
            }
            var content = Fragment.from(this.content);
            if (!openEnd && this.match) content = content.append(this.match.fillBefore(Fragment.empty, true));
            return this.type ? this.type.create(this.attrs, content, this.marks) : content;
          }
        }, {
          key: "inlineContext",
          value: function inlineContext(node) {
            if (this.type) return this.type.inlineContent;
            if (this.content.length) return this.content[0].isInline;
            return node.parentNode && !blockTags.hasOwnProperty(node.parentNode.nodeName.toLowerCase());
          }
        }]);
        return NodeContext2;
      })();
      var ParseContext = (function() {
        function ParseContext2(parser, options, isOpen) {
          _classCallCheck(this, ParseContext2);
          this.parser = parser;
          this.options = options;
          this.isOpen = isOpen;
          this.open = 0;
          this.localPreserveWS = false;
          var topNode = options.topNode, topContext;
          var topOptions = wsOptionsFor(null, options.preserveWhitespace, 0) | (isOpen ? OPT_OPEN_LEFT : 0);
          if (topNode) topContext = new NodeContext(topNode.type, topNode.attrs, Mark.none, true, options.topMatch || topNode.type.contentMatch, topOptions);
          else if (isOpen) topContext = new NodeContext(null, null, Mark.none, true, null, topOptions);
          else topContext = new NodeContext(parser.schema.topNodeType, null, Mark.none, true, null, topOptions);
          this.nodes = [topContext];
          this.find = options.findPositions;
          this.needsBlock = false;
        }
        _createClass(ParseContext2, [{
          key: "top",
          get: function get() {
            return this.nodes[this.open];
          }
        }, {
          key: "addDOM",
          value: function addDOM(dom, marks) {
            if (dom.nodeType == 3) this.addTextNode(dom, marks);
            else if (dom.nodeType == 1) this.addElement(dom, marks);
          }
        }, {
          key: "addTextNode",
          value: function addTextNode(dom, marks) {
            var value = dom.nodeValue;
            var top = this.top, preserveWS = top.options & OPT_PRESERVE_WS_FULL ? "full" : this.localPreserveWS || (top.options & OPT_PRESERVE_WS) > 0;
            var schema = this.parser.schema;
            if (preserveWS === "full" || top.inlineContext(dom) || /[^ \t\r\n\u000c]/.test(value)) {
              if (!preserveWS) {
                value = value.replace(/[ \t\r\n\u000c]+/g, " ");
                if (/^[ \t\r\n\u000c]/.test(value) && this.open == this.nodes.length - 1) {
                  var nodeBefore = top.content[top.content.length - 1];
                  var domNodeBefore = dom.previousSibling;
                  if (!nodeBefore || domNodeBefore && domNodeBefore.nodeName == "BR" || nodeBefore.isText && /[ \t\r\n\u000c]$/.test(nodeBefore.text)) value = value.slice(1);
                }
              } else if (preserveWS === "full") {
                value = value.replace(/\r\n?/g, "\n");
              } else if (schema.linebreakReplacement && /[\r\n]/.test(value) && this.top.findWrapping(schema.linebreakReplacement.create())) {
                var lines = value.split(/\r?\n|\r/);
                for (var i = 0; i < lines.length; i++) {
                  if (i) this.insertNode(schema.linebreakReplacement.create(), marks, true);
                  if (lines[i]) this.insertNode(schema.text(lines[i]), marks, !/\S/.test(lines[i]));
                }
                value = "";
              } else {
                value = value.replace(/\r?\n|\r/g, " ");
              }
              if (value) this.insertNode(schema.text(value), marks, !/\S/.test(value));
              this.findInText(dom);
            } else {
              this.findInside(dom);
            }
          }
        }, {
          key: "addElement",
          value: function addElement(dom, marks, matchAfter) {
            var outerWS = this.localPreserveWS, top = this.top;
            if (dom.tagName == "PRE" || /pre/.test(dom.style && dom.style.whiteSpace)) this.localPreserveWS = true;
            var name = dom.nodeName.toLowerCase(), ruleID;
            if (listTags.hasOwnProperty(name) && this.parser.normalizeLists) normalizeList(dom);
            var rule = this.options.ruleFromNode && this.options.ruleFromNode(dom) || (ruleID = this.parser.matchTag(dom, this, matchAfter));
            out: if (rule ? rule.ignore : ignoreTags.hasOwnProperty(name)) {
              this.findInside(dom);
              this.ignoreFallback(dom, marks);
            } else if (!rule || rule.skip || rule.closeParent) {
              if (rule && rule.closeParent) this.open = Math.max(0, this.open - 1);
              else if (rule && rule.skip.nodeType) dom = rule.skip;
              var sync, oldNeedsBlock = this.needsBlock;
              if (blockTags.hasOwnProperty(name)) {
                if (top.content.length && top.content[0].isInline && this.open) {
                  this.open--;
                  top = this.top;
                }
                sync = true;
                if (!top.type) this.needsBlock = true;
              } else if (!dom.firstChild) {
                this.leafFallback(dom, marks);
                break out;
              }
              var innerMarks = rule && rule.skip ? marks : this.readStyles(dom, marks);
              if (innerMarks) this.addAll(dom, innerMarks);
              if (sync) this.sync(top);
              this.needsBlock = oldNeedsBlock;
            } else {
              var _innerMarks = this.readStyles(dom, marks);
              if (_innerMarks) this.addElementByRule(dom, rule, _innerMarks, rule.consuming === false ? ruleID : void 0);
            }
            this.localPreserveWS = outerWS;
          }
        }, {
          key: "leafFallback",
          value: function leafFallback(dom, marks) {
            if (dom.nodeName == "BR" && this.top.type && this.top.type.inlineContent) this.addTextNode(dom.ownerDocument.createTextNode("\n"), marks);
          }
        }, {
          key: "ignoreFallback",
          value: function ignoreFallback(dom, marks) {
            if (dom.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent)) this.findPlace(this.parser.schema.text("-"), marks, true);
          }
        }, {
          key: "readStyles",
          value: function readStyles(dom, marks) {
            var _this4 = this;
            var styles = dom.style;
            if (styles && styles.length) for (var i = 0; i < this.parser.matchedStyles.length; i++) {
              var name = this.parser.matchedStyles[i], value = styles.getPropertyValue(name);
              if (value) {
                var _loop4 = function _loop42(_after) {
                  var rule = _this4.parser.matchStyle(name, value, _this4, _after);
                  if (!rule) {
                    after = _after;
                    return 0;
                  }
                  if (rule.ignore) return {
                    v: null
                  };
                  if (rule.clearMark) marks = marks.filter(function(m) {
                    return !rule.clearMark(m);
                  });
                  else marks = marks.concat(_this4.parser.schema.marks[rule.mark].create(rule.attrs));
                  if (rule.consuming === false) _after = rule;
                  else {
                    after = _after;
                    return 0;
                  }
                  after = _after;
                }, _ret;
                for (var after = void 0; ; ) {
                  _ret = _loop4(after);
                  if (_ret === 0) break;
                  if (_ret) return _ret.v;
                }
              }
            }
            return marks;
          }
        }, {
          key: "addElementByRule",
          value: function addElementByRule(dom, rule, marks, continueAfter) {
            var _this5 = this;
            var sync, nodeType;
            if (rule.node) {
              nodeType = this.parser.schema.nodes[rule.node];
              if (!nodeType.isLeaf) {
                var inner = this.enter(nodeType, rule.attrs || null, marks, rule.preserveWhitespace);
                if (inner) {
                  sync = true;
                  marks = inner;
                }
              } else if (!this.insertNode(nodeType.create(rule.attrs), marks, dom.nodeName == "BR")) {
                this.leafFallback(dom, marks);
              }
            } else {
              var markType = this.parser.schema.marks[rule.mark];
              marks = marks.concat(markType.create(rule.attrs));
            }
            var startIn = this.top;
            if (nodeType && nodeType.isLeaf) {
              this.findInside(dom);
            } else if (continueAfter) {
              this.addElement(dom, marks, continueAfter);
            } else if (rule.getContent) {
              this.findInside(dom);
              rule.getContent(dom, this.parser.schema).forEach(function(node) {
                return _this5.insertNode(node, marks, false);
              });
            } else {
              var contentDOM = dom;
              if (typeof rule.contentElement == "string") contentDOM = dom.querySelector(rule.contentElement);
              else if (typeof rule.contentElement == "function") contentDOM = rule.contentElement(dom);
              else if (rule.contentElement) contentDOM = rule.contentElement;
              this.findAround(dom, contentDOM, true);
              this.addAll(contentDOM, marks);
              this.findAround(dom, contentDOM, false);
            }
            if (sync && this.sync(startIn)) this.open--;
          }
        }, {
          key: "addAll",
          value: function addAll(parent, marks, startIndex, endIndex) {
            var index = startIndex || 0;
            for (var dom = startIndex ? parent.childNodes[startIndex] : parent.firstChild, end = endIndex == null ? null : parent.childNodes[endIndex]; dom != end; dom = dom.nextSibling, ++index) {
              this.findAtPoint(parent, index);
              this.addDOM(dom, marks);
            }
            this.findAtPoint(parent, index);
          }
        }, {
          key: "findPlace",
          value: function findPlace(node, marks, cautious) {
            var route, sync;
            for (var depth = this.open, penalty = 0; depth >= 0; depth--) {
              var cx = this.nodes[depth];
              var _found2 = cx.findWrapping(node);
              if (_found2 && (!route || route.length > _found2.length + penalty)) {
                route = _found2;
                sync = cx;
                if (!_found2.length) break;
              }
              if (cx.solid) {
                if (cautious) break;
                penalty += 2;
              }
            }
            if (!route) return null;
            this.sync(sync);
            for (var i = 0; i < route.length; i++) marks = this.enterInner(route[i], null, marks, false);
            return marks;
          }
        }, {
          key: "insertNode",
          value: function insertNode(node, marks, cautious) {
            if (node.isInline && this.needsBlock && !this.top.type) {
              var block = this.textblockFromContext();
              if (block) marks = this.enterInner(block, null, marks);
            }
            var innerMarks = this.findPlace(node, marks, cautious);
            if (innerMarks) {
              this.closeExtra();
              var top = this.top;
              if (top.match) top.match = top.match.matchType(node.type);
              var nodeMarks = Mark.none;
              var _iterator = _createForOfIteratorHelper(innerMarks.concat(node.marks)), _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                  var m = _step.value;
                  if (top.type ? top.type.allowsMarkType(m.type) : markMayApply(m.type, node.type)) nodeMarks = m.addToSet(nodeMarks);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              top.content.push(node.mark(nodeMarks));
              return true;
            }
            return false;
          }
        }, {
          key: "enter",
          value: function enter(type, attrs, marks, preserveWS) {
            var innerMarks = this.findPlace(type.create(attrs), marks, false);
            if (innerMarks) innerMarks = this.enterInner(type, attrs, marks, true, preserveWS);
            return innerMarks;
          }
        }, {
          key: "enterInner",
          value: function enterInner(type, attrs, marks) {
            var solid = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
            var preserveWS = arguments.length > 4 ? arguments[4] : void 0;
            this.closeExtra();
            var top = this.top;
            top.match = top.match && top.match.matchType(type);
            var options = wsOptionsFor(type, preserveWS, top.options);
            if (top.options & OPT_OPEN_LEFT && top.content.length == 0) options |= OPT_OPEN_LEFT;
            var applyMarks = Mark.none;
            marks = marks.filter(function(m) {
              if (top.type ? top.type.allowsMarkType(m.type) : markMayApply(m.type, type)) {
                applyMarks = m.addToSet(applyMarks);
                return false;
              }
              return true;
            });
            this.nodes.push(new NodeContext(type, attrs, applyMarks, solid, null, options));
            this.open++;
            return marks;
          }
        }, {
          key: "closeExtra",
          value: function closeExtra() {
            var openEnd = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            var i = this.nodes.length - 1;
            if (i > this.open) {
              for (; i > this.open; i--) this.nodes[i - 1].content.push(this.nodes[i].finish(openEnd));
              this.nodes.length = this.open + 1;
            }
          }
        }, {
          key: "finish",
          value: function finish() {
            this.open = 0;
            this.closeExtra(this.isOpen);
            return this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
          }
        }, {
          key: "sync",
          value: function sync(to) {
            for (var i = this.open; i >= 0; i--) {
              if (this.nodes[i] == to) {
                this.open = i;
                return true;
              } else if (this.localPreserveWS) {
                this.nodes[i].options |= OPT_PRESERVE_WS;
              }
            }
            return false;
          }
        }, {
          key: "currentPos",
          get: function get() {
            this.closeExtra();
            var pos = 0;
            for (var i = this.open; i >= 0; i--) {
              var content = this.nodes[i].content;
              for (var j = content.length - 1; j >= 0; j--) pos += content[j].nodeSize;
              if (i) pos++;
            }
            return pos;
          }
        }, {
          key: "findAtPoint",
          value: function findAtPoint(parent, offset) {
            if (this.find) for (var i = 0; i < this.find.length; i++) {
              if (this.find[i].node == parent && this.find[i].offset == offset) this.find[i].pos = this.currentPos;
            }
          }
        }, {
          key: "findInside",
          value: function findInside(parent) {
            if (this.find) for (var i = 0; i < this.find.length; i++) {
              if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) this.find[i].pos = this.currentPos;
            }
          }
        }, {
          key: "findAround",
          value: function findAround(parent, content, before) {
            if (parent != content && this.find) for (var i = 0; i < this.find.length; i++) {
              if (this.find[i].pos == null && parent.nodeType == 1 && parent.contains(this.find[i].node)) {
                var pos = content.compareDocumentPosition(this.find[i].node);
                if (pos & (before ? 2 : 4)) this.find[i].pos = this.currentPos;
              }
            }
          }
        }, {
          key: "findInText",
          value: function findInText(textNode) {
            if (this.find) for (var i = 0; i < this.find.length; i++) {
              if (this.find[i].node == textNode) this.find[i].pos = this.currentPos - (textNode.nodeValue.length - this.find[i].offset);
            }
          }
        }, {
          key: "matchesContext",
          value: function matchesContext(context) {
            var _this6 = this;
            if (context.indexOf("|") > -1) return context.split(/\s*\|\s*/).some(this.matchesContext, this);
            var parts = context.split("/");
            var option = this.options.context;
            var useRoot = !this.isOpen && (!option || option.parent.type == this.nodes[0].type);
            var minDepth = -(option ? option.depth + 1 : 0) + (useRoot ? 0 : 1);
            var match = function match2(i, depth) {
              for (; i >= 0; i--) {
                var part = parts[i];
                if (part == "") {
                  if (i == parts.length - 1 || i == 0) continue;
                  for (; depth >= minDepth; depth--) if (match2(i - 1, depth)) return true;
                  return false;
                } else {
                  var next = depth > 0 || depth == 0 && useRoot ? _this6.nodes[depth].type : option && depth >= minDepth ? option.node(depth - minDepth).type : null;
                  if (!next || next.name != part && !next.isInGroup(part)) return false;
                  depth--;
                }
              }
              return true;
            };
            return match(parts.length - 1, this.open);
          }
        }, {
          key: "textblockFromContext",
          value: function textblockFromContext() {
            var $context = this.options.context;
            if ($context) for (var d = $context.depth; d >= 0; d--) {
              var deflt = $context.node(d).contentMatchAt($context.indexAfter(d)).defaultType;
              if (deflt && deflt.isTextblock && deflt.defaultAttrs) return deflt;
            }
            for (var name in this.parser.schema.nodes) {
              var type = this.parser.schema.nodes[name];
              if (type.isTextblock && type.defaultAttrs) return type;
            }
          }
        }]);
        return ParseContext2;
      })();
      function normalizeList(dom) {
        for (var child = dom.firstChild, prevItem = null; child; child = child.nextSibling) {
          var name = child.nodeType == 1 ? child.nodeName.toLowerCase() : null;
          if (name && listTags.hasOwnProperty(name) && prevItem) {
            prevItem.appendChild(child);
            child = prevItem;
          } else if (name == "li") {
            prevItem = child;
          } else if (name) {
            prevItem = null;
          }
        }
      }
      function matches(dom, selector) {
        return (dom.matches || dom.msMatchesSelector || dom.webkitMatchesSelector || dom.mozMatchesSelector).call(dom, selector);
      }
      function copy(obj) {
        var copy2 = {};
        for (var prop in obj) copy2[prop] = obj[prop];
        return copy2;
      }
      function markMayApply(markType, nodeType) {
        var nodes = nodeType.schema.nodes;
        var _loop5 = function _loop52() {
          var parent = nodes[name];
          if (!parent.allowsMarkType(markType)) return 0;
          var seen = [], scan = function scan2(match) {
            seen.push(match);
            for (var i = 0; i < match.edgeCount; i++) {
              var _match$edge = match.edge(i), type = _match$edge.type, next = _match$edge.next;
              if (type == nodeType) return true;
              if (seen.indexOf(next) < 0 && scan2(next)) return true;
            }
          };
          if (scan(parent.contentMatch)) return {
            v: true
          };
        }, _ret2;
        for (var name in nodes) {
          _ret2 = _loop5();
          if (_ret2 === 0) continue;
          if (_ret2) return _ret2.v;
        }
      }
      var DOMSerializer = (function() {
        function DOMSerializer2(nodes, marks) {
          _classCallCheck(this, DOMSerializer2);
          this.nodes = nodes;
          this.marks = marks;
        }
        _createClass(DOMSerializer2, [{
          key: "serializeFragment",
          value: function serializeFragment(fragment) {
            var _this7 = this;
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var target = arguments.length > 2 ? arguments[2] : void 0;
            if (!target) target = doc(options).createDocumentFragment();
            var top = target, active = [];
            fragment.forEach(function(node) {
              if (active.length || node.marks.length) {
                var keep = 0, rendered = 0;
                while (keep < active.length && rendered < node.marks.length) {
                  var next = node.marks[rendered];
                  if (!_this7.marks[next.type.name]) {
                    rendered++;
                    continue;
                  }
                  if (!next.eq(active[keep][0]) || next.type.spec.spanning === false) break;
                  keep++;
                  rendered++;
                }
                while (keep < active.length) top = active.pop()[1];
                while (rendered < node.marks.length) {
                  var add = node.marks[rendered++];
                  var markDOM = _this7.serializeMark(add, node.isInline, options);
                  if (markDOM) {
                    active.push([add, top]);
                    top.appendChild(markDOM.dom);
                    top = markDOM.contentDOM || markDOM.dom;
                  }
                }
              }
              top.appendChild(_this7.serializeNodeInner(node, options));
            });
            return target;
          }
        }, {
          key: "serializeNodeInner",
          value: function serializeNodeInner(node, options) {
            var _renderSpec2 = _renderSpec(doc(options), this.nodes[node.type.name](node), null, node.attrs), dom = _renderSpec2.dom, contentDOM = _renderSpec2.contentDOM;
            if (contentDOM) {
              if (node.isLeaf) throw new RangeError("Content hole not allowed in a leaf node spec");
              this.serializeFragment(node.content, options, contentDOM);
            }
            return dom;
          }
        }, {
          key: "serializeNode",
          value: function serializeNode(node) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var dom = this.serializeNodeInner(node, options);
            for (var i = node.marks.length - 1; i >= 0; i--) {
              var wrap = this.serializeMark(node.marks[i], node.isInline, options);
              if (wrap) {
                (wrap.contentDOM || wrap.dom).appendChild(dom);
                dom = wrap.dom;
              }
            }
            return dom;
          }
        }, {
          key: "serializeMark",
          value: function serializeMark(mark, inline) {
            var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            var toDOM = this.marks[mark.type.name];
            return toDOM && _renderSpec(doc(options), toDOM(mark, inline), null, mark.attrs);
          }
        }], [{
          key: "renderSpec",
          value: function renderSpec(doc2, structure) {
            var xmlNS = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            var blockArraysIn = arguments.length > 3 ? arguments[3] : void 0;
            return _renderSpec(doc2, structure, xmlNS, blockArraysIn);
          }
        }, {
          key: "fromSchema",
          value: function fromSchema(schema) {
            return schema.cached.domSerializer || (schema.cached.domSerializer = new DOMSerializer2(this.nodesFromSchema(schema), this.marksFromSchema(schema)));
          }
        }, {
          key: "nodesFromSchema",
          value: function nodesFromSchema(schema) {
            var result = gatherToDOM(schema.nodes);
            if (!result.text) result.text = function(node) {
              return node.text;
            };
            return result;
          }
        }, {
          key: "marksFromSchema",
          value: function marksFromSchema(schema) {
            return gatherToDOM(schema.marks);
          }
        }]);
        return DOMSerializer2;
      })();
      function gatherToDOM(obj) {
        var result = {};
        for (var name in obj) {
          var toDOM = obj[name].spec.toDOM;
          if (toDOM) result[name] = toDOM;
        }
        return result;
      }
      function doc(options) {
        return options.document || window.document;
      }
      var suspiciousAttributeCache = /* @__PURE__ */ new WeakMap();
      function suspiciousAttributes(attrs) {
        var value = suspiciousAttributeCache.get(attrs);
        if (value === void 0) suspiciousAttributeCache.set(attrs, value = suspiciousAttributesInner(attrs));
        return value;
      }
      function suspiciousAttributesInner(attrs) {
        var result = null;
        function scan(value) {
          if (value && _typeof(value) == "object") {
            if (Array.isArray(value)) {
              if (typeof value[0] == "string") {
                if (!result) result = [];
                result.push(value);
              } else {
                for (var i = 0; i < value.length; i++) scan(value[i]);
              }
            } else {
              for (var prop in value) scan(value[prop]);
            }
          }
        }
        scan(attrs);
        return result;
      }
      function _renderSpec(doc2, structure, xmlNS, blockArraysIn) {
        if (typeof structure == "string") return {
          dom: doc2.createTextNode(structure)
        };
        if (structure.nodeType != null) return {
          dom: structure
        };
        if (structure.dom && structure.dom.nodeType != null) return structure;
        var tagName = structure[0], suspicious;
        if (typeof tagName != "string") throw new RangeError("Invalid array passed to renderSpec");
        if (blockArraysIn && (suspicious = suspiciousAttributes(blockArraysIn)) && suspicious.indexOf(structure) > -1) throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
        var space = tagName.indexOf(" ");
        if (space > 0) {
          xmlNS = tagName.slice(0, space);
          tagName = tagName.slice(space + 1);
        }
        var contentDOM;
        var dom = xmlNS ? doc2.createElementNS(xmlNS, tagName) : doc2.createElement(tagName);
        var attrs = structure[1], start = 1;
        if (attrs && _typeof(attrs) == "object" && attrs.nodeType == null && !Array.isArray(attrs)) {
          start = 2;
          for (var name in attrs) if (attrs[name] != null) {
            var _space = name.indexOf(" ");
            if (_space > 0) dom.setAttributeNS(name.slice(0, _space), name.slice(_space + 1), attrs[name]);
            else if (name == "style" && dom.style) dom.style.cssText = attrs[name];
            else dom.setAttribute(name, attrs[name]);
          }
        }
        for (var i = start; i < structure.length; i++) {
          var child = structure[i];
          if (child === 0) {
            if (i < structure.length - 1 || i > start) throw new RangeError("Content hole must be the only child of its parent node");
            return {
              dom,
              contentDOM: dom
            };
          } else {
            var _renderSpec3 = _renderSpec(doc2, child, xmlNS, blockArraysIn), inner = _renderSpec3.dom, innerContent = _renderSpec3.contentDOM;
            dom.appendChild(inner);
            if (innerContent) {
              if (contentDOM) throw new RangeError("Multiple content holes");
              contentDOM = innerContent;
            }
          }
        }
        return {
          dom,
          contentDOM
        };
      }
      exports.ContentMatch = ContentMatch;
      exports.DOMParser = DOMParser;
      exports.DOMSerializer = DOMSerializer;
      exports.Fragment = Fragment;
      exports.Mark = Mark;
      exports.MarkType = MarkType;
      exports.Node = Node;
      exports.NodeRange = NodeRange;
      exports.NodeType = NodeType;
      exports.ReplaceError = ReplaceError;
      exports.ResolvedPos = ResolvedPos;
      exports.Schema = Schema;
      exports.Slice = Slice;
    }
  });

  // node_modules/prosemirror-transform/dist/index.cjs
  var require_dist3 = __commonJS({
    "node_modules/prosemirror-transform/dist/index.cjs"(exports) {
      "use strict";
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2)) return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct.bind();
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2) _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        try {
          return Function.toString.call(fn).indexOf("[native code]") !== -1;
        } catch (e) {
          return typeof fn === "function";
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var prosemirrorModel = require_dist2();
      var lower16 = 65535;
      var factor16 = Math.pow(2, 16);
      function makeRecover(index, offset) {
        return index + offset * factor16;
      }
      function recoverIndex(value) {
        return value & lower16;
      }
      function recoverOffset(value) {
        return (value - (value & lower16)) / factor16;
      }
      var DEL_BEFORE = 1;
      var DEL_AFTER = 2;
      var DEL_ACROSS = 4;
      var DEL_SIDE = 8;
      var MapResult = (function() {
        function MapResult2(pos, delInfo, recover) {
          _classCallCheck(this, MapResult2);
          this.pos = pos;
          this.delInfo = delInfo;
          this.recover = recover;
        }
        _createClass(MapResult2, [{
          key: "deleted",
          get: function get() {
            return (this.delInfo & DEL_SIDE) > 0;
          }
        }, {
          key: "deletedBefore",
          get: function get() {
            return (this.delInfo & (DEL_BEFORE | DEL_ACROSS)) > 0;
          }
        }, {
          key: "deletedAfter",
          get: function get() {
            return (this.delInfo & (DEL_AFTER | DEL_ACROSS)) > 0;
          }
        }, {
          key: "deletedAcross",
          get: function get() {
            return (this.delInfo & DEL_ACROSS) > 0;
          }
        }]);
        return MapResult2;
      })();
      var StepMap = (function() {
        function StepMap2(ranges) {
          var inverted = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          _classCallCheck(this, StepMap2);
          this.ranges = ranges;
          this.inverted = inverted;
          if (!ranges.length && StepMap2.empty) return StepMap2.empty;
        }
        _createClass(StepMap2, [{
          key: "recover",
          value: function recover(value) {
            var diff = 0, index = recoverIndex(value);
            if (!this.inverted) for (var i = 0; i < index; i++) diff += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
            return this.ranges[index * 3] + diff + recoverOffset(value);
          }
        }, {
          key: "mapResult",
          value: function mapResult(pos) {
            var assoc = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            return this._map(pos, assoc, false);
          }
        }, {
          key: "map",
          value: function map(pos) {
            var assoc = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            return this._map(pos, assoc, true);
          }
        }, {
          key: "_map",
          value: function _map(pos, assoc, simple) {
            var diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
            for (var i = 0; i < this.ranges.length; i += 3) {
              var start = this.ranges[i] - (this.inverted ? diff : 0);
              if (start > pos) break;
              var oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex], end = start + oldSize;
              if (pos <= end) {
                var side = !oldSize ? assoc : pos == start ? -1 : pos == end ? 1 : assoc;
                var result = start + diff + (side < 0 ? 0 : newSize);
                if (simple) return result;
                var recover = pos == (assoc < 0 ? start : end) ? null : makeRecover(i / 3, pos - start);
                var del = pos == start ? DEL_AFTER : pos == end ? DEL_BEFORE : DEL_ACROSS;
                if (assoc < 0 ? pos != start : pos != end) del |= DEL_SIDE;
                return new MapResult(result, del, recover);
              }
              diff += newSize - oldSize;
            }
            return simple ? pos + diff : new MapResult(pos + diff, 0, null);
          }
        }, {
          key: "touches",
          value: function touches(pos, recover) {
            var diff = 0, index = recoverIndex(recover);
            var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
            for (var i = 0; i < this.ranges.length; i += 3) {
              var start = this.ranges[i] - (this.inverted ? diff : 0);
              if (start > pos) break;
              var oldSize = this.ranges[i + oldIndex], end = start + oldSize;
              if (pos <= end && i == index * 3) return true;
              diff += this.ranges[i + newIndex] - oldSize;
            }
            return false;
          }
        }, {
          key: "forEach",
          value: function forEach(f) {
            var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
            for (var i = 0, diff = 0; i < this.ranges.length; i += 3) {
              var start = this.ranges[i], oldStart = start - (this.inverted ? diff : 0), newStart = start + (this.inverted ? 0 : diff);
              var oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex];
              f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
              diff += newSize - oldSize;
            }
          }
        }, {
          key: "invert",
          value: function invert() {
            return new StepMap2(this.ranges, !this.inverted);
          }
        }, {
          key: "toString",
          value: function toString() {
            return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
          }
        }], [{
          key: "offset",
          value: function offset(n) {
            return n == 0 ? StepMap2.empty : new StepMap2(n < 0 ? [0, -n, 0] : [0, 0, n]);
          }
        }]);
        return StepMap2;
      })();
      StepMap.empty = new StepMap([]);
      var Mapping = (function() {
        function Mapping2(maps, mirror) {
          var from = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
          var to = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : maps ? maps.length : 0;
          _classCallCheck(this, Mapping2);
          this.mirror = mirror;
          this.from = from;
          this.to = to;
          this._maps = maps || [];
          this.ownData = !(maps || mirror);
        }
        _createClass(Mapping2, [{
          key: "maps",
          get: function get() {
            return this._maps;
          }
        }, {
          key: "slice",
          value: function slice() {
            var from = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            var to = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.maps.length;
            return new Mapping2(this._maps, this.mirror, from, to);
          }
        }, {
          key: "appendMap",
          value: function appendMap(map, mirrors) {
            if (!this.ownData) {
              this._maps = this._maps.slice();
              this.mirror = this.mirror && this.mirror.slice();
              this.ownData = true;
            }
            this.to = this._maps.push(map);
            if (mirrors != null) this.setMirror(this._maps.length - 1, mirrors);
          }
        }, {
          key: "appendMapping",
          value: function appendMapping(mapping) {
            for (var i = 0, startSize = this._maps.length; i < mapping._maps.length; i++) {
              var mirr = mapping.getMirror(i);
              this.appendMap(mapping._maps[i], mirr != null && mirr < i ? startSize + mirr : void 0);
            }
          }
        }, {
          key: "getMirror",
          value: function getMirror(n) {
            if (this.mirror) {
              for (var i = 0; i < this.mirror.length; i++) if (this.mirror[i] == n) return this.mirror[i + (i % 2 ? -1 : 1)];
            }
          }
        }, {
          key: "setMirror",
          value: function setMirror(n, m) {
            if (!this.mirror) this.mirror = [];
            this.mirror.push(n, m);
          }
        }, {
          key: "appendMappingInverted",
          value: function appendMappingInverted(mapping) {
            for (var i = mapping.maps.length - 1, totalSize = this._maps.length + mapping._maps.length; i >= 0; i--) {
              var mirr = mapping.getMirror(i);
              this.appendMap(mapping._maps[i].invert(), mirr != null && mirr > i ? totalSize - mirr - 1 : void 0);
            }
          }
        }, {
          key: "invert",
          value: function invert() {
            var inverse = new Mapping2();
            inverse.appendMappingInverted(this);
            return inverse;
          }
        }, {
          key: "map",
          value: function map(pos) {
            var assoc = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            if (this.mirror) return this._map(pos, assoc, true);
            for (var i = this.from; i < this.to; i++) pos = this._maps[i].map(pos, assoc);
            return pos;
          }
        }, {
          key: "mapResult",
          value: function mapResult(pos) {
            var assoc = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            return this._map(pos, assoc, false);
          }
        }, {
          key: "_map",
          value: function _map(pos, assoc, simple) {
            var delInfo = 0;
            for (var i = this.from; i < this.to; i++) {
              var map = this._maps[i], result = map.mapResult(pos, assoc);
              if (result.recover != null) {
                var corr = this.getMirror(i);
                if (corr != null && corr > i && corr < this.to) {
                  i = corr;
                  pos = this._maps[corr].recover(result.recover);
                  continue;
                }
              }
              delInfo |= result.delInfo;
              pos = result.pos;
            }
            return simple ? pos : new MapResult(pos, delInfo, null);
          }
        }]);
        return Mapping2;
      })();
      var stepsByID = /* @__PURE__ */ Object.create(null);
      var Step = (function() {
        function Step2() {
          _classCallCheck(this, Step2);
        }
        _createClass(Step2, [{
          key: "getMap",
          value: function getMap() {
            return StepMap.empty;
          }
        }, {
          key: "merge",
          value: function merge(other) {
            return null;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (!json || !json.stepType) throw new RangeError("Invalid input for Step.fromJSON");
            var type = stepsByID[json.stepType];
            if (!type) throw new RangeError("No step type ".concat(json.stepType, " defined"));
            return type.fromJSON(schema, json);
          }
        }, {
          key: "jsonID",
          value: function jsonID(id, stepClass) {
            if (id in stepsByID) throw new RangeError("Duplicate use of step JSON ID " + id);
            stepsByID[id] = stepClass;
            stepClass.prototype.jsonID = id;
            return stepClass;
          }
        }]);
        return Step2;
      })();
      var StepResult = (function() {
        function StepResult2(doc, failed) {
          _classCallCheck(this, StepResult2);
          this.doc = doc;
          this.failed = failed;
        }
        _createClass(StepResult2, null, [{
          key: "ok",
          value: function ok(doc) {
            return new StepResult2(doc, null);
          }
        }, {
          key: "fail",
          value: function fail(message) {
            return new StepResult2(null, message);
          }
        }, {
          key: "fromReplace",
          value: function fromReplace(doc, from, to, slice) {
            try {
              return StepResult2.ok(doc.replace(from, to, slice));
            } catch (e) {
              if (e instanceof prosemirrorModel.ReplaceError) return StepResult2.fail(e.message);
              throw e;
            }
          }
        }]);
        return StepResult2;
      })();
      function mapFragment(fragment, f, parent) {
        var mapped = [];
        for (var i = 0; i < fragment.childCount; i++) {
          var child = fragment.child(i);
          if (child.content.size) child = child.copy(mapFragment(child.content, f, child));
          if (child.isInline) child = f(child, parent, i);
          mapped.push(child);
        }
        return prosemirrorModel.Fragment.fromArray(mapped);
      }
      var AddMarkStep = (function(_Step) {
        _inherits(AddMarkStep2, _Step);
        var _super = _createSuper(AddMarkStep2);
        function AddMarkStep2(from, to, mark) {
          var _this;
          _classCallCheck(this, AddMarkStep2);
          _this = _super.call(this);
          _this.from = from;
          _this.to = to;
          _this.mark = mark;
          return _this;
        }
        _createClass(AddMarkStep2, [{
          key: "apply",
          value: function apply(doc) {
            var _this2 = this;
            var oldSlice = doc.slice(this.from, this.to), $from = doc.resolve(this.from);
            var parent = $from.node($from.sharedDepth(this.to));
            var slice = new prosemirrorModel.Slice(mapFragment(oldSlice.content, function(node, parent2) {
              if (!node.isAtom || !parent2.type.allowsMarkType(_this2.mark.type)) return node;
              return node.mark(_this2.mark.addToSet(node.marks));
            }, parent), oldSlice.openStart, oldSlice.openEnd);
            return StepResult.fromReplace(doc, this.from, this.to, slice);
          }
        }, {
          key: "invert",
          value: function invert() {
            return new RemoveMarkStep(this.from, this.to, this.mark);
          }
        }, {
          key: "map",
          value: function map(mapping) {
            var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
            if (from.deleted && to.deleted || from.pos >= to.pos) return null;
            return new AddMarkStep2(from.pos, to.pos, this.mark);
          }
        }, {
          key: "merge",
          value: function merge(other) {
            if (other instanceof AddMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) return new AddMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
            return null;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              stepType: "addMark",
              mark: this.mark.toJSON(),
              from: this.from,
              to: this.to
            };
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for AddMarkStep.fromJSON");
            return new AddMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
          }
        }]);
        return AddMarkStep2;
      })(Step);
      Step.jsonID("addMark", AddMarkStep);
      var RemoveMarkStep = (function(_Step2) {
        _inherits(RemoveMarkStep2, _Step2);
        var _super2 = _createSuper(RemoveMarkStep2);
        function RemoveMarkStep2(from, to, mark) {
          var _this3;
          _classCallCheck(this, RemoveMarkStep2);
          _this3 = _super2.call(this);
          _this3.from = from;
          _this3.to = to;
          _this3.mark = mark;
          return _this3;
        }
        _createClass(RemoveMarkStep2, [{
          key: "apply",
          value: function apply(doc) {
            var _this4 = this;
            var oldSlice = doc.slice(this.from, this.to);
            var slice = new prosemirrorModel.Slice(mapFragment(oldSlice.content, function(node) {
              return node.mark(_this4.mark.removeFromSet(node.marks));
            }, doc), oldSlice.openStart, oldSlice.openEnd);
            return StepResult.fromReplace(doc, this.from, this.to, slice);
          }
        }, {
          key: "invert",
          value: function invert() {
            return new AddMarkStep(this.from, this.to, this.mark);
          }
        }, {
          key: "map",
          value: function map(mapping) {
            var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
            if (from.deleted && to.deleted || from.pos >= to.pos) return null;
            return new RemoveMarkStep2(from.pos, to.pos, this.mark);
          }
        }, {
          key: "merge",
          value: function merge(other) {
            if (other instanceof RemoveMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) return new RemoveMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
            return null;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              stepType: "removeMark",
              mark: this.mark.toJSON(),
              from: this.from,
              to: this.to
            };
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
            return new RemoveMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
          }
        }]);
        return RemoveMarkStep2;
      })(Step);
      Step.jsonID("removeMark", RemoveMarkStep);
      var AddNodeMarkStep = (function(_Step3) {
        _inherits(AddNodeMarkStep2, _Step3);
        var _super3 = _createSuper(AddNodeMarkStep2);
        function AddNodeMarkStep2(pos, mark) {
          var _this5;
          _classCallCheck(this, AddNodeMarkStep2);
          _this5 = _super3.call(this);
          _this5.pos = pos;
          _this5.mark = mark;
          return _this5;
        }
        _createClass(AddNodeMarkStep2, [{
          key: "apply",
          value: function apply(doc) {
            var node = doc.nodeAt(this.pos);
            if (!node) return StepResult.fail("No node at mark step's position");
            var updated = node.type.create(node.attrs, null, this.mark.addToSet(node.marks));
            return StepResult.fromReplace(doc, this.pos, this.pos + 1, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
          }
        }, {
          key: "invert",
          value: function invert(doc) {
            var node = doc.nodeAt(this.pos);
            if (node) {
              var newSet = this.mark.addToSet(node.marks);
              if (newSet.length == node.marks.length) {
                for (var i = 0; i < node.marks.length; i++) if (!node.marks[i].isInSet(newSet)) return new AddNodeMarkStep2(this.pos, node.marks[i]);
                return new AddNodeMarkStep2(this.pos, this.mark);
              }
            }
            return new RemoveNodeMarkStep(this.pos, this.mark);
          }
        }, {
          key: "map",
          value: function map(mapping) {
            var pos = mapping.mapResult(this.pos, 1);
            return pos.deletedAfter ? null : new AddNodeMarkStep2(pos.pos, this.mark);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              stepType: "addNodeMark",
              pos: this.pos,
              mark: this.mark.toJSON()
            };
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.pos != "number") throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
            return new AddNodeMarkStep2(json.pos, schema.markFromJSON(json.mark));
          }
        }]);
        return AddNodeMarkStep2;
      })(Step);
      Step.jsonID("addNodeMark", AddNodeMarkStep);
      var RemoveNodeMarkStep = (function(_Step4) {
        _inherits(RemoveNodeMarkStep2, _Step4);
        var _super4 = _createSuper(RemoveNodeMarkStep2);
        function RemoveNodeMarkStep2(pos, mark) {
          var _this6;
          _classCallCheck(this, RemoveNodeMarkStep2);
          _this6 = _super4.call(this);
          _this6.pos = pos;
          _this6.mark = mark;
          return _this6;
        }
        _createClass(RemoveNodeMarkStep2, [{
          key: "apply",
          value: function apply(doc) {
            var node = doc.nodeAt(this.pos);
            if (!node) return StepResult.fail("No node at mark step's position");
            var updated = node.type.create(node.attrs, null, this.mark.removeFromSet(node.marks));
            return StepResult.fromReplace(doc, this.pos, this.pos + 1, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
          }
        }, {
          key: "invert",
          value: function invert(doc) {
            var node = doc.nodeAt(this.pos);
            if (!node || !this.mark.isInSet(node.marks)) return this;
            return new AddNodeMarkStep(this.pos, this.mark);
          }
        }, {
          key: "map",
          value: function map(mapping) {
            var pos = mapping.mapResult(this.pos, 1);
            return pos.deletedAfter ? null : new RemoveNodeMarkStep2(pos.pos, this.mark);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              stepType: "removeNodeMark",
              pos: this.pos,
              mark: this.mark.toJSON()
            };
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.pos != "number") throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
            return new RemoveNodeMarkStep2(json.pos, schema.markFromJSON(json.mark));
          }
        }]);
        return RemoveNodeMarkStep2;
      })(Step);
      Step.jsonID("removeNodeMark", RemoveNodeMarkStep);
      var ReplaceStep = (function(_Step5) {
        _inherits(ReplaceStep2, _Step5);
        var _super5 = _createSuper(ReplaceStep2);
        function ReplaceStep2(from, to, slice) {
          var _this7;
          var structure = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
          _classCallCheck(this, ReplaceStep2);
          _this7 = _super5.call(this);
          _this7.from = from;
          _this7.to = to;
          _this7.slice = slice;
          _this7.structure = structure;
          return _this7;
        }
        _createClass(ReplaceStep2, [{
          key: "apply",
          value: function apply(doc) {
            if (this.structure && contentBetween(doc, this.from, this.to)) return StepResult.fail("Structure replace would overwrite content");
            return StepResult.fromReplace(doc, this.from, this.to, this.slice);
          }
        }, {
          key: "getMap",
          value: function getMap() {
            return new StepMap([this.from, this.to - this.from, this.slice.size]);
          }
        }, {
          key: "invert",
          value: function invert(doc) {
            return new ReplaceStep2(this.from, this.from + this.slice.size, doc.slice(this.from, this.to));
          }
        }, {
          key: "map",
          value: function map(mapping) {
            var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
            if (from.deletedAcross && to.deletedAcross) return null;
            return new ReplaceStep2(from.pos, Math.max(from.pos, to.pos), this.slice, this.structure);
          }
        }, {
          key: "merge",
          value: function merge(other) {
            if (!(other instanceof ReplaceStep2) || other.structure || this.structure) return null;
            if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
              var slice = this.slice.size + other.slice.size == 0 ? prosemirrorModel.Slice.empty : new prosemirrorModel.Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
              return new ReplaceStep2(this.from, this.to + (other.to - other.from), slice, this.structure);
            } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
              var _slice = this.slice.size + other.slice.size == 0 ? prosemirrorModel.Slice.empty : new prosemirrorModel.Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
              return new ReplaceStep2(other.from, this.to, _slice, this.structure);
            } else {
              return null;
            }
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var json = {
              stepType: "replace",
              from: this.from,
              to: this.to
            };
            if (this.slice.size) json.slice = this.slice.toJSON();
            if (this.structure) json.structure = true;
            return json;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.from != "number" || typeof json.to != "number") throw new RangeError("Invalid input for ReplaceStep.fromJSON");
            return new ReplaceStep2(json.from, json.to, prosemirrorModel.Slice.fromJSON(schema, json.slice), !!json.structure);
          }
        }]);
        return ReplaceStep2;
      })(Step);
      Step.jsonID("replace", ReplaceStep);
      var ReplaceAroundStep = (function(_Step6) {
        _inherits(ReplaceAroundStep2, _Step6);
        var _super6 = _createSuper(ReplaceAroundStep2);
        function ReplaceAroundStep2(from, to, gapFrom, gapTo, slice, insert) {
          var _this8;
          var structure = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : false;
          _classCallCheck(this, ReplaceAroundStep2);
          _this8 = _super6.call(this);
          _this8.from = from;
          _this8.to = to;
          _this8.gapFrom = gapFrom;
          _this8.gapTo = gapTo;
          _this8.slice = slice;
          _this8.insert = insert;
          _this8.structure = structure;
          return _this8;
        }
        _createClass(ReplaceAroundStep2, [{
          key: "apply",
          value: function apply(doc) {
            if (this.structure && (contentBetween(doc, this.from, this.gapFrom) || contentBetween(doc, this.gapTo, this.to))) return StepResult.fail("Structure gap-replace would overwrite content");
            var gap = doc.slice(this.gapFrom, this.gapTo);
            if (gap.openStart || gap.openEnd) return StepResult.fail("Gap is not a flat range");
            var inserted = this.slice.insertAt(this.insert, gap.content);
            if (!inserted) return StepResult.fail("Content does not fit in gap");
            return StepResult.fromReplace(doc, this.from, this.to, inserted);
          }
        }, {
          key: "getMap",
          value: function getMap() {
            return new StepMap([this.from, this.gapFrom - this.from, this.insert, this.gapTo, this.to - this.gapTo, this.slice.size - this.insert]);
          }
        }, {
          key: "invert",
          value: function invert(doc) {
            var gap = this.gapTo - this.gapFrom;
            return new ReplaceAroundStep2(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
          }
        }, {
          key: "map",
          value: function map(mapping) {
            var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
            var gapFrom = this.from == this.gapFrom ? from.pos : mapping.map(this.gapFrom, -1);
            var gapTo = this.to == this.gapTo ? to.pos : mapping.map(this.gapTo, 1);
            if (from.deletedAcross && to.deletedAcross || gapFrom < from.pos || gapTo > to.pos) return null;
            return new ReplaceAroundStep2(from.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            var json = {
              stepType: "replaceAround",
              from: this.from,
              to: this.to,
              gapFrom: this.gapFrom,
              gapTo: this.gapTo,
              insert: this.insert
            };
            if (this.slice.size) json.slice = this.slice.toJSON();
            if (this.structure) json.structure = true;
            return json;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number") throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
            return new ReplaceAroundStep2(json.from, json.to, json.gapFrom, json.gapTo, prosemirrorModel.Slice.fromJSON(schema, json.slice), json.insert, !!json.structure);
          }
        }]);
        return ReplaceAroundStep2;
      })(Step);
      Step.jsonID("replaceAround", ReplaceAroundStep);
      function contentBetween(doc, from, to) {
        var $from = doc.resolve(from), dist = to - from, depth = $from.depth;
        while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
          depth--;
          dist--;
        }
        if (dist > 0) {
          var next = $from.node(depth).maybeChild($from.indexAfter(depth));
          while (dist > 0) {
            if (!next || next.isLeaf) return true;
            next = next.firstChild;
            dist--;
          }
        }
        return false;
      }
      function _addMark(tr, from, to, mark) {
        var removed = [], added = [];
        var removing, adding;
        tr.doc.nodesBetween(from, to, function(node, pos, parent) {
          if (!node.isInline) return;
          var marks = node.marks;
          if (!mark.isInSet(marks) && parent.type.allowsMarkType(mark.type)) {
            var start = Math.max(pos, from), end = Math.min(pos + node.nodeSize, to);
            var newSet = mark.addToSet(marks);
            for (var i = 0; i < marks.length; i++) {
              if (!marks[i].isInSet(newSet)) {
                if (removing && removing.to == start && removing.mark.eq(marks[i])) removing.to = end;
                else removed.push(removing = new RemoveMarkStep(start, end, marks[i]));
              }
            }
            if (adding && adding.to == start) adding.to = end;
            else added.push(adding = new AddMarkStep(start, end, mark));
          }
        });
        removed.forEach(function(s) {
          return tr.step(s);
        });
        added.forEach(function(s) {
          return tr.step(s);
        });
      }
      function _removeMark(tr, from, to, mark) {
        var matched = [], step = 0;
        tr.doc.nodesBetween(from, to, function(node, pos) {
          if (!node.isInline) return;
          step++;
          var toRemove = null;
          if (mark instanceof prosemirrorModel.MarkType) {
            var set = node.marks, found;
            while (found = mark.isInSet(set)) {
              (toRemove || (toRemove = [])).push(found);
              set = found.removeFromSet(set);
            }
          } else if (mark) {
            if (mark.isInSet(node.marks)) toRemove = [mark];
          } else {
            toRemove = node.marks;
          }
          if (toRemove && toRemove.length) {
            var end = Math.min(pos + node.nodeSize, to);
            for (var i = 0; i < toRemove.length; i++) {
              var style = toRemove[i], _found = void 0;
              for (var j = 0; j < matched.length; j++) {
                var m = matched[j];
                if (m.step == step - 1 && style.eq(matched[j].style)) _found = m;
              }
              if (_found) {
                _found.to = end;
                _found.step = step;
              } else {
                matched.push({
                  style,
                  from: Math.max(pos, from),
                  to: end,
                  step
                });
              }
            }
          }
        });
        matched.forEach(function(m) {
          return tr.step(new RemoveMarkStep(m.from, m.to, m.style));
        });
      }
      function _clearIncompatible(tr, pos, parentType) {
        var match = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : parentType.contentMatch;
        var clearNewlines = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
        var node = tr.doc.nodeAt(pos);
        var replSteps = [], cur = pos + 1;
        for (var i = 0; i < node.childCount; i++) {
          var child = node.child(i), end = cur + child.nodeSize;
          var allowed = match.matchType(child.type);
          if (!allowed) {
            replSteps.push(new ReplaceStep(cur, end, prosemirrorModel.Slice.empty));
          } else {
            match = allowed;
            for (var j = 0; j < child.marks.length; j++) if (!parentType.allowsMarkType(child.marks[j].type)) tr.step(new RemoveMarkStep(cur, end, child.marks[j]));
            if (clearNewlines && child.isText && parentType.whitespace != "pre") {
              var m = void 0, newline = /\r?\n|\r/g, slice = void 0;
              while (m = newline.exec(child.text)) {
                if (!slice) slice = new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(parentType.schema.text(" ", parentType.allowedMarks(child.marks))), 0, 0);
                replSteps.push(new ReplaceStep(cur + m.index, cur + m.index + m[0].length, slice));
              }
            }
          }
          cur = end;
        }
        if (!match.validEnd) {
          var fill = match.fillBefore(prosemirrorModel.Fragment.empty, true);
          tr.replace(cur, cur, new prosemirrorModel.Slice(fill, 0, 0));
        }
        for (var _i = replSteps.length - 1; _i >= 0; _i--) tr.step(replSteps[_i]);
      }
      function canCut(node, start, end) {
        return (start == 0 || node.canReplace(start, node.childCount)) && (end == node.childCount || node.canReplace(0, end));
      }
      function liftTarget(range) {
        var parent = range.parent;
        var content = parent.content.cutByIndex(range.startIndex, range.endIndex);
        for (var depth = range.depth; ; --depth) {
          var node = range.$from.node(depth);
          var index = range.$from.index(depth), endIndex = range.$to.indexAfter(depth);
          if (depth < range.depth && node.canReplace(index, endIndex, content)) return depth;
          if (depth == 0 || node.type.spec.isolating || !canCut(node, index, endIndex)) break;
        }
        return null;
      }
      function _lift(tr, range, target) {
        var $from = range.$from, $to = range.$to, depth = range.depth;
        var gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
        var start = gapStart, end = gapEnd;
        var before = prosemirrorModel.Fragment.empty, openStart = 0;
        for (var d = depth, splitting = false; d > target; d--) if (splitting || $from.index(d) > 0) {
          splitting = true;
          before = prosemirrorModel.Fragment.from($from.node(d).copy(before));
          openStart++;
        } else {
          start--;
        }
        var after = prosemirrorModel.Fragment.empty, openEnd = 0;
        for (var _d = depth, _splitting = false; _d > target; _d--) if (_splitting || $to.after(_d + 1) < $to.end(_d)) {
          _splitting = true;
          after = prosemirrorModel.Fragment.from($to.node(_d).copy(after));
          openEnd++;
        } else {
          end++;
        }
        tr.step(new ReplaceAroundStep(start, end, gapStart, gapEnd, new prosemirrorModel.Slice(before.append(after), openStart, openEnd), before.size - openStart, true));
      }
      function findWrapping(range, nodeType) {
        var attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        var innerRange = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : range;
        var around = findWrappingOutside(range, nodeType);
        var inner = around && findWrappingInside(innerRange, nodeType);
        if (!inner) return null;
        return around.map(withAttrs).concat({
          type: nodeType,
          attrs
        }).concat(inner.map(withAttrs));
      }
      function withAttrs(type) {
        return {
          type,
          attrs: null
        };
      }
      function findWrappingOutside(range, type) {
        var parent = range.parent, startIndex = range.startIndex, endIndex = range.endIndex;
        var around = parent.contentMatchAt(startIndex).findWrapping(type);
        if (!around) return null;
        var outer = around.length ? around[0] : type;
        return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null;
      }
      function findWrappingInside(range, type) {
        var parent = range.parent, startIndex = range.startIndex, endIndex = range.endIndex;
        var inner = parent.child(startIndex);
        var inside = type.contentMatch.findWrapping(inner.type);
        if (!inside) return null;
        var lastType = inside.length ? inside[inside.length - 1] : type;
        var innerMatch = lastType.contentMatch;
        for (var i = startIndex; innerMatch && i < endIndex; i++) innerMatch = innerMatch.matchType(parent.child(i).type);
        if (!innerMatch || !innerMatch.validEnd) return null;
        return inside;
      }
      function _wrap2(tr, range, wrappers) {
        var content = prosemirrorModel.Fragment.empty;
        for (var i = wrappers.length - 1; i >= 0; i--) {
          if (content.size) {
            var match = wrappers[i].type.contentMatch.matchFragment(content);
            if (!match || !match.validEnd) throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
          }
          content = prosemirrorModel.Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
        }
        var start = range.start, end = range.end;
        tr.step(new ReplaceAroundStep(start, end, start, end, new prosemirrorModel.Slice(content, 0, 0), wrappers.length, true));
      }
      function _setBlockType(tr, from, to, type, attrs) {
        if (!type.isTextblock) throw new RangeError("Type given to setBlockType should be a textblock");
        var mapFrom = tr.steps.length;
        tr.doc.nodesBetween(from, to, function(node, pos) {
          var attrsHere = typeof attrs == "function" ? attrs(node) : attrs;
          if (node.isTextblock && !node.hasMarkup(type, attrsHere) && canChangeType(tr.doc, tr.mapping.slice(mapFrom).map(pos), type)) {
            var convertNewlines = null;
            if (type.schema.linebreakReplacement) {
              var pre = type.whitespace == "pre", supportLinebreak = !!type.contentMatch.matchType(type.schema.linebreakReplacement);
              if (pre && !supportLinebreak) convertNewlines = false;
              else if (!pre && supportLinebreak) convertNewlines = true;
            }
            if (convertNewlines === false) replaceLinebreaks(tr, node, pos, mapFrom);
            _clearIncompatible(tr, tr.mapping.slice(mapFrom).map(pos, 1), type, void 0, convertNewlines === null);
            var mapping = tr.mapping.slice(mapFrom);
            var startM = mapping.map(pos, 1), endM = mapping.map(pos + node.nodeSize, 1);
            tr.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(type.create(attrsHere, null, node.marks)), 0, 0), 1, true));
            if (convertNewlines === true) replaceNewlines(tr, node, pos, mapFrom);
            return false;
          }
        });
      }
      function replaceNewlines(tr, node, pos, mapFrom) {
        node.forEach(function(child, offset) {
          if (child.isText) {
            var m, newline = /\r?\n|\r/g;
            while (m = newline.exec(child.text)) {
              var start = tr.mapping.slice(mapFrom).map(pos + 1 + offset + m.index);
              tr.replaceWith(start, start + 1, node.type.schema.linebreakReplacement.create());
            }
          }
        });
      }
      function replaceLinebreaks(tr, node, pos, mapFrom) {
        node.forEach(function(child, offset) {
          if (child.type == child.type.schema.linebreakReplacement) {
            var start = tr.mapping.slice(mapFrom).map(pos + 1 + offset);
            tr.replaceWith(start, start + 1, node.type.schema.text("\n"));
          }
        });
      }
      function canChangeType(doc, pos, type) {
        var $pos = doc.resolve(pos), index = $pos.index();
        return $pos.parent.canReplaceWith(index, index + 1, type);
      }
      function _setNodeMarkup(tr, pos, type, attrs, marks) {
        var node = tr.doc.nodeAt(pos);
        if (!node) throw new RangeError("No node at given position");
        if (!type) type = node.type;
        var newNode = type.create(attrs, null, marks || node.marks);
        if (node.isLeaf) return tr.replaceWith(pos, pos + node.nodeSize, newNode);
        if (!type.validContent(node.content)) throw new RangeError("Invalid content for node type " + type.name);
        tr.step(new ReplaceAroundStep(pos, pos + node.nodeSize, pos + 1, pos + node.nodeSize - 1, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(newNode), 0, 0), 1, true));
      }
      function canSplit(doc, pos) {
        var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var typesAfter = arguments.length > 3 ? arguments[3] : void 0;
        var $pos = doc.resolve(pos), base = $pos.depth - depth;
        var innerType = typesAfter && typesAfter[typesAfter.length - 1] || $pos.parent;
        if (base < 0 || $pos.parent.type.spec.isolating || !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) || !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount))) return false;
        for (var d = $pos.depth - 1, i = depth - 2; d > base; d--, i--) {
          var node = $pos.node(d), _index = $pos.index(d);
          if (node.type.spec.isolating) return false;
          var rest = node.content.cutByIndex(_index, node.childCount);
          var overrideChild = typesAfter && typesAfter[i + 1];
          if (overrideChild) rest = rest.replaceChild(0, overrideChild.type.create(overrideChild.attrs));
          var after = typesAfter && typesAfter[i] || node;
          if (!node.canReplace(_index + 1, node.childCount) || !after.type.validContent(rest)) return false;
        }
        var index = $pos.indexAfter(base);
        var baseType = typesAfter && typesAfter[0];
        return $pos.node(base).canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base + 1).type);
      }
      function _split(tr, pos) {
        var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        var typesAfter = arguments.length > 3 ? arguments[3] : void 0;
        var $pos = tr.doc.resolve(pos), before = prosemirrorModel.Fragment.empty, after = prosemirrorModel.Fragment.empty;
        for (var d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--) {
          before = prosemirrorModel.Fragment.from($pos.node(d).copy(before));
          var typeAfter = typesAfter && typesAfter[i];
          after = prosemirrorModel.Fragment.from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after) : $pos.node(d).copy(after));
        }
        tr.step(new ReplaceStep(pos, pos, new prosemirrorModel.Slice(before.append(after), depth, depth), true));
      }
      function canJoin(doc, pos) {
        var $pos = doc.resolve(pos), index = $pos.index();
        return joinable($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index, index + 1);
      }
      function canAppendWithSubstitutedLinebreaks(a, b) {
        if (!b.content.size) a.type.compatibleContent(b.type);
        var match = a.contentMatchAt(a.childCount);
        var linebreakReplacement = a.type.schema.linebreakReplacement;
        for (var i = 0; i < b.childCount; i++) {
          var child = b.child(i);
          var type = child.type == linebreakReplacement ? a.type.schema.nodes.text : child.type;
          match = match.matchType(type);
          if (!match) return false;
          if (!a.type.allowsMarks(child.marks)) return false;
        }
        return match.validEnd;
      }
      function joinable(a, b) {
        return !!(a && b && !a.isLeaf && canAppendWithSubstitutedLinebreaks(a, b));
      }
      function joinPoint(doc, pos) {
        var dir = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : -1;
        var $pos = doc.resolve(pos);
        for (var d = $pos.depth; ; d--) {
          var before = void 0, after = void 0, index = $pos.index(d);
          if (d == $pos.depth) {
            before = $pos.nodeBefore;
            after = $pos.nodeAfter;
          } else if (dir > 0) {
            before = $pos.node(d + 1);
            index++;
            after = $pos.node(d).maybeChild(index);
          } else {
            before = $pos.node(d).maybeChild(index - 1);
            after = $pos.node(d + 1);
          }
          if (before && !before.isTextblock && joinable(before, after) && $pos.node(d).canReplace(index, index + 1)) return pos;
          if (d == 0) break;
          pos = dir < 0 ? $pos.before(d) : $pos.after(d);
        }
      }
      function _join(tr, pos, depth) {
        var convertNewlines = null;
        var linebreakReplacement = tr.doc.type.schema.linebreakReplacement;
        var $before = tr.doc.resolve(pos - depth), beforeType = $before.node().type;
        if (linebreakReplacement && beforeType.inlineContent) {
          var pre = beforeType.whitespace == "pre";
          var supportLinebreak = !!beforeType.contentMatch.matchType(linebreakReplacement);
          if (pre && !supportLinebreak) convertNewlines = false;
          else if (!pre && supportLinebreak) convertNewlines = true;
        }
        var mapFrom = tr.steps.length;
        if (convertNewlines === false) {
          var $after = tr.doc.resolve(pos + depth);
          replaceLinebreaks(tr, $after.node(), $after.before(), mapFrom);
        }
        if (beforeType.inlineContent) _clearIncompatible(tr, pos + depth - 1, beforeType, $before.node().contentMatchAt($before.index()), convertNewlines == null);
        var mapping = tr.mapping.slice(mapFrom), start = mapping.map(pos - depth);
        tr.step(new ReplaceStep(start, mapping.map(pos + depth, -1), prosemirrorModel.Slice.empty, true));
        if (convertNewlines === true) {
          var $full = tr.doc.resolve(start);
          replaceNewlines(tr, $full.node(), $full.before(), tr.steps.length);
        }
        return tr;
      }
      function insertPoint(doc, pos, nodeType) {
        var $pos = doc.resolve(pos);
        if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType)) return pos;
        if ($pos.parentOffset == 0) for (var d = $pos.depth - 1; d >= 0; d--) {
          var index = $pos.index(d);
          if ($pos.node(d).canReplaceWith(index, index, nodeType)) return $pos.before(d + 1);
          if (index > 0) return null;
        }
        if ($pos.parentOffset == $pos.parent.content.size) for (var _d2 = $pos.depth - 1; _d2 >= 0; _d2--) {
          var _index2 = $pos.indexAfter(_d2);
          if ($pos.node(_d2).canReplaceWith(_index2, _index2, nodeType)) return $pos.after(_d2 + 1);
          if (_index2 < $pos.node(_d2).childCount) return null;
        }
        return null;
      }
      function dropPoint(doc, pos, slice) {
        var $pos = doc.resolve(pos);
        if (!slice.content.size) return pos;
        var content = slice.content;
        for (var i = 0; i < slice.openStart; i++) content = content.firstChild.content;
        for (var pass = 1; pass <= (slice.openStart == 0 && slice.size ? 2 : 1); pass++) {
          for (var d = $pos.depth; d >= 0; d--) {
            var bias = d == $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
            var insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
            var parent = $pos.node(d), fits = false;
            if (pass == 1) {
              fits = parent.canReplace(insertPos, insertPos, content);
            } else {
              var wrapping = parent.contentMatchAt(insertPos).findWrapping(content.firstChild.type);
              fits = wrapping && parent.canReplaceWith(insertPos, insertPos, wrapping[0]);
            }
            if (fits) return bias == 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1);
          }
        }
        return null;
      }
      function replaceStep(doc, from) {
        var to = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : from;
        var slice = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : prosemirrorModel.Slice.empty;
        if (from == to && !slice.size) return null;
        var $from = doc.resolve(from), $to = doc.resolve(to);
        if (fitsTrivially($from, $to, slice)) return new ReplaceStep(from, to, slice);
        return new Fitter($from, $to, slice).fit();
      }
      function fitsTrivially($from, $to, slice) {
        return !slice.openStart && !slice.openEnd && $from.start() == $to.start() && $from.parent.canReplace($from.index(), $to.index(), slice.content);
      }
      var Fitter = (function() {
        function Fitter2($from, $to, unplaced) {
          _classCallCheck(this, Fitter2);
          this.$from = $from;
          this.$to = $to;
          this.unplaced = unplaced;
          this.frontier = [];
          this.placed = prosemirrorModel.Fragment.empty;
          for (var i = 0; i <= $from.depth; i++) {
            var node = $from.node(i);
            this.frontier.push({
              type: node.type,
              match: node.contentMatchAt($from.indexAfter(i))
            });
          }
          for (var _i2 = $from.depth; _i2 > 0; _i2--) this.placed = prosemirrorModel.Fragment.from($from.node(_i2).copy(this.placed));
        }
        _createClass(Fitter2, [{
          key: "depth",
          get: function get() {
            return this.frontier.length - 1;
          }
        }, {
          key: "fit",
          value: function fit() {
            while (this.unplaced.size) {
              var fit2 = this.findFittable();
              if (fit2) this.placeNodes(fit2);
              else this.openMore() || this.dropNode();
            }
            var moveInline = this.mustMoveInline(), placedSize = this.placed.size - this.depth - this.$from.depth;
            var $from = this.$from, $to = this.close(moveInline < 0 ? this.$to : $from.doc.resolve(moveInline));
            if (!$to) return null;
            var content = this.placed, openStart = $from.depth, openEnd = $to.depth;
            while (openStart && openEnd && content.childCount == 1) {
              content = content.firstChild.content;
              openStart--;
              openEnd--;
            }
            var slice = new prosemirrorModel.Slice(content, openStart, openEnd);
            if (moveInline > -1) return new ReplaceAroundStep($from.pos, moveInline, this.$to.pos, this.$to.end(), slice, placedSize);
            if (slice.size || $from.pos != this.$to.pos) return new ReplaceStep($from.pos, $to.pos, slice);
            return null;
          }
        }, {
          key: "findFittable",
          value: function findFittable() {
            var startDepth = this.unplaced.openStart;
            for (var cur = this.unplaced.content, d = 0, openEnd = this.unplaced.openEnd; d < startDepth; d++) {
              var node = cur.firstChild;
              if (cur.childCount > 1) openEnd = 0;
              if (node.type.spec.isolating && openEnd <= d) {
                startDepth = d;
                break;
              }
              cur = node.content;
            }
            for (var pass = 1; pass <= 2; pass++) {
              for (var sliceDepth = pass == 1 ? startDepth : this.unplaced.openStart; sliceDepth >= 0; sliceDepth--) {
                var fragment = void 0, parent = null;
                if (sliceDepth) {
                  parent = contentAt(this.unplaced.content, sliceDepth - 1).firstChild;
                  fragment = parent.content;
                } else {
                  fragment = this.unplaced.content;
                }
                var first = fragment.firstChild;
                for (var frontierDepth = this.depth; frontierDepth >= 0; frontierDepth--) {
                  var _this$frontier$fronti = this.frontier[frontierDepth], type = _this$frontier$fronti.type, match = _this$frontier$fronti.match, _wrap = void 0, inject = null;
                  if (pass == 1 && (first ? match.matchType(first.type) || (inject = match.fillBefore(prosemirrorModel.Fragment.from(first), false)) : parent && type.compatibleContent(parent.type))) return {
                    sliceDepth,
                    frontierDepth,
                    parent,
                    inject
                  };
                  else if (pass == 2 && first && (_wrap = match.findWrapping(first.type))) return {
                    sliceDepth,
                    frontierDepth,
                    parent,
                    wrap: _wrap
                  };
                  if (parent && match.matchType(parent.type)) break;
                }
              }
            }
          }
        }, {
          key: "openMore",
          value: function openMore() {
            var _this$unplaced = this.unplaced, content = _this$unplaced.content, openStart = _this$unplaced.openStart, openEnd = _this$unplaced.openEnd;
            var inner = contentAt(content, openStart);
            if (!inner.childCount || inner.firstChild.isLeaf) return false;
            this.unplaced = new prosemirrorModel.Slice(content, openStart + 1, Math.max(openEnd, inner.size + openStart >= content.size - openEnd ? openStart + 1 : 0));
            return true;
          }
        }, {
          key: "dropNode",
          value: function dropNode() {
            var _this$unplaced2 = this.unplaced, content = _this$unplaced2.content, openStart = _this$unplaced2.openStart, openEnd = _this$unplaced2.openEnd;
            var inner = contentAt(content, openStart);
            if (inner.childCount <= 1 && openStart > 0) {
              var openAtEnd = content.size - openStart <= openStart + inner.size;
              this.unplaced = new prosemirrorModel.Slice(dropFromFragment(content, openStart - 1, 1), openStart - 1, openAtEnd ? openStart - 1 : openEnd);
            } else {
              this.unplaced = new prosemirrorModel.Slice(dropFromFragment(content, openStart, 1), openStart, openEnd);
            }
          }
        }, {
          key: "placeNodes",
          value: function placeNodes(_ref) {
            var sliceDepth = _ref.sliceDepth, frontierDepth = _ref.frontierDepth, parent = _ref.parent, inject = _ref.inject, wrap = _ref.wrap;
            while (this.depth > frontierDepth) this.closeFrontierNode();
            if (wrap) for (var i = 0; i < wrap.length; i++) this.openFrontierNode(wrap[i]);
            var slice = this.unplaced, fragment = parent ? parent.content : slice.content;
            var openStart = slice.openStart - sliceDepth;
            var taken = 0, add = [];
            var _this$frontier$fronti2 = this.frontier[frontierDepth], match = _this$frontier$fronti2.match, type = _this$frontier$fronti2.type;
            if (inject) {
              for (var _i3 = 0; _i3 < inject.childCount; _i3++) add.push(inject.child(_i3));
              match = match.matchFragment(inject);
            }
            var openEndCount = fragment.size + sliceDepth - (slice.content.size - slice.openEnd);
            while (taken < fragment.childCount) {
              var next = fragment.child(taken), matches = match.matchType(next.type);
              if (!matches) break;
              taken++;
              if (taken > 1 || openStart == 0 || next.content.size) {
                match = matches;
                add.push(closeNodeStart(next.mark(type.allowedMarks(next.marks)), taken == 1 ? openStart : 0, taken == fragment.childCount ? openEndCount : -1));
              }
            }
            var toEnd = taken == fragment.childCount;
            if (!toEnd) openEndCount = -1;
            this.placed = addToFragment(this.placed, frontierDepth, prosemirrorModel.Fragment.from(add));
            this.frontier[frontierDepth].match = match;
            if (toEnd && openEndCount < 0 && parent && parent.type == this.frontier[this.depth].type && this.frontier.length > 1) this.closeFrontierNode();
            for (var _i4 = 0, cur = fragment; _i4 < openEndCount; _i4++) {
              var node = cur.lastChild;
              this.frontier.push({
                type: node.type,
                match: node.contentMatchAt(node.childCount)
              });
              cur = node.content;
            }
            this.unplaced = !toEnd ? new prosemirrorModel.Slice(dropFromFragment(slice.content, sliceDepth, taken), slice.openStart, slice.openEnd) : sliceDepth == 0 ? prosemirrorModel.Slice.empty : new prosemirrorModel.Slice(dropFromFragment(slice.content, sliceDepth - 1, 1), sliceDepth - 1, openEndCount < 0 ? slice.openEnd : sliceDepth - 1);
          }
        }, {
          key: "mustMoveInline",
          value: function mustMoveInline() {
            if (!this.$to.parent.isTextblock) return -1;
            var top = this.frontier[this.depth], level;
            if (!top.type.isTextblock || !contentAfterFits(this.$to, this.$to.depth, top.type, top.match, false) || this.$to.depth == this.depth && (level = this.findCloseLevel(this.$to)) && level.depth == this.depth) return -1;
            var depth = this.$to.depth, after = this.$to.after(depth);
            while (depth > 1 && after == this.$to.end(--depth)) ++after;
            return after;
          }
        }, {
          key: "findCloseLevel",
          value: function findCloseLevel($to) {
            scan: for (var i = Math.min(this.depth, $to.depth); i >= 0; i--) {
              var _this$frontier$i = this.frontier[i], match = _this$frontier$i.match, type = _this$frontier$i.type;
              var dropInner = i < $to.depth && $to.end(i + 1) == $to.pos + ($to.depth - (i + 1));
              var fit = contentAfterFits($to, i, type, match, dropInner);
              if (!fit) continue;
              for (var d = i - 1; d >= 0; d--) {
                var _this$frontier$d = this.frontier[d], _match = _this$frontier$d.match, _type = _this$frontier$d.type;
                var matches = contentAfterFits($to, d, _type, _match, true);
                if (!matches || matches.childCount) continue scan;
              }
              return {
                depth: i,
                fit,
                move: dropInner ? $to.doc.resolve($to.after(i + 1)) : $to
              };
            }
          }
        }, {
          key: "close",
          value: function close($to) {
            var close2 = this.findCloseLevel($to);
            if (!close2) return null;
            while (this.depth > close2.depth) this.closeFrontierNode();
            if (close2.fit.childCount) this.placed = addToFragment(this.placed, close2.depth, close2.fit);
            $to = close2.move;
            for (var d = close2.depth + 1; d <= $to.depth; d++) {
              var node = $to.node(d), add = node.type.contentMatch.fillBefore(node.content, true, $to.index(d));
              this.openFrontierNode(node.type, node.attrs, add);
            }
            return $to;
          }
        }, {
          key: "openFrontierNode",
          value: function openFrontierNode(type) {
            var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            var content = arguments.length > 2 ? arguments[2] : void 0;
            var top = this.frontier[this.depth];
            top.match = top.match.matchType(type);
            this.placed = addToFragment(this.placed, this.depth, prosemirrorModel.Fragment.from(type.create(attrs, content)));
            this.frontier.push({
              type,
              match: type.contentMatch
            });
          }
        }, {
          key: "closeFrontierNode",
          value: function closeFrontierNode() {
            var open = this.frontier.pop();
            var add = open.match.fillBefore(prosemirrorModel.Fragment.empty, true);
            if (add.childCount) this.placed = addToFragment(this.placed, this.frontier.length, add);
          }
        }]);
        return Fitter2;
      })();
      function dropFromFragment(fragment, depth, count) {
        if (depth == 0) return fragment.cutByIndex(count, fragment.childCount);
        return fragment.replaceChild(0, fragment.firstChild.copy(dropFromFragment(fragment.firstChild.content, depth - 1, count)));
      }
      function addToFragment(fragment, depth, content) {
        if (depth == 0) return fragment.append(content);
        return fragment.replaceChild(fragment.childCount - 1, fragment.lastChild.copy(addToFragment(fragment.lastChild.content, depth - 1, content)));
      }
      function contentAt(fragment, depth) {
        for (var i = 0; i < depth; i++) fragment = fragment.firstChild.content;
        return fragment;
      }
      function closeNodeStart(node, openStart, openEnd) {
        if (openStart <= 0) return node;
        var frag = node.content;
        if (openStart > 1) frag = frag.replaceChild(0, closeNodeStart(frag.firstChild, openStart - 1, frag.childCount == 1 ? openEnd - 1 : 0));
        if (openStart > 0) {
          frag = node.type.contentMatch.fillBefore(frag).append(frag);
          if (openEnd <= 0) frag = frag.append(node.type.contentMatch.matchFragment(frag).fillBefore(prosemirrorModel.Fragment.empty, true));
        }
        return node.copy(frag);
      }
      function contentAfterFits($to, depth, type, match, open) {
        var node = $to.node(depth), index = open ? $to.indexAfter(depth) : $to.index(depth);
        if (index == node.childCount && !type.compatibleContent(node.type)) return null;
        var fit = match.fillBefore(node.content, true, index);
        return fit && !invalidMarks(type, node.content, index) ? fit : null;
      }
      function invalidMarks(type, fragment, start) {
        for (var i = start; i < fragment.childCount; i++) if (!type.allowsMarks(fragment.child(i).marks)) return true;
        return false;
      }
      function definesContent(type) {
        return type.spec.defining || type.spec.definingForContent;
      }
      function _replaceRange(tr, from, to, slice) {
        if (!slice.size) return tr.deleteRange(from, to);
        var $from = tr.doc.resolve(from), $to = tr.doc.resolve(to);
        if (fitsTrivially($from, $to, slice)) return tr.step(new ReplaceStep(from, to, slice));
        var targetDepths = coveredDepths($from, tr.doc.resolve(to));
        if (targetDepths[targetDepths.length - 1] == 0) targetDepths.pop();
        var preferredTarget = -($from.depth + 1);
        targetDepths.unshift(preferredTarget);
        for (var d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--) {
          var spec = $from.node(d).type.spec;
          if (spec.defining || spec.definingAsContext || spec.isolating) break;
          if (targetDepths.indexOf(d) > -1) preferredTarget = d;
          else if ($from.before(d) == pos) targetDepths.splice(1, 0, -d);
        }
        var preferredTargetIndex = targetDepths.indexOf(preferredTarget);
        var leftNodes = [], preferredDepth = slice.openStart;
        for (var content = slice.content, i = 0; ; i++) {
          var node = content.firstChild;
          leftNodes.push(node);
          if (i == slice.openStart) break;
          content = node.content;
        }
        for (var _d3 = preferredDepth - 1; _d3 >= 0; _d3--) {
          var leftNode = leftNodes[_d3], def = definesContent(leftNode.type);
          if (def && !leftNode.sameMarkup($from.node(Math.abs(preferredTarget) - 1))) preferredDepth = _d3;
          else if (def || !leftNode.type.isTextblock) break;
        }
        for (var j = slice.openStart; j >= 0; j--) {
          var openDepth = (j + preferredDepth + 1) % (slice.openStart + 1);
          var insert = leftNodes[openDepth];
          if (!insert) continue;
          for (var _i5 = 0; _i5 < targetDepths.length; _i5++) {
            var targetDepth = targetDepths[(_i5 + preferredTargetIndex) % targetDepths.length], expand = true;
            if (targetDepth < 0) {
              expand = false;
              targetDepth = -targetDepth;
            }
            var parent = $from.node(targetDepth - 1), index = $from.index(targetDepth - 1);
            if (parent.canReplaceWith(index, index, insert.type, insert.marks)) return tr.replace($from.before(targetDepth), expand ? $to.after(targetDepth) : to, new prosemirrorModel.Slice(closeFragment(slice.content, 0, slice.openStart, openDepth), openDepth, slice.openEnd));
          }
        }
        var startSteps = tr.steps.length;
        for (var _i6 = targetDepths.length - 1; _i6 >= 0; _i6--) {
          tr.replace(from, to, slice);
          if (tr.steps.length > startSteps) break;
          var depth = targetDepths[_i6];
          if (depth < 0) continue;
          from = $from.before(depth);
          to = $to.after(depth);
        }
      }
      function closeFragment(fragment, depth, oldOpen, newOpen, parent) {
        if (depth < oldOpen) {
          var first = fragment.firstChild;
          fragment = fragment.replaceChild(0, first.copy(closeFragment(first.content, depth + 1, oldOpen, newOpen, first)));
        }
        if (depth > newOpen) {
          var match = parent.contentMatchAt(0);
          var start = match.fillBefore(fragment).append(fragment);
          fragment = start.append(match.matchFragment(start).fillBefore(prosemirrorModel.Fragment.empty, true));
        }
        return fragment;
      }
      function _replaceRangeWith(tr, from, to, node) {
        if (!node.isInline && from == to && tr.doc.resolve(from).parent.content.size) {
          var point = insertPoint(tr.doc, from, node.type);
          if (point != null) from = to = point;
        }
        tr.replaceRange(from, to, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(node), 0, 0));
      }
      function _deleteRange(tr, from, to) {
        var $from = tr.doc.resolve(from), $to = tr.doc.resolve(to);
        var covered = coveredDepths($from, $to);
        for (var i = 0; i < covered.length; i++) {
          var depth = covered[i], last = i == covered.length - 1;
          if (last && depth == 0 || $from.node(depth).type.contentMatch.validEnd) return tr["delete"]($from.start(depth), $to.end(depth));
          if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1)))) return tr["delete"]($from.before(depth), $to.after(depth));
        }
        for (var d = 1; d <= $from.depth && d <= $to.depth; d++) {
          if (from - $from.start(d) == $from.depth - d && to > $from.end(d) && $to.end(d) - to != $to.depth - d && $from.start(d - 1) == $to.start(d - 1) && $from.node(d - 1).canReplace($from.index(d - 1), $to.index(d - 1))) return tr["delete"]($from.before(d), to);
        }
        tr["delete"](from, to);
      }
      function coveredDepths($from, $to) {
        var result = [], minDepth = Math.min($from.depth, $to.depth);
        for (var d = minDepth; d >= 0; d--) {
          var start = $from.start(d);
          if (start < $from.pos - ($from.depth - d) || $to.end(d) > $to.pos + ($to.depth - d) || $from.node(d).type.spec.isolating || $to.node(d).type.spec.isolating) break;
          if (start == $to.start(d) || d == $from.depth && d == $to.depth && $from.parent.inlineContent && $to.parent.inlineContent && d && $to.start(d - 1) == start - 1) result.push(d);
        }
        return result;
      }
      var AttrStep = (function(_Step7) {
        _inherits(AttrStep2, _Step7);
        var _super7 = _createSuper(AttrStep2);
        function AttrStep2(pos, attr, value) {
          var _this9;
          _classCallCheck(this, AttrStep2);
          _this9 = _super7.call(this);
          _this9.pos = pos;
          _this9.attr = attr;
          _this9.value = value;
          return _this9;
        }
        _createClass(AttrStep2, [{
          key: "apply",
          value: function apply(doc) {
            var node = doc.nodeAt(this.pos);
            if (!node) return StepResult.fail("No node at attribute step's position");
            var attrs = /* @__PURE__ */ Object.create(null);
            for (var name in node.attrs) attrs[name] = node.attrs[name];
            attrs[this.attr] = this.value;
            var updated = node.type.create(attrs, null, node.marks);
            return StepResult.fromReplace(doc, this.pos, this.pos + 1, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
          }
        }, {
          key: "getMap",
          value: function getMap() {
            return StepMap.empty;
          }
        }, {
          key: "invert",
          value: function invert(doc) {
            return new AttrStep2(this.pos, this.attr, doc.nodeAt(this.pos).attrs[this.attr]);
          }
        }, {
          key: "map",
          value: function map(mapping) {
            var pos = mapping.mapResult(this.pos, 1);
            return pos.deletedAfter ? null : new AttrStep2(pos.pos, this.attr, this.value);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              stepType: "attr",
              pos: this.pos,
              attr: this.attr,
              value: this.value
            };
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.pos != "number" || typeof json.attr != "string") throw new RangeError("Invalid input for AttrStep.fromJSON");
            return new AttrStep2(json.pos, json.attr, json.value);
          }
        }]);
        return AttrStep2;
      })(Step);
      Step.jsonID("attr", AttrStep);
      var DocAttrStep = (function(_Step8) {
        _inherits(DocAttrStep2, _Step8);
        var _super8 = _createSuper(DocAttrStep2);
        function DocAttrStep2(attr, value) {
          var _this10;
          _classCallCheck(this, DocAttrStep2);
          _this10 = _super8.call(this);
          _this10.attr = attr;
          _this10.value = value;
          return _this10;
        }
        _createClass(DocAttrStep2, [{
          key: "apply",
          value: function apply(doc) {
            var attrs = /* @__PURE__ */ Object.create(null);
            for (var name in doc.attrs) attrs[name] = doc.attrs[name];
            attrs[this.attr] = this.value;
            var updated = doc.type.create(attrs, doc.content, doc.marks);
            return StepResult.ok(updated);
          }
        }, {
          key: "getMap",
          value: function getMap() {
            return StepMap.empty;
          }
        }, {
          key: "invert",
          value: function invert(doc) {
            return new DocAttrStep2(this.attr, doc.attrs[this.attr]);
          }
        }, {
          key: "map",
          value: function map(mapping) {
            return this;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              stepType: "docAttr",
              attr: this.attr,
              value: this.value
            };
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(schema, json) {
            if (typeof json.attr != "string") throw new RangeError("Invalid input for DocAttrStep.fromJSON");
            return new DocAttrStep2(json.attr, json.value);
          }
        }]);
        return DocAttrStep2;
      })(Step);
      Step.jsonID("docAttr", DocAttrStep);
      exports.TransformError = (function(_Error) {
        _inherits(TransformError, _Error);
        var _super9 = _createSuper(TransformError);
        function TransformError() {
          _classCallCheck(this, TransformError);
          return _super9.apply(this, arguments);
        }
        return _createClass(TransformError);
      })(_wrapNativeSuper(Error));
      exports.TransformError = function TransformError(message) {
        var err = Error.call(this, message);
        err.__proto__ = TransformError.prototype;
        return err;
      };
      exports.TransformError.prototype = Object.create(Error.prototype);
      exports.TransformError.prototype.constructor = exports.TransformError;
      exports.TransformError.prototype.name = "TransformError";
      var Transform = (function() {
        function Transform2(doc) {
          _classCallCheck(this, Transform2);
          this.doc = doc;
          this.steps = [];
          this.docs = [];
          this.mapping = new Mapping();
        }
        _createClass(Transform2, [{
          key: "before",
          get: function get() {
            return this.docs.length ? this.docs[0] : this.doc;
          }
        }, {
          key: "step",
          value: function step(_step) {
            var result = this.maybeStep(_step);
            if (result.failed) throw new exports.TransformError(result.failed);
            return this;
          }
        }, {
          key: "maybeStep",
          value: function maybeStep(step) {
            var result = step.apply(this.doc);
            if (!result.failed) this.addStep(step, result.doc);
            return result;
          }
        }, {
          key: "docChanged",
          get: function get() {
            return this.steps.length > 0;
          }
        }, {
          key: "addStep",
          value: function addStep(step, doc) {
            this.docs.push(this.doc);
            this.steps.push(step);
            this.mapping.appendMap(step.getMap());
            this.doc = doc;
          }
        }, {
          key: "replace",
          value: function replace(from) {
            var to = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : from;
            var slice = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : prosemirrorModel.Slice.empty;
            var step = replaceStep(this.doc, from, to, slice);
            if (step) this.step(step);
            return this;
          }
        }, {
          key: "replaceWith",
          value: function replaceWith(from, to, content) {
            return this.replace(from, to, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(content), 0, 0));
          }
        }, {
          key: "delete",
          value: function _delete(from, to) {
            return this.replace(from, to, prosemirrorModel.Slice.empty);
          }
        }, {
          key: "insert",
          value: function insert(pos, content) {
            return this.replaceWith(pos, pos, content);
          }
        }, {
          key: "replaceRange",
          value: function replaceRange(from, to, slice) {
            _replaceRange(this, from, to, slice);
            return this;
          }
        }, {
          key: "replaceRangeWith",
          value: function replaceRangeWith(from, to, node) {
            _replaceRangeWith(this, from, to, node);
            return this;
          }
        }, {
          key: "deleteRange",
          value: function deleteRange(from, to) {
            _deleteRange(this, from, to);
            return this;
          }
        }, {
          key: "lift",
          value: function lift(range, target) {
            _lift(this, range, target);
            return this;
          }
        }, {
          key: "join",
          value: function join(pos) {
            var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            _join(this, pos, depth);
            return this;
          }
        }, {
          key: "wrap",
          value: function wrap(range, wrappers) {
            _wrap2(this, range, wrappers);
            return this;
          }
        }, {
          key: "setBlockType",
          value: function setBlockType(from) {
            var to = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : from;
            var type = arguments.length > 2 ? arguments[2] : void 0;
            var attrs = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
            _setBlockType(this, from, to, type, attrs);
            return this;
          }
        }, {
          key: "setNodeMarkup",
          value: function setNodeMarkup(pos, type) {
            var attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            var marks = arguments.length > 3 ? arguments[3] : void 0;
            _setNodeMarkup(this, pos, type, attrs, marks);
            return this;
          }
        }, {
          key: "setNodeAttribute",
          value: function setNodeAttribute(pos, attr, value) {
            this.step(new AttrStep(pos, attr, value));
            return this;
          }
        }, {
          key: "setDocAttribute",
          value: function setDocAttribute(attr, value) {
            this.step(new DocAttrStep(attr, value));
            return this;
          }
        }, {
          key: "addNodeMark",
          value: function addNodeMark(pos, mark) {
            this.step(new AddNodeMarkStep(pos, mark));
            return this;
          }
        }, {
          key: "removeNodeMark",
          value: function removeNodeMark(pos, mark) {
            var node = this.doc.nodeAt(pos);
            if (!node) throw new RangeError("No node at position " + pos);
            if (mark instanceof prosemirrorModel.Mark) {
              if (mark.isInSet(node.marks)) this.step(new RemoveNodeMarkStep(pos, mark));
            } else {
              var set = node.marks, found, steps = [];
              while (found = mark.isInSet(set)) {
                steps.push(new RemoveNodeMarkStep(pos, found));
                set = found.removeFromSet(set);
              }
              for (var i = steps.length - 1; i >= 0; i--) this.step(steps[i]);
            }
            return this;
          }
        }, {
          key: "split",
          value: function split(pos) {
            var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            var typesAfter = arguments.length > 2 ? arguments[2] : void 0;
            _split(this, pos, depth, typesAfter);
            return this;
          }
        }, {
          key: "addMark",
          value: function addMark(from, to, mark) {
            _addMark(this, from, to, mark);
            return this;
          }
        }, {
          key: "removeMark",
          value: function removeMark(from, to, mark) {
            _removeMark(this, from, to, mark);
            return this;
          }
        }, {
          key: "clearIncompatible",
          value: function clearIncompatible(pos, parentType, match) {
            _clearIncompatible(this, pos, parentType, match);
            return this;
          }
        }]);
        return Transform2;
      })();
      exports.AddMarkStep = AddMarkStep;
      exports.AddNodeMarkStep = AddNodeMarkStep;
      exports.AttrStep = AttrStep;
      exports.DocAttrStep = DocAttrStep;
      exports.MapResult = MapResult;
      exports.Mapping = Mapping;
      exports.RemoveMarkStep = RemoveMarkStep;
      exports.RemoveNodeMarkStep = RemoveNodeMarkStep;
      exports.ReplaceAroundStep = ReplaceAroundStep;
      exports.ReplaceStep = ReplaceStep;
      exports.Step = Step;
      exports.StepMap = StepMap;
      exports.StepResult = StepResult;
      exports.Transform = Transform;
      exports.canJoin = canJoin;
      exports.canSplit = canSplit;
      exports.dropPoint = dropPoint;
      exports.findWrapping = findWrapping;
      exports.insertPoint = insertPoint;
      exports.joinPoint = joinPoint;
      exports.liftTarget = liftTarget;
      exports.replaceStep = replaceStep;
    }
  });

  // node_modules/prosemirror-state/dist/index.cjs
  var require_dist4 = __commonJS({
    "node_modules/prosemirror-state/dist/index.cjs"(exports) {
      "use strict";
      function _get() {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get.bind();
        } else {
          _get = function _get2(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
              return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
          };
        }
        return _get.apply(this, arguments);
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null) break;
        }
        return object;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var prosemirrorModel = require_dist2();
      var prosemirrorTransform = require_dist3();
      var classesById = /* @__PURE__ */ Object.create(null);
      var Selection = (function() {
        function Selection2($anchor, $head, ranges) {
          _classCallCheck(this, Selection2);
          this.$anchor = $anchor;
          this.$head = $head;
          this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
        }
        _createClass(Selection2, [{
          key: "anchor",
          get: function get() {
            return this.$anchor.pos;
          }
        }, {
          key: "head",
          get: function get() {
            return this.$head.pos;
          }
        }, {
          key: "from",
          get: function get() {
            return this.$from.pos;
          }
        }, {
          key: "to",
          get: function get() {
            return this.$to.pos;
          }
        }, {
          key: "$from",
          get: function get() {
            return this.ranges[0].$from;
          }
        }, {
          key: "$to",
          get: function get() {
            return this.ranges[0].$to;
          }
        }, {
          key: "empty",
          get: function get() {
            var ranges = this.ranges;
            for (var i = 0; i < ranges.length; i++) if (ranges[i].$from.pos != ranges[i].$to.pos) return false;
            return true;
          }
        }, {
          key: "content",
          value: function content() {
            return this.$from.doc.slice(this.from, this.to, true);
          }
        }, {
          key: "replace",
          value: function replace(tr) {
            var content = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : prosemirrorModel.Slice.empty;
            var lastNode = content.content.lastChild, lastParent = null;
            for (var i = 0; i < content.openEnd; i++) {
              lastParent = lastNode;
              lastNode = lastNode.lastChild;
            }
            var mapFrom = tr.steps.length, ranges = this.ranges;
            for (var _i = 0; _i < ranges.length; _i++) {
              var _ranges$_i = ranges[_i], $from = _ranges$_i.$from, $to = _ranges$_i.$to, mapping = tr.mapping.slice(mapFrom);
              tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), _i ? prosemirrorModel.Slice.empty : content);
              if (_i == 0) selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1);
            }
          }
        }, {
          key: "replaceWith",
          value: function replaceWith(tr, node) {
            var mapFrom = tr.steps.length, ranges = this.ranges;
            for (var i = 0; i < ranges.length; i++) {
              var _ranges$i = ranges[i], $from = _ranges$i.$from, $to = _ranges$i.$to, mapping = tr.mapping.slice(mapFrom);
              var from = mapping.map($from.pos), to = mapping.map($to.pos);
              if (i) {
                tr.deleteRange(from, to);
              } else {
                tr.replaceRangeWith(from, to, node);
                selectionToInsertionEnd(tr, mapFrom, node.isInline ? -1 : 1);
              }
            }
          }
        }, {
          key: "getBookmark",
          value: function getBookmark() {
            return TextSelection.between(this.$anchor, this.$head).getBookmark();
          }
        }], [{
          key: "findFrom",
          value: function findFrom($pos, dir) {
            var textOnly = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
            var inner = $pos.parent.inlineContent ? new TextSelection($pos) : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
            if (inner) return inner;
            for (var depth = $pos.depth - 1; depth >= 0; depth--) {
              var found = dir < 0 ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly) : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
              if (found) return found;
            }
            return null;
          }
        }, {
          key: "near",
          value: function near($pos) {
            var bias = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0));
          }
        }, {
          key: "atStart",
          value: function atStart(doc) {
            return findSelectionIn(doc, doc, 0, 0, 1) || new AllSelection(doc);
          }
        }, {
          key: "atEnd",
          value: function atEnd(doc) {
            return findSelectionIn(doc, doc, doc.content.size, doc.childCount, -1) || new AllSelection(doc);
          }
        }, {
          key: "fromJSON",
          value: function fromJSON(doc, json) {
            if (!json || !json.type) throw new RangeError("Invalid input for Selection.fromJSON");
            var cls = classesById[json.type];
            if (!cls) throw new RangeError("No selection type ".concat(json.type, " defined"));
            return cls.fromJSON(doc, json);
          }
        }, {
          key: "jsonID",
          value: function jsonID(id, selectionClass) {
            if (id in classesById) throw new RangeError("Duplicate use of selection JSON ID " + id);
            classesById[id] = selectionClass;
            selectionClass.prototype.jsonID = id;
            return selectionClass;
          }
        }]);
        return Selection2;
      })();
      Selection.prototype.visible = true;
      var SelectionRange = _createClass(function SelectionRange2($from, $to) {
        _classCallCheck(this, SelectionRange2);
        this.$from = $from;
        this.$to = $to;
      });
      var warnedAboutTextSelection = false;
      function checkTextSelection($pos) {
        if (!warnedAboutTextSelection && !$pos.parent.inlineContent) {
          warnedAboutTextSelection = true;
          console["warn"]("TextSelection endpoint not pointing into a node with inline content (" + $pos.parent.type.name + ")");
        }
      }
      var TextSelection = (function(_Selection) {
        _inherits(TextSelection2, _Selection);
        var _super = _createSuper(TextSelection2);
        function TextSelection2($anchor) {
          var $head = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $anchor;
          _classCallCheck(this, TextSelection2);
          checkTextSelection($anchor);
          checkTextSelection($head);
          return _super.call(this, $anchor, $head);
        }
        _createClass(TextSelection2, [{
          key: "$cursor",
          get: function get() {
            return this.$anchor.pos == this.$head.pos ? this.$head : null;
          }
        }, {
          key: "map",
          value: function map(doc, mapping) {
            var $head = doc.resolve(mapping.map(this.head));
            if (!$head.parent.inlineContent) return Selection.near($head);
            var $anchor = doc.resolve(mapping.map(this.anchor));
            return new TextSelection2($anchor.parent.inlineContent ? $anchor : $head, $head);
          }
        }, {
          key: "replace",
          value: function replace(tr) {
            var content = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : prosemirrorModel.Slice.empty;
            _get(_getPrototypeOf(TextSelection2.prototype), "replace", this).call(this, tr, content);
            if (content == prosemirrorModel.Slice.empty) {
              var marks = this.$from.marksAcross(this.$to);
              if (marks) tr.ensureMarks(marks);
            }
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return other instanceof TextSelection2 && other.anchor == this.anchor && other.head == this.head;
          }
        }, {
          key: "getBookmark",
          value: function getBookmark() {
            return new TextBookmark(this.anchor, this.head);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              type: "text",
              anchor: this.anchor,
              head: this.head
            };
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(doc, json) {
            if (typeof json.anchor != "number" || typeof json.head != "number") throw new RangeError("Invalid input for TextSelection.fromJSON");
            return new TextSelection2(doc.resolve(json.anchor), doc.resolve(json.head));
          }
        }, {
          key: "create",
          value: function create(doc, anchor) {
            var head = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : anchor;
            var $anchor = doc.resolve(anchor);
            return new this($anchor, head == anchor ? $anchor : doc.resolve(head));
          }
        }, {
          key: "between",
          value: function between($anchor, $head, bias) {
            var dPos = $anchor.pos - $head.pos;
            if (!bias || dPos) bias = dPos >= 0 ? 1 : -1;
            if (!$head.parent.inlineContent) {
              var found = Selection.findFrom($head, bias, true) || Selection.findFrom($head, -bias, true);
              if (found) $head = found.$head;
              else return Selection.near($head, bias);
            }
            if (!$anchor.parent.inlineContent) {
              if (dPos == 0) {
                $anchor = $head;
              } else {
                $anchor = (Selection.findFrom($anchor, -bias, true) || Selection.findFrom($anchor, bias, true)).$anchor;
                if ($anchor.pos < $head.pos != dPos < 0) $anchor = $head;
              }
            }
            return new TextSelection2($anchor, $head);
          }
        }]);
        return TextSelection2;
      })(Selection);
      Selection.jsonID("text", TextSelection);
      var TextBookmark = (function() {
        function TextBookmark2(anchor, head) {
          _classCallCheck(this, TextBookmark2);
          this.anchor = anchor;
          this.head = head;
        }
        _createClass(TextBookmark2, [{
          key: "map",
          value: function map(mapping) {
            return new TextBookmark2(mapping.map(this.anchor), mapping.map(this.head));
          }
        }, {
          key: "resolve",
          value: function resolve(doc) {
            return TextSelection.between(doc.resolve(this.anchor), doc.resolve(this.head));
          }
        }]);
        return TextBookmark2;
      })();
      var NodeSelection = (function(_Selection2) {
        _inherits(NodeSelection2, _Selection2);
        var _super2 = _createSuper(NodeSelection2);
        function NodeSelection2($pos) {
          var _this;
          _classCallCheck(this, NodeSelection2);
          var node = $pos.nodeAfter;
          var $end = $pos.node(0).resolve($pos.pos + node.nodeSize);
          _this = _super2.call(this, $pos, $end);
          _this.node = node;
          return _this;
        }
        _createClass(NodeSelection2, [{
          key: "map",
          value: function map(doc, mapping) {
            var _mapping$mapResult = mapping.mapResult(this.anchor), deleted = _mapping$mapResult.deleted, pos = _mapping$mapResult.pos;
            var $pos = doc.resolve(pos);
            if (deleted) return Selection.near($pos);
            return new NodeSelection2($pos);
          }
        }, {
          key: "content",
          value: function content() {
            return new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(this.node), 0, 0);
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return other instanceof NodeSelection2 && other.anchor == this.anchor;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              type: "node",
              anchor: this.anchor
            };
          }
        }, {
          key: "getBookmark",
          value: function getBookmark() {
            return new NodeBookmark(this.anchor);
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(doc, json) {
            if (typeof json.anchor != "number") throw new RangeError("Invalid input for NodeSelection.fromJSON");
            return new NodeSelection2(doc.resolve(json.anchor));
          }
        }, {
          key: "create",
          value: function create(doc, from) {
            return new NodeSelection2(doc.resolve(from));
          }
        }, {
          key: "isSelectable",
          value: function isSelectable(node) {
            return !node.isText && node.type.spec.selectable !== false;
          }
        }]);
        return NodeSelection2;
      })(Selection);
      NodeSelection.prototype.visible = false;
      Selection.jsonID("node", NodeSelection);
      var NodeBookmark = (function() {
        function NodeBookmark2(anchor) {
          _classCallCheck(this, NodeBookmark2);
          this.anchor = anchor;
        }
        _createClass(NodeBookmark2, [{
          key: "map",
          value: function map(mapping) {
            var _mapping$mapResult2 = mapping.mapResult(this.anchor), deleted = _mapping$mapResult2.deleted, pos = _mapping$mapResult2.pos;
            return deleted ? new TextBookmark(pos, pos) : new NodeBookmark2(pos);
          }
        }, {
          key: "resolve",
          value: function resolve(doc) {
            var $pos = doc.resolve(this.anchor), node = $pos.nodeAfter;
            if (node && NodeSelection.isSelectable(node)) return new NodeSelection($pos);
            return Selection.near($pos);
          }
        }]);
        return NodeBookmark2;
      })();
      var AllSelection = (function(_Selection3) {
        _inherits(AllSelection2, _Selection3);
        var _super3 = _createSuper(AllSelection2);
        function AllSelection2(doc) {
          _classCallCheck(this, AllSelection2);
          return _super3.call(this, doc.resolve(0), doc.resolve(doc.content.size));
        }
        _createClass(AllSelection2, [{
          key: "replace",
          value: function replace(tr) {
            var content = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : prosemirrorModel.Slice.empty;
            if (content == prosemirrorModel.Slice.empty) {
              tr["delete"](0, tr.doc.content.size);
              var sel = Selection.atStart(tr.doc);
              if (!sel.eq(tr.selection)) tr.setSelection(sel);
            } else {
              _get(_getPrototypeOf(AllSelection2.prototype), "replace", this).call(this, tr, content);
            }
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              type: "all"
            };
          }
        }, {
          key: "map",
          value: function map(doc) {
            return new AllSelection2(doc);
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return other instanceof AllSelection2;
          }
        }, {
          key: "getBookmark",
          value: function getBookmark() {
            return AllBookmark;
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(doc) {
            return new AllSelection2(doc);
          }
        }]);
        return AllSelection2;
      })(Selection);
      Selection.jsonID("all", AllSelection);
      var AllBookmark = {
        map: function map() {
          return this;
        },
        resolve: function resolve(doc) {
          return new AllSelection(doc);
        }
      };
      function findSelectionIn(doc, node, pos, index, dir) {
        var text = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
        if (node.inlineContent) return TextSelection.create(doc, pos);
        for (var i = index - (dir > 0 ? 0 : 1); dir > 0 ? i < node.childCount : i >= 0; i += dir) {
          var child = node.child(i);
          if (!child.isAtom) {
            var inner = findSelectionIn(doc, child, pos + dir, dir < 0 ? child.childCount : 0, dir, text);
            if (inner) return inner;
          } else if (!text && NodeSelection.isSelectable(child)) {
            return NodeSelection.create(doc, pos - (dir < 0 ? child.nodeSize : 0));
          }
          pos += child.nodeSize * dir;
        }
        return null;
      }
      function selectionToInsertionEnd(tr, startLen, bias) {
        var last = tr.steps.length - 1;
        if (last < startLen) return;
        var step = tr.steps[last];
        if (!(step instanceof prosemirrorTransform.ReplaceStep || step instanceof prosemirrorTransform.ReplaceAroundStep)) return;
        var map = tr.mapping.maps[last], end;
        map.forEach(function(_from, _to, _newFrom, newTo) {
          if (end == null) end = newTo;
        });
        tr.setSelection(Selection.near(tr.doc.resolve(end), bias));
      }
      var UPDATED_SEL = 1;
      var UPDATED_MARKS = 2;
      var UPDATED_SCROLL = 4;
      var Transaction = (function(_prosemirrorTransform) {
        _inherits(Transaction2, _prosemirrorTransform);
        var _super4 = _createSuper(Transaction2);
        function Transaction2(state) {
          var _this2;
          _classCallCheck(this, Transaction2);
          _this2 = _super4.call(this, state.doc);
          _this2.curSelectionFor = 0;
          _this2.updated = 0;
          _this2.meta = /* @__PURE__ */ Object.create(null);
          _this2.time = Date.now();
          _this2.curSelection = state.selection;
          _this2.storedMarks = state.storedMarks;
          return _this2;
        }
        _createClass(Transaction2, [{
          key: "selection",
          get: function get() {
            if (this.curSelectionFor < this.steps.length) {
              this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
              this.curSelectionFor = this.steps.length;
            }
            return this.curSelection;
          }
        }, {
          key: "setSelection",
          value: function setSelection(selection) {
            if (selection.$from.doc != this.doc) throw new RangeError("Selection passed to setSelection must point at the current document");
            this.curSelection = selection;
            this.curSelectionFor = this.steps.length;
            this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS;
            this.storedMarks = null;
            return this;
          }
        }, {
          key: "selectionSet",
          get: function get() {
            return (this.updated & UPDATED_SEL) > 0;
          }
        }, {
          key: "setStoredMarks",
          value: function setStoredMarks(marks) {
            this.storedMarks = marks;
            this.updated |= UPDATED_MARKS;
            return this;
          }
        }, {
          key: "ensureMarks",
          value: function ensureMarks(marks) {
            if (!prosemirrorModel.Mark.sameSet(this.storedMarks || this.selection.$from.marks(), marks)) this.setStoredMarks(marks);
            return this;
          }
        }, {
          key: "addStoredMark",
          value: function addStoredMark(mark) {
            return this.ensureMarks(mark.addToSet(this.storedMarks || this.selection.$head.marks()));
          }
        }, {
          key: "removeStoredMark",
          value: function removeStoredMark(mark) {
            return this.ensureMarks(mark.removeFromSet(this.storedMarks || this.selection.$head.marks()));
          }
        }, {
          key: "storedMarksSet",
          get: function get() {
            return (this.updated & UPDATED_MARKS) > 0;
          }
        }, {
          key: "addStep",
          value: function addStep(step, doc) {
            _get(_getPrototypeOf(Transaction2.prototype), "addStep", this).call(this, step, doc);
            this.updated = this.updated & ~UPDATED_MARKS;
            this.storedMarks = null;
          }
        }, {
          key: "setTime",
          value: function setTime(time) {
            this.time = time;
            return this;
          }
        }, {
          key: "replaceSelection",
          value: function replaceSelection(slice) {
            this.selection.replace(this, slice);
            return this;
          }
        }, {
          key: "replaceSelectionWith",
          value: function replaceSelectionWith(node) {
            var inheritMarks = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            var selection = this.selection;
            if (inheritMarks) node = node.mark(this.storedMarks || (selection.empty ? selection.$from.marks() : selection.$from.marksAcross(selection.$to) || prosemirrorModel.Mark.none));
            selection.replaceWith(this, node);
            return this;
          }
        }, {
          key: "deleteSelection",
          value: function deleteSelection() {
            this.selection.replace(this);
            return this;
          }
        }, {
          key: "insertText",
          value: function insertText(text, from, to) {
            var schema = this.doc.type.schema;
            if (from == null) {
              if (!text) return this.deleteSelection();
              return this.replaceSelectionWith(schema.text(text), true);
            } else {
              if (to == null) to = from;
              if (!text) return this.deleteRange(from, to);
              var marks = this.storedMarks;
              if (!marks) {
                var $from = this.doc.resolve(from);
                marks = to == from ? $from.marks() : $from.marksAcross(this.doc.resolve(to));
              }
              this.replaceRangeWith(from, to, schema.text(text, marks));
              if (!this.selection.empty && this.selection.to == from + text.length) this.setSelection(Selection.near(this.selection.$to));
              return this;
            }
          }
        }, {
          key: "setMeta",
          value: function setMeta(key, value) {
            this.meta[typeof key == "string" ? key : key.key] = value;
            return this;
          }
        }, {
          key: "getMeta",
          value: function getMeta(key) {
            return this.meta[typeof key == "string" ? key : key.key];
          }
        }, {
          key: "isGeneric",
          get: function get() {
            for (var _ in this.meta) return false;
            return true;
          }
        }, {
          key: "scrollIntoView",
          value: function scrollIntoView() {
            this.updated |= UPDATED_SCROLL;
            return this;
          }
        }, {
          key: "scrolledIntoView",
          get: function get() {
            return (this.updated & UPDATED_SCROLL) > 0;
          }
        }]);
        return Transaction2;
      })(prosemirrorTransform.Transform);
      function bind(f, self) {
        return !self || !f ? f : f.bind(self);
      }
      var FieldDesc = _createClass(function FieldDesc2(name, desc, self) {
        _classCallCheck(this, FieldDesc2);
        this.name = name;
        this.init = bind(desc.init, self);
        this.apply = bind(desc.apply, self);
      });
      var baseFields = [new FieldDesc("doc", {
        init: function init2(config) {
          return config.doc || config.schema.topNodeType.createAndFill();
        },
        apply: function apply(tr) {
          return tr.doc;
        }
      }), new FieldDesc("selection", {
        init: function init2(config, instance) {
          return config.selection || Selection.atStart(instance.doc);
        },
        apply: function apply(tr) {
          return tr.selection;
        }
      }), new FieldDesc("storedMarks", {
        init: function init2(config) {
          return config.storedMarks || null;
        },
        apply: function apply(tr, _marks, _old, state) {
          return state.selection.$cursor ? tr.storedMarks : null;
        }
      }), new FieldDesc("scrollToSelection", {
        init: function init2() {
          return 0;
        },
        apply: function apply(tr, prev) {
          return tr.scrolledIntoView ? prev + 1 : prev;
        }
      })];
      var Configuration = _createClass(function Configuration2(schema, plugins) {
        var _this3 = this;
        _classCallCheck(this, Configuration2);
        this.schema = schema;
        this.plugins = [];
        this.pluginsByKey = /* @__PURE__ */ Object.create(null);
        this.fields = baseFields.slice();
        if (plugins) plugins.forEach(function(plugin) {
          if (_this3.pluginsByKey[plugin.key]) throw new RangeError("Adding different instances of a keyed plugin (" + plugin.key + ")");
          _this3.plugins.push(plugin);
          _this3.pluginsByKey[plugin.key] = plugin;
          if (plugin.spec.state) _this3.fields.push(new FieldDesc(plugin.key, plugin.spec.state, plugin));
        });
      });
      var EditorState = (function() {
        function EditorState2(config) {
          _classCallCheck(this, EditorState2);
          this.config = config;
        }
        _createClass(EditorState2, [{
          key: "schema",
          get: function get() {
            return this.config.schema;
          }
        }, {
          key: "plugins",
          get: function get() {
            return this.config.plugins;
          }
        }, {
          key: "apply",
          value: function apply(tr) {
            return this.applyTransaction(tr).state;
          }
        }, {
          key: "filterTransaction",
          value: function filterTransaction(tr) {
            var ignore = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
            for (var i = 0; i < this.config.plugins.length; i++) if (i != ignore) {
              var plugin = this.config.plugins[i];
              if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this)) return false;
            }
            return true;
          }
        }, {
          key: "applyTransaction",
          value: function applyTransaction(rootTr) {
            if (!this.filterTransaction(rootTr)) return {
              state: this,
              transactions: []
            };
            var trs = [rootTr], newState = this.applyInner(rootTr), seen = null;
            for (; ; ) {
              var haveNew = false;
              for (var i = 0; i < this.config.plugins.length; i++) {
                var plugin = this.config.plugins[i];
                if (plugin.spec.appendTransaction) {
                  var n = seen ? seen[i].n : 0, oldState = seen ? seen[i].state : this;
                  var tr = n < trs.length && plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
                  if (tr && newState.filterTransaction(tr, i)) {
                    tr.setMeta("appendedTransaction", rootTr);
                    if (!seen) {
                      seen = [];
                      for (var j = 0; j < this.config.plugins.length; j++) seen.push(j < i ? {
                        state: newState,
                        n: trs.length
                      } : {
                        state: this,
                        n: 0
                      });
                    }
                    trs.push(tr);
                    newState = newState.applyInner(tr);
                    haveNew = true;
                  }
                  if (seen) seen[i] = {
                    state: newState,
                    n: trs.length
                  };
                }
              }
              if (!haveNew) return {
                state: newState,
                transactions: trs
              };
            }
          }
        }, {
          key: "applyInner",
          value: function applyInner(tr) {
            if (!tr.before.eq(this.doc)) throw new RangeError("Applying a mismatched transaction");
            var newInstance = new EditorState2(this.config), fields = this.config.fields;
            for (var i = 0; i < fields.length; i++) {
              var field = fields[i];
              newInstance[field.name] = field.apply(tr, this[field.name], this, newInstance);
            }
            return newInstance;
          }
        }, {
          key: "tr",
          get: function get() {
            return new Transaction(this);
          }
        }, {
          key: "reconfigure",
          value: function reconfigure(config) {
            var $config = new Configuration(this.schema, config.plugins);
            var fields = $config.fields, instance = new EditorState2($config);
            for (var i = 0; i < fields.length; i++) {
              var name = fields[i].name;
              instance[name] = this.hasOwnProperty(name) ? this[name] : fields[i].init(config, instance);
            }
            return instance;
          }
        }, {
          key: "toJSON",
          value: function toJSON(pluginFields) {
            var result = {
              doc: this.doc.toJSON(),
              selection: this.selection.toJSON()
            };
            if (this.storedMarks) result.storedMarks = this.storedMarks.map(function(m) {
              return m.toJSON();
            });
            if (pluginFields && _typeof(pluginFields) == "object") for (var prop in pluginFields) {
              if (prop == "doc" || prop == "selection") throw new RangeError("The JSON fields `doc` and `selection` are reserved");
              var plugin = pluginFields[prop], state = plugin.spec.state;
              if (state && state.toJSON) result[prop] = state.toJSON.call(plugin, this[plugin.key]);
            }
            return result;
          }
        }], [{
          key: "create",
          value: function create(config) {
            var $config = new Configuration(config.doc ? config.doc.type.schema : config.schema, config.plugins);
            var instance = new EditorState2($config);
            for (var i = 0; i < $config.fields.length; i++) instance[$config.fields[i].name] = $config.fields[i].init(config, instance);
            return instance;
          }
        }, {
          key: "fromJSON",
          value: function fromJSON(config, json, pluginFields) {
            if (!json) throw new RangeError("Invalid input for EditorState.fromJSON");
            if (!config.schema) throw new RangeError("Required config field 'schema' missing");
            var $config = new Configuration(config.schema, config.plugins);
            var instance = new EditorState2($config);
            $config.fields.forEach(function(field) {
              if (field.name == "doc") {
                instance.doc = prosemirrorModel.Node.fromJSON(config.schema, json.doc);
              } else if (field.name == "selection") {
                instance.selection = Selection.fromJSON(instance.doc, json.selection);
              } else if (field.name == "storedMarks") {
                if (json.storedMarks) instance.storedMarks = json.storedMarks.map(config.schema.markFromJSON);
              } else {
                if (pluginFields) for (var prop in pluginFields) {
                  var plugin = pluginFields[prop], state = plugin.spec.state;
                  if (plugin.key == field.name && state && state.fromJSON && Object.prototype.hasOwnProperty.call(json, prop)) {
                    instance[field.name] = state.fromJSON.call(plugin, config, json[prop], instance);
                    return;
                  }
                }
                instance[field.name] = field.init(config, instance);
              }
            });
            return instance;
          }
        }]);
        return EditorState2;
      })();
      function bindProps(obj, self, target) {
        for (var prop in obj) {
          var val = obj[prop];
          if (val instanceof Function) val = val.bind(self);
          else if (prop == "handleDOMEvents") val = bindProps(val, self, {});
          target[prop] = val;
        }
        return target;
      }
      var Plugin = (function() {
        function Plugin2(spec) {
          _classCallCheck(this, Plugin2);
          this.spec = spec;
          this.props = {};
          if (spec.props) bindProps(spec.props, this, this.props);
          this.key = spec.key ? spec.key.key : createKey("plugin");
        }
        _createClass(Plugin2, [{
          key: "getState",
          value: function getState(state) {
            return state[this.key];
          }
        }]);
        return Plugin2;
      })();
      var keys = /* @__PURE__ */ Object.create(null);
      function createKey(name) {
        if (name in keys) return name + "$" + ++keys[name];
        keys[name] = 0;
        return name + "$";
      }
      var PluginKey = (function() {
        function PluginKey2() {
          var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "key";
          _classCallCheck(this, PluginKey2);
          this.key = createKey(name);
        }
        _createClass(PluginKey2, [{
          key: "get",
          value: function get(state) {
            return state.config.pluginsByKey[this.key];
          }
        }, {
          key: "getState",
          value: function getState(state) {
            return state[this.key];
          }
        }]);
        return PluginKey2;
      })();
      exports.AllSelection = AllSelection;
      exports.EditorState = EditorState;
      exports.NodeSelection = NodeSelection;
      exports.Plugin = Plugin;
      exports.PluginKey = PluginKey;
      exports.Selection = Selection;
      exports.SelectionRange = SelectionRange;
      exports.TextSelection = TextSelection;
      exports.Transaction = Transaction;
    }
  });

  // node_modules/@tiptap/pm/state/dist/index.cjs
  var require_dist5 = __commonJS({
    "node_modules/@tiptap/pm/state/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrorstate = require_dist4();
      _createStarExport(_prosemirrorstate);
    }
  });

  // node_modules/prosemirror-view/dist/index.cjs
  var require_dist6 = __commonJS({
    "node_modules/prosemirror-view/dist/index.cjs"(exports) {
      "use strict";
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i, u, a = [], f = true, o = false;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = false;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a;
        }
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F2() {
            };
            return { s: F, n: function n() {
              if (i >= o.length) return { done: true };
              return { done: false, value: o[i++] };
            }, e: function e(_e) {
              throw _e;
            }, f: F };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return { s: function s() {
          it = it.call(o);
        }, n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        }, e: function e(_e2) {
          didErr = true;
          err = _e2;
        }, f: function f() {
          try {
            if (!normalCompletion && it["return"] != null) it["return"]();
          } finally {
            if (didErr) throw err;
          }
        } };
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _get() {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get.bind();
        } else {
          _get = function _get2(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
              return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
          };
        }
        return _get.apply(this, arguments);
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null) break;
        }
        return object;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var prosemirrorState = require_dist4();
      var prosemirrorModel = require_dist2();
      var prosemirrorTransform = require_dist3();
      var domIndex = function domIndex2(node) {
        for (var index = 0; ; index++) {
          node = node.previousSibling;
          if (!node) return index;
        }
      };
      var parentNode = function parentNode2(node) {
        var parent = node.assignedSlot || node.parentNode;
        return parent && parent.nodeType == 11 ? parent.host : parent;
      };
      var reusedRange = null;
      var textRange = function textRange2(node, from, to) {
        var range = reusedRange || (reusedRange = document.createRange());
        range.setEnd(node, to == null ? node.nodeValue.length : to);
        range.setStart(node, from || 0);
        return range;
      };
      var clearReusedRange = function clearReusedRange2() {
        reusedRange = null;
      };
      var isEquivalentPosition = function isEquivalentPosition2(node, off, targetNode, targetOff) {
        return targetNode && (scanFor(node, off, targetNode, targetOff, -1) || scanFor(node, off, targetNode, targetOff, 1));
      };
      var atomElements = /^(img|br|input|textarea|hr)$/i;
      function scanFor(node, off, targetNode, targetOff, dir) {
        var _a;
        for (; ; ) {
          if (node == targetNode && off == targetOff) return true;
          if (off == (dir < 0 ? 0 : nodeSize(node))) {
            var parent = node.parentNode;
            if (!parent || parent.nodeType != 1 || hasBlockDesc(node) || atomElements.test(node.nodeName) || node.contentEditable == "false") return false;
            off = domIndex(node) + (dir < 0 ? 0 : 1);
            node = parent;
          } else if (node.nodeType == 1) {
            var child = node.childNodes[off + (dir < 0 ? -1 : 0)];
            if (child.nodeType == 1 && child.contentEditable == "false") {
              if ((_a = child.pmViewDesc) === null || _a === void 0 ? void 0 : _a.ignoreForSelection) off += dir;
              else return false;
            } else {
              node = child;
              off = dir < 0 ? nodeSize(node) : 0;
            }
          } else {
            return false;
          }
        }
      }
      function nodeSize(node) {
        return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
      }
      function textNodeBefore$1(node, offset) {
        for (; ; ) {
          if (node.nodeType == 3 && offset) return node;
          if (node.nodeType == 1 && offset > 0) {
            if (node.contentEditable == "false") return null;
            node = node.childNodes[offset - 1];
            offset = nodeSize(node);
          } else if (node.parentNode && !hasBlockDesc(node)) {
            offset = domIndex(node);
            node = node.parentNode;
          } else {
            return null;
          }
        }
      }
      function textNodeAfter$1(node, offset) {
        for (; ; ) {
          if (node.nodeType == 3 && offset < node.nodeValue.length) return node;
          if (node.nodeType == 1 && offset < node.childNodes.length) {
            if (node.contentEditable == "false") return null;
            node = node.childNodes[offset];
            offset = 0;
          } else if (node.parentNode && !hasBlockDesc(node)) {
            offset = domIndex(node) + 1;
            node = node.parentNode;
          } else {
            return null;
          }
        }
      }
      function isOnEdge(node, offset, parent) {
        for (var atStart = offset == 0, atEnd = offset == nodeSize(node); atStart || atEnd; ) {
          if (node == parent) return true;
          var index = domIndex(node);
          node = node.parentNode;
          if (!node) return false;
          atStart = atStart && index == 0;
          atEnd = atEnd && index == nodeSize(node);
        }
      }
      function hasBlockDesc(dom) {
        var desc;
        for (var cur = dom; cur; cur = cur.parentNode) if (desc = cur.pmViewDesc) break;
        return desc && desc.node && desc.node.isBlock && (desc.dom == dom || desc.contentDOM == dom);
      }
      var selectionCollapsed = function selectionCollapsed2(domSel) {
        return domSel.focusNode && isEquivalentPosition(domSel.focusNode, domSel.focusOffset, domSel.anchorNode, domSel.anchorOffset);
      };
      function keyEvent(keyCode, key) {
        var event = document.createEvent("Event");
        event.initEvent("keydown", true, true);
        event.keyCode = keyCode;
        event.key = event.code = key;
        return event;
      }
      function deepActiveElement(doc2) {
        var elt = doc2.activeElement;
        while (elt && elt.shadowRoot) elt = elt.shadowRoot.activeElement;
        return elt;
      }
      function caretFromPoint(doc2, x, y) {
        if (doc2.caretPositionFromPoint) {
          try {
            var pos = doc2.caretPositionFromPoint(x, y);
            if (pos) return {
              node: pos.offsetNode,
              offset: Math.min(nodeSize(pos.offsetNode), pos.offset)
            };
          } catch (_) {
          }
        }
        if (doc2.caretRangeFromPoint) {
          var range = doc2.caretRangeFromPoint(x, y);
          if (range) return {
            node: range.startContainer,
            offset: Math.min(nodeSize(range.startContainer), range.startOffset)
          };
        }
      }
      var nav = typeof navigator != "undefined" ? navigator : null;
      var doc = typeof document != "undefined" ? document : null;
      var agent = nav && nav.userAgent || "";
      var ie_edge = /Edge\/(\d+)/.exec(agent);
      var ie_upto10 = /MSIE \d/.exec(agent);
      var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(agent);
      var ie = !!(ie_upto10 || ie_11up || ie_edge);
      var ie_version = ie_upto10 ? document.documentMode : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : 0;
      var gecko = !ie && /gecko\/(\d+)/i.test(agent);
      gecko && +(/Firefox\/(\d+)/.exec(agent) || [0, 0])[1];
      var _chrome = !ie && /Chrome\/(\d+)/.exec(agent);
      var chrome = !!_chrome;
      var chrome_version = _chrome ? +_chrome[1] : 0;
      var safari = !ie && !!nav && /Apple Computer/.test(nav.vendor);
      var ios = safari && (/Mobile\/\w+/.test(agent) || !!nav && nav.maxTouchPoints > 2);
      var mac = ios || (nav ? /Mac/.test(nav.platform) : false);
      var windows = nav ? /Win/.test(nav.platform) : false;
      var android = /Android \d/.test(agent);
      var webkit = !!doc && "webkitFontSmoothing" in doc.documentElement.style;
      var webkit_version = webkit ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
      function windowRect(doc2) {
        var vp = doc2.defaultView && doc2.defaultView.visualViewport;
        if (vp) return {
          left: 0,
          right: vp.width,
          top: 0,
          bottom: vp.height
        };
        return {
          left: 0,
          right: doc2.documentElement.clientWidth,
          top: 0,
          bottom: doc2.documentElement.clientHeight
        };
      }
      function getSide(value, side) {
        return typeof value == "number" ? value : value[side];
      }
      function clientRect(node) {
        var rect = node.getBoundingClientRect();
        var scaleX = rect.width / node.offsetWidth || 1;
        var scaleY = rect.height / node.offsetHeight || 1;
        return {
          left: rect.left,
          right: rect.left + node.clientWidth * scaleX,
          top: rect.top,
          bottom: rect.top + node.clientHeight * scaleY
        };
      }
      function scrollRectIntoView(view, rect, startDOM) {
        var scrollThreshold = view.someProp("scrollThreshold") || 0, scrollMargin = view.someProp("scrollMargin") || 5;
        var doc2 = view.dom.ownerDocument;
        for (var parent = startDOM || view.dom; ; ) {
          if (!parent) break;
          if (parent.nodeType != 1) {
            parent = parentNode(parent);
            continue;
          }
          var elt = parent;
          var atTop = elt == doc2.body;
          var bounding = atTop ? windowRect(doc2) : clientRect(elt);
          var moveX = 0, moveY = 0;
          if (rect.top < bounding.top + getSide(scrollThreshold, "top")) moveY = -(bounding.top - rect.top + getSide(scrollMargin, "top"));
          else if (rect.bottom > bounding.bottom - getSide(scrollThreshold, "bottom")) moveY = rect.bottom - rect.top > bounding.bottom - bounding.top ? rect.top + getSide(scrollMargin, "top") - bounding.top : rect.bottom - bounding.bottom + getSide(scrollMargin, "bottom");
          if (rect.left < bounding.left + getSide(scrollThreshold, "left")) moveX = -(bounding.left - rect.left + getSide(scrollMargin, "left"));
          else if (rect.right > bounding.right - getSide(scrollThreshold, "right")) moveX = rect.right - bounding.right + getSide(scrollMargin, "right");
          if (moveX || moveY) {
            if (atTop) {
              doc2.defaultView.scrollBy(moveX, moveY);
            } else {
              var startX = elt.scrollLeft, startY = elt.scrollTop;
              if (moveY) elt.scrollTop += moveY;
              if (moveX) elt.scrollLeft += moveX;
              var dX = elt.scrollLeft - startX, dY = elt.scrollTop - startY;
              rect = {
                left: rect.left - dX,
                top: rect.top - dY,
                right: rect.right - dX,
                bottom: rect.bottom - dY
              };
            }
          }
          var pos = atTop ? "fixed" : getComputedStyle(parent).position;
          if (/^(fixed|sticky)$/.test(pos)) break;
          parent = pos == "absolute" ? parent.offsetParent : parentNode(parent);
        }
      }
      function storeScrollPos(view) {
        var rect = view.dom.getBoundingClientRect(), startY = Math.max(0, rect.top);
        var refDOM, refTop;
        for (var x = (rect.left + rect.right) / 2, y = startY + 1; y < Math.min(innerHeight, rect.bottom); y += 5) {
          var dom = view.root.elementFromPoint(x, y);
          if (!dom || dom == view.dom || !view.dom.contains(dom)) continue;
          var localRect = dom.getBoundingClientRect();
          if (localRect.top >= startY - 20) {
            refDOM = dom;
            refTop = localRect.top;
            break;
          }
        }
        return {
          refDOM,
          refTop,
          stack: scrollStack(view.dom)
        };
      }
      function scrollStack(dom) {
        var stack = [], doc2 = dom.ownerDocument;
        for (var cur = dom; cur; cur = parentNode(cur)) {
          stack.push({
            dom: cur,
            top: cur.scrollTop,
            left: cur.scrollLeft
          });
          if (dom == doc2) break;
        }
        return stack;
      }
      function resetScrollPos(_ref) {
        var refDOM = _ref.refDOM, refTop = _ref.refTop, stack = _ref.stack;
        var newRefTop = refDOM ? refDOM.getBoundingClientRect().top : 0;
        restoreScrollStack(stack, newRefTop == 0 ? 0 : newRefTop - refTop);
      }
      function restoreScrollStack(stack, dTop) {
        for (var i = 0; i < stack.length; i++) {
          var _stack$i = stack[i], dom = _stack$i.dom, top = _stack$i.top, left = _stack$i.left;
          if (dom.scrollTop != top + dTop) dom.scrollTop = top + dTop;
          if (dom.scrollLeft != left) dom.scrollLeft = left;
        }
      }
      var preventScrollSupported = null;
      function focusPreventScroll(dom) {
        if (dom.setActive) return dom.setActive();
        if (preventScrollSupported) return dom.focus(preventScrollSupported);
        var stored = scrollStack(dom);
        dom.focus(preventScrollSupported == null ? {
          get preventScroll() {
            preventScrollSupported = {
              preventScroll: true
            };
            return true;
          }
        } : void 0);
        if (!preventScrollSupported) {
          preventScrollSupported = false;
          restoreScrollStack(stored, 0);
        }
      }
      function findOffsetInNode(node, coords) {
        var closest, dxClosest = 2e8, coordsClosest, offset = 0;
        var rowBot = coords.top, rowTop = coords.top;
        var firstBelow, coordsBelow;
        for (var child = node.firstChild, childIndex = 0; child; child = child.nextSibling, childIndex++) {
          var rects = void 0;
          if (child.nodeType == 1) rects = child.getClientRects();
          else if (child.nodeType == 3) rects = textRange(child).getClientRects();
          else continue;
          for (var i = 0; i < rects.length; i++) {
            var rect = rects[i];
            if (rect.top <= rowBot && rect.bottom >= rowTop) {
              rowBot = Math.max(rect.bottom, rowBot);
              rowTop = Math.min(rect.top, rowTop);
              var dx = rect.left > coords.left ? rect.left - coords.left : rect.right < coords.left ? coords.left - rect.right : 0;
              if (dx < dxClosest) {
                closest = child;
                dxClosest = dx;
                coordsClosest = dx && closest.nodeType == 3 ? {
                  left: rect.right < coords.left ? rect.right : rect.left,
                  top: coords.top
                } : coords;
                if (child.nodeType == 1 && dx) offset = childIndex + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0);
                continue;
              }
            } else if (rect.top > coords.top && !firstBelow && rect.left <= coords.left && rect.right >= coords.left) {
              firstBelow = child;
              coordsBelow = {
                left: Math.max(rect.left, Math.min(rect.right, coords.left)),
                top: rect.top
              };
            }
            if (!closest && (coords.left >= rect.right && coords.top >= rect.top || coords.left >= rect.left && coords.top >= rect.bottom)) offset = childIndex + 1;
          }
        }
        if (!closest && firstBelow) {
          closest = firstBelow;
          coordsClosest = coordsBelow;
          dxClosest = 0;
        }
        if (closest && closest.nodeType == 3) return findOffsetInText(closest, coordsClosest);
        if (!closest || dxClosest && closest.nodeType == 1) return {
          node,
          offset
        };
        return findOffsetInNode(closest, coordsClosest);
      }
      function findOffsetInText(node, coords) {
        var len = node.nodeValue.length;
        var range = document.createRange();
        for (var i = 0; i < len; i++) {
          range.setEnd(node, i + 1);
          range.setStart(node, i);
          var rect = singleRect(range, 1);
          if (rect.top == rect.bottom) continue;
          if (inRect(coords, rect)) return {
            node,
            offset: i + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0)
          };
        }
        return {
          node,
          offset: 0
        };
      }
      function inRect(coords, rect) {
        return coords.left >= rect.left - 1 && coords.left <= rect.right + 1 && coords.top >= rect.top - 1 && coords.top <= rect.bottom + 1;
      }
      function targetKludge(dom, coords) {
        var parent = dom.parentNode;
        if (parent && /^li$/i.test(parent.nodeName) && coords.left < dom.getBoundingClientRect().left) return parent;
        return dom;
      }
      function posFromElement(view, elt, coords) {
        var _findOffsetInNode = findOffsetInNode(elt, coords), node = _findOffsetInNode.node, offset = _findOffsetInNode.offset, bias = -1;
        if (node.nodeType == 1 && !node.firstChild) {
          var rect = node.getBoundingClientRect();
          bias = rect.left != rect.right && coords.left > (rect.left + rect.right) / 2 ? 1 : -1;
        }
        return view.docView.posFromDOM(node, offset, bias);
      }
      function posFromCaret(view, node, offset, coords) {
        var outsideBlock = -1;
        for (var cur = node, sawBlock = false; ; ) {
          if (cur == view.dom) break;
          var desc = view.docView.nearestDesc(cur, true), rect = void 0;
          if (!desc) return null;
          if (desc.dom.nodeType == 1 && (desc.node.isBlock && desc.parent || !desc.contentDOM) && ((rect = desc.dom.getBoundingClientRect()).width || rect.height)) {
            if (desc.node.isBlock && desc.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(desc.dom.nodeName)) {
              if (!sawBlock && rect.left > coords.left || rect.top > coords.top) outsideBlock = desc.posBefore;
              else if (!sawBlock && rect.right < coords.left || rect.bottom < coords.top) outsideBlock = desc.posAfter;
              sawBlock = true;
            }
            if (!desc.contentDOM && outsideBlock < 0 && !desc.node.isText) {
              var before = desc.node.isBlock ? coords.top < (rect.top + rect.bottom) / 2 : coords.left < (rect.left + rect.right) / 2;
              return before ? desc.posBefore : desc.posAfter;
            }
          }
          cur = desc.dom.parentNode;
        }
        return outsideBlock > -1 ? outsideBlock : view.docView.posFromDOM(node, offset, -1);
      }
      function elementFromPoint(element, coords, box) {
        var len = element.childNodes.length;
        if (len && box.top < box.bottom) {
          for (var startI = Math.max(0, Math.min(len - 1, Math.floor(len * (coords.top - box.top) / (box.bottom - box.top)) - 2)), i = startI; ; ) {
            var child = element.childNodes[i];
            if (child.nodeType == 1) {
              var rects = child.getClientRects();
              for (var j = 0; j < rects.length; j++) {
                var rect = rects[j];
                if (inRect(coords, rect)) return elementFromPoint(child, coords, rect);
              }
            }
            if ((i = (i + 1) % len) == startI) break;
          }
        }
        return element;
      }
      function _posAtCoords(view, coords) {
        var doc2 = view.dom.ownerDocument, node, offset = 0;
        var caret = caretFromPoint(doc2, coords.left, coords.top);
        if (caret) {
          node = caret.node;
          offset = caret.offset;
        }
        var elt = (view.root.elementFromPoint ? view.root : doc2).elementFromPoint(coords.left, coords.top);
        var pos;
        if (!elt || !view.dom.contains(elt.nodeType != 1 ? elt.parentNode : elt)) {
          var box = view.dom.getBoundingClientRect();
          if (!inRect(coords, box)) return null;
          elt = elementFromPoint(view.dom, coords, box);
          if (!elt) return null;
        }
        if (safari) {
          for (var p = elt; node && p; p = parentNode(p)) if (p.draggable) node = void 0;
        }
        elt = targetKludge(elt, coords);
        if (node) {
          if (gecko && node.nodeType == 1) {
            offset = Math.min(offset, node.childNodes.length);
            if (offset < node.childNodes.length) {
              var next = node.childNodes[offset], _box;
              if (next.nodeName == "IMG" && (_box = next.getBoundingClientRect()).right <= coords.left && _box.bottom > coords.top) offset++;
            }
          }
          var prev;
          if (webkit && offset && node.nodeType == 1 && (prev = node.childNodes[offset - 1]).nodeType == 1 && prev.contentEditable == "false" && prev.getBoundingClientRect().top >= coords.top) offset--;
          if (node == view.dom && offset == node.childNodes.length - 1 && node.lastChild.nodeType == 1 && coords.top > node.lastChild.getBoundingClientRect().bottom) pos = view.state.doc.content.size;
          else if (offset == 0 || node.nodeType != 1 || node.childNodes[offset - 1].nodeName != "BR") pos = posFromCaret(view, node, offset, coords);
        }
        if (pos == null) pos = posFromElement(view, elt, coords);
        var desc = view.docView.nearestDesc(elt, true);
        return {
          pos,
          inside: desc ? desc.posAtStart - desc.border : -1
        };
      }
      function nonZero(rect) {
        return rect.top < rect.bottom || rect.left < rect.right;
      }
      function singleRect(target, bias) {
        var rects = target.getClientRects();
        if (rects.length) {
          var first = rects[bias < 0 ? 0 : rects.length - 1];
          if (nonZero(first)) return first;
        }
        return Array.prototype.find.call(rects, nonZero) || target.getBoundingClientRect();
      }
      var BIDI = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
      function _coordsAtPos(view, pos, side) {
        var _view$docView$domFrom = view.docView.domFromPos(pos, side < 0 ? -1 : 1), node = _view$docView$domFrom.node, offset = _view$docView$domFrom.offset, atom = _view$docView$domFrom.atom;
        var supportEmptyRange = webkit || gecko;
        if (node.nodeType == 3) {
          if (supportEmptyRange && (BIDI.test(node.nodeValue) || (side < 0 ? !offset : offset == node.nodeValue.length))) {
            var rect = singleRect(textRange(node, offset, offset), side);
            if (gecko && offset && /\s/.test(node.nodeValue[offset - 1]) && offset < node.nodeValue.length) {
              var rectBefore = singleRect(textRange(node, offset - 1, offset - 1), -1);
              if (rectBefore.top == rect.top) {
                var rectAfter = singleRect(textRange(node, offset, offset + 1), -1);
                if (rectAfter.top != rect.top) return flattenV(rectAfter, rectAfter.left < rectBefore.left);
              }
            }
            return rect;
          } else {
            var from = offset, to = offset, takeSide = side < 0 ? 1 : -1;
            if (side < 0 && !offset) {
              to++;
              takeSide = -1;
            } else if (side >= 0 && offset == node.nodeValue.length) {
              from--;
              takeSide = 1;
            } else if (side < 0) {
              from--;
            } else {
              to++;
            }
            return flattenV(singleRect(textRange(node, from, to), takeSide), takeSide < 0);
          }
        }
        var $dom = view.state.doc.resolve(pos - (atom || 0));
        if (!$dom.parent.inlineContent) {
          if (atom == null && offset && (side < 0 || offset == nodeSize(node))) {
            var before = node.childNodes[offset - 1];
            if (before.nodeType == 1) return flattenH(before.getBoundingClientRect(), false);
          }
          if (atom == null && offset < nodeSize(node)) {
            var after = node.childNodes[offset];
            if (after.nodeType == 1) return flattenH(after.getBoundingClientRect(), true);
          }
          return flattenH(node.getBoundingClientRect(), side >= 0);
        }
        if (atom == null && offset && (side < 0 || offset == nodeSize(node))) {
          var _before = node.childNodes[offset - 1];
          var target = _before.nodeType == 3 ? textRange(_before, nodeSize(_before) - (supportEmptyRange ? 0 : 1)) : _before.nodeType == 1 && (_before.nodeName != "BR" || !_before.nextSibling) ? _before : null;
          if (target) return flattenV(singleRect(target, 1), false);
        }
        if (atom == null && offset < nodeSize(node)) {
          var _after = node.childNodes[offset];
          while (_after.pmViewDesc && _after.pmViewDesc.ignoreForCoords) _after = _after.nextSibling;
          var _target = !_after ? null : _after.nodeType == 3 ? textRange(_after, 0, supportEmptyRange ? 0 : 1) : _after.nodeType == 1 ? _after : null;
          if (_target) return flattenV(singleRect(_target, -1), true);
        }
        return flattenV(singleRect(node.nodeType == 3 ? textRange(node) : node, -side), side >= 0);
      }
      function flattenV(rect, left) {
        if (rect.width == 0) return rect;
        var x = left ? rect.left : rect.right;
        return {
          top: rect.top,
          bottom: rect.bottom,
          left: x,
          right: x
        };
      }
      function flattenH(rect, top) {
        if (rect.height == 0) return rect;
        var y = top ? rect.top : rect.bottom;
        return {
          top: y,
          bottom: y,
          left: rect.left,
          right: rect.right
        };
      }
      function withFlushedState(view, state, f) {
        var viewState = view.state, active = view.root.activeElement;
        if (viewState != state) view.updateState(state);
        if (active != view.dom) view.focus();
        try {
          return f();
        } finally {
          if (viewState != state) view.updateState(viewState);
          if (active != view.dom && active) active.focus();
        }
      }
      function endOfTextblockVertical(view, state, dir) {
        var sel = state.selection;
        var $pos = dir == "up" ? sel.$from : sel.$to;
        return withFlushedState(view, state, function() {
          var _view$docView$domFrom2 = view.docView.domFromPos($pos.pos, dir == "up" ? -1 : 1), dom = _view$docView$domFrom2.node;
          for (; ; ) {
            var nearest = view.docView.nearestDesc(dom, true);
            if (!nearest) break;
            if (nearest.node.isBlock) {
              dom = nearest.contentDOM || nearest.dom;
              break;
            }
            dom = nearest.dom.parentNode;
          }
          var coords = _coordsAtPos(view, $pos.pos, 1);
          for (var child = dom.firstChild; child; child = child.nextSibling) {
            var boxes = void 0;
            if (child.nodeType == 1) boxes = child.getClientRects();
            else if (child.nodeType == 3) boxes = textRange(child, 0, child.nodeValue.length).getClientRects();
            else continue;
            for (var i = 0; i < boxes.length; i++) {
              var box = boxes[i];
              if (box.bottom > box.top + 1 && (dir == "up" ? coords.top - box.top > (box.bottom - coords.top) * 2 : box.bottom - coords.bottom > (coords.bottom - box.top) * 2)) return false;
            }
          }
          return true;
        });
      }
      var maybeRTL = /[\u0590-\u08ac]/;
      function endOfTextblockHorizontal(view, state, dir) {
        var $head = state.selection.$head;
        if (!$head.parent.isTextblock) return false;
        var offset = $head.parentOffset, atStart = !offset, atEnd = offset == $head.parent.content.size;
        var sel = view.domSelection();
        if (!sel) return $head.pos == $head.start() || $head.pos == $head.end();
        if (!maybeRTL.test($head.parent.textContent) || !sel.modify) return dir == "left" || dir == "backward" ? atStart : atEnd;
        return withFlushedState(view, state, function() {
          var _view$domSelectionRan = view.domSelectionRange(), oldNode = _view$domSelectionRan.focusNode, oldOff = _view$domSelectionRan.focusOffset, anchorNode = _view$domSelectionRan.anchorNode, anchorOffset = _view$domSelectionRan.anchorOffset;
          var oldBidiLevel = sel.caretBidiLevel;
          sel.modify("move", dir, "character");
          var parentDOM = $head.depth ? view.docView.domAfterPos($head.before()) : view.dom;
          var _view$domSelectionRan2 = view.domSelectionRange(), newNode = _view$domSelectionRan2.focusNode, newOff = _view$domSelectionRan2.focusOffset;
          var result = newNode && !parentDOM.contains(newNode.nodeType == 1 ? newNode : newNode.parentNode) || oldNode == newNode && oldOff == newOff;
          try {
            sel.collapse(anchorNode, anchorOffset);
            if (oldNode && (oldNode != anchorNode || oldOff != anchorOffset) && sel.extend) sel.extend(oldNode, oldOff);
          } catch (_) {
          }
          if (oldBidiLevel != null) sel.caretBidiLevel = oldBidiLevel;
          return result;
        });
      }
      var cachedState = null;
      var cachedDir = null;
      var cachedResult = false;
      function _endOfTextblock(view, state, dir) {
        if (cachedState == state && cachedDir == dir) return cachedResult;
        cachedState = state;
        cachedDir = dir;
        return cachedResult = dir == "up" || dir == "down" ? endOfTextblockVertical(view, state, dir) : endOfTextblockHorizontal(view, state, dir);
      }
      var NOT_DIRTY = 0;
      var CHILD_DIRTY = 1;
      var CONTENT_DIRTY = 2;
      var NODE_DIRTY = 3;
      var ViewDesc = (function() {
        function ViewDesc2(parent, children, dom, contentDOM) {
          _classCallCheck(this, ViewDesc2);
          this.parent = parent;
          this.children = children;
          this.dom = dom;
          this.contentDOM = contentDOM;
          this.dirty = NOT_DIRTY;
          dom.pmViewDesc = this;
        }
        _createClass(ViewDesc2, [{
          key: "matchesWidget",
          value: function matchesWidget(widget) {
            return false;
          }
        }, {
          key: "matchesMark",
          value: function matchesMark(mark) {
            return false;
          }
        }, {
          key: "matchesNode",
          value: function matchesNode(node, outerDeco, innerDeco) {
            return false;
          }
        }, {
          key: "matchesHack",
          value: function matchesHack(nodeName) {
            return false;
          }
        }, {
          key: "parseRule",
          value: function parseRule() {
            return null;
          }
        }, {
          key: "stopEvent",
          value: function stopEvent(event) {
            return false;
          }
        }, {
          key: "size",
          get: function get() {
            var size = 0;
            for (var i = 0; i < this.children.length; i++) size += this.children[i].size;
            return size;
          }
        }, {
          key: "border",
          get: function get() {
            return 0;
          }
        }, {
          key: "destroy",
          value: function destroy() {
            this.parent = void 0;
            if (this.dom.pmViewDesc == this) this.dom.pmViewDesc = void 0;
            for (var i = 0; i < this.children.length; i++) this.children[i].destroy();
          }
        }, {
          key: "posBeforeChild",
          value: function posBeforeChild(child) {
            for (var i = 0, pos = this.posAtStart; ; i++) {
              var cur = this.children[i];
              if (cur == child) return pos;
              pos += cur.size;
            }
          }
        }, {
          key: "posBefore",
          get: function get() {
            return this.parent.posBeforeChild(this);
          }
        }, {
          key: "posAtStart",
          get: function get() {
            return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
          }
        }, {
          key: "posAfter",
          get: function get() {
            return this.posBefore + this.size;
          }
        }, {
          key: "posAtEnd",
          get: function get() {
            return this.posAtStart + this.size - 2 * this.border;
          }
        }, {
          key: "localPosFromDOM",
          value: function localPosFromDOM(dom, offset, bias) {
            if (this.contentDOM && this.contentDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode)) {
              if (bias < 0) {
                var domBefore, desc;
                if (dom == this.contentDOM) {
                  domBefore = dom.childNodes[offset - 1];
                } else {
                  while (dom.parentNode != this.contentDOM) dom = dom.parentNode;
                  domBefore = dom.previousSibling;
                }
                while (domBefore && !((desc = domBefore.pmViewDesc) && desc.parent == this)) domBefore = domBefore.previousSibling;
                return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart;
              } else {
                var domAfter, _desc;
                if (dom == this.contentDOM) {
                  domAfter = dom.childNodes[offset];
                } else {
                  while (dom.parentNode != this.contentDOM) dom = dom.parentNode;
                  domAfter = dom.nextSibling;
                }
                while (domAfter && !((_desc = domAfter.pmViewDesc) && _desc.parent == this)) domAfter = domAfter.nextSibling;
                return domAfter ? this.posBeforeChild(_desc) : this.posAtEnd;
              }
            }
            var atEnd;
            if (dom == this.dom && this.contentDOM) {
              atEnd = offset > domIndex(this.contentDOM);
            } else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
              atEnd = dom.compareDocumentPosition(this.contentDOM) & 2;
            } else if (this.dom.firstChild) {
              if (offset == 0) for (var search = dom; ; search = search.parentNode) {
                if (search == this.dom) {
                  atEnd = false;
                  break;
                }
                if (search.previousSibling) break;
              }
              if (atEnd == null && offset == dom.childNodes.length) for (var _search = dom; ; _search = _search.parentNode) {
                if (_search == this.dom) {
                  atEnd = true;
                  break;
                }
                if (_search.nextSibling) break;
              }
            }
            return (atEnd == null ? bias > 0 : atEnd) ? this.posAtEnd : this.posAtStart;
          }
        }, {
          key: "nearestDesc",
          value: function nearestDesc(dom) {
            var onlyNodes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
            for (var first = true, cur = dom; cur; cur = cur.parentNode) {
              var desc = this.getDesc(cur), nodeDOM = void 0;
              if (desc && (!onlyNodes || desc.node)) {
                if (first && (nodeDOM = desc.nodeDOM) && !(nodeDOM.nodeType == 1 ? nodeDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode) : nodeDOM == dom)) first = false;
                else return desc;
              }
            }
          }
        }, {
          key: "getDesc",
          value: function getDesc(dom) {
            var desc = dom.pmViewDesc;
            for (var cur = desc; cur; cur = cur.parent) if (cur == this) return desc;
          }
        }, {
          key: "posFromDOM",
          value: function posFromDOM(dom, offset, bias) {
            for (var scan = dom; scan; scan = scan.parentNode) {
              var desc = this.getDesc(scan);
              if (desc) return desc.localPosFromDOM(dom, offset, bias);
            }
            return -1;
          }
        }, {
          key: "descAt",
          value: function descAt(pos) {
            for (var i = 0, offset = 0; i < this.children.length; i++) {
              var child = this.children[i], end = offset + child.size;
              if (offset == pos && end != offset) {
                while (!child.border && child.children.length) {
                  for (var _i = 0; _i < child.children.length; _i++) {
                    var inner = child.children[_i];
                    if (inner.size) {
                      child = inner;
                      break;
                    }
                  }
                }
                return child;
              }
              if (pos < end) return child.descAt(pos - offset - child.border);
              offset = end;
            }
          }
        }, {
          key: "domFromPos",
          value: function domFromPos(pos, side) {
            if (!this.contentDOM) return {
              node: this.dom,
              offset: 0,
              atom: pos + 1
            };
            var i = 0, offset = 0;
            for (var curPos = 0; i < this.children.length; i++) {
              var child = this.children[i], end = curPos + child.size;
              if (end > pos || child instanceof TrailingHackViewDesc) {
                offset = pos - curPos;
                break;
              }
              curPos = end;
            }
            if (offset) return this.children[i].domFromPos(offset - this.children[i].border, side);
            for (var prev; i && !(prev = this.children[i - 1]).size && prev instanceof WidgetViewDesc && prev.side >= 0; i--) {
            }
            if (side <= 0) {
              var _prev, enter = true;
              for (; ; i--, enter = false) {
                _prev = i ? this.children[i - 1] : null;
                if (!_prev || _prev.dom.parentNode == this.contentDOM) break;
              }
              if (_prev && side && enter && !_prev.border && !_prev.domAtom) return _prev.domFromPos(_prev.size, side);
              return {
                node: this.contentDOM,
                offset: _prev ? domIndex(_prev.dom) + 1 : 0
              };
            } else {
              var next, _enter = true;
              for (; ; i++, _enter = false) {
                next = i < this.children.length ? this.children[i] : null;
                if (!next || next.dom.parentNode == this.contentDOM) break;
              }
              if (next && _enter && !next.border && !next.domAtom) return next.domFromPos(0, side);
              return {
                node: this.contentDOM,
                offset: next ? domIndex(next.dom) : this.contentDOM.childNodes.length
              };
            }
          }
        }, {
          key: "parseRange",
          value: function parseRange(from, to) {
            var base = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
            if (this.children.length == 0) return {
              node: this.contentDOM,
              from,
              to,
              fromOffset: 0,
              toOffset: this.contentDOM.childNodes.length
            };
            var fromOffset = -1, toOffset = -1;
            for (var offset = base, i = 0; ; i++) {
              var child = this.children[i], end = offset + child.size;
              if (fromOffset == -1 && from <= end) {
                var childBase = offset + child.border;
                if (from >= childBase && to <= end - child.border && child.node && child.contentDOM && this.contentDOM.contains(child.contentDOM)) return child.parseRange(from, to, childBase);
                from = offset;
                for (var j = i; j > 0; j--) {
                  var prev = this.children[j - 1];
                  if (prev.size && prev.dom.parentNode == this.contentDOM && !prev.emptyChildAt(1)) {
                    fromOffset = domIndex(prev.dom) + 1;
                    break;
                  }
                  from -= prev.size;
                }
                if (fromOffset == -1) fromOffset = 0;
              }
              if (fromOffset > -1 && (end > to || i == this.children.length - 1)) {
                to = end;
                for (var _j = i + 1; _j < this.children.length; _j++) {
                  var next = this.children[_j];
                  if (next.size && next.dom.parentNode == this.contentDOM && !next.emptyChildAt(-1)) {
                    toOffset = domIndex(next.dom);
                    break;
                  }
                  to += next.size;
                }
                if (toOffset == -1) toOffset = this.contentDOM.childNodes.length;
                break;
              }
              offset = end;
            }
            return {
              node: this.contentDOM,
              from,
              to,
              fromOffset,
              toOffset
            };
          }
        }, {
          key: "emptyChildAt",
          value: function emptyChildAt(side) {
            if (this.border || !this.contentDOM || !this.children.length) return false;
            var child = this.children[side < 0 ? 0 : this.children.length - 1];
            return child.size == 0 || child.emptyChildAt(side);
          }
        }, {
          key: "domAfterPos",
          value: function domAfterPos(pos) {
            var _this$domFromPos = this.domFromPos(pos, 0), node = _this$domFromPos.node, offset = _this$domFromPos.offset;
            if (node.nodeType != 1 || offset == node.childNodes.length) throw new RangeError("No node after pos " + pos);
            return node.childNodes[offset];
          }
        }, {
          key: "setSelection",
          value: function setSelection(anchor, head, view) {
            var force = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
            var from = Math.min(anchor, head), to = Math.max(anchor, head);
            for (var i = 0, offset = 0; i < this.children.length; i++) {
              var child = this.children[i], end = offset + child.size;
              if (from > offset && to < end) return child.setSelection(anchor - offset - child.border, head - offset - child.border, view, force);
              offset = end;
            }
            var anchorDOM = this.domFromPos(anchor, anchor ? -1 : 1);
            var headDOM = head == anchor ? anchorDOM : this.domFromPos(head, head ? -1 : 1);
            var domSel = view.root.getSelection();
            var selRange = view.domSelectionRange();
            var brKludge = false;
            if ((gecko || safari) && anchor == head) {
              var _anchorDOM = anchorDOM, node = _anchorDOM.node, _offset = _anchorDOM.offset;
              if (node.nodeType == 3) {
                brKludge = !!(_offset && node.nodeValue[_offset - 1] == "\n");
                if (brKludge && _offset == node.nodeValue.length) {
                  for (var scan = node, after; scan; scan = scan.parentNode) {
                    if (after = scan.nextSibling) {
                      if (after.nodeName == "BR") anchorDOM = headDOM = {
                        node: after.parentNode,
                        offset: domIndex(after) + 1
                      };
                      break;
                    }
                    var desc = scan.pmViewDesc;
                    if (desc && desc.node && desc.node.isBlock) break;
                  }
                }
              } else {
                var prev = node.childNodes[_offset - 1];
                brKludge = prev && (prev.nodeName == "BR" || prev.contentEditable == "false");
              }
            }
            if (gecko && selRange.focusNode && selRange.focusNode != headDOM.node && selRange.focusNode.nodeType == 1) {
              var _after2 = selRange.focusNode.childNodes[selRange.focusOffset];
              if (_after2 && _after2.contentEditable == "false") force = true;
            }
            if (!(force || brKludge && safari) && isEquivalentPosition(anchorDOM.node, anchorDOM.offset, selRange.anchorNode, selRange.anchorOffset) && isEquivalentPosition(headDOM.node, headDOM.offset, selRange.focusNode, selRange.focusOffset)) return;
            var domSelExtended = false;
            if ((domSel.extend || anchor == head) && !(brKludge && gecko)) {
              domSel.collapse(anchorDOM.node, anchorDOM.offset);
              try {
                if (anchor != head) domSel.extend(headDOM.node, headDOM.offset);
                domSelExtended = true;
              } catch (_) {
              }
            }
            if (!domSelExtended) {
              if (anchor > head) {
                var tmp = anchorDOM;
                anchorDOM = headDOM;
                headDOM = tmp;
              }
              var range = document.createRange();
              range.setEnd(headDOM.node, headDOM.offset);
              range.setStart(anchorDOM.node, anchorDOM.offset);
              domSel.removeAllRanges();
              domSel.addRange(range);
            }
          }
        }, {
          key: "ignoreMutation",
          value: function ignoreMutation(mutation) {
            return !this.contentDOM && mutation.type != "selection";
          }
        }, {
          key: "contentLost",
          get: function get() {
            return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
          }
        }, {
          key: "markDirty",
          value: function markDirty(from, to) {
            for (var offset = 0, i = 0; i < this.children.length; i++) {
              var child = this.children[i], end = offset + child.size;
              if (offset == end ? from <= end && to >= offset : from < end && to > offset) {
                var startInside = offset + child.border, endInside = end - child.border;
                if (from >= startInside && to <= endInside) {
                  this.dirty = from == offset || to == end ? CONTENT_DIRTY : CHILD_DIRTY;
                  if (from == startInside && to == endInside && (child.contentLost || child.dom.parentNode != this.contentDOM)) child.dirty = NODE_DIRTY;
                  else child.markDirty(from - startInside, to - startInside);
                  return;
                } else {
                  child.dirty = child.dom == child.contentDOM && child.dom.parentNode == this.contentDOM && !child.children.length ? CONTENT_DIRTY : NODE_DIRTY;
                }
              }
              offset = end;
            }
            this.dirty = CONTENT_DIRTY;
          }
        }, {
          key: "markParentsDirty",
          value: function markParentsDirty() {
            var level = 1;
            for (var node = this.parent; node; node = node.parent, level++) {
              var dirty = level == 1 ? CONTENT_DIRTY : CHILD_DIRTY;
              if (node.dirty < dirty) node.dirty = dirty;
            }
          }
        }, {
          key: "domAtom",
          get: function get() {
            return false;
          }
        }, {
          key: "ignoreForCoords",
          get: function get() {
            return false;
          }
        }, {
          key: "ignoreForSelection",
          get: function get() {
            return false;
          }
        }, {
          key: "isText",
          value: function isText(text) {
            return false;
          }
        }]);
        return ViewDesc2;
      })();
      var WidgetViewDesc = (function(_ViewDesc) {
        _inherits(WidgetViewDesc2, _ViewDesc);
        var _super = _createSuper(WidgetViewDesc2);
        function WidgetViewDesc2(parent, widget, view, pos) {
          var _this;
          _classCallCheck(this, WidgetViewDesc2);
          var self, dom = widget.type.toDOM;
          if (typeof dom == "function") dom = dom(view, function() {
            if (!self) return pos;
            if (self.parent) return self.parent.posBeforeChild(self);
          });
          if (!widget.type.spec.raw) {
            if (dom.nodeType != 1) {
              var wrap = document.createElement("span");
              wrap.appendChild(dom);
              dom = wrap;
            }
            dom.contentEditable = "false";
            dom.classList.add("ProseMirror-widget");
          }
          _this = _super.call(this, parent, [], dom, null);
          _this.widget = widget;
          _this.widget = widget;
          self = _assertThisInitialized(_this);
          return _this;
        }
        _createClass(WidgetViewDesc2, [{
          key: "matchesWidget",
          value: function matchesWidget(widget) {
            return this.dirty == NOT_DIRTY && widget.type.eq(this.widget.type);
          }
        }, {
          key: "parseRule",
          value: function parseRule() {
            return {
              ignore: true
            };
          }
        }, {
          key: "stopEvent",
          value: function stopEvent(event) {
            var stop = this.widget.spec.stopEvent;
            return stop ? stop(event) : false;
          }
        }, {
          key: "ignoreMutation",
          value: function ignoreMutation(mutation) {
            return mutation.type != "selection" || this.widget.spec.ignoreSelection;
          }
        }, {
          key: "destroy",
          value: function destroy() {
            this.widget.type.destroy(this.dom);
            _get(_getPrototypeOf(WidgetViewDesc2.prototype), "destroy", this).call(this);
          }
        }, {
          key: "domAtom",
          get: function get() {
            return true;
          }
        }, {
          key: "ignoreForSelection",
          get: function get() {
            return !!this.widget.type.spec.relaxedSide;
          }
        }, {
          key: "side",
          get: function get() {
            return this.widget.type.side;
          }
        }]);
        return WidgetViewDesc2;
      })(ViewDesc);
      var CompositionViewDesc = (function(_ViewDesc2) {
        _inherits(CompositionViewDesc2, _ViewDesc2);
        var _super2 = _createSuper(CompositionViewDesc2);
        function CompositionViewDesc2(parent, dom, textDOM, text) {
          var _this2;
          _classCallCheck(this, CompositionViewDesc2);
          _this2 = _super2.call(this, parent, [], dom, null);
          _this2.textDOM = textDOM;
          _this2.text = text;
          return _this2;
        }
        _createClass(CompositionViewDesc2, [{
          key: "size",
          get: function get() {
            return this.text.length;
          }
        }, {
          key: "localPosFromDOM",
          value: function localPosFromDOM(dom, offset) {
            if (dom != this.textDOM) return this.posAtStart + (offset ? this.size : 0);
            return this.posAtStart + offset;
          }
        }, {
          key: "domFromPos",
          value: function domFromPos(pos) {
            return {
              node: this.textDOM,
              offset: pos
            };
          }
        }, {
          key: "ignoreMutation",
          value: function ignoreMutation(mut) {
            return mut.type === "characterData" && mut.target.nodeValue == mut.oldValue;
          }
        }]);
        return CompositionViewDesc2;
      })(ViewDesc);
      var MarkViewDesc = (function(_ViewDesc3) {
        _inherits(MarkViewDesc2, _ViewDesc3);
        var _super3 = _createSuper(MarkViewDesc2);
        function MarkViewDesc2(parent, mark, dom, contentDOM, spec) {
          var _this3;
          _classCallCheck(this, MarkViewDesc2);
          _this3 = _super3.call(this, parent, [], dom, contentDOM);
          _this3.mark = mark;
          _this3.spec = spec;
          return _this3;
        }
        _createClass(MarkViewDesc2, [{
          key: "parseRule",
          value: function parseRule() {
            if (this.dirty & NODE_DIRTY || this.mark.type.spec.reparseInView) return null;
            return {
              mark: this.mark.type.name,
              attrs: this.mark.attrs,
              contentElement: this.contentDOM
            };
          }
        }, {
          key: "matchesMark",
          value: function matchesMark(mark) {
            return this.dirty != NODE_DIRTY && this.mark.eq(mark);
          }
        }, {
          key: "markDirty",
          value: function markDirty(from, to) {
            _get(_getPrototypeOf(MarkViewDesc2.prototype), "markDirty", this).call(this, from, to);
            if (this.dirty != NOT_DIRTY) {
              var parent = this.parent;
              while (!parent.node) parent = parent.parent;
              if (parent.dirty < this.dirty) parent.dirty = this.dirty;
              this.dirty = NOT_DIRTY;
            }
          }
        }, {
          key: "slice",
          value: function slice(from, to, view) {
            var copy = MarkViewDesc2.create(this.parent, this.mark, true, view);
            var nodes = this.children, size = this.size;
            if (to < size) nodes = replaceNodes(nodes, to, size, view);
            if (from > 0) nodes = replaceNodes(nodes, 0, from, view);
            for (var i = 0; i < nodes.length; i++) nodes[i].parent = copy;
            copy.children = nodes;
            return copy;
          }
        }, {
          key: "ignoreMutation",
          value: function ignoreMutation(mutation) {
            return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : _get(_getPrototypeOf(MarkViewDesc2.prototype), "ignoreMutation", this).call(this, mutation);
          }
        }, {
          key: "destroy",
          value: function destroy() {
            if (this.spec.destroy) this.spec.destroy();
            _get(_getPrototypeOf(MarkViewDesc2.prototype), "destroy", this).call(this);
          }
        }], [{
          key: "create",
          value: function create(parent, mark, inline, view) {
            var custom = view.nodeViews[mark.type.name];
            var spec = custom && custom(mark, view, inline);
            if (!spec || !spec.dom) spec = prosemirrorModel.DOMSerializer.renderSpec(document, mark.type.spec.toDOM(mark, inline), null, mark.attrs);
            return new MarkViewDesc2(parent, mark, spec.dom, spec.contentDOM || spec.dom, spec);
          }
        }]);
        return MarkViewDesc2;
      })(ViewDesc);
      var NodeViewDesc = (function(_ViewDesc4) {
        _inherits(NodeViewDesc2, _ViewDesc4);
        var _super4 = _createSuper(NodeViewDesc2);
        function NodeViewDesc2(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos) {
          var _this4;
          _classCallCheck(this, NodeViewDesc2);
          _this4 = _super4.call(this, parent, [], dom, contentDOM);
          _this4.node = node;
          _this4.outerDeco = outerDeco;
          _this4.innerDeco = innerDeco;
          _this4.nodeDOM = nodeDOM;
          return _this4;
        }
        _createClass(NodeViewDesc2, [{
          key: "parseRule",
          value: function parseRule() {
            var _this5 = this;
            if (this.node.type.spec.reparseInView) return null;
            var rule = {
              node: this.node.type.name,
              attrs: this.node.attrs
            };
            if (this.node.type.whitespace == "pre") rule.preserveWhitespace = "full";
            if (!this.contentDOM) {
              rule.getContent = function() {
                return _this5.node.content;
              };
            } else if (!this.contentLost) {
              rule.contentElement = this.contentDOM;
            } else {
              for (var i = this.children.length - 1; i >= 0; i--) {
                var child = this.children[i];
                if (this.dom.contains(child.dom.parentNode)) {
                  rule.contentElement = child.dom.parentNode;
                  break;
                }
              }
              if (!rule.contentElement) rule.getContent = function() {
                return prosemirrorModel.Fragment.empty;
              };
            }
            return rule;
          }
        }, {
          key: "matchesNode",
          value: function matchesNode(node, outerDeco, innerDeco) {
            return this.dirty == NOT_DIRTY && node.eq(this.node) && sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco);
          }
        }, {
          key: "size",
          get: function get() {
            return this.node.nodeSize;
          }
        }, {
          key: "border",
          get: function get() {
            return this.node.isLeaf ? 0 : 1;
          }
        }, {
          key: "updateChildren",
          value: function updateChildren(view, pos) {
            var _this6 = this;
            var inline = this.node.inlineContent, off = pos;
            var composition = view.composing ? this.localCompositionInfo(view, pos) : null;
            var localComposition = composition && composition.pos > -1 ? composition : null;
            var compositionInChild = composition && composition.pos < 0;
            var updater = new ViewTreeUpdater(this, localComposition && localComposition.node, view);
            iterDeco(this.node, this.innerDeco, function(widget, i, insideNode) {
              if (widget.spec.marks) updater.syncToMarks(widget.spec.marks, inline, view);
              else if (widget.type.side >= 0 && !insideNode) updater.syncToMarks(i == _this6.node.childCount ? prosemirrorModel.Mark.none : _this6.node.child(i).marks, inline, view);
              updater.placeWidget(widget, view, off);
            }, function(child, outerDeco, innerDeco, i) {
              updater.syncToMarks(child.marks, inline, view);
              var compIndex;
              if (updater.findNodeMatch(child, outerDeco, innerDeco, i)) ;
              else if (compositionInChild && view.state.selection.from > off && view.state.selection.to < off + child.nodeSize && (compIndex = updater.findIndexWithChild(composition.node)) > -1 && updater.updateNodeAt(child, outerDeco, innerDeco, compIndex, view)) ;
              else if (updater.updateNextNode(child, outerDeco, innerDeco, view, i, off)) ;
              else {
                updater.addNode(child, outerDeco, innerDeco, view, off);
              }
              off += child.nodeSize;
            });
            updater.syncToMarks([], inline, view);
            if (this.node.isTextblock) updater.addTextblockHacks();
            updater.destroyRest();
            if (updater.changed || this.dirty == CONTENT_DIRTY) {
              if (localComposition) this.protectLocalComposition(view, localComposition);
              renderDescs(this.contentDOM, this.children, view);
              if (ios) iosHacks(this.dom);
            }
          }
        }, {
          key: "localCompositionInfo",
          value: function localCompositionInfo(view, pos) {
            var _view$state$selection = view.state.selection, from = _view$state$selection.from, to = _view$state$selection.to;
            if (!(view.state.selection instanceof prosemirrorState.TextSelection) || from < pos || to > pos + this.node.content.size) return null;
            var textNode = view.input.compositionNode;
            if (!textNode || !this.dom.contains(textNode.parentNode)) return null;
            if (this.node.inlineContent) {
              var text = textNode.nodeValue;
              var textPos = findTextInFragment(this.node.content, text, from - pos, to - pos);
              return textPos < 0 ? null : {
                node: textNode,
                pos: textPos,
                text
              };
            } else {
              return {
                node: textNode,
                pos: -1,
                text: ""
              };
            }
          }
        }, {
          key: "protectLocalComposition",
          value: function protectLocalComposition(view, _ref2) {
            var node = _ref2.node, pos = _ref2.pos, text = _ref2.text;
            if (this.getDesc(node)) return;
            var topNode = node;
            for (; ; topNode = topNode.parentNode) {
              if (topNode.parentNode == this.contentDOM) break;
              while (topNode.previousSibling) topNode.parentNode.removeChild(topNode.previousSibling);
              while (topNode.nextSibling) topNode.parentNode.removeChild(topNode.nextSibling);
              if (topNode.pmViewDesc) topNode.pmViewDesc = void 0;
            }
            var desc = new CompositionViewDesc(this, topNode, node, text);
            view.input.compositionNodes.push(desc);
            this.children = replaceNodes(this.children, pos, pos + text.length, view, desc);
          }
        }, {
          key: "update",
          value: function update(node, outerDeco, innerDeco, view) {
            if (this.dirty == NODE_DIRTY || !node.sameMarkup(this.node)) return false;
            this.updateInner(node, outerDeco, innerDeco, view);
            return true;
          }
        }, {
          key: "updateInner",
          value: function updateInner(node, outerDeco, innerDeco, view) {
            this.updateOuterDeco(outerDeco);
            this.node = node;
            this.innerDeco = innerDeco;
            if (this.contentDOM) this.updateChildren(view, this.posAtStart);
            this.dirty = NOT_DIRTY;
          }
        }, {
          key: "updateOuterDeco",
          value: function updateOuterDeco(outerDeco) {
            if (sameOuterDeco(outerDeco, this.outerDeco)) return;
            var needsWrap = this.nodeDOM.nodeType != 1;
            var oldDOM = this.dom;
            this.dom = patchOuterDeco(this.dom, this.nodeDOM, computeOuterDeco(this.outerDeco, this.node, needsWrap), computeOuterDeco(outerDeco, this.node, needsWrap));
            if (this.dom != oldDOM) {
              oldDOM.pmViewDesc = void 0;
              this.dom.pmViewDesc = this;
            }
            this.outerDeco = outerDeco;
          }
        }, {
          key: "selectNode",
          value: function selectNode() {
            if (this.nodeDOM.nodeType == 1) {
              this.nodeDOM.classList.add("ProseMirror-selectednode");
              if (this.contentDOM || !this.node.type.spec.draggable) this.nodeDOM.draggable = true;
            }
          }
        }, {
          key: "deselectNode",
          value: function deselectNode() {
            if (this.nodeDOM.nodeType == 1) {
              this.nodeDOM.classList.remove("ProseMirror-selectednode");
              if (this.contentDOM || !this.node.type.spec.draggable) this.nodeDOM.removeAttribute("draggable");
            }
          }
        }, {
          key: "domAtom",
          get: function get() {
            return this.node.isAtom;
          }
        }], [{
          key: "create",
          value: function create(parent, node, outerDeco, innerDeco, view, pos) {
            var custom = view.nodeViews[node.type.name], descObj;
            var spec = custom && custom(node, view, function() {
              if (!descObj) return pos;
              if (descObj.parent) return descObj.parent.posBeforeChild(descObj);
            }, outerDeco, innerDeco);
            var dom = spec && spec.dom, contentDOM = spec && spec.contentDOM;
            if (node.isText) {
              if (!dom) dom = document.createTextNode(node.text);
              else if (dom.nodeType != 3) throw new RangeError("Text must be rendered as a DOM text node");
            } else if (!dom) {
              var _spec = prosemirrorModel.DOMSerializer.renderSpec(document, node.type.spec.toDOM(node), null, node.attrs);
              dom = _spec.dom;
              contentDOM = _spec.contentDOM;
            }
            if (!contentDOM && !node.isText && dom.nodeName != "BR") {
              if (!dom.hasAttribute("contenteditable")) dom.contentEditable = "false";
              if (node.type.spec.draggable) dom.draggable = true;
            }
            var nodeDOM = dom;
            dom = applyOuterDeco(dom, outerDeco, node);
            if (spec) return descObj = new CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM || null, nodeDOM, spec, view, pos + 1);
            else if (node.isText) return new TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view);
            else return new NodeViewDesc2(parent, node, outerDeco, innerDeco, dom, contentDOM || null, nodeDOM, view, pos + 1);
          }
        }]);
        return NodeViewDesc2;
      })(ViewDesc);
      function docViewDesc(doc2, outerDeco, innerDeco, dom, view) {
        applyOuterDeco(dom, outerDeco, doc2);
        var docView = new NodeViewDesc(void 0, doc2, outerDeco, innerDeco, dom, dom, dom, view, 0);
        if (docView.contentDOM) docView.updateChildren(view, 0);
        return docView;
      }
      var TextViewDesc = (function(_NodeViewDesc) {
        _inherits(TextViewDesc2, _NodeViewDesc);
        var _super5 = _createSuper(TextViewDesc2);
        function TextViewDesc2(parent, node, outerDeco, innerDeco, dom, nodeDOM, view) {
          _classCallCheck(this, TextViewDesc2);
          return _super5.call(this, parent, node, outerDeco, innerDeco, dom, null, nodeDOM, view, 0);
        }
        _createClass(TextViewDesc2, [{
          key: "parseRule",
          value: function parseRule() {
            var skip = this.nodeDOM.parentNode;
            while (skip && skip != this.dom && !skip.pmIsDeco) skip = skip.parentNode;
            return {
              skip: skip || true
            };
          }
        }, {
          key: "update",
          value: function update(node, outerDeco, innerDeco, view) {
            if (this.dirty == NODE_DIRTY || this.dirty != NOT_DIRTY && !this.inParent() || !node.sameMarkup(this.node)) return false;
            this.updateOuterDeco(outerDeco);
            if ((this.dirty != NOT_DIRTY || node.text != this.node.text) && node.text != this.nodeDOM.nodeValue) {
              this.nodeDOM.nodeValue = node.text;
              if (view.trackWrites == this.nodeDOM) view.trackWrites = null;
            }
            this.node = node;
            this.dirty = NOT_DIRTY;
            return true;
          }
        }, {
          key: "inParent",
          value: function inParent() {
            var parentDOM = this.parent.contentDOM;
            for (var n = this.nodeDOM; n; n = n.parentNode) if (n == parentDOM) return true;
            return false;
          }
        }, {
          key: "domFromPos",
          value: function domFromPos(pos) {
            return {
              node: this.nodeDOM,
              offset: pos
            };
          }
        }, {
          key: "localPosFromDOM",
          value: function localPosFromDOM(dom, offset, bias) {
            if (dom == this.nodeDOM) return this.posAtStart + Math.min(offset, this.node.text.length);
            return _get(_getPrototypeOf(TextViewDesc2.prototype), "localPosFromDOM", this).call(this, dom, offset, bias);
          }
        }, {
          key: "ignoreMutation",
          value: function ignoreMutation(mutation) {
            return mutation.type != "characterData" && mutation.type != "selection";
          }
        }, {
          key: "slice",
          value: function slice(from, to, view) {
            var node = this.node.cut(from, to), dom = document.createTextNode(node.text);
            return new TextViewDesc2(this.parent, node, this.outerDeco, this.innerDeco, dom, dom, view);
          }
        }, {
          key: "markDirty",
          value: function markDirty(from, to) {
            _get(_getPrototypeOf(TextViewDesc2.prototype), "markDirty", this).call(this, from, to);
            if (this.dom != this.nodeDOM && (from == 0 || to == this.nodeDOM.nodeValue.length)) this.dirty = NODE_DIRTY;
          }
        }, {
          key: "domAtom",
          get: function get() {
            return false;
          }
        }, {
          key: "isText",
          value: function isText(text) {
            return this.node.text == text;
          }
        }]);
        return TextViewDesc2;
      })(NodeViewDesc);
      var TrailingHackViewDesc = (function(_ViewDesc5) {
        _inherits(TrailingHackViewDesc2, _ViewDesc5);
        var _super6 = _createSuper(TrailingHackViewDesc2);
        function TrailingHackViewDesc2() {
          _classCallCheck(this, TrailingHackViewDesc2);
          return _super6.apply(this, arguments);
        }
        _createClass(TrailingHackViewDesc2, [{
          key: "parseRule",
          value: function parseRule() {
            return {
              ignore: true
            };
          }
        }, {
          key: "matchesHack",
          value: function matchesHack(nodeName) {
            return this.dirty == NOT_DIRTY && this.dom.nodeName == nodeName;
          }
        }, {
          key: "domAtom",
          get: function get() {
            return true;
          }
        }, {
          key: "ignoreForCoords",
          get: function get() {
            return this.dom.nodeName == "IMG";
          }
        }]);
        return TrailingHackViewDesc2;
      })(ViewDesc);
      var CustomNodeViewDesc = (function(_NodeViewDesc2) {
        _inherits(CustomNodeViewDesc2, _NodeViewDesc2);
        var _super7 = _createSuper(CustomNodeViewDesc2);
        function CustomNodeViewDesc2(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view, pos) {
          var _this7;
          _classCallCheck(this, CustomNodeViewDesc2);
          _this7 = _super7.call(this, parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos);
          _this7.spec = spec;
          return _this7;
        }
        _createClass(CustomNodeViewDesc2, [{
          key: "update",
          value: function update(node, outerDeco, innerDeco, view) {
            if (this.dirty == NODE_DIRTY) return false;
            if (this.spec.update && (this.node.type == node.type || this.spec.multiType)) {
              var result = this.spec.update(node, outerDeco, innerDeco);
              if (result) this.updateInner(node, outerDeco, innerDeco, view);
              return result;
            } else if (!this.contentDOM && !node.isLeaf) {
              return false;
            } else {
              return _get(_getPrototypeOf(CustomNodeViewDesc2.prototype), "update", this).call(this, node, outerDeco, innerDeco, view);
            }
          }
        }, {
          key: "selectNode",
          value: function selectNode() {
            this.spec.selectNode ? this.spec.selectNode() : _get(_getPrototypeOf(CustomNodeViewDesc2.prototype), "selectNode", this).call(this);
          }
        }, {
          key: "deselectNode",
          value: function deselectNode() {
            this.spec.deselectNode ? this.spec.deselectNode() : _get(_getPrototypeOf(CustomNodeViewDesc2.prototype), "deselectNode", this).call(this);
          }
        }, {
          key: "setSelection",
          value: function setSelection(anchor, head, view, force) {
            this.spec.setSelection ? this.spec.setSelection(anchor, head, view.root) : _get(_getPrototypeOf(CustomNodeViewDesc2.prototype), "setSelection", this).call(this, anchor, head, view, force);
          }
        }, {
          key: "destroy",
          value: function destroy() {
            if (this.spec.destroy) this.spec.destroy();
            _get(_getPrototypeOf(CustomNodeViewDesc2.prototype), "destroy", this).call(this);
          }
        }, {
          key: "stopEvent",
          value: function stopEvent(event) {
            return this.spec.stopEvent ? this.spec.stopEvent(event) : false;
          }
        }, {
          key: "ignoreMutation",
          value: function ignoreMutation(mutation) {
            return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : _get(_getPrototypeOf(CustomNodeViewDesc2.prototype), "ignoreMutation", this).call(this, mutation);
          }
        }]);
        return CustomNodeViewDesc2;
      })(NodeViewDesc);
      function renderDescs(parentDOM, descs, view) {
        var dom = parentDOM.firstChild, written = false;
        for (var i = 0; i < descs.length; i++) {
          var desc = descs[i], childDOM = desc.dom;
          if (childDOM.parentNode == parentDOM) {
            while (childDOM != dom) {
              dom = rm(dom);
              written = true;
            }
            dom = dom.nextSibling;
          } else {
            written = true;
            parentDOM.insertBefore(childDOM, dom);
          }
          if (desc instanceof MarkViewDesc) {
            var pos = dom ? dom.previousSibling : parentDOM.lastChild;
            renderDescs(desc.contentDOM, desc.children, view);
            dom = pos ? pos.nextSibling : parentDOM.firstChild;
          }
        }
        while (dom) {
          dom = rm(dom);
          written = true;
        }
        if (written && view.trackWrites == parentDOM) view.trackWrites = null;
      }
      var OuterDecoLevel = function OuterDecoLevel2(nodeName) {
        if (nodeName) this.nodeName = nodeName;
      };
      OuterDecoLevel.prototype = /* @__PURE__ */ Object.create(null);
      var noDeco = [new OuterDecoLevel()];
      function computeOuterDeco(outerDeco, node, needsWrap) {
        if (outerDeco.length == 0) return noDeco;
        var top = needsWrap ? noDeco[0] : new OuterDecoLevel(), result = [top];
        for (var i = 0; i < outerDeco.length; i++) {
          var attrs = outerDeco[i].type.attrs;
          if (!attrs) continue;
          if (attrs.nodeName) result.push(top = new OuterDecoLevel(attrs.nodeName));
          for (var name in attrs) {
            var val = attrs[name];
            if (val == null) continue;
            if (needsWrap && result.length == 1) result.push(top = new OuterDecoLevel(node.isInline ? "span" : "div"));
            if (name == "class") top["class"] = (top["class"] ? top["class"] + " " : "") + val;
            else if (name == "style") top.style = (top.style ? top.style + ";" : "") + val;
            else if (name != "nodeName") top[name] = val;
          }
        }
        return result;
      }
      function patchOuterDeco(outerDOM, nodeDOM, prevComputed, curComputed) {
        if (prevComputed == noDeco && curComputed == noDeco) return nodeDOM;
        var curDOM = nodeDOM;
        for (var i = 0; i < curComputed.length; i++) {
          var deco = curComputed[i], prev = prevComputed[i];
          if (i) {
            var parent = void 0;
            if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM && (parent = curDOM.parentNode) && parent.nodeName.toLowerCase() == deco.nodeName) {
              curDOM = parent;
            } else {
              parent = document.createElement(deco.nodeName);
              parent.pmIsDeco = true;
              parent.appendChild(curDOM);
              prev = noDeco[0];
              curDOM = parent;
            }
          }
          patchAttributes(curDOM, prev || noDeco[0], deco);
        }
        return curDOM;
      }
      function patchAttributes(dom, prev, cur) {
        for (var name in prev) if (name != "class" && name != "style" && name != "nodeName" && !(name in cur)) dom.removeAttribute(name);
        for (var _name in cur) if (_name != "class" && _name != "style" && _name != "nodeName" && cur[_name] != prev[_name]) dom.setAttribute(_name, cur[_name]);
        if (prev["class"] != cur["class"]) {
          var prevList = prev["class"] ? prev["class"].split(" ").filter(Boolean) : [];
          var curList = cur["class"] ? cur["class"].split(" ").filter(Boolean) : [];
          for (var i = 0; i < prevList.length; i++) if (curList.indexOf(prevList[i]) == -1) dom.classList.remove(prevList[i]);
          for (var _i2 = 0; _i2 < curList.length; _i2++) if (prevList.indexOf(curList[_i2]) == -1) dom.classList.add(curList[_i2]);
          if (dom.classList.length == 0) dom.removeAttribute("class");
        }
        if (prev.style != cur.style) {
          if (prev.style) {
            var prop2 = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, m;
            while (m = prop2.exec(prev.style)) dom.style.removeProperty(m[1]);
          }
          if (cur.style) dom.style.cssText += cur.style;
        }
      }
      function applyOuterDeco(dom, deco, node) {
        return patchOuterDeco(dom, dom, noDeco, computeOuterDeco(deco, node, dom.nodeType != 1));
      }
      function sameOuterDeco(a, b) {
        if (a.length != b.length) return false;
        for (var i = 0; i < a.length; i++) if (!a[i].type.eq(b[i].type)) return false;
        return true;
      }
      function rm(dom) {
        var next = dom.nextSibling;
        dom.parentNode.removeChild(dom);
        return next;
      }
      var ViewTreeUpdater = (function() {
        function ViewTreeUpdater2(top, lock, view) {
          _classCallCheck(this, ViewTreeUpdater2);
          this.lock = lock;
          this.view = view;
          this.index = 0;
          this.stack = [];
          this.changed = false;
          this.top = top;
          this.preMatch = preMatch(top.node.content, top);
        }
        _createClass(ViewTreeUpdater2, [{
          key: "destroyBetween",
          value: function destroyBetween(start, end) {
            if (start == end) return;
            for (var i = start; i < end; i++) this.top.children[i].destroy();
            this.top.children.splice(start, end - start);
            this.changed = true;
          }
        }, {
          key: "destroyRest",
          value: function destroyRest() {
            this.destroyBetween(this.index, this.top.children.length);
          }
        }, {
          key: "syncToMarks",
          value: function syncToMarks(marks, inline, view) {
            var keep = 0, depth = this.stack.length >> 1;
            var maxKeep = Math.min(depth, marks.length);
            while (keep < maxKeep && (keep == depth - 1 ? this.top : this.stack[keep + 1 << 1]).matchesMark(marks[keep]) && marks[keep].type.spec.spanning !== false) keep++;
            while (keep < depth) {
              this.destroyRest();
              this.top.dirty = NOT_DIRTY;
              this.index = this.stack.pop();
              this.top = this.stack.pop();
              depth--;
            }
            while (depth < marks.length) {
              this.stack.push(this.top, this.index + 1);
              var found = -1;
              for (var i = this.index; i < Math.min(this.index + 3, this.top.children.length); i++) {
                var next = this.top.children[i];
                if (next.matchesMark(marks[depth]) && !this.isLocked(next.dom)) {
                  found = i;
                  break;
                }
              }
              if (found > -1) {
                if (found > this.index) {
                  this.changed = true;
                  this.destroyBetween(this.index, found);
                }
                this.top = this.top.children[this.index];
              } else {
                var markDesc = MarkViewDesc.create(this.top, marks[depth], inline, view);
                this.top.children.splice(this.index, 0, markDesc);
                this.top = markDesc;
                this.changed = true;
              }
              this.index = 0;
              depth++;
            }
          }
        }, {
          key: "findNodeMatch",
          value: function findNodeMatch(node, outerDeco, innerDeco, index) {
            var found = -1, targetDesc;
            if (index >= this.preMatch.index && (targetDesc = this.preMatch.matches[index - this.preMatch.index]).parent == this.top && targetDesc.matchesNode(node, outerDeco, innerDeco)) {
              found = this.top.children.indexOf(targetDesc, this.index);
            } else {
              for (var i = this.index, e = Math.min(this.top.children.length, i + 5); i < e; i++) {
                var child = this.top.children[i];
                if (child.matchesNode(node, outerDeco, innerDeco) && !this.preMatch.matched.has(child)) {
                  found = i;
                  break;
                }
              }
            }
            if (found < 0) return false;
            this.destroyBetween(this.index, found);
            this.index++;
            return true;
          }
        }, {
          key: "updateNodeAt",
          value: function updateNodeAt(node, outerDeco, innerDeco, index, view) {
            var child = this.top.children[index];
            if (child.dirty == NODE_DIRTY && child.dom == child.contentDOM) child.dirty = CONTENT_DIRTY;
            if (!child.update(node, outerDeco, innerDeco, view)) return false;
            this.destroyBetween(this.index, index);
            this.index++;
            return true;
          }
        }, {
          key: "findIndexWithChild",
          value: function findIndexWithChild(domNode) {
            for (; ; ) {
              var parent = domNode.parentNode;
              if (!parent) return -1;
              if (parent == this.top.contentDOM) {
                var desc = domNode.pmViewDesc;
                if (desc) for (var i = this.index; i < this.top.children.length; i++) {
                  if (this.top.children[i] == desc) return i;
                }
                return -1;
              }
              domNode = parent;
            }
          }
        }, {
          key: "updateNextNode",
          value: function updateNextNode(node, outerDeco, innerDeco, view, index, pos) {
            for (var i = this.index; i < this.top.children.length; i++) {
              var next = this.top.children[i];
              if (next instanceof NodeViewDesc) {
                var _preMatch = this.preMatch.matched.get(next);
                if (_preMatch != null && _preMatch != index) return false;
                var nextDOM = next.dom, updated = void 0;
                var locked = this.isLocked(nextDOM) && !(node.isText && next.node && next.node.isText && next.nodeDOM.nodeValue == node.text && next.dirty != NODE_DIRTY && sameOuterDeco(outerDeco, next.outerDeco));
                if (!locked && next.update(node, outerDeco, innerDeco, view)) {
                  this.destroyBetween(this.index, i);
                  if (next.dom != nextDOM) this.changed = true;
                  this.index++;
                  return true;
                } else if (!locked && (updated = this.recreateWrapper(next, node, outerDeco, innerDeco, view, pos))) {
                  this.destroyBetween(this.index, i);
                  this.top.children[this.index] = updated;
                  if (updated.contentDOM) {
                    updated.dirty = CONTENT_DIRTY;
                    updated.updateChildren(view, pos + 1);
                    updated.dirty = NOT_DIRTY;
                  }
                  this.changed = true;
                  this.index++;
                  return true;
                }
                break;
              }
            }
            return false;
          }
        }, {
          key: "recreateWrapper",
          value: function recreateWrapper(next, node, outerDeco, innerDeco, view, pos) {
            if (next.dirty || node.isAtom || !next.children.length || !next.node.content.eq(node.content) || !sameOuterDeco(outerDeco, next.outerDeco) || !innerDeco.eq(next.innerDeco)) return null;
            var wrapper = NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view, pos);
            if (wrapper.contentDOM) {
              wrapper.children = next.children;
              next.children = [];
              var _iterator = _createForOfIteratorHelper(wrapper.children), _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                  var ch = _step.value;
                  ch.parent = wrapper;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
            next.destroy();
            return wrapper;
          }
        }, {
          key: "addNode",
          value: function addNode(node, outerDeco, innerDeco, view, pos) {
            var desc = NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view, pos);
            if (desc.contentDOM) desc.updateChildren(view, pos + 1);
            this.top.children.splice(this.index++, 0, desc);
            this.changed = true;
          }
        }, {
          key: "placeWidget",
          value: function placeWidget(widget, view, pos) {
            var next = this.index < this.top.children.length ? this.top.children[this.index] : null;
            if (next && next.matchesWidget(widget) && (widget == next.widget || !next.widget.type.toDOM.parentNode)) {
              this.index++;
            } else {
              var desc = new WidgetViewDesc(this.top, widget, view, pos);
              this.top.children.splice(this.index++, 0, desc);
              this.changed = true;
            }
          }
        }, {
          key: "addTextblockHacks",
          value: function addTextblockHacks() {
            var lastChild = this.top.children[this.index - 1], parent = this.top;
            while (lastChild instanceof MarkViewDesc) {
              parent = lastChild;
              lastChild = parent.children[parent.children.length - 1];
            }
            if (!lastChild || !(lastChild instanceof TextViewDesc) || /\n$/.test(lastChild.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(lastChild.node.text)) {
              if ((safari || chrome) && lastChild && lastChild.dom.contentEditable == "false") this.addHackNode("IMG", parent);
              this.addHackNode("BR", this.top);
            }
          }
        }, {
          key: "addHackNode",
          value: function addHackNode(nodeName, parent) {
            if (parent == this.top && this.index < parent.children.length && parent.children[this.index].matchesHack(nodeName)) {
              this.index++;
            } else {
              var dom = document.createElement(nodeName);
              if (nodeName == "IMG") {
                dom.className = "ProseMirror-separator";
                dom.alt = "";
              }
              if (nodeName == "BR") dom.className = "ProseMirror-trailingBreak";
              var hack = new TrailingHackViewDesc(this.top, [], dom, null);
              if (parent != this.top) parent.children.push(hack);
              else parent.children.splice(this.index++, 0, hack);
              this.changed = true;
            }
          }
        }, {
          key: "isLocked",
          value: function isLocked(node) {
            return this.lock && (node == this.lock || node.nodeType == 1 && node.contains(this.lock.parentNode));
          }
        }]);
        return ViewTreeUpdater2;
      })();
      function preMatch(frag, parentDesc) {
        var curDesc = parentDesc, descI = curDesc.children.length;
        var fI = frag.childCount, matched = /* @__PURE__ */ new Map(), matches = [];
        outer: while (fI > 0) {
          var desc = void 0;
          for (; ; ) {
            if (descI) {
              var next = curDesc.children[descI - 1];
              if (next instanceof MarkViewDesc) {
                curDesc = next;
                descI = next.children.length;
              } else {
                desc = next;
                descI--;
                break;
              }
            } else if (curDesc == parentDesc) {
              break outer;
            } else {
              descI = curDesc.parent.children.indexOf(curDesc);
              curDesc = curDesc.parent;
            }
          }
          var node = desc.node;
          if (!node) continue;
          if (node != frag.child(fI - 1)) break;
          --fI;
          matched.set(desc, fI);
          matches.push(desc);
        }
        return {
          index: fI,
          matched,
          matches: matches.reverse()
        };
      }
      function compareSide(a, b) {
        return a.type.side - b.type.side;
      }
      function iterDeco(parent, deco, onWidget, onNode) {
        var locals = deco.locals(parent), offset = 0;
        if (locals.length == 0) {
          for (var i = 0; i < parent.childCount; i++) {
            var child = parent.child(i);
            onNode(child, locals, deco.forChild(offset, child), i);
            offset += child.nodeSize;
          }
          return;
        }
        var decoIndex = 0, active = [], restNode = null;
        for (var parentIndex = 0; ; ) {
          var widget = void 0, widgets = void 0;
          while (decoIndex < locals.length && locals[decoIndex].to == offset) {
            var next = locals[decoIndex++];
            if (next.widget) {
              if (!widget) widget = next;
              else (widgets || (widgets = [widget])).push(next);
            }
          }
          if (widget) {
            if (widgets) {
              widgets.sort(compareSide);
              for (var _i3 = 0; _i3 < widgets.length; _i3++) onWidget(widgets[_i3], parentIndex, !!restNode);
            } else {
              onWidget(widget, parentIndex, !!restNode);
            }
          }
          var _child = void 0, index = void 0;
          if (restNode) {
            index = -1;
            _child = restNode;
            restNode = null;
          } else if (parentIndex < parent.childCount) {
            index = parentIndex;
            _child = parent.child(parentIndex++);
          } else {
            break;
          }
          for (var _i4 = 0; _i4 < active.length; _i4++) if (active[_i4].to <= offset) active.splice(_i4--, 1);
          while (decoIndex < locals.length && locals[decoIndex].from <= offset && locals[decoIndex].to > offset) active.push(locals[decoIndex++]);
          var end = offset + _child.nodeSize;
          if (_child.isText) {
            var cutAt = end;
            if (decoIndex < locals.length && locals[decoIndex].from < cutAt) cutAt = locals[decoIndex].from;
            for (var _i5 = 0; _i5 < active.length; _i5++) if (active[_i5].to < cutAt) cutAt = active[_i5].to;
            if (cutAt < end) {
              restNode = _child.cut(cutAt - offset);
              _child = _child.cut(0, cutAt - offset);
              end = cutAt;
              index = -1;
            }
          } else {
            while (decoIndex < locals.length && locals[decoIndex].to < end) decoIndex++;
          }
          var outerDeco = _child.isInline && !_child.isLeaf ? active.filter(function(d) {
            return !d.inline;
          }) : active.slice();
          onNode(_child, outerDeco, deco.forChild(offset, _child), index);
          offset = end;
        }
      }
      function iosHacks(dom) {
        if (dom.nodeName == "UL" || dom.nodeName == "OL") {
          var oldCSS = dom.style.cssText;
          dom.style.cssText = oldCSS + "; list-style: square !important";
          window.getComputedStyle(dom).listStyle;
          dom.style.cssText = oldCSS;
        }
      }
      function findTextInFragment(frag, text, from, to) {
        for (var i = 0, pos = 0; i < frag.childCount && pos <= to; ) {
          var child = frag.child(i++), childStart = pos;
          pos += child.nodeSize;
          if (!child.isText) continue;
          var str = child.text;
          while (i < frag.childCount) {
            var next = frag.child(i++);
            pos += next.nodeSize;
            if (!next.isText) break;
            str += next.text;
          }
          if (pos >= from) {
            if (pos >= to && str.slice(to - text.length - childStart, to - childStart) == text) return to - text.length;
            var found = childStart < to ? str.lastIndexOf(text, to - childStart - 1) : -1;
            if (found >= 0 && found + text.length + childStart >= from) return childStart + found;
            if (from == to && str.length >= to + text.length - childStart && str.slice(to - childStart, to - childStart + text.length) == text) return to;
          }
        }
        return -1;
      }
      function replaceNodes(nodes, from, to, view, replacement) {
        var result = [];
        for (var i = 0, off = 0; i < nodes.length; i++) {
          var child = nodes[i], start = off, end = off += child.size;
          if (start >= to || end <= from) {
            result.push(child);
          } else {
            if (start < from) result.push(child.slice(0, from - start, view));
            if (replacement) {
              result.push(replacement);
              replacement = void 0;
            }
            if (end > to) result.push(child.slice(to - start, child.size, view));
          }
        }
        return result;
      }
      function selectionFromDOM(view) {
        var origin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var domSel = view.domSelectionRange(), doc2 = view.state.doc;
        if (!domSel.focusNode) return null;
        var nearestDesc = view.docView.nearestDesc(domSel.focusNode), inWidget = nearestDesc && nearestDesc.size == 0;
        var head = view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset, 1);
        if (head < 0) return null;
        var $head = doc2.resolve(head), anchor, selection;
        if (selectionCollapsed(domSel)) {
          anchor = head;
          while (nearestDesc && !nearestDesc.node) nearestDesc = nearestDesc.parent;
          var nearestDescNode = nearestDesc.node;
          if (nearestDesc && nearestDescNode.isAtom && prosemirrorState.NodeSelection.isSelectable(nearestDescNode) && nearestDesc.parent && !(nearestDescNode.isInline && isOnEdge(domSel.focusNode, domSel.focusOffset, nearestDesc.dom))) {
            var pos = nearestDesc.posBefore;
            selection = new prosemirrorState.NodeSelection(head == pos ? $head : doc2.resolve(pos));
          }
        } else {
          if (domSel instanceof view.dom.ownerDocument.defaultView.Selection && domSel.rangeCount > 1) {
            var min = head, max = head;
            for (var i = 0; i < domSel.rangeCount; i++) {
              var range = domSel.getRangeAt(i);
              min = Math.min(min, view.docView.posFromDOM(range.startContainer, range.startOffset, 1));
              max = Math.max(max, view.docView.posFromDOM(range.endContainer, range.endOffset, -1));
            }
            if (min < 0) return null;
            var _ref3 = max == view.state.selection.anchor ? [max, min] : [min, max];
            var _ref4 = _slicedToArray(_ref3, 2);
            anchor = _ref4[0];
            head = _ref4[1];
            $head = doc2.resolve(head);
          } else {
            anchor = view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset, 1);
          }
          if (anchor < 0) return null;
        }
        var $anchor = doc2.resolve(anchor);
        if (!selection) {
          var bias = origin == "pointer" || view.state.selection.head < $head.pos && !inWidget ? 1 : -1;
          selection = selectionBetween(view, $anchor, $head, bias);
        }
        return selection;
      }
      function editorOwnsSelection(view) {
        return view.editable ? view.hasFocus() : hasSelection(view) && document.activeElement && document.activeElement.contains(view.dom);
      }
      function selectionToDOM(view) {
        var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var sel = view.state.selection;
        syncNodeSelection(view, sel);
        if (!editorOwnsSelection(view)) return;
        if (!force && view.input.mouseDown && view.input.mouseDown.allowDefault && chrome) {
          var domSel = view.domSelectionRange(), curSel = view.domObserver.currentSelection;
          if (domSel.anchorNode && curSel.anchorNode && isEquivalentPosition(domSel.anchorNode, domSel.anchorOffset, curSel.anchorNode, curSel.anchorOffset)) {
            view.input.mouseDown.delayedSelectionSync = true;
            view.domObserver.setCurSelection();
            return;
          }
        }
        view.domObserver.disconnectSelection();
        if (view.cursorWrapper) {
          selectCursorWrapper(view);
        } else {
          var anchor = sel.anchor, head = sel.head, resetEditableFrom, resetEditableTo;
          if (brokenSelectBetweenUneditable && !(sel instanceof prosemirrorState.TextSelection)) {
            if (!sel.$from.parent.inlineContent) resetEditableFrom = temporarilyEditableNear(view, sel.from);
            if (!sel.empty && !sel.$from.parent.inlineContent) resetEditableTo = temporarilyEditableNear(view, sel.to);
          }
          view.docView.setSelection(anchor, head, view, force);
          if (brokenSelectBetweenUneditable) {
            if (resetEditableFrom) resetEditable(resetEditableFrom);
            if (resetEditableTo) resetEditable(resetEditableTo);
          }
          if (sel.visible) {
            view.dom.classList.remove("ProseMirror-hideselection");
          } else {
            view.dom.classList.add("ProseMirror-hideselection");
            if ("onselectionchange" in document) removeClassOnSelectionChange(view);
          }
        }
        view.domObserver.setCurSelection();
        view.domObserver.connectSelection();
      }
      var brokenSelectBetweenUneditable = safari || chrome && chrome_version < 63;
      function temporarilyEditableNear(view, pos) {
        var _view$docView$domFrom3 = view.docView.domFromPos(pos, 0), node = _view$docView$domFrom3.node, offset = _view$docView$domFrom3.offset;
        var after = offset < node.childNodes.length ? node.childNodes[offset] : null;
        var before = offset ? node.childNodes[offset - 1] : null;
        if (safari && after && after.contentEditable == "false") return setEditable(after);
        if ((!after || after.contentEditable == "false") && (!before || before.contentEditable == "false")) {
          if (after) return setEditable(after);
          else if (before) return setEditable(before);
        }
      }
      function setEditable(element) {
        element.contentEditable = "true";
        if (safari && element.draggable) {
          element.draggable = false;
          element.wasDraggable = true;
        }
        return element;
      }
      function resetEditable(element) {
        element.contentEditable = "false";
        if (element.wasDraggable) {
          element.draggable = true;
          element.wasDraggable = null;
        }
      }
      function removeClassOnSelectionChange(view) {
        var doc2 = view.dom.ownerDocument;
        doc2.removeEventListener("selectionchange", view.input.hideSelectionGuard);
        var domSel = view.domSelectionRange();
        var node = domSel.anchorNode, offset = domSel.anchorOffset;
        doc2.addEventListener("selectionchange", view.input.hideSelectionGuard = function() {
          if (domSel.anchorNode != node || domSel.anchorOffset != offset) {
            doc2.removeEventListener("selectionchange", view.input.hideSelectionGuard);
            setTimeout(function() {
              if (!editorOwnsSelection(view) || view.state.selection.visible) view.dom.classList.remove("ProseMirror-hideselection");
            }, 20);
          }
        });
      }
      function selectCursorWrapper(view) {
        var domSel = view.domSelection();
        if (!domSel) return;
        var node = view.cursorWrapper.dom, img = node.nodeName == "IMG";
        if (img) domSel.collapse(node.parentNode, domIndex(node) + 1);
        else domSel.collapse(node, 0);
        if (!img && !view.state.selection.visible && ie && ie_version <= 11) {
          node.disabled = true;
          node.disabled = false;
        }
      }
      function syncNodeSelection(view, sel) {
        if (sel instanceof prosemirrorState.NodeSelection) {
          var desc = view.docView.descAt(sel.from);
          if (desc != view.lastSelectedViewDesc) {
            clearNodeSelection(view);
            if (desc) desc.selectNode();
            view.lastSelectedViewDesc = desc;
          }
        } else {
          clearNodeSelection(view);
        }
      }
      function clearNodeSelection(view) {
        if (view.lastSelectedViewDesc) {
          if (view.lastSelectedViewDesc.parent) view.lastSelectedViewDesc.deselectNode();
          view.lastSelectedViewDesc = void 0;
        }
      }
      function selectionBetween(view, $anchor, $head, bias) {
        return view.someProp("createSelectionBetween", function(f) {
          return f(view, $anchor, $head);
        }) || prosemirrorState.TextSelection.between($anchor, $head, bias);
      }
      function hasFocusAndSelection(view) {
        if (view.editable && !view.hasFocus()) return false;
        return hasSelection(view);
      }
      function hasSelection(view) {
        var sel = view.domSelectionRange();
        if (!sel.anchorNode) return false;
        try {
          return view.dom.contains(sel.anchorNode.nodeType == 3 ? sel.anchorNode.parentNode : sel.anchorNode) && (view.editable || view.dom.contains(sel.focusNode.nodeType == 3 ? sel.focusNode.parentNode : sel.focusNode));
        } catch (_) {
          return false;
        }
      }
      function anchorInRightPlace(view) {
        var anchorDOM = view.docView.domFromPos(view.state.selection.anchor, 0);
        var domSel = view.domSelectionRange();
        return isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset);
      }
      function moveSelectionBlock(state, dir) {
        var _state$selection = state.selection, $anchor = _state$selection.$anchor, $head = _state$selection.$head;
        var $side = dir > 0 ? $anchor.max($head) : $anchor.min($head);
        var $start = !$side.parent.inlineContent ? $side : $side.depth ? state.doc.resolve(dir > 0 ? $side.after() : $side.before()) : null;
        return $start && prosemirrorState.Selection.findFrom($start, dir);
      }
      function apply(view, sel) {
        view.dispatch(view.state.tr.setSelection(sel).scrollIntoView());
        return true;
      }
      function selectHorizontally(view, dir, mods) {
        var sel = view.state.selection;
        if (sel instanceof prosemirrorState.TextSelection) {
          if (mods.indexOf("s") > -1) {
            var $head = sel.$head, node = $head.textOffset ? null : dir < 0 ? $head.nodeBefore : $head.nodeAfter;
            if (!node || node.isText || !node.isLeaf) return false;
            var $newHead = view.state.doc.resolve($head.pos + node.nodeSize * (dir < 0 ? -1 : 1));
            return apply(view, new prosemirrorState.TextSelection(sel.$anchor, $newHead));
          } else if (!sel.empty) {
            return false;
          } else if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) {
            var next = moveSelectionBlock(view.state, dir);
            if (next && next instanceof prosemirrorState.NodeSelection) return apply(view, next);
            return false;
          } else if (!(mac && mods.indexOf("m") > -1)) {
            var _$head = sel.$head, _node = _$head.textOffset ? null : dir < 0 ? _$head.nodeBefore : _$head.nodeAfter, desc;
            if (!_node || _node.isText) return false;
            var nodePos = dir < 0 ? _$head.pos - _node.nodeSize : _$head.pos;
            if (!(_node.isAtom || (desc = view.docView.descAt(nodePos)) && !desc.contentDOM)) return false;
            if (prosemirrorState.NodeSelection.isSelectable(_node)) {
              return apply(view, new prosemirrorState.NodeSelection(dir < 0 ? view.state.doc.resolve(_$head.pos - _node.nodeSize) : _$head));
            } else if (webkit) {
              return apply(view, new prosemirrorState.TextSelection(view.state.doc.resolve(dir < 0 ? nodePos : nodePos + _node.nodeSize)));
            } else {
              return false;
            }
          }
        } else if (sel instanceof prosemirrorState.NodeSelection && sel.node.isInline) {
          return apply(view, new prosemirrorState.TextSelection(dir > 0 ? sel.$to : sel.$from));
        } else {
          var _next = moveSelectionBlock(view.state, dir);
          if (_next) return apply(view, _next);
          return false;
        }
      }
      function nodeLen(node) {
        return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
      }
      function isIgnorable(dom, dir) {
        var desc = dom.pmViewDesc;
        return desc && desc.size == 0 && (dir < 0 || dom.nextSibling || dom.nodeName != "BR");
      }
      function skipIgnoredNodes(view, dir) {
        return dir < 0 ? skipIgnoredNodesBefore(view) : skipIgnoredNodesAfter(view);
      }
      function skipIgnoredNodesBefore(view) {
        var sel = view.domSelectionRange();
        var node = sel.focusNode, offset = sel.focusOffset;
        if (!node) return;
        var moveNode, moveOffset, force = false;
        if (gecko && node.nodeType == 1 && offset < nodeLen(node) && isIgnorable(node.childNodes[offset], -1)) force = true;
        for (; ; ) {
          if (offset > 0) {
            if (node.nodeType != 1) {
              break;
            } else {
              var before = node.childNodes[offset - 1];
              if (isIgnorable(before, -1)) {
                moveNode = node;
                moveOffset = --offset;
              } else if (before.nodeType == 3) {
                node = before;
                offset = node.nodeValue.length;
              } else break;
            }
          } else if (isBlockNode(node)) {
            break;
          } else {
            var prev = node.previousSibling;
            while (prev && isIgnorable(prev, -1)) {
              moveNode = node.parentNode;
              moveOffset = domIndex(prev);
              prev = prev.previousSibling;
            }
            if (!prev) {
              node = node.parentNode;
              if (node == view.dom) break;
              offset = 0;
            } else {
              node = prev;
              offset = nodeLen(node);
            }
          }
        }
        if (force) setSelFocus(view, node, offset);
        else if (moveNode) setSelFocus(view, moveNode, moveOffset);
      }
      function skipIgnoredNodesAfter(view) {
        var sel = view.domSelectionRange();
        var node = sel.focusNode, offset = sel.focusOffset;
        if (!node) return;
        var len = nodeLen(node);
        var moveNode, moveOffset;
        for (; ; ) {
          if (offset < len) {
            if (node.nodeType != 1) break;
            var after = node.childNodes[offset];
            if (isIgnorable(after, 1)) {
              moveNode = node;
              moveOffset = ++offset;
            } else break;
          } else if (isBlockNode(node)) {
            break;
          } else {
            var next = node.nextSibling;
            while (next && isIgnorable(next, 1)) {
              moveNode = next.parentNode;
              moveOffset = domIndex(next) + 1;
              next = next.nextSibling;
            }
            if (!next) {
              node = node.parentNode;
              if (node == view.dom) break;
              offset = len = 0;
            } else {
              node = next;
              offset = 0;
              len = nodeLen(node);
            }
          }
        }
        if (moveNode) setSelFocus(view, moveNode, moveOffset);
      }
      function isBlockNode(dom) {
        var desc = dom.pmViewDesc;
        return desc && desc.node && desc.node.isBlock;
      }
      function textNodeAfter(node, offset) {
        while (node && offset == node.childNodes.length && !hasBlockDesc(node)) {
          offset = domIndex(node) + 1;
          node = node.parentNode;
        }
        while (node && offset < node.childNodes.length) {
          var next = node.childNodes[offset];
          if (next.nodeType == 3) return next;
          if (next.nodeType == 1 && next.contentEditable == "false") break;
          node = next;
          offset = 0;
        }
      }
      function textNodeBefore(node, offset) {
        while (node && !offset && !hasBlockDesc(node)) {
          offset = domIndex(node);
          node = node.parentNode;
        }
        while (node && offset) {
          var next = node.childNodes[offset - 1];
          if (next.nodeType == 3) return next;
          if (next.nodeType == 1 && next.contentEditable == "false") break;
          node = next;
          offset = node.childNodes.length;
        }
      }
      function setSelFocus(view, node, offset) {
        if (node.nodeType != 3) {
          var before, after;
          if (after = textNodeAfter(node, offset)) {
            node = after;
            offset = 0;
          } else if (before = textNodeBefore(node, offset)) {
            node = before;
            offset = before.nodeValue.length;
          }
        }
        var sel = view.domSelection();
        if (!sel) return;
        if (selectionCollapsed(sel)) {
          var range = document.createRange();
          range.setEnd(node, offset);
          range.setStart(node, offset);
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (sel.extend) {
          sel.extend(node, offset);
        }
        view.domObserver.setCurSelection();
        var state = view.state;
        setTimeout(function() {
          if (view.state == state) selectionToDOM(view);
        }, 50);
      }
      function findDirection(view, pos) {
        var $pos = view.state.doc.resolve(pos);
        if (!(chrome || windows) && $pos.parent.inlineContent) {
          var coords = view.coordsAtPos(pos);
          if (pos > $pos.start()) {
            var before = view.coordsAtPos(pos - 1);
            var mid = (before.top + before.bottom) / 2;
            if (mid > coords.top && mid < coords.bottom && Math.abs(before.left - coords.left) > 1) return before.left < coords.left ? "ltr" : "rtl";
          }
          if (pos < $pos.end()) {
            var after = view.coordsAtPos(pos + 1);
            var _mid = (after.top + after.bottom) / 2;
            if (_mid > coords.top && _mid < coords.bottom && Math.abs(after.left - coords.left) > 1) return after.left > coords.left ? "ltr" : "rtl";
          }
        }
        var computed = getComputedStyle(view.dom).direction;
        return computed == "rtl" ? "rtl" : "ltr";
      }
      function selectVertically(view, dir, mods) {
        var sel = view.state.selection;
        if (sel instanceof prosemirrorState.TextSelection && !sel.empty || mods.indexOf("s") > -1) return false;
        if (mac && mods.indexOf("m") > -1) return false;
        var $from = sel.$from, $to = sel.$to;
        if (!$from.parent.inlineContent || view.endOfTextblock(dir < 0 ? "up" : "down")) {
          var next = moveSelectionBlock(view.state, dir);
          if (next && next instanceof prosemirrorState.NodeSelection) return apply(view, next);
        }
        if (!$from.parent.inlineContent) {
          var side = dir < 0 ? $from : $to;
          var beyond = sel instanceof prosemirrorState.AllSelection ? prosemirrorState.Selection.near(side, dir) : prosemirrorState.Selection.findFrom(side, dir);
          return beyond ? apply(view, beyond) : false;
        }
        return false;
      }
      function stopNativeHorizontalDelete(view, dir) {
        if (!(view.state.selection instanceof prosemirrorState.TextSelection)) return true;
        var _view$state$selection2 = view.state.selection, $head = _view$state$selection2.$head, $anchor = _view$state$selection2.$anchor, empty2 = _view$state$selection2.empty;
        if (!$head.sameParent($anchor)) return true;
        if (!empty2) return false;
        if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) return true;
        var nextNode = !$head.textOffset && (dir < 0 ? $head.nodeBefore : $head.nodeAfter);
        if (nextNode && !nextNode.isText) {
          var tr = view.state.tr;
          if (dir < 0) tr["delete"]($head.pos - nextNode.nodeSize, $head.pos);
          else tr["delete"]($head.pos, $head.pos + nextNode.nodeSize);
          view.dispatch(tr);
          return true;
        }
        return false;
      }
      function switchEditable(view, node, state) {
        view.domObserver.stop();
        node.contentEditable = state;
        view.domObserver.start();
      }
      function safariDownArrowBug(view) {
        if (!safari || view.state.selection.$head.parentOffset > 0) return false;
        var _view$domSelectionRan3 = view.domSelectionRange(), focusNode = _view$domSelectionRan3.focusNode, focusOffset = _view$domSelectionRan3.focusOffset;
        if (focusNode && focusNode.nodeType == 1 && focusOffset == 0 && focusNode.firstChild && focusNode.firstChild.contentEditable == "false") {
          var child = focusNode.firstChild;
          switchEditable(view, child, "true");
          setTimeout(function() {
            return switchEditable(view, child, "false");
          }, 20);
        }
        return false;
      }
      function getMods(event) {
        var result = "";
        if (event.ctrlKey) result += "c";
        if (event.metaKey) result += "m";
        if (event.altKey) result += "a";
        if (event.shiftKey) result += "s";
        return result;
      }
      function captureKeyDown(view, event) {
        var code = event.keyCode, mods = getMods(event);
        if (code == 8 || mac && code == 72 && mods == "c") {
          return stopNativeHorizontalDelete(view, -1) || skipIgnoredNodes(view, -1);
        } else if (code == 46 && !event.shiftKey || mac && code == 68 && mods == "c") {
          return stopNativeHorizontalDelete(view, 1) || skipIgnoredNodes(view, 1);
        } else if (code == 13 || code == 27) {
          return true;
        } else if (code == 37 || mac && code == 66 && mods == "c") {
          var dir = code == 37 ? findDirection(view, view.state.selection.from) == "ltr" ? -1 : 1 : -1;
          return selectHorizontally(view, dir, mods) || skipIgnoredNodes(view, dir);
        } else if (code == 39 || mac && code == 70 && mods == "c") {
          var _dir = code == 39 ? findDirection(view, view.state.selection.from) == "ltr" ? 1 : -1 : 1;
          return selectHorizontally(view, _dir, mods) || skipIgnoredNodes(view, _dir);
        } else if (code == 38 || mac && code == 80 && mods == "c") {
          return selectVertically(view, -1, mods) || skipIgnoredNodes(view, -1);
        } else if (code == 40 || mac && code == 78 && mods == "c") {
          return safariDownArrowBug(view) || selectVertically(view, 1, mods) || skipIgnoredNodes(view, 1);
        } else if (mods == (mac ? "m" : "c") && (code == 66 || code == 73 || code == 89 || code == 90)) {
          return true;
        }
        return false;
      }
      function _serializeForClipboard(view, slice) {
        view.someProp("transformCopied", function(f) {
          slice = f(slice, view);
        });
        var context = [], _slice = slice, content = _slice.content, openStart = _slice.openStart, openEnd = _slice.openEnd;
        while (openStart > 1 && openEnd > 1 && content.childCount == 1 && content.firstChild.childCount == 1) {
          openStart--;
          openEnd--;
          var node = content.firstChild;
          context.push(node.type.name, node.attrs != node.type.defaultAttrs ? node.attrs : null);
          content = node.content;
        }
        var serializer = view.someProp("clipboardSerializer") || prosemirrorModel.DOMSerializer.fromSchema(view.state.schema);
        var doc2 = detachedDoc(), wrap = doc2.createElement("div");
        wrap.appendChild(serializer.serializeFragment(content, {
          document: doc2
        }));
        var firstChild = wrap.firstChild, needsWrap, wrappers = 0;
        while (firstChild && firstChild.nodeType == 1 && (needsWrap = wrapMap[firstChild.nodeName.toLowerCase()])) {
          for (var i = needsWrap.length - 1; i >= 0; i--) {
            var wrapper = doc2.createElement(needsWrap[i]);
            while (wrap.firstChild) wrapper.appendChild(wrap.firstChild);
            wrap.appendChild(wrapper);
            wrappers++;
          }
          firstChild = wrap.firstChild;
        }
        if (firstChild && firstChild.nodeType == 1) firstChild.setAttribute("data-pm-slice", "".concat(openStart, " ").concat(openEnd).concat(wrappers ? " -".concat(wrappers) : "", " ").concat(JSON.stringify(context)));
        var text = view.someProp("clipboardTextSerializer", function(f) {
          return f(slice, view);
        }) || slice.content.textBetween(0, slice.content.size, "\n\n");
        return {
          dom: wrap,
          text,
          slice
        };
      }
      function parseFromClipboard(view, text, html, plainText, $context) {
        var inCode = $context.parent.type.spec.code;
        var dom, slice;
        if (!html && !text) return null;
        var asText = !!text && (plainText || inCode || !html);
        if (asText) {
          view.someProp("transformPastedText", function(f) {
            text = f(text, inCode || plainText, view);
          });
          if (inCode) {
            slice = new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(view.state.schema.text(text.replace(/\r\n?/g, "\n"))), 0, 0);
            view.someProp("transformPasted", function(f) {
              slice = f(slice, view, true);
            });
            return slice;
          }
          var parsed = view.someProp("clipboardTextParser", function(f) {
            return f(text, $context, plainText, view);
          });
          if (parsed) {
            slice = parsed;
          } else {
            var marks = $context.marks();
            var schema = view.state.schema, serializer = prosemirrorModel.DOMSerializer.fromSchema(schema);
            dom = document.createElement("div");
            text.split(/(?:\r\n?|\n)+/).forEach(function(block) {
              var p = dom.appendChild(document.createElement("p"));
              if (block) p.appendChild(serializer.serializeNode(schema.text(block, marks)));
            });
          }
        } else {
          view.someProp("transformPastedHTML", function(f) {
            html = f(html, view);
          });
          dom = readHTML(html);
          if (webkit) restoreReplacedSpaces(dom);
        }
        var contextNode = dom && dom.querySelector("[data-pm-slice]");
        var sliceData = contextNode && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(contextNode.getAttribute("data-pm-slice") || "");
        if (sliceData && sliceData[3]) for (var i = +sliceData[3]; i > 0; i--) {
          var child = dom.firstChild;
          while (child && child.nodeType != 1) child = child.nextSibling;
          if (!child) break;
          dom = child;
        }
        if (!slice) {
          var parser = view.someProp("clipboardParser") || view.someProp("domParser") || prosemirrorModel.DOMParser.fromSchema(view.state.schema);
          slice = parser.parseSlice(dom, {
            preserveWhitespace: !!(asText || sliceData),
            context: $context,
            ruleFromNode: function ruleFromNode2(dom2) {
              if (dom2.nodeName == "BR" && !dom2.nextSibling && dom2.parentNode && !inlineParents.test(dom2.parentNode.nodeName)) return {
                ignore: true
              };
              return null;
            }
          });
        }
        if (sliceData) {
          slice = addContext(closeSlice(slice, +sliceData[1], +sliceData[2]), sliceData[4]);
        } else {
          slice = prosemirrorModel.Slice.maxOpen(normalizeSiblings(slice.content, $context), true);
          if (slice.openStart || slice.openEnd) {
            var openStart = 0, openEnd = 0;
            for (var node = slice.content.firstChild; openStart < slice.openStart && !node.type.spec.isolating; openStart++, node = node.firstChild) {
            }
            for (var _node2 = slice.content.lastChild; openEnd < slice.openEnd && !_node2.type.spec.isolating; openEnd++, _node2 = _node2.lastChild) {
            }
            slice = closeSlice(slice, openStart, openEnd);
          }
        }
        view.someProp("transformPasted", function(f) {
          slice = f(slice, view, asText);
        });
        return slice;
      }
      var inlineParents = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
      function normalizeSiblings(fragment, $context) {
        if (fragment.childCount < 2) return fragment;
        var _loop = function _loop2() {
          var parent = $context.node(d);
          var match = parent.contentMatchAt($context.index(d));
          var lastWrap, result = [];
          fragment.forEach(function(node) {
            if (!result) return;
            var wrap = match.findWrapping(node.type), inLast;
            if (!wrap) return result = null;
            if (inLast = result.length && lastWrap.length && addToSibling(wrap, lastWrap, node, result[result.length - 1], 0)) {
              result[result.length - 1] = inLast;
            } else {
              if (result.length) result[result.length - 1] = closeRight(result[result.length - 1], lastWrap.length);
              var wrapped = withWrappers(node, wrap);
              result.push(wrapped);
              match = match.matchType(wrapped.type);
              lastWrap = wrap;
            }
          });
          if (result) return {
            v: prosemirrorModel.Fragment.from(result)
          };
        }, _ret;
        for (var d = $context.depth; d >= 0; d--) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }
        return fragment;
      }
      function withWrappers(node, wrap) {
        var from = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        for (var i = wrap.length - 1; i >= from; i--) node = wrap[i].create(null, prosemirrorModel.Fragment.from(node));
        return node;
      }
      function addToSibling(wrap, lastWrap, node, sibling, depth) {
        if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
          var inner = addToSibling(wrap, lastWrap, node, sibling.lastChild, depth + 1);
          if (inner) return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner));
          var match = sibling.contentMatchAt(sibling.childCount);
          if (match.matchType(depth == wrap.length - 1 ? node.type : wrap[depth + 1])) return sibling.copy(sibling.content.append(prosemirrorModel.Fragment.from(withWrappers(node, wrap, depth + 1))));
        }
      }
      function closeRight(node, depth) {
        if (depth == 0) return node;
        var fragment = node.content.replaceChild(node.childCount - 1, closeRight(node.lastChild, depth - 1));
        var fill = node.contentMatchAt(node.childCount).fillBefore(prosemirrorModel.Fragment.empty, true);
        return node.copy(fragment.append(fill));
      }
      function closeRange(fragment, side, from, to, depth, openEnd) {
        var node = side < 0 ? fragment.firstChild : fragment.lastChild, inner = node.content;
        if (fragment.childCount > 1) openEnd = 0;
        if (depth < to - 1) inner = closeRange(inner, side, from, to, depth + 1, openEnd);
        if (depth >= from) inner = side < 0 ? node.contentMatchAt(0).fillBefore(inner, openEnd <= depth).append(inner) : inner.append(node.contentMatchAt(node.childCount).fillBefore(prosemirrorModel.Fragment.empty, true));
        return fragment.replaceChild(side < 0 ? 0 : fragment.childCount - 1, node.copy(inner));
      }
      function closeSlice(slice, openStart, openEnd) {
        if (openStart < slice.openStart) slice = new prosemirrorModel.Slice(closeRange(slice.content, -1, openStart, slice.openStart, 0, slice.openEnd), openStart, slice.openEnd);
        if (openEnd < slice.openEnd) slice = new prosemirrorModel.Slice(closeRange(slice.content, 1, openEnd, slice.openEnd, 0, 0), slice.openStart, openEnd);
        return slice;
      }
      var wrapMap = {
        thead: ["table"],
        tbody: ["table"],
        tfoot: ["table"],
        caption: ["table"],
        colgroup: ["table"],
        col: ["table", "colgroup"],
        tr: ["table", "tbody"],
        td: ["table", "tbody", "tr"],
        th: ["table", "tbody", "tr"]
      };
      var _detachedDoc = null;
      function detachedDoc() {
        return _detachedDoc || (_detachedDoc = document.implementation.createHTMLDocument("title"));
      }
      var _policy = null;
      function maybeWrapTrusted(html) {
        var trustedTypes = window.trustedTypes;
        if (!trustedTypes) return html;
        if (!_policy) _policy = trustedTypes.defaultPolicy || trustedTypes.createPolicy("ProseMirrorClipboard", {
          createHTML: function createHTML(s) {
            return s;
          }
        });
        return _policy.createHTML(html);
      }
      function readHTML(html) {
        var metas = /^(\s*<meta [^>]*>)*/.exec(html);
        if (metas) html = html.slice(metas[0].length);
        var elt = detachedDoc().createElement("div");
        var firstTag = /<([a-z][^>\s]+)/i.exec(html), wrap;
        if (wrap = firstTag && wrapMap[firstTag[1].toLowerCase()]) html = wrap.map(function(n) {
          return "<" + n + ">";
        }).join("") + html + wrap.map(function(n) {
          return "</" + n + ">";
        }).reverse().join("");
        elt.innerHTML = maybeWrapTrusted(html);
        if (wrap) for (var i = 0; i < wrap.length; i++) elt = elt.querySelector(wrap[i]) || elt;
        return elt;
      }
      function restoreReplacedSpaces(dom) {
        var nodes = dom.querySelectorAll(chrome ? "span:not([class]):not([style])" : "span.Apple-converted-space");
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (node.childNodes.length == 1 && node.textContent == "\xA0" && node.parentNode) node.parentNode.replaceChild(dom.ownerDocument.createTextNode(" "), node);
        }
      }
      function addContext(slice, context) {
        if (!slice.size) return slice;
        var schema = slice.content.firstChild.type.schema, array;
        try {
          array = JSON.parse(context);
        } catch (e) {
          return slice;
        }
        var content = slice.content, openStart = slice.openStart, openEnd = slice.openEnd;
        for (var i = array.length - 2; i >= 0; i -= 2) {
          var type = schema.nodes[array[i]];
          if (!type || type.hasRequiredAttrs()) break;
          content = prosemirrorModel.Fragment.from(type.create(array[i + 1], content));
          openStart++;
          openEnd++;
        }
        return new prosemirrorModel.Slice(content, openStart, openEnd);
      }
      var handlers = {};
      var editHandlers = {};
      var passiveHandlers = {
        touchstart: true,
        touchmove: true
      };
      var InputState = _createClass(function InputState2() {
        _classCallCheck(this, InputState2);
        this.shiftKey = false;
        this.mouseDown = null;
        this.lastKeyCode = null;
        this.lastKeyCodeTime = 0;
        this.lastClick = {
          time: 0,
          x: 0,
          y: 0,
          type: "",
          button: 0
        };
        this.lastSelectionOrigin = null;
        this.lastSelectionTime = 0;
        this.lastIOSEnter = 0;
        this.lastIOSEnterFallbackTimeout = -1;
        this.lastFocus = 0;
        this.lastTouch = 0;
        this.lastChromeDelete = 0;
        this.composing = false;
        this.compositionNode = null;
        this.composingTimeout = -1;
        this.compositionNodes = [];
        this.compositionEndedAt = -2e8;
        this.compositionID = 1;
        this.compositionPendingChanges = 0;
        this.domChangeCount = 0;
        this.eventHandlers = /* @__PURE__ */ Object.create(null);
        this.hideSelectionGuard = null;
      });
      function initInput(view) {
        var _loop2 = function _loop22() {
          var handler = handlers[event];
          view.dom.addEventListener(event, view.input.eventHandlers[event] = function(event2) {
            if (eventBelongsToView(view, event2) && !runCustomHandler(view, event2) && (view.editable || !(event2.type in editHandlers))) handler(view, event2);
          }, passiveHandlers[event] ? {
            passive: true
          } : void 0);
        };
        for (var event in handlers) {
          _loop2();
        }
        if (safari) view.dom.addEventListener("input", function() {
          return null;
        });
        ensureListeners(view);
      }
      function setSelectionOrigin(view, origin) {
        view.input.lastSelectionOrigin = origin;
        view.input.lastSelectionTime = Date.now();
      }
      function destroyInput(view) {
        view.domObserver.stop();
        for (var type in view.input.eventHandlers) view.dom.removeEventListener(type, view.input.eventHandlers[type]);
        clearTimeout(view.input.composingTimeout);
        clearTimeout(view.input.lastIOSEnterFallbackTimeout);
      }
      function ensureListeners(view) {
        view.someProp("handleDOMEvents", function(currentHandlers) {
          for (var type in currentHandlers) if (!view.input.eventHandlers[type]) view.dom.addEventListener(type, view.input.eventHandlers[type] = function(event) {
            return runCustomHandler(view, event);
          });
        });
      }
      function runCustomHandler(view, event) {
        return view.someProp("handleDOMEvents", function(handlers2) {
          var handler = handlers2[event.type];
          return handler ? handler(view, event) || event.defaultPrevented : false;
        });
      }
      function eventBelongsToView(view, event) {
        if (!event.bubbles) return true;
        if (event.defaultPrevented) return false;
        for (var node = event.target; node != view.dom; node = node.parentNode) if (!node || node.nodeType == 11 || node.pmViewDesc && node.pmViewDesc.stopEvent(event)) return false;
        return true;
      }
      function _dispatchEvent(view, event) {
        if (!runCustomHandler(view, event) && handlers[event.type] && (view.editable || !(event.type in editHandlers))) handlers[event.type](view, event);
      }
      editHandlers.keydown = function(view, _event) {
        var event = _event;
        view.input.shiftKey = event.keyCode == 16 || event.shiftKey;
        if (inOrNearComposition(view, event)) return;
        view.input.lastKeyCode = event.keyCode;
        view.input.lastKeyCodeTime = Date.now();
        if (android && chrome && event.keyCode == 13) return;
        if (event.keyCode != 229) view.domObserver.forceFlush();
        if (ios && event.keyCode == 13 && !event.ctrlKey && !event.altKey && !event.metaKey) {
          var now = Date.now();
          view.input.lastIOSEnter = now;
          view.input.lastIOSEnterFallbackTimeout = setTimeout(function() {
            if (view.input.lastIOSEnter == now) {
              view.someProp("handleKeyDown", function(f) {
                return f(view, keyEvent(13, "Enter"));
              });
              view.input.lastIOSEnter = 0;
            }
          }, 200);
        } else if (view.someProp("handleKeyDown", function(f) {
          return f(view, event);
        }) || captureKeyDown(view, event)) {
          event.preventDefault();
        } else {
          setSelectionOrigin(view, "key");
        }
      };
      editHandlers.keyup = function(view, event) {
        if (event.keyCode == 16) view.input.shiftKey = false;
      };
      editHandlers.keypress = function(view, _event) {
        var event = _event;
        if (inOrNearComposition(view, event) || !event.charCode || event.ctrlKey && !event.altKey || mac && event.metaKey) return;
        if (view.someProp("handleKeyPress", function(f) {
          return f(view, event);
        })) {
          event.preventDefault();
          return;
        }
        var sel = view.state.selection;
        if (!(sel instanceof prosemirrorState.TextSelection) || !sel.$from.sameParent(sel.$to)) {
          var text = String.fromCharCode(event.charCode);
          var deflt = function deflt2() {
            return view.state.tr.insertText(text).scrollIntoView();
          };
          if (!/[\r\n]/.test(text) && !view.someProp("handleTextInput", function(f) {
            return f(view, sel.$from.pos, sel.$to.pos, text, deflt);
          })) view.dispatch(deflt());
          event.preventDefault();
        }
      };
      function eventCoords(event) {
        return {
          left: event.clientX,
          top: event.clientY
        };
      }
      function isNear(event, click) {
        var dx = click.x - event.clientX, dy = click.y - event.clientY;
        return dx * dx + dy * dy < 100;
      }
      function runHandlerOnContext(view, propName, pos, inside, event) {
        if (inside == -1) return false;
        var $pos = view.state.doc.resolve(inside);
        var _loop3 = function _loop32(i2) {
          if (view.someProp(propName, function(f) {
            return i2 > $pos.depth ? f(view, pos, $pos.nodeAfter, $pos.before(i2), event, true) : f(view, pos, $pos.node(i2), $pos.before(i2), event, false);
          })) return {
            v: true
          };
        }, _ret2;
        for (var i = $pos.depth + 1; i > 0; i--) {
          _ret2 = _loop3(i);
          if (_ret2) return _ret2.v;
        }
        return false;
      }
      function updateSelection(view, selection, origin) {
        if (!view.focused) view.focus();
        if (view.state.selection.eq(selection)) return;
        var tr = view.state.tr.setSelection(selection);
        if (origin == "pointer") tr.setMeta("pointer", true);
        view.dispatch(tr);
      }
      function selectClickedLeaf(view, inside) {
        if (inside == -1) return false;
        var $pos = view.state.doc.resolve(inside), node = $pos.nodeAfter;
        if (node && node.isAtom && prosemirrorState.NodeSelection.isSelectable(node)) {
          updateSelection(view, new prosemirrorState.NodeSelection($pos), "pointer");
          return true;
        }
        return false;
      }
      function selectClickedNode(view, inside) {
        if (inside == -1) return false;
        var sel = view.state.selection, selectedNode, selectAt;
        if (sel instanceof prosemirrorState.NodeSelection) selectedNode = sel.node;
        var $pos = view.state.doc.resolve(inside);
        for (var i = $pos.depth + 1; i > 0; i--) {
          var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
          if (prosemirrorState.NodeSelection.isSelectable(node)) {
            if (selectedNode && sel.$from.depth > 0 && i >= sel.$from.depth && $pos.before(sel.$from.depth + 1) == sel.$from.pos) selectAt = $pos.before(sel.$from.depth);
            else selectAt = $pos.before(i);
            break;
          }
        }
        if (selectAt != null) {
          updateSelection(view, prosemirrorState.NodeSelection.create(view.state.doc, selectAt), "pointer");
          return true;
        } else {
          return false;
        }
      }
      function handleSingleClick(view, pos, inside, event, selectNode) {
        return runHandlerOnContext(view, "handleClickOn", pos, inside, event) || view.someProp("handleClick", function(f) {
          return f(view, pos, event);
        }) || (selectNode ? selectClickedNode(view, inside) : selectClickedLeaf(view, inside));
      }
      function handleDoubleClick(view, pos, inside, event) {
        return runHandlerOnContext(view, "handleDoubleClickOn", pos, inside, event) || view.someProp("handleDoubleClick", function(f) {
          return f(view, pos, event);
        });
      }
      function handleTripleClick(view, pos, inside, event) {
        return runHandlerOnContext(view, "handleTripleClickOn", pos, inside, event) || view.someProp("handleTripleClick", function(f) {
          return f(view, pos, event);
        }) || defaultTripleClick(view, inside, event);
      }
      function defaultTripleClick(view, inside, event) {
        if (event.button != 0) return false;
        var doc2 = view.state.doc;
        if (inside == -1) {
          if (doc2.inlineContent) {
            updateSelection(view, prosemirrorState.TextSelection.create(doc2, 0, doc2.content.size), "pointer");
            return true;
          }
          return false;
        }
        var $pos = doc2.resolve(inside);
        for (var i = $pos.depth + 1; i > 0; i--) {
          var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
          var nodePos = $pos.before(i);
          if (node.inlineContent) updateSelection(view, prosemirrorState.TextSelection.create(doc2, nodePos + 1, nodePos + 1 + node.content.size), "pointer");
          else if (prosemirrorState.NodeSelection.isSelectable(node)) updateSelection(view, prosemirrorState.NodeSelection.create(doc2, nodePos), "pointer");
          else continue;
          return true;
        }
      }
      function forceDOMFlush(view) {
        return endComposition(view);
      }
      var selectNodeModifier = mac ? "metaKey" : "ctrlKey";
      handlers.mousedown = function(view, _event) {
        var event = _event;
        view.input.shiftKey = event.shiftKey;
        var flushed = forceDOMFlush(view);
        var now = Date.now(), type = "singleClick";
        if (now - view.input.lastClick.time < 500 && isNear(event, view.input.lastClick) && !event[selectNodeModifier] && view.input.lastClick.button == event.button) {
          if (view.input.lastClick.type == "singleClick") type = "doubleClick";
          else if (view.input.lastClick.type == "doubleClick") type = "tripleClick";
        }
        view.input.lastClick = {
          time: now,
          x: event.clientX,
          y: event.clientY,
          type,
          button: event.button
        };
        var pos = view.posAtCoords(eventCoords(event));
        if (!pos) return;
        if (type == "singleClick") {
          if (view.input.mouseDown) view.input.mouseDown.done();
          view.input.mouseDown = new MouseDown(view, pos, event, !!flushed);
        } else if ((type == "doubleClick" ? handleDoubleClick : handleTripleClick)(view, pos.pos, pos.inside, event)) {
          event.preventDefault();
        } else {
          setSelectionOrigin(view, "pointer");
        }
      };
      var MouseDown = (function() {
        function MouseDown2(view, pos, event, flushed) {
          var _this8 = this;
          _classCallCheck(this, MouseDown2);
          this.view = view;
          this.pos = pos;
          this.event = event;
          this.flushed = flushed;
          this.delayedSelectionSync = false;
          this.mightDrag = null;
          this.startDoc = view.state.doc;
          this.selectNode = !!event[selectNodeModifier];
          this.allowDefault = event.shiftKey;
          var targetNode, targetPos;
          if (pos.inside > -1) {
            targetNode = view.state.doc.nodeAt(pos.inside);
            targetPos = pos.inside;
          } else {
            var $pos = view.state.doc.resolve(pos.pos);
            targetNode = $pos.parent;
            targetPos = $pos.depth ? $pos.before() : 0;
          }
          var target = flushed ? null : event.target;
          var targetDesc = target ? view.docView.nearestDesc(target, true) : null;
          this.target = targetDesc && targetDesc.nodeDOM.nodeType == 1 ? targetDesc.nodeDOM : null;
          var selection = view.state.selection;
          if (event.button == 0 && targetNode.type.spec.draggable && targetNode.type.spec.selectable !== false || selection instanceof prosemirrorState.NodeSelection && selection.from <= targetPos && selection.to > targetPos) this.mightDrag = {
            node: targetNode,
            pos: targetPos,
            addAttr: !!(this.target && !this.target.draggable),
            setUneditable: !!(this.target && gecko && !this.target.hasAttribute("contentEditable"))
          };
          if (this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable)) {
            this.view.domObserver.stop();
            if (this.mightDrag.addAttr) this.target.draggable = true;
            if (this.mightDrag.setUneditable) setTimeout(function() {
              if (_this8.view.input.mouseDown == _this8) _this8.target.setAttribute("contentEditable", "false");
            }, 20);
            this.view.domObserver.start();
          }
          view.root.addEventListener("mouseup", this.up = this.up.bind(this));
          view.root.addEventListener("mousemove", this.move = this.move.bind(this));
          setSelectionOrigin(view, "pointer");
        }
        _createClass(MouseDown2, [{
          key: "done",
          value: function done() {
            var _this9 = this;
            this.view.root.removeEventListener("mouseup", this.up);
            this.view.root.removeEventListener("mousemove", this.move);
            if (this.mightDrag && this.target) {
              this.view.domObserver.stop();
              if (this.mightDrag.addAttr) this.target.removeAttribute("draggable");
              if (this.mightDrag.setUneditable) this.target.removeAttribute("contentEditable");
              this.view.domObserver.start();
            }
            if (this.delayedSelectionSync) setTimeout(function() {
              return selectionToDOM(_this9.view);
            });
            this.view.input.mouseDown = null;
          }
        }, {
          key: "up",
          value: function up(event) {
            this.done();
            if (!this.view.dom.contains(event.target)) return;
            var pos = this.pos;
            if (this.view.state.doc != this.startDoc) pos = this.view.posAtCoords(eventCoords(event));
            this.updateAllowDefault(event);
            if (this.allowDefault || !pos) {
              setSelectionOrigin(this.view, "pointer");
            } else if (handleSingleClick(this.view, pos.pos, pos.inside, event, this.selectNode)) {
              event.preventDefault();
            } else if (event.button == 0 && (this.flushed || safari && this.mightDrag && !this.mightDrag.node.isAtom || chrome && !this.view.state.selection.visible && Math.min(Math.abs(pos.pos - this.view.state.selection.from), Math.abs(pos.pos - this.view.state.selection.to)) <= 2)) {
              updateSelection(this.view, prosemirrorState.Selection.near(this.view.state.doc.resolve(pos.pos)), "pointer");
              event.preventDefault();
            } else {
              setSelectionOrigin(this.view, "pointer");
            }
          }
        }, {
          key: "move",
          value: function move(event) {
            this.updateAllowDefault(event);
            setSelectionOrigin(this.view, "pointer");
            if (event.buttons == 0) this.done();
          }
        }, {
          key: "updateAllowDefault",
          value: function updateAllowDefault(event) {
            if (!this.allowDefault && (Math.abs(this.event.x - event.clientX) > 4 || Math.abs(this.event.y - event.clientY) > 4)) this.allowDefault = true;
          }
        }]);
        return MouseDown2;
      })();
      handlers.touchstart = function(view) {
        view.input.lastTouch = Date.now();
        forceDOMFlush(view);
        setSelectionOrigin(view, "pointer");
      };
      handlers.touchmove = function(view) {
        view.input.lastTouch = Date.now();
        setSelectionOrigin(view, "pointer");
      };
      handlers.contextmenu = function(view) {
        return forceDOMFlush(view);
      };
      function inOrNearComposition(view, event) {
        if (view.composing) return true;
        if (safari && Math.abs(event.timeStamp - view.input.compositionEndedAt) < 500) {
          view.input.compositionEndedAt = -2e8;
          return true;
        }
        return false;
      }
      var timeoutComposition = android ? 5e3 : -1;
      editHandlers.compositionstart = editHandlers.compositionupdate = function(view) {
        if (!view.composing) {
          view.domObserver.flush();
          var state = view.state, $pos = state.selection.$to;
          if (state.selection instanceof prosemirrorState.TextSelection && (state.storedMarks || !$pos.textOffset && $pos.parentOffset && $pos.nodeBefore.marks.some(function(m) {
            return m.type.spec.inclusive === false;
          }))) {
            view.markCursor = view.state.storedMarks || $pos.marks();
            endComposition(view, true);
            view.markCursor = null;
          } else {
            endComposition(view, !state.selection.empty);
            if (gecko && state.selection.empty && $pos.parentOffset && !$pos.textOffset && $pos.nodeBefore.marks.length) {
              var sel = view.domSelectionRange();
              for (var node = sel.focusNode, offset = sel.focusOffset; node && node.nodeType == 1 && offset != 0; ) {
                var before = offset < 0 ? node.lastChild : node.childNodes[offset - 1];
                if (!before) break;
                if (before.nodeType == 3) {
                  var _sel = view.domSelection();
                  if (_sel) _sel.collapse(before, before.nodeValue.length);
                  break;
                } else {
                  node = before;
                  offset = -1;
                }
              }
            }
          }
          view.input.composing = true;
        }
        scheduleComposeEnd(view, timeoutComposition);
      };
      editHandlers.compositionend = function(view, event) {
        if (view.composing) {
          view.input.composing = false;
          view.input.compositionEndedAt = event.timeStamp;
          view.input.compositionPendingChanges = view.domObserver.pendingRecords().length ? view.input.compositionID : 0;
          view.input.compositionNode = null;
          if (view.input.compositionPendingChanges) Promise.resolve().then(function() {
            return view.domObserver.flush();
          });
          view.input.compositionID++;
          scheduleComposeEnd(view, 20);
        }
      };
      function scheduleComposeEnd(view, delay) {
        clearTimeout(view.input.composingTimeout);
        if (delay > -1) view.input.composingTimeout = setTimeout(function() {
          return endComposition(view);
        }, delay);
      }
      function clearComposition(view) {
        if (view.composing) {
          view.input.composing = false;
          view.input.compositionEndedAt = timestampFromCustomEvent();
        }
        while (view.input.compositionNodes.length > 0) view.input.compositionNodes.pop().markParentsDirty();
      }
      function findCompositionNode(view) {
        var sel = view.domSelectionRange();
        if (!sel.focusNode) return null;
        var textBefore = textNodeBefore$1(sel.focusNode, sel.focusOffset);
        var textAfter = textNodeAfter$1(sel.focusNode, sel.focusOffset);
        if (textBefore && textAfter && textBefore != textAfter) {
          var descAfter = textAfter.pmViewDesc, lastChanged = view.domObserver.lastChangedTextNode;
          if (textBefore == lastChanged || textAfter == lastChanged) return lastChanged;
          if (!descAfter || !descAfter.isText(textAfter.nodeValue)) {
            return textAfter;
          } else if (view.input.compositionNode == textAfter) {
            var descBefore = textBefore.pmViewDesc;
            if (!(!descBefore || !descBefore.isText(textBefore.nodeValue))) return textAfter;
          }
        }
        return textBefore || textAfter;
      }
      function timestampFromCustomEvent() {
        var event = document.createEvent("Event");
        event.initEvent("event", true, true);
        return event.timeStamp;
      }
      function endComposition(view) {
        var restarting = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (android && view.domObserver.flushingSoon >= 0) return;
        view.domObserver.forceFlush();
        clearComposition(view);
        if (restarting || view.docView && view.docView.dirty) {
          var sel = selectionFromDOM(view), cur = view.state.selection;
          if (sel && !sel.eq(cur)) view.dispatch(view.state.tr.setSelection(sel));
          else if ((view.markCursor || restarting) && !cur.$from.node(cur.$from.sharedDepth(cur.to)).inlineContent) view.dispatch(view.state.tr.deleteSelection());
          else view.updateState(view.state);
          return true;
        }
        return false;
      }
      function captureCopy(view, dom) {
        if (!view.dom.parentNode) return;
        var wrap = view.dom.parentNode.appendChild(document.createElement("div"));
        wrap.appendChild(dom);
        wrap.style.cssText = "position: fixed; left: -10000px; top: 10px";
        var sel = getSelection(), range = document.createRange();
        range.selectNodeContents(dom);
        view.dom.blur();
        sel.removeAllRanges();
        sel.addRange(range);
        setTimeout(function() {
          if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
          view.focus();
        }, 50);
      }
      var brokenClipboardAPI = ie && ie_version < 15 || ios && webkit_version < 604;
      handlers.copy = editHandlers.cut = function(view, _event) {
        var event = _event;
        var sel = view.state.selection, cut = event.type == "cut";
        if (sel.empty) return;
        var data = brokenClipboardAPI ? null : event.clipboardData;
        var slice = sel.content(), _serializeForClipboar = _serializeForClipboard(view, slice), dom = _serializeForClipboar.dom, text = _serializeForClipboar.text;
        if (data) {
          event.preventDefault();
          data.clearData();
          data.setData("text/html", dom.innerHTML);
          data.setData("text/plain", text);
        } else {
          captureCopy(view, dom);
        }
        if (cut) view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
      };
      function sliceSingleNode(slice) {
        return slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1 ? slice.content.firstChild : null;
      }
      function capturePaste(view, event) {
        if (!view.dom.parentNode) return;
        var plainText = view.input.shiftKey || view.state.selection.$from.parent.type.spec.code;
        var target = view.dom.parentNode.appendChild(document.createElement(plainText ? "textarea" : "div"));
        if (!plainText) target.contentEditable = "true";
        target.style.cssText = "position: fixed; left: -10000px; top: 10px";
        target.focus();
        var plain = view.input.shiftKey && view.input.lastKeyCode != 45;
        setTimeout(function() {
          view.focus();
          if (target.parentNode) target.parentNode.removeChild(target);
          if (plainText) doPaste(view, target.value, null, plain, event);
          else doPaste(view, target.textContent, target.innerHTML, plain, event);
        }, 50);
      }
      function doPaste(view, text, html, preferPlain, event) {
        var slice = parseFromClipboard(view, text, html, preferPlain, view.state.selection.$from);
        if (view.someProp("handlePaste", function(f) {
          return f(view, event, slice || prosemirrorModel.Slice.empty);
        })) return true;
        if (!slice) return false;
        var singleNode = sliceSingleNode(slice);
        var tr = singleNode ? view.state.tr.replaceSelectionWith(singleNode, preferPlain) : view.state.tr.replaceSelection(slice);
        view.dispatch(tr.scrollIntoView().setMeta("paste", true).setMeta("uiEvent", "paste"));
        return true;
      }
      function getText(clipboardData) {
        var text = clipboardData.getData("text/plain") || clipboardData.getData("Text");
        if (text) return text;
        var uris = clipboardData.getData("text/uri-list");
        return uris ? uris.replace(/\r?\n/g, " ") : "";
      }
      editHandlers.paste = function(view, _event) {
        var event = _event;
        if (view.composing && !android) return;
        var data = brokenClipboardAPI ? null : event.clipboardData;
        var plain = view.input.shiftKey && view.input.lastKeyCode != 45;
        if (data && doPaste(view, getText(data), data.getData("text/html"), plain, event)) event.preventDefault();
        else capturePaste(view, event);
      };
      var Dragging = _createClass(function Dragging2(slice, move, node) {
        _classCallCheck(this, Dragging2);
        this.slice = slice;
        this.move = move;
        this.node = node;
      });
      var dragCopyModifier = mac ? "altKey" : "ctrlKey";
      function dragMoves(view, event) {
        var moves = view.someProp("dragCopies", function(test) {
          return !test(event);
        });
        return moves != null ? moves : !event[dragCopyModifier];
      }
      handlers.dragstart = function(view, _event) {
        var event = _event;
        var mouseDown = view.input.mouseDown;
        if (mouseDown) mouseDown.done();
        if (!event.dataTransfer) return;
        var sel = view.state.selection;
        var pos = sel.empty ? null : view.posAtCoords(eventCoords(event));
        var node;
        if (pos && pos.pos >= sel.from && pos.pos <= (sel instanceof prosemirrorState.NodeSelection ? sel.to - 1 : sel.to)) ;
        else if (mouseDown && mouseDown.mightDrag) {
          node = prosemirrorState.NodeSelection.create(view.state.doc, mouseDown.mightDrag.pos);
        } else if (event.target && event.target.nodeType == 1) {
          var desc = view.docView.nearestDesc(event.target, true);
          if (desc && desc.node.type.spec.draggable && desc != view.docView) node = prosemirrorState.NodeSelection.create(view.state.doc, desc.posBefore);
        }
        var draggedSlice = (node || view.state.selection).content();
        var _serializeForClipboar2 = _serializeForClipboard(view, draggedSlice), dom = _serializeForClipboar2.dom, text = _serializeForClipboar2.text, slice = _serializeForClipboar2.slice;
        if (!event.dataTransfer.files.length || !chrome || chrome_version > 120) event.dataTransfer.clearData();
        event.dataTransfer.setData(brokenClipboardAPI ? "Text" : "text/html", dom.innerHTML);
        event.dataTransfer.effectAllowed = "copyMove";
        if (!brokenClipboardAPI) event.dataTransfer.setData("text/plain", text);
        view.dragging = new Dragging(slice, dragMoves(view, event), node);
      };
      handlers.dragend = function(view) {
        var dragging = view.dragging;
        window.setTimeout(function() {
          if (view.dragging == dragging) view.dragging = null;
        }, 50);
      };
      editHandlers.dragover = editHandlers.dragenter = function(_, e) {
        return e.preventDefault();
      };
      editHandlers.drop = function(view, _event) {
        var event = _event;
        var dragging = view.dragging;
        view.dragging = null;
        if (!event.dataTransfer) return;
        var eventPos = view.posAtCoords(eventCoords(event));
        if (!eventPos) return;
        var $mouse = view.state.doc.resolve(eventPos.pos);
        var slice = dragging && dragging.slice;
        if (slice) {
          view.someProp("transformPasted", function(f) {
            slice = f(slice, view, false);
          });
        } else {
          slice = parseFromClipboard(view, getText(event.dataTransfer), brokenClipboardAPI ? null : event.dataTransfer.getData("text/html"), false, $mouse);
        }
        var move = !!(dragging && dragMoves(view, event));
        if (view.someProp("handleDrop", function(f) {
          return f(view, event, slice || prosemirrorModel.Slice.empty, move);
        })) {
          event.preventDefault();
          return;
        }
        if (!slice) return;
        event.preventDefault();
        var insertPos = slice ? prosemirrorTransform.dropPoint(view.state.doc, $mouse.pos, slice) : $mouse.pos;
        if (insertPos == null) insertPos = $mouse.pos;
        var tr = view.state.tr;
        if (move) {
          var node = dragging.node;
          if (node) node.replace(tr);
          else tr.deleteSelection();
        }
        var pos = tr.mapping.map(insertPos);
        var isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1;
        var beforeInsert = tr.doc;
        if (isNode) tr.replaceRangeWith(pos, pos, slice.content.firstChild);
        else tr.replaceRange(pos, pos, slice);
        if (tr.doc.eq(beforeInsert)) return;
        var $pos = tr.doc.resolve(pos);
        if (isNode && prosemirrorState.NodeSelection.isSelectable(slice.content.firstChild) && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild)) {
          tr.setSelection(new prosemirrorState.NodeSelection($pos));
        } else {
          var end = tr.mapping.map(insertPos);
          tr.mapping.maps[tr.mapping.maps.length - 1].forEach(function(_from, _to, _newFrom, newTo) {
            return end = newTo;
          });
          tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(end)));
        }
        view.focus();
        view.dispatch(tr.setMeta("uiEvent", "drop"));
      };
      handlers.focus = function(view) {
        view.input.lastFocus = Date.now();
        if (!view.focused) {
          view.domObserver.stop();
          view.dom.classList.add("ProseMirror-focused");
          view.domObserver.start();
          view.focused = true;
          setTimeout(function() {
            if (view.docView && view.hasFocus() && !view.domObserver.currentSelection.eq(view.domSelectionRange())) selectionToDOM(view);
          }, 20);
        }
      };
      handlers.blur = function(view, _event) {
        var event = _event;
        if (view.focused) {
          view.domObserver.stop();
          view.dom.classList.remove("ProseMirror-focused");
          view.domObserver.start();
          if (event.relatedTarget && view.dom.contains(event.relatedTarget)) view.domObserver.currentSelection.clear();
          view.focused = false;
        }
      };
      handlers.beforeinput = function(view, _event) {
        var event = _event;
        if (chrome && android && event.inputType == "deleteContentBackward") {
          view.domObserver.flushSoon();
          var domChangeCount = view.input.domChangeCount;
          setTimeout(function() {
            if (view.input.domChangeCount != domChangeCount) return;
            view.dom.blur();
            view.focus();
            if (view.someProp("handleKeyDown", function(f) {
              return f(view, keyEvent(8, "Backspace"));
            })) return;
            var $cursor = view.state.selection.$cursor;
            if ($cursor && $cursor.pos > 0) view.dispatch(view.state.tr["delete"]($cursor.pos - 1, $cursor.pos).scrollIntoView());
          }, 50);
        }
      };
      for (prop in editHandlers) handlers[prop] = editHandlers[prop];
      var prop;
      function compareObjs(a, b) {
        if (a == b) return true;
        for (var p in a) if (a[p] !== b[p]) return false;
        for (var _p in b) if (!(_p in a)) return false;
        return true;
      }
      var WidgetType = (function() {
        function WidgetType2(toDOM, spec) {
          _classCallCheck(this, WidgetType2);
          this.toDOM = toDOM;
          this.spec = spec || noSpec;
          this.side = this.spec.side || 0;
        }
        _createClass(WidgetType2, [{
          key: "map",
          value: function map(mapping, span, offset, oldOffset) {
            var _mapping$mapResult = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1), pos = _mapping$mapResult.pos, deleted = _mapping$mapResult.deleted;
            return deleted ? null : new Decoration(pos - offset, pos - offset, this);
          }
        }, {
          key: "valid",
          value: function valid() {
            return true;
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return this == other || other instanceof WidgetType2 && (this.spec.key && this.spec.key == other.spec.key || this.toDOM == other.toDOM && compareObjs(this.spec, other.spec));
          }
        }, {
          key: "destroy",
          value: function destroy(node) {
            if (this.spec.destroy) this.spec.destroy(node);
          }
        }]);
        return WidgetType2;
      })();
      var InlineType = (function() {
        function InlineType2(attrs, spec) {
          _classCallCheck(this, InlineType2);
          this.attrs = attrs;
          this.spec = spec || noSpec;
        }
        _createClass(InlineType2, [{
          key: "map",
          value: function map(mapping, span, offset, oldOffset) {
            var from = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset;
            var to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset;
            return from >= to ? null : new Decoration(from, to, this);
          }
        }, {
          key: "valid",
          value: function valid(_, span) {
            return span.from < span.to;
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return this == other || other instanceof InlineType2 && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
          }
        }, {
          key: "destroy",
          value: function destroy() {
          }
        }], [{
          key: "is",
          value: function is(span) {
            return span.type instanceof InlineType2;
          }
        }]);
        return InlineType2;
      })();
      var NodeType = (function() {
        function NodeType2(attrs, spec) {
          _classCallCheck(this, NodeType2);
          this.attrs = attrs;
          this.spec = spec || noSpec;
        }
        _createClass(NodeType2, [{
          key: "map",
          value: function map(mapping, span, offset, oldOffset) {
            var from = mapping.mapResult(span.from + oldOffset, 1);
            if (from.deleted) return null;
            var to = mapping.mapResult(span.to + oldOffset, -1);
            if (to.deleted || to.pos <= from.pos) return null;
            return new Decoration(from.pos - offset, to.pos - offset, this);
          }
        }, {
          key: "valid",
          value: function valid(node, span) {
            var _node$content$findInd = node.content.findIndex(span.from), index = _node$content$findInd.index, offset = _node$content$findInd.offset, child;
            return offset == span.from && !(child = node.child(index)).isText && offset + child.nodeSize == span.to;
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return this == other || other instanceof NodeType2 && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
          }
        }, {
          key: "destroy",
          value: function destroy() {
          }
        }]);
        return NodeType2;
      })();
      var Decoration = (function() {
        function Decoration2(from, to, type) {
          _classCallCheck(this, Decoration2);
          this.from = from;
          this.to = to;
          this.type = type;
        }
        _createClass(Decoration2, [{
          key: "copy",
          value: function copy(from, to) {
            return new Decoration2(from, to, this.type);
          }
        }, {
          key: "eq",
          value: function eq(other) {
            var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return this.type.eq(other.type) && this.from + offset == other.from && this.to + offset == other.to;
          }
        }, {
          key: "map",
          value: function map(mapping, offset, oldOffset) {
            return this.type.map(mapping, this, offset, oldOffset);
          }
        }, {
          key: "spec",
          get: function get() {
            return this.type.spec;
          }
        }, {
          key: "inline",
          get: function get() {
            return this.type instanceof InlineType;
          }
        }, {
          key: "widget",
          get: function get() {
            return this.type instanceof WidgetType;
          }
        }], [{
          key: "widget",
          value: function widget(pos, toDOM, spec) {
            return new Decoration2(pos, pos, new WidgetType(toDOM, spec));
          }
        }, {
          key: "inline",
          value: function inline(from, to, attrs, spec) {
            return new Decoration2(from, to, new InlineType(attrs, spec));
          }
        }, {
          key: "node",
          value: function node(from, to, attrs, spec) {
            return new Decoration2(from, to, new NodeType(attrs, spec));
          }
        }]);
        return Decoration2;
      })();
      var none = [];
      var noSpec = {};
      var DecorationSet = (function() {
        function DecorationSet2(local, children) {
          _classCallCheck(this, DecorationSet2);
          this.local = local.length ? local : none;
          this.children = children.length ? children : none;
        }
        _createClass(DecorationSet2, [{
          key: "find",
          value: function find(start, end, predicate) {
            var result = [];
            this.findInner(start == null ? 0 : start, end == null ? 1e9 : end, result, 0, predicate);
            return result;
          }
        }, {
          key: "findInner",
          value: function findInner(start, end, result, offset, predicate) {
            for (var i = 0; i < this.local.length; i++) {
              var span = this.local[i];
              if (span.from <= end && span.to >= start && (!predicate || predicate(span.spec))) result.push(span.copy(span.from + offset, span.to + offset));
            }
            for (var _i6 = 0; _i6 < this.children.length; _i6 += 3) {
              if (this.children[_i6] < end && this.children[_i6 + 1] > start) {
                var childOff = this.children[_i6] + 1;
                this.children[_i6 + 2].findInner(start - childOff, end - childOff, result, offset + childOff, predicate);
              }
            }
          }
        }, {
          key: "map",
          value: function map(mapping, doc2, options) {
            if (this == empty || mapping.maps.length == 0) return this;
            return this.mapInner(mapping, doc2, 0, 0, options || noSpec);
          }
        }, {
          key: "mapInner",
          value: function mapInner(mapping, node, offset, oldOffset, options) {
            var newLocal;
            for (var i = 0; i < this.local.length; i++) {
              var mapped = this.local[i].map(mapping, offset, oldOffset);
              if (mapped && mapped.type.valid(node, mapped)) (newLocal || (newLocal = [])).push(mapped);
              else if (options.onRemove) options.onRemove(this.local[i].spec);
            }
            if (this.children.length) return mapChildren(this.children, newLocal || [], mapping, node, offset, oldOffset, options);
            else return newLocal ? new DecorationSet2(newLocal.sort(byPos), none) : empty;
          }
        }, {
          key: "add",
          value: function add(doc2, decorations) {
            if (!decorations.length) return this;
            if (this == empty) return DecorationSet2.create(doc2, decorations);
            return this.addInner(doc2, decorations, 0);
          }
        }, {
          key: "addInner",
          value: function addInner(doc2, decorations, offset) {
            var _this10 = this;
            var children, childIndex = 0;
            doc2.forEach(function(childNode, childOffset) {
              var baseOffset = childOffset + offset, found;
              if (!(found = takeSpansForNode(decorations, childNode, baseOffset))) return;
              if (!children) children = _this10.children.slice();
              while (childIndex < children.length && children[childIndex] < childOffset) childIndex += 3;
              if (children[childIndex] == childOffset) children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found, baseOffset + 1);
              else children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, buildTree(found, childNode, baseOffset + 1, noSpec));
              childIndex += 3;
            });
            var local = moveSpans(childIndex ? withoutNulls(decorations) : decorations, -offset);
            for (var i = 0; i < local.length; i++) if (!local[i].type.valid(doc2, local[i])) local.splice(i--, 1);
            return new DecorationSet2(local.length ? this.local.concat(local).sort(byPos) : this.local, children || this.children);
          }
        }, {
          key: "remove",
          value: function remove(decorations) {
            if (decorations.length == 0 || this == empty) return this;
            return this.removeInner(decorations, 0);
          }
        }, {
          key: "removeInner",
          value: function removeInner(decorations, offset) {
            var children = this.children, local = this.local;
            for (var i = 0; i < children.length; i += 3) {
              var found = void 0;
              var from = children[i] + offset, to = children[i + 1] + offset;
              for (var j = 0, span; j < decorations.length; j++) if (span = decorations[j]) {
                if (span.from > from && span.to < to) {
                  decorations[j] = null;
                  (found || (found = [])).push(span);
                }
              }
              if (!found) continue;
              if (children == this.children) children = this.children.slice();
              var removed = children[i + 2].removeInner(found, from + 1);
              if (removed != empty) {
                children[i + 2] = removed;
              } else {
                children.splice(i, 3);
                i -= 3;
              }
            }
            if (local.length) {
              for (var _i7 = 0, _span; _i7 < decorations.length; _i7++) if (_span = decorations[_i7]) {
                for (var _j2 = 0; _j2 < local.length; _j2++) if (local[_j2].eq(_span, offset)) {
                  if (local == this.local) local = this.local.slice();
                  local.splice(_j2--, 1);
                }
              }
            }
            if (children == this.children && local == this.local) return this;
            return local.length || children.length ? new DecorationSet2(local, children) : empty;
          }
        }, {
          key: "forChild",
          value: function forChild(offset, node) {
            if (this == empty) return this;
            if (node.isLeaf) return DecorationSet2.empty;
            var child, local;
            for (var i = 0; i < this.children.length; i += 3) if (this.children[i] >= offset) {
              if (this.children[i] == offset) child = this.children[i + 2];
              break;
            }
            var start = offset + 1, end = start + node.content.size;
            for (var _i8 = 0; _i8 < this.local.length; _i8++) {
              var dec = this.local[_i8];
              if (dec.from < end && dec.to > start && dec.type instanceof InlineType) {
                var from = Math.max(start, dec.from) - start, to = Math.min(end, dec.to) - start;
                if (from < to) (local || (local = [])).push(dec.copy(from, to));
              }
            }
            if (local) {
              var localSet = new DecorationSet2(local.sort(byPos), none);
              return child ? new DecorationGroup([localSet, child]) : localSet;
            }
            return child || empty;
          }
        }, {
          key: "eq",
          value: function eq(other) {
            if (this == other) return true;
            if (!(other instanceof DecorationSet2) || this.local.length != other.local.length || this.children.length != other.children.length) return false;
            for (var i = 0; i < this.local.length; i++) if (!this.local[i].eq(other.local[i])) return false;
            for (var _i9 = 0; _i9 < this.children.length; _i9 += 3) if (this.children[_i9] != other.children[_i9] || this.children[_i9 + 1] != other.children[_i9 + 1] || !this.children[_i9 + 2].eq(other.children[_i9 + 2])) return false;
            return true;
          }
        }, {
          key: "locals",
          value: function locals(node) {
            return removeOverlap(this.localsInner(node));
          }
        }, {
          key: "localsInner",
          value: function localsInner(node) {
            if (this == empty) return none;
            if (node.inlineContent || !this.local.some(InlineType.is)) return this.local;
            var result = [];
            for (var i = 0; i < this.local.length; i++) {
              if (!(this.local[i].type instanceof InlineType)) result.push(this.local[i]);
            }
            return result;
          }
        }, {
          key: "forEachSet",
          value: function forEachSet(f) {
            f(this);
          }
        }], [{
          key: "create",
          value: function create(doc2, decorations) {
            return decorations.length ? buildTree(decorations, doc2, 0, noSpec) : empty;
          }
        }]);
        return DecorationSet2;
      })();
      DecorationSet.empty = new DecorationSet([], []);
      DecorationSet.removeOverlap = removeOverlap;
      var empty = DecorationSet.empty;
      var DecorationGroup = (function() {
        function DecorationGroup2(members) {
          _classCallCheck(this, DecorationGroup2);
          this.members = members;
        }
        _createClass(DecorationGroup2, [{
          key: "map",
          value: function map(mapping, doc2) {
            var mappedDecos = this.members.map(function(member) {
              return member.map(mapping, doc2, noSpec);
            });
            return DecorationGroup2.from(mappedDecos);
          }
        }, {
          key: "forChild",
          value: function forChild(offset, child) {
            if (child.isLeaf) return DecorationSet.empty;
            var found = [];
            for (var i = 0; i < this.members.length; i++) {
              var result = this.members[i].forChild(offset, child);
              if (result == empty) continue;
              if (result instanceof DecorationGroup2) found = found.concat(result.members);
              else found.push(result);
            }
            return DecorationGroup2.from(found);
          }
        }, {
          key: "eq",
          value: function eq(other) {
            if (!(other instanceof DecorationGroup2) || other.members.length != this.members.length) return false;
            for (var i = 0; i < this.members.length; i++) if (!this.members[i].eq(other.members[i])) return false;
            return true;
          }
        }, {
          key: "locals",
          value: function locals(node) {
            var result, sorted = true;
            for (var i = 0; i < this.members.length; i++) {
              var locals2 = this.members[i].localsInner(node);
              if (!locals2.length) continue;
              if (!result) {
                result = locals2;
              } else {
                if (sorted) {
                  result = result.slice();
                  sorted = false;
                }
                for (var j = 0; j < locals2.length; j++) result.push(locals2[j]);
              }
            }
            return result ? removeOverlap(sorted ? result : result.sort(byPos)) : none;
          }
        }, {
          key: "forEachSet",
          value: function forEachSet(f) {
            for (var i = 0; i < this.members.length; i++) this.members[i].forEachSet(f);
          }
        }], [{
          key: "from",
          value: function from(members) {
            switch (members.length) {
              case 0:
                return empty;
              case 1:
                return members[0];
              default:
                return new DecorationGroup2(members.every(function(m) {
                  return m instanceof DecorationSet;
                }) ? members : members.reduce(function(r, m) {
                  return r.concat(m instanceof DecorationSet ? m : m.members);
                }, []));
            }
          }
        }]);
        return DecorationGroup2;
      })();
      function mapChildren(oldChildren, newLocal, mapping, node, offset, oldOffset, options) {
        var children = oldChildren.slice();
        var _loop4 = function _loop42(_baseOffset) {
          var moved = 0;
          mapping.maps[i].forEach(function(oldStart, oldEnd, newStart, newEnd) {
            var dSize = newEnd - newStart - (oldEnd - oldStart);
            for (var _i13 = 0; _i13 < children.length; _i13 += 3) {
              var end = children[_i13 + 1];
              if (end < 0 || oldStart > end + _baseOffset - moved) continue;
              var start = children[_i13] + _baseOffset - moved;
              if (oldEnd >= start) {
                children[_i13 + 1] = oldStart <= start ? -2 : -1;
              } else if (oldStart >= _baseOffset && dSize) {
                children[_i13] += dSize;
                children[_i13 + 1] += dSize;
              }
            }
            moved += dSize;
          });
          _baseOffset = mapping.maps[i].map(_baseOffset, -1);
          baseOffset = _baseOffset;
        };
        for (var i = 0, baseOffset = oldOffset; i < mapping.maps.length; i++) {
          _loop4(baseOffset);
        }
        var mustRebuild = false;
        for (var _i10 = 0; _i10 < children.length; _i10 += 3) if (children[_i10 + 1] < 0) {
          if (children[_i10 + 1] == -2) {
            mustRebuild = true;
            children[_i10 + 1] = -1;
            continue;
          }
          var from = mapping.map(oldChildren[_i10] + oldOffset), fromLocal = from - offset;
          if (fromLocal < 0 || fromLocal >= node.content.size) {
            mustRebuild = true;
            continue;
          }
          var to = mapping.map(oldChildren[_i10 + 1] + oldOffset, -1), toLocal = to - offset;
          var _node$content$findInd2 = node.content.findIndex(fromLocal), index = _node$content$findInd2.index, childOffset = _node$content$findInd2.offset;
          var childNode = node.maybeChild(index);
          if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
            var mapped = children[_i10 + 2].mapInner(mapping, childNode, from + 1, oldChildren[_i10] + oldOffset + 1, options);
            if (mapped != empty) {
              children[_i10] = fromLocal;
              children[_i10 + 1] = toLocal;
              children[_i10 + 2] = mapped;
            } else {
              children[_i10 + 1] = -2;
              mustRebuild = true;
            }
          } else {
            mustRebuild = true;
          }
        }
        if (mustRebuild) {
          var decorations = mapAndGatherRemainingDecorations(children, oldChildren, newLocal, mapping, offset, oldOffset, options);
          var built = buildTree(decorations, node, 0, options);
          newLocal = built.local;
          for (var _i11 = 0; _i11 < children.length; _i11 += 3) if (children[_i11 + 1] < 0) {
            children.splice(_i11, 3);
            _i11 -= 3;
          }
          for (var _i12 = 0, j = 0; _i12 < built.children.length; _i12 += 3) {
            var _from2 = built.children[_i12];
            while (j < children.length && children[j] < _from2) j += 3;
            children.splice(j, 0, built.children[_i12], built.children[_i12 + 1], built.children[_i12 + 2]);
          }
        }
        return new DecorationSet(newLocal.sort(byPos), children);
      }
      function moveSpans(spans, offset) {
        if (!offset || !spans.length) return spans;
        var result = [];
        for (var i = 0; i < spans.length; i++) {
          var span = spans[i];
          result.push(new Decoration(span.from + offset, span.to + offset, span.type));
        }
        return result;
      }
      function mapAndGatherRemainingDecorations(children, oldChildren, decorations, mapping, offset, oldOffset, options) {
        function gather(set, oldOffset2) {
          for (var i2 = 0; i2 < set.local.length; i2++) {
            var mapped = set.local[i2].map(mapping, offset, oldOffset2);
            if (mapped) decorations.push(mapped);
            else if (options.onRemove) options.onRemove(set.local[i2].spec);
          }
          for (var _i14 = 0; _i14 < set.children.length; _i14 += 3) gather(set.children[_i14 + 2], set.children[_i14] + oldOffset2 + 1);
        }
        for (var i = 0; i < children.length; i += 3) if (children[i + 1] == -1) gather(children[i + 2], oldChildren[i] + oldOffset + 1);
        return decorations;
      }
      function takeSpansForNode(spans, node, offset) {
        if (node.isLeaf) return null;
        var end = offset + node.nodeSize, found = null;
        for (var i = 0, span; i < spans.length; i++) {
          if ((span = spans[i]) && span.from > offset && span.to < end) {
            (found || (found = [])).push(span);
            spans[i] = null;
          }
        }
        return found;
      }
      function withoutNulls(array) {
        var result = [];
        for (var i = 0; i < array.length; i++) if (array[i] != null) result.push(array[i]);
        return result;
      }
      function buildTree(spans, node, offset, options) {
        var children = [], hasNulls = false;
        node.forEach(function(childNode, localStart) {
          var found = takeSpansForNode(spans, childNode, localStart + offset);
          if (found) {
            hasNulls = true;
            var subtree = buildTree(found, childNode, offset + localStart + 1, options);
            if (subtree != empty) children.push(localStart, localStart + childNode.nodeSize, subtree);
          }
        });
        var locals = moveSpans(hasNulls ? withoutNulls(spans) : spans, -offset).sort(byPos);
        for (var i = 0; i < locals.length; i++) if (!locals[i].type.valid(node, locals[i])) {
          if (options.onRemove) options.onRemove(locals[i].spec);
          locals.splice(i--, 1);
        }
        return locals.length || children.length ? new DecorationSet(locals, children) : empty;
      }
      function byPos(a, b) {
        return a.from - b.from || a.to - b.to;
      }
      function removeOverlap(spans) {
        var working = spans;
        for (var i = 0; i < working.length - 1; i++) {
          var span = working[i];
          if (span.from != span.to) for (var j = i + 1; j < working.length; j++) {
            var next = working[j];
            if (next.from == span.from) {
              if (next.to != span.to) {
                if (working == spans) working = spans.slice();
                working[j] = next.copy(next.from, span.to);
                insertAhead(working, j + 1, next.copy(span.to, next.to));
              }
              continue;
            } else {
              if (next.from < span.to) {
                if (working == spans) working = spans.slice();
                working[i] = span.copy(span.from, next.from);
                insertAhead(working, j, span.copy(next.from, span.to));
              }
              break;
            }
          }
        }
        return working;
      }
      function insertAhead(array, i, deco) {
        while (i < array.length && byPos(deco, array[i]) > 0) i++;
        array.splice(i, 0, deco);
      }
      function viewDecorations(view) {
        var found = [];
        view.someProp("decorations", function(f) {
          var result = f(view.state);
          if (result && result != empty) found.push(result);
        });
        if (view.cursorWrapper) found.push(DecorationSet.create(view.state.doc, [view.cursorWrapper.deco]));
        return DecorationGroup.from(found);
      }
      var observeOptions = {
        childList: true,
        characterData: true,
        characterDataOldValue: true,
        attributes: true,
        attributeOldValue: true,
        subtree: true
      };
      var useCharData = ie && ie_version <= 11;
      var SelectionState = (function() {
        function SelectionState2() {
          _classCallCheck(this, SelectionState2);
          this.anchorNode = null;
          this.anchorOffset = 0;
          this.focusNode = null;
          this.focusOffset = 0;
        }
        _createClass(SelectionState2, [{
          key: "set",
          value: function set(sel) {
            this.anchorNode = sel.anchorNode;
            this.anchorOffset = sel.anchorOffset;
            this.focusNode = sel.focusNode;
            this.focusOffset = sel.focusOffset;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.anchorNode = this.focusNode = null;
          }
        }, {
          key: "eq",
          value: function eq(sel) {
            return sel.anchorNode == this.anchorNode && sel.anchorOffset == this.anchorOffset && sel.focusNode == this.focusNode && sel.focusOffset == this.focusOffset;
          }
        }]);
        return SelectionState2;
      })();
      var DOMObserver = (function() {
        function DOMObserver2(view, handleDOMChange) {
          var _this11 = this;
          _classCallCheck(this, DOMObserver2);
          this.view = view;
          this.handleDOMChange = handleDOMChange;
          this.queue = [];
          this.flushingSoon = -1;
          this.observer = null;
          this.currentSelection = new SelectionState();
          this.onCharData = null;
          this.suppressingSelectionUpdates = false;
          this.lastChangedTextNode = null;
          this.observer = window.MutationObserver && new window.MutationObserver(function(mutations) {
            for (var i = 0; i < mutations.length; i++) _this11.queue.push(mutations[i]);
            if (ie && ie_version <= 11 && mutations.some(function(m) {
              return m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length;
            })) _this11.flushSoon();
            else _this11.flush();
          });
          if (useCharData) {
            this.onCharData = function(e) {
              _this11.queue.push({
                target: e.target,
                type: "characterData",
                oldValue: e.prevValue
              });
              _this11.flushSoon();
            };
          }
          this.onSelectionChange = this.onSelectionChange.bind(this);
        }
        _createClass(DOMObserver2, [{
          key: "flushSoon",
          value: function flushSoon() {
            var _this12 = this;
            if (this.flushingSoon < 0) this.flushingSoon = window.setTimeout(function() {
              _this12.flushingSoon = -1;
              _this12.flush();
            }, 20);
          }
        }, {
          key: "forceFlush",
          value: function forceFlush() {
            if (this.flushingSoon > -1) {
              window.clearTimeout(this.flushingSoon);
              this.flushingSoon = -1;
              this.flush();
            }
          }
        }, {
          key: "start",
          value: function start() {
            if (this.observer) {
              this.observer.takeRecords();
              this.observer.observe(this.view.dom, observeOptions);
            }
            if (this.onCharData) this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
            this.connectSelection();
          }
        }, {
          key: "stop",
          value: function stop() {
            var _this13 = this;
            if (this.observer) {
              var take = this.observer.takeRecords();
              if (take.length) {
                for (var i = 0; i < take.length; i++) this.queue.push(take[i]);
                window.setTimeout(function() {
                  return _this13.flush();
                }, 20);
              }
              this.observer.disconnect();
            }
            if (this.onCharData) this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
            this.disconnectSelection();
          }
        }, {
          key: "connectSelection",
          value: function connectSelection() {
            this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
          }
        }, {
          key: "disconnectSelection",
          value: function disconnectSelection() {
            this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
          }
        }, {
          key: "suppressSelectionUpdates",
          value: function suppressSelectionUpdates() {
            var _this14 = this;
            this.suppressingSelectionUpdates = true;
            setTimeout(function() {
              return _this14.suppressingSelectionUpdates = false;
            }, 50);
          }
        }, {
          key: "onSelectionChange",
          value: function onSelectionChange() {
            if (!hasFocusAndSelection(this.view)) return;
            if (this.suppressingSelectionUpdates) return selectionToDOM(this.view);
            if (ie && ie_version <= 11 && !this.view.state.selection.empty) {
              var sel = this.view.domSelectionRange();
              if (sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset)) return this.flushSoon();
            }
            this.flush();
          }
        }, {
          key: "setCurSelection",
          value: function setCurSelection() {
            this.currentSelection.set(this.view.domSelectionRange());
          }
        }, {
          key: "ignoreSelectionChange",
          value: function ignoreSelectionChange(sel) {
            if (!sel.focusNode) return true;
            var ancestors = /* @__PURE__ */ new Set(), container;
            for (var scan = sel.focusNode; scan; scan = parentNode(scan)) ancestors.add(scan);
            for (var _scan = sel.anchorNode; _scan; _scan = parentNode(_scan)) if (ancestors.has(_scan)) {
              container = _scan;
              break;
            }
            var desc = container && this.view.docView.nearestDesc(container);
            if (desc && desc.ignoreMutation({
              type: "selection",
              target: container.nodeType == 3 ? container.parentNode : container
            })) {
              this.setCurSelection();
              return true;
            }
          }
        }, {
          key: "pendingRecords",
          value: function pendingRecords() {
            if (this.observer) {
              var _iterator2 = _createForOfIteratorHelper(this.observer.takeRecords()), _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                  var mut = _step2.value;
                  this.queue.push(mut);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
            return this.queue;
          }
        }, {
          key: "flush",
          value: function flush() {
            var view = this.view;
            if (!view.docView || this.flushingSoon > -1) return;
            var mutations = this.pendingRecords();
            if (mutations.length) this.queue = [];
            var sel = view.domSelectionRange();
            var newSel = !this.suppressingSelectionUpdates && !this.currentSelection.eq(sel) && hasFocusAndSelection(view) && !this.ignoreSelectionChange(sel);
            var from = -1, to = -1, typeOver = false, added = [];
            if (view.editable) {
              for (var i = 0; i < mutations.length; i++) {
                var result = this.registerMutation(mutations[i], added);
                if (result) {
                  from = from < 0 ? result.from : Math.min(result.from, from);
                  to = to < 0 ? result.to : Math.max(result.to, to);
                  if (result.typeOver) typeOver = true;
                }
              }
            }
            if (gecko && added.length) {
              var brs = added.filter(function(n) {
                return n.nodeName == "BR";
              });
              if (brs.length == 2) {
                var _brs = _slicedToArray(brs, 2), a = _brs[0], b = _brs[1];
                if (a.parentNode && a.parentNode.parentNode == b.parentNode) b.remove();
                else a.remove();
              } else {
                var focusNode = this.currentSelection.focusNode;
                var _iterator3 = _createForOfIteratorHelper(brs), _step3;
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                    var br = _step3.value;
                    var parent = br.parentNode;
                    if (parent && parent.nodeName == "LI" && (!focusNode || blockParent(view, focusNode) != parent)) br.remove();
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            }
            var readSel = null;
            if (from < 0 && newSel && view.input.lastFocus > Date.now() - 200 && Math.max(view.input.lastTouch, view.input.lastClick.time) < Date.now() - 300 && selectionCollapsed(sel) && (readSel = selectionFromDOM(view)) && readSel.eq(prosemirrorState.Selection.near(view.state.doc.resolve(0), 1))) {
              view.input.lastFocus = 0;
              selectionToDOM(view);
              this.currentSelection.set(sel);
              view.scrollToSelection();
            } else if (from > -1 || newSel) {
              if (from > -1) {
                view.docView.markDirty(from, to);
                checkCSS(view);
              }
              this.handleDOMChange(from, to, typeOver, added);
              if (view.docView && view.docView.dirty) view.updateState(view.state);
              else if (!this.currentSelection.eq(sel)) selectionToDOM(view);
              this.currentSelection.set(sel);
            }
          }
        }, {
          key: "registerMutation",
          value: function registerMutation(mut, added) {
            if (added.indexOf(mut.target) > -1) return null;
            var desc = this.view.docView.nearestDesc(mut.target);
            if (mut.type == "attributes" && (desc == this.view.docView || mut.attributeName == "contenteditable" || mut.attributeName == "style" && !mut.oldValue && !mut.target.getAttribute("style"))) return null;
            if (!desc || desc.ignoreMutation(mut)) return null;
            if (mut.type == "childList") {
              for (var i = 0; i < mut.addedNodes.length; i++) {
                var node = mut.addedNodes[i];
                added.push(node);
                if (node.nodeType == 3) this.lastChangedTextNode = node;
              }
              if (desc.contentDOM && desc.contentDOM != desc.dom && !desc.contentDOM.contains(mut.target)) return {
                from: desc.posBefore,
                to: desc.posAfter
              };
              var prev = mut.previousSibling, next = mut.nextSibling;
              if (ie && ie_version <= 11 && mut.addedNodes.length) {
                for (var _i15 = 0; _i15 < mut.addedNodes.length; _i15++) {
                  var _mut$addedNodes$_i = mut.addedNodes[_i15], previousSibling = _mut$addedNodes$_i.previousSibling, nextSibling = _mut$addedNodes$_i.nextSibling;
                  if (!previousSibling || Array.prototype.indexOf.call(mut.addedNodes, previousSibling) < 0) prev = previousSibling;
                  if (!nextSibling || Array.prototype.indexOf.call(mut.addedNodes, nextSibling) < 0) next = nextSibling;
                }
              }
              var fromOffset = prev && prev.parentNode == mut.target ? domIndex(prev) + 1 : 0;
              var from = desc.localPosFromDOM(mut.target, fromOffset, -1);
              var toOffset = next && next.parentNode == mut.target ? domIndex(next) : mut.target.childNodes.length;
              var to = desc.localPosFromDOM(mut.target, toOffset, 1);
              return {
                from,
                to
              };
            } else if (mut.type == "attributes") {
              return {
                from: desc.posAtStart - desc.border,
                to: desc.posAtEnd + desc.border
              };
            } else {
              this.lastChangedTextNode = mut.target;
              return {
                from: desc.posAtStart,
                to: desc.posAtEnd,
                typeOver: mut.target.nodeValue == mut.oldValue
              };
            }
          }
        }]);
        return DOMObserver2;
      })();
      var cssChecked = /* @__PURE__ */ new WeakMap();
      var cssCheckWarned = false;
      function checkCSS(view) {
        if (cssChecked.has(view)) return;
        cssChecked.set(view, null);
        if (["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(view.dom).whiteSpace) !== -1) {
          view.requiresGeckoHackNode = gecko;
          if (cssCheckWarned) return;
          console["warn"]("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package.");
          cssCheckWarned = true;
        }
      }
      function rangeToSelectionRange(view, range) {
        var anchorNode = range.startContainer, anchorOffset = range.startOffset;
        var focusNode = range.endContainer, focusOffset = range.endOffset;
        var currentAnchor = view.domAtPos(view.state.selection.anchor);
        if (isEquivalentPosition(currentAnchor.node, currentAnchor.offset, focusNode, focusOffset)) {
          var _ref5 = [focusNode, focusOffset, anchorNode, anchorOffset];
          anchorNode = _ref5[0];
          anchorOffset = _ref5[1];
          focusNode = _ref5[2];
          focusOffset = _ref5[3];
        }
        return {
          anchorNode,
          anchorOffset,
          focusNode,
          focusOffset
        };
      }
      function safariShadowSelectionRange(view, selection) {
        if (selection.getComposedRanges) {
          var range = selection.getComposedRanges(view.root)[0];
          if (range) return rangeToSelectionRange(view, range);
        }
        var found;
        function read(event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          found = event.getTargetRanges()[0];
        }
        view.dom.addEventListener("beforeinput", read, true);
        document.execCommand("indent");
        view.dom.removeEventListener("beforeinput", read, true);
        return found ? rangeToSelectionRange(view, found) : null;
      }
      function blockParent(view, node) {
        for (var p = node.parentNode; p && p != view.dom; p = p.parentNode) {
          var desc = view.docView.nearestDesc(p, true);
          if (desc && desc.node.isBlock) return p;
        }
        return null;
      }
      function parseBetween(view, from_, to_) {
        var _view$docView$parseRa = view.docView.parseRange(from_, to_), parent = _view$docView$parseRa.node, fromOffset = _view$docView$parseRa.fromOffset, toOffset = _view$docView$parseRa.toOffset, from = _view$docView$parseRa.from, to = _view$docView$parseRa.to;
        var domSel = view.domSelectionRange();
        var find;
        var anchor = domSel.anchorNode;
        if (anchor && view.dom.contains(anchor.nodeType == 1 ? anchor : anchor.parentNode)) {
          find = [{
            node: anchor,
            offset: domSel.anchorOffset
          }];
          if (!selectionCollapsed(domSel)) find.push({
            node: domSel.focusNode,
            offset: domSel.focusOffset
          });
        }
        if (chrome && view.input.lastKeyCode === 8) {
          for (var off = toOffset; off > fromOffset; off--) {
            var node = parent.childNodes[off - 1], desc = node.pmViewDesc;
            if (node.nodeName == "BR" && !desc) {
              toOffset = off;
              break;
            }
            if (!desc || desc.size) break;
          }
        }
        var startDoc = view.state.doc;
        var parser = view.someProp("domParser") || prosemirrorModel.DOMParser.fromSchema(view.state.schema);
        var $from = startDoc.resolve(from);
        var sel = null, doc2 = parser.parse(parent, {
          topNode: $from.parent,
          topMatch: $from.parent.contentMatchAt($from.index()),
          topOpen: true,
          from: fromOffset,
          to: toOffset,
          preserveWhitespace: $from.parent.type.whitespace == "pre" ? "full" : true,
          findPositions: find,
          ruleFromNode,
          context: $from
        });
        if (find && find[0].pos != null) {
          var _anchor = find[0].pos, head = find[1] && find[1].pos;
          if (head == null) head = _anchor;
          sel = {
            anchor: _anchor + from,
            head: head + from
          };
        }
        return {
          doc: doc2,
          sel,
          from,
          to
        };
      }
      function ruleFromNode(dom) {
        var desc = dom.pmViewDesc;
        if (desc) {
          return desc.parseRule();
        } else if (dom.nodeName == "BR" && dom.parentNode) {
          if (safari && /^(ul|ol)$/i.test(dom.parentNode.nodeName)) {
            var skip = document.createElement("div");
            skip.appendChild(document.createElement("li"));
            return {
              skip
            };
          } else if (dom.parentNode.lastChild == dom || safari && /^(tr|table)$/i.test(dom.parentNode.nodeName)) {
            return {
              ignore: true
            };
          }
        } else if (dom.nodeName == "IMG" && dom.getAttribute("mark-placeholder")) {
          return {
            ignore: true
          };
        }
        return null;
      }
      var isInline = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
      function readDOMChange(view, from, to, typeOver, addedNodes) {
        var compositionID = view.input.compositionPendingChanges || (view.composing ? view.input.compositionID : 0);
        view.input.compositionPendingChanges = 0;
        if (from < 0) {
          var origin = view.input.lastSelectionTime > Date.now() - 50 ? view.input.lastSelectionOrigin : null;
          var newSel = selectionFromDOM(view, origin);
          if (newSel && !view.state.selection.eq(newSel)) {
            if (chrome && android && view.input.lastKeyCode === 13 && Date.now() - 100 < view.input.lastKeyCodeTime && view.someProp("handleKeyDown", function(f) {
              return f(view, keyEvent(13, "Enter"));
            })) return;
            var tr = view.state.tr.setSelection(newSel);
            if (origin == "pointer") tr.setMeta("pointer", true);
            else if (origin == "key") tr.scrollIntoView();
            if (compositionID) tr.setMeta("composition", compositionID);
            view.dispatch(tr);
          }
          return;
        }
        var $before = view.state.doc.resolve(from);
        var shared = $before.sharedDepth(to);
        from = $before.before(shared + 1);
        to = view.state.doc.resolve(to).after(shared + 1);
        var sel = view.state.selection;
        var parse = parseBetween(view, from, to);
        var doc2 = view.state.doc, compare = doc2.slice(parse.from, parse.to);
        var preferredPos, preferredSide;
        if (view.input.lastKeyCode === 8 && Date.now() - 100 < view.input.lastKeyCodeTime) {
          preferredPos = view.state.selection.to;
          preferredSide = "end";
        } else {
          preferredPos = view.state.selection.from;
          preferredSide = "start";
        }
        view.input.lastKeyCode = null;
        var change = findDiff(compare.content, parse.doc.content, parse.from, preferredPos, preferredSide);
        if (change) view.input.domChangeCount++;
        if ((ios && view.input.lastIOSEnter > Date.now() - 225 || android) && addedNodes.some(function(n) {
          return n.nodeType == 1 && !isInline.test(n.nodeName);
        }) && (!change || change.endA >= change.endB) && view.someProp("handleKeyDown", function(f) {
          return f(view, keyEvent(13, "Enter"));
        })) {
          view.input.lastIOSEnter = 0;
          return;
        }
        if (!change) {
          if (typeOver && sel instanceof prosemirrorState.TextSelection && !sel.empty && sel.$head.sameParent(sel.$anchor) && !view.composing && !(parse.sel && parse.sel.anchor != parse.sel.head)) {
            change = {
              start: sel.from,
              endA: sel.to,
              endB: sel.to
            };
          } else {
            if (parse.sel) {
              var _sel2 = resolveSelection(view, view.state.doc, parse.sel);
              if (_sel2 && !_sel2.eq(view.state.selection)) {
                var _tr = view.state.tr.setSelection(_sel2);
                if (compositionID) _tr.setMeta("composition", compositionID);
                view.dispatch(_tr);
              }
            }
            return;
          }
        }
        if (view.state.selection.from < view.state.selection.to && change.start == change.endB && view.state.selection instanceof prosemirrorState.TextSelection) {
          if (change.start > view.state.selection.from && change.start <= view.state.selection.from + 2 && view.state.selection.from >= parse.from) {
            change.start = view.state.selection.from;
          } else if (change.endA < view.state.selection.to && change.endA >= view.state.selection.to - 2 && view.state.selection.to <= parse.to) {
            change.endB += view.state.selection.to - change.endA;
            change.endA = view.state.selection.to;
          }
        }
        if (ie && ie_version <= 11 && change.endB == change.start + 1 && change.endA == change.start && change.start > parse.from && parse.doc.textBetween(change.start - parse.from - 1, change.start - parse.from + 1) == " \xA0") {
          change.start--;
          change.endA--;
          change.endB--;
        }
        var $from = parse.doc.resolveNoCache(change.start - parse.from);
        var $to = parse.doc.resolveNoCache(change.endB - parse.from);
        var $fromA = doc2.resolve(change.start);
        var inlineChange = $from.sameParent($to) && $from.parent.inlineContent && $fromA.end() >= change.endA;
        if ((ios && view.input.lastIOSEnter > Date.now() - 225 && (!inlineChange || addedNodes.some(function(n) {
          return n.nodeName == "DIV" || n.nodeName == "P";
        })) || !inlineChange && $from.pos < parse.doc.content.size && (!$from.sameParent($to) || !$from.parent.inlineContent) && $from.pos < $to.pos && !/\S/.test(parse.doc.textBetween($from.pos, $to.pos, "", ""))) && view.someProp("handleKeyDown", function(f) {
          return f(view, keyEvent(13, "Enter"));
        })) {
          view.input.lastIOSEnter = 0;
          return;
        }
        if (view.state.selection.anchor > change.start && looksLikeBackspace(doc2, change.start, change.endA, $from, $to) && view.someProp("handleKeyDown", function(f) {
          return f(view, keyEvent(8, "Backspace"));
        })) {
          if (android && chrome) view.domObserver.suppressSelectionUpdates();
          return;
        }
        if (chrome && change.endB == change.start) view.input.lastChromeDelete = Date.now();
        if (android && !inlineChange && $from.start() != $to.start() && $to.parentOffset == 0 && $from.depth == $to.depth && parse.sel && parse.sel.anchor == parse.sel.head && parse.sel.head == change.endA) {
          change.endB -= 2;
          $to = parse.doc.resolveNoCache(change.endB - parse.from);
          setTimeout(function() {
            view.someProp("handleKeyDown", function(f) {
              return f(view, keyEvent(13, "Enter"));
            });
          }, 20);
        }
        var chFrom = change.start, chTo = change.endA;
        var mkTr = function mkTr2(base) {
          var tr2 = base || view.state.tr.replace(chFrom, chTo, parse.doc.slice(change.start - parse.from, change.endB - parse.from));
          if (parse.sel) {
            var _sel3 = resolveSelection(view, tr2.doc, parse.sel);
            if (_sel3 && !(chrome && view.composing && _sel3.empty && (change.start != change.endB || view.input.lastChromeDelete < Date.now() - 100) && (_sel3.head == chFrom || _sel3.head == tr2.mapping.map(chTo) - 1) || ie && _sel3.empty && _sel3.head == chFrom)) tr2.setSelection(_sel3);
          }
          if (compositionID) tr2.setMeta("composition", compositionID);
          return tr2.scrollIntoView();
        };
        var markChange;
        if (inlineChange) {
          if ($from.pos == $to.pos) {
            if (ie && ie_version <= 11 && $from.parentOffset == 0) {
              view.domObserver.suppressSelectionUpdates();
              setTimeout(function() {
                return selectionToDOM(view);
              }, 20);
            }
            var _tr2 = mkTr(view.state.tr["delete"](chFrom, chTo));
            var marks = doc2.resolve(change.start).marksAcross(doc2.resolve(change.endA));
            if (marks) _tr2.ensureMarks(marks);
            view.dispatch(_tr2);
          } else if (change.endA == change.endB && (markChange = isMarkChange($from.parent.content.cut($from.parentOffset, $to.parentOffset), $fromA.parent.content.cut($fromA.parentOffset, change.endA - $fromA.start())))) {
            var _tr3 = mkTr(view.state.tr);
            if (markChange.type == "add") _tr3.addMark(chFrom, chTo, markChange.mark);
            else _tr3.removeMark(chFrom, chTo, markChange.mark);
            view.dispatch(_tr3);
          } else if ($from.parent.child($from.index()).isText && $from.index() == $to.index() - ($to.textOffset ? 0 : 1)) {
            var text = $from.parent.textBetween($from.parentOffset, $to.parentOffset);
            var deflt = function deflt2() {
              return mkTr(view.state.tr.insertText(text, chFrom, chTo));
            };
            if (!view.someProp("handleTextInput", function(f) {
              return f(view, chFrom, chTo, text, deflt);
            })) view.dispatch(deflt());
          } else {
            view.dispatch(mkTr());
          }
        } else {
          view.dispatch(mkTr());
        }
      }
      function resolveSelection(view, doc2, parsedSel) {
        if (Math.max(parsedSel.anchor, parsedSel.head) > doc2.content.size) return null;
        return selectionBetween(view, doc2.resolve(parsedSel.anchor), doc2.resolve(parsedSel.head));
      }
      function isMarkChange(cur, prev) {
        var curMarks = cur.firstChild.marks, prevMarks = prev.firstChild.marks;
        var added = curMarks, removed = prevMarks, type, mark, update;
        for (var i = 0; i < prevMarks.length; i++) added = prevMarks[i].removeFromSet(added);
        for (var _i16 = 0; _i16 < curMarks.length; _i16++) removed = curMarks[_i16].removeFromSet(removed);
        if (added.length == 1 && removed.length == 0) {
          mark = added[0];
          type = "add";
          update = function update2(node) {
            return node.mark(mark.addToSet(node.marks));
          };
        } else if (added.length == 0 && removed.length == 1) {
          mark = removed[0];
          type = "remove";
          update = function update2(node) {
            return node.mark(mark.removeFromSet(node.marks));
          };
        } else {
          return null;
        }
        var updated = [];
        for (var _i17 = 0; _i17 < prev.childCount; _i17++) updated.push(update(prev.child(_i17)));
        if (prosemirrorModel.Fragment.from(updated).eq(cur)) return {
          mark,
          type
        };
      }
      function looksLikeBackspace(old, start, end, $newStart, $newEnd) {
        if (end - start <= $newEnd.pos - $newStart.pos || skipClosingAndOpening($newStart, true, false) < $newEnd.pos) return false;
        var $start = old.resolve(start);
        if (!$newStart.parent.isTextblock) {
          var after = $start.nodeAfter;
          return after != null && end == start + after.nodeSize;
        }
        if ($start.parentOffset < $start.parent.content.size || !$start.parent.isTextblock) return false;
        var $next = old.resolve(skipClosingAndOpening($start, true, true));
        if (!$next.parent.isTextblock || $next.pos > end || skipClosingAndOpening($next, true, false) < end) return false;
        return $newStart.parent.content.cut($newStart.parentOffset).eq($next.parent.content);
      }
      function skipClosingAndOpening($pos, fromEnd, mayOpen) {
        var depth = $pos.depth, end = fromEnd ? $pos.end() : $pos.pos;
        while (depth > 0 && (fromEnd || $pos.indexAfter(depth) == $pos.node(depth).childCount)) {
          depth--;
          end++;
          fromEnd = false;
        }
        if (mayOpen) {
          var next = $pos.node(depth).maybeChild($pos.indexAfter(depth));
          while (next && !next.isLeaf) {
            next = next.firstChild;
            end++;
          }
        }
        return end;
      }
      function findDiff(a, b, pos, preferredPos, preferredSide) {
        var start = a.findDiffStart(b, pos);
        if (start == null) return null;
        var _a$findDiffEnd = a.findDiffEnd(b, pos + a.size, pos + b.size), endA = _a$findDiffEnd.a, endB = _a$findDiffEnd.b;
        if (preferredSide == "end") {
          var adjust = Math.max(0, start - Math.min(endA, endB));
          preferredPos -= endA + adjust - start;
        }
        if (endA < start && a.size < b.size) {
          var move = preferredPos <= start && preferredPos >= endA ? start - preferredPos : 0;
          start -= move;
          if (start && start < b.size && isSurrogatePair(b.textBetween(start - 1, start + 1))) start += move ? 1 : -1;
          endB = start + (endB - endA);
          endA = start;
        } else if (endB < start) {
          var _move = preferredPos <= start && preferredPos >= endB ? start - preferredPos : 0;
          start -= _move;
          if (start && start < a.size && isSurrogatePair(a.textBetween(start - 1, start + 1))) start += _move ? 1 : -1;
          endA = start + (endA - endB);
          endB = start;
        }
        return {
          start,
          endA,
          endB
        };
      }
      function isSurrogatePair(str) {
        if (str.length != 2) return false;
        var a = str.charCodeAt(0), b = str.charCodeAt(1);
        return a >= 56320 && a <= 57343 && b >= 55296 && b <= 56319;
      }
      var __parseFromClipboard = parseFromClipboard;
      var __endComposition = endComposition;
      var EditorView = (function() {
        function EditorView2(place, props) {
          var _this15 = this;
          _classCallCheck(this, EditorView2);
          this._root = null;
          this.focused = false;
          this.trackWrites = null;
          this.mounted = false;
          this.markCursor = null;
          this.cursorWrapper = null;
          this.lastSelectedViewDesc = void 0;
          this.input = new InputState();
          this.prevDirectPlugins = [];
          this.pluginViews = [];
          this.requiresGeckoHackNode = false;
          this.dragging = null;
          this._props = props;
          this.state = props.state;
          this.directPlugins = props.plugins || [];
          this.directPlugins.forEach(checkStateComponent);
          this.dispatch = this.dispatch.bind(this);
          this.dom = place && place.mount || document.createElement("div");
          if (place) {
            if (place.appendChild) place.appendChild(this.dom);
            else if (typeof place == "function") place(this.dom);
            else if (place.mount) this.mounted = true;
          }
          this.editable = getEditable(this);
          updateCursorWrapper(this);
          this.nodeViews = buildNodeViews(this);
          this.docView = docViewDesc(this.state.doc, computeDocDeco(this), viewDecorations(this), this.dom, this);
          this.domObserver = new DOMObserver(this, function(from, to, typeOver, added) {
            return readDOMChange(_this15, from, to, typeOver, added);
          });
          this.domObserver.start();
          initInput(this);
          this.updatePluginViews();
        }
        _createClass(EditorView2, [{
          key: "composing",
          get: function get() {
            return this.input.composing;
          }
        }, {
          key: "props",
          get: function get() {
            if (this._props.state != this.state) {
              var prev = this._props;
              this._props = {};
              for (var name in prev) this._props[name] = prev[name];
              this._props.state = this.state;
            }
            return this._props;
          }
        }, {
          key: "update",
          value: function update(props) {
            if (props.handleDOMEvents != this._props.handleDOMEvents) ensureListeners(this);
            var prevProps = this._props;
            this._props = props;
            if (props.plugins) {
              props.plugins.forEach(checkStateComponent);
              this.directPlugins = props.plugins;
            }
            this.updateStateInner(props.state, prevProps);
          }
        }, {
          key: "setProps",
          value: function setProps(props) {
            var updated = {};
            for (var name in this._props) updated[name] = this._props[name];
            updated.state = this.state;
            for (var _name2 in props) updated[_name2] = props[_name2];
            this.update(updated);
          }
        }, {
          key: "updateState",
          value: function updateState(state) {
            this.updateStateInner(state, this._props);
          }
        }, {
          key: "updateStateInner",
          value: function updateStateInner(state, prevProps) {
            var _a;
            var prev = this.state, redraw = false, updateSel = false;
            if (state.storedMarks && this.composing) {
              clearComposition(this);
              updateSel = true;
            }
            this.state = state;
            var pluginsChanged = prev.plugins != state.plugins || this._props.plugins != prevProps.plugins;
            if (pluginsChanged || this._props.plugins != prevProps.plugins || this._props.nodeViews != prevProps.nodeViews) {
              var nodeViews = buildNodeViews(this);
              if (changedNodeViews(nodeViews, this.nodeViews)) {
                this.nodeViews = nodeViews;
                redraw = true;
              }
            }
            if (pluginsChanged || prevProps.handleDOMEvents != this._props.handleDOMEvents) {
              ensureListeners(this);
            }
            this.editable = getEditable(this);
            updateCursorWrapper(this);
            var innerDeco = viewDecorations(this), outerDeco = computeDocDeco(this);
            var scroll = prev.plugins != state.plugins && !prev.doc.eq(state.doc) ? "reset" : state.scrollToSelection > prev.scrollToSelection ? "to selection" : "preserve";
            var updateDoc = redraw || !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
            if (updateDoc || !state.selection.eq(prev.selection)) updateSel = true;
            var oldScrollPos = scroll == "preserve" && updateSel && this.dom.style.overflowAnchor == null && storeScrollPos(this);
            if (updateSel) {
              this.domObserver.stop();
              var forceSelUpdate = updateDoc && (ie || chrome) && !this.composing && !prev.selection.empty && !state.selection.empty && selectionContextChanged(prev.selection, state.selection);
              if (updateDoc) {
                var chromeKludge = chrome ? this.trackWrites = this.domSelectionRange().focusNode : null;
                if (this.composing) this.input.compositionNode = findCompositionNode(this);
                if (redraw || !this.docView.update(state.doc, outerDeco, innerDeco, this)) {
                  this.docView.updateOuterDeco(outerDeco);
                  this.docView.destroy();
                  this.docView = docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
                }
                if (chromeKludge && !this.trackWrites) forceSelUpdate = true;
              }
              if (forceSelUpdate || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && anchorInRightPlace(this))) {
                selectionToDOM(this, forceSelUpdate);
              } else {
                syncNodeSelection(this, state.selection);
                this.domObserver.setCurSelection();
              }
              this.domObserver.start();
            }
            this.updatePluginViews(prev);
            if (((_a = this.dragging) === null || _a === void 0 ? void 0 : _a.node) && !prev.doc.eq(state.doc)) this.updateDraggedNode(this.dragging, prev);
            if (scroll == "reset") {
              this.dom.scrollTop = 0;
            } else if (scroll == "to selection") {
              this.scrollToSelection();
            } else if (oldScrollPos) {
              resetScrollPos(oldScrollPos);
            }
          }
        }, {
          key: "scrollToSelection",
          value: function scrollToSelection() {
            var _this16 = this;
            var startDOM = this.domSelectionRange().focusNode;
            if (!startDOM || !this.dom.contains(startDOM.nodeType == 1 ? startDOM : startDOM.parentNode)) ;
            else if (this.someProp("handleScrollToSelection", function(f) {
              return f(_this16);
            })) ;
            else if (this.state.selection instanceof prosemirrorState.NodeSelection) {
              var target = this.docView.domAfterPos(this.state.selection.from);
              if (target.nodeType == 1) scrollRectIntoView(this, target.getBoundingClientRect(), startDOM);
            } else {
              scrollRectIntoView(this, this.coordsAtPos(this.state.selection.head, 1), startDOM);
            }
          }
        }, {
          key: "destroyPluginViews",
          value: function destroyPluginViews() {
            var view;
            while (view = this.pluginViews.pop()) if (view.destroy) view.destroy();
          }
        }, {
          key: "updatePluginViews",
          value: function updatePluginViews(prevState) {
            if (!prevState || prevState.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
              this.prevDirectPlugins = this.directPlugins;
              this.destroyPluginViews();
              for (var i = 0; i < this.directPlugins.length; i++) {
                var plugin = this.directPlugins[i];
                if (plugin.spec.view) this.pluginViews.push(plugin.spec.view(this));
              }
              for (var _i18 = 0; _i18 < this.state.plugins.length; _i18++) {
                var _plugin = this.state.plugins[_i18];
                if (_plugin.spec.view) this.pluginViews.push(_plugin.spec.view(this));
              }
            } else {
              for (var _i19 = 0; _i19 < this.pluginViews.length; _i19++) {
                var pluginView = this.pluginViews[_i19];
                if (pluginView.update) pluginView.update(this, prevState);
              }
            }
          }
        }, {
          key: "updateDraggedNode",
          value: function updateDraggedNode(dragging, prev) {
            var sel = dragging.node, found = -1;
            if (this.state.doc.nodeAt(sel.from) == sel.node) {
              found = sel.from;
            } else {
              var movedPos = sel.from + (this.state.doc.content.size - prev.doc.content.size);
              var moved = movedPos > 0 && this.state.doc.nodeAt(movedPos);
              if (moved == sel.node) found = movedPos;
            }
            this.dragging = new Dragging(dragging.slice, dragging.move, found < 0 ? void 0 : prosemirrorState.NodeSelection.create(this.state.doc, found));
          }
        }, {
          key: "someProp",
          value: function someProp(propName, f) {
            var prop2 = this._props && this._props[propName], value;
            if (prop2 != null && (value = f ? f(prop2) : prop2)) return value;
            for (var i = 0; i < this.directPlugins.length; i++) {
              var _prop = this.directPlugins[i].props[propName];
              if (_prop != null && (value = f ? f(_prop) : _prop)) return value;
            }
            var plugins = this.state.plugins;
            if (plugins) for (var _i20 = 0; _i20 < plugins.length; _i20++) {
              var _prop2 = plugins[_i20].props[propName];
              if (_prop2 != null && (value = f ? f(_prop2) : _prop2)) return value;
            }
          }
        }, {
          key: "hasFocus",
          value: function hasFocus() {
            if (ie) {
              var node = this.root.activeElement;
              if (node == this.dom) return true;
              if (!node || !this.dom.contains(node)) return false;
              while (node && this.dom != node && this.dom.contains(node)) {
                if (node.contentEditable == "false") return false;
                node = node.parentElement;
              }
              return true;
            }
            return this.root.activeElement == this.dom;
          }
        }, {
          key: "focus",
          value: function focus() {
            this.domObserver.stop();
            if (this.editable) focusPreventScroll(this.dom);
            selectionToDOM(this);
            this.domObserver.start();
          }
        }, {
          key: "root",
          get: function get() {
            var _this17 = this;
            var cached = this._root;
            if (cached == null) {
              var _loop5 = function _loop52(search2) {
                if (search2.nodeType == 9 || search2.nodeType == 11 && search2.host) {
                  if (!search2.getSelection) Object.getPrototypeOf(search2).getSelection = function() {
                    return search2.ownerDocument.getSelection();
                  };
                  return {
                    v: _this17._root = search2
                  };
                }
              }, _ret3;
              for (var search = this.dom.parentNode; search; search = search.parentNode) {
                _ret3 = _loop5(search);
                if (_ret3) return _ret3.v;
              }
            }
            return cached || document;
          }
        }, {
          key: "updateRoot",
          value: function updateRoot() {
            this._root = null;
          }
        }, {
          key: "posAtCoords",
          value: function posAtCoords(coords) {
            return _posAtCoords(this, coords);
          }
        }, {
          key: "coordsAtPos",
          value: function coordsAtPos(pos) {
            var side = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
            return _coordsAtPos(this, pos, side);
          }
        }, {
          key: "domAtPos",
          value: function domAtPos(pos) {
            var side = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return this.docView.domFromPos(pos, side);
          }
        }, {
          key: "nodeDOM",
          value: function nodeDOM(pos) {
            var desc = this.docView.descAt(pos);
            return desc ? desc.nodeDOM : null;
          }
        }, {
          key: "posAtDOM",
          value: function posAtDOM(node, offset) {
            var bias = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : -1;
            var pos = this.docView.posFromDOM(node, offset, bias);
            if (pos == null) throw new RangeError("DOM position not inside the editor");
            return pos;
          }
        }, {
          key: "endOfTextblock",
          value: function endOfTextblock(dir, state) {
            return _endOfTextblock(this, state || this.state, dir);
          }
        }, {
          key: "pasteHTML",
          value: function pasteHTML(html, event) {
            return doPaste(this, "", html, false, event || new ClipboardEvent("paste"));
          }
        }, {
          key: "pasteText",
          value: function pasteText(text, event) {
            return doPaste(this, text, null, true, event || new ClipboardEvent("paste"));
          }
        }, {
          key: "serializeForClipboard",
          value: function serializeForClipboard(slice) {
            return _serializeForClipboard(this, slice);
          }
        }, {
          key: "destroy",
          value: function destroy() {
            if (!this.docView) return;
            destroyInput(this);
            this.destroyPluginViews();
            if (this.mounted) {
              this.docView.update(this.state.doc, [], viewDecorations(this), this);
              this.dom.textContent = "";
            } else if (this.dom.parentNode) {
              this.dom.parentNode.removeChild(this.dom);
            }
            this.docView.destroy();
            this.docView = null;
            clearReusedRange();
          }
        }, {
          key: "isDestroyed",
          get: function get() {
            return this.docView == null;
          }
        }, {
          key: "dispatchEvent",
          value: function dispatchEvent(event) {
            return _dispatchEvent(this, event);
          }
        }, {
          key: "domSelectionRange",
          value: function domSelectionRange() {
            var sel = this.domSelection();
            if (!sel) return {
              focusNode: null,
              focusOffset: 0,
              anchorNode: null,
              anchorOffset: 0
            };
            return safari && this.root.nodeType === 11 && deepActiveElement(this.dom.ownerDocument) == this.dom && safariShadowSelectionRange(this, sel) || sel;
          }
        }, {
          key: "domSelection",
          value: function domSelection() {
            return this.root.getSelection();
          }
        }]);
        return EditorView2;
      })();
      EditorView.prototype.dispatch = function(tr) {
        var dispatchTransaction = this._props.dispatchTransaction;
        if (dispatchTransaction) dispatchTransaction.call(this, tr);
        else this.updateState(this.state.apply(tr));
      };
      function computeDocDeco(view) {
        var attrs = /* @__PURE__ */ Object.create(null);
        attrs["class"] = "ProseMirror";
        attrs.contenteditable = String(view.editable);
        view.someProp("attributes", function(value) {
          if (typeof value == "function") value = value(view.state);
          if (value) for (var attr in value) {
            if (attr == "class") attrs["class"] += " " + value[attr];
            else if (attr == "style") attrs.style = (attrs.style ? attrs.style + ";" : "") + value[attr];
            else if (!attrs[attr] && attr != "contenteditable" && attr != "nodeName") attrs[attr] = String(value[attr]);
          }
        });
        if (!attrs.translate) attrs.translate = "no";
        return [Decoration.node(0, view.state.doc.content.size, attrs)];
      }
      function updateCursorWrapper(view) {
        if (view.markCursor) {
          var dom = document.createElement("img");
          dom.className = "ProseMirror-separator";
          dom.setAttribute("mark-placeholder", "true");
          dom.setAttribute("alt", "");
          view.cursorWrapper = {
            dom,
            deco: Decoration.widget(view.state.selection.from, dom, {
              raw: true,
              marks: view.markCursor
            })
          };
        } else {
          view.cursorWrapper = null;
        }
      }
      function getEditable(view) {
        return !view.someProp("editable", function(value) {
          return value(view.state) === false;
        });
      }
      function selectionContextChanged(sel1, sel2) {
        var depth = Math.min(sel1.$anchor.sharedDepth(sel1.head), sel2.$anchor.sharedDepth(sel2.head));
        return sel1.$anchor.start(depth) != sel2.$anchor.start(depth);
      }
      function buildNodeViews(view) {
        var result = /* @__PURE__ */ Object.create(null);
        function add(obj) {
          for (var _prop3 in obj) if (!Object.prototype.hasOwnProperty.call(result, _prop3)) result[_prop3] = obj[_prop3];
        }
        view.someProp("nodeViews", add);
        view.someProp("markViews", add);
        return result;
      }
      function changedNodeViews(a, b) {
        var nA = 0, nB = 0;
        for (var _prop4 in a) {
          if (a[_prop4] != b[_prop4]) return true;
          nA++;
        }
        for (var _ in b) nB++;
        return nA != nB;
      }
      function checkStateComponent(plugin) {
        if (plugin.spec.state || plugin.spec.filterTransaction || plugin.spec.appendTransaction) throw new RangeError("Plugins passed directly to the view must not have a state component");
      }
      exports.Decoration = Decoration;
      exports.DecorationSet = DecorationSet;
      exports.EditorView = EditorView;
      exports.__endComposition = __endComposition;
      exports.__parseFromClipboard = __parseFromClipboard;
    }
  });

  // node_modules/@tiptap/pm/view/dist/index.cjs
  var require_dist7 = __commonJS({
    "node_modules/@tiptap/pm/view/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrorview = require_dist6();
      _createStarExport(_prosemirrorview);
    }
  });

  // node_modules/w3c-keyname/index.cjs
  var require_w3c_keyname = __commonJS({
    "node_modules/w3c-keyname/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var base = {
        8: "Backspace",
        9: "Tab",
        10: "Enter",
        12: "NumLock",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        44: "PrintScreen",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Meta",
        92: "Meta",
        106: "*",
        107: "+",
        108: ",",
        109: "-",
        110: ".",
        111: "/",
        144: "NumLock",
        145: "ScrollLock",
        160: "Shift",
        161: "Shift",
        162: "Control",
        163: "Control",
        164: "Alt",
        165: "Alt",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
      };
      var shift = {
        48: ")",
        49: "!",
        50: "@",
        51: "#",
        52: "$",
        53: "%",
        54: "^",
        55: "&",
        56: "*",
        57: "(",
        59: ":",
        61: "+",
        173: "_",
        186: ":",
        187: "+",
        188: "<",
        189: "_",
        190: ">",
        191: "?",
        192: "~",
        219: "{",
        220: "|",
        221: "}",
        222: '"'
      };
      var mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
      var ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
      for (i = 0; i < 10; i++) base[48 + i] = base[96 + i] = String(i);
      var i;
      for (i = 1; i <= 24; i++) base[i + 111] = "F" + i;
      var i;
      for (i = 65; i <= 90; i++) {
        base[i] = String.fromCharCode(i + 32);
        shift[i] = String.fromCharCode(i);
      }
      var i;
      for (code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code];
      var code;
      function keyName(event) {
        var ignoreKey = mac && event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey || ie && event.shiftKey && event.key && event.key.length == 1 || event.key == "Unidentified";
        var name = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
        if (name == "Esc") name = "Escape";
        if (name == "Del") name = "Delete";
        if (name == "Left") name = "ArrowLeft";
        if (name == "Up") name = "ArrowUp";
        if (name == "Right") name = "ArrowRight";
        if (name == "Down") name = "ArrowDown";
        return name;
      }
      exports.base = base;
      exports.keyName = keyName;
      exports.shift = shift;
    }
  });

  // node_modules/prosemirror-keymap/dist/index.cjs
  var require_dist8 = __commonJS({
    "node_modules/prosemirror-keymap/dist/index.cjs"(exports) {
      "use strict";
      var w3cKeyname = require_w3c_keyname();
      var prosemirrorState = require_dist4();
      var mac = typeof navigator != "undefined" && /Mac|iP(hone|[oa]d)/.test(navigator.platform);
      var windows = typeof navigator != "undefined" && /Win/.test(navigator.platform);
      function normalizeKeyName(name) {
        var parts = name.split(/-(?!$)/), result = parts[parts.length - 1];
        if (result == "Space") result = " ";
        var alt, ctrl, shift, meta;
        for (var i = 0; i < parts.length - 1; i++) {
          var mod = parts[i];
          if (/^(cmd|meta|m)$/i.test(mod)) meta = true;
          else if (/^a(lt)?$/i.test(mod)) alt = true;
          else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true;
          else if (/^s(hift)?$/i.test(mod)) shift = true;
          else if (/^mod$/i.test(mod)) {
            if (mac) meta = true;
            else ctrl = true;
          } else throw new Error("Unrecognized modifier name: " + mod);
        }
        if (alt) result = "Alt-" + result;
        if (ctrl) result = "Ctrl-" + result;
        if (meta) result = "Meta-" + result;
        if (shift) result = "Shift-" + result;
        return result;
      }
      function normalize(map) {
        var copy = /* @__PURE__ */ Object.create(null);
        for (var prop in map) copy[normalizeKeyName(prop)] = map[prop];
        return copy;
      }
      function modifiers(name, event) {
        var shift = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        if (event.altKey) name = "Alt-" + name;
        if (event.ctrlKey) name = "Ctrl-" + name;
        if (event.metaKey) name = "Meta-" + name;
        if (shift && event.shiftKey) name = "Shift-" + name;
        return name;
      }
      function keymap(bindings) {
        return new prosemirrorState.Plugin({
          props: {
            handleKeyDown: keydownHandler(bindings)
          }
        });
      }
      function keydownHandler(bindings) {
        var map = normalize(bindings);
        return function(view, event) {
          var name = w3cKeyname.keyName(event), baseName, direct = map[modifiers(name, event)];
          if (direct && direct(view.state, view.dispatch, view)) return true;
          if (name.length == 1 && name != " ") {
            if (event.shiftKey) {
              var noShift = map[modifiers(name, event, false)];
              if (noShift && noShift(view.state, view.dispatch, view)) return true;
            }
            if ((event.altKey || event.metaKey || event.ctrlKey) && !(windows && event.ctrlKey && event.altKey) && (baseName = w3cKeyname.base[event.keyCode]) && baseName != name) {
              var fromCode = map[modifiers(baseName, event)];
              if (fromCode && fromCode(view.state, view.dispatch, view)) return true;
            }
          }
          return false;
        };
      }
      exports.keydownHandler = keydownHandler;
      exports.keymap = keymap;
    }
  });

  // node_modules/@tiptap/pm/keymap/dist/index.cjs
  var require_dist9 = __commonJS({
    "node_modules/@tiptap/pm/keymap/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrorkeymap = require_dist8();
      _createStarExport(_prosemirrorkeymap);
    }
  });

  // node_modules/@tiptap/pm/model/dist/index.cjs
  var require_dist10 = __commonJS({
    "node_modules/@tiptap/pm/model/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrormodel = require_dist2();
      _createStarExport(_prosemirrormodel);
    }
  });

  // node_modules/@tiptap/pm/transform/dist/index.cjs
  var require_dist11 = __commonJS({
    "node_modules/@tiptap/pm/transform/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrortransform = require_dist3();
      _createStarExport(_prosemirrortransform);
    }
  });

  // node_modules/prosemirror-commands/dist/index.cjs
  var require_dist12 = __commonJS({
    "node_modules/prosemirror-commands/dist/index.cjs"(exports) {
      "use strict";
      var prosemirrorTransform = require_dist3();
      var prosemirrorModel = require_dist2();
      var prosemirrorState = require_dist4();
      var deleteSelection = function deleteSelection2(state, dispatch) {
        if (state.selection.empty) return false;
        if (dispatch) dispatch(state.tr.deleteSelection().scrollIntoView());
        return true;
      };
      function atBlockStart(state, view) {
        var $cursor = state.selection.$cursor;
        if (!$cursor || (view ? !view.endOfTextblock("backward", state) : $cursor.parentOffset > 0)) return null;
        return $cursor;
      }
      var joinBackward = function joinBackward2(state, dispatch, view) {
        var $cursor = atBlockStart(state, view);
        if (!$cursor) return false;
        var $cut = findCutBefore($cursor);
        if (!$cut) {
          var range = $cursor.blockRange(), target = range && prosemirrorTransform.liftTarget(range);
          if (target == null) return false;
          if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
          return true;
        }
        var before = $cut.nodeBefore;
        if (deleteBarrier(state, $cut, dispatch, -1)) return true;
        if ($cursor.parent.content.size == 0 && (textblockAt(before, "end") || prosemirrorState.NodeSelection.isSelectable(before))) {
          for (var depth = $cursor.depth; ; depth--) {
            var delStep = prosemirrorTransform.replaceStep(state.doc, $cursor.before(depth), $cursor.after(depth), prosemirrorModel.Slice.empty);
            if (delStep && delStep.slice.size < delStep.to - delStep.from) {
              if (dispatch) {
                var tr = state.tr.step(delStep);
                tr.setSelection(textblockAt(before, "end") ? prosemirrorState.Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1) : prosemirrorState.NodeSelection.create(tr.doc, $cut.pos - before.nodeSize));
                dispatch(tr.scrollIntoView());
              }
              return true;
            }
            if (depth == 1 || $cursor.node(depth - 1).childCount > 1) break;
          }
        }
        if (before.isAtom && $cut.depth == $cursor.depth - 1) {
          if (dispatch) dispatch(state.tr["delete"]($cut.pos - before.nodeSize, $cut.pos).scrollIntoView());
          return true;
        }
        return false;
      };
      var joinTextblockBackward = function joinTextblockBackward2(state, dispatch, view) {
        var $cursor = atBlockStart(state, view);
        if (!$cursor) return false;
        var $cut = findCutBefore($cursor);
        return $cut ? joinTextblocksAround(state, $cut, dispatch) : false;
      };
      var joinTextblockForward = function joinTextblockForward2(state, dispatch, view) {
        var $cursor = atBlockEnd(state, view);
        if (!$cursor) return false;
        var $cut = findCutAfter($cursor);
        return $cut ? joinTextblocksAround(state, $cut, dispatch) : false;
      };
      function joinTextblocksAround(state, $cut, dispatch) {
        var before = $cut.nodeBefore, beforeText = before, beforePos = $cut.pos - 1;
        for (; !beforeText.isTextblock; beforePos--) {
          if (beforeText.type.spec.isolating) return false;
          var child = beforeText.lastChild;
          if (!child) return false;
          beforeText = child;
        }
        var after = $cut.nodeAfter, afterText = after, afterPos = $cut.pos + 1;
        for (; !afterText.isTextblock; afterPos++) {
          if (afterText.type.spec.isolating) return false;
          var _child = afterText.firstChild;
          if (!_child) return false;
          afterText = _child;
        }
        var step = prosemirrorTransform.replaceStep(state.doc, beforePos, afterPos, prosemirrorModel.Slice.empty);
        if (!step || step.from != beforePos || step instanceof prosemirrorTransform.ReplaceStep && step.slice.size >= afterPos - beforePos) return false;
        if (dispatch) {
          var tr = state.tr.step(step);
          tr.setSelection(prosemirrorState.TextSelection.create(tr.doc, beforePos));
          dispatch(tr.scrollIntoView());
        }
        return true;
      }
      function textblockAt(node, side) {
        var only = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        for (var scan = node; scan; scan = side == "start" ? scan.firstChild : scan.lastChild) {
          if (scan.isTextblock) return true;
          if (only && scan.childCount != 1) return false;
        }
        return false;
      }
      var selectNodeBackward = function selectNodeBackward2(state, dispatch, view) {
        var _state$selection = state.selection, $head = _state$selection.$head, empty = _state$selection.empty, $cut = $head;
        if (!empty) return false;
        if ($head.parent.isTextblock) {
          if (view ? !view.endOfTextblock("backward", state) : $head.parentOffset > 0) return false;
          $cut = findCutBefore($head);
        }
        var node = $cut && $cut.nodeBefore;
        if (!node || !prosemirrorState.NodeSelection.isSelectable(node)) return false;
        if (dispatch) dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, $cut.pos - node.nodeSize)).scrollIntoView());
        return true;
      };
      function findCutBefore($pos) {
        if (!$pos.parent.type.spec.isolating) for (var i = $pos.depth - 1; i >= 0; i--) {
          if ($pos.index(i) > 0) return $pos.doc.resolve($pos.before(i + 1));
          if ($pos.node(i).type.spec.isolating) break;
        }
        return null;
      }
      function atBlockEnd(state, view) {
        var $cursor = state.selection.$cursor;
        if (!$cursor || (view ? !view.endOfTextblock("forward", state) : $cursor.parentOffset < $cursor.parent.content.size)) return null;
        return $cursor;
      }
      var joinForward = function joinForward2(state, dispatch, view) {
        var $cursor = atBlockEnd(state, view);
        if (!$cursor) return false;
        var $cut = findCutAfter($cursor);
        if (!$cut) return false;
        var after = $cut.nodeAfter;
        if (deleteBarrier(state, $cut, dispatch, 1)) return true;
        if ($cursor.parent.content.size == 0 && (textblockAt(after, "start") || prosemirrorState.NodeSelection.isSelectable(after))) {
          var delStep = prosemirrorTransform.replaceStep(state.doc, $cursor.before(), $cursor.after(), prosemirrorModel.Slice.empty);
          if (delStep && delStep.slice.size < delStep.to - delStep.from) {
            if (dispatch) {
              var tr = state.tr.step(delStep);
              tr.setSelection(textblockAt(after, "start") ? prosemirrorState.Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1) : prosemirrorState.NodeSelection.create(tr.doc, tr.mapping.map($cut.pos)));
              dispatch(tr.scrollIntoView());
            }
            return true;
          }
        }
        if (after.isAtom && $cut.depth == $cursor.depth - 1) {
          if (dispatch) dispatch(state.tr["delete"]($cut.pos, $cut.pos + after.nodeSize).scrollIntoView());
          return true;
        }
        return false;
      };
      var selectNodeForward = function selectNodeForward2(state, dispatch, view) {
        var _state$selection2 = state.selection, $head = _state$selection2.$head, empty = _state$selection2.empty, $cut = $head;
        if (!empty) return false;
        if ($head.parent.isTextblock) {
          if (view ? !view.endOfTextblock("forward", state) : $head.parentOffset < $head.parent.content.size) return false;
          $cut = findCutAfter($head);
        }
        var node = $cut && $cut.nodeAfter;
        if (!node || !prosemirrorState.NodeSelection.isSelectable(node)) return false;
        if (dispatch) dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, $cut.pos)).scrollIntoView());
        return true;
      };
      function findCutAfter($pos) {
        if (!$pos.parent.type.spec.isolating) for (var i = $pos.depth - 1; i >= 0; i--) {
          var parent = $pos.node(i);
          if ($pos.index(i) + 1 < parent.childCount) return $pos.doc.resolve($pos.after(i + 1));
          if (parent.type.spec.isolating) break;
        }
        return null;
      }
      var joinUp = function joinUp2(state, dispatch) {
        var sel = state.selection, nodeSel = sel instanceof prosemirrorState.NodeSelection, point;
        if (nodeSel) {
          if (sel.node.isTextblock || !prosemirrorTransform.canJoin(state.doc, sel.from)) return false;
          point = sel.from;
        } else {
          point = prosemirrorTransform.joinPoint(state.doc, sel.from, -1);
          if (point == null) return false;
        }
        if (dispatch) {
          var tr = state.tr.join(point);
          if (nodeSel) tr.setSelection(prosemirrorState.NodeSelection.create(tr.doc, point - state.doc.resolve(point).nodeBefore.nodeSize));
          dispatch(tr.scrollIntoView());
        }
        return true;
      };
      var joinDown = function joinDown2(state, dispatch) {
        var sel = state.selection, point;
        if (sel instanceof prosemirrorState.NodeSelection) {
          if (sel.node.isTextblock || !prosemirrorTransform.canJoin(state.doc, sel.to)) return false;
          point = sel.to;
        } else {
          point = prosemirrorTransform.joinPoint(state.doc, sel.to, 1);
          if (point == null) return false;
        }
        if (dispatch) dispatch(state.tr.join(point).scrollIntoView());
        return true;
      };
      var lift = function lift2(state, dispatch) {
        var _state$selection3 = state.selection, $from = _state$selection3.$from, $to = _state$selection3.$to;
        var range = $from.blockRange($to), target = range && prosemirrorTransform.liftTarget(range);
        if (target == null) return false;
        if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
        return true;
      };
      var newlineInCode = function newlineInCode2(state, dispatch) {
        var _state$selection4 = state.selection, $head = _state$selection4.$head, $anchor = _state$selection4.$anchor;
        if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;
        if (dispatch) dispatch(state.tr.insertText("\n").scrollIntoView());
        return true;
      };
      function defaultBlockAt(match) {
        for (var i = 0; i < match.edgeCount; i++) {
          var _match$edge = match.edge(i), type = _match$edge.type;
          if (type.isTextblock && !type.hasRequiredAttrs()) return type;
        }
        return null;
      }
      var exitCode = function exitCode2(state, dispatch) {
        var _state$selection5 = state.selection, $head = _state$selection5.$head, $anchor = _state$selection5.$anchor;
        if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;
        var above = $head.node(-1), after = $head.indexAfter(-1), type = defaultBlockAt(above.contentMatchAt(after));
        if (!type || !above.canReplaceWith(after, after, type)) return false;
        if (dispatch) {
          var pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill());
          tr.setSelection(prosemirrorState.Selection.near(tr.doc.resolve(pos), 1));
          dispatch(tr.scrollIntoView());
        }
        return true;
      };
      var createParagraphNear = function createParagraphNear2(state, dispatch) {
        var sel = state.selection, $from = sel.$from, $to = sel.$to;
        if (sel instanceof prosemirrorState.AllSelection || $from.parent.inlineContent || $to.parent.inlineContent) return false;
        var type = defaultBlockAt($to.parent.contentMatchAt($to.indexAfter()));
        if (!type || !type.isTextblock) return false;
        if (dispatch) {
          var side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
          var tr = state.tr.insert(side, type.createAndFill());
          tr.setSelection(prosemirrorState.TextSelection.create(tr.doc, side + 1));
          dispatch(tr.scrollIntoView());
        }
        return true;
      };
      var liftEmptyBlock = function liftEmptyBlock2(state, dispatch) {
        var $cursor = state.selection.$cursor;
        if (!$cursor || $cursor.parent.content.size) return false;
        if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
          var before = $cursor.before();
          if (prosemirrorTransform.canSplit(state.doc, before)) {
            if (dispatch) dispatch(state.tr.split(before).scrollIntoView());
            return true;
          }
        }
        var range = $cursor.blockRange(), target = range && prosemirrorTransform.liftTarget(range);
        if (target == null) return false;
        if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
        return true;
      };
      function splitBlockAs(splitNode) {
        return function(state, dispatch) {
          var _state$selection6 = state.selection, $from = _state$selection6.$from, $to = _state$selection6.$to;
          if (state.selection instanceof prosemirrorState.NodeSelection && state.selection.node.isBlock) {
            if (!$from.parentOffset || !prosemirrorTransform.canSplit(state.doc, $from.pos)) return false;
            if (dispatch) dispatch(state.tr.split($from.pos).scrollIntoView());
            return true;
          }
          if (!$from.depth) return false;
          var types = [];
          var splitDepth, deflt, atEnd = false, atStart = false;
          for (var d = $from.depth; ; d--) {
            var node = $from.node(d);
            if (node.isBlock) {
              atEnd = $from.end(d) == $from.pos + ($from.depth - d);
              atStart = $from.start(d) == $from.pos - ($from.depth - d);
              deflt = defaultBlockAt($from.node(d - 1).contentMatchAt($from.indexAfter(d - 1)));
              var splitType = splitNode && splitNode($to.parent, atEnd, $from);
              types.unshift(splitType || (atEnd && deflt ? {
                type: deflt
              } : null));
              splitDepth = d;
              break;
            } else {
              if (d == 1) return false;
              types.unshift(null);
            }
          }
          var tr = state.tr;
          if (state.selection instanceof prosemirrorState.TextSelection || state.selection instanceof prosemirrorState.AllSelection) tr.deleteSelection();
          var splitPos = tr.mapping.map($from.pos);
          var can = prosemirrorTransform.canSplit(tr.doc, splitPos, types.length, types);
          if (!can) {
            types[0] = deflt ? {
              type: deflt
            } : null;
            can = prosemirrorTransform.canSplit(tr.doc, splitPos, types.length, types);
          }
          if (!can) return false;
          tr.split(splitPos, types.length, types);
          if (!atEnd && atStart && $from.node(splitDepth).type != deflt) {
            var first = tr.mapping.map($from.before(splitDepth)), $first = tr.doc.resolve(first);
            if (deflt && $from.node(splitDepth - 1).canReplaceWith($first.index(), $first.index() + 1, deflt)) tr.setNodeMarkup(tr.mapping.map($from.before(splitDepth)), deflt);
          }
          if (dispatch) dispatch(tr.scrollIntoView());
          return true;
        };
      }
      var splitBlock = splitBlockAs();
      var splitBlockKeepMarks = function splitBlockKeepMarks2(state, dispatch) {
        return splitBlock(state, dispatch && function(tr) {
          var marks = state.storedMarks || state.selection.$to.parentOffset && state.selection.$from.marks();
          if (marks) tr.ensureMarks(marks);
          dispatch(tr);
        });
      };
      var selectParentNode = function selectParentNode2(state, dispatch) {
        var _state$selection7 = state.selection, $from = _state$selection7.$from, to = _state$selection7.to, pos;
        var same = $from.sharedDepth(to);
        if (same == 0) return false;
        pos = $from.before(same);
        if (dispatch) dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, pos)));
        return true;
      };
      var selectAll = function selectAll2(state, dispatch) {
        if (dispatch) dispatch(state.tr.setSelection(new prosemirrorState.AllSelection(state.doc)));
        return true;
      };
      function joinMaybeClear(state, $pos, dispatch) {
        var before = $pos.nodeBefore, after = $pos.nodeAfter, index = $pos.index();
        if (!before || !after || !before.type.compatibleContent(after.type)) return false;
        if (!before.content.size && $pos.parent.canReplace(index - 1, index)) {
          if (dispatch) dispatch(state.tr["delete"]($pos.pos - before.nodeSize, $pos.pos).scrollIntoView());
          return true;
        }
        if (!$pos.parent.canReplace(index, index + 1) || !(after.isTextblock || prosemirrorTransform.canJoin(state.doc, $pos.pos))) return false;
        if (dispatch) dispatch(state.tr.join($pos.pos).scrollIntoView());
        return true;
      }
      function deleteBarrier(state, $cut, dispatch, dir) {
        var before = $cut.nodeBefore, after = $cut.nodeAfter, conn, match;
        var isolated = before.type.spec.isolating || after.type.spec.isolating;
        if (!isolated && joinMaybeClear(state, $cut, dispatch)) return true;
        var canDelAfter = !isolated && $cut.parent.canReplace($cut.index(), $cut.index() + 1);
        if (canDelAfter && (conn = (match = before.contentMatchAt(before.childCount)).findWrapping(after.type)) && match.matchType(conn[0] || after.type).validEnd) {
          if (dispatch) {
            var end = $cut.pos + after.nodeSize, wrap = prosemirrorModel.Fragment.empty;
            for (var i = conn.length - 1; i >= 0; i--) wrap = prosemirrorModel.Fragment.from(conn[i].create(null, wrap));
            wrap = prosemirrorModel.Fragment.from(before.copy(wrap));
            var tr = state.tr.step(new prosemirrorTransform.ReplaceAroundStep($cut.pos - 1, end, $cut.pos, end, new prosemirrorModel.Slice(wrap, 1, 0), conn.length, true));
            var $joinAt = tr.doc.resolve(end + 2 * conn.length);
            if ($joinAt.nodeAfter && $joinAt.nodeAfter.type == before.type && prosemirrorTransform.canJoin(tr.doc, $joinAt.pos)) tr.join($joinAt.pos);
            dispatch(tr.scrollIntoView());
          }
          return true;
        }
        var selAfter = after.type.spec.isolating || dir > 0 && isolated ? null : prosemirrorState.Selection.findFrom($cut, 1);
        var range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && prosemirrorTransform.liftTarget(range);
        if (target != null && target >= $cut.depth) {
          if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
          return true;
        }
        if (canDelAfter && textblockAt(after, "start", true) && textblockAt(before, "end")) {
          var at = before, _wrap = [];
          for (; ; ) {
            _wrap.push(at);
            if (at.isTextblock) break;
            at = at.lastChild;
          }
          var afterText = after, afterDepth = 1;
          for (; !afterText.isTextblock; afterText = afterText.firstChild) afterDepth++;
          if (at.canReplace(at.childCount, at.childCount, afterText.content)) {
            if (dispatch) {
              var _end = prosemirrorModel.Fragment.empty;
              for (var _i = _wrap.length - 1; _i >= 0; _i--) _end = prosemirrorModel.Fragment.from(_wrap[_i].copy(_end));
              var _tr = state.tr.step(new prosemirrorTransform.ReplaceAroundStep($cut.pos - _wrap.length, $cut.pos + after.nodeSize, $cut.pos + afterDepth, $cut.pos + after.nodeSize - afterDepth, new prosemirrorModel.Slice(_end, _wrap.length, 0), 0, true));
              dispatch(_tr.scrollIntoView());
            }
            return true;
          }
        }
        return false;
      }
      function selectTextblockSide(side) {
        return function(state, dispatch) {
          var sel = state.selection, $pos = side < 0 ? sel.$from : sel.$to;
          var depth = $pos.depth;
          while ($pos.node(depth).isInline) {
            if (!depth) return false;
            depth--;
          }
          if (!$pos.node(depth).isTextblock) return false;
          if (dispatch) dispatch(state.tr.setSelection(prosemirrorState.TextSelection.create(state.doc, side < 0 ? $pos.start(depth) : $pos.end(depth))));
          return true;
        };
      }
      var selectTextblockStart = selectTextblockSide(-1);
      var selectTextblockEnd = selectTextblockSide(1);
      function wrapIn(nodeType) {
        var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return function(state, dispatch) {
          var _state$selection8 = state.selection, $from = _state$selection8.$from, $to = _state$selection8.$to;
          var range = $from.blockRange($to), wrapping = range && prosemirrorTransform.findWrapping(range, nodeType, attrs);
          if (!wrapping) return false;
          if (dispatch) dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
          return true;
        };
      }
      function setBlockType(nodeType) {
        var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return function(state, dispatch) {
          var applicable = false;
          for (var i = 0; i < state.selection.ranges.length && !applicable; i++) {
            var _state$selection$rang = state.selection.ranges[i], from = _state$selection$rang.$from.pos, to = _state$selection$rang.$to.pos;
            state.doc.nodesBetween(from, to, function(node, pos) {
              if (applicable) return false;
              if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return;
              if (node.type == nodeType) {
                applicable = true;
              } else {
                var $pos = state.doc.resolve(pos), index = $pos.index();
                applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
              }
            });
          }
          if (!applicable) return false;
          if (dispatch) {
            var tr = state.tr;
            for (var _i2 = 0; _i2 < state.selection.ranges.length; _i2++) {
              var _state$selection$rang2 = state.selection.ranges[_i2], _from = _state$selection$rang2.$from.pos, _to = _state$selection$rang2.$to.pos;
              tr.setBlockType(_from, _to, nodeType, attrs);
            }
            dispatch(tr.scrollIntoView());
          }
          return true;
        };
      }
      function markApplies(doc, ranges, type, enterAtoms) {
        var _loop = function _loop2() {
          var _ranges$i = ranges[i], $from = _ranges$i.$from, $to = _ranges$i.$to;
          var can = $from.depth == 0 ? doc.inlineContent && doc.type.allowsMarkType(type) : false;
          doc.nodesBetween($from.pos, $to.pos, function(node, pos) {
            if (can || !enterAtoms && node.isAtom && node.isInline && pos >= $from.pos && pos + node.nodeSize <= $to.pos) return false;
            can = node.inlineContent && node.type.allowsMarkType(type);
          });
          if (can) return {
            v: true
          };
        }, _ret;
        for (var i = 0; i < ranges.length; i++) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }
        return false;
      }
      function removeInlineAtoms(ranges) {
        var result = [];
        var _loop2 = function _loop22() {
          var _ranges$i2 = ranges[i], $from = _ranges$i2.$from, $to = _ranges$i2.$to;
          $from.doc.nodesBetween($from.pos, $to.pos, function(node, pos) {
            if (node.isAtom && node.content.size && node.isInline && pos >= $from.pos && pos + node.nodeSize <= $to.pos) {
              if (pos + 1 > $from.pos) result.push(new prosemirrorState.SelectionRange($from, $from.doc.resolve(pos + 1)));
              $from = $from.doc.resolve(pos + 1 + node.content.size);
              return false;
            }
          });
          if ($from.pos < $to.pos) result.push(new prosemirrorState.SelectionRange($from, $to));
        };
        for (var i = 0; i < ranges.length; i++) {
          _loop2();
        }
        return result;
      }
      function toggleMark(markType) {
        var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var options = arguments.length > 2 ? arguments[2] : void 0;
        var removeWhenPresent = (options && options.removeWhenPresent) !== false;
        var enterAtoms = (options && options.enterInlineAtoms) !== false;
        var dropSpace = !(options && options.includeWhitespace);
        return function(state, dispatch) {
          var _state$selection9 = state.selection, empty = _state$selection9.empty, $cursor = _state$selection9.$cursor, ranges = _state$selection9.ranges;
          if (empty && !$cursor || !markApplies(state.doc, ranges, markType, enterAtoms)) return false;
          if (dispatch) {
            if ($cursor) {
              if (markType.isInSet(state.storedMarks || $cursor.marks())) dispatch(state.tr.removeStoredMark(markType));
              else dispatch(state.tr.addStoredMark(markType.create(attrs)));
            } else {
              var add, tr = state.tr;
              if (!enterAtoms) ranges = removeInlineAtoms(ranges);
              if (removeWhenPresent) {
                add = !ranges.some(function(r) {
                  return state.doc.rangeHasMark(r.$from.pos, r.$to.pos, markType);
                });
              } else {
                add = !ranges.every(function(r) {
                  var missing = false;
                  tr.doc.nodesBetween(r.$from.pos, r.$to.pos, function(node, pos, parent) {
                    if (missing) return false;
                    missing = !markType.isInSet(node.marks) && !!parent && parent.type.allowsMarkType(markType) && !(node.isText && /^\s*$/.test(node.textBetween(Math.max(0, r.$from.pos - pos), Math.min(node.nodeSize, r.$to.pos - pos))));
                  });
                  return !missing;
                });
              }
              for (var i = 0; i < ranges.length; i++) {
                var _ranges$i3 = ranges[i], $from = _ranges$i3.$from, $to = _ranges$i3.$to;
                if (!add) {
                  tr.removeMark($from.pos, $to.pos, markType);
                } else {
                  var from = $from.pos, to = $to.pos, start = $from.nodeAfter, end = $to.nodeBefore;
                  var spaceStart = dropSpace && start && start.isText ? /^\s*/.exec(start.text)[0].length : 0;
                  var spaceEnd = dropSpace && end && end.isText ? /\s*$/.exec(end.text)[0].length : 0;
                  if (from + spaceStart < to) {
                    from += spaceStart;
                    to -= spaceEnd;
                  }
                  tr.addMark(from, to, markType.create(attrs));
                }
              }
              dispatch(tr.scrollIntoView());
            }
          }
          return true;
        };
      }
      function wrapDispatchForJoin(dispatch, isJoinable) {
        return function(tr) {
          if (!tr.isGeneric) return dispatch(tr);
          var ranges = [];
          for (var i = 0; i < tr.mapping.maps.length; i++) {
            var map = tr.mapping.maps[i];
            for (var j = 0; j < ranges.length; j++) ranges[j] = map.map(ranges[j]);
            map.forEach(function(_s, _e, from2, to2) {
              return ranges.push(from2, to2);
            });
          }
          var joinable = [];
          for (var _i3 = 0; _i3 < ranges.length; _i3 += 2) {
            var from = ranges[_i3], to = ranges[_i3 + 1];
            var $from = tr.doc.resolve(from), depth = $from.sharedDepth(to), parent = $from.node(depth);
            for (var index = $from.indexAfter(depth), pos = $from.after(depth + 1); pos <= to; ++index) {
              var after = parent.maybeChild(index);
              if (!after) break;
              if (index && joinable.indexOf(pos) == -1) {
                var before = parent.child(index - 1);
                if (before.type == after.type && isJoinable(before, after)) joinable.push(pos);
              }
              pos += after.nodeSize;
            }
          }
          joinable.sort(function(a, b) {
            return a - b;
          });
          for (var _i4 = joinable.length - 1; _i4 >= 0; _i4--) {
            if (prosemirrorTransform.canJoin(tr.doc, joinable[_i4])) tr.join(joinable[_i4]);
          }
          dispatch(tr);
        };
      }
      function autoJoin(command, isJoinable) {
        var canJoin = Array.isArray(isJoinable) ? function(node) {
          return isJoinable.indexOf(node.type.name) > -1;
        } : isJoinable;
        return function(state, dispatch, view) {
          return command(state, dispatch && wrapDispatchForJoin(dispatch, canJoin), view);
        };
      }
      function chainCommands() {
        for (var _len = arguments.length, commands = new Array(_len), _key = 0; _key < _len; _key++) {
          commands[_key] = arguments[_key];
        }
        return function(state, dispatch, view) {
          for (var i = 0; i < commands.length; i++) if (commands[i](state, dispatch, view)) return true;
          return false;
        };
      }
      var backspace = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
      var del = chainCommands(deleteSelection, joinForward, selectNodeForward);
      var pcBaseKeymap = {
        "Enter": chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
        "Mod-Enter": exitCode,
        "Backspace": backspace,
        "Mod-Backspace": backspace,
        "Shift-Backspace": backspace,
        "Delete": del,
        "Mod-Delete": del,
        "Mod-a": selectAll
      };
      var macBaseKeymap = {
        "Ctrl-h": pcBaseKeymap["Backspace"],
        "Alt-Backspace": pcBaseKeymap["Mod-Backspace"],
        "Ctrl-d": pcBaseKeymap["Delete"],
        "Ctrl-Alt-Backspace": pcBaseKeymap["Mod-Delete"],
        "Alt-Delete": pcBaseKeymap["Mod-Delete"],
        "Alt-d": pcBaseKeymap["Mod-Delete"],
        "Ctrl-a": selectTextblockStart,
        "Ctrl-e": selectTextblockEnd
      };
      for (key in pcBaseKeymap) macBaseKeymap[key] = pcBaseKeymap[key];
      var key;
      var mac = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os != "undefined" && os.platform ? os.platform() == "darwin" : false;
      var baseKeymap = mac ? macBaseKeymap : pcBaseKeymap;
      exports.autoJoin = autoJoin;
      exports.baseKeymap = baseKeymap;
      exports.chainCommands = chainCommands;
      exports.createParagraphNear = createParagraphNear;
      exports.deleteSelection = deleteSelection;
      exports.exitCode = exitCode;
      exports.joinBackward = joinBackward;
      exports.joinDown = joinDown;
      exports.joinForward = joinForward;
      exports.joinTextblockBackward = joinTextblockBackward;
      exports.joinTextblockForward = joinTextblockForward;
      exports.joinUp = joinUp;
      exports.lift = lift;
      exports.liftEmptyBlock = liftEmptyBlock;
      exports.macBaseKeymap = macBaseKeymap;
      exports.newlineInCode = newlineInCode;
      exports.pcBaseKeymap = pcBaseKeymap;
      exports.selectAll = selectAll;
      exports.selectNodeBackward = selectNodeBackward;
      exports.selectNodeForward = selectNodeForward;
      exports.selectParentNode = selectParentNode;
      exports.selectTextblockEnd = selectTextblockEnd;
      exports.selectTextblockStart = selectTextblockStart;
      exports.setBlockType = setBlockType;
      exports.splitBlock = splitBlock;
      exports.splitBlockAs = splitBlockAs;
      exports.splitBlockKeepMarks = splitBlockKeepMarks;
      exports.toggleMark = toggleMark;
      exports.wrapIn = wrapIn;
    }
  });

  // node_modules/@tiptap/pm/commands/dist/index.cjs
  var require_dist13 = __commonJS({
    "node_modules/@tiptap/pm/commands/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrorcommands = require_dist12();
      _createStarExport(_prosemirrorcommands);
    }
  });

  // node_modules/prosemirror-schema-list/dist/index.cjs
  var require_dist14 = __commonJS({
    "node_modules/prosemirror-schema-list/dist/index.cjs"(exports) {
      "use strict";
      var prosemirrorTransform = require_dist3();
      var prosemirrorModel = require_dist2();
      var prosemirrorState = require_dist4();
      var olDOM = ["ol", 0];
      var ulDOM = ["ul", 0];
      var liDOM = ["li", 0];
      var orderedList = {
        attrs: {
          order: {
            "default": 1,
            validate: "number"
          }
        },
        parseDOM: [{
          tag: "ol",
          getAttrs: function getAttrs(dom) {
            return {
              order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1
            };
          }
        }],
        toDOM: function toDOM(node) {
          return node.attrs.order == 1 ? olDOM : ["ol", {
            start: node.attrs.order
          }, 0];
        }
      };
      var bulletList = {
        parseDOM: [{
          tag: "ul"
        }],
        toDOM: function toDOM() {
          return ulDOM;
        }
      };
      var listItem = {
        parseDOM: [{
          tag: "li"
        }],
        toDOM: function toDOM() {
          return liDOM;
        },
        defining: true
      };
      function add(obj, props) {
        var copy = {};
        for (var prop in obj) copy[prop] = obj[prop];
        for (var _prop in props) copy[_prop] = props[_prop];
        return copy;
      }
      function addListNodes(nodes, itemContent, listGroup) {
        return nodes.append({
          ordered_list: add(orderedList, {
            content: "list_item+",
            group: listGroup
          }),
          bullet_list: add(bulletList, {
            content: "list_item+",
            group: listGroup
          }),
          list_item: add(listItem, {
            content: itemContent
          })
        });
      }
      function wrapInList(listType) {
        var attrs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return function(state, dispatch) {
          var _state$selection = state.selection, $from = _state$selection.$from, $to = _state$selection.$to;
          var range = $from.blockRange($to);
          if (!range) return false;
          var tr = dispatch ? state.tr : null;
          if (!wrapRangeInList(tr, range, listType, attrs)) return false;
          if (dispatch) dispatch(tr.scrollIntoView());
          return true;
        };
      }
      function wrapRangeInList(tr, range, listType) {
        var attrs = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
        var doJoin = false, outerRange = range, doc = range.$from.doc;
        if (range.depth >= 2 && range.$from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex == 0) {
          if (range.$from.index(range.depth - 1) == 0) return false;
          var $insert = doc.resolve(range.start - 2);
          outerRange = new prosemirrorModel.NodeRange($insert, $insert, range.depth);
          if (range.endIndex < range.parent.childCount) range = new prosemirrorModel.NodeRange(range.$from, doc.resolve(range.$to.end(range.depth)), range.depth);
          doJoin = true;
        }
        var wrap = prosemirrorTransform.findWrapping(outerRange, listType, attrs, range);
        if (!wrap) return false;
        if (tr) doWrapInList(tr, range, wrap, doJoin, listType);
        return true;
      }
      function doWrapInList(tr, range, wrappers, joinBefore, listType) {
        var content = prosemirrorModel.Fragment.empty;
        for (var i = wrappers.length - 1; i >= 0; i--) content = prosemirrorModel.Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
        tr.step(new prosemirrorTransform.ReplaceAroundStep(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end, new prosemirrorModel.Slice(content, 0, 0), wrappers.length, true));
        var found = 0;
        for (var _i = 0; _i < wrappers.length; _i++) if (wrappers[_i].type == listType) found = _i + 1;
        var splitDepth = wrappers.length - found;
        var splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0), parent = range.parent;
        for (var _i2 = range.startIndex, e = range.endIndex, first = true; _i2 < e; _i2++, first = false) {
          if (!first && prosemirrorTransform.canSplit(tr.doc, splitPos, splitDepth)) {
            tr.split(splitPos, splitDepth);
            splitPos += 2 * splitDepth;
          }
          splitPos += parent.child(_i2).nodeSize;
        }
        return tr;
      }
      function splitListItem(itemType, itemAttrs) {
        return function(state, dispatch) {
          var _state$selection2 = state.selection, $from = _state$selection2.$from, $to = _state$selection2.$to, node = _state$selection2.node;
          if (node && node.isBlock || $from.depth < 2 || !$from.sameParent($to)) return false;
          var grandParent = $from.node(-1);
          if (grandParent.type != itemType) return false;
          if ($from.parent.content.size == 0 && $from.node(-1).childCount == $from.indexAfter(-1)) {
            if ($from.depth == 3 || $from.node(-3).type != itemType || $from.index(-2) != $from.node(-2).childCount - 1) return false;
            if (dispatch) {
              var wrap = prosemirrorModel.Fragment.empty;
              var depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
              for (var d = $from.depth - depthBefore; d >= $from.depth - 3; d--) wrap = prosemirrorModel.Fragment.from($from.node(d).copy(wrap));
              var depthAfter = $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3;
              wrap = wrap.append(prosemirrorModel.Fragment.from(itemType.createAndFill()));
              var start = $from.before($from.depth - (depthBefore - 1));
              var _tr = state.tr.replace(start, $from.after(-depthAfter), new prosemirrorModel.Slice(wrap, 4 - depthBefore, 0));
              var sel = -1;
              _tr.doc.nodesBetween(start, _tr.doc.content.size, function(node2, pos) {
                if (sel > -1) return false;
                if (node2.isTextblock && node2.content.size == 0) sel = pos + 1;
              });
              if (sel > -1) _tr.setSelection(prosemirrorState.Selection.near(_tr.doc.resolve(sel)));
              dispatch(_tr.scrollIntoView());
            }
            return true;
          }
          var nextType = $to.pos == $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
          var tr = state.tr["delete"]($from.pos, $to.pos);
          var types = nextType ? [itemAttrs ? {
            type: itemType,
            attrs: itemAttrs
          } : null, {
            type: nextType
          }] : void 0;
          if (!prosemirrorTransform.canSplit(tr.doc, $from.pos, 2, types)) return false;
          if (dispatch) dispatch(tr.split($from.pos, 2, types).scrollIntoView());
          return true;
        };
      }
      function splitListItemKeepMarks(itemType, itemAttrs) {
        var split = splitListItem(itemType, itemAttrs);
        return function(state, dispatch) {
          return split(state, dispatch && function(tr) {
            var marks = state.storedMarks || state.selection.$to.parentOffset && state.selection.$from.marks();
            if (marks) tr.ensureMarks(marks);
            dispatch(tr);
          });
        };
      }
      function liftListItem(itemType) {
        return function(state, dispatch) {
          var _state$selection3 = state.selection, $from = _state$selection3.$from, $to = _state$selection3.$to;
          var range = $from.blockRange($to, function(node) {
            return node.childCount > 0 && node.firstChild.type == itemType;
          });
          if (!range) return false;
          if (!dispatch) return true;
          if ($from.node(range.depth - 1).type == itemType) return liftToOuterList(state, dispatch, itemType, range);
          else return liftOutOfList(state, dispatch, range);
        };
      }
      function liftToOuterList(state, dispatch, itemType, range) {
        var tr = state.tr, end = range.end, endOfList = range.$to.end(range.depth);
        if (end < endOfList) {
          tr.step(new prosemirrorTransform.ReplaceAroundStep(end - 1, endOfList, end, endOfList, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
          range = new prosemirrorModel.NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
        }
        var target = prosemirrorTransform.liftTarget(range);
        if (target == null) return false;
        tr.lift(range, target);
        var $after = tr.doc.resolve(tr.mapping.map(end, -1) - 1);
        if (prosemirrorTransform.canJoin(tr.doc, $after.pos) && $after.nodeBefore.type == $after.nodeAfter.type) tr.join($after.pos);
        dispatch(tr.scrollIntoView());
        return true;
      }
      function liftOutOfList(state, dispatch, range) {
        var tr = state.tr, list = range.parent;
        for (var pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
          pos -= list.child(i).nodeSize;
          tr["delete"](pos - 1, pos + 1);
        }
        var $start = tr.doc.resolve(range.start), item = $start.nodeAfter;
        if (tr.mapping.map(range.end) != range.start + $start.nodeAfter.nodeSize) return false;
        var atStart = range.startIndex == 0, atEnd = range.endIndex == list.childCount;
        var parent = $start.node(-1), indexBefore = $start.index(-1);
        if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1, item.content.append(atEnd ? prosemirrorModel.Fragment.empty : prosemirrorModel.Fragment.from(list)))) return false;
        var start = $start.pos, end = start + item.nodeSize;
        tr.step(new prosemirrorTransform.ReplaceAroundStep(start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1, new prosemirrorModel.Slice((atStart ? prosemirrorModel.Fragment.empty : prosemirrorModel.Fragment.from(list.copy(prosemirrorModel.Fragment.empty))).append(atEnd ? prosemirrorModel.Fragment.empty : prosemirrorModel.Fragment.from(list.copy(prosemirrorModel.Fragment.empty))), atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
        dispatch(tr.scrollIntoView());
        return true;
      }
      function sinkListItem(itemType) {
        return function(state, dispatch) {
          var _state$selection4 = state.selection, $from = _state$selection4.$from, $to = _state$selection4.$to;
          var range = $from.blockRange($to, function(node) {
            return node.childCount > 0 && node.firstChild.type == itemType;
          });
          if (!range) return false;
          var startIndex = range.startIndex;
          if (startIndex == 0) return false;
          var parent = range.parent, nodeBefore = parent.child(startIndex - 1);
          if (nodeBefore.type != itemType) return false;
          if (dispatch) {
            var nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type == parent.type;
            var inner = prosemirrorModel.Fragment.from(nestedBefore ? itemType.create() : null);
            var slice = new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(itemType.create(null, prosemirrorModel.Fragment.from(parent.type.create(null, inner)))), nestedBefore ? 3 : 1, 0);
            var before = range.start, after = range.end;
            dispatch(state.tr.step(new prosemirrorTransform.ReplaceAroundStep(before - (nestedBefore ? 3 : 1), after, before, after, slice, 1, true)).scrollIntoView());
          }
          return true;
        };
      }
      exports.addListNodes = addListNodes;
      exports.bulletList = bulletList;
      exports.liftListItem = liftListItem;
      exports.listItem = listItem;
      exports.orderedList = orderedList;
      exports.sinkListItem = sinkListItem;
      exports.splitListItem = splitListItem;
      exports.splitListItemKeepMarks = splitListItemKeepMarks;
      exports.wrapInList = wrapInList;
      exports.wrapRangeInList = wrapRangeInList;
    }
  });

  // node_modules/@tiptap/pm/schema-list/dist/index.cjs
  var require_dist15 = __commonJS({
    "node_modules/@tiptap/pm/schema-list/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrorschemalist = require_dist14();
      _createStarExport(_prosemirrorschemalist);
    }
  });

  // node_modules/@tiptap/core/dist/index.cjs
  var require_dist16 = __commonJS({
    "node_modules/@tiptap/core/dist/index.cjs"(exports) {
      "use strict";
      var state = require_dist5();
      var view = require_dist7();
      var keymap = require_dist9();
      var model = require_dist10();
      var transform = require_dist11();
      var commands$1 = require_dist13();
      var schemaList = require_dist15();
      function createChainableState(config) {
        const { state: state2, transaction } = config;
        let { selection } = transaction;
        let { doc } = transaction;
        let { storedMarks } = transaction;
        return {
          ...state2,
          apply: state2.apply.bind(state2),
          applyTransaction: state2.applyTransaction.bind(state2),
          plugins: state2.plugins,
          schema: state2.schema,
          reconfigure: state2.reconfigure.bind(state2),
          toJSON: state2.toJSON.bind(state2),
          get storedMarks() {
            return storedMarks;
          },
          get selection() {
            return selection;
          },
          get doc() {
            return doc;
          },
          get tr() {
            selection = transaction.selection;
            doc = transaction.doc;
            storedMarks = transaction.storedMarks;
            return transaction;
          }
        };
      }
      var CommandManager = class {
        constructor(props) {
          this.editor = props.editor;
          this.rawCommands = this.editor.extensionManager.commands;
          this.customState = props.state;
        }
        get hasCustomState() {
          return !!this.customState;
        }
        get state() {
          return this.customState || this.editor.state;
        }
        get commands() {
          const { rawCommands, editor: editor2, state: state2 } = this;
          const { view: view2 } = editor2;
          const { tr } = state2;
          const props = this.buildProps(tr);
          return Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
            const method = (...args) => {
              const callback = command2(...args)(props);
              if (!tr.getMeta("preventDispatch") && !this.hasCustomState) {
                view2.dispatch(tr);
              }
              return callback;
            };
            return [name, method];
          }));
        }
        get chain() {
          return () => this.createChain();
        }
        get can() {
          return () => this.createCan();
        }
        createChain(startTr, shouldDispatch = true) {
          const { rawCommands, editor: editor2, state: state2 } = this;
          const { view: view2 } = editor2;
          const callbacks = [];
          const hasStartTransaction = !!startTr;
          const tr = startTr || state2.tr;
          const run2 = () => {
            if (!hasStartTransaction && shouldDispatch && !tr.getMeta("preventDispatch") && !this.hasCustomState) {
              view2.dispatch(tr);
            }
            return callbacks.every((callback) => callback === true);
          };
          const chain = {
            ...Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
              const chainedCommand = (...args) => {
                const props = this.buildProps(tr, shouldDispatch);
                const callback = command2(...args)(props);
                callbacks.push(callback);
                return chain;
              };
              return [name, chainedCommand];
            })),
            run: run2
          };
          return chain;
        }
        createCan(startTr) {
          const { rawCommands, state: state2 } = this;
          const dispatch = false;
          const tr = startTr || state2.tr;
          const props = this.buildProps(tr, dispatch);
          const formattedCommands = Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
            return [name, (...args) => command2(...args)({ ...props, dispatch: void 0 })];
          }));
          return {
            ...formattedCommands,
            chain: () => this.createChain(tr, dispatch)
          };
        }
        buildProps(tr, shouldDispatch = true) {
          const { rawCommands, editor: editor2, state: state2 } = this;
          const { view: view2 } = editor2;
          const props = {
            tr,
            editor: editor2,
            view: view2,
            state: createChainableState({
              state: state2,
              transaction: tr
            }),
            dispatch: shouldDispatch ? () => void 0 : void 0,
            chain: () => this.createChain(tr, shouldDispatch),
            can: () => this.createCan(tr),
            get commands() {
              return Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
                return [name, (...args) => command2(...args)(props)];
              }));
            }
          };
          return props;
        }
      };
      var EventEmitter = class {
        constructor() {
          this.callbacks = {};
        }
        on(event, fn) {
          if (!this.callbacks[event]) {
            this.callbacks[event] = [];
          }
          this.callbacks[event].push(fn);
          return this;
        }
        emit(event, ...args) {
          const callbacks = this.callbacks[event];
          if (callbacks) {
            callbacks.forEach((callback) => callback.apply(this, args));
          }
          return this;
        }
        off(event, fn) {
          const callbacks = this.callbacks[event];
          if (callbacks) {
            if (fn) {
              this.callbacks[event] = callbacks.filter((callback) => callback !== fn);
            } else {
              delete this.callbacks[event];
            }
          }
          return this;
        }
        once(event, fn) {
          const onceFn = (...args) => {
            this.off(event, onceFn);
            fn.apply(this, args);
          };
          return this.on(event, onceFn);
        }
        removeAllListeners() {
          this.callbacks = {};
        }
      };
      function getExtensionField(extension, field, context) {
        if (extension.config[field] === void 0 && extension.parent) {
          return getExtensionField(extension.parent, field, context);
        }
        if (typeof extension.config[field] === "function") {
          const value = extension.config[field].bind({
            ...context,
            parent: extension.parent ? getExtensionField(extension.parent, field, context) : null
          });
          return value;
        }
        return extension.config[field];
      }
      function splitExtensions(extensions) {
        const baseExtensions = extensions.filter((extension) => extension.type === "extension");
        const nodeExtensions = extensions.filter((extension) => extension.type === "node");
        const markExtensions = extensions.filter((extension) => extension.type === "mark");
        return {
          baseExtensions,
          nodeExtensions,
          markExtensions
        };
      }
      function getAttributesFromExtensions(extensions) {
        const extensionAttributes = [];
        const { nodeExtensions, markExtensions } = splitExtensions(extensions);
        const nodeAndMarkExtensions = [...nodeExtensions, ...markExtensions];
        const defaultAttribute = {
          default: null,
          rendered: true,
          renderHTML: null,
          parseHTML: null,
          keepOnSplit: true,
          isRequired: false
        };
        extensions.forEach((extension) => {
          const context = {
            name: extension.name,
            options: extension.options,
            storage: extension.storage,
            extensions: nodeAndMarkExtensions
          };
          const addGlobalAttributes = getExtensionField(extension, "addGlobalAttributes", context);
          if (!addGlobalAttributes) {
            return;
          }
          const globalAttributes = addGlobalAttributes();
          globalAttributes.forEach((globalAttribute) => {
            globalAttribute.types.forEach((type) => {
              Object.entries(globalAttribute.attributes).forEach(([name, attribute]) => {
                extensionAttributes.push({
                  type,
                  name,
                  attribute: {
                    ...defaultAttribute,
                    ...attribute
                  }
                });
              });
            });
          });
        });
        nodeAndMarkExtensions.forEach((extension) => {
          const context = {
            name: extension.name,
            options: extension.options,
            storage: extension.storage
          };
          const addAttributes = getExtensionField(extension, "addAttributes", context);
          if (!addAttributes) {
            return;
          }
          const attributes = addAttributes();
          Object.entries(attributes).forEach(([name, attribute]) => {
            const mergedAttr = {
              ...defaultAttribute,
              ...attribute
            };
            if (typeof (mergedAttr === null || mergedAttr === void 0 ? void 0 : mergedAttr.default) === "function") {
              mergedAttr.default = mergedAttr.default();
            }
            if ((mergedAttr === null || mergedAttr === void 0 ? void 0 : mergedAttr.isRequired) && (mergedAttr === null || mergedAttr === void 0 ? void 0 : mergedAttr.default) === void 0) {
              delete mergedAttr.default;
            }
            extensionAttributes.push({
              type: extension.name,
              name,
              attribute: mergedAttr
            });
          });
        });
        return extensionAttributes;
      }
      function getNodeType(nameOrType, schema) {
        if (typeof nameOrType === "string") {
          if (!schema.nodes[nameOrType]) {
            throw Error(`There is no node type named '${nameOrType}'. Maybe you forgot to add the extension?`);
          }
          return schema.nodes[nameOrType];
        }
        return nameOrType;
      }
      function mergeAttributes(...objects) {
        return objects.filter((item) => !!item).reduce((items, item) => {
          const mergedAttributes = { ...items };
          Object.entries(item).forEach(([key, value]) => {
            const exists = mergedAttributes[key];
            if (!exists) {
              mergedAttributes[key] = value;
              return;
            }
            if (key === "class") {
              const valueClasses = value ? String(value).split(" ") : [];
              const existingClasses = mergedAttributes[key] ? mergedAttributes[key].split(" ") : [];
              const insertClasses = valueClasses.filter((valueClass) => !existingClasses.includes(valueClass));
              mergedAttributes[key] = [...existingClasses, ...insertClasses].join(" ");
            } else if (key === "style") {
              const newStyles = value ? value.split(";").map((style2) => style2.trim()).filter(Boolean) : [];
              const existingStyles = mergedAttributes[key] ? mergedAttributes[key].split(";").map((style2) => style2.trim()).filter(Boolean) : [];
              const styleMap = /* @__PURE__ */ new Map();
              existingStyles.forEach((style2) => {
                const [property, val] = style2.split(":").map((part) => part.trim());
                styleMap.set(property, val);
              });
              newStyles.forEach((style2) => {
                const [property, val] = style2.split(":").map((part) => part.trim());
                styleMap.set(property, val);
              });
              mergedAttributes[key] = Array.from(styleMap.entries()).map(([property, val]) => `${property}: ${val}`).join("; ");
            } else {
              mergedAttributes[key] = value;
            }
          });
          return mergedAttributes;
        }, {});
      }
      function getRenderedAttributes(nodeOrMark, extensionAttributes) {
        return extensionAttributes.filter((attribute) => attribute.type === nodeOrMark.type.name).filter((item) => item.attribute.rendered).map((item) => {
          if (!item.attribute.renderHTML) {
            return {
              [item.name]: nodeOrMark.attrs[item.name]
            };
          }
          return item.attribute.renderHTML(nodeOrMark.attrs) || {};
        }).reduce((attributes, attribute) => mergeAttributes(attributes, attribute), {});
      }
      function isFunction(value) {
        return typeof value === "function";
      }
      function callOrReturn(value, context = void 0, ...props) {
        if (isFunction(value)) {
          if (context) {
            return value.bind(context)(...props);
          }
          return value(...props);
        }
        return value;
      }
      function isEmptyObject(value = {}) {
        return Object.keys(value).length === 0 && value.constructor === Object;
      }
      function fromString(value) {
        if (typeof value !== "string") {
          return value;
        }
        if (value.match(/^[+-]?(?:\d*\.)?\d+$/)) {
          return Number(value);
        }
        if (value === "true") {
          return true;
        }
        if (value === "false") {
          return false;
        }
        return value;
      }
      function injectExtensionAttributesToParseRule(parseRule, extensionAttributes) {
        if ("style" in parseRule) {
          return parseRule;
        }
        return {
          ...parseRule,
          getAttrs: (node) => {
            const oldAttributes = parseRule.getAttrs ? parseRule.getAttrs(node) : parseRule.attrs;
            if (oldAttributes === false) {
              return false;
            }
            const newAttributes = extensionAttributes.reduce((items, item) => {
              const value = item.attribute.parseHTML ? item.attribute.parseHTML(node) : fromString(node.getAttribute(item.name));
              if (value === null || value === void 0) {
                return items;
              }
              return {
                ...items,
                [item.name]: value
              };
            }, {});
            return { ...oldAttributes, ...newAttributes };
          }
        };
      }
      function cleanUpSchemaItem(data) {
        return Object.fromEntries(
          // @ts-ignore
          Object.entries(data).filter(([key, value]) => {
            if (key === "attrs" && isEmptyObject(value)) {
              return false;
            }
            return value !== null && value !== void 0;
          })
        );
      }
      function getSchemaByResolvedExtensions(extensions, editor2) {
        var _a;
        const allAttributes = getAttributesFromExtensions(extensions);
        const { nodeExtensions, markExtensions } = splitExtensions(extensions);
        const topNode = (_a = nodeExtensions.find((extension) => getExtensionField(extension, "topNode"))) === null || _a === void 0 ? void 0 : _a.name;
        const nodes = Object.fromEntries(nodeExtensions.map((extension) => {
          const extensionAttributes = allAttributes.filter((attribute) => attribute.type === extension.name);
          const context = {
            name: extension.name,
            options: extension.options,
            storage: extension.storage,
            editor: editor2
          };
          const extraNodeFields = extensions.reduce((fields, e) => {
            const extendNodeSchema = getExtensionField(e, "extendNodeSchema", context);
            return {
              ...fields,
              ...extendNodeSchema ? extendNodeSchema(extension) : {}
            };
          }, {});
          const schema = cleanUpSchemaItem({
            ...extraNodeFields,
            content: callOrReturn(getExtensionField(extension, "content", context)),
            marks: callOrReturn(getExtensionField(extension, "marks", context)),
            group: callOrReturn(getExtensionField(extension, "group", context)),
            inline: callOrReturn(getExtensionField(extension, "inline", context)),
            atom: callOrReturn(getExtensionField(extension, "atom", context)),
            selectable: callOrReturn(getExtensionField(extension, "selectable", context)),
            draggable: callOrReturn(getExtensionField(extension, "draggable", context)),
            code: callOrReturn(getExtensionField(extension, "code", context)),
            whitespace: callOrReturn(getExtensionField(extension, "whitespace", context)),
            linebreakReplacement: callOrReturn(getExtensionField(extension, "linebreakReplacement", context)),
            defining: callOrReturn(getExtensionField(extension, "defining", context)),
            isolating: callOrReturn(getExtensionField(extension, "isolating", context)),
            attrs: Object.fromEntries(extensionAttributes.map((extensionAttribute) => {
              var _a2;
              return [extensionAttribute.name, { default: (_a2 = extensionAttribute === null || extensionAttribute === void 0 ? void 0 : extensionAttribute.attribute) === null || _a2 === void 0 ? void 0 : _a2.default }];
            }))
          });
          const parseHTML = callOrReturn(getExtensionField(extension, "parseHTML", context));
          if (parseHTML) {
            schema.parseDOM = parseHTML.map((parseRule) => injectExtensionAttributesToParseRule(parseRule, extensionAttributes));
          }
          const renderHTML = getExtensionField(extension, "renderHTML", context);
          if (renderHTML) {
            schema.toDOM = (node) => renderHTML({
              node,
              HTMLAttributes: getRenderedAttributes(node, extensionAttributes)
            });
          }
          const renderText = getExtensionField(extension, "renderText", context);
          if (renderText) {
            schema.toText = renderText;
          }
          return [extension.name, schema];
        }));
        const marks = Object.fromEntries(markExtensions.map((extension) => {
          const extensionAttributes = allAttributes.filter((attribute) => attribute.type === extension.name);
          const context = {
            name: extension.name,
            options: extension.options,
            storage: extension.storage,
            editor: editor2
          };
          const extraMarkFields = extensions.reduce((fields, e) => {
            const extendMarkSchema = getExtensionField(e, "extendMarkSchema", context);
            return {
              ...fields,
              ...extendMarkSchema ? extendMarkSchema(extension) : {}
            };
          }, {});
          const schema = cleanUpSchemaItem({
            ...extraMarkFields,
            inclusive: callOrReturn(getExtensionField(extension, "inclusive", context)),
            excludes: callOrReturn(getExtensionField(extension, "excludes", context)),
            group: callOrReturn(getExtensionField(extension, "group", context)),
            spanning: callOrReturn(getExtensionField(extension, "spanning", context)),
            code: callOrReturn(getExtensionField(extension, "code", context)),
            attrs: Object.fromEntries(extensionAttributes.map((extensionAttribute) => {
              var _a2;
              return [extensionAttribute.name, { default: (_a2 = extensionAttribute === null || extensionAttribute === void 0 ? void 0 : extensionAttribute.attribute) === null || _a2 === void 0 ? void 0 : _a2.default }];
            }))
          });
          const parseHTML = callOrReturn(getExtensionField(extension, "parseHTML", context));
          if (parseHTML) {
            schema.parseDOM = parseHTML.map((parseRule) => injectExtensionAttributesToParseRule(parseRule, extensionAttributes));
          }
          const renderHTML = getExtensionField(extension, "renderHTML", context);
          if (renderHTML) {
            schema.toDOM = (mark) => renderHTML({
              mark,
              HTMLAttributes: getRenderedAttributes(mark, extensionAttributes)
            });
          }
          return [extension.name, schema];
        }));
        return new model.Schema({
          topNode,
          nodes,
          marks
        });
      }
      function getSchemaTypeByName(name, schema) {
        return schema.nodes[name] || schema.marks[name] || null;
      }
      function isExtensionRulesEnabled(extension, enabled) {
        if (Array.isArray(enabled)) {
          return enabled.some((enabledExtension) => {
            const name = typeof enabledExtension === "string" ? enabledExtension : enabledExtension.name;
            return name === extension.name;
          });
        }
        return enabled;
      }
      function getHTMLFromFragment(fragment, schema) {
        const documentFragment = model.DOMSerializer.fromSchema(schema).serializeFragment(fragment);
        const temporaryDocument = document.implementation.createHTMLDocument();
        const container = temporaryDocument.createElement("div");
        container.appendChild(documentFragment);
        return container.innerHTML;
      }
      var getTextContentFromNodes = ($from, maxMatch = 500) => {
        let textBefore = "";
        const sliceEndPos = $from.parentOffset;
        $from.parent.nodesBetween(Math.max(0, sliceEndPos - maxMatch), sliceEndPos, (node, pos, parent, index2) => {
          var _a, _b;
          const chunk = ((_b = (_a = node.type.spec).toText) === null || _b === void 0 ? void 0 : _b.call(_a, {
            node,
            pos,
            parent,
            index: index2
          })) || node.textContent || "%leaf%";
          textBefore += node.isAtom && !node.isText ? chunk : chunk.slice(0, Math.max(0, sliceEndPos - pos));
        });
        return textBefore;
      };
      function isRegExp(value) {
        return Object.prototype.toString.call(value) === "[object RegExp]";
      }
      var InputRule = class {
        constructor(config) {
          this.find = config.find;
          this.handler = config.handler;
        }
      };
      var inputRuleMatcherHandler = (text, find) => {
        if (isRegExp(find)) {
          return find.exec(text);
        }
        const inputRuleMatch = find(text);
        if (!inputRuleMatch) {
          return null;
        }
        const result = [inputRuleMatch.text];
        result.index = inputRuleMatch.index;
        result.input = text;
        result.data = inputRuleMatch.data;
        if (inputRuleMatch.replaceWith) {
          if (!inputRuleMatch.text.includes(inputRuleMatch.replaceWith)) {
            console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".');
          }
          result.push(inputRuleMatch.replaceWith);
        }
        return result;
      };
      function run$1(config) {
        var _a;
        const { editor: editor2, from, to, text, rules, plugin } = config;
        const { view: view2 } = editor2;
        if (view2.composing) {
          return false;
        }
        const $from = view2.state.doc.resolve(from);
        if (
          // check for code node
          $from.parent.type.spec.code || !!((_a = $from.nodeBefore || $from.nodeAfter) === null || _a === void 0 ? void 0 : _a.marks.find((mark) => mark.type.spec.code))
        ) {
          return false;
        }
        let matched = false;
        const textBefore = getTextContentFromNodes($from) + text;
        rules.forEach((rule) => {
          if (matched) {
            return;
          }
          const match = inputRuleMatcherHandler(textBefore, rule.find);
          if (!match) {
            return;
          }
          const tr = view2.state.tr;
          const state2 = createChainableState({
            state: view2.state,
            transaction: tr
          });
          const range = {
            from: from - (match[0].length - text.length),
            to
          };
          const { commands: commands2, chain, can } = new CommandManager({
            editor: editor2,
            state: state2
          });
          const handler = rule.handler({
            state: state2,
            range,
            match,
            commands: commands2,
            chain,
            can
          });
          if (handler === null || !tr.steps.length) {
            return;
          }
          tr.setMeta(plugin, {
            transform: tr,
            from,
            to,
            text
          });
          view2.dispatch(tr);
          matched = true;
        });
        return matched;
      }
      function inputRulesPlugin(props) {
        const { editor: editor2, rules } = props;
        const plugin = new state.Plugin({
          state: {
            init() {
              return null;
            },
            apply(tr, prev, state2) {
              const stored = tr.getMeta(plugin);
              if (stored) {
                return stored;
              }
              const simulatedInputMeta = tr.getMeta("applyInputRules");
              const isSimulatedInput = !!simulatedInputMeta;
              if (isSimulatedInput) {
                setTimeout(() => {
                  let { text } = simulatedInputMeta;
                  if (typeof text === "string") {
                    text = text;
                  } else {
                    text = getHTMLFromFragment(model.Fragment.from(text), state2.schema);
                  }
                  const { from } = simulatedInputMeta;
                  const to = from + text.length;
                  run$1({
                    editor: editor2,
                    from,
                    to,
                    text,
                    rules,
                    plugin
                  });
                });
              }
              return tr.selectionSet || tr.docChanged ? null : prev;
            }
          },
          props: {
            handleTextInput(view2, from, to, text) {
              return run$1({
                editor: editor2,
                from,
                to,
                text,
                rules,
                plugin
              });
            },
            handleDOMEvents: {
              compositionend: (view2) => {
                setTimeout(() => {
                  const { $cursor } = view2.state.selection;
                  if ($cursor) {
                    run$1({
                      editor: editor2,
                      from: $cursor.pos,
                      to: $cursor.pos,
                      text: "",
                      rules,
                      plugin
                    });
                  }
                });
                return false;
              }
            },
            // add support for input rules to trigger on enter
            // this is useful for example for code blocks
            handleKeyDown(view2, event) {
              if (event.key !== "Enter") {
                return false;
              }
              const { $cursor } = view2.state.selection;
              if ($cursor) {
                return run$1({
                  editor: editor2,
                  from: $cursor.pos,
                  to: $cursor.pos,
                  text: "\n",
                  rules,
                  plugin
                });
              }
              return false;
            }
          },
          // @ts-ignore
          isInputRules: true
        });
        return plugin;
      }
      function getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
      }
      function isPlainObject(value) {
        if (getType(value) !== "Object") {
          return false;
        }
        return value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
      }
      function mergeDeep(target, source) {
        const output = { ...target };
        if (isPlainObject(target) && isPlainObject(source)) {
          Object.keys(source).forEach((key) => {
            if (isPlainObject(source[key]) && isPlainObject(target[key])) {
              output[key] = mergeDeep(target[key], source[key]);
            } else {
              output[key] = source[key];
            }
          });
        }
        return output;
      }
      var Mark = class _Mark {
        constructor(config = {}) {
          this.type = "mark";
          this.name = "mark";
          this.parent = null;
          this.child = null;
          this.config = {
            name: this.name,
            defaultOptions: {}
          };
          this.config = {
            ...this.config,
            ...config
          };
          this.name = this.config.name;
          if (config.defaultOptions && Object.keys(config.defaultOptions).length > 0) {
            console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`);
          }
          this.options = this.config.defaultOptions;
          if (this.config.addOptions) {
            this.options = callOrReturn(getExtensionField(this, "addOptions", {
              name: this.name
            }));
          }
          this.storage = callOrReturn(getExtensionField(this, "addStorage", {
            name: this.name,
            options: this.options
          })) || {};
        }
        static create(config = {}) {
          return new _Mark(config);
        }
        configure(options = {}) {
          const extension = this.extend({
            ...this.config,
            addOptions: () => {
              return mergeDeep(this.options, options);
            }
          });
          extension.name = this.name;
          extension.parent = this.parent;
          return extension;
        }
        extend(extendedConfig = {}) {
          const extension = new _Mark(extendedConfig);
          extension.parent = this;
          this.child = extension;
          extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
          if (extendedConfig.defaultOptions && Object.keys(extendedConfig.defaultOptions).length > 0) {
            console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${extension.name}".`);
          }
          extension.options = callOrReturn(getExtensionField(extension, "addOptions", {
            name: extension.name
          }));
          extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
            name: extension.name,
            options: extension.options
          }));
          return extension;
        }
        static handleExit({ editor: editor2, mark }) {
          const { tr } = editor2.state;
          const currentPos = editor2.state.selection.$from;
          const isAtEnd = currentPos.pos === currentPos.end();
          if (isAtEnd) {
            const currentMarks = currentPos.marks();
            const isInMark = !!currentMarks.find((m) => (m === null || m === void 0 ? void 0 : m.type.name) === mark.name);
            if (!isInMark) {
              return false;
            }
            const removeMark = currentMarks.find((m) => (m === null || m === void 0 ? void 0 : m.type.name) === mark.name);
            if (removeMark) {
              tr.removeStoredMark(removeMark);
            }
            tr.insertText(" ", currentPos.pos);
            editor2.view.dispatch(tr);
            return true;
          }
          return false;
        }
      };
      function isNumber(value) {
        return typeof value === "number";
      }
      var PasteRule = class {
        constructor(config) {
          this.find = config.find;
          this.handler = config.handler;
        }
      };
      var pasteRuleMatcherHandler = (text, find, event) => {
        if (isRegExp(find)) {
          return [...text.matchAll(find)];
        }
        const matches = find(text, event);
        if (!matches) {
          return [];
        }
        return matches.map((pasteRuleMatch) => {
          const result = [pasteRuleMatch.text];
          result.index = pasteRuleMatch.index;
          result.input = text;
          result.data = pasteRuleMatch.data;
          if (pasteRuleMatch.replaceWith) {
            if (!pasteRuleMatch.text.includes(pasteRuleMatch.replaceWith)) {
              console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".');
            }
            result.push(pasteRuleMatch.replaceWith);
          }
          return result;
        });
      };
      function run(config) {
        const { editor: editor2, state: state2, from, to, rule, pasteEvent, dropEvent } = config;
        const { commands: commands2, chain, can } = new CommandManager({
          editor: editor2,
          state: state2
        });
        const handlers = [];
        state2.doc.nodesBetween(from, to, (node, pos) => {
          if (!node.isTextblock || node.type.spec.code) {
            return;
          }
          const resolvedFrom = Math.max(from, pos);
          const resolvedTo = Math.min(to, pos + node.content.size);
          const textToMatch = node.textBetween(resolvedFrom - pos, resolvedTo - pos, void 0, "\uFFFC");
          const matches = pasteRuleMatcherHandler(textToMatch, rule.find, pasteEvent);
          matches.forEach((match) => {
            if (match.index === void 0) {
              return;
            }
            const start = resolvedFrom + match.index + 1;
            const end = start + match[0].length;
            const range = {
              from: state2.tr.mapping.map(start),
              to: state2.tr.mapping.map(end)
            };
            const handler = rule.handler({
              state: state2,
              range,
              match,
              commands: commands2,
              chain,
              can,
              pasteEvent,
              dropEvent
            });
            handlers.push(handler);
          });
        });
        const success = handlers.every((handler) => handler !== null);
        return success;
      }
      var tiptapDragFromOtherEditor = null;
      var createClipboardPasteEvent = (text) => {
        var _a;
        const event = new ClipboardEvent("paste", {
          clipboardData: new DataTransfer()
        });
        (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("text/html", text);
        return event;
      };
      function pasteRulesPlugin(props) {
        const { editor: editor2, rules } = props;
        let dragSourceElement = null;
        let isPastedFromProseMirror = false;
        let isDroppedFromProseMirror = false;
        let pasteEvent = typeof ClipboardEvent !== "undefined" ? new ClipboardEvent("paste") : null;
        let dropEvent;
        try {
          dropEvent = typeof DragEvent !== "undefined" ? new DragEvent("drop") : null;
        } catch {
          dropEvent = null;
        }
        const processEvent = ({ state: state2, from, to, rule, pasteEvt }) => {
          const tr = state2.tr;
          const chainableState = createChainableState({
            state: state2,
            transaction: tr
          });
          const handler = run({
            editor: editor2,
            state: chainableState,
            from: Math.max(from - 1, 0),
            to: to.b - 1,
            rule,
            pasteEvent: pasteEvt,
            dropEvent
          });
          if (!handler || !tr.steps.length) {
            return;
          }
          try {
            dropEvent = typeof DragEvent !== "undefined" ? new DragEvent("drop") : null;
          } catch {
            dropEvent = null;
          }
          pasteEvent = typeof ClipboardEvent !== "undefined" ? new ClipboardEvent("paste") : null;
          return tr;
        };
        const plugins = rules.map((rule) => {
          return new state.Plugin({
            // we register a global drag handler to track the current drag source element
            view(view2) {
              const handleDragstart = (event) => {
                var _a;
                dragSourceElement = ((_a = view2.dom.parentElement) === null || _a === void 0 ? void 0 : _a.contains(event.target)) ? view2.dom.parentElement : null;
                if (dragSourceElement) {
                  tiptapDragFromOtherEditor = editor2;
                }
              };
              const handleDragend = () => {
                if (tiptapDragFromOtherEditor) {
                  tiptapDragFromOtherEditor = null;
                }
              };
              window.addEventListener("dragstart", handleDragstart);
              window.addEventListener("dragend", handleDragend);
              return {
                destroy() {
                  window.removeEventListener("dragstart", handleDragstart);
                  window.removeEventListener("dragend", handleDragend);
                }
              };
            },
            props: {
              handleDOMEvents: {
                drop: (view2, event) => {
                  isDroppedFromProseMirror = dragSourceElement === view2.dom.parentElement;
                  dropEvent = event;
                  if (!isDroppedFromProseMirror) {
                    const dragFromOtherEditor = tiptapDragFromOtherEditor;
                    if (dragFromOtherEditor === null || dragFromOtherEditor === void 0 ? void 0 : dragFromOtherEditor.isEditable) {
                      setTimeout(() => {
                        const selection = dragFromOtherEditor.state.selection;
                        if (selection) {
                          dragFromOtherEditor.commands.deleteRange({ from: selection.from, to: selection.to });
                        }
                      }, 10);
                    }
                  }
                  return false;
                },
                paste: (_view, event) => {
                  var _a;
                  const html = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("text/html");
                  pasteEvent = event;
                  isPastedFromProseMirror = !!(html === null || html === void 0 ? void 0 : html.includes("data-pm-slice"));
                  return false;
                }
              }
            },
            appendTransaction: (transactions, oldState, state2) => {
              const transaction = transactions[0];
              const isPaste = transaction.getMeta("uiEvent") === "paste" && !isPastedFromProseMirror;
              const isDrop = transaction.getMeta("uiEvent") === "drop" && !isDroppedFromProseMirror;
              const simulatedPasteMeta = transaction.getMeta("applyPasteRules");
              const isSimulatedPaste = !!simulatedPasteMeta;
              if (!isPaste && !isDrop && !isSimulatedPaste) {
                return;
              }
              if (isSimulatedPaste) {
                let { text } = simulatedPasteMeta;
                if (typeof text === "string") {
                  text = text;
                } else {
                  text = getHTMLFromFragment(model.Fragment.from(text), state2.schema);
                }
                const { from: from2 } = simulatedPasteMeta;
                const to2 = from2 + text.length;
                const pasteEvt = createClipboardPasteEvent(text);
                return processEvent({
                  rule,
                  state: state2,
                  from: from2,
                  to: { b: to2 },
                  pasteEvt
                });
              }
              const from = oldState.doc.content.findDiffStart(state2.doc.content);
              const to = oldState.doc.content.findDiffEnd(state2.doc.content);
              if (!isNumber(from) || !to || from === to.b) {
                return;
              }
              return processEvent({
                rule,
                state: state2,
                from,
                to,
                pasteEvt: pasteEvent
              });
            }
          });
        });
        return plugins;
      }
      function findDuplicates(items) {
        const filtered = items.filter((el, index2) => items.indexOf(el) !== index2);
        return Array.from(new Set(filtered));
      }
      var ExtensionManager = class _ExtensionManager {
        constructor(extensions, editor2) {
          this.splittableMarks = [];
          this.editor = editor2;
          this.extensions = _ExtensionManager.resolve(extensions);
          this.schema = getSchemaByResolvedExtensions(this.extensions, editor2);
          this.setupExtensions();
        }
        /**
         * Returns a flattened and sorted extension list while
         * also checking for duplicated extensions and warns the user.
         * @param extensions An array of Tiptap extensions
         * @returns An flattened and sorted array of Tiptap extensions
         */
        static resolve(extensions) {
          const resolvedExtensions = _ExtensionManager.sort(_ExtensionManager.flatten(extensions));
          const duplicatedNames = findDuplicates(resolvedExtensions.map((extension) => extension.name));
          if (duplicatedNames.length) {
            console.warn(`[tiptap warn]: Duplicate extension names found: [${duplicatedNames.map((item) => `'${item}'`).join(", ")}]. This can lead to issues.`);
          }
          return resolvedExtensions;
        }
        /**
         * Create a flattened array of extensions by traversing the `addExtensions` field.
         * @param extensions An array of Tiptap extensions
         * @returns A flattened array of Tiptap extensions
         */
        static flatten(extensions) {
          return extensions.map((extension) => {
            const context = {
              name: extension.name,
              options: extension.options,
              storage: extension.storage
            };
            const addExtensions = getExtensionField(extension, "addExtensions", context);
            if (addExtensions) {
              return [extension, ...this.flatten(addExtensions())];
            }
            return extension;
          }).flat(10);
        }
        /**
         * Sort extensions by priority.
         * @param extensions An array of Tiptap extensions
         * @returns A sorted array of Tiptap extensions by priority
         */
        static sort(extensions) {
          const defaultPriority = 100;
          return extensions.sort((a, b) => {
            const priorityA = getExtensionField(a, "priority") || defaultPriority;
            const priorityB = getExtensionField(b, "priority") || defaultPriority;
            if (priorityA > priorityB) {
              return -1;
            }
            if (priorityA < priorityB) {
              return 1;
            }
            return 0;
          });
        }
        /**
         * Get all commands from the extensions.
         * @returns An object with all commands where the key is the command name and the value is the command function
         */
        get commands() {
          return this.extensions.reduce((commands2, extension) => {
            const context = {
              name: extension.name,
              options: extension.options,
              storage: extension.storage,
              editor: this.editor,
              type: getSchemaTypeByName(extension.name, this.schema)
            };
            const addCommands = getExtensionField(extension, "addCommands", context);
            if (!addCommands) {
              return commands2;
            }
            return {
              ...commands2,
              ...addCommands()
            };
          }, {});
        }
        /**
         * Get all registered Prosemirror plugins from the extensions.
         * @returns An array of Prosemirror plugins
         */
        get plugins() {
          const { editor: editor2 } = this;
          const extensions = _ExtensionManager.sort([...this.extensions].reverse());
          const inputRules = [];
          const pasteRules = [];
          const allPlugins = extensions.map((extension) => {
            const context = {
              name: extension.name,
              options: extension.options,
              storage: extension.storage,
              editor: editor2,
              type: getSchemaTypeByName(extension.name, this.schema)
            };
            const plugins = [];
            const addKeyboardShortcuts = getExtensionField(extension, "addKeyboardShortcuts", context);
            let defaultBindings = {};
            if (extension.type === "mark" && getExtensionField(extension, "exitable", context)) {
              defaultBindings.ArrowRight = () => Mark.handleExit({ editor: editor2, mark: extension });
            }
            if (addKeyboardShortcuts) {
              const bindings = Object.fromEntries(Object.entries(addKeyboardShortcuts()).map(([shortcut, method]) => {
                return [shortcut, () => method({ editor: editor2 })];
              }));
              defaultBindings = { ...defaultBindings, ...bindings };
            }
            const keyMapPlugin = keymap.keymap(defaultBindings);
            plugins.push(keyMapPlugin);
            const addInputRules = getExtensionField(extension, "addInputRules", context);
            if (isExtensionRulesEnabled(extension, editor2.options.enableInputRules) && addInputRules) {
              inputRules.push(...addInputRules());
            }
            const addPasteRules = getExtensionField(extension, "addPasteRules", context);
            if (isExtensionRulesEnabled(extension, editor2.options.enablePasteRules) && addPasteRules) {
              pasteRules.push(...addPasteRules());
            }
            const addProseMirrorPlugins = getExtensionField(extension, "addProseMirrorPlugins", context);
            if (addProseMirrorPlugins) {
              const proseMirrorPlugins = addProseMirrorPlugins();
              plugins.push(...proseMirrorPlugins);
            }
            return plugins;
          }).flat();
          return [
            inputRulesPlugin({
              editor: editor2,
              rules: inputRules
            }),
            ...pasteRulesPlugin({
              editor: editor2,
              rules: pasteRules
            }),
            ...allPlugins
          ];
        }
        /**
         * Get all attributes from the extensions.
         * @returns An array of attributes
         */
        get attributes() {
          return getAttributesFromExtensions(this.extensions);
        }
        /**
         * Get all node views from the extensions.
         * @returns An object with all node views where the key is the node name and the value is the node view function
         */
        get nodeViews() {
          const { editor: editor2 } = this;
          const { nodeExtensions } = splitExtensions(this.extensions);
          return Object.fromEntries(nodeExtensions.filter((extension) => !!getExtensionField(extension, "addNodeView")).map((extension) => {
            const extensionAttributes = this.attributes.filter((attribute) => attribute.type === extension.name);
            const context = {
              name: extension.name,
              options: extension.options,
              storage: extension.storage,
              editor: editor2,
              type: getNodeType(extension.name, this.schema)
            };
            const addNodeView = getExtensionField(extension, "addNodeView", context);
            if (!addNodeView) {
              return [];
            }
            const nodeview = (node, view2, getPos, decorations, innerDecorations) => {
              const HTMLAttributes = getRenderedAttributes(node, extensionAttributes);
              return addNodeView()({
                // pass-through
                node,
                view: view2,
                getPos,
                decorations,
                innerDecorations,
                // tiptap-specific
                editor: editor2,
                extension,
                HTMLAttributes
              });
            };
            return [extension.name, nodeview];
          }));
        }
        /**
         * Go through all extensions, create extension storages & setup marks
         * & bind editor event listener.
         */
        setupExtensions() {
          this.extensions.forEach((extension) => {
            var _a;
            this.editor.extensionStorage[extension.name] = extension.storage;
            const context = {
              name: extension.name,
              options: extension.options,
              storage: extension.storage,
              editor: this.editor,
              type: getSchemaTypeByName(extension.name, this.schema)
            };
            if (extension.type === "mark") {
              const keepOnSplit = (_a = callOrReturn(getExtensionField(extension, "keepOnSplit", context))) !== null && _a !== void 0 ? _a : true;
              if (keepOnSplit) {
                this.splittableMarks.push(extension.name);
              }
            }
            const onBeforeCreate = getExtensionField(extension, "onBeforeCreate", context);
            const onCreate = getExtensionField(extension, "onCreate", context);
            const onUpdate = getExtensionField(extension, "onUpdate", context);
            const onSelectionUpdate = getExtensionField(extension, "onSelectionUpdate", context);
            const onTransaction = getExtensionField(extension, "onTransaction", context);
            const onFocus = getExtensionField(extension, "onFocus", context);
            const onBlur = getExtensionField(extension, "onBlur", context);
            const onDestroy = getExtensionField(extension, "onDestroy", context);
            if (onBeforeCreate) {
              this.editor.on("beforeCreate", onBeforeCreate);
            }
            if (onCreate) {
              this.editor.on("create", onCreate);
            }
            if (onUpdate) {
              this.editor.on("update", onUpdate);
            }
            if (onSelectionUpdate) {
              this.editor.on("selectionUpdate", onSelectionUpdate);
            }
            if (onTransaction) {
              this.editor.on("transaction", onTransaction);
            }
            if (onFocus) {
              this.editor.on("focus", onFocus);
            }
            if (onBlur) {
              this.editor.on("blur", onBlur);
            }
            if (onDestroy) {
              this.editor.on("destroy", onDestroy);
            }
          });
        }
      };
      var Extension = class _Extension {
        constructor(config = {}) {
          this.type = "extension";
          this.name = "extension";
          this.parent = null;
          this.child = null;
          this.config = {
            name: this.name,
            defaultOptions: {}
          };
          this.config = {
            ...this.config,
            ...config
          };
          this.name = this.config.name;
          if (config.defaultOptions && Object.keys(config.defaultOptions).length > 0) {
            console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`);
          }
          this.options = this.config.defaultOptions;
          if (this.config.addOptions) {
            this.options = callOrReturn(getExtensionField(this, "addOptions", {
              name: this.name
            }));
          }
          this.storage = callOrReturn(getExtensionField(this, "addStorage", {
            name: this.name,
            options: this.options
          })) || {};
        }
        static create(config = {}) {
          return new _Extension(config);
        }
        configure(options = {}) {
          const extension = this.extend({
            ...this.config,
            addOptions: () => {
              return mergeDeep(this.options, options);
            }
          });
          extension.name = this.name;
          extension.parent = this.parent;
          return extension;
        }
        extend(extendedConfig = {}) {
          const extension = new _Extension({ ...this.config, ...extendedConfig });
          extension.parent = this;
          this.child = extension;
          extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
          if (extendedConfig.defaultOptions && Object.keys(extendedConfig.defaultOptions).length > 0) {
            console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${extension.name}".`);
          }
          extension.options = callOrReturn(getExtensionField(extension, "addOptions", {
            name: extension.name
          }));
          extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
            name: extension.name,
            options: extension.options
          }));
          return extension;
        }
      };
      function getTextBetween(startNode, range, options) {
        const { from, to } = range;
        const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
        let text = "";
        startNode.nodesBetween(from, to, (node, pos, parent, index2) => {
          var _a;
          if (node.isBlock && pos > from) {
            text += blockSeparator;
          }
          const textSerializer = textSerializers === null || textSerializers === void 0 ? void 0 : textSerializers[node.type.name];
          if (textSerializer) {
            if (parent) {
              text += textSerializer({
                node,
                pos,
                parent,
                index: index2,
                range
              });
            }
            return false;
          }
          if (node.isText) {
            text += (_a = node === null || node === void 0 ? void 0 : node.text) === null || _a === void 0 ? void 0 : _a.slice(Math.max(from, pos) - pos, to - pos);
          }
        });
        return text;
      }
      function getTextSerializersFromSchema(schema) {
        return Object.fromEntries(Object.entries(schema.nodes).filter(([, node]) => node.spec.toText).map(([name, node]) => [name, node.spec.toText]));
      }
      var ClipboardTextSerializer = Extension.create({
        name: "clipboardTextSerializer",
        addOptions() {
          return {
            blockSeparator: void 0
          };
        },
        addProseMirrorPlugins() {
          return [
            new state.Plugin({
              key: new state.PluginKey("clipboardTextSerializer"),
              props: {
                clipboardTextSerializer: () => {
                  const { editor: editor2 } = this;
                  const { state: state2, schema } = editor2;
                  const { doc, selection } = state2;
                  const { ranges } = selection;
                  const from = Math.min(...ranges.map((range2) => range2.$from.pos));
                  const to = Math.max(...ranges.map((range2) => range2.$to.pos));
                  const textSerializers = getTextSerializersFromSchema(schema);
                  const range = { from, to };
                  return getTextBetween(doc, range, {
                    ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
                    textSerializers
                  });
                }
              }
            })
          ];
        }
      });
      var blur = () => ({ editor: editor2, view: view2 }) => {
        requestAnimationFrame(() => {
          var _a;
          if (!editor2.isDestroyed) {
            view2.dom.blur();
            (_a = window === null || window === void 0 ? void 0 : window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
          }
        });
        return true;
      };
      var clearContent = (emitUpdate = false) => ({ commands: commands2 }) => {
        return commands2.setContent("", emitUpdate);
      };
      var clearNodes = () => ({ state: state2, tr, dispatch }) => {
        const { selection } = tr;
        const { ranges } = selection;
        if (!dispatch) {
          return true;
        }
        ranges.forEach(({ $from, $to }) => {
          state2.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (node.type.isText) {
              return;
            }
            const { doc, mapping } = tr;
            const $mappedFrom = doc.resolve(mapping.map(pos));
            const $mappedTo = doc.resolve(mapping.map(pos + node.nodeSize));
            const nodeRange = $mappedFrom.blockRange($mappedTo);
            if (!nodeRange) {
              return;
            }
            const targetLiftDepth = transform.liftTarget(nodeRange);
            if (node.type.isTextblock) {
              const { defaultType } = $mappedFrom.parent.contentMatchAt($mappedFrom.index());
              tr.setNodeMarkup(nodeRange.start, defaultType);
            }
            if (targetLiftDepth || targetLiftDepth === 0) {
              tr.lift(nodeRange, targetLiftDepth);
            }
          });
        });
        return true;
      };
      var command = (fn) => (props) => {
        return fn(props);
      };
      var createParagraphNear = () => ({ state: state2, dispatch }) => {
        return commands$1.createParagraphNear(state2, dispatch);
      };
      var cut = (originRange, targetPos) => ({ editor: editor2, tr }) => {
        const { state: state$1 } = editor2;
        const contentSlice = state$1.doc.slice(originRange.from, originRange.to);
        tr.deleteRange(originRange.from, originRange.to);
        const newPos = tr.mapping.map(targetPos);
        tr.insert(newPos, contentSlice.content);
        tr.setSelection(new state.TextSelection(tr.doc.resolve(Math.max(newPos - 1, 0))));
        return true;
      };
      var deleteCurrentNode = () => ({ tr, dispatch }) => {
        const { selection } = tr;
        const currentNode = selection.$anchor.node();
        if (currentNode.content.size > 0) {
          return false;
        }
        const $pos = tr.selection.$anchor;
        for (let depth = $pos.depth; depth > 0; depth -= 1) {
          const node = $pos.node(depth);
          if (node.type === currentNode.type) {
            if (dispatch) {
              const from = $pos.before(depth);
              const to = $pos.after(depth);
              tr.delete(from, to).scrollIntoView();
            }
            return true;
          }
        }
        return false;
      };
      var deleteNode = (typeOrName) => ({ tr, state: state2, dispatch }) => {
        const type = getNodeType(typeOrName, state2.schema);
        const $pos = tr.selection.$anchor;
        for (let depth = $pos.depth; depth > 0; depth -= 1) {
          const node = $pos.node(depth);
          if (node.type === type) {
            if (dispatch) {
              const from = $pos.before(depth);
              const to = $pos.after(depth);
              tr.delete(from, to).scrollIntoView();
            }
            return true;
          }
        }
        return false;
      };
      var deleteRange = (range) => ({ tr, dispatch }) => {
        const { from, to } = range;
        if (dispatch) {
          tr.delete(from, to);
        }
        return true;
      };
      var deleteSelection = () => ({ state: state2, dispatch }) => {
        return commands$1.deleteSelection(state2, dispatch);
      };
      var enter = () => ({ commands: commands2 }) => {
        return commands2.keyboardShortcut("Enter");
      };
      var exitCode = () => ({ state: state2, dispatch }) => {
        return commands$1.exitCode(state2, dispatch);
      };
      function objectIncludes(object1, object2, options = { strict: true }) {
        const keys = Object.keys(object2);
        if (!keys.length) {
          return true;
        }
        return keys.every((key) => {
          if (options.strict) {
            return object2[key] === object1[key];
          }
          if (isRegExp(object2[key])) {
            return object2[key].test(object1[key]);
          }
          return object2[key] === object1[key];
        });
      }
      function findMarkInSet(marks, type, attributes = {}) {
        return marks.find((item) => {
          return item.type === type && objectIncludes(
            // Only check equality for the attributes that are provided
            Object.fromEntries(Object.keys(attributes).map((k) => [k, item.attrs[k]])),
            attributes
          );
        });
      }
      function isMarkInSet(marks, type, attributes = {}) {
        return !!findMarkInSet(marks, type, attributes);
      }
      function getMarkRange($pos, type, attributes) {
        var _a;
        if (!$pos || !type) {
          return;
        }
        let start = $pos.parent.childAfter($pos.parentOffset);
        if (!start.node || !start.node.marks.some((mark2) => mark2.type === type)) {
          start = $pos.parent.childBefore($pos.parentOffset);
        }
        if (!start.node || !start.node.marks.some((mark2) => mark2.type === type)) {
          return;
        }
        attributes = attributes || ((_a = start.node.marks[0]) === null || _a === void 0 ? void 0 : _a.attrs);
        const mark = findMarkInSet([...start.node.marks], type, attributes);
        if (!mark) {
          return;
        }
        let startIndex = start.index;
        let startPos = $pos.start() + start.offset;
        let endIndex = startIndex + 1;
        let endPos = startPos + start.node.nodeSize;
        while (startIndex > 0 && isMarkInSet([...$pos.parent.child(startIndex - 1).marks], type, attributes)) {
          startIndex -= 1;
          startPos -= $pos.parent.child(startIndex).nodeSize;
        }
        while (endIndex < $pos.parent.childCount && isMarkInSet([...$pos.parent.child(endIndex).marks], type, attributes)) {
          endPos += $pos.parent.child(endIndex).nodeSize;
          endIndex += 1;
        }
        return {
          from: startPos,
          to: endPos
        };
      }
      function getMarkType(nameOrType, schema) {
        if (typeof nameOrType === "string") {
          if (!schema.marks[nameOrType]) {
            throw Error(`There is no mark type named '${nameOrType}'. Maybe you forgot to add the extension?`);
          }
          return schema.marks[nameOrType];
        }
        return nameOrType;
      }
      var extendMarkRange = (typeOrName, attributes = {}) => ({ tr, state: state$1, dispatch }) => {
        const type = getMarkType(typeOrName, state$1.schema);
        const { doc, selection } = tr;
        const { $from, from, to } = selection;
        if (dispatch) {
          const range = getMarkRange($from, type, attributes);
          if (range && range.from <= from && range.to >= to) {
            const newSelection = state.TextSelection.create(doc, range.from, range.to);
            tr.setSelection(newSelection);
          }
        }
        return true;
      };
      var first = (commands2) => (props) => {
        const items = typeof commands2 === "function" ? commands2(props) : commands2;
        for (let i = 0; i < items.length; i += 1) {
          if (items[i](props)) {
            return true;
          }
        }
        return false;
      };
      function isTextSelection(value) {
        return value instanceof state.TextSelection;
      }
      function minMax(value = 0, min = 0, max = 0) {
        return Math.min(Math.max(value, min), max);
      }
      function resolveFocusPosition(doc, position = null) {
        if (!position) {
          return null;
        }
        const selectionAtStart = state.Selection.atStart(doc);
        const selectionAtEnd = state.Selection.atEnd(doc);
        if (position === "start" || position === true) {
          return selectionAtStart;
        }
        if (position === "end") {
          return selectionAtEnd;
        }
        const minPos = selectionAtStart.from;
        const maxPos = selectionAtEnd.to;
        if (position === "all") {
          return state.TextSelection.create(doc, minMax(0, minPos, maxPos), minMax(doc.content.size, minPos, maxPos));
        }
        return state.TextSelection.create(doc, minMax(position, minPos, maxPos), minMax(position, minPos, maxPos));
      }
      function isAndroid() {
        return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
      }
      function isiOS() {
        return [
          "iPad Simulator",
          "iPhone Simulator",
          "iPod Simulator",
          "iPad",
          "iPhone",
          "iPod"
        ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
      }
      var focus = (position = null, options = {}) => ({ editor: editor2, view: view2, tr, dispatch }) => {
        options = {
          scrollIntoView: true,
          ...options
        };
        const delayedFocus = () => {
          if (isiOS() || isAndroid()) {
            view2.dom.focus();
          }
          requestAnimationFrame(() => {
            if (!editor2.isDestroyed) {
              view2.focus();
              if (options === null || options === void 0 ? void 0 : options.scrollIntoView) {
                editor2.commands.scrollIntoView();
              }
            }
          });
        };
        if (view2.hasFocus() && position === null || position === false) {
          return true;
        }
        if (dispatch && position === null && !isTextSelection(editor2.state.selection)) {
          delayedFocus();
          return true;
        }
        const selection = resolveFocusPosition(tr.doc, position) || editor2.state.selection;
        const isSameSelection = editor2.state.selection.eq(selection);
        if (dispatch) {
          if (!isSameSelection) {
            tr.setSelection(selection);
          }
          if (isSameSelection && tr.storedMarks) {
            tr.setStoredMarks(tr.storedMarks);
          }
          delayedFocus();
        }
        return true;
      };
      var forEach = (items, fn) => (props) => {
        return items.every((item, index2) => fn(item, { ...props, index: index2 }));
      };
      var insertContent = (value, options) => ({ tr, commands: commands2 }) => {
        return commands2.insertContentAt({ from: tr.selection.from, to: tr.selection.to }, value, options);
      };
      var removeWhitespaces = (node) => {
        const children = node.childNodes;
        for (let i = children.length - 1; i >= 0; i -= 1) {
          const child = children[i];
          if (child.nodeType === 3 && child.nodeValue && /^(\n\s\s|\n)$/.test(child.nodeValue)) {
            node.removeChild(child);
          } else if (child.nodeType === 1) {
            removeWhitespaces(child);
          }
        }
        return node;
      };
      function elementFromString(value) {
        const wrappedValue = `<body>${value}</body>`;
        const html = new window.DOMParser().parseFromString(wrappedValue, "text/html").body;
        return removeWhitespaces(html);
      }
      function createNodeFromContent(content, schema, options) {
        if (content instanceof model.Node || content instanceof model.Fragment) {
          return content;
        }
        options = {
          slice: true,
          parseOptions: {},
          ...options
        };
        const isJSONContent = typeof content === "object" && content !== null;
        const isTextContent = typeof content === "string";
        if (isJSONContent) {
          try {
            const isArrayContent = Array.isArray(content) && content.length > 0;
            if (isArrayContent) {
              return model.Fragment.fromArray(content.map((item) => schema.nodeFromJSON(item)));
            }
            const node = schema.nodeFromJSON(content);
            if (options.errorOnInvalidContent) {
              node.check();
            }
            return node;
          } catch (error) {
            if (options.errorOnInvalidContent) {
              throw new Error("[tiptap error]: Invalid JSON content", { cause: error });
            }
            console.warn("[tiptap warn]: Invalid content.", "Passed value:", content, "Error:", error);
            return createNodeFromContent("", schema, options);
          }
        }
        if (isTextContent) {
          if (options.errorOnInvalidContent) {
            let hasInvalidContent = false;
            let invalidContent = "";
            const contentCheckSchema = new model.Schema({
              topNode: schema.spec.topNode,
              marks: schema.spec.marks,
              // Prosemirror's schemas are executed such that: the last to execute, matches last
              // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
              nodes: schema.spec.nodes.append({
                __tiptap__private__unknown__catch__all__node: {
                  content: "inline*",
                  group: "block",
                  parseDOM: [
                    {
                      tag: "*",
                      getAttrs: (e) => {
                        hasInvalidContent = true;
                        invalidContent = typeof e === "string" ? e : e.outerHTML;
                        return null;
                      }
                    }
                  ]
                }
              })
            });
            if (options.slice) {
              model.DOMParser.fromSchema(contentCheckSchema).parseSlice(elementFromString(content), options.parseOptions);
            } else {
              model.DOMParser.fromSchema(contentCheckSchema).parse(elementFromString(content), options.parseOptions);
            }
            if (options.errorOnInvalidContent && hasInvalidContent) {
              throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${invalidContent}`) });
            }
          }
          const parser = model.DOMParser.fromSchema(schema);
          if (options.slice) {
            return parser.parseSlice(elementFromString(content), options.parseOptions).content;
          }
          return parser.parse(elementFromString(content), options.parseOptions);
        }
        return createNodeFromContent("", schema, options);
      }
      function selectionToInsertionEnd(tr, startLen, bias) {
        const last = tr.steps.length - 1;
        if (last < startLen) {
          return;
        }
        const step = tr.steps[last];
        if (!(step instanceof transform.ReplaceStep || step instanceof transform.ReplaceAroundStep)) {
          return;
        }
        const map = tr.mapping.maps[last];
        let end = 0;
        map.forEach((_from, _to, _newFrom, newTo) => {
          if (end === 0) {
            end = newTo;
          }
        });
        tr.setSelection(state.Selection.near(tr.doc.resolve(end), bias));
      }
      var isFragment = (nodeOrFragment) => {
        return !("type" in nodeOrFragment);
      };
      var insertContentAt = (position, value, options) => ({ tr, dispatch, editor: editor2 }) => {
        var _a;
        if (dispatch) {
          options = {
            parseOptions: editor2.options.parseOptions,
            updateSelection: true,
            applyInputRules: false,
            applyPasteRules: false,
            ...options
          };
          let content;
          const emitContentError = (error) => {
            editor2.emit("contentError", {
              editor: editor2,
              error,
              disableCollaboration: () => {
                if (editor2.storage.collaboration) {
                  editor2.storage.collaboration.isDisabled = true;
                }
              }
            });
          };
          const parseOptions = {
            preserveWhitespace: "full",
            ...options.parseOptions
          };
          if (!options.errorOnInvalidContent && !editor2.options.enableContentCheck && editor2.options.emitContentError) {
            try {
              createNodeFromContent(value, editor2.schema, {
                parseOptions,
                errorOnInvalidContent: true
              });
            } catch (e) {
              emitContentError(e);
            }
          }
          try {
            content = createNodeFromContent(value, editor2.schema, {
              parseOptions,
              errorOnInvalidContent: (_a = options.errorOnInvalidContent) !== null && _a !== void 0 ? _a : editor2.options.enableContentCheck
            });
          } catch (e) {
            emitContentError(e);
            return false;
          }
          let { from, to } = typeof position === "number" ? { from: position, to: position } : { from: position.from, to: position.to };
          let isOnlyTextContent = true;
          let isOnlyBlockContent = true;
          const nodes = isFragment(content) ? content : [content];
          nodes.forEach((node) => {
            node.check();
            isOnlyTextContent = isOnlyTextContent ? node.isText && node.marks.length === 0 : false;
            isOnlyBlockContent = isOnlyBlockContent ? node.isBlock : false;
          });
          if (from === to && isOnlyBlockContent) {
            const { parent } = tr.doc.resolve(from);
            const isEmptyTextBlock = parent.isTextblock && !parent.type.spec.code && !parent.childCount;
            if (isEmptyTextBlock) {
              from -= 1;
              to += 1;
            }
          }
          let newContent;
          if (isOnlyTextContent) {
            if (Array.isArray(value)) {
              newContent = value.map((v) => v.text || "").join("");
            } else if (value instanceof model.Fragment) {
              let text = "";
              value.forEach((node) => {
                if (node.text) {
                  text += node.text;
                }
              });
              newContent = text;
            } else if (typeof value === "object" && !!value && !!value.text) {
              newContent = value.text;
            } else {
              newContent = value;
            }
            tr.insertText(newContent, from, to);
          } else {
            newContent = content;
            tr.replaceWith(from, to, newContent);
          }
          if (options.updateSelection) {
            selectionToInsertionEnd(tr, tr.steps.length - 1, -1);
          }
          if (options.applyInputRules) {
            tr.setMeta("applyInputRules", { from, text: newContent });
          }
          if (options.applyPasteRules) {
            tr.setMeta("applyPasteRules", { from, text: newContent });
          }
        }
        return true;
      };
      var joinUp = () => ({ state: state2, dispatch }) => {
        return commands$1.joinUp(state2, dispatch);
      };
      var joinDown = () => ({ state: state2, dispatch }) => {
        return commands$1.joinDown(state2, dispatch);
      };
      var joinBackward = () => ({ state: state2, dispatch }) => {
        return commands$1.joinBackward(state2, dispatch);
      };
      var joinForward = () => ({ state: state2, dispatch }) => {
        return commands$1.joinForward(state2, dispatch);
      };
      var joinItemBackward = () => ({ state: state2, dispatch, tr }) => {
        try {
          const point = transform.joinPoint(state2.doc, state2.selection.$from.pos, -1);
          if (point === null || point === void 0) {
            return false;
          }
          tr.join(point, 2);
          if (dispatch) {
            dispatch(tr);
          }
          return true;
        } catch {
          return false;
        }
      };
      var joinItemForward = () => ({ state: state2, dispatch, tr }) => {
        try {
          const point = transform.joinPoint(state2.doc, state2.selection.$from.pos, 1);
          if (point === null || point === void 0) {
            return false;
          }
          tr.join(point, 2);
          if (dispatch) {
            dispatch(tr);
          }
          return true;
        } catch {
          return false;
        }
      };
      var joinTextblockBackward = () => ({ state: state2, dispatch }) => {
        return commands$1.joinTextblockBackward(state2, dispatch);
      };
      var joinTextblockForward = () => ({ state: state2, dispatch }) => {
        return commands$1.joinTextblockForward(state2, dispatch);
      };
      function isMacOS() {
        return typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
      }
      function normalizeKeyName(name) {
        const parts = name.split(/-(?!$)/);
        let result = parts[parts.length - 1];
        if (result === "Space") {
          result = " ";
        }
        let alt;
        let ctrl;
        let shift;
        let meta;
        for (let i = 0; i < parts.length - 1; i += 1) {
          const mod = parts[i];
          if (/^(cmd|meta|m)$/i.test(mod)) {
            meta = true;
          } else if (/^a(lt)?$/i.test(mod)) {
            alt = true;
          } else if (/^(c|ctrl|control)$/i.test(mod)) {
            ctrl = true;
          } else if (/^s(hift)?$/i.test(mod)) {
            shift = true;
          } else if (/^mod$/i.test(mod)) {
            if (isiOS() || isMacOS()) {
              meta = true;
            } else {
              ctrl = true;
            }
          } else {
            throw new Error(`Unrecognized modifier name: ${mod}`);
          }
        }
        if (alt) {
          result = `Alt-${result}`;
        }
        if (ctrl) {
          result = `Ctrl-${result}`;
        }
        if (meta) {
          result = `Meta-${result}`;
        }
        if (shift) {
          result = `Shift-${result}`;
        }
        return result;
      }
      var keyboardShortcut = (name) => ({ editor: editor2, view: view2, tr, dispatch }) => {
        const keys = normalizeKeyName(name).split(/-(?!$)/);
        const key = keys.find((item) => !["Alt", "Ctrl", "Meta", "Shift"].includes(item));
        const event = new KeyboardEvent("keydown", {
          key: key === "Space" ? " " : key,
          altKey: keys.includes("Alt"),
          ctrlKey: keys.includes("Ctrl"),
          metaKey: keys.includes("Meta"),
          shiftKey: keys.includes("Shift"),
          bubbles: true,
          cancelable: true
        });
        const capturedTransaction = editor2.captureTransaction(() => {
          view2.someProp("handleKeyDown", (f) => f(view2, event));
        });
        capturedTransaction === null || capturedTransaction === void 0 ? void 0 : capturedTransaction.steps.forEach((step) => {
          const newStep = step.map(tr.mapping);
          if (newStep && dispatch) {
            tr.maybeStep(newStep);
          }
        });
        return true;
      };
      function isNodeActive(state2, typeOrName, attributes = {}) {
        const { from, to, empty } = state2.selection;
        const type = typeOrName ? getNodeType(typeOrName, state2.schema) : null;
        const nodeRanges = [];
        state2.doc.nodesBetween(from, to, (node, pos) => {
          if (node.isText) {
            return;
          }
          const relativeFrom = Math.max(from, pos);
          const relativeTo = Math.min(to, pos + node.nodeSize);
          nodeRanges.push({
            node,
            from: relativeFrom,
            to: relativeTo
          });
        });
        const selectionRange = to - from;
        const matchedNodeRanges = nodeRanges.filter((nodeRange) => {
          if (!type) {
            return true;
          }
          return type.name === nodeRange.node.type.name;
        }).filter((nodeRange) => objectIncludes(nodeRange.node.attrs, attributes, { strict: false }));
        if (empty) {
          return !!matchedNodeRanges.length;
        }
        const range = matchedNodeRanges.reduce((sum, nodeRange) => sum + nodeRange.to - nodeRange.from, 0);
        return range >= selectionRange;
      }
      var lift = (typeOrName, attributes = {}) => ({ state: state2, dispatch }) => {
        const type = getNodeType(typeOrName, state2.schema);
        const isActive2 = isNodeActive(state2, type, attributes);
        if (!isActive2) {
          return false;
        }
        return commands$1.lift(state2, dispatch);
      };
      var liftEmptyBlock = () => ({ state: state2, dispatch }) => {
        return commands$1.liftEmptyBlock(state2, dispatch);
      };
      var liftListItem = (typeOrName) => ({ state: state2, dispatch }) => {
        const type = getNodeType(typeOrName, state2.schema);
        return schemaList.liftListItem(type)(state2, dispatch);
      };
      var newlineInCode = () => ({ state: state2, dispatch }) => {
        return commands$1.newlineInCode(state2, dispatch);
      };
      function getSchemaTypeNameByName(name, schema) {
        if (schema.nodes[name]) {
          return "node";
        }
        if (schema.marks[name]) {
          return "mark";
        }
        return null;
      }
      function deleteProps(obj, propOrProps) {
        const props = typeof propOrProps === "string" ? [propOrProps] : propOrProps;
        return Object.keys(obj).reduce((newObj, prop) => {
          if (!props.includes(prop)) {
            newObj[prop] = obj[prop];
          }
          return newObj;
        }, {});
      }
      var resetAttributes = (typeOrName, attributes) => ({ tr, state: state2, dispatch }) => {
        let nodeType = null;
        let markType = null;
        const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state2.schema);
        if (!schemaType) {
          return false;
        }
        if (schemaType === "node") {
          nodeType = getNodeType(typeOrName, state2.schema);
        }
        if (schemaType === "mark") {
          markType = getMarkType(typeOrName, state2.schema);
        }
        if (dispatch) {
          tr.selection.ranges.forEach((range) => {
            state2.doc.nodesBetween(range.$from.pos, range.$to.pos, (node, pos) => {
              if (nodeType && nodeType === node.type) {
                tr.setNodeMarkup(pos, void 0, deleteProps(node.attrs, attributes));
              }
              if (markType && node.marks.length) {
                node.marks.forEach((mark) => {
                  if (markType === mark.type) {
                    tr.addMark(pos, pos + node.nodeSize, markType.create(deleteProps(mark.attrs, attributes)));
                  }
                });
              }
            });
          });
        }
        return true;
      };
      var scrollIntoView = () => ({ tr, dispatch }) => {
        if (dispatch) {
          tr.scrollIntoView();
        }
        return true;
      };
      var selectAll = () => ({ tr, dispatch }) => {
        if (dispatch) {
          const selection = new state.AllSelection(tr.doc);
          tr.setSelection(selection);
        }
        return true;
      };
      var selectNodeBackward = () => ({ state: state2, dispatch }) => {
        return commands$1.selectNodeBackward(state2, dispatch);
      };
      var selectNodeForward = () => ({ state: state2, dispatch }) => {
        return commands$1.selectNodeForward(state2, dispatch);
      };
      var selectParentNode = () => ({ state: state2, dispatch }) => {
        return commands$1.selectParentNode(state2, dispatch);
      };
      var selectTextblockEnd = () => ({ state: state2, dispatch }) => {
        return commands$1.selectTextblockEnd(state2, dispatch);
      };
      var selectTextblockStart = () => ({ state: state2, dispatch }) => {
        return commands$1.selectTextblockStart(state2, dispatch);
      };
      function createDocument(content, schema, parseOptions = {}, options = {}) {
        return createNodeFromContent(content, schema, {
          slice: false,
          parseOptions,
          errorOnInvalidContent: options.errorOnInvalidContent
        });
      }
      var setContent = (content, emitUpdate = false, parseOptions = {}, options = {}) => ({ editor: editor2, tr, dispatch, commands: commands2 }) => {
        var _a, _b;
        const { doc } = tr;
        if (parseOptions.preserveWhitespace !== "full") {
          const document2 = createDocument(content, editor2.schema, parseOptions, {
            errorOnInvalidContent: (_a = options.errorOnInvalidContent) !== null && _a !== void 0 ? _a : editor2.options.enableContentCheck
          });
          if (dispatch) {
            tr.replaceWith(0, doc.content.size, document2).setMeta("preventUpdate", !emitUpdate);
          }
          return true;
        }
        if (dispatch) {
          tr.setMeta("preventUpdate", !emitUpdate);
        }
        return commands2.insertContentAt({ from: 0, to: doc.content.size }, content, {
          parseOptions,
          errorOnInvalidContent: (_b = options.errorOnInvalidContent) !== null && _b !== void 0 ? _b : editor2.options.enableContentCheck
        });
      };
      function getMarkAttributes(state2, typeOrName) {
        const type = getMarkType(typeOrName, state2.schema);
        const { from, to, empty } = state2.selection;
        const marks = [];
        if (empty) {
          if (state2.storedMarks) {
            marks.push(...state2.storedMarks);
          }
          marks.push(...state2.selection.$head.marks());
        } else {
          state2.doc.nodesBetween(from, to, (node) => {
            marks.push(...node.marks);
          });
        }
        const mark = marks.find((markItem) => markItem.type.name === type.name);
        if (!mark) {
          return {};
        }
        return { ...mark.attrs };
      }
      function combineTransactionSteps(oldDoc, transactions) {
        const transform$1 = new transform.Transform(oldDoc);
        transactions.forEach((transaction) => {
          transaction.steps.forEach((step) => {
            transform$1.step(step);
          });
        });
        return transform$1;
      }
      function defaultBlockAt(match) {
        for (let i = 0; i < match.edgeCount; i += 1) {
          const { type } = match.edge(i);
          if (type.isTextblock && !type.hasRequiredAttrs()) {
            return type;
          }
        }
        return null;
      }
      function findChildren(node, predicate) {
        const nodesWithPos = [];
        node.descendants((child, pos) => {
          if (predicate(child)) {
            nodesWithPos.push({
              node: child,
              pos
            });
          }
        });
        return nodesWithPos;
      }
      function findChildrenInRange(node, range, predicate) {
        const nodesWithPos = [];
        node.nodesBetween(range.from, range.to, (child, pos) => {
          if (predicate(child)) {
            nodesWithPos.push({
              node: child,
              pos
            });
          }
        });
        return nodesWithPos;
      }
      function findParentNodeClosestToPos($pos, predicate) {
        for (let i = $pos.depth; i > 0; i -= 1) {
          const node = $pos.node(i);
          if (predicate(node)) {
            return {
              pos: i > 0 ? $pos.before(i) : 0,
              start: $pos.start(i),
              depth: i,
              node
            };
          }
        }
      }
      function findParentNode(predicate) {
        return (selection) => findParentNodeClosestToPos(selection.$from, predicate);
      }
      function getSchema(extensions, editor2) {
        const resolvedExtensions = ExtensionManager.resolve(extensions);
        return getSchemaByResolvedExtensions(resolvedExtensions, editor2);
      }
      function generateHTML(doc, extensions) {
        const schema = getSchema(extensions);
        const contentNode = model.Node.fromJSON(schema, doc);
        return getHTMLFromFragment(contentNode.content, schema);
      }
      function generateJSON(html, extensions) {
        const schema = getSchema(extensions);
        const dom = elementFromString(html);
        return model.DOMParser.fromSchema(schema).parse(dom).toJSON();
      }
      function getText(node, options) {
        const range = {
          from: 0,
          to: node.content.size
        };
        return getTextBetween(node, range, options);
      }
      function generateText(doc, extensions, options) {
        const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
        const schema = getSchema(extensions);
        const contentNode = model.Node.fromJSON(schema, doc);
        return getText(contentNode, {
          blockSeparator,
          textSerializers: {
            ...getTextSerializersFromSchema(schema),
            ...textSerializers
          }
        });
      }
      function getNodeAttributes(state2, typeOrName) {
        const type = getNodeType(typeOrName, state2.schema);
        const { from, to } = state2.selection;
        const nodes = [];
        state2.doc.nodesBetween(from, to, (node2) => {
          nodes.push(node2);
        });
        const node = nodes.reverse().find((nodeItem) => nodeItem.type.name === type.name);
        if (!node) {
          return {};
        }
        return { ...node.attrs };
      }
      function getAttributes(state2, typeOrName) {
        const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state2.schema);
        if (schemaType === "node") {
          return getNodeAttributes(state2, typeOrName);
        }
        if (schemaType === "mark") {
          return getMarkAttributes(state2, typeOrName);
        }
        return {};
      }
      function removeDuplicates(array, by = JSON.stringify) {
        const seen = {};
        return array.filter((item) => {
          const key = by(item);
          return Object.prototype.hasOwnProperty.call(seen, key) ? false : seen[key] = true;
        });
      }
      function simplifyChangedRanges(changes) {
        const uniqueChanges = removeDuplicates(changes);
        return uniqueChanges.length === 1 ? uniqueChanges : uniqueChanges.filter((change, index2) => {
          const rest = uniqueChanges.filter((_, i) => i !== index2);
          return !rest.some((otherChange) => {
            return change.oldRange.from >= otherChange.oldRange.from && change.oldRange.to <= otherChange.oldRange.to && change.newRange.from >= otherChange.newRange.from && change.newRange.to <= otherChange.newRange.to;
          });
        });
      }
      function getChangedRanges(transform2) {
        const { mapping, steps } = transform2;
        const changes = [];
        mapping.maps.forEach((stepMap, index2) => {
          const ranges = [];
          if (!stepMap.ranges.length) {
            const { from, to } = steps[index2];
            if (from === void 0 || to === void 0) {
              return;
            }
            ranges.push({ from, to });
          } else {
            stepMap.forEach((from, to) => {
              ranges.push({ from, to });
            });
          }
          ranges.forEach(({ from, to }) => {
            const newStart = mapping.slice(index2).map(from, -1);
            const newEnd = mapping.slice(index2).map(to);
            const oldStart = mapping.invert().map(newStart, -1);
            const oldEnd = mapping.invert().map(newEnd);
            changes.push({
              oldRange: {
                from: oldStart,
                to: oldEnd
              },
              newRange: {
                from: newStart,
                to: newEnd
              }
            });
          });
        });
        return simplifyChangedRanges(changes);
      }
      function getDebugJSON(node, startOffset = 0) {
        const isTopNode = node.type === node.type.schema.topNodeType;
        const increment = isTopNode ? 0 : 1;
        const from = startOffset;
        const to = from + node.nodeSize;
        const marks = node.marks.map((mark) => {
          const output2 = {
            type: mark.type.name
          };
          if (Object.keys(mark.attrs).length) {
            output2.attrs = { ...mark.attrs };
          }
          return output2;
        });
        const attrs = { ...node.attrs };
        const output = {
          type: node.type.name,
          from,
          to
        };
        if (Object.keys(attrs).length) {
          output.attrs = attrs;
        }
        if (marks.length) {
          output.marks = marks;
        }
        if (node.content.childCount) {
          output.content = [];
          node.forEach((child, offset) => {
            var _a;
            (_a = output.content) === null || _a === void 0 ? void 0 : _a.push(getDebugJSON(child, startOffset + offset + increment));
          });
        }
        if (node.text) {
          output.text = node.text;
        }
        return output;
      }
      function getMarksBetween(from, to, doc) {
        const marks = [];
        if (from === to) {
          doc.resolve(from).marks().forEach((mark) => {
            const $pos = doc.resolve(from);
            const range = getMarkRange($pos, mark.type);
            if (!range) {
              return;
            }
            marks.push({
              mark,
              ...range
            });
          });
        } else {
          doc.nodesBetween(from, to, (node, pos) => {
            if (!node || (node === null || node === void 0 ? void 0 : node.nodeSize) === void 0) {
              return;
            }
            marks.push(...node.marks.map((mark) => ({
              from: pos,
              to: pos + node.nodeSize,
              mark
            })));
          });
        }
        return marks;
      }
      var getNodeAtPosition = (state2, typeOrName, pos, maxDepth = 20) => {
        const $pos = state2.doc.resolve(pos);
        let currentDepth = maxDepth;
        let node = null;
        while (currentDepth > 0 && node === null) {
          const currentNode = $pos.node(currentDepth);
          if ((currentNode === null || currentNode === void 0 ? void 0 : currentNode.type.name) === typeOrName) {
            node = currentNode;
          } else {
            currentDepth -= 1;
          }
        }
        return [node, currentDepth];
      };
      function getSplittedAttributes(extensionAttributes, typeName, attributes) {
        return Object.fromEntries(Object.entries(attributes).filter(([name]) => {
          const extensionAttribute = extensionAttributes.find((item) => {
            return item.type === typeName && item.name === name;
          });
          if (!extensionAttribute) {
            return false;
          }
          return extensionAttribute.attribute.keepOnSplit;
        }));
      }
      function isMarkActive(state2, typeOrName, attributes = {}) {
        const { empty, ranges } = state2.selection;
        const type = typeOrName ? getMarkType(typeOrName, state2.schema) : null;
        if (empty) {
          return !!(state2.storedMarks || state2.selection.$from.marks()).filter((mark) => {
            if (!type) {
              return true;
            }
            return type.name === mark.type.name;
          }).find((mark) => objectIncludes(mark.attrs, attributes, { strict: false }));
        }
        let selectionRange = 0;
        const markRanges = [];
        ranges.forEach(({ $from, $to }) => {
          const from = $from.pos;
          const to = $to.pos;
          state2.doc.nodesBetween(from, to, (node, pos) => {
            if (!node.isText && !node.marks.length) {
              return;
            }
            const relativeFrom = Math.max(from, pos);
            const relativeTo = Math.min(to, pos + node.nodeSize);
            const range2 = relativeTo - relativeFrom;
            selectionRange += range2;
            markRanges.push(...node.marks.map((mark) => ({
              mark,
              from: relativeFrom,
              to: relativeTo
            })));
          });
        });
        if (selectionRange === 0) {
          return false;
        }
        const matchedRange = markRanges.filter((markRange) => {
          if (!type) {
            return true;
          }
          return type.name === markRange.mark.type.name;
        }).filter((markRange) => objectIncludes(markRange.mark.attrs, attributes, { strict: false })).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
        const excludedRange = markRanges.filter((markRange) => {
          if (!type) {
            return true;
          }
          return markRange.mark.type !== type && markRange.mark.type.excludes(type);
        }).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
        const range = matchedRange > 0 ? matchedRange + excludedRange : matchedRange;
        return range >= selectionRange;
      }
      function isActive(state2, name, attributes = {}) {
        if (!name) {
          return isNodeActive(state2, null, attributes) || isMarkActive(state2, null, attributes);
        }
        const schemaType = getSchemaTypeNameByName(name, state2.schema);
        if (schemaType === "node") {
          return isNodeActive(state2, name, attributes);
        }
        if (schemaType === "mark") {
          return isMarkActive(state2, name, attributes);
        }
        return false;
      }
      var isAtEndOfNode = (state2, nodeType) => {
        const { $from, $to, $anchor } = state2.selection;
        if (nodeType) {
          const parentNode = findParentNode((node) => node.type.name === nodeType)(state2.selection);
          if (!parentNode) {
            return false;
          }
          const $parentPos = state2.doc.resolve(parentNode.pos + 1);
          if ($anchor.pos + 1 === $parentPos.end()) {
            return true;
          }
          return false;
        }
        if ($to.parentOffset < $to.parent.nodeSize - 2 || $from.pos !== $to.pos) {
          return false;
        }
        return true;
      };
      var isAtStartOfNode = (state2) => {
        const { $from, $to } = state2.selection;
        if ($from.parentOffset > 0 || $from.pos !== $to.pos) {
          return false;
        }
        return true;
      };
      function isList(name, extensions) {
        const { nodeExtensions } = splitExtensions(extensions);
        const extension = nodeExtensions.find((item) => item.name === name);
        if (!extension) {
          return false;
        }
        const context = {
          name: extension.name,
          options: extension.options,
          storage: extension.storage
        };
        const group = callOrReturn(getExtensionField(extension, "group", context));
        if (typeof group !== "string") {
          return false;
        }
        return group.split(" ").includes("list");
      }
      function isNodeEmpty(node, { checkChildren = true, ignoreWhitespace = false } = {}) {
        var _a;
        if (ignoreWhitespace) {
          if (node.type.name === "hardBreak") {
            return true;
          }
          if (node.isText) {
            return /^\s*$/m.test((_a = node.text) !== null && _a !== void 0 ? _a : "");
          }
        }
        if (node.isText) {
          return !node.text;
        }
        if (node.isAtom || node.isLeaf) {
          return false;
        }
        if (node.content.childCount === 0) {
          return true;
        }
        if (checkChildren) {
          let isContentEmpty = true;
          node.content.forEach((childNode) => {
            if (isContentEmpty === false) {
              return;
            }
            if (!isNodeEmpty(childNode, { ignoreWhitespace, checkChildren })) {
              isContentEmpty = false;
            }
          });
          return isContentEmpty;
        }
        return false;
      }
      function isNodeSelection(value) {
        return value instanceof state.NodeSelection;
      }
      function posToDOMRect(view2, from, to) {
        const minPos = 0;
        const maxPos = view2.state.doc.content.size;
        const resolvedFrom = minMax(from, minPos, maxPos);
        const resolvedEnd = minMax(to, minPos, maxPos);
        const start = view2.coordsAtPos(resolvedFrom);
        const end = view2.coordsAtPos(resolvedEnd, -1);
        const top = Math.min(start.top, end.top);
        const bottom = Math.max(start.bottom, end.bottom);
        const left = Math.min(start.left, end.left);
        const right = Math.max(start.right, end.right);
        const width = right - left;
        const height = bottom - top;
        const x = left;
        const y = top;
        const data = {
          top,
          bottom,
          left,
          right,
          width,
          height,
          x,
          y
        };
        return {
          ...data,
          toJSON: () => data
        };
      }
      function rewriteUnknownContentInner({ json, validMarks, validNodes, options, rewrittenContent = [] }) {
        if (json.marks && Array.isArray(json.marks)) {
          json.marks = json.marks.filter((mark) => {
            const name = typeof mark === "string" ? mark : mark.type;
            if (validMarks.has(name)) {
              return true;
            }
            rewrittenContent.push({
              original: JSON.parse(JSON.stringify(mark)),
              unsupported: name
            });
            return false;
          });
        }
        if (json.content && Array.isArray(json.content)) {
          json.content = json.content.map((value) => rewriteUnknownContentInner({
            json: value,
            validMarks,
            validNodes,
            options,
            rewrittenContent
          }).json).filter((a) => a !== null && a !== void 0);
        }
        if (json.type && !validNodes.has(json.type)) {
          rewrittenContent.push({
            original: JSON.parse(JSON.stringify(json)),
            unsupported: json.type
          });
          if (json.content && Array.isArray(json.content) && (options === null || options === void 0 ? void 0 : options.fallbackToParagraph) !== false) {
            json.type = "paragraph";
            return {
              json,
              rewrittenContent
            };
          }
          return {
            json: null,
            rewrittenContent
          };
        }
        return { json, rewrittenContent };
      }
      function rewriteUnknownContent(json, schema, options) {
        return rewriteUnknownContentInner({
          json,
          validNodes: new Set(Object.keys(schema.nodes)),
          validMarks: new Set(Object.keys(schema.marks)),
          options
        });
      }
      function canSetMark(state2, tr, newMarkType) {
        var _a;
        const { selection } = tr;
        let cursor = null;
        if (isTextSelection(selection)) {
          cursor = selection.$cursor;
        }
        if (cursor) {
          const currentMarks = (_a = state2.storedMarks) !== null && _a !== void 0 ? _a : cursor.marks();
          return !!newMarkType.isInSet(currentMarks) || !currentMarks.some((mark) => mark.type.excludes(newMarkType));
        }
        const { ranges } = selection;
        return ranges.some(({ $from, $to }) => {
          let someNodeSupportsMark = $from.depth === 0 ? state2.doc.inlineContent && state2.doc.type.allowsMarkType(newMarkType) : false;
          state2.doc.nodesBetween($from.pos, $to.pos, (node, _pos, parent) => {
            if (someNodeSupportsMark) {
              return false;
            }
            if (node.isInline) {
              const parentAllowsMarkType = !parent || parent.type.allowsMarkType(newMarkType);
              const currentMarksAllowMarkType = !!newMarkType.isInSet(node.marks) || !node.marks.some((otherMark) => otherMark.type.excludes(newMarkType));
              someNodeSupportsMark = parentAllowsMarkType && currentMarksAllowMarkType;
            }
            return !someNodeSupportsMark;
          });
          return someNodeSupportsMark;
        });
      }
      var setMark = (typeOrName, attributes = {}) => ({ tr, state: state2, dispatch }) => {
        const { selection } = tr;
        const { empty, ranges } = selection;
        const type = getMarkType(typeOrName, state2.schema);
        if (dispatch) {
          if (empty) {
            const oldAttributes = getMarkAttributes(state2, type);
            tr.addStoredMark(type.create({
              ...oldAttributes,
              ...attributes
            }));
          } else {
            ranges.forEach((range) => {
              const from = range.$from.pos;
              const to = range.$to.pos;
              state2.doc.nodesBetween(from, to, (node, pos) => {
                const trimmedFrom = Math.max(pos, from);
                const trimmedTo = Math.min(pos + node.nodeSize, to);
                const someHasMark = node.marks.find((mark) => mark.type === type);
                if (someHasMark) {
                  node.marks.forEach((mark) => {
                    if (type === mark.type) {
                      tr.addMark(trimmedFrom, trimmedTo, type.create({
                        ...mark.attrs,
                        ...attributes
                      }));
                    }
                  });
                } else {
                  tr.addMark(trimmedFrom, trimmedTo, type.create(attributes));
                }
              });
            });
          }
        }
        return canSetMark(state2, tr, type);
      };
      var setMeta = (key, value) => ({ tr }) => {
        tr.setMeta(key, value);
        return true;
      };
      var setNode = (typeOrName, attributes = {}) => ({ state: state2, dispatch, chain }) => {
        const type = getNodeType(typeOrName, state2.schema);
        let attributesToCopy;
        if (state2.selection.$anchor.sameParent(state2.selection.$head)) {
          attributesToCopy = state2.selection.$anchor.parent.attrs;
        }
        if (!type.isTextblock) {
          console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.');
          return false;
        }
        return chain().command(({ commands: commands2 }) => {
          const canSetBlock = commands$1.setBlockType(type, { ...attributesToCopy, ...attributes })(state2);
          if (canSetBlock) {
            return true;
          }
          return commands2.clearNodes();
        }).command(({ state: updatedState }) => {
          return commands$1.setBlockType(type, { ...attributesToCopy, ...attributes })(updatedState, dispatch);
        }).run();
      };
      var setNodeSelection = (position) => ({ tr, dispatch }) => {
        if (dispatch) {
          const { doc } = tr;
          const from = minMax(position, 0, doc.content.size);
          const selection = state.NodeSelection.create(doc, from);
          tr.setSelection(selection);
        }
        return true;
      };
      var setTextSelection = (position) => ({ tr, dispatch }) => {
        if (dispatch) {
          const { doc } = tr;
          const { from, to } = typeof position === "number" ? { from: position, to: position } : position;
          const minPos = state.TextSelection.atStart(doc).from;
          const maxPos = state.TextSelection.atEnd(doc).to;
          const resolvedFrom = minMax(from, minPos, maxPos);
          const resolvedEnd = minMax(to, minPos, maxPos);
          const selection = state.TextSelection.create(doc, resolvedFrom, resolvedEnd);
          tr.setSelection(selection);
        }
        return true;
      };
      var sinkListItem = (typeOrName) => ({ state: state2, dispatch }) => {
        const type = getNodeType(typeOrName, state2.schema);
        return schemaList.sinkListItem(type)(state2, dispatch);
      };
      function ensureMarks(state2, splittableMarks) {
        const marks = state2.storedMarks || state2.selection.$to.parentOffset && state2.selection.$from.marks();
        if (marks) {
          const filteredMarks = marks.filter((mark) => splittableMarks === null || splittableMarks === void 0 ? void 0 : splittableMarks.includes(mark.type.name));
          state2.tr.ensureMarks(filteredMarks);
        }
      }
      var splitBlock = ({ keepMarks = true } = {}) => ({ tr, state: state$1, dispatch, editor: editor2 }) => {
        const { selection, doc } = tr;
        const { $from, $to } = selection;
        const extensionAttributes = editor2.extensionManager.attributes;
        const newAttributes = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
        if (selection instanceof state.NodeSelection && selection.node.isBlock) {
          if (!$from.parentOffset || !transform.canSplit(doc, $from.pos)) {
            return false;
          }
          if (dispatch) {
            if (keepMarks) {
              ensureMarks(state$1, editor2.extensionManager.splittableMarks);
            }
            tr.split($from.pos).scrollIntoView();
          }
          return true;
        }
        if (!$from.parent.isBlock) {
          return false;
        }
        const atEnd = $to.parentOffset === $to.parent.content.size;
        const deflt = $from.depth === 0 ? void 0 : defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)));
        let types = atEnd && deflt ? [
          {
            type: deflt,
            attrs: newAttributes
          }
        ] : void 0;
        let can = transform.canSplit(tr.doc, tr.mapping.map($from.pos), 1, types);
        if (!types && !can && transform.canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt ? [{ type: deflt }] : void 0)) {
          can = true;
          types = deflt ? [
            {
              type: deflt,
              attrs: newAttributes
            }
          ] : void 0;
        }
        if (dispatch) {
          if (can) {
            if (selection instanceof state.TextSelection) {
              tr.deleteSelection();
            }
            tr.split(tr.mapping.map($from.pos), 1, types);
            if (deflt && !atEnd && !$from.parentOffset && $from.parent.type !== deflt) {
              const first2 = tr.mapping.map($from.before());
              const $first = tr.doc.resolve(first2);
              if ($from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) {
                tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
              }
            }
          }
          if (keepMarks) {
            ensureMarks(state$1, editor2.extensionManager.splittableMarks);
          }
          tr.scrollIntoView();
        }
        return can;
      };
      var splitListItem = (typeOrName, overrideAttrs = {}) => ({ tr, state: state$1, dispatch, editor: editor2 }) => {
        var _a;
        const type = getNodeType(typeOrName, state$1.schema);
        const { $from, $to } = state$1.selection;
        const node = state$1.selection.node;
        if (node && node.isBlock || $from.depth < 2 || !$from.sameParent($to)) {
          return false;
        }
        const grandParent = $from.node(-1);
        if (grandParent.type !== type) {
          return false;
        }
        const extensionAttributes = editor2.extensionManager.attributes;
        if ($from.parent.content.size === 0 && $from.node(-1).childCount === $from.indexAfter(-1)) {
          if ($from.depth === 2 || $from.node(-3).type !== type || $from.index(-2) !== $from.node(-2).childCount - 1) {
            return false;
          }
          if (dispatch) {
            let wrap = model.Fragment.empty;
            const depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
            for (let d = $from.depth - depthBefore; d >= $from.depth - 3; d -= 1) {
              wrap = model.Fragment.from($from.node(d).copy(wrap));
            }
            const depthAfter = $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3;
            const newNextTypeAttributes2 = {
              ...getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs),
              ...overrideAttrs
            };
            const nextType2 = ((_a = type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.createAndFill(newNextTypeAttributes2)) || void 0;
            wrap = wrap.append(model.Fragment.from(type.createAndFill(null, nextType2) || void 0));
            const start = $from.before($from.depth - (depthBefore - 1));
            tr.replace(start, $from.after(-depthAfter), new model.Slice(wrap, 4 - depthBefore, 0));
            let sel = -1;
            tr.doc.nodesBetween(start, tr.doc.content.size, (n, pos) => {
              if (sel > -1) {
                return false;
              }
              if (n.isTextblock && n.content.size === 0) {
                sel = pos + 1;
              }
            });
            if (sel > -1) {
              tr.setSelection(state.TextSelection.near(tr.doc.resolve(sel)));
            }
            tr.scrollIntoView();
          }
          return true;
        }
        const nextType = $to.pos === $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
        const newTypeAttributes = {
          ...getSplittedAttributes(extensionAttributes, grandParent.type.name, grandParent.attrs),
          ...overrideAttrs
        };
        const newNextTypeAttributes = {
          ...getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs),
          ...overrideAttrs
        };
        tr.delete($from.pos, $to.pos);
        const types = nextType ? [
          { type, attrs: newTypeAttributes },
          { type: nextType, attrs: newNextTypeAttributes }
        ] : [{ type, attrs: newTypeAttributes }];
        if (!transform.canSplit(tr.doc, $from.pos, 2)) {
          return false;
        }
        if (dispatch) {
          const { selection, storedMarks } = state$1;
          const { splittableMarks } = editor2.extensionManager;
          const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
          tr.split($from.pos, 2, types).scrollIntoView();
          if (!marks || !dispatch) {
            return true;
          }
          const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
          tr.ensureMarks(filteredMarks);
        }
        return true;
      };
      var joinListBackwards = (tr, listType) => {
        const list = findParentNode((node) => node.type === listType)(tr.selection);
        if (!list) {
          return true;
        }
        const before = tr.doc.resolve(Math.max(0, list.pos - 1)).before(list.depth);
        if (before === void 0) {
          return true;
        }
        const nodeBefore = tr.doc.nodeAt(before);
        const canJoinBackwards = list.node.type === (nodeBefore === null || nodeBefore === void 0 ? void 0 : nodeBefore.type) && transform.canJoin(tr.doc, list.pos);
        if (!canJoinBackwards) {
          return true;
        }
        tr.join(list.pos);
        return true;
      };
      var joinListForwards = (tr, listType) => {
        const list = findParentNode((node) => node.type === listType)(tr.selection);
        if (!list) {
          return true;
        }
        const after = tr.doc.resolve(list.start).after(list.depth);
        if (after === void 0) {
          return true;
        }
        const nodeAfter = tr.doc.nodeAt(after);
        const canJoinForwards = list.node.type === (nodeAfter === null || nodeAfter === void 0 ? void 0 : nodeAfter.type) && transform.canJoin(tr.doc, after);
        if (!canJoinForwards) {
          return true;
        }
        tr.join(after);
        return true;
      };
      var toggleList = (listTypeOrName, itemTypeOrName, keepMarks, attributes = {}) => ({ editor: editor2, tr, state: state2, dispatch, chain, commands: commands2, can }) => {
        const { extensions, splittableMarks } = editor2.extensionManager;
        const listType = getNodeType(listTypeOrName, state2.schema);
        const itemType = getNodeType(itemTypeOrName, state2.schema);
        const { selection, storedMarks } = state2;
        const { $from, $to } = selection;
        const range = $from.blockRange($to);
        const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
        if (!range) {
          return false;
        }
        const parentList = findParentNode((node) => isList(node.type.name, extensions))(selection);
        if (range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
          if (parentList.node.type === listType) {
            return commands2.liftListItem(itemType);
          }
          if (isList(parentList.node.type.name, extensions) && listType.validContent(parentList.node.content) && dispatch) {
            return chain().command(() => {
              tr.setNodeMarkup(parentList.pos, listType);
              return true;
            }).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
          }
        }
        if (!keepMarks || !marks || !dispatch) {
          return chain().command(() => {
            const canWrapInList = can().wrapInList(listType, attributes);
            if (canWrapInList) {
              return true;
            }
            return commands2.clearNodes();
          }).wrapInList(listType, attributes).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
        }
        return chain().command(() => {
          const canWrapInList = can().wrapInList(listType, attributes);
          const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
          tr.ensureMarks(filteredMarks);
          if (canWrapInList) {
            return true;
          }
          return commands2.clearNodes();
        }).wrapInList(listType, attributes).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
      };
      var toggleMark = (typeOrName, attributes = {}, options = {}) => ({ state: state2, commands: commands2 }) => {
        const { extendEmptyMarkRange = false } = options;
        const type = getMarkType(typeOrName, state2.schema);
        const isActive2 = isMarkActive(state2, type, attributes);
        if (isActive2) {
          return commands2.unsetMark(type, { extendEmptyMarkRange });
        }
        return commands2.setMark(type, attributes);
      };
      var toggleNode = (typeOrName, toggleTypeOrName, attributes = {}) => ({ state: state2, commands: commands2 }) => {
        const type = getNodeType(typeOrName, state2.schema);
        const toggleType = getNodeType(toggleTypeOrName, state2.schema);
        const isActive2 = isNodeActive(state2, type, attributes);
        let attributesToCopy;
        if (state2.selection.$anchor.sameParent(state2.selection.$head)) {
          attributesToCopy = state2.selection.$anchor.parent.attrs;
        }
        if (isActive2) {
          return commands2.setNode(toggleType, attributesToCopy);
        }
        return commands2.setNode(type, { ...attributesToCopy, ...attributes });
      };
      var toggleWrap = (typeOrName, attributes = {}) => ({ state: state2, commands: commands2 }) => {
        const type = getNodeType(typeOrName, state2.schema);
        const isActive2 = isNodeActive(state2, type, attributes);
        if (isActive2) {
          return commands2.lift(type);
        }
        return commands2.wrapIn(type, attributes);
      };
      var undoInputRule = () => ({ state: state2, dispatch }) => {
        const plugins = state2.plugins;
        for (let i = 0; i < plugins.length; i += 1) {
          const plugin = plugins[i];
          let undoable;
          if (plugin.spec.isInputRules && (undoable = plugin.getState(state2))) {
            if (dispatch) {
              const tr = state2.tr;
              const toUndo = undoable.transform;
              for (let j = toUndo.steps.length - 1; j >= 0; j -= 1) {
                tr.step(toUndo.steps[j].invert(toUndo.docs[j]));
              }
              if (undoable.text) {
                const marks = tr.doc.resolve(undoable.from).marks();
                tr.replaceWith(undoable.from, undoable.to, state2.schema.text(undoable.text, marks));
              } else {
                tr.delete(undoable.from, undoable.to);
              }
            }
            return true;
          }
        }
        return false;
      };
      var unsetAllMarks = () => ({ tr, dispatch }) => {
        const { selection } = tr;
        const { empty, ranges } = selection;
        if (empty) {
          return true;
        }
        if (dispatch) {
          ranges.forEach((range) => {
            tr.removeMark(range.$from.pos, range.$to.pos);
          });
        }
        return true;
      };
      var unsetMark = (typeOrName, options = {}) => ({ tr, state: state2, dispatch }) => {
        var _a;
        const { extendEmptyMarkRange = false } = options;
        const { selection } = tr;
        const type = getMarkType(typeOrName, state2.schema);
        const { $from, empty, ranges } = selection;
        if (!dispatch) {
          return true;
        }
        if (empty && extendEmptyMarkRange) {
          let { from, to } = selection;
          const attrs = (_a = $from.marks().find((mark) => mark.type === type)) === null || _a === void 0 ? void 0 : _a.attrs;
          const range = getMarkRange($from, type, attrs);
          if (range) {
            from = range.from;
            to = range.to;
          }
          tr.removeMark(from, to, type);
        } else {
          ranges.forEach((range) => {
            tr.removeMark(range.$from.pos, range.$to.pos, type);
          });
        }
        tr.removeStoredMark(type);
        return true;
      };
      var updateAttributes = (typeOrName, attributes = {}) => ({ tr, state: state2, dispatch }) => {
        let nodeType = null;
        let markType = null;
        const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state2.schema);
        if (!schemaType) {
          return false;
        }
        if (schemaType === "node") {
          nodeType = getNodeType(typeOrName, state2.schema);
        }
        if (schemaType === "mark") {
          markType = getMarkType(typeOrName, state2.schema);
        }
        if (dispatch) {
          tr.selection.ranges.forEach((range) => {
            const from = range.$from.pos;
            const to = range.$to.pos;
            let lastPos;
            let lastNode;
            let trimmedFrom;
            let trimmedTo;
            if (tr.selection.empty) {
              state2.doc.nodesBetween(from, to, (node, pos) => {
                if (nodeType && nodeType === node.type) {
                  trimmedFrom = Math.max(pos, from);
                  trimmedTo = Math.min(pos + node.nodeSize, to);
                  lastPos = pos;
                  lastNode = node;
                }
              });
            } else {
              state2.doc.nodesBetween(from, to, (node, pos) => {
                if (pos < from && nodeType && nodeType === node.type) {
                  trimmedFrom = Math.max(pos, from);
                  trimmedTo = Math.min(pos + node.nodeSize, to);
                  lastPos = pos;
                  lastNode = node;
                }
                if (pos >= from && pos <= to) {
                  if (nodeType && nodeType === node.type) {
                    tr.setNodeMarkup(pos, void 0, {
                      ...node.attrs,
                      ...attributes
                    });
                  }
                  if (markType && node.marks.length) {
                    node.marks.forEach((mark) => {
                      if (markType === mark.type) {
                        const trimmedFrom2 = Math.max(pos, from);
                        const trimmedTo2 = Math.min(pos + node.nodeSize, to);
                        tr.addMark(trimmedFrom2, trimmedTo2, markType.create({
                          ...mark.attrs,
                          ...attributes
                        }));
                      }
                    });
                  }
                }
              });
            }
            if (lastNode) {
              if (lastPos !== void 0) {
                tr.setNodeMarkup(lastPos, void 0, {
                  ...lastNode.attrs,
                  ...attributes
                });
              }
              if (markType && lastNode.marks.length) {
                lastNode.marks.forEach((mark) => {
                  if (markType === mark.type) {
                    tr.addMark(trimmedFrom, trimmedTo, markType.create({
                      ...mark.attrs,
                      ...attributes
                    }));
                  }
                });
              }
            }
          });
        }
        return true;
      };
      var wrapIn = (typeOrName, attributes = {}) => ({ state: state2, dispatch }) => {
        const type = getNodeType(typeOrName, state2.schema);
        return commands$1.wrapIn(type, attributes)(state2, dispatch);
      };
      var wrapInList = (typeOrName, attributes = {}) => ({ state: state2, dispatch }) => {
        const type = getNodeType(typeOrName, state2.schema);
        return schemaList.wrapInList(type, attributes)(state2, dispatch);
      };
      var commands = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        blur,
        clearContent,
        clearNodes,
        command,
        createParagraphNear,
        cut,
        deleteCurrentNode,
        deleteNode,
        deleteRange,
        deleteSelection,
        enter,
        exitCode,
        extendMarkRange,
        first,
        focus,
        forEach,
        insertContent,
        insertContentAt,
        joinBackward,
        joinDown,
        joinForward,
        joinItemBackward,
        joinItemForward,
        joinTextblockBackward,
        joinTextblockForward,
        joinUp,
        keyboardShortcut,
        lift,
        liftEmptyBlock,
        liftListItem,
        newlineInCode,
        resetAttributes,
        scrollIntoView,
        selectAll,
        selectNodeBackward,
        selectNodeForward,
        selectParentNode,
        selectTextblockEnd,
        selectTextblockStart,
        setContent,
        setMark,
        setMeta,
        setNode,
        setNodeSelection,
        setTextSelection,
        sinkListItem,
        splitBlock,
        splitListItem,
        toggleList,
        toggleMark,
        toggleNode,
        toggleWrap,
        undoInputRule,
        unsetAllMarks,
        unsetMark,
        updateAttributes,
        wrapIn,
        wrapInList
      });
      var Commands = Extension.create({
        name: "commands",
        addCommands() {
          return {
            ...commands
          };
        }
      });
      var Drop = Extension.create({
        name: "drop",
        addProseMirrorPlugins() {
          return [
            new state.Plugin({
              key: new state.PluginKey("tiptapDrop"),
              props: {
                handleDrop: (_, e, slice, moved) => {
                  this.editor.emit("drop", {
                    editor: this.editor,
                    event: e,
                    slice,
                    moved
                  });
                }
              }
            })
          ];
        }
      });
      var Editable = Extension.create({
        name: "editable",
        addProseMirrorPlugins() {
          return [
            new state.Plugin({
              key: new state.PluginKey("editable"),
              props: {
                editable: () => this.editor.options.editable
              }
            })
          ];
        }
      });
      var focusEventsPluginKey = new state.PluginKey("focusEvents");
      var FocusEvents = Extension.create({
        name: "focusEvents",
        addProseMirrorPlugins() {
          const { editor: editor2 } = this;
          return [
            new state.Plugin({
              key: focusEventsPluginKey,
              props: {
                handleDOMEvents: {
                  focus: (view2, event) => {
                    editor2.isFocused = true;
                    const transaction = editor2.state.tr.setMeta("focus", { event }).setMeta("addToHistory", false);
                    view2.dispatch(transaction);
                    return false;
                  },
                  blur: (view2, event) => {
                    editor2.isFocused = false;
                    const transaction = editor2.state.tr.setMeta("blur", { event }).setMeta("addToHistory", false);
                    view2.dispatch(transaction);
                    return false;
                  }
                }
              }
            })
          ];
        }
      });
      var Keymap = Extension.create({
        name: "keymap",
        addKeyboardShortcuts() {
          const handleBackspace = () => this.editor.commands.first(({ commands: commands2 }) => [
            () => commands2.undoInputRule(),
            // maybe convert first text block node to default node
            () => commands2.command(({ tr }) => {
              const { selection, doc } = tr;
              const { empty, $anchor } = selection;
              const { pos, parent } = $anchor;
              const $parentPos = $anchor.parent.isTextblock && pos > 0 ? tr.doc.resolve(pos - 1) : $anchor;
              const parentIsIsolating = $parentPos.parent.type.spec.isolating;
              const parentPos = $anchor.pos - $anchor.parentOffset;
              const isAtStart = parentIsIsolating && $parentPos.parent.childCount === 1 ? parentPos === $anchor.pos : state.Selection.atStart(doc).from === pos;
              if (!empty || !parent.type.isTextblock || parent.textContent.length || !isAtStart || isAtStart && $anchor.parent.type.name === "paragraph") {
                return false;
              }
              return commands2.clearNodes();
            }),
            () => commands2.deleteSelection(),
            () => commands2.joinBackward(),
            () => commands2.selectNodeBackward()
          ]);
          const handleDelete = () => this.editor.commands.first(({ commands: commands2 }) => [
            () => commands2.deleteSelection(),
            () => commands2.deleteCurrentNode(),
            () => commands2.joinForward(),
            () => commands2.selectNodeForward()
          ]);
          const handleEnter = () => this.editor.commands.first(({ commands: commands2 }) => [
            () => commands2.newlineInCode(),
            () => commands2.createParagraphNear(),
            () => commands2.liftEmptyBlock(),
            () => commands2.splitBlock()
          ]);
          const baseKeymap = {
            Enter: handleEnter,
            "Mod-Enter": () => this.editor.commands.exitCode(),
            Backspace: handleBackspace,
            "Mod-Backspace": handleBackspace,
            "Shift-Backspace": handleBackspace,
            Delete: handleDelete,
            "Mod-Delete": handleDelete,
            "Mod-a": () => this.editor.commands.selectAll()
          };
          const pcKeymap = {
            ...baseKeymap
          };
          const macKeymap = {
            ...baseKeymap,
            "Ctrl-h": handleBackspace,
            "Alt-Backspace": handleBackspace,
            "Ctrl-d": handleDelete,
            "Ctrl-Alt-Backspace": handleDelete,
            "Alt-Delete": handleDelete,
            "Alt-d": handleDelete,
            "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
            "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
          };
          if (isiOS() || isMacOS()) {
            return macKeymap;
          }
          return pcKeymap;
        },
        addProseMirrorPlugins() {
          return [
            // With this plugin we check if the whole document was selected and deleted.
            // In this case we will additionally call `clearNodes()` to convert e.g. a heading
            // to a paragraph if necessary.
            // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
            // with many other commands.
            new state.Plugin({
              key: new state.PluginKey("clearDocument"),
              appendTransaction: (transactions, oldState, newState) => {
                if (transactions.some((tr2) => tr2.getMeta("composition"))) {
                  return;
                }
                const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
                const ignoreTr = transactions.some((transaction) => transaction.getMeta("preventClearDocument"));
                if (!docChanges || ignoreTr) {
                  return;
                }
                const { empty, from, to } = oldState.selection;
                const allFrom = state.Selection.atStart(oldState.doc).from;
                const allEnd = state.Selection.atEnd(oldState.doc).to;
                const allWasSelected = from === allFrom && to === allEnd;
                if (empty || !allWasSelected) {
                  return;
                }
                const isEmpty = isNodeEmpty(newState.doc);
                if (!isEmpty) {
                  return;
                }
                const tr = newState.tr;
                const state$1 = createChainableState({
                  state: newState,
                  transaction: tr
                });
                const { commands: commands2 } = new CommandManager({
                  editor: this.editor,
                  state: state$1
                });
                commands2.clearNodes();
                if (!tr.steps.length) {
                  return;
                }
                return tr;
              }
            })
          ];
        }
      });
      var Paste = Extension.create({
        name: "paste",
        addProseMirrorPlugins() {
          return [
            new state.Plugin({
              key: new state.PluginKey("tiptapPaste"),
              props: {
                handlePaste: (_view, e, slice) => {
                  this.editor.emit("paste", {
                    editor: this.editor,
                    event: e,
                    slice
                  });
                }
              }
            })
          ];
        }
      });
      var Tabindex = Extension.create({
        name: "tabindex",
        addProseMirrorPlugins() {
          return [
            new state.Plugin({
              key: new state.PluginKey("tabindex"),
              props: {
                attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
              }
            })
          ];
        }
      });
      var index = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        ClipboardTextSerializer,
        Commands,
        Drop,
        Editable,
        FocusEvents,
        Keymap,
        Paste,
        Tabindex,
        focusEventsPluginKey
      });
      var NodePos = class _NodePos {
        get name() {
          return this.node.type.name;
        }
        constructor(pos, editor2, isBlock = false, node = null) {
          this.currentNode = null;
          this.actualDepth = null;
          this.isBlock = isBlock;
          this.resolvedPos = pos;
          this.editor = editor2;
          this.currentNode = node;
        }
        get node() {
          return this.currentNode || this.resolvedPos.node();
        }
        get element() {
          return this.editor.view.domAtPos(this.pos).node;
        }
        get depth() {
          var _a;
          return (_a = this.actualDepth) !== null && _a !== void 0 ? _a : this.resolvedPos.depth;
        }
        get pos() {
          return this.resolvedPos.pos;
        }
        get content() {
          return this.node.content;
        }
        set content(content) {
          let from = this.from;
          let to = this.to;
          if (this.isBlock) {
            if (this.content.size === 0) {
              console.error(`You can\u2019t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
              return;
            }
            from = this.from + 1;
            to = this.to - 1;
          }
          this.editor.commands.insertContentAt({ from, to }, content);
        }
        get attributes() {
          return this.node.attrs;
        }
        get textContent() {
          return this.node.textContent;
        }
        get size() {
          return this.node.nodeSize;
        }
        get from() {
          if (this.isBlock) {
            return this.pos;
          }
          return this.resolvedPos.start(this.resolvedPos.depth);
        }
        get range() {
          return {
            from: this.from,
            to: this.to
          };
        }
        get to() {
          if (this.isBlock) {
            return this.pos + this.size;
          }
          return this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
        }
        get parent() {
          if (this.depth === 0) {
            return null;
          }
          const parentPos = this.resolvedPos.start(this.resolvedPos.depth - 1);
          const $pos = this.resolvedPos.doc.resolve(parentPos);
          return new _NodePos($pos, this.editor);
        }
        get before() {
          let $pos = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
          if ($pos.depth !== this.depth) {
            $pos = this.resolvedPos.doc.resolve(this.from - 3);
          }
          return new _NodePos($pos, this.editor);
        }
        get after() {
          let $pos = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
          if ($pos.depth !== this.depth) {
            $pos = this.resolvedPos.doc.resolve(this.to + 3);
          }
          return new _NodePos($pos, this.editor);
        }
        get children() {
          const children = [];
          this.node.content.forEach((node, offset) => {
            const isBlock = node.isBlock && !node.isTextblock;
            const isNonTextAtom = node.isAtom && !node.isText;
            const targetPos = this.pos + offset + (isNonTextAtom ? 0 : 1);
            if (targetPos < 0 || targetPos > this.resolvedPos.doc.nodeSize - 2) {
              return;
            }
            const $pos = this.resolvedPos.doc.resolve(targetPos);
            if (!isBlock && $pos.depth <= this.depth) {
              return;
            }
            const childNodePos = new _NodePos($pos, this.editor, isBlock, isBlock ? node : null);
            if (isBlock) {
              childNodePos.actualDepth = this.depth + 1;
            }
            children.push(new _NodePos($pos, this.editor, isBlock, isBlock ? node : null));
          });
          return children;
        }
        get firstChild() {
          return this.children[0] || null;
        }
        get lastChild() {
          const children = this.children;
          return children[children.length - 1] || null;
        }
        closest(selector, attributes = {}) {
          let node = null;
          let currentNode = this.parent;
          while (currentNode && !node) {
            if (currentNode.node.type.name === selector) {
              if (Object.keys(attributes).length > 0) {
                const nodeAttributes = currentNode.node.attrs;
                const attrKeys = Object.keys(attributes);
                for (let index2 = 0; index2 < attrKeys.length; index2 += 1) {
                  const key = attrKeys[index2];
                  if (nodeAttributes[key] !== attributes[key]) {
                    break;
                  }
                }
              } else {
                node = currentNode;
              }
            }
            currentNode = currentNode.parent;
          }
          return node;
        }
        querySelector(selector, attributes = {}) {
          return this.querySelectorAll(selector, attributes, true)[0] || null;
        }
        querySelectorAll(selector, attributes = {}, firstItemOnly = false) {
          let nodes = [];
          if (!this.children || this.children.length === 0) {
            return nodes;
          }
          const attrKeys = Object.keys(attributes);
          this.children.forEach((childPos) => {
            if (firstItemOnly && nodes.length > 0) {
              return;
            }
            if (childPos.node.type.name === selector) {
              const doesAllAttributesMatch = attrKeys.every((key) => attributes[key] === childPos.node.attrs[key]);
              if (doesAllAttributesMatch) {
                nodes.push(childPos);
              }
            }
            if (firstItemOnly && nodes.length > 0) {
              return;
            }
            nodes = nodes.concat(childPos.querySelectorAll(selector, attributes, firstItemOnly));
          });
          return nodes;
        }
        setAttribute(attributes) {
          const { tr } = this.editor.state;
          tr.setNodeMarkup(this.from, void 0, {
            ...this.node.attrs,
            ...attributes
          });
          this.editor.view.dispatch(tr);
        }
      };
      var style = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
      function createStyleTag(style2, nonce, suffix) {
        const tiptapStyleTag = document.querySelector(`style[data-tiptap-style${suffix ? `-${suffix}` : ""}]`);
        if (tiptapStyleTag !== null) {
          return tiptapStyleTag;
        }
        const styleNode = document.createElement("style");
        if (nonce) {
          styleNode.setAttribute("nonce", nonce);
        }
        styleNode.setAttribute(`data-tiptap-style${suffix ? `-${suffix}` : ""}`, "");
        styleNode.innerHTML = style2;
        document.getElementsByTagName("head")[0].appendChild(styleNode);
        return styleNode;
      }
      var Editor2 = class extends EventEmitter {
        constructor(options = {}) {
          super();
          this.isFocused = false;
          this.isInitialized = false;
          this.extensionStorage = {};
          this.options = {
            element: document.createElement("div"),
            content: "",
            injectCSS: true,
            injectNonce: void 0,
            extensions: [],
            autofocus: false,
            editable: true,
            editorProps: {},
            parseOptions: {},
            coreExtensionOptions: {},
            enableInputRules: true,
            enablePasteRules: true,
            enableCoreExtensions: true,
            enableContentCheck: false,
            emitContentError: false,
            onBeforeCreate: () => null,
            onCreate: () => null,
            onUpdate: () => null,
            onSelectionUpdate: () => null,
            onTransaction: () => null,
            onFocus: () => null,
            onBlur: () => null,
            onDestroy: () => null,
            onContentError: ({ error }) => {
              throw error;
            },
            onPaste: () => null,
            onDrop: () => null
          };
          this.isCapturingTransaction = false;
          this.capturedTransaction = null;
          this.setOptions(options);
          this.createExtensionManager();
          this.createCommandManager();
          this.createSchema();
          this.on("beforeCreate", this.options.onBeforeCreate);
          this.emit("beforeCreate", { editor: this });
          this.on("contentError", this.options.onContentError);
          this.createView();
          this.injectCSS();
          this.on("create", this.options.onCreate);
          this.on("update", this.options.onUpdate);
          this.on("selectionUpdate", this.options.onSelectionUpdate);
          this.on("transaction", this.options.onTransaction);
          this.on("focus", this.options.onFocus);
          this.on("blur", this.options.onBlur);
          this.on("destroy", this.options.onDestroy);
          this.on("drop", ({ event, slice, moved }) => this.options.onDrop(event, slice, moved));
          this.on("paste", ({ event, slice }) => this.options.onPaste(event, slice));
          window.setTimeout(() => {
            if (this.isDestroyed) {
              return;
            }
            this.commands.focus(this.options.autofocus);
            this.emit("create", { editor: this });
            this.isInitialized = true;
          }, 0);
        }
        /**
         * Returns the editor storage.
         */
        get storage() {
          return this.extensionStorage;
        }
        /**
         * An object of all registered commands.
         */
        get commands() {
          return this.commandManager.commands;
        }
        /**
         * Create a command chain to call multiple commands at once.
         */
        chain() {
          return this.commandManager.chain();
        }
        /**
         * Check if a command or a command chain can be executed. Without executing it.
         */
        can() {
          return this.commandManager.can();
        }
        /**
         * Inject CSS styles.
         */
        injectCSS() {
          if (this.options.injectCSS && document) {
            this.css = createStyleTag(style, this.options.injectNonce);
          }
        }
        /**
         * Update editor options.
         *
         * @param options A list of options
         */
        setOptions(options = {}) {
          this.options = {
            ...this.options,
            ...options
          };
          if (!this.view || !this.state || this.isDestroyed) {
            return;
          }
          if (this.options.editorProps) {
            this.view.setProps(this.options.editorProps);
          }
          this.view.updateState(this.state);
        }
        /**
         * Update editable state of the editor.
         */
        setEditable(editable, emitUpdate = true) {
          this.setOptions({ editable });
          if (emitUpdate) {
            this.emit("update", { editor: this, transaction: this.state.tr });
          }
        }
        /**
         * Returns whether the editor is editable.
         */
        get isEditable() {
          return this.options.editable && this.view && this.view.editable;
        }
        /**
         * Returns the editor state.
         */
        get state() {
          return this.view.state;
        }
        /**
         * Register a ProseMirror plugin.
         *
         * @param plugin A ProseMirror plugin
         * @param handlePlugins Control how to merge the plugin into the existing plugins.
         * @returns The new editor state
         */
        registerPlugin(plugin, handlePlugins) {
          const plugins = isFunction(handlePlugins) ? handlePlugins(plugin, [...this.state.plugins]) : [...this.state.plugins, plugin];
          const state2 = this.state.reconfigure({ plugins });
          this.view.updateState(state2);
          return state2;
        }
        /**
         * Unregister a ProseMirror plugin.
         *
         * @param nameOrPluginKeyToRemove The plugins name
         * @returns The new editor state or undefined if the editor is destroyed
         */
        unregisterPlugin(nameOrPluginKeyToRemove) {
          if (this.isDestroyed) {
            return void 0;
          }
          const prevPlugins = this.state.plugins;
          let plugins = prevPlugins;
          [].concat(nameOrPluginKeyToRemove).forEach((nameOrPluginKey) => {
            const name = typeof nameOrPluginKey === "string" ? `${nameOrPluginKey}$` : nameOrPluginKey.key;
            plugins = plugins.filter((plugin) => !plugin.key.startsWith(name));
          });
          if (prevPlugins.length === plugins.length) {
            return void 0;
          }
          const state2 = this.state.reconfigure({
            plugins
          });
          this.view.updateState(state2);
          return state2;
        }
        /**
         * Creates an extension manager.
         */
        createExtensionManager() {
          var _a, _b;
          const coreExtensions = this.options.enableCoreExtensions ? [
            Editable,
            ClipboardTextSerializer.configure({
              blockSeparator: (_b = (_a = this.options.coreExtensionOptions) === null || _a === void 0 ? void 0 : _a.clipboardTextSerializer) === null || _b === void 0 ? void 0 : _b.blockSeparator
            }),
            Commands,
            FocusEvents,
            Keymap,
            Tabindex,
            Drop,
            Paste
          ].filter((ext) => {
            if (typeof this.options.enableCoreExtensions === "object") {
              return this.options.enableCoreExtensions[ext.name] !== false;
            }
            return true;
          }) : [];
          const allExtensions = [...coreExtensions, ...this.options.extensions].filter((extension) => {
            return ["extension", "node", "mark"].includes(extension === null || extension === void 0 ? void 0 : extension.type);
          });
          this.extensionManager = new ExtensionManager(allExtensions, this);
        }
        /**
         * Creates an command manager.
         */
        createCommandManager() {
          this.commandManager = new CommandManager({
            editor: this
          });
        }
        /**
         * Creates a ProseMirror schema.
         */
        createSchema() {
          this.schema = this.extensionManager.schema;
        }
        /**
         * Creates a ProseMirror view.
         */
        createView() {
          var _a;
          let doc;
          try {
            doc = createDocument(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
          } catch (e) {
            if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message)) {
              throw e;
            }
            this.emit("contentError", {
              editor: this,
              error: e,
              disableCollaboration: () => {
                if (this.storage.collaboration) {
                  this.storage.collaboration.isDisabled = true;
                }
                this.options.extensions = this.options.extensions.filter((extension) => extension.name !== "collaboration");
                this.createExtensionManager();
              }
            });
            doc = createDocument(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: false });
          }
          const selection = resolveFocusPosition(doc, this.options.autofocus);
          this.view = new view.EditorView(this.options.element, {
            ...this.options.editorProps,
            attributes: {
              // add `role="textbox"` to the editor element
              role: "textbox",
              ...(_a = this.options.editorProps) === null || _a === void 0 ? void 0 : _a.attributes
            },
            dispatchTransaction: this.dispatchTransaction.bind(this),
            state: state.EditorState.create({
              doc,
              selection: selection || void 0
            })
          });
          const newState = this.state.reconfigure({
            plugins: this.extensionManager.plugins
          });
          this.view.updateState(newState);
          this.createNodeViews();
          this.prependClass();
          const dom = this.view.dom;
          dom.editor = this;
        }
        /**
         * Creates all node views.
         */
        createNodeViews() {
          if (this.view.isDestroyed) {
            return;
          }
          this.view.setProps({
            nodeViews: this.extensionManager.nodeViews
          });
        }
        /**
         * Prepend class name to element.
         */
        prependClass() {
          this.view.dom.className = `tiptap ${this.view.dom.className}`;
        }
        captureTransaction(fn) {
          this.isCapturingTransaction = true;
          fn();
          this.isCapturingTransaction = false;
          const tr = this.capturedTransaction;
          this.capturedTransaction = null;
          return tr;
        }
        /**
         * The callback over which to send transactions (state updates) produced by the view.
         *
         * @param transaction An editor state transaction
         */
        dispatchTransaction(transaction) {
          if (this.view.isDestroyed) {
            return;
          }
          if (this.isCapturingTransaction) {
            if (!this.capturedTransaction) {
              this.capturedTransaction = transaction;
              return;
            }
            transaction.steps.forEach((step) => {
              var _a;
              return (_a = this.capturedTransaction) === null || _a === void 0 ? void 0 : _a.step(step);
            });
            return;
          }
          const state2 = this.state.apply(transaction);
          const selectionHasChanged = !this.state.selection.eq(state2.selection);
          this.emit("beforeTransaction", {
            editor: this,
            transaction,
            nextState: state2
          });
          this.view.updateState(state2);
          this.emit("transaction", {
            editor: this,
            transaction
          });
          if (selectionHasChanged) {
            this.emit("selectionUpdate", {
              editor: this,
              transaction
            });
          }
          const focus2 = transaction.getMeta("focus");
          const blur2 = transaction.getMeta("blur");
          if (focus2) {
            this.emit("focus", {
              editor: this,
              event: focus2.event,
              transaction
            });
          }
          if (blur2) {
            this.emit("blur", {
              editor: this,
              event: blur2.event,
              transaction
            });
          }
          if (!transaction.docChanged || transaction.getMeta("preventUpdate")) {
            return;
          }
          this.emit("update", {
            editor: this,
            transaction
          });
        }
        /**
         * Get attributes of the currently selected node or mark.
         */
        getAttributes(nameOrType) {
          return getAttributes(this.state, nameOrType);
        }
        isActive(nameOrAttributes, attributesOrUndefined) {
          const name = typeof nameOrAttributes === "string" ? nameOrAttributes : null;
          const attributes = typeof nameOrAttributes === "string" ? attributesOrUndefined : nameOrAttributes;
          return isActive(this.state, name, attributes);
        }
        /**
         * Get the document as JSON.
         */
        getJSON() {
          return this.state.doc.toJSON();
        }
        /**
         * Get the document as HTML.
         */
        getHTML() {
          return getHTMLFromFragment(this.state.doc.content, this.schema);
        }
        /**
         * Get the document as text.
         */
        getText(options) {
          const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
          return getText(this.state.doc, {
            blockSeparator,
            textSerializers: {
              ...getTextSerializersFromSchema(this.schema),
              ...textSerializers
            }
          });
        }
        /**
         * Check if there is no content.
         */
        get isEmpty() {
          return isNodeEmpty(this.state.doc);
        }
        /**
         * Get the number of characters for the current document.
         *
         * @deprecated
         */
        getCharacterCount() {
          console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.');
          return this.state.doc.content.size - 2;
        }
        /**
         * Destroy the editor.
         */
        destroy() {
          this.emit("destroy");
          if (this.view) {
            const dom = this.view.dom;
            if (dom && dom.editor) {
              delete dom.editor;
            }
            this.view.destroy();
          }
          this.removeAllListeners();
        }
        /**
         * Check if the editor is already destroyed.
         */
        get isDestroyed() {
          var _a;
          return !((_a = this.view) === null || _a === void 0 ? void 0 : _a.docView);
        }
        $node(selector, attributes) {
          var _a;
          return ((_a = this.$doc) === null || _a === void 0 ? void 0 : _a.querySelector(selector, attributes)) || null;
        }
        $nodes(selector, attributes) {
          var _a;
          return ((_a = this.$doc) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector, attributes)) || null;
        }
        $pos(pos) {
          const $pos = this.state.doc.resolve(pos);
          return new NodePos($pos, this);
        }
        get $doc() {
          return this.$pos(0);
        }
      };
      function markInputRule(config) {
        return new InputRule({
          find: config.find,
          handler: ({ state: state2, range, match }) => {
            const attributes = callOrReturn(config.getAttributes, void 0, match);
            if (attributes === false || attributes === null) {
              return null;
            }
            const { tr } = state2;
            const captureGroup = match[match.length - 1];
            const fullMatch = match[0];
            if (captureGroup) {
              const startSpaces = fullMatch.search(/\S/);
              const textStart = range.from + fullMatch.indexOf(captureGroup);
              const textEnd = textStart + captureGroup.length;
              const excludedMarks = getMarksBetween(range.from, range.to, state2.doc).filter((item) => {
                const excluded = item.mark.type.excluded;
                return excluded.find((type) => type === config.type && type !== item.mark.type);
              }).filter((item) => item.to > textStart);
              if (excludedMarks.length) {
                return null;
              }
              if (textEnd < range.to) {
                tr.delete(textEnd, range.to);
              }
              if (textStart > range.from) {
                tr.delete(range.from + startSpaces, textStart);
              }
              const markEnd = range.from + startSpaces + captureGroup.length;
              tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
              tr.removeStoredMark(config.type);
            }
          }
        });
      }
      function nodeInputRule(config) {
        return new InputRule({
          find: config.find,
          handler: ({ state: state2, range, match }) => {
            const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
            const { tr } = state2;
            const start = range.from;
            let end = range.to;
            const newNode = config.type.create(attributes);
            if (match[1]) {
              const offset = match[0].lastIndexOf(match[1]);
              let matchStart = start + offset;
              if (matchStart > end) {
                matchStart = end;
              } else {
                end = matchStart + match[1].length;
              }
              const lastChar = match[0][match[0].length - 1];
              tr.insertText(lastChar, start + match[0].length - 1);
              tr.replaceWith(matchStart, end, newNode);
            } else if (match[0]) {
              const insertionStart = config.type.isInline ? start : start - 1;
              tr.insert(insertionStart, config.type.create(attributes)).delete(tr.mapping.map(start), tr.mapping.map(end));
            }
            tr.scrollIntoView();
          }
        });
      }
      function textblockTypeInputRule(config) {
        return new InputRule({
          find: config.find,
          handler: ({ state: state2, range, match }) => {
            const $start = state2.doc.resolve(range.from);
            const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
            if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), config.type)) {
              return null;
            }
            state2.tr.delete(range.from, range.to).setBlockType(range.from, range.from, config.type, attributes);
          }
        });
      }
      function textInputRule(config) {
        return new InputRule({
          find: config.find,
          handler: ({ state: state2, range, match }) => {
            let insert = config.replace;
            let start = range.from;
            const end = range.to;
            if (match[1]) {
              const offset = match[0].lastIndexOf(match[1]);
              insert += match[0].slice(offset + match[1].length);
              start += offset;
              const cutOff = start - end;
              if (cutOff > 0) {
                insert = match[0].slice(offset - cutOff, offset) + insert;
                start = end;
              }
            }
            state2.tr.insertText(insert, start, end);
          }
        });
      }
      function wrappingInputRule(config) {
        return new InputRule({
          find: config.find,
          handler: ({ state: state2, range, match, chain }) => {
            const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
            const tr = state2.tr.delete(range.from, range.to);
            const $start = tr.doc.resolve(range.from);
            const blockRange = $start.blockRange();
            const wrapping = blockRange && transform.findWrapping(blockRange, config.type, attributes);
            if (!wrapping) {
              return null;
            }
            tr.wrap(blockRange, wrapping);
            if (config.keepMarks && config.editor) {
              const { selection, storedMarks } = state2;
              const { splittableMarks } = config.editor.extensionManager;
              const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
              if (marks) {
                const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
                tr.ensureMarks(filteredMarks);
              }
            }
            if (config.keepAttributes) {
              const nodeType = config.type.name === "bulletList" || config.type.name === "orderedList" ? "listItem" : "taskList";
              chain().updateAttributes(nodeType, attributes).run();
            }
            const before = tr.doc.resolve(range.from - 1).nodeBefore;
            if (before && before.type === config.type && transform.canJoin(tr.doc, range.from - 1) && (!config.joinPredicate || config.joinPredicate(match, before))) {
              tr.join(range.from - 1);
            }
          }
        });
      }
      var Node = class _Node {
        constructor(config = {}) {
          this.type = "node";
          this.name = "node";
          this.parent = null;
          this.child = null;
          this.config = {
            name: this.name,
            defaultOptions: {}
          };
          this.config = {
            ...this.config,
            ...config
          };
          this.name = this.config.name;
          if (config.defaultOptions && Object.keys(config.defaultOptions).length > 0) {
            console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`);
          }
          this.options = this.config.defaultOptions;
          if (this.config.addOptions) {
            this.options = callOrReturn(getExtensionField(this, "addOptions", {
              name: this.name
            }));
          }
          this.storage = callOrReturn(getExtensionField(this, "addStorage", {
            name: this.name,
            options: this.options
          })) || {};
        }
        static create(config = {}) {
          return new _Node(config);
        }
        configure(options = {}) {
          const extension = this.extend({
            ...this.config,
            addOptions: () => {
              return mergeDeep(this.options, options);
            }
          });
          extension.name = this.name;
          extension.parent = this.parent;
          return extension;
        }
        extend(extendedConfig = {}) {
          const extension = new _Node(extendedConfig);
          extension.parent = this;
          this.child = extension;
          extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
          if (extendedConfig.defaultOptions && Object.keys(extendedConfig.defaultOptions).length > 0) {
            console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${extension.name}".`);
          }
          extension.options = callOrReturn(getExtensionField(extension, "addOptions", {
            name: extension.name
          }));
          extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
            name: extension.name,
            options: extension.options
          }));
          return extension;
        }
      };
      var NodeView = class {
        constructor(component, props, options) {
          this.isDragging = false;
          this.component = component;
          this.editor = props.editor;
          this.options = {
            stopEvent: null,
            ignoreMutation: null,
            ...options
          };
          this.extension = props.extension;
          this.node = props.node;
          this.decorations = props.decorations;
          this.innerDecorations = props.innerDecorations;
          this.view = props.view;
          this.HTMLAttributes = props.HTMLAttributes;
          this.getPos = props.getPos;
          this.mount();
        }
        mount() {
          return;
        }
        get dom() {
          return this.editor.view.dom;
        }
        get contentDOM() {
          return null;
        }
        onDragStart(event) {
          var _a, _b, _c, _d, _e, _f, _g;
          const { view: view2 } = this.editor;
          const target = event.target;
          const dragHandle = target.nodeType === 3 ? (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.closest("[data-drag-handle]") : target.closest("[data-drag-handle]");
          if (!this.dom || ((_b = this.contentDOM) === null || _b === void 0 ? void 0 : _b.contains(target)) || !dragHandle) {
            return;
          }
          let x = 0;
          let y = 0;
          if (this.dom !== dragHandle) {
            const domBox = this.dom.getBoundingClientRect();
            const handleBox = dragHandle.getBoundingClientRect();
            const offsetX = (_c = event.offsetX) !== null && _c !== void 0 ? _c : (_d = event.nativeEvent) === null || _d === void 0 ? void 0 : _d.offsetX;
            const offsetY = (_e = event.offsetY) !== null && _e !== void 0 ? _e : (_f = event.nativeEvent) === null || _f === void 0 ? void 0 : _f.offsetY;
            x = handleBox.x - domBox.x + offsetX;
            y = handleBox.y - domBox.y + offsetY;
          }
          const clonedNode = this.dom.cloneNode(true);
          (_g = event.dataTransfer) === null || _g === void 0 ? void 0 : _g.setDragImage(clonedNode, x, y);
          const pos = this.getPos();
          if (typeof pos !== "number") {
            return;
          }
          const selection = state.NodeSelection.create(view2.state.doc, pos);
          const transaction = view2.state.tr.setSelection(selection);
          view2.dispatch(transaction);
        }
        stopEvent(event) {
          var _a;
          if (!this.dom) {
            return false;
          }
          if (typeof this.options.stopEvent === "function") {
            return this.options.stopEvent({ event });
          }
          const target = event.target;
          const isInElement = this.dom.contains(target) && !((_a = this.contentDOM) === null || _a === void 0 ? void 0 : _a.contains(target));
          if (!isInElement) {
            return false;
          }
          const isDragEvent = event.type.startsWith("drag");
          const isDropEvent = event.type === "drop";
          const isInput = ["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(target.tagName) || target.isContentEditable;
          if (isInput && !isDropEvent && !isDragEvent) {
            return true;
          }
          const { isEditable } = this.editor;
          const { isDragging } = this;
          const isDraggable = !!this.node.type.spec.draggable;
          const isSelectable = state.NodeSelection.isSelectable(this.node);
          const isCopyEvent = event.type === "copy";
          const isPasteEvent = event.type === "paste";
          const isCutEvent = event.type === "cut";
          const isClickEvent = event.type === "mousedown";
          if (!isDraggable && isSelectable && isDragEvent && event.target === this.dom) {
            event.preventDefault();
          }
          if (isDraggable && isDragEvent && !isDragging && event.target === this.dom) {
            event.preventDefault();
            return false;
          }
          if (isDraggable && isEditable && !isDragging && isClickEvent) {
            const dragHandle = target.closest("[data-drag-handle]");
            const isValidDragHandle = dragHandle && (this.dom === dragHandle || this.dom.contains(dragHandle));
            if (isValidDragHandle) {
              this.isDragging = true;
              document.addEventListener("dragend", () => {
                this.isDragging = false;
              }, { once: true });
              document.addEventListener("drop", () => {
                this.isDragging = false;
              }, { once: true });
              document.addEventListener("mouseup", () => {
                this.isDragging = false;
              }, { once: true });
            }
          }
          if (isDragging || isDropEvent || isCopyEvent || isPasteEvent || isCutEvent || isClickEvent && isSelectable) {
            return false;
          }
          return true;
        }
        /**
         * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
         * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
         * @return `true` if it can safely be ignored.
         */
        ignoreMutation(mutation) {
          if (!this.dom || !this.contentDOM) {
            return true;
          }
          if (typeof this.options.ignoreMutation === "function") {
            return this.options.ignoreMutation({ mutation });
          }
          if (this.node.isLeaf || this.node.isAtom) {
            return true;
          }
          if (mutation.type === "selection") {
            return false;
          }
          if (this.dom.contains(mutation.target) && mutation.type === "childList" && (isiOS() || isAndroid()) && this.editor.isFocused) {
            const changedNodes = [
              ...Array.from(mutation.addedNodes),
              ...Array.from(mutation.removedNodes)
            ];
            if (changedNodes.every((node) => node.isContentEditable)) {
              return false;
            }
          }
          if (this.contentDOM === mutation.target && mutation.type === "attributes") {
            return true;
          }
          if (this.contentDOM.contains(mutation.target)) {
            return false;
          }
          return true;
        }
        /**
         * Update the attributes of the prosemirror node.
         */
        updateAttributes(attributes) {
          this.editor.commands.command(({ tr }) => {
            const pos = this.getPos();
            if (typeof pos !== "number") {
              return false;
            }
            tr.setNodeMarkup(pos, void 0, {
              ...this.node.attrs,
              ...attributes
            });
            return true;
          });
        }
        /**
         * Delete the node.
         */
        deleteNode() {
          const from = this.getPos();
          if (typeof from !== "number") {
            return;
          }
          const to = from + this.node.nodeSize;
          this.editor.commands.deleteRange({ from, to });
        }
      };
      function markPasteRule(config) {
        return new PasteRule({
          find: config.find,
          handler: ({ state: state2, range, match, pasteEvent }) => {
            const attributes = callOrReturn(config.getAttributes, void 0, match, pasteEvent);
            if (attributes === false || attributes === null) {
              return null;
            }
            const { tr } = state2;
            const captureGroup = match[match.length - 1];
            const fullMatch = match[0];
            let markEnd = range.to;
            if (captureGroup) {
              const startSpaces = fullMatch.search(/\S/);
              const textStart = range.from + fullMatch.indexOf(captureGroup);
              const textEnd = textStart + captureGroup.length;
              const excludedMarks = getMarksBetween(range.from, range.to, state2.doc).filter((item) => {
                const excluded = item.mark.type.excluded;
                return excluded.find((type) => type === config.type && type !== item.mark.type);
              }).filter((item) => item.to > textStart);
              if (excludedMarks.length) {
                return null;
              }
              if (textEnd < range.to) {
                tr.delete(textEnd, range.to);
              }
              if (textStart > range.from) {
                tr.delete(range.from + startSpaces, textStart);
              }
              markEnd = range.from + startSpaces + captureGroup.length;
              tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
              tr.removeStoredMark(config.type);
            }
          }
        });
      }
      function canInsertNode(state$1, nodeType) {
        const { selection } = state$1;
        const { $from } = selection;
        if (selection instanceof state.NodeSelection) {
          const index2 = $from.index();
          const parent = $from.parent;
          return parent.canReplaceWith(index2, index2 + 1, nodeType);
        }
        let depth = $from.depth;
        while (depth >= 0) {
          const index2 = $from.index(depth);
          const parent = $from.node(depth);
          const match = parent.contentMatchAt(index2);
          if (match.matchType(nodeType)) {
            return true;
          }
          depth -= 1;
        }
        return false;
      }
      function escapeForRegEx(string) {
        return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      function isString(value) {
        return typeof value === "string";
      }
      function nodePasteRule(config) {
        return new PasteRule({
          find: config.find,
          handler({ match, chain, range, pasteEvent }) {
            const attributes = callOrReturn(config.getAttributes, void 0, match, pasteEvent);
            const content = callOrReturn(config.getContent, void 0, attributes);
            if (attributes === false || attributes === null) {
              return null;
            }
            const node = { type: config.type.name, attrs: attributes };
            if (content) {
              node.content = content;
            }
            if (match.input) {
              chain().deleteRange(range).insertContentAt(range.from, node);
            }
          }
        });
      }
      function textPasteRule(config) {
        return new PasteRule({
          find: config.find,
          handler: ({ state: state2, range, match }) => {
            let insert = config.replace;
            let start = range.from;
            const end = range.to;
            if (match[1]) {
              const offset = match[0].lastIndexOf(match[1]);
              insert += match[0].slice(offset + match[1].length);
              start += offset;
              const cutOff = start - end;
              if (cutOff > 0) {
                insert = match[0].slice(offset - cutOff, offset) + insert;
                start = end;
              }
            }
            state2.tr.insertText(insert, start, end);
          }
        });
      }
      var Tracker = class {
        constructor(transaction) {
          this.transaction = transaction;
          this.currentStep = this.transaction.steps.length;
        }
        map(position) {
          let deleted = false;
          const mappedPosition = this.transaction.steps.slice(this.currentStep).reduce((newPosition, step) => {
            const mapResult = step.getMap().mapResult(newPosition);
            if (mapResult.deleted) {
              deleted = true;
            }
            return mapResult.pos;
          }, position);
          return {
            position: mappedPosition,
            deleted
          };
        }
      };
      exports.CommandManager = CommandManager;
      exports.Editor = Editor2;
      exports.Extension = Extension;
      exports.InputRule = InputRule;
      exports.Mark = Mark;
      exports.Node = Node;
      exports.NodePos = NodePos;
      exports.NodeView = NodeView;
      exports.PasteRule = PasteRule;
      exports.Tracker = Tracker;
      exports.callOrReturn = callOrReturn;
      exports.canInsertNode = canInsertNode;
      exports.combineTransactionSteps = combineTransactionSteps;
      exports.createChainableState = createChainableState;
      exports.createDocument = createDocument;
      exports.createNodeFromContent = createNodeFromContent;
      exports.createStyleTag = createStyleTag;
      exports.defaultBlockAt = defaultBlockAt;
      exports.deleteProps = deleteProps;
      exports.elementFromString = elementFromString;
      exports.escapeForRegEx = escapeForRegEx;
      exports.extensions = index;
      exports.findChildren = findChildren;
      exports.findChildrenInRange = findChildrenInRange;
      exports.findDuplicates = findDuplicates;
      exports.findParentNode = findParentNode;
      exports.findParentNodeClosestToPos = findParentNodeClosestToPos;
      exports.fromString = fromString;
      exports.generateHTML = generateHTML;
      exports.generateJSON = generateJSON;
      exports.generateText = generateText;
      exports.getAttributes = getAttributes;
      exports.getAttributesFromExtensions = getAttributesFromExtensions;
      exports.getChangedRanges = getChangedRanges;
      exports.getDebugJSON = getDebugJSON;
      exports.getExtensionField = getExtensionField;
      exports.getHTMLFromFragment = getHTMLFromFragment;
      exports.getMarkAttributes = getMarkAttributes;
      exports.getMarkRange = getMarkRange;
      exports.getMarkType = getMarkType;
      exports.getMarksBetween = getMarksBetween;
      exports.getNodeAtPosition = getNodeAtPosition;
      exports.getNodeAttributes = getNodeAttributes;
      exports.getNodeType = getNodeType;
      exports.getRenderedAttributes = getRenderedAttributes;
      exports.getSchema = getSchema;
      exports.getSchemaByResolvedExtensions = getSchemaByResolvedExtensions;
      exports.getSchemaTypeByName = getSchemaTypeByName;
      exports.getSchemaTypeNameByName = getSchemaTypeNameByName;
      exports.getSplittedAttributes = getSplittedAttributes;
      exports.getText = getText;
      exports.getTextBetween = getTextBetween;
      exports.getTextContentFromNodes = getTextContentFromNodes;
      exports.getTextSerializersFromSchema = getTextSerializersFromSchema;
      exports.injectExtensionAttributesToParseRule = injectExtensionAttributesToParseRule;
      exports.inputRulesPlugin = inputRulesPlugin;
      exports.isActive = isActive;
      exports.isAtEndOfNode = isAtEndOfNode;
      exports.isAtStartOfNode = isAtStartOfNode;
      exports.isEmptyObject = isEmptyObject;
      exports.isExtensionRulesEnabled = isExtensionRulesEnabled;
      exports.isFunction = isFunction;
      exports.isList = isList;
      exports.isMacOS = isMacOS;
      exports.isMarkActive = isMarkActive;
      exports.isNodeActive = isNodeActive;
      exports.isNodeEmpty = isNodeEmpty;
      exports.isNodeSelection = isNodeSelection;
      exports.isNumber = isNumber;
      exports.isPlainObject = isPlainObject;
      exports.isRegExp = isRegExp;
      exports.isString = isString;
      exports.isTextSelection = isTextSelection;
      exports.isiOS = isiOS;
      exports.markInputRule = markInputRule;
      exports.markPasteRule = markPasteRule;
      exports.mergeAttributes = mergeAttributes;
      exports.mergeDeep = mergeDeep;
      exports.minMax = minMax;
      exports.nodeInputRule = nodeInputRule;
      exports.nodePasteRule = nodePasteRule;
      exports.objectIncludes = objectIncludes;
      exports.pasteRulesPlugin = pasteRulesPlugin;
      exports.posToDOMRect = posToDOMRect;
      exports.removeDuplicates = removeDuplicates;
      exports.resolveFocusPosition = resolveFocusPosition;
      exports.rewriteUnknownContent = rewriteUnknownContent;
      exports.selectionToInsertionEnd = selectionToInsertionEnd;
      exports.splitExtensions = splitExtensions;
      exports.textInputRule = textInputRule;
      exports.textPasteRule = textPasteRule;
      exports.textblockTypeInputRule = textblockTypeInputRule;
      exports.wrappingInputRule = wrappingInputRule;
    }
  });

  // node_modules/@tiptap/extension-blockquote/dist/index.cjs
  var require_dist17 = __commonJS({
    "node_modules/@tiptap/extension-blockquote/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var inputRegex = /^\s*>\s$/;
      var Blockquote = core.Node.create({
        name: "blockquote",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        content: "block+",
        group: "block",
        defining: true,
        parseHTML() {
          return [
            { tag: "blockquote" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["blockquote", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setBlockquote: () => ({ commands }) => {
              return commands.wrapIn(this.name);
            },
            toggleBlockquote: () => ({ commands }) => {
              return commands.toggleWrap(this.name);
            },
            unsetBlockquote: () => ({ commands }) => {
              return commands.lift(this.name);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
          };
        },
        addInputRules() {
          return [
            core.wrappingInputRule({
              find: inputRegex,
              type: this.type
            })
          ];
        }
      });
      exports.Blockquote = Blockquote;
      exports.default = Blockquote;
      exports.inputRegex = inputRegex;
    }
  });

  // node_modules/@tiptap/extension-bold/dist/index.cjs
  var require_dist18 = __commonJS({
    "node_modules/@tiptap/extension-bold/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var starInputRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/;
      var starPasteRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g;
      var underscoreInputRegex = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/;
      var underscorePasteRegex = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g;
      var Bold = core.Mark.create({
        name: "bold",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        parseHTML() {
          return [
            {
              tag: "strong"
            },
            {
              tag: "b",
              getAttrs: (node) => node.style.fontWeight !== "normal" && null
            },
            {
              style: "font-weight=400",
              clearMark: (mark) => mark.type.name === this.name
            },
            {
              style: "font-weight",
              getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
            }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["strong", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setBold: () => ({ commands }) => {
              return commands.setMark(this.name);
            },
            toggleBold: () => ({ commands }) => {
              return commands.toggleMark(this.name);
            },
            unsetBold: () => ({ commands }) => {
              return commands.unsetMark(this.name);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-b": () => this.editor.commands.toggleBold(),
            "Mod-B": () => this.editor.commands.toggleBold()
          };
        },
        addInputRules() {
          return [
            core.markInputRule({
              find: starInputRegex,
              type: this.type
            }),
            core.markInputRule({
              find: underscoreInputRegex,
              type: this.type
            })
          ];
        },
        addPasteRules() {
          return [
            core.markPasteRule({
              find: starPasteRegex,
              type: this.type
            }),
            core.markPasteRule({
              find: underscorePasteRegex,
              type: this.type
            })
          ];
        }
      });
      exports.Bold = Bold;
      exports.default = Bold;
      exports.starInputRegex = starInputRegex;
      exports.starPasteRegex = starPasteRegex;
      exports.underscoreInputRegex = underscoreInputRegex;
      exports.underscorePasteRegex = underscorePasteRegex;
    }
  });

  // node_modules/@tiptap/extension-bullet-list/dist/index.cjs
  var require_dist19 = __commonJS({
    "node_modules/@tiptap/extension-bullet-list/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var ListItemName = "listItem";
      var TextStyleName = "textStyle";
      var inputRegex = /^\s*([-+*])\s$/;
      var BulletList = core.Node.create({
        name: "bulletList",
        addOptions() {
          return {
            itemTypeName: "listItem",
            HTMLAttributes: {},
            keepMarks: false,
            keepAttributes: false
          };
        },
        group: "block list",
        content() {
          return `${this.options.itemTypeName}+`;
        },
        parseHTML() {
          return [
            { tag: "ul" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["ul", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            toggleBulletList: () => ({ commands, chain }) => {
              if (this.options.keepAttributes) {
                return chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(ListItemName, this.editor.getAttributes(TextStyleName)).run();
              }
              return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
          };
        },
        addInputRules() {
          let inputRule = core.wrappingInputRule({
            find: inputRegex,
            type: this.type
          });
          if (this.options.keepMarks || this.options.keepAttributes) {
            inputRule = core.wrappingInputRule({
              find: inputRegex,
              type: this.type,
              keepMarks: this.options.keepMarks,
              keepAttributes: this.options.keepAttributes,
              getAttributes: () => {
                return this.editor.getAttributes(TextStyleName);
              },
              editor: this.editor
            });
          }
          return [
            inputRule
          ];
        }
      });
      exports.BulletList = BulletList;
      exports.default = BulletList;
      exports.inputRegex = inputRegex;
    }
  });

  // node_modules/@tiptap/extension-code/dist/index.cjs
  var require_dist20 = __commonJS({
    "node_modules/@tiptap/extension-code/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var inputRegex = /(^|[^`])`([^`]+)`(?!`)/;
      var pasteRegex = /(^|[^`])`([^`]+)`(?!`)/g;
      var Code = core.Mark.create({
        name: "code",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        excludes: "_",
        code: true,
        exitable: true,
        parseHTML() {
          return [
            { tag: "code" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["code", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setCode: () => ({ commands }) => {
              return commands.setMark(this.name);
            },
            toggleCode: () => ({ commands }) => {
              return commands.toggleMark(this.name);
            },
            unsetCode: () => ({ commands }) => {
              return commands.unsetMark(this.name);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-e": () => this.editor.commands.toggleCode()
          };
        },
        addInputRules() {
          return [
            core.markInputRule({
              find: inputRegex,
              type: this.type
            })
          ];
        },
        addPasteRules() {
          return [
            core.markPasteRule({
              find: pasteRegex,
              type: this.type
            })
          ];
        }
      });
      exports.Code = Code;
      exports.default = Code;
      exports.inputRegex = inputRegex;
      exports.pasteRegex = pasteRegex;
    }
  });

  // node_modules/@tiptap/extension-code-block/dist/index.cjs
  var require_dist21 = __commonJS({
    "node_modules/@tiptap/extension-code-block/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var state = require_dist5();
      var backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
      var tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;
      var CodeBlock = core.Node.create({
        name: "codeBlock",
        addOptions() {
          return {
            languageClassPrefix: "language-",
            exitOnTripleEnter: true,
            exitOnArrowDown: true,
            defaultLanguage: null,
            HTMLAttributes: {}
          };
        },
        content: "text*",
        marks: "",
        group: "block",
        code: true,
        defining: true,
        addAttributes() {
          return {
            language: {
              default: this.options.defaultLanguage,
              parseHTML: (element) => {
                var _a;
                const { languageClassPrefix } = this.options;
                const classNames = [...((_a = element.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList) || []];
                const languages = classNames.filter((className) => className.startsWith(languageClassPrefix)).map((className) => className.replace(languageClassPrefix, ""));
                const language = languages[0];
                if (!language) {
                  return null;
                }
                return language;
              },
              rendered: false
            }
          };
        },
        parseHTML() {
          return [
            {
              tag: "pre",
              preserveWhitespace: "full"
            }
          ];
        },
        renderHTML({ node, HTMLAttributes }) {
          return [
            "pre",
            core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            [
              "code",
              {
                class: node.attrs.language ? this.options.languageClassPrefix + node.attrs.language : null
              },
              0
            ]
          ];
        },
        addCommands() {
          return {
            setCodeBlock: (attributes) => ({ commands }) => {
              return commands.setNode(this.name, attributes);
            },
            toggleCodeBlock: (attributes) => ({ commands }) => {
              return commands.toggleNode(this.name, "paragraph", attributes);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
            // remove code block when at start of document or code block is empty
            Backspace: () => {
              const { empty, $anchor } = this.editor.state.selection;
              const isAtStart = $anchor.pos === 1;
              if (!empty || $anchor.parent.type.name !== this.name) {
                return false;
              }
              if (isAtStart || !$anchor.parent.textContent.length) {
                return this.editor.commands.clearNodes();
              }
              return false;
            },
            // exit node on triple enter
            Enter: ({ editor: editor2 }) => {
              if (!this.options.exitOnTripleEnter) {
                return false;
              }
              const { state: state2 } = editor2;
              const { selection } = state2;
              const { $from, empty } = selection;
              if (!empty || $from.parent.type !== this.type) {
                return false;
              }
              const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
              const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");
              if (!isAtEnd || !endsWithDoubleNewline) {
                return false;
              }
              return editor2.chain().command(({ tr }) => {
                tr.delete($from.pos - 2, $from.pos);
                return true;
              }).exitCode().run();
            },
            // exit node on arrow down
            ArrowDown: ({ editor: editor2 }) => {
              if (!this.options.exitOnArrowDown) {
                return false;
              }
              const { state: state$1 } = editor2;
              const { selection, doc } = state$1;
              const { $from, empty } = selection;
              if (!empty || $from.parent.type !== this.type) {
                return false;
              }
              const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
              if (!isAtEnd) {
                return false;
              }
              const after = $from.after();
              if (after === void 0) {
                return false;
              }
              const nodeAfter = doc.nodeAt(after);
              if (nodeAfter) {
                return editor2.commands.command(({ tr }) => {
                  tr.setSelection(state.Selection.near(doc.resolve(after)));
                  return true;
                });
              }
              return editor2.commands.exitCode();
            }
          };
        },
        addInputRules() {
          return [
            core.textblockTypeInputRule({
              find: backtickInputRegex,
              type: this.type,
              getAttributes: (match) => ({
                language: match[1]
              })
            }),
            core.textblockTypeInputRule({
              find: tildeInputRegex,
              type: this.type,
              getAttributes: (match) => ({
                language: match[1]
              })
            })
          ];
        },
        addProseMirrorPlugins() {
          return [
            // this plugin creates a code block for pasted content from VS Code
            // we can also detect the copied code language
            new state.Plugin({
              key: new state.PluginKey("codeBlockVSCodeHandler"),
              props: {
                handlePaste: (view, event) => {
                  if (!event.clipboardData) {
                    return false;
                  }
                  if (this.editor.isActive(this.type.name)) {
                    return false;
                  }
                  const text = event.clipboardData.getData("text/plain");
                  const vscode = event.clipboardData.getData("vscode-editor-data");
                  const vscodeData = vscode ? JSON.parse(vscode) : void 0;
                  const language = vscodeData === null || vscodeData === void 0 ? void 0 : vscodeData.mode;
                  if (!text || !language) {
                    return false;
                  }
                  const { tr, schema } = view.state;
                  const textNode = schema.text(text.replace(/\r\n?/g, "\n"));
                  tr.replaceSelectionWith(this.type.create({ language }, textNode));
                  if (tr.selection.$from.parent.type !== this.type) {
                    tr.setSelection(state.TextSelection.near(tr.doc.resolve(Math.max(0, tr.selection.from - 2))));
                  }
                  tr.setMeta("paste", true);
                  view.dispatch(tr);
                  return true;
                }
              }
            })
          ];
        }
      });
      exports.CodeBlock = CodeBlock;
      exports.backtickInputRegex = backtickInputRegex;
      exports.default = CodeBlock;
      exports.tildeInputRegex = tildeInputRegex;
    }
  });

  // node_modules/@tiptap/extension-document/dist/index.cjs
  var require_dist22 = __commonJS({
    "node_modules/@tiptap/extension-document/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var Document = core.Node.create({
        name: "doc",
        topNode: true,
        content: "block+"
      });
      exports.Document = Document;
      exports.default = Document;
    }
  });

  // node_modules/prosemirror-dropcursor/dist/index.cjs
  var require_dist23 = __commonJS({
    "node_modules/prosemirror-dropcursor/dist/index.cjs"(exports) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var prosemirrorState = require_dist4();
      var prosemirrorTransform = require_dist3();
      function dropCursor() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return new prosemirrorState.Plugin({
          view: function view(editorView) {
            return new DropCursorView(editorView, options);
          }
        });
      }
      var DropCursorView = (function() {
        function DropCursorView2(editorView, options) {
          var _this = this;
          _classCallCheck(this, DropCursorView2);
          var _a;
          this.editorView = editorView;
          this.cursorPos = null;
          this.element = null;
          this.timeout = -1;
          this.width = (_a = options.width) !== null && _a !== void 0 ? _a : 1;
          this.color = options.color === false ? void 0 : options.color || "black";
          this["class"] = options["class"];
          this.handlers = ["dragover", "dragend", "drop", "dragleave"].map(function(name) {
            var handler = function handler2(e) {
              _this[name](e);
            };
            editorView.dom.addEventListener(name, handler);
            return {
              name,
              handler
            };
          });
        }
        _createClass(DropCursorView2, [{
          key: "destroy",
          value: function destroy() {
            var _this2 = this;
            this.handlers.forEach(function(_ref) {
              var name = _ref.name, handler = _ref.handler;
              return _this2.editorView.dom.removeEventListener(name, handler);
            });
          }
        }, {
          key: "update",
          value: function update(editorView, prevState) {
            if (this.cursorPos != null && prevState.doc != editorView.state.doc) {
              if (this.cursorPos > editorView.state.doc.content.size) this.setCursor(null);
              else this.updateOverlay();
            }
          }
        }, {
          key: "setCursor",
          value: function setCursor(pos) {
            if (pos == this.cursorPos) return;
            this.cursorPos = pos;
            if (pos == null) {
              this.element.parentNode.removeChild(this.element);
              this.element = null;
            } else {
              this.updateOverlay();
            }
          }
        }, {
          key: "updateOverlay",
          value: function updateOverlay() {
            var $pos = this.editorView.state.doc.resolve(this.cursorPos);
            var isBlock = !$pos.parent.inlineContent, rect;
            var editorDOM = this.editorView.dom, editorRect = editorDOM.getBoundingClientRect();
            var scaleX = editorRect.width / editorDOM.offsetWidth, scaleY = editorRect.height / editorDOM.offsetHeight;
            if (isBlock) {
              var before = $pos.nodeBefore, after = $pos.nodeAfter;
              if (before || after) {
                var node = this.editorView.nodeDOM(this.cursorPos - (before ? before.nodeSize : 0));
                if (node) {
                  var nodeRect = node.getBoundingClientRect();
                  var top = before ? nodeRect.bottom : nodeRect.top;
                  if (before && after) top = (top + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2;
                  var halfWidth = this.width / 2 * scaleY;
                  rect = {
                    left: nodeRect.left,
                    right: nodeRect.right,
                    top: top - halfWidth,
                    bottom: top + halfWidth
                  };
                }
              }
            }
            if (!rect) {
              var coords = this.editorView.coordsAtPos(this.cursorPos);
              var _halfWidth = this.width / 2 * scaleX;
              rect = {
                left: coords.left - _halfWidth,
                right: coords.left + _halfWidth,
                top: coords.top,
                bottom: coords.bottom
              };
            }
            var parent = this.editorView.dom.offsetParent;
            if (!this.element) {
              this.element = parent.appendChild(document.createElement("div"));
              if (this["class"]) this.element.className = this["class"];
              this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;";
              if (this.color) {
                this.element.style.backgroundColor = this.color;
              }
            }
            this.element.classList.toggle("prosemirror-dropcursor-block", isBlock);
            this.element.classList.toggle("prosemirror-dropcursor-inline", !isBlock);
            var parentLeft, parentTop;
            if (!parent || parent == document.body && getComputedStyle(parent).position == "static") {
              parentLeft = -pageXOffset;
              parentTop = -pageYOffset;
            } else {
              var _rect = parent.getBoundingClientRect();
              var parentScaleX = _rect.width / parent.offsetWidth, parentScaleY = _rect.height / parent.offsetHeight;
              parentLeft = _rect.left - parent.scrollLeft * parentScaleX;
              parentTop = _rect.top - parent.scrollTop * parentScaleY;
            }
            this.element.style.left = (rect.left - parentLeft) / scaleX + "px";
            this.element.style.top = (rect.top - parentTop) / scaleY + "px";
            this.element.style.width = (rect.right - rect.left) / scaleX + "px";
            this.element.style.height = (rect.bottom - rect.top) / scaleY + "px";
          }
        }, {
          key: "scheduleRemoval",
          value: function scheduleRemoval(timeout) {
            var _this3 = this;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function() {
              return _this3.setCursor(null);
            }, timeout);
          }
        }, {
          key: "dragover",
          value: function dragover(event) {
            if (!this.editorView.editable) return;
            var pos = this.editorView.posAtCoords({
              left: event.clientX,
              top: event.clientY
            });
            var node = pos && pos.inside >= 0 && this.editorView.state.doc.nodeAt(pos.inside);
            var disableDropCursor = node && node.type.spec.disableDropCursor;
            var disabled = typeof disableDropCursor == "function" ? disableDropCursor(this.editorView, pos, event) : disableDropCursor;
            if (pos && !disabled) {
              var target = pos.pos;
              if (this.editorView.dragging && this.editorView.dragging.slice) {
                var point = prosemirrorTransform.dropPoint(this.editorView.state.doc, target, this.editorView.dragging.slice);
                if (point != null) target = point;
              }
              this.setCursor(target);
              this.scheduleRemoval(5e3);
            }
          }
        }, {
          key: "dragend",
          value: function dragend() {
            this.scheduleRemoval(20);
          }
        }, {
          key: "drop",
          value: function drop() {
            this.scheduleRemoval(20);
          }
        }, {
          key: "dragleave",
          value: function dragleave(event) {
            if (!this.editorView.dom.contains(event.relatedTarget)) this.setCursor(null);
          }
        }]);
        return DropCursorView2;
      })();
      exports.dropCursor = dropCursor;
    }
  });

  // node_modules/@tiptap/pm/dropcursor/dist/index.cjs
  var require_dist24 = __commonJS({
    "node_modules/@tiptap/pm/dropcursor/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrordropcursor = require_dist23();
      _createStarExport(_prosemirrordropcursor);
    }
  });

  // node_modules/@tiptap/extension-dropcursor/dist/index.cjs
  var require_dist25 = __commonJS({
    "node_modules/@tiptap/extension-dropcursor/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var dropcursor = require_dist24();
      var Dropcursor = core.Extension.create({
        name: "dropCursor",
        addOptions() {
          return {
            color: "currentColor",
            width: 1,
            class: void 0
          };
        },
        addProseMirrorPlugins() {
          return [
            dropcursor.dropCursor(this.options)
          ];
        }
      });
      exports.Dropcursor = Dropcursor;
      exports.default = Dropcursor;
    }
  });

  // node_modules/prosemirror-gapcursor/dist/index.cjs
  var require_dist26 = __commonJS({
    "node_modules/prosemirror-gapcursor/dist/index.cjs"(exports) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
        Object.defineProperty(subClass, "prototype", { writable: false });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self);
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      var prosemirrorKeymap = require_dist8();
      var prosemirrorState = require_dist4();
      var prosemirrorModel = require_dist2();
      var prosemirrorView = require_dist6();
      var GapCursor = (function(_prosemirrorState$Sel) {
        _inherits(GapCursor2, _prosemirrorState$Sel);
        var _super = _createSuper(GapCursor2);
        function GapCursor2($pos) {
          _classCallCheck(this, GapCursor2);
          return _super.call(this, $pos, $pos);
        }
        _createClass(GapCursor2, [{
          key: "map",
          value: function map(doc, mapping) {
            var $pos = doc.resolve(mapping.map(this.head));
            return GapCursor2.valid($pos) ? new GapCursor2($pos) : prosemirrorState.Selection.near($pos);
          }
        }, {
          key: "content",
          value: function content() {
            return prosemirrorModel.Slice.empty;
          }
        }, {
          key: "eq",
          value: function eq(other) {
            return other instanceof GapCursor2 && other.head == this.head;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              type: "gapcursor",
              pos: this.head
            };
          }
        }, {
          key: "getBookmark",
          value: function getBookmark() {
            return new GapBookmark(this.anchor);
          }
        }], [{
          key: "fromJSON",
          value: function fromJSON(doc, json) {
            if (typeof json.pos != "number") throw new RangeError("Invalid input for GapCursor.fromJSON");
            return new GapCursor2(doc.resolve(json.pos));
          }
        }, {
          key: "valid",
          value: function valid($pos) {
            var parent = $pos.parent;
            if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos)) return false;
            var override = parent.type.spec.allowGapCursor;
            if (override != null) return override;
            var deflt = parent.contentMatchAt($pos.index()).defaultType;
            return deflt && deflt.isTextblock;
          }
        }, {
          key: "findGapCursorFrom",
          value: function findGapCursorFrom($pos, dir) {
            var mustMove = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
            search: for (; ; ) {
              if (!mustMove && GapCursor2.valid($pos)) return $pos;
              var pos = $pos.pos, next = null;
              for (var d = $pos.depth; ; d--) {
                var parent = $pos.node(d);
                if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
                  next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
                  break;
                } else if (d == 0) {
                  return null;
                }
                pos += dir;
                var $cur = $pos.doc.resolve(pos);
                if (GapCursor2.valid($cur)) return $cur;
              }
              for (; ; ) {
                var inside = dir > 0 ? next.firstChild : next.lastChild;
                if (!inside) {
                  if (next.isAtom && !next.isText && !prosemirrorState.NodeSelection.isSelectable(next)) {
                    $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
                    mustMove = false;
                    continue search;
                  }
                  break;
                }
                next = inside;
                pos += dir;
                var _$cur = $pos.doc.resolve(pos);
                if (GapCursor2.valid(_$cur)) return _$cur;
              }
              return null;
            }
          }
        }]);
        return GapCursor2;
      })(prosemirrorState.Selection);
      GapCursor.prototype.visible = false;
      GapCursor.findFrom = GapCursor.findGapCursorFrom;
      prosemirrorState.Selection.jsonID("gapcursor", GapCursor);
      var GapBookmark = (function() {
        function GapBookmark2(pos) {
          _classCallCheck(this, GapBookmark2);
          this.pos = pos;
        }
        _createClass(GapBookmark2, [{
          key: "map",
          value: function map(mapping) {
            return new GapBookmark2(mapping.map(this.pos));
          }
        }, {
          key: "resolve",
          value: function resolve(doc) {
            var $pos = doc.resolve(this.pos);
            return GapCursor.valid($pos) ? new GapCursor($pos) : prosemirrorState.Selection.near($pos);
          }
        }]);
        return GapBookmark2;
      })();
      function needsGap(type) {
        return type.isAtom || type.spec.isolating || type.spec.createGapCursor;
      }
      function closedBefore($pos) {
        for (var d = $pos.depth; d >= 0; d--) {
          var index = $pos.index(d), parent = $pos.node(d);
          if (index == 0) {
            if (parent.type.spec.isolating) return true;
            continue;
          }
          for (var before = parent.child(index - 1); ; before = before.lastChild) {
            if (before.childCount == 0 && !before.inlineContent || needsGap(before.type)) return true;
            if (before.inlineContent) return false;
          }
        }
        return true;
      }
      function closedAfter($pos) {
        for (var d = $pos.depth; d >= 0; d--) {
          var index = $pos.indexAfter(d), parent = $pos.node(d);
          if (index == parent.childCount) {
            if (parent.type.spec.isolating) return true;
            continue;
          }
          for (var after = parent.child(index); ; after = after.firstChild) {
            if (after.childCount == 0 && !after.inlineContent || needsGap(after.type)) return true;
            if (after.inlineContent) return false;
          }
        }
        return true;
      }
      function gapCursor() {
        return new prosemirrorState.Plugin({
          props: {
            decorations: drawGapCursor,
            createSelectionBetween: function createSelectionBetween(_view, $anchor, $head) {
              return $anchor.pos == $head.pos && GapCursor.valid($head) ? new GapCursor($head) : null;
            },
            handleClick,
            handleKeyDown,
            handleDOMEvents: {
              beforeinput
            }
          }
        });
      }
      var handleKeyDown = prosemirrorKeymap.keydownHandler({
        "ArrowLeft": arrow("horiz", -1),
        "ArrowRight": arrow("horiz", 1),
        "ArrowUp": arrow("vert", -1),
        "ArrowDown": arrow("vert", 1)
      });
      function arrow(axis, dir) {
        var dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
        return function(state, dispatch, view) {
          var sel = state.selection;
          var $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
          if (sel instanceof prosemirrorState.TextSelection) {
            if (!view.endOfTextblock(dirStr) || $start.depth == 0) return false;
            mustMove = false;
            $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
          }
          var $found = GapCursor.findGapCursorFrom($start, dir, mustMove);
          if (!$found) return false;
          if (dispatch) dispatch(state.tr.setSelection(new GapCursor($found)));
          return true;
        };
      }
      function handleClick(view, pos, event) {
        if (!view || !view.editable) return false;
        var $pos = view.state.doc.resolve(pos);
        if (!GapCursor.valid($pos)) return false;
        var clickPos = view.posAtCoords({
          left: event.clientX,
          top: event.clientY
        });
        if (clickPos && clickPos.inside > -1 && prosemirrorState.NodeSelection.isSelectable(view.state.doc.nodeAt(clickPos.inside))) return false;
        view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
        return true;
      }
      function beforeinput(view, event) {
        if (event.inputType != "insertCompositionText" || !(view.state.selection instanceof GapCursor)) return false;
        var $from = view.state.selection.$from;
        var insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);
        if (!insert) return false;
        var frag = prosemirrorModel.Fragment.empty;
        for (var i = insert.length - 1; i >= 0; i--) frag = prosemirrorModel.Fragment.from(insert[i].createAndFill(null, frag));
        var tr = view.state.tr.replace($from.pos, $from.pos, new prosemirrorModel.Slice(frag, 0, 0));
        tr.setSelection(prosemirrorState.TextSelection.near(tr.doc.resolve($from.pos + 1)));
        view.dispatch(tr);
        return false;
      }
      function drawGapCursor(state) {
        if (!(state.selection instanceof GapCursor)) return null;
        var node = document.createElement("div");
        node.className = "ProseMirror-gapcursor";
        return prosemirrorView.DecorationSet.create(state.doc, [prosemirrorView.Decoration.widget(state.selection.head, node, {
          key: "gapcursor"
        })]);
      }
      exports.GapCursor = GapCursor;
      exports.gapCursor = gapCursor;
    }
  });

  // node_modules/@tiptap/pm/gapcursor/dist/index.cjs
  var require_dist27 = __commonJS({
    "node_modules/@tiptap/pm/gapcursor/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrorgapcursor = require_dist26();
      _createStarExport(_prosemirrorgapcursor);
    }
  });

  // node_modules/@tiptap/extension-gapcursor/dist/index.cjs
  var require_dist28 = __commonJS({
    "node_modules/@tiptap/extension-gapcursor/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var gapcursor = require_dist27();
      var Gapcursor = core.Extension.create({
        name: "gapCursor",
        addProseMirrorPlugins() {
          return [
            gapcursor.gapCursor()
          ];
        },
        extendNodeSchema(extension) {
          var _a;
          const context = {
            name: extension.name,
            options: extension.options,
            storage: extension.storage
          };
          return {
            allowGapCursor: (_a = core.callOrReturn(core.getExtensionField(extension, "allowGapCursor", context))) !== null && _a !== void 0 ? _a : null
          };
        }
      });
      exports.Gapcursor = Gapcursor;
      exports.default = Gapcursor;
    }
  });

  // node_modules/@tiptap/extension-hard-break/dist/index.cjs
  var require_dist29 = __commonJS({
    "node_modules/@tiptap/extension-hard-break/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var HardBreak = core.Node.create({
        name: "hardBreak",
        addOptions() {
          return {
            keepMarks: true,
            HTMLAttributes: {}
          };
        },
        inline: true,
        group: "inline",
        selectable: false,
        linebreakReplacement: true,
        parseHTML() {
          return [
            { tag: "br" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["br", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
        },
        renderText() {
          return "\n";
        },
        addCommands() {
          return {
            setHardBreak: () => ({ commands, chain, state, editor: editor2 }) => {
              return commands.first([
                () => commands.exitCode(),
                () => commands.command(() => {
                  const { selection, storedMarks } = state;
                  if (selection.$from.parent.type.spec.isolating) {
                    return false;
                  }
                  const { keepMarks } = this.options;
                  const { splittableMarks } = editor2.extensionManager;
                  const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
                  return chain().insertContent({ type: this.name }).command(({ tr, dispatch }) => {
                    if (dispatch && marks && keepMarks) {
                      const filteredMarks = marks.filter((mark) => splittableMarks.includes(mark.type.name));
                      tr.ensureMarks(filteredMarks);
                    }
                    return true;
                  }).run();
                })
              ]);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Enter": () => this.editor.commands.setHardBreak(),
            "Shift-Enter": () => this.editor.commands.setHardBreak()
          };
        }
      });
      exports.HardBreak = HardBreak;
      exports.default = HardBreak;
    }
  });

  // node_modules/@tiptap/extension-heading/dist/index.cjs
  var require_dist30 = __commonJS({
    "node_modules/@tiptap/extension-heading/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var Heading = core.Node.create({
        name: "heading",
        addOptions() {
          return {
            levels: [1, 2, 3, 4, 5, 6],
            HTMLAttributes: {}
          };
        },
        content: "inline*",
        group: "block",
        defining: true,
        addAttributes() {
          return {
            level: {
              default: 1,
              rendered: false
            }
          };
        },
        parseHTML() {
          return this.options.levels.map((level) => ({
            tag: `h${level}`,
            attrs: { level }
          }));
        },
        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level = hasLevel ? node.attrs.level : this.options.levels[0];
          return [`h${level}`, core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setHeading: (attributes) => ({ commands }) => {
              if (!this.options.levels.includes(attributes.level)) {
                return false;
              }
              return commands.setNode(this.name, attributes);
            },
            toggleHeading: (attributes) => ({ commands }) => {
              if (!this.options.levels.includes(attributes.level)) {
                return false;
              }
              return commands.toggleNode(this.name, "paragraph", attributes);
            }
          };
        },
        addKeyboardShortcuts() {
          return this.options.levels.reduce((items, level) => ({
            ...items,
            ...{
              [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
            }
          }), {});
        },
        addInputRules() {
          return this.options.levels.map((level) => {
            return core.textblockTypeInputRule({
              find: new RegExp(`^(#{${Math.min(...this.options.levels)},${level}})\\s$`),
              type: this.type,
              getAttributes: {
                level
              }
            });
          });
        }
      });
      exports.Heading = Heading;
      exports.default = Heading;
    }
  });

  // node_modules/rope-sequence/dist/index.cjs
  var require_dist31 = __commonJS({
    "node_modules/rope-sequence/dist/index.cjs"(exports, module) {
      "use strict";
      var GOOD_LEAF_SIZE = 200;
      var RopeSequence = function RopeSequence2() {
      };
      RopeSequence.prototype.append = function append(other) {
        if (!other.length) {
          return this;
        }
        other = RopeSequence.from(other);
        return !this.length && other || other.length < GOOD_LEAF_SIZE && this.leafAppend(other) || this.length < GOOD_LEAF_SIZE && other.leafPrepend(this) || this.appendInner(other);
      };
      RopeSequence.prototype.prepend = function prepend(other) {
        if (!other.length) {
          return this;
        }
        return RopeSequence.from(other).append(this);
      };
      RopeSequence.prototype.appendInner = function appendInner(other) {
        return new Append(this, other);
      };
      RopeSequence.prototype.slice = function slice(from, to) {
        if (from === void 0) from = 0;
        if (to === void 0) to = this.length;
        if (from >= to) {
          return RopeSequence.empty;
        }
        return this.sliceInner(Math.max(0, from), Math.min(this.length, to));
      };
      RopeSequence.prototype.get = function get(i) {
        if (i < 0 || i >= this.length) {
          return void 0;
        }
        return this.getInner(i);
      };
      RopeSequence.prototype.forEach = function forEach(f, from, to) {
        if (from === void 0) from = 0;
        if (to === void 0) to = this.length;
        if (from <= to) {
          this.forEachInner(f, from, to, 0);
        } else {
          this.forEachInvertedInner(f, from, to, 0);
        }
      };
      RopeSequence.prototype.map = function map(f, from, to) {
        if (from === void 0) from = 0;
        if (to === void 0) to = this.length;
        var result = [];
        this.forEach(function(elt, i) {
          return result.push(f(elt, i));
        }, from, to);
        return result;
      };
      RopeSequence.from = function from(values) {
        if (values instanceof RopeSequence) {
          return values;
        }
        return values && values.length ? new Leaf(values) : RopeSequence.empty;
      };
      var Leaf = /* @__PURE__ */ (function(RopeSequence2) {
        function Leaf2(values) {
          RopeSequence2.call(this);
          this.values = values;
        }
        if (RopeSequence2) Leaf2.__proto__ = RopeSequence2;
        Leaf2.prototype = Object.create(RopeSequence2 && RopeSequence2.prototype);
        Leaf2.prototype.constructor = Leaf2;
        var prototypeAccessors = { length: { configurable: true }, depth: { configurable: true } };
        Leaf2.prototype.flatten = function flatten() {
          return this.values;
        };
        Leaf2.prototype.sliceInner = function sliceInner(from, to) {
          if (from == 0 && to == this.length) {
            return this;
          }
          return new Leaf2(this.values.slice(from, to));
        };
        Leaf2.prototype.getInner = function getInner(i) {
          return this.values[i];
        };
        Leaf2.prototype.forEachInner = function forEachInner(f, from, to, start) {
          for (var i = from; i < to; i++) {
            if (f(this.values[i], start + i) === false) {
              return false;
            }
          }
        };
        Leaf2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from, to, start) {
          for (var i = from - 1; i >= to; i--) {
            if (f(this.values[i], start + i) === false) {
              return false;
            }
          }
        };
        Leaf2.prototype.leafAppend = function leafAppend(other) {
          if (this.length + other.length <= GOOD_LEAF_SIZE) {
            return new Leaf2(this.values.concat(other.flatten()));
          }
        };
        Leaf2.prototype.leafPrepend = function leafPrepend(other) {
          if (this.length + other.length <= GOOD_LEAF_SIZE) {
            return new Leaf2(other.flatten().concat(this.values));
          }
        };
        prototypeAccessors.length.get = function() {
          return this.values.length;
        };
        prototypeAccessors.depth.get = function() {
          return 0;
        };
        Object.defineProperties(Leaf2.prototype, prototypeAccessors);
        return Leaf2;
      })(RopeSequence);
      RopeSequence.empty = new Leaf([]);
      var Append = /* @__PURE__ */ (function(RopeSequence2) {
        function Append2(left, right) {
          RopeSequence2.call(this);
          this.left = left;
          this.right = right;
          this.length = left.length + right.length;
          this.depth = Math.max(left.depth, right.depth) + 1;
        }
        if (RopeSequence2) Append2.__proto__ = RopeSequence2;
        Append2.prototype = Object.create(RopeSequence2 && RopeSequence2.prototype);
        Append2.prototype.constructor = Append2;
        Append2.prototype.flatten = function flatten() {
          return this.left.flatten().concat(this.right.flatten());
        };
        Append2.prototype.getInner = function getInner(i) {
          return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length);
        };
        Append2.prototype.forEachInner = function forEachInner(f, from, to, start) {
          var leftLen = this.left.length;
          if (from < leftLen && this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false) {
            return false;
          }
          if (to > leftLen && this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false) {
            return false;
          }
        };
        Append2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from, to, start) {
          var leftLen = this.left.length;
          if (from > leftLen && this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false) {
            return false;
          }
          if (to < leftLen && this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false) {
            return false;
          }
        };
        Append2.prototype.sliceInner = function sliceInner(from, to) {
          if (from == 0 && to == this.length) {
            return this;
          }
          var leftLen = this.left.length;
          if (to <= leftLen) {
            return this.left.slice(from, to);
          }
          if (from >= leftLen) {
            return this.right.slice(from - leftLen, to - leftLen);
          }
          return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen));
        };
        Append2.prototype.leafAppend = function leafAppend(other) {
          var inner = this.right.leafAppend(other);
          if (inner) {
            return new Append2(this.left, inner);
          }
        };
        Append2.prototype.leafPrepend = function leafPrepend(other) {
          var inner = this.left.leafPrepend(other);
          if (inner) {
            return new Append2(inner, this.right);
          }
        };
        Append2.prototype.appendInner = function appendInner(other) {
          if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1) {
            return new Append2(this.left, new Append2(this.right, other));
          }
          return new Append2(this, other);
        };
        return Append2;
      })(RopeSequence);
      module.exports = RopeSequence;
    }
  });

  // node_modules/prosemirror-history/dist/index.cjs
  var require_dist32 = __commonJS({
    "node_modules/prosemirror-history/dist/index.cjs"(exports) {
      "use strict";
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", { writable: false });
        return Constructor;
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
      }
      function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (_typeof(res) !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      var RopeSequence = require_dist31();
      var prosemirrorTransform = require_dist3();
      var prosemirrorState = require_dist4();
      var max_empty_items = 500;
      var Branch = (function() {
        function Branch2(items, eventCount) {
          _classCallCheck(this, Branch2);
          this.items = items;
          this.eventCount = eventCount;
        }
        _createClass(Branch2, [{
          key: "popEvent",
          value: function popEvent(state, preserveItems) {
            var _this = this;
            if (this.eventCount == 0) return null;
            var end = this.items.length;
            for (; ; end--) {
              var next = this.items.get(end - 1);
              if (next.selection) {
                --end;
                break;
              }
            }
            var remap, mapFrom;
            if (preserveItems) {
              remap = this.remapping(end, this.items.length);
              mapFrom = remap.maps.length;
            }
            var transform = state.tr;
            var selection, remaining;
            var addAfter = [], addBefore = [];
            this.items.forEach(function(item, i) {
              if (!item.step) {
                if (!remap) {
                  remap = _this.remapping(end, i + 1);
                  mapFrom = remap.maps.length;
                }
                mapFrom--;
                addBefore.push(item);
                return;
              }
              if (remap) {
                addBefore.push(new Item(item.map));
                var step = item.step.map(remap.slice(mapFrom)), map;
                if (step && transform.maybeStep(step).doc) {
                  map = transform.mapping.maps[transform.mapping.maps.length - 1];
                  addAfter.push(new Item(map, void 0, void 0, addAfter.length + addBefore.length));
                }
                mapFrom--;
                if (map) remap.appendMap(map, mapFrom);
              } else {
                transform.maybeStep(item.step);
              }
              if (item.selection) {
                selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
                remaining = new Branch2(_this.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), _this.eventCount - 1);
                return false;
              }
            }, this.items.length, 0);
            return {
              remaining,
              transform,
              selection
            };
          }
        }, {
          key: "addTransform",
          value: function addTransform(transform, selection, histOptions, preserveItems) {
            var newItems = [], eventCount = this.eventCount;
            var oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
            for (var i = 0; i < transform.steps.length; i++) {
              var step = transform.steps[i].invert(transform.docs[i]);
              var item = new Item(transform.mapping.maps[i], step, selection), merged = void 0;
              if (merged = lastItem && lastItem.merge(item)) {
                item = merged;
                if (i) newItems.pop();
                else oldItems = oldItems.slice(0, oldItems.length - 1);
              }
              newItems.push(item);
              if (selection) {
                eventCount++;
                selection = void 0;
              }
              if (!preserveItems) lastItem = item;
            }
            var overflow = eventCount - histOptions.depth;
            if (overflow > DEPTH_OVERFLOW) {
              oldItems = cutOffEvents(oldItems, overflow);
              eventCount -= overflow;
            }
            return new Branch2(oldItems.append(newItems), eventCount);
          }
        }, {
          key: "remapping",
          value: function remapping(from, to) {
            var maps = new prosemirrorTransform.Mapping();
            this.items.forEach(function(item, i) {
              var mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from ? maps.maps.length - item.mirrorOffset : void 0;
              maps.appendMap(item.map, mirrorPos);
            }, from, to);
            return maps;
          }
        }, {
          key: "addMaps",
          value: function addMaps(array) {
            if (this.eventCount == 0) return this;
            return new Branch2(this.items.append(array.map(function(map) {
              return new Item(map);
            })), this.eventCount);
          }
        }, {
          key: "rebased",
          value: function rebased(rebasedTransform, rebasedCount) {
            if (!this.eventCount) return this;
            var rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);
            var mapping = rebasedTransform.mapping;
            var newUntil = rebasedTransform.steps.length;
            var eventCount = this.eventCount;
            this.items.forEach(function(item) {
              if (item.selection) eventCount--;
            }, start);
            var iRebased = rebasedCount;
            this.items.forEach(function(item) {
              var pos = mapping.getMirror(--iRebased);
              if (pos == null) return;
              newUntil = Math.min(newUntil, pos);
              var map = mapping.maps[pos];
              if (item.step) {
                var step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
                var selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
                if (selection) eventCount++;
                rebasedItems.push(new Item(map, step, selection));
              } else {
                rebasedItems.push(new Item(map));
              }
            }, start);
            var newMaps = [];
            for (var i = rebasedCount; i < newUntil; i++) newMaps.push(new Item(mapping.maps[i]));
            var items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
            var branch = new Branch2(items, eventCount);
            if (branch.emptyItemCount() > max_empty_items) branch = branch.compress(this.items.length - rebasedItems.length);
            return branch;
          }
        }, {
          key: "emptyItemCount",
          value: function emptyItemCount() {
            var count = 0;
            this.items.forEach(function(item) {
              if (!item.step) count++;
            });
            return count;
          }
        }, {
          key: "compress",
          value: function compress() {
            var upto = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.items.length;
            var remap = this.remapping(0, upto), mapFrom = remap.maps.length;
            var items = [], events = 0;
            this.items.forEach(function(item, i) {
              if (i >= upto) {
                items.push(item);
                if (item.selection) events++;
              } else if (item.step) {
                var step = item.step.map(remap.slice(mapFrom)), map = step && step.getMap();
                mapFrom--;
                if (map) remap.appendMap(map, mapFrom);
                if (step) {
                  var selection = item.selection && item.selection.map(remap.slice(mapFrom));
                  if (selection) events++;
                  var newItem = new Item(map.invert(), step, selection), merged, last = items.length - 1;
                  if (merged = items.length && items[last].merge(newItem)) items[last] = merged;
                  else items.push(newItem);
                }
              } else if (item.map) {
                mapFrom--;
              }
            }, this.items.length, 0);
            return new Branch2(RopeSequence.from(items.reverse()), events);
          }
        }]);
        return Branch2;
      })();
      Branch.empty = new Branch(RopeSequence.empty, 0);
      function cutOffEvents(items, n) {
        var cutPoint;
        items.forEach(function(item, i) {
          if (item.selection && n-- == 0) {
            cutPoint = i;
            return false;
          }
        });
        return items.slice(cutPoint);
      }
      var Item = (function() {
        function Item2(map, step, selection, mirrorOffset) {
          _classCallCheck(this, Item2);
          this.map = map;
          this.step = step;
          this.selection = selection;
          this.mirrorOffset = mirrorOffset;
        }
        _createClass(Item2, [{
          key: "merge",
          value: function merge(other) {
            if (this.step && other.step && !other.selection) {
              var step = other.step.merge(this.step);
              if (step) return new Item2(step.getMap().invert(), step, this.selection);
            }
          }
        }]);
        return Item2;
      })();
      var HistoryState = _createClass(function HistoryState2(done, undone, prevRanges, prevTime, prevComposition) {
        _classCallCheck(this, HistoryState2);
        this.done = done;
        this.undone = undone;
        this.prevRanges = prevRanges;
        this.prevTime = prevTime;
        this.prevComposition = prevComposition;
      });
      var DEPTH_OVERFLOW = 20;
      function applyTransaction(history2, state, tr, options) {
        var historyTr = tr.getMeta(historyKey), rebased;
        if (historyTr) return historyTr.historyState;
        if (tr.getMeta(closeHistoryKey)) history2 = new HistoryState(history2.done, history2.undone, null, 0, -1);
        var appended = tr.getMeta("appendedTransaction");
        if (tr.steps.length == 0) {
          return history2;
        } else if (appended && appended.getMeta(historyKey)) {
          if (appended.getMeta(historyKey).redo) return new HistoryState(history2.done.addTransform(tr, void 0, options, mustPreserveItems(state)), history2.undone, rangesFor(tr.mapping.maps), history2.prevTime, history2.prevComposition);
          else return new HistoryState(history2.done, history2.undone.addTransform(tr, void 0, options, mustPreserveItems(state)), null, history2.prevTime, history2.prevComposition);
        } else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
          var composition = tr.getMeta("composition");
          var newGroup = history2.prevTime == 0 || !appended && history2.prevComposition != composition && (history2.prevTime < (tr.time || 0) - options.newGroupDelay || !isAdjacentTo(tr, history2.prevRanges));
          var prevRanges = appended ? mapRanges(history2.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps);
          return new HistoryState(history2.done.addTransform(tr, newGroup ? state.selection.getBookmark() : void 0, options, mustPreserveItems(state)), Branch.empty, prevRanges, tr.time, composition == null ? history2.prevComposition : composition);
        } else if (rebased = tr.getMeta("rebased")) {
          return new HistoryState(history2.done.rebased(tr, rebased), history2.undone.rebased(tr, rebased), mapRanges(history2.prevRanges, tr.mapping), history2.prevTime, history2.prevComposition);
        } else {
          return new HistoryState(history2.done.addMaps(tr.mapping.maps), history2.undone.addMaps(tr.mapping.maps), mapRanges(history2.prevRanges, tr.mapping), history2.prevTime, history2.prevComposition);
        }
      }
      function isAdjacentTo(transform, prevRanges) {
        if (!prevRanges) return false;
        if (!transform.docChanged) return true;
        var adjacent = false;
        transform.mapping.maps[0].forEach(function(start, end) {
          for (var i = 0; i < prevRanges.length; i += 2) if (start <= prevRanges[i + 1] && end >= prevRanges[i]) adjacent = true;
        });
        return adjacent;
      }
      function rangesFor(maps) {
        var result = [];
        for (var i = maps.length - 1; i >= 0 && result.length == 0; i--) maps[i].forEach(function(_from, _to, from, to) {
          return result.push(from, to);
        });
        return result;
      }
      function mapRanges(ranges, mapping) {
        if (!ranges) return null;
        var result = [];
        for (var i = 0; i < ranges.length; i += 2) {
          var from = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
          if (from <= to) result.push(from, to);
        }
        return result;
      }
      function histTransaction(history2, state, redo2) {
        var preserveItems = mustPreserveItems(state);
        var histOptions = historyKey.get(state).spec.config;
        var pop = (redo2 ? history2.undone : history2.done).popEvent(state, preserveItems);
        if (!pop) return null;
        var selection = pop.selection.resolve(pop.transform.doc);
        var added = (redo2 ? history2.done : history2.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
        var newHist = new HistoryState(redo2 ? added : pop.remaining, redo2 ? pop.remaining : added, null, 0, -1);
        return pop.transform.setSelection(selection).setMeta(historyKey, {
          redo: redo2,
          historyState: newHist
        });
      }
      var cachedPreserveItems = false;
      var cachedPreserveItemsPlugins = null;
      function mustPreserveItems(state) {
        var plugins = state.plugins;
        if (cachedPreserveItemsPlugins != plugins) {
          cachedPreserveItems = false;
          cachedPreserveItemsPlugins = plugins;
          for (var i = 0; i < plugins.length; i++) if (plugins[i].spec.historyPreserveItems) {
            cachedPreserveItems = true;
            break;
          }
        }
        return cachedPreserveItems;
      }
      function closeHistory(tr) {
        return tr.setMeta(closeHistoryKey, true);
      }
      var historyKey = new prosemirrorState.PluginKey("history");
      var closeHistoryKey = new prosemirrorState.PluginKey("closeHistory");
      function history() {
        var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        config = {
          depth: config.depth || 100,
          newGroupDelay: config.newGroupDelay || 500
        };
        return new prosemirrorState.Plugin({
          key: historyKey,
          state: {
            init: function init2() {
              return new HistoryState(Branch.empty, Branch.empty, null, 0, -1);
            },
            apply: function apply(tr, hist, state) {
              return applyTransaction(hist, state, tr, config);
            }
          },
          config,
          props: {
            handleDOMEvents: {
              beforeinput: function beforeinput(view, e) {
                var inputType = e.inputType;
                var command = inputType == "historyUndo" ? undo : inputType == "historyRedo" ? redo : null;
                if (!command) return false;
                e.preventDefault();
                return command(view.state, view.dispatch);
              }
            }
          }
        });
      }
      function buildCommand(redo2, scroll) {
        return function(state, dispatch) {
          var hist = historyKey.getState(state);
          if (!hist || (redo2 ? hist.undone : hist.done).eventCount == 0) return false;
          if (dispatch) {
            var tr = histTransaction(hist, state, redo2);
            if (tr) dispatch(scroll ? tr.scrollIntoView() : tr);
          }
          return true;
        };
      }
      var undo = buildCommand(false, true);
      var redo = buildCommand(true, true);
      var undoNoScroll = buildCommand(false, false);
      var redoNoScroll = buildCommand(true, false);
      function undoDepth(state) {
        var hist = historyKey.getState(state);
        return hist ? hist.done.eventCount : 0;
      }
      function redoDepth(state) {
        var hist = historyKey.getState(state);
        return hist ? hist.undone.eventCount : 0;
      }
      exports.closeHistory = closeHistory;
      exports.history = history;
      exports.redo = redo;
      exports.redoDepth = redoDepth;
      exports.redoNoScroll = redoNoScroll;
      exports.undo = undo;
      exports.undoDepth = undoDepth;
      exports.undoNoScroll = undoNoScroll;
    }
  });

  // node_modules/@tiptap/pm/history/dist/index.cjs
  var require_dist33 = __commonJS({
    "node_modules/@tiptap/pm/history/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrorhistory = require_dist32();
      _createStarExport(_prosemirrorhistory);
    }
  });

  // node_modules/@tiptap/extension-history/dist/index.cjs
  var require_dist34 = __commonJS({
    "node_modules/@tiptap/extension-history/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var history = require_dist33();
      var History = core.Extension.create({
        name: "history",
        addOptions() {
          return {
            depth: 100,
            newGroupDelay: 500
          };
        },
        addCommands() {
          return {
            undo: () => ({ state, dispatch }) => {
              return history.undo(state, dispatch);
            },
            redo: () => ({ state, dispatch }) => {
              return history.redo(state, dispatch);
            }
          };
        },
        addProseMirrorPlugins() {
          return [
            history.history(this.options)
          ];
        },
        addKeyboardShortcuts() {
          return {
            "Mod-z": () => this.editor.commands.undo(),
            "Shift-Mod-z": () => this.editor.commands.redo(),
            "Mod-y": () => this.editor.commands.redo(),
            // Russian keyboard layouts
            "Mod-\u044F": () => this.editor.commands.undo(),
            "Shift-Mod-\u044F": () => this.editor.commands.redo()
          };
        }
      });
      exports.History = History;
      exports.default = History;
    }
  });

  // node_modules/@tiptap/extension-horizontal-rule/dist/index.cjs
  var require_dist35 = __commonJS({
    "node_modules/@tiptap/extension-horizontal-rule/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var state = require_dist5();
      var HorizontalRule = core.Node.create({
        name: "horizontalRule",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        group: "block",
        parseHTML() {
          return [{ tag: "hr" }];
        },
        renderHTML({ HTMLAttributes }) {
          return ["hr", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
        },
        addCommands() {
          return {
            setHorizontalRule: () => ({ chain, state: state$1 }) => {
              if (!core.canInsertNode(state$1, state$1.schema.nodes[this.name])) {
                return false;
              }
              const { selection } = state$1;
              const { $from: $originFrom, $to: $originTo } = selection;
              const currentChain = chain();
              if ($originFrom.parentOffset === 0) {
                currentChain.insertContentAt({
                  from: Math.max($originFrom.pos - 1, 0),
                  to: $originTo.pos
                }, {
                  type: this.name
                });
              } else if (core.isNodeSelection(selection)) {
                currentChain.insertContentAt($originTo.pos, {
                  type: this.name
                });
              } else {
                currentChain.insertContent({ type: this.name });
              }
              return currentChain.command(({ tr, dispatch }) => {
                var _a;
                if (dispatch) {
                  const { $to } = tr.selection;
                  const posAfter = $to.end();
                  if ($to.nodeAfter) {
                    if ($to.nodeAfter.isTextblock) {
                      tr.setSelection(state.TextSelection.create(tr.doc, $to.pos + 1));
                    } else if ($to.nodeAfter.isBlock) {
                      tr.setSelection(state.NodeSelection.create(tr.doc, $to.pos));
                    } else {
                      tr.setSelection(state.TextSelection.create(tr.doc, $to.pos));
                    }
                  } else {
                    const node = (_a = $to.parent.type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.create();
                    if (node) {
                      tr.insert(posAfter, node);
                      tr.setSelection(state.TextSelection.create(tr.doc, posAfter + 1));
                    }
                  }
                  tr.scrollIntoView();
                }
                return true;
              }).run();
            }
          };
        },
        addInputRules() {
          return [
            core.nodeInputRule({
              find: /^(?:---|—-|___\s|\*\*\*\s)$/,
              type: this.type
            })
          ];
        }
      });
      exports.HorizontalRule = HorizontalRule;
      exports.default = HorizontalRule;
    }
  });

  // node_modules/@tiptap/extension-italic/dist/index.cjs
  var require_dist36 = __commonJS({
    "node_modules/@tiptap/extension-italic/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var starInputRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
      var starPasteRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;
      var underscoreInputRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/;
      var underscorePasteRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g;
      var Italic = core.Mark.create({
        name: "italic",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        parseHTML() {
          return [
            {
              tag: "em"
            },
            {
              tag: "i",
              getAttrs: (node) => node.style.fontStyle !== "normal" && null
            },
            {
              style: "font-style=normal",
              clearMark: (mark) => mark.type.name === this.name
            },
            {
              style: "font-style=italic"
            }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["em", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setItalic: () => ({ commands }) => {
              return commands.setMark(this.name);
            },
            toggleItalic: () => ({ commands }) => {
              return commands.toggleMark(this.name);
            },
            unsetItalic: () => ({ commands }) => {
              return commands.unsetMark(this.name);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-i": () => this.editor.commands.toggleItalic(),
            "Mod-I": () => this.editor.commands.toggleItalic()
          };
        },
        addInputRules() {
          return [
            core.markInputRule({
              find: starInputRegex,
              type: this.type
            }),
            core.markInputRule({
              find: underscoreInputRegex,
              type: this.type
            })
          ];
        },
        addPasteRules() {
          return [
            core.markPasteRule({
              find: starPasteRegex,
              type: this.type
            }),
            core.markPasteRule({
              find: underscorePasteRegex,
              type: this.type
            })
          ];
        }
      });
      exports.Italic = Italic;
      exports.default = Italic;
      exports.starInputRegex = starInputRegex;
      exports.starPasteRegex = starPasteRegex;
      exports.underscoreInputRegex = underscoreInputRegex;
      exports.underscorePasteRegex = underscorePasteRegex;
    }
  });

  // node_modules/@tiptap/extension-list-item/dist/index.cjs
  var require_dist37 = __commonJS({
    "node_modules/@tiptap/extension-list-item/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var ListItem = core.Node.create({
        name: "listItem",
        addOptions() {
          return {
            HTMLAttributes: {},
            bulletListTypeName: "bulletList",
            orderedListTypeName: "orderedList"
          };
        },
        content: "paragraph block*",
        defining: true,
        parseHTML() {
          return [
            {
              tag: "li"
            }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["li", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.splitListItem(this.name),
            Tab: () => this.editor.commands.sinkListItem(this.name),
            "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
          };
        }
      });
      exports.ListItem = ListItem;
      exports.default = ListItem;
    }
  });

  // node_modules/@tiptap/extension-ordered-list/dist/index.cjs
  var require_dist38 = __commonJS({
    "node_modules/@tiptap/extension-ordered-list/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var ListItemName = "listItem";
      var TextStyleName = "textStyle";
      var inputRegex = /^(\d+)\.\s$/;
      var OrderedList = core.Node.create({
        name: "orderedList",
        addOptions() {
          return {
            itemTypeName: "listItem",
            HTMLAttributes: {},
            keepMarks: false,
            keepAttributes: false
          };
        },
        group: "block list",
        content() {
          return `${this.options.itemTypeName}+`;
        },
        addAttributes() {
          return {
            start: {
              default: 1,
              parseHTML: (element) => {
                return element.hasAttribute("start") ? parseInt(element.getAttribute("start") || "", 10) : 1;
              }
            },
            type: {
              default: null,
              parseHTML: (element) => element.getAttribute("type")
            }
          };
        },
        parseHTML() {
          return [
            {
              tag: "ol"
            }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          const { start, ...attributesWithoutStart } = HTMLAttributes;
          return start === 1 ? ["ol", core.mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0] : ["ol", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            toggleOrderedList: () => ({ commands, chain }) => {
              if (this.options.keepAttributes) {
                return chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(ListItemName, this.editor.getAttributes(TextStyleName)).run();
              }
              return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
          };
        },
        addInputRules() {
          let inputRule = core.wrappingInputRule({
            find: inputRegex,
            type: this.type,
            getAttributes: (match) => ({ start: +match[1] }),
            joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1]
          });
          if (this.options.keepMarks || this.options.keepAttributes) {
            inputRule = core.wrappingInputRule({
              find: inputRegex,
              type: this.type,
              keepMarks: this.options.keepMarks,
              keepAttributes: this.options.keepAttributes,
              getAttributes: (match) => ({ start: +match[1], ...this.editor.getAttributes(TextStyleName) }),
              joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1],
              editor: this.editor
            });
          }
          return [
            inputRule
          ];
        }
      });
      exports.OrderedList = OrderedList;
      exports.default = OrderedList;
      exports.inputRegex = inputRegex;
    }
  });

  // node_modules/@tiptap/extension-paragraph/dist/index.cjs
  var require_dist39 = __commonJS({
    "node_modules/@tiptap/extension-paragraph/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var Paragraph = core.Node.create({
        name: "paragraph",
        priority: 1e3,
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        group: "block",
        content: "inline*",
        parseHTML() {
          return [
            { tag: "p" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["p", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setParagraph: () => ({ commands }) => {
              return commands.setNode(this.name);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Alt-0": () => this.editor.commands.setParagraph()
          };
        }
      });
      exports.Paragraph = Paragraph;
      exports.default = Paragraph;
    }
  });

  // node_modules/@tiptap/extension-strike/dist/index.cjs
  var require_dist40 = __commonJS({
    "node_modules/@tiptap/extension-strike/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var inputRegex = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/;
      var pasteRegex = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g;
      var Strike = core.Mark.create({
        name: "strike",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        parseHTML() {
          return [
            {
              tag: "s"
            },
            {
              tag: "del"
            },
            {
              tag: "strike"
            },
            {
              style: "text-decoration",
              consuming: false,
              getAttrs: (style) => style.includes("line-through") ? {} : false
            }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["s", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setStrike: () => ({ commands }) => {
              return commands.setMark(this.name);
            },
            toggleStrike: () => ({ commands }) => {
              return commands.toggleMark(this.name);
            },
            unsetStrike: () => ({ commands }) => {
              return commands.unsetMark(this.name);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Shift-s": () => this.editor.commands.toggleStrike()
          };
        },
        addInputRules() {
          return [
            core.markInputRule({
              find: inputRegex,
              type: this.type
            })
          ];
        },
        addPasteRules() {
          return [
            core.markPasteRule({
              find: pasteRegex,
              type: this.type
            })
          ];
        }
      });
      exports.Strike = Strike;
      exports.default = Strike;
      exports.inputRegex = inputRegex;
      exports.pasteRegex = pasteRegex;
    }
  });

  // node_modules/@tiptap/extension-text/dist/index.cjs
  var require_dist41 = __commonJS({
    "node_modules/@tiptap/extension-text/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var Text = core.Node.create({
        name: "text",
        group: "inline"
      });
      exports.Text = Text;
      exports.default = Text;
    }
  });

  // node_modules/@tiptap/starter-kit/dist/index.cjs
  var require_dist42 = __commonJS({
    "node_modules/@tiptap/starter-kit/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var extensionBlockquote = require_dist17();
      var extensionBold = require_dist18();
      var extensionBulletList = require_dist19();
      var extensionCode = require_dist20();
      var extensionCodeBlock = require_dist21();
      var extensionDocument = require_dist22();
      var extensionDropcursor = require_dist25();
      var extensionGapcursor = require_dist28();
      var extensionHardBreak = require_dist29();
      var extensionHeading = require_dist30();
      var extensionHistory = require_dist34();
      var extensionHorizontalRule = require_dist35();
      var extensionItalic = require_dist36();
      var extensionListItem = require_dist37();
      var extensionOrderedList = require_dist38();
      var extensionParagraph = require_dist39();
      var extensionStrike = require_dist40();
      var extensionText = require_dist41();
      var StarterKit2 = core.Extension.create({
        name: "starterKit",
        addExtensions() {
          const extensions = [];
          if (this.options.bold !== false) {
            extensions.push(extensionBold.Bold.configure(this.options.bold));
          }
          if (this.options.blockquote !== false) {
            extensions.push(extensionBlockquote.Blockquote.configure(this.options.blockquote));
          }
          if (this.options.bulletList !== false) {
            extensions.push(extensionBulletList.BulletList.configure(this.options.bulletList));
          }
          if (this.options.code !== false) {
            extensions.push(extensionCode.Code.configure(this.options.code));
          }
          if (this.options.codeBlock !== false) {
            extensions.push(extensionCodeBlock.CodeBlock.configure(this.options.codeBlock));
          }
          if (this.options.document !== false) {
            extensions.push(extensionDocument.Document.configure(this.options.document));
          }
          if (this.options.dropcursor !== false) {
            extensions.push(extensionDropcursor.Dropcursor.configure(this.options.dropcursor));
          }
          if (this.options.gapcursor !== false) {
            extensions.push(extensionGapcursor.Gapcursor.configure(this.options.gapcursor));
          }
          if (this.options.hardBreak !== false) {
            extensions.push(extensionHardBreak.HardBreak.configure(this.options.hardBreak));
          }
          if (this.options.heading !== false) {
            extensions.push(extensionHeading.Heading.configure(this.options.heading));
          }
          if (this.options.history !== false) {
            extensions.push(extensionHistory.History.configure(this.options.history));
          }
          if (this.options.horizontalRule !== false) {
            extensions.push(extensionHorizontalRule.HorizontalRule.configure(this.options.horizontalRule));
          }
          if (this.options.italic !== false) {
            extensions.push(extensionItalic.Italic.configure(this.options.italic));
          }
          if (this.options.listItem !== false) {
            extensions.push(extensionListItem.ListItem.configure(this.options.listItem));
          }
          if (this.options.orderedList !== false) {
            extensions.push(extensionOrderedList.OrderedList.configure(this.options.orderedList));
          }
          if (this.options.paragraph !== false) {
            extensions.push(extensionParagraph.Paragraph.configure(this.options.paragraph));
          }
          if (this.options.strike !== false) {
            extensions.push(extensionStrike.Strike.configure(this.options.strike));
          }
          if (this.options.text !== false) {
            extensions.push(extensionText.Text.configure(this.options.text));
          }
          return extensions;
        }
      });
      exports.StarterKit = StarterKit2;
      exports.default = StarterKit2;
    }
  });

  // node_modules/prosemirror-tables/dist/index.cjs
  var require_dist43 = __commonJS({
    "node_modules/prosemirror-tables/dist/index.cjs"(exports, module) {
      "use strict";
      var __defProp = Object.defineProperty;
      var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
              __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
      var index_exports = {};
      __export(index_exports, {
        CellBookmark: () => CellBookmark,
        CellSelection: () => CellSelection,
        ResizeState: () => ResizeState,
        TableMap: () => TableMap,
        TableView: () => TableView,
        __clipCells: () => clipCells,
        __insertCells: () => insertCells,
        __pastedCells: () => pastedCells,
        addColSpan: () => addColSpan,
        addColumn: () => addColumn,
        addColumnAfter: () => addColumnAfter,
        addColumnBefore: () => addColumnBefore,
        addRow: () => addRow,
        addRowAfter: () => addRowAfter,
        addRowBefore: () => addRowBefore,
        cellAround: () => cellAround,
        cellNear: () => cellNear,
        colCount: () => colCount,
        columnIsHeader: () => columnIsHeader,
        columnResizing: () => columnResizing,
        columnResizingPluginKey: () => columnResizingPluginKey,
        deleteCellSelection: () => deleteCellSelection,
        deleteColumn: () => deleteColumn,
        deleteRow: () => deleteRow,
        deleteTable: () => deleteTable,
        findCell: () => findCell,
        findCellPos: () => findCellPos,
        findCellRange: () => findCellRange,
        findTable: () => findTable,
        fixTables: () => fixTables,
        fixTablesKey: () => fixTablesKey,
        goToNextCell: () => goToNextCell,
        handlePaste: () => handlePaste,
        inSameTable: () => inSameTable,
        isInTable: () => isInTable,
        mergeCells: () => mergeCells,
        moveCellForward: () => moveCellForward,
        moveTableColumn: () => moveTableColumn2,
        moveTableRow: () => moveTableRow2,
        nextCell: () => nextCell,
        pointsAtCell: () => pointsAtCell,
        removeColSpan: () => removeColSpan,
        removeColumn: () => removeColumn,
        removeRow: () => removeRow,
        rowIsHeader: () => rowIsHeader,
        selectedRect: () => selectedRect,
        selectionCell: () => selectionCell,
        setCellAttr: () => setCellAttr,
        splitCell: () => splitCell,
        splitCellWithType: () => splitCellWithType,
        tableEditing: () => tableEditing,
        tableEditingKey: () => tableEditingKey,
        tableNodeTypes: () => tableNodeTypes,
        tableNodes: () => tableNodes,
        toggleHeader: () => toggleHeader,
        toggleHeaderCell: () => toggleHeaderCell,
        toggleHeaderColumn: () => toggleHeaderColumn,
        toggleHeaderRow: () => toggleHeaderRow,
        updateColumnsOnResize: () => updateColumnsOnResize
      });
      module.exports = __toCommonJS(index_exports);
      var import_prosemirror_state7 = require_dist4();
      var import_prosemirror_model = require_dist2();
      var import_prosemirror_state2 = require_dist4();
      var import_prosemirror_view = require_dist6();
      var readFromCache;
      var addToCache;
      if (typeof WeakMap != "undefined") {
        let cache = /* @__PURE__ */ new WeakMap();
        readFromCache = (key) => cache.get(key);
        addToCache = (key, value) => {
          cache.set(key, value);
          return value;
        };
      } else {
        const cache = [];
        const cacheSize = 10;
        let cachePos = 0;
        readFromCache = (key) => {
          for (let i = 0; i < cache.length; i += 2)
            if (cache[i] == key) return cache[i + 1];
        };
        addToCache = (key, value) => {
          if (cachePos == cacheSize) cachePos = 0;
          cache[cachePos++] = key;
          return cache[cachePos++] = value;
        };
      }
      var TableMap = class {
        constructor(width, height, map, problems) {
          this.width = width;
          this.height = height;
          this.map = map;
          this.problems = problems;
        }
        // Find the dimensions of the cell at the given position.
        findCell(pos) {
          for (let i = 0; i < this.map.length; i++) {
            const curPos = this.map[i];
            if (curPos != pos) continue;
            const left = i % this.width;
            const top = i / this.width | 0;
            let right = left + 1;
            let bottom = top + 1;
            for (let j = 1; right < this.width && this.map[i + j] == curPos; j++) {
              right++;
            }
            for (let j = 1; bottom < this.height && this.map[i + this.width * j] == curPos; j++) {
              bottom++;
            }
            return { left, top, right, bottom };
          }
          throw new RangeError(`No cell with offset ${pos} found`);
        }
        // Find the left side of the cell at the given position.
        colCount(pos) {
          for (let i = 0; i < this.map.length; i++) {
            if (this.map[i] == pos) {
              return i % this.width;
            }
          }
          throw new RangeError(`No cell with offset ${pos} found`);
        }
        // Find the next cell in the given direction, starting from the cell
        // at `pos`, if any.
        nextCell(pos, axis, dir) {
          const { left, right, top, bottom } = this.findCell(pos);
          if (axis == "horiz") {
            if (dir < 0 ? left == 0 : right == this.width) return null;
            return this.map[top * this.width + (dir < 0 ? left - 1 : right)];
          } else {
            if (dir < 0 ? top == 0 : bottom == this.height) return null;
            return this.map[left + this.width * (dir < 0 ? top - 1 : bottom)];
          }
        }
        // Get the rectangle spanning the two given cells.
        rectBetween(a, b) {
          const {
            left: leftA,
            right: rightA,
            top: topA,
            bottom: bottomA
          } = this.findCell(a);
          const {
            left: leftB,
            right: rightB,
            top: topB,
            bottom: bottomB
          } = this.findCell(b);
          return {
            left: Math.min(leftA, leftB),
            top: Math.min(topA, topB),
            right: Math.max(rightA, rightB),
            bottom: Math.max(bottomA, bottomB)
          };
        }
        // Return the position of all cells that have the top left corner in
        // the given rectangle.
        cellsInRect(rect) {
          const result = [];
          const seen = {};
          for (let row = rect.top; row < rect.bottom; row++) {
            for (let col = rect.left; col < rect.right; col++) {
              const index = row * this.width + col;
              const pos = this.map[index];
              if (seen[pos]) continue;
              seen[pos] = true;
              if (col == rect.left && col && this.map[index - 1] == pos || row == rect.top && row && this.map[index - this.width] == pos) {
                continue;
              }
              result.push(pos);
            }
          }
          return result;
        }
        // Return the position at which the cell at the given row and column
        // starts, or would start, if a cell started there.
        positionAt(row, col, table) {
          for (let i = 0, rowStart = 0; ; i++) {
            const rowEnd = rowStart + table.child(i).nodeSize;
            if (i == row) {
              let index = col + row * this.width;
              const rowEndIndex = (row + 1) * this.width;
              while (index < rowEndIndex && this.map[index] < rowStart) index++;
              return index == rowEndIndex ? rowEnd - 1 : this.map[index];
            }
            rowStart = rowEnd;
          }
        }
        // Find the table map for the given table node.
        static get(table) {
          return readFromCache(table) || addToCache(table, computeMap(table));
        }
      };
      function computeMap(table) {
        if (table.type.spec.tableRole != "table")
          throw new RangeError("Not a table node: " + table.type.name);
        const width = findWidth(table), height = table.childCount;
        const map = [];
        let mapPos = 0;
        let problems = null;
        const colWidths = [];
        for (let i = 0, e = width * height; i < e; i++) map[i] = 0;
        for (let row = 0, pos = 0; row < height; row++) {
          const rowNode = table.child(row);
          pos++;
          for (let i = 0; ; i++) {
            while (mapPos < map.length && map[mapPos] != 0) mapPos++;
            if (i == rowNode.childCount) break;
            const cellNode = rowNode.child(i);
            const { colspan, rowspan, colwidth } = cellNode.attrs;
            for (let h = 0; h < rowspan; h++) {
              if (h + row >= height) {
                (problems || (problems = [])).push({
                  type: "overlong_rowspan",
                  pos,
                  n: rowspan - h
                });
                break;
              }
              const start = mapPos + h * width;
              for (let w = 0; w < colspan; w++) {
                if (map[start + w] == 0) map[start + w] = pos;
                else
                  (problems || (problems = [])).push({
                    type: "collision",
                    row,
                    pos,
                    n: colspan - w
                  });
                const colW = colwidth && colwidth[w];
                if (colW) {
                  const widthIndex = (start + w) % width * 2, prev = colWidths[widthIndex];
                  if (prev == null || prev != colW && colWidths[widthIndex + 1] == 1) {
                    colWidths[widthIndex] = colW;
                    colWidths[widthIndex + 1] = 1;
                  } else if (prev == colW) {
                    colWidths[widthIndex + 1]++;
                  }
                }
              }
            }
            mapPos += colspan;
            pos += cellNode.nodeSize;
          }
          const expectedPos = (row + 1) * width;
          let missing = 0;
          while (mapPos < expectedPos) if (map[mapPos++] == 0) missing++;
          if (missing)
            (problems || (problems = [])).push({ type: "missing", row, n: missing });
          pos++;
        }
        if (width === 0 || height === 0)
          (problems || (problems = [])).push({ type: "zero_sized" });
        const tableMap = new TableMap(width, height, map, problems);
        let badWidths = false;
        for (let i = 0; !badWidths && i < colWidths.length; i += 2)
          if (colWidths[i] != null && colWidths[i + 1] < height) badWidths = true;
        if (badWidths) findBadColWidths(tableMap, colWidths, table);
        return tableMap;
      }
      function findWidth(table) {
        let width = -1;
        let hasRowSpan = false;
        for (let row = 0; row < table.childCount; row++) {
          const rowNode = table.child(row);
          let rowWidth = 0;
          if (hasRowSpan)
            for (let j = 0; j < row; j++) {
              const prevRow = table.child(j);
              for (let i = 0; i < prevRow.childCount; i++) {
                const cell = prevRow.child(i);
                if (j + cell.attrs.rowspan > row) rowWidth += cell.attrs.colspan;
              }
            }
          for (let i = 0; i < rowNode.childCount; i++) {
            const cell = rowNode.child(i);
            rowWidth += cell.attrs.colspan;
            if (cell.attrs.rowspan > 1) hasRowSpan = true;
          }
          if (width == -1) width = rowWidth;
          else if (width != rowWidth) width = Math.max(width, rowWidth);
        }
        return width;
      }
      function findBadColWidths(map, colWidths, table) {
        if (!map.problems) map.problems = [];
        const seen = {};
        for (let i = 0; i < map.map.length; i++) {
          const pos = map.map[i];
          if (seen[pos]) continue;
          seen[pos] = true;
          const node = table.nodeAt(pos);
          if (!node) {
            throw new RangeError(`No cell with offset ${pos} found`);
          }
          let updated = null;
          const attrs = node.attrs;
          for (let j = 0; j < attrs.colspan; j++) {
            const col = (i + j) % map.width;
            const colWidth = colWidths[col * 2];
            if (colWidth != null && (!attrs.colwidth || attrs.colwidth[j] != colWidth))
              (updated || (updated = freshColWidth(attrs)))[j] = colWidth;
          }
          if (updated)
            map.problems.unshift({
              type: "colwidth mismatch",
              pos,
              colwidth: updated
            });
        }
      }
      function freshColWidth(attrs) {
        if (attrs.colwidth) return attrs.colwidth.slice();
        const result = [];
        for (let i = 0; i < attrs.colspan; i++) result.push(0);
        return result;
      }
      var import_prosemirror_state = require_dist4();
      function getCellAttrs(dom, extraAttrs) {
        if (typeof dom === "string") {
          return {};
        }
        const widthAttr = dom.getAttribute("data-colwidth");
        const widths = widthAttr && /^\d+(,\d+)*$/.test(widthAttr) ? widthAttr.split(",").map((s) => Number(s)) : null;
        const colspan = Number(dom.getAttribute("colspan") || 1);
        const result = {
          colspan,
          rowspan: Number(dom.getAttribute("rowspan") || 1),
          colwidth: widths && widths.length == colspan ? widths : null
        };
        for (const prop in extraAttrs) {
          const getter = extraAttrs[prop].getFromDOM;
          const value = getter && getter(dom);
          if (value != null) {
            result[prop] = value;
          }
        }
        return result;
      }
      function setCellAttrs(node, extraAttrs) {
        const attrs = {};
        if (node.attrs.colspan != 1) attrs.colspan = node.attrs.colspan;
        if (node.attrs.rowspan != 1) attrs.rowspan = node.attrs.rowspan;
        if (node.attrs.colwidth)
          attrs["data-colwidth"] = node.attrs.colwidth.join(",");
        for (const prop in extraAttrs) {
          const setter = extraAttrs[prop].setDOMAttr;
          if (setter) setter(node.attrs[prop], attrs);
        }
        return attrs;
      }
      function validateColwidth(value) {
        if (value === null) {
          return;
        }
        if (!Array.isArray(value)) {
          throw new TypeError("colwidth must be null or an array");
        }
        for (const item of value) {
          if (typeof item !== "number") {
            throw new TypeError("colwidth must be null or an array of numbers");
          }
        }
      }
      function tableNodes(options) {
        const extraAttrs = options.cellAttributes || {};
        const cellAttrs = {
          colspan: { default: 1, validate: "number" },
          rowspan: { default: 1, validate: "number" },
          colwidth: { default: null, validate: validateColwidth }
        };
        for (const prop in extraAttrs)
          cellAttrs[prop] = {
            default: extraAttrs[prop].default,
            validate: extraAttrs[prop].validate
          };
        return {
          table: {
            content: "table_row+",
            tableRole: "table",
            isolating: true,
            group: options.tableGroup,
            parseDOM: [{ tag: "table" }],
            toDOM() {
              return ["table", ["tbody", 0]];
            }
          },
          table_row: {
            content: "(table_cell | table_header)*",
            tableRole: "row",
            parseDOM: [{ tag: "tr" }],
            toDOM() {
              return ["tr", 0];
            }
          },
          table_cell: {
            content: options.cellContent,
            attrs: cellAttrs,
            tableRole: "cell",
            isolating: true,
            parseDOM: [
              { tag: "td", getAttrs: (dom) => getCellAttrs(dom, extraAttrs) }
            ],
            toDOM(node) {
              return ["td", setCellAttrs(node, extraAttrs), 0];
            }
          },
          table_header: {
            content: options.cellContent,
            attrs: cellAttrs,
            tableRole: "header_cell",
            isolating: true,
            parseDOM: [
              { tag: "th", getAttrs: (dom) => getCellAttrs(dom, extraAttrs) }
            ],
            toDOM(node) {
              return ["th", setCellAttrs(node, extraAttrs), 0];
            }
          }
        };
      }
      function tableNodeTypes(schema) {
        let result = schema.cached.tableNodeTypes;
        if (!result) {
          result = schema.cached.tableNodeTypes = {};
          for (const name in schema.nodes) {
            const type = schema.nodes[name], role = type.spec.tableRole;
            if (role) result[role] = type;
          }
        }
        return result;
      }
      var tableEditingKey = new import_prosemirror_state.PluginKey("selectingCells");
      function cellAround($pos) {
        for (let d = $pos.depth - 1; d > 0; d--)
          if ($pos.node(d).type.spec.tableRole == "row")
            return $pos.node(0).resolve($pos.before(d + 1));
        return null;
      }
      function cellWrapping($pos) {
        for (let d = $pos.depth; d > 0; d--) {
          const role = $pos.node(d).type.spec.tableRole;
          if (role === "cell" || role === "header_cell") return $pos.node(d);
        }
        return null;
      }
      function isInTable(state) {
        const $head = state.selection.$head;
        for (let d = $head.depth; d > 0; d--)
          if ($head.node(d).type.spec.tableRole == "row") return true;
        return false;
      }
      function selectionCell(state) {
        const sel = state.selection;
        if ("$anchorCell" in sel && sel.$anchorCell) {
          return sel.$anchorCell.pos > sel.$headCell.pos ? sel.$anchorCell : sel.$headCell;
        } else if ("node" in sel && sel.node && sel.node.type.spec.tableRole == "cell") {
          return sel.$anchor;
        }
        const $cell = cellAround(sel.$head) || cellNear(sel.$head);
        if ($cell) {
          return $cell;
        }
        throw new RangeError(`No cell found around position ${sel.head}`);
      }
      function cellNear($pos) {
        for (let after = $pos.nodeAfter, pos = $pos.pos; after; after = after.firstChild, pos++) {
          const role = after.type.spec.tableRole;
          if (role == "cell" || role == "header_cell") return $pos.doc.resolve(pos);
        }
        for (let before = $pos.nodeBefore, pos = $pos.pos; before; before = before.lastChild, pos--) {
          const role = before.type.spec.tableRole;
          if (role == "cell" || role == "header_cell")
            return $pos.doc.resolve(pos - before.nodeSize);
        }
      }
      function pointsAtCell($pos) {
        return $pos.parent.type.spec.tableRole == "row" && !!$pos.nodeAfter;
      }
      function moveCellForward($pos) {
        return $pos.node(0).resolve($pos.pos + $pos.nodeAfter.nodeSize);
      }
      function inSameTable($cellA, $cellB) {
        return $cellA.depth == $cellB.depth && $cellA.pos >= $cellB.start(-1) && $cellA.pos <= $cellB.end(-1);
      }
      function findCell($pos) {
        return TableMap.get($pos.node(-1)).findCell($pos.pos - $pos.start(-1));
      }
      function colCount($pos) {
        return TableMap.get($pos.node(-1)).colCount($pos.pos - $pos.start(-1));
      }
      function nextCell($pos, axis, dir) {
        const table = $pos.node(-1);
        const map = TableMap.get(table);
        const tableStart = $pos.start(-1);
        const moved = map.nextCell($pos.pos - tableStart, axis, dir);
        return moved == null ? null : $pos.node(0).resolve(tableStart + moved);
      }
      function removeColSpan(attrs, pos, n = 1) {
        const result = { ...attrs, colspan: attrs.colspan - n };
        if (result.colwidth) {
          result.colwidth = result.colwidth.slice();
          result.colwidth.splice(pos, n);
          if (!result.colwidth.some((w) => w > 0)) result.colwidth = null;
        }
        return result;
      }
      function addColSpan(attrs, pos, n = 1) {
        const result = { ...attrs, colspan: attrs.colspan + n };
        if (result.colwidth) {
          result.colwidth = result.colwidth.slice();
          for (let i = 0; i < n; i++) result.colwidth.splice(pos, 0, 0);
        }
        return result;
      }
      function columnIsHeader(map, table, col) {
        const headerCell = tableNodeTypes(table.type.schema).header_cell;
        for (let row = 0; row < map.height; row++)
          if (table.nodeAt(map.map[col + row * map.width]).type != headerCell)
            return false;
        return true;
      }
      var CellSelection = class _CellSelection extends import_prosemirror_state2.Selection {
        // A table selection is identified by its anchor and head cells. The
        // positions given to this constructor should point _before_ two
        // cells in the same table. They may be the same, to select a single
        // cell.
        constructor($anchorCell, $headCell = $anchorCell) {
          const table = $anchorCell.node(-1);
          const map = TableMap.get(table);
          const tableStart = $anchorCell.start(-1);
          const rect = map.rectBetween(
            $anchorCell.pos - tableStart,
            $headCell.pos - tableStart
          );
          const doc = $anchorCell.node(0);
          const cells = map.cellsInRect(rect).filter((p) => p != $headCell.pos - tableStart);
          cells.unshift($headCell.pos - tableStart);
          const ranges = cells.map((pos) => {
            const cell = table.nodeAt(pos);
            if (!cell) {
              throw RangeError(`No cell with offset ${pos} found`);
            }
            const from = tableStart + pos + 1;
            return new import_prosemirror_state2.SelectionRange(
              doc.resolve(from),
              doc.resolve(from + cell.content.size)
            );
          });
          super(ranges[0].$from, ranges[0].$to, ranges);
          this.$anchorCell = $anchorCell;
          this.$headCell = $headCell;
        }
        map(doc, mapping) {
          const $anchorCell = doc.resolve(mapping.map(this.$anchorCell.pos));
          const $headCell = doc.resolve(mapping.map(this.$headCell.pos));
          if (pointsAtCell($anchorCell) && pointsAtCell($headCell) && inSameTable($anchorCell, $headCell)) {
            const tableChanged = this.$anchorCell.node(-1) != $anchorCell.node(-1);
            if (tableChanged && this.isRowSelection())
              return _CellSelection.rowSelection($anchorCell, $headCell);
            else if (tableChanged && this.isColSelection())
              return _CellSelection.colSelection($anchorCell, $headCell);
            else return new _CellSelection($anchorCell, $headCell);
          }
          return import_prosemirror_state2.TextSelection.between($anchorCell, $headCell);
        }
        // Returns a rectangular slice of table rows containing the selected
        // cells.
        content() {
          const table = this.$anchorCell.node(-1);
          const map = TableMap.get(table);
          const tableStart = this.$anchorCell.start(-1);
          const rect = map.rectBetween(
            this.$anchorCell.pos - tableStart,
            this.$headCell.pos - tableStart
          );
          const seen = {};
          const rows = [];
          for (let row = rect.top; row < rect.bottom; row++) {
            const rowContent = [];
            for (let index = row * map.width + rect.left, col = rect.left; col < rect.right; col++, index++) {
              const pos = map.map[index];
              if (seen[pos]) continue;
              seen[pos] = true;
              const cellRect = map.findCell(pos);
              let cell = table.nodeAt(pos);
              if (!cell) {
                throw RangeError(`No cell with offset ${pos} found`);
              }
              const extraLeft = rect.left - cellRect.left;
              const extraRight = cellRect.right - rect.right;
              if (extraLeft > 0 || extraRight > 0) {
                let attrs = cell.attrs;
                if (extraLeft > 0) {
                  attrs = removeColSpan(attrs, 0, extraLeft);
                }
                if (extraRight > 0) {
                  attrs = removeColSpan(
                    attrs,
                    attrs.colspan - extraRight,
                    extraRight
                  );
                }
                if (cellRect.left < rect.left) {
                  cell = cell.type.createAndFill(attrs);
                  if (!cell) {
                    throw RangeError(
                      `Could not create cell with attrs ${JSON.stringify(attrs)}`
                    );
                  }
                } else {
                  cell = cell.type.create(attrs, cell.content);
                }
              }
              if (cellRect.top < rect.top || cellRect.bottom > rect.bottom) {
                const attrs = {
                  ...cell.attrs,
                  rowspan: Math.min(cellRect.bottom, rect.bottom) - Math.max(cellRect.top, rect.top)
                };
                if (cellRect.top < rect.top) {
                  cell = cell.type.createAndFill(attrs);
                } else {
                  cell = cell.type.create(attrs, cell.content);
                }
              }
              rowContent.push(cell);
            }
            rows.push(table.child(row).copy(import_prosemirror_model.Fragment.from(rowContent)));
          }
          const fragment = this.isColSelection() && this.isRowSelection() ? table : rows;
          return new import_prosemirror_model.Slice(import_prosemirror_model.Fragment.from(fragment), 1, 1);
        }
        replace(tr, content = import_prosemirror_model.Slice.empty) {
          const mapFrom = tr.steps.length, ranges = this.ranges;
          for (let i = 0; i < ranges.length; i++) {
            const { $from, $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
            tr.replace(
              mapping.map($from.pos),
              mapping.map($to.pos),
              i ? import_prosemirror_model.Slice.empty : content
            );
          }
          const sel = import_prosemirror_state2.Selection.findFrom(
            tr.doc.resolve(tr.mapping.slice(mapFrom).map(this.to)),
            -1
          );
          if (sel) tr.setSelection(sel);
        }
        replaceWith(tr, node) {
          this.replace(tr, new import_prosemirror_model.Slice(import_prosemirror_model.Fragment.from(node), 0, 0));
        }
        forEachCell(f) {
          const table = this.$anchorCell.node(-1);
          const map = TableMap.get(table);
          const tableStart = this.$anchorCell.start(-1);
          const cells = map.cellsInRect(
            map.rectBetween(
              this.$anchorCell.pos - tableStart,
              this.$headCell.pos - tableStart
            )
          );
          for (let i = 0; i < cells.length; i++) {
            f(table.nodeAt(cells[i]), tableStart + cells[i]);
          }
        }
        // True if this selection goes all the way from the top to the
        // bottom of the table.
        isColSelection() {
          const anchorTop = this.$anchorCell.index(-1);
          const headTop = this.$headCell.index(-1);
          if (Math.min(anchorTop, headTop) > 0) return false;
          const anchorBottom = anchorTop + this.$anchorCell.nodeAfter.attrs.rowspan;
          const headBottom = headTop + this.$headCell.nodeAfter.attrs.rowspan;
          return Math.max(anchorBottom, headBottom) == this.$headCell.node(-1).childCount;
        }
        // Returns the smallest column selection that covers the given anchor
        // and head cell.
        static colSelection($anchorCell, $headCell = $anchorCell) {
          const table = $anchorCell.node(-1);
          const map = TableMap.get(table);
          const tableStart = $anchorCell.start(-1);
          const anchorRect = map.findCell($anchorCell.pos - tableStart);
          const headRect = map.findCell($headCell.pos - tableStart);
          const doc = $anchorCell.node(0);
          if (anchorRect.top <= headRect.top) {
            if (anchorRect.top > 0)
              $anchorCell = doc.resolve(tableStart + map.map[anchorRect.left]);
            if (headRect.bottom < map.height)
              $headCell = doc.resolve(
                tableStart + map.map[map.width * (map.height - 1) + headRect.right - 1]
              );
          } else {
            if (headRect.top > 0)
              $headCell = doc.resolve(tableStart + map.map[headRect.left]);
            if (anchorRect.bottom < map.height)
              $anchorCell = doc.resolve(
                tableStart + map.map[map.width * (map.height - 1) + anchorRect.right - 1]
              );
          }
          return new _CellSelection($anchorCell, $headCell);
        }
        // True if this selection goes all the way from the left to the
        // right of the table.
        isRowSelection() {
          const table = this.$anchorCell.node(-1);
          const map = TableMap.get(table);
          const tableStart = this.$anchorCell.start(-1);
          const anchorLeft = map.colCount(this.$anchorCell.pos - tableStart);
          const headLeft = map.colCount(this.$headCell.pos - tableStart);
          if (Math.min(anchorLeft, headLeft) > 0) return false;
          const anchorRight = anchorLeft + this.$anchorCell.nodeAfter.attrs.colspan;
          const headRight = headLeft + this.$headCell.nodeAfter.attrs.colspan;
          return Math.max(anchorRight, headRight) == map.width;
        }
        eq(other) {
          return other instanceof _CellSelection && other.$anchorCell.pos == this.$anchorCell.pos && other.$headCell.pos == this.$headCell.pos;
        }
        // Returns the smallest row selection that covers the given anchor
        // and head cell.
        static rowSelection($anchorCell, $headCell = $anchorCell) {
          const table = $anchorCell.node(-1);
          const map = TableMap.get(table);
          const tableStart = $anchorCell.start(-1);
          const anchorRect = map.findCell($anchorCell.pos - tableStart);
          const headRect = map.findCell($headCell.pos - tableStart);
          const doc = $anchorCell.node(0);
          if (anchorRect.left <= headRect.left) {
            if (anchorRect.left > 0)
              $anchorCell = doc.resolve(
                tableStart + map.map[anchorRect.top * map.width]
              );
            if (headRect.right < map.width)
              $headCell = doc.resolve(
                tableStart + map.map[map.width * (headRect.top + 1) - 1]
              );
          } else {
            if (headRect.left > 0)
              $headCell = doc.resolve(tableStart + map.map[headRect.top * map.width]);
            if (anchorRect.right < map.width)
              $anchorCell = doc.resolve(
                tableStart + map.map[map.width * (anchorRect.top + 1) - 1]
              );
          }
          return new _CellSelection($anchorCell, $headCell);
        }
        toJSON() {
          return {
            type: "cell",
            anchor: this.$anchorCell.pos,
            head: this.$headCell.pos
          };
        }
        static fromJSON(doc, json) {
          return new _CellSelection(doc.resolve(json.anchor), doc.resolve(json.head));
        }
        static create(doc, anchorCell, headCell = anchorCell) {
          return new _CellSelection(doc.resolve(anchorCell), doc.resolve(headCell));
        }
        getBookmark() {
          return new CellBookmark(this.$anchorCell.pos, this.$headCell.pos);
        }
      };
      CellSelection.prototype.visible = false;
      import_prosemirror_state2.Selection.jsonID("cell", CellSelection);
      var CellBookmark = class _CellBookmark {
        constructor(anchor, head) {
          this.anchor = anchor;
          this.head = head;
        }
        map(mapping) {
          return new _CellBookmark(mapping.map(this.anchor), mapping.map(this.head));
        }
        resolve(doc) {
          const $anchorCell = doc.resolve(this.anchor), $headCell = doc.resolve(this.head);
          if ($anchorCell.parent.type.spec.tableRole == "row" && $headCell.parent.type.spec.tableRole == "row" && $anchorCell.index() < $anchorCell.parent.childCount && $headCell.index() < $headCell.parent.childCount && inSameTable($anchorCell, $headCell))
            return new CellSelection($anchorCell, $headCell);
          else return import_prosemirror_state2.Selection.near($headCell, 1);
        }
      };
      function drawCellSelection(state) {
        if (!(state.selection instanceof CellSelection)) return null;
        const cells = [];
        state.selection.forEachCell((node, pos) => {
          cells.push(
            import_prosemirror_view.Decoration.node(pos, pos + node.nodeSize, { class: "selectedCell" })
          );
        });
        return import_prosemirror_view.DecorationSet.create(state.doc, cells);
      }
      function isCellBoundarySelection({ $from, $to }) {
        if ($from.pos == $to.pos || $from.pos < $to.pos - 6) return false;
        let afterFrom = $from.pos;
        let beforeTo = $to.pos;
        let depth = $from.depth;
        for (; depth >= 0; depth--, afterFrom++)
          if ($from.after(depth + 1) < $from.end(depth)) break;
        for (let d = $to.depth; d >= 0; d--, beforeTo--)
          if ($to.before(d + 1) > $to.start(d)) break;
        return afterFrom == beforeTo && /row|table/.test($from.node(depth).type.spec.tableRole);
      }
      function isTextSelectionAcrossCells({ $from, $to }) {
        let fromCellBoundaryNode;
        let toCellBoundaryNode;
        for (let i = $from.depth; i > 0; i--) {
          const node = $from.node(i);
          if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
            fromCellBoundaryNode = node;
            break;
          }
        }
        for (let i = $to.depth; i > 0; i--) {
          const node = $to.node(i);
          if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
            toCellBoundaryNode = node;
            break;
          }
        }
        return fromCellBoundaryNode !== toCellBoundaryNode && $to.parentOffset === 0;
      }
      function normalizeSelection(state, tr, allowTableNodeSelection) {
        const sel = (tr || state).selection;
        const doc = (tr || state).doc;
        let normalize;
        let role;
        if (sel instanceof import_prosemirror_state2.NodeSelection && (role = sel.node.type.spec.tableRole)) {
          if (role == "cell" || role == "header_cell") {
            normalize = CellSelection.create(doc, sel.from);
          } else if (role == "row") {
            const $cell = doc.resolve(sel.from + 1);
            normalize = CellSelection.rowSelection($cell, $cell);
          } else if (!allowTableNodeSelection) {
            const map = TableMap.get(sel.node);
            const start = sel.from + 1;
            const lastCell = start + map.map[map.width * map.height - 1];
            normalize = CellSelection.create(doc, start + 1, lastCell);
          }
        } else if (sel instanceof import_prosemirror_state2.TextSelection && isCellBoundarySelection(sel)) {
          normalize = import_prosemirror_state2.TextSelection.create(doc, sel.from);
        } else if (sel instanceof import_prosemirror_state2.TextSelection && isTextSelectionAcrossCells(sel)) {
          normalize = import_prosemirror_state2.TextSelection.create(doc, sel.$from.start(), sel.$from.end());
        }
        if (normalize) (tr || (tr = state.tr)).setSelection(normalize);
        return tr;
      }
      var import_prosemirror_state3 = require_dist4();
      var fixTablesKey = new import_prosemirror_state3.PluginKey("fix-tables");
      function changedDescendants(old, cur, offset, f) {
        const oldSize = old.childCount, curSize = cur.childCount;
        outer: for (let i = 0, j = 0; i < curSize; i++) {
          const child = cur.child(i);
          for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) {
            if (old.child(scan) == child) {
              j = scan + 1;
              offset += child.nodeSize;
              continue outer;
            }
          }
          f(child, offset);
          if (j < oldSize && old.child(j).sameMarkup(child))
            changedDescendants(old.child(j), child, offset + 1, f);
          else child.nodesBetween(0, child.content.size, f, offset + 1);
          offset += child.nodeSize;
        }
      }
      function fixTables(state, oldState) {
        let tr;
        const check = (node, pos) => {
          if (node.type.spec.tableRole == "table")
            tr = fixTable(state, node, pos, tr);
        };
        if (!oldState) state.doc.descendants(check);
        else if (oldState.doc != state.doc)
          changedDescendants(oldState.doc, state.doc, 0, check);
        return tr;
      }
      function fixTable(state, table, tablePos, tr) {
        const map = TableMap.get(table);
        if (!map.problems) return tr;
        if (!tr) tr = state.tr;
        const mustAdd = [];
        for (let i = 0; i < map.height; i++) mustAdd.push(0);
        for (let i = 0; i < map.problems.length; i++) {
          const prob = map.problems[i];
          if (prob.type == "collision") {
            const cell = table.nodeAt(prob.pos);
            if (!cell) continue;
            const attrs = cell.attrs;
            for (let j = 0; j < attrs.rowspan; j++) mustAdd[prob.row + j] += prob.n;
            tr.setNodeMarkup(
              tr.mapping.map(tablePos + 1 + prob.pos),
              null,
              removeColSpan(attrs, attrs.colspan - prob.n, prob.n)
            );
          } else if (prob.type == "missing") {
            mustAdd[prob.row] += prob.n;
          } else if (prob.type == "overlong_rowspan") {
            const cell = table.nodeAt(prob.pos);
            if (!cell) continue;
            tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
              ...cell.attrs,
              rowspan: cell.attrs.rowspan - prob.n
            });
          } else if (prob.type == "colwidth mismatch") {
            const cell = table.nodeAt(prob.pos);
            if (!cell) continue;
            tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
              ...cell.attrs,
              colwidth: prob.colwidth
            });
          } else if (prob.type == "zero_sized") {
            const pos = tr.mapping.map(tablePos);
            tr.delete(pos, pos + table.nodeSize);
          }
        }
        let first, last;
        for (let i = 0; i < mustAdd.length; i++)
          if (mustAdd[i]) {
            if (first == null) first = i;
            last = i;
          }
        for (let i = 0, pos = tablePos + 1; i < map.height; i++) {
          const row = table.child(i);
          const end = pos + row.nodeSize;
          const add = mustAdd[i];
          if (add > 0) {
            let role = "cell";
            if (row.firstChild) {
              role = row.firstChild.type.spec.tableRole;
            }
            const nodes = [];
            for (let j = 0; j < add; j++) {
              const node = tableNodeTypes(state.schema)[role].createAndFill();
              if (node) nodes.push(node);
            }
            const side = (i == 0 || first == i - 1) && last == i ? pos + 1 : end - 1;
            tr.insert(tr.mapping.map(side), nodes);
          }
          pos = end;
        }
        return tr.setMeta(fixTablesKey, { fixTables: true });
      }
      var import_prosemirror_keymap = require_dist8();
      var import_prosemirror_model4 = require_dist2();
      var import_prosemirror_state5 = require_dist4();
      var import_prosemirror_model2 = require_dist2();
      var import_prosemirror_state4 = require_dist4();
      function convertTableNodeToArrayOfRows(tableNode) {
        const map = TableMap.get(tableNode);
        const rows = [];
        const rowCount = map.height;
        const colCount2 = map.width;
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
          const row = [];
          for (let colIndex = 0; colIndex < colCount2; colIndex++) {
            const cellIndex = rowIndex * colCount2 + colIndex;
            const cellPos = map.map[cellIndex];
            if (rowIndex > 0) {
              const topCellIndex = cellIndex - colCount2;
              const topCellPos = map.map[topCellIndex];
              if (cellPos === topCellPos) {
                row.push(null);
                continue;
              }
            }
            if (colIndex > 0) {
              const leftCellIndex = cellIndex - 1;
              const leftCellPos = map.map[leftCellIndex];
              if (cellPos === leftCellPos) {
                row.push(null);
                continue;
              }
            }
            row.push(tableNode.nodeAt(cellPos));
          }
          rows.push(row);
        }
        return rows;
      }
      function convertArrayOfRowsToTableNode(tableNode, arrayOfNodes) {
        const newRows = [];
        const map = TableMap.get(tableNode);
        const rowCount = map.height;
        const colCount2 = map.width;
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
          const oldRow = tableNode.child(rowIndex);
          const newCells = [];
          for (let colIndex = 0; colIndex < colCount2; colIndex++) {
            const cell = arrayOfNodes[rowIndex][colIndex];
            if (!cell) {
              continue;
            }
            const cellPos = map.map[rowIndex * map.width + colIndex];
            const oldCell = tableNode.nodeAt(cellPos);
            if (!oldCell) {
              continue;
            }
            const newCell = oldCell.type.createChecked(
              cell.attrs,
              cell.content,
              cell.marks
            );
            newCells.push(newCell);
          }
          const newRow = oldRow.type.createChecked(
            oldRow.attrs,
            newCells,
            oldRow.marks
          );
          newRows.push(newRow);
        }
        const newTable = tableNode.type.createChecked(
          tableNode.attrs,
          newRows,
          tableNode.marks
        );
        return newTable;
      }
      function isCellSelection(value) {
        return value instanceof CellSelection;
      }
      function findTable($pos) {
        return findParentNode((node) => node.type.spec.tableRole === "table", $pos);
      }
      function findCellRange(selection, anchorHit, headHit) {
        var _a, _b;
        if (anchorHit == null && headHit == null && isCellSelection(selection)) {
          return [selection.$anchorCell, selection.$headCell];
        }
        const anchor = (_a = anchorHit != null ? anchorHit : headHit) != null ? _a : selection.anchor;
        const head = (_b = headHit != null ? headHit : anchorHit) != null ? _b : selection.head;
        const doc = selection.$head.doc;
        const $anchorCell = findCellPos(doc, anchor);
        const $headCell = findCellPos(doc, head);
        if ($anchorCell && $headCell && inSameTable($anchorCell, $headCell)) {
          return [$anchorCell, $headCell];
        }
        return null;
      }
      function findCellPos(doc, pos) {
        const $pos = doc.resolve(pos);
        return cellAround($pos) || cellNear($pos);
      }
      function findParentNode(predicate, $pos) {
        for (let depth = $pos.depth; depth >= 0; depth -= 1) {
          const node = $pos.node(depth);
          if (predicate(node)) {
            const pos = depth === 0 ? 0 : $pos.before(depth);
            const start = $pos.start(depth);
            return { node, pos, start, depth };
          }
        }
        return null;
      }
      function getCellsInColumn(columnIndex, selection) {
        const table = findTable(selection.$from);
        if (!table) {
          return;
        }
        const map = TableMap.get(table.node);
        if (columnIndex < 0 || columnIndex > map.width - 1) {
          return;
        }
        const cells = map.cellsInRect({
          left: columnIndex,
          right: columnIndex + 1,
          top: 0,
          bottom: map.height
        });
        return cells.map((nodePos) => {
          const node = table.node.nodeAt(nodePos);
          const pos = nodePos + table.start;
          return { pos, start: pos + 1, node, depth: table.depth + 2 };
        });
      }
      function getCellsInRow(rowIndex, selection) {
        const table = findTable(selection.$from);
        if (!table) {
          return;
        }
        const map = TableMap.get(table.node);
        if (rowIndex < 0 || rowIndex > map.height - 1) {
          return;
        }
        const cells = map.cellsInRect({
          left: 0,
          right: map.width,
          top: rowIndex,
          bottom: rowIndex + 1
        });
        return cells.map((nodePos) => {
          const node = table.node.nodeAt(nodePos);
          const pos = nodePos + table.start;
          return { pos, start: pos + 1, node, depth: table.depth + 2 };
        });
      }
      function getSelectionRangeInColumn(tr, startColIndex, endColIndex = startColIndex) {
        let startIndex = startColIndex;
        let endIndex = endColIndex;
        for (let i = startColIndex; i >= 0; i--) {
          const cells = getCellsInColumn(i, tr.selection);
          if (cells) {
            cells.forEach((cell) => {
              const maybeEndIndex = cell.node.attrs.colspan + i - 1;
              if (maybeEndIndex >= startIndex) {
                startIndex = i;
              }
              if (maybeEndIndex > endIndex) {
                endIndex = maybeEndIndex;
              }
            });
          }
        }
        for (let i = startColIndex; i <= endIndex; i++) {
          const cells = getCellsInColumn(i, tr.selection);
          if (cells) {
            cells.forEach((cell) => {
              const maybeEndIndex = cell.node.attrs.colspan + i - 1;
              if (cell.node.attrs.colspan > 1 && maybeEndIndex > endIndex) {
                endIndex = maybeEndIndex;
              }
            });
          }
        }
        const indexes = [];
        for (let i = startIndex; i <= endIndex; i++) {
          const maybeCells = getCellsInColumn(i, tr.selection);
          if (maybeCells && maybeCells.length > 0) {
            indexes.push(i);
          }
        }
        startIndex = indexes[0];
        endIndex = indexes[indexes.length - 1];
        const firstSelectedColumnCells = getCellsInColumn(startIndex, tr.selection);
        const firstRowCells = getCellsInRow(0, tr.selection);
        if (!firstSelectedColumnCells || !firstRowCells) {
          return;
        }
        const $anchor = tr.doc.resolve(
          firstSelectedColumnCells[firstSelectedColumnCells.length - 1].pos
        );
        let headCell;
        for (let i = endIndex; i >= startIndex; i--) {
          const columnCells = getCellsInColumn(i, tr.selection);
          if (columnCells && columnCells.length > 0) {
            for (let j = firstRowCells.length - 1; j >= 0; j--) {
              if (firstRowCells[j].pos === columnCells[0].pos) {
                headCell = columnCells[0];
                break;
              }
            }
            if (headCell) {
              break;
            }
          }
        }
        if (!headCell) {
          return;
        }
        const $head = tr.doc.resolve(headCell.pos);
        return { $anchor, $head, indexes };
      }
      function getSelectionRangeInRow(tr, startRowIndex, endRowIndex = startRowIndex) {
        let startIndex = startRowIndex;
        let endIndex = endRowIndex;
        for (let i = startRowIndex; i >= 0; i--) {
          const cells = getCellsInRow(i, tr.selection);
          if (cells) {
            cells.forEach((cell) => {
              const maybeEndIndex = cell.node.attrs.rowspan + i - 1;
              if (maybeEndIndex >= startIndex) {
                startIndex = i;
              }
              if (maybeEndIndex > endIndex) {
                endIndex = maybeEndIndex;
              }
            });
          }
        }
        for (let i = startRowIndex; i <= endIndex; i++) {
          const cells = getCellsInRow(i, tr.selection);
          if (cells) {
            cells.forEach((cell) => {
              const maybeEndIndex = cell.node.attrs.rowspan + i - 1;
              if (cell.node.attrs.rowspan > 1 && maybeEndIndex > endIndex) {
                endIndex = maybeEndIndex;
              }
            });
          }
        }
        const indexes = [];
        for (let i = startIndex; i <= endIndex; i++) {
          const maybeCells = getCellsInRow(i, tr.selection);
          if (maybeCells && maybeCells.length > 0) {
            indexes.push(i);
          }
        }
        startIndex = indexes[0];
        endIndex = indexes[indexes.length - 1];
        const firstSelectedRowCells = getCellsInRow(startIndex, tr.selection);
        const firstColumnCells = getCellsInColumn(0, tr.selection);
        if (!firstSelectedRowCells || !firstColumnCells) {
          return;
        }
        const $anchor = tr.doc.resolve(
          firstSelectedRowCells[firstSelectedRowCells.length - 1].pos
        );
        let headCell;
        for (let i = endIndex; i >= startIndex; i--) {
          const rowCells = getCellsInRow(i, tr.selection);
          if (rowCells && rowCells.length > 0) {
            for (let j = firstColumnCells.length - 1; j >= 0; j--) {
              if (firstColumnCells[j].pos === rowCells[0].pos) {
                headCell = rowCells[0];
                break;
              }
            }
            if (headCell) {
              break;
            }
          }
        }
        if (!headCell) {
          return;
        }
        const $head = tr.doc.resolve(headCell.pos);
        return { $anchor, $head, indexes };
      }
      function moveRowInArrayOfRows(rows, indexesOrigin, indexesTarget, directionOverride) {
        const direction = indexesOrigin[0] > indexesTarget[0] ? -1 : 1;
        const rowsExtracted = rows.splice(indexesOrigin[0], indexesOrigin.length);
        const positionOffset = rowsExtracted.length % 2 === 0 ? 1 : 0;
        let target;
        if (directionOverride === -1 && direction === 1) {
          target = indexesTarget[0] - 1;
        } else if (directionOverride === 1 && direction === -1) {
          target = indexesTarget[indexesTarget.length - 1] - positionOffset + 1;
        } else {
          target = direction === -1 ? indexesTarget[0] : indexesTarget[indexesTarget.length - 1] - positionOffset;
        }
        rows.splice(target, 0, ...rowsExtracted);
        return rows;
      }
      function transpose(array) {
        return array[0].map((_, i) => {
          return array.map((column) => column[i]);
        });
      }
      function moveColumn(moveColParams) {
        var _a, _b;
        const { tr, originIndex, targetIndex, select, pos } = moveColParams;
        const $pos = tr.doc.resolve(pos);
        const table = findTable($pos);
        if (!table) return false;
        const indexesOriginColumn = (_a = getSelectionRangeInColumn(
          tr,
          originIndex
        )) == null ? void 0 : _a.indexes;
        const indexesTargetColumn = (_b = getSelectionRangeInColumn(
          tr,
          targetIndex
        )) == null ? void 0 : _b.indexes;
        if (!indexesOriginColumn || !indexesTargetColumn) return false;
        if (indexesOriginColumn.includes(targetIndex)) return false;
        const newTable = moveTableColumn(
          table.node,
          indexesOriginColumn,
          indexesTargetColumn,
          0
        );
        tr.replaceWith(table.pos, table.pos + table.node.nodeSize, newTable);
        if (!select) return true;
        const map = TableMap.get(newTable);
        const start = table.start;
        const index = targetIndex;
        const lastCell = map.positionAt(map.height - 1, index, newTable);
        const $lastCell = tr.doc.resolve(start + lastCell);
        const firstCell = map.positionAt(0, index, newTable);
        const $firstCell = tr.doc.resolve(start + firstCell);
        tr.setSelection(CellSelection.colSelection($lastCell, $firstCell));
        return true;
      }
      function moveTableColumn(table, indexesOrigin, indexesTarget, direction) {
        let rows = transpose(convertTableNodeToArrayOfRows(table));
        rows = moveRowInArrayOfRows(rows, indexesOrigin, indexesTarget, direction);
        rows = transpose(rows);
        return convertArrayOfRowsToTableNode(table, rows);
      }
      function moveRow(moveRowParams) {
        var _a, _b;
        const { tr, originIndex, targetIndex, select, pos } = moveRowParams;
        const $pos = tr.doc.resolve(pos);
        const table = findTable($pos);
        if (!table) return false;
        const indexesOriginRow = (_a = getSelectionRangeInRow(tr, originIndex)) == null ? void 0 : _a.indexes;
        const indexesTargetRow = (_b = getSelectionRangeInRow(tr, targetIndex)) == null ? void 0 : _b.indexes;
        if (!indexesOriginRow || !indexesTargetRow) return false;
        if (indexesOriginRow.includes(targetIndex)) return false;
        const newTable = moveTableRow(
          table.node,
          indexesOriginRow,
          indexesTargetRow,
          0
        );
        tr.replaceWith(table.pos, table.pos + table.node.nodeSize, newTable);
        if (!select) return true;
        const map = TableMap.get(newTable);
        const start = table.start;
        const index = targetIndex;
        const lastCell = map.positionAt(index, map.width - 1, newTable);
        const $lastCell = tr.doc.resolve(start + lastCell);
        const firstCell = map.positionAt(index, 0, newTable);
        const $firstCell = tr.doc.resolve(start + firstCell);
        tr.setSelection(CellSelection.rowSelection($lastCell, $firstCell));
        return true;
      }
      function moveTableRow(table, indexesOrigin, indexesTarget, direction) {
        let rows = convertTableNodeToArrayOfRows(table);
        rows = moveRowInArrayOfRows(rows, indexesOrigin, indexesTarget, direction);
        return convertArrayOfRowsToTableNode(table, rows);
      }
      function selectedRect(state) {
        const sel = state.selection;
        const $pos = selectionCell(state);
        const table = $pos.node(-1);
        const tableStart = $pos.start(-1);
        const map = TableMap.get(table);
        const rect = sel instanceof CellSelection ? map.rectBetween(
          sel.$anchorCell.pos - tableStart,
          sel.$headCell.pos - tableStart
        ) : map.findCell($pos.pos - tableStart);
        return { ...rect, tableStart, map, table };
      }
      function addColumn(tr, { map, tableStart, table }, col) {
        let refColumn = col > 0 ? -1 : 0;
        if (columnIsHeader(map, table, col + refColumn)) {
          refColumn = col == 0 || col == map.width ? null : 0;
        }
        for (let row = 0; row < map.height; row++) {
          const index = row * map.width + col;
          if (col > 0 && col < map.width && map.map[index - 1] == map.map[index]) {
            const pos = map.map[index];
            const cell = table.nodeAt(pos);
            tr.setNodeMarkup(
              tr.mapping.map(tableStart + pos),
              null,
              addColSpan(cell.attrs, col - map.colCount(pos))
            );
            row += cell.attrs.rowspan - 1;
          } else {
            const type = refColumn == null ? tableNodeTypes(table.type.schema).cell : table.nodeAt(map.map[index + refColumn]).type;
            const pos = map.positionAt(row, col, table);
            tr.insert(tr.mapping.map(tableStart + pos), type.createAndFill());
          }
        }
        return tr;
      }
      function addColumnBefore(state, dispatch) {
        if (!isInTable(state)) return false;
        if (dispatch) {
          const rect = selectedRect(state);
          dispatch(addColumn(state.tr, rect, rect.left));
        }
        return true;
      }
      function addColumnAfter(state, dispatch) {
        if (!isInTable(state)) return false;
        if (dispatch) {
          const rect = selectedRect(state);
          dispatch(addColumn(state.tr, rect, rect.right));
        }
        return true;
      }
      function removeColumn(tr, { map, table, tableStart }, col) {
        const mapStart = tr.mapping.maps.length;
        for (let row = 0; row < map.height; ) {
          const index = row * map.width + col;
          const pos = map.map[index];
          const cell = table.nodeAt(pos);
          const attrs = cell.attrs;
          if (col > 0 && map.map[index - 1] == pos || col < map.width - 1 && map.map[index + 1] == pos) {
            tr.setNodeMarkup(
              tr.mapping.slice(mapStart).map(tableStart + pos),
              null,
              removeColSpan(attrs, col - map.colCount(pos))
            );
          } else {
            const start = tr.mapping.slice(mapStart).map(tableStart + pos);
            tr.delete(start, start + cell.nodeSize);
          }
          row += attrs.rowspan;
        }
      }
      function deleteColumn(state, dispatch) {
        if (!isInTable(state)) return false;
        if (dispatch) {
          const rect = selectedRect(state);
          const tr = state.tr;
          if (rect.left == 0 && rect.right == rect.map.width) return false;
          for (let i = rect.right - 1; ; i--) {
            removeColumn(tr, rect, i);
            if (i == rect.left) break;
            const table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
            if (!table) {
              throw RangeError("No table found");
            }
            rect.table = table;
            rect.map = TableMap.get(table);
          }
          dispatch(tr);
        }
        return true;
      }
      function rowIsHeader(map, table, row) {
        var _a;
        const headerCell = tableNodeTypes(table.type.schema).header_cell;
        for (let col = 0; col < map.width; col++)
          if (((_a = table.nodeAt(map.map[col + row * map.width])) == null ? void 0 : _a.type) != headerCell)
            return false;
        return true;
      }
      function addRow(tr, { map, tableStart, table }, row) {
        var _a;
        let rowPos = tableStart;
        for (let i = 0; i < row; i++) rowPos += table.child(i).nodeSize;
        const cells = [];
        let refRow = row > 0 ? -1 : 0;
        if (rowIsHeader(map, table, row + refRow))
          refRow = row == 0 || row == map.height ? null : 0;
        for (let col = 0, index = map.width * row; col < map.width; col++, index++) {
          if (row > 0 && row < map.height && map.map[index] == map.map[index - map.width]) {
            const pos = map.map[index];
            const attrs = table.nodeAt(pos).attrs;
            tr.setNodeMarkup(tableStart + pos, null, {
              ...attrs,
              rowspan: attrs.rowspan + 1
            });
            col += attrs.colspan - 1;
          } else {
            const type = refRow == null ? tableNodeTypes(table.type.schema).cell : (_a = table.nodeAt(map.map[index + refRow * map.width])) == null ? void 0 : _a.type;
            const node = type == null ? void 0 : type.createAndFill();
            if (node) cells.push(node);
          }
        }
        tr.insert(rowPos, tableNodeTypes(table.type.schema).row.create(null, cells));
        return tr;
      }
      function addRowBefore(state, dispatch) {
        if (!isInTable(state)) return false;
        if (dispatch) {
          const rect = selectedRect(state);
          dispatch(addRow(state.tr, rect, rect.top));
        }
        return true;
      }
      function addRowAfter(state, dispatch) {
        if (!isInTable(state)) return false;
        if (dispatch) {
          const rect = selectedRect(state);
          dispatch(addRow(state.tr, rect, rect.bottom));
        }
        return true;
      }
      function removeRow(tr, { map, table, tableStart }, row) {
        let rowPos = 0;
        for (let i = 0; i < row; i++) rowPos += table.child(i).nodeSize;
        const nextRow = rowPos + table.child(row).nodeSize;
        const mapFrom = tr.mapping.maps.length;
        tr.delete(rowPos + tableStart, nextRow + tableStart);
        const seen = /* @__PURE__ */ new Set();
        for (let col = 0, index = row * map.width; col < map.width; col++, index++) {
          const pos = map.map[index];
          if (seen.has(pos)) continue;
          seen.add(pos);
          if (row > 0 && pos == map.map[index - map.width]) {
            const attrs = table.nodeAt(pos).attrs;
            tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + tableStart), null, {
              ...attrs,
              rowspan: attrs.rowspan - 1
            });
            col += attrs.colspan - 1;
          } else if (row < map.height && pos == map.map[index + map.width]) {
            const cell = table.nodeAt(pos);
            const attrs = cell.attrs;
            const copy = cell.type.create(
              { ...attrs, rowspan: cell.attrs.rowspan - 1 },
              cell.content
            );
            const newPos = map.positionAt(row + 1, col, table);
            tr.insert(tr.mapping.slice(mapFrom).map(tableStart + newPos), copy);
            col += attrs.colspan - 1;
          }
        }
      }
      function deleteRow(state, dispatch) {
        if (!isInTable(state)) return false;
        if (dispatch) {
          const rect = selectedRect(state), tr = state.tr;
          if (rect.top == 0 && rect.bottom == rect.map.height) return false;
          for (let i = rect.bottom - 1; ; i--) {
            removeRow(tr, rect, i);
            if (i == rect.top) break;
            const table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
            if (!table) {
              throw RangeError("No table found");
            }
            rect.table = table;
            rect.map = TableMap.get(rect.table);
          }
          dispatch(tr);
        }
        return true;
      }
      function isEmpty(cell) {
        const c = cell.content;
        return c.childCount == 1 && c.child(0).isTextblock && c.child(0).childCount == 0;
      }
      function cellsOverlapRectangle({ width, height, map }, rect) {
        let indexTop = rect.top * width + rect.left, indexLeft = indexTop;
        let indexBottom = (rect.bottom - 1) * width + rect.left, indexRight = indexTop + (rect.right - rect.left - 1);
        for (let i = rect.top; i < rect.bottom; i++) {
          if (rect.left > 0 && map[indexLeft] == map[indexLeft - 1] || rect.right < width && map[indexRight] == map[indexRight + 1])
            return true;
          indexLeft += width;
          indexRight += width;
        }
        for (let i = rect.left; i < rect.right; i++) {
          if (rect.top > 0 && map[indexTop] == map[indexTop - width] || rect.bottom < height && map[indexBottom] == map[indexBottom + width])
            return true;
          indexTop++;
          indexBottom++;
        }
        return false;
      }
      function mergeCells(state, dispatch) {
        const sel = state.selection;
        if (!(sel instanceof CellSelection) || sel.$anchorCell.pos == sel.$headCell.pos)
          return false;
        const rect = selectedRect(state), { map } = rect;
        if (cellsOverlapRectangle(map, rect)) return false;
        if (dispatch) {
          const tr = state.tr;
          const seen = {};
          let content = import_prosemirror_model2.Fragment.empty;
          let mergedPos;
          let mergedCell;
          for (let row = rect.top; row < rect.bottom; row++) {
            for (let col = rect.left; col < rect.right; col++) {
              const cellPos = map.map[row * map.width + col];
              const cell = rect.table.nodeAt(cellPos);
              if (seen[cellPos] || !cell) continue;
              seen[cellPos] = true;
              if (mergedPos == null) {
                mergedPos = cellPos;
                mergedCell = cell;
              } else {
                if (!isEmpty(cell)) content = content.append(cell.content);
                const mapped = tr.mapping.map(cellPos + rect.tableStart);
                tr.delete(mapped, mapped + cell.nodeSize);
              }
            }
          }
          if (mergedPos == null || mergedCell == null) {
            return true;
          }
          tr.setNodeMarkup(mergedPos + rect.tableStart, null, {
            ...addColSpan(
              mergedCell.attrs,
              mergedCell.attrs.colspan,
              rect.right - rect.left - mergedCell.attrs.colspan
            ),
            rowspan: rect.bottom - rect.top
          });
          if (content.size) {
            const end = mergedPos + 1 + mergedCell.content.size;
            const start = isEmpty(mergedCell) ? mergedPos + 1 : end;
            tr.replaceWith(start + rect.tableStart, end + rect.tableStart, content);
          }
          tr.setSelection(
            new CellSelection(tr.doc.resolve(mergedPos + rect.tableStart))
          );
          dispatch(tr);
        }
        return true;
      }
      function splitCell(state, dispatch) {
        const nodeTypes = tableNodeTypes(state.schema);
        return splitCellWithType(({ node }) => {
          return nodeTypes[node.type.spec.tableRole];
        })(state, dispatch);
      }
      function splitCellWithType(getCellType) {
        return (state, dispatch) => {
          var _a;
          const sel = state.selection;
          let cellNode;
          let cellPos;
          if (!(sel instanceof CellSelection)) {
            cellNode = cellWrapping(sel.$from);
            if (!cellNode) return false;
            cellPos = (_a = cellAround(sel.$from)) == null ? void 0 : _a.pos;
          } else {
            if (sel.$anchorCell.pos != sel.$headCell.pos) return false;
            cellNode = sel.$anchorCell.nodeAfter;
            cellPos = sel.$anchorCell.pos;
          }
          if (cellNode == null || cellPos == null) {
            return false;
          }
          if (cellNode.attrs.colspan == 1 && cellNode.attrs.rowspan == 1) {
            return false;
          }
          if (dispatch) {
            let baseAttrs = cellNode.attrs;
            const attrs = [];
            const colwidth = baseAttrs.colwidth;
            if (baseAttrs.rowspan > 1) baseAttrs = { ...baseAttrs, rowspan: 1 };
            if (baseAttrs.colspan > 1) baseAttrs = { ...baseAttrs, colspan: 1 };
            const rect = selectedRect(state), tr = state.tr;
            for (let i = 0; i < rect.right - rect.left; i++)
              attrs.push(
                colwidth ? {
                  ...baseAttrs,
                  colwidth: colwidth && colwidth[i] ? [colwidth[i]] : null
                } : baseAttrs
              );
            let lastCell;
            for (let row = rect.top; row < rect.bottom; row++) {
              let pos = rect.map.positionAt(row, rect.left, rect.table);
              if (row == rect.top) pos += cellNode.nodeSize;
              for (let col = rect.left, i = 0; col < rect.right; col++, i++) {
                if (col == rect.left && row == rect.top) continue;
                tr.insert(
                  lastCell = tr.mapping.map(pos + rect.tableStart, 1),
                  getCellType({ node: cellNode, row, col }).createAndFill(attrs[i])
                );
              }
            }
            tr.setNodeMarkup(
              cellPos,
              getCellType({ node: cellNode, row: rect.top, col: rect.left }),
              attrs[0]
            );
            if (sel instanceof CellSelection)
              tr.setSelection(
                new CellSelection(
                  tr.doc.resolve(sel.$anchorCell.pos),
                  lastCell ? tr.doc.resolve(lastCell) : void 0
                )
              );
            dispatch(tr);
          }
          return true;
        };
      }
      function setCellAttr(name, value) {
        return function(state, dispatch) {
          if (!isInTable(state)) return false;
          const $cell = selectionCell(state);
          if ($cell.nodeAfter.attrs[name] === value) return false;
          if (dispatch) {
            const tr = state.tr;
            if (state.selection instanceof CellSelection)
              state.selection.forEachCell((node, pos) => {
                if (node.attrs[name] !== value)
                  tr.setNodeMarkup(pos, null, {
                    ...node.attrs,
                    [name]: value
                  });
              });
            else
              tr.setNodeMarkup($cell.pos, null, {
                ...$cell.nodeAfter.attrs,
                [name]: value
              });
            dispatch(tr);
          }
          return true;
        };
      }
      function deprecated_toggleHeader(type) {
        return function(state, dispatch) {
          if (!isInTable(state)) return false;
          if (dispatch) {
            const types = tableNodeTypes(state.schema);
            const rect = selectedRect(state), tr = state.tr;
            const cells = rect.map.cellsInRect(
              type == "column" ? {
                left: rect.left,
                top: 0,
                right: rect.right,
                bottom: rect.map.height
              } : type == "row" ? {
                left: 0,
                top: rect.top,
                right: rect.map.width,
                bottom: rect.bottom
              } : rect
            );
            const nodes = cells.map((pos) => rect.table.nodeAt(pos));
            for (let i = 0; i < cells.length; i++)
              if (nodes[i].type == types.header_cell)
                tr.setNodeMarkup(
                  rect.tableStart + cells[i],
                  types.cell,
                  nodes[i].attrs
                );
            if (tr.steps.length == 0)
              for (let i = 0; i < cells.length; i++)
                tr.setNodeMarkup(
                  rect.tableStart + cells[i],
                  types.header_cell,
                  nodes[i].attrs
                );
            dispatch(tr);
          }
          return true;
        };
      }
      function isHeaderEnabledByType(type, rect, types) {
        const cellPositions = rect.map.cellsInRect({
          left: 0,
          top: 0,
          right: type == "row" ? rect.map.width : 1,
          bottom: type == "column" ? rect.map.height : 1
        });
        for (let i = 0; i < cellPositions.length; i++) {
          const cell = rect.table.nodeAt(cellPositions[i]);
          if (cell && cell.type !== types.header_cell) {
            return false;
          }
        }
        return true;
      }
      function toggleHeader(type, options) {
        options = options || { useDeprecatedLogic: false };
        if (options.useDeprecatedLogic) return deprecated_toggleHeader(type);
        return function(state, dispatch) {
          if (!isInTable(state)) return false;
          if (dispatch) {
            const types = tableNodeTypes(state.schema);
            const rect = selectedRect(state), tr = state.tr;
            const isHeaderRowEnabled = isHeaderEnabledByType("row", rect, types);
            const isHeaderColumnEnabled = isHeaderEnabledByType(
              "column",
              rect,
              types
            );
            const isHeaderEnabled = type === "column" ? isHeaderRowEnabled : type === "row" ? isHeaderColumnEnabled : false;
            const selectionStartsAt = isHeaderEnabled ? 1 : 0;
            const cellsRect = type == "column" ? {
              left: 0,
              top: selectionStartsAt,
              right: 1,
              bottom: rect.map.height
            } : type == "row" ? {
              left: selectionStartsAt,
              top: 0,
              right: rect.map.width,
              bottom: 1
            } : rect;
            const newType = type == "column" ? isHeaderColumnEnabled ? types.cell : types.header_cell : type == "row" ? isHeaderRowEnabled ? types.cell : types.header_cell : types.cell;
            rect.map.cellsInRect(cellsRect).forEach((relativeCellPos) => {
              const cellPos = relativeCellPos + rect.tableStart;
              const cell = tr.doc.nodeAt(cellPos);
              if (cell) {
                tr.setNodeMarkup(cellPos, newType, cell.attrs);
              }
            });
            dispatch(tr);
          }
          return true;
        };
      }
      var toggleHeaderRow = toggleHeader("row", {
        useDeprecatedLogic: true
      });
      var toggleHeaderColumn = toggleHeader("column", {
        useDeprecatedLogic: true
      });
      var toggleHeaderCell = toggleHeader("cell", {
        useDeprecatedLogic: true
      });
      function findNextCell($cell, dir) {
        if (dir < 0) {
          const before = $cell.nodeBefore;
          if (before) return $cell.pos - before.nodeSize;
          for (let row = $cell.index(-1) - 1, rowEnd = $cell.before(); row >= 0; row--) {
            const rowNode = $cell.node(-1).child(row);
            const lastChild = rowNode.lastChild;
            if (lastChild) {
              return rowEnd - 1 - lastChild.nodeSize;
            }
            rowEnd -= rowNode.nodeSize;
          }
        } else {
          if ($cell.index() < $cell.parent.childCount - 1) {
            return $cell.pos + $cell.nodeAfter.nodeSize;
          }
          const table = $cell.node(-1);
          for (let row = $cell.indexAfter(-1), rowStart = $cell.after(); row < table.childCount; row++) {
            const rowNode = table.child(row);
            if (rowNode.childCount) return rowStart + 1;
            rowStart += rowNode.nodeSize;
          }
        }
        return null;
      }
      function goToNextCell(direction) {
        return function(state, dispatch) {
          if (!isInTable(state)) return false;
          const cell = findNextCell(selectionCell(state), direction);
          if (cell == null) return false;
          if (dispatch) {
            const $cell = state.doc.resolve(cell);
            dispatch(
              state.tr.setSelection(import_prosemirror_state4.TextSelection.between($cell, moveCellForward($cell))).scrollIntoView()
            );
          }
          return true;
        };
      }
      function deleteTable(state, dispatch) {
        const $pos = state.selection.$anchor;
        for (let d = $pos.depth; d > 0; d--) {
          const node = $pos.node(d);
          if (node.type.spec.tableRole == "table") {
            if (dispatch)
              dispatch(
                state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView()
              );
            return true;
          }
        }
        return false;
      }
      function deleteCellSelection(state, dispatch) {
        const sel = state.selection;
        if (!(sel instanceof CellSelection)) return false;
        if (dispatch) {
          const tr = state.tr;
          const baseContent = tableNodeTypes(state.schema).cell.createAndFill().content;
          sel.forEachCell((cell, pos) => {
            if (!cell.content.eq(baseContent))
              tr.replace(
                tr.mapping.map(pos + 1),
                tr.mapping.map(pos + cell.nodeSize - 1),
                new import_prosemirror_model2.Slice(baseContent, 0, 0)
              );
          });
          if (tr.docChanged) dispatch(tr);
        }
        return true;
      }
      function moveTableRow2(options) {
        return (state, dispatch) => {
          const {
            from: originIndex,
            to: targetIndex,
            select = true,
            pos = state.selection.from
          } = options;
          const tr = state.tr;
          if (moveRow({ tr, originIndex, targetIndex, select, pos })) {
            dispatch == null ? void 0 : dispatch(tr);
            return true;
          }
          return false;
        };
      }
      function moveTableColumn2(options) {
        return (state, dispatch) => {
          const {
            from: originIndex,
            to: targetIndex,
            select = true,
            pos = state.selection.from
          } = options;
          const tr = state.tr;
          if (moveColumn({ tr, originIndex, targetIndex, select, pos })) {
            dispatch == null ? void 0 : dispatch(tr);
            return true;
          }
          return false;
        };
      }
      var import_prosemirror_model3 = require_dist2();
      var import_prosemirror_transform = require_dist3();
      function pastedCells(slice) {
        if (!slice.size) return null;
        let { content, openStart, openEnd } = slice;
        while (content.childCount == 1 && (openStart > 0 && openEnd > 0 || content.child(0).type.spec.tableRole == "table")) {
          openStart--;
          openEnd--;
          content = content.child(0).content;
        }
        const first = content.child(0);
        const role = first.type.spec.tableRole;
        const schema = first.type.schema, rows = [];
        if (role == "row") {
          for (let i = 0; i < content.childCount; i++) {
            let cells = content.child(i).content;
            const left = i ? 0 : Math.max(0, openStart - 1);
            const right = i < content.childCount - 1 ? 0 : Math.max(0, openEnd - 1);
            if (left || right)
              cells = fitSlice(
                tableNodeTypes(schema).row,
                new import_prosemirror_model3.Slice(cells, left, right)
              ).content;
            rows.push(cells);
          }
        } else if (role == "cell" || role == "header_cell") {
          rows.push(
            openStart || openEnd ? fitSlice(
              tableNodeTypes(schema).row,
              new import_prosemirror_model3.Slice(content, openStart, openEnd)
            ).content : content
          );
        } else {
          return null;
        }
        return ensureRectangular(schema, rows);
      }
      function ensureRectangular(schema, rows) {
        const widths = [];
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          for (let j = row.childCount - 1; j >= 0; j--) {
            const { rowspan, colspan } = row.child(j).attrs;
            for (let r = i; r < i + rowspan; r++)
              widths[r] = (widths[r] || 0) + colspan;
          }
        }
        let width = 0;
        for (let r = 0; r < widths.length; r++) width = Math.max(width, widths[r]);
        for (let r = 0; r < widths.length; r++) {
          if (r >= rows.length) rows.push(import_prosemirror_model3.Fragment.empty);
          if (widths[r] < width) {
            const empty = tableNodeTypes(schema).cell.createAndFill();
            const cells = [];
            for (let i = widths[r]; i < width; i++) {
              cells.push(empty);
            }
            rows[r] = rows[r].append(import_prosemirror_model3.Fragment.from(cells));
          }
        }
        return { height: rows.length, width, rows };
      }
      function fitSlice(nodeType, slice) {
        const node = nodeType.createAndFill();
        const tr = new import_prosemirror_transform.Transform(node).replace(0, node.content.size, slice);
        return tr.doc;
      }
      function clipCells({ width, height, rows }, newWidth, newHeight) {
        if (width != newWidth) {
          const added = [];
          const newRows = [];
          for (let row = 0; row < rows.length; row++) {
            const frag = rows[row], cells = [];
            for (let col = added[row] || 0, i = 0; col < newWidth; i++) {
              let cell = frag.child(i % frag.childCount);
              if (col + cell.attrs.colspan > newWidth)
                cell = cell.type.createChecked(
                  removeColSpan(
                    cell.attrs,
                    cell.attrs.colspan,
                    col + cell.attrs.colspan - newWidth
                  ),
                  cell.content
                );
              cells.push(cell);
              col += cell.attrs.colspan;
              for (let j = 1; j < cell.attrs.rowspan; j++)
                added[row + j] = (added[row + j] || 0) + cell.attrs.colspan;
            }
            newRows.push(import_prosemirror_model3.Fragment.from(cells));
          }
          rows = newRows;
          width = newWidth;
        }
        if (height != newHeight) {
          const newRows = [];
          for (let row = 0, i = 0; row < newHeight; row++, i++) {
            const cells = [], source = rows[i % height];
            for (let j = 0; j < source.childCount; j++) {
              let cell = source.child(j);
              if (row + cell.attrs.rowspan > newHeight)
                cell = cell.type.create(
                  {
                    ...cell.attrs,
                    rowspan: Math.max(1, newHeight - cell.attrs.rowspan)
                  },
                  cell.content
                );
              cells.push(cell);
            }
            newRows.push(import_prosemirror_model3.Fragment.from(cells));
          }
          rows = newRows;
          height = newHeight;
        }
        return { width, height, rows };
      }
      function growTable(tr, map, table, start, width, height, mapFrom) {
        const schema = tr.doc.type.schema;
        const types = tableNodeTypes(schema);
        let empty;
        let emptyHead;
        if (width > map.width) {
          for (let row = 0, rowEnd = 0; row < map.height; row++) {
            const rowNode = table.child(row);
            rowEnd += rowNode.nodeSize;
            const cells = [];
            let add;
            if (rowNode.lastChild == null || rowNode.lastChild.type == types.cell)
              add = empty || (empty = types.cell.createAndFill());
            else add = emptyHead || (emptyHead = types.header_cell.createAndFill());
            for (let i = map.width; i < width; i++) cells.push(add);
            tr.insert(tr.mapping.slice(mapFrom).map(rowEnd - 1 + start), cells);
          }
        }
        if (height > map.height) {
          const cells = [];
          for (let i = 0, start2 = (map.height - 1) * map.width; i < Math.max(map.width, width); i++) {
            const header = i >= map.width ? false : table.nodeAt(map.map[start2 + i]).type == types.header_cell;
            cells.push(
              header ? emptyHead || (emptyHead = types.header_cell.createAndFill()) : empty || (empty = types.cell.createAndFill())
            );
          }
          const emptyRow = types.row.create(null, import_prosemirror_model3.Fragment.from(cells)), rows = [];
          for (let i = map.height; i < height; i++) rows.push(emptyRow);
          tr.insert(tr.mapping.slice(mapFrom).map(start + table.nodeSize - 2), rows);
        }
        return !!(empty || emptyHead);
      }
      function isolateHorizontal(tr, map, table, start, left, right, top, mapFrom) {
        if (top == 0 || top == map.height) return false;
        let found = false;
        for (let col = left; col < right; col++) {
          const index = top * map.width + col, pos = map.map[index];
          if (map.map[index - map.width] == pos) {
            found = true;
            const cell = table.nodeAt(pos);
            const { top: cellTop, left: cellLeft } = map.findCell(pos);
            tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + start), null, {
              ...cell.attrs,
              rowspan: top - cellTop
            });
            tr.insert(
              tr.mapping.slice(mapFrom).map(map.positionAt(top, cellLeft, table)),
              cell.type.createAndFill({
                ...cell.attrs,
                rowspan: cellTop + cell.attrs.rowspan - top
              })
            );
            col += cell.attrs.colspan - 1;
          }
        }
        return found;
      }
      function isolateVertical(tr, map, table, start, top, bottom, left, mapFrom) {
        if (left == 0 || left == map.width) return false;
        let found = false;
        for (let row = top; row < bottom; row++) {
          const index = row * map.width + left, pos = map.map[index];
          if (map.map[index - 1] == pos) {
            found = true;
            const cell = table.nodeAt(pos);
            const cellLeft = map.colCount(pos);
            const updatePos = tr.mapping.slice(mapFrom).map(pos + start);
            tr.setNodeMarkup(
              updatePos,
              null,
              removeColSpan(
                cell.attrs,
                left - cellLeft,
                cell.attrs.colspan - (left - cellLeft)
              )
            );
            tr.insert(
              updatePos + cell.nodeSize,
              cell.type.createAndFill(
                removeColSpan(cell.attrs, 0, left - cellLeft)
              )
            );
            row += cell.attrs.rowspan - 1;
          }
        }
        return found;
      }
      function insertCells(state, dispatch, tableStart, rect, cells) {
        let table = tableStart ? state.doc.nodeAt(tableStart - 1) : state.doc;
        if (!table) {
          throw new Error("No table found");
        }
        let map = TableMap.get(table);
        const { top, left } = rect;
        const right = left + cells.width, bottom = top + cells.height;
        const tr = state.tr;
        let mapFrom = 0;
        function recomp() {
          table = tableStart ? tr.doc.nodeAt(tableStart - 1) : tr.doc;
          if (!table) {
            throw new Error("No table found");
          }
          map = TableMap.get(table);
          mapFrom = tr.mapping.maps.length;
        }
        if (growTable(tr, map, table, tableStart, right, bottom, mapFrom)) recomp();
        if (isolateHorizontal(tr, map, table, tableStart, left, right, top, mapFrom))
          recomp();
        if (isolateHorizontal(tr, map, table, tableStart, left, right, bottom, mapFrom))
          recomp();
        if (isolateVertical(tr, map, table, tableStart, top, bottom, left, mapFrom))
          recomp();
        if (isolateVertical(tr, map, table, tableStart, top, bottom, right, mapFrom))
          recomp();
        for (let row = top; row < bottom; row++) {
          const from = map.positionAt(row, left, table), to = map.positionAt(row, right, table);
          tr.replace(
            tr.mapping.slice(mapFrom).map(from + tableStart),
            tr.mapping.slice(mapFrom).map(to + tableStart),
            new import_prosemirror_model3.Slice(cells.rows[row - top], 0, 0)
          );
        }
        recomp();
        tr.setSelection(
          new CellSelection(
            tr.doc.resolve(tableStart + map.positionAt(top, left, table)),
            tr.doc.resolve(tableStart + map.positionAt(bottom - 1, right - 1, table))
          )
        );
        dispatch(tr);
      }
      var handleKeyDown = (0, import_prosemirror_keymap.keydownHandler)({
        ArrowLeft: arrow("horiz", -1),
        ArrowRight: arrow("horiz", 1),
        ArrowUp: arrow("vert", -1),
        ArrowDown: arrow("vert", 1),
        "Shift-ArrowLeft": shiftArrow("horiz", -1),
        "Shift-ArrowRight": shiftArrow("horiz", 1),
        "Shift-ArrowUp": shiftArrow("vert", -1),
        "Shift-ArrowDown": shiftArrow("vert", 1),
        Backspace: deleteCellSelection,
        "Mod-Backspace": deleteCellSelection,
        Delete: deleteCellSelection,
        "Mod-Delete": deleteCellSelection
      });
      function maybeSetSelection(state, dispatch, selection) {
        if (selection.eq(state.selection)) return false;
        if (dispatch) dispatch(state.tr.setSelection(selection).scrollIntoView());
        return true;
      }
      function arrow(axis, dir) {
        return (state, dispatch, view) => {
          if (!view) return false;
          const sel = state.selection;
          if (sel instanceof CellSelection) {
            return maybeSetSelection(
              state,
              dispatch,
              import_prosemirror_state5.Selection.near(sel.$headCell, dir)
            );
          }
          if (axis != "horiz" && !sel.empty) return false;
          const end = atEndOfCell(view, axis, dir);
          if (end == null) return false;
          if (axis == "horiz") {
            return maybeSetSelection(
              state,
              dispatch,
              import_prosemirror_state5.Selection.near(state.doc.resolve(sel.head + dir), dir)
            );
          } else {
            const $cell = state.doc.resolve(end);
            const $next = nextCell($cell, axis, dir);
            let newSel;
            if ($next) newSel = import_prosemirror_state5.Selection.near($next, 1);
            else if (dir < 0)
              newSel = import_prosemirror_state5.Selection.near(state.doc.resolve($cell.before(-1)), -1);
            else newSel = import_prosemirror_state5.Selection.near(state.doc.resolve($cell.after(-1)), 1);
            return maybeSetSelection(state, dispatch, newSel);
          }
        };
      }
      function shiftArrow(axis, dir) {
        return (state, dispatch, view) => {
          if (!view) return false;
          const sel = state.selection;
          let cellSel;
          if (sel instanceof CellSelection) {
            cellSel = sel;
          } else {
            const end = atEndOfCell(view, axis, dir);
            if (end == null) return false;
            cellSel = new CellSelection(state.doc.resolve(end));
          }
          const $head = nextCell(cellSel.$headCell, axis, dir);
          if (!$head) return false;
          return maybeSetSelection(
            state,
            dispatch,
            new CellSelection(cellSel.$anchorCell, $head)
          );
        };
      }
      function handleTripleClick(view, pos) {
        const doc = view.state.doc, $cell = cellAround(doc.resolve(pos));
        if (!$cell) return false;
        view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));
        return true;
      }
      function handlePaste(view, _, slice) {
        if (!isInTable(view.state)) return false;
        let cells = pastedCells(slice);
        const sel = view.state.selection;
        if (sel instanceof CellSelection) {
          if (!cells)
            cells = {
              width: 1,
              height: 1,
              rows: [
                import_prosemirror_model4.Fragment.from(
                  fitSlice(tableNodeTypes(view.state.schema).cell, slice)
                )
              ]
            };
          const table = sel.$anchorCell.node(-1);
          const start = sel.$anchorCell.start(-1);
          const rect = TableMap.get(table).rectBetween(
            sel.$anchorCell.pos - start,
            sel.$headCell.pos - start
          );
          cells = clipCells(cells, rect.right - rect.left, rect.bottom - rect.top);
          insertCells(view.state, view.dispatch, start, rect, cells);
          return true;
        } else if (cells) {
          const $cell = selectionCell(view.state);
          const start = $cell.start(-1);
          insertCells(
            view.state,
            view.dispatch,
            start,
            TableMap.get($cell.node(-1)).findCell($cell.pos - start),
            cells
          );
          return true;
        } else {
          return false;
        }
      }
      function handleMouseDown(view, startEvent) {
        var _a;
        if (startEvent.ctrlKey || startEvent.metaKey) return;
        const startDOMCell = domInCell(view, startEvent.target);
        let $anchor;
        if (startEvent.shiftKey && view.state.selection instanceof CellSelection) {
          setCellSelection(view.state.selection.$anchorCell, startEvent);
          startEvent.preventDefault();
        } else if (startEvent.shiftKey && startDOMCell && ($anchor = cellAround(view.state.selection.$anchor)) != null && ((_a = cellUnderMouse(view, startEvent)) == null ? void 0 : _a.pos) != $anchor.pos) {
          setCellSelection($anchor, startEvent);
          startEvent.preventDefault();
        } else if (!startDOMCell) {
          return;
        }
        function setCellSelection($anchor2, event) {
          let $head = cellUnderMouse(view, event);
          const starting = tableEditingKey.getState(view.state) == null;
          if (!$head || !inSameTable($anchor2, $head)) {
            if (starting) $head = $anchor2;
            else return;
          }
          const selection = new CellSelection($anchor2, $head);
          if (starting || !view.state.selection.eq(selection)) {
            const tr = view.state.tr.setSelection(selection);
            if (starting) tr.setMeta(tableEditingKey, $anchor2.pos);
            view.dispatch(tr);
          }
        }
        function stop() {
          view.root.removeEventListener("mouseup", stop);
          view.root.removeEventListener("dragstart", stop);
          view.root.removeEventListener("mousemove", move);
          if (tableEditingKey.getState(view.state) != null)
            view.dispatch(view.state.tr.setMeta(tableEditingKey, -1));
        }
        function move(_event) {
          const event = _event;
          const anchor = tableEditingKey.getState(view.state);
          let $anchor2;
          if (anchor != null) {
            $anchor2 = view.state.doc.resolve(anchor);
          } else if (domInCell(view, event.target) != startDOMCell) {
            $anchor2 = cellUnderMouse(view, startEvent);
            if (!$anchor2) return stop();
          }
          if ($anchor2) setCellSelection($anchor2, event);
        }
        view.root.addEventListener("mouseup", stop);
        view.root.addEventListener("dragstart", stop);
        view.root.addEventListener("mousemove", move);
      }
      function atEndOfCell(view, axis, dir) {
        if (!(view.state.selection instanceof import_prosemirror_state5.TextSelection)) return null;
        const { $head } = view.state.selection;
        for (let d = $head.depth - 1; d >= 0; d--) {
          const parent = $head.node(d), index = dir < 0 ? $head.index(d) : $head.indexAfter(d);
          if (index != (dir < 0 ? 0 : parent.childCount)) return null;
          if (parent.type.spec.tableRole == "cell" || parent.type.spec.tableRole == "header_cell") {
            const cellPos = $head.before(d);
            const dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
            return view.endOfTextblock(dirStr) ? cellPos : null;
          }
        }
        return null;
      }
      function domInCell(view, dom) {
        for (; dom && dom != view.dom; dom = dom.parentNode) {
          if (dom.nodeName == "TD" || dom.nodeName == "TH") {
            return dom;
          }
        }
        return null;
      }
      function cellUnderMouse(view, event) {
        const mousePos = view.posAtCoords({
          left: event.clientX,
          top: event.clientY
        });
        if (!mousePos) return null;
        return mousePos ? cellAround(view.state.doc.resolve(mousePos.pos)) : null;
      }
      var import_prosemirror_state6 = require_dist4();
      var import_prosemirror_view2 = require_dist6();
      var TableView = class {
        constructor(node, defaultCellMinWidth) {
          this.node = node;
          this.defaultCellMinWidth = defaultCellMinWidth;
          this.dom = document.createElement("div");
          this.dom.className = "tableWrapper";
          this.table = this.dom.appendChild(document.createElement("table"));
          this.table.style.setProperty(
            "--default-cell-min-width",
            `${defaultCellMinWidth}px`
          );
          this.colgroup = this.table.appendChild(document.createElement("colgroup"));
          updateColumnsOnResize(node, this.colgroup, this.table, defaultCellMinWidth);
          this.contentDOM = this.table.appendChild(document.createElement("tbody"));
        }
        update(node) {
          if (node.type != this.node.type) return false;
          this.node = node;
          updateColumnsOnResize(
            node,
            this.colgroup,
            this.table,
            this.defaultCellMinWidth
          );
          return true;
        }
        ignoreMutation(record) {
          return record.type == "attributes" && (record.target == this.table || this.colgroup.contains(record.target));
        }
      };
      function updateColumnsOnResize(node, colgroup, table, defaultCellMinWidth, overrideCol, overrideValue) {
        var _a;
        let totalWidth = 0;
        let fixedWidth = true;
        let nextDOM = colgroup.firstChild;
        const row = node.firstChild;
        if (!row) return;
        for (let i = 0, col = 0; i < row.childCount; i++) {
          const { colspan, colwidth } = row.child(i).attrs;
          for (let j = 0; j < colspan; j++, col++) {
            const hasWidth = overrideCol == col ? overrideValue : colwidth && colwidth[j];
            const cssWidth = hasWidth ? hasWidth + "px" : "";
            totalWidth += hasWidth || defaultCellMinWidth;
            if (!hasWidth) fixedWidth = false;
            if (!nextDOM) {
              const col2 = document.createElement("col");
              col2.style.width = cssWidth;
              colgroup.appendChild(col2);
            } else {
              if (nextDOM.style.width != cssWidth) {
                nextDOM.style.width = cssWidth;
              }
              nextDOM = nextDOM.nextSibling;
            }
          }
        }
        while (nextDOM) {
          const after = nextDOM.nextSibling;
          (_a = nextDOM.parentNode) == null ? void 0 : _a.removeChild(nextDOM);
          nextDOM = after;
        }
        if (fixedWidth) {
          table.style.width = totalWidth + "px";
          table.style.minWidth = "";
        } else {
          table.style.width = "";
          table.style.minWidth = totalWidth + "px";
        }
      }
      var columnResizingPluginKey = new import_prosemirror_state6.PluginKey(
        "tableColumnResizing"
      );
      function columnResizing({
        handleWidth = 5,
        cellMinWidth = 25,
        defaultCellMinWidth = 100,
        View = TableView,
        lastColumnResizable = true
      } = {}) {
        const plugin = new import_prosemirror_state6.Plugin({
          key: columnResizingPluginKey,
          state: {
            init(_, state) {
              var _a, _b;
              const nodeViews = (_b = (_a = plugin.spec) == null ? void 0 : _a.props) == null ? void 0 : _b.nodeViews;
              const tableName = tableNodeTypes(state.schema).table.name;
              if (View && nodeViews) {
                nodeViews[tableName] = (node, view) => {
                  return new View(node, defaultCellMinWidth, view);
                };
              }
              return new ResizeState(-1, false);
            },
            apply(tr, prev) {
              return prev.apply(tr);
            }
          },
          props: {
            attributes: (state) => {
              const pluginState = columnResizingPluginKey.getState(state);
              return pluginState && pluginState.activeHandle > -1 ? { class: "resize-cursor" } : {};
            },
            handleDOMEvents: {
              mousemove: (view, event) => {
                handleMouseMove(view, event, handleWidth, lastColumnResizable);
              },
              mouseleave: (view) => {
                handleMouseLeave(view);
              },
              mousedown: (view, event) => {
                handleMouseDown2(view, event, cellMinWidth, defaultCellMinWidth);
              }
            },
            decorations: (state) => {
              const pluginState = columnResizingPluginKey.getState(state);
              if (pluginState && pluginState.activeHandle > -1) {
                return handleDecorations(state, pluginState.activeHandle);
              }
            },
            nodeViews: {}
          }
        });
        return plugin;
      }
      var ResizeState = class _ResizeState {
        constructor(activeHandle, dragging) {
          this.activeHandle = activeHandle;
          this.dragging = dragging;
        }
        apply(tr) {
          const state = this;
          const action = tr.getMeta(columnResizingPluginKey);
          if (action && action.setHandle != null)
            return new _ResizeState(action.setHandle, false);
          if (action && action.setDragging !== void 0)
            return new _ResizeState(state.activeHandle, action.setDragging);
          if (state.activeHandle > -1 && tr.docChanged) {
            let handle = tr.mapping.map(state.activeHandle, -1);
            if (!pointsAtCell(tr.doc.resolve(handle))) {
              handle = -1;
            }
            return new _ResizeState(handle, state.dragging);
          }
          return state;
        }
      };
      function handleMouseMove(view, event, handleWidth, lastColumnResizable) {
        if (!view.editable) return;
        const pluginState = columnResizingPluginKey.getState(view.state);
        if (!pluginState) return;
        if (!pluginState.dragging) {
          const target = domCellAround(event.target);
          let cell = -1;
          if (target) {
            const { left, right } = target.getBoundingClientRect();
            if (event.clientX - left <= handleWidth)
              cell = edgeCell(view, event, "left", handleWidth);
            else if (right - event.clientX <= handleWidth)
              cell = edgeCell(view, event, "right", handleWidth);
          }
          if (cell != pluginState.activeHandle) {
            if (!lastColumnResizable && cell !== -1) {
              const $cell = view.state.doc.resolve(cell);
              const table = $cell.node(-1);
              const map = TableMap.get(table);
              const tableStart = $cell.start(-1);
              const col = map.colCount($cell.pos - tableStart) + $cell.nodeAfter.attrs.colspan - 1;
              if (col == map.width - 1) {
                return;
              }
            }
            updateHandle(view, cell);
          }
        }
      }
      function handleMouseLeave(view) {
        if (!view.editable) return;
        const pluginState = columnResizingPluginKey.getState(view.state);
        if (pluginState && pluginState.activeHandle > -1 && !pluginState.dragging)
          updateHandle(view, -1);
      }
      function handleMouseDown2(view, event, cellMinWidth, defaultCellMinWidth) {
        var _a;
        if (!view.editable) return false;
        const win = (_a = view.dom.ownerDocument.defaultView) != null ? _a : window;
        const pluginState = columnResizingPluginKey.getState(view.state);
        if (!pluginState || pluginState.activeHandle == -1 || pluginState.dragging)
          return false;
        const cell = view.state.doc.nodeAt(pluginState.activeHandle);
        const width = currentColWidth(view, pluginState.activeHandle, cell.attrs);
        view.dispatch(
          view.state.tr.setMeta(columnResizingPluginKey, {
            setDragging: { startX: event.clientX, startWidth: width }
          })
        );
        function finish(event2) {
          win.removeEventListener("mouseup", finish);
          win.removeEventListener("mousemove", move);
          const pluginState2 = columnResizingPluginKey.getState(view.state);
          if (pluginState2 == null ? void 0 : pluginState2.dragging) {
            updateColumnWidth(
              view,
              pluginState2.activeHandle,
              draggedWidth(pluginState2.dragging, event2, cellMinWidth)
            );
            view.dispatch(
              view.state.tr.setMeta(columnResizingPluginKey, { setDragging: null })
            );
          }
        }
        function move(event2) {
          if (!event2.which) return finish(event2);
          const pluginState2 = columnResizingPluginKey.getState(view.state);
          if (!pluginState2) return;
          if (pluginState2.dragging) {
            const dragged = draggedWidth(pluginState2.dragging, event2, cellMinWidth);
            displayColumnWidth(
              view,
              pluginState2.activeHandle,
              dragged,
              defaultCellMinWidth
            );
          }
        }
        displayColumnWidth(
          view,
          pluginState.activeHandle,
          width,
          defaultCellMinWidth
        );
        win.addEventListener("mouseup", finish);
        win.addEventListener("mousemove", move);
        event.preventDefault();
        return true;
      }
      function currentColWidth(view, cellPos, { colspan, colwidth }) {
        const width = colwidth && colwidth[colwidth.length - 1];
        if (width) return width;
        const dom = view.domAtPos(cellPos);
        const node = dom.node.childNodes[dom.offset];
        let domWidth = node.offsetWidth, parts = colspan;
        if (colwidth) {
          for (let i = 0; i < colspan; i++)
            if (colwidth[i]) {
              domWidth -= colwidth[i];
              parts--;
            }
        }
        return domWidth / parts;
      }
      function domCellAround(target) {
        while (target && target.nodeName != "TD" && target.nodeName != "TH")
          target = target.classList && target.classList.contains("ProseMirror") ? null : target.parentNode;
        return target;
      }
      function edgeCell(view, event, side, handleWidth) {
        const offset = side == "right" ? -handleWidth : handleWidth;
        const found = view.posAtCoords({
          left: event.clientX + offset,
          top: event.clientY
        });
        if (!found) return -1;
        const { pos } = found;
        const $cell = cellAround(view.state.doc.resolve(pos));
        if (!$cell) return -1;
        if (side == "right") return $cell.pos;
        const map = TableMap.get($cell.node(-1)), start = $cell.start(-1);
        const index = map.map.indexOf($cell.pos - start);
        return index % map.width == 0 ? -1 : start + map.map[index - 1];
      }
      function draggedWidth(dragging, event, resizeMinWidth) {
        const offset = event.clientX - dragging.startX;
        return Math.max(resizeMinWidth, dragging.startWidth + offset);
      }
      function updateHandle(view, value) {
        view.dispatch(
          view.state.tr.setMeta(columnResizingPluginKey, { setHandle: value })
        );
      }
      function updateColumnWidth(view, cell, width) {
        const $cell = view.state.doc.resolve(cell);
        const table = $cell.node(-1), map = TableMap.get(table), start = $cell.start(-1);
        const col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
        const tr = view.state.tr;
        for (let row = 0; row < map.height; row++) {
          const mapIndex = row * map.width + col;
          if (row && map.map[mapIndex] == map.map[mapIndex - map.width]) continue;
          const pos = map.map[mapIndex];
          const attrs = table.nodeAt(pos).attrs;
          const index = attrs.colspan == 1 ? 0 : col - map.colCount(pos);
          if (attrs.colwidth && attrs.colwidth[index] == width) continue;
          const colwidth = attrs.colwidth ? attrs.colwidth.slice() : zeroes(attrs.colspan);
          colwidth[index] = width;
          tr.setNodeMarkup(start + pos, null, { ...attrs, colwidth });
        }
        if (tr.docChanged) view.dispatch(tr);
      }
      function displayColumnWidth(view, cell, width, defaultCellMinWidth) {
        const $cell = view.state.doc.resolve(cell);
        const table = $cell.node(-1), start = $cell.start(-1);
        const col = TableMap.get(table).colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
        let dom = view.domAtPos($cell.start(-1)).node;
        while (dom && dom.nodeName != "TABLE") {
          dom = dom.parentNode;
        }
        if (!dom) return;
        updateColumnsOnResize(
          table,
          dom.firstChild,
          dom,
          defaultCellMinWidth,
          col,
          width
        );
      }
      function zeroes(n) {
        return Array(n).fill(0);
      }
      function handleDecorations(state, cell) {
        var _a;
        const decorations = [];
        const $cell = state.doc.resolve(cell);
        const table = $cell.node(-1);
        if (!table) {
          return import_prosemirror_view2.DecorationSet.empty;
        }
        const map = TableMap.get(table);
        const start = $cell.start(-1);
        const col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
        for (let row = 0; row < map.height; row++) {
          const index = col + row * map.width;
          if ((col == map.width - 1 || map.map[index] != map.map[index + 1]) && (row == 0 || map.map[index] != map.map[index - map.width])) {
            const cellPos = map.map[index];
            const pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
            const dom = document.createElement("div");
            dom.className = "column-resize-handle";
            if ((_a = columnResizingPluginKey.getState(state)) == null ? void 0 : _a.dragging) {
              decorations.push(
                import_prosemirror_view2.Decoration.node(
                  start + cellPos,
                  start + cellPos + table.nodeAt(cellPos).nodeSize,
                  {
                    class: "column-resize-dragging"
                  }
                )
              );
            }
            decorations.push(import_prosemirror_view2.Decoration.widget(pos, dom));
          }
        }
        return import_prosemirror_view2.DecorationSet.create(state.doc, decorations);
      }
      function tableEditing({
        allowTableNodeSelection = false
      } = {}) {
        return new import_prosemirror_state7.Plugin({
          key: tableEditingKey,
          // This piece of state is used to remember when a mouse-drag
          // cell-selection is happening, so that it can continue even as
          // transactions (which might move its anchor cell) come in.
          state: {
            init() {
              return null;
            },
            apply(tr, cur) {
              const set = tr.getMeta(tableEditingKey);
              if (set != null) return set == -1 ? null : set;
              if (cur == null || !tr.docChanged) return cur;
              const { deleted, pos } = tr.mapping.mapResult(cur);
              return deleted ? null : pos;
            }
          },
          props: {
            decorations: drawCellSelection,
            handleDOMEvents: {
              mousedown: handleMouseDown
            },
            createSelectionBetween(view) {
              return tableEditingKey.getState(view.state) != null ? view.state.selection : null;
            },
            handleTripleClick,
            handleKeyDown,
            handlePaste
          },
          appendTransaction(_, oldState, state) {
            return normalizeSelection(
              state,
              fixTables(state, oldState),
              allowTableNodeSelection
            );
          }
        });
      }
    }
  });

  // node_modules/@tiptap/pm/tables/dist/index.cjs
  var require_dist44 = __commonJS({
    "node_modules/@tiptap/pm/tables/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _createStarExport(obj) {
        Object.keys(obj).filter((key) => key !== "default" && key !== "__esModule").forEach((key) => {
          if (exports.hasOwnProperty(key)) {
            return;
          }
          Object.defineProperty(exports, key, { enumerable: true, configurable: true, get: () => obj[key] });
        });
      }
      var _prosemirrortables = require_dist43();
      _createStarExport(_prosemirrortables);
    }
  });

  // node_modules/@tiptap/extension-table/dist/index.cjs
  var require_dist45 = __commonJS({
    "node_modules/@tiptap/extension-table/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var state = require_dist5();
      var tables = require_dist44();
      function getColStyleDeclaration(minWidth, width) {
        if (width) {
          return ["width", `${Math.max(width, minWidth)}px`];
        }
        return ["min-width", `${minWidth}px`];
      }
      function updateColumns(node, colgroup, table, cellMinWidth, overrideCol, overrideValue) {
        var _a;
        let totalWidth = 0;
        let fixedWidth = true;
        let nextDOM = colgroup.firstChild;
        const row = node.firstChild;
        if (row !== null) {
          for (let i = 0, col = 0; i < row.childCount; i += 1) {
            const { colspan, colwidth } = row.child(i).attrs;
            for (let j = 0; j < colspan; j += 1, col += 1) {
              const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
              const cssWidth = hasWidth ? `${hasWidth}px` : "";
              totalWidth += hasWidth || cellMinWidth;
              if (!hasWidth) {
                fixedWidth = false;
              }
              if (!nextDOM) {
                const colElement = document.createElement("col");
                const [propertyKey, propertyValue] = getColStyleDeclaration(cellMinWidth, hasWidth);
                colElement.style.setProperty(propertyKey, propertyValue);
                colgroup.appendChild(colElement);
              } else {
                if (nextDOM.style.width !== cssWidth) {
                  const [propertyKey, propertyValue] = getColStyleDeclaration(cellMinWidth, hasWidth);
                  nextDOM.style.setProperty(propertyKey, propertyValue);
                }
                nextDOM = nextDOM.nextSibling;
              }
            }
          }
        }
        while (nextDOM) {
          const after = nextDOM.nextSibling;
          (_a = nextDOM.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(nextDOM);
          nextDOM = after;
        }
        if (fixedWidth) {
          table.style.width = `${totalWidth}px`;
          table.style.minWidth = "";
        } else {
          table.style.width = "";
          table.style.minWidth = `${totalWidth}px`;
        }
      }
      var TableView = class {
        constructor(node, cellMinWidth) {
          this.node = node;
          this.cellMinWidth = cellMinWidth;
          this.dom = document.createElement("div");
          this.dom.className = "tableWrapper";
          this.table = this.dom.appendChild(document.createElement("table"));
          this.colgroup = this.table.appendChild(document.createElement("colgroup"));
          updateColumns(node, this.colgroup, this.table, cellMinWidth);
          this.contentDOM = this.table.appendChild(document.createElement("tbody"));
        }
        update(node) {
          if (node.type !== this.node.type) {
            return false;
          }
          this.node = node;
          updateColumns(node, this.colgroup, this.table, this.cellMinWidth);
          return true;
        }
        ignoreMutation(mutation) {
          return mutation.type === "attributes" && (mutation.target === this.table || this.colgroup.contains(mutation.target));
        }
      };
      function createColGroup(node, cellMinWidth, overrideCol, overrideValue) {
        let totalWidth = 0;
        let fixedWidth = true;
        const cols = [];
        const row = node.firstChild;
        if (!row) {
          return {};
        }
        for (let i = 0, col = 0; i < row.childCount; i += 1) {
          const { colspan, colwidth } = row.child(i).attrs;
          for (let j = 0; j < colspan; j += 1, col += 1) {
            const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
            totalWidth += hasWidth || cellMinWidth;
            if (!hasWidth) {
              fixedWidth = false;
            }
            const [property, value] = getColStyleDeclaration(cellMinWidth, hasWidth);
            cols.push([
              "col",
              { style: `${property}: ${value}` }
            ]);
          }
        }
        const tableWidth = fixedWidth ? `${totalWidth}px` : "";
        const tableMinWidth = fixedWidth ? "" : `${totalWidth}px`;
        const colgroup = ["colgroup", {}, ...cols];
        return { colgroup, tableWidth, tableMinWidth };
      }
      function createCell(cellType, cellContent) {
        if (cellContent) {
          return cellType.createChecked(null, cellContent);
        }
        return cellType.createAndFill();
      }
      function getTableNodeTypes(schema) {
        if (schema.cached.tableNodeTypes) {
          return schema.cached.tableNodeTypes;
        }
        const roles = {};
        Object.keys(schema.nodes).forEach((type) => {
          const nodeType = schema.nodes[type];
          if (nodeType.spec.tableRole) {
            roles[nodeType.spec.tableRole] = nodeType;
          }
        });
        schema.cached.tableNodeTypes = roles;
        return roles;
      }
      function createTable(schema, rowsCount, colsCount, withHeaderRow, cellContent) {
        const types = getTableNodeTypes(schema);
        const headerCells = [];
        const cells = [];
        for (let index = 0; index < colsCount; index += 1) {
          const cell = createCell(types.cell, cellContent);
          if (cell) {
            cells.push(cell);
          }
          if (withHeaderRow) {
            const headerCell = createCell(types.header_cell, cellContent);
            if (headerCell) {
              headerCells.push(headerCell);
            }
          }
        }
        const rows = [];
        for (let index = 0; index < rowsCount; index += 1) {
          rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells));
        }
        return types.table.createChecked(null, rows);
      }
      function isCellSelection(value) {
        return value instanceof tables.CellSelection;
      }
      var deleteTableWhenAllCellsSelected = ({ editor: editor2 }) => {
        const { selection } = editor2.state;
        if (!isCellSelection(selection)) {
          return false;
        }
        let cellCount = 0;
        const table = core.findParentNodeClosestToPos(selection.ranges[0].$from, (node) => {
          return node.type.name === "table";
        });
        table === null || table === void 0 ? void 0 : table.node.descendants((node) => {
          if (node.type.name === "table") {
            return false;
          }
          if (["tableCell", "tableHeader"].includes(node.type.name)) {
            cellCount += 1;
          }
        });
        const allCellsSelected = cellCount === selection.ranges.length;
        if (!allCellsSelected) {
          return false;
        }
        editor2.commands.deleteTable();
        return true;
      };
      var Table2 = core.Node.create({
        name: "table",
        // @ts-ignore
        addOptions() {
          return {
            HTMLAttributes: {},
            resizable: false,
            renderWrapper: false,
            handleWidth: 5,
            cellMinWidth: 25,
            // TODO: fix
            View: TableView,
            lastColumnResizable: true,
            allowTableNodeSelection: false
          };
        },
        content: "tableRow+",
        tableRole: "table",
        isolating: true,
        group: "block",
        parseHTML() {
          return [{ tag: "table" }];
        },
        renderHTML({ node, HTMLAttributes }) {
          const { colgroup, tableWidth, tableMinWidth } = createColGroup(node, this.options.cellMinWidth);
          const table = [
            "table",
            core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              style: tableWidth ? `width: ${tableWidth}` : `min-width: ${tableMinWidth}`
            }),
            colgroup,
            ["tbody", 0]
          ];
          return this.options.renderWrapper ? ["div", { class: "tableWrapper" }, table] : table;
        },
        addCommands() {
          return {
            insertTable: ({ rows = 3, cols = 3, withHeaderRow = true } = {}) => ({ tr, dispatch, editor: editor2 }) => {
              const node = createTable(editor2.schema, rows, cols, withHeaderRow);
              if (dispatch) {
                const offset = tr.selection.from + 1;
                tr.replaceSelectionWith(node).scrollIntoView().setSelection(state.TextSelection.near(tr.doc.resolve(offset)));
              }
              return true;
            },
            addColumnBefore: () => ({ state: state2, dispatch }) => {
              return tables.addColumnBefore(state2, dispatch);
            },
            addColumnAfter: () => ({ state: state2, dispatch }) => {
              return tables.addColumnAfter(state2, dispatch);
            },
            deleteColumn: () => ({ state: state2, dispatch }) => {
              return tables.deleteColumn(state2, dispatch);
            },
            addRowBefore: () => ({ state: state2, dispatch }) => {
              return tables.addRowBefore(state2, dispatch);
            },
            addRowAfter: () => ({ state: state2, dispatch }) => {
              return tables.addRowAfter(state2, dispatch);
            },
            deleteRow: () => ({ state: state2, dispatch }) => {
              return tables.deleteRow(state2, dispatch);
            },
            deleteTable: () => ({ state: state2, dispatch }) => {
              return tables.deleteTable(state2, dispatch);
            },
            mergeCells: () => ({ state: state2, dispatch }) => {
              return tables.mergeCells(state2, dispatch);
            },
            splitCell: () => ({ state: state2, dispatch }) => {
              return tables.splitCell(state2, dispatch);
            },
            toggleHeaderColumn: () => ({ state: state2, dispatch }) => {
              return tables.toggleHeader("column")(state2, dispatch);
            },
            toggleHeaderRow: () => ({ state: state2, dispatch }) => {
              return tables.toggleHeader("row")(state2, dispatch);
            },
            toggleHeaderCell: () => ({ state: state2, dispatch }) => {
              return tables.toggleHeaderCell(state2, dispatch);
            },
            mergeOrSplit: () => ({ state: state2, dispatch }) => {
              if (tables.mergeCells(state2, dispatch)) {
                return true;
              }
              return tables.splitCell(state2, dispatch);
            },
            setCellAttribute: (name, value) => ({ state: state2, dispatch }) => {
              return tables.setCellAttr(name, value)(state2, dispatch);
            },
            goToNextCell: () => ({ state: state2, dispatch }) => {
              return tables.goToNextCell(1)(state2, dispatch);
            },
            goToPreviousCell: () => ({ state: state2, dispatch }) => {
              return tables.goToNextCell(-1)(state2, dispatch);
            },
            fixTables: () => ({ state: state2, dispatch }) => {
              if (dispatch) {
                tables.fixTables(state2);
              }
              return true;
            },
            setCellSelection: (position) => ({ tr, dispatch }) => {
              if (dispatch) {
                const selection = tables.CellSelection.create(tr.doc, position.anchorCell, position.headCell);
                tr.setSelection(selection);
              }
              return true;
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            Tab: () => {
              if (this.editor.commands.goToNextCell()) {
                return true;
              }
              if (!this.editor.can().addRowAfter()) {
                return false;
              }
              return this.editor.chain().addRowAfter().goToNextCell().run();
            },
            "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
            Backspace: deleteTableWhenAllCellsSelected,
            "Mod-Backspace": deleteTableWhenAllCellsSelected,
            Delete: deleteTableWhenAllCellsSelected,
            "Mod-Delete": deleteTableWhenAllCellsSelected
          };
        },
        addProseMirrorPlugins() {
          const isResizable = this.options.resizable && this.editor.isEditable;
          return [
            ...isResizable ? [
              tables.columnResizing({
                handleWidth: this.options.handleWidth,
                cellMinWidth: this.options.cellMinWidth,
                defaultCellMinWidth: this.options.cellMinWidth,
                View: this.options.View,
                lastColumnResizable: this.options.lastColumnResizable
              })
            ] : [],
            tables.tableEditing({
              allowTableNodeSelection: this.options.allowTableNodeSelection
            })
          ];
        },
        extendNodeSchema(extension) {
          const context = {
            name: extension.name,
            options: extension.options,
            storage: extension.storage
          };
          return {
            tableRole: core.callOrReturn(core.getExtensionField(extension, "tableRole", context))
          };
        }
      });
      exports.Table = Table2;
      exports.TableView = TableView;
      exports.createColGroup = createColGroup;
      exports.createTable = createTable;
      exports.default = Table2;
      exports.updateColumns = updateColumns;
    }
  });

  // node_modules/@tiptap/extension-table-row/dist/index.cjs
  var require_dist46 = __commonJS({
    "node_modules/@tiptap/extension-table-row/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var TableRow2 = core.Node.create({
        name: "tableRow",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        content: "(tableCell | tableHeader)*",
        tableRole: "row",
        parseHTML() {
          return [
            { tag: "tr" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["tr", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        }
      });
      exports.TableRow = TableRow2;
      exports.default = TableRow2;
    }
  });

  // node_modules/@tiptap/extension-table-cell/dist/index.cjs
  var require_dist47 = __commonJS({
    "node_modules/@tiptap/extension-table-cell/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var TableCell2 = core.Node.create({
        name: "tableCell",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        content: "block+",
        addAttributes() {
          return {
            colspan: {
              default: 1
            },
            rowspan: {
              default: 1
            },
            colwidth: {
              default: null,
              parseHTML: (element) => {
                const colwidth = element.getAttribute("colwidth");
                const value = colwidth ? colwidth.split(",").map((width) => parseInt(width, 10)) : null;
                return value;
              }
            }
          };
        },
        tableRole: "cell",
        isolating: true,
        parseHTML() {
          return [
            { tag: "td" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["td", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        }
      });
      exports.TableCell = TableCell2;
      exports.default = TableCell2;
    }
  });

  // node_modules/@tiptap/extension-table-header/dist/index.cjs
  var require_dist48 = __commonJS({
    "node_modules/@tiptap/extension-table-header/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var TableHeader2 = core.Node.create({
        name: "tableHeader",
        addOptions() {
          return {
            HTMLAttributes: {}
          };
        },
        content: "block+",
        addAttributes() {
          return {
            colspan: {
              default: 1
            },
            rowspan: {
              default: 1
            },
            colwidth: {
              default: null,
              parseHTML: (element) => {
                const colwidth = element.getAttribute("colwidth");
                const value = colwidth ? colwidth.split(",").map((width) => parseInt(width, 10)) : null;
                return value;
              }
            }
          };
        },
        tableRole: "header_cell",
        isolating: true,
        parseHTML() {
          return [
            { tag: "th" }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["th", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        }
      });
      exports.TableHeader = TableHeader2;
      exports.default = TableHeader2;
    }
  });

  // node_modules/@tiptap/extension-task-list/dist/index.cjs
  var require_dist49 = __commonJS({
    "node_modules/@tiptap/extension-task-list/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var TaskList2 = core.Node.create({
        name: "taskList",
        addOptions() {
          return {
            itemTypeName: "taskItem",
            HTMLAttributes: {}
          };
        },
        group: "block list",
        content() {
          return `${this.options.itemTypeName}+`;
        },
        parseHTML() {
          return [
            {
              tag: `ul[data-type="${this.name}"]`,
              priority: 51
            }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["ul", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name }), 0];
        },
        addCommands() {
          return {
            toggleTaskList: () => ({ commands }) => {
              return commands.toggleList(this.name, this.options.itemTypeName);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
          };
        }
      });
      exports.TaskList = TaskList2;
      exports.default = TaskList2;
    }
  });

  // node_modules/@tiptap/extension-task-item/dist/index.cjs
  var require_dist50 = __commonJS({
    "node_modules/@tiptap/extension-task-item/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var inputRegex = /^\s*(\[([( |x])?\])\s$/;
      var TaskItem2 = core.Node.create({
        name: "taskItem",
        addOptions() {
          return {
            nested: false,
            HTMLAttributes: {},
            taskListTypeName: "taskList",
            a11y: void 0
          };
        },
        content() {
          return this.options.nested ? "paragraph block*" : "paragraph+";
        },
        defining: true,
        addAttributes() {
          return {
            checked: {
              default: false,
              keepOnSplit: false,
              parseHTML: (element) => {
                const dataChecked = element.getAttribute("data-checked");
                return dataChecked === "" || dataChecked === "true";
              },
              renderHTML: (attributes) => ({
                "data-checked": attributes.checked
              })
            }
          };
        },
        parseHTML() {
          return [
            {
              tag: `li[data-type="${this.name}"]`,
              priority: 51
            }
          ];
        },
        renderHTML({ node, HTMLAttributes }) {
          return [
            "li",
            core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              "data-type": this.name
            }),
            [
              "label",
              [
                "input",
                {
                  type: "checkbox",
                  checked: node.attrs.checked ? "checked" : null
                }
              ],
              ["span"]
            ],
            ["div", 0]
          ];
        },
        addKeyboardShortcuts() {
          const shortcuts = {
            Enter: () => this.editor.commands.splitListItem(this.name),
            "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
          };
          if (!this.options.nested) {
            return shortcuts;
          }
          return {
            ...shortcuts,
            Tab: () => this.editor.commands.sinkListItem(this.name)
          };
        },
        addNodeView() {
          return ({ node, HTMLAttributes, getPos, editor: editor2 }) => {
            const listItem = document.createElement("li");
            const checkboxWrapper = document.createElement("label");
            const checkboxStyler = document.createElement("span");
            const checkbox = document.createElement("input");
            const content = document.createElement("div");
            const updateA11Y = () => {
              var _a, _b;
              checkbox.ariaLabel = ((_b = (_a = this.options.a11y) === null || _a === void 0 ? void 0 : _a.checkboxLabel) === null || _b === void 0 ? void 0 : _b.call(_a, node, checkbox.checked)) || `Task item checkbox for ${node.textContent || "empty task item"}`;
            };
            updateA11Y();
            checkboxWrapper.contentEditable = "false";
            checkbox.type = "checkbox";
            checkbox.addEventListener("mousedown", (event) => event.preventDefault());
            checkbox.addEventListener("change", (event) => {
              if (!editor2.isEditable && !this.options.onReadOnlyChecked) {
                checkbox.checked = !checkbox.checked;
                return;
              }
              const { checked } = event.target;
              if (editor2.isEditable && typeof getPos === "function") {
                editor2.chain().focus(void 0, { scrollIntoView: false }).command(({ tr }) => {
                  const position = getPos();
                  if (typeof position !== "number") {
                    return false;
                  }
                  const currentNode = tr.doc.nodeAt(position);
                  tr.setNodeMarkup(position, void 0, {
                    ...currentNode === null || currentNode === void 0 ? void 0 : currentNode.attrs,
                    checked
                  });
                  return true;
                }).run();
              }
              if (!editor2.isEditable && this.options.onReadOnlyChecked) {
                if (!this.options.onReadOnlyChecked(node, checked)) {
                  checkbox.checked = !checkbox.checked;
                }
              }
            });
            Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
              listItem.setAttribute(key, value);
            });
            listItem.dataset.checked = node.attrs.checked;
            checkbox.checked = node.attrs.checked;
            checkboxWrapper.append(checkbox, checkboxStyler);
            listItem.append(checkboxWrapper, content);
            Object.entries(HTMLAttributes).forEach(([key, value]) => {
              listItem.setAttribute(key, value);
            });
            return {
              dom: listItem,
              contentDOM: content,
              update: (updatedNode) => {
                if (updatedNode.type !== this.type) {
                  return false;
                }
                listItem.dataset.checked = updatedNode.attrs.checked;
                checkbox.checked = updatedNode.attrs.checked;
                updateA11Y();
                return true;
              }
            };
          };
        },
        addInputRules() {
          return [
            core.wrappingInputRule({
              find: inputRegex,
              type: this.type,
              getAttributes: (match) => ({
                checked: match[match.length - 1] === "x"
              })
            })
          ];
        }
      });
      exports.TaskItem = TaskItem2;
      exports.default = TaskItem2;
      exports.inputRegex = inputRegex;
    }
  });

  // node_modules/@tiptap/extension-highlight/dist/index.cjs
  var require_dist51 = __commonJS({
    "node_modules/@tiptap/extension-highlight/dist/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var core = require_dist16();
      var inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/;
      var pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g;
      var Highlight2 = core.Mark.create({
        name: "highlight",
        addOptions() {
          return {
            multicolor: false,
            HTMLAttributes: {}
          };
        },
        addAttributes() {
          if (!this.options.multicolor) {
            return {};
          }
          return {
            color: {
              default: null,
              parseHTML: (element) => element.getAttribute("data-color") || element.style.backgroundColor,
              renderHTML: (attributes) => {
                if (!attributes.color) {
                  return {};
                }
                return {
                  "data-color": attributes.color,
                  style: `background-color: ${attributes.color}; color: inherit`
                };
              }
            }
          };
        },
        parseHTML() {
          return [
            {
              tag: "mark"
            }
          ];
        },
        renderHTML({ HTMLAttributes }) {
          return ["mark", core.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
        addCommands() {
          return {
            setHighlight: (attributes) => ({ commands }) => {
              return commands.setMark(this.name, attributes);
            },
            toggleHighlight: (attributes) => ({ commands }) => {
              return commands.toggleMark(this.name, attributes);
            },
            unsetHighlight: () => ({ commands }) => {
              return commands.unsetMark(this.name);
            }
          };
        },
        addKeyboardShortcuts() {
          return {
            "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
          };
        },
        addInputRules() {
          return [
            core.markInputRule({
              find: inputRegex,
              type: this.type
            })
          ];
        },
        addPasteRules() {
          return [
            core.markPasteRule({
              find: pasteRegex,
              type: this.type
            })
          ];
        }
      });
      exports.Highlight = Highlight2;
      exports.default = Highlight2;
      exports.inputRegex = inputRegex;
      exports.pasteRegex = pasteRegex;
    }
  });

  // renderer.js
  var { Editor } = require_dist16();
  var StarterKit = require_dist42().default;
  var Table = require_dist45().default;
  var TableRow = require_dist46().default;
  var TableCell = require_dist47().default;
  var TableHeader = require_dist48().default;
  var TaskList = require_dist49().default;
  var TaskItem = require_dist50().default;
  var Highlight = require_dist51().default;
  var editor = null;
  var currentFilePath = null;
  var workspacePath = null;
  var saveTimeout = null;
  function initEditor() {
    editor = new Editor({
      element: document.querySelector("#editor"),
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3, 4, 5, 6]
          }
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: "tiptap-table"
          }
        }),
        TableRow,
        TableHeader,
        TableCell,
        TaskList,
        TaskItem.configure({
          nested: true
        }),
        Highlight.configure({
          multicolor: false
        })
      ],
      content: "<p>Open a folder and select a markdown file to start editing.</p>",
      onUpdate: ({ editor: editor2 }) => {
        if (currentFilePath) {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            saveFile();
          }, 500);
        }
      }
    });
  }
  async function openFile(filePath) {
    if (!filePath.endsWith(".md")) return;
    const content = await window.api.readFile(filePath);
    if (content !== null) {
      currentFilePath = filePath;
      editor.commands.setContent(content);
      document.querySelector("#editor-header").textContent = filePath.split(/[\\/]/).pop();
      document.querySelectorAll(".file-item").forEach((item) => {
        item.classList.toggle("active", item.dataset.path === filePath);
      });
    }
  }
  async function saveFile() {
    if (!currentFilePath) return;
    const content = editor.getHTML();
    const success = await window.api.writeFile(currentFilePath, content);
    if (!success) {
      console.error("Failed to save file");
    }
  }
  function renderFileTree(items, container, level = 0) {
    container.innerHTML = "";
    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      if (item.isDirectory) {
        itemDiv.className = "folder-item";
        itemDiv.textContent = "\u{1F4C1} " + item.name;
        itemDiv.style.paddingLeft = level * 12 + "px";
        if (item.children && item.children.length > 0) {
          const childrenDiv = document.createElement("div");
          childrenDiv.className = "folder-children";
          renderFileTree(item.children, childrenDiv, level + 1);
          container.appendChild(itemDiv);
          container.appendChild(childrenDiv);
        } else {
          container.appendChild(itemDiv);
        }
      } else {
        itemDiv.className = "file-item";
        itemDiv.textContent = item.name.endsWith(".md") ? "\u{1F4C4} " + item.name : "\u{1F4C3} " + item.name;
        itemDiv.style.paddingLeft = level * 12 + "px";
        itemDiv.dataset.path = item.path;
        if (item.name.endsWith(".md")) {
          itemDiv.addEventListener("click", () => openFile(item.path));
        }
        container.appendChild(itemDiv);
      }
    });
  }
  async function loadWorkspace(folderPath) {
    workspacePath = folderPath;
    const items = await window.api.readDir(folderPath);
    const fileTree = document.querySelector("#file-tree");
    renderFileTree(items, fileTree);
    await window.api.writeSettings({ lastWorkspacePath: folderPath });
  }
  document.querySelector("#open-folder-btn").addEventListener("click", async () => {
    const folderPath = await window.api.openFolder();
    if (folderPath) {
      loadWorkspace(folderPath);
    }
  });
  async function init() {
    initEditor();
    const settings = await window.api.readSettings();
    if (settings.lastWorkspacePath) {
      loadWorkspace(settings.lastWorkspacePath);
    }
  }
  init();
})();
