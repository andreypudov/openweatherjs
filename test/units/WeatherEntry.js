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

QUnit.test('WeatherEntry', function(assert) {
    var weatherEntry = new OpenWeatherJS.WeatherEntry();
    var condition    = OpenWeatherJS.WeatherCondition.CLEAR_SKY;
    var location     = OpenWeatherJS.Location.getById(6198442);

    /* weather condition */
    weatherEntry.setWeatherCondition(condition);
    assert.ok(true, 'Asserts method setWeatherCondition throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setWeatherCondition(9999)}, 
        new TypeError('Weather condition value is invalid.'), 'Asserts method setWeatherCondition throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setWeatherCondition(null)}, 
        new TypeError('Weather condition value is invalid.'), 'Asserts method setWeatherCondition throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setWeatherCondition(undefined)}, 
        new TypeError('Weather condition value is invalid.'), 'Asserts method setWeatherCondition throws TypeError for undefined value.');
});