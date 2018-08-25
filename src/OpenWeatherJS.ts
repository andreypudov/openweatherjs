/**
 * The OpenWeatherJS Library.
 * The JavaScript library to work with weather information and forecasts data 
 * provided by Open Weather Map. Built using TypeScript.
 *
 * The MIT License (MIT)
 *
 * Copyright (C) 2016 The OpenWeatherJS Project
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
    export class OpenWeatherJS {
        /**
         * Sets key value for an API. Throws TypeError if given parameter is invalid.
         * 
         * @param key - a key value for an API.
         */
        public setKey(key: string) {
            Options.getInstance().setKey(key);
        }
    
        /**
         * Sets language value for API. Throws TypeError if given parameter is invalid.
         * 
         * @param language - a language value for API.
         */
        public setLanguage(language: Languages): void {
            Options.getInstance().setLanguage(language);
        }
        
        /**
         * Sets unit value for API. Throws TypeError if given parameter is invalid.
         * 
         * @param unit - a unit value for API.
         */
        public setUnits(unit: Units): void {
            Options.getInstance().setUnits(unit);
        } 
    }
}