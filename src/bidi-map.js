/**
 * Copyright 2017 Moshe Simantov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A Bidirectional Map
 * @module bidi-map
 */

const kReverseMap = Symbol('reverseMap');

// Extending Map native class with the following method:
// https://stackoverflow.com/a/45312985/518153

/**
 * Create a new instance of the bidirectional-map
 *
 * @param {Iterable.<Array>} [iterable] An iterable object
 * @template K, V
 * @constructor
 * @extends Map
 * @alias module:bidi-map
 */
export default function BidiMap(iterable = []) {
  if (!(this instanceof BidiMap)) {
    throw new TypeError("Constructor BidiMap requires 'new'");
  }

  const self = Object.getPrototypeOf(this) === Map.prototype ? this : new Map();
  Object.setPrototypeOf(self, BidiMap.prototype);

  self[kReverseMap] = new Map();

  // We want to preserve Map native implementation with for-of loop
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of iterable) {
    self.set(key, value);
  }

  return self;
}
BidiMap.prototype = Object.create(Map.prototype);

/**
 * Get the number of differed values in this map
 *
 * @member {number} count
 * @memberOf module:bidi-map#
 * @readonly
 */
Object.defineProperty(BidiMap.prototype, 'count', {
  configurable: true,
  get() {
    return this[kReverseMap].size;
  },
});

/**
 * Inherits from `Map.set` method.
 *
 * @param {K} key
 * @param {V} value
 * @return {Map.<K, V>}
 */
BidiMap.prototype.set = function set(key, value) {
  this.delete(key);
  Map.prototype.set.call(this, key, value);

  let lookup = this[kReverseMap].get(value);
  if (!lookup) {
    lookup = [key];
    this[kReverseMap].set(value, lookup);
  } else {
    lookup.push(key);
  }

  return this;
};

/**
 * Check if the map has the given value.
 *
 * @param {V} value The given value
 * @return {boolean}
 */
BidiMap.prototype.exists = function exists(value) {
  return this[kReverseMap].has(value);
};

/**
 * Get the first key of the given value or `undefined` if not exists.
 *
 * @param {V} value
 * @return {K}
 */
BidiMap.prototype.getKeyOf = function getKeyOf(value) {
  const lookup = this[kReverseMap].get(value);
  return lookup ? lookup[0] : undefined;
};

/**
 * Get the all the keys of the given value.
 *
 * @param {V} value
 * @return {Array<K>}
 */
BidiMap.prototype.getKeysOf = function getKeysOf(value) {
  const lookup = this[kReverseMap].get(value);
  return lookup ? lookup.slice() : [];
};

/**
 * Inherits from `Map.delete` method.
 *
 * @param {K} key
 * @return {boolean}
 */
BidiMap.prototype.delete = function del(key) {
  if (!this.has(key)) {
    return false;
  }

  const value = this.get(key);
  const lookup = this[kReverseMap].get(value);

  if (lookup.length === 1) {
    if (lookup[0] !== key) {
      throw Error(`can't find property "${key}" on the lookup map`);
    }

    this[kReverseMap].delete(value);
  } else {
    const index = lookup.indexOf(key);
    if (index === -1) {
      throw Error(`can't find property "${key}" on the lookup map`);
    }

    lookup.splice(index, 1);
  }

  Map.prototype.delete.call(this, key);

  return true;
};

/**
 * Inherits from `Map.clear` method.
 *
 * @return {undefined}
 */
BidiMap.prototype.clear = function clear() {
  Map.prototype.clear.call(this);
  this[kReverseMap].clear();
};
