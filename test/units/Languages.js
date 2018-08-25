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

QUnit.test('Languages', function(assert) {
    var type = OpenWeatherJS.Languages;

    assert.ok(type.hasOwnProperty('EN'), 'Type has property EN.');
    assert.ok(type.hasOwnProperty('RU'), 'Type has property RU.');
    assert.ok(type.hasOwnProperty('IT'), 'Type has property IT.');
    assert.ok(type.hasOwnProperty('ES'), 'Type has property ES.');
    assert.ok(type.hasOwnProperty('UK'), 'Type has property UK.');
    assert.ok(type.hasOwnProperty('DE'), 'Type has property DE.');
    assert.ok(type.hasOwnProperty('PT'), 'Type has property PT.');
    assert.ok(type.hasOwnProperty('RO'), 'Type has property RO.');
    assert.ok(type.hasOwnProperty('PL'), 'Type has property PL.');
    assert.ok(type.hasOwnProperty('FI'), 'Type has property FI.');
    assert.ok(type.hasOwnProperty('NL'), 'Type has property NL.');
    assert.ok(type.hasOwnProperty('FR'), 'Type has property FR.');
    assert.ok(type.hasOwnProperty('BG'), 'Type has property BG.');
    assert.ok(type.hasOwnProperty('SV'), 'Type has property SV.');
    assert.ok(type.hasOwnProperty('ZH_TV'), 'Type has property ZH_TV.');
    assert.ok(type.hasOwnProperty('ZH_CN'), 'Type has property ZH_CN.');
    assert.ok(type.hasOwnProperty('TR'), 'Type has property TR.');
    assert.ok(type.hasOwnProperty('HR'), 'Type has property HR.');
    assert.ok(type.hasOwnProperty('CA'), 'Type has property CA.');
});