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

QUnit.test('Options', function(assert) {
    var options = OpenWeatherJS.Options.getInstance();
    
    options.setKey('2de143494c0b295cca9337e1e96b00e0');
    options.setLanguage(OpenWeatherJS.Languages.RU);
    options.setUnits(OpenWeatherJS.Units.METRIC);
    assert.ok(true, 'Options throws no error for valid values.');
    
    assert.strictEqual(options.getKey(), '2de143494c0b295cca9337e1e96b00e0', 'Key key is valid.');
    assert.strictEqual(options.getLanguage(), OpenWeatherJS.Languages.RU, 'Langauge value is Russian.');
    assert.strictEqual(options.getUnits(), OpenWeatherJS.Units.METRIC, 'Default units value is Celsius.');
    
    assert.throws(function() {options.setKey(null)}, new TypeError('API key is invalid.'), 
        'setKey method throws TypeError exception for null value');
    assert.throws(function() {options.setKey(undefined)}, new TypeError('API key is invalid.'), 
        'setKey method throws TypeError exception for undefined value');
    assert.throws(function() {options.setKey(0x2de143494c0b295cca9337e1e96b00e0)}, new TypeError('API key is invalid.'), 
        'setKey method throws TypeError exception for number value');
        
    assert.throws(function() {options.setLanguage(null)}, new TypeError('API language is invalid.'), 
        'setLanguage method throws TypeError exception for null value');
    assert.throws(function() {options.setLanguage(undefined)}, new TypeError('API language is invalid.'), 
        'setLanguage method throws TypeError exception for undefined value');
    assert.throws(function() {options.setLanguage(100)}, new TypeError('API language is invalid.'), 
        'setLanguage method throws TypeError exception for number value');
        
    assert.throws(function() {options.setUnits(null)}, new TypeError('API units is invalid.'), 
        'setUnits method throws TypeError exception for null value');
    assert.throws(function() {options.setUnits(undefined)}, new TypeError('API units is invalid.'), 
        'setUnits method throws TypeError exception for undefined value');
    assert.throws(function() {options.setUnits(100)}, new TypeError('API units is invalid.'), 
        'setUnits method throws TypeError exception for number value');
});