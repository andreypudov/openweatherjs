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
    export class Options {
        private static instance : Options;

        public TIMEOUT_DEFAULT  = 4096;
        public ATTEMPTS_DEFAULT = 3;
        
        private key:      string;
        private language: Languages;
        private units:    Units;
        private timeout:  number;
        private attempts: number;

        constructor(optionsEnforcer: () => void) {
            if (optionsEnforcer !== OptionsEnforcer) {
                throw new Error("Error: Instantiation failed: Use Options.getInstance() instead of new.");
            }
        }

        public static getInstance(): Options {
            if (Options.instance == null) {
                Options.instance = new Options(OptionsEnforcer); 
            }

            return Options.instance;
        }
        
        /**
         * Returns an API key value or emptry string if undefined.
         * 
         * @return an API key value.
         */
        public getKey(): string {
            return (this.key !== undefined)
                ? this.key
                : '';
        }
        
        /**
         * Returns an API language value or English if undefined.
         * 
         * @return an API language value.
         */
        public getLanguage(): Languages {
            return (this.language !== undefined)
                ? this.language
                : Languages.EN;
        }
        
        /**
         * Returns an API units value or Kelvin if undefined.
         * 
         * @return an API units value.
         */
        public getUnits(): Units {
            return (this.units !== undefined)
                ? this.units
                : Units.DEFAULT;
        }

        /**
         * Returns an API timeout value or 4096 if undefined.
         * 
         * @return an API timeout value.
         */
        public getTimeout(): number {
            return (this.timeout !== undefined)
                ? this.timeout
                : this.TIMEOUT_DEFAULT
        }

        /**
         * Returns an API attempts value or 3 if undefined.
         * 
         * @return an API attempts value.
         */
        public getAttempts(): number {
            return (this.attempts !== undefined)
                ? this.attempts
                : this.ATTEMPTS_DEFAULT;
        }
        
        /**
         * Sets an API key value. Throws TypeError if given parameter is invalid.
         * 
         * @param key - an API key value.
         */
        public setKey(key: string): void {
            Asserts.isString(key, 'API key is invalid.')
            
            this.key = key;
        }
        
        /**
         * Sets language value for API. Throws TypeError if given parameter is invalid.
         * 
         * @param language - a language value for API.
         */
        public setLanguage(language: Languages): void {
            Asserts.isNumber(language, 'API language is invalid.');
            
            if (typeof Languages[language] === 'undefined') {
                throw new TypeError('API language is invalid.');
            }
            
            this.language = language;
        }
        
        /**
         * Sets unit value for API. Throws TypeError if given parameter is invalid.
         * 
         * @param unit - a unit value for API.
         */
        public setUnits(units: Units): void {
            Asserts.isNumber(units, 'API units is invalid.');
            
            if (typeof Units[units] === 'undefined') {
                throw new TypeError('API units is invalid.');
            }
            
            this.units = units;
        } 

        /**
         * Sets an API timeout value. Throws TypeError if given parameter is invalid.
         * 
         * @param timeout - an API timeout value.
         */
        public setTimeout(timeout: number): void {
            Asserts.isNumber(timeout, 'API key is invalid.')

            this.timeout = timeout;
        }

        /**
         * Sets an API attempts value. Throws TypeError if given parameter is invalid.
         * 
         * @param attempts - an API attempts value.
         */
        public setAttempts(attempts: number): void {
            Asserts.isNumber(attempts, 'API key is invalid.')

            this.attempts = attempts;
        }
    }

    function OptionsEnforcer() {} 
}