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

QUnit.test('Asserts', function(assert) {
    /* isExists */
    OpenWeatherJS.Asserts.isExists('sample', 'message');
    assert.ok(true, 'Asserts method isExists throws no error for valid value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isExists(null, 'message [@]')}, 
        new TypeError('message [null]'), 'Asserts method isExists throws TypeError for null value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isExists(undefined, 'message [@]')}, 
        new TypeError('message [undefined]'), 'Asserts method isExists throws TypeError for undefined value.');
        
    /* isInRange */
    OpenWeatherJS.Asserts.isInRange(5, 0, 10, 'message');
    assert.ok(true, 'Asserts method isInRange throws no error for valid value.');
    OpenWeatherJS.Asserts.isInRange(0, 0, 10, 'message');
    assert.ok(true, 'Asserts method isInRange throws no error for valid left bound value.');
    OpenWeatherJS.Asserts.isInRange(10, 0, 10, 'message');
    assert.ok(true, 'Asserts method isInRange throws no error for valid right bound value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isInRange(-1, 0, 10, 'message [@1 >= @ <= @2]')}, 
        new RangeError('message [0 >= -1 <= 10]'), 'Asserts method isInRange throws RangeError for value outside range.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isInRange(11, 0, 10, 'message [@1 >= @ <= @2]')}, 
        new RangeError('message [0 >= 11 <= 10]'), 'Asserts method isInRange throws RangeError for value outside range.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isInRange(null, 0, 10, 'message [@1 >= @ <= @2]')}, 
        new TypeError('message [0 >= null <= 10]'), 'Asserts method isInRange throws RangeError for null value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isInRange(undefined, 0, 10, 'message [@1 >= @ <= @2]')}, 
        new TypeError('message [0 >= undefined <= 10]'), 'Asserts method isInRange throws RangeError for undefined value.');
        
    /* isNumber */
    OpenWeatherJS.Asserts.isNumber(5, 'message');
    assert.ok(true, 'Asserts method isNumber throws no error for valid value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isNumber(null, 'message [@]')}, 
        new TypeError('message [null]'), 'Asserts method isNumber throws TypeError for null value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isNumber(undefined, 'message [@]')}, 
        new TypeError('message [undefined]'), 'Asserts method isNumber throws TypeError for undefined value.');
        
    /* isString */
    OpenWeatherJS.Asserts.isString('string', 'message');
    assert.ok(true, 'Asserts method isString throws no error for valid value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isString(null, 'message [@]')}, 
        new TypeError('message [null]'), 'Asserts method isString throws TypeError for null value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isString(undefined, 'message [@]')}, 
        new TypeError('message [undefined]'), 'Asserts method isString throws TypeError for undefined value.');
        
    /* isUrl */
    OpenWeatherJS.Asserts.isUrl('https://github.com/andreypudov/OpenWeatherJS', 'message');
    assert.ok(true, 'Asserts method isUrl throws no error for valid value.');
    OpenWeatherJS.Asserts.isUrl('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0', 'message');
    assert.ok(true, 'Asserts method isUrl throws no error for valid advanced value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isUrl(null, 'message [@]')}, 
        new TypeError('message [null]'), 'Asserts method isUrl throws TypeError for null value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isUrl(undefined, 'message [@]')}, 
        new TypeError('message [undefined]'), 'Asserts method isUrl throws TypeError for undefined value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isUrl('mail@example.com', 'message [@]')}, 
        new TypeError('message [mail@example.com]'), 'Asserts method isUrl throws TypeError for undefined value.');
        
    /* isJSON */
    OpenWeatherJS.Asserts.isJSON('{"key": "value"}', 'message');
    assert.ok(true, 'Asserts method isJSON throws no error for valid value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isJSON('string', 'message')}, 
        new TypeError('message'), 'Asserts method isJSON throws TypeError for invalid value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isJSON(null, 'message [@]')}, 
        new TypeError('message [null]'), 'Asserts method isJSON throws TypeError for null value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isJSON(undefined, 'message [@]')}, 
        new TypeError('message [undefined]'), 'Asserts method isJSON throws TypeError for undefined value.');
        
    /* isInstanceofOf */
    var location = OpenWeatherJS.Location.getById(6198442);
    
    OpenWeatherJS.Asserts.isInstanceofOf(location, OpenWeatherJS.Location, 'message');
    assert.ok(true, 'Asserts method isInstanceofOf throws no error for valid value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isInstanceofOf(location, OpenWeatherJS.WeatherEntry, 'message [@]')}, 
        new TypeError('message [[object Object]]'), 'Asserts method isInstanceofOf throws TypeError for invalid type of value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isInstanceofOf(null, OpenWeatherJS.Location, 'message [@]')}, 
        new TypeError('message [null]'), 'Asserts method isInstanceofOf throws TypeError for null value.');
    assert.throws(function() {
        OpenWeatherJS.Asserts.isInstanceofOf(undefined, OpenWeatherJS.Location, 'message [@]')}, 
        new TypeError('message [undefined]'), 'Asserts method isInstanceofOf throws TypeError for undefined value.');
});