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
    export class CurrentWeather {
        /**
         * Returns a current weather report for a given location value. 
         * Throws a new Error in case of connection failure and inavlid data recived.  
         *
         * @param location - a location value.
         * @param success  - a function to be run when an AJAX request is successfully completed.
         * @param error    - a function to be run when an AJAX request fails.
         * @param entry    - a current weather report for a given location
         * @param request  - a value contains the XMLHttpRequest object.
         * @param message  - a mesage details of the exception.
         */
        static getWeather(location: Location, success: (entry: WeatherEntry, request: XMLHttpRequest) => void, 
                error: (request: XMLHttpRequest, message: string) => void): void {
            Asserts.isInstanceofOf(location, Location, 'Location type is invalid.');
            
            var parser  = new JSONParser();
            var options = Options.getInstance();
            var url: string;
            
            /* generate an URL for API call */
            switch (location.getType()) {
            case LocationType.ID:
                url = 'http://api.openweathermap.org/data/2.5/weather?id=' + location.getId();
                break;
            case LocationType.NAME:
                var country = location.getCountry();
                url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location.getName() 
                    + (country !== undefined) ? ', ' + country : '';
            break;
                case LocationType.COORDINATES:
                url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + location.getLatitude() 
                    + '&lon=' + location.getLongitude();
                break;
            case LocationType.ZIP:
                url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + location.getZip()
                    + ', ' + location.getCountry();
                break;
            }
            
            /* append API key to url */
            url = url + '&appid=' + options.getKey();

            parser.parse(url, function(response: any, request: XMLHttpRequest) {
                var entry     = new WeatherEntry();
                var location  = new Location();
                
                entry.setWeatherCondition(response.weather[0].id);
                entry.setWeatherParameters(response.weather[0].main);
                entry.setWeatherDescription(response.weather[0].description);
                entry.setWeatherIconId(response.weather[0].icon);

                entry.setTemperature(response.main.temp);
                entry.setPressure(response.main.pressure);
                entry.setHumidity(response.main.humidity);
                entry.setMinimum(response.main.temp_min);
                entry.setMaximum(response.main.temp_max);

                entry.setSeaLevelPressure((response.main.sea_level !== undefined) 
                    ? response.main.sea_level 
                    : response.main.pressure);
                entry.setGroundLevelPressure((response.main.grnd_level !== undefined) 
                    ? response.main.grnd_level 
                    : response.main.pressure);
                    
                entry.setWindSpeed(response.wind.speed);
                entry.setWindDirection(response.wind.deg);
                entry.setCloudiness(response.clouds.all);
                
                entry.setRainVolume(((response.rain !== undefined) && (response.rain['3h'] !== undefined))
                    ? response.rain['3h']
                    : 0);
                entry.setSnowVolume(((response.snow !== undefined) && (response.snow['3h'] !== undefined))
                    ? response.snow['3h']
                    : 0);
                
                location.setId(response.id);
                location.setName(response.name)
                location.setLatitude(response.coord.lat);
                location.setLongitude(response.coord.lon);
                location.setCountry(response.sys.country);
                
                entry.setLocation(location);
                entry.setTime(response.dt);
                
                success(entry, request);
            }, function(request: XMLHttpRequest, message: string) {
                error(request, message);
            });
        }
    }
}
