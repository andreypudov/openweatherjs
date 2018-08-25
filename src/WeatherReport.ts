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
    export class WeatherReport {

        private entries: WeatherEntry[];

        /**
         * Adds a new entry into the entries array of WeatherEntries.
         * 
         * @param location - A location object for the weather entry.
         */
        public addEntry(entry: WeatherEntry): void {
            Asserts.isInstanceofOf(entry, WeatherEntry, 'Invalid type in parameters, expected WeatherEntry');
            if (this.entries === undefined) {
                this.entries = new Array();
            }

            this.entries.push(entry);
        }

        /**
         * Gets target entry from the entries array. This lets you work
         * with the target entry with selected id.
         *
         * @param index - number that represents the index of target entry.
         *
         * @return a WeatherEntry from the entries array at index from parameters and
         * returns undefined if index is out of range.
         */
        public getEntry(index: number): WeatherEntry {
            return this.entries[index];
        }

        /**
         * Gets all the WeatherEntries from the report that has the same specified
         * day of the entry. This function returns a new array with all the entries in it.
         *
         * @param day - the day of the week the entries should be from.
         *
         * @return Array with WeatherEntries that share the specified day from the parameters.
         */
        public getByDay(day: number): WeatherEntry[] {
            var dailyEntries: WeatherEntry[];
            
            if (dailyEntries === undefined) {
                dailyEntries = new Array();
            }

            Asserts.isNumber(day, 'Invalid type used, Expected a number.');

            for (var x = 0; x <= this.entries.length -1; x++) {
                var currentDate = new Date(this.entries[x].getTime()*1000);
                if (currentDate.getDay() == day) {
                    dailyEntries.push(this.entries[x]);
                }
            }

            return dailyEntries;
        }

        /**
         * Returns an array of WeatherEntry used as a weather report.
         * 
         * @return entries - An array of WeatherEntries.
         */
        public getReport(): WeatherEntry[] {
            if (this.entries === undefined) {
                this.entries = new Array();
            }
            
            return this.entries;
        }
    }
}