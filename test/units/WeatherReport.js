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

QUnit.test('WeatherReport', function(assert) {
    var location = new OpenWeatherJS.Location.getByName('London,uk');
    var done = assert.async();

    var report = new OpenWeatherJS.Forecast.getHourlyForecast(location, function(report, request) {
        assert.ok(true, 'API Call is success.');
        
        assert.equal(typeof report.getReport() === 'object', true, 'WeatherReport.getReport() returns an Array of Entries.');
        assert.equal(typeof report.getByDay(3).length === 'number', true, 'WeatherReport.getByDay(3) returns all Entries of the 3rd day in the week.');

        dayEntries = report.getByDay(3);

        for (var x = 0; x <= dayEntries.length-1; x++) {
            assert.equal(typeof dayEntries[x].time === 'number', true, 'WeatherEntry of the 3rd day of the week at hour: ' + new Date(dayEntries[x].time * 1000).getHours());
        }

        done();
    }.bind(this), 
    function(request) {
        assert.notOk(true, 'API Call has failed.');

        done();
    }.bind(this));
});