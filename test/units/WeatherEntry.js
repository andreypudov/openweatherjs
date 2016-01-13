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
    assert.ok(weatherEntry.getWeatherCondition() === OpenWeatherJS.WeatherCondition.CLEAR_SKY, 
        'setWeatherCondition method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setWeatherCondition(9999)}, 
        new TypeError('Weather condition value is invalid.'), 
        'setWeatherCondition method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setWeatherCondition(null)}, 
        new TypeError('Weather condition value is invalid.'), 
        'setWeatherCondition method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setWeatherCondition(undefined)}, 
        new TypeError('Weather condition value is invalid.'), 
        'setWeatherCondition method throws TypeError for undefined value.');

    /* setWeatherParameters */
    weatherEntry.setWeatherParameters('clear');
    assert.ok(weatherEntry.getWeatherParameters() === 'clear', 
        'setWeatherCondition method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setWeatherParameters(0)}, 
        new TypeError('Weather parameters value is invalid.'), 
        'setWeatherCondition method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setWeatherParameters(null)}, 
        new TypeError('Weather parameters value is invalid.'), 
        'setWeatherCondition method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setWeatherParameters(undefined)}, 
        new TypeError('Weather parameters value is invalid.'), 
        'setWeatherCondition method throws TypeError for undefined value.');

    /* setWeatherDescription */
    weatherEntry.setWeatherDescription('Sky is Clear');
    assert.ok(weatherEntry.getWeatherDescription() === 'Sky is Clear', 
        'setWeatherDescription method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setWeatherDescription(0)}, 
        new TypeError('Weather condition within the group is invalid.'), 
        'setWeatherDescription method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setWeatherDescription(null)}, 
        new TypeError('Weather condition within the group is invalid.'), 
        'setWeatherDescription method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setWeatherDescription(undefined)}, 
        new TypeError('Weather condition within the group is invalid.'), 
        'setWeatherDescription method throws TypeError for undefined value.');

    /* setWeatherIconId */
    weatherEntry.setWeatherIconId('01n');
    assert.ok(weatherEntry.getWeatherIconId() === '01n', 
        'setWeatherCondition method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setWeatherIconId(0)}, 
        new TypeError('Weather icon id value is invalid.'), 
        'setWeatherCondition method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setWeatherIconId(null)}, 
        new TypeError('Weather icon id value is invalid.'), 
        'setWeatherCondition method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setWeatherIconId(undefined)}, 
        new TypeError('Weather icon id value is invalid.'), 
        'setWeatherCondition method throws TypeError for undefined value.');

    /* setTemperature */
    weatherEntry.setTemperature(250.15);
    assert.ok(weatherEntry.getTemperature() === 250.15, 
        'setTemperature method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setTemperature('0')}, 
        new TypeError('Temperature value is invalid.'), 
        'setTemperature method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setTemperature(null)}, 
        new TypeError('Temperature value is invalid.'), 
        'setTemperature method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setTemperature(undefined)}, 
        new TypeError('Temperature value is invalid.'), 
        'setTemperature method throws TypeError for undefined value.');

    /* setPressure */
    weatherEntry.setPressure(1019);
    assert.ok(weatherEntry.getPressure() === 1019, 
        'setPressure method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setPressure('1019')}, 
        new TypeError('Pressure value is invalid.'), 
        'setPressure method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setPressure(null)}, 
        new TypeError('Pressure value is invalid.'), 
        'setPressure method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setPressure(undefined)}, 
        new TypeError('Pressure value is invalid.'), 
        'setPressure method throws TypeError for undefined value.');

    /* setHumidity */
    weatherEntry.setHumidity(83);
    assert.ok(weatherEntry.getHumidity() === 83, 
        'setHumidity method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setHumidity('83')}, 
        new TypeError('Humidity value is invalid.'), 
        'setHumidity method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setHumidity(null)}, 
        new TypeError('Humidity value is invalid.'), 
        'setHumidity method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setHumidity(undefined)}, 
        new TypeError('Humidity value is invalid.'), 
        'setHumidity method throws TypeError for undefined value.');

    /* setMinimum */
    weatherEntry.setMinimum(250.15);
    assert.ok(weatherEntry.getMinimum() === 250.15, 
        'setMinimum method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setMinimum('250.15')}, 
        new TypeError('Minimum temperature value is invalid.'), 
        'setMinimum method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setMinimum(null)}, 
        new TypeError('Minimum temperature value is invalid.'), 
        'setMinimum method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setMinimum(undefined)}, 
        new TypeError('Minimum temperature value is invalid.'), 
        'setMinimum method throws TypeError for undefined value.');

    /* setMaximum */
    weatherEntry.setMaximum(250.15);
    assert.ok(weatherEntry.getMaximum() === 250.15, 
        'setMaximum method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setMaximum('250.15')}, 
        new TypeError('Maximum temperature value is invalid.'), 
        'setMaximum method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setMaximum(null)}, 
        new TypeError('Maximum temperature value is invalid.'), 
        'setMaximum method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setMaximum(undefined)}, 
        new TypeError('Maximum temperature value is invalid.'), 
        'setMaximum method throws TypeError for undefined value.');

    /* setSeaLevelPressure */
    weatherEntry.setSeaLevelPressure(1019);
    assert.ok(weatherEntry.getSeaLevelPressure() === 1019, 
        'setSeaLevelPressure method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setSeaLevelPressure('1019')}, 
        new TypeError('Sea level pressure value is invalid.'), 
        'setSeaLevelPressure method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setSeaLevelPressure(null)}, 
        new TypeError('Sea level pressure value is invalid.'), 
        'setSeaLevelPressure method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setSeaLevelPressure(undefined)}, 
        new TypeError('Sea level pressure value is invalid.'), 
        'setSeaLevelPressure method throws TypeError for undefined value.');

    /* setGroundLevelPressure */
    weatherEntry.setGroundLevelPressure(1019);
    assert.ok(weatherEntry.getGroundLevelPressure() === 1019, 
        'setGroundLevelPressure method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setGroundLevelPressure('1019')}, 
        new TypeError('Ground level pressure value is invalid.'), 
        'setGroundLevelPressure method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setGroundLevelPressure(null)}, 
        new TypeError('Ground level pressure value is invalid.'), 
        'setGroundLevelPressure method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setGroundLevelPressure(undefined)}, 
        new TypeError('Ground level pressure value is invalid.'), 
        'setGroundLevelPressure method throws TypeError for undefined value.');

    /* setWindSpeed */
    weatherEntry.setWindSpeed(3);
    assert.ok(weatherEntry.getWindSpeed() === 3, 
        'setWindSpeed method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setWindSpeed('3')}, 
        new TypeError('Wind speed value is invalid.'), 
        'setWindSpeed method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setWindSpeed(null)}, 
        new TypeError('Wind speed value is invalid.'), 
        'setWindSpeed method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setWindSpeed(undefined)}, 
        new TypeError('Wind speed value is invalid.'), 
        'setWindSpeed method throws TypeError for undefined value.');

    /* setWindDirection */
    weatherEntry.setWindDirection(180);
    assert.ok(weatherEntry.getWindDirection() === 180, 
        'setWindDirection method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setWindDirection('180')}, 
        new TypeError('Wind direction value is invalid.'), 
        'setWindDirection method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setWindDirection(null)}, 
        new TypeError('Wind direction value is invalid.'), 
        'setWindDirection method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setWindDirection(undefined)}, 
        new TypeError('Wind direction value is invalid.'), 
        'setWindDirection method throws TypeError for undefined value.');

    /* setCloudiness */
    weatherEntry.setCloudiness(0);
    assert.ok(weatherEntry.getCloudiness() === 0, 
        'setCloudiness method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setCloudiness('0')}, 
        new TypeError('Cloudiness value is invalid.'), 
        'setCloudiness method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setCloudiness(null)}, 
        new TypeError('Cloudiness value is invalid.'), 
        'setCloudiness method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setCloudiness(undefined)}, 
        new TypeError('Cloudiness value is invalid.'), 
        'setCloudiness method throws TypeError for undefined value.');
        
    /* setRainVolume */
    weatherEntry.setRainVolume(0);
    assert.ok(weatherEntry.getRainVolume() === 0, 
        'setRainVolume method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setRainVolume('0')}, 
        new TypeError('Rain volume is invalid.'), 
        'setRainVolume method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setRainVolume(null)}, 
        new TypeError('Rain volume is invalid.'), 
        'setRainVolume method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setRainVolume(undefined)}, 
        new TypeError('Rain volume is invalid.'), 
        'setRainVolume method throws TypeError for undefined value.');

    /* setSnowVolume */
    weatherEntry.setSnowVolume(0);
    assert.ok(weatherEntry.getSnowVolume() === 0, 
        'setSnowVolume method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setSnowVolume('0')}, 
        new TypeError('Snow volume is invalid.'), 
        'setSnowVolume method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setSnowVolume(null)}, 
        new TypeError('Snow volume is invalid.'), 
        'setSnowVolume method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setSnowVolume(undefined)}, 
        new TypeError('Snow volume is invalid.'), 
        'setSnowVolume method throws TypeError for undefined value.');

    /* setLocation */
    weatherEntry.setLocation(location);
    assert.ok(weatherEntry.getLocation().getId() === 6198442, 
        'setLocation method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setLocation('0')}, 
        new TypeError('Location value is invalid.'), 
        'setLocation method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setLocation(null)}, 
        new TypeError('Location value is invalid.'), 
        'setLocation method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setLocation(undefined)}, 
        new TypeError('Location value is invalid.'), 
        'setLocation method throws TypeError for undefined value.');

    /* setSnowVolume */
    weatherEntry.setTime(1452607200);
    assert.ok(weatherEntry.getTime() === 1452607200, 
        'setTime method throws no error for valid value.');
    assert.throws(function() {
        weatherEntry.setTime('0')}, 
        new TypeError('Time value is invalid.'), 
        'setTime method throws TypeError for invalid value.');
    assert.throws(function() {
        weatherEntry.setTime(null)}, 
        new TypeError('Time value is invalid.'), 
        'setTime method throws TypeError for null value.');
    assert.throws(function() {
        weatherEntry.setTime(undefined)}, 
        new TypeError('Time value is invalid.'), 
        'setTime method throws TypeError for undefined value.');
});