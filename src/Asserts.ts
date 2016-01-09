/**
 * The OpenWeatherJS Library.
 * The JavaScript library to work with weather information and forecasts data
 * provided by Open Weather Map. Built using TypeScript.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 The OpenWeatherJS Project
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

module OpenWeatherJS {
    export class Asserts {
        /**
         * Validates provided value and throws a new type error whether the specified string
         * is null or an undefined.
         *
         * @param value   - a value being tested.
         * @param message - a short description of the assertion.
         */
        static isExists(value: any, message: string): void {
            if (value == null) {
                throw new TypeError(message);
            }
        }

        /**
         * Validates provided value is in range between values of minimum and maximum, and throws
         * a new RangeError otherwise. In case specified value is not number, this function throws
         * a new TypeError.
         *
         * @param value   - a value being tested.
         * @param minimum - a minimum value for specified number.
         * @param maximum - a maximum value for specified number.
         * @param message - a short description of the assertion.
         */
        static isInRange(value: any, minimum: number, maximum: number, message: string): void {
            if (typeof value !== 'number') {
                throw new TypeError('Value is not a number.');
            }

            if ((value < minimum) || (value > maximum)) {
                throw new RangeError('Location id value should be between 1 and 99999999');
            }
        }

        /**
         * Validates provided value is a number and throws a new TypeError
         * with specified message otherwise..
         *
         * @param value   - a value being tested.
         * @param message - a short description of the assertion.
         */
        static isNumber(value: any, message: string): void {
            if (typeof value !== 'number') {
                throw new TypeError(message);
            }
        }

        /**
         * Validates provided value is a string and throws a new TypeError
         * with specified message otherwise..
         *
         * @param value   - a value being tested.
         * @param message - a short description of the assertion.
         */
        static isString(value: any, message: string): void {
            if (typeof value !== 'string') {
                throw new TypeError(message);
            }
        }

        /**
         * Validates provided value is a URL and throws a new TypeError
         * with specified message otherwise..
         *
         * @param value   - a value being tested.
         * @param message - a short description of the assertion.
         */
        static isUrl(value: string, message: string): void {
            var URLValidationRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
            var matcher = URLValidationRegExp;

            var match = value.match(matcher);
            if (!match) {
                throw new TypeError(message);
            }
        }

        /**
         * Validates provided value is a JSON Object and throws a new TypeError
         * with specified message otherwise.
         *
         * @param value   - a value being tested.
         * @param message - a short description of the assertion.
         */
        static isJSONString(value: string, message: string): void {
            try {
                var o = JSON.parse(value);
                
                if ((typeof o !== 'object') || (o == null)) {
                    throw new TypeError(message);
                }
            } catch (e) {
                throw new Error(message);
            }
        }

        /**
         * Validates provided value is instance of specified type, 
         * and throws a new TypeError exception otherwise.
         *
         * @param value   - a value being tested.
         * @param type    - a type to compare.
         * @param message - a short description of the assertion.
         */
        static isInstanceofOf(value: any, type: any, message: string): void {
            if ((value == null) || ((value instanceof type) === false)) {
                throw new TypeError(message);
            }
        }
    }
}
