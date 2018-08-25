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

QUnit.test('Forecast', function(assert) {
    var options = OpenWeatherJS.Options.getInstance();
    options.setKey('1d334b0f0f23fccba1cee7d3f4934ea7');

    var location = new OpenWeatherJS.Location.getByName('London','UK');
    var done     = assert.async();

    new OpenWeatherJS.Forecast.getHourlyForecast(location, 
        function(entry, request) {
            assert.ok(true, 'API Call is success.');
            
            assert.equal(entry.getReport()[0].location.id, 2643743, 'The city id is 2643743');
            assert.equal(entry.getReport()[0].location.name, 'London', 'Forecast city is London.');
            assert.equal(entry.getReport()[0].location.country, 'GB', 'Forecast country is GB.');
            assert.equal(entry.getReport()[0].location.latitude, 51.5085, 'Location latitude is: 51.5085');
            assert.equal(entry.getReport()[0].location.longitude, -0.1258, 'Location longitude is: -0.1258');
            assert.equal(typeof entry.getReport()[0].description === 'string', true, 'Current weather is: ' + entry.getReport()[0].description);
            assert.ok((entry.getReport()[0].getPressure() >= 980) && (entry.getReport()[0].getPressure() <= 1050), 'Pressure value is in the range');
            assert.ok((entry.getReport()[0].getHumidity() >= 0) && (entry.getReport()[0].getHumidity() <= 100), 'Humidity value is in the range');
            assert.ok((entry.getReport()[0].getSeaLevelPressure() >= 980) && (entry.getReport()[0].getSeaLevelPressure() <= 1050), 'Sea level pressure value is in the range');
            assert.ok((entry.getReport()[0].getGroundLevelPressure() >= 980) && (entry.getReport()[0].getGroundLevelPressure() <= 1050), 'Ground level pressure value is in the range');
            
            assert.ok((entry.getReport()[0].getWindSpeed() >= 0) && (entry.getReport()[0].getWindSpeed() <= 16), 'Wind speed value is in the range');
            assert.ok((entry.getReport()[0].getWindDirection() >= 0) && (entry.getReport()[0].getWindDirection() <= 360), 'Wind direction value is in the range');
            
            assert.ok((entry.getReport()[0].getCloudiness() >= 0) && (entry.getReport()[0].getCloudiness() <= 100), 'Cloudiness value is in the range');
            assert.ok((entry.getReport()[0].getRainVolume() >= 0) && (entry.getReport()[0].getRainVolume() <= 10), 'Rain volume is in the range');
            assert.ok((entry.getReport()[0].getSnowVolume() >= 0) && (entry.getReport()[0].getSnowVolume() <= 10), 'Snow volume value is in the range');

                dayEntries = entry.getByDay(1);

                for (var index = 0; index <= dayEntries.length - 1; ++index) {
                    assert.equal(
                        typeof dayEntries[index].time === 'number', true, 
                        'WeatherEntry of the first day of the week at hour: ' 
                        + new Date(dayEntries[index].time * 1000).getHours());
                }
                done();
            }.bind(this), 
        function(request, message) {
            assert.notOk(true, 'API Call has failed. ' + message);
            
            done();
        }.bind(this));

    /* Metrics */
    var doneMetric = assert.async();
    options.setUnits(OpenWeatherJS.Units.METRIC);
    report = OpenWeatherJS.Forecast.getHourlyForecast(location, 
        function(entry, request) {
            assert.ok((entry.getReport()[0].getTemperature() >= -43) && (entry.getReport()[0].getTemperature() <= 46), 'Temperature value is in the range');
            assert.ok((entry.getReport()[0].getMinimum() >= -43) && (entry.getReport()[0].getMinimum() <= 46), 'Minimum value is in the range');
            assert.ok((entry.getReport()[0].getMaximum() >= -43) && (entry.getReport()[0].getMaximum() <= 46), 'Maximum value is in the range');
            assert.ok((entry.getReport()[0].getWindSpeed() >= 0) && (entry.getReport()[0].getWindSpeed() <= 16), 'Wind speed value is in the range');
            
            doneMetric();
        }.bind(this), 
        function(request, message) {
            assert.notOk(true, 'API call is failed: ' + request.responseText + ' ' + message);
            doneMetric();
        }.bind(this));
        
    /* Imperial */
    var doneImperial = assert.async();
    options.setUnits(OpenWeatherJS.Units.IMPERIAL);
    report = OpenWeatherJS.Forecast.getHourlyForecast(location, 
        function(entry, request) {
            assert.ok((entry.getReport()[0].getTemperature() >= -45) && (entry.getReport()[0].getTemperature() <= 116), 'Temperature value is in the range');
            assert.ok((entry.getReport()[0].getMinimum() >= -45) && (entry.getReport()[0].getMinimum() <= 116), 'Minimum value is in the range');
            assert.ok((entry.getReport()[0].getMaximum() >= -45) && (entry.getReport()[0].getMaximum() <= 116), 'Maximum value is in the range');
            assert.ok((entry.getReport()[0].getWindSpeed() >= 0) && (entry.getReport()[0].getWindSpeed() <= 35), 'Wind speed value is in the range');
            
            doneImperial();
        }.bind(this), 
        function(request, message) {
            assert.notOk(true, 'API call is failed: ' + request.responseText + ' ' + message);
            doneImperial();
        }.bind(this));
});