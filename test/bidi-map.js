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

import assert from 'assert';
import BidiMap from '..';

const { describe, it } = global;

describe('BidMap', () => {
  it('README usage', () => {
    const bidiMap = new BidiMap([[1, 'test'], ['foo', 'bar']]);

    assert(bidiMap instanceof BidiMap);
    assert(bidiMap instanceof Map);

    assert.equal(bidiMap.get(1), 'test');
    assert.equal(bidiMap.has('foo'), true);
    assert.equal(bidiMap.exists('bar'), true);
    assert.equal(bidiMap.getKeyOf('test'), 1);

    const key = Symbol('unique');
    bidiMap.set(key, 'test');
    assert.deepEqual(bidiMap.getKeysOf('test'), [1, key]);
  });

  describe('#constructor', () => {
    it('should create with no arguments instance of Map', () => {
      const bidiMap = new BidiMap();

      assert(bidiMap instanceof BidiMap);
      assert(bidiMap instanceof Map);
    });

    it('should create with iterable', () => {
      const bidiMap = new BidiMap([[1, 'foo'], [5, 'bar']]);

      assert.equal(bidiMap.has(1), true);
      assert.equal(bidiMap.has(5), true);
      assert.equal(bidiMap.has(2), false);

      assert.equal(bidiMap.get(1), 'foo');
      assert.equal(bidiMap.get(5), 'bar');
      assert.equal(bidiMap.get(2), undefined);
    });

    it('should throw when call as a function', () => {
      assert.throws(() => BidiMap(), TypeError);
    });
  });

  describe('#count', () => {
    it('should ignore duplications', () => {
      const bidiMap = new BidiMap([[1, 'foo'], [5, 'foo']]);

      assert.equal(bidiMap.count, 1);
    });
  });

  describe('#set()', () => {
    it('should set a value', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);
      assert.equal(bidiMap.has(key), true);
      assert.equal(bidiMap.get(key), value);
      assert.equal(bidiMap.exists(value), true);
      assert.equal(bidiMap.getKeyOf(value), key);
      assert.deepEqual(bidiMap.getKeysOf(value), [key]);
    });
  });

  describe('#exists()', () => {
    it('should work only with exact value', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);
      assert.equal(bidiMap.exists(value), true);
      assert.equal(bidiMap.exists({}), false);
    });
  });

  describe('#getKeyOf()', () => {
    it('should work only with exact value', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);
      assert.equal(bidiMap.getKeyOf(value), key);
      assert.equal(bidiMap.getKeyOf({}), undefined);
    });

    it('should return first key', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const key2 = 'bar';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);
      assert.equal(bidiMap.set(key2, value), bidiMap);

      assert.equal(bidiMap.get(key), value);
      assert.equal(bidiMap.get(key2), value);

      assert.equal(bidiMap.getKeyOf(value), key);
    });
  });

  describe('#getKeysOf()', () => {
    it('should work only with exact value', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);
      assert.deepEqual(bidiMap.getKeysOf(value), [key]);
      assert.deepEqual(bidiMap.getKeysOf({}), []);
    });

    it('should return all keys', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const key2 = 'bar';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);
      assert.equal(bidiMap.set(key2, value), bidiMap);

      assert.equal(bidiMap.get(key), value);
      assert.equal(bidiMap.get(key2), value);

      assert.deepEqual(bidiMap.getKeysOf(value), [key, key2]);
    });
  });

  describe('#delete()', () => {
    it('should delete value', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);

      assert.equal(bidiMap.has(key), true);
      assert.equal(bidiMap.get(key), value);
      assert.equal(bidiMap.exists(value), true);
      assert.equal(bidiMap.getKeyOf(value), key);

      assert.equal(bidiMap.delete(key), true);

      assert.equal(bidiMap.has(key), false);
      assert.equal(bidiMap.get(key), undefined);
      assert.equal(bidiMap.exists(value), false);
      assert.equal(bidiMap.getKeyOf(value), undefined);
    });

    it('should delete only one key', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const key2 = 'bar';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);
      assert.equal(bidiMap.set(key2, value), bidiMap);

      assert.equal(bidiMap.get(key), value);
      assert.equal(bidiMap.get(key2), value);

      assert.equal(bidiMap.delete(key), true);

      assert.equal(bidiMap.get(key), undefined);
      assert.equal(bidiMap.get(key2), value);
      assert.equal(bidiMap.getKeyOf(value), key2);
    });
  });

  describe('#clear()', () => {
    it('should clear all values', () => {
      const bidiMap = new BidiMap();

      const key = 'foo';
      const value = {};

      assert.equal(bidiMap.set(key, value), bidiMap);

      assert.equal(bidiMap.has(key), true);
      assert.equal(bidiMap.get(key), value);
      assert.equal(bidiMap.exists(value), true);
      assert.equal(bidiMap.getKeyOf(value), key);

      assert.equal(bidiMap.clear(), undefined);

      assert.equal(bidiMap.has(key), false);
      assert.equal(bidiMap.get(key), undefined);
      assert.equal(bidiMap.exists(value), false);
      assert.equal(bidiMap.getKeyOf(value), undefined);
    });
  });
});
