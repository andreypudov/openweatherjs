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

QUnit.test('JSONParser', function(assert) {
    var url     = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=1d334b0f0f23fccba1cee7d3f4934ea7';
    var base    = 'cmc stations';
    var city    = 'London';
    var country = 'GB';

    var done = assert.async();

    setTimeout(function() {
        assert.ok(true, 'Asynchronous UnitTest.');
        
        var parser = new OpenWeatherJS.JSONParser();
        
        parser.parse(url, function(response, request) {
            assert.strictEqual(response.name, city, 'The city name is London');
            assert.strictEqual(response.sys.country, country, 'The city name is GB');
            assert.strictEqual(response.base, base, 'The base is stations');
        }, function(request) {});
        
        assert.throws(function() {
                parser.parse('example')
                },  new TypeError('URL is invalid.'),
            'URL is invalid.');
        
        done();
    }, 250);
});
