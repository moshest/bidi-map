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
 */
declare const kReverseMap: unique symbol;
declare class BidiMap<V> extends Map<V, V> {
    [kReverseMap]: Map<V, V[]>;
    constructor(entries?: readonly (readonly [V, V])[] | null);
    /**
     * Get the number of differed values in this map
     *
     * @member {number} count
     * @memberOf module:bidi-map#
     * @readonly
     */
    get count(): number;
    /**
     * Inherits from `Map.set` method.
     */
    set(key: V, value: V): this;
    /**
     * Check if the map has the given value.
     *
     * @param {V} value The given value
     * @return {boolean}
     */
    exists(value: V): boolean;
    /**
     * Get the first key of the given value or `undefined` if not exists.
     *
     * @param {V} value
     * @return {K}
     */
    getKeyOf(value: V): V | undefined;
    /**
     * Get the all the keys of the given value.
     *
     * @param {V} value
     */
    getKeysOf(value: V): V[];
    /**
     * Inherits from `Map.delete` method.
     *
     * @param {K} key
     * @return {boolean}
     */
    delete(key: V): boolean;
    clear(): void;
}
export default BidiMap;
