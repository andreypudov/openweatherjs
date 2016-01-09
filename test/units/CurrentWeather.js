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

QUnit.test('CurrentWeather', function(assert) {
    var options = OpenWeatherJS.Options.getInstance();
    options.setKey('2de143494c0b295cca9337e1e96b00e0');
    
    var location = OpenWeatherJS.Location.getById(6198442);
    var done     = assert.async();
    
	var report = OpenWeatherJS.CurrentWeather.getWeather(location, 
        function(entry, request) {
            assert.ok(true, 'API call is success.')
            
            assert.strictEqual(entry.getLocation().getId(), 6198442, 'Location id is 6198442.');
            assert.strictEqual(entry.getLocation().getName(), 'Cheboksary', 'Location name is Cheboksary.');
            assert.strictEqual(entry.getLocation().getLatitude(), 56.17, 'Location latitude is 56.17.');
            assert.strictEqual(entry.getLocation().getLongitude(), 47.29, 'Location longitude is 47.29.');
            assert.strictEqual(entry.getLocation().getCountry(), 'RU', 'Location country is RU.');
            
            done();
        }.bind(this), 
        function(request) {
            assert.notOk(true, 'API call is failed: ' + request.responseText);
            done();
        }.bind(this));
});